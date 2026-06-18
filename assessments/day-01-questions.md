# Day 1 — MCQ Questions (18)

Multi-select format: each question has **two or more** correct answers.

---

### Q01 [Easy] — Why System Design Matters

**Select all that apply.**

According to the curriculum, which are valid reasons to learn system design?

- [ ] A. Handle growth without outages or runaway costs
- [ ] B. Memorize which database each big tech company uses
- [ ] C. Enable teams to work in parallel with clear architecture
- [ ] D. Build systems that recover gracefully when components fail

**Answer:** A, C, D

**Explanation:** The curriculum emphasizes scale, reliability, cost efficiency, and team collaboration. System design is about thinking and trade-offs, not memorizing vendor choices (B).

**Source:** [docs/day-01/01-why-system-design.md](../docs/day-01/01-why-system-design.md)

---

### Q02 [Easy] — Symptoms of Poor Design

**Select all that apply.**

Which symptom-and-cause pairs are listed in the curriculum?

- [ ] A. App slows at peak hours → no caching or load balancing
- [ ] B. Database crashes under load → no read replicas or connection pooling
- [ ] C. Features ship faster → monolith grew too large
- [ ] D. Deployments break production → tight coupling, no service isolation

**Answer:** A, B, D

**Explanation:** A, B, and D appear in the "What Happens Without It?" table. Slow feature delivery (not faster) is linked to an oversized monolith without clear boundaries (C reverses the symptom).

**Source:** [docs/day-01/01-why-system-design.md](../docs/day-01/01-why-system-design.md)

---

### Q03 [Easy] — Non-Functional Requirements

**Select all that apply.**

Which of the following are non-functional requirements (NFRs)?

- [ ] A. Users can upload a photo
- [ ] B. API responses under 200ms at p95
- [ ] C. 99.9% uptime (~8.7 hours downtime/year)
- [ ] D. Users can search by keyword

**Answer:** B, C

**Explanation:** B (latency) and C (availability) describe *how well* the system performs. A and D describe *what* the system does — functional requirements.

**Source:** [docs/day-01/02-what-is-system-design.md](../docs/day-01/02-what-is-system-design.md)

---

### Q04 [Easy] — Core Building Blocks

**Select all that apply.**

Which components are listed as core building blocks in the curriculum?

- [ ] A. Load balancer
- [ ] B. Message queue
- [ ] C. Compiler toolchain
- [ ] D. CDN

**Answer:** A, B, D

**Explanation:** Load balancer, message queue, and CDN are listed building blocks alongside API gateway, cache, database, and object storage. A compiler toolchain is not listed (C).

**Source:** [docs/day-01/02-what-is-system-design.md](../docs/day-01/02-what-is-system-design.md)

---

### Q05 [Easy] — Design Process Steps

**Select all that apply.**

Which steps belong to the high-level system design process taught in Day 1?

- [ ] A. Clarify requirements
- [ ] B. Estimate scale (QPS, storage, bandwidth)
- [ ] C. Write unit tests for every class
- [ ] D. Identify bottlenecks and discuss trade-offs

**Answer:** A, B, D

**Explanation:** The six-step process includes clarifying requirements, estimating scale, proposing HLD, deep dive, identifying bottlenecks, and discussing trade-offs. Writing unit tests is implementation work, not a design-process step (C).

**Source:** [docs/day-01/02-what-is-system-design.md](../docs/day-01/02-what-is-system-design.md)

---

### Q06 [Easy] — Architecture Styles

**Select all that apply.**

Which are architectural styles covered in Day 1?

- [ ] A. Monolithic architecture
- [ ] B. Microservices architecture
- [ ] C. Serverless architecture
- [ ] D. Event-driven architecture

**Answer:** A, B, C, D

**Explanation:** All four styles are explicitly covered with pros, cons, and use cases in the types lesson.

**Source:** [docs/day-01/03-types-of-system-design.md](../docs/day-01/03-types-of-system-design.md)

---

### Q07 [Medium] — Monolith vs Microservices

**Select all that apply.**

Which statements accurately reflect trade-offs from the curriculum?

- [ ] A. Monoliths are simpler to develop and deploy early on
- [ ] B. Microservices allow independent scaling of individual services
- [ ] C. Monoliths eliminate all network overhead between modules
- [ ] D. Microservices increase operational complexity

**Answer:** A, B, D

**Explanation:** A, B, and D match the comparison tables. Monoliths avoid network overhead *between modules* inside one process, but C overstates it as eliminating "all" network overhead — microservices introduce network calls between services (C is misleading as stated).

**Source:** [docs/day-01/03-types-of-system-design.md](../docs/day-01/03-types-of-system-design.md)

---

### Q08 [Medium] — Serverless and Event-Driven Trade-offs

**Select all that apply.**

Which are listed as cons of serverless or event-driven architectures?

- [ ] A. Cold start latency (serverless)
- [ ] B. Eventual consistency (event-driven)
- [ ] C. No network overhead (event-driven)
- [ ] D. Ordering and idempotency challenges (event-driven)

**Answer:** A, B, D

**Explanation:** Cold starts, eventual consistency, and ordering/idempotency challenges are explicit cons. Event-driven systems still involve network communication — they do not eliminate network overhead (C).

**Source:** [docs/day-01/03-types-of-system-design.md](../docs/day-01/03-types-of-system-design.md)

---

### Q09 [Medium] — When to Invest in Design

**Select all that apply.**

Which situations are listed as clear signals that you need system design?

- [ ] A. Starting a new product or major feature
- [ ] B. Fixing a bug in a well-understood module
- [ ] C. Hitting performance or scale limits
- [ ] D. Preparing for expected growth (new markets, SLAs)

**Answer:** A, C, D

**Explanation:** A, C, and D are "Clear Signals You Need It." A bug fix in a well-understood module is listed under situations where you can skip heavy design (B).

**Source:** [docs/day-01/04-when-to-use-system-design.md](../docs/day-01/04-when-to-use-system-design.md)

---

### Q10 [Medium] — When to Skip Heavy Design

**Select all that apply.**

For which situations does the curriculum say light design is enough?

- [ ] A. Small UI change
- [ ] B. Splitting a monolith due to deploy risk
- [ ] C. Internal tool with fewer than 50 users
- [ ] D. Prototype to validate an idea

**Answer:** A, C, D

**Explanation:** Small UI changes, small internal tools, and prototypes are in the "skip heavy design" table. Splitting a monolith is a major architectural decision requiring real design (B).

**Source:** [docs/day-01/04-when-to-use-system-design.md](../docs/day-01/04-when-to-use-system-design.md)

---

### Q11 [Medium] — Decision Framework

**Select all that apply.**

According to the five-question decision framework, which answers suggest investing in system design?

- [ ] A. The change is hard to reverse
- [ ] B. The change is easily reversible and affects few users
- [ ] C. Scale is expected to grow 10×+ in the next year
- [ ] D. Multiple teams are involved

**Answer:** A, C, D

**Explanation:** Hard to reverse, 10× growth expected, and multiple teams involved all map to "Invest in design." Easily reversible changes with few users suggest moving fast (B).

**Source:** [docs/day-01/04-when-to-use-system-design.md](../docs/day-01/04-when-to-use-system-design.md)

---

### Q12 [Medium] — URL Shortener Traffic Estimates

**Select all that apply.**

For the URL shortener example (100M URLs, 1B redirects/month), which estimates are correct?

- [ ] A. Writes ≈ 40 URLs/second
- [ ] B. Reads ≈ 400 redirects/second
- [ ] C. Read-to-write ratio ≈ 10:1
- [ ] D. Storage ≈ 600 GB for 100M URLs

**Answer:** A, B, C

**Explanation:** The lesson calculates ~40 writes/s, ~400 reads/s, and a 10:1 read ratio. Storage is ~60 GB (100M × ~600 bytes), not 600 GB (D).

**Source:** [docs/day-01/05-starter-example.md](../docs/day-01/05-starter-example.md)

---

### Q13 [Hard] — Short Code Generation Strategies

**Select all that apply.**

Which statements about short-code generation options are accurate per the curriculum?

- [ ] A. Hash-based approach is deterministic but needs collision handling
- [ ] B. Counter-based Base62 has no collisions at the example scale
- [ ] C. Random strings never require uniqueness checks
- [ ] D. Base62 uses 62 characters (a–z, A–Z, 0–9)

**Answer:** A, B, D

**Explanation:** Hash collisions need handling; Base62 counter is chosen for simplicity with no collisions at 100M scale; Base62 uses 62 characters. Random strings must check uniqueness on every insert (C is false).

**Source:** [docs/day-01/05-starter-example.md](../docs/day-01/05-starter-example.md)

---

### Q14 [Hard] — Redirect Path and Caching

**Select all that apply.**

For the URL shortener redirect hot path, which design choices does the curriculum recommend?

- [ ] A. Use 301 (permanent) redirect so browsers cache
- [ ] B. Use 302 so every click hits the server for analytics
- [ ] C. Cache-aside in Redis with TTL on redirect lookups
- [ ] D. Index on `short_code` for fast DB lookups on cache miss

**Answer:** A, C, D

**Explanation:** 301 is the standard choice for less server load; cache-aside with Redis and an index on `short_code` optimize the read-heavy path. 302 forces every click to hit the server — useful when destinations change, but not the recommended default (B).

**Source:** [docs/day-01/05-starter-example.md](../docs/day-01/05-starter-example.md)

---

### Q15 [Hard] — URL Shortener Trade-offs

**Select all that apply.**

Which trade-off decisions match the starter example's summary table?

- [ ] A. Base62 counter over hash — no collisions, simpler
- [ ] B. PostgreSQL over NoSQL — structured data, ACID, 60 GB is manageable
- [ ] C. Microservices over monolith — required at 100M URLs
- [ ] D. Redis cache — 10:1 read ratio demands caching

**Answer:** A, B, D

**Explanation:** The example explicitly chooses monolith + cache because team size and scale don't justify microservices yet (C is wrong). A, B, and D match the trade-off table.

**Source:** [docs/day-01/05-starter-example.md](../docs/day-01/05-starter-example.md)

---

### Q16 [Hard] — Scaling the URL Shortener

**Select all that apply.**

Which solutions are listed for scaling the URL shortener beyond the starter design?

- [ ] A. Load balancer + multiple app servers
- [ ] B. Shard by `short_code` hash range for write bottlenecks
- [ ] C. Distributed ID generator (Snowflake) if counter becomes SPOF
- [ ] D. Remove caching to reduce complexity at 10× scale

**Answer:** A, B, C

**Explanation:** Load balancing, sharding, and distributed IDs are listed scaling responses. Caching becomes more important on a read-heavy system — removing it would worsen performance (D).

**Source:** [docs/day-01/05-starter-example.md](../docs/day-01/05-starter-example.md)

---

### Q17 [Hard] — HLD vs LLD vs Detailed Design

**Select all that apply.**

Which statements correctly distinguish design levels from Day 1?

- [ ] A. HLD covers major components and how they connect
- [ ] B. LLD covers class diagrams, schemas, and API formats inside one component
- [ ] C. Detailed design sits between HLD and LLD with technology and capacity choices
- [ ] D. HLD includes specific database index definitions

**Answer:** A, B, C

**Explanation:** HLD is the big picture; LLD is internal detail; detailed design covers tech choices and capacity. Specific indexes belong in LLD/deep dive, not HLD (D).

**Source:** [docs/day-01/03-types-of-system-design.md](../docs/day-01/03-types-of-system-design.md)

---

### Q18 [Hard] — Data Architecture Patterns

**Select all that apply.**

Which data architecture patterns are introduced in Day 1?

- [ ] A. Single database for everything
- [ ] B. Database per service
- [ ] C. CQRS (separate read and write models)
- [ ] D. Event sourcing (state as a sequence of events)

**Answer:** A, B, C, D

**Explanation:** All four patterns appear in the "By Data Architecture" table with use cases.

**Source:** [docs/day-01/03-types-of-system-design.md](../docs/day-01/03-types-of-system-design.md)
