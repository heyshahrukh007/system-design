# SQL vs NoSQL vs Wide-Column

[← Clocks, Ordering, Idempotency](./07-clocks-ordering-idempotency.md) | [Day 11 Index](./README.md)

## Choose by Access Pattern

Storage choice follows **queries, consistency, and scale** — not fashion. Day 4 covered relational internals; this topic maps **families** of stores to distributed-system needs from Days 10–11.

---

## Relational (SQL)

Tables, schemas, joins, ACID transactions on one primary (plus replicas).

```
orders ──< order_items >── products
         users
```

| Strengths | Limits |
|-----------|--------|
| Rich queries and joins | Vertical limits; sharding is hard ([Day 4](../day-04/12-sharding.md)) |
| Strong local consistency | Cross-shard transactions hurt |
| Mature tooling, constraints | Multi-region active-active is complex |
| Great for complex invariants | |

**Fits:** checkout orders, billing, inventory ledger, identity — anything that needs transactions and relations.

Examples: PostgreSQL, MySQL, SQL Server.

---

## Document Stores

JSON/BSON documents, usually keyed by ID; secondary indexes optional.

```
{
  "userId": "u1",
  "profile": { "name": "Ada" },
  "prefs": { "theme": "dark" }
}
```

| Strengths | Limits |
|-----------|--------|
| Flexible schema, whole-aggregate reads | Weak or app-level joins |
| Horizontal scale (often) | Transactions historically weaker (improving) |
| Good for nested entities | Easy to create unqueryable blobs |

**Fits:** profiles, CMS content, product catalogs with varied attributes, event payloads.

Examples: MongoDB, Couchbase, DocumentDB-style services.

---

## Key–Value Stores

Opaque value by key. Extremely fast lookups; little query power.

```
GET session:abc123 → { userId, expiry, ... }
```

| Strengths | Limits |
|-----------|--------|
| Latency and throughput | No rich query model |
| Simple sharding by key | Values opaque to the DB |
| Ideal cache / session / rate limit | Consistency varies by product |

**Fits:** sessions, feature flags, rate limits ([Day 10](../day-10/03-rate-limiter.md)), cache ([Day 5](../day-05/README.md)).

Examples: Redis, Memcached, DynamoDB (as KV), Riak.

---

## Wide-Column Stores

Rows keyed by a **partition key** (+ optional clustering columns). Columns can be sparse; designed for huge scale and tunable consistency.

```
Partition: user_id = 42
  timestamp | type    | payload
  t1        | click   | ...
  t2        | view    | ...
```

| Strengths | Limits |
|-----------|--------|
| Massive write throughput | Model must match query paths |
| Tunable quorum (often) | Ad-hoc joins basically absent |
| Time-series / event friendly | Operational learning curve |
| Multi-datacenter options | |

**Fits:** activity streams, IoT telemetry, inbox timelines, large sparse matrices.

Examples: Cassandra, ScyllaDB, HBase, Bigtable.

---

## Graph, Search, OLAP (Brief)

| Family | Use when |
|--------|----------|
| **Graph** | Deep relationship traversal (social graph, fraud rings) |
| **Search** | Full-text, autocomplete, relevance ([Day 10](../day-10/07-search-autocomplete.md)) |
| **Column OLAP / warehouse** | Analytics aggregates ([Day 10](../day-10/11-analytics-metrics-pipeline.md)) |
| **Object / blob** | Images, video files ([Day 10](../day-10/08-distributed-object-storage.md)) |

These complement primary OLTP stores — they rarely replace them alone.

### Graph Databases

Store **nodes** and **edges** as data you can traverse efficiently.

```
(User)-[:FOLLOWS]->(User)-[:LIKES]->(Post)
"Friends-of-friends who liked X" → graph query, not a pile of SQL joins
```

| Strengths | Limits |
|-----------|--------|
| Relationship-heavy queries | Weak for tabular reporting |
| Fraud / social / recommendations | Narrower ops ecosystem than Postgres |
| Edge properties | Don’t force everything into a graph |

**Examples:** Neo4j, Amazon Neptune, JanusGraph. Often sit beside a relational system of record — graph for the traversal queries, SQL for the rest.

Use a graph store when multi-hop relationships *are* the product. Otherwise keep edges in SQL/documents and cache the hot paths.

---

## Consistency and Topology Mapping

| Store family | Typical CAP lean | Common replication |
|--------------|------------------|--------------------|
| Relational primary | CP (under partition, refuse writes) | Leader–follower |
| Dynamo-style KV | AP + tunable | Leaderless + quorum |
| Cassandra-style wide-column | Tunable PACELC | Leaderless / peer |
| Redis single node | Not distributed HA by itself | Optional replicas / cluster |

Tie back to [CAP](./01-cap-and-pacelc.md), [quorum](./03-quorum-reads-writes.md), and [replication models](./04-replication-models.md).

---

## Decision Guide

```
Need multi-row ACID + joins?
  → Relational

Need simple Get/Put at huge QPS?
  → Key–value (± cache)

Need flexible nested documents, mostly by id?
  → Document

Need huge time-ordered writes per partition key?
  → Wide-column

Need text relevance?
  → Search index (plus primary store)

Need multi-service business flow?
  → Pick stores per service + saga/outbox
     (not one global 2PC across all)
```

**Polyglot persistence** is normal: checkout in Postgres, sessions in Redis, feed fan-out in Cassandra/Redis, search in Elasticsearch, videos in object storage.

---

## Anti-Patterns

| Anti-pattern | Better |
|--------------|--------|
| One MongoDB for financial ledger “because JSON” | Relational + clear schema |
| Sharding Postgres on day one | Vertical + replicas first |
| Cassandra without knowing partition queries | Design tables from queries first |
| Using Kafka as the system of record alone | Durable store + outbox/events |

---

## Summary

| Family | Superpower |
|--------|------------|
| SQL | Transactions and relations |
| Document | Flexible aggregates |
| KV | Speed by key |
| Wide-column | Scale and time-series partitions |

Match the store to consistency needs and query shape.

---

[← Clocks, Ordering, Idempotency](./07-clocks-ordering-idempotency.md) | [Day 11 Index](./README.md)
