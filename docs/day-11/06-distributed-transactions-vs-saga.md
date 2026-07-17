# Distributed Transactions vs Saga

[← Consensus Basics](./05-consensus-basics.md) | [Day 11 Index](./README.md) | [Next: Clocks, Ordering, Idempotency →](./07-clocks-ordering-idempotency.md)

## The Goal

A business action touches **multiple services or databases**:

```
Checkout:
  1. Reserve inventory
  2. Charge payment
  3. Create order
  4. Send confirmation
```

You want **all succeed or the business rolls back** — without pretending the whole company is one ACID database.

---

## Local ACID Still Matters

Inside **one** database, use transactions ([Day 4](../day-04/07-transactions.md)):

```sql
BEGIN;
  UPDATE inventory SET qty = qty - 1 WHERE sku = 'X' AND qty > 0;
  INSERT INTO order_items ...;
COMMIT;
```

Problems start when step 2 is another service with its own DB.

---

## Two-Phase Commit (2PC)

A classic **distributed transaction** protocol:

```
Phase 1 — Prepare:
  Coordinator → participants: "Can you commit?"
  Each locks resources and answers Yes/No

Phase 2 — Commit or Abort:
  If all Yes → Commit
  If any No  → Abort
```

| Pros | Cons |
|------|------|
| Strong atomicity across participants | Coordinator is a SPOF / bottleneck |
| Familiar “transaction” mental model | Participants hold locks during prepare |
| | Blocking if coordinator crashes mid-protocol |
| | Poor fit for long-running or multi-team microservices |
| | Cross-region latency multiplies |

**Use sparingly:** same org, short operations, XA-aware databases — not for HTTP microservices calling each other over the open internet.

---

## Saga Pattern

A **saga** is a sequence of **local transactions** with **compensating actions** if a later step fails.

```
Reserve inventory  →  Charge card  →  Create order
       │                  │                │
       ▼                  ▼                ▼
 Compensate:         Refund           Cancel order
 release stock
```

```
Happy path:   T1 → T2 → T3 → done
Failure at T3: T3 fails → compensate T2 → compensate T1
```

| Style | How steps run |
|-------|----------------|
| **Choreography** | Each service emits events; others react |
| **Orchestration** | A coordinator service tells each step what to do |

See [Day 6: Queue patterns](../day-06/11-queue-patterns.md) and [Day 10: E-commerce checkout](../day-10/10-ecommerce-checkout.md).

| Pros | Cons |
|------|------|
| No distributed locks across services | Not isolation in the ACID sense (intermediate states visible) |
| Scales with microservices | Compensations can fail — need retries/DLQ |
| Fits async workflows | Must design compensations carefully |

### Compensating Transactions

The undo step undoes the *business effect* — it is not always a database `ROLLBACK` of the original row.

| Original step | Compensation |
|---------------|--------------|
| Reserve stock | Release reservation |
| Capture payment | Refund |
| Create shipment | Cancel shipment label |

Compensations must be **idempotent** and may themselves fail — monitor and alert like any critical path.

**Isolation gap:** another user might see “reserved but unpaid” stock briefly. Design UX and invariants accordingly (timeouts on reservations, etc.).

---

## Transactional Outbox

Dual-write problem:

```
Bad:
  1. COMMIT order in DB
  2. PUBLISH OrderCreated to Kafka
     ↑ process crashes here → event never sent
```

**Outbox:** write business row **and** outbox row in the **same** local transaction; a publisher relays outbox to the bus.

```
BEGIN;
  INSERT INTO orders ...;
  INSERT INTO outbox (event_type, payload) ...;
COMMIT;

Relay worker: read outbox → publish → mark sent
```

Pairs with idempotent consumers ([Day 6: Idempotency](../day-06/10-retry-dlq-and-idempotency.md)).

**Inbox** on the consumer side stores processed message IDs to skip duplicates.

---

## Comparison

| Approach | Consistency | Coupling | Best for |
|----------|-------------|----------|----------|
| Single-DB transaction | Strongest | Monolith / modular monolith | One bounded context |
| 2PC / XA | Strong, blocking | High | Rare, short, homogeneous |
| Saga + outbox | Eventual business atomicity | Loose | Microservices checkout, provisioning |

---

## Design Checklist

1. Prefer **one DB transaction** when data can live together.  
2. If you must cross services, prefer **saga + outbox** over 2PC.  
3. Make every step **idempotent**; compensations too.  
4. Define **visible intermediate states** and timeouts.  
5. Monitor stuck sagas ([Day 9](../day-09/README.md)).

---

## Summary

Distributed ACID across services is expensive and fragile. Most production designs use **local ACID**, **reliable messaging (outbox)**, and **sagas** for multi-step business flows.

Next: time, order, and safe retries — [Clocks, Ordering, Idempotency](./07-clocks-ordering-idempotency.md).
