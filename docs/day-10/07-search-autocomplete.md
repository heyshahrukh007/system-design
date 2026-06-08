# Search Autocomplete

[← Chat / Messaging](./06-chat-messaging.md) | [Day 10 Index](./README.md) | [Next: Distributed Object Storage →](./08-distributed-object-storage.md)

## Overview

Search autocomplete suggests completions as the user types — `amaz` → `amazon`, `amazon prime`, `amazon stock`. Production systems combine **exact prefix lookup** (fast path) with **fuzzy matching** (typo tolerance) and **probabilistic filters** (cheap rejection of junk queries).

This topic covers the design concepts and enough theory to reason about trade-offs — not a full search engine implementation.

---

## Requirements

### Functional

- Given prefix string, return top K suggestions (typically 5–10)
- Tolerate minor typos: `amozon` → `amazon` (fuzzy layer)
- Rank by popularity, recency, or personalization
- Support millions of distinct query strings
- Optional: category-aware suggestions (products vs brands)

### Non-Functional

| Requirement | Target |
|-------------|--------|
| Latency | &lt; 50 ms p99 per keystroke |
| QPS | 100,000+ (every keypress hits API) |
| Freshness | Trending queries updated within minutes |
| Scale | 100M unique prefixes indexed |

---

## Two Problems, Two Layers

Autocomplete is really two related problems:

| Problem | Input | Goal | Typical structure |
|---------|-------|------|-------------------|
| **Prefix completion** | User typed `amaz` | Words that **start with** prefix | Trie, FST |
| **Fuzzy correction** | User typed `amozon` | Words **similar to** input | Edit distance, n-grams, BK-tree |

```
User types "amozon"
  1. Prefix trie lookup → maybe 0 results (no word starts with "amozon")
  2. Fuzzy layer → "amazon" (edit distance 1)
  3. Merge, rank, return top K
```

Exact prefix is the hot path. Fuzzy is the fallback when prefix results are thin or empty.

---

## High-Level Architecture

```
┌────────┐      ┌─────────────┐      ┌──────────────────────────────┐
│ Client │─────▶│ Autocomplete│─────▶│ Suggestion Service           │
│        │      │ API         │      │                              │
└────────┘      └─────────────┘      └───────────┬──────────────────┘
                                                │
              ┌─────────────────────────────────┼─────────────────────────┐
              ▼                                 ▼                         ▼
        ┌──────────┐                    ┌──────────────┐          ┌────────────┐
        │ Redis    │                    │ Prefix index │          │ Fuzzy index│
        │ (hot     │                    │ Trie / FST   │          │ n-gram /   │
        │  keys)   │                    └──────────────┘          │ BK-tree    │
        └──────────┘                                              └────────────┘
              ▲
              │
        ┌─────┴──────┐
        │ Bloom      │  "Has this prefix ever existed?"
        │ filter     │  cheap reject before heavy lookup
        └────────────┘
              ▲
        ┌─────┴──────┐
        │ Analytics  │  rebuild indexes + bloom nightly
        │ pipeline   │
        └────────────┘
```

---

## Layer 1 — Prefix Index (Exact Match)

### Theory: Trie (Prefix Tree)

A **trie** stores strings character by character. Each path from root to a node spells a prefix. Lookup cost is **O(L)** where L = prefix length — independent of how many words are stored.

```
        root
       /    \
      a      b
      |      |
     m*     o*
     |      |
    a*     o*
     |
    z*
    |
   o*  → terminal: "amazon" (weight: 95)
```

`*` = node that stores **top-K precomputed suggestions** for that prefix.

**Why top-K at every node?** Query `amaz` lands on node `z` and returns the list immediately — no scan of all words under the subtree.

### Finite State Transducer (FST)

An FST is a **compressed trie** — shared suffixes merge into one path. Lucene/Elasticsearch use FSTs for completion suggesters.

| Structure | Lookup | Memory | Build |
|-----------|--------|--------|-------|
| Trie | O(L) | Higher | Simple |
| FST | O(L) | Lower (shared paths) | Slower offline build |

**Production pattern:** Offline-built FST/trie snapshots loaded into memory on suggestion servers.

### Serving Path (Exact)

```
GET /v1/suggest?q=amaz&limit=5

1. Normalize: lowercase, trim, max length 32
2. Bloom filter: prefix definitely unknown? → return [] (fast)
3. Redis: key suggest:amaz → cached top-K
4. On miss → prefix index lookup
5. If results &lt; K → invoke fuzzy layer (below)
6. Cache and return
```

---

## Layer 2 — Fuzzy Search (Typo Tolerance)

### Theory: Edit Distance

**Levenshtein distance** = minimum single-character edits to transform string A into B:

| Operation | Example |
|-----------|---------|
| Insert | `amazn` → `amazon` |
| Delete | `amazoon` → `amazon` |
| Substitute | `amozon` → `amazon` |

**Damerau-Levenshtein** adds **transposition** (swap adjacent chars): `amzaon` → `amazon` — common in real typos.

For autocomplete, you usually cap distance at **1 or 2**. Distance 2 over millions of terms is expensive without an index.

### Why Prefix Trie Alone Fails on Typos

```
Trie lookup "amozon" → walks a-m-o-z-o-n
No terminal node → empty result
Correct word "amazon" lives under a-m-a-z-o-n — different branch
```

Fuzzy search must explore **neighbors** in edit space, not just one path.

### Fuzzy Index Approaches

| Approach | Idea | Good for |
|----------|------|----------|
| **Brute force + filter** | Candidate set from prefix variants, score by edit distance | Small catalogs |
| **N-gram index** | Index character trigrams: `amazon` → `ama`, `maz`, `azo`, `zon`; query trigrams overlap | Medium scale, ES-style |
| **Symmetric deletes** | Precompute deletes within edit distance 1; index those | Spell correction (SymSpell) |
| **BK-tree** | Tree keyed by edit distance metric; search ball of radius R | In-memory dictionaries |

**Autocomplete hybrid (common in production):**

```
1. Try exact prefix trie → got 5 results? Done.
2. Else generate spelling variants (or query n-gram index)
3. Score candidates: edit_distance + popularity_weight
4. Return top K where distance ≤ 2
```

Fuzzy is **slower** than trie — run only when prefix path under-delivers.

### Ranking With Fuzzy

```
final_score = α × popularity_weight + β × (1 / (1 + edit_distance))
```

Prefer closer matches and more popular queries. `amozon` → `amazon` beats `amozon` → `amizon` if both are distance 1.

---

## Layer 3 — Bloom Filter (Cheap Rejection)

### Theory: What Is a Bloom Filter?

A Bloom filter is a **probabilistic set** backed by a bit array of size **m** and **k** hash functions.

**Insert** element `x`:

```
For each hash function hᵢ: set bit array[hᵢ(x)] = 1
```

**Query** element `x`:

```
If ANY bit array[hᵢ(x)] is 0 → x is DEFINITELY NOT in the set
If ALL bits are 1        → x is PROBABLY in the set (may be false positive)
```

```
Key properties:
  ✓ No false negatives  (if inserted, query always says "maybe yes")
  ✗ False positives possible  (never inserted, might still say "maybe yes")
  ✓ Constant space per element (much smaller than storing full strings)
  ✗ Cannot delete* without extensions (Counting Bloom / Cuckoo filter)
```

\* Classic Bloom filters don't support delete; **counting Bloom filters** or **Cuckoo filters** do if you need removals.

### False Positive Rate (Intuition)

More bits (**m**) and optimal **k** → lower false positive rate. For **n** inserted elements:

```
Approximate FP rate ≈ (1 - e^(-kn/m))^k
```

Design choice: size the filter so FP rate is acceptable (e.g. 1%) — still far cheaper than a full trie lookup on every junk prefix.

### Where Bloom Filters Fit Autocomplete

| Use case | How |
|----------|-----|
| **Unknown prefix guard** | Before trie lookup: bloom says "never seen" → return `[]` immediately |
| **Cache penetration** | Random strings (`asdfghjkl`) never hit the heavy index ([Day 5](../day-05/11-cache-problems.md) penetration pattern) |
| **Build pipeline gate** | Only insert prefixes that appeared in logs ≥ N times — bloom rebuilt nightly from valid set |

```
Request: q=zzzqxp

Bloom filter: "zzzqxp" NOT in set (definitely)
→ return [] in &lt; 1 ms

Request: q=amaz

Bloom filter: "amaz" MAYBE in set
→ proceed to Redis / trie (might be false positive — rare)
```

**Bloom filter does not return suggestions** — it only answers "is this prefix worth looking up?"

### Bloom vs Trie vs Redis

| Layer | Answers | Cost |
|-------|---------|------|
| Bloom filter | Worth querying further? | Tiny memory, microseconds |
| Redis | Cached top-K for hot prefix? | Network, milliseconds |
| Trie/FST | Exact top-K for prefix? | In-memory scan O(L) |
| Fuzzy index | Similar strings for typos? | Heavier, run on demand |

Stack them: **Bloom → Redis → Trie → Fuzzy** (short-circuit as early as possible).

---

## Scale Estimates

```
100M DAU × 10 keystrokes/search × 5 searches/day ≈ huge read volume
Most traffic on short prefixes: "a", "am", "ama" — extreme hot keys
Long tail + typos: minority of QPS but need fuzzy path
Junk / bot queries: bloom filter sheds load before trie
```

---

## Data Pipeline

```
Search logs → Kafka → Flink (aggregate counts per query)
                    │
                    ├→ Nightly: rebuild prefix trie/FST
                    ├→ Nightly: rebuild bloom filter (all prefixes with count ≥ 1)
                    ├→ Nightly: rebuild n-gram / fuzzy index
                    └→ Every 5 min: incremental weight updates for trending
```

Indexes are **read-only at serving time** — updates happen offline. Same pattern as [analytics pipeline](./11-analytics-metrics-pipeline.md).

---

## Personalization (Optional)

```
Global top 5 + user history boost
Key: suggest:{user_hash}:amaz
```

Personalization increases cache cardinality — use only for logged-in users and bounded prefix set. Bloom filter stays global (no per-user bloom at scale).

---

## Abuse and Quality

- Rate limit by IP ([topic 3](./03-rate-limiter.md))
- Bloom filter blocks never-seen prefixes (bots hammering random strings)
- Blocklist offensive terms in index build (not at query time)
- Minimum prefix length (2 chars) to reduce noise and load

---

## Design Concepts Summary

| Concept | Role in autocomplete |
|---------|---------------------|
| **Trie / FST** | O(prefix length) exact completion — primary index |
| **Edit distance** | Measure typo similarity — fuzzy fallback |
| **N-gram / SymSpell** | Make fuzzy search tractable at scale |
| **Bloom filter** | Probabilistic "prefix exists?" — protect hot path |
| **Top-K precomputation** | No runtime scan of full dictionary |
| **Offline build** | Serving path stays read-only and fast |

---

## Trade-offs

| Decision | Choice | Why |
|----------|--------|-----|
| Primary index | Trie/FST with top-K at nodes | Fast exact prefix |
| Fuzzy | On-demand when prefix results &lt; K | Fuzzy is 10–100× slower |
| Edit distance cap | 1–2 | Distance 3 explodes candidate set |
| Bloom filter | Global, rebuilt nightly | Stops junk before trie; tiny RAM |
| False positives | Accept ~1% FP | Rare extra trie lookup beats no filter |
| Updates | Offline rebuild + incremental weights | Keystroke path stays read-only |

---

## Summary

Autocomplete is a **layered read system**: **Bloom filter** rejects unknown prefixes cheaply, **trie/FST** serves exact prefix completion in O(length), and **fuzzy search** (edit distance + n-gram or SymSpell-style indexes) catches typos when the prefix path fails. Theory matters for sizing each layer — but production speed comes from **precomputed top-K**, **aggressive caching**, and **only running fuzzy when needed**.

---

[← Chat / Messaging](./06-chat-messaging.md) | [Day 10 Index](./README.md) | [Next: Distributed Object Storage →](./08-distributed-object-storage.md)
