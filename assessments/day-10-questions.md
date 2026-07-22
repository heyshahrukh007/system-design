# Classic System Design Problems — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-10-answers.md](./answer-key/day-10-answers.md)





---

### Q01






GreenCart is scoping v1 of a marketplace checkout. Legal requires PCI-aware payment handling; the team has six engineers and an existing Postgres stack.

**Select all that apply.**

What belongs in the first pass of requirements gathering before architecture?

- [ ] A. Non-functional targets — latency, availability, consistency for inventory
- [ ] B. Ignore regulatory boundaries until after the payment architecture is deployed
- [ ] C. Final choice of CDN vendor and exact shard count
- [ ] D. Functional flows — cart review, pay, confirmation email

---

### Q02






**Select all that apply.**

Which activities should generally precede drawing detailed component diagrams?

- [ ] A. Pick Redis key TTL values before knowing access patterns
- [ ] B. Draw the final topology before asking what users need the system to do
- [ ] C. Rough capacity and read:write estimates
- [ ] D. Identify constraints such as team size and existing stack

---

### Q03






PulseSocial expects 10M daily active users, each issuing about 20 API calls per day. Product wants order-of-magnitude sizing before picking caches and DBs.

**Select all that apply.**

Which estimation steps are appropriate at this stage?

- [ ] A. Assume peak is often 2–3× average for provisioning headroom
- [ ] B. Average QPS ≈ (DAU × requests per day) / 86,400
- [ ] C. Choose a database engine first, then adjust the traffic estimate to fit it
- [ ] D. Require exact per-endpoint traces from production before any math

---

### Q04






**Select all that apply.**

When deep-diving the difficult areas of a system design, which pairings are sensible?

- [ ] A. Every CRUD table → mandatory two-phase commit across all services
- [ ] B. Hot read path → cache-aside and CDN where reads dominate
- [ ] C. Reliable async side effects → fire-and-forget calls with no retries or deduplication
- [ ] D. External dependency flakiness → timeouts and circuit breakers

---

### Q05






LinkShare serves 10B redirects per month with a 100:1 read:write ratio. Product demands sub-50 ms p99 on redirect and 99.99% availability on that path.

**Select all that apply.**

Which architectural choices align with those goals?

- [ ] A. Separate horizontally scaled redirect service from create/write APIs
- [ ] B. Disable caching on redirects so every click reaches the origin database
- [ ] C. CDN in front of redirect for viral hot links
- [ ] D. Write click analytics synchronously inside the redirect handler

---

### Q06






**Select all that apply.**

For a read-heavy URL shortener, which layers belong on the redirect hot path?

- [ ] A. Edge CDN cache for frequently clicked codes
- [ ] B. Database shard selected by hash of the short code
- [ ] C. Synchronous OLAP query for click counts before returning Location header
- [ ] D. Query every database shard on each redirect before checking any cache

---

### Q07






LinkShare product wants per-link click counts without regressing redirect latency during traffic spikes.

**Select all that apply.**

Which designs satisfy both goals?

- [ ] A. Stream or batch process events into an analytics store (e.g., ClickHouse)
- [ ] B. Dedupe analytics with keys like code + time bucket + user hash when using at-least-once delivery
- [ ] C. Block the redirect response until the analytics warehouse confirms ingestion
- [ ] D. Increment counters in Postgres inside the same transaction as redirect lookup

---

### Q08






**Select all that apply.**

Why do large URL shorteners favor distributed IDs (e.g., Snowflake-style) plus Base62 over a single DB auto-increment?

- [ ] A. Guarantees that generated codes can never collide or require uniqueness enforcement
- [ ] B. Eliminates the need for any uniqueness check on insert
- [ ] C. Supports fixed short code length targets (e.g., ≤ 7 characters)
- [ ] D. Avoids a single global write hotspot on every create

---

### Q09






A celebrity tweet drives millions of hits on one short code within minutes. Redis TTL on that code expires during the spike.

**Select all that apply.**

Which mitigations address cache stampede on the redirect path?

- [ ] A. Expire every hot key at the same fixed instant to maximize coordinated misses
- [ ] B. Single-flight lock so only one request repopulates Redis on miss
- [ ] C. Disable CDN caching so all traffic hits origin for freshness
- [ ] D. Fall through to DB with timeouts and circuit breakers if cache is unavailable

---

### Q10






**Select all that apply.**

Where should rate limiting typically sit in a multi-tier API platform?

- [ ] A. Coarse edge/gateway limits for DDoS and IP floods
- [ ] B. Both edge and application layers are commonly combined
- [ ] C. Only inside each microservice with no shared state — never at gateway
- [ ] D. Apply one identical global limit to every tenant and endpoint regardless of cost

---

### Q11






**Select all that apply.**

Which statements about common rate-limit algorithms are accurate?

- [ ] A. Fixed window counters can spike to 2× allowed rate at window boundaries
- [ ] B. Sliding window counter balances accuracy and memory for many production systems
- [ ] C. Token bucket rejects every burst even when unused tokens are available
- [ ] D. Sliding window log is exact but can be memory-heavy per client

---

### Q12






ThrottleAPI enforces paid API quotas on a billing-sensitive product. Redis holds shared counters across 40 gateway instances.

**Select all that apply.**

Which failure policies are defensible depending on product requirements?

- [ ] A. Fail-open (allow traffic) when Redis is down for general consumer APIs
- [ ] B. Always fail-open for paid quotas even when overuse creates direct financial loss
- [ ] C. Ignore Redis entirely and rely on per-instance memory counters without adjustment
- [ ] D. Circuit breaker on the Redis client to avoid thread pile-ups

---

### Q13






**Select all that apply.**

How should a cluster-wide limiter keep counts consistent under concurrency?

- [ ] A. Separate read and write without atomicity because races average out
- [ ] B. Trust each gateway's unsynchronized wall clock inside a multi-step non-atomic update
- [ ] C. Keys scoped by identity and time window with TTL slightly beyond window size
- [ ] D. Central store such as Redis with atomic increment/check (often Lua scripts)

---

### Q14






ThrottleAPI must add &lt; 5 ms decision latency at 50K checks/sec but stay accurate cluster-wide.

**Select all that apply.**

Which hybrid approaches reduce Redis round-trips while preserving global limits?

- [ ] A. Return standard headers such as Limit, Remaining, and Reset on responses
- [ ] B. Local token bucket consuming part of the budget on each gateway instance
- [ ] C. Give each instance the full global limit independently with no coordination
- [ ] D. Let each gateway independently grant the entire global allowance

---

### Q15






PingCast delivers push, email, and SMS for an e-commerce app. Order service calls must not block on SendGrid or Twilio.

**Select all that apply.**

Which API behavior matches typical notification requirements?

- [ ] A. Store notification records with pending/sent/failed status for tracking
- [ ] B. Accept enqueue quickly (e.g., 202) and process delivery asynchronously
- [ ] C. Synchronously call every provider before returning to the order service
- [ ] D. Ignore opt-out preferences until after every provider has accepted the message

---

### Q16






**Select all that apply.**

Which patterns fit a multi-channel notification platform?

- [ ] A. Partition work by user_id to preserve per-user ordering where needed
- [ ] B. Single synchronous thread per user that sends push then email then SMS in one request
- [ ] C. Render every channel template synchronously before acknowledging enqueue
- [ ] D. Separate Kafka topics or worker pools per channel for independent scaling

---

### Q17






PingCast must send 8M promotional emails in an hour while transactional password resets stay prioritized.

**Select all that apply.**

Which controls prevent provider throttling from breaking critical mail?

- [ ] A. Per-provider rate limits aligned to SendGrid/Twilio plan caps
- [ ] B. Send all campaign messages on the same topic as password resets without throttling
- [ ] C. Priority queues — transactional traffic ahead of marketing
- [ ] D. Use one worker process for all 8M emails to preserve global ordering

---

### Q18






**Select all that apply.**

Which reliability mechanisms belong in a notification design?

- [ ] A. Circuit breaker to pause a failing channel and alert operations
- [ ] B. Exactly-once delivery guaranteed end-to-end through all external SMS gateways
- [ ] C. Retry permanent provider errors forever with no delay or attempt cap
- [ ] D. DLQ after max retries for poison or persistent failures

---

### Q19






PingCast must never emit "order shipped" notifications without a committed order state in the order database.

**Select all that apply.**

Which designs preserve consistency between OLTP and downstream notification events?

- [ ] A. At-least-once delivery with dedupe on the consumer side
- [ ] B. Publish the notification event first and roll back the already-published event if the DB commit fails
- [ ] C. Idempotency keys such as notification_id or (event_id, user_id, channel)
- [ ] D. Fire-and-forget HTTP to PingCast before the order transaction commits

---

### Q20






FeedlyX targets 200 ms p99 feed reads for users who follow ~200 accounts. Most authors have modest follower counts.

**Select all that apply.**

Why is fan-out on write attractive for this majority?

- [ ] A. Write amplification is acceptable when followers per author stay below a threshold
- [ ] B. Recompute the full follow graph and all candidate posts on every feed read
- [ ] C. Every post from a 50M-follower celebrity still writes 50M cache rows
- [ ] D. Publishing pushes post IDs into each follower's feed cache (e.g., LPUSH + trim)

---

### Q21






**Select all that apply.**

Which feed API properties improve scalability and UX?

- [ ] A. Offset pagination deep in the feed without index cost
- [ ] B. Use deep offset pagination as the only feed API for continuously changing timelines
- [ ] C. Cursor-based pagination stable under concurrent new posts
- [ ] D. Store post media URLs pointing to object storage/CDN

---

### Q22






A FeedlyX creator with 50M followers publishes a photo post. Fan-out-on-write would touch tens of millions of Redis lists per publish.

**Select all that apply.**

Which strategies avoid that write storm?

- [ ] A. Hybrid threshold (e.g., &lt; 10K followers write fan-out, else read fan-out)
- [ ] B. Write the celebrity post synchronously into all 50M follower feeds before acknowledging publish
- [ ] C. Always fan-out on write regardless of follower count for simplicity
- [ ] D. Merge celebrity posts into home feeds at read time

---

### Q23






**Select all that apply.**

Which storage choices support feed and profile access patterns?

- [ ] A. Single unsharded table for all posts without partitioning plan
- [ ] B. Per-user feed cache in Redis as list or sorted set of post IDs
- [ ] C. Store the entire global follow graph as one unindexed JSON document
- [ ] D. Posts sharded by author_id or post_id with indexes on author and time

---

### Q24






A FeedlyX Redis cluster fails over; many feed caches are cold. Users still expect readable timelines, possibly with seconds of staleness.

**Select all that apply.**

Which recovery and consistency expectations are realistic?

- [ ] A. Guarantee every user sees new posts within 1 ms globally after publish
- [ ] B. Return permanent errors for every cold cache instead of rebuilding from durable data
- [ ] C. Alert on fan-out worker queue depth and scale consumers when lagging
- [ ] D. Accept eventual consistency for fan-out propagation under normal operation

---

### Q25






ChatNest targets &lt; 200 ms p99 delivery for online users with 5M concurrent WebSocket connections across gateway nodes.

**Select all that apply.**

Which architectural split matches chat at scale?

- [ ] A. Route cross-gateway delivery via pub/sub or a message router bus
- [ ] B. Require sender and recipient to connect to the same gateway forever
- [ ] C. Keep all message history only in chat-gateway process memory
- [ ] D. Stateful chat gateways for long-lived WebSocket connections

---

### Q26






**Select all that apply.**

How do production chat systems achieve per-conversation ordering?

- [ ] A. Monotonic sequence_id scoped to conversation_id in the messages table
- [ ] B. Primary key (conversation_id, sequence_id) on partitioned message storage
- [ ] C. Global timestamp-only ordering across all chats without per-conversation keys
- [ ] D. History API paginates backward using before_seq cursors

---

### Q27






User A is on gateway G1; recipient B is on G2. A sends a message while both are online.

**Select all that apply.**

Which flow preserves durability and delivery?

- [ ] A. G1 publishes to a channel such as user:B consumed by G2
- [ ] B. ACK to A includes server-assigned message_id after successful persist
- [ ] C. Persist message (assign sequence) before pushing to recipient sockets
- [ ] D. Push to B's socket first, then optionally persist if time permits

---

### Q28






**Select all that apply.**

Which behaviors handle offline users and presence?

- [ ] A. Presence keys with TTL refreshed by heartbeat on connect
- [ ] B. Client sync via history API using last acknowledged sequence on reopen
- [ ] C. Push notification pipeline when recipient has no active connection
- [ ] D. Drop messages permanently if the recipient was offline for more than one minute

---

### Q29






ChatNest group chat has 500 members. Product wants real-time delivery without 500 sequential DB writes per message.

**Select all that apply.**

Which approaches are standard?

- [ ] A. Insert 500 duplicate message rows — one per member — for each send
- [ ] B. Persist the message once, fan-out delivery to online sessions via pub/sub
- [ ] C. Offline members receive push or fetch history on next sync
- [ ] D. Aggregate read receipts for very large groups to limit fan-out volume

---

### Q30






**Select all that apply.**

Which layers reduce work on the autocomplete hot path?

- [ ] A. Redis cache of top-K suggestions for hot prefixes
- [ ] B. Bloom filter to reject prefixes that were never seen in logs
- [ ] C. Trie or FST with precomputed top-K at nodes for O(prefix length) lookup
- [ ] D. Run full fuzzy edit-distance search on every keystroke before trie lookup

---

### Q31






TypeAhead Co serves 100K+ suggest QPS; prefixes like "a" and "am" dominate traffic. p99 latency must stay under 50 ms.

**Select all that apply.**

Which tactics address hot keys and junk queries?

- [ ] A. Rate limit abusive IPs at the edge
- [ ] B. Build indexes online on the request path for every new query string
- [ ] C. Minimum prefix length before hitting heavy indexes
- [ ] D. Bloom filter to shed random bot strings before trie access

---

### Q32






**Select all that apply.**

When should fuzzy typo correction run in autocomplete?

- [ ] A. For inputs like "amozon" where trie walk finds no terminal match
- [ ] B. With edit distance capped at 1–2 for tractable candidate sets
- [ ] C. When exact prefix trie returns fewer than K results
- [ ] D. On every request before checking the bloom filter

---

### Q33






**Select all that apply.**

How do large autocomplete systems keep serving read-only and fresh?

- [ ] A. Nightly rebuild of trie/FST, bloom filter, and fuzzy indexes
- [ ] B. Aggregate query counts from search logs via stream/batch jobs
- [ ] C. Mutate trie nodes synchronously on each user keystroke in production
- [ ] D. Incremental weight updates for trending queries on a short cadence

---

### Q34






BlobVault stores user avatars up to 5 MB. API servers must not proxy all upload bytes.

**Select all that apply.**

Which upload patterns fit object storage at scale?

- [ ] A. Pre-signed URL (valet key) for direct PUT to storage with tight TTL and scope
- [ ] B. Mutable in-place random writes inside existing blob bytes
- [ ] C. Small objects written through API after replica quorum on data nodes
- [ ] D. Multipart upload with parallel parts and complete step for large files

---

### Q35






**Select all that apply.**

Why split metadata service from data nodes?

- [ ] A. Store multi-GB video bytes inline in Postgres rows for simplicity
- [ ] B. Fast key lookup in a central metadata DB while blobs sit on cheap disks
- [ ] C. Objects treated as immutable — updates via new version or key
- [ ] D. List-by-prefix and checksum verification on read path

---

### Q36






**Select all that apply.**

Which practices support 11-nines durability targets?

- [ ] A. Replication across nodes/racks (e.g., 3-way) for hot objects
- [ ] B. Single copy on one disk with no replication to minimize cost
- [ ] C. Erasure coding for cold tiers to save space at cost of rebuild complexity
- [ ] D. Background scrub comparing stored checksums to detect bit rot

---

### Q37






BlobVault promises read-after-write consistency for successful PUTs on a private bucket.

**Select all that apply.**

Which behaviors align with that guarantee?

- [ ] A. Public assets optionally fronted by CDN with origin on object store
- [ ] B. Metadata not visible until required replica acknowledgements complete
- [ ] C. Immediately list object in all regions before any replica persists bytes
- [ ] D. GET streams from a healthy replica and verifies checksum

---

### Q38






StreamFlix accepts up to 10 GB uploads per video. API tier is stateless and CPU-light.

**Select all that apply.**

Which upload architecture scales bandwidth?

- [ ] A. Initiate upload → client sends chunks via presigned URLs to object storage
- [ ] B. Complete upload emits video.uploaded event for async processing
- [ ] C. Stream entire file through the upload API pod to transcode inline
- [ ] D. Resumable multipart for failed or interrupted transfers

---

### Q39






**Select all that apply.**

Which properties belong in the processing path?

- [ ] A. FFmpeg (or similar) outputs multiple bitrates stored as segments in object storage
- [ ] B. Workers pull jobs from a queue/log and produce HLS/DASH renditions
- [ ] C. Synchronous transcode in the HTTP request before returning upload success
- [ ] D. Metadata tracks states such as uploaded, processing, ready, failed

---

### Q40






StreamFlix serves 100M viewing hours per day; egress is measured in petabits. Product targets &lt; 2 s to first frame.

**Select all that apply.**

Which delivery choices are mandatory at this scale?

- [ ] A. Client player switches bitrate per segment based on measured throughput
- [ ] B. Adaptive bitrate via manifest listing multiple renditions
- [ ] C. CDN serves 95%+ of segment bytes from edge caches
- [ ] D. Single 4K file download from origin for every viewer worldwide

---

### Q41






**Select all that apply.**

Which operational practices fit video platforms?

- [ ] A. Retry/DLQ for failed transcodes and notify creators
- [ ] B. Disable multipart upload to simplify failure recovery
- [ ] C. Client playback beacons fed into analytics for regional error rates
- [ ] D. CDN cache hit ratio and origin egress monitoring

---

### Q42






CartPay checkout runs on flaky mobile networks. Users double-tap "Pay"; support reports duplicate charges when retries lack safeguards.

**Select all that apply.**

Which API design prevents duplicate orders and charges?

- [ ] A. Payment PSP calls reuse the same idempotency key as checkout
- [ ] B. Same key on retry returns the original order outcome without re-charging
- [ ] C. Generate a new random idempotency key on every automatic client retry
- [ ] D. Idempotency-Key header on POST /checkout processed at gateway/service

---

### Q43






**Select all that apply.**

Why reserve inventory before capturing payment in many checkout flows?

- [ ] A. Hold TTL with release on payment failure or timeout
- [ ] B. Reduces charging customers when stock is unavailable
- [ ] C. Transactional SQL updates with available ≥ qty checks on reserve
- [ ] D. Charge payment first always — inventory can be corrected later via email

---

### Q44






CartPay reserved inventory for 15 minutes. Payment service times out calling the PSP — outcome unknown.

**Select all that apply.**

Which handling is production-safe?

- [ ] A. Sweeper job expires stale holds after TTL
- [ ] B. Release inventory hold when payment definitively fails
- [ ] C. Query PSP for payment status before blindly retrying a new charge
- [ ] D. Immediately retry charge five times without idempotency key

---

### Q45






Two checkout requests race for the last unit of a SKU. CartPay must not oversell inventory.

**Select all that apply.**

Which mechanisms enforce correctness?

- [ ] A. Allow negative available count temporarily to maximize conversion
- [ ] B. Return 409 insufficient_inventory to the losing client
- [ ] C. Optimistic locking or constraints so only one reserve succeeds
- [ ] D. Conditional UPDATE … WHERE available ≥ qty with rows-affected check

---

### Q46






**Select all that apply.**

After order confirmation, which patterns keep downstream systems consistent?

- [ ] A. Email warehouse and analytics synchronously before HTTP 201 response
- [ ] B. Graceful degradation — order stands if notification pipeline is down
- [ ] C. Transactional outbox co-written with order row, then publish to Kafka
- [ ] D. Saga with compensate steps — release stock or refund if later steps fail

---

### Q47






MetricRiver ingests product analytics at up to 1M events/sec peak. Product APIs must not block on dashboard writes.

**Select all that apply.**

Which ingest behaviors fit?

- [ ] A. Batch POST arrays of events from clients and backends
- [ ] B. Partition Kafka by user_id when per-user ordering matters
- [ ] C. Async accept (202) after validate/enrich → durable log (Kafka)
- [ ] D. Synchronous INSERT into Postgres fact table on every user click

---

### Q48






**Select all that apply.**

How do real-time and historical analytics tiers differ?

- [ ] A. Flink (or similar) tumbling windows for near real-time aggregates
- [ ] B. Batch corrects late events and refines stream approximations
- [ ] C. Nightly Spark jobs dedupe and load warehouse partitions by date
- [ ] D. Run heavy COUNT(*) scans on production OLTP for daily MAU

---

### Q49






Mobile clients retry event batches; at-least-once delivery duplicates arrive at MetricRiver ingest.

**Select all that apply.**

Which deduplication strategies are appropriate?

- [ ] A. Accept at-least-once ingest with idempotent aggregation downstream
- [ ] B. Require exactly-once Kafka semantics end-to-end without any application dedupe
- [ ] C. Client-generated event_id deduped in stream or batch processors
- [ ] D. Schema registry or documented contracts per event_name with tolerant consumers

---

### Q50






**Select all that apply.**

Why route analyst queries to OLAP (ClickHouse, BigQuery, Druid) instead of OLTP Postgres?

- [ ] A. Column-oriented stores optimize scans and aggregates over billions of rows
- [ ] B. Sub-second transactional lookups on primary keys remain OLTP's strength
- [ ] C. OLTP Postgres is ideal for full-table daily event scans at billion-row scale
- [ ] D. Append-heavy event history fits OLAP better than updating order rows in place
