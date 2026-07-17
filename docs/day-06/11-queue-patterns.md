# Queue Patterns

[← Retry, DLQ, Idempotency](./10-retry-dlq-and-idempotency.md) | [Day 6 Index](./README.md) | [Next: Tools and Operations →](./12-tools-operations-and-tradeoffs.md)

## Common Patterns in Production

---

## 1. Task Queue (Job Queue)

Single unit of work processed by one worker.

```
API publishes: { "task": "resize_image", "s3_key": "...", "sizes": [100, 400] }
Worker pool competes for jobs
Worker completes → ack
```

**Use:** image processing, PDF generation, data export, cron jobs.

**Tools:** Celery + Redis/RabbitMQ, SQS + Lambda, Sidekiq.

```
┌─────┐     ┌───────┐     ┌─────────┐
│ API │ ──▶ │ Queue │ ──▶ │ Workers │
└─────┘     └───────┘     └─────────┘
```

---

## 2. Event-Driven Architecture

Services publish **domain events**. Others subscribe without direct coupling.

```
Order Service publishes order.created
  → Inventory Service: reserve stock
  → Notification Service: send email
  → Analytics Service: record funnel
  → Search Service: update index
```

**Use:** microservices, reactive systems, audit trails.

**Tools:** Kafka, SNS+SQS fan-out, Google Pub/Sub.

---

## 3. Fan-Out

One message triggers multiple downstream queues.

```
                    ┌──▶ email-queue
SNS topic ──────────├──▶ sms-queue
                    └──▶ push-queue
```

AWS pattern: **SNS → multiple SQS queues** — each channel independent retry/DLQ.

---

## 4. Transactional Outbox

Guarantee DB write and event publish stay consistent.

```
BEGIN TRANSACTION
  INSERT order ...
  INSERT outbox (event_json, status='PENDING')
COMMIT

Outbox Poller (separate process):
  SELECT * FROM outbox WHERE status='PENDING'
  PUBLISH to broker
  UPDATE outbox SET status='SENT'
```

**Use:** avoid "saved to DB but event never published" race.

No two-phase commit across DB and Kafka needed.

---

## 5. Saga Pattern

Distributed transaction across services via chain of events + compensations.

```
Place Order Saga:
  1. OrderCreated
  2. PaymentCaptured
  3. InventoryReserved
  4. OrderConfirmed

Failure at step 3:
  → Publish PaymentRefunded (compensating)
  → Publish OrderCancelled
```

**Use:** microservices without distributed 2PC.

Implement with choreography (events) or orchestration (saga coordinator).

---

## 6. Delay / Scheduled Queue

Process message after delay.

```
SQS DelaySeconds: 900        → deliver in 15 min
RabbitMQ TTL + DLX           → dead letter exchange after delay
Scheduled job publishes at T → time-triggered queue
```

**Use:** reminder emails, trial expiry, retry with delay.

---

## 7. Priority Queue

High-priority messages processed first.

```
RabbitMQ: multiple queues (high, normal, low) — workers poll high first
Separate topics with dedicated worker pools
```

**Use:** premium user notifications, critical alerts.

Most managed queues (SQS) don't natively support priority — design with separate queues.

---

## 8. Async Request-Reply

Async work with a correlated response (also called **request-reply over messaging**).

```
Client → request_queue (correlation_id=abc, reply_to=reply_queue)
Worker → processes → reply_queue (correlation_id=abc)
Client ← waits / polls reply filtered by abc
```

**Use:** RPC-style calls when you must buffer or decouple, legacy integrations, long operations that still need a result.

**Returning results from background jobs:**

| Approach | When |
|----------|------|
| Correlation + reply queue | Caller still online, needs payload |
| Write result to DB / object store; client polls status API | Long jobs (exports, video) |
| Webhook / callback URL | External systems |
| Push notification when done | Mobile / UX |

Usual choice: sync **gRPC/HTTP** for short RPC; queue + status API for long jobs.

---

## 9. Change Data Capture (CDC)

Database changes streamed to queue.

```
PostgreSQL → Debezium → Kafka → Search index, cache, warehouse
```

**Use:** keep read models in sync without dual writes.

---

## 10. Queue-Based Load Leveling

Put a queue **between** bursty producers and limited consumers so spikes don’t overwhelm the system.

```
Spike: 10,000 req/s → Queue absorbs → Workers drain at 2,000/s steady
```

| Without queue | With load leveling |
|--------------|-------------------|
| Autoscale thrash / 503s | Smooth processing |
| Downstream DB meltdown | Controlled concurrency |

**Use:** uploads, emails, webhooks, any work that can wait seconds–minutes.

---

## 11. Pipes and Filters

Break processing into **stages** (filters) connected by channels (pipes). Each stage does one transform.

```
Upload → [Validate] → [VirusScan] → [Transcode] → [Index] → Done
              │              │              │
           queue          queue          queue
```

| Benefit | Detail |
|---------|--------|
| Independent scale | Bottleneck stage gets more workers |
| Reuse | Same “virus scan” filter in many pipelines |
| Failure isolation | Retry/DLQ per stage |

**Use:** media pipelines, ETL, document processing.

---

## 12. Sequential Convoy

Related messages must be processed **in order** for one key (e.g. same `order_id`), without blocking unrelated keys.

```
Partition / FIFO group by order_id:
  msg1 (create) → msg2 (pay) → msg3 (ship)   // in order
Other orders process in parallel on other groups
```

| Need | Mechanism |
|------|-----------|
| Kafka | Same partition key |
| SQS FIFO | Message group ID |
| Avoid | Global single-thread queue (kills throughput) |

---

## 13. Claim Check

Message carries a **pointer** to a large payload stored elsewhere — not the blob itself.

```
1. Upload video → Object storage → key=vid-9
2. Queue message: { "s3_key": "vid-9", "action": "transcode" }
3. Worker downloads from S3, processes
```

Keeps brokers fast and under size limits ([Day 10 object storage](../day-10/08-distributed-object-storage.md)).

---

## 14. Scheduler Agent Supervisor

Reliable **time-based** work with a supervisor that tracks progress and recovers stuck jobs.

```
Scheduler: "run report every night at 02:00"
  → enqueues job with job_id
Agent/worker: runs report, heartbeats, marks complete
Supervisor: if no heartbeat / timeout → retry or alert
```

| Piece | Role |
|-------|------|
| Scheduler | Emits due work |
| Agent | Executes |
| Supervisor | Watches leases, failures, duplicates |

**Use:** cron at scale, distributed locks on scheduled tasks, avoiding double-runs across nodes.

---

## Pattern Selection

| Need | Pattern |
|------|---------|
| Background job | Task queue |
| Decouple microservices | Event-driven |
| DB + event atomicity | Outbox |
| Multi-step distributed txn | Saga |
| Notify email + SMS + push | Fan-out |
| Retry later | Delay queue |
| Sync search index with DB | CDC |
| Absorb traffic spikes | Queue-based load leveling |
| Multi-stage pipeline | Pipes and filters |
| Per-entity ordering | Sequential convoy |
| Large payloads | Claim check |
| Reliable cron | Scheduler agent supervisor |
| Async with response | Request-reply / status API |

---

## Summary

Task queues handle jobs. Event-driven + fan-out decouple services. Outbox and saga solve consistency across boundaries. Delay, priority, load leveling, pipes/filters, convoy, claim check, and supervised schedulers cover timing, ordering, and large payloads. Match pattern to consistency and coupling requirements.

---

[Next: Tools and Operations →](./12-tools-operations-and-tradeoffs.md)
