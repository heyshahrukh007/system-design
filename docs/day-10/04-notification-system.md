# Notification System

[← Rate Limiter](./03-rate-limiter.md) | [Day 10 Index](./README.md) | [Next: News Feed →](./05-news-feed.md)

## Overview

A notification system delivers messages to users across channels — push, email, SMS, and in-app. The hard parts are **fan-out** (one event → millions of deliveries), **channel-specific providers**, and **reliability** without blocking the product API.

---

## Requirements

### Functional

- Send notifications triggered by app events (order shipped, friend request, etc.)
- Support channels: push, email, SMS, in-app inbox
- User preferences: opt-in/out per channel and category
- Template rendering with personalization
- Delivery status tracking (sent, failed, opened)

### Non-Functional

| Requirement | Target |
|-------------|--------|
| API response | Enqueue and return in &lt; 100 ms |
| Delivery | At-least-once; dedupe on user side |
| Scale | 10M notifications/day, spikes on marketing campaigns |
| Third-party SLAs | Email/SMS providers have their own rate limits |

---

## High-Level Architecture

```
Order Service ──▶ Notification API ──▶ Kafka (notification.requested)
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
              Push Worker              Email Worker               SMS Worker
                    │                         │                         │
                    ▼                         ▼                         ▼
              FCM / APNs                 SendGrid                  Twilio
                    │                         │                         │
                    └─────────────────────────┴─────────────────────────┘
                                              ▼
                                    Delivery status → DB / analytics
```

**Async by default** — producers never wait for FCM or SendGrid ([Day 6](../day-06/03-sync-vs-async-communication.md)).

---

## Core APIs

**Trigger (internal)**

```
POST /internal/v1/notifications
{
  "user_id": 12345,
  "type": "order_shipped",
  "payload": { "order_id": 789, "tracking_url": "..." },
  "channels": ["push", "email"]   // optional override
}
→ 202 Accepted { "notification_id": "ntf-uuid" }
```

**User preferences**

```
GET  /v1/users/me/notification-preferences
PUT  /v1/users/me/notification-preferences
{ "marketing_email": false, "order_push": true }
```

---

## Event Flow

```
1. Order service publishes order.shipped (or calls Notification API)
2. Notification API:
   a. Load user preferences + contact info (cache)
   b. Filter channels user allowed for this category
   c. Write notification record (status=PENDING)
   d. Publish to per-channel Kafka topics (partition by user_id)
3. Channel workers consume, render template, call provider
4. Update status; retry with backoff on failure ([Day 6](../day-06/10-retry-dlq-and-idempotency.md))
5. Failed after N retries → DLQ for manual review
```

**Idempotency:** `notification_id` or `(event_id, user_id, channel)` dedupe key prevents double-send on consumer retry.

---

## Data Model

```sql
CREATE TABLE notifications (
    id           UUID PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    type         VARCHAR(64),
    channels     JSONB,
    payload      JSONB,
    status       VARCHAR(32),   -- pending, sent, partial, failed
    created_at   TIMESTAMPTZ
);

CREATE TABLE user_preferences (
    user_id      BIGINT PRIMARY KEY,
    preferences  JSONB   -- { "marketing_email": false, ... }
);

CREATE TABLE device_tokens (
    user_id      BIGINT,
    platform     VARCHAR(16),  -- ios, android, web
    token        TEXT,
    updated_at   TIMESTAMPTZ
);
```

---

## Template Service

```
Template: "Your order {{order_id}} has shipped. Track: {{tracking_url}}"
Locale: en-US → rendered body per user language setting
```

- Templates stored in DB or config service
- Workers fetch and render — keeps API lightweight
- Cache compiled templates in worker memory

---

## Fan-Out and Scale

**Single user:** One message → 1–3 channel jobs  
**Broadcast (marketing):** One campaign → millions of users

```
Campaign service → batch producer → Kafka (many partitions)
Workers scale horizontally ([Day 6](../day-06/09-consumers-and-scaling.md))
```

- Partition by `user_id` for ordering per user
- Throttle per provider (SendGrid 100/sec plan) with rate limiter ([topic 3](./03-rate-limiter.md))
- Priority queues: transactional (password reset) &gt; marketing

---

## Reliability Patterns

| Pattern | Use |
|---------|-----|
| Outbox | Order DB + notification event in one transaction ([Day 6](../day-06/11-queue-patterns.md)) |
| Retry + backoff | Transient provider errors |
| DLQ | Poison messages after max retries |
| Circuit breaker | Provider outage — pause channel, alert ops ([Day 7](../day-07/07-circuit-breaker.md)) |
| Graceful degradation | Push fails → still try email ([Day 7](../day-07/09-graceful-degradation.md)) |

---

## In-App Inbox

Separate from push — stored in your DB:

```
GET /v1/users/me/notifications?cursor=...
→ paginated list, mark read/unread
```

Push alerts the user; inbox is source of truth for history.

---

## Observability

- Metrics: enqueue rate, delivery latency per channel, failure rate by provider ([Day 9](../day-09/05-metrics-red-and-use.md))
- Traces: `notification_id` from API through worker to provider callback
- Alerts: DLQ depth, provider error rate &gt; threshold

---

## Trade-offs

| Decision | Choice | Alternative |
|----------|--------|-------------|
| Delivery model | Async queue | Sync send — blocks product APIs |
| Guarantee | At-least-once + idempotency | Exactly-once end-to-end — hard with external providers |
| Channel topics | Separate Kafka topics per channel | Single topic — workers can't scale independently |
| Preferences | Checked at enqueue | Checked at send — wastes queue capacity |

---

## Summary

Notification systems are **event-driven pipelines**: accept fast, process async, fan out to channel workers, integrate external providers with retries and DLQs. User preferences and idempotency belong in the core design — not bolted on later.

---

[← Rate Limiter](./03-rate-limiter.md) | [Day 10 Index](./README.md) | [Next: News Feed →](./05-news-feed.md)
