# System Design Foundations — Answer Key & Explanations (50)




---

### Q01

**Answer:** A, C

**Explanation:** High database CPU and load-dependent latency indicate a peak-capacity design problem. Adding one application server does not automatically remove a database bottleneck.

---

### Q02

**Answer:** A, D

**Explanation:** Sound design derives choices from requirements, constraints, and trade-offs. Team size and budget are relevant constraints, not factors to ignore.

---

### Q03

**Answer:** B, D

**Explanation:** Uploading supported file types and deleting receipts describe what users can do, while latency and encryption describe how the system must operate.

---

### Q04

**Answer:** B, D

**Explanation:** Availability and latency are quality targets. Displaying a receipt, like issuing a refund, describes user-visible functionality rather than system quality.

---

### Q05

**Answer:** B, C

**Explanation:** Surviving a restart after acknowledgement requires durability, and presenting the expected order state requires consistency.

---

### Q06

**Answer:** B, C

**Explanation:** Requirements and scope establish the design problem early. Deferring every scale estimate until production leaves capacity risks unexamined.

---

### Q07

**Answer:** B, D

**Explanation:** A review should test bottlenecks and trade-offs. Finalizing every helper and class before evaluating architectural risks is premature detail.

---

### Q08

**Answer:** B, D

**Explanation:** Queues enable asynchronous communication and load balancers distribute traffic. A CDN caches and serves content; it does not execute authoritative transactions.

---

### Q09

**Answer:** A, D

**Explanation:** An API gateway handles entry-point concerns and object storage holds image bytes. Browser local storage is not a durable shared source for image metadata.

---

### Q10

**Answer:** C, D

**Explanation:** Clear boundaries improve parallel work and change isolation. They clarify ownership rather than making every engineer responsible for every component.

---

### Q11

**Answer:** B, D

**Explanation:** A small early team should weigh microservice overhead against simpler delivery and likely growth. More services generally add, not automatically reduce, operational work.

---

### Q12

**Answer:** A, D

**Explanation:** A modular monolith provides one deployment and can simplify development for a small team. Local calls do not provide network-level fault isolation.

---

### Q13

**Answer:** B, D

**Explanation:** Service extraction should follow bounded contexts, ownership, and deliberate migration. Splitting by technical layer preserves cross-domain coupling.

---

### Q14

**Answer:** B, C

**Explanation:** Microservices permit independent scaling but add distributed debugging and operational complexity. They do not make cross-service consistency automatic.

---

### Q15

**Answer:** B, C

**Explanation:** Serverless can scale bursty workloads and reduce idle cost through per-invocation billing. Cold starts add latency rather than guaranteeing an improvement.

---

### Q16

**Answer:** A, B

**Explanation:** Events decouple producers and let new consumers subscribe independently. Ordering and idempotency still require explicit design; a broker does not guarantee them globally.

---

### Q17

**Answer:** B, C

**Explanation:** Asynchronous systems may be eventually consistent and deliver duplicate or out-of-order messages. End-to-end tracing requires correlation and instrumentation; it is not automatic.

---

### Q18

**Answer:** C, D

**Explanation:** HLD communicates major boundaries and dependencies. It supports stakeholder trade-off review rather than replacing that discussion.

---

### Q19

**Answer:** B, C

**Explanation:** Class interfaces and database schemas describe component internals and belong in LLD. A high-level company service map alone is not low-level design.

---

### Q20

**Answer:** A, B

**Explanation:** Technology, capacity, and deployment choices are detailed-design decisions. They explicitly connect architecture to implementation constraints rather than avoid them.

---

### Q21

**Answer:** A, B

**Explanation:** Compliance and migration constraints can motivate a hybrid deployment spanning on-premises and cloud systems. On-premises hardware is managed by the organization, not exclusively by a cloud provider.

---

### Q22

**Answer:** A, B

**Explanation:** Event sourcing and CQRS may fit audit-heavy, read-oriented needs. For independently owned services, one shared schema undermines ownership rather than guaranteeing it.

---

### Q23

**Answer:** A, D

**Explanation:** A low-impact, reversible internal tool calls for a simple architecture and a lighter process. Separate services are not required when a monolith meets the needs.

---

### Q24

**Answer:** A, B

**Explanation:** Financial core data and a painful rollback justify substantial design. Numeric balances do not make reliability or security risks minor.

---

### Q25

**Answer:** A, B

**Explanation:** Expected traffic growth and new regional requirements justify architecture work before launch. SLA planning should precede outages, not wait for them.

---

### Q26

**Answer:** A, B, C

**Explanation:** Reliability reviews should locate single points of failure and consider graceful degradation, redundancy, retries, and circuit breakers.

---

### Q27

**Answer:** A, B, C

**Explanation:** Caching, suitable read replicas, and connection pooling can reduce database pressure, while unlimited retries can amplify an overload.

---

### Q28

**Answer:** A, B, D

**Explanation:** Missing failure models can cause cascading failures or corruption, and missing contracts can impose breaking changes on clients.

---

### Q29

**Answer:** A, B, D

**Explanation:** Local fixes, established API extensions, and disposable prototypes are relatively small or reversible; replacing a core data model is not.

---

### Q30

**Answer:** A, B, D

**Explanation:** Significant requirement changes, crossed scale thresholds, and newly observed failure modes invalidate assumptions and warrant another design review.

---

### Q31

**Answer:** A, C, D

**Explanation:** Design choices should be evaluated against explicit targets and constraints, with their sacrifices documented rather than performance maximized blindly.

---

### Q32

**Answer:** A, B, D

**Explanation:** Capacity and failure planning align redundancy with availability needs while treating infrastructure cost as a real constraint.

---

### Q33

**Answer:** B, C, D

**Explanation:** Meeting an availability target can require removing critical single points of failure, adding recovery, and degrading optional features gracefully.

---

### Q34

**Answer:** B, C, D

**Explanation:** Creating, resolving, and optionally expiring links describe system behavior, while the latency target describes how well it performs.

---

### Q35

**Answer:** B, C, D

**Explanation:** Scale, availability, and latency are non-functional targets; deleting a link is a functional capability.

---

### Q36

**Answer:** A, B, C

**Explanation:** The monthly totals average approximately 40 creations and 400 redirects per second, producing a read-to-write ratio near 10:1.

---

### Q37

**Answer:** A, C, D

**Explanation:** One hundred million 600-byte records total about 60 GB including metadata, a manageable starter dataset that does not itself require sharding.

---

### Q38

**Answer:** B, C, D

**Explanation:** POST creates a mapping and GET reads one to redirect, and both contracts should be made explicit during the design deep dive.

---

### Q39

**Answer:** A, B, C

**Explanation:** A truncated hash is deterministic but has a finite code space, so collisions remain possible and require a salt, retry, or similar strategy.

---

### Q40

**Answer:** A, B, C

**Explanation:** Base62 encodes unique numeric IDs with 62 alphanumeric symbols without collisions, but sequential IDs expose volume and a central counter can eventually bottleneck.

---

### Q41

**Answer:** A, B, D

**Explanation:** Random codes are straightforward, but collision probability is nonzero, so storage should check or enforce uniqueness.

---

### Q42

**Answer:** A, B, D

**Explanation:** A unique indexed short code supports correct fast lookup, while persisted status and expiration fields support their corresponding features.

---

### Q43

**Answer:** B, C, D

**Explanation:** On a cache miss, cache-aside reads the durable mapping, caches a valid result for a bounded time, and returns the resolved redirect.

---

### Q44

**Answer:** B, C, D

**Explanation:** A 301 communicates permanence and can be cached by browsers, reducing repeat requests when destinations are stable.

---

### Q45

**Answer:** B, C, D

**Explanation:** A 302 keeps requests flowing through the service and supports changeable destinations, at the cost of more server load than cached 301 redirects.

---

### Q46

**Answer:** A, C, D

**Explanation:** Popular-item caching can absorb much of a skewed workload, reduce database reads, and use TTLs to bound staleness without caching every record.

---

### Q47

**Answer:** B, C, D

**Explanation:** PostgreSQL can hold the structured starter dataset, Redis accelerates its read-heavy path, and a monolith limits unnecessary complexity for a small team.

---

### Q48

**Answer:** A, C, D

**Explanation:** Horizontally scaled API servers, read replicas, and appropriate caches address application, database-read, and geographic hot-path pressure.

---

### Q49

**Answer:** B, C, D

**Explanation:** Sharding and distributed IDs can remove measured write and counter bottlenecks, but should be introduced when the workload justifies them.

---

### Q50

**Answer:** B, C, D

**Explanation:** The starter design should meet present requirements, remain evolvable, and be revisited as scale or failure evidence changes rather than maximize complexity immediately.
