# Analytics / Metrics Pipeline

[← E-Commerce Checkout](./10-ecommerce-checkout.md) | [Day 10 Index](./README.md)

## Overview

An analytics pipeline collects **events** from product surfaces — clicks, page views, purchases — and turns them into **aggregates** for dashboards, experiments, and business decisions. Unlike OLTP (orders, users), this path favors **append-only writes** and **batch/stream aggregation**.

---

## Requirements

### Functional

- Ingest events from web, mobile, and backend services
- Schema: event name, user, timestamp, properties (JSON)
- Real-time counters (last hour) and historical reports (daily MAU, funnel)
- SQL or dashboard access for analysts

### Non-Functional

| Requirement | Target |
|-------------|--------|
| Ingest throughput | 1M events/sec peak |
| Ingest latency | &lt; 5 s to queryable (near real-time tier) |
| Durability | Do not lose events (at-least-once) |
| Query | Historical scans — seconds to minutes acceptable |

---

## High-Level Architecture

```
┌─────────┐   beacon/HTTP   ┌─────────────┐
│ Clients │────────────────▶│ Ingest API  │
└─────────┘                 └──────┬──────┘
                                   │
┌─────────┐   SDK/batch       ┌────▼────┐
│ Backend │──────────────────▶│  Kafka  │  (durable log)
│ services│                   └────┬────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
        ┌───────────┐      ┌────────────┐      ┌─────────────┐
        │ Flink /   │      │ Spark      │      │ Raw archive │
        │ streaming │      │ batch ETL  │      │ (S3 / HDFS) │
        └─────┬─────┘      └─────┬──────┘      └─────────────┘
              │                  │
              ▼                  ▼
        ┌─────────────────────────────────┐
        │ OLAP store (ClickHouse,         │
        │ BigQuery, Druid)                │
        └─────────────────┬───────────────┘
                          ▼
                   Dashboards / SQL
```

---

## Event Format

```json
{
  "event_id": "evt_uuid",
  "event_name": "purchase_completed",
  "timestamp": "2026-07-02T14:30:00Z",
  "user_id": "u_123",
  "session_id": "sess_abc",
  "properties": {
    "order_id": "ord_456",
    "amount_cents": 4999,
    "currency": "USD"
  }
}
```

**Client-generated `event_id`** — dedupe on ingest for at-least-once delivery.

---

## Ingestion Layer

```
POST /v1/events (batch array up to 100 events)
→ validate schema
→ enrich (geo from IP, server timestamp)
→ produce to Kafka partition by user_id (ordering per user)
→ 202 Accepted
```

**Never block product APIs on analytics** — backend services fire-and-forget to local agent or async buffer ([Day 6](../day-06/03-sync-vs-async-communication.md)).

**Load shedding:** Under overload, sample or drop low-priority events before critical path.

---

## Kafka as Central Log

```
Topic: raw.events (high retention, e.g. 7 days)
Partitions: 256+ for parallelism
Consumers: multiple independent consumer groups
```

Same event stream feeds:

- Real-time aggregations
- Nightly warehouse loads
- ML feature pipelines

---

## Stream Processing (Near Real-Time)

```
Flink job:
  window 1 minute
  GROUP BY event_name, country
  COUNT → write to ClickHouse real_time table
```

Use cases: live dashboard, anomaly detection, autocomplete trending ([topic 7](./07-search-autocomplete.md)).

**Window types:** tumbling (fixed), sliding (overlapping), session (gap-based).

---

## Batch Processing (Historical)

```
Nightly Spark job:
  read Kafka archive / S3 raw files
  dedupe by event_id
  aggregate: DAU, revenue by product, funnel steps
  write to warehouse tables (partitioned by date)
```

Batch corrects stream approximations and handles late-arriving events.

---

## Storage: OLAP vs OLTP

| OLTP (Postgres) | OLAP (ClickHouse) |
|-----------------|-------------------|
| Row-oriented | Column-oriented |
| Fast point lookups | Fast scans and aggregates |
| Updates in place | Append-heavy |
| Orders, users | Billions of events |

Do not run `SELECT COUNT(*) WHERE date = today` on production Postgres — offload to OLAP.

---

## Schema Evolution

```
New property added → JSON column accepts it
Breaking rename → new event_name version (purchase_completed_v2)
Registry (Avro/Protobuf) for strongly typed pipelines
```

Consumers ignore unknown fields; document contract per event_name.

---

## Privacy and Compliance

- Hash or truncate IP; avoid raw PII in events when possible
- Retention policies — delete user data on request (GDPR)
- Separate prod analytics from PII-enriched identity graph if needed

---

## Reliability

| Concern | Approach |
|---------|----------|
| Duplicate events | Dedupe by `event_id` in stream/batch |
| Kafka consumer lag | Scale consumers; alert on lag ([Day 6](../day-06/09-consumers-and-scaling.md)) |
| Pipeline failure | Replay from Kafka retention or raw archive |
| Backpressure | Ingest API returns 503; client buffers locally |

---

## Observability of the Pipeline

Ironically, the pipeline needs its own metrics ([Day 9](../day-09/README.md)):

- Ingest QPS, validation error rate
- Kafka lag per consumer group
- Flink checkpoint success
- Query latency on OLAP

---

## Trade-offs

| Decision | Choice | Why |
|----------|--------|-----|
| Transport | Kafka log | Durable, multi-subscriber |
| Real-time | Flink + OLAP | Sub-minute dashboards |
| Historical | Batch to warehouse | Cost-efficient at scale |
| Ingest API | Async accept | Decouple from product latency |

---

## Summary

Analytics pipelines **ingest append-only events** into a **durable log**, process via **stream and batch jobs**, and store in **OLAP** systems for queries. Design for at-least-once delivery, deduplication, and independent consumers — the same event stream powers dashboards, search trends, and data science.

---

[← E-Commerce Checkout](./10-ecommerce-checkout.md) | [Day 10 Index](./README.md)
