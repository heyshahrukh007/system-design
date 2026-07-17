# TTL (Time To Live)

[← Cache Invalidation](./08-cache-invalidation.md) | [Day 5 Index](./README.md) | [Next: Distributed Cache →](./10-distributed-cache.md)

## What Is TTL?

**TTL (Time To Live)** is the duration a cache entry remains valid before automatic expiration.

```
redis.setex("product:123", 3600, data)   # expires in 3600 seconds (1 hour)

After 1 hour:
  key deleted automatically
  next read → cache miss → reload from DB
```

TTL is a **safety net** — even if invalidation code has bugs, stale data eventually disappears.

---

## Why Expire Cache Automatically?

| Reason | Detail |
|--------|--------|
| **Limit staleness** | Data refreshes periodically even without invalidation |
| **Free memory** | Old unused keys evicted |
| **Self-healing** | Bug missed invalidation → TTL fixes it eventually |
| **Unknown change sources** | External system changes data — TTL picks it up |

```
Without TTL:
  Key set once → lives forever → never refreshes

With TTL:
  Key expires → miss → fresh data loaded
```

---

## When Should TTL Be Short?

Use **short TTL** (seconds to minutes) when:

| Scenario | Example TTL |
|----------|-------------|
| Data changes frequently | Live sports scores → 10–30 sec |
| Staleness is costly | Stock price display → 5–60 sec |
| Safety net for invalidation | User profile → 5–15 min |
| High-risk wrong data | Inventory count → 30 sec – 2 min |
| External API proxy | Weather → 5 min |

```
Short TTL = fresher data, lower hit rate, more DB load
```

Trade-off: **freshness vs hit rate**.

---

## When Should TTL Be Long?

Use **long TTL** (hours to days) when:

| Scenario | Example TTL |
|----------|-------------|
| Rarely changes | Country list → 24 hours |
| Static assets | JS/CSS with version in URL → 1 year |
| Expensive to compute | ML model output → 6 hours |
| Invalidation handles updates | Product catalog → 6 hours + delete on admin edit |
| Low risk if stale | Blog post content → 1 hour |

```
Long TTL = high hit rate, less DB load, longer stale window if invalidation fails
```

**Best practice:** long TTL **plus** explicit invalidation on write.

---

## TTL Examples by Data Type

| Data | Recommended TTL | Notes |
|------|-----------------|-------|
| Weather | 5 minutes | Changes slowly |
| User profile | 15–60 minutes | + invalidate on update |
| Product catalog | 1–6 hours | + invalidate on admin change |
| Session token | 30 minutes – 24 hours | Match auth policy |
| Static content (CDN) | 24 hours – 1 year | Version filename for bust |
| Config / feature flags | 1–5 minutes | Or push invalidation |
| API rate limit window | 1 minute | Sliding window counters |
| Search trending | 5–10 minutes | Acceptable delay |
| Bank balance (display) | 0–30 seconds | Or don't cache |
| OTP / one-time token | Do not cache | Single use |

---

## TTL vs Explicit Invalidation

| TTL Alone | Invalidation Alone | Both Together |
|-----------|-------------------|-----------------|
| Simple | Immediate freshness | **Recommended** |
| Stale until expiry | Bug = stale forever | Invalidation for speed, TTL for safety |
| Good for low-risk | Good for high-risk | Production standard |

```python
redis.setex(f"product:{id}", 3600, data)   # 1 hour TTL

def update_product(id, data):
    db.update(id, data)
    redis.delete(f"product:{id}")          # immediate + TTL backup
```

---

## TTL Jitter (Prevent Thundering Herd)

If 1000 keys set at same time with TTL=3600, all expire together → **cache stampede**.

```
Fix: add random jitter

base_ttl = 3600
jitter = random.randint(0, 300)    # 0–5 min random
redis.setex(key, base_ttl + jitter, data)
```

Spreads expirations over time. See [11-cache-problems.md](./11-cache-problems.md).

---

## HTTP TTL (Browser & CDN)

TTL also applies at HTTP layer via headers:

```http
Cache-Control: max-age=3600           # browser caches 1 hour
Cache-Control: s-maxage=86400         # CDN caches 24 hours
Cache-Control: max-age=60, stale-while-revalidate=300
```

| Header | Who Respects It |
|--------|-----------------|
| `max-age` | Browser + CDN |
| `s-maxage` | CDN only (overrides max-age for shared caches) |
| `no-store` | Never cache |
| `private` | Browser only, not CDN |

---

## Monitoring TTL Effectiveness

```
If hit rate low:
  → TTL too short OR keys too diverse OR traffic too cold

If stale data complaints:
  → TTL too long AND invalidation missing

Sweet spot:
  → high hit rate + acceptable staleness for business
```

---

## Summary

TTL auto-expires cache entries after a set time. Use **short TTL** for volatile or sensitive data; **long TTL** for stable data with invalidation on change. Combine TTL with explicit invalidation, and add **jitter** to prevent mass expiry. TTL is a safety net — not a substitute for proper invalidation on writes.

---

[Next: Distributed Cache →](./10-distributed-cache.md)
