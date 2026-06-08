# Pattern Catalog

[← Rules of Thumb](./03-rules-of-thumb.md) | [Day 13 Index](./README.md) | [Next: Terminology Glossary →](./05-terminology-glossary.md)

Patterns used across these docs. Lookup table while you design — not something to memorize in order.

---

## Infrastructure & Traffic

| Pattern | Idea | See |
|---------|------|-----|
| **DNS / GeoDNS** | Name → IP; route by region | Day 3 |
| **Load balancer** | Distribute traffic; health checks | Day 3 |
| **Reverse proxy** | TLS, routing, buffering | Day 3 |
| **CDN** | Edge cache static/media | Day 3, 12 |
| **API Gateway** | Auth, rate limit, routing entry | Day 8 |
| **Service discovery** | Find instances dynamically | Day 8 |
| **Service mesh** | mTLS, retries, observability sidecar | Day 8 |

---

## Caching

| Pattern | Idea | See |
|---------|------|-----|
| **Cache-aside** | App reads cache; on miss load DB & fill | Day 5 |
| **Write-through** | Write cache + DB together | Day 5 |
| **Write-back** | Write cache; async DB | Day 5 |
| **TTL expiry** | Time-based invalidation | Day 5 |
| **Explicit invalidation** | Delete/update on write | Day 5 |
| **Stampede control** | Singleflight / lock on miss | Day 5 |
| **Bloom filter** | Cheap “definitely not present” | Day 10 autocomplete |

---

## Data & Storage

| Pattern | Idea | See |
|---------|------|-----|
| **Primary–replica** | One writer, many readers | Day 4, 13 |
| **Sharding / partitioning** | Split data by key | Day 4 |
| **Quorum N/W/R** | Overlap reads/writes | Day 11 |
| **Leaderless replication** | Coordinated quorums, no leader | Day 11 |
| **Multi-leader** | Regional writers + conflict resolve | Day 11 |
| **CQRS** | Separate read/write models | Day 12 |
| **Event sourcing** | State = fold(events) | Day 12 |
| **CDC** | Tail DB log → stream | Day 12 |
| **Materialized view / projection** | Precomputed read model | Day 12 |
| **Erasure coding** | Durable object storage efficiency | Day 10 |

---

## Messaging & Async

| Pattern | Idea | See |
|---------|------|-----|
| **Work queue** | Competing consumers | Day 6 |
| **Pub/Sub** | Fan-out to many subscribers | Day 6 |
| **Event stream / log** | Durable ordered log, replay | Day 6, 12 |
| **Transactional outbox** | DB+event atomicity | Day 6, 13 |
| **Inbox / dedup** | Consumer-side idempotency | Day 6, 12 |
| **Saga (orch/choreography)** | Multi-step with compensations | Day 6, 12, 13 |
| **DLQ** | Isolate poison messages | Day 6 |
| **Claim check** | Store blob elsewhere; message has pointer | Day 6 |
| **Fan-out on write / read** | Feed generation strategies | Day 10 |
| **Queue-based load leveling** | Buffer spikes with a queue | Day 6 |
| **Pipes and filters** | Staged processing pipeline | Day 6 |
| **Sequential convoy** | Ordered processing per key | Day 6 |
| **Async request-reply** | Correlate async response | Day 6 |
| **Scheduler agent supervisor** | Reliable distributed cron | Day 6 |
| **Strangler fig** | Incremental monolith replacement | Day 8 |
| **Anti-corruption layer** | Isolate legacy models | Day 8 |
| **BFF** | Per-client API aggregation | Day 8 |
| **Ambassador / sidecar** | Outbound / mesh helper proxies | Day 8 |
| **Gateway routing / offloading / aggregation** | Edge patterns | Day 8 |
| **Valet key** | Temporary scoped object access | Day 10 |
| **Index table** | Secondary lookup structure | Day 4 |
| **Materialized view** | Stored read projection | Day 12 |
| **Federated identity** | External IdP login | Day 8 |
| **DB federation** | Split DBs by domain | Day 4 |

---

## Reliability

| Pattern | Idea | See |
|---------|------|-----|
| **Timeout** | Bound waits | Day 7 |
| **Retry + exponential backoff + jitter** | Transient faults | Day 7 |
| **Circuit breaker** | Trip open on error storm | Day 7 |
| **Bulkhead** | Isolate pools/threads | Day 7 |
| **Graceful degradation** | Shed non-critical features | Day 7 |
| **Health check + failover** | Remove bad instances | Day 7 |
| **Idempotency key** | Safe retries | Day 11, 12 |
| **Fencing token / lease** | Prevent split-brain writers | Day 11 |

---

## Consistency & Coordination

| Pattern | Idea | See |
|---------|------|-----|
| **Strong / linearizable reads** | Always latest | Day 11 |
| **Eventual consistency** | Converge later | Day 11 |
| **Read-your-writes** | Session freshness | Day 11 |
| **Consensus (Raft/Paxos)** | Agree on leader/log | Day 11 |
| **2PC** | Distributed TX (rare) | Day 11 |
| **Optimistic concurrency** | Version checks | Day 4, 12 |

---

## Stream & Analytics

| Pattern | Idea | See |
|---------|------|-----|
| **Tumbling / sliding / session windows** | Time aggregation | Day 12 |
| **Watermark** | Event-time progress | Day 12 |
| **Lambda architecture** | Batch + speed + merge | Day 12 |
| **Kappa architecture** | Single stream + replay | Day 12 |
| **Lambda/Kappa hybrid lake** | One log, many consumers | Day 12 |

---

## API & Product Patterns

| Pattern | Idea | See |
|---------|------|-----|
| **Rate limiting** (token/leaky/sliding) | Protect systems | Day 8, 12 |
| **Optimistic UI** | Update UI before confirm | Day 12 CQRS |
| **Backoff / Retry-After** | Client cooperates with limits | Day 10 |
| **WebSocket / long poll** | Real-time push | Day 10 chat |
| **Signed URLs** | Temporary object access | Day 10 storage |

---

## Summary

Name the pattern when you use it — e.g. cache-aside + outbox + saga — so the trade-offs are obvious.

Next: [Terminology Glossary](./05-terminology-glossary.md).
