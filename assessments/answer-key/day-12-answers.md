# Stream Processing & Event Architecture — Answer Key & Explanations (50)

Answer key for [day-12-questions.md](../day-12-questions.md)





---

### Q01 [Easy] [Case Study] — EventPipe Finance Audit Trail

**Answer:** A, B, C

**Explanation:** Audit and temporal queries favor append-only events and snapshots. Overwriting rows loses history (D).

---

### Q02 [Easy] — CRUD Strengths

**Answer:** A, B, C

**Explanation:** CRUD excels at simplicity and current-state queries. Built-in full history without extra design is not automatic (D).

---

### Q03 [Easy] [Case Study] — EventPipe Internal Admin Tool

**Answer:** A, B

**Explanation:** Simple current-state admin fits CRUD. Compliance logs and multi-projection rebuilds push toward events (B, D).

---

### Q04 [Easy] — Commands vs Events

**Answer:** B, C, D

**Explanation:** Commands are intent; events are past facts. Client/broker retry behavior does not define an event (A).

---

### Q05 [Easy] — Event Sourcing Fit

**Answer:** A, B, C

**Explanation:** Replay, projections, and compliance justify event sourcing. A simple CMS is usually overkill (D).

---

### Q06 [Easy] [Case Study] — EventPipe High-Volume Wallets

**Answer:** A, C

**Explanation:** Snapshots trade storage for faster loads. Deleting or mutating history breaks the model (B, D).

---

### Q07 [Easy] — Event Sourcing Pain Points

**Answer:** B, C, D

**Explanation:** Evolution, erasure, and event design skill are real costs. Projections are still required (A).

---

### Q08 [Easy] — CQRS Basics

**Answer:** A, B, D

**Explanation:** CQRS separates command and query models with expected read lag. It can live in one deployable (C).

---

### Q09 [Easy] [Case Study] — EventPipe Order Confirmation UX

**Answer:** A, C, D

**Explanation:** Projection lag is normal; optimistic UI and routing help. One stale read is not grounds to abandon CQRS (B).

---

### Q10 [Easy] — CQRS Levels

**Answer:** A, C, D

**Explanation:** Logical, physical, and polyglot CQRS are all valid. Event sourcing is optional (B).

---

### Q11 [Easy] — Dual-Write Problem

**Answer:** B, C, D

**Explanation:** Dual-write gaps cause divergence; outbox/CDC help. Kafka does not magically fix every sink (A).

---

### Q12 [Easy] [Case Study] — EventPipe Search Index Sync

**Answer:** A, C, D

**Explanation:** CDC tails the WAL with snapshot+tail; consumers must be idempotent. CDC is data-centric — mapping may be needed (B).

---

### Q13 [Easy] — Batch vs Stream Processing

**Answer:** A, B, C

**Explanation:** Batch is scheduled on finite input; streams are continuous and lower latency for live metrics. Finance close often stays batch (D).

---

### Q14 [Easy] — Window Types

**Answer:** A, B, C

**Explanation:** Tumbling, sliding, and session windows are standard. Sessions are gap-based, not fixed one minute (D).

---

### Q15 [Easy] [Case Study] — EventPipe Live Order Counter

**Answer:** B, C, D

**Explanation:** Use event time, lateness policy, and windows matched to the metric. Ignoring lateness skews counts (A).

---

### Q16 [Medium] [Case Study] — EventPipe Clickstream Job

**Answer:** A, B

**Explanation:** Watermarks drive event-time window completion and late-data handling. They do not fix global client ordering (C) or replace careful event-time billing (D).

---

### Q17 [Medium] — Time Semantics

**Answer:** A, B, C

**Explanation:** Event and processing time differ; prefer event time for delayed telemetry. Ingestion time is not always event time (D).

---

### Q18 [Medium] [Case Study] — EventPipe Order Enrichment

**Answer:** A, C, D

**Explanation:** Stream-table joins with CDC-backed tables fit enrichment. Per-event OLTP HTTP calls defeat streaming (B).

---

### Q19 [Medium] — Stateful Stream Processing

**Answer:** B, C, D

**Explanation:** Keyed checkpointed state, hot-key risk, and idempotent sinks matter. Unbounded state is dangerous (A).

---

### Q20 [Medium] [Case Study] — EventPipe Revenue Dashboards

**Answer:** A, B, C

**Explanation:** Lambda combines speed, batch, and serving layers. Both paths still need a durable log or lake (D).

---

### Q21 [Medium] [Case Study] — EventPipe Metric Bug Fix

**Answer:** B, C, D

**Explanation:** Dual code paths drift and merge complexity hurts. Batch can heal history; Lambda does not auto-sync logic (A).

---

### Q22 [Medium] — Kappa Architecture

**Answer:** A, B, D

**Explanation:** Kappa is one stream path with replay and retention ops. Warehouse batch consumers on the same log are common (C).

---

### Q23 [Medium] [Case Study] — EventPipe Platform Standard

**Answer:** A, B, C

**Explanation:** One canonical log with stream and batch consumers. Conflicting dual produce paths are an anti-pattern (D).

---

### Q24 [Medium] [Case Study] — EventPipe Checkout Fraud

**Answer:** A, B, D

**Explanation:** Fraud blocking needs real-time streams and isolated analytics. Nightly-only gating is too slow (C).

---

### Q25 [Medium] — Batch Analytics Fits

**Answer:** A, C, D

**Explanation:** Batch suits historical reporting and cohort studies. Rate limiting at request time needs real-time (B).

---

### Q26 [Medium] — Ops Freshness Tiers

**Answer:** A, B, C

**Explanation:** Ops incidents need near-real-time metrics and tiered SLOs. Daily finance batch alone misses “right now” (D).

---

### Q27 [Medium] — Delivery Semantics

**Answer:** A, B, C

**Explanation:** Design for at-least-once duplicates and exactly-once effects. At-most-once loses messages — bad for money (D).

---

### Q28 [Medium] — Idempotent Write Patterns

**Answer:** A, B, D

**Explanation:** Dedup keys, upserts, and inbox tables support retries. Blind increments double-apply (C).

---

### Q29 [Medium] [Case Study] — EventPipe Duplicate Emails

**Answer:** A, C, D

**Explanation:** Use business idempotency keys and duplicate-delivery tests. At-most-once trades away reliability (B).

---

### Q30 [Medium] — Ordering vs Idempotency

**Answer:** B, C, D

**Explanation:** Still need retry tolerance, reconciliation, and versioning. Offsets are not stable idempotency keys across replays (A).

---

### Q31 [Medium] [Case Study] — EventPipe Consumer Lag Spike

**Answer:** B, C, D

**Explanation:** Scale, optimize sinks, alert, and diagnose skew. Silently dropping business events is usually wrong (A).

---

### Q32 [Medium] — Backpressure

**Answer:** A, C, D

**Explanation:** Prefer visible lag and backpressure over silent drops (B).

---

### Q33 [Medium] — Replay Prerequisites

**Answer:** A, B, C

**Explanation:** Replay needs retention, idempotent sinks, and runbooks. Replays often follow projector bug fixes (D).

---

### Q34 [Medium] [Case Study] — EventPipe Projector Bug

**Answer:** A, B, D

**Explanation:** Rebuild needs retention, idempotent upserts, and fixed code. Replay is a core benefit of logs (C).

---

### Q35 [Medium] [Case Study] — EventPipe OrderPaid Schema

**Answer:** B, C, D

**Explanation:** Use backward compatibility, registry checks, and expand–contract. Reusing field names breaks semantics (A).

---

### Q36 [Medium] — CDC vs Outbox vs Event Sourcing

**Answer:** A, B, C

**Explanation:** Outbox, CDC, and event sourcing serve different strengths. CDC may still need domain mapping (D).

---

### Q37 [Hard] [Case Study] — EventPipe Hot Merchant Key

**Answer:** A, B, D

**Explanation:** Mitigate hot keys and monitor skew. A single partition cannot scale out (C).

---

### Q38 [Hard] — Exactly-Once Processing

**Answer:** A, C, D

**Explanation:** Transactional sinks plus idempotent apply help. The protocol alone does not dedupe business effects (B).

---

### Q39 [Hard] [Case Study] — EventPipe Replay New Group

**Answer:** B, C, D

**Explanation:** Offset-only dedup, assuming no dupes, and skipping tests break replay. Stable order_id upserts are correct (A).

---

### Q40 [Hard] — Poison Messages

**Answer:** A, C, D

**Explanation:** Backoff, DLQ, and replay are standard. Infinite hot-path retry blocks progress (B).

---

### Q41 [Hard] [Case Study] — EventPipe Retention Policy

**Answer:** A, B, C

**Explanation:** Long replay horizons need extended retention or lake storage. Three-day-only Kafka blocks recovery (D).

---

### Q42 [Hard] — Schema Compatibility Modes

**Answer:** A, B, D

**Explanation:** Backward, forward, and full compatibility are defined modes. Breaking changes need coordination (C).

---

### Q43 [Hard] [Case Study] — EventPipe DDL on Orders Table

**Answer:** A, B, C

**Explanation:** Coordinate DDL with connectors and monitor lag. CDC does not hide schema impact (D).

---

### Q44 [Hard] — Event Store Properties

**Answer:** A, B, C

**Explanation:** Append-only logs need ordering and concurrency control. GDPR erasure needs planned strategies (D).

---

### Q45 [Hard] [Case Study] — EventPipe Integration Events

**Answer:** A, C, D

**Explanation:** Outbox emits curated domain events in the same TX; CDC still fits row-level search sync. Raw row diffs alone are a weak partner contract (B).

---

### Q46 [Hard] — CRUD Plus Outbox Hybrid

**Answer:** B, C, D

**Explanation:** Tables stay SoT with outbox integration events. Full event sourcing is a separate step (A).

---

### Q47 [Hard] [Case Study] — EventPipe GDPR Erasure

**Answer:** B, C, D

**Explanation:** Plan erasure and secure streams; minimize PII in events. Append-only is not a GDPR exemption (A).

---

### Q48 [Hard] — Approximate vs Exact Analytics

**Answer:** A, B

**Explanation:** Approximate fits huge cardinality when product accepts error. Billing to the cent needs exact counts (C). When double-count breaks trust, prefer exact pipelines (D).

---

### Q49 [Hard] [Case Study] — EventPipe Browse Sessions

**Answer:** A, C

**Explanation:** Session windows match gap-based browsing. Fixed tumbling or a single global window misfit (B, D).

---

### Q50 [Hard] [Case Study] — EventPipe End-to-End Pipeline

**Answer:** A, C, D

**Explanation:** Tiered analytics, idempotency, and lag monitoring are production essentials. Dual-write without outbox/CDC is risky (B).
