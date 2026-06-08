# E-Commerce Checkout

[← Video Streaming](./09-video-streaming.md) | [Day 10 Index](./README.md) | [Next: Analytics Pipeline →](./11-analytics-metrics-pipeline.md)

## Overview

Checkout turns a cart into a paid order — inventory reserved, payment captured, confirmation sent. It ties together **transactions**, **idempotency**, **sagas**, and **reliability** from Days 6–9. One slow or wrong step loses money and trust.

---

## Requirements

### Functional

- Review cart, apply promo, select shipping
- Reserve inventory and charge payment method
- Create order record and send confirmation
- Handle payment failures and inventory conflicts clearly

### Non-Functional

| Requirement | Target |
|-------------|--------|
| Checkout latency | &lt; 3 s p99 end-to-end |
| Consistency | No overselling inventory |
| Payment | Exactly-once charge (idempotent) |
| Availability | Degrade gracefully if recommendations fail |

---

## High-Level Architecture

```
┌────────┐     ┌─────────────┐     ┌─────────────┐
│ Client │────▶│ API Gateway │────▶│ Order       │
└────────┘     └─────────────┘     │ Service     │
                                   └──────┬──────┘
                    ┌──────────────────────┼──────────────────────┐
                    ▼                      ▼                      ▼
             ┌────────────┐        ┌────────────┐        ┌────────────┐
             │ Inventory  │        │ Payment    │        │ Cart       │
             │ Service    │        │ Service    │        │ Service    │
             └────────────┘        └────────────┘        └────────────┘
                    │                      │
                    ▼                      ▼
             ┌────────────┐        ┌────────────┐
             │ Inventory  │        │ Stripe /   │
             │ DB         │        │ PSP        │
             └────────────┘        └────────────┘

        Order Service ──▶ Kafka ──▶ Notification, Analytics, Warehouse
```

See also [Day 8: Real-World Flow](../day-08/12-real-world-flow.md) for gateway and mesh context.

---

## Checkout API

```
POST /v1/checkout
Idempotency-Key: uuid-from-client
{
  "cart_id": "cart-abc",
  "payment_method_id": "pm_xyz",
  "shipping_address_id": "addr_1"
}

→ 201 { "order_id": "ord_456", "status": "confirmed" }
→ 402 { "error": "payment_declined" }
→ 409 { "error": "insufficient_inventory", "items": [...] }
```

**Idempotency-Key** — duplicate POST with same key returns same order, no double charge ([Day 6](../day-06/10-retry-dlq-and-idempotency.md)).

---

## Happy Path Flow

```
1. Validate cart (items, prices, user)
2. Reserve inventory (decrement available, hold TTL 15 min)
3. Charge payment (call PSP with idempotency key)
4. On payment success:
   a. Confirm inventory (hold → sold)
   b. Create order row (status=CONFIRMED)
   c. Publish order.confirmed to Kafka
5. Return 201 to client
6. Async: email, warehouse pick list, analytics
```

**Order of operations matters:** Reserve inventory **before** payment — if payment fails, release hold. Charging before reserve risks payment without stock.

---

## Inventory

```sql
CREATE TABLE inventory (
    sku          VARCHAR(32) PRIMARY KEY,
    available    INT NOT NULL,
    reserved     INT NOT NULL DEFAULT 0
);
```

**Reserve (transactional):**

```sql
UPDATE inventory
SET available = available - :qty, reserved = reserved + :qty
WHERE sku = :sku AND available >= :qty;
-- rows affected = 0 → insufficient stock
```

**Release hold (payment failed or TTL expired):**

```sql
UPDATE inventory SET available = available + :qty, reserved = reserved - :qty ...
```

**Confirm (payment succeeded):**

```sql
UPDATE inventory SET reserved = reserved - :qty ...
```

---

## Payment Integration

```
Payment Service → PSP API
  idempotency_key = checkout idempotency key
  amount, currency, payment_method_id
```

| PSP outcome | Action |
|-------------|--------|
| success | Confirm order |
| declined | Release inventory, 402 to client |
| timeout | Unknown — query PSP status; do not retry blind charge |
| duplicate idempotency | Return original result |

Circuit breaker on PSP ([Day 7](../day-07/07-circuit-breaker.md)); timeout &lt; client patience.

---

## Saga (Distributed Failure)

When inventory and payment are separate services without 2PC:

```
Reserve inventory ──OK──▶ Charge payment ──FAIL──▶ Compensate: release inventory
```

**Orchestrator** (Order Service) or **choreography** (events) — same logic:

| Step | Forward | Compensate |
|------|---------|------------|
| 1 | Reserve stock | Release stock |
| 2 | Charge card | Refund (if charge succeeded) |
| 3 | Confirm order | Mark cancelled |

Ties to [Day 6: Saga pattern](../day-06/11-queue-patterns.md).

---

## Outbox for Downstream Events

```
BEGIN;
  INSERT INTO orders (...);
  INSERT INTO outbox (event_type, payload) VALUES ('order.confirmed', ...);
COMMIT;

Outbox worker → Kafka
```

Guarantees order row and event are atomic — no "charged but no order record."

---

## Failure Modes

| Failure | Behavior |
|---------|----------|
| Inventory race | Optimistic locking or DB constraint — one wins, other gets 409 |
| Payment timeout | Poll PSP; hold expires via sweeper job |
| Order service crash mid-flow | Idempotency key on retry resumes or returns prior result |
| Notification down | Order still confirmed; async retry ([Day 7](../day-07/09-graceful-degradation.md)) |

---

## Observability

- Trace checkout with single `trace_id` across services ([Day 9](../day-09/06-distributed-tracing.md))
- SLI: checkout success rate, p99 latency ([Day 7](../day-07/11-sli-slo-and-sla.md))
- Metrics: inventory conflict rate, PSP error rate by code
- Alert on SLO burn — checkout is revenue-critical

---

## Trade-offs

| Decision | Choice | Why |
|----------|--------|-----|
| Inventory before payment | Reserve first | Avoid charging without stock |
| Distributed tx | Saga + outbox | 2PC impractical across PSP |
| Idempotency | Client key at gateway | Safe retries on mobile networks |
| Async side effects | Kafka after confirm | Fast user response |

---

## Summary

Checkout is a **coordinated workflow**: reserve inventory, charge payment, confirm atomically in your domain, emit events async. Idempotency keys, sagas with compensation, and outbox pattern turn a fragile multi-service flow into something production-safe.

---

[← Video Streaming](./09-video-streaming.md) | [Day 10 Index](./README.md) | [Next: Analytics Pipeline →](./11-analytics-metrics-pipeline.md)
