# Caching Deep Dive — Answer Key & Explanations (50)

Answer key for [day-05-questions.md](../day-05-questions.md)





---

### Q01

**Answer:** A, D

**Explanation:** Redis speed and a high hit rate reduce latency and database load (B, C). A cache is not the source of truth (C), and data updated on every request would not remain current merely because it was cached (B).

---

### Q02

**Answer:** C, D

**Explanation:** A cache is an ephemeral, refillable copy rather than the authoritative store (B, C). ACID durability belongs to the database (A), and a normal miss can be refilled rather than making data unavailable (B).

---

### Q03

**Answer:** A, D

**Explanation:** Browser and CDN caches should serve versioned assets before the origin (A, B). A load balancer does not replace those caches (B), and fetching the full asset from origin on every visit defeats caching (C).

---

### Q04

**Answer:** A, C

**Explanation:** Authoritative money movement and one-time secrets should not use stale cached values (A, B). Catalog metadata is cacheable with TTL and invalidation (B), while stale flash-sale stock must not authorize purchases (D).

---

### Q05

**Answer:** B, C

**Explanation:** Shared Redis and a common key namespace make sessions available to every pod (B, C). Per-pod memory remains fragile (A), and affinity does not make that memory durable across restarts (D).

---

### Q06

**Answer:** B, C

**Explanation:** Namespaced, stable shared keys improve reuse and operations (A, B). Omitting tenant or variant dimensions risks collisions (A), while unique request keys destroy reuse (D).

---

### Q07

**Answer:** B, D

**Explanation:** Cache-aside has the application load and populate misses, and it can bypass Redis during failure (A, B). It provides neither automatic write synchronization (C) nor immediate freshness from TTL alone (A).

---

### Q08

**Answer:** B, C

**Explanation:** DB first, then delete cache. Delete-before-commit races with stale refill (A). TTL-only for prices is risky (D).

---

### Q09

**Answer:** C, D

**Explanation:** Write-through synchronously updates the cache and database and fits immediate post-write reads (A, C). It wastes work on cold keys (B), especially when writes are high and updated keys are rarely read (A).

---

### Q10

**Answer:** A, B

**Explanation:** Write-back acknowledges cache-first writes and flushes asynchronously, making it fast but weakly consistent (A, B). It is unsuitable as a sole durable path for critical inventory or payments (C, D).

---

### Q11

**Answer:** B, D

**Explanation:** Every serving layer may require invalidation, and TTL alone leaves a stale window (A, D). Delete-before-commit can race with stale refill (A), while an unchanged URL does not force immediate CDN refresh (C).

---

### Q12

**Answer:** C, D

**Explanation:** Volatility-based TTLs and jitter reduce stale windows and synchronized expiry (B, C). Uniform expiration invites stampedes (A), and changing prices need invalidation rather than a long TTL alone (B).

---

### Q13

**Answer:** A, C

**Explanation:** This is a hot-key expiry stampede, and early or background refresh can smooth it (A, B). It is not penetration (D), and a larger connection pool does not prevent synchronized misses (B).

---

### Q14

**Answer:** A, B

**Explanation:** Negative caching and a Bloom filter can prevent repeated database misses (A, B). Disabling edge controls worsens the scan (D), and TTL jitter does not stop invalid-key penetration (C).

---

### Q15

**Answer:** A, B

**Explanation:** An empty cache creates an avalanche, while warm-up and highly available Redis reduce the blast radius (B, C). Cache-aside still shifts load to the database after restart (D), and unlimited retries amplify overload (C).

---

### Q16

**Answer:** C, D

**Explanation:** Redis Cluster provides horizontal sharding, and an L1/L2 design needs explicit coherence controls (A, B). L1 is not automatically shared (B), and `noeviction` returns errors rather than silently applying LRU (A).

---

### Q17

**Answer:** A, C

**Explanation:** Read replicas or key splitting and local caching can spread hot-key reads (A, B). Public content can also use a CDN, so claiming it cannot is false (D); adding shards alone does not split one key (B).

---

### Q18

**Answer:** B, C

**Explanation:** Cache-aside makes the application handle misses, while a CDN origin fetch is analogous to read-through (A, B). Read-through delegates loading to the cache layer rather than manual application code (D), and it does not eliminate database writes (A).

---

### Q19

**Answer:** A, C

**Explanation:** Cacheable public JSON can be served by both browser and CDN caches (A, C). MySQL 8 removed its query cache (D), and Redis remains a derived cache rather than the permanent category or pricing authority (B).

---

### Q20

**Answer:** A, D

**Explanation:** Fast increments and expiring state suit Redis rate limits, and small failover gaps may be acceptable (A, B). Per-pod counters do not enforce one fleet-wide limit (C), and rate limits are not a financial ledger (B).

---

### Q21

**Answer:** A, D

**Explanation:** Cache-aside deletes after a database update, while write-through synchronously updates both stores (A, B). Write-through does not skip the database (C), nor is it a universal default (B).

---

### Q22

**Answer:** B, C

**Explanation:** A short-lived approximate display is acceptable when it cannot authorize financial actions (A, C). Both proposed transfer-authorization uses of cached balance are unsafe (B, D).

---

### Q23

**Answer:** A, B, C

**Explanation:** `private`, long-lived public caching for fingerprinted assets, and `no-store` have the stated meanings (A, B, C). `s-maxage` controls shared caches, not how long a browser must retain a private response (D).

---

### Q24

**Answer:** A, C

**Explanation:** Preload before traffic — warming. Refresh-ahead is ongoing TTL-based (B). Warming does not replace invalidation (D).

---

### Q25

**Answer:** B, C

**Explanation:** Proactive refresh before expiry vs one-time warm-up. Some staleness possible during refresh (D). They differ (A).

---

### Q26

**Answer:** A, C

**Explanation:** Write-through offers strong typical cache consistency, while cache-aside with delete-on-write is a common default (A, C). TTL-only is weak (B), and write-back acknowledges before the asynchronous database flush rather than after a database commit (D).

---

### Q27

**Answer:** A, B, D

**Explanation:** Memory pressure, sudden hit-rate drops, and rising DB QPS signal cache trouble. Low hit rate on cold/uncached paths is expected (C).

---

### Q28

**Answer:** A, B, D

**Explanation:** Split/compress/reference — big keys hurt Redis single thread. Larger keys are not free wins (C).

---

### Q29

**Answer:** A, C, D

**Explanation:** Delete after commit; read primary or version on miss. Delete-before-commit worsens races (B).

---

### Q30

**Answer:** B, C, D

**Explanation:** Breaker protects DB; stale CDN/L1 may help briefly. Unlimited retries amplify outage (A).

---

### Q31

**Answer:** A, B, C

**Explanation:** Conditional requests save bandwidth. ETags complement — not replace — write invalidation (D).

---

### Q32

**Answer:** A, C, D

**Explanation:** SWR trades brief staleness for speed. Not for authoritative financial reads (B).

---

### Q33

**Answer:** B, C, D

**Explanation:** LRU evicts hot keys under pressure. Monitor and tune policy — not perfect hot-key preservation (A).

---

### Q34

**Answer:** A, B, D

**Explanation:** Feature trade-offs between cache engines. Neither auto-syncs with PostgreSQL (C).

---

### Q35

**Answer:** A, B, D

**Explanation:** Miss coalescing saves DB load. Duplicate SET with same value wastes work but need not corrupt (C).

---

### Q36

**Answer:** B, C, D

**Explanation:** Purge plus fingerprinted URLs. Global purge is not always instant (A).

---

### Q37

**Answer:** A, B, C

**Explanation:** Split shared vs per-user caching. One key for full personalized page kills hit rate (D).

---

### Q38

**Answer:** A, B, C

**Explanation:** RDB/AOF durability trade-offs. Redis is not financial ledger (D).

---

### Q39

**Answer:** A, C, D

**Explanation:** Geo placement matters. US-only cache cannot equalize EU latency (B).

---

### Q40

**Answer:** A, C, D

**Explanation:** L1 needs invalidation, pub/sub, or short TTL. No automatic cross-pod coherence (B).

---

### Q41

**Answer:** A, B, D

**Explanation:** Authorize stock from DB with atomic update. TTL alone does not prevent oversell (C).

---

### Q42

**Answer:** A, B, C

**Explanation:** Vary manages cache variants. Authenticated responses often still need `private` (D).

---

### Q43

**Answer:** A, B, D

**Explanation:** SWR OK for low-risk visuals; purge/version critical content. SWR allows staleness (C).

---

### Q44

**Answer:** A, B, D

**Explanation:** Pattern choice is ops and control trade-off. App still owns writes (C).

---

### Q45

**Answer:** B, C, D

**Explanation:** Stagger warm-up/canary; L2 singleflight helps. TTL jitter does not fix simultaneous deploy cold start (A).

---

### Q46

**Answer:** B, C, D

**Explanation:** Cluster slot redirects and hot-key limits. One logical key does not auto-split (A).

---

### Q47

**Answer:** B, C, D

**Explanation:** TLS, minimize PII, managed at-rest encryption. Caching does not remove compliance duties (A).

---

### Q48

**Answer:** A, B, D

**Explanation:** Short TTL on null cache; tune Bloom filters. Infinite TTL blocks new records (C).

---

### Q49

**Answer:** A, B, C

**Explanation:** Tenant namespacing and isolation. Flat shared keyspace is unsafe (D).

---

### Q50

**Answer:** A, C, D

**Explanation:** Cache when read-heavy with staleness budget. Not universal for every endpoint (B).
