# Real-Time vs Batch Analytics

[← Lambda vs Kappa](./05-lambda-vs-kappa.md) | [Day 12 Index](./README.md) | [Next: Idempotent Consumers →](./07-idempotent-stream-consumers.md)

## Latency Tiers

Not everything must be real-time. Match **freshness** to **decision value**.

| Tier | Freshness | Examples |
|------|-----------|----------|
| **Real-time** | &lt; 1–5 s | Fraud block, rate limits, live counters |
| **Near real-time** | seconds–minutes | Ops dashboards, “orders last hour” |
| **Micro-batch** | 1–15 min | Spark micro-batches, soft SLAs |
| **Batch** | hourly–daily | Finance close, cohort reports, ML training sets |
| **On-demand** | query time | Ad-hoc warehouse SQL |

See also [Day 10 analytics pipeline](../day-10/11-analytics-metrics-pipeline.md).

---

## Real-Time Analytics

**Goal:** act or display on fresh events.

```
Events → stream job → hot store (Redis, Druid, ClickHouse, Pinot)
                    → alerts / feature store
```

| Needs | Watch outs |
|-------|------------|
| Low end-to-end latency | Cost of always-on compute |
| Event-time correctness | Late events skew windows |
| High write QPS to serving layer | Hot keys, cardinality explosion |

**Good fits:** abuse detection, live leaderboards, personalization features, SRE golden signals.

---

## Batch Analytics

**Goal:** complete, reproducible aggregates over large history.

```
Events → lake (S3) → dbt/Spark/SQL → warehouse tables → BI
```

| Needs | Watch outs |
|-------|------------|
| Full scans, complex joins | Stale by hours |
| Cheap storage | Pipeline failures delay business |
| Analyst self-serve | Not for blocking user requests |

**Good fits:** revenue reporting, funnels, experimentation analysis, compliance exports.

---

## Decision Rules

1. **User-facing block/allow** → real-time (fraud, quota).  
2. **Executive dashboard “as of yesterday”** → batch is fine.  
3. **Ops “is checkout broken now?”** → near real-time metrics ([Day 9](../day-09/README.md)).  
4. **If wrong number for 1 hour costs $X** → tighten freshness until cost of pipeline &gt; $X.  
5. **Don’t put BI queries on the OLTP DB** — separate analytics path.

---

## Serving Stores by Tier

| Tier | Typical store |
|------|---------------|
| Real-time features | Redis, feature DB |
| Interactive OLAP | Druid, Pinot, ClickHouse, BigQuery (fast) |
| Warehouse | Snowflake, Redshift, BigQuery, Databricks |
| Archive | S3 / GCS data lake (Parquet/Iceberg) |

---

## Exact vs Approximate

| Approach | Use |
|----------|-----|
| Exact counts | Billing, money |
| Approximate (HyperLogLog, sketches) | Unique visitors at huge scale |
| Exactly-once pipeline | When double-count breaks trust |

Approximate is a **product** decision, not only a tech trick.

---

## Anti-Patterns

| Anti-pattern | Better |
|--------------|--------|
| One “real-time warehouse” for everything | Tiered architecture |
| Nightly job for fraud blocks | Stream path |
| Dashboard queries hitting primary Postgres | Replica or warehouse |
| Same SLA for CEO report and payment auth | Different freshness SLOs |

---

## Summary

| Mode | Optimize for |
|------|----------------|
| Real-time | Latency and actionability |
| Batch | Completeness and cost |

Pick the slowest tier that still meets the decision’s needs — that is advanced judgment.

Next: making consumers safe under retries — [Idempotent Stream Consumers](./07-idempotent-stream-consumers.md).
