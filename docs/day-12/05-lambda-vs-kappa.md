# Lambda vs Kappa Architecture

[← Stream Processing](./04-stream-processing.md) | [Day 12 Index](./README.md) | [Next: Real-Time vs Batch →](./06-realtime-vs-batch.md)

## The Problem

You need both:

- **Accurate historical** analytics (recomputable, complete)  
- **Low-latency** views of recent data  

How many pipelines do you run?

---

## Lambda Architecture

Three layers:

```
          ┌──────────────────┐
Events ──▶│   Speed layer    │──▶ real-time views (approx / recent)
          │ (stream job)     │
          └──────────────────┘
Events ──▶│   Batch layer    │──▶ master batch views (accurate)
          │ (nightly/ hourly)│
          └────────┬─────────┘
                   │
          ┌────────▼─────────┐
Serving ◀─│  Merge / serving │──▶ query API merges batch + speed
          └──────────────────┘
```

| Layer | Role |
|-------|------|
| **Batch** | Recompute from all historical data — source of truth for correctness |
| **Speed** | Fill the gap since last batch with streaming aggregates |
| **Serving** | Answer queries by combining both |

### Pros / Cons

| Pros | Cons |
|------|------|
| Batch can fix stream bugs by full recompute | **Two code paths** for same business logic |
| Mature batch tools | Operational complexity |
| Good when stream engines were immature | Merge logic is tricky |

Classic in early big-data stacks (Hadoop batch + Storm/Spark Streaming).

---

## Kappa Architecture

**One** streaming (or log-centric) pipeline. The durable log is the system of record for reprocessing.

```
Events ──▶ Kafka (long retention)
              │
              ▼
         Stream processor ──▶ serving DB / warehouse sink
              │
              └── replay from log to rebuild / fix
```

No separate batch job for the same transform — **replay** the log with updated code.

| Pros | Cons |
|------|------|
| Single processing logic | Need strong log retention + replay ops |
| Simpler mental model | Very large historical recompute can still be heavy |
| Fits Kafka-centric orgs | Batch SQL culture may resist |

---

## Comparison

| Dimension | Lambda | Kappa |
|-----------|--------|-------|
| Pipelines | Batch + stream | Stream (log replay) |
| Correctness fix | Rerun batch | Replay from offset / day |
| Complexity | Higher (dual) | Lower (single path) |
| Best when | Heavy batch estate already exists | Log + stream is primary |
| Risk | Logic drift between layers | Replay cost / retention cost |

---

## Modern Practice

Many teams land in a **hybrid**:

| Path | Use |
|------|-----|
| Stream | Real-time features, alerts, CDC projections |
| Batch / warehouse ELT | Complex SQL, ML features, finance reconciliation |
| Shared **raw log / lake** | Both read the same immutable events |

That is Kappa-like for ingest (one log) with batch **consumers** for heavy analytics — not two different event definitions.

Keep one **canonical event schema** in a durable log. Let many consumers (stream and batch) read it — don’t invent two produce paths for the same fact.

---

## Choosing

| Situation | Lean |
|-----------|------|
| Need sub-minute dashboards + nightly finance truth | Lambda-style merge or stream + separate ledger batch |
| Kafka already backbone; Flink skilled team | Kappa |
| Analysts live in warehouse SQL | Lake/warehouse batch + optional stream for hot path |
| Fixing production metric bugs often | Prefer replayable log (Kappa-friendly) |

---

## Summary

| Architecture | Idea |
|--------------|------|
| Lambda | Batch accuracy + stream speed + merge |
| Kappa | Single stream/log pipeline; replay to correct |
| Practical | One event log, many consumers |

Next: picking latency tiers — [Real-Time vs Batch Analytics](./06-realtime-vs-batch.md).
