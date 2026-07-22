# Synthesis — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-13-answers.md](./answer-key/day-13-answers.md)





---

### Q01









**Context:** A team interview practice: 100M new short URLs per month, ~500 bytes per row including indexes overhead in the estimate.

**Select all that apply.**

Which back-of-envelope conclusions are sound?

- [ ] A. Average write QPS ≈ 100M / 2.5M seconds/month → on the order of 40 writes/s
- [ ] B. Read QPS is often 10–100× writes for URL lookup workloads
- [ ] C. Raw storage is only about 6 GB/year, so replication and headroom are negligible
- [ ] D. At this scale, multi-region active-active is mandatory on day one

---

### Q02










**Select all that apply.**

Which approximations are commonly used in interview-style capacity math?

- [ ] A. ~10^5 seconds per day (86,400) for QPS from daily actions
- [ ] B. Interview estimates must be exact to within 1%; order-of-magnitude reasoning is not useful
- [ ] C. Cross-region RTT is typically ~0.5–2 ms — same as in-DC hops
- [ ] D. ~2.5 × 10^6 seconds per month for monthly write rates

---

### Q03










**Context:** A team models a chat product: 50M DAU, 20 messages per user per day.

**Select all that apply.**

What follows from the estimation approach?

- [ ] A. At ~11K writes/s average, a single unpartitioned SQLite file is always sufficient without further analysis
- [ ] B. Message write rate ≈ 50M × 20 / 86,400 → ~11,500 msg/s average
- [ ] C. Fan-out to recipients and presence often dominate design more than raw average QPS alone
- [ ] D. Peak QPS should be assumed equal to average QPS unless the product already has an outage

---

### Q04










**Context:** A team sketches a social feed: 100 reads per write on the hot path.

**Select all that apply.**

Which architecture leans are justified by the read/write split guidance?

- [ ] A. Identify whether CPU, disk IOPS, network, or storage is the bottleneck resource
- [ ] B. Separate read and write QPS estimates before picking components
- [ ] C. A 100:1 read/write ratio makes caching ineffective because writes dominate invalidation
- [ ] D. Write-heavy partitioning and queue absorption are the primary first lever

---

### Q05










**Select all that apply.**

Which practices improve back-of-envelope estimates in design reviews?

- [ ] A. Pick Kafka first, then derive QPS to match the choice
- [ ] B. Round aggressively (e.g., 2,314 → ~2,000) to keep math tractable
- [ ] C. Combine reads and writes into one QPS number because their resource costs are interchangeable
- [ ] D. State assumptions aloud: peak factor, bytes per row, retention

---

### Q06










**Context:** A team compares two products: ~100 req/s sustained vs ~10K req/s peak.

**Select all that apply.**

Which implications match the scale table mindset?

- [ ] A. ~10K req/s typically pushes cache, replicas, and careful indexing
- [ ] B. At ~100K req/s, a single unpartitioned process is the default regardless of workload
- [ ] C. ~100 req/s often allows single region and a simpler database story
- [ ] D. Every product above 50 req/s requires sharded Cassandra on launch day

---

### Q07










**Select all that apply.**

Which steps belong in the recommended design decision order before naming specific products?

- [ ] A. Open with “we’ll use Kafka and microservices” and backfill requirements later
- [ ] B. Delay scale estimates and API shapes until after selecting vendors
- [ ] C. Data model, high-level components, then deepen bottlenecks and failure modes
- [ ] D. Clarify functional and non-functional requirements (SLA, consistency, budget, geo)

---

### Q08










**Select all that apply.**

Which questions should you ask early in a A team-style interview?

- [ ] A. Who are the users, DAU, and geographic spread?
- [ ] B. p99 latency targets and availability nines per critical path?
- [ ] C. Consistency and money-path questions can wait until implementation because they do not affect architecture
- [ ] D. Which logo color the mobile app uses for the loading spinner

---

### Q09










**Context:** A team’s storefront sends order confirmation email after checkout succeeds.

**Select all that apply.**

When does async messaging fit the decision framework?

- [ ] A. Retries and buffering help when downstream consumers are slow or flaky
- [ ] B. The user must see payment authorization result in the same synchronous response
- [ ] C. Fan-out to email, analytics, and search index without blocking the HTTP response
- [ ] D. Any work over 100 ms must remain synchronous so queues cannot absorb spikes

---

### Q10










**Select all that apply.**

Which match the “don’t design day-one like hyperscaler year-three” guidance?

- [ ] A. Launch v1 with multi-region active-active inventory and event-source every entity
- [ ] B. Shard every database and add physical CQRS before measuring a scaling bottleneck
- [ ] C. Growth: replicas, CDN, queues for notifications
- [ ] D. v1: single region, primary DB, simple cache

---

### Q11










**Select all that apply.**

Which definitions are accurate?

- [ ] A. Eventual consistency — every read is linearizable across all regions
- [ ] B. Idempotent — guaranteed to execute exactly once with no retries
- [ ] C. SPOF — single point of failure
- [ ] D. DLQ — dead-letter queue for poison or repeatedly failing messages

---

### Q12










**Context:** A team estimates API egress: 2,000 QPS × 50 KB JSON responses (no video in this path).

**Select all that apply.**

Which estimation notes apply?

- [ ] A. Bandwidth for 50 KB JSON responses is negligible at any QPS without calculation
- [ ] B. Include replicas, indexes, and backups when estimating storage — not only raw row size
- [ ] C. Media bandwidth can be inferred from JSON response size, so it needs no separate estimate
- [ ] D. Egress ≈ QPS × response_bytes × 8 for bits per second mindset

---

### Q13










**Select all that apply.**

Which rules of thumb appear in system design?

- [ ] A. Plan ~30–50% headroom instead of running continuously at 100% utilization
- [ ] B. Cache hit ratio goals for hot keys are often > 80–90% when caching helps
- [ ] C. DB connection pool size should equal max_connections × number of pods
- [ ] D. Capacity should target average load with no peak factor or utilization headroom

---

### Q14










**Context:** A team records 500M rows/year at 2 KB logical size; 3× replication; indexes add ~30%.

**Select all that apply.**

Which storage math and habits are appropriate?

- [ ] A. Base ≈ records × bytes × time; multiply copies and index overhead explicitly
- [ ] B. Revisit estimates when retention or features change requirements
- [ ] C. Ignore backups and logs if the interviewer only asked for “database size”
- [ ] D. Keep every intermediate byte exact and omit the growth horizon to avoid approximation

---

### Q15










**Select all that apply.**

Which choices align with the short decision tree for transactions?

- [ ] A. Cross-service money flows should default to one long XA transaction through external providers
- [ ] B. Multi-row ACID inside one service → relational DB with local transactions
- [ ] C. Must every reader see latest write? If yes → strong consistency path; if no → eventual + UX for lag
- [ ] D. Every microservice sharing one writable Postgres schema for convenience

---

### Q16










**Context:** A team’s catalog page is read-heavy; occasional stale price for seconds is acceptable; balances are not on this path.

**Select all that apply.**

Which caching rules apply?

- [ ] A. Cache account balances on this catalog path without a strong read path
- [ ] B. TTL on cached entries or an explicit invalidation plan
- [ ] C. Cache-aside guarantees cached catalog values can never become stale, even without TTL or invalidation
- [ ] D. Stampede protection (singleflight / lock / probabilistic early expiry) on hot keys

---

### Q17










**Select all that apply.**

Which messaging rules of thumb are emphasized?

- [ ] A. Randomly partition every event independently when per-entity ordering matters
- [ ] B. Use the Kafka topic as the system of record for all CRUD without projections
- [ ] C. At-least-once delivery with idempotent consumers as default
- [ ] D. Outbox pattern over dual-write to DB and broker

---

### Q18










**Select all that apply.**

Which pattern–idea pairs are correct from the catalog?

- [ ] A. Bloom filter — guarantees a key is definitely present in the database
- [ ] B. API Gateway — auth, rate limiting, routing entry
- [ ] C. CDN — edge cache for static assets and media segments
- [ ] D. Transactional outbox — publish to the broker first, then update the database in an unrelated transaction

---

### Q19










**Select all that apply.**

Which statements reflect the trade-off matrix?

- [ ] A. Availability-first (AP) designs may serve stale or conflicting data
- [ ] B. Strong consistency can increase latency and may refuse writes under partition
- [ ] C. Strong consistency and zero latency under partition are always simultaneously achievable
- [ ] D. PACELC says healthy-network latency is unrelated to consistency choices

---

### Q20










**Context:** A team’s interview app serves JS bundles and product images globally; API stays origin-hosted.

**Select all that apply.**

Which component choices fit the selection guide?

- [ ] A. A load balancer should keep routing traffic to unhealthy instances to preserve stickiness
- [ ] B. API Gateway for auth, rate limits, and routing to services
- [ ] C. Relational DB as primary store for multi-GB video blobs
- [ ] D. CDN for static assets and video/image segments

---

### Q21










**Select all that apply.**

Which need → component mappings are appropriate?

- [ ] A. Full-text search and autocomplete are best implemented as normalized relational joins with no search index
- [ ] B. Immutable replayable facts belong only in an in-memory cache with no durable retention
- [ ] C. Session, rate limits, hot keys → Redis / Memcached class KV
- [ ] D. Transactions, relations, constraints → relational database

---

### Q22










**Context:** A team reviews a replicated KV sketch: N=3, W=2, R=2.

**Select all that apply.**

Which statements are valid?

- [ ] A. W + R > N gives quorum overlap for read/write intersection under the model discussed
- [ ] B. Prefer distributed 2PC over local ACID even when all affected rows share one database
- [ ] C. Shard on a random UUID when the product requires efficient range scans on creation time
- [ ] D. Unique constraints should live in the database, not app-only checks

---

### Q23










**Select all that apply.**

Which observability defaults are listed?

- [ ] A. USE (Utilization, Saturation, Errors) for resources
- [ ] B. Assign a new unrelated correlation ID at every hop so end-to-end tracing cannot join spans
- [ ] C. Alert on every CPU blip instead of SLO error-budget burn
- [ ] D. RED (Rate, Errors, Duration) for services

---

### Q24










**Context:** A team checkout spans order service, inventory, and external payment provider.

**Select all that apply.**

Which patterns fit?

- [ ] A. Two-phase commit spanning the payment provider and internal Postgres
- [ ] B. Circuit breaker on payment client to stop cascades
- [ ] C. A saga relies on automatic cross-service SQL rollback and needs no compensating action
- [ ] D. Idempotency keys on create and payment calls

---

### Q25










**Select all that apply.**

Which reliability pattern descriptions are accurate?

- [ ] A. Circuit breaker — retry every failing dependency call indefinitely with no backoff
- [ ] B. Bulkhead — isolate pools so one noisy neighbor does not exhaust all threads
- [ ] C. Graceful degradation — keep core path alive when non-critical features fail
- [ ] D. Retry without jitter on all POST endpoints including non-idempotent creates

---

### Q26










**Context:** A team teams debate three services all updating the same `users` table in one shared database.

**Select all that apply.**

Which align with data ownership rules?

- [ ] A. Document explicit consistency per API including stale windows where eventual
- [ ] B. Each piece of data should have one write owner
- [ ] C. Shared writable DB across many services is acceptable if migrations are coordinated
- [ ] D. Other services get copies via events, CDC, or API — not shared mutable writes

---

### Q27










**Select all that apply.**

Which trade-off rows are represented?

- [ ] A. Event log eliminates all need for materialized views or projections
- [ ] B. Relational — gains transactions, joins, constraints; horizontal scale is harder
- [ ] C. Event log — gains replay and fan-out; pays projection lag and ops complexity
- [ ] D. Document/KV — flexible scale by key; weaker joins and multi-row transactions

---

### Q28










**Select all that apply.**

Which are correct?

- [ ] A. Linearizability — same as “best-effort async with no guarantees”
- [ ] B. Poison message — a message that repeatedly fails processing
- [ ] C. PACELC — if partition, choose A or C; else latency vs consistency
- [ ] D. Read-your-writes — a user sees their own updates in session

---

### Q29










**Context:** A team walks through ShopFast-like e-commerce: 2M DAU, 500 QPS peak checkout, 15K QPS peak catalog browse, payment correctness required, email async.

**Select all that apply.**

Which architecture choices match the reference walkthrough?

- [ ] A. Postgres local transactions for inventory decrement where possible
- [ ] B. Event-source every entity and multi-region active-active inventory in v1
- [ ] C. Outbox → Kafka (or similar) instead of dual-write to DB and broker
- [ ] D. CDN + cache for catalog browse; checkout modest QPS but correctness-first

---

### Q30










**Select all that apply.**

What should a complete design narrative include?

- [ ] A. A named bottleneck and consistency story per path
- [ ] B. Failure story per major component and observability to detect breakage
- [ ] C. Written requirements and rough scale numbers
- [ ] D. Technology choices alone are sufficient — skip documenting trade-offs and scale evolution

---

### Q31










**Context:** A team’s ShopFast practice design: payment provider times out; Kafka relay is down; email workers lag.

**Select all that apply.**

Which responses match the reference failure table?

- [ ] A. Email worker down → checkout still succeeds; notification lag acceptable
- [ ] B. Kafka down → outbox retains events; relay catches up when broker returns
- [ ] C. Payment timeout → idempotent retry / status confirm; avoid duplicate order rows
- [ ] D. Kafka down → fail checkout synchronously until broker recovers

---

### Q32










**Context:** A team documents consistency per path for ShopFast-style commerce.

**Select all that apply.**

Which path → model pairings fit the walkthrough?

- [ ] A. Inventory decrement — strong (transactional)
- [ ] B. Catalog search index — eventual (seconds of lag OK)
- [ ] C. “My orders” list — read-your-writes (primary read or equivalent)
- [ ] D. Marketing email open counts — strong linearizable global ordering required on checkout path

---

### Q33










**Select all that apply.**

Which trade-off statements are accurate?

- [ ] A. Kappa — single stream with replay discipline; retention matters
- [ ] B. Lambda architecture — batch correctness path plus speed layer; dual logic cost
- [ ] C. Real-time everything — freshness at higher cost and complexity
- [ ] D. Batch everything — always best for user-facing checkout authorization

---

### Q34










**Context:** A team asks: “What changes at 10× for ShopFast hot SKUs and global users?”

**Select all that apply.**

Which evolutions are reasonable?

- [ ] A. Shard inventory or serialize per-SKU updates for hot items
- [ ] B. Mandate 2PC with external payment provider before any sharding discussion
- [ ] C. Regional catalog with careful payment and compliance story for global users
- [ ] D. Lake + stream tier for heavier analytics

---

### Q35










**Select all that apply.**

Which insights connect estimation constants to design?

- [ ] A. DRAM ~100 ns, SSD ~100 µs, in-DC network ~0.5–2 ms — hierarchy motivates caching
- [ ] B. Cross-region ~50–150 ms — avoid on synchronous checkout-critical paths
- [ ] C. User-visible timeout should fail fast rather than hang indefinitely
- [ ] D. Cross-region synchronous chains are fine for sub-100 ms p99 checkout SLOs

---

### Q36










**Context:** A team grades mock interviews on operability, not only boxes and arrows.

**Select all that apply.**

Which observability items fit ShopFast-style checkout?

- [ ] A. Trace `checkout_id` or `idempotency_key` across hops
- [ ] B. Checkout observability needs only host CPU; outbox and consumer lag are irrelevant
- [ ] C. RED on gateway, checkout service, and payment client
- [ ] D. Saga / stuck-order metrics and alerts

---

### Q37










**Select all that apply.**

Which trade-off framing matches the matrix?

- [ ] A. Managed services — speed and ops offload; less control and ongoing cost
- [ ] B. Boring tech — predictability; may not be perfect fit
- [ ] C. Self-host — control at people-and-ops cost
- [ ] D. Newest database on launch — always lowers risk and hiring cost

---

### Q38










**Select all that apply.**

For mid-scale e-commerce v1 (single region, correctness-focused checkout), which are reasonable explicit non-goals?

- [ ] A. Multi-region active-active inventory
- [ ] B. Event-source every entity on day one
- [ ] C. Real-time OLAP on the checkout critical path
- [ ] D. Idempotency keys on payment and order create

---

### Q39










**Select all that apply.**

For user-facing request/response paths, which guidance applies?

- [ ] A. Slow or background work → async queue or stream
- [ ] B. Every internal call should be async even when the user waits for the HTTP response
- [ ] C. User needs answer now → sync path; add cache if read-heavy
- [ ] D. Money or stock on write path → strong write path and careful retries (idempotent only)

---

### Q40










**Context:** A team’s final interview: candidate must tie requirements, numbers, diagram, failures, and metrics in 35 minutes.

**Select all that apply.**

Which checklist items reflect the end-to-end template?

- [ ] A. Consistency map and failure table per major dependency
- [ ] B. Observability story (metrics, traces, SLOs) tied to user-visible paths
- [ ] C. Start the clock by listing every pattern from the catalog alphabetically
- [ ] D. Requirements → estimation → high-level diagram → decisions with “because”

---

### Q41






**Select all that apply.**

A payment may have succeeded before timeout. Which responses are sound?

- [ ] A. Reconcile uncertain outcomes
- [ ] B. Create a new payment ID per retry
- [ ] C. Retry with the same idempotency key
- [ ] D. Query provider status

---

### Q42






**Select all that apply.**

Kafka is down after an order and outbox commit. Which outcomes are intended?

- [ ] A. The outbox is discarded
- [ ] B. Views temporarily lag
- [ ] C. The order remains committed
- [ ] D. The relay publishes later

---

### Q43






**Select all that apply.**

Which consistency choices fit commerce?

- [ ] A. Eventual catalog search
- [ ] B. Strong inventory decrement
- [ ] C. Eventual uniqueness without constraints
- [ ] D. Read-your-writes order confirmation

---

### Q44






**Select all that apply.**

Which signals belong in checkout observability?

- [ ] A. Checkout success and p99
- [ ] B. Host CPU alone is sufficient; asynchronous pipeline lag need not be measured
- [ ] C. Payment errors and timeouts
- [ ] D. Correlated checkout IDs

---

### Q45






**Select all that apply.**

A flash sale creates one hot SKU. Which responses fit?

- [ ] A. Per-SKU serialization
- [ ] B. Admission control
- [ ] C. Conditional inventory updates
- [ ] D. Random overselling

---

### Q46






**Select all that apply.**

Which changes are justified at 10× growth?

- [ ] A. Re-estimate first
- [ ] B. Shard pressured workflows
- [ ] C. Regionalize catalog reads
- [ ] D. Replace all proven technology

---

### Q47






**Select all that apply.**

Which omissions keep commerce v1 simpler?

- [ ] A. Avoid unneeded active-active inventory
- [ ] B. Keep OLAP off checkout
- [ ] C. Remove payment idempotency
- [ ] D. Do not event-source every entity

---

### Q48






**Select all that apply.**

How should a design choice be defended?

- [ ] A. Compare gains and costs
- [ ] B. Tie it to requirements
- [ ] C. State revisit triggers
- [ ] D. Say only that it depends

---

### Q49






**Select all that apply.**

A small single-team product proposes microservices. Which cautions apply?

- [ ] A. More services always improve availability
- [ ] B. Distributed operations add cost
- [ ] C. A modular monolith preserves local transactions
- [ ] D. Boundaries need domain or scale reasons

---

### Q50






**Select all that apply.**

Which elements complete an end-to-end design?

- [ ] A. Requirements, estimates, and APIs
- [ ] B. Data, components, and consistency
- [ ] C. Failures, observability, and evolution
- [ ] D. Vendor names without reasons
