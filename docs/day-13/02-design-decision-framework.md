# Design Decision Framework

[← Estimation](./01-back-of-envelope-estimation.md) | [Day 13 Index](./README.md) | [Next: Rules of Thumb →](./03-rules-of-thumb.md)

## Order of Thinking

Don’t start with “let’s use Kafka.” Start with **problem → constraints → scale → APIs → data → components → failures → observe**.

```
1. Clarify functional requirements
2. Clarify non-functional (SLA, consistency, budget, geo)
3. Estimate scale
4. Define APIs / events
5. Data model + storage choice
6. High-level components + sync/async
7. Deepen bottlenecks (cache, shard, queue)
8. Failure modes + reliability patterns
9. Observability + ops story
10. Trade-offs & what you’d do at 10× scale
```

Same spine as the [Day 10 design process](../day-10/01-the-design-process.md), with more depth from Days 11–12.

---

## Requirement Questions (Always Ask)

| Area | Questions |
|------|-----------|
| Users | Who? DAU? Geo? |
| Actions | Core write/read paths? |
| Consistency | Stale OK? Money involved? |
| Latency | p99 target per path? |
| Availability | Nines? Regional failure OK? |
| Durability | Can we lose data? How much? |
| Security | Authn/z, PII, compliance? |
| Scale timeline | Launch vs 2-year growth? |

---

## Decision Tree (Short)

```
Is it user-facing request/response?
  ├─ Yes → sync path; add cache if read-heavy
  └─ No / slow work → async queue/stream

Does it need multi-row ACID in one service?
  ├─ Yes → relational + local TX
  └─ Cross-service → saga + outbox (not 2PC by default)

Must every reader see latest write?
  ├─ Yes → strong consistency / primary reads / quorum
  └─ No → eventual + UX for lag

Is history a product requirement?
  ├─ Yes → consider event sourcing / audit log
  └─ No → CRUD + optional CDC/outbox
```

---

## Sync vs Async Rule

| Choose sync when | Choose async when |
|------------------|-------------------|
| User needs answer now | Work &gt; ~100–200ms or spiky |
| Strong consistency UX | Fan-out to many systems |
| Simple single-service path | Retries and buffering help |

---

## Data Ownership Rule

Each piece of data should have **one write owner**. Others get copies via events/CDC/API — avoid shared writable DB across many services.

---

## Progressive Complexity

| Stage | Add |
|-------|-----|
| v1 | Single region, primary DB, simple cache |
| Growth | Replicas, CDN, queues for email/notifs |
| Scale | Shard/partition, CQRS read models |
| Global | Multi-region, conflict strategy, edge |

**Don’t design day-one like a hyperscaler year-three** unless the requirements force it.

---

## Before You Call It Done

Confirm you have: written requirements, rough numbers, a named bottleneck, a consistency story per path, a failure story per box, and a way to see breakage in metrics.

---

## Summary

Work the problem in order. Pick technology after the constraints are clear.

Next: [Rules of Thumb](./03-rules-of-thumb.md).
