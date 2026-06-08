# The Design Process

[← Day 10 Index](./README.md) | [Next: URL Shortener →](./02-url-shortener.md)

## What This Day Is About

Days 3–9 taught individual components in depth. Day 10 applies them to complete systems. Before each problem, use the same engineering workflow — whether you are designing a new feature at work or studying a famous architecture.

This is not a separate skill from what you already learned. It is the **order of thinking** that ties HLD, capacity, data design, and reliability together.

---

## Step 1 — Understand the Problem

Start with what the system must do for users and the business.

**Functional requirements** — concrete behaviors:

- What actions can users take?
- What are the inputs and outputs?
- What is in scope for v1 vs later?

**Non-functional requirements** — how well it must work:

| Dimension | Example questions |
|-----------|-------------------|
| Scale | How many users, requests/sec, data volume? |
| Latency | p50 / p99 targets per operation? |
| Availability | 99.9%? 99.99%? Acceptable downtime? |
| Consistency | Must reads see latest write immediately? |
| Durability | Can you lose data? For how long? |

**Constraints** — fixed boundaries:

- Budget, team size, existing tech stack
- Regulatory (PCI for payments, GDPR for PII)
- Geographic regions to serve

Write these down before drawing boxes. A design that ignores requirements optimizes the wrong thing.

---

## Step 2 — Estimate Scale

Rough numbers prevent over-engineering and expose bottlenecks early.

```
Daily active users     →  peak QPS (assume 2–3× average)
Writes per day         →  writes/sec
Reads per day          →  reads/sec  →  read:write ratio
Storage per record     →  total storage (with growth factor)
Bandwidth              →  ingress + egress for media systems
```

**Example:** 10M DAU, each user makes 20 requests/day

```
10M × 20 / 86,400 ≈ 2,300 req/s average
Peak ≈ 5,000–7,000 req/s
```

You do not need exact math. You need **order of magnitude** — is it 100 req/s or 100,000 req/s? That alone changes cache, DB, and queue choices.

See [Day 2: Capacity Design](../day-02/04-capacity-design.md) for more estimation patterns.

---

## Step 3 — High-Level Architecture

Draw the main boxes and data flow. Typical layers:

```
Client → CDN / Edge → Load Balancer → API Gateway → Services → Data stores
                                              ↘ Queues → Workers
```

Ask for each arrow:

- **Sync or async?** Can the user wait, or should work happen in the background?
- **Read or write path?** Which path gets 10× more traffic?
- **Who owns the data?** One service per bounded context in larger systems.

Keep the first diagram simple. Add components only when a requirement or estimate demands them.

---

## Step 4 — Data Model and Storage

Choose storage based on access patterns, not familiarity.

| Pattern | Typical store |
|---------|---------------|
| Structured entities, transactions | Relational DB ([Day 4](../day-04/README.md)) |
| Key-value lookups, sessions, rate limits | Redis / cache ([Day 5](../day-05/README.md)) |
| Large blobs (images, video) | Object storage ([topic 8](./08-distributed-object-storage.md)) |
| Full-text / prefix search | Search index (Elasticsearch, trie service) |
| Append-only events, fan-out | Message queue / log ([Day 6](../day-06/README.md)) |
| Analytics aggregates | Column store / OLAP ([topic 11](./11-analytics-metrics-pipeline.md)) |

Define primary keys, indexes, and partitioning strategy. The query path drives the schema — not the other way around.

---

## Step 5 — Deep Dive the Hard Parts

Every system has 2–3 areas that deserve extra attention. These are usually:

- **Hot paths** — redirect lookup, feed read, autocomplete keystroke
- **Consistency** — inventory, payments, message ordering
- **Scale breaks** — single counter, celebrity user fan-out, hot partition

Apply patterns from earlier days:

- Cache-aside for read-heavy lookups ([Day 5](../day-05/05-cache-aside-pattern.md))
- Outbox + queue for reliable async ([Day 6](../day-06/11-queue-patterns.md))
- Circuit breaker on external dependencies ([Day 7](../day-07/07-circuit-breaker.md))
- Idempotency keys on writes ([Day 6](../day-06/10-retry-dlq-and-idempotency.md))

---

## Step 6 — Reliability and Operations

Production systems fail. Design for it from the start.

| Concern | Pattern |
|---------|---------|
| Instance dies | Multiple replicas behind LB ([Day 7](../day-07/04-redundancy-and-high-availability.md)) |
| Dependency slow | Timeouts, circuit breaker ([Day 7](../day-07/05-timeouts.md)) |
| Traffic spike | Rate limiting at gateway ([Day 8](../day-08/07-rate-limiting-at-gateway.md)) |
| Debugging | Logs, metrics, traces ([Day 9](../day-09/README.md)) |
| User-facing targets | SLIs and SLOs ([Day 7](../day-07/11-sli-slo-and-sla.md)) |

---

## Step 7 — Trade-offs

Every choice closes doors. Name them explicitly.

```
"We use fan-out on write for normal users because read latency matters more,
 but celebrities use fan-out on read to avoid writing millions of rows per post."
```

Good designs document:

- What you chose
- What you rejected
- Why the requirements favor your choice

---

## How the Rest of Day 10 Is Structured

Each topic follows this process for one real system:

1. Requirements and scale
2. Architecture diagram
3. APIs and data model
4. Deep dive on the interesting parts
5. How it connects to Days 3–9
6. Trade-offs and evolution at higher scale

Read [URL Shortener](./02-url-shortener.md) next — it extends the Day 1 example with production depth.

---

## Summary

System design is a repeatable workflow: **requirements → estimates → architecture → data → hard parts → reliability → trade-offs**. The problems in this day differ in domain, but the thinking order stays the same.

---

[← Day 10 Index](./README.md) | [Next: URL Shortener →](./02-url-shortener.md)
