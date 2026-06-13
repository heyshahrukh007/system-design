# Cache Problems

[← Distributed Cache](./10-distributed-cache.md) | [Day 7 Index](./README.md) | [Next: Other Patterns →](./12-other-patterns-and-best-practices.md)

## Overview

Caching fails in predictable ways at scale. Three classic problems appear in interviews and production:

| Problem | One-Line Description |
|---------|---------------------|
| **Cache Stampede** | Many requests miss at once → DB overwhelmed |
| **Cache Penetration** | Queries for non-existent keys bypass cache forever |
| **Cache Avalanche** | Cache dies or mass expiry → DB traffic spike |

---

## Cache Stampede (Thundering Herd)

### What Is It?

A popular cache key **expires** (or cold start). **Thousands of requests** miss simultaneously — all hit the database at once.

```
12:00:00  product:viral-item TTL expires
12:00:01  10,000 requests → cache MISS
12:00:01  10,000 identical DB queries
12:00:02  Database overloaded → timeouts for everyone
```

### How to Prevent

| Fix | How |
|-----|-----|
| **Lock / singleflight** | One request rebuilds cache; others wait |
| **TTL jitter** | Spread expirations — not all keys expire together |
| **Never expire hot keys** | Background refresh before expiry |
| **Probabilistic early refresh** | Refresh at 90% of TTL randomly |
| **Stale-while-revalidate** | Serve stale while one worker refreshes |

```python
def get_with_lock(key):
    val = redis.get(key)
    if val:
        return val

    lock_key = f"lock:{key}"
    if redis.set(lock_key, "1", nx=True, ex=10):   # acquire lock
        try:
            val = db.load(key)
            redis.setex(key, 3600, val)
            return val
        finally:
            redis.delete(lock_key)
    else:
        time.sleep(0.05)   # wait for other thread
        return redis.get(key) or db.load(key)
```

**Singleflight:** Go's `singleflight` package; Java Guava; same pattern everywhere.

---

## Cache Penetration

### What Is It?

Requests for **data that doesn't exist** — invalid user IDs, malicious scans. Cache never stores misses → **every request hits DB**.

```
Attacker: GET /user/-1, /user/-2, ... /user/-999999
Cache:    never stores "not found" (or short TTL)
DB:       queried every time
```

### How to Prevent

| Fix | How |
|-----|-----|
| **Cache null results** | Store empty marker with short TTL |
| **Input validation** | Reject invalid IDs before cache/DB |
| **Bloom filter** | Fast "definitely doesn't exist" check |
| **Rate limiting** | Block abusive IPs |

```python
def get_user(user_id):
    if user_id <= 0:
        return None   # validate first

    key = f"user:{user_id}"
    val = redis.get(key)
    if val == "NULL":          # cached negative result
        return None
    if val:
        return json.loads(val)

    user = db.load(user_id)
    if user is None:
        redis.setex(key, 60, "NULL")   # cache miss for 60 sec
        return None

    redis.setex(key, 3600, json.dumps(user))
    return user
```

**Bloom filter:** probabilistic structure — "user 99999 definitely not in DB" → reject without DB call. Small false positive rate possible.

---

## Cache Avalanche

### What Is It?

**Large-scale cache failure** — Redis cluster down, network partition, or mass simultaneous expiry — causing **huge DB traffic spike**.

```
Scenarios:
  - Redis restart → empty cache → all requests miss
  - Redis OOM crash → same
  - Power failure → cache layer gone
  - Thousands of keys expire at midnight (no jitter)

Result: DB receives 100× normal load → cascade failure
```

### How to Prevent

| Fix | How |
|-----|-----|
| **High availability Redis** | Sentinel, Cluster, managed service |
| **Circuit breaker** | Stop hitting DB if overload detected |
| **Request coalescing** | Same as stampede locks |
| **TTL jitter** | Avoid synchronized expiry |
| **Graceful degradation** | Return default/stale response if DB slow |
| **Warm cache on startup** | Preload hot keys before taking traffic |
| **Multi-layer cache** | L1 local cache absorbs some miss storm |

```
Circuit breaker:
  DB error rate > 50% → stop querying DB for 30 sec
  → return 503 or cached stale data
  → DB recovers
```

---

## Problem Comparison

| | Stampede | Penetration | Avalanche |
|---|----------|-------------|-----------|
| **Trigger** | Hot key expires | Invalid/non-existent keys | Cache layer failure |
| **Scope** | One or few keys | Many unique bad keys | Entire cache |
| **DB impact** | Spike on one query | Steady drain | Total overload |
| **Main fix** | Lock, jitter, refresh | Cache nulls, bloom filter | HA, circuit breaker, warm-up |

---

## Hot Key Problem *(related)*

One key gets **disproportionate traffic** — beyond even one Redis node.

```
Celebrity tweet link: product:999 gets 100K req/sec
Single Redis node: max ~100K ops/sec → saturated
```

| Fix | Detail |
|-----|--------|
| **Local cache** | Each app caches hot key in memory |
| **Read replicas** | Redis read replicas for hot key reads |
| **Key splitting** | `product:999:copy1`, `:copy2` — random read |
| **CDN** | Move to edge if response is identical |

---

## Big Key Problem *(related)*

Single cache value too large (multi-MB JSON).

```
Slow to serialize/deserialize
Blocks Redis (single-threaded)
Evicts many small keys
```

Fix: split into smaller keys, compress, or don't cache — store reference only.

---

## Prevention Checklist

- [ ] TTL jitter on all bulk TTL keys
- [ ] Lock/singleflight on hot key miss path
- [ ] Cache null/negative results for invalid lookups
- [ ] Input validation before DB
- [ ] Redis HA (replica + failover)
- [ ] Circuit breaker on DB when errors spike
- [ ] Cache warm-up after deploy or Redis restart
- [ ] Monitor hit rate, evictions, DB QPS correlation
- [ ] Alert on sudden hit rate drop

---

## Summary

**Stampede:** many misses on same key — use locks, jitter, proactive refresh. **Penetration:** non-existent keys never cache — cache nulls and bloom filters. **Avalanche:** entire cache fails — HA Redis, circuit breakers, warm-up. Know all three for interviews and production.

---

[Next: Other Patterns & Best Practices →](./12-other-patterns-and-best-practices.md)
