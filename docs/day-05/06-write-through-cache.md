# Write-Through Cache

[← Cache-Aside](./05-cache-aside-pattern.md) | [Day 5 Index](./README.md) | [Next: Write-Back →](./07-write-back-cache.md)

## What Is Write-Through?

On every **write**, data goes to **cache and database together** — synchronously. Cache and DB stay in sync on every update.

```
Write
  │
  ├──▶ Cache (update immediately)
  │
  └──▶ Database (update immediately)
```

Read path is simple: always check cache first — it's always fresh (after write completes).

---

## Flow Diagram

```
                    Write Request
                          │
                          ▼
                   ┌─────────────┐
                   │ Application │
                   └──────┬──────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
        ┌──────────┐            ┌──────────┐
        │  Cache   │            │ Database │
        │ (update) │            │ (update) │
        └──────────┘            └──────────┘
              │                       │
              └───────────┬───────────┘
                          ▼
                    Both succeed → OK
                    Either fails → rollback both
```

---

## What Happens When Data Changes?

```python
def update_product(product_id, data):
    # Write-through: both must succeed
    db.update(product_id, data)
    redis.setex(f"product:{product_id}", 3600, json.dumps(data))
    return data
```

Every write updates cache — **no stale cache** from missed invalidation.

Compare to cache-aside:

```
Cache-aside write:  DB update → DELETE cache key (next read refills)
Write-through write: DB update → SET cache key (immediately fresh)
```

---

## How Do Cache and DB Stay Synchronized?

| Mechanism | Detail |
|-----------|--------|
| **Synchronous dual write** | App writes both in same request |
| **Transaction wrapper** | DB fails → don't update cache (or rollback cache) |
| **Cache library** | Some libraries handle write-through internally |

```
Ideal order:
  1. Write DB first (source of truth)
  2. Write cache second
  3. If cache write fails → delete cache key (invalidate)

Never: cache updated, DB write failed → inconsistent
```

---

## Advantages

| Advantage | Detail |
|-----------|--------|
| **Cache always fresh after write** | No stale reads post-update |
| **Simple read path** | Read cache — data is there |
| **Predictable consistency** | Easier to reason about than cache-aside + TTL |
| **Good for read-heavy after write** | Updated data immediately cached |

---

## Disadvantages

| Disadvantage | Detail |
|--------------|--------|
| **Write latency** | Two writes per request (cache + DB) |
| **Wasted cache writes** | Data written may never be read |
| **Write amplification** | Every DB write hits cache even for cold keys |
| **Failure complexity** | Must handle partial failure (DB ok, cache fail) |

```
Product updated once, never viewed again:
  Write-through: cache entry written anyway → wasted RAM
  Cache-aside:   cache not populated until first read → efficient
```

---

## When to Use Write-Through

| Use Case | Why |
|----------|-----|
| Data read immediately after every write | User profile after edit |
| Consistency after write matters | Settings, preferences |
| Low write volume, high read volume | Config that changes rarely |
| Cache-aside invalidation is error-prone | Legacy code missing deletes |

| Avoid When | Why |
|------------|-----|
| Very high write throughput | Double write cost |
| Many writes to cold data | Cache pollution |
| Cache is optional optimization only | Cache-aside simpler |

---

## Write-Through vs Cache-Aside

| | Cache-Aside | Write-Through |
|---|-------------|---------------|
| Write speed | Faster (DB only) | Slower (DB + cache) |
| Read after write | Miss until refill | Hit immediately |
| Stale risk | If invalidation missed | Lower |
| Complexity | Invalidation logic | Dual-write logic |
| Popularity | Most common | Specific use cases |

---

## Summary

Write-through updates **cache and database together** on every write — keeping them synchronized. Reads are always fresh after writes, but writes cost more and may cache unused data. Use when post-write read consistency matters; prefer cache-aside for general workloads.

---

[Next: Write-Back Cache →](./07-write-back-cache.md)
