# Quorum Reads and Writes

[← Consistency Models](./02-consistency-models.md) | [Day 11 Index](./README.md) | [Next: Replication Models →](./04-replication-models.md)

## The Idea

With **N** replicas of a piece of data, you do not always talk to all of them. You choose:

| Symbol | Meaning |
|--------|---------|
| **N** | Total replica count for a key/partition |
| **W** | Minimum replicas that must acknowledge a write |
| **R** | Minimum replicas that must respond to a read |

A **quorum** is “enough nodes to make a safe decision.” The classic rule for overlapping read/write sets:

```
W + R > N
```

Then every read set intersects every write set — so a read is guaranteed to see the latest successful write (assuming no Byzantine failures and proper versioning).

---

## Why Overlap Matters

```
N = 3 replicas: A, B, C
W = 2, R = 2

Write x=1 succeeds on A, B  (C may be slow)
Read must contact any 2 → {A,B}, {A,C}, or {B,C}
  Each pair includes at least one of A or B → sees x=1 (via version/timestamp)
```

If `W + R ≤ N`, a read might hit only stale replicas:

```
W = 1, R = 1, N = 3
Write only on A
Read only from C → stale
```

---

## Common Configurations

| Config | Behavior | Use when |
|--------|----------|----------|
| `W=N, R=1` | Write waits for all; reads are fast | Rare; write latency high |
| `W=1, R=N` | Fast writes; slow, strong-ish reads | Write-heavy, rare critical reads |
| `W=⌈(N+1)/2⌉, R=⌈(N+1)/2⌉` | Majority both ways | Balanced (e.g. N=3 → W=2,R=2) |
| `W=1, R=1` | Fastest, weakest | Cache-like, ephemeral data |

**Durable write:** often `W ≥ 2` or `W = majority` so one disk failure does not lose acknowledged data.

---

## Tunable Consistency

Systems like Cassandra and Dynamo-style stores let clients pick per request:

```
WRITE ONE / QUORUM / ALL
READ  ONE / QUORUM / ALL
```

Same cluster, different guarantees:

| Operation | Choice | Effect |
|-----------|--------|--------|
| Analytics counter bump | `ONE` | Low latency |
| User password change | `QUORUM` or `ALL` | Safer |

This is PACELC in API form: pay latency when you need consistency.

---

## Sloppy Quorum and Hinted Handoff

If the preferred replicas are down, some systems write to **other healthy nodes** temporarily (**sloppy quorum**), then push data back when the real owners recover (**hinted handoff**).

```
Preferred: A, B, C  — C down
Write with W=2 → A and D (stand-in)
Later: D forwards to C
```

Raises availability (AP lean) at the cost of more repair complexity.

---

## Read Repair and Anti-Entropy

Even with quorum, replicas drift (failed writes, handoffs). Background mechanisms:

| Mechanism | Role |
|-----------|------|
| **Read repair** | On read, compare versions; update stale replicas |
| **Anti-entropy / repair** | Periodic Merkle-tree sync between nodes |
| **Hinted handoff** | Replay writes meant for a downed node |

Quorum gives a **guarantee at request time**; repair keeps the cluster healthy over time.

---

## Versioning

Quorum alone is not enough without a way to tell **which value is newer**:

- Monotonic timestamps (careful with clock skew — [topic 7](./07-clocks-ordering-idempotency.md))
- Vector clocks / version vectors
- Lamport-like logical versions per key

On conflict (two writes with `W` on different subsets), the system needs a merge policy: last-write-wins, sibling values for the app, or CRDTs.

---

## Tie-Back to Earlier Days

| Concept | Link |
|---------|------|
| Sync vs async replication | [Day 4: Replication](../day-04/11-replication.md) — sync ≈ high W |
| Object storage durability | [Day 10: Object Storage](../day-10/08-distributed-object-storage.md) — multiple copies / erasure coding |
| Rate limiter Redis | [Day 10: Rate Limiter](../day-10/03-rate-limiter.md) — often single primary; quorum appears in clustered Redis |

---

## Summary

| Rule | Meaning |
|------|---------|
| `W + R > N` | Strong quorum overlap for latest-write visibility |
| Raise W | More durable / consistent writes, slower |
| Raise R | Fresher reads, slower |
| Tune per request | Match cost to how wrong a stale answer can be |

Next: who accepts writes — [Replication Models](./04-replication-models.md).
