# Rate Limiter

[← URL Shortener](./02-url-shortener.md) | [Day 10 Index](./README.md) | [Next: Notification System →](./04-notification-system.md)

## Overview

A rate limiter controls how many requests a client can make in a time window. It protects your services from overload, enforces API quotas, and prevents abuse. You saw gateway-level limiting on [Day 8](../day-08/07-rate-limiting-at-gateway.md); here we design a **distributed** limiter that works across many API servers.

---

## Requirements

### Functional

- Limit by **user ID**, **API key**, or **IP address**
- Configurable limits: e.g. 100 requests/minute per user
- Return `429 Too Many Requests` with `Retry-After` header when exceeded
- Support different tiers (free vs paid)

### Non-Functional

| Requirement | Target |
|-------------|--------|
| Decision latency | &lt; 5 ms added per request |
| Accuracy | Near-exact (slight over-allow acceptable) |
| Availability | Fail-open or fail-closed (configurable) |
| Scale | 50,000 checks/sec cluster-wide |

---

## Where It Sits

```
Client → LB → API Gateway → Rate Limiter → Backend Services
                    ↑
              (often colocated at gateway)
```

**Edge limiting** (gateway/CDN): coarse protection, DDoS, IP-based  
**App-level limiting**: fine-grained per user, per endpoint

Both layers are common — edge catches floods; app enforces business rules.

---

## Core Algorithms

### Token Bucket

```
Bucket holds max B tokens
Refill at R tokens/second
Each request costs 1 token
No token → reject
```

- Allows **bursts** up to bucket size
- Smooth average rate over time
- Common in APIs (AWS, Stripe)

### Fixed Window

```
Count requests in window [0:00, 1:00)
Reset counter at window boundary
```

- Simple in Redis: `INCR key` with TTL
- **Boundary spike:** 2× traffic at window edges (00:59 + 00:00)

### Sliding Window Log

```
Store timestamp of each request
Count requests in last 60 seconds
```

- Accurate but memory-heavy per client

### Sliding Window Counter (practical choice)

```
Combine current window count + previous window count × overlap fraction
```

- Good accuracy, low memory — used in many production systems

---

## Distributed Design

Multiple gateway instances must share state.

```
┌─────────────┐     ┌─────────────┐
│ Gateway 1   │     │ Gateway 2   │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └─────────┬─────────┘
                 ▼
          ┌─────────────┐
          │    Redis    │  (central counter store)
          │   Cluster   │
          └─────────────┘
```

**Redis key design:**

```
rate:{user_id}:{endpoint}:{window_start} → count
TTL = window_size + buffer
```

**Lua script** for atomic increment + check — avoids race between read and write.

---

## Data Model (Rules)

```sql
CREATE TABLE rate_limit_rules (
    id            SERIAL PRIMARY KEY,
    tier          VARCHAR(32),      -- free, pro, enterprise
    endpoint      VARCHAR(128),     -- * for global
    max_requests  INT NOT NULL,
    window_secs   INT NOT NULL
);
```

Rules cached in gateway memory; refresh every 60s or on config push.

---

## Request Flow

```
1. Extract identity: API key → user_id (from JWT or key lookup)
2. Load rule: free tier → 100 req/min on /v1/*
3. Redis: sliding window check for (user_id, /v1/*)
4. Under limit → INCR, forward request
5. Over limit → 429 + Retry-After: <seconds>
```

**Headers (standard practice):**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1719854400
```

---

## Failure Modes

| Scenario | Policy |
|----------|--------|
| Redis unavailable | **Fail-open** (allow traffic) for most products; **fail-closed** for billing-sensitive APIs |
| Hot key (one user) | Redis cluster handles; shard by user_id hash |
| Clock skew | Use Redis server time in Lua script |

Circuit breaker on Redis client ([Day 7](../day-07/07-circuit-breaker.md)) prevents gateway threads blocking.

---

## Local vs Central Limiter

**Local (in-memory per instance):**

- Zero network latency
- Each instance has its own budget → **N × limit** if not careful

**Hybrid:**

```
Local token bucket (80% of budget) + Redis (global truth for remainder)
```

Reduces Redis round-trips while keeping cluster-wide accuracy.

---

## Trade-offs

| Decision | Choice | Why |
|----------|--------|-----|
| Algorithm | Sliding window counter | Balance of accuracy and memory |
| Store | Redis | Sub-ms atomic ops, TTL built-in |
| Placement | Gateway | Single enforcement point ([Day 8](../day-08/07-rate-limiting-at-gateway.md)) |
| On Redis failure | Fail-open | Availability over strict limits |

---

## Summary

A distributed rate limiter is a **fast, shared counter service** (usually Redis) with a **clear algorithm** (token bucket or sliding window) at the **gateway edge**. Design for atomicity, failure policy, and per-identity rules — not just "count requests in memory."

---

[← URL Shortener](./02-url-shortener.md) | [Day 10 Index](./README.md) | [Next: Notification System →](./04-notification-system.md)
