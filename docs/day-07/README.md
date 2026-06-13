# Day 7 — Caching (Deep Dive)

Covers caching in depth — why it works, where to put it, core patterns, invalidation, distributed systems, and failure modes.

See also: [Day 5: Caching](../day-05/05-caching.md) for a shorter overview.

## Topics

| # | Topic | File |
|---|-------|------|
| 1 | [Why Caching?](./01-why-caching.md) | Latency, DB load, scale |
| 2 | [What Is a Cache?](./02-what-is-a-cache.md) | Definition, memory, vs database |
| 3 | [Where to Place Cache](./03-where-to-place-cache.md) | Every layer in the stack |
| 4 | [What to Cache](./04-what-to-cache.md) | Decision rules, examples |
| 5 | [Cache-Aside Pattern](./05-cache-aside-pattern.md) | Hit, miss, default strategy |
| 6 | [Write-Through Cache](./06-write-through-cache.md) | Sync cache + DB on write |
| 7 | [Write-Back Cache](./07-write-back-cache.md) | Async flush, speed vs risk |
| 8 | [Cache Invalidation](./08-cache-invalidation.md) | Stale data, hard problem |
| 9 | [TTL](./09-ttl.md) | Time to live, when short vs long |
| 10 | [Distributed Cache](./10-distributed-cache.md) | Redis, sharing, replication |
| 11 | [Cache Problems](./11-cache-problems.md) | Stampede, penetration, avalanche |
| 12 | [Other Patterns & Best Practices](./12-other-patterns-and-best-practices.md) | Read-through, warming, monitoring |

## Reading Order

Read 1 → 12 in sequence. Parts 5–7 are the core patterns; 8–11 are production essentials.

## Key Takeaways

- Cache exists because **RAM is orders of magnitude faster** than disk and DB queries add up at scale.
- Place cache at **every layer** that can answer without hitting the origin.
- **Cache-aside** is the default; choose write-through/write-back when consistency or write speed demands it.
- **Invalidation + TTL** together keep data fresh — neither alone is enough.
- Watch for **stampede, penetration, and avalanche** before they take down your database.

## Related

- [Day 5: Caching](../day-05/05-caching.md)
- [Day 5: CDN](../day-05/04-cdn.md)
- [Day 6: Storage Basics](../day-06/01-storage-basics.md) (buffer pool)
- [Day 2: Performance Design](../day-02/10-performance-design.md)
