# Caching Deep Dive — MCQ Questions (30)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-07-answers.md](./answer-key/day-07-answers.md)

---

### Q01 [Easy] [Case Study] — RetailHub Product Page Load

**Context:** RetailHub serves 50,000 product page reads per second. Each uncached read hits PostgreSQL (~15 ms). P95 user-facing latency target is under 50 ms.

**Select all that apply.**

Why is application-level caching appropriate here?

- [ ] A. Product catalog data is read far more often than it is updated
- [ ] B. RAM access (~microseconds to low milliseconds for Redis) is orders of magnitude faster than a DB round trip
- [ ] C. Caching replaces PostgreSQL as the source of truth for orders and payments
- [ ] D. A 95% cache hit rate reduces DB read load to roughly 5% of request volume

---

### Q02 [Easy] — Cache vs Database

**Select all that apply.**

Which distinguish a cache from a database?

- [ ] A. Cache is a temporary copy optimized for speed — not the authoritative store
- [ ] B. Cache entries may be evicted; data loss on Redis restart is acceptable if refillable from DB
- [ ] C. Cache guarantees durable ACID transactions like PostgreSQL
- [ ] D. A cache miss is normal — the system refills from the source of truth

---

### Q03 [Easy] [Case Study] — RetailHub Static Assets

**Context:** RetailHub's `app.js` (2 MB) is served from origin on every visit. CDN hit ratio is 0%. Browser cache headers are missing.

**Select all that apply.**

Which layers should catch static asset traffic?

- [ ] A. Answer as close to the user as possible — browser and CDN before origin
- [ ] B. Browser cache with long `Cache-Control: max-age` for versioned static files
- [ ] C. CDN edge cache closer to users than the origin datacenter
- [ ] D. Load balancer internal pass-through replaces browser and CDN caching

---

### Q04 [Easy] — What Not to Cache

**Select all that apply.**

Which data should NOT be served from cache for the authoritative write path?

- [ ] A. Live bank balance used to authorize a $500 transfer
- [ ] B. One-time OTP codes
- [ ] C. Product catalog metadata updated hourly by admins (with TTL + invalidation)
- [ ] D. Real-time flash-sale inventory where stale stock causes overselling

---

### Q05 [Easy] [Case Study] — RetailHub Session Store

**Context:** RetailHub runs 40 stateless API pods behind a load balancer. Sessions were stored in pod memory — users lose login when routed to another pod.

**Select all that apply.**

What fixes session stickiness across instances?

- [ ] A. Centralized Redis for shared session storage
- [ ] B. JWT in client cookie (stateless auth) instead of server memory
- [ ] C. In-process cache on each pod without shared invalidation
- [ ] D. Same Redis key namespace across all app servers (`session:{id}`)

---

### Q06 [Easy] — Cache Key Design

**Select all that apply.**

Which cache key practices improve hit rate and operability?

- [ ] A. Namespace keys: `{service}:{entity}:{id}:{variant}`
- [ ] B. Shared keys for shared data (`product:12345`) serve all users with one entry
- [ ] C. Per-user keys for fully personalized feeds (`feed:user:789`) usually have poor reuse
- [ ] D. Unbounded unique keys for every request maximize hit rate

---

### Q07 [Medium] [Case Study] — RetailHub Cache-Aside Read Path

**Context:** RetailHub uses cache-aside for product pages: check Redis → on miss query PostgreSQL → populate Redis → return. Hit rate is 94%.

**Select all that apply.**

Which statements about this pattern are correct?

- [ ] A. On cache miss the application loads DB and writes the cache entry
- [ ] B. The cache does not automatically sync when the DB is updated — app must invalidate on write
- [ ] C. If Redis is down, the app can bypass cache and read DB (degraded but functional)
- [ ] D. Cache-aside means the cache library auto-updates on every DB write without app code

---

### Q08 [Medium] — Cache-Aside Write Path

**Select all that apply.**

An admin updates a product price in PostgreSQL. RetailHub uses cache-aside. What should happen?

- [ ] A. Update DB first, then delete (invalidate) the cache key — not update cache with stale partial data
- [ ] B. Delete cache before DB commit to guarantee freshness
- [ ] C. Do nothing and rely on a 24-hour TTL only — acceptable for price changes
- [ ] D. On create, no cache entry exists until first read populates it (lazy load)

---

### Q09 [Medium] [Case Study] — RetailHub Profile Settings

**Context:** Users edit profile settings and immediately reload the page. Stale names appear for up to 5 minutes when only TTL is used without invalidation.

**Select all that apply.**

When is write-through caching a better fit than cache-aside?

- [ ] A. Post-write reads must see fresh data immediately with simple read path
- [ ] B. Write volume is low and keys are hot after update
- [ ] C. Every write to cold keys that are never read — write-through is most efficient
- [ ] D. Write-through synchronously updates cache and DB on each write

---

### Q10 [Medium] — Write-Back Cache Risks

**Select all that apply.**

RetailHub considers write-back for like counters on product pages. Which are valid?

- [ ] A. Writes go to cache first; DB flush is asynchronous — fastest write path
- [ ] B. Suitable for non-critical counters where brief loss on crash is acceptable with durable queue/WAL
- [ ] C. Write-back is ideal for payment authorization and inventory deduction without durable flush
- [ ] D. Write-back provides the weakest consistency of the three main write patterns

---

### Q11 [Medium] [Case Study] — RetailHub Admin Price Update

**Context:** Admin changes product price from $29.99 to $19.99. Redis key is deleted after DB commit. CDN still shows $29.99 for 10 minutes. Users complain checkout charges $19.99 but listing shows old price.

**Select all that apply.**

What does this incident reveal about invalidation?

- [ ] A. Invalidating Redis alone is insufficient — CDN and browser may still serve stale content
- [ ] B. TTL alone leaves a stale window; production uses TTL plus explicit invalidation on write
- [ ] C. Delete cache before DB commit prevents all races
- [ ] D. Version bump keys (`product:v2:123`) let old keys expire without hunting every variant

---

### Q12 [Medium] — TTL Best Practices

**Select all that apply.**

Which TTL practices reduce stampedes and stale data risk?

- [ ] A. Add jitter to TTLs so keys do not all expire at the same instant
- [ ] B. Long TTL on stable catalog data paired with delete-on-write invalidation
- [ ] C. Identical TTL on all 1 million keys is safest for hit rate
- [ ] D. Short TTL (10–30 s) for volatile scores; OTP should not be cached at all

---

### Q13 [Medium] [Case Study] — RetailHub Black Friday Stampede

**Context:** RetailHub's `#1 deal` product key expires at midnight. At expiry, 80,000 concurrent requests miss Redis simultaneously. PostgreSQL CPU hits 100% for 90 seconds.

**Select all that apply.**

What describes this failure and valid fixes?

- [ ] A. Cache stampede (thundering herd) — hot key expiry triggers mass DB load
- [ ] B. TTL jitter, singleflight/lock on miss, or refresh-ahead before expiry reduce stampede
- [ ] C. This is cache penetration — attackers querying non-existent keys
- [ ] D. Probabilistic early refresh or stale-while-revalidate can smooth hot-key expiry

---

### Q14 [Medium] — Cache Penetration

An attacker scans `/product/-1` through `/product/-999999`. Every ID misses cache and hits DB.

**Select all that apply.**

Which mitigations apply?

- [ ] A. Cache null/negative results with short TTL for known-missing keys
- [ ] B. Bloom filter in front of cache to skip DB for definitely-absent keys
- [ ] C. TTL jitter alone fixes penetration from invalid key scans
- [ ] D. Input validation and rate limiting at the API edge

---

### Q15 [Hard] [Case Study] — RetailHub Redis Restart

**Context:** RetailHub deploys Redis with no persistence. After restart the cache is empty. DB QPS jumps 20× and checkout errors spike for 3 minutes.

**Select all that apply.**

What failure mode is this and how to prevent it?

- [ ] A. Cache avalanche — entire cache layer empty causes DB overload
- [ ] B. Cache warming before enabling traffic and HA Redis (replicas, Sentinel) reduce blast radius
- [ ] C. Circuit breaker on DB path and graceful degradation during warm-up
- [ ] D. Redis restart never affects DB load if cache-aside is used correctly

---

### Q16 [Hard] — Distributed Cache Architecture

**Select all that apply.**

RetailHub scales Redis beyond one node's RAM. Which statements are correct?

- [ ] A. Redis Cluster shards keys horizontally across nodes
- [ ] B. `noeviction` policy returns errors when memory is full — dangerous default in production
- [ ] C. Local in-process L1 cache shared automatically across all pods without TTL coordination
- [ ] D. Two-level cache (L1 in-process + L2 Redis): invalidate both or keep L1 TTL very short

---

### Q17 [Hard] [Case Study] — RetailHub Hot Celebrity Product

**Context:** A celebrity tweet drives 120,000 req/s to one product ID. Single Redis node CPU saturates on that key.

**Select all that apply.**

Which techniques address hot-key saturation?

- [ ] A. Local in-process cache for the hot key on each app server
- [ ] B. Read replicas for Redis or key splitting / random suffix read aggregation
- [ ] C. CDN cache for public product page HTML/JSON at the edge
- [ ] D. Adding more Redis shards without changing key design always splits one hot key automatically

---

### Q18 [Hard] — Read-Through vs Cache-Aside

**Select all that apply.**

Which compare read-through and cache-aside?

- [ ] A. Read-through: cache library loads DB on miss; app calls `cache.get()` only
- [ ] B. Cache-aside: application explicitly checks cache, loads DB on miss, populates cache
- [ ] C. Read-through means the application never writes to the database
- [ ] D. CDN origin fetch on miss is analogous to read-through behavior

---

### Q19 [Easy] — Multi-Layer Cache Stack

**Select all that apply.**

For `GET /api/public/categories`, which layers may participate?

- [ ] A. Browser cache (if Cache-Control allows)
- [ ] B. CDN edge cache for cacheable public JSON
- [ ] C. Redis application cache for category tree
- [ ] D. MySQL 8.0 built-in query cache replaces Redis

---

### Q20 [Easy] [Case Study] — RetailHub Rate Limit Counter

**Context:** RetailHub tracks API rate limits per API key in Redis with 60-second TTL counters. Keys are `ratelimit:{key}:{minute}`.

**Select all that apply.**

Why is Redis appropriate here?

- [ ] A. Fast increments and TTL expiry suit ephemeral counters
- [ ] B. Shared across all API pods for consistent limits
- [ ] C. Rate limit state must be the permanent financial ledger of record
- [ ] D. Loss on Redis failover may briefly allow extra requests — usually acceptable for rate limits

---

### Q21 [Medium] — Write-Through vs Cache-Aside Writes

**Select all that apply.**

Compare write paths for a low-write, high-read product catalog.

- [ ] A. Cache-aside write: DB update + DELETE cache key — fewer writes to cache for cold keys
- [ ] B. Write-through write: DB update + SET cache key — every write updates cache synchronously
- [ ] C. Write-through adds write latency but simplifies post-update read consistency
- [ ] D. Write-through is the default pattern for all workloads worldwide

---

### Q22 [Medium] [Case Study] — RetailHub Display Balance

**Context:** RetailHub shows approximate account balance on the dashboard with 30-second Redis TTL. Actual transfers always read balance from PostgreSQL with row lock.

**Select all that apply.**

When is display-only caching acceptable?

- [ ] A. Stale display within TTL does not authorize financial actions
- [ ] B. Authoritative debit/credit always reads current DB state with lock
- [ ] C. Cache the balance used to authorize transfers for speed
- [ ] D. Short TTL + clear UX that balance is approximate can be acceptable for display

---

### Q23 [Medium] — HTTP Cache Headers

**Select all that apply.**

Which Cache-Control directives are correct?

- [ ] A. `public, max-age=31536000` for fingerprinted static assets
- [ ] B. `private` — browser only, not shared CDN cache
- [ ] C. `s-maxage=300` overrides shared cache TTL for CDN while browser may revalidate sooner
- [ ] D. `no-store` for sensitive responses that must not persist in any cache

---

### Q24 [Medium] [Case Study] — RetailHub Deploy Cold Start

**Context:** After each deploy Redis is empty. SRE wants to preload top 5,000 product keys before shifting traffic.

**Select all that apply.**

What practice is this and why?

- [ ] A. Cache warming — reduces cold-start miss storm and avalanche risk
- [ ] B. Refresh-ahead — proactively reload keys before TTL expiry on hot paths
- [ ] C. Warm from DB or backup snapshot before enabling load balancer traffic
- [ ] D. Warming guarantees 100% hit rate forever without ongoing invalidation

---

### Q25 [Hard] — Refresh-Ahead Pattern

RetailHub's homepage hero product uses 60-minute TTL. At 54 minutes a background job refreshes the key.

**Select all that apply.**

Which statements are correct?

- [ ] A. Refresh-ahead prevents expiry-time stampede on hot keys
- [ ] B. Refresh-ahead is ongoing proactive refresh; cache warming is typically one-time at startup/deploy
- [ ] C. Refresh-ahead and cache warming are identical operations
- [ ] D. Users never see stale data during refresh-ahead — always zero staleness

---

### Q26 [Hard] — Consistency Spectrum

**Select all that apply.**

Which statements about cache write patterns are correct?

- [ ] A. Write-through synchronously updates cache and DB — strongest typical app-level consistency
- [ ] B. Cache-aside with delete-on-write plus TTL is the common production default
- [ ] C. TTL-only without invalidation on write is the strongest consistency approach
- [ ] D. Write-back flushes to DB asynchronously — weakest consistency, highest write speed

---

### Q27 [Easy] — Monitoring Cache Health

**Select all that apply.**

Which signals indicate a broken cache layer?

- [ ] A. Hit rate drops >10% while traffic is unchanged
- [ ] B. DB QPS rises sharply while hit rate falls
- [ ] C. Redis memory above ~85% of maxmemory — eviction or errors imminent
- [ ] D. Hit rate of 50% on intentionally cached hot endpoints suggests misconfiguration

---

### Q28 [Medium] [Case Study] — RetailHub Big Product JSON

**Context:** One Redis key stores 8 MB JSON for a product with 10,000 SKUs. Redis latency spikes block other commands on the single-threaded primary.

**Select all that apply.**

What fixes apply?

- [ ] A. Split large values into smaller keys or store reference + lazy load chunks
- [ ] B. Compress values or avoid caching huge blobs — store S3 URL reference instead
- [ ] C. Bigger single keys always improve hit rate without operational cost
- [ ] D. Big key problem — blocks Redis single-threaded event loop on large payloads

---

### Q29 [Hard] [Case Study] — RetailHub Invalidation Race

**Context:** Thread A commits price update and deletes cache. Thread B misses cache, reads stale value from read replica with 200 ms lag, writes old price back to Redis.

**Select all that apply.**

How to reduce stale repopulation races?

- [ ] A. Delete cache after DB commit on primary, not before
- [ ] B. Read from primary on cache miss for recently updated keys, or use version in cache value
- [ ] C. Delete cache before DB commit — always safe
- [ ] D. Event-based invalidation across services still has small eventual lag to design for

---

### Q30 [Hard] — Circuit Breaker During Cache Outage

Redis fails during Black Friday. RetailHub's DB cannot absorb full read load.

**Select all that apply.**

Which degradation strategies apply?

- [ ] A. Circuit breaker stops hammering DB when error rate exceeds threshold
- [ ] B. Return 503 or serve stale cached copy at CDN/browser if acceptable
- [ ] C. Unlimited retries to DB without backoff — always recovers fastest
- [ ] D. Multi-layer L1 in-process cache extends partial availability briefly

---
