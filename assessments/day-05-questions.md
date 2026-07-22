# Caching Deep Dive — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers. Some questions include a short business context.

> **Answers and explanations:** see [answer-key/day-05-answers.md](./answer-key/day-05-answers.md)





---

### Q01








**Context:** RetailHub serves 50,000 product page reads per second. Each uncached read hits PostgreSQL (~15 ms). P95 user-facing latency target is under 50 ms.

**Select all that apply.**

Why is application-level caching appropriate here?

- [ ] A. A 95% cache hit rate reduces DB read load to roughly 5% of request volume
- [ ] B. Product catalog data is updated on every request, so cached copies are always current
- [ ] C. Caching replaces PostgreSQL as the source of truth for orders and payments
- [ ] D. RAM access (~microseconds to low milliseconds for Redis) is orders of magnitude faster than a DB round trip

---

### Q02








**Select all that apply.**

Which distinguish a cache from a database?

- [ ] A. Cache guarantees durable ACID transactions like PostgreSQL
- [ ] B. A cache miss means the requested data is permanently unavailable
- [ ] C. Cache is a temporary copy optimized for speed — not the authoritative store
- [ ] D. Cache entries may be evicted; data loss on Redis restart is acceptable if refillable from DB

---

### Q03








**Context:** RetailHub's `app.js` (2 MB) is served from origin on every visit. CDN hit ratio is 0%. Browser cache headers are missing.

**Select all that apply.**

Which layers should catch static asset traffic?

- [ ] A. Browser cache with long `Cache-Control: max-age` for versioned static files
- [ ] B. Load balancer internal pass-through replaces browser and CDN caching
- [ ] C. Always fetch versioned static assets from origin so every visit validates the full file
- [ ] D. CDN edge cache closer to users than the origin datacenter

---

### Q04








**Select all that apply.**

Which data should NOT be served from cache for the authoritative write path?

- [ ] A. Live bank balance used to authorize a $500 transfer
- [ ] B. Product catalog metadata updated hourly by admins (with TTL + invalidation)
- [ ] C. One-time OTP codes
- [ ] D. Real-time flash-sale inventory is safe to authorize from a stale cache during peak demand

---

### Q05








**Context:** RetailHub runs 40 stateless API pods behind a load balancer. Sessions were stored in pod memory — users lose login when routed to another pod.

**Select all that apply.**

What fixes session stickiness across instances?

- [ ] A. In-process cache on each pod without shared invalidation
- [ ] B. Same Redis key namespace across all app servers (`session:{id}`)
- [ ] C. Centralized Redis for shared session storage
- [ ] D. Load-balancer affinity makes sessions in pod memory durable across pod restarts

---

### Q06








**Select all that apply.**

Which cache key practices improve hit rate and operability?

- [ ] A. Omit tenant and variant identifiers so unrelated records intentionally share one key
- [ ] B. Namespace keys: `{service}:{entity}:{id}:{variant}`
- [ ] C. Shared keys for shared data (`product:12345`) serve all users with one entry
- [ ] D. Unbounded unique keys for every request maximize hit rate

---

### Q07








**Context:** RetailHub uses cache-aside for product pages: check Redis → on miss query PostgreSQL → populate Redis → return. Hit rate is 94%.

**Select all that apply.**

Which statements about this pattern are correct?

- [ ] A. A TTL guarantees that every database update appears in cache immediately
- [ ] B. If Redis is down, the app can bypass cache and read DB (degraded but functional)
- [ ] C. Cache-aside means the cache library auto-updates on every DB write without app code
- [ ] D. On cache miss the application loads DB and writes the cache entry

---

### Q08








**Select all that apply.**

An admin updates a product price in PostgreSQL. RetailHub uses cache-aside. What should happen?

- [ ] A. Delete cache before DB commit to guarantee freshness
- [ ] B. Update DB first, then delete (invalidate) the cache key — not update cache with stale partial data
- [ ] C. On create, no cache entry exists until first read populates it (lazy load)
- [ ] D. Do nothing and rely on a 24-hour TTL only — acceptable for price changes

---

### Q09








**Context:** Users edit profile settings and immediately reload the page. Stale names appear for up to 5 minutes when only TTL is used without invalidation.

**Select all that apply.**

When is write-through caching a better fit than cache-aside?

- [ ] A. Write volume is high and most updated keys are never read afterward
- [ ] B. Every write to cold keys that are never read — write-through is most efficient
- [ ] C. Write-through synchronously updates cache and DB on each write
- [ ] D. Post-write reads must see fresh data immediately with simple read path

---

### Q10








**Select all that apply.**

RetailHub considers write-back for like counters on product pages. Which are valid?

- [ ] A. Writes go to cache first; DB flush is asynchronous — fastest write path
- [ ] B. Write-back provides the weakest consistency of the three main write patterns
- [ ] C. Suitable as the sole durable ledger for payment authorization without a flush log
- [ ] D. Write-back is ideal for payment authorization and inventory deduction without durable flush

---

### Q11








**Context:** Admin changes product price from $29.99 to $19.99. Redis key is deleted after DB commit. CDN still shows $29.99 for 10 minutes. Users complain checkout charges $19.99 but listing shows old price.

**Select all that apply.**

What does this incident reveal about invalidation?

- [ ] A. Delete cache before DB commit prevents all races
- [ ] B. TTL alone leaves a stale window; production uses TTL plus explicit invalidation on write
- [ ] C. Reusing one unversioned asset URL guarantees every CDN edge refreshes immediately
- [ ] D. Invalidating Redis alone is insufficient — CDN and browser may still serve stale content

---

### Q12








**Select all that apply.**

Which TTL practices reduce stampedes and stale data risk?

- [ ] A. Identical TTL on all 1 million keys is safest for hit rate
- [ ] B. Long TTL on frequently changing prices without write-path invalidation
- [ ] C. Add jitter to TTLs so keys do not all expire at the same instant
- [ ] D. Short TTL (10–30 s) for volatile scores; OTP should not be cached at all

---

### Q13








**Context:** RetailHub's `#1 deal` product key expires at midnight. At expiry, 80,000 concurrent requests miss Redis simultaneously. PostgreSQL CPU hits 100% for 90 seconds.

**Select all that apply.**

What describes this failure and valid fixes?

- [ ] A. Cache stampede (thundering herd) — hot key expiry triggers mass DB load
- [ ] B. Increasing the database connection pool is sufficient to prevent synchronized cache misses
- [ ] C. Probabilistic early refresh or stale-while-revalidate can smooth hot-key expiry
- [ ] D. This is cache penetration — attackers querying non-existent keys

---

### Q14








An attacker scans `/product/-1` through `/product/-999999`. Every ID misses cache and hits DB.

**Select all that apply.**

Which mitigations apply?

- [ ] A. Cache null/negative results with short TTL for known-missing keys
- [ ] B. Bloom filter in front of cache to skip DB for definitely-absent keys
- [ ] C. TTL jitter alone fixes penetration from invalid key scans
- [ ] D. Disable input validation and rate limiting so every invalid ID reaches the database

---

### Q15








**Context:** RetailHub deploys Redis with no persistence. After restart the cache is empty. DB QPS jumps 20× and checkout errors spike for 3 minutes.

**Select all that apply.**

What failure mode is this and how to prevent it?

- [ ] A. Cache avalanche — entire cache layer empty causes DB overload
- [ ] B. Cache warming before enabling traffic and HA Redis (replicas, Sentinel) reduce blast radius
- [ ] C. Unlimited immediate database retries while the cache repopulates
- [ ] D. Redis restart never affects DB load if cache-aside is used correctly

---

### Q16








**Select all that apply.**

RetailHub scales Redis beyond one node's RAM. Which statements are correct?

- [ ] A. `noeviction` silently removes the least-recently-used key whenever memory is full
- [ ] B. Local in-process L1 cache shared automatically across all pods without TTL coordination
- [ ] C. Two-level cache (L1 in-process + L2 Redis): invalidate both or keep L1 TTL very short
- [ ] D. Redis Cluster shards keys horizontally across nodes

---

### Q17








**Context:** A celebrity tweet drives 120,000 req/s to one product ID. Single Redis node CPU saturates on that key.

**Select all that apply.**

Which techniques address hot-key saturation?

- [ ] A. Read replicas for Redis or key splitting / random suffix read aggregation
- [ ] B. Adding more Redis shards without changing key design always splits one hot key automatically
- [ ] C. Local in-process cache for the hot key on each app server
- [ ] D. Public product HTML and JSON cannot be cached at a CDN edge

---

### Q18








**Select all that apply.**

Which compare read-through and cache-aside?

- [ ] A. Read-through means the application never writes to the database
- [ ] B. CDN origin fetch on miss is analogous to read-through behavior
- [ ] C. Cache-aside: application explicitly checks cache, loads DB on miss, populates cache
- [ ] D. Read-through requires application code to query the database and populate every miss manually

---

### Q19








**Select all that apply.**

For `GET /api/public/categories`, which layers may participate?

- [ ] A. Browser cache (if Cache-Control allows)
- [ ] B. Redis should become the authoritative source for permanent category and pricing records
- [ ] C. CDN edge cache for cacheable public JSON
- [ ] D. MySQL 8.0 built-in query cache replaces Redis

---

### Q20








**Context:** RetailHub tracks API rate limits per API key in Redis with 60-second TTL counters. Keys are `ratelimit:{key}:{minute}`.

**Select all that apply.**

Why is Redis appropriate here?

- [ ] A. Fast increments and TTL expiry suit ephemeral counters
- [ ] B. Rate limit state must be the permanent financial ledger of record
- [ ] C. Keep a separate in-memory counter on each pod to enforce one fleet-wide limit
- [ ] D. Loss on Redis failover may briefly allow extra requests — usually acceptable for rate limits

---

### Q21








**Select all that apply.**

Compare write paths for a low-write, high-read product catalog.

- [ ] A. Write-through write: DB update + SET cache key — every write updates cache synchronously
- [ ] B. Write-through is the default pattern for all workloads worldwide
- [ ] C. Write-through removes database write latency because it never writes the database
- [ ] D. Cache-aside write: DB update + DELETE cache key — fewer writes to cache for cold keys

---

### Q22








**Context:** RetailHub shows approximate account balance on the dashboard with 30-second Redis TTL. Actual transfers always read balance from PostgreSQL with row lock.

**Select all that apply.**

When is display-only caching acceptable?

- [ ] A. Cache the balance used to authorize transfers for speed
- [ ] B. Short TTL + clear UX that balance is approximate can be acceptable for display
- [ ] C. Stale display within TTL does not authorize financial actions
- [ ] D. Transfers should be authorized from the cached display balance to avoid database locking

---

### Q23








**Select all that apply.**

Which Cache-Control directives are correct?

- [ ] A. `no-store` for sensitive responses that must not persist in any cache
- [ ] B. `public, max-age=31536000` for fingerprinted static assets
- [ ] C. `private` — browser only, not shared CDN cache
- [ ] D. `s-maxage=300` forces browsers to retain a private response for exactly five minutes

---

### Q24








**Context:** After each deploy Redis is empty. SRE wants to preload top 5,000 product keys before shifting traffic.

**Select all that apply.**

What practice is this and why?

- [ ] A. Cache warming — reduces cold-start miss storm and avalanche risk
- [ ] B. Refresh-ahead — proactively reload keys before TTL expiry on hot paths
- [ ] C. Warm from DB or backup snapshot before enabling load balancer traffic
- [ ] D. Warming guarantees 100% hit rate forever without ongoing invalidation

---

### Q25








RetailHub's homepage hero product uses 60-minute TTL. At 54 minutes a background job refreshes the key.

**Select all that apply.**

Which statements are correct?

- [ ] A. Refresh-ahead and cache warming are identical operations
- [ ] B. Refresh-ahead prevents expiry-time stampede on hot keys
- [ ] C. Refresh-ahead is ongoing proactive refresh; cache warming is typically one-time at startup/deploy
- [ ] D. Users never see stale data during refresh-ahead — always zero staleness

---

### Q26








**Select all that apply.**

Which statements about cache write patterns are correct?

- [ ] A. Cache-aside with delete-on-write plus TTL is the common production default
- [ ] B. TTL-only without invalidation on write is the strongest consistency approach
- [ ] C. Write-through synchronously updates cache and DB — strongest typical app-level consistency
- [ ] D. Write-back commits to the database before acknowledging every cache write

---

### Q27








**Select all that apply.**

Which signals indicate a broken cache layer?

- [ ] A. DB QPS rises sharply while hit rate falls
- [ ] B. Redis memory above ~85% of maxmemory — eviction or errors imminent
- [ ] C. Hit rate of 50% on intentionally cached hot endpoints suggests misconfiguration
- [ ] D. Hit rate drops >10% while traffic is unchanged

---

### Q28








**Context:** One Redis key stores 8 MB JSON for a product with 10,000 SKUs. Redis latency spikes block other commands on the single-threaded primary.

**Select all that apply.**

What fixes apply?

- [ ] A. Split large values into smaller keys or store reference + lazy load chunks
- [ ] B. Compress values or avoid caching huge blobs — store S3 URL reference instead
- [ ] C. Bigger single keys always improve hit rate without operational cost
- [ ] D. Big key problem — blocks Redis single-threaded event loop on large payloads

---

### Q29








**Context:** Thread A commits price update and deletes cache. Thread B misses cache, reads stale value from read replica with 200 ms lag, writes old price back to Redis.

**Select all that apply.**

How to reduce stale repopulation races?

- [ ] A. Read from primary on cache miss for recently updated keys, or use version in cache value
- [ ] B. Delete cache before DB commit — always safe
- [ ] C. Event-based invalidation across services still has small eventual lag to design for
- [ ] D. Delete cache after DB commit on primary, not before

---

### Q30








Redis fails during Black Friday. RetailHub's DB cannot absorb full read load.

**Select all that apply.**

Which degradation strategies apply?

- [ ] A. Unlimited retries to DB without backoff — always recovers fastest
- [ ] B. Return 503 or serve stale cached copy at CDN/browser if acceptable
- [ ] C. Multi-layer L1 in-process cache extends partial availability briefly
- [ ] D. Circuit breaker stops hammering DB when error rate exceeds threshold

---

### Q31








**Context:** RetailHub's category API returns 500 KB JSON. Clients re-fetch the full body on every visit even though categories change rarely.

**Select all that apply.**

Which caching techniques reduce bandwidth and origin load?

- [ ] A. Conditional requests reduce origin work when the representation has not changed
- [ ] B. `ETag` / `If-None-Match` enables `304 Not Modified` when content is unchanged
- [ ] C. Strong ETags support validators at CDN and browser layers
- [ ] D. ETags eliminate the need for any write-path invalidation on admin updates

---

### Q32








**Select all that apply.**

Which statements about stale-while-revalidate (SWR) are correct?

- [ ] A. SWR appears in HTTP `Cache-Control` extensions and CDN configurations
- [ ] B. SWR guarantees zero staleness for financial authorization decisions
- [ ] C. SWR can serve stale content while refreshing in the background
- [ ] D. SWR improves perceived latency during revalidation windows

---

### Q33








**Context:** Redis hits `maxmemory` with `allkeys-lru`. Hit rate drops from 92% to 61% as popular product keys are evicted alongside cold keys.

**Select all that apply.**

What explains this and what should ops do?

- [ ] A. `allkeys-lru` perfectly preserves every hot key regardless of memory pressure
- [ ] B. Monitor memory usage, eviction rate, and choose an appropriate `maxmemory-policy`
- [ ] C. Memory pressure triggers eviction — hot keys can be evicted under `allkeys-lru`
- [ ] D. Separate tiers, reserved memory, or key design may be needed for hot data

---

### Q34








**Select all that apply.**

When choosing a distributed cache technology, which comparisons are correct?

- [ ] A. Redis offers richer data structures and optional persistence features
- [ ] B. Both can serve as L2 application cache — choice depends on required features
- [ ] C. Memcached automatically stays strongly consistent with PostgreSQL on every read
- [ ] D. Memcached is a simpler multi-threaded cache for pure key-value TTL workloads

---

### Q35








**Context:** Two threads miss the same product key simultaneously. Both query PostgreSQL and both `SET` Redis with the same value.

**Select all that apply.**

What describes this race and valid mitigations?

- [ ] A. Singleflight / miss coalescing prevents duplicate DB loads for the same key
- [ ] B. Lock-based miss coalescing is a standard stampede mitigation technique
- [ ] C. Double populate always corrupts cache values with conflicting data
- [ ] D. The race may not corrupt data but still wastes DB capacity under load

---

### Q36








**Select all that apply.**

Which practices keep CDN content fresh after deploys?

- [ ] A. CDN purge is always instantaneous globally with zero propagation delay
- [ ] B. Fingerprinted asset URLs (`app.a1b2c3.js`) reduce need for broad purges
- [ ] C. Purge API invalidates edge copies when content changes
- [ ] D. Multi-layer caching requires invalidating every layer that may serve stale content

---

### Q37








**Context:** RetailHub's homepage combines a public hero banner (shared) with per-user recommendations. One cache key for the full HTML minimizes code complexity.

**Select all that apply.**

What is sound cache design here?

- [ ] A. Split cacheable vs non-cacheable fragments — not all-or-nothing page caching
- [ ] B. Cache public fragments at CDN/Redis with shared keys
- [ ] C. Per-user sections need short TTL, separate API calls, or edge-side composition
- [ ] D. One shared cache key for the full personalized page maximizes hit rate

---

### Q38








**Select all that apply.**

Which statements about Redis persistence are correct?

- [ ] A. Pure cache workloads often tolerate empty restart with warm-up rather than heavy persistence
- [ ] B. RDB snapshots are point-in-time — data since last snapshot may be lost on crash
- [ ] C. AOF `fsync` policy trades durability for write throughput
- [ ] D. Redis persistence makes it a full replacement for PostgreSQL as financial ledger

---

### Q39








**Context:** EU users hit RetailHub's US-origin product API. P95 latency is 280 ms despite Redis at the US origin. US users see 35 ms.

**Select all that apply.**

What architectural responses apply?

- [ ] A. Geo-routed endpoints or multi-region deployment may be required at scale
- [ ] B. A single US Redis cluster gives identical latency to EU and US users
- [ ] C. Regional Redis or CDN edge caching closer to users reduces round-trip time
- [ ] D. Cross-region cache replication adds complexity — geographic placement matters

---

### Q40








**Select all that apply.**

RetailHub uses in-process L1 cache in front of Redis L2. Which statements are correct?

- [ ] A. Very short L1 TTL reduces the stale window without explicit invalidation
- [ ] B. L1 caches are automatically coherent across JVMs/processes without design
- [ ] C. Pub/sub invalidation channel can clear L1 entries on writes
- [ ] D. Uncoordinated L1 across pods can serve stale data after a write on another pod

---

### Q41








**Context:** Redis shows 5 units in stock. PostgreSQL already sold out during a race. Checkout authorized from stale cache.

**Select all that apply.**

What went wrong and what is correct design?

- [ ] A. Authoritative inventory deduction must read/write DB with lock or atomic conditional `UPDATE`
- [ ] B. Cache-aside stock counts used to authorize purchases are dangerous on hot inventory
- [ ] C. Short TTL alone guarantees no oversell during flash sales
- [ ] D. Display stock may be approximate; the purchase path must use DB truth

---

### Q42








**Select all that apply.**

Which statements about the `Vary` response header are correct?

- [ ] A. `Vary: Authorization` matters when responses differ by authenticated user
- [ ] B. `Vary: Accept-Encoding` helps caches store gzip vs brotli variants separately
- [ ] C. Misconfigured `Vary` can fragment cache keys and lower hit rate
- [ ] D. `Vary` alone eliminates the need for `private` cache on authenticated responses

---

### Q43








**Context:** Marketing updates a banner image. CDN uses `stale-while-revalidate` for one hour. Some users see the old banner briefly while a background fetch updates the edge.

**Select all that apply.**

When is this trade-off acceptable?

- [ ] A. Price, legal, or checkout-critical text should not rely on long SWR without purge
- [ ] B. Acceptable for non-critical marketing visuals with known staleness window
- [ ] C. SWR guarantees users never see any stale marketing content
- [ ] D. Pair SWR with purge or versioned URLs for important updates

---

### Q44








**Select all that apply.**

Which compare operational ownership of read-through vs cache-aside?

- [ ] A. Read-through delegates miss handling to the cache client/library
- [ ] B. Cache-aside gives the application explicit control over invalidation and miss path
- [ ] C. Read-through removes all application responsibility for cache and database writes
- [ ] D. Team familiarity and framework support influence which pattern to adopt

---

### Q45








**Context:** Deploy clears L1 on all 80 API pods at once. Each pod cold-misses the top 100 keys — 8,000 concurrent PostgreSQL queries in 2 seconds.

**Select all that apply.**

What mitigations apply?

- [ ] A. TTL jitter on L1 prevents simultaneous cold start after every deploy
- [ ] B. Singleflight at L2 Redis reduces duplicate DB load for shared hot keys
- [ ] C. Canary deploy limits the fraction of pods going cold at once
- [ ] D. Coordinate cache warm-up or staggered traffic shift after deploy

---

### Q46








**Select all that apply.**

Which statements about Redis Cluster are correct?

- [ ] A. Cluster automatically splits one logical hot key across nodes without key redesign
- [ ] B. Cross-slot multi-key transactions are limited compared to single-node Redis
- [ ] C. Hot-key problems remain a design concern even with horizontal sharding
- [ ] D. Cluster moves hash slots on failover — clients must handle `MOVED`/`ASK` redirects

---

### Q47








**Context:** Redis stores session blobs containing PII. Compliance requires encryption in transit and minimal sensitive data retention.

**Select all that apply.**

Which practices apply?

- [ ] A. Caching PII eliminates GDPR data-location and retention obligations
- [ ] B. Store minimal fields in session cache — reduce exposure surface
- [ ] C. TLS to Redis addresses encryption in transit
- [ ] D. At-rest encryption depends on managed Redis/cloud disk encryption configuration

---

### Q48








**Select all that apply.**

Which statements about negative (null) caching are correct?

- [ ] A. Caching known-missing keys with short TTL stops repeated DB hits from scans
- [ ] B. Short TTL limits harm if the entity is created soon after a cache-miss scan
- [ ] C. Negative cache with infinite TTL always eventually shows newly created records
- [ ] D. Bloom filter false positives may rarely skip DB for existent keys — tune size and hash count

---

### Q49








**Context:** RetailHub SaaS runs multi-tenant on one Redis cluster. A bad admin script deletes keys matching `product:*` and wipes another tenant's catalog.

**Select all that apply.**

How should multi-tenant cache isolation work?

- [ ] A. Namespace keys per tenant: `{tenant_id}:product:{id}`
- [ ] B. ACLs or separate Redis instances/clusters for large or regulated tenants
- [ ] C. Test invalidation scripts against tenant prefix boundaries in staging
- [ ] D. Shared flat keyspace without tenant prefix is safest at scale

---

### Q50








**Select all that apply.**

When is adding a cache layer a poor investment?

- [ ] A. Working set already fits in DB buffer pool with acceptable latency — cache may be premature
- [ ] B. Every API endpoint benefits from Redis regardless of access pattern
- [ ] C. Data changes constantly and is rarely re-read — cache adds little value
- [ ] D. Every read requires strong consistency with zero staleness budget
