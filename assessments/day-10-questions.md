# Classic System Design Problems — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-10-answers.md](./answer-key/day-10-answers.md)




---

### Q01 [Easy] [Case Study] — GreenCart Checkout Scope





**Context:** GreenCart is scoping v1 of a marketplace checkout. Legal requires PCI-aware payment handling; the team has six engineers and an existing Postgres stack.

**Select all that apply.**

What belongs in the first pass of requirements gathering before architecture?

- [ ] A. Fixed constraints — budget, regions, regulatory boundaries
- [ ] B. Final choice of CDN vendor and exact shard count
- [ ] C. Functional flows — cart review, pay, confirmation email
- [ ] D. Non-functional targets — latency, availability, consistency for inventory

---

### Q02 [Easy] — Design Workflow Order





**Select all that apply.**

Which activities should generally precede drawing detailed component diagrams?

- [ ] A. Clarify functional and non-functional requirements
- [ ] B. Identify constraints such as team size and existing stack
- [ ] C. Rough capacity and read:write estimates
- [ ] D. Pick Redis key TTL values before knowing access patterns

---

### Q03 [Easy] [Case Study] — PulseSocial Peak Traffic





**Context:** PulseSocial expects 10M daily active users, each issuing about 20 API calls per day. Product wants order-of-magnitude sizing before picking caches and DBs.

**Select all that apply.**

Which estimation steps are appropriate at this stage?

- [ ] A. Average QPS ≈ (DAU × requests per day) / 86,400
- [ ] B. Assume peak is often 2–3× average for provisioning headroom
- [ ] C. Require exact per-endpoint traces from production before any math
- [ ] D. Derive storage growth from records per day × bytes per record

---

### Q04 [Medium] — Hard Parts and Patterns





**Select all that apply.**

When deep-diving the difficult areas of a system design, which pairings are sensible?

- [ ] A. Hot read path → cache-aside and CDN where reads dominate
- [ ] B. Reliable async side effects → outbox or queue with idempotent consumers
- [ ] C. External dependency flakiness → timeouts and circuit breakers
- [ ] D. Every CRUD table → mandatory two-phase commit across all services

---

### Q05 [Easy] [Case Study] — LinkShare Redirect SLO





**Context:** LinkShare serves 10B redirects per month with a 100:1 read:write ratio. Product demands sub-50 ms p99 on redirect and 99.99% availability on that path.

**Select all that apply.**

Which architectural choices align with those goals?

- [ ] A. Return HTTP 301 so browsers and CDNs can cache mappings
- [ ] B. Separate horizontally scaled redirect service from create/write APIs
- [ ] C. CDN in front of redirect for viral hot links
- [ ] D. Write click analytics synchronously inside the redirect handler

---

### Q06 [Easy] — URL Shortener Read Path





**Select all that apply.**

For a read-heavy URL shortener, which layers belong on the redirect hot path?

- [ ] A. Edge CDN cache for frequently clicked codes
- [ ] B. Redis cache-aside lookup before hitting the database shard
- [ ] C. Synchronous OLAP query for click counts before returning Location header
- [ ] D. Database shard selected by hash of the short code

---

### Q07 [Medium] [Case Study] — LinkShare Click Analytics





**Context:** LinkShare product wants per-link click counts without regressing redirect latency during traffic spikes.

**Select all that apply.**

Which designs satisfy both goals?

- [ ] A. Dedupe analytics with keys like code + time bucket + user hash when using at-least-once delivery
- [ ] B. Increment counters in Postgres inside the same transaction as redirect lookup
- [ ] C. Stream or batch process events into an analytics store (e.g., ClickHouse)
- [ ] D. Publish click events to a queue/log after responding with 301

---

### Q08 [Medium] — Short Code Generation at Scale





**Select all that apply.**

Why do large URL shorteners favor distributed IDs (e.g., Snowflake-style) plus Base62 over a single DB auto-increment?

- [ ] A. Avoids a single global write hotspot on every create
- [ ] B. Produces less predictable codes than sequential integers
- [ ] C. Eliminates the need for any uniqueness check on insert
- [ ] D. Supports fixed short code length targets (e.g., ≤ 7 characters)

---

### Q09 [Hard] [Case Study] — LinkShare Viral Link Cache Stampede





**Context:** A celebrity tweet drives millions of hits on one short code within minutes. Redis TTL on that code expires during the spike.

**Select all that apply.**

Which mitigations address cache stampede on the redirect path?

- [ ] A. Probabilistic early refresh before TTL expiry on hot keys
- [ ] B. Single-flight lock so only one request repopulates Redis on miss
- [ ] C. Fall through to DB with timeouts and circuit breakers if cache is unavailable
- [ ] D. Disable CDN caching so all traffic hits origin for freshness

---

### Q10 [Medium] — ThrottleAPI Placement





**Select all that apply.**

Where should rate limiting typically sit in a multi-tier API platform?

- [ ] A. Coarse edge/gateway limits for DDoS and IP floods
- [ ] B. Fine-grained app or gateway rules per user, key, or endpoint
- [ ] C. Only inside each microservice with no shared state — never at gateway
- [ ] D. Both edge and application layers are commonly combined

---

### Q11 [Medium] — Rate Limiting Algorithms





**Select all that apply.**

Which statements about common rate-limit algorithms are accurate?

- [ ] A. Sliding window counter balances accuracy and memory for many production systems
- [ ] B. Sliding window log is exact but can be memory-heavy per client
- [ ] C. Fixed window counters can spike to 2× allowed rate at window boundaries
- [ ] D. Token bucket allows bursts up to bucket capacity while smoothing average rate

---

### Q12 [Medium] [Case Study] — ThrottleAPI Redis Outage





**Context:** ThrottleAPI enforces paid API quotas on a billing-sensitive product. Redis holds shared counters across 40 gateway instances.

**Select all that apply.**

Which failure policies are defensible depending on product requirements?

- [ ] A. Fail-open (allow traffic) when Redis is down for general consumer APIs
- [ ] B. Fail-closed (reject requests) when strict quota enforcement is mandatory
- [ ] C. Circuit breaker on the Redis client to avoid thread pile-ups
- [ ] D. Ignore Redis entirely and rely on per-instance memory counters without adjustment

---

### Q13 [Medium] — Distributed Rate Limiter Implementation





**Select all that apply.**

How should a cluster-wide limiter keep counts consistent under concurrency?

- [ ] A. Separate read and write without atomicity because races average out
- [ ] B. Central store such as Redis with atomic increment/check (often Lua scripts)
- [ ] C. Use Redis server time in scripts to reduce clock-skew issues
- [ ] D. Keys scoped by identity and time window with TTL slightly beyond window size

---

### Q14 [Hard] [Case Study] — ThrottleAPI Hybrid Budget





**Context:** ThrottleAPI must add &lt; 5 ms decision latency at 50K checks/sec but stay accurate cluster-wide.

**Select all that apply.**

Which hybrid approaches reduce Redis round-trips while preserving global limits?

- [ ] A. Local token bucket consuming part of the budget on each gateway instance
- [ ] B. Redis as source of truth for the remaining global allowance
- [ ] C. Give each instance the full global limit independently with no coordination
- [ ] D. Return standard headers such as Limit, Remaining, and Reset on responses

---

### Q15 [Easy] [Case Study] — PingCast Producer Latency





**Context:** PingCast delivers push, email, and SMS for an e-commerce app. Order service calls must not block on SendGrid or Twilio.

**Select all that apply.**

Which API behavior matches typical notification requirements?

- [ ] A. Filter channels using cached user preferences before publishing work
- [ ] B. Store notification records with pending/sent/failed status for tracking
- [ ] C. Accept enqueue quickly (e.g., 202) and process delivery asynchronously
- [ ] D. Synchronously call every provider before returning to the order service

---

### Q16 [Easy] — Notification Pipeline Structure





**Select all that apply.**

Which patterns fit a multi-channel notification platform?

- [ ] A. Separate Kafka topics or worker pools per channel for independent scaling
- [ ] B. Template rendering in workers, not in the lightweight enqueue API
- [ ] C. Single synchronous thread per user that sends push then email then SMS in one request
- [ ] D. Partition work by user_id to preserve per-user ordering where needed

---

### Q17 [Medium] [Case Study] — PingCast Marketing Spike





**Context:** PingCast must send 8M promotional emails in an hour while transactional password resets stay prioritized.

**Select all that apply.**

Which controls prevent provider throttling from breaking critical mail?

- [ ] A. Horizontal scale of channel workers with partitioned Kafka consumers
- [ ] B. Send all campaign messages on the same topic as password resets without throttling
- [ ] C. Priority queues — transactional traffic ahead of marketing
- [ ] D. Per-provider rate limits aligned to SendGrid/Twilio plan caps

---

### Q18 [Medium] — PingCast Reliability





**Select all that apply.**

Which reliability mechanisms belong in a notification design?

- [ ] A. Retry with backoff on transient provider errors
- [ ] B. Exactly-once delivery guaranteed end-to-end through all external SMS gateways
- [ ] C. DLQ after max retries for poison or persistent failures
- [ ] D. Circuit breaker to pause a failing channel and alert operations

---

### Q19 [Hard] [Case Study] — PingCast Order Shipped Event





**Context:** PingCast must never emit "order shipped" notifications without a committed order state in the order database.

**Select all that apply.**

Which designs preserve consistency between OLTP and downstream notification events?

- [ ] A. Fire-and-forget HTTP to PingCast before the order transaction commits
- [ ] B. At-least-once delivery with dedupe on the consumer side
- [ ] C. Transactional outbox in the order DB plus a worker publishing to Kafka
- [ ] D. Idempotency keys such as notification_id or (event_id, user_id, channel)

---

### Q20 [Easy] — FeedlyX Home Timeline





**Context:** FeedlyX targets 200 ms p99 feed reads for users who follow ~200 accounts. Most authors have modest follower counts.

**Select all that apply.**

Why is fan-out on write attractive for this majority?

- [ ] A. Feed read becomes a fast fetch of precomputed post IDs from Redis
- [ ] B. Publishing pushes post IDs into each follower's feed cache (e.g., LPUSH + trim)
- [ ] C. Every post from a 50M-follower celebrity still writes 50M cache rows
- [ ] D. Write amplification is acceptable when followers per author stay below a threshold

---

### Q21 [Easy] — News Feed Read API





**Select all that apply.**

Which feed API properties improve scalability and UX?

- [ ] A. Offset pagination deep in the feed without index cost
- [ ] B. Store post media URLs pointing to object storage/CDN
- [ ] C. Cursor-based pagination stable under concurrent new posts
- [ ] D. Merge precomputed timeline with on-read celebrity content in hybrid models

---

### Q22 [Medium] [Case Study] — FeedlyX Celebrity Post





**Context:** A FeedlyX creator with 50M followers publishes a photo post. Fan-out-on-write would touch tens of millions of Redis lists per publish.

**Select all that apply.**

Which strategies avoid that write storm?

- [ ] A. Fan-out on read for high-follower accounts only
- [ ] B. Hybrid threshold (e.g., &lt; 10K followers write fan-out, else read fan-out)
- [ ] C. Merge celebrity posts into home feeds at read time
- [ ] D. Always fan-out on write regardless of follower count for simplicity

---

### Q23 [Medium] — FeedlyX Data Layout





**Select all that apply.**

Which storage choices support feed and profile access patterns?

- [ ] A. Posts sharded by author_id or post_id with indexes on author and time
- [ ] B. Follow graph stored relationally or in a suitable graph-friendly store
- [ ] C. Per-user feed cache in Redis as list or sorted set of post IDs
- [ ] D. Single unsharded table for all posts without partitioning plan

---

### Q24 [Hard] [Case Study] — FeedlyX Redis Cluster Loss





**Context:** A FeedlyX Redis cluster fails over; many feed caches are cold. Users still expect readable timelines, possibly with seconds of staleness.

**Select all that apply.**

Which recovery and consistency expectations are realistic?

- [ ] A. Rebuild feeds from posts + follows along a slower path
- [ ] B. Accept eventual consistency for fan-out propagation under normal operation
- [ ] C. Guarantee every user sees new posts within 1 ms globally after publish
- [ ] D. Alert on fan-out worker queue depth and scale consumers when lagging

---

### Q25 [Easy] — ChatNest Real-Time Delivery





**Context:** ChatNest targets &lt; 200 ms p99 delivery for online users with 5M concurrent WebSocket connections across gateway nodes.

**Select all that apply.**

Which architectural split matches chat at scale?

- [ ] A. Stateless message service for validation, persistence, and sequencing
- [ ] B. Stateful chat gateways for long-lived WebSocket connections
- [ ] C. Require sender and recipient to connect to the same gateway forever
- [ ] D. Route cross-gateway delivery via pub/sub or a message router bus

---

### Q26 [Easy] — Chat Message Ordering





**Select all that apply.**

How do production chat systems achieve per-conversation ordering?

- [ ] A. Monotonic sequence_id scoped to conversation_id in the messages table
- [ ] B. History API paginates backward using before_seq cursors
- [ ] C. Global timestamp-only ordering across all chats without per-conversation keys
- [ ] D. Primary key (conversation_id, sequence_id) on partitioned message storage

---

### Q27 [Medium] [Case Study] — ChatNest Cross-Gateway Route





**Context:** User A is on gateway G1; recipient B is on G2. A sends a message while both are online.

**Select all that apply.**

Which flow preserves durability and delivery?

- [ ] A. ACK to A includes server-assigned message_id after successful persist
- [ ] B. Push to B's socket first, then optionally persist if time permits
- [ ] C. G1 publishes to a channel such as user:B consumed by G2
- [ ] D. Persist message (assign sequence) before pushing to recipient sockets

---

### Q28 [Medium] — ChatNest Presence and Offline





**Select all that apply.**

Which behaviors handle offline users and presence?

- [ ] A. Presence keys with TTL refreshed by heartbeat on connect
- [ ] B. Push notification pipeline when recipient has no active connection
- [ ] C. Client sync via history API using last acknowledged sequence on reopen
- [ ] D. Drop messages permanently if the recipient was offline for more than one minute

---

### Q29 [Hard] [Case Study] — ChatNest 500-Member Group





**Context:** ChatNest group chat has 500 members. Product wants real-time delivery without 500 sequential DB writes per message.

**Select all that apply.**

Which approaches are standard?

- [ ] A. Aggregate read receipts for very large groups to limit fan-out volume
- [ ] B. Persist the message once, fan-out delivery to online sessions via pub/sub
- [ ] C. Insert 500 duplicate message rows — one per member — for each send
- [ ] D. Offline members receive push or fetch history on next sync

---

### Q30 [Medium] — Autocomplete Serving Stack





**Select all that apply.**

Which layers reduce work on the autocomplete hot path?

- [ ] A. Bloom filter to reject prefixes that were never seen in logs
- [ ] B. Redis cache of top-K suggestions for hot prefixes
- [ ] C. Trie or FST with precomputed top-K at nodes for O(prefix length) lookup
- [ ] D. Run full fuzzy edit-distance search on every keystroke before trie lookup

---

### Q31 [Medium] [Case Study] — TypeAhead Co Keystroke Storm





**Context:** TypeAhead Co serves 100K+ suggest QPS; prefixes like "a" and "am" dominate traffic. p99 latency must stay under 50 ms.

**Select all that apply.**

Which tactics address hot keys and junk queries?

- [ ] A. Build indexes online on the request path for every new query string
- [ ] B. Bloom filter to shed random bot strings before trie access
- [ ] C. Rate limit abusive IPs at the edge
- [ ] D. Minimum prefix length before hitting heavy indexes

---

### Q32 [Hard] — Fuzzy and Prefix Interaction





**Select all that apply.**

When should fuzzy typo correction run in autocomplete?

- [ ] A. When exact prefix trie returns fewer than K results
- [ ] B. For inputs like "amozon" where trie walk finds no terminal match
- [ ] C. On every request before checking the bloom filter
- [ ] D. With edit distance capped at 1–2 for tractable candidate sets

---

### Q33 [Hard] — TypeAhead Index Pipeline





**Select all that apply.**

How do large autocomplete systems keep serving read-only and fresh?

- [ ] A. Mutate trie nodes synchronously on each user keystroke in production
- [ ] B. Aggregate query counts from search logs via stream/batch jobs
- [ ] C. Incremental weight updates for trending queries on a short cadence
- [ ] D. Nightly rebuild of trie/FST, bloom filter, and fuzzy indexes

---

### Q34 [Easy] — BlobVault Avatar Upload





**Context:** BlobVault stores user avatars up to 5 MB. API servers must not proxy all upload bytes.

**Select all that apply.**

Which upload patterns fit object storage at scale?

- [ ] A. Pre-signed URL (valet key) for direct PUT to storage with tight TTL and scope
- [ ] B. Small objects written through API after replica quorum on data nodes
- [ ] C. Multipart upload with parallel parts and complete step for large files
- [ ] D. Mutable in-place random writes inside existing blob bytes

---

### Q35 [Medium] — BlobVault Metadata vs Bytes





**Select all that apply.**

Why split metadata service from data nodes?

- [ ] A. List-by-prefix and checksum verification on read path
- [ ] B. Store multi-GB video bytes inline in Postgres rows for simplicity
- [ ] C. Fast key lookup in a central metadata DB while blobs sit on cheap disks
- [ ] D. Objects treated as immutable — updates via new version or key

---

### Q36 [Medium] — BlobVault Durability Mechanics





**Select all that apply.**

Which practices support 11-nines durability targets?

- [ ] A. Replication across nodes/racks (e.g., 3-way) for hot objects
- [ ] B. Erasure coding for cold tiers to save space at cost of rebuild complexity
- [ ] C. Background scrub comparing stored checksums to detect bit rot
- [ ] D. Single copy on one disk with no replication to minimize cost

---

### Q37 [Hard] [Case Study] — BlobVault Read After Write





**Context:** BlobVault promises read-after-write consistency for successful PUTs on a private bucket.

**Select all that apply.**

Which behaviors align with that guarantee?

- [ ] A. Public assets optionally fronted by CDN with origin on object store
- [ ] B. Immediately list object in all regions before any replica persists bytes
- [ ] C. Metadata not visible until required replica acknowledgements complete
- [ ] D. GET streams from a healthy replica and verifies checksum

---

### Q38 [Easy] [Case Study] — StreamFlix Creator Upload





**Context:** StreamFlix accepts up to 10 GB uploads per video. API tier is stateless and CPU-light.

**Select all that apply.**

Which upload architecture scales bandwidth?

- [ ] A. Initiate upload → client sends chunks via presigned URLs to object storage
- [ ] B. Resumable multipart for failed or interrupted transfers
- [ ] C. Complete upload emits video.uploaded event for async processing
- [ ] D. Stream entire file through the upload API pod to transcode inline

---

### Q39 [Hard] — StreamFlix Transcoding Pipeline





**Select all that apply.**

Which properties belong in the processing path?

- [ ] A. Workers pull jobs from a queue/log and produce HLS/DASH renditions
- [ ] B. FFmpeg (or similar) outputs multiple bitrates stored as segments in object storage
- [ ] C. Metadata tracks states such as uploaded, processing, ready, failed
- [ ] D. Synchronous transcode in the HTTP request before returning upload success

---

### Q40 [Medium] [Case Study] — StreamFlix Global Playback





**Context:** StreamFlix serves 100M viewing hours per day; egress is measured in petabits. Product targets &lt; 2 s to first frame.

**Select all that apply.**

Which delivery choices are mandatory at this scale?

- [ ] A. CDN serves 95%+ of segment bytes from edge caches
- [ ] B. Adaptive bitrate via manifest listing multiple renditions
- [ ] C. Client player switches bitrate per segment based on measured throughput
- [ ] D. Single 4K file download from origin for every viewer worldwide

---

### Q41 [Hard] — StreamFlix Reliability and Ops





**Select all that apply.**

Which operational practices fit video platforms?

- [ ] A. Client playback beacons fed into analytics for regional error rates
- [ ] B. Disable multipart upload to simplify failure recovery
- [ ] C. Retry/DLQ for failed transcodes and notify creators
- [ ] D. CDN cache hit ratio and origin egress monitoring

---

### Q42 [Easy] [Case Study] — CartPay Mobile Checkout Retry





**Context:** CartPay checkout runs on flaky mobile networks. Users double-tap "Pay"; support reports duplicate charges when retries lack safeguards.

**Select all that apply.**

Which API design prevents duplicate orders and charges?

- [ ] A. Idempotency-Key header on POST /checkout processed at gateway/service
- [ ] B. Generate a new random idempotency key on every automatic client retry
- [ ] C. Same key on retry returns the original order outcome without re-charging
- [ ] D. Payment PSP calls reuse the same idempotency key as checkout

---

### Q43 [Hard] — CartPay Inventory and Payment Order





**Select all that apply.**

Why reserve inventory before capturing payment in many checkout flows?

- [ ] A. Reduces charging customers when stock is unavailable
- [ ] B. Hold TTL with release on payment failure or timeout
- [ ] C. Charge payment first always — inventory can be corrected later via email
- [ ] D. Transactional SQL updates with available ≥ qty checks on reserve

---

### Q44 [Medium] [Case Study] — CartPay PSP Timeout





**Context:** CartPay reserved inventory for 15 minutes. Payment service times out calling the PSP — outcome unknown.

**Select all that apply.**

Which handling is production-safe?

- [ ] A. Query PSP for payment status before blindly retrying a new charge
- [ ] B. Release inventory hold when payment definitively fails
- [ ] C. Sweeper job expires stale holds after TTL
- [ ] D. Immediately retry charge five times without idempotency key

---

### Q45 [Hard] [Case Study] — CartPay Flash Sale Oversell





**Context:** Two checkout requests race for the last unit of a SKU. CartPay must not oversell inventory.

**Select all that apply.**

Which mechanisms enforce correctness?

- [ ] A. Return 409 insufficient_inventory to the losing client
- [ ] B. Conditional UPDATE … WHERE available ≥ qty with rows-affected check
- [ ] C. Allow negative available count temporarily to maximize conversion
- [ ] D. Optimistic locking or constraints so only one reserve succeeds

---

### Q46 [Hard] — CartPay Downstream Events





**Select all that apply.**

After order confirmation, which patterns keep downstream systems consistent?

- [ ] A. Saga with compensate steps — release stock or refund if later steps fail
- [ ] B. Transactional outbox co-written with order row, then publish to Kafka
- [ ] C. Email warehouse and analytics synchronously before HTTP 201 response
- [ ] D. Graceful degradation — order stands if notification pipeline is down

---

### Q47 [Medium] [Case Study] — MetricRiver Ingest Flood





**Context:** MetricRiver ingests product analytics at up to 1M events/sec peak. Product APIs must not block on dashboard writes.

**Select all that apply.**

Which ingest behaviors fit?

- [ ] A. Partition Kafka by user_id when per-user ordering matters
- [ ] B. Synchronous INSERT into Postgres fact table on every user click
- [ ] C. Batch POST arrays of events from clients and backends
- [ ] D. Async accept (202) after validate/enrich → durable log (Kafka)

---

### Q48 [Medium] — MetricRiver Stream vs Batch





**Select all that apply.**

How do real-time and historical analytics tiers differ?

- [ ] A. Flink (or similar) tumbling windows for near real-time aggregates
- [ ] B. Nightly Spark jobs dedupe and load warehouse partitions by date
- [ ] C. Batch corrects late events and refines stream approximations
- [ ] D. Run heavy COUNT(*) scans on production OLTP for daily MAU

---

### Q49 [Medium] [Case Study] — MetricRiver Duplicate Beacons





**Context:** Mobile clients retry event batches; at-least-once delivery duplicates arrive at MetricRiver ingest.

**Select all that apply.**

Which deduplication strategies are appropriate?

- [ ] A. Schema registry or documented contracts per event_name with tolerant consumers
- [ ] B. Client-generated event_id deduped in stream or batch processors
- [ ] C. Require exactly-once Kafka semantics end-to-end without any application dedupe
- [ ] D. Accept at-least-once ingest with idempotent aggregation downstream

---

### Q50 [Hard] — MetricRiver Query Store





**Select all that apply.**

Why route analyst queries to OLAP (ClickHouse, BigQuery, Druid) instead of OLTP Postgres?

- [ ] A. Column-oriented stores optimize scans and aggregates over billions of rows
- [ ] B. Append-heavy event history fits OLAP better than updating order rows in place
- [ ] C. Sub-second transactional lookups on primary keys remain OLTP's strength
- [ ] D. OLTP Postgres is ideal for full-table daily event scans at billion-row scale
