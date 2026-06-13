# Cache-Aside Pattern

[← What to Cache](./04-what-to-cache.md) | [Day 7 Index](./README.md) | [Next: Write-Through →](./06-write-through-cache.md)

## What Is Cache-Aside?

Also called **lazy loading**. The **application** manages the cache — not the database, not the cache library automatically.

```
Read path:
  1. App checks cache
  2. HIT  → return data
  3. MISS → read from DB → write to cache → return data

Write path:
  1. App writes to DB
  2. App invalidates (or updates) cache
```

The cache sits **aside** from the main data path — you explicitly code both sides.

---

## Flow Diagram

```
                    ┌─────────────┐
                    │ Application │
                    └──────┬──────┘
                           │
                    Check Cache
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
           HIT ──────────────────▶ Return data
              │
           MISS
              │
              ▼
         DB Query
              │
              ▼
      Store in Cache (with TTL)
              │
              ▼
         Return data
```

---

## What Happens on Cache Hit?

```
GET product:12345

1. redis.get("product:12345")  →  found
2. Deserialize JSON
3. Return to client

DB queries: 0
Time: ~1 ms
```

Hit rate drives performance. 99% hit rate = DB sees 1% of traffic.

---

## What Happens on Cache Miss?

```
GET product:12345

1. redis.get("product:12345")  →  nil (not found)
2. db.query("SELECT * FROM products WHERE id = 12345")
3. redis.setex("product:12345", 3600, json.dumps(product))
4. Return to client

DB queries: 1
Time: ~20–50 ms (first request only)
Subsequent requests: hit cache
```

Miss is **self-healing** — cache fills itself on demand.

---

## Write Path (Critical)

Cache-aside does **not** auto-update cache on DB write. You must handle it:

```python
def update_product(product_id, data):
    db.update(product_id, data)
    redis.delete(f"product:{product_id}")    # invalidate — safest

def create_product(data):
    product = db.insert(data)
    # no cache yet — first read will populate
    return product
```

| Strategy on Write | When |
|-------------------|------|
| **Delete cache key** | Default — next read refreshes |
| **Update cache key** | When you have new value in hand |
| **Do nothing** | Only if TTL is very short (risky) |

**Delete > update** for most apps — avoids writing stale partial data.

---

## Why Is This the Most Common Pattern?

| Reason | Detail |
|--------|--------|
| **Simple** | Easy to understand and implement |
| **Flexible** | Works with any DB, any cache |
| **Safe on failure** | Cache down? App reads DB directly |
| **Only cache what's needed** | Cold data never wastes RAM |
| **Industry default** | Redis + PostgreSQL apps worldwide |

Other patterns (write-through, write-back) add complexity — use when you have a specific reason.

---

## Code Example

```python
def get_product(product_id: int) -> dict:
    key = f"product:{product_id}"

    # 1. Try cache
    cached = redis.get(key)
    if cached:
        return json.loads(cached)

    # 2. Cache miss — load from DB
    product = db.fetch_one(
        "SELECT id, name, price FROM products WHERE id = %s",
        product_id,
    )
    if product is None:
        return None

    # 3. Populate cache
    redis.setex(key, 3600, json.dumps(product))

    return product
```

---

## Cache-Aside vs Read-Through

| Cache-Aside | Read-Through |
|-------------|--------------|
| App loads DB on miss | Cache library loads DB on miss |
| App code: `get → miss → db → set` | App code: `cache.get()` only |
| More control | Less boilerplate |

Read-through is covered in [12-other-patterns-and-best-practices.md](./12-other-patterns-and-best-practices.md).

---

## Failure Modes

| Failure | Behavior |
|---------|----------|
| Redis down | Bypass cache, read DB (slower but works) |
| DB down | Cache may serve stale data until TTL expires |
| Race on miss | Two requests miss → two DB queries (use lock for hot keys) |

```python
# Optional: lock on miss for hot keys (anti-stampede)
with redis.lock(f"lock:{key}", timeout=5):
    cached = redis.get(key)
    if cached:
        return cached
    product = db.load(...)
    redis.setex(key, ttl, product)
```

---

## Summary

Cache-aside: app checks cache → on miss loads DB and stores result → on write invalidates cache. It's the **default pattern** because it's simple, resilient, and works everywhere. Always handle writes explicitly — the cache won't sync itself.

---

[Next: Write-Through Cache →](./06-write-through-cache.md)
