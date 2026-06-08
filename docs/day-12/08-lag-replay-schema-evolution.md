# Lag, Replay, and Schema Evolution

[← Idempotent Stream Consumers](./07-idempotent-stream-consumers.md) | [Day 12 Index](./README.md)

## Consumer Lag

**Lag** = how far the consumer is behind the log tip (messages or time).

```
Latest offset 1_000_000
Consumer committed  980_000
Lag ≈ 20_000 messages
```

| Cause | Mitigation |
|-------|------------|
| Slow handler | Optimize, batch, scale consumers |
| Hot partition | Better keys, local fan-out |
| Downstream DB slow | Bulk writes, buffer, backpressure |
| Under-provisioned | More partitions / pods |
| GC / rebalances | Stable consumer groups, enough memory |

**Alert** on lag SLO (e.g. p99 lag &gt; 60s) — same seriousness as API latency ([Day 9](../day-09/README.md)).

---

## Backpressure

When sink can’t keep up:

```
Block / slow consume → lag grows visibly
  vs
Drop events → silent data loss (usually wrong)
```

Prefer visible lag + autoscaling over dropping business events.

---

## Replay

**Replay** = re-read historical events to rebuild or fix a projection.

```
Bug in projector → fix code → reset consumer group to timestamp T
                 → reprocess → upsert into read DB
```

| Need | Requirement |
|------|-------------|
| Replay last 7 days | Retention ≥ 7 days on topic/lake |
| Rebuild forever | Lake / event store with full history |
| Safe replay | Idempotent consumers ([topic 7](./07-idempotent-stream-consumers.md)) |

**Rule:** If you can’t replay, you can’t safely fix projection bugs without manual DB patches.

---

## Retention and Storage

| Store | Typical role |
|-------|--------------|
| Kafka short retention | Hot pipeline (days–weeks) |
| Kafka + tiered storage / lake | Long replay |
| Event store | Per-aggregate forever |
| S3 Parquet/Iceberg | Analytics reprocess |

Cost vs replayability is an explicit trade-off.

---

## Schema Evolution

Producers and consumers change at different times. Without rules, pipelines break.

### Compatibility Modes (Conceptual)

| Mode | Allows |
|------|--------|
| **Backward** | New consumer reads old data |
| **Forward** | Old consumer reads new data |
| **Full** | Both directions |
| **Breaking** | Requires coordinated deploy / dual write |

### Practical Rules

1. **Add** optional fields; don’t reuse field IDs/names for new meaning.  
2. Avoid removing required fields; deprecate first.  
3. Use a **schema registry** (Avro/Protobuf/JSON Schema) in serious pipelines.  
4. Version events: `OrderPaid.v2` or schema ID in payload.  
5. Contract-test producers and consumers in CI.

---

## Expanding / Contracting Deployments

| Phase | Action |
|-------|--------|
| Expand | Deploy consumers that understand new + old |
| Migrate | Producers start emitting new schema |
| Contract | Remove old-field handling after lag clears |

Same expand/contract idea as API versioning and [Day 8](../day-08/README.md) rolling deploys.

---

## Dead Letter and Quarantine

```
Main topic → consumer fails N times → DLQ topic
Ops inspects → fix data or code → replay DLQ → main flow
```

Never infinite-retry poison messages on the hot path.

---

## What to Watch in Production

| Signal | Why |
|--------|-----|
| Lag per consumer group | Freshness |
| Throughput in vs out | Stall detection |
| Error rate + DLQ depth | Poison / bugs |
| Schema registry compat | Avoid breakages |
| Retention vs replay needs | Recoverability |
| Checkpoint / offset health | Exactly-once jobs |
| Runbook: replay topic X | Faster incidents |

---

## Summary

| Concern | Practice |
|---------|----------|
| Lag | SLO + scale + backpressure |
| Replay | Retention + idempotent sinks |
| Schema | Compatibility + registry + expand/contract |

Next: [Day 13 — Synthesis](../day-13/README.md).
