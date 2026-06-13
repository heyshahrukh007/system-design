# Cache Invalidation

[← Write-Back](./07-write-back-cache.md) | [Day 7 Index](./README.md) | [Next: TTL →](./09-ttl.md)

> *"There are only two hard things in computer science: cache invalidation and naming things."*

If cache holds old data, users see **wrong prices**, **old profiles**, **stale permissions**. Invalidation is how you remove or refresh stale entries.

---

## What Happens If Cache Contains Old Data?

```
1. Product price in DB:  $29.99 → updated to $19.99
2. Cache still has:      $29.99 (TTL not expired, no invalidation)
3. User sees:            $29.99 on website
4. User checks out:      charged $19.99 from DB

→ angry user, support ticket, trust lost
```

Stale cache = **logical bug**, not infrastructure glitch.

---

## Why Is Cache Invalidation Considered Hard?

| Challenge | Detail |
|-----------|--------|
| **Multiple cache layers** | Browser, CDN, Redis — must invalidate all |
| **Multiple app servers** | In-process cache on each instance |
| **Distributed systems** | Service A updates DB, Service B holds cache |
| **Race conditions** | Read during write → repopulate stale value |
| **Missed invalidation bugs** | One code path forgets DELETE |
| **TTL vs immediate** | TTL alone = stale window exists |

```
Update product in admin panel:
  ✓ Redis invalidated
  ✗ CDN still has old JSON for 1 hour
  ✗ User's browser still has old page

All layers must be considered.
```

---

## How Do We Remove Stale Data?

Three main methods — often **combined**:

### 1. TTL (Time To Live)

Auto-expire after N seconds. See [09-ttl.md](./09-ttl.md).

```
Pros: simple, self-healing
Cons: stale data until expiry
```

### 2. Explicit Deletion

Delete cache key when source data changes.

```python
def update_product(id, data):
    db.update(id, data)
    redis.delete(f"product:{id}")
    redis.delete(f"products:list:*")   # related keys if needed
```

```
Pros: immediate freshness
Cons: must remember every write path
```

### 3. Event-Based Invalidation

Publish event on change; cache listeners invalidate.

```
Product Service: UPDATE product → publish "product.updated" {id: 123}
Cache Worker:    subscribe → DELETE product:123
CDN:             purge URL via API
```

```
Pros: decoupled, works across microservices
Cons: eventual (small lag), infrastructure needed
```

---

## Invalidation Strategies

| Strategy | Mechanism | Staleness Window |
|----------|-----------|------------------|
| **TTL only** | Wait for expiry | 0 to TTL seconds |
| **Delete on write** | Immediate key delete | ~0 (next read refills) |
| **Update on write** | Set new value in cache | 0 if done correctly |
| **Version in key** | `product:v3:123` — bump version | 0 for new reads |
| **Stale-while-revalidate** | Serve stale, refresh async | User sees old briefly |

### Version Bump Pattern

```
Don't delete — change the key namespace:

Before deploy: cache key product:v1:12345
After deploy:  cache key product:v2:12345

Old entries expire naturally via TTL — no hunt for every key
```

---

## Cache-Aside Invalidation (Most Common)

```python
# READ
def get(key):
    val = cache.get(key)
    if val: return val
    val = db.get(key)
    cache.set(key, val, ttl=3600)
    return val

# WRITE — must invalidate
def update(key, data):
    db.update(key, data)
    cache.delete(key)          # critical line
```

**Bug:** forgetting `cache.delete()` on one of five update endpoints → stale data forever (until TTL).

---

## Race Condition: Read During Write

```
Thread A: UPDATE DB price → $19.99
Thread B: cache MISS → read DB ($19.99) → SET cache $19.99   ✓
Thread C: cache MISS → read DB (old?) → SET cache $29.99      ✗

Or worse:
Thread A: DELETE cache
Thread B: cache MISS → read OLD replica → SET stale value
Thread A: UPDATE DB
```

**Fixes:**

```
1. Delete cache AFTER DB commit (not before)
2. Use short TTL as safety net
3. Use distributed lock during invalidation
4. Read from primary DB on cache miss (not replica)
```

---

## Multi-Layer Invalidation Checklist

When data changes, consider:

- [ ] Redis / application cache — `DELETE key`
- [ ] CDN — purge URL or tag (`CDN-Cache-Tag: product-123`)
- [ ] In-process cache — broadcast invalidation or short TTL
- [ ] Browser — `Cache-Control: no-cache` on dynamic pages, or versioned asset URLs

---

## Stale-While-Revalidate

Serve stale cache while fetching fresh data in background.

```http
Cache-Control: max-age=60, stale-while-revalidate=300
```

User gets instant (stale) response; next request gets fresh data. Good for CDNs and low-risk content.

---

## Summary

Cache invalidation removes stale data via **TTL**, **explicit deletion**, or **events**. It's hard because multiple layers and code paths must stay in sync. Always invalidate on write in cache-aside, delete **after** DB commit, and use TTL as a safety net — not the only strategy.

---

[Next: TTL →](./09-ttl.md)
