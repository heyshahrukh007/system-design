# System Design Foundations & URL Shortener — MCQ Questions (18)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-01-answers.md](./answer-key/day-01-answers.md)

---

### Q01 [Easy] — Justifying Architecture Work to Leadership


**Select all that apply.**

Your VP asks why the team should spend two weeks on architecture before building a notifications platform expected to reach millions of users. Which outcomes justify that investment?

- [ ] A. Handle growth without outages or runaway infrastructure costs
- [ ] B. Memorize which database each large tech company uses
- [ ] C. Enable multiple teams to work in parallel with clear boundaries
- [ ] D. Build systems that recover gracefully when components fail

---

### Q02 [Easy] [Case Study] — Peak-Hour Slowdown at TaskFlow


**Context:** TaskFlow is a project-management SaaS with 80,000 daily active users. Every weekday at 9 AM local time, API latency jumps from 120ms to 2s and the primary database hits 95% CPU. There is no caching layer and a single app server handles all traffic.

**Select all that apply.**

Which root-cause diagnoses and fixes are most plausible?

- [ ] A. Traffic spike with no load balancing or caching → add a cache and distribute traffic
- [ ] B. Database overload with no read replicas or pooling → add replicas and connection pooling
- [ ] C. Features shipping faster than ever → caused by an oversized monolith
- [ ] D. Tight coupling between modules → unrelated deploys break production

---

### Q03 [Easy] — Scoping NFRs for a Photo Upload Feature


**Select all that apply.**

Your team is designing a photo upload feature for a social app. Which requirements are **non-functional**?

- [ ] A. Users can upload a JPEG or PNG up to 10 MB
- [ ] B. Upload completes in under 3 seconds at p95 on 4G
- [ ] C. Service maintains 99.9% availability
- [ ] D. Users can add a caption to each photo

---

### Q04 [Easy] — Picking Infrastructure Primitives


**Select all that apply.**

You are sketching the high-level architecture for a new e-commerce backend. Which are standard building blocks you might include?

- [ ] A. Load balancer
- [ ] B. Message queue
- [ ] C. Compiler toolchain
- [ ] D. CDN

---

### Q05 [Easy] — Running a Design Review Session


**Select all that apply.**

You have 45 minutes to walk through a system design for a new feature. Which activities belong in a solid design review?

- [ ] A. Clarify functional and non-functional requirements
- [ ] B. Estimate QPS, storage, and bandwidth
- [ ] C. Write unit tests for every class before drawing diagrams
- [ ] D. Identify likely bottlenecks and discuss trade-offs

---

### Q06 [Easy] — Evaluating Architecture Styles for an MVP


**Select all that apply.**

A 4-person startup is building an MVP with unclear product-market fit. Which architecture styles are reasonable options to **evaluate** (not necessarily adopt all at once)?

- [ ] A. Monolithic architecture
- [ ] B. Microservices architecture
- [ ] C. Serverless architecture
- [ ] D. Event-driven architecture

---

### Q07 [Medium] [Case Study] — PayRight's Monolith at 18 Months


**Context:** PayRight is a fintech with 25 engineers on one monolith. Deploys take 40 minutes; any payment-module change requires full regression. The payments team wants to scale checkout independently and deploy daily. Order history and billing share one PostgreSQL database.

**Select all that apply.**

Which statements reflect realistic trade-offs for PayRight's next step?

- [ ] A. Staying monolithic keeps early development and deployment simpler
- [ ] B. Extracting microservices would allow independent scaling of checkout
- [ ] C. A monolith eliminates all network calls between business modules forever
- [ ] D. Microservices would increase operational and debugging complexity

---

### Q08 [Medium] — Choosing Event-Driven vs Serverless for Webhooks


**Select all that apply.**

Your team must process sporadic inbound webhooks (hundreds per hour, bursts to 5,000/min). Which are real downsides to watch for?

- [ ] A. Cold start latency on serverless functions
- [ ] B. Eventual consistency in event-driven pipelines
- [ ] C. Zero network hops in an event-driven design
- [ ] D. Message ordering and idempotency challenges in event systems

---

### Q09 [Medium] [Case Study] — Global Launch for StreamBox


**Context:** StreamBox has 2M users in one region and plans a launch in Europe and Asia within six months. Enterprise prospects require 99.95% uptime SLAs. The current single-region monolith has had three outage incidents this quarter.

**Select all that apply.**

Which situations justify a formal architecture investment before the launch?

- [ ] A. Starting a major new regional deployment
- [ ] B. Fixing a typo in an admin dashboard label
- [ ] C. Hitting reliability limits that breach upcoming SLAs
- [ ] D. Preparing for an order-of-magnitude user growth

---

### Q10 [Medium] — When a Quick Fix Is Enough


**Select all that apply.**

Your team is prioritizing work for the sprint. For which tasks is **light** architecture work sufficient?

- [ ] A. Changing button color on a settings page
- [ ] B. Splitting a monolith because every deploy breaks unrelated features
- [ ] C. Internal admin tool used by 12 people in one office
- [ ] D. Two-day prototype to test whether users want a feature

---

### Q11 [Medium] — Architecture Decision Gate


**Select all that apply.**

Before green-lighting a six-month platform rewrite, your team runs a five-question gate. Which answers favor **investing** in full system design?

- [ ] A. The change is hard to reverse once shipped
- [ ] B. The change is easily reversible and affects fewer than 100 users
- [ ] C. Traffic is forecast to grow 10× or more within a year
- [ ] D. Four teams will own different parts of the same data pipeline

---

### Q12 [Medium] [Case Study] — LinkShare Capacity Planning


**Context:** LinkShare is designing a URL shortener targeting 100 million stored links and 1 billion redirects per month. The engineering lead needs back-of-envelope numbers before choosing infrastructure.

**Select all that apply.**

Which estimates should the lead use in the design doc?

- [ ] A. Write traffic ≈ 40 new URLs per second
- [ ] B. Read traffic ≈ 400 redirects per second
- [ ] C. Read-to-write ratio ≈ 10:1
- [ ] D. Storage ≈ 600 GB for 100M URLs at ~600 bytes each

---

### Q13 [Hard] — Short Code Strategy for LinkShare


**Select all that apply.**

LinkShare's team is debating how to generate 7-character short codes. Which technical statements are accurate?

- [ ] A. Hashing the long URL is deterministic but requires collision handling
- [ ] B. A Base62 counter encodes IDs without collisions at 100M scale
- [ ] C. Random alphanumeric codes never need a uniqueness check
- [ ] D. Base62 uses 62 characters: a–z, A–Z, 0–9

---

### Q14 [Hard] [Case Study] — LinkShare Redirect Latency Spike


**Context:** LinkShare serves ~400 redirect QPS (read-heavy, 10:1 ratio). p99 redirect latency jumped to 800ms. PostgreSQL CPU is 40%; Redis hit rate is 55%. Product requires p99 under 100ms. The team cannot rewrite the system this quarter.

**Select all that apply.**

Which changes address the redirect hot path?

- [ ] A. Return HTTP 301 so browsers cache stable redirects
- [ ] B. Return HTTP 302 on every redirect to maximize server-side analytics
- [ ] C. Cache-aside in Redis with TTL for `short_code` lookups
- [ ] D. Index on `short_code` for fast database lookups on cache miss

---

### Q15 [Hard] [Case Study] — LinkShare Architecture Review


**Context:** LinkShare has 8 engineers, ~60 GB of URL data, and a 10:1 read:write ratio. A consultant proposes splitting into six microservices immediately. The team prefers a simpler starting point that can evolve.

**Select all that apply.**

Which architecture choices fit LinkShare's current scale and team?

- [ ] A. Base62 counter for short codes — simple, no collisions
- [ ] B. PostgreSQL for structured URL data — ACID, manageable size
- [ ] C. Six microservices from day one — required at 100M URLs
- [ ] D. Redis cache in front of PostgreSQL — read-heavy workload

---

### Q16 [Hard] [Case Study] — LinkShare at 10× Traffic


**Context:** LinkShare's redirects grow 10×. The single API server and one PostgreSQL primary are saturating. The counter-based ID generator is becoming a write bottleneck. Redirects remain the hot path.

**Select all that apply.**

Which scaling steps are appropriate **next**?

- [ ] A. Load balancer plus horizontally scaled app servers
- [ ] B. Shard URLs by `short_code` hash range when writes bottleneck
- [ ] C. Distributed ID generator (e.g., Snowflake) if the counter is a SPOF
- [ ] D. Remove Redis caching to reduce operational complexity

---

### Q17 [Hard] — Design Doc Depth for a New Service


**Select all that apply.**

You are writing design docs for a new Order Service. Which scope split between HLD, detailed design, and LLD is correct?

- [ ] A. HLD — major components, data flows, and external dependencies
- [ ] B. LLD — class structure, schemas, and API contracts inside Order Service
- [ ] C. Detailed design — technology choices and capacity estimates per service
- [ ] D. HLD — specific composite database indexes for every query

---

### Q18 [Hard] — Data Model Strategy for a Growing Platform


**Select all that apply.**

A platform team is planning data architecture for a product that may evolve from monolith to services. Which patterns are valid long-term options?

- [ ] A. Single shared database while the product is small
- [ ] B. Database per service after splitting bounded contexts
- [ ] C. CQRS with separate read and write models for hot read paths
- [ ] D. Event sourcing storing state as an append-only event log
