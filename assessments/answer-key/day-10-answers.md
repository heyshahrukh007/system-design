# Classic System Design Problems — Answer Key (50)





---

### Q01

**Answer:** A, D

**Explanation:** Functional flows and quality targets belong in initial requirements. Vendor details come later (C), and regulatory constraints must be understood before architecture and deployment (B).

---

### Q02

**Answer:** C, D

**Explanation:** Identify constraints and estimate scale before detailed diagrams. TTL tuning without access patterns (A) and final topology before requirements (B) are premature.

---

### Q03

**Answer:** A, B

**Explanation:** Average and peak traffic estimates guide early architecture. The database should follow requirements rather than bias estimates (C), and production traces should not block initial sizing (D).

---

### Q04

**Answer:** B, D

**Explanation:** Cache-heavy read paths and dependency protection are sensible deep dives. Blanket 2PC (A) and fire-and-forget side effects without retry or dedupe (C) are not reliable defaults.

---

### Q05

**Answer:** A, C

**Explanation:** CDN caching and separately scaled redirect services serve the read-heavy path. Synchronous analytics (D) and disabling redirect caching (B) undermine latency and availability.

---

### Q06

**Answer:** A, B

**Explanation:** CDN and a shard selected from the short code belong on the redirect path. Synchronous OLAP (C) and querying every shard before cache (D) make the hot path unnecessarily expensive.

---

### Q07

**Answer:** A, B

**Explanation:** Dedupe plus stream or batch processing preserves redirect speed under at-least-once delivery. Synchronous Postgres updates (D) or waiting for the warehouse (C) block the hot path.

---

### Q08

**Answer:** C, D

**Explanation:** Distributed IDs avoid a central write hotspot and support compact Base62 codes. They do not guarantee collision-free operation without uniqueness controls (C, D).

---

### Q09

**Answer:** B, D

**Explanation:** Single-flight and bounded database fallthrough reduce stampede impact. Disabling CDN (C) and synchronizing hot-key expiry (A) amplify origin load.

---

### Q10

**Answer:** A, B

**Explanation:** Combining coarse edge limits with application-aware controls is standard. Uncoordinated service-only limits (C) and one undifferentiated global policy (D) fail to reflect identity and endpoint cost.

---

### Q11

**Answer:** A, D

**Explanation:** Fixed windows can burst at boundaries and sliding-window logs trade memory for accuracy. A sliding-window counter is approximate (B), while token buckets deliberately permit bounded bursts (C).

---

### Q12

**Answer:** A, D

**Explanation:** Fail-open may suit general APIs, and a Redis-client circuit breaker prevents pile-ups. Full per-instance limits (C) and unconditional fail-open for financially strict quotas (B) can violate paid enforcement.

---

### Q13

**Answer:** C, D

**Explanation:** Scoped TTL keys and atomic Redis scripts preserve cluster-wide decisions. Non-atomic read/write (A) and unsynchronized gateway clocks (B) introduce races and skew.

---

### Q14

**Answer:** A, B

**Explanation:** Local token allocations can reduce round trips, and standard headers communicate decisions. Granting the full budget independently, whether proposed in B or D, overshoots the global limit.

---

### Q15

**Answer:** A, B

**Explanation:** Fast asynchronous acceptance and durable status tracking decouple producers from providers. Ignoring opt-outs (D) is unsafe, and synchronous provider calls (C) block order processing.

---

### Q16

**Answer:** A, D

**Explanation:** Channel-separated workers and user-keyed partitioning support independent scaling and ordering. A synchronous per-user chain (B) or rendering everything before enqueue acknowledgement (C) lengthens the request path.

---

### Q17

**Answer:** A, C

**Explanation:** Provider-aware limits and priority queues protect password resets. A single worker (D) cannot meet campaign scale, and unprioritized shared traffic (B) risks critical-message delays.

---

### Q18

**Answer:** A, D

**Explanation:** DLQs and circuit breakers bound persistent failures. End-to-end exactly-once through external providers is unrealistic (B), and permanent errors should not be retried forever (C).

---

### Q19

**Answer:** A, C

**Explanation:** At-least-once delivery with consumer dedupe and stable idempotency keys handles retries. Publishing before commit, directly (D) or with an impossible rollback assumption (B), risks ghost notifications.

---

### Q20

**Answer:** A, D

**Explanation:** Fan-out on write pushes IDs into follower caches and is acceptable below a follower threshold. Celebrity fan-out (C) and full on-read graph recomputation (B) do not fit the majority hot path.

---

### Q21

**Answer:** C, D

**Explanation:** Object-storage media URLs and cursor pagination support scalable feeds. Deep offsets are costly and unstable, whether offered as an option (A) or made the only API (B).

---

### Q22

**Answer:** A, D

**Explanation:** Merging celebrity posts at read time and using a follower threshold avoid a massive write storm. Always write fan-out (C) or synchronously touching all 50M feeds (B) does not scale.

---

### Q23

**Answer:** B, D

**Explanation:** Partitioned post storage and per-user Redis feed caches match the access patterns. An unsharded posts table (A) and one unindexed global graph document (C) do not scale.

---

### Q24

**Answer:** C, D

**Explanation:** Queue-lag monitoring and eventual fan-out consistency are realistic during recovery. Global 1 ms visibility (A) is unrealistic, while refusing to rebuild cold caches (B) sacrifices availability unnecessarily.

---

### Q25

**Answer:** A, D

**Explanation:** Stateful socket gateways plus cross-gateway pub/sub support millions of connections. Message history must not live only in gateway memory (C), and users cannot be constrained to the same gateway forever (B).

---

### Q26

**Answer:** A, B, D

**Explanation:** Per-conversation sequence and backward pagination are standard. Global time-only ordering breaks chat semantics (C).

---

### Q27

**Answer:** A, B, C

**Explanation:** Persist-then-deliver and cross-gateway pub/sub prevent loss. Deliver-before-persist risks dropped messages (D).

---

### Q28

**Answer:** A, B, C

**Explanation:** TTL presence, push when offline, history sync on reopen. Dropping offline messages is unacceptable (D).

---

### Q29

**Answer:** B, C, D

**Explanation:** Single persist with fan-out delivery and aggregated receipts scale groups. Per-member DB rows per send do not (A).

---

### Q30

**Answer:** A, B, C

**Explanation:** Bloom → Redis → trie/FST is the layered hot path. Fuzzy-first on every keystroke is too slow (D).

---

### Q31

**Answer:** A, C, D

**Explanation:** Min length, rate limits, and bloom rejection protect hot paths. Online trie mutation on requests is anti-pattern (B).

---

### Q32

**Answer:** A, B, C

**Explanation:** Fuzzy is fallback when prefix under-delivers or typos miss trie terminals; cap edit distance. Running fuzzy before bloom wastes work (D).

---

### Q33

**Answer:** A, B, D

**Explanation:** Log aggregation, offline rebuilds, and incremental trending keep serving read-only. Per-keystroke production trie writes do not (C).

---

### Q34

**Answer:** A, C, D

**Explanation:** Presigned direct upload and multipart scale; objects are immutable blobs (B).

---

### Q35

**Answer:** B, C, D

**Explanation:** Metadata/b bytes split and immutable object model are foundational. Inline gigabyte blobs in SQL does not scale (A).

---

### Q36

**Answer:** A, C, D

**Explanation:** Replication, erasure coding tiers, and scrubbing support durability. Single copy violates 11-nines intent (B).

---

### Q37

**Answer:** A, B, D

**Explanation:** Quorum before visibility, verified reads, CDN for public assets fit the model. Listing before replication completes breaks RYW (C).

---

### Q38

**Answer:** A, B, D

**Explanation:** Presigned multipart to object storage with events keeps APIs thin. Proxying 10 GB through API pods does not scale (C).

---

### Q39

**Answer:** A, B, D

**Explanation:** Async queued workers produce segmented renditions with state tracking. Inline transcode on upload request blocks and does not scale (C).

---

### Q40

**Answer:** A, B, C

**Explanation:** CDN plus ABR manifests/segment switching is mandatory at petabit scale. Single origin file per viewer fails latency and egress (D).

---

### Q41

**Answer:** A, C, D

**Explanation:** Transcode retries, CDN metrics, and playback beacons are standard ops. Disabling multipart hurts large upload recovery (B).

---

### Q42

**Answer:** A, B, D

**Explanation:** Stable Idempotency-Key through gateway, service, and PSP prevents double charge. New key per retry defeats idempotency (C).

---

### Q43

**Answer:** A, B, C

**Explanation:** Reserve-before-charge avoids paid orders without stock; SQL guards enforce counts. Charge-first without stock is a common anti-pattern (D).

---

### Q44

**Answer:** A, B, C

**Explanation:** Status query, release on failure, and hold sweepers handle unknown timeouts safely. Blind retries without idempotency risk double charge (D).

---

### Q45

**Answer:** B, C, D

**Explanation:** Conditional updates and conflict responses prevent oversell. Negative inventory breaks consistency (A).

---

### Q46

**Answer:** B, C, D

**Explanation:** Saga compensation, outbox, and async side effects with degradation on notify failure fit checkout. Sync email before 201 slows revenue path (A).

---

### Q47

**Answer:** A, B, C

**Explanation:** Async Kafka ingest with batching decouples product latency. Sync OLTP insert per click does not scale (D).

---

### Q48

**Answer:** A, B, C

**Explanation:** Flink windows, nightly Spark dedupe, and batch for late data are the tiered model. OLTP scans for MAU overload Postgres (D).

---

### Q49

**Answer:** A, C, D

**Explanation:** event_id dedupe and tolerant schemas handle at-least-once. Expecting magic exactly-once everywhere without app dedupe is unrealistic (B).

---

### Q50

**Answer:** A, B, D

**Explanation:** OLAP for aggregates; OLTP for point lookups — roles differ. Billion-row event scans belong in OLAP, not Postgres (C).
