# Infrastructure Components — MCQ Questions (30)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-05-answers.md](./answer-key/day-05-answers.md)

---

### Q01 [Easy] [Case Study] — DNS Cutover for a Replatform


**Context:** MediaCo is moving `www.mediacorp.com` from an old datacenter IP to AWS. The current DNS TTL is 86400 seconds (24 hours). The cutover is in 48 hours.

**Select all that apply.**

Why does DNS matter for this migration, and what should the team plan for?

- [ ] A. DNS maps human-readable names to IP addresses shoppers use to connect
- [ ] B. Updating A records lets users keep the same URL when the origin IP changes
- [ ] C. Multiple A records can provide basic load distribution at the DNS layer
- [ ] D. DNS alone replaces dedicated load balancers with health checks

---

### Q02 [Easy] — DNS Record Types for Dual-Stack Hosting


**Select all that apply.**

You must serve the same hostname over IPv4 and IPv6. Which DNS record types do you configure?

- [ ] A. A — maps hostname to IPv4
- [ ] B. AAAA — maps hostname to IPv6
- [ ] C. CNAME — alias to another hostname
- [ ] D. MX — mail server routing for `@domain.com`

---

### Q03 [Easy] [Case Study] — Black Friday at RetailHub


**Context:** RetailHub runs three identical web servers behind an ALB serving 2,000 req/s normally. Black Friday expects 8,000 req/s. One server must be drained for a security patch during the event.

**Select all that apply.**

Why is a load balancer critical for RetailHub?

- [ ] A. Spread traffic so no single server is overwhelmed
- [ ] B. Stop sending traffic to unhealthy servers via health checks
- [ ] C. Drain one server for patching while others continue serving
- [ ] D. Eliminate the need for more than one backend server

---

### Q04 [Easy] — Choosing L4 vs L7 for an API Gateway


**Select all that apply.**

Your platform terminates HTTPS and routes `/api/*` to microservices while `/static/*` goes to object storage. Which statements about load balancer layers are correct?

- [ ] A. L4 routes by IP and port — fast, no HTTP inspection
- [ ] B. L7 routes by URL path, headers, and cookies
- [ ] C. L7 can terminate SSL/TLS at the edge
- [ ] D. L4 alone can route `/api/*` differently from `/static/*`

---

### Q05 [Easy] [Case Study] — Nginx as the Public Face of ShopCore


**Context:** ShopCore runs Nginx as the only public IP. It terminates TLS, serves `/static/` directly from disk, and `proxy_pass`es `/api/` to internal Node servers on a private subnet. Backend servers have no public addresses.

**Select all that apply.**

Which reverse-proxy responsibilities is Nginx fulfilling?

- [ ] A. Hide internal topology — clients see one address
- [ ] B. SSL termination at the edge
- [ ] C. Serve static CSS/JS without hitting application servers
- [ ] D. Replace all business logic in backend applications

---

### Q06 [Easy] [Case Study] — Global Shoppers for StaticHub


**Context:** StaticHub hosts images and JS in US-East. European users report 800ms+ load times for assets. Origin bandwidth bills are climbing. Assets change infrequently and are the same for all users.

**Select all that apply.**

Which CDN benefits address StaticHub's problems?

- [ ] A. Serve content from edge nodes near users — lower latency
- [ ] B. Absorb static traffic so origin is not hit on every request
- [ ] C. Distribute bandwidth across many edge locations
- [ ] D. Guarantee strong consistency for personalized bank balances at the edge

---

### Q07 [Easy] — Cache Layers in a Typical Web Stack


**Select all that apply.**

From the user's browser down to the database, which cache layers appear in a common production stack?

- [ ] A. Browser cache on the user's device
- [ ] B. CDN / edge cache near the user
- [ ] C. Application cache (Redis or Memcached) near app servers
- [ ] D. Source of truth in the database or origin API

---

### Q08 [Easy] — Database Showing Early Strain


**Select all that apply.**

Your PostgreSQL primary shows slow queries and connection errors under growth. Which scaling steps should be applied **before** jumping to sharding?

- [ ] A. Optimize queries and add indexes
- [ ] B. Add Redis to offload hot reads
- [ ] C. Add read replicas for read-heavy workloads
- [ ] D. Shard all tables immediately on day one

---

### Q09 [Easy] — When a Queue Beats a Synchronous Call


**Select all that apply.**

Which are core properties of a message queue in a web application?

- [ ] A. Producer sends work; consumer processes asynchronously
- [ ] B. Broker can persist messages through server restarts
- [ ] C. Dead Letter Queue holds messages that fail repeatedly
- [ ] D. Caller always blocks until the consumer finishes

---

### Q10 [Easy] — Microservices for a 200-Engineer Org


**Select all that apply.**

A large product org splits checkout, catalog, and search into separate deployable services with separate databases. Which benefits are they seeking?

- [ ] A. Scale search independently of billing
- [ ] B. Teams own services end-to-end
- [ ] C. Fault isolation — payment outage does not necessarily take down browse
- [ ] D. Lower operational complexity than a single monolith

---

### Q11 [Medium] [Case Study] — TTL Trap During Failover


**Context:** FailoverCo points `app.failoverco.com` to a hot standby during primary datacenter failure. TTL was 3600s. Many users still hit the dead primary for 45 minutes after DNS was updated.

**Select all that apply.**

Which TTL trade-offs explain the pain?

- [ ] A. High TTL — fewer DNS queries but slower failover propagation
- [ ] B. Low TTL — faster failover but more DNS query load
- [ ] C. Cached DNS answers mean failover is never instant worldwide
- [ ] D. High TTL is ideal during an emergency cutover

---

### Q12 [Medium] — Picking a Load Balancing Algorithm


**Select all that apply.**

Which algorithm pairings fit these production situations?

- [ ] A. Equal-capacity servers → round robin
- [ ] B. Long-lived WebSocket connections → least connections
- [ ] C. Session stickiness by client IP → IP hash
- [ ] D. Mixed server sizes → weighted round robin

---

### Q13 [Medium] — Nginx as Reverse Proxy and Load Balancer


**Select all that apply.**

Your team runs Nginx in front of four identical API servers with path-based routing and SSL termination. Which statements are accurate?

- [ ] A. Reverse proxy and load balancer roles often overlap in one tool
- [ ] B. Reverse proxy focus — represent backends, route, protect
- [ ] C. Load balancer focus — spread connections across healthy backends
- [ ] D. They are completely unrelated — never combined

---

### Q14 [Medium] — CDN vs Redis for Product Pages


**Select all that apply.**

ShopExample caches product JSON in Redis and static JS on CloudFront. Which distinctions are correct?

- [ ] A. CDN caches HTTP responses at geographic edge nodes
- [ ] B. Redis caches application data near app servers
- [ ] C. CDN suits public static assets; Redis suits DB query results and sessions
- [ ] D. Using both is redundant — pick only one

---

### Q15 [Medium] — Cache Pattern for Write-Heavy Counters


**Select all that apply.**

Which cache pattern descriptions match real production use cases?

- [ ] A. Cache-aside — app checks cache, on miss loads from DB
- [ ] B. Write-through — write updates cache and DB together
- [ ] C. Write-behind — write to cache, async flush to DB
- [ ] D. Read-through — app talks only to cache; cache loads on miss

---

### Q16 [Medium] [Case Study] — Stale Prices on Read Replicas


**Context:** DealMart serves product pages from PostgreSQL read replicas. After a flash sale price update on the primary, 8% of users still see the old price for up to 2 seconds. Finance accepts brief staleness on browse but not after a user completes checkout.

**Select all that apply.**

Which read-replica behaviors and mitigations apply?

- [ ] A. Primary handles writes; replicas serve most reads
- [ ] B. Replication lag can cause briefly stale reads on replicas
- [ ] C. Read-your-writes — route a user's reads to primary after their write
- [ ] D. Replicas remove the single-primary write bottleneck entirely

---

### Q17 [Medium] — Queue vs Pub/Sub vs Stream


**Select all that apply.**

Which message system models match these needs?

- [ ] A. Background image resize jobs — point-to-point queue (SQS-style)
- [ ] B. Order placed → email, inventory, analytics all react — pub/sub topic
- [ ] C. Audit log replay and analytics — Kafka-style ordered stream
- [ ] D. All three models are identical with no practical differences

---

### Q18 [Medium] — Should This Work Go on a Queue?


**Select all that apply.**

Your API team is deciding sync vs async processing. Which workloads should use a queue?

- [ ] A. Send welcome email after signup
- [ ] B. Resize uploaded profile photo in background
- [ ] C. Fetch product list for a product grid page
- [ ] D. Generate nightly sales PDF report

---

### Q19 [Medium] — Worker Types in a Production Stack


**Select all that apply.**

Which background worker types appear in mature systems?

- [ ] A. Queue worker — processes messages as they arrive
- [ ] B. Cron job — scheduled tasks like nightly backups
- [ ] C. Event consumer — reacts to pub/sub events
- [ ] D. Stream processor — aggregates Kafka events in real time

---

### Q20 [Medium] [Case Study] — DNS Round-Robin vs ALB


**Context:** StartupX returns three A records for `api.startupx.com` from DNS. During a server failure, clients still connect to the dead IP until TTL expires. The SRE team proposes a single A record pointing to an AWS ALB instead.

**Select all that apply.**

Which comparisons justify the change?

- [ ] A. DNS round-robin — client picks an IP; no active health checks
- [ ] B. ALB — actively distributes only to healthy targets
- [ ] C. DNS caching slows failover; ALB removes dead targets quickly
- [ ] D. Best practice — DNS points to LB; LB distributes to backends

---

### Q21 [Hard] [Case Study] — Sticky Sessions During Server Loss


**Context:** LegacyApp stores sessions in Tomcat memory and uses IP-hash stickiness on the load balancer. When one of four servers dies, users on that server lose sessions and checkout fails mid-flow.

**Select all that apply.**

When should stickiness be used or avoided?

- [ ] A. Use stickiness when legacy app stores session only in server memory
- [ ] B. Avoid stickiness when apps are stateless with JWT or shared Redis sessions
- [ ] C. Prefer externalized session store over stickiness when possible
- [ ] D. Always enable stickiness for every production deployment

---

### Q22 [Hard] [Case Study] — Stale JavaScript After Deploy


**Context:** DevTeam ships a new React bundle but users report broken checkout for hours. CloudFront serves `app.js` with a 1-year TTL. Filenames did not change between deploys.

**Select all that apply.**

Which CDN caching practices prevent this class of incident?

- [ ] A. Version assets in filenames (`app.v2.4.1.js` or content hash)
- [ ] B. Long `Cache-Control` on versioned immutable assets
- [ ] C. `Cache-Control: no-store` on personalized authenticated API responses
- [ ] D. Purge CDN cache or change filenames after deploys with long TTL

---

### Q23 [Hard] [Case Study] — Cache Stampede on Viral Product


**Context:** A celebrity tweet drives 50,000 req/s to one product page. Redis key `product:99999` expires. All requests miss cache simultaneously; PostgreSQL CPU hits 100% and the site returns 503s.

**Select all that apply.**

Which cache failure modes and fixes apply?

- [ ] A. Cache stampede — lock so one request rebuilds; others wait
- [ ] B. Cache penetration — cache null results for invalid IDs with short TTL
- [ ] C. Stale data — invalidate or shorten TTL on price changes
- [ ] D. Cache avalanche — Redis cluster, circuit breakers, and fallback paths

---

### Q24 [Hard] [Case Study] — Premature Sharding Proposal


**Context:** DataTeam proposes sharding `users` by `country` on day one. US accounts are 85% of rows. PostgreSQL CPU is only at 55%; p95 query time is 40ms with proper indexes and Redis caching at 92% hit rate.

**Select all that apply.**

Which sharding statements and team responses are correct?

- [ ] A. Sharding splits data across DBs by a shard key (e.g., hash of `user_id`)
- [ ] B. Bad shard key — `country` when one country dominates row count
- [ ] C. Good shard key — evenly distributed identifier like `user_id`
- [ ] D. Reject sharding now — indexes and caching have not been exhausted

---

### Q25 [Hard] [Case Study] — Poison Messages in Order Email Queue


**Context:** OrderConfirm queue depth grows. Logs show the same malformed message retrying forever — invalid email address blows up the worker. No DLQ exists. Valid orders stop getting confirmation emails.

**Select all that apply.**

Which queue design practices prevent this outage class?

- [ ] A. Include unique message ID for idempotent processing
- [ ] B. Design consumers to handle duplicate deliveries safely
- [ ] C. After max retries, move poison messages to DLQ and alert on-call
- [ ] D. Retry forever without DLQ to avoid losing any message

---

### Q26 [Hard] [Case Study] — Splitting Payment from ShopMonolith


**Context:** ShopMonolith has 30 engineers. Payment changes require full regression. The payment module needs weekly releases and different scaling from catalog. Leadership forbids a big-bang rewrite.

**Select all that apply.**

Which service boundary principles apply?

- [ ] A. Split by business domain — Payment, Order, Catalog — not by technical layer
- [ ] B. Avoid boundaries like "Controller Service" or "Database Service"
- [ ] C. Start monolith; extract when independent scale or deploy pain is real
- [ ] D. Extract 20 microservices in one release to finish faster

---

### Q27 [Hard] [Case Study] — Place Order Saga Failure


**Context:** Order Service creates PENDING orders. Payment Service charges cards via external API. On payment timeout, orders must not stay charged without confirmation; on success, orders become CONFIRMED.

**Select all that apply.**

Which saga steps handle this distributed flow?

- [ ] A. Order Service creates order in PENDING state
- [ ] B. Payment Service attempts charge
- [ ] C. Payment success → Order marked CONFIRMED
- [ ] D. Payment failure → Order CANCELLED; compensate (refund if needed)

---

### Q28 [Hard] — Production Stack Data Flow


**Select all that apply.**

Which components appear in a fully scaled production web stack handling dynamic pages and static assets?

- [ ] A. DNS → load balancer / reverse proxy → web or API tier
- [ ] B. App tier → Redis cache and message queue → background workers
- [ ] C. CDN serves static assets in parallel to dynamic origin traffic
- [ ] D. Browsers connect directly to PostgreSQL for product queries

---

### Q29 [Hard] — Redis vs Memcached for Session Store


**Select all that apply.**

Your platform team picks a cache engine for sessions and hot keys. Which comparisons are accurate?

- [ ] A. Redis supports strings, lists, sets, and hashes; Memcached is strings only
- [ ] B. Redis offers optional persistence; Memcached is pure memory
- [ ] C. Redis is the common default for new projects needing rich data structures
- [ ] D. Memcached provides native pub/sub and persistence like Redis

---

### Q30 [Hard] [Case Study] — Architecture Evolution at GrowthCo


**Context:** GrowthCo is an MVP monolith with Redis and one PostgreSQL instance. Traffic 10× in a year. Read load dominates. Email and image processing lag the API. Leadership asks for a staged plan — not a day-one microservices rewrite.

**Select all that apply.**

Which adoption stages match a sensible evolution path?

- [ ] A. MVP — monolith + Redis + single database
- [ ] B. Growth — add read replicas, CDN, queue, and workers
- [ ] C. Scale — extract hot services, CDN tuning, DB sharding if needed
- [ ] D. Large org — full microservices, event bus, worker fleets
