# Rate Limiting at Gateway

[← Authentication and Authorization](./06-authentication-and-authorization.md) | [Day 8 Index](./README.md) | [Next: Service Discovery →](./08-service-discovery.md)

## Why Rate Limit at Gateway

Protect backends from abuse, overload, and unfair usage — **before** traffic hits services.

```
Without rate limit:
  One client sends 10,000 req/s → entire system degrades

With rate limit at gateway:
  Client throttled at 100 req/s → others unaffected
```

Central enforcement — one policy point for all services.

---

## Rate Limit Dimensions

| Key | Use |
|-----|-----|
| **IP address** | Anonymous / public endpoints |
| **API key** | Partner quotas |
| **User ID** | Per-account fairness |
| **Route** | Expensive endpoints stricter |
| **Global** | Protect entire platform |

```
POST /api/v1/login     → 5/min per IP (brute force protection)
GET  /api/v1/search    → 100/min per user
POST /api/v1/orders    → 30/min per user
```

---

## Algorithms

### Fixed Window

```
Limit: 100 requests per minute
Window: 10:00:00 – 10:00:59

Simple but burst at window boundary (200 at 10:00:59 + 10:01:00)
```

### Sliding Window

```
Count requests in last 60 seconds rolling
Smoother, fairer — more memory
```

### Token Bucket

```
Bucket holds N tokens, refill at rate R
Each request consumes 1 token
Allows controlled bursts
```

Common in production (Kong, Redis rate limiters).

### Leaky Bucket

```
Requests queue, processed at fixed rate
Smooths traffic — stricter on bursts
```

---

## Response When Limited

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 42
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1710500000

{"error": "rate_limit_exceeded", "message": "Try again in 42 seconds"}
```

Clients should respect `Retry-After`.

---

## Distributed Rate Limiting

Multiple gateway instances must share counters.

```
Redis:
  INCR rate:user:789:minute
  EXPIRE 60

All gateway nodes read same Redis → consistent limits
```

Without shared store, each node has separate limit — effective limit × node count.

---

## Quota vs Rate

| Rate limit | Quota |
|------------|-------|
| Requests per second/minute | Total per day/month |
| Burst protection | Billing tier enforcement |

```
Free tier:  1,000 API calls / day
Pro tier:   100,000 / day + 50 req/s rate limit
```

---

## Rate Limit vs Queue

| Rate limit | Queue |
|------------|-------|
| Reject or delay excess | Buffer excess |
| Protect synchronous API | Smooth async work |

Use rate limit at **gateway** for client-facing APIs. Use **queue** for internal job buffering ([Day 6](../day-06/README.md)).

---

## Gateway Plugins

| Tool | Feature |
|------|---------|
| Kong | rate-limiting plugin, Redis cluster |
| AWS API Gateway | Usage plans, API keys, throttling |
| Nginx | limit_req, limit_conn |
| Envoy | local and global rate limits |

---

## Throttling

**Throttling** is the broader product/ops name for limiting how fast clients can call you — rate limits, concurrency caps, and quotas.

| Mechanism | Limits |
|-----------|--------|
| **Rate limit** | Requests per second/minute |
| **Concurrency limit** | In-flight requests |
| **Quota** | Total per day/month |

Gateway throttling protects backends; combine with [Day 7 bulkheads](../day-07/08-bulkhead-pattern.md) inside services.

---

## Summary

Rate limit at the **gateway** by IP, user, or API key using token bucket or sliding window. Return **429** with clear headers. Use **Redis** for distributed counters across gateway replicas. Combine with per-route limits for expensive operations.

---

[Next: Service Discovery →](./08-service-discovery.md)
