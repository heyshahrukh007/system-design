# API Gateway Responsibilities

[← Why API Gateway](./03-why-api-gateway.md) | [Day 10 Index](./README.md) | [Next: Routing and Load Balancing →](./05-routing-and-load-balancing.md)

## Core Responsibilities

| Responsibility | What gateway does |
|----------------|-------------------|
| **Routing** | Map URL/path to backend service |
| **Load balancing** | Pick healthy instance |
| **SSL termination** | Decrypt HTTPS, forward HTTP internally |
| **Authentication** | Validate tokens, API keys |
| **Authorization** | Check scopes, roles (basic) |
| **Rate limiting** | Throttle abusive clients |
| **Request/response transform** | Headers, body rewrite |
| **Aggregation** | Combine multiple backend calls (optional) |
| **Caching** | Cache GET responses at edge |
| **Logging & metrics** | Access logs, latency per route |
| **API versioning** | Route `/v1` vs `/v2` to different backends |

---

## Routing

```
https://api.example.com/v1/users/*     → user-service
https://api.example.com/v1/orders/*    → order-service
https://api.example.com/v1/payments/*  → payment-service
https://api.example.com/graphql        → graphql-aggregator
```

Host-based routing:

```
api.example.com     → public API
admin.example.com   → admin service (IP allowlist)
```

---

## SSL/TLS Termination

```
Client ──HTTPS──▶ Gateway (decrypt, manage cert)
              ──HTTP──▶ internal services (private network)

Benefits:
  - Central cert management (Let's Encrypt, ACM)
  - Backends skip crypto CPU
  - mTLS optional between gateway and services for stricter setups
```

---

## Authentication at Gateway

Validate identity **before** request hits backend.

```
1. Extract Authorization: Bearer <JWT>
2. Verify signature, expiry, issuer
3. Attach X-User-Id, X-Roles headers to downstream request
4. Backend trusts gateway (network policy) — or re-validates
```

Details in [06-authentication-and-authorization.md](./06-authentication-and-authorization.md).

---

## Request Transformation

| Transform | Example |
|-----------|---------|
| Header injection | Add `X-Request-Id`, `X-Forwarded-For` |
| Header stripping | Remove internal headers from client |
| Path rewrite | `/api/v1/users` → `/users` on backend |
| Body mapping | XML client → JSON backend |
| Method override | POST with `_method=DELETE` |

---

## Response Aggregation

Gateway calls multiple services, returns one response.

```
GET /api/v1/dashboard
  → parallel: user-service, orders-service, notifications-service
  → merge JSON → single response to client

Reduces client round trips (mobile on slow network)
```

Also called **API composition** — don't put business rules in gateway; keep it thin.

---

## Caching at Gateway

Cache idempotent GET responses.

```
GET /api/v1/products/123
  Cache-Control from backend
  Gateway caches 5 min → reduces catalog service load
```

Don't cache personalized or authenticated responses without careful key design.

---

## API Versioning

```
/v1/orders → order-service-v1 pool
/v2/orders → order-service-v2 pool

Header-based: Accept: application/vnd.api+json;version=2
```

Gateway deprecates old routes — return `Sunset` header, route traffic gradually.

---

## What Gateway Should NOT Do

| Avoid | Why |
|-------|-----|
| Heavy business logic | Belongs in services |
| Direct database access | Breaks service boundaries |
| Long-running processing | Use async queue |
| Storing session state | Use Redis, JWT |

Gateway is **thin orchestration** — route, secure, limit, transform.

---

## Summary

API Gateway handles **routing, TLS, auth, rate limits, transforms, and optional aggregation**. Keep business logic in services. Use versioning and caching where appropriate. Next: routing and load balancing in detail.

---

[Next: Routing and Load Balancing →](./05-routing-and-load-balancing.md)
