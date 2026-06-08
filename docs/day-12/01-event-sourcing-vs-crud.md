# Event Sourcing vs CRUD

[← Day 12 Index](./README.md) | [Next: CQRS →](./02-cqrs.md)

## CRUD Recap

Most apps store **current state** and overwrite it:

```
UPDATE accounts SET balance = 150 WHERE id = 1;
```

| Pros | Cons |
|------|------|
| Simple mental model | History of *how* you got here is lost |
| Easy queries on current rows | Auditing needs extra tables |
| Familiar ORMs | Hard to reconstruct past states |

---

## What Is Event Sourcing?

**Event sourcing** stores every change as an immutable **event**. Current state is derived by **replaying** events (or reading a snapshot + newer events).

```
Event store (append-only):
  1. AccountOpened { id:1, owner:"Ada" }
  2. MoneyDeposited { id:1, amount:100 }
  3. MoneyWithdrawn { id:1, amount:20 }

Current balance = fold(events) → 80
```

You never update or delete past events (except rare GDPR tombstones / crypto-shredding).

---

## Event vs Command

| | Command | Event |
|--|---------|-------|
| Meaning | Intent: “please do X” | Fact: “X happened” |
| Example | `WithdrawMoney(20)` | `MoneyWithdrawn(20)` |
| Can fail | Yes (validation) | No — already occurred |
| Naming | Imperative | Past tense |

Commands may be rejected. Events are the durable truth after acceptance.

---

## Snapshots

Replaying millions of events per aggregate is slow. Periodically store a **snapshot**:

```
Snapshot @ version 1000: { balance: 5000, ... }
Then replay events 1001…N only
```

Trade-off: storage and complexity vs faster load.

---

## When Event Sourcing Helps

| Fit | Why |
|-----|-----|
| Audit / finance / compliance | Full history of every change |
| Temporal queries | “What was state on Tuesday?” |
| Debugging production | Replay to reproduce bugs |
| Multiple read models | Same events → different projections ([CQRS](./02-cqrs.md)) |
| Collaborative domains | Explicit domain language in events |

## When It Hurts

| Pain | Reality |
|------|---------|
| Learning curve | Event design is a skill |
| Schema evolution | Old events must stay readable forever |
| “Just show current row” UIs | Need projections or dual model |
| PII deletion | Harder than DELETE row — plan crypto-shredding |
| Overkill | Simple CRUD admin apps rarely need it |

Use event sourcing when **history and rebuildability** matter for the product — not because the pattern sounds clever.

---

## Event Store Properties

| Property | Meaning |
|----------|---------|
| Append-only | No in-place mutation of history |
| Ordered per stream | Usually per aggregate ID |
| Optimistic concurrency | Expected version on append |
| Durable | Same bar as your primary DB |

Often implemented with: EventStoreDB, Kafka (as log), Postgres event table, cloud event hubs.

---

## Fold / Projection

```
state_0 = empty
state_n = apply(state_n-1, event_n)
```

Projections can be:

- **In-memory** for one aggregate load  
- **Materialized tables** updated by a projector process  
- **Rebuilt from scratch** after a bug fix in `apply`

---

## CRUD + Events Hybrid

Many systems keep CRUD for the write DB and emit domain events via **outbox** ([Day 11](../day-11/06-distributed-transactions-vs-saga.md)) without full event sourcing. That gives integration events without making the event log the only source of truth.

| Approach | Source of truth |
|----------|-----------------|
| Pure CRUD | Current tables |
| CRUD + outbox events | Tables (+ events for others) |
| Event sourcing | Event log |

---

## Summary

| | CRUD | Event sourcing |
|--|------|----------------|
| Stores | Current state | Sequence of facts |
| History | Optional | Built-in |
| Complexity | Lower | Higher |
| Best for | Most apps | Audit-heavy, multi-projection domains |

Next: optimizing reads separately from writes — [CQRS](./02-cqrs.md).
