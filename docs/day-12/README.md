# Day 12 — Stream Processing & Event Architecture

How to build event-driven and real-time data paths: logs as source of truth, separate read models, CDC, windowed jobs, and the ops that keep pipelines honest.

Builds on [Day 6 queues](../day-06/README.md) and the [Day 10 analytics pipeline](../day-10/11-analytics-metrics-pipeline.md).

## Topics

| # | Topic | File |
|---|-------|------|
| 1 | [Event Sourcing vs CRUD](./01-event-sourcing-vs-crud.md) | Store facts as events, rebuild state |
| 2 | [CQRS](./02-cqrs.md) | Separate write and read models |
| 3 | [Change Data Capture (CDC)](./03-change-data-capture.md) | Stream DB changes without dual writes |
| 4 | [Stream Processing](./04-stream-processing.md) | Windows, aggregations, joins |
| 5 | [Lambda vs Kappa](./05-lambda-vs-kappa.md) | Batch + speed vs stream-only |
| 6 | [Real-Time vs Batch Analytics](./06-realtime-vs-batch.md) | Latency tiers |
| 7 | [Idempotent Stream Consumers](./07-idempotent-stream-consumers.md) | Safe retries |
| 8 | [Ops: Lag, Replay, Schema Evolution](./08-lag-replay-schema-evolution.md) | Running pipelines |

## Reading Order

1 → 8 in order. Architecture first, then engines, then topology and ops.

## Related

- [Day 6: Message Queues](../day-06/README.md)
- [Day 11: Distributed Fundamentals](../day-11/README.md)
- [Day 13: Synthesis](../day-13/README.md)
