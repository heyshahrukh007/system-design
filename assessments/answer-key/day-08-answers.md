# Message Queues Deep Dive — Answer Key & Explanations (30)

Answer key for [day-08-questions.md](../day-08-questions.md)

---

### Q01 [Easy] [Case Study] — EventPipe Upload Acceptance

**Answer:** A, B, D

**Explanation:** Queue offloads slow work and enables retry. DB remains source of truth for metadata (C).

---

### Q02 [Easy] — Message Queue Components

**Answer:** A, B, D

**Explanation:** Standard broker flow with ack and pull backpressure. Queues are not financial ledger (C).

---

### Q03 [Easy] [Case Study] — EventPipe Checkout Hybrid

**Answer:** A, B, D

**Explanation:** Sync payment decision; async side effects with retry. Payment must not be fire-and-forget (C).

---

### Q04 [Easy] — Queue vs Pub/Sub vs Stream

**Answer:** A, B, C

**Explanation:** Three models as described. Redis Pub/Sub is not durable for offline subs (D).

---

### Q05 [Easy] [Case Study] — EventPipe Order Notifications

**Answer:** A, B, C, D

**Explanation:** Fan-out needs pub/sub or per-service groups; single task queue load-balances one consumer per message — all statements correctly contrast models.

---

### Q06 [Easy] — Broker Core Components

**Answer:** A, B, D

**Explanation:** Partitions cap group parallelism. Extra consumers beyond partitions idle (C).

---

### Q07 [Medium] [Case Study] — EventPipe Message Payload Size

**Answer:** A, B, D

**Explanation:** Reference blobs in object storage; small envelope fields. Full row/blob embed is anti-pattern (C).

---

### Q08 [Medium] — Commands vs Events

**Answer:** A, B, D

**Explanation:** Events decouple; commands couple. Commands are not better for decoupling (C).

---

### Q09 [Medium] [Case Study] — EventPipe Duplicate Charge

**Answer:** A, B, D

**Explanation:** At-least-once duplicates without idempotency (C). Ack after idempotent process.

---

### Q10 [Medium] — Delivery Guarantees

**Answer:** A, B, D

**Explanation:** At-most vs at-least trade-offs. Exactly-once end-to-end is not trivial (C).

---

### Q11 [Medium] [Case Study] — EventPipe Order State Machine

**Answer:** A, C, D

**Explanation:** order_id partition key; timestamp is bad key (B). Sequence guards out-of-order retries.

---

### Q12 [Medium] — Bad Partition Keys

**Answer:** A, B, D

**Explanation:** Timestamp and country skew. order_id/user_id are good (C).

---

### Q13 [Medium] [Case Study] — EventPipe Consumer Lag

**Answer:** A, B, D

**Explanation:** Partition limit explains idle pods. Scaling past downstream API bottleneck does not help (C).

---

### Q14 [Medium] — Backpressure and Graceful Shutdown

**Answer:** A, B, C

**Explanation:** Graceful drain prevents duplicate redelivery. High prefetch can block on one slow msg (D).

---

### Q15 [Hard] [Case Study] — EventPipe Poison Message

**Answer:** A, B, D

**Explanation:** DLQ + non-retryable classification + alerts. Infinite retry on bad JSON is harmful (C).

---

### Q16 [Hard] — Retry vs Non-Retryable Errors

**Answer:** A, C, D

**Explanation:** Retry transients with backoff+jitter. 400/auth failures go to DLQ (B).

---

### Q17 [Hard] [Case Study] — EventPipe Outbox Pattern

**Answer:** A, B, D

**Explanation:** Same-txn outbox + poller — no 2PC to Kafka (C).

---

### Q18 [Hard] — Saga Pattern

**Answer:** A, B, D

**Explanation:** Compensating events; local txns only. Global 2PC across services is not standard (C).

---

### Q19 [Easy] — Sync vs Async Trade-offs

**Answer:** A, B, D

**Explanation:** Sync for user-visible decisions; async buffers failures. Async is eventual, not strong immediate consistency (C).

---

### Q20 [Easy] [Case Study] — EventPipe Black Friday Spike

**Answer:** A, B, D

**Explanation:** Buffer decouples rates. Workers still required (C).

---

### Q21 [Medium] — SQS Standard vs FIFO

**Answer:** A, B, D

**Explanation:** FIFO orders per MessageGroupId, not globally (C).

---

### Q22 [Medium] [Case Study] — EventPipe Fan-Out Architecture

**Answer:** A, B, C, D

**Explanation:** SNS→SQS fan-out gives isolated scaling and DLQ per channel — all statements valid.

---

### Q23 [Medium] — Kafka vs SQS Tool Selection

**Answer:** A, B, D

**Explanation:** Kafka for replay/streams; SQS for simple jobs. Kafka overkill for tiny email cron (C).

---

### Q24 [Medium] — Monitoring Queue Health

**Answer:** A, B, C, D

**Explanation:** All four are standard queue health signals.

---

### Q25 [Hard] [Case Study] — EventPipe Exactly-Once Claim

**Answer:** A, B, D

**Explanation:** Idempotent consumers remain mandatory. Never drop idempotency on vendor claims (C).

---

### Q26 [Hard] — Idempotency Implementation

**Answer:** A, B, C

**Explanation:** Dedup table, natural idempotent updates, API keys. Ack-before-process risks loss (D).

---

### Q27 [Easy] — Why Not a Database Table as Queue

**Answer:** A, B, D

**Explanation:** DIY queue hits lock/contention limits. Brokers scale messaging; table is not faster at 100K/sec (C).

---

### Q28 [Medium] [Case Study] — EventPipe CDC Pipeline

**Answer:** A, B, D

**Explanation:** Debezium CDC decouples indexing; sync search on every write is optional not required (C).

---

### Q29 [Hard] — Redis Pub/Sub vs Redis Streams

**Answer:** A, B, D

**Explanation:** Pub/Sub ephemeral; Streams persisted. Not durable primary for payments (C).

---

### Q30 [Hard] [Case Study] — EventPipe Delayed Reminder

**Answer:** A, B, D

**Explanation:** Delay queues for scheduled work. Real-time chat uses WebSocket, not delayed queue (C).

---
