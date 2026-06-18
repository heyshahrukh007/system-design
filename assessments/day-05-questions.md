# Day 5 — MCQ Questions (30)

Multi-select format: each question has **two or more** correct answers.

---

### Q01 [Easy] — DNS Purpose

**Select all that apply.**

Why does DNS exist in system design?

- [ ] A. Humans use memorable domain names instead of numeric IPs
- [ ] B. Update DNS when servers change IPs — users keep the same URL
- [ ] C. Return multiple IPs for basic load distribution
- [ ] D. Replace the need for load balancers entirely

**Answer:** A, B, C

**Explanation:** DNS is the phone book, enables IP changes without URL changes, and can return multiple A records. It does not replace dedicated load balancers with health checks (D).

**Source:** [docs/day-05/01-dns.md](../docs/day-05/01-dns.md)

---

### Q02 [Easy] — DNS Record Types

**Select all that apply.**

Which DNS record types are covered in Day 5?

- [ ] A. A — domain to IPv4
- [ ] B. AAAA — domain to IPv6
- [ ] C. CNAME — alias to another domain
- [ ] D. MX — mail server routing

**Answer:** A, B, C, D

**Explanation:** All four record types appear in the Common DNS Record Types table (along with TXT, NS, TTL).

**Source:** [docs/day-05/01-dns.md](../docs/day-05/01-dns.md)

---

### Q03 [Easy] — Load Balancer Purpose

**Select all that apply.**

Why use a load balancer?

- [ ] A. Spread traffic when one server can't handle all requests
- [ ] B. Route around unhealthy servers via health checks
- [ ] C. Drain a server for deployment while others serve traffic
- [ ] D. Eliminate the need for multiple backend servers

**Answer:** A, B, C

**Explanation:** LB distributes, health-checks, and enables rolling deploys. You still need multiple backends for distribution to matter (D).

**Source:** [docs/day-05/02-load-balancer.md](../docs/day-05/02-load-balancer.md)

---

### Q04 [Easy] — L4 vs L7 Load Balancers

**Select all that apply.**

Which statements about Layer 4 vs Layer 7 load balancers are correct?

- [ ] A. L4 routes by IP and port — very fast, no HTTP inspection
- [ ] B. L7 routes by URL, headers, cookies — smart HTTP routing
- [ ] C. L7 can do SSL termination
- [ ] D. L4 can route `/api/*` to a different pool than `/*`

**Answer:** A, B, C

**Explanation:** L4 is transport-level; L7 is application-level with HTTP routing and SSL termination. Path-based routing (`/api/*`) requires L7 (D).

**Source:** [docs/day-05/02-load-balancer.md](../docs/day-05/02-load-balancer.md)

---

### Q05 [Easy] — Reverse Proxy Roles

**Select all that apply.**

Which jobs does a reverse proxy perform?

- [ ] A. Hide backend topology from clients
- [ ] B. SSL termination at the edge
- [ ] C. Serve static files directly (e.g., CSS/JS)
- [ ] D. Replace all backend application logic

**Answer:** A, B, C

**Explanation:** Reverse proxy represents backends, terminates SSL, routes, serves static files, compresses, and rate-limits. Business logic stays in backend apps (D).

**Source:** [docs/day-05/03-reverse-proxy.md](../docs/day-05/03-reverse-proxy.md)

---

### Q06 [Easy] — CDN Benefits

**Select all that apply.**

What problems does a CDN solve?

- [ ] A. High latency for users far from origin
- [ ] B. Origin overwhelmed by static traffic
- [ ] C. DDoS absorption at the edge
- [ ] D. Strong consistency for bank balances on every read

**Answer:** A, B, C

**Explanation:** CDNs reduce latency, offload origin, and provide edge protection. Bank balances need strong consistency in the app/DB — not CDN caching (D).

**Source:** [docs/day-05/04-cdn.md](../docs/day-05/04-cdn.md)

---

### Q07 [Easy] — Cache Layers

**Select all that apply.**

Which cache layers are listed top-to-bottom in Day 5?

- [ ] A. Browser cache
- [ ] B. CDN / edge cache
- [ ] C. Application cache (Redis, Memcached)
- [ ] D. Source of truth (database, API)

**Answer:** A, B, C, D

**Explanation:** All four appear in the cache layers diagram (with reverse proxy and DB cache between app cache and source).

**Source:** [docs/day-05/05-caching.md](../docs/day-05/05-caching.md)

---

### Q08 [Easy] — DB Scaling Order

**Select all that apply.**

Which scaling strategies should be applied progressively (before sharding)?

- [ ] A. Optimize queries and add indexes
- [ ] B. Add Redis caching to offload reads
- [ ] C. Read replicas for read-heavy workloads
- [ ] D. Shard immediately on day one

**Answer:** A, B, C

**Explanation:** The curriculum lists optimize → cache → replicas → vertical scale → pooling → sharding. Don't shard on day one (D).

**Source:** [docs/day-05/06-db-scaling.md](../docs/day-05/06-db-scaling.md)

---

### Q09 [Easy] — Queue Concepts

**Select all that apply.**

Which are core queue concepts from Day 5?

- [ ] A. Producer sends messages; consumer/worker processes them
- [ ] B. Dead Letter Queue (DLQ) for repeatedly failed messages
- [ ] C. Broker persists messages (survives crash)
- [ ] D. Caller always waits synchronously for consumer to finish

**Answer:** A, B, C

**Explanation:** Producer, consumer, broker, DLQ are core concepts. Queues decouple — caller does not wait (D).

**Source:** [docs/day-05/07-queue.md](../docs/day-05/07-queue.md)

---

### Q10 [Easy] — Microservices Benefits

**Select all that apply.**

Which are listed benefits of microservices?

- [ ] A. Independent scaling per service
- [ ] B. Team ownership of a service end-to-end
- [ ] C. Fault isolation — one service down ≠ entire site down
- [ ] D. Lower operational complexity than a monolith

**Answer:** A, B, C

**Explanation:** Independent scaling, ownership, and fault isolation are benefits. Microservices increase operational complexity (D).

**Source:** [docs/day-05/08-microservices-and-workers.md](../docs/day-05/08-microservices-and-workers.md)

---

### Q11 [Medium] — DNS TTL Trade-offs

**Select all that apply.**

Which statements about DNS TTL are correct?

- [ ] A. Low TTL (60s) → faster failover, more DNS queries
- [ ] B. High TTL (3600s) → slower failover, fewer queries
- [ ] C. DNS caching means failover is never instant
- [ ] D. High TTL is best during infrastructure migration

**Answer:** A, B, C

**Explanation:** TTL trade-offs and caching delay are documented. Lower TTL *before* migration helps — high TTL during migration leaves users on old IPs longer (D).

**Source:** [docs/day-05/01-dns.md](../docs/day-05/01-dns.md)

---

### Q12 [Medium] — LB Algorithms

**Select all that apply.**

Which load balancing algorithms and use cases are correctly paired?

- [ ] A. Round robin — equal-capacity servers
- [ ] B. Least connections — long-lived connections
- [ ] C. IP hash — session stickiness (same client → same server)
- [ ] D. Weighted round robin — mixed server sizes

**Answer:** A, B, C, D

**Explanation:** All four algorithm pairings match the load balancer lesson.

**Source:** [docs/day-05/02-load-balancer.md](../docs/day-05/02-load-balancer.md)

---

### Q13 [Medium] — Reverse Proxy vs Load Balancer

**Select all that apply.**

Which statements reflect the curriculum's comparison?

- [ ] A. They overlap — Nginx and HAProxy often do both
- [ ] B. Reverse proxy focus: represent backends, route, protect
- [ ] C. Load balancer focus: distribute traffic evenly
- [ ] D. They are completely unrelated technologies

**Answer:** A, B, C

**Explanation:** The lesson states they overlap heavily; reverse proxy emphasizes routing/protection, LB emphasizes distribution. They are related, not unrelated (D).

**Source:** [docs/day-05/03-reverse-proxy.md](../docs/day-05/03-reverse-proxy.md)

---

### Q14 [Medium] — CDN vs Redis Cache

**Select all that apply.**

Which distinctions between CDN and application cache (Redis) are correct?

- [ ] A. CDN caches HTTP responses at edge, close to users geographically
- [ ] B. Redis caches data in app memory, close to app servers
- [ ] C. CDN best for static files; Redis for DB query results and sessions
- [ ] D. Use only one — they are redundant

**Answer:** A, B, C

**Explanation:** CDN and Redis serve different layers and content types. The curriculum recommends using both (D).

**Source:** [docs/day-05/04-cdn.md](../docs/day-05/04-cdn.md)

---

### Q15 [Medium] — Cache Patterns

**Select all that apply.**

Which cache pattern descriptions are accurate?

- [ ] A. Cache-aside — app checks cache, on miss reads DB and populates
- [ ] B. Write-through — write to cache and DB simultaneously
- [ ] C. Write-behind — write to cache, async flush to DB (fast writes, some loss risk)
- [ ] D. Read-through — app only talks to cache; cache loads on miss

**Answer:** A, B, C, D

**Explanation:** All four patterns match the caching lesson.

**Source:** [docs/day-05/05-caching.md](../docs/day-05/05-caching.md)

---

### Q16 [Medium] — Read Replicas

**Select all that apply.**

Which statements about read replicas are correct?

- [ ] A. Primary handles writes; replicas handle reads
- [ ] B. Replication lag can cause briefly stale reads on replicas
- [ ] C. Best when read:write ratio is 10:1 or higher
- [ ] D. Replicas eliminate the single primary write bottleneck

**Answer:** A, B, C

**Explanation:** Primary/replica split, lag, and high read ratios are documented. Writes still go to one primary — replicas don't remove write bottleneck (D).

**Source:** [docs/day-05/06-db-scaling.md](../docs/day-05/06-db-scaling.md)

---

### Q17 [Medium] — Queue Types

**Select all that apply.**

Which message system models are described?

- [ ] A. Point-to-point queue — one consumer per message (SQS, RabbitMQ queue mode)
- [ ] B. Pub/sub — one message copied to many subscribers (Kafka topic, Google Pub/Sub)
- [ ] C. Stream/log — ordered log, consumers read at own pace, replay possible (Kafka)
- [ ] D. All three are identical with no practical differences

**Answer:** A, B, C

**Explanation:** Point-to-point, pub/sub, and stream models are distinct with different use cases. They are not identical (D).

**Source:** [docs/day-05/07-queue.md](../docs/day-05/07-queue.md)

---

### Q18 [Medium] — When to Use a Queue

**Select all that apply.**

For which scenarios does the curriculum recommend using a queue?

- [ ] A. Send email after signup
- [ ] B. Resize uploaded image in background
- [ ] C. Read product list synchronously
- [ ] D. Nightly report generation

**Answer:** A, B, D

**Explanation:** Email, image processing, and reports are async queue use cases. Product list reads should be synchronous with caching (C).

**Source:** [docs/day-05/07-queue.md](../docs/day-05/07-queue.md)

---

### Q19 [Medium] — Worker Types

**Select all that apply.**

Which worker types are listed?

- [ ] A. Queue worker — processes messages from queue
- [ ] B. Cron / scheduled — time-based jobs (nightly backup)
- [ ] C. Event consumer — reacts to pub/sub events
- [ ] D. Stream processor — Kafka consumer for real-time aggregation

**Answer:** A, B, C, D

**Explanation:** All four worker types appear in the worker types table.

**Source:** [docs/day-05/08-microservices-and-workers.md](../docs/day-05/08-microservices-and-workers.md)

---

### Q20 [Medium] — DNS vs Load Balancer

**Select all that apply.**

How does DNS round-robin compare to a dedicated load balancer?

- [ ] A. DNS round-robin — client picks IP from DNS; no health checks
- [ ] B. Load balancer — actively distributes with health checks
- [ ] C. DNS caching slows failover; LB fails over faster
- [ ] D. Best practice: DNS points to LB IP; LB distributes to backends

**Answer:** A, B, C, D

**Explanation:** All four points match the DNS round-robin vs load balancer comparison.

**Source:** [docs/day-05/02-load-balancer.md](../docs/day-05/02-load-balancer.md)

---

### Q21 [Hard] — Sticky Sessions

**Select all that apply.**

When should you use or avoid sticky sessions (session affinity)?

- [ ] A. Use when server stores session in memory (legacy apps)
- [ ] B. Avoid when stateless apps use JWT
- [ ] C. Prefer stateless servers + shared session store (Redis) when possible
- [ ] D. Always use sticky sessions for every production app

**Answer:** A, B, C

**Explanation:** Sticky sessions help legacy in-memory sessions; JWT/stateless apps don't need them. Shared session store is preferred over sticky when possible. Not always required (D).

**Source:** [docs/day-05/02-load-balancer.md](../docs/day-05/02-load-balancer.md)

---

### Q22 [Hard] — CDN Cache Control

**Select all that apply.**

Which CDN caching practices are recommended?

- [ ] A. Version assets in filename (`app.v2.4.1.js`) to avoid stale JS after deploy
- [ ] B. `Cache-Control: public, max-age=31536000` for versioned static assets
- [ ] C. `Cache-Control: no-store` on personalized user dashboards
- [ ] D. Purge cache or version filenames after deploy if TTL is long

**Answer:** A, B, C, D

**Explanation:** Versioned assets, long TTL for static versioned files, no-store for personalized data, and purge/version on deploy are all covered.

**Source:** [docs/day-05/04-cdn.md](../docs/day-05/04-cdn.md)

---

### Q23 [Hard] — Cache Problems

**Select all that apply.**

Which cache problems and fixes are listed?

- [ ] A. Cache stampede — lock so one request rebuilds; others wait
- [ ] B. Cache penetration — cache empty/null results with short TTL
- [ ] C. Stale data — invalidate on write or use short TTL
- [ ] D. Cache avalanche — circuit breaker, fallback, Redis cluster

**Answer:** A, B, C, D

**Explanation:** All four problems and fixes appear in the cache problems section.

**Source:** [docs/day-05/05-caching.md](../docs/day-05/05-caching.md)

---

### Q24 [Hard] — Sharding

**Select all that apply.**

Which statements about database sharding are accurate?

- [ ] A. Splits data across multiple DBs by shard key (e.g., `user_id % 4`)
- [ ] B. Good shard key: `user_id` (evenly distributed)
- [ ] C. Bad shard key: `country` if one country has 80% of data
- [ ] D. Avoid sharding until vertical scaling + replicas + caching aren't enough

**Answer:** A, B, C, D

**Explanation:** All four reflect sharding guidance from DB scaling.

**Source:** [docs/day-05/06-db-scaling.md](../docs/day-05/06-db-scaling.md)

---

### Q25 [Hard] — Queue Idempotency and DLQ

**Select all that apply.**

Which queue design practices are emphasized?

- [ ] A. Include unique message ID for idempotency
- [ ] B. Consumers may process same message twice — design idempotent handlers
- [ ] C. After max retries, move poison messages to DLQ and alert
- [ ] D. Never use DLQ — always retry forever

**Answer:** A, B, C

**Explanation:** Message IDs, idempotent consumers, and DLQ routing are best practices. Infinite retry without DLQ traps poison messages (D).

**Source:** [docs/day-05/07-queue.md](../docs/day-05/07-queue.md)

---

### Q26 [Hard] — Microservices Boundaries

**Select all that apply.**

Which service boundary principles are correct?

- [ ] A. Split by business domain (User, Order, Payment) — not technical layer
- [ ] B. Bad boundaries: Controller Service, Database Service
- [ ] C. Start monolith; extract when you feel real pain
- [ ] D. Extract 20 microservices overnight for any growing app

**Answer:** A, B, C

**Explanation:** Domain boundaries, anti-patterns, and "start monolith" are explicit. Don't split into many services overnight (D).

**Source:** [docs/day-05/08-microservices-and-workers.md](../docs/day-05/08-microservices-and-workers.md)

---

### Q27 [Hard] — Saga Pattern

**Select all that apply.**

Which saga steps match the Place Order example?

- [ ] A. Order Service creates order (PENDING)
- [ ] B. Payment Service charges card
- [ ] C. Payment success → Order marked CONFIRMED
- [ ] D. Payment failure → Order marked CANCELLED; compensate if needed

**Answer:** A, B, C, D

**Explanation:** All four steps appear in the saga pattern example for distributed transactions.

**Source:** [docs/day-05/08-microservices-and-workers.md](../docs/day-05/08-microservices-and-workers.md)

---

### Q28 [Hard] — Architecture Flow

**Select all that apply.**

Which components appear in the Day 5 full-stack architecture flow?

- [ ] A. User → DNS → Load Balancer / Reverse Proxy
- [ ] B. Web/API → Cache / Queue → Workers / DB
- [ ] C. CDN serves static assets in parallel path
- [ ] D. Browser connects directly to PostgreSQL without any proxy

**Answer:** A, B, C

**Explanation:** The Day 5 diagram shows DNS → LB/proxy → app → cache/queue/workers/DB, with CDN for static. DB is not browser-facing (D).

**Source:** [docs/day-05/README.md](../docs/day-05/README.md)

---

### Q29 [Hard] — Redis vs Memcached

**Select all that apply.**

Which Redis vs Memcached comparisons are from the curriculum?

- [ ] A. Redis supports strings, lists, sets, hashes; Memcached strings only
- [ ] B. Redis has optional persistence; Memcached is pure memory
- [ ] C. Redis is the default choice for most new projects
- [ ] D. Memcached supports pub/sub and clustering natively like Redis

**Answer:** A, B, C

**Explanation:** Redis data structures, persistence, and default recommendation are listed. Memcached lacks pub/sub; Redis has clustering (D is wrong).

**Source:** [docs/day-05/05-caching.md](../docs/day-05/05-caching.md)

---

### Q30 [Hard] — Adoption Stages

**Select all that apply.**

Which architecture stages match the "When to Adopt What" table?

- [ ] A. MVP/startup → monolith + Redis + single DB
- [ ] B. Growing → monolith + cache + read replicas + queue + workers
- [ ] C. Scale → extract hot services + CDN + DB sharding
- [ ] D. Large org → full microservices + event bus + worker fleets

**Answer:** A, B, C, D

**Explanation:** All four stages appear in the adoption progression table.

**Source:** [docs/day-05/08-microservices-and-workers.md](../docs/day-05/08-microservices-and-workers.md)
