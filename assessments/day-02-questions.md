# Day 2 — MCQ Questions (28)

Multi-select format: each question has **two or more** correct answers.

---

### Q01 [Easy] — Design Disciplines

**Select all that apply.**

Which are listed as Day 2 design disciplines?

- [ ] A. Capacity design
- [ ] B. Observability design
- [ ] C. Compiler design
- [ ] D. Refactor design

**Answer:** A, B, D

**Explanation:** Capacity, observability, and refactor are among the 11 disciplines. Compiler design is not listed (C).

**Source:** [docs/day-02/01-types-of-system-design.md](../docs/day-02/01-types-of-system-design.md)

---

### Q02 [Easy] — Structural vs Non-Functional Design

**Select all that apply.**

Which disciplines are classified as **non-functional** design in Day 2?

- [ ] A. Scalability design
- [ ] B. HLD
- [ ] C. Security design
- [ ] D. Performance design

**Answer:** A, C, D

**Explanation:** Scalability, security, and performance focus on how well the system behaves. HLD is structural — it defines system shape (B).

**Source:** [docs/day-02/01-types-of-system-design.md](../docs/day-02/01-types-of-system-design.md)

---

### Q03 [Easy] — HLD Contents

**Select all that apply.**

What does High-Level Design (HLD) include?

- [ ] A. Major components and their responsibilities
- [ ] B. Data flows between components
- [ ] C. Specific database index definitions
- [ ] D. External dependencies (third-party systems)

**Answer:** A, B, D

**Explanation:** HLD covers components, communication, data flows, and external deps. Specific indexes are LLD detail (C).

**Source:** [docs/day-02/02-hld.md](../docs/day-02/02-hld.md)

---

### Q04 [Easy] — LLD Contents

**Select all that apply.**

What does Low-Level Design (LLD) include?

- [ ] A. Class/module structure
- [ ] B. Database schema with indexes
- [ ] C. State machines for valid transitions
- [ ] D. Exact instance counts for production servers

**Answer:** A, B, C

**Explanation:** LLD covers classes, schemas, state machines, sequence diagrams, and concurrency. Exact instance counts belong to capacity design (D).

**Source:** [docs/day-02/03-lld.md](../docs/day-02/03-lld.md)

---

### Q05 [Easy] — Capacity Design Basics

**Select all that apply.**

Which are core inputs or outputs of capacity design?

- [ ] A. Peak QPS (design for peak, not average)
- [ ] B. Storage estimates with index/replica overhead
- [ ] C. Choosing bounded context for microservices
- [ ] D. Bandwidth from peak QPS × response size

**Answer:** A, B, D

**Explanation:** Capacity design estimates traffic, storage, bandwidth, and maps to infrastructure. Bounded contexts are HLD/domain decisions (C).

**Source:** [docs/day-02/04-capacity-design.md](../docs/day-02/04-capacity-design.md)

---

### Q06 [Easy] — Vertical vs Horizontal Scaling

**Select all that apply.**

Which are listed as **pros of horizontal scaling**?

- [ ] A. Theoretically unlimited scale-out
- [ ] B. Fault tolerant — one server dies, others continue
- [ ] C. No code changes required
- [ ] D. Cost-effective at scale

**Answer:** A, B, D

**Explanation:** Horizontal scaling adds machines with fault tolerance and scale potential. "No code changes" is a pro of vertical scaling (C).

**Source:** [docs/day-02/05-scalability-design.md](../docs/day-02/05-scalability-design.md)

---

### Q07 [Easy] — Reliability Metrics

**Select all that apply.**

Which reliability metrics are defined in the curriculum?

- [ ] A. RPO — max acceptable data loss window
- [ ] B. RTO — max acceptable downtime to recover
- [ ] C. MTTR — mean time to recover
- [ ] D. QPS — queries per second

**Answer:** A, B, C

**Explanation:** RPO, RTO, and MTTR are reliability metrics. QPS is a capacity/throughput metric (D).

**Source:** [docs/day-02/06-reliability-design.md](../docs/day-02/06-reliability-design.md)

---

### Q08 [Easy] — Security Pillars

**Select all that apply.**

Which are core security pillars from Day 2?

- [ ] A. Authentication — verify identity
- [ ] B. Authorization — control access after identity is verified
- [ ] C. Data protection (in transit and at rest)
- [ ] D. Eliminating all external API calls

**Answer:** A, B, C

**Explanation:** Auth, authorization, and data protection are core pillars. External APIs are managed securely, not eliminated (D).

**Source:** [docs/day-02/07-security-design.md](../docs/day-02/07-security-design.md)

---

### Q09 [Easy] — SQL vs NoSQL Guidance

**Select all that apply.**

When does the curriculum suggest leaning toward SQL (relational)?

- [ ] A. ACID transactions required (payments, inventory)
- [ ] B. Complex queries with joins
- [ ] C. Massive write throughput with flexible schema
- [ ] D. Data integrity is critical

**Answer:** A, B, D

**Explanation:** SQL fits structured data, ACID, joins, and integrity. Massive write throughput with flexible schema leans toward wide-column NoSQL (C).

**Source:** [docs/day-02/08-data-design.md](../docs/day-02/08-data-design.md)

---

### Q10 [Medium] — Lifecycle and Disciplines

**Select all that apply.**

Which discipline pairings match the "When Each Discipline Matters Most" table?

- [ ] A. Greenfield → HLD, Data, API, Capacity
- [ ] B. Pre-launch → Security, Performance, Reliability, Observability
- [ ] C. Growth phase → Scalability, Capacity, Performance
- [ ] D. Compliance audit → Refactor only

**Answer:** A, B, C

**Explanation:** A, B, and C match the table. Compliance audits focus on Security and Data, not refactor alone (D).

**Source:** [docs/day-02/01-types-of-system-design.md](../docs/day-02/01-types-of-system-design.md)

---

### Q11 [Medium] — HLD Communication Patterns

**Select all that apply.**

When should you choose asynchronous (queue/event) communication per HLD guidance?

- [ ] A. Caller needs immediate response for every step
- [ ] B. Work can happen later and caller doesn't need to wait
- [ ] C. Email notification after order confirmation
- [ ] D. External system pushes updates via webhook

**Answer:** B, C, D

**Explanation:** Async fits deferred work (notifications) and webhooks. Immediate responses need synchronous REST/gRPC (A).

**Source:** [docs/day-02/02-hld.md](../docs/day-02/02-hld.md)

---

### Q12 [Medium] — LLD Patterns

**Select all that apply.**

Which LLD patterns or practices are emphasized?

- [ ] A. Repository pattern — isolate data access
- [ ] B. Business logic in service layer, not controllers
- [ ] C. Idempotency keys for retriable operations
- [ ] D. God class doing everything for simplicity

**Answer:** A, B, C

**Explanation:** Repository, service layer, and idempotency are best practices. God classes are listed as a common mistake (D).

**Source:** [docs/day-02/03-lld.md](../docs/day-02/03-lld.md)

---

### Q13 [Medium] — Scalability Toolkit

**Select all that apply.**

A read-heavy API is hitting database connection limits. Which scalability techniques from Day 2 apply?

- [ ] A. Read replicas
- [ ] B. Connection pooling (PgBouncer)
- [ ] C. Caching hot data
- [ ] D. Immediate sharding before measuring

**Answer:** A, B, C

**Explanation:** Replicas, pooling, and caching address read load and connections. The curriculum warns against sharding before finding the real bottleneck (D).

**Source:** [docs/day-02/05-scalability-design.md](../docs/day-02/05-scalability-design.md)

---

### Q14 [Medium] — Scalability Roadmap

**Select all that apply.**

Which stages appear in the scalability roadmap in order?

- [ ] A. Stage 1: Single server (MVP)
- [ ] B. Stage 3: Read replicas + CDN
- [ ] C. Stage 5: Microservices per domain
- [ ] D. Stage 6: Multi-region deployment

**Answer:** A, B, C, D

**Explanation:** All four stages are explicitly listed in the roadmap progression.

**Source:** [docs/day-02/05-scalability-design.md](../docs/day-02/05-scalability-design.md)

---

### Q15 [Medium] — Reliability Patterns

**Select all that apply.**

Which are core reliability patterns from Day 2?

- [ ] A. Circuit breaker — stop calling failing dependencies
- [ ] B. Exponential backoff with jitter on retries
- [ ] C. Graceful degradation of non-critical features
- [ ] D. Removing all timeouts to avoid false failures

**Answer:** A, B, C

**Explanation:** Circuit breakers, backoff retries, and graceful degradation are core patterns. Timeouts should be set on all external calls — never wait forever (D).

**Source:** [docs/day-02/06-reliability-design.md](../docs/day-02/06-reliability-design.md)

---

### Q16 [Medium] — STRIDE Threat Model

**Select all that apply.**

Which threats are part of the STRIDE framework?

- [ ] A. Spoofing — fake identity
- [ ] B. Tampering — modify data
- [ ] C. Repudiation — deny an action took place
- [ ] D. Scaling — handle more traffic

**Answer:** A, B, C

**Explanation:** Spoofing, tampering, and repudiation are STRIDE categories (along with Information disclosure, Denial of service, Elevation of privilege). Scaling is not a STRIDE threat (D).

**Source:** [docs/day-02/07-security-design.md](../docs/day-02/07-security-design.md)

---

### Q17 [Medium] — Data Consistency and CAP

**Select all that apply.**

Which pairings match the curriculum's CAP-in-practice examples?

- [ ] A. Payment system → CP (consistency over availability)
- [ ] B. Social media feed → AP (availability over consistency)
- [ ] C. Most web systems choose AP with eventual consistency
- [ ] D. Bank balances → eventual consistency is always acceptable

**Answer:** A, B, C

**Explanation:** Payments lean CP; feeds lean AP; most web systems choose AP. Bank balances require strong consistency — eventual consistency is not always acceptable (D).

**Source:** [docs/day-02/08-data-design.md](../docs/day-02/08-data-design.md)

---

### Q18 [Medium] — API Design

**Select all that apply.**

Which are REST API best practices from Day 2?

- [ ] A. Resource-oriented URLs with nouns (`/users/123`)
- [ ] B. Paginate list endpoints
- [ ] C. Use verbs in URLs (`/getUser?id=123`)
- [ ] D. Idempotency keys on POST operations that create resources

**Answer:** A, B, D

**Explanation:** Nouns, pagination, and idempotency keys are best practices. Verb-based URLs like `/getUser` are listed as bad (C).

**Source:** [docs/day-02/09-api-design.md](../docs/day-02/09-api-design.md)

---

### Q19 [Medium] — Performance Optimization Hierarchy

**Select all that apply.**

Which steps appear in the performance optimization hierarchy (highest impact first)?

- [ ] A. Don't do the work — cache, avoid unnecessary calls
- [ ] B. Do work asynchronously — queues, background jobs
- [ ] C. Do work faster — better algorithms, faster hardware
- [ ] D. Skip profiling and jump straight to hardware upgrades

**Answer:** A, B, C

**Explanation:** The hierarchy is: avoid work → less work → async → parallel → faster code/hardware. Skipping profiling is an anti-pattern (D).

**Source:** [docs/day-02/10-performance-design.md](../docs/day-02/10-performance-design.md)

---

### Q20 [Hard] — Cache Patterns

**Select all that apply.**

Which cache pattern descriptions are accurate?

- [ ] A. Cache-aside — app checks cache, on miss reads DB and populates
- [ ] B. Write-through — write to cache and DB simultaneously
- [ ] C. Write-behind — write to cache, async flush to DB
- [ ] D. Read-through — app only talks to cache; cache loads from DB on miss

**Answer:** A, B, C, D

**Explanation:** All four pattern descriptions match the performance design lesson.

**Source:** [docs/day-02/10-performance-design.md](../docs/day-02/10-performance-design.md)

---

### Q21 [Hard] — Observability Pillars

**Select all that apply.**

Which statements about observability are correct?

- [ ] A. Logs are discrete events with context (structured JSON recommended)
- [ ] B. Metrics include counters, gauges, and histograms
- [ ] C. Traces follow a single request across multiple services
- [ ] D. Alert on causes (CPU > 50%) rather than symptoms

**Answer:** A, B, C

**Explanation:** Logs, metrics, and traces are the three pillars. Alert on user-facing symptoms, not overly sensitive causes (D).

**Source:** [docs/day-02/11-observability-design.md](../docs/day-02/11-observability-design.md)

---

### Q22 [Hard] — SLI, SLO, SLA

**Select all that apply.**

Which definitions are correct?

- [ ] A. SLI — what you measure (e.g., API latency p99)
- [ ] B. SLO — internal target (e.g., p99 < 300ms)
- [ ] C. SLA — contractual guarantee with users (e.g., 99.9% uptime)
- [ ] D. Error budget — remaining allowed failure within SLO

**Answer:** A, B, C, D

**Explanation:** All four definitions match the SLI/SLO/SLA section including error budgets.

**Source:** [docs/day-02/11-observability-design.md](../docs/day-02/11-observability-design.md)

---

### Q23 [Hard] — Refactor Design

**Select all that apply.**

Which refactor approaches does the curriculum recommend?

- [ ] A. Strangler fig pattern — route traffic gradually to new services
- [ ] B. Feature flags for controlled rollout and rollback
- [ ] C. Big-bang rewrite from scratch as first choice
- [ ] D. Dual-write during database migration

**Answer:** A, B, D

**Explanation:** Strangler fig, feature flags, and dual-write are recommended incremental approaches. Big-bang rewrite is an anti-pattern — refactor is preferred over rewrite (C).

**Source:** [docs/day-02/12-refactor-design.md](../docs/day-02/12-refactor-design.md)

---

### Q24 [Hard] — Reliability: The Nines

**Select all that apply.**

Which availability/downtime pairings are from the curriculum?

- [ ] A. 99.9% (three nines) ≈ 8.76 hours downtime/year
- [ ] B. 99.99% (four nines) ≈ 52.6 minutes downtime/year
- [ ] C. Each additional nine is roughly 10× harder than the last
- [ ] D. Always design for five nines regardless of business need

**Answer:** A, B, C

**Explanation:** A, B, and C match the nines table and guidance. Design for the nines your business needs — not the maximum possible (D).

**Source:** [docs/day-02/06-reliability-design.md](../docs/day-02/06-reliability-design.md)

---

### Q25 [Hard] — Scalability Anti-Patterns

**Select all that apply.**

Which are listed scalability anti-patterns and their fixes?

- [ ] A. Stateful app servers → externalize state
- [ ] B. Scaling before measuring → benchmark first
- [ ] C. Synchronous everything → queue async work
- [ ] D. No cache strategy → shard immediately

**Answer:** A, B, C

**Explanation:** Stateful servers, premature scaling, and sync-everything are anti-patterns with listed fixes. No cache strategy should be fixed with caching at appropriate layers — not immediate sharding (D).

**Source:** [docs/day-02/05-scalability-design.md](../docs/day-02/05-scalability-design.md)

---

### Q26 [Hard] — Data Flow Patterns

**Select all that apply.**

Which data flow patterns are covered in data design?

- [ ] A. ETL — batch extract/transform/load to warehouse
- [ ] B. CDC — stream database changes in real time
- [ ] C. Event sourcing — store state as event sequence
- [ ] D. CQRS — separate read and write models

**Answer:** A, B, C, D

**Explanation:** All four patterns are explicitly covered with use cases.

**Source:** [docs/day-02/08-data-design.md](../docs/day-02/08-data-design.md)

---

### Q27 [Hard] — Capacity vs Scalability

**Select all that apply.**

Which statements correctly distinguish capacity and scalability design?

- [ ] A. Capacity answers "how much do I need now?"
- [ ] B. Scalability answers "how do I grow later?"
- [ ] C. Capacity sizes the starting point; scalability plans the growth path
- [ ] D. They are identical — only one discipline is needed

**Answer:** A, B, C

**Explanation:** Capacity is right-sizing now; scalability is growth planning. They work together (D is false).

**Source:** [docs/day-02/04-capacity-design.md](../docs/day-02/04-capacity-design.md)

---

### Q28 [Hard] — Input Validation Threats

**Select all that apply.**

Which threat-prevention pairings are from security design?

- [ ] A. SQL injection → parameterized queries, ORMs
- [ ] B. XSS → output encoding, Content-Security-Policy
- [ ] C. CSRF → CSRF tokens, SameSite cookies
- [ ] D. Path traversal → pass user input directly to shell commands

**Answer:** A, B, C

**Explanation:** A, B, and C are correct prevention pairs. Never pass user input to shell commands — that causes command injection (D describes the threat, not prevention).

**Source:** [docs/day-02/07-security-design.md](../docs/day-02/07-security-design.md)
