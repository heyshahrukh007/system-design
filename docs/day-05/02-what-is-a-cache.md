# What Is a Cache?

[← Why Caching](./01-why-caching.md) | [Day 5 Index](./README.md) | [Next: Where to Place Cache →](./03-where-to-place-cache.md)

## What Is a Cache?

A **cache** is a temporary store of data copied from a slower source, kept in fast storage for quicker access on future reads.

```
Source of truth (slow):     Database, file system, external API
Cache (fast):               RAM — Redis, Memcached, in-process map
```

Key word: **temporary**. Cache is a performance optimization, not the authoritative record.

---

## Where Is Cached Data Stored?

| Cache Type | Storage Location |
|------------|------------------|
| Browser cache | User's device (disk + memory) |
| CDN cache | Edge server RAM/disk (near user) |
| Reverse proxy cache | Nginx/Varnish server memory |
| Application cache | Redis/Memcached server RAM |
| In-process cache | App server JVM/Node heap |
| DB buffer pool | Database server RAM ([Day 4](../day-04/01-storage-basics.md)) |

All caches aim for **fast media** — almost always memory (RAM), sometimes SSD at the edge.

---

## Is Cache a Database?

**No — but they overlap in storing data.**

| | Cache | Database |
|---|-------|----------|
| **Purpose** | Speed up reads | Store data durably |
| **Durability** | Can lose data on restart | Persisted to disk (ACID) |
| **Size** | Limited (RAM expensive) | Terabytes+ |
| **Queries** | Key lookup only (usually) | SQL, joins, transactions |
| **Source of truth** | No — copy of data | Yes |
| **Eviction** | Old entries removed automatically | Data kept until deleted |

```
Cache answers:  "Do I have a recent copy of X?"
Database answers: "What is the true value of X?"
```

If Redis crashes and loses cache — app is slower but **data still exists in DB**.  
If PostgreSQL crashes without backup — **data is lost**. Different responsibilities.

---

## Why Is Cache Usually in Memory?

| Reason | Detail |
|--------|--------|
| **Speed** | RAM latency ~100 ns vs SSD ~150 μs |
| **Simple access model** | Key → value hash map in RAM is O(1) |
| **Acceptable loss** | Cache can be rebuilt from DB on restart |
| **Cost trade-off** | RAM is expensive per GB — only store hot data |

```
1 GB RAM cache  →  holds millions of small keys
1 GB on SSD     →  1000× slower reads, used for larger/colder CDN assets
```

Some CDN edge nodes use **SSD + RAM** — hot keys in RAM, larger assets on SSD.

---

## Cache Entry Anatomy

Every cache item typically has:

```
Key:    "product:12345"
Value:  { "name": "Widget", "price": 29.99 }   (serialized bytes)
TTL:    3600 seconds                             (optional expiry)
```

The **key** is how you find data. The **value** is the cached copy. **TTL** controls how long it stays valid.

---

## Cache Hit vs Cache Miss

| Term | Meaning |
|------|---------|
| **Hit** | Key found in cache → return immediately |
| **Miss** | Key not in cache → fetch from source, store, return |
| **Hit rate** | hits / (hits + misses) — key health metric |

```
Target hit rate for hot paths: 90–99%
Hit rate 50% → cache may be misconfigured (wrong keys, TTL too short)
```

---

## Volatility — What Happens on Restart?

```
Redis restart (no persistence):
  → cache empty
  → all requests miss temporarily
  → DB load spike (cache avalanche risk)
  → cache refills over minutes

Redis with AOF/RDB persistence:
  → most keys restored
  → faster warm-up
```

Cache is **designed to be rebuildable**. Plan for cold starts.

---

## Summary

A cache is a **temporary, fast, in-memory copy** of data from a slower source. It's not a database — it doesn't replace durable storage. It exists purely to make repeated reads cheap. Understanding hit/miss and volatility sets up every pattern in the rest of Day 5.

---

[Next: Where to Place Cache →](./03-where-to-place-cache.md)
