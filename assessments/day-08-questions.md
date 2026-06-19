# Message Queues Deep Dive — MCQ Questions (30)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-08-answers.md](./answer-key/day-08-answers.md)

---

### Q01 [Easy] [Case Study] — EventPipe Upload Acceptance

**Context:** EventPipe accepts 4K video uploads. Synchronous transcoding takes 8 minutes. Users timeout at 30 seconds. The API returns 504 errors.

**Select all that apply.**

Why should transcoding move to a queue?

- [ ] A. Decouple the HTTP response from slow background work — return quickly after enqueue
- [ ] B. Absorb upload spikes without blocking the request thread for minutes
- [ ] C. Queues replace PostgreSQL as the system of record for video metadata
- [ ] D. Failed transcode jobs can retry without the user re-uploading the file

---

### Q02 [Easy] — Message Queue Components

**Select all that apply.**

Which describe producer–broker–consumer architecture?

- [ ] A. Producer sends messages; broker buffers and persists; consumer pulls or receives push delivery
- [ ] B. Consumer acknowledges after processing — unacked messages may become visible again (visibility timeout)
- [ ] C. A message queue is the authoritative ledger for financial balances
- [ ] D. Pull-based consumption helps apply backpressure when consumers are slow

---

### Q03 [Easy] [Case Study] — EventPipe Checkout Hybrid

**Context:** EventPipe charges a credit card synchronously (~800 ms) but sends receipt email, updates analytics, and notifies webhooks asynchronously via SQS.

**Select all that apply.**

Which design rule does this follow?

- [ ] A. Sync for decisions the user must see in the HTTP response; async for reactions and side effects
- [ ] B. Hybrid architecture — not all-or-nothing async
- [ ] C. Every step including payment authorization should be fire-and-forget async
- [ ] D. Async side effects can retry independently when downstream email API is down

---

### Q04 [Easy] — Queue vs Pub/Sub vs Stream

**Select all that apply.**

Match the messaging model to the use case.

- [ ] A. Task queue — one job processed by exactly one worker in a consumer group (SQS, Celery)
- [ ] B. Pub/Sub — one event copied to all subscribers (SNS fan-out, RabbitMQ fanout exchange)
- [ ] C. Stream — immutable log with offsets; consumers replay from a position (Kafka)
- [ ] D. Redis Pub/Sub persists messages for offline subscribers automatically

---

### Q05 [Easy] [Case Study] — EventPipe Order Notifications

**Context:** EventPipe publishes `OrderCreated` once. Inventory, Billing, Email, and Analytics services each need a copy. One SQS queue would load-balance among them — each order handled by only one service.

**Select all that apply.**

Which model fits?

- [ ] A. Pub/Sub or SNS → multiple SQS queues — each subscriber gets every message
- [ ] B. Single task queue — wrong model when every downstream service must react
- [ ] C. Kafka topic with separate consumer groups per service
- [ ] D. Point-to-point queue delivers one copy split across competing consumers only

---

### Q06 [Easy] — Broker Core Components

**Select all that apply.**

Which Kafka/SQS concepts are correct?

- [ ] A. Topic categorizes messages; partition enables parallel throughput
- [ ] B. Consumer group members compete for partitions — max useful parallelism ≈ partition count
- [ ] C. Adding consumers beyond partition count increases throughput without limit
- [ ] D. Offset tracks position in a stream partition

---

### Q07 [Medium] [Case Study] — EventPipe Message Payload Size

**Context:** EventPipe embeds full 200 MB video files in Kafka messages. Broker rejects messages and consumers OOM.

**Select all that apply.**

What is sound message design?

- [ ] A. Store blob in S3; message carries `video_id` and `s3_key` reference only
- [ ] B. Keep payloads small (SQS max 256 KB); large assets referenced by URL/key
- [ ] C. Embed full database rows in every message for convenience
- [ ] D. Include `message_id`, `event_type`, `schema_version`, and `correlation_id` in envelope

---

### Q08 [Medium] — Commands vs Events

**Select all that apply.**

In microservices, why prefer domain events over command messages?

- [ ] A. Events (`OrderCreated`) decouple publisher from subscriber implementations
- [ ] B. Commands (`InventoryService.decrement`) create tight coupling to callee API
- [ ] C. Commands are always better for decoupling than events
- [ ] D. Subscribers choose whether to react to events — publisher does not orchestrate all steps

---

### Q09 [Medium] [Case Study] — EventPipe Duplicate Charge

**Context:** EventPipe payment worker uses at-least-once SQS delivery. A worker processes a charge, crashes before ack. Message redelivers and charges the customer twice.

**Select all that apply.**

How should EventPipe prevent duplicate financial effects?

- [ ] A. Idempotent consumer — check `idempotency_key` before charging
- [ ] B. Ack only after successful processing plus idempotency guard
- [ ] C. At-least-once delivery never produces duplicates without any application logic
- [ ] D. Practical exactly-once effect = at-least-once + idempotent handler + dedup store

---

### Q10 [Medium] — Delivery Guarantees

**Select all that apply.**

Which statements about delivery semantics are correct?

- [ ] A. At-most-once: may lose messages, no duplicates — ack before process risks loss on crash
- [ ] B. At-least-once: industry default — may duplicate without idempotency
- [ ] C. End-to-end exactly-once across services is trivial with broker settings alone
- [ ] D. Telemetry/metrics may tolerate at-most-once; payments need at-least-once + idempotency

---

### Q11 [Medium] [Case Study] — EventPipe Order State Machine

**Context:** Order events must apply in sequence: `Created → Paid → Shipped` per `order_id`. Events for different orders can process in parallel.

**Select all that apply.**

How should EventPipe partition?

- [ ] A. Partition key = `order_id` — same order routes to same partition for ordering
- [ ] B. Partition key = current timestamp — maximizes even distribution for order sequence
- [ ] C. Global ordering across all orders requires a single partition — limits throughput
- [ ] D. Use sequence numbers — skip events where `incoming.sequence <= last_processed`

---

### Q12 [Medium] — Bad Partition Keys

**Select all that apply.**

Which partition keys risk hot partitions or wrong ordering guarantees?

- [ ] A. `timestamp` or `created_second` — spikes on current second
- [ ] B. `country_code` alone — skewed traffic (e.g., US dominates)
- [ ] C. `order_id` or `user_id` — generally even hash distribution
- [ ] D. Random UUID per message when strict per-entity order is required

---

### Q13 [Medium] [Case Study] — EventPipe Consumer Lag

**Context:** EventPipe Kafka topic has 6 partitions. Email consumer group runs 8 pods. Two pods sit idle. Queue depth grows during a marketing blast.

**Select all that apply.**

What explains this and valid responses?

- [ ] A. Max parallel consumers in a group ≈ partition count — extras idle
- [ ] B. Scale consumers up to partition count or increase partitions (with rebalance cost)
- [ ] C. More consumers always help if downstream email API is the bottleneck
- [ ] D. Auto-scale on consumer lag or queue depth is a standard ops pattern

---

### Q14 [Medium] — Backpressure and Graceful Shutdown

**Select all that apply.**

Which practices protect queue consumers?

- [ ] A. Graceful shutdown: finish in-flight work, ack, commit offsets before exit
- [ ] B. K8s `terminationGracePeriodSeconds` must exceed max message processing time
- [ ] C. Instant pod kill without drain — messages reappear after visibility timeout → duplicates
- [ ] D. Unlimited prefetch always maximizes throughput without blocking slow messages

---

### Q15 [Hard] [Case Study] — EventPipe Poison Message

**Context:** One malformed JSON message fails parsing on every retry. It blocks the single-threaded consumer loop for 6 hours until ops intervenes.

**Select all that apply.**

What should EventPipe implement?

- [ ] A. Max retry count with exponential backoff + jitter, then route to DLQ
- [ ] B. Non-retryable errors (400, invalid schema) go to DLQ immediately
- [ ] C. Retry forever on all errors including bad payload
- [ ] D. Alert when DLQ depth > 0; inspect, fix, replay after correction

---

### Q16 [Hard] — Retry vs Non-Retryable Errors

**Select all that apply.**

Which errors should trigger retry with backoff?

- [ ] A. HTTP 503, connection timeout, transient 429 with Retry-After
- [ ] B. HTTP 400 bad request, invalid JSON payload, authentication failure
- [ ] C. Exponential backoff: `min(base * 2^attempt, max_delay) + jitter`
- [ ] D. Retry storms occur when many clients retry simultaneously without jitter

---

### Q17 [Hard] [Case Study] — EventPipe Outbox Pattern

**Context:** EventPipe saves an order to PostgreSQL but crashes before publishing `OrderCreated` to Kafka. Downstream inventory never decrements.

**Select all that apply.**

How does the transactional outbox fix this?

- [ ] A. INSERT order + INSERT outbox row in the same DB transaction
- [ ] B. Poller reads unsent outbox rows, publishes to broker, marks sent
- [ ] C. Requires two-phase commit between PostgreSQL and Kafka
- [ ] D. Atomic DB write guarantees event will eventually publish without dual-write race

---

### Q18 [Hard] — Saga Pattern

EventPipe order saga: ReserveInventory → ChargePayment → ConfirmShipment. Payment fails after inventory reserved.

**Select all that apply.**

Which saga behavior is correct?

- [ ] A. Publish compensating events: `ReleaseInventory`, `CancelOrder`
- [ ] B. Saga is not a single distributed ACID transaction across services
- [ ] C. Roll back with one global 2PC transaction across three microservice databases
- [ ] D. Each step is a local transaction; failure triggers compensation via events

---

### Q19 [Easy] — Sync vs Async Trade-offs

**Select all that apply.**

When is synchronous HTTP appropriate vs a queue?

- [ ] A. User needs payment result in the checkout HTTP response → sync
- [ ] B. Video transcode, analytics, email — async queue
- [ ] C. Async provides strong immediate consistency for the critical path
- [ ] D. Callee down: sync fails/timeouts; async messages buffer until consumer recovers

---

### Q20 [Easy] [Case Study] — EventPipe Black Friday Spike

**Context:** EventPipe ingests 12,000 webhook events/sec. Workers process 800/sec sustainably. API returns 200 immediately after enqueue.

**Select all that apply.**

What queue benefit applies?

- [ ] A. Spike absorption — broker buffers excess until workers catch up
- [ ] B. Decouples producer throughput from consumer capacity in time
- [ ] C. Queue eliminates need for any workers — messages process themselves
- [ ] D. Without queue, producers would block or drop work when workers saturate

---

### Q21 [Medium] — SQS Standard vs FIFO

**Select all that apply.**

Which SQS characteristics are correct?

- [ ] A. Standard queue: at-least-once, best-effort ordering, high throughput
- [ ] B. FIFO queue: strict order per MessageGroupId; built-in deduplication window (~5 min)
- [ ] C. FIFO guarantees global ordering across all messages in the account
- [ ] D. Standard queue: consumed message gone — no replay from broker

---

### Q22 [Medium] [Case Study] — EventPipe Fan-Out Architecture

**Context:** EventPipe uses SNS → three SQS queues (email, SMS, push). Email queue backs up; SMS and push remain healthy.

**Select all that apply.**

Why is this fan-out pattern valuable?

- [ ] A. Each downstream channel has independent retry, DLQ, and scaling
- [ ] B. One slow consumer does not block other channels
- [ ] C. Single shared queue would require one worker pool for all notification types
- [ ] D. SNS delivers the same event copy to each subscribed queue

---

### Q23 [Medium] — Kafka vs SQS Tool Selection

**Select all that apply.**

When choose Kafka over SQS for EventPipe?

- [ ] A. Need event replay, stream processing, or high-throughput log retention
- [ ] B. Simple fire-and-forget job queue with minimal ops — SQS often sufficient
- [ ] C. Kafka is always the right choice for a 50-email/day cron job
- [ ] D. Kafka consumer groups + partitions enable parallel stream processing at scale

---

### Q24 [Medium] — Monitoring Queue Health

**Select all that apply.**

Which metrics indicate queue problems?

- [ ] A. Queue depth / consumer lag growing while publish rate exceeds consume rate
- [ ] B. Oldest message age increasing — messages waiting too long
- [ ] C. DLQ depth > 0 — poison or repeated failures
- [ ] D. Depth near zero and publish ≈ consume rate — healthy steady state

---

### Q25 [Hard] [Case Study] — EventPipe Exactly-Once Claim

**Context:** A vendor claims their broker provides "exactly-once delivery" with no consumer changes. EventPipe processes payments.

**Select all that apply.**

What should EventPipe engineers respond?

- [ ] A. Interview/production answer: at-least-once delivery with idempotent consumers
- [ ] B. Broker dedup does not eliminate need for application idempotency on side effects
- [ ] C. Accept vendor claim and remove idempotency keys to simplify code
- [ ] D. Exactly-once end-to-end across DB + broker + external APIs is very hard in practice

---

### Q26 [Hard] — Idempotency Implementation

**Select all that apply.**

Which are valid idempotency techniques?

- [ ] A. Processed-keys table: skip if `message_id` already handled
- [ ] B. Natural idempotent SQL: `UPDATE status = 'SHIPPED' WHERE id = ?` — same result if run twice
- [ ] C. External API idempotency header (e.g., Stripe Idempotency-Key)
- [ ] D. Ack before process guarantees at-least-once without duplicates

---

### Q27 [Easy] — Why Not a Database Table as Queue

**Select all that apply.**

Why avoid `SELECT ... FOR UPDATE` on a jobs table at high scale?

- [ ] A. DIY polling, visibility, retry, and DLQ semantics are complex and slow at volume
- [ ] B. Dedicated brokers (SQS, Kafka, RabbitMQ) optimize for messaging throughput and ops
- [ ] C. DB table as queue is always faster than Kafka for 100K msg/sec
- [ ] D. Row locking under high concurrency becomes a database bottleneck

---

### Q28 [Medium] [Case Study] — EventPipe CDC Pipeline

**Context:** EventPipe search index must update when PostgreSQL rows change. Debezium captures WAL → Kafka → search indexer consumer.

**Select all that apply.**

What pattern is this?

- [ ] A. Change Data Capture (CDC) — database changes streamed as events
- [ ] B. Decouples search indexing from application write path
- [ ] C. Application must call search API synchronously on every INSERT
- [ ] D. Stream replay can rebuild search index from Kafka offsets after failure

---

### Q29 [Hard] — Redis Pub/Sub vs Redis Streams

**Select all that apply.**

Which statements are correct?

- [ ] A. Redis Pub/Sub: fire-and-forget — offline subscriber misses messages
- [ ] B. Redis Streams: persisted log with consumer groups — closer to lightweight Kafka
- [ ] C. Redis Pub/Sub is a durable primary broker for payment events
- [ ] D. Use persistent broker or Redis Streams when durability matters

---

### Q30 [Hard] [Case Study] — EventPipe Delayed Reminder

**Context:** EventPipe sends "complete your profile" email 15 minutes after signup. Workers should not process the job immediately.

**Select all that apply.**

Which delivery options apply?

- [ ] A. SQS DelaySeconds (up to 15 minutes) or visibility timeout scheduling
- [ ] B. RabbitMQ message TTL + dead-letter exchange for delayed delivery patterns
- [ ] C. Real-time sub-100 ms chat must use the same queue with DelaySeconds
- [ ] D. Delay queue separates immediate tasks from scheduled follow-ups

---
