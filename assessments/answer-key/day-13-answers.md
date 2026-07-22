# Synthesis — Answer Key (50)





---

### Q01

**Answer:** A, B

**Explanation:** Monthly writes divided by seconds per month is about 40/s, and URL lookup traffic is commonly read-heavy. At the stated row size, annual raw storage is hundreds—not six—gigabytes (C), and active-active is not mandatory (D).

---

### Q02

**Answer:** A, D

**Explanation:** Rounded day/month constants support fast capacity math. Cross-region RTT is far above in-DC latency (C), and order-of-magnitude accuracy—not exact 1% precision—is the useful target (B).

---

### Q03

**Answer:** B, C

**Explanation:** DAU × actions ÷ seconds/day gives roughly 11.5K messages/s, while fan-out and presence can dominate. SQLite is not automatically sufficient (A), and peak is not safely assumed equal to average (D).

---

### Q04

**Answer:** A, B

**Explanation:** A 100:1 ratio calls for separate read/write estimates and bottleneck analysis. It is not primarily write-heavy (D), and the ratio generally increases rather than eliminates caching value (C).

---

### Q05

**Answer:** B, D

**Explanation:** Useful estimates round values and state assumptions explicitly. Technology-first reasoning is backward (A), and reads and writes should not be collapsed because their costs differ (C).

---

### Q06

**Answer:** A, C

**Explanation:** Roughly 100 req/s often permits a simpler architecture, while 10K req/s commonly motivates caching, replicas, and indexing. Neither 50 req/s mandates Cassandra (D) nor 100K req/s defaults to one unpartitioned process (B).

---

### Q07

**Answer:** C, D

**Explanation:** Start with requirements, then model data and components before deepening bottlenecks and failures. Both Kafka-first selection (A) and vendor selection before scale/API analysis (B) reverse the decision order.

---

### Q08

**Answer:** A, B

**Explanation:** Users, geography, latency, and availability are early architecture inputs. Logo color is irrelevant (D), while consistency and money-path requirements must be established early, not deferred (C).

---

### Q09

**Answer:** A, C

**Explanation:** Email fan-out benefits from buffering, retries, and decoupling from the HTTP response. Long or spiky work is a reason to consider async—not force sync (D); payment authorization still belongs in the synchronous response (B).

---

### Q10

**Answer:** C, D

**Explanation:** A simple single-region v1 can evolve with replicas, CDN, and queues as demand appears. Sharding/CQRS should follow measured justification (B), while active-active inventory and universal event sourcing are premature (A).

---

### Q11

**Answer:** C, D

**Explanation:** DLQ and SPOF are defined correctly. Idempotency means repeated application has the same effect, not guaranteed single execution (B), and eventual consistency is not global linearizability (A).

---

### Q12

**Answer:** B, D

**Explanation:** Egress is QPS × bytes × eight, and storage estimates include copies and indexes. Bandwidth is not automatically negligible (A), and large media needs its own estimate rather than inference from JSON (C).

---

### Q13

**Answer:** A, B

**Explanation:** High cache hit ratios and 30–50% capacity headroom are useful rules of thumb. Pool sizing must respect total database limits (C), and capacity should include peak factors rather than average load alone (D).

---

### Q14

**Answer:** A, B

**Explanation:** Storage math should make copies and index overhead explicit and be revisited as requirements change. Exact intermediate bytes without a growth horizon are misleading (D), and backups/logs cannot simply be ignored (C).

---

### Q15

**Answer:** B, C

**Explanation:** Local relational transactions suit one service, and consistency requirements determine read behavior. A shared writable schema weakens ownership (D), while long XA transactions through external providers are not the cross-service default (A).

---

### Q16

**Answer:** B, D

**Explanation:** TTL or invalidation and stampede protection are essential for hot catalog keys. Balances do not belong on this weak catalog path (A), and cache-aside does not guarantee zero staleness (C).

---

### Q17

**Answer:** C, D

**Explanation:** At-least-once with idempotent consumers and an outbox are sound defaults. Kafka-only CRUD without projections is unsuitable (B), and random per-event partitioning breaks per-entity order (A).

---

### Q18

**Answer:** B, C

**Explanation:** Gateways handle entry policy and CDNs cache edge assets. Bloom filters prove only definite absence (A), while an outbox commits the event row with database state rather than publishing first in a separate transaction (D).

---

### Q19

**Answer:** A, B

**Explanation:** AP paths may expose stale or conflicting data, while strong paths add coordination and may reject operations. Zero-latency strong availability is impossible under partition (C), and PACELC does include a healthy-network latency/consistency trade-off (D).

---

### Q20

**Answer:** B, D

**Explanation:** CDN serves static/media assets and a gateway applies API policy. Load balancers should avoid unhealthy instances rather than preserve stickiness to them (A), and databases are not the default store for large video blobs (C).

---

### Q21

**Answer:** C, D

**Explanation:** Relational databases fit constraints and transactions, while KV caches fit sessions and hot keys. Replayable facts require durable storage rather than memory only (B), and full-text search needs an index/search service rather than ordinary joins (A).

---

### Q22

**Answer:** A, D

**Explanation:** W+R>N provides quorum intersection, and uniqueness belongs in database constraints. Local ACID is preferable when data shares one database, not distributed 2PC (B); random UUID sharding harms creation-time scans (C).

---

### Q23

**Answer:** A, D

**Explanation:** USE and RED provide standard resource and service signals. End-to-end tracing needs a propagated correlation ID rather than unrelated IDs per hop (B), and alerts should focus on SLO impact rather than every CPU blip (C).

---

### Q24

**Answer:** B, D

**Explanation:** Idempotency and a circuit breaker fit external payment calls. Cross-provider 2PC is generally unavailable (A), and sagas require explicit compensations rather than automatic cross-service SQL rollback (C).

---

### Q25

**Answer:** B, C

**Explanation:** Bulkheads isolate resources and graceful degradation preserves the core path. Blind non-idempotent retries are unsafe (D), and indefinite retrying is not circuit-breaking behavior (A).

---

### Q26

**Answer:** A, B, D

**Explanation:** One write owner, copies via events/CDC, document stale windows. Shared mutable DB (C) violates the rule.

---

### Q27

**Answer:** B, C, D

**Explanation:** Relational, log, and document trade-offs as in the matrix. Event logs still need projections (A).

---

### Q28

**Answer:** B, C, D

**Explanation:** RYW, PACELC, poison message are defined correctly. Linearizability is strong real-time order — not best-effort (A).

---

### Q29

**Answer:** A, C, D

**Explanation:** CDN/cache for browse, Postgres TX for inventory, outbox for events. v1 explicitly skips full event sourcing and multi-region active-active inventory (B).

---

### Q30

**Answer:** A, B, C

**Explanation:** Requirements, numbers, bottleneck, consistency, failures, observability are required. Skipping trade-offs (D) fails the framework.

---

### Q31

**Answer:** A, B, C

**Explanation:** Idempotent payment handling, outbox survives broker outage, email lag OK. Failing checkout because Kafka is down (D) over-couples async path.

---

### Q32

**Answer:** A, B, C

**Explanation:** Strong inventory/orders, eventual search, RYW for my orders. Linearizable email metrics on checkout (D) is misplaced.

---

### Q33

**Answer:** A, B, C

**Explanation:** Lambda/Kappa/real-time trade-offs from the matrix. Batch-only checkout authorization (D) ignores latency UX.

---

### Q34

**Answer:** A, C, D

**Explanation:** Hot SKU sharding/serialization, regional catalog, analytics tier at scale. 2PC with provider (B) is not the 10× lever.

---

### Q35

**Answer:** A, B, C

**Explanation:** Latency ladder motivates cache and avoids cross-region sync on hot paths. Cross-region chains break tight checkout SLOs (D).

---

### Q36

**Answer:** A, C, D

**Explanation:** Saga health, correlation IDs, and RED signals belong on checkout. Host CPU alone cannot reveal outbox or consumer lag, so D is not a sufficient observability strategy.

---

### Q37

**Answer:** A, B, C

**Explanation:** Managed vs self-host vs boring vs novel costs. Novelty always lowers risk (D) contradicts the matrix.

---

### Q38

**Answer:** A, B, C

**Explanation:** Event-source everything, multi-region active-active inventory, and checkout OLAP are explicit non-goals in the walkthrough. Idempotency keys are required (D).

---

### Q39

**Answer:** A, C, D

**Explanation:** User-waiting paths stay sync with strong paths for money/stock. Async-only when user waits (B) breaks UX.

---

### Q40

**Answer:** A, B, D

**Explanation:** Template: requirements → numbers → diagram → because → consistency/failures/metrics. Alphabetical pattern listing (C) is not the process.

---

### Q41

**Answer:** A, C, D

**Explanation:** Stable idempotency and status reconciliation handle uncertain external effects without double charging.

---

### Q42

**Answer:** B, C, D

**Explanation:** The outbox preserves committed work while the relay and projections recover after the broker returns.

---

### Q43

**Answer:** A, B, D

**Explanation:** Commerce can combine strong stock updates, session freshness, and deliberately stale search.

---

### Q44

**Answer:** A, C, D

**Explanation:** Checkout SLIs, payment errors, and correlation IDs matter. Host CPU alone cannot replace asynchronous lag measurements, so C is not a valid signal as written.

---

### Q45

**Answer:** A, B, C

**Explanation:** Guarded writes, per-key serialization, and admission control protect scarce inventory.

---

### Q46

**Answer:** A, B, C

**Explanation:** Growth should trigger new estimates and targeted evolution, not indiscriminate replacement.

---

### Q47

**Answer:** A, B, D

**Explanation:** These omissions avoid unjustified complexity while preserving checkout correctness.

---

### Q48

**Answer:** A, B, C

**Explanation:** A defensible decision names trade-offs, decisive requirements, and reconsideration triggers.

---

### Q49

**Answer:** B, C, D

**Explanation:** Decomposition should pay for its operational cost through real domain or scaling needs.

---

### Q50

**Answer:** A, B, C

**Explanation:** A complete design connects requirements to operation and evolution, rather than listing products.
