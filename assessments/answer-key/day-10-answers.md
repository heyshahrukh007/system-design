# Classic System Design Problems — Answer Key & Explanations (50)

Answer key for [day-10-questions.md](../day-10-questions.md)




---

### Q01 [Easy] [Case Study] — GreenCart Checkout Scope

**Answer:** A, C, D

**Explanation:** Requirements cover behavior, quality attributes, and constraints first. Vendor and shard counts come after estimates (B).

---

### Q02 [Easy] — Design Workflow Order

**Answer:** A, B, C

**Explanation:** Understand problem and scale before detailed diagrams. TTL tuning without access patterns is premature (D).

---

### Q03 [Easy] [Case Study] — PulseSocial Peak Traffic

**Answer:** A, B, D

**Explanation:** Order-of-magnitude math and peak multipliers guide architecture. Production traces help later but should not block initial sizing (C).

---

### Q04 [Medium] — Hard Parts and Patterns

**Answer:** A, B, C

**Explanation:** Hot paths, async reliability, and dependency protection are core deep-dive themes. Blanket 2PC everywhere is impractical (D).

---

### Q05 [Easy] [Case Study] — LinkShare Redirect SLO

**Answer:** A, B, C

**Explanation:** Read-optimized redirect path uses 301, CDN, and split services. Sync analytics on redirect hurts latency (D).

---

### Q06 [Easy] — URL Shortener Read Path

**Answer:** A, B, D

**Explanation:** CDN, Redis cache-aside, and sharded DB back redirects. Click OLAP belongs off the hot path (C).

---

### Q07 [Medium] [Case Study] — LinkShare Click Analytics

**Answer:** A, C, D

**Explanation:** Async pipeline to analytics store preserves redirect speed; dedupe handles at-least-once. Sync Postgres increments block redirects (B).

---

### Q08 [Medium] — Short Code Generation at Scale

**Answer:** A, B, D

**Explanation:** Distributed IDs avoid hotspot and support encoding length; collision checks remain cheap (C overstates — negligible but not zero logic).

---

### Q09 [Hard] [Case Study] — LinkShare Viral Link Cache Stampede

**Answer:** A, B, C

**Explanation:** Single-flight, early refresh, and DB fallthrough mitigate stampedes. Disabling CDN worsens origin load (D).

---

### Q10 [Medium] — ThrottleAPI Placement

**Answer:** A, B, D

**Explanation:** Edge plus app/gateway tiers are standard. Per-service-only limits without shared state multiply budgets (C).

---

### Q11 [Medium] — Rate Limiting Algorithms

**Answer:** A, B, C, D

**Explanation:** All four descriptions match the doc’s algorithm trade-offs — token bucket bursts, fixed-window edge spikes, log accuracy cost, sliding counter balance.

---

### Q12 [Medium] [Case Study] — ThrottleAPI Redis Outage

**Answer:** A, B, C

**Explanation:** Fail-open vs fail-closed is a product choice; circuit breakers protect gateways. Uncoordinated per-instance full limits break quotas (D).

---

### Q13 [Medium] — Distributed Rate Limiter Implementation

**Answer:** B, C, D

**Explanation:** Redis Lua/TTL keys and server time are production patterns. Non-atomic read/write races limits (A).

---

### Q14 [Hard] [Case Study] — ThrottleAPI Hybrid Budget

**Answer:** A, B, D

**Explanation:** Local budget plus Redis global truth cuts RTT; standard rate-limit headers aid clients. Independent full limits per instance overshoot (C).

---

### Q15 [Easy] [Case Study] — PingCast Producer Latency

**Answer:** A, B, C

**Explanation:** Fast enqueue, preference filter, and status tracking match async notification design. Sync provider calls block producers (D).

---

### Q16 [Easy] — Notification Pipeline Structure

**Answer:** A, B, D

**Explanation:** Channel-separated workers, template rendering offline, and user partitioning scale. One synchronous chain per user does not (C).

---

### Q17 [Medium] [Case Study] — PingCast Marketing Spike

**Answer:** A, C, D

**Explanation:** Priority, provider throttles, and scaled consumers protect SLAs. Mixing unprioritized campaign traffic with resets risks provider limits (B).

---

### Q18 [Medium] — PingCast Reliability

**Answer:** A, C, D

**Explanation:** Retry, DLQ, and circuit breakers are core patterns. Exactly-once through external SMS/email is not realistic (B).

---

### Q19 [Hard] [Case Study] — PingCast Order Shipped Event

**Answer:** B, C, D

**Explanation:** Outbox ties DB commit to events; idempotency and at-least-once dedupe handle retries. Notify before commit risks ghost messages (A).

---

### Q20 [Easy] — FeedlyX Home Timeline

**Answer:** A, B, D

**Explanation:** Fan-out on write precomputes feeds for modest follow counts. Celebrity-scale fan-out is the failure mode (C).

---

### Q21 [Easy] — News Feed Read API

**Answer:** B, C, D

**Explanation:** Cursors, hybrid merge, and CDN/object URLs fit feeds. Deep offset pagination is costly (A).

---

### Q22 [Medium] [Case Study] — FeedlyX Celebrity Post

**Answer:** A, B, C

**Explanation:** Hybrid/read fan-out for celebrities avoids millions of writes per post. Always write fan-out breaks at 50M followers (D).

---

### Q23 [Medium] — FeedlyX Data Layout

**Answer:** A, B, C

**Explanation:** Sharded posts, follow graph, and Redis feed cache are standard. Unsharded everything does not scale (D).

---

### Q24 [Hard] [Case Study] — FeedlyX Redis Cluster Loss

**Answer:** A, B, D

**Explanation:** Rebuild path and eventual fan-out consistency are realistic; global 1 ms consistency is not (C). Queue monitoring scales workers (D).

---

### Q25 [Easy] — ChatNest Real-Time Delivery

**Answer:** A, B, D

**Explanation:** Stateful gateways, stateless persistence, pub/sub routing match chat architecture. Same-gateway-only fails at scale (C).

---

### Q26 [Easy] — Chat Message Ordering

**Answer:** A, B, D

**Explanation:** Per-conversation sequence and backward pagination are standard. Global time-only ordering breaks chat semantics (C).

---

### Q27 [Medium] [Case Study] — ChatNest Cross-Gateway Route

**Answer:** A, C, D

**Explanation:** Persist-then-deliver and cross-gateway pub/sub prevent loss. Deliver-before-persist risks dropped messages (B).

---

### Q28 [Medium] — ChatNest Presence and Offline

**Answer:** A, B, C

**Explanation:** TTL presence, push when offline, history sync on reopen. Dropping offline messages is unacceptable (D).

---

### Q29 [Hard] [Case Study] — ChatNest 500-Member Group

**Answer:** A, B, D

**Explanation:** Single persist with fan-out delivery and aggregated receipts scale groups. Per-member DB rows per send do not (C).

---

### Q30 [Medium] — Autocomplete Serving Stack

**Answer:** A, B, C

**Explanation:** Bloom → Redis → trie/FST is the layered hot path. Fuzzy-first on every keystroke is too slow (D).

---

### Q31 [Medium] [Case Study] — TypeAhead Co Keystroke Storm

**Answer:** B, C, D

**Explanation:** Min length, rate limits, and bloom rejection protect hot paths. Online trie mutation on requests is anti-pattern (A).

---

### Q32 [Hard] — Fuzzy and Prefix Interaction

**Answer:** A, B, D

**Explanation:** Fuzzy is fallback when prefix under-delivers or typos miss trie terminals; cap edit distance. Running fuzzy before bloom wastes work (C).

---

### Q33 [Hard] — TypeAhead Index Pipeline

**Answer:** B, C, D

**Explanation:** Log aggregation, offline rebuilds, and incremental trending keep serving read-only. Per-keystroke production trie writes do not (A).

---

### Q34 [Easy] — BlobVault Avatar Upload

**Answer:** A, B, C

**Explanation:** Presigned direct upload and multipart scale; objects are immutable blobs (D).

---

### Q35 [Medium] — BlobVault Metadata vs Bytes

**Answer:** A, C, D

**Explanation:** Metadata/b bytes split and immutable object model are foundational. Inline gigabyte blobs in SQL does not scale (B).

---

### Q36 [Medium] — BlobVault Durability Mechanics

**Answer:** A, B, C

**Explanation:** Replication, erasure coding tiers, and scrubbing support durability. Single copy violates 11-nines intent (D).

---

### Q37 [Hard] [Case Study] — BlobVault Read After Write

**Answer:** A, C, D

**Explanation:** Quorum before visibility, verified reads, CDN for public assets fit the model. Listing before replication completes breaks RYW (B).

---

### Q38 [Easy] [Case Study] — StreamFlix Creator Upload

**Answer:** A, B, C

**Explanation:** Presigned multipart to object storage with events keeps APIs thin. Proxying 10 GB through API pods does not scale (D).

---

### Q39 [Hard] — StreamFlix Transcoding Pipeline

**Answer:** A, B, C

**Explanation:** Async queued workers produce segmented renditions with state tracking. Inline transcode on upload request blocks and does not scale (D).

---

### Q40 [Medium] [Case Study] — StreamFlix Global Playback

**Answer:** A, B, C

**Explanation:** CDN plus ABR manifests/segment switching is mandatory at petabit scale. Single origin file per viewer fails latency and egress (D).

---

### Q41 [Hard] — StreamFlix Reliability and Ops

**Answer:** A, C, D

**Explanation:** Transcode retries, CDN metrics, and playback beacons are standard ops. Disabling multipart hurts large upload recovery (B).

---

### Q42 [Easy] [Case Study] — CartPay Mobile Checkout Retry

**Answer:** A, C, D

**Explanation:** Stable Idempotency-Key through gateway, service, and PSP prevents double charge. New key per retry defeats idempotency (B).

---

### Q43 [Hard] — CartPay Inventory and Payment Order

**Answer:** A, B, D

**Explanation:** Reserve-before-charge avoids paid orders without stock; SQL guards enforce counts. Charge-first without stock is a common anti-pattern (C).

---

### Q44 [Medium] [Case Study] — CartPay PSP Timeout

**Answer:** A, B, C

**Explanation:** Status query, release on failure, and hold sweepers handle unknown timeouts safely. Blind retries without idempotency risk double charge (D).

---

### Q45 [Hard] [Case Study] — CartPay Flash Sale Oversell

**Answer:** A, B, D

**Explanation:** Conditional updates and conflict responses prevent oversell. Negative inventory breaks consistency (C).

---

### Q46 [Hard] — CartPay Downstream Events

**Answer:** A, B, D

**Explanation:** Saga compensation, outbox, and async side effects with degradation on notify failure fit checkout. Sync email before 201 slows revenue path (C).

---

### Q47 [Medium] [Case Study] — MetricRiver Ingest Flood

**Answer:** A, C, D

**Explanation:** Async Kafka ingest with batching decouples product latency. Sync OLTP insert per click does not scale (B).

---

### Q48 [Medium] — MetricRiver Stream vs Batch

**Answer:** A, B, C

**Explanation:** Flink windows, nightly Spark dedupe, and batch for late data are the tiered model. OLTP scans for MAU overload Postgres (D).

---

### Q49 [Medium] [Case Study] — MetricRiver Duplicate Beacons

**Answer:** A, B, D

**Explanation:** event_id dedupe and tolerant schemas handle at-least-once. Expecting magic exactly-once everywhere without app dedupe is unrealistic (C).

---

### Q50 [Hard] — MetricRiver Query Store

**Answer:** A, B, C

**Explanation:** OLAP for aggregates; OLTP for point lookups — roles differ. Billion-row event scans belong in OLAP, not Postgres (D).
