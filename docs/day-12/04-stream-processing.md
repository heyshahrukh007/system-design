# Stream Processing

[← CDC](./03-change-data-capture.md) | [Day 12 Index](./README.md) | [Next: Lambda vs Kappa →](./05-lambda-vs-kappa.md)

## Batch vs Stream

| | Batch | Stream |
|--|-------|--------|
| Input | Finite file / table partition | Unbounded event sequence |
| When | Scheduled (hourly/daily) | Continuous |
| Latency | Minutes–hours | Seconds–sub-second |
| Example | Nightly ETL | Live dashboard counters |

**Stream processing** transforms unbounded event streams into new streams or sinks (DB, cache, alerts).

Engines: Flink, Kafka Streams, Spark Structured Streaming, cloud Dataflow, ksqlDB.

---

## Core Building Blocks

```
Source (Kafka) → map/filter → keyBy → window → aggregate → sink
```

| Operator | Role |
|----------|------|
| **map / filter** | Per-event transform |
| **keyBy / groupBy** | Partition processing by key (user_id, order_id) |
| **window** | Group events by time |
| **aggregate** | sum, count, join, top-N |
| **sink** | Write results out |

---

## Time Semantics

| Time type | Meaning |
|-----------|---------|
| **Event time** | When the event actually happened (in payload) |
| **Processing time** | When the engine saw it |
| **Ingestion time** | When it entered the broker |

Prefer **event time** for correct analytics (late mobile events, partitions).

### Watermarks

A **watermark** is the engine’s guess: “I believe I’ve seen (almost) all events with event_time &lt; T.”

```
Watermark advances → close windows that ended before T → emit results
```

Late events after the watermark may be dropped, side-output, or update prior results (depending on allowed lateness).

---

## Window Types

| Window | Definition | Example |
|--------|------------|---------|
| **Tumbling** | Fixed, non-overlapping | Count clicks per 1-minute bucket |
| **Sliding** | Fixed size, sliding step | Active users in last 5 min, every 1 min |
| **Session** | Gap of inactivity closes window | User browsing session |
| **Global** | One window (careful) | Rare; usually with triggers |

```
Tumbling 1 min:  [0-1)[1-2)[2-3)
Sliding 5 min / 1 min: overlapping ranges
Session:  events…gap…events  → two sessions
```

---

## Stateful Processing

Aggregations keep **state** (counts, last value, join buffers). State must be:

- Checkpointed for recovery  
- Partitioned by key  
- Bounded (TTL / idle state cleanup) or it grows forever  

**Exactly-once** sinks often use transactional writes + checkpoints ([topic 7](./07-idempotent-stream-consumers.md)).

---

## Stream–Stream and Stream–Table Joins

| Join | Use |
|------|-----|
| Stream–stream | Match clicks to impressions in a time window |
| Stream–table | Enrich order events with current user profile table |
| Temporal | “Profile as of event time” |

Enrichment tables often maintained by CDC.

---

## Example: Live Metrics

```
page_view events
  → keyBy(page_id)
  → tumbling window 1 minute (event time)
  → count
  → sink to Redis / Druid
```

Powers real-time dashboards without scanning the warehouse every second.

---

## Design Rules

1. Define **event time** fields at produce time.  
2. Choose windows from the **product question**, not defaults.  
3. Plan for **late data** (allowed lateness / side outputs).  
4. Bound state; monitor state size.  
5. Make sinks **idempotent** or transactional.  
6. Scale by **key parallelism** — hot keys need special handling ([Day 10 feed](../day-10/05-news-feed.md) hot users analogy).

---

## Summary

| Concept | Role |
|---------|------|
| Unbounded stream | Continuous input |
| Event time + watermark | Correct windows despite delay |
| Windows | Slice time for aggregates |
| State + checkpoint | Fault-tolerant computation |

Next: whole-pipeline architectures — [Lambda vs Kappa](./05-lambda-vs-kappa.md).
