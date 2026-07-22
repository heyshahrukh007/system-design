# Core Infrastructure Components — MCQ Answer Key (50)

Answer key for [day-03-questions.md](../day-03-questions.md)




---

### Q01

**Answer:** A, C

**Explanation:** The browser resolves the hostname and negotiates TLS before the application receives HTTPS. TLS runs over an established transport connection, not before one exists.

---

### Q02

**Answer:** A, D

**Explanation:** The browser parses the URL and may enforce HTTPS through HSTS. An expired cache entry requires validation or replacement; it is not unconditionally reused.

---

### Q03

**Answer:** A, C

**Explanation:** Certificate validation checks the hostname and chain of trust. Expiry and revocation remain relevant even when a trusted CA signed the certificate.

---

### Q04

**Answer:** B, C

**Explanation:** Compression reduces transferred bytes and keep-alive reuses a connection. Reuse avoids rather than requires a fresh handshake per resource.

---

### Q05

**Answer:** B, D

**Explanation:** The browser constructs the DOM and CSSOM. Layout and paint are browser rendering tasks, not work delegated to the application database.

---

### Q06

**Answer:** C, D

**Explanation:** Authoritative servers supply domain truth and caches can avoid full lookups. Recursive resolvers query DNS data; they do not modify authoritative records.

---

### Q07

**Answer:** B, C

**Explanation:** AAAA records map IPv6 addresses and CNAME records define aliases. A records map IPv4, not IPv6, addresses.

---

### Q08

**Answer:** B, D

**Explanation:** A low TTL increases resolver queries and can speed health-checked failover. Shorter cache life generally makes infrastructure changes propagate sooner, not later.

---

### Q09

**Answer:** C, D

**Explanation:** DNS can distribute addresses and support health-checked failover. It does not terminate HTTPS and inspect request bodies; that is Layer 7 infrastructure.

---

### Q10

**Answer:** C, D

**Explanation:** Lowering TTL before migration and updating authoritative records reduce stale routing. Existing caches may retain answers until expiry rather than discarding them instantly.

---

### Q11

**Answer:** C, D

**Explanation:** Load balancers remove unhealthy servers and support controlled draining. Permanently pinning all traffic to one backend defeats distribution and health-aware routing.

---

### Q12

**Answer:** A, D

**Explanation:** Layer 7 can route by HTTP path and headers. Layer 4 uses transport details such as IP addresses and ports, not HTTP paths.

---

### Q13

**Answer:** C, D

**Explanation:** Weighted round robin handles unequal capacity and least connections suits long-lived work. IP hash can provide affinity but does not guarantee perfectly even load.

---

### Q14

**Answer:** C, D

**Explanation:** HTTP and TCP checks can verify an endpoint or listening port. A deep check may need dependency status, so ignoring required dependency failures is unsafe.

---

### Q15

**Answer:** C, D

**Explanation:** Externalized sessions let any healthy instance serve a request and prevent failed instances from stranding state. Shared state improves, not reduces, routing flexibility.

---

### Q16

**Answer:** A, C

**Explanation:** Reverse proxies commonly route by path and terminate TLS or compress responses. They shield internal addresses rather than publish every backend directly.

---

### Q17

**Answer:** A, C

**Explanation:** A forward proxy represents clients, while a reverse proxy can shield private backends. Representing clients to arbitrary destinations describes a forward proxy.

---

### Q18

**Answer:** A, C

**Explanation:** Buffering shields backends from slow uploads and reduces backend connection occupancy. Immediate byte-by-byte forwarding is the opposite of request buffering.

---

### Q19

**Answer:** B, D

**Explanation:** Forwarded scheme information preserves the original protocol and prevents redirect loops. `X-Forwarded-For` can carry an address but is not cryptographic proof of identity.

---

### Q20

**Answer:** A, B

**Explanation:** API gateways add API authentication and request or response transformation to proxy behavior. Physical rack power management is unrelated.

---

### Q21

**Answer:** A, C

**Explanation:** CDNs lower geographic latency and reduce static-content origin traffic. They may absorb some attacks but cannot guarantee protection against every DDoS event.

---

### Q22

**Answer:** C, D

**Explanation:** On a miss, the edge fetches from origin and returns the object to the user. Cache policy may permit storing it, so mandatory discard is incorrect.

---

### Q23

**Answer:** C, D

**Explanation:** Content-hashed JavaScript and versioned CSS are strong long-lived cache candidates. Public stable images and fonts can also be cached, so a blanket prohibition is wrong.

---

### Q24

**Answer:** C, D

**Explanation:** Versioned filenames and targeted invalidation prevent stale assets. Reusing the same immutable URL across builds can leave clients on old content.

---

### Q25

**Answer:** B, D

**Explanation:** The origin supplies canonical cacheable content and a PoP is an edge location near users. Anycast advertises one address from multiple locations, not a unique address per edge.

---

### Q26

**Answer:** A, B, D

**Explanation:** In cache-aside, application code checks the cache, fills it after a miss, and maintains entries after writes. Automatic loading behind a cache interface describes read-through caching.

---

### Q27

**Answer:** A, B, D

**Explanation:** Write-through persists synchronously, write-behind persists asynchronously, and refresh-ahead updates values before expiry. Read-through loads from the database on a cache miss without requiring callers to query it first.

---

### Q28

**Answer:** B, C, D

**Explanation:** Frequently reused, expensive, sufficiently stable values offer the best caching return. One-off cheap lookups consume cache space without meaningful benefit.

---

### Q29

**Answer:** B, C, D

**Explanation:** Single-flight locking, background refresh, and staggered early expiry prevent many requests from rebuilding the same hot key simultaneously. Deleting the entire cache increases misses.

---

### Q30

**Answer:** A, B, D

**Explanation:** Negative caching limits repeated lookups for absent values, freshness policies reduce staleness, and redundancy plus circuit breakers limit avalanche impact. Longer TTLs usually increase, not reduce, stale-data risk.

---

### Q31

**Answer:** A, C, D

**Explanation:** Query tuning, indexes, caching, and connection pooling are lower-complexity improvements to try before sharding. Sharding should respond to measured scaling needs.

---

### Q32

**Answer:** A, B, C

**Explanation:** A common replication topology sends writes to a primary and distributes reads to replicas, which may lag. Replicas do not remove the primary's write bottleneck.

---

### Q33

**Answer:** A, B, D

**Explanation:** Primary routing after a write, stronger replication where required, and lag-aware routing can preserve freshness. Writing only to a read replica violates the usual primary-replica flow.

---

### Q34

**Answer:** B, C, D

**Explanation:** Pools reuse connections, cap database concurrency, and avoid repeated setup costs. They do not fix inefficient SQL.

---

### Q35

**Answer:** A, B, C

**Explanation:** A useful shard key spreads load and aligns with common request-routing patterns while avoiding hot spots. Cross-shard joins remain costly even with a strong key.

---

### Q36

**Answer:** A, B, D

**Explanation:** Sharding can scale writes but complicates cross-shard operations and rebalancing. The shard key is a central and difficult-to-change design choice.

---

### Q37

**Answer:** A, B, D

**Explanation:** Queues decouple producers from consumers, buffer bursts, and can persist work. Exactly-once effects still require idempotency and careful acknowledgment design.

---

### Q38

**Answer:** B, C, D

**Explanation:** Point-to-point queues distribute independent jobs, pub/sub fans events out, and log-based streams support independent offsets and replay. A synchronous call is unsuitable when the callee can remain unavailable.

---

### Q39

**Answer:** A, C, D

**Explanation:** Unique IDs and idempotent, duplicate-aware processing protect against redelivery. A worker can crash after a side effect but before acknowledgment.

---

### Q40

**Answer:** A, C, D

**Explanation:** Bounded retries with backoff should eventually move poison messages to a monitored dead letter queue. Infinite tight retries waste resources and can block healthy work.

---

### Q41

**Answer:** A, B, D

**Explanation:** Typed, versioned messages with unique identities make contracts routable and evolvable, while external references keep payloads small. Duplicate delivery is possible and must be anticipated.

---

### Q42

**Answer:** B, C, D

**Explanation:** Rising queue depth and message age show that consumers are falling behind producer throughput. An empty queue with idle workers indicates spare capacity.

---

### Q43

**Answer:** A, C, D

**Explanation:** Effective services align with business domains, support independent deployment, and own their data boundaries. Splitting by technical layer creates coupling rather than domain autonomy.

---

### Q44

**Answer:** A, C, D

**Explanation:** Microservices can support independent scaling, ownership, and deployment when the organization needs them. They add rather than eliminate network and operational complexity.

---

### Q45

**Answer:** B, C, D

**Explanation:** Distributed systems require tracing and network-failure handling, while data consistency often needs sagas or eventual consistency. Independent databases cannot share one local ACID transaction.

---

### Q46

**Answer:** A, B, C

**Explanation:** Workers can consume queued jobs, run scheduled tasks, or process event streams outside request handling. They need not be publicly reachable.

---

### Q47

**Answer:** A, C, D

**Explanation:** Asynchrony fits deferred results, event fan-out, and loose coupling during consumer outages. Decisions required before a request can proceed usually need synchronous communication.

---

### Q48

**Answer:** A, B, C

**Explanation:** A saga coordinates local steps and compensations, such as creating a pending order, attempting payment, and confirming or cancelling. It does not hold one cross-service database transaction open.

---

### Q49

**Answer:** A, C, D

**Explanation:** Distinct scaling, release, and ownership needs are evidence for extracting a domain service. An early system without demonstrated pain usually benefits from remaining a monolith.

---

### Q50

**Answer:** A, B, D

**Explanation:** CDNs serve edge-cached assets, front-door proxies route healthy traffic, and queues feed background workers. DNS maps names and routes clients; it is not a transactional database.
