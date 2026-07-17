# End-to-End Design Walkthrough

[← Component Selection](./07-component-selection-guide.md) | [Day 13 Index](./README.md)


## Problem

Design **ShopFast** — a mid-scale e-commerce checkout and order-tracking system (synthesis of Days 10–12 ideas).

---

## 1. Requirements

**Functional**

- Browse catalog, add to cart, checkout  
- Pay via payment provider  
- Reserve inventory  
- Order history and status tracking  
- Email/push on status changes  

**Non-functional**

| Item | Target |
|------|--------|
| DAU | 2M |
| Peak checkout | 500 QPS |
| Catalog browse | 15K QPS peak |
| Checkout p99 | &lt; 800 ms (until payment redirect) |
| Payment correctness | No double charge; no silent oversell |
| Availability | 99.9% checkout API |
| Geo | Single region multi-AZ for v1 |

---

## 2. Estimation

```
Browse peak 15K QPS → CDN + cache mandatory
Checkout 500 QPS → modest; correctness &gt; exotic scale
Orders: assume 50B/order row → easy for Postgres
Inventory updates at checkout rate → relational OK with care
```

Bottlenecks: **catalog reads**, **inventory contention**, **payment idempotency** — not raw Kafka throughput.

---

## 3. High-Level Architecture

```
Client → CDN → LB → API Gateway
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
     Catalog Svc   Cart Svc    Checkout Svc
          │           │            │
          ▼           ▼            ▼
     Read models   Redis cart   Postgres (orders)
     (ES+Redis)                    │
                                   ├─ Inventory (Postgres)
                                   ├─ Outbox → Kafka
                                   └─ Payment provider (HTTP)
                                          │
                                   Workers: email, search sync, analytics
```

---

## 4. Key Decisions (with because)

| Decision | Choice | Because |
|----------|--------|---------|
| Catalog | CQRS: Postgres source + ES/Redis reads | Browse QPS ≫ write QPS |
| Cart | Redis TTL | Ephemeral, fast, loss-tolerant with rebuild from client |
| Orders + inventory | Postgres local TX where possible | ACID for stock decrement |
| Cross payment | Idempotency key + saga | Provider is external; no 2PC |
| Downstream | Outbox → Kafka | No dual write |
| Email | Async worker | Not on checkout critical path |
| Sync search | CDC or outbox projector | Eventual OK for catalog |

---

## 5. Checkout Sequence (Happy Path)

```
1. Validate cart
2. Begin saga / TX:
   - Create order PENDING (idempotency_key unique)
   - Reserve inventory
3. Call payment with same idempotency key
4. On success: mark PAID, commit outbox OrderPaid
5. Return confirmation
6. Async: email, analytics, update read models
```

On payment fail: release reservation (compensation), mark CANCELLED.

---

## 6. Consistency Map

| Path | Model |
|------|-------|
| Inventory decrement | Strong (TX) |
| Order create | Strong |
| “My orders” list | Read-your-writes (read primary or wait) |
| Catalog search | Eventual (seconds) |
| Analytics | Near-real-time / batch |

---

## 7. Failure Design

| Failure | Response |
|---------|----------|
| Payment timeout | Idempotent retry / confirm status API; don’t double insert order |
| Inventory conflict | 409; user refreshes cart |
| Kafka down | Outbox retains; relay catches up |
| Email worker down | Lag OK; checkout still succeeds |
| ES lag | Browse may miss brand-new SKU briefly |

Patterns: timeouts, retries, circuit breaker to payment, graceful degrade (browse without recs).

---

## 8. Observability

- RED on gateway, checkout, payment client  
- Saga state metrics + stuck-order alert  
- Outbox lag, Kafka consumer lag  
- Trace: `checkout_id` / `idempotency_key` across services  
- SLO: checkout success rate, payment p99  

---

## 9. What Changes at 10×

| Pressure | Evolution |
|----------|-----------|
| Inventory hot SKUs | Shard inventory / per-SKU queues |
| Global users | Regional catalog; careful payment story |
| Heavy analytics | Lake + stream tier ([Day 12](../day-12/README.md)) |
| Many microservices | Mesh + stronger platform ops |

---

## 10. What We Explicitly Did *Not* Do

- Event-source every entity on day one  
- Multi-region active-active inventory  
- Real-time OLAP on checkout path  
- 2PC with the payment provider  

Skipping those keeps the first version shippable.

---

## Summary

Template: **requirements → numbers → diagram → decisions with reasons → consistency map → failures → metrics → what changes at 10×**.
