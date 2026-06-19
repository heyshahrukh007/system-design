# Real-World Flow

[← Service Mesh Introduction](./11-service-mesh-introduction.md) | [Day 10 Index](./README.md)

## Scenario

**User places an order** on a microservices e-commerce platform.

```
POST https://api.shop.example.com/v1/orders
Authorization: Bearer <JWT>
Body: { "items": [{ "product_id": 123, "qty": 2 }] }
```

Trace the request through gateway, discovery, and services.

---

## Architecture Overview

```
Mobile App
     │
     ▼
┌─────────────┐
│ Cloud LB    │  (TLS, DDoS)
└──────┬──────┘
       ▼
┌─────────────┐
│ API Gateway │  Kong / AWS API GW
└──────┬──────┘
       │
   ┌───┴───┬───────────┬────────────┐
   ▼       ▼           ▼            ▼
 Auth   Order      Catalog      (async)
 Svc    Svc        Svc          via queue
```

---

## Step-by-Step

### 1. DNS and TLS

```
Client resolves api.shop.example.com → Cloud LB IP
TLS handshake with certificate managed by ACM / Let's Encrypt
```

### 2. Cloud Load Balancer

```
Routes HTTPS to healthy API Gateway instance
Health check: GET /gateway-health → 200
```

### 3. API Gateway — Rate Limit and Auth

```
Check rate limit: user 789 — 45/100 requests this minute → OK
Validate JWT:
  signature valid, exp not passed
  extract user_id=789, scopes=[orders:write]
Route: POST /v1/orders → order-service upstream
Inject headers:
  X-User-Id: 789
  X-Request-Id: req-uuid-abc
```

### 4. Service Discovery

```
Gateway queries registry (K8s endpoints / Consul):
  order-service → [10.0.1.10:8080, 10.0.1.11:8080, 10.0.1.12:8080]
Load balance: pick 10.0.1.11 (least connections)
Forward: POST http://10.0.1.11:8080/orders
```

### 5. Order Service (with Mesh Sidecar)

```
Request hits Envoy sidecar → forwarded to Order app
Order Service:
  1. Trust X-User-Id from gateway (mTLS verified)
  2. Validate cart items

Sync call (gRPC via mesh):
  catalog-service.GetProduct(123) → price, stock OK
  mesh: mTLS, 2s timeout, 1 retry

  3. INSERT order into DB (status=PENDING)
  4. Publish order.created to Kafka

  5. Return 201 { order_id: 456 }
```

### 6. Async Fan-Out (Queue)

```
order.created event:
  → Inventory Worker: reserve stock
  → Payment Worker: charge card (idempotency key=order-456)
  → Email Worker: confirmation email
  → Analytics Worker: record funnel

User already got 201 — async work continues
```

### 7. Response Path

```
Order Service → sidecar → Gateway → Cloud LB → Client

201 Created
{
  "order_id": 456,
  "status": "PENDING",
  "total": 59.98
}
```

Total sync path: ~150–400 ms (gateway + order + catalog gRPC).

---

## Failure Scenarios

### Catalog Service Slow

```
gRPC timeout 2s → circuit breaker opens after threshold
Order returns 503 or degraded "try again"
Inventory not reserved — no orphan order (transaction rollback)
```

### Payment Worker Fails (Async)

```
Message retries 3× → DLQ
Order stays PENDING — reconciliation job alerts ops
User sees order placed; email delayed ([Day 8](../day-08/10-retry-dlq-and-idempotency.md))
```

### Order Instance Dies Mid-Request

```
Gateway/LB health check fails instance
Retry on another instance (if idempotent POST with idempotency key)
```

### Gateway Rate Limit Exceeded

```
429 Too Many Requests
Retry-After: 30
No backend load
```

---

## Component Map

| Step | Component | Day 10 Topic |
|------|-----------|--------------|
| TLS entry | Cloud LB | [05](./05-routing-and-load-balancing.md) |
| Auth, rate limit | API Gateway | [06](./06-authentication-and-authorization.md), [07](./07-rate-limiting-at-gateway.md) |
| Find instance | Service discovery | [08](./08-service-discovery.md) |
| Internal call | gRPC + mesh | [02](./02-service-to-service-communication.md), [11](./11-service-mesh-introduction.md) |
| Async | Kafka queue | [Day 8](../day-08/README.md) |
| Failures | Circuit breaker, retry | [Day 9](../day-09/README.md) |

---

## Summary

A real order flows: **DNS → LB → Gateway** (auth, rate limit, route) → **discovery** picks instance → **Order Service** sync calls Catalog, async publishes event → **workers** handle payment, inventory, email. Gateway handles north-south; mesh and queues handle internal and async paths.

---

[← Service Mesh Introduction](./11-service-mesh-introduction.md) | [Day 10 Index](./README.md)
