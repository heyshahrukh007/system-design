# CQRS

[← Event Sourcing vs CRUD](./01-event-sourcing-vs-crud.md) | [Day 12 Index](./README.md) | [Next: CDC →](./03-change-data-capture.md)

## What Is CQRS?

**CQRS** (Command Query Responsibility Segregation) means **separate models** for writes (commands) and reads (queries).

```
                    ┌─────────────────┐
   Commands ───────▶│  Write model    │──▶ Write DB / event store
                    └────────┬────────┘
                             │ events / CDC / projection
                    ┌────────▼────────┐
   Queries  ◀───────│  Read model(s)  │◀── Read DB / cache / search
                    └─────────────────┘
```

You are not required to use event sourcing with CQRS — but they pair naturally.

---

## Why Separate?

| Write side needs | Read side needs |
|------------------|-----------------|
| Validation, invariants | Fast denormalized views |
| Transactional integrity | Search, filters, dashboards |
| Domain rules | Many query shapes |

One normalized schema rarely serves both well at scale ([Day 10 feed](../day-10/05-news-feed.md), [search](../day-10/07-search-autocomplete.md)).

---

## Levels of CQRS

| Level | What you do |
|-------|-------------|
| **Logical** | Different classes/services for commands vs queries; same DB |
| **Physical** | Different databases / indexes for reads |
| **Polyglot** | Write in Postgres; read from Elasticsearch + Redis |

Start logical; go physical when read load or shape demands it.

---

## Consistency Implication

Read models update **asynchronously**. After a write:

```
User: POST /orders → 201 Created
User: GET /orders/mine  (immediate) → might not include new order yet
```

This is **eventual consistency** ([Day 11](../day-11/02-consistency-models.md)). Mitigations:

- Read-your-writes via sticky routing or version tokens  
- UI optimistic update  
- “Accepted” screen until projection catches up  
- Synchronous projection for critical paths (rare, costly)

---

## Example: E-Commerce

| Side | Store | Responsibility |
|------|-------|----------------|
| Write | Postgres orders + inventory | Place order, reserve stock |
| Read | Redis “my orders” list | Fast account page |
| Read | Elasticsearch products | Catalog search |
| Read | OLAP warehouse | Revenue reports |

Commands never query the warehouse. Dashboards never write to inventory.

---

## With Event Sourcing

```
Command → validate → append events → Write side done
                │
                ▼
         Projectors update read DBs
```

Multiple projectors = multiple read models from one event stream.

---

## Materialized Views (Read Models)

A **materialized view** is a stored, precomputed projection of data optimized for queries — refreshed on write (via events/CDC) or on a schedule.

```
Write model (normalized orders)
        │ events / CDC
        ▼
Materialized view: user_order_summary
  user_id | order_count | last_total | updated_at
```

| vs plain SQL VIEW | Materialized |
|-------------------|--------------|
| Computed at query time | Stored on disk / in another DB |
| Always fresh | May lag (eventual) |
| Cheap to define | Must refresh / invalidate |

In CQRS, each read model is effectively a materialized view. Also used inside one database (`REFRESH MATERIALIZED VIEW`) for heavy aggregates.

---

## When to Use CQRS

| Use | Skip |
|-----|------|
| Very different read/write patterns | Simple CRUD admin |
| Heavy read scale or complex queries | Team new to distributed systems (start small) |
| Need search + transactional writes | Single small app DB is enough |
| Audit via events already planned | Premature optimization |

CQRS helps when read and write shapes really diverge. It is not the default for every service.

---

## Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Treating CQRS as microservices mandate | Can be modules in one deployable |
| No lag monitoring on projections | Alert on projection delay ([topic 8](./08-lag-replay-schema-evolution.md)) |
| Joining write DB in “query” path | Defeats the separation |
| Infinite read models | Add a read model only for a real query need |

---

## Summary

| Idea | Takeaway |
|------|----------|
| CQRS | Different models for commands vs queries |
| Benefit | Scale and shape each side independently |
| Cost | Eventual consistency, more moving parts |
| Pairing | Often with events, CDC, or outbox |

Next: streaming database changes — [CDC](./03-change-data-capture.md).
