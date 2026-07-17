# Change Data Capture (CDC)

[← CQRS](./02-cqrs.md) | [Day 12 Index](./README.md) | [Next: Stream Processing →](./04-stream-processing.md)

## The Dual-Write Problem

```
App:
  1. UPDATE orders SET status='paid'
  2. PUBLISH OrderPaid to Kafka
```

Crash between 1 and 2 → DB and stream diverge. Outbox fixes this in-app ([Day 11](../day-11/06-distributed-transactions-vs-saga.md)). **CDC** fixes it at the **database log** level.

---

## What Is CDC?

**Change Data Capture** reads the database’s **transaction/replication log** (WAL, binlog) and emits every row change as a stream of events.

```
Postgres WAL ──▶ CDC connector ──▶ Kafka topics
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
               Search index      Cache invalidate   Warehouse
```

The app only writes to the DB. Downstream systems follow the log.

---

## How It Works (Typical)

1. Connector positions itself in the WAL/binlog  
2. On commit, decode insert/update/delete  
3. Emit structured change event (before/after images)  
4. Advance offset checkpoint  

Tools: **Debezium**, cloud DMS, native logical replication consumers.

---

## Event Shape (Conceptual)

```json
{
  "op": "u",
  "ts_ms": 1710000000000,
  "before": { "id": 1, "status": "pending" },
  "after":  { "id": 1, "status": "paid" },
  "source": { "table": "orders", "lsn": "..." }
}
```

Consumers can rebuild read models, invalidate caches, or sync search.

---

## CDC vs Outbox vs Event Sourcing

| Approach | Who emits | Best for |
|----------|-----------|----------|
| **Outbox** | App in same TX as business write | Domain events with business meaning |
| **CDC** | DB log tailer | Reliable sync of table changes |
| **Event sourcing** | App appends domain events as SoT | Domain history as primary model |

CDC events are often **data-centric** (`orders` row changed), not always rich domain language (`PaymentCaptured`). You can map CDC → domain events in a stream processor.

---

## Use Cases

| Use case | Pattern |
|----------|---------|
| Keep Elasticsearch in sync | CDC → transform → index |
| Cache invalidation | CDC on product table → delete cache key |
| Data warehouse ingest | CDC → Kafka → Snowflake/BigQuery |
| Microservice data copy | CDC → service-owned read DB |
| Audit trail of row changes | Store CDC stream |

---

## Guarantees and Caveats

| Topic | Reality |
|-------|---------|
| Ordering | Per table/partition roughly follows commit order; know your connector |
| Deletes | Tombstones / `op=d` — handle soft vs hard delete |
| Schema changes | DDL can break connectors — coordinate migrations |
| Initial snapshot | First sync often dumps full table then tails log |
| Fan-out load | One busy table can flood Kafka — filter/route |
| PII | Same sensitivity as DB — secure the stream |

---

## Design Rules

1. Prefer **CDC or outbox** over dual writes.  
2. Use **outbox** when you need curated **domain** events.  
3. Use **CDC** when you need faithful **row-level** replication.  
4. Make consumers **idempotent** ([topic 7](./07-idempotent-stream-consumers.md)).  
5. Monitor **connector lag** like replica lag.

---

## Summary

CDC turns the database into an event producer without changing every write path. It is a cornerstone of modern CQRS sync, search indexing, and analytics ingest.

Next: processing those streams continuously — [Stream Processing](./04-stream-processing.md).
