# Synthesis — MCQ Questions (40)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-13-answers.md](./answer-key/day-13-answers.md)




---

### Q01 [Easy] [Case Study] — DesignLab URL Shortener Writes





**Context:** DesignLab interview practice: 100M new short URLs per month, ~500 bytes per row including indexes overhead in the estimate.

**Select all that apply.**

Which back-of-envelope conclusions are sound?

- [ ] A. Read QPS is often 10–100× writes for URL lookup workloads
- [ ] B. Average write QPS ≈ 100M / 2.5M seconds/month → on the order of 40 writes/s
- [ ] C. At this scale, multi-region active-active is mandatory on day one
- [ ] D. Raw storage ~600 GB/year order of magnitude before replicas and growth headroom

---

### Q02 [Easy] — Estimation Constants





**Select all that apply.**

Which approximations are commonly used in interview-style capacity math?

- [ ] A. ~10^5 seconds per day (86,400) for QPS from daily actions
- [ ] B. ~2.5 × 10^6 seconds per month for monthly write rates
- [ ] C. Cross-region RTT is typically ~0.5–2 ms — same as in-DC hops
- [ ] D. Being wrong by ~2× on an estimate is often acceptable; wrong by 100× steers the wrong architecture

---

### Q03 [Easy] [Case Study] — DesignLab Chat Message Rate





**Context:** DesignLab models a chat product: 50M DAU, 20 messages per user per day.

**Select all that apply.**

What follows from the docs’ estimation approach?

- [ ] A. At ~11K writes/s average, a single unpartitioned SQLite file is always sufficient without further analysis
- [ ] B. Peak QPS is often estimated as average × a peak factor (commonly 2–5×)
- [ ] C. Fan-out to recipients and presence often dominate design more than raw average QPS alone
- [ ] D. Message write rate ≈ 50M × 20 / 86,400 → ~11,500 msg/s average

---

### Q04 [Easy] [Case Study] — DesignLab Read-Heavy Feed





**Context:** DesignLab sketches a social feed: 100 reads per write on the hot path.

**Select all that apply.**

Which architecture leans are justified by the read/write split guidance?

- [ ] A. Cache and read replicas are likely high-value investments
- [ ] B. Write-heavy partitioning and queue absorption are the primary first lever
- [ ] C. Separate read and write QPS estimates before picking components
- [ ] D. Identify whether CPU, disk IOPS, network, or storage is the bottleneck resource

---

### Q05 [Easy] — Estimation Habits





**Select all that apply.**

Which practices improve back-of-envelope estimates in design reviews?

- [ ] A. Pick Kafka first, then derive QPS to match the choice
- [ ] B. Round aggressively (e.g., 2,314 → ~2,000) to keep math tractable
- [ ] C. Estimate reads and writes separately
- [ ] D. State assumptions aloud: peak factor, bytes per row, retention

---

### Q06 [Easy] [Case Study] — DesignLab Traffic Tier





**Context:** DesignLab compares two products: ~100 req/s sustained vs ~10K req/s peak.

**Select all that apply.**

Which implications match the scale table mindset?

- [ ] A. ~100 req/s often allows single region and a simpler database story
- [ ] B. ~10K req/s typically pushes cache, replicas, and careful indexing
- [ ] C. ~100K+ req/s class problems usually need partitioning, CDN, async, and multiple tiers
- [ ] D. Every product above 50 req/s requires sharded Cassandra on launch day

---

### Q07 [Easy] — Design Process Order





**Select all that apply.**

Which steps belong in the recommended design decision order before naming specific products?

- [ ] A. Open with “we’ll use Kafka and microservices” and backfill requirements later
- [ ] B. Data model, high-level components, then deepen bottlenecks and failure modes
- [ ] C. Rough scale estimation and API/event shapes
- [ ] D. Clarify functional and non-functional requirements (SLA, consistency, budget, geo)

---

### Q08 [Easy] — Requirement Clarifiers





**Select all that apply.**

Which questions should you ask early in a DesignLab-style interview?

- [ ] A. Who are the users, DAU, and geographic spread?
- [ ] B. Is stale data acceptable on this path, and is money or inventory involved?
- [ ] C. p99 latency targets and availability nines per critical path?
- [ ] D. Which logo color the mobile app uses for the loading spinner

---

### Q09 [Easy] [Case Study] — DesignLab Post-Checkout Email





**Context:** DesignLab’s practice storefront sends order confirmation email after checkout succeeds.

**Select all that apply.**

When does async messaging fit the decision framework?

- [ ] A. Retries and buffering help when downstream consumers are slow or flaky
- [ ] B. Work exceeds ~100–200 ms or is spiky compared to user-facing budget
- [ ] C. The user must see payment authorization result in the same synchronous response
- [ ] D. Fan-out to email, analytics, and search index without blocking the HTTP response

---

### Q10 [Easy] — Progressive Complexity





**Select all that apply.**

Which match the “don’t design day-one like hyperscaler year-three” guidance?

- [ ] A. v1: single region, primary DB, simple cache
- [ ] B. Growth: replicas, CDN, queues for notifications
- [ ] C. Scale: shard/partition, CQRS read models where justified
- [ ] D. Launch v1 with multi-region active-active inventory and event-source every entity

---

### Q11 [Easy] — Terminology Basics





**Select all that apply.**

Which definitions are accurate?

- [ ] A. DLQ — dead-letter queue for poison or repeatedly failing messages
- [ ] B. Eventual consistency — every read is linearizable across all regions
- [ ] C. Idempotent — same effect if applied multiple times
- [ ] D. SPOF — single point of failure

---

### Q12 [Easy] [Case Study] — DesignLab Video Egress





**Context:** DesignLab estimates API egress: 2,000 QPS × 50 KB JSON responses (no video in this path).

**Select all that apply.**

Which estimation notes apply?

- [ ] A. Egress ≈ QPS × response_bytes × 8 for bits per second mindset
- [ ] B. Video and large images should be estimated separately from small JSON APIs
- [ ] C. Include replicas, indexes, and backups when estimating storage — not only raw row size
- [ ] D. Bandwidth for 50 KB JSON responses is negligible at any QPS without calculation

---

### Q13 [Medium] — Peak and Headroom





**Select all that apply.**

Which rules of thumb appear in Day 13 synthesis material?

- [ ] A. Cache hit ratio goals for hot keys are often > 80–90% when caching helps
- [ ] B. DB connection pool size should equal max_connections × number of pods
- [ ] C. Peak traffic often ≈ 2–5× average unless a known flash-sale pattern exists
- [ ] D. Plan ~30–50% headroom instead of running continuously at 100% utilization

---

### Q14 [Medium] [Case Study] — DesignLab Storage Planning





**Context:** DesignLab records 500M rows/year at 2 KB logical size; 3× replication; indexes add ~30%.

**Select all that apply.**

Which storage math and habits are appropriate?

- [ ] A. Base ≈ records × bytes × time; multiply copies and index overhead explicitly
- [ ] B. Revisit estimates when retention or features change requirements
- [ ] C. Ignore backups and logs if the interviewer only asked for “database size”
- [ ] D. Round intermediate values; state assumptions about growth years

---

### Q15 [Medium] — Decision Tree: Transactions





**Select all that apply.**

Which choices align with the short decision tree for transactions?

- [ ] A. Multi-row ACID inside one service → relational DB with local transactions
- [ ] B. Cross-service money flow → saga + outbox; not 2PC by default
- [ ] C. Every microservice sharing one writable Postgres schema for convenience
- [ ] D. Must every reader see latest write? If yes → strong consistency path; if no → eventual + UX for lag

---

### Q16 [Medium] [Case Study] — DesignLab Hot Product Page





**Context:** DesignLab’s catalog page is read-heavy; occasional stale price for seconds is acceptable; balances are not on this path.

**Select all that apply.**

Which caching rules apply?

- [ ] A. Cache-aside is a sensible default pattern to start
- [ ] B. TTL on cached entries or an explicit invalidation plan
- [ ] C. Cache account balances on this catalog path without a strong read path
- [ ] D. Stampede protection (singleflight / lock / probabilistic early expiry) on hot keys

---

### Q17 [Medium] — Messaging Defaults





**Select all that apply.**

Which messaging rules of thumb are emphasized?

- [ ] A. Partition by entity ID when per-entity ordering matters
- [ ] B. At-least-once delivery with idempotent consumers as default
- [ ] C. Use the Kafka topic as the system of record for all CRUD without projections
- [ ] D. Outbox pattern over dual-write to DB and broker

---

### Q18 [Medium] — Pattern Lookup: Infrastructure





**Select all that apply.**

Which pattern–idea pairs are correct from the catalog?

- [ ] A. CDN — edge cache for static assets and media segments
- [ ] B. Bloom filter — guarantees a key is definitely present in the database
- [ ] C. API Gateway — auth, rate limiting, routing entry
- [ ] D. Transactional outbox — atomic DB state change plus event row in one transaction

---

### Q19 [Medium] — Trade-Off: Consistency vs Availability





**Select all that apply.**

Which statements reflect the trade-off matrix?

- [ ] A. Strong consistency can increase latency and may refuse writes under partition
- [ ] B. Availability-first (AP) designs may serve stale or conflicting data
- [ ] C. Low latency in PACELC “else” often trades against stronger consistency
- [ ] D. Strong consistency and zero latency under partition are always simultaneously achievable

---

### Q20 [Medium] [Case Study] — DesignLab Static Assets





**Context:** DesignLab’s interview app serves JS bundles and product images globally; API stays origin-hosted.

**Select all that apply.**

Which component choices fit the selection guide?

- [ ] A. CDN for static assets and video/image segments
- [ ] B. API Gateway for auth, rate limits, and routing to services
- [ ] C. Relational DB as primary store for multi-GB video blobs
- [ ] D. Load balancer to distribute traffic to healthy app instances

---

### Q21 [Medium] — Component Selection: Data Stores





**Select all that apply.**

Which need → component mappings are appropriate?

- [ ] A. Session, rate limits, hot keys → Redis / Memcached class KV
- [ ] B. Transactions, relations, constraints → relational database
- [ ] C. Immutable facts with replay → event store or durable log (e.g., Kafka + lake)
- [ ] D. Full-text search / autocomplete → search engine or dedicated trie service

---

### Q22 [Medium] [Case Study] — DesignLab Quorum Sketch





**Context:** DesignLab reviews a replicated KV sketch: N=3, W=2, R=2.

**Select all that apply.**

Which statements are valid?

- [ ] A. W + R > N gives quorum overlap for read/write intersection under the model discussed
- [ ] B. Prefer local ACID over distributed 2PC for most product paths
- [ ] C. Unique constraints should live in the database, not app-only checks
- [ ] D. Shard on a random UUID when the product requires efficient range scans on creation time

---

### Q23 [Medium] — Observability Rules





**Select all that apply.**

Which observability defaults are listed?

- [ ] A. Alert on every CPU blip instead of SLO error-budget burn
- [ ] B. Trace cross-service flows with correlation IDs end-to-end
- [ ] C. USE (Utilization, Saturation, Errors) for resources
- [ ] D. RED (Rate, Errors, Duration) for services

---

### Q24 [Medium] [Case Study] — DesignLab Multi-Step Checkout





**Context:** DesignLab checkout spans order service, inventory, and external payment provider.

**Select all that apply.**

Which patterns fit?

- [ ] A. Saga with compensations (release inventory on payment failure)
- [ ] B. Two-phase commit spanning the payment provider and internal Postgres
- [ ] C. Idempotency keys on create and payment calls
- [ ] D. Circuit breaker on payment client to stop cascades

---

### Q25 [Medium] — Patterns: Reliability





**Select all that apply.**

Which reliability pattern descriptions are accurate?

- [ ] A. Retry without jitter on all POST endpoints including non-idempotent creates
- [ ] B. Circuit breaker — stop calling a dependency in an error storm
- [ ] C. Graceful degradation — keep core path alive when non-critical features fail
- [ ] D. Bulkhead — isolate pools so one noisy neighbor does not exhaust all threads

---

### Q26 [Medium] [Case Study] — DesignLab Service Boundaries





**Context:** DesignLab teams debate three services all updating the same `users` table in one shared database.

**Select all that apply.**

Which align with data ownership rules?

- [ ] A. Each piece of data should have one write owner
- [ ] B. Other services get copies via events, CDC, or API — not shared mutable writes
- [ ] C. Shared writable DB across many services is acceptable if migrations are coordinated
- [ ] D. Document explicit consistency per API including stale windows where eventual

---

### Q27 [Medium] — Trade-Off: SQL vs Event Log





**Select all that apply.**

Which trade-off rows are represented?

- [ ] A. Document/KV — flexible scale by key; weaker joins and multi-row transactions
- [ ] B. Event log eliminates all need for materialized views or projections
- [ ] C. Relational — gains transactions, joins, constraints; horizontal scale is harder
- [ ] D. Event log — gains replay and fan-out; pays projection lag and ops complexity

---

### Q28 [Medium] — Terminology and Consistency Phrases





**Select all that apply.**

Which are correct?

- [ ] A. Read-your-writes — a user sees their own updates in session
- [ ] B. PACELC — if partition, choose A or C; else latency vs consistency
- [ ] C. Poison message — a message that repeatedly fails processing
- [ ] D. Linearizability — same as “best-effort async with no guarantees”

---

### Q29 [Hard] [Case Study] — DesignLab ShopFast Checkout





**Context:** DesignLab walks through ShopFast-like e-commerce: 2M DAU, 500 QPS peak checkout, 15K QPS peak catalog browse, payment correctness required, email async.

**Select all that apply.**

Which architecture choices match the reference walkthrough?

- [ ] A. Event-source every entity and multi-region active-active inventory in v1
- [ ] B. CDN + cache for catalog browse; checkout modest QPS but correctness-first
- [ ] C. Outbox → Kafka (or similar) instead of dual-write to DB and broker
- [ ] D. Postgres local transactions for inventory decrement where possible

---

### Q30 [Hard] — Before You Call It Done





**Select all that apply.**

What should a complete design narrative include?

- [ ] A. Written requirements and rough scale numbers
- [ ] B. A named bottleneck and consistency story per path
- [ ] C. Failure story per major component and observability to detect breakage
- [ ] D. Technology choices alone are sufficient — skip documenting trade-offs and scale evolution

---

### Q31 [Hard] [Case Study] — DesignLab Checkout Failures





**Context:** DesignLab’s ShopFast practice design: payment provider times out; Kafka relay is down; email workers lag.

**Select all that apply.**

Which responses match the reference failure table?

- [ ] A. Email worker down → checkout still succeeds; notification lag acceptable
- [ ] B. Kafka down → fail checkout synchronously until broker recovers
- [ ] C. Payment timeout → idempotent retry / status confirm; avoid duplicate order rows
- [ ] D. Kafka down → outbox retains events; relay catches up when broker returns

---

### Q32 [Hard] [Case Study] — DesignLab Consistency Map





**Context:** DesignLab documents consistency per path for ShopFast-style commerce.

**Select all that apply.**

Which path → model pairings fit the walkthrough?

- [ ] A. Inventory decrement — strong (transactional)
- [ ] B. Catalog search index — eventual (seconds of lag OK)
- [ ] C. “My orders” list — read-your-writes (primary read or equivalent)
- [ ] D. Marketing email open counts — strong linearizable global ordering required on checkout path

---

### Q33 [Hard] — Stream Architecture Trade-Offs





**Select all that apply.**

Which trade-off statements are accurate?

- [ ] A. Real-time everything — freshness at higher cost and complexity
- [ ] B. Batch everything — always best for user-facing checkout authorization
- [ ] C. Lambda architecture — batch correctness path plus speed layer; dual logic cost
- [ ] D. Kappa — single stream with replay discipline; retention matters

---

### Q34 [Hard] [Case Study] — DesignLab 10× Inventory Pressure





**Context:** DesignLab asks: “What changes at 10× for ShopFast hot SKUs and global users?”

**Select all that apply.**

Which evolutions are reasonable?

- [ ] A. Shard inventory or serialize per-SKU updates for hot items
- [ ] B. Mandate 2PC with external payment provider before any sharding discussion
- [ ] C. Regional catalog with careful payment and compliance story for global users
- [ ] D. Lake + stream tier for heavier analytics

---

### Q35 [Hard] — Latency Hierarchy and Caching





**Select all that apply.**

Which insights connect estimation constants to design?

- [ ] A. DRAM ~100 ns, SSD ~100 µs, in-DC network ~0.5–2 ms — hierarchy motivates caching
- [ ] B. Cross-region ~50–150 ms — avoid on synchronous checkout-critical paths
- [ ] C. User-visible timeout should fail fast rather than hang indefinitely
- [ ] D. Cross-region synchronous chains are fine for sub-100 ms p99 checkout SLOs

---

### Q36 [Hard] [Case Study] — DesignLab Observability Checklist





**Context:** DesignLab grades mock interviews on operability, not only boxes and arrows.

**Select all that apply.**

Which observability items fit ShopFast-style checkout?

- [ ] A. RED on gateway, checkout service, and payment client
- [ ] B. Saga / stuck-order metrics and alerts
- [ ] C. Outbox lag and consumer lag on downstream processors
- [ ] D. Trace `checkout_id` or `idempotency_key` across hops

---

### Q37 [Hard] — Build vs Buy and Boring Tech





**Select all that apply.**

Which trade-off framing matches the matrix?

- [ ] A. Self-host — control at people-and-ops cost
- [ ] B. Managed services — speed and ops offload; less control and ongoing cost
- [ ] C. Newest database on launch — always lowers risk and hiring cost
- [ ] D. Boring tech — predictability; may not be perfect fit

---

### Q38 [Hard] — Sensible v1 Non-Goals





**Select all that apply.**

For mid-scale e-commerce v1 (single region, correctness-focused checkout), which are reasonable explicit non-goals?

- [ ] A. Event-source every entity on day one
- [ ] B. Multi-region active-active inventory
- [ ] C. Real-time OLAP on the checkout critical path
- [ ] D. Idempotency keys on payment and order create

---

### Q39 [Hard] — Sync Path Decision Tree





**Select all that apply.**

For user-facing request/response paths, which guidance applies?

- [ ] A. Every internal call should be async even when the user waits for the HTTP response
- [ ] B. Money or stock on write path → strong write path and careful retries (idempotent only)
- [ ] C. Slow or background work → async queue or stream
- [ ] D. User needs answer now → sync path; add cache if read-heavy

---

### Q40 [Hard] [Case Study] — DesignLab Interview Synthesis





**Context:** DesignLab’s final mock: candidate must tie requirements, numbers, diagram, failures, and metrics in 35 minutes.

**Select all that apply.**

Which checklist items reflect the end-to-end template?

- [ ] A. Requirements → estimation → high-level diagram → decisions with “because”
- [ ] B. Consistency map and failure table per major dependency
- [ ] C. Observability story (metrics, traces, SLOs) tied to user-visible paths
- [ ] D. Start the clock by listing every pattern from the catalog alphabetically
