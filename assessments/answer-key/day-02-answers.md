# Design Disciplines — Answer Key & Explanations (50)





---

### Q01

**Answer:** B, C

**Explanation:** HLD and data design define system structure and information boundaries. API design defines contracts, not primarily runtime resource capacity.

---

### Q02

**Answer:** A, B

**Explanation:** Reliability and performance describe behavioral qualities. Security also concerns behavior and controls, not merely class and module names.

---

### Q03

**Answer:** A, B

**Explanation:** Pre-launch work needs safeguards, while incident response relies on observability and reliability. A greenfield system benefits from HLD and capacity planning before launch.

---

### Q04

**Answer:** A, B

**Explanation:** Database and API choices have cross-cutting effects. Non-functional requirements often drive architecture, so claiming they never do is false.

---

### Q05

**Answer:** B, D

**Explanation:** HLD covers major components, responsibilities, dependencies, and deployment. Private helper methods and variables are implementation details.

---

### Q06

**Answer:** A, D

**Explanation:** Class signatures and indexes are lower-level details. Capacity estimates evolve and should not be permanently frozen in HLD.

---

### Q07

**Answer:** A, D

**Explanation:** Good boundaries follow domains and can separate Order from Payment. Deliberately sharing every component across all teams obscures ownership.

---

### Q08

**Answer:** A, C

**Explanation:** Context and component diagrams are typical HLD artifacts. Critical-flow sequence diagrams are useful before source code is complete, so the rewritten restriction is false.

---

### Q09

**Answer:** B, D

**Explanation:** LLD specifies schemas, classes, and module dependencies. Concurrency decisions are also component-level concerns, not unrelated work.

---

### Q10

**Answer:** B, D

**Explanation:** Services own business rules and controllers handle transport. Repositories isolate data access rather than formatting HTTP responses.

---

### Q11

**Answer:** C, D

**Explanation:** Idempotency maps retries to a stable result and prevents duplicate effects. It is especially important for payments because retries can otherwise duplicate charges.

---

### Q12

**Answer:** A, C

**Explanation:** Complex and failure-prone areas deserve deeper LLD. Frequently executed hot paths warrant more scrutiny, not less.

---

### Q13

**Answer:** C, D

**Explanation:** Fifty million daily requests average roughly 580 QPS. A three-times peak is about 1,740 QPS, not 17,400.

---

### Q14

**Answer:** A, D

**Explanation:** Indexes and replicas add substantial storage overhead. Backups also consume storage, so excluding them is incorrect.

---

### Q15

**Answer:** C, D

**Explanation:** Cache capacity follows the hot set, while application capacity follows benchmarked peak throughput. Database sizing cannot ignore storage and IOPS.

---

### Q16

**Answer:** B, D

**Explanation:** Headroom should cover deployments, spikes, and growth. A zone failure shifts work to surviving zones rather than removing that demand.

---

### Q17

**Answer:** B, C

**Explanation:** Horizontal scaling adds machines, while vertical scaling has a hardware ceiling. Adding machines is horizontal, not vertical, scaling.

---

### Q18

**Answer:** A, D

**Explanation:** Caching hot data and adding read replicas reduce primary database load. A CDN does not execute personalized transactional queries.

---

### Q19

**Answer:** A, C

**Explanation:** Stateless servers can validate tokens and handle any request behind a load balancer. Keeping sessions only in local memory creates affinity and failure problems.

---

### Q20

**Answer:** C, D

**Explanation:** Sharding spreads data and write load, and shard-key choice affects hot partitions. Cross-shard work and rebalancing remain difficult.

---

### Q21

**Answer:** A, D

**Explanation:** RPO is the acceptable data-loss window and MTTR is mean time to recover. Availability measures operating time, not allocated disk.

---

### Q22

**Answer:** A, D

**Explanation:** Timeouts and circuit breakers bound dependency failures. Immediate fixed-interval retries can synchronize and amplify load instead of containing it.

---

### Q23

**Answer:** A, C

**Explanation:** Health checks remove broken instances and redundancy avoids single points of failure. Co-locating every replica in one zone leaves a shared failure domain.

---

### Q24

**Answer:** A, B

**Explanation:** Business RPO/RTO targets guide recovery strategy, and restores must be tested. Replication does not replace independent backups or restore exercises.

---

### Q25

**Answer:** B, C

**Explanation:** OIDC authenticates identities, while RBAC, ABAC, and ACLs authorize actions. MFA strengthens authentication but does not grant every permission.

---

### Q26

**Answer:** A, B, C

**Explanation:** Sensitive data needs transport and storage encryption, and secrets need managed storage; passwords must be hashed.

---

### Q27

**Answer:** A, B, C

**Explanation:** Parameterized queries, output controls, and CSRF protections address their threats; shelling user input is unsafe.

---

### Q28

**Answer:** B, C, D

**Explanation:** Network isolation, layered authorization, and rate limiting constrain attacks at multiple layers.

---

### Q29

**Answer:** B, C, D

**Explanation:** Relational databases suit transactions, joins, and integrity; variable document shapes often favor document stores.

---

### Q30

**Answer:** A, B, C

**Explanation:** Key-value, wide-column, and graph stores match those patterns; document stores do not target relational joins.

---

### Q31

**Answer:** A, B, C

**Explanation:** Normalization favors integrity, denormalization can optimize reads, and indexes trade write cost for read speed.

---

### Q32

**Answer:** A, B, C

**Explanation:** Balances and strict inventory need fresh data, while feeds tolerate staleness and profile owners benefit from read-your-writes.

---

### Q33

**Answer:** A, C, D

**Explanation:** ETL, CDC, and CQRS serve distinct needs; event sourcing preserves the event history.

---

### Q34

**Answer:** A, B, C

**Explanation:** REST, gRPC, and WebSocket match those scenarios; webhooks are HTTP callbacks between systems.

---

### Q35

**Answer:** A, B, C

**Explanation:** Resource-oriented REST uses nouns and HTTP methods rather than verb-based action paths.

---

### Q36

**Answer:** A, B, D

**Explanation:** Creation, authentication, and authorization map to 201, 401, and 403; 429 means rate limited.

---

### Q37

**Answer:** A, B, D

**Explanation:** Additive optional changes preserve clients, while removing a field is breaking.

---

### Q38

**Answer:** B, C, D

**Explanation:** Pagination bounds work, idempotency protects retries, and request IDs and consistent errors aid operations.

---

### Q39

**Answer:** B, C, D

**Explanation:** Percentiles reveal tails, throughput measures volume, and error rate exposes failure; averages alone hide outliers.

---

### Q40

**Answer:** A, B, D

**Explanation:** First avoid or reduce work, then make it asynchronous where suitable; optimize measured bottlenecks.

---

### Q41

**Answer:** A, B, D

**Explanation:** The first three describe standard cache patterns; TTL permits bounded staleness rather than guaranteeing freshness.

---

### Q42

**Answer:** A, B, D

**Explanation:** Compression, reuse, and batching reduce bytes or setup round trips; per-request clients add overhead.

---

### Q43

**Answer:** A, C, D

**Explanation:** Baseline, peak, and soak tests expose different limits. One noon sample is not a load-test scenario (B).

---

### Q44

**Answer:** A, C, D

**Explanation:** Monitoring detects known conditions, while observability supports investigation; production systems need both.

---

### Q45

**Answer:** A, B, D

**Explanation:** Logs, metrics, and traces provide complementary signals; gauges can rise or fall.

---

### Q46

**Answer:** A, C, D

**Explanation:** Sustained symptom alerts, runbooks, and aggregation improve actionability; paging on every error creates fatigue.

---

### Q47

**Answer:** A, C, D

**Explanation:** SLIs measure, SLOs target, and SLAs contract; an exhausted budget calls for reliability work.

---

### Q48

**Answer:** B, C, D

**Explanation:** Deploy risk, scale ceilings, and lost team velocity are concrete refactoring signals.

---

### Q49

**Answer:** A, C, D

**Explanation:** Tests, flags, and metrics make changes verifiable and reversible; one large release concentrates risk.

---

### Q50

**Answer:** A, B, C

**Explanation:** Strangler routing, phased database migration, and parallel API versions enable incremental cutover and rollback.
