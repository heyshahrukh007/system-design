# Stream Processing & Event Architecture — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-12-answers.md](./answer-key/day-12-answers.md)





---

### Q01 [Easy] [Case Study] — EventPipe Finance Audit Trail





**Context:** EventPipe must explain every balance change on merchant payout accounts for regulators. Support needs to reconstruct account state as of any past date.


**Select all that apply.**

Which design directions fit this requirement?


- [ ] A. Immutable past-tense domain events as the durable change record
- [ ] B. Periodic snapshots plus replay of newer events for fast loads
- [ ] C. Event sourcing with an append-only event log per aggregate
- [ ] D. CRUD tables with no history — delete old rows on update

---

### Q02 [Easy] — CRUD Strengths





**Select all that apply.**

Which are genuine strengths of a CRUD-centric write model?


- [ ] A. Simple mental model and familiar ORM tooling
- [ ] B. Lower baseline complexity for many admin-style apps
- [ ] C. Straightforward queries against current row state
- [ ] D. Built-in full history of every field change without extra design

---

### Q03 [Easy] [Case Study] — EventPipe Internal Admin Tool





**Context:** EventPipe’s internal SKU editor has 12 users, no compliance mandate, and only needs the latest product row.


**Select all that apply.**

When is staying on CRUD (without event sourcing) reasonable?


- [ ] A. The team wants to minimize learning curve and moving parts early
- [ ] B. The UI only displays current state and never needs temporal replay
- [ ] C. Multiple heterogeneous read models must rebuild from the same facts
- [ ] D. Regulators require a tamper-evident log of every attribute edit

---

### Q04 [Easy] — Commands vs Events





**Select all that apply.**

Which statements correctly contrast commands and events?


- [ ] A. Events are always retried by the client until the broker accepts them
- [ ] B. Events record facts that already happened — past-tense naming
- [ ] C. Commands express intent and can be rejected by validation
- [ ] D. A rejected command should not append a domain event claiming success

---

### Q05 [Easy] — Event Sourcing Fit





**Select all that apply.**

Which scenarios are strong fits for event sourcing (not merely “sounds modern”)?


- [ ] A. Compliance requiring who changed what and when
- [ ] B. Multiple read projections derived from the same event stream
- [ ] C. Debugging production by replaying an aggregate’s history
- [ ] D. Simple blog CMS with one read path and no audit need

---

### Q06 [Easy] [Case Study] — EventPipe High-Volume Wallets





**Context:** Some EventPipe merchant wallets accumulate millions of ledger events. Loading an aggregate replays too many events on every request.


**Select all that apply.**

Which mitigations align with common event-sourcing practice?


- [ ] A. Periodic snapshots at a version boundary then replay only newer events
- [ ] B. In-place UPDATE on historical event rows for corrections
- [ ] C. Accept extra storage and snapshot cadence tuning as a trade-off
- [ ] D. Delete older events from the log to save disk

---

### Q07 [Easy] — Event Sourcing Pain Points





**Select all that apply.**

Which are real costs or risks of event sourcing?


- [ ] A. Automatic elimination of all need for projections
- [ ] B. Schema evolution — old events must remain readable
- [ ] C. Higher design skill for meaningful event granularity
- [ ] D. PII erasure is harder than DELETE on a current row

---

### Q08 [Easy] — CQRS Basics





**Select all that apply.**

What does CQRS (Command Query Responsibility Segregation) emphasize?


- [ ] A. Separate models optimized for writes vs reads
- [ ] B. Commands should not depend on heavy read-side joins in the write path
- [ ] C. Mandatory microservice split — one JVM per query type
- [ ] D. Read models may lag writes — eventual consistency is expected

---

### Q09 [Easy] [Case Study] — EventPipe Order Confirmation UX





**Context:** EventPipe uses CQRS: orders write to Postgres; “My orders” reads from Redis filled by a projector. After POST /orders returns 201, a user refreshes in 200 ms.


**Select all that apply.**

Which responses are architecturally honest?


- [ ] A. The read model might not yet include the new order — eventual consistency
- [ ] B. This proves CQRS is broken and must be abandoned
- [ ] C. Mitigations include optimistic UI or read-your-writes routing
- [ ] D. The write DB and read cache are intentionally decoupled

---

### Q10 [Easy] — CQRS Levels





**Select all that apply.**

Which describe valid “levels” of adopting CQRS?


- [ ] A. Polyglot reads — e.g., Postgres writes and Elasticsearch catalog
- [ ] B. CQRS requires event sourcing as the only write model
- [ ] C. Logical separation — different code paths, same database
- [ ] D. Physical separation — dedicated read stores or indexes

---

### Q11 [Easy] — Dual-Write Problem





**Select all that apply.**

Why is “update DB then publish to Kafka” a risky pattern without extra design?


- [ ] A. Kafka always guarantees cross-topic exactly-once to any sink
- [ ] B. Outbox or CDC avoids application-level dual writes
- [ ] C. Downstream consumers may build on stale or missing events
- [ ] D. A crash between steps leaves DB and stream diverged

---

### Q12 [Easy] [Case Study] — EventPipe Search Index Sync





**Context:** EventPipe keeps product search in Elasticsearch. The order service only writes to Postgres; a Debezium connector tails the WAL.


**Select all that apply.**

Which properties of this CDC approach are accurate?


- [ ] A. The app can focus on DB writes; the log tailer emits row changes
- [ ] B. CDC events are always rich domain events with no mapping step
- [ ] C. Consumers should be idempotent when applying index updates
- [ ] D. Initial load often snapshots the table then follows the replication log

---

### Q13 [Easy] — Batch vs Stream Processing





**Select all that apply.**

Which comparisons between batch and stream processing are correct?


- [ ] A. Stream paths target lower latency than nightly ETL for live metrics
- [ ] B. Batch jobs typically run on finite partitions on a schedule
- [ ] C. Stream processing handles unbounded event sequences continuously
- [ ] D. Stream processing always replaces warehouses for finance close

---

### Q14 [Easy] — Window Types





**Select all that apply.**

Which window descriptions match stream processing concepts?


- [ ] A. Tumbling windows — fixed, non-overlapping time buckets
- [ ] B. Sliding windows — fixed size with a step that can overlap
- [ ] C. Session windows — closed after a gap of inactivity
- [ ] D. Session windows — always exactly one minute wide globally

---

### Q15 [Easy] [Case Study] — EventPipe Live Order Counter





**Context:** EventPipe shows “orders in the last 5 minutes” on an ops wallboard. Events may arrive late from mobile clients.


**Select all that apply.**

Which design choices improve correctness?


- [ ] A. Ignore watermarks — close windows immediately at wall clock
- [ ] B. Define allowed lateness or side outputs for late events
- [ ] C. Use a sliding or tumbling window aligned to the product question
- [ ] D. Prefer event time in payloads over pure processing time

---

### Q16 [Medium] [Case Study] — EventPipe Clickstream Job





**Context:** EventPipe’s Flink job counts page views per SKU using 1-minute tumbling windows on event time. Watermarks trail real time by 30 seconds.


**Select all that apply.**

Which statements about watermarks and windows are correct?


- [ ] A. Watermarks signal progress on event-time completeness for window closure
- [ ] B. Late events after the watermark may be dropped or routed per policy
- [ ] C. Watermarks guarantee every mobile client sends events in order globally
- [ ] D. Processing-time windows are always more accurate for billing totals

---

### Q17 [Medium] — Time Semantics





**Select all that apply.**

How should teams reason about event time, processing time, and ingestion time?


- [ ] A. Analytics on delayed mobile telemetry should prefer event time when available
- [ ] B. Event time reflects when the business action occurred in the payload
- [ ] C. Processing time is when the engine observed the record
- [ ] D. Event time is always identical to broker ingestion time

---

### Q18 [Medium] [Case Study] — EventPipe Order Enrichment





**Context:** A stream job enriches `OrderPlaced` events with customer tier from a `users` table maintained by CDC.


**Select all that apply.**

Which join patterns fit this architecture?


- [ ] A. Stream–table join against a changelog-backed KTable or equivalent
- [ ] B. Synchronous HTTP call to Postgres for every event in the hot path
- [ ] C. Temporal join when profile “as of event time” matters
- [ ] D. CDC can keep the enrichment table aligned with OLTP changes

---

### Q19 [Medium] — Stateful Stream Processing





**Select all that apply.**

What must teams plan for with stateful aggregations and joins?


- [ ] A. Unbounded state without TTL — always safe at scale
- [ ] B. State partitioned by key and checkpointed for failure recovery
- [ ] C. Idempotent or transactional sinks pair with checkpoint semantics
- [ ] D. Hot keys can bottleneck parallelism despite many partitions

---

### Q20 [Medium] [Case Study] — EventPipe Revenue Dashboards





**Context:** EventPipe needs sub-minute ops counters and nightly finance totals that recompute from all history.


**Select all that apply.**

Which Lambda-architecture ideas apply?


- [ ] A. Serving merges batch truth with recent stream results
- [ ] B. A batch layer recomputes authoritative historical aggregates
- [ ] C. A speed layer fills the gap since the last batch run
- [ ] D. Lambda eliminates the need to maintain any durable event log

---

### Q21 [Medium] [Case Study] — EventPipe Metric Bug Fix





**Context:** EventPipe runs separate Spark batch and Flink stream code paths for the same KPI. A bug shipped only in the stream job.


**Select all that apply.**

Which Lambda drawbacks does this illustrate?


- [ ] A. Lambda guarantees identical code paths without discipline
- [ ] B. Batch recompute can still correct historical views after fixes
- [ ] C. Duplicate business logic can drift between batch and speed layers
- [ ] D. Merge/serving logic can hide which layer is wrong

---

### Q22 [Medium] — Kappa Architecture





**Select all that apply.**

Which characterize Kappa-style pipelines?


- [ ] A. One primary stream processing path over a durable log
- [ ] B. Requires sufficient retention and replay operational runbooks
- [ ] C. No need ever for warehouse SQL or batch consumers
- [ ] D. Replay the log with updated code to rebuild or fix projections

---

### Q23 [Medium] [Case Study] — EventPipe Platform Standard





**Context:** EventPipe standardized on Kafka with long retention. Analysts run warehouse ELT; real-time team runs Flink for alerts.


**Select all that apply.**

Which “modern hybrid” practices fit?


- [ ] A. Stream for hot path; batch/warehouse for heavy SQL and reconciliation
- [ ] B. One canonical event schema in the log; many consumer types
- [ ] C. Shared raw lake/log rather than duplicating ingest definitions
- [ ] D. Two different produce paths emitting conflicting facts for the same order

---

### Q24 [Medium] [Case Study] — EventPipe Checkout Fraud





**Context:** EventPipe must block suspicious checkout within seconds using recent click and payment signals.


**Select all that apply.**

Which latency tier and architecture choices fit?


- [ ] A. Real-time stream processing into a hot store or feature cache
- [ ] B. Event-time windows and low end-to-end latency SLOs
- [ ] C. Nightly warehouse batch job as the only fraud gate
- [ ] D. Separate analytics path — do not run BI scans on OLTP

---

### Q25 [Medium] — Batch Analytics Fits





**Select all that apply.**

When is batch analytics the appropriate default?


- [ ] A. Executive reporting “as of yesterday” with full historical scans
- [ ] B. Live rate limiting on API keys at request time
- [ ] C. Complex joins and reproducible cohort studies in the warehouse
- [ ] D. Compliance exports that tolerate hours of freshness

---

### Q26 [Medium] — Ops Freshness Tiers





**Select all that apply.**

SRE needs “Is checkout broken right now?” not “What was revenue last quarter?” Which freshness choices match the ops question?


- [ ] A. Near-real-time metrics on order error rates
- [ ] B. Pick the slowest tier that still meets the decision’s need
- [ ] C. Tiered architecture — different SLOs per decision type
- [ ] D. Daily finance close batch as the only signal

---

### Q27 [Medium] — Delivery Semantics





**Select all that apply.**

Which statements about stream delivery semantics are accurate?


- [ ] A. Exactly-once end-to-end usually means exactly-once processing effect with transactional design
- [ ] B. At-least-once is common — duplicates possible on retry
- [ ] C. Consumers should assume duplicates unless proven otherwise
- [ ] D. At-most-once is usually acceptable for payment ledger effects

---

### Q28 [Medium] — Idempotent Write Patterns





**Select all that apply.**

Which consumer patterns support safe retries?


- [ ] A. Dedup table or cache keyed by stable event_id with TTL ≥ retry window
- [ ] B. Upsert / ON CONFLICT on natural business keys
- [ ] C. Blind `balance += amount` with no version or idempotency guard
- [ ] D. Inbox table with unique message_id inside the same DB transaction

---

### Q29 [Medium] [Case Study] — EventPipe Duplicate Emails





**Context:** EventPipe’s notification consumer crashed after sending email but before committing Kafka offset. At-least-once redelivered the event.


**Select all that apply.**

Which fixes align with idempotent consumer design?


- [ ] A. Track processed notification_id before side effect or in same TX as offset
- [ ] B. Switch to at-most-once and accept lost emails
- [ ] C. Use idempotency keys tied to business operation, not only partition offset
- [ ] D. Test by delivering the same event twice in CI

---

### Q30 [Medium] — Ordering vs Idempotency





**Select all that apply.**

Per-partition ordering helps but does not replace which practices?


- [ ] A. Assuming offsets alone are stable idempotency keys across replays
- [ ] B. Versioned conditional updates for stale applies
- [ ] C. Handlers tolerant of retries and duplicate delivery
- [ ] D. Reconciliation toward desired state (e.g., status=PAID) vs unsafe +=

---

### Q31 [Medium] [Case Study] — EventPipe Consumer Lag Spike





**Context:** EventPipe’s search indexer lag jumped to 45 minutes during a sale. Elasticsearch bulk indexing slowed.


**Select all that apply.**

Which mitigations are appropriate?


- [ ] A. Silently drop events to keep lag at zero
- [ ] B. Alert on lag SLO like other latency metrics
- [ ] C. Investigate hot partitions or slow handlers causing backlog
- [ ] D. Scale consumers/partitions and optimize bulk writes to the sink

---

### Q32 [Medium] — Backpressure





**Select all that apply.**

When downstream sinks cannot keep pace, which responses are preferred?


- [ ] A. Visible growing lag with autoscaling or capacity fixes
- [ ] B. Drop events quietly to protect consumer CPU
- [ ] C. Slow or block consumption so pressure is observable
- [ ] D. Backpressure beats silent data loss for business-critical streams

---

### Q33 [Medium] — Replay Prerequisites





**Select all that apply.**

What does safe replay of a consumer group require?


- [ ] A. Runbook to reset offsets or timestamp and reprocess
- [ ] B. Retention or lake history covering the replay window
- [ ] C. Idempotent sinks so reprocessed events do not double effects
- [ ] D. Guarantee that replay never needs code fixes in the projector

---

### Q34 [Medium] [Case Study] — EventPipe Projector Bug





**Context:** A bug in EventPipe’s Redis order summary projector shipped. Ops needs to rebuild summaries from Kafka for the last 14 days.


**Select all that apply.**

Which capabilities must exist?


- [ ] A. Topic retention (or lake) ≥ 14 days for that replay horizon
- [ ] B. Idempotent upserts into the read model during reprocess
- [ ] C. Replay impossible — manual SQL patches only
- [ ] D. Fixed projector code before reprocessing

---

### Q35 [Medium] [Case Study] — EventPipe OrderPaid Schema





**Context:** EventPipe adds optional `fraud_score` to Avro `OrderPaid`. Old consumers still run during rolling deploy.


**Select all that apply.**

Which schema evolution practices apply?


- [ ] A. Reuse an old field name for a completely different meaning
- [ ] B. Backward compatibility — new consumers read old events
- [ ] C. Expand–contract: deploy tolerant consumers before producers change
- [ ] D. Schema registry with compatibility checks in CI

---

### Q36 [Medium] — CDC vs Outbox vs Event Sourcing





**Select all that apply.**

Which pairings of approach and strength are correct?


- [ ] A. Event sourcing — event log is the system of truth for domain state
- [ ] B. CDC — faithful row-level changes from the replication log
- [ ] C. Outbox — curated domain events in the same TX as the write
- [ ] D. CDC — always replaces need for any business-level event design

---

### Q37 [Hard] [Case Study] — EventPipe Hot Merchant Key





**Context:** One mega-merchant generates 40% of partition traffic on `order-events`. Flink tasks on that key lag while others are idle.


**Select all that apply.**

Which responses are architecturally sound?


- [ ] A. Consider async side channels for ultra-hot aggregates
- [ ] B. Split or salt hot keys; local fan-out before re-aggregation
- [ ] C. Single partition for all orders guarantees perfect scale
- [ ] D. Monitor per-key skew and lag alongside global lag

---

### Q38 [Hard] — Exactly-Once Processing





**Select all that apply.**

Which designs move toward exactly-once processing effects?


- [ ] A. Transactional sink commits with consumer offset/checkpoint in one atomic step
- [ ] B. Assuming the wire protocol alone deduplicates all business side effects
- [ ] C. Idempotent apply logic at the consumer even with transactions
- [ ] D. Flink/Kafka transactions where supported for read-process-write

---

### Q39 [Hard] [Case Study] — EventPipe Replay New Group





**Context:** EventPipe replays `orders` topic from offset 0 with a new consumer group after fixing indexing logic.


**Select all that apply.**

Which mistakes would cause duplicate or inconsistent search documents?


- [ ] A. Upserting Elasticsearch docs keyed by stable order_id
- [ ] B. Dedup keys based only on Kafka offset instead of order_id
- [ ] C. Skipping duplicate-delivery tests because ordering is per-partition
- [ ] D. Assuming replay will not produce duplicate deliveries

---

### Q40 [Hard] — Poison Messages





**Select all that apply.**

Which handling strategies for poison messages are sound?


- [ ] A. DLQ after N failures with alerting on depth
- [ ] B. Infinite hot-path retry on malformed payloads
- [ ] C. Retry with backoff for transient downstream errors
- [ ] D. Fix code or data then replay from DLQ

---

### Q41 [Hard] [Case Study] — EventPipe Retention Policy





**Context:** EventPipe kept Kafka at 3-day retention but product now requires 30-day projection rebuilds after bugs.


**Select all that apply.**

Which storage strategy adjustments are valid?


- [ ] A. Treat retention vs replayability as an explicit cost trade-off
- [ ] B. Land immutable events in the lake for long reprocess windows
- [ ] C. Extend topic retention or tier to cold storage for replay horizon
- [ ] D. Rely on 3-day Kafka only and forbid projection fixes beyond that

---

### Q42 [Hard] — Schema Compatibility Modes





**Select all that apply.**

Which compatibility statements match common registry practice?


- [ ] A. Backward — new consumer reads data written with older schema
- [ ] B. Full compatibility — both read directions during rollout
- [ ] C. Breaking changes always safe without coordinated deploy
- [ ] D. Forward — old consumer reads data written with newer schema

---

### Q43 [Hard] [Case Study] — EventPipe DDL on Orders Table





**Context:** EventPipe renamed a NOT NULL column on `orders` during peak traffic. The Debezium connector paused with schema errors.


**Select all that apply.**

Which operational lessons apply?


- [ ] A. Expand–contract column changes reduce breakage risk
- [ ] B. Coordinate DDL with CDC connectors — migrations can break decode
- [ ] C. Monitor connector lag and errors like database replica lag
- [ ] D. CDC makes all schema changes invisible to downstream

---

### Q44 [Hard] — Event Store Properties





**Select all that apply.**

Which properties belong on a serious event store / append-only log?


- [ ] A. Append-only history without in-place mutation of past events
- [ ] B. Optimistic concurrency on expected version when appending
- [ ] C. Per-stream ordering (often per aggregate id)
- [ ] D. Free deletion of arbitrary middle events for GDPR without design

---

### Q45 [Hard] [Case Study] — EventPipe Integration Events





**Context:** EventPipe needs `PaymentCaptured` events for partner webhooks with business meaning, not just row diffs.


**Select all that apply.**

When should the team prefer outbox over raw CDC for emission?


- [ ] A. Curated domain events must match ubiquitous language
- [ ] B. Every column change on every table is the integration contract
- [ ] C. Same database transaction must commit business write and event row
- [ ] D. CDC remains useful for search sync where row-level fidelity suffices

---

### Q46 [Hard] — CRUD Plus Outbox Hybrid





**Select all that apply.**

Which describe the CRUD + outbox hybrid from modern integration practice?


- [ ] A. Event log replaces all relational storage immediately
- [ ] B. Downstream systems consume events for sync and analytics
- [ ] C. OLTP tables remain source of truth for current state
- [ ] D. Outbox relays integration events without full event sourcing

---

### Q47 [Hard] [Case Study] — EventPipe GDPR Erasure





**Context:** A user requests erasure. EventPipe stores PII inside historical `AccountUpdated` events.


**Select all that apply.**

Which responses reflect event-sourcing reality?


- [ ] A. Ignore GDPR because append-only logs are exempt
- [ ] B. PII in streams needs the same security controls as the primary DB
- [ ] C. Event design should minimize PII in immutable payloads where possible
- [ ] D. Plan crypto-shredding or tombstone strategies — not casual DELETE of middle events

---

### Q48 [Hard] — Approximate vs Exact Analytics





**Select all that apply.**

When are approximate aggregates (sketches, HyperLogLog) appropriate?


- [ ] A. Unique visitors at massive scale where exact set is too costly
- [ ] B. Product decision accepts bounded error for cheaper real-time path
- [ ] C. Billing totals that must match ledger to the cent
- [ ] D. Exact counts required whenever double-count breaks trust

---

### Q49 [Hard] [Case Study] — EventPipe Browse Sessions





**Context:** EventPipe measures shopper sessions from clickstream with 30-minute inactivity gaps for personalization.


**Select all that apply.**

Which windowing choice matches the product rule?


- [ ] A. Session windows closed by inactivity gap
- [ ] B. Fixed 30-minute tumbling windows only — ignores idle gaps within bucket
- [ ] C. Event-time sessionization with idle timeout configuration
- [ ] D. Global window without triggers — one bucket forever

---

### Q50 [Hard] [Case Study] — EventPipe End-to-End Pipeline





**Context:** EventPipe: Postgres orders (CRUD), Debezium → Kafka, Flink aggregates near-real-time metrics, warehouse batch for finance, Elasticsearch via CDC, Redis read model from domain events, lag alerts on all consumer groups.


**Select all that apply.**

Which architecture assessments are fair?


- [ ] A. CQRS read models need projection lag monitoring
- [ ] B. Dual-write from app to Kafka and DB without outbox/CDC is the safest default
- [ ] C. Tiered real-time vs batch analytics for different decisions
- [ ] D. Idempotent consumers and replay runbooks are production requirements
