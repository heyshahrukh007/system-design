# Component Selection Guide

[← Trade-Off Matrix](./06-trade-off-matrix.md) | [Day 13 Index](./README.md) | [Next: End-to-End Walkthrough →](./08-end-to-end-walkthrough.md)

**When to use what** — short lookup while you draw a diagram.

---

## Edge & Entry

| Need | Choose |
|------|--------|
| Static assets, video segments | CDN |
| TLS termination, WAF, routing | Reverse proxy / gateway |
| Auth, rate limit, API composition | API Gateway |
| Distribute to healthy instances | Load balancer |
| Find service instances | DNS / Consul / K8s service / mesh |

---

## Compute

| Need | Choose |
|------|--------|
| Request/response business logic | App servers / containers |
| Slow/spike work | Workers + queue |
| Periodic jobs | Scheduler (cron / cloud scheduler) |
| Multi-tenant isolation | Separate pools / bulkheads |

---

## Storage

| Need | Choose |
|------|--------|
| Transactions, relations, constraints | Relational DB |
| Session, rate limit, hot keys | Redis / Memcached |
| Flexible documents | Document DB |
| Huge time-series / wide rows | Wide-column (Cassandra-style) |
| Full-text / autocomplete | Search engine (ES/OpenSearch) or trie service |
| Blobs (images, video) | Object storage |
| Analytics SQL | Warehouse / OLAP |
| Immutable facts / replay | Event store or Kafka + lake |

---

## Messaging

| Need | Choose |
|------|--------|
| Task distribution once | Queue (SQS, Rabbit) |
| Fan-out notifications | Pub/Sub |
| Ordered replayable log | Kafka / Pulsar / Kinesis |
| DB→search/cache sync | CDC (Debezium) |
| DB+event atomicity | Outbox |

---

## Stream Processing

| Need | Choose |
|------|--------|
| Windowed aggregates, CEP | Flink / Kafka Streams / Dataflow |
| Heavy batch ETL | Spark / warehouse ELT (dbt) |
| Simple filter/enrich | Lightweight consumers first |

---

## Reliability Add-ons

| Need | Choose |
|------|--------|
| Bound hangs | Timeouts |
| Transient errors | Retries + jitter |
| Cascading failure | Circuit breaker |
| Isolate deps | Bulkheads |
| Multi-step business | Saga |
| Leader election / config | etcd / ZooKeeper / Consul |

---

## Observability

| Need | Choose |
|------|--------|
| Discrete events | Structured logs |
| Aggregates / SLOs | Metrics |
| Request across services | Traces |
| Explore unknowns | Correlation of all three |

---

## Consistency Quick Picker

| Domain | Default lean |
|--------|--------------|
| Payments, inventory, identity uniqueness | Strong / relational |
| Social counts, feeds, recommendations | Eventual + cache |
| Presence (“online now”) | Soft-state / TTL KV |
| Search index | Eventual via CDC |
| Feature flags | Fast KV; eventual OK |

---

## Decision One-Liners

1. **User waiting?** Sync + tight latency budget.  
2. **Someone else waiting?** Async.  
3. **Money or stock?** Strong write path.  
4. **Same data, many query shapes?** CQRS.  
5. **Must rebuild history?** Events.  
6. **Don’t know yet?** Boring relational + clear metrics; evolve.

---

## Summary

Pick from the need, not the vendor brochure.

Next: [End-to-End Walkthrough](./08-end-to-end-walkthrough.md).
