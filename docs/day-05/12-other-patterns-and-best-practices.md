# Other Patterns & Best Practices

[← Cache Problems](./11-cache-problems.md) | [Day 5 Index](./README.md)

Additional patterns that extend cache-aside, write-through, and write-back in production systems.

---

## Read-Through Cache

Cache library loads data on miss — app doesn't touch DB directly.

```
Application → cache.get(key)
                  │
              hit → return
              miss → cache loads from DB internally → store → return
```

| vs Cache-Aside | Read-Through |
|----------------|--------------|
| App writes to DB on miss | Cache service writes to DB on miss |
| More app code | Cleaner app code |
| More control | Less control |

Used by: caching frameworks, CDN origin fetch, ORM second-level cache.

---

## Refresh-Ahead (Proactive Loading)

Refresh cache **before** expiry — users never see miss.

```
Key TTL = 60 min
At 54 min (90%): background job refreshes from DB
User at 59 min: still cache HIT (fresh data)
User at 61 min: still HIT (already refreshed)
```

```
while True:
    for key in hot_keys:
        ttl = redis.ttl(key)
        if ttl < 360:   # less than 6 min left on 1-hour TTL
            refresh(key)
    sleep(60)
```

Prevents stampede on hot keys. Used for homepage, viral products, config.

---

## Cache Warming (Preloading)

Populate cache **before** traffic hits — after deploy or Redis restart.

```
Deploy new version:
  1. Start app servers
  2. Run warm-up script:
       top_products = db.query("SELECT id FROM products ORDER BY sales LIMIT 1000")
       for id in top_products:
           cache_product(id)
  3. Enable load balancer traffic
```

Prevents **cold start avalanche**. Automate in CI/CD or startup hook.

---

## Stale-While-Revalidate

Serve stale data immediately; refresh in background.

```http
Cache-Control: max-age=60, stale-while-revalidate=300
```

```
0–60 sec:     fresh — serve from cache
60–360 sec:   stale but serve immediately + async revalidate
360+ sec:     must fetch fresh (or treat as miss)
```

Great for CDNs and low-risk API responses. Users never wait on miss.

---

## Pattern Comparison Table

| Pattern | Read | Write | Consistency | Complexity |
|---------|------|-------|-------------|------------|
| **Cache-aside** | App manages | Invalidate cache | Good + TTL | Low |
| **Read-through** | Cache loads DB | App writes DB | Good + TTL | Medium |
| **Write-through** | Cache first | Sync cache + DB | Strong | Medium |
| **Write-back** | Cache first | Async to DB | Eventual | High |
| **Refresh-ahead** | Proactive refresh | N/A | Fresh | Medium |
| **Stale-while-revalidate** | Serve stale + bg refresh | HTTP headers | Eventual | Low (CDN) |

**Default:** cache-aside + TTL + invalidation on write.  
**Add:** refresh-ahead for hot keys, read-through if using a cache framework.

---

## Consistency Spectrum

```
Strongest ◀────────────────────────────────────▶ Weakest

No cache    Write-through    Cache-aside +     TTL only    Write-back
            + invalidation   invalidation
```

Match pattern to business requirement — bank transfer vs blog post.

---

## HTTP Caching (Browser & CDN Layer)

Application Redis is not the only cache. HTTP headers control edge and browser:

```http
# Static asset — cache 1 year (filename has hash)
Cache-Control: public, max-age=31536000, immutable

# API — CDN 5 min, browser must revalidate
Cache-Control: public, max-age=0, s-maxage=300

# Private user data — no CDN
Cache-Control: private, no-store

# Revalidate with ETag
ETag: "v3-abc123"
If-None-Match: "v3-abc123"  → 304 Not Modified (no body)
```

See [03-where-to-place-cache.md](./03-where-to-place-cache.md) and [Day 3: CDN](../day-03/05-cdn.md).

---

## Cache Monitoring Dashboard

Track these in production:

| Metric | Alert If |
|--------|----------|
| Hit rate | Drops > 10% suddenly |
| Miss rate spike | Stampede or avalanche starting |
| Redis memory | > 85% maxmemory |
| Evictions/sec | Sustained high |
| GET latency p99 | > 5 ms |
| DB QPS vs cache hit rate | DB up, hit rate down — cache broken |
| Error rate on cache client | Connection failures |

```
hit_rate = keyspace_hits / (keyspace_hits + keyspace_misses)

Target: 95%+ for intentionally cached endpoints
```

---

## Quick Reference

| Question | Answer |
|----------|--------|
| Why cache? | Reduce latency and DB load |
| Default pattern? | Cache-aside |
| How invalidate? | TTL + delete on write + events |
| Stampede? | Lock, jitter, refresh-ahead |
| Penetration? | Cache nulls, bloom filter |
| Avalanche? | HA Redis, circuit breaker, warm-up |
| Redis vs DB? | Cache = fast copy; DB = source of truth |
| Bank balance? | Don't cache for transactions |
| Product catalog? | Cache with TTL + invalidation |

---

[← Cache Problems](./11-cache-problems.md) | [Day 5 Index](./README.md)
