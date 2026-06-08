# Trade-Off Matrix

[← Terminology Glossary](./05-terminology-glossary.md) | [Day 13 Index](./README.md) | [Next: Component Selection →](./07-component-selection-guide.md)

Say what you optimize and what you give up. Vague “it depends” without that is not a design.

---

## Consistency vs Availability vs Latency

| Prefer | Gain | Pay |
|--------|------|-----|
| Strong consistency | Correct reads | Latency; refuse writes under partition |
| Availability (AP) | Keep serving | Stale/conflicting data |
| Low latency (PACELC Else) | Fast responses | Weaker consistency |

---

## Sync vs Async

| Prefer | Gain | Pay |
|--------|------|-----|
| Sync | Simple UX, easier strong consistency | Tail latency, coupling |
| Async | Decoupling, spike absorption | Eventual visibility, complexity |

---

## SQL vs NoSQL vs Streams

| Prefer | Gain | Pay |
|--------|------|-----|
| Relational | TX, joins, constraints | Horizontal scale harder |
| Document/KV | Flex + scale by key | Weaker joins/TX |
| Wide-column | Huge write scale | Query-first modeling |
| Event log | Replay, fan-out | Projection lag, ops |

---

## Cache Trade-Offs

| Prefer | Gain | Pay |
|--------|------|-----|
| More caching | Speed, DB relief | Stale data, invalidation bugs |
| Short TTL | Fresher | More DB load |
| Write-through | Fresher cache | Write latency |
| Write-back | Fast writes | Durability risk |

---

## Replication

| Prefer | Gain | Pay |
|--------|------|-----|
| Sync replica | Durability/consistency | Write latency |
| Async replica | Fast writes | Data loss on failover |
| Multi-region active-active | Local writes | Conflicts |
| Single primary | Simple | Geo latency, failover event |

---

## Microservices vs Monolith

| Prefer | Gain | Pay |
|--------|------|-----|
| Monolith | Simple TX, deploy | Scale/team coupling limits |
| Microservices | Independent deploy/scale | Distributed complexity, sagas |

Split on **team/domain boundaries** and real scale pressure — not fashion.

---

## Build vs Buy / Boring vs New

| Prefer | Gain | Pay |
|--------|------|-----|
| Managed service | Speed, ops offload | Cost, less control |
| Self-host | Control | People cost |
| Boring tech | Predictability | Maybe less “perfect” fit |
| New tech | Fit/features | Risk, hiring, unknown failure modes |

---

## Stream Architectures

| Prefer | Gain | Pay |
|--------|------|-----|
| Lambda | Batch correctness path | Dual logic |
| Kappa | Single path | Retention/replay discipline |
| Real-time everything | Freshness | Cost, complexity |
| Batch everything | Cheap/simple | Slow decisions |

---

## How to Present Trade-Offs

```
Option A: ...
  + ...
  − ...
Option B: ...
  + ...
  − ...
Choose A because requirement X outweighs cost Y.
```

End with **why** you picked A over B.

---

## Summary

Every choice has a cost. Write the gain and the pain down.

Next: [Component Selection Guide](./07-component-selection-guide.md).
