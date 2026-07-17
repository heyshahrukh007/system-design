# What Data Should Be Cached?

[← Where to Place Cache](./03-where-to-place-cache.md) | [Day 5 Index](./README.md) | [Next: Cache-Aside →](./05-cache-aside-pattern.md)

## The Decision Rule

> **Cache frequently read, rarely changed data.**

If data is read 1000× per write, caching pays off.  
If data changes every read, caching hurts more than it helps.

---

## Should User Profile Data Be Cached?

**Usually yes — with a short TTL and invalidation on update.**

```
Read pattern:  profile viewed on every page load
Write pattern: user updates profile rarely (once a month?)

Cache key:  user:profile:{user_id}
TTL:        15–60 minutes
On update:  DELETE cache key immediately
```

| Cache? | Yes |
|--------|-----|
| Why | High read ratio, moderate staleness OK for display name/avatar |
| Caveat | Invalidate on write; don't cache if sub-second freshness required |

```python
def update_profile(user_id, data):
    db.update(user_id, data)
    redis.delete(f"user:profile:{user_id}")   # invalidate
```

---

## Should Bank Balances Be Cached?

**Generally no — for transactions. Maybe yes — for display only.**

```
Transfer $500:
  → MUST read current balance from DB (with row lock)
  → NEVER use cached balance — double-spend risk

Dashboard "approximate balance" widget:
  → MAY cache 30 seconds for display
  → Label as approximate OR accept brief staleness
```

| Use Case | Cache? |
|----------|--------|
| Execute withdrawal | **No** — strong consistency required |
| Show balance on dashboard | Maybe — 10–30 sec TTL, invalidate on txn |
| Monthly statement generation | Read from DB (batch, not latency-sensitive) |

**Rule:** If stale data causes **financial or safety errors**, don't cache — or cache with strict invalidation and locks on write path.

---

## Should Product Catalogs Be Cached?

**Yes — classic caching use case.**

```
Read pattern:  millions of product page views
Write pattern: price/stock changes occasionally (or via separate inventory service)

Cache key:  product:{id}, products:category:{slug}:page:{n}
TTL:        1–6 hours (catalog), 1–5 min (price if no invalidation)
On update:  DELETE product:{id} when admin changes product
```

| Cache? | Yes |
|--------|-----|
| Why | Read-heavy, changes infrequent relative to views |
| Pattern | Cache-aside + event invalidation on admin update |

E-commerce sites often cache **90%+ of catalog reads**.

---

## Decision Framework

Ask these questions for any data:

| Question | Cache if... |
|----------|-------------|
| How often is it read vs written? | Reads >> writes |
| Is stale data acceptable? | Yes, even briefly |
| Is it shared across users? | Yes — one cache entry serves many |
| Is it expensive to compute? | Yes — DB join, external API, ML inference |
| Does wrong value cause harm? | No — or harm is acceptable |

```
Score mostly "Cache if Yes" → cache it
Any "wrong value causes harm" → don't cache (or cache display copy only)
```

---

## Good Candidates

| Data | TTL | Notes |
|------|-----|-------|
| Product catalog | 1–6 hours | Invalidate on admin change |
| Category tree | 24 hours | Rarely changes |
| Config / feature flags | 5–15 min | Or push invalidation |
| Static CMS content | 1 hour+ | Blog posts, FAQ |
| Search suggestions | 10 min | Popular queries |
| API rate limit counters | 1 min window | Redis INCR |
| Computed aggregates | 5–30 min | "Top 10 products today" |
| Third-party API responses | Per provider ToS | Weather, exchange rates |

---

## Bad Candidates

| Data | Why Not |
|------|---------|
| Bank balance (for transfers) | Consistency critical |
| One-time tokens / OTP | Single use, no reuse |
| Real-time stock for high-demand sale | Staleness = overselling |
| Unique per-request analytics | Never read twice |
| Large personalized feeds | Low reuse across users |
| Secrets, passwords | Security risk in shared cache |

---

## Cache Key Design

Good keys prevent collisions and enable targeted invalidation.

```
Pattern:  {service}:{entity}:{id}:{variant}

product:12345
product:12345:details
products:category:electronics:page:2
user:789:profile
session:abc123
```

| Rule | Example |
|------|---------|
| Namespace by domain | `order:` not bare `12345` |
| Include version if schema changes | `product:v2:12345` |
| Avoid unbounded keys | Don't cache `search:{任意query}` without limit |
| Document key conventions | Team wiki / code constants |

---

## Personalized vs Shared Cache

```
Shared (high hit rate):
  product:12345  → same for all users → 1M views, 1 cache entry

Personalized (low hit rate):
  feed:user:789  → unique per user → poor cache efficiency

For personalized data:
  cache sub-components (friend list, not full feed)
  or accept lower hit rate with shorter TTL
```

---

## Summary

Cache **frequently read, rarely changed** data: product catalogs, profiles (with invalidation), config, static content. Avoid caching **consistency-critical** data like balances used for transactions. Design **clear cache keys** and decide shared vs personalized before choosing TTL.

---

[Next: Cache-Aside Pattern →](./05-cache-aside-pattern.md)
