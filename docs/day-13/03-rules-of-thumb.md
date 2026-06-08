# Rules of Thumb

[← Design Decision Framework](./02-design-decision-framework.md) | [Day 13 Index](./README.md) | [Next: Pattern Catalog →](./04-pattern-catalog.md)

Practical defaults. Exceptions exist — know why you break them.

---

## Scale & Capacity

| Rule | Detail |
|------|--------|
| Peak ≈ 2–5× average | Unless known flash-sale pattern |
| Plan headroom 30–50% | Avoid running at 100% |
| Cache hit ratio goal | Often &gt; 80–90% for hot keys |
| DB connections | Pool size ≪ max_connections; don’t multiply blindly by pods |

---

## Latency Budgets

| Hop | Rough budget mindset |
|-----|----------------------|
| Total API p99 | Often 200–500ms product-dependent |
| In-DC service call | Low ms; set timeouts tightly |
| Cross-region | Avoid on synchronous checkout path |
| User-visible timeout | Fail fast &gt; hang ([Day 7](../day-07/05-timeouts.md)) |

**Rule:** Timeout &lt; caller’s patience; retry only idempotent calls.

---

## Caching

| Rule | Detail |
|------|--------|
| Cache-aside first | Default pattern ([Day 5](../day-05/05-cache-aside-pattern.md)) |
| TTL on everything | Or explicit invalidation plan |
| Never cache money wrongly | Strong path for balances |
| Stampede protection | Lock / singleflight / probabilistic early expire |

---

## Messaging

| Rule | Detail |
|------|--------|
| At-least-once + idempotent | Default consumer design |
| Partition by entity ID | For ordering per entity |
| Outbox over dual write | Always for DB+event |
| DLQ required | For poison messages |
| Don’t use Kafka as DB | Unless you really mean event store + projections |

---

## Data & Consistency

| Rule | Detail |
|------|--------|
| W+R &gt; N | Quorum overlap ([Day 11](../day-11/03-quorum-reads-writes.md)) |
| Prefer local ACID | Over distributed 2PC |
| Saga for multi-service | With compensations |
| Unique constraints in DB | Don’t trust app-only checks |
| Shard on query path key | Not on random UUID if you need range scans |

---

## Reliability

| Rule | Detail |
|------|--------|
| No SPOF | ≥ 2 instances, multi-AZ for critical |
| Circuit breaker on deps | Stop cascades ([Day 7](../day-07/07-circuit-breaker.md)) |
| Bulkhead pools | Isolate noisy neighbors |
| Graceful degradation | Core path lives when extras die |
| Error budget | Reliability is a product choice |

---

## Security (Minimum)

| Rule | Detail |
|------|--------|
| Authn at gateway | Authz in service still required for sensitive ops |
| Least privilege | DB and IAM roles |
| Encrypt in transit | TLS everywhere |
| Secrets not in git | Vault / KMS |
| Rate limit public APIs | Always |

---

## Observability

| Rule | Detail |
|------|--------|
| RED for services | Rate, Errors, Duration |
| USE for resources | Utilization, Saturation, Errors |
| Trace cross-service | Correlation IDs end-to-end |
| Alert on SLO burn | Not on every CPU blip |
| Structured logs | JSON + request_id |

---

## Organization / Design Process

| Rule | Detail |
|------|--------|
| One write owner per data | Avoid shared mutable DB |
| Explicit consistency per API | Document stale windows |
| Design for 10× with a paragraph | Not always with boxes today |
| Prefer boring tech | Novelty is a cost |

---

## Summary

Defaults speed you up. Requirements win when they conflict.

Next: [Pattern Catalog](./04-pattern-catalog.md).
