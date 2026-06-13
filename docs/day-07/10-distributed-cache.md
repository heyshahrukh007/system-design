# Distributed Cache

[← TTL](./09-ttl.md) | [Day 7 Index](./README.md) | [Next: Cache Problems →](./11-cache-problems.md)

## Why Distributed Cache?

A single app server can cache in local memory — but **multiple servers can't share it**.

```
App Server 1: local cache has product:123
App Server 2: local cache empty → DB query again

User hits Server 1 → fast
User hits Server 2 → slow (different cache)
Load balancer rotates → inconsistent experience
```

**Distributed cache** = one shared cache cluster all app servers connect to.

```
App Server 1 ──┐
App Server 2 ──┼──▶ Redis Cluster (shared)
App Server 3 ──┘
```

---

## Centralized vs Distributed Cache

### Centralized (Single Redis Node)

```
All apps → one Redis server → RAM (e.g. 16 GB)
```

| Pros | Cons |
|------|------|
| Simple setup | Single point of failure |
| Easy to reason about | RAM ceiling on one machine |
| Low latency (one hop) | All traffic through one node |

Good for: startups, moderate traffic, dev/staging.

### Distributed (Redis Cluster / Sharded)

```
Data sharded across multiple Redis nodes:

key "user:1"   → hash slot → Node A
key "user:2"   → hash slot → Node B
key "product:5"→ hash slot → Node C
```

| Pros | Cons |
|------|------|
| Horizontal scale | More operational complexity |
| Larger total memory | Multi-key operations harder |
| Higher throughput | Client must support cluster protocol |

Good for: large scale, hot keys spread across nodes.

---

## What If One Redis Server Becomes Full?

| Strategy | Detail |
|----------|--------|
| **Eviction policy** | Redis removes least-used keys (LRU, LFU) |
| **Increase memory** | Vertical scale — bigger instance |
| **Add shards** | Redis Cluster — split keyspace |
| **Reduce TTL** | Keys expire faster → free space |
| **Cache less** | Don't cache cold data |
| **Compress values** | Smaller payloads (JSON → MessagePack) |

```redis
# Redis eviction policies (maxmemory-policy)
allkeys-lru     # evict least recently used keys
volatile-lru    # evict LRU keys with TTL set
noeviction      # return errors when full (dangerous in prod)
```

Monitor memory: alert at 80% `used_memory`.

---

## What If Redis Crashes?

| Scenario | Impact | Mitigation |
|----------|--------|------------|
| **No persistence** | All cache lost | Cache-aside refills from DB; DB spike (avalanche) |
| **RDB snapshots** | Lose since last snapshot | Point-in-time recovery |
| **AOF (append-only file)** | Minimal loss | Replay log on restart |
| **Redis Sentinel** | Auto failover to replica | High availability |
| **Redis Cluster + replicas** | Replica promoted | Production standard |

```
Production Redis:
  Primary + Replica(s) + Sentinel or managed (ElastiCache, Redis Cloud)
  persistence: AOF every sec OR RDB + AOF
```

App should **degrade gracefully** — Redis down → read DB directly (slower, not down).

---

## How Do Multiple Application Servers Share Cache?

```
1. All apps use same Redis URL:
   REDIS_URL=redis://cache.internal:6379

2. All apps use same key naming:
   product:12345  (not server1:product:12345)

3. Connection pooling per app instance:
   pool_size=20 per server

4. Shared invalidation:
   Any server updates DB → DELETE key in Redis
   All servers see invalidation immediately
```

```python
# Same code on every app server
redis = Redis.from_url(os.environ["REDIS_URL"])

def get_product(id):
    key = f"product:{id}"
    ...
```

---

## Replication for Cache

```
        ┌─────────────┐
        │ Redis Primary│  ← writes
        └──────┬──────┘
               │ replication
        ┌──────┴──────┐
        ▼             ▼
   ┌─────────┐  ┌─────────┐
   │ Replica1│  │ Replica2│  ← reads (optional)
   └─────────┘  └─────────┘
```

| Use | Detail |
|-----|--------|
| **Read replicas** | Scale read throughput from cache |
| **Failover** | Primary dies → replica promoted |
| **Backups** | Snapshot from replica |

Note: Redis replication is **async** — brief data loss possible on failover (usually acceptable for cache).

---

## Redis — The Standard Tool

| Feature | Use in Caching |
|---------|----------------|
| **Strings** | Simple key-value (JSON blobs) |
| **Hashes** | Object fields without full serialize |
| **Lists / Sets** | Collections, tags |
| **Sorted Sets** | Leaderboards, rate limits |
| **TTL** | Built-in `SETEX`, `EXPIRE` |
| **Pub/Sub** | Invalidation broadcasts |
| **Lua scripts** | Atomic read-modify-write |
| **Cluster** | Horizontal sharding |

### Redis vs Memcached

| | Redis | Memcached |
|---|-------|-----------|
| Structures | Rich (lists, sets, etc.) | Strings only |
| Persistence | Optional | None |
| Replication | Yes | No |
| Cluster | Redis Cluster | Client-side sharding |
| Default choice today | **Yes** | Legacy simple caches |

---

## Local + Distributed (Two-Level Cache)

```
Request
  → L1: in-process cache (microseconds)
  → L2: Redis (milliseconds)
  → L3: Database (milliseconds–seconds)
```

```python
local_cache = TTLCache(maxsize=1000, ttl=60)

def get_product(id):
    if id in local_cache:
        return local_cache[id]

    data = redis.get(f"product:{id}")
    if data:
        local_cache[id] = data
        return data

    data = db.load(id)
    redis.setex(f"product:{id}", 3600, data)
    local_cache[id] = data
    return data
```

Invalidate both L1 and L2 on write — or keep L1 TTL very short.

---

## Monitoring

| Metric | Target |
|--------|--------|
| **Hit rate** | > 90% for hot keys |
| **Memory usage** | < 80% maxmemory |
| **Evicted keys/sec** | Low — high means undersized |
| **Connected clients** | Within limits |
| **Replication lag** | < 1 second |
| **Latency p99** | < 2 ms for GET |

```redis
INFO stats    # keyspace_hits, keyspace_misses
# hit_rate = hits / (hits + misses)
```

---

## Summary

Distributed cache (usually **Redis**) lets all app servers share one fast data store. Scale with **cluster sharding** when memory or throughput limits hit. Use **replication** for failover. Plan for Redis crashes — persistence, replicas, and graceful DB fallback. Monitor **hit rate** and memory.

---

[Next: Cache Problems →](./11-cache-problems.md)
