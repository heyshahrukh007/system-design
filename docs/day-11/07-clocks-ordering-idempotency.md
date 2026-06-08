# Clocks, Ordering, and Idempotency

[← Distributed Transactions vs Saga](./06-distributed-transactions-vs-saga.md) | [Day 11 Index](./README.md) | [Next: SQL vs NoSQL vs Wide-Column →](./08-sql-nosql-wide-column.md)

## Wall Clocks Lie

Servers’ wall clocks drift. NTP corrects them, but:

- Clocks can **jump** forward or backward  
- Two nodes can disagree on “who was first” by tens of ms  
- `last-write-wins` with wall time can **drop a newer logical update**

```
Node A @ 12:00:00.100  writes x=1
Node B @ 12:00:00.050  (skewed slow) writes x=2
LWW by timestamp → keeps x=1, discards x=2  ← wrong causality
```

Do not use wall time alone as the source of truth for conflict resolution in multi-writer systems.

---

## Happens-Before and Causality

Event **A happens-before B** if:

- A and B are on the same thread/process in order, or  
- A sends a message that B receives, or  
- Transitive closure of the above  

Concurrent = neither happens-before the other.

Causal consistency ([topic 2](./02-consistency-models.md)) respects happens-before; wall clocks do not define it.

---

## Logical Clocks

### Lamport Timestamps

Each node keeps a counter:

1. On local event: `t = t + 1`  
2. On send: include `t` in the message  
3. On receive: `t = max(t, t_msg) + 1`

If A happens-before B, then ` Lamport(A) < Lamport(B) `.  
The converse is **not** true — equal ordering of concurrent events is arbitrary.

Useful for: debugging order, some lock services, versioning when total order is enough.

### Vector Clocks

Each node keeps a vector of counters (one entry per node). On event, increment own entry; on receive, merge with `max` per component.

```
A: [1, 0]
B receives A's msg, events: [1, 1]
C can tell whether events are causally related or concurrent
```

Used in Dynamo-style stores to detect **siblings** (concurrent writes) instead of blindly LWW.

---

## Ordering in Practice

| Mechanism | Role |
|-----------|------|
| Single leader log | Total order for one partition ([consensus](./05-consensus-basics.md)) |
| Kafka partition key | Total order **per partition** ([Day 6](../day-06/08-ordering-and-partitioning.md)) |
| Sequence numbers per entity | Order updates to one aggregate |
| Vector clocks / version vectors | Detect concurrent branches |

**Chat / feed takeaway** ([Day 10](../day-10/06-chat-messaging.md)): order messages per conversation ID, not by global wall clock across data centers.

---

## Idempotency at Scale

Networks retry. Users double-click. Queues redeliver ([Day 6](../day-06/10-retry-dlq-and-idempotency.md)).

**Idempotent operation:** doing it once or many times has the same effect.

```
Bad:  POST /charge  { amount: 10 }     ← each retry charges again
Good: POST /charge  { idempotency_key: "ord-99", amount: 10 }
```

### Patterns

| Pattern | How |
|---------|-----|
| **Idempotency key** | Client sends unique key; server stores result of first success |
| **Natural keys** | `INSERT ... ON CONFLICT DO NOTHING` on order_id |
| **Dedup store** | Redis/DB remembers processed `message_id` (inbox) |
| **Exactly-once illusion** | At-least-once delivery + idempotent handler |

At global scale:

- Keys must be **unique across retries and regions** (UUID, or `region + id`)  
- Store key → response with a TTL that covers the retry window  
- Make handlers safe under **reordering** (don’t assume message 2 arrives after 1 globally)

---

## Last-Write-Wins Pitfalls

LWW is simple and loses data under concurrency. Prefer when:

- Values are truly replaceable (session TTL blob), or  
- Conflict rate is near zero by key design  

Avoid for: collaborative documents, counters (use atomic increments / CRDTs), inventory without reservations.

---

## Design Rules

1. Prefer **per-entity sequences** or **single-writer partitions** over global timestamps.  
2. Treat **retries as normal** — design idempotency first.  
3. Use **vector/version** info when multi-writer conflicts matter.  
4. Sync clocks for **logs and SLOs**, not for sole conflict resolution.

---

## Summary

| Topic | Takeaway |
|-------|----------|
| Wall clocks | Good for humans, weak for distributed order |
| Lamport / vector | Capture causality better than NTP |
| Ordering | Scope it (partition, aggregate), don’t globalize blindly |
| Idempotency | Required for at-least-once everything |

Next: picking a store that matches these needs — [SQL vs NoSQL vs Wide-Column](./08-sql-nosql-wide-column.md).
