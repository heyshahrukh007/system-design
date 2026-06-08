# URL Shortener

[← The Design Process](./01-the-design-process.md) | [Day 10 Index](./README.md) | [Next: Rate Limiter →](./03-rate-limiter.md)

## Overview

A URL shortener maps long URLs to short codes and **redirects** users on click. You saw a starter version on [Day 1](../day-01/05-starter-example.md). Here we design for production scale and tie in infrastructure from Days 3–9.

---

## Requirements

### Functional

- Create a short URL from a long URL
- Redirect `GET /{code}` → original URL
- Optional expiration and custom aliases (logged-in users)
- Analytics: click count per short URL (async, not on redirect path)

### Non-Functional

| Requirement | Target |
|-------------|--------|
| Redirect latency | &lt; 50 ms p99 |
| Availability | 99.99% on redirect path |
| Scale | 500M URLs stored, 10B redirects/month |
| Short code length | ≤ 7 characters |

**Read:write ratio ≈ 100:1** — optimize redirects aggressively.

---

## Scale Estimates

```
Creates:  500M / 30 days ≈ 200 writes/sec
Redirects: 10B / 30 days ≈ 4,000 reads/sec average
Peak redirects: ~15,000–20,000/sec

Storage: 500M × ~700 bytes ≈ 350 GB (metadata + indexes)
```

---

## High-Level Architecture

```
                    ┌─────────┐
  Client ──────────▶│   CDN   │  (cache 301 for hot links)
                    └────┬────┘
                         │ cache miss
                    ┌────▼────┐
                    │   LB    │
                    └────┬────┘
              ┌──────────┼──────────┐
              ▼          ▼          ▼
         Redirect    Create API   Admin API
         Service      Service      (analytics)
              │          │
              ▼          ▼
         ┌────────┐  ┌──────────┐
         │ Redis  │  │ Postgres │  (primary + replicas)
         │ cache  │  │ cluster  │
         └────────┘  └──────────┘
                         │
                    ┌────▼────┐
                    │  Kafka  │  → click analytics workers
                    └─────────┘
```

**Separation:** Redirect service is read-only and horizontally scaled. Create service handles writes and ID generation.

---

## APIs

**Create**

```
POST /v1/urls
{ "long_url": "https://...", "expires_at": "2026-12-31T00:00:00Z" }

→ 201 { "short_url": "https://s.ly/x7Kp2mQ", "code": "x7Kp2mQ" }
```

**Redirect**

```
GET /x7Kp2mQ
→ 301 Location: https://...
```

Use **301** so browsers and CDNs cache the mapping ([Day 1](../day-01/05-starter-example.md)).

---

## Short Code Generation

At this scale, avoid a single global counter.

**Distributed ID (Snowflake-style)** → Base62 encode → 7-char code

```
64-bit ID: timestamp | machine_id | sequence
→ Base62 → "x7Kp2mQ"
```

- No coordination per insert beyond machine ID assignment
- Codes are unpredictable (security benefit over sequential IDs)
- Check uniqueness on insert (collision probability negligible)

Custom aliases: separate uniqueness check on `aliases` table before insert.

---

## Data Model

```sql
CREATE TABLE urls (
    id          BIGINT PRIMARY KEY,
    code        VARCHAR(7) UNIQUE NOT NULL,
    long_url    TEXT NOT NULL,
    user_id     BIGINT,
    created_at  TIMESTAMPTZ NOT NULL,
    expires_at  TIMESTAMPTZ,
    is_active   BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_code ON urls(code);
```

**Sharding:** Hash `code` → N PostgreSQL shards when single DB exceeds ~2 TB or write limits. Redirect service routes by shard key.

---

## Redirect Path (Hot Path)

```
1. CDN edge — if 301 cached, return immediately
2. Redirect service — GET code from Redis (cache-aside, Day 5)
3. On miss — query correct DB shard, populate Redis (TTL 24h)
4. Return 301
5. Async — publish click event to Kafka (never block redirect)
```

| Layer | Why |
|-------|-----|
| CDN ([Day 3](../day-03/05-cdn.md)) | Viral links served from edge |
| Redis | Sub-ms lookup, absorbs DB read load |
| 301 | Browser caches — fewer repeat hits |

**Cache stampede:** On expiry of a hot key, use single-flight lock or probabilistic early refresh ([Day 5](../day-05/11-cache-problems.md)).

---

## Analytics (Cold Path)

```
Redirect service → Kafka (click events) → Flink/Spark → ClickHouse
```

- Batched writes — no impact on redirect latency
- At-least-once delivery is fine; dedupe by `(code, timestamp_bucket, user_hash)`

---

## Reliability and Observability

| Concern | Approach |
|---------|----------|
| Redis down | Fall through to DB; higher latency, not outage |
| DB shard slow | Timeout + circuit breaker ([Day 7](../day-07/07-circuit-breaker.md)) |
| Abuse / spam | Rate limit creates at gateway ([Day 8](../day-08/07-rate-limiting-at-gateway.md)) |
| Debugging | RED metrics on redirect service; trace create → DB ([Day 9](../day-09/05-metrics-red-and-use.md)) |

**SLO:** 99.99% of redirects &lt; 100 ms; error budget alerts on burn rate.

---

## Trade-offs

| Decision | Choice | Alternative |
|----------|--------|-------------|
| Redirect cache | CDN + Redis | DB only — fails at scale |
| Code generation | Snowflake + Base62 | DB auto-increment — hotspot |
| Click tracking | Async queue | Sync write on redirect — kills latency |
| DB | Sharded PostgreSQL | NoSQL — ACID for billing/aliases still helps |

---

## Summary

A production URL shortener is a **read-optimized redirect path** (CDN → cache → sharded DB) with a **separate write path** and **async analytics**. The patterns are cache-aside, sharding by key, and decoupling via queues — all from earlier days.

---

[← The Design Process](./01-the-design-process.md) | [Day 10 Index](./README.md) | [Next: Rate Limiter →](./03-rate-limiter.md)
