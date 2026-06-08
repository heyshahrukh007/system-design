# Idempotent Stream Consumers

[← Real-Time vs Batch](./06-realtime-vs-batch.md) | [Day 12 Index](./README.md) | [Next: Lag, Replay, Schema →](./08-lag-replay-schema-evolution.md)

## Why This Matters

Streams deliver **at-least-once** in most practical setups. Rebalances, crashes, and retries redeliver messages. Without idempotency, you double-charge, double-email, or double-count.

Ties to [Day 6](../day-06/10-retry-dlq-and-idempotency.md) and [Day 11 clocks/idempotency](../day-11/07-clocks-ordering-idempotency.md).

---

## Delivery Semantics

| Claim | Meaning |
|-------|---------|
| **At-most-once** | May lose; never dup (rarely acceptable for money) |
| **At-least-once** | No loss; possible dups — **default** |
| **Exactly-once** | Effectively once — needs transactional sink + careful design |

“Exactly-once” usually means **exactly-once processing effect** end-to-end, not magic on the wire.

---

## Idempotent Handler Patterns

### 1. Dedup by Event ID

```
if seen(event_id): return
process(event)
mark_seen(event_id)
```

Store `event_id` in Redis/DB with TTL ≥ max retry window. Use unique constraint for strong dedup.

### 2. Natural Idempotent Writes

```sql
INSERT INTO projections (order_id, ...) 
ON CONFLICT (order_id) DO UPDATE SET ... = excluded...
-- or DO NOTHING if immutable
```

Same event twice → same row state.

### 3. Conditional / Versioned Updates

```
UPDATE account SET balance = 80, version = 4
WHERE id = 1 AND version = 3
```

Stale or duplicate apply fails safely.

### 4. Inbox Table

```
BEGIN;
  INSERT INTO inbox(message_id) VALUES ($1);  -- fails if duplicate
  -- apply business changes
COMMIT;
```

### 5. Transactional Outbox / Sink

Flink/Kafka transactions: commit sink and consumer offset together so replay doesn’t double-apply after success.

---

## Effect vs Message

Idempotency is about **business effect**, not byte-identical payloads.

```
Event A and retry of A → one charge
Event A and Event B (two real orders) → two charges
```

Keys must identify the **business operation** (idempotency key / event id), not only Kafka offset (offsets change on replay from earlier position with new consumer group).

---

## Ordering and Idempotency

Per-key ordering (Kafka partition key) helps, but:

- Compactions and late events still happen  
- Handlers should tolerate **retries** and sometimes **out-of-order** if multi-partition  

Design apply logic as **reconciliation** toward a desired state when possible (`status=PAID`) rather than `balance += 10` without guards.

---

## Poison Messages

Bad payload fails forever → blocks partition in some systems.

| Strategy | Action |
|----------|--------|
| Retry with backoff | Transient errors |
| DLQ after N tries | Malformed / bug |
| Alert on DLQ depth | Ops signal |
| Fix & replay from DLQ | Recovery |

---

## Testing Rules

1. Deliver the same event **twice** in tests — assert one effect.  
2. Crash after process-before-commit and restart.  
3. Replay a time range into a staging projection.  

---

## Summary

| Rule | Practice |
|------|----------|
| Assume duplicates | Always |
| Dedup key | Stable business / event id |
| Prefer upserts | Over blind increments |
| DLQ | For poison pills |
| Exactly-once | Transactional sink + idempotent apply |

Next: running this in production — [Lag, Replay, Schema Evolution](./08-lag-replay-schema-evolution.md).
