# Why Do We Need Caching?

[← Day 7 Index](./README.md) | [Next: What Is a Cache →](./02-what-is-a-cache.md)

## The Core Problem

Every time your app needs data, the slow path costs time and resources. At scale, that cost becomes enormous.

**Caching** keeps a copy of hot data in fast storage so most requests never take the slow path.

---

## Why Is RAM Faster Than Disk?

| Storage | Approximate Latency | Relative Speed |
|---------|---------------------|----------------|
| L1 CPU cache | ~1 ns | 1× |
| RAM | ~100 ns | ~100× slower than L1 |
| SSD random read | ~150 μs | ~150,000× slower than RAM |
| HDD seek | ~10 ms | ~100,000,000× slower than RAM |

RAM is **orders of magnitude faster** because:

- **No mechanical parts** — pure electronics vs spinning disk or flash cell latency
- **Closer to CPU** — shorter physical and logical distance
- **Optimized for random access** — disk reads happen in blocks (pages), even for one byte

```
Reading 1 KB from RAM:     ~100 ns
Reading 1 KB from SSD:     ~150 μs   (1,500× slower)
Reading 1 KB from HDD:     ~10 ms    (100,000,000× slower)
```

A cache puts data in **RAM** (or closer — browser memory, CDN edge) so reads skip disk entirely.

---

## Why Are Database Queries Expensive?

A database query is not one operation — it's a chain:

```
1. App sends query over network        (0.5–5 ms)
2. DB parses and plans query           (0.1–10 ms)
3. Check buffer pool — page in RAM?
   MISS → read page from disk          (0.15–10 ms)
4. Index lookup or table scan          (varies wildly)
5. Lock coordination (concurrent writes)
6. Serialize and return result         (network again)
```

| Cost | Why |
|------|-----|
| **Network round trip** | App and DB are separate machines |
| **Disk I/O** | Buffer pool miss → read 8 KB page from SSD |
| **CPU** | Parsing, planning, joining, sorting |
| **Contention** | Other queries compete for locks and connections |
| **Connection overhead** | Pool borrow, auth, query execution |

Even a "simple" indexed lookup is **milliseconds**. A cache hit is **microseconds**.

```
DB query:    5–50 ms typical
Redis GET:   0.5–2 ms typical
In-process:  0.001 ms (nanoseconds)
```

---

## What Happens When 1 Million Users Request the Same Data?

Scenario: product page for a viral item. No cache.

```
1,000,000 requests × 1 DB query each = 1,000,000 DB queries

If each query = 20 ms DB time:
  → 20,000,000 ms of DB work
  → Connection pool exhausted in seconds
  → Database CPU pegged at 100%
  → Timeouts, errors, site down
```

With cache (95% hit rate after warm-up):

```
1,000,000 requests
  950,000 → cache hit  (~1 ms each)
   50,000 → cache miss → DB

DB load drops from 1M to 50K — 20× reduction
Most users get response in ~1 ms instead of ~50 ms
```

Same data. Same app. **Caching turns an outage into normal traffic.**

---

## Why Not Always Query the Database Directly?

| Direct DB Always | With Cache |
|------------------|------------|
| Simple mental model | More moving parts |
| Always fresh data | Possible staleness (manageable) |
| Fine for 10 users | Breaks at 10,000+ for hot keys |
| DB does all the work | DB handles only cache misses |

**You should query the DB directly when:**

- Data must be **real-time accurate** (live bank balance for a transfer)
- Data is **unique per request** (never read twice)
- Traffic is **low** and queries are **cheap**
- Writes are **far more common** than reads for that data

**You should cache when:**

- Same data is read **many times**
- Data changes **less often** than it's read
- DB or API is becoming a **bottleneck**
- Latency targets require **sub-10 ms** reads

---

## What Caching Improves

| Metric | Improvement |
|--------|-------------|
| **Latency** | Faster responses for users |
| **Throughput** | Same hardware serves more requests |
| **DB load** | Fewer queries → headroom for writes |
| **Cost** | Smaller DB instance, fewer read replicas |
| **Availability** | DB blip — cache may still serve reads |

---

## Real-World Analogy

```
Database  = warehouse across town (complete inventory, slow to fetch)
Cache     = desk drawer (frequently used items, instant access)

You don't drive to the warehouse every time you need a pen.
You keep pens on your desk and restock occasionally.
```

---

## Summary

We cache because **RAM beats disk**, **database queries are expensive**, and **repeated reads at scale overwhelm the DB**. Caching reduces latency for users and protects your database from traffic spikes. It's not optional for most production read-heavy systems — it's how they survive.

---

[Next: What Is a Cache →](./02-what-is-a-cache.md)
