# Write-Back Cache (Write-Behind)

[← Write-Through](./06-write-through-cache.md) | [Day 7 Index](./README.md) | [Next: Cache Invalidation →](./08-cache-invalidation.md)

## What Is Write-Back?

Also called **write-behind**. Writes go to **cache first**; database is updated **later** asynchronously.

```
Write
  │
  ▼
Cache (immediate — fast response to user)
  │
  ▼
Database (later — batched or delayed flush)
```

The application returns success as soon as the cache accepts the write — before DB confirms.

---

## Flow Diagram

```
Write Request
      │
      ▼
┌─────────────┐
│ Application │ ──▶ return 200 OK (fast)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Cache     │  ← write lands here first
│  (primary   │
│   for writes)│
└──────┬──────┘
       │
       │ async / batch / interval
       ▼
┌─────────────┐
│  Database   │  ← updated seconds later
└─────────────┘
```

---

## Why Is It Faster?

| Write-Through | Write-Back |
|---------------|------------|
| Wait for DB + cache | Wait for cache only |
| ~20–50 ms write | ~1–2 ms write |
| DB every write | DB batched (100 writes → 1 flush) |

```
10,000 writes/sec:
  Write-through: 10,000 DB writes/sec
  Write-back:    batch 500 every 100ms → ~5,000 DB writes/sec effective
                 (or fewer with deduplication)
```

Ideal for **write-heavy** workloads where brief DB lag is acceptable.

---

## What Happens If Cache Crashes?

**Unflushed writes are lost.**

```
Timeline:
  10:00:00  Write A → cache only (not flushed yet)
  10:00:01  Write B → cache only
  10:00:02  Cache server crashes
  10:00:03  Cache restarts empty

  Database never received A or B
  → data loss
```

This is why write-back is **risky** for critical data unless cache has durable persistence.

---

## Why Is Data Loss Possible?

| Risk | Cause |
|------|-------|
| **Cache crash before flush** | Writes only in RAM |
| **Flush queue backlog** | DB slow, queue drops or overflows |
| **Partial flush failure** | Some writes persisted, some not |
| **Ordering issues** | Concurrent writes flushed out of order |

Mitigations:

```
- Durable write-ahead log on cache layer
- Frequent flush intervals (reduces window)
- Idempotent DB writes
- Only use for non-critical or eventually-consistent data
```

---

## Advantages

| Advantage | Detail |
|-----------|--------|
| **Fastest writes** | User doesn't wait for DB |
| **Batch DB writes** | Reduce DB load, better throughput |
| **Absorb write spikes** | Queue smooths bursts |
| **Coalesce updates** | 10 updates to same key → 1 DB write |

---

## Disadvantages

| Disadvantage | Detail |
|--------------|--------|
| **Data loss risk** | Cache failure before flush |
| **Eventual consistency** | DB lags behind cache |
| **Complex recovery** | Reconcile cache vs DB after crash |
| **Hard to debug** | "DB doesn't match cache" bugs |

---

## When to Use Write-Back

| Good Fit | Bad Fit |
|----------|---------|
| Analytics counters | Bank transfers |
| Like/view counts | Inventory deduction |
| Activity logs | Order placement |
| Metrics aggregation | Anything requiring ACID immediately |
| CDN edge caching writes | User authentication state |

---

## Real-World Examples

```
Facebook likes:     increment in cache → aggregate to DB periodically
IoT sensor data:    buffer readings → batch insert every 5 seconds
Shopping cart:      cache cart in Redis → persist to DB on checkout
Database engines:   InnoDB buffer pool flushes dirty pages asynchronously (similar idea)
```

---

## Pattern Comparison

| Pattern | Write Path | Consistency | Speed |
|---------|------------|-------------|-------|
| Cache-aside | DB first, invalidate cache | Good with invalidation | Medium |
| Write-through | Cache + DB sync | Strong | Slower writes |
| Write-back | Cache first, DB later | Eventual | Fastest writes |

---

## Summary

Write-back writes to **cache immediately** and **flushes to DB later** — maximum write speed, highest risk. Cache crash before flush means **data loss**. Use only for data where eventual consistency and loss windows are acceptable — metrics, logs, likes — never for financial transactions without durable queues.

---

[Next: Cache Invalidation →](./08-cache-invalidation.md)
