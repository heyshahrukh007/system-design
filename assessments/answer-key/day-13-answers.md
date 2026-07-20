# Synthesis — Answer Key & Explanations (40)

Answer key for [day-13-questions.md](../day-13-questions.md)




---

### Q01 [Easy] [Case Study] — DesignLab URL Shortener Writes

**Answer:** A, B, D

**Explanation:** Monthly writes ÷ seconds/month ≈ 40/s; reads dominate; ~600 GB/year order of magnitude. Multi-region day one is not required at this scale (C).

---

### Q02 [Easy] — Estimation Constants

**Answer:** A, B, D

**Explanation:** Day/month seconds and 2× vs 100× magnitude matter. Cross-region latency is ~50–150 ms, not in-DC (C).

---

### Q03 [Easy] [Case Study] — DesignLab Chat Message Rate

**Answer:** B, C, D

**Explanation:** Average write rate from DAU × actions; fan-out/presence often dominate; peak factors apply. ~11K/s still needs partitioning and architecture analysis (A).

---

### Q04 [Easy] [Case Study] — DesignLab Read-Heavy Feed

**Answer:** A, C, D

**Explanation:** 100:1 read:write favors cache/replicas and separate estimates. Write-heavy levers (B) are wrong for this ratio.

---

### Q05 [Easy] — Estimation Habits

**Answer:** B, C, D

**Explanation:** Round, state assumptions, split reads/writes. Technology-first (A) reverses the framework.

---

### Q06 [Easy] [Case Study] — DesignLab Traffic Tier

**Answer:** A, B, C

**Explanation:** Scale tiers map to CDN/cache/shard needs gradually. Mandatory Cassandra at 50 req/s (D) ignores requirements.

---

### Q07 [Easy] — Design Process Order

**Answer:** B, C, D

**Explanation:** Problem → constraints → scale → data/components → failures → observe. Kafka-first (A) skips requirements.

---

### Q08 [Easy] — Requirement Clarifiers

**Answer:** A, B, C

**Explanation:** Users, consistency/money, latency/availability are core. UI chrome (D) is out of scope for system design.

---

### Q09 [Easy] [Case Study] — DesignLab Post-Checkout Email

**Answer:** A, B, D

**Explanation:** Email is async fan-out with buffering. Payment result in HTTP response stays sync (C).

---

### Q10 [Easy] — Progressive Complexity

**Answer:** A, B, C

**Explanation:** Evolve from single region to replicas/CDN to sharding/CQRS. Hyperscaler day-one (D) violates progressive complexity.

---

### Q11 [Easy] — Terminology Basics

**Answer:** A, C, D

**Explanation:** Idempotent, SPOF, DLQ are standard. Eventual consistency is not linearizable everywhere (B).

---

### Q12 [Easy] [Case Study] — DesignLab Video Egress

**Answer:** A, B, C

**Explanation:** Egress formula, separate media estimates, storage includes indexes/replicas. Large JSON egress still warrants math (D).

---

### Q13 [Medium] — Peak and Headroom

**Answer:** A, C, D

**Explanation:** Peak factors, headroom, cache hit goals are rules of thumb. Pools should not multiply to max_connections × pods (B).

---

### Q14 [Medium] [Case Study] — DesignLab Storage Planning

**Answer:** A, B, D

**Explanation:** Include copies, indexes, state growth; round and revisit. Ignoring backups/logs when durability matters is risky (C).

---

### Q15 [Medium] — Decision Tree: Transactions

**Answer:** A, B, D

**Explanation:** Local ACID in one service; saga/outbox cross-service; consistency question drives read path. Shared writable DB (C) breaks ownership.

---

### Q16 [Medium] [Case Study] — DesignLab Hot Product Page

**Answer:** A, B, D

**Explanation:** Cache-aside, TTL/invalidation, stampede control for catalog reads. Do not cache money wrongly (C).

---

### Q17 [Medium] — Messaging Defaults

**Answer:** A, B, D

**Explanation:** At-least-once + idempotency, partition by entity, outbox over dual-write. Kafka-as-CRUD-without-projections (C) is an anti-pattern.

---

### Q18 [Medium] — Pattern Lookup: Infrastructure

**Answer:** A, C, D

**Explanation:** CDN, gateway, outbox pairs are correct. Bloom filters give cheap “definitely not present” — not guaranteed presence (B).

---

### Q19 [Medium] — Trade-Off: Consistency vs Availability

**Answer:** A, B, C

**Explanation:** CAP/PACELC tensions: strong vs stale, latency vs consistency. You cannot have all three under partition (D).

---

### Q20 [Medium] [Case Study] — DesignLab Static Assets

**Answer:** A, B, D

**Explanation:** CDN for static, gateway for edge policy, LB for instances. Large blobs belong in object storage (C).

---

### Q21 [Medium] — Component Selection: Data Stores

**Answer:** A, B, C, D

**Explanation:** All four mappings match the component selection guide for typical needs.

---

### Q22 [Medium] [Case Study] — DesignLab Quorum Sketch

**Answer:** A, B, C

**Explanation:** W+R>N overlap; prefer local ACID; DB constraints. Sharding on random UUID hurts range scans (D).

---

### Q23 [Medium] — Observability Rules

**Answer:** B, C, D

**Explanation:** RED, USE, tracing with correlation IDs. Alert on SLO burn, not every CPU blip (A).

---

### Q24 [Medium] [Case Study] — DesignLab Multi-Step Checkout

**Answer:** A, C, D

**Explanation:** Saga, idempotency, circuit breaker fit external payment. 2PC with provider (B) is not the default.

---

### Q25 [Medium] — Patterns: Reliability

**Answer:** B, C, D

**Explanation:** Breaker, bulkhead, degradation are core patterns. Blind retries on non-idempotent POSTs (A) are unsafe.

---

### Q26 [Medium] [Case Study] — DesignLab Service Boundaries

**Answer:** A, B, D

**Explanation:** One write owner, copies via events/CDC, document stale windows. Shared mutable DB (C) violates the rule.

---

### Q27 [Medium] — Trade-Off: SQL vs Event Log

**Answer:** A, C, D

**Explanation:** Relational, log, and document trade-offs as in the matrix. Event logs still need projections (B).

---

### Q28 [Medium] — Terminology and Consistency Phrases

**Answer:** A, B, C

**Explanation:** RYW, PACELC, poison message are defined correctly. Linearizability is strong real-time order — not best-effort (D).

---

### Q29 [Hard] [Case Study] — DesignLab ShopFast Checkout

**Answer:** B, C, D

**Explanation:** CDN/cache for browse, Postgres TX for inventory, outbox for events. v1 explicitly skips full event sourcing and multi-region active-active inventory (A).

---

### Q30 [Hard] — Before You Call It Done

**Answer:** A, B, C

**Explanation:** Requirements, numbers, bottleneck, consistency, failures, observability are required. Skipping trade-offs (D) fails the framework.

---

### Q31 [Hard] [Case Study] — DesignLab Checkout Failures

**Answer:** A, C, D

**Explanation:** Idempotent payment handling, outbox survives broker outage, email lag OK. Failing checkout because Kafka is down (B) over-couples async path.

---

### Q32 [Hard] [Case Study] — DesignLab Consistency Map

**Answer:** A, B, C

**Explanation:** Strong inventory/orders, eventual search, RYW for my orders. Linearizable email metrics on checkout (D) is misplaced.

---

### Q33 [Hard] — Stream Architecture Trade-Offs

**Answer:** A, C, D

**Explanation:** Lambda/Kappa/real-time trade-offs from the matrix. Batch-only checkout authorization (B) ignores latency UX.

---

### Q34 [Hard] [Case Study] — DesignLab 10× Inventory Pressure

**Answer:** A, C, D

**Explanation:** Hot SKU sharding/serialization, regional catalog, analytics tier at scale. 2PC with provider (B) is not the 10× lever.

---

### Q35 [Hard] — Latency Hierarchy and Caching

**Answer:** A, B, C

**Explanation:** Latency ladder motivates cache and avoids cross-region sync on hot paths. Cross-region chains break tight checkout SLOs (D).

---

### Q36 [Hard] [Case Study] — DesignLab Observability Checklist

**Answer:** A, B, C, D

**Explanation:** RED, saga/outbox/consumer lag, and idempotency/checkout tracing all appear in the ShopFast observability section.

---

### Q37 [Hard] — Build vs Buy and Boring Tech

**Answer:** A, B, D

**Explanation:** Managed vs self-host vs boring vs novel costs. Novelty always lowers risk (C) contradicts the matrix.

---

### Q38 [Hard] — Sensible v1 Non-Goals

**Answer:** A, B, C

**Explanation:** Event-source everything, multi-region active-active inventory, and checkout OLAP are explicit non-goals in the walkthrough. Idempotency keys are required (D).

---

### Q39 [Hard] — Sync Path Decision Tree

**Answer:** B, C, D

**Explanation:** User-waiting paths stay sync with strong paths for money/stock. Async-only when user waits (A) breaks UX.

---

### Q40 [Hard] [Case Study] — DesignLab Interview Synthesis

**Answer:** A, B, C

**Explanation:** Template: requirements → numbers → diagram → because → consistency/failures/metrics. Alphabetical pattern listing (D) is not the process.
