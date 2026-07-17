# Terminology Glossary

[← Pattern Catalog](./04-pattern-catalog.md) | [Day 13 Index](./README.md) | [Next: Trade-Off Matrix →](./06-trade-off-matrix.md)

Common terms. Skim now; come back when a design review gets fuzzy.

---

## A–C

| Term | Meaning |
|------|---------|
| **ACID** | Atomicity, Consistency, Isolation, Durability (local transactions) |
| **ALB / NLB** | Application / Network load balancer types |
| **Availability** | % of time service successfully serves requests |
| **Backpressure** | Slowing producers when consumers can’t keep up |
| **BASE** | Basically Available, Soft state, Eventual consistency |
| **Bloom filter** | Probabilistic set membership structure |
| **Blue-green / canary** | Deploy strategies reducing release risk |
| **CAP** | Consistency, Availability, Partition tolerance trade-off |
| **CDC** | Change Data Capture from DB logs |
| **CQRS** | Command Query Responsibility Segregation |
| **CRDT** | Conflict-free replicated data type |
| **Consistent hashing** | Partitioning with minimal remapping on scale |
| **Consensus** | Nodes agree on a value/log order |
| **Consumer group** | Competing consumers sharing a topic’s partitions |
| **Circuit breaker** | Stops calling a failing dependency |

---

## D–H

| Term | Meaning |
|------|---------|
| **DLQ** | Dead-letter queue for failed messages |
| **Durable** | Survives crashes (fsync / replication) |
| **Event time** | Timestamp when event occurred in reality |
| **Eventual consistency** | Replicas converge if writes stop |
| **Fan-out** | One event/message delivered to many |
| **Fencing token** | Monotonic ID preventing stale leaders |
| **Gossip protocol** | Peer-to-peer state dissemination |
| **Hot key / hotspot** | Disproportionate traffic to one partition |
| **HLD / LLD** | High-level / low-level design |
| **Hinted handoff** | Temporary write to alternate node |

---

## I–O

| Term | Meaning |
|------|---------|
| **Idempotent** | Same effect if applied multiple times |
| **In-sync replica (ISR)** | Kafka replicas caught up with leader |
| **Isolation level** | Degree of TX interference (RU/RC/RR/Serializable) |
| **Kappa / Lambda** | Stream-only vs batch+stream architectures |
| **Lease** | Time-bounded leadership/lock |
| **Linearizability** | Strong real-time consistency model |
| **Logical clock** | Lamport/vector clocks for ordering |
| **mTLS** | Mutual TLS between services |
| **MTTR / MTBF** | Mean time to repair / between failures |
| **Nines** | Availability shorthand (99.9% = three nines) |
| **OLTP / OLAP** | Transactional vs analytical processing |
| **Outbox** | Table of events written in same TX as state |
| **Offset** | Position in a log/partition |

---

## P–S

| Term | Meaning |
|------|---------|
| **PACELC** | Partition→A/C; Else→Latency/Consistency |
| **Partition (network)** | Nodes cannot communicate |
| **Partition (data)** | Shard of a dataset/log |
| **p99 latency** | 99th percentile response time |
| **Poison message** | Message that repeatedly fails processing |
| **Projection** | Read model built from events |
| **Quorum** | Minimum nodes for a decision (W/R) |
| **Raft / Paxos** | Consensus algorithms |
| **RPO / RTO** | Data loss / downtime objectives for DR |
| **Read repair** | Fix stale replicas on read path |
| **Replication lag** | Delay between primary and replica |
| **Saga** | Sequence of local TXs + compensations |
| **Schema registry** | Stores/validates event schemas |
| **Sidecar** | Helper process beside app (mesh proxy) |
| **SLI / SLO / SLA** | Indicator / objective / agreement |
| **Split brain** | Two leaders think they own writes |
| **SPOF** | Single point of failure |
| **Stateful stream processing** | Aggregations needing checkpointed state |
| **Stampede / thundering herd** | Many clients miss cache together |

---

## T–Z

| Term | Meaning |
|------|---------|
| **Timeout** | Max wait before failing a call |
| **TTL** | Time to live for cache/DNS/keys |
| **At-least-once / exactly-once** | Delivery/effect guarantees |
| **Vector clock** | Version vector detecting concurrency |
| **WAL** | Write-ahead log |
| **Watermark** | Event-time completeness estimate in streams |
| **Write amplification** | Extra IO beyond logical write |
| **ZooKeeper / etcd / Consul** | Coordination / config / discovery stores |

---

## Consistency Cheatsheet

| Phrase | Rough meaning |
|--------|---------------|
| Strong | Reads see latest committed write |
| Eventual | Same if no new writes, eventually |
| Causal | Respect happens-before |
| Read-your-writes | You see your own updates |
| Monotonic reads | Never go backward in time |

---

## Summary

Prefer precise phrases: “eventual consistency, ~5s projection lag” beats “eventually kinda synced.”

Next: [Trade-Off Matrix](./06-trade-off-matrix.md).
