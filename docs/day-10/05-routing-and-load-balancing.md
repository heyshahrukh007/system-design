# Routing and Load Balancing

[← API Gateway Responsibilities](./04-api-gateway-responsibilities.md) | [Day 10 Index](./README.md) | [Next: Authentication and Authorization →](./06-authentication-and-authorization.md)

## Two Layers of Routing

```
Client → API Gateway (route by path/host) → Service instances (LB picks instance)
```

1. **Gateway routing** — which **service** handles this request?
2. **Load balancing** — which **instance** of that service?

See [Day 5: Load Balancer](../day-05/02-load-balancer.md).

---

## Path-Based Routing

```
/api/v1/users/*     → user-service:8080
/api/v1/orders/*    → order-service:8080
/api/v1/products/*  → catalog-service:8080
/static/*           → CDN or object storage
```

```nginx
location /api/v1/orders/ {
    proxy_pass http://order_upstream/;
}
```

Most common pattern for REST APIs.

---

## Host-Based Routing

```
api.example.com      → public API routes
internal.example.com → admin routes (VPN only)
ws.example.com       → WebSocket service
```

---

## Header-Based Routing

```
Header X-API-Version: 2  → v2 backend pool
Header X-Tenant: acme    → tenant-specific deployment
```

Useful for canary releases and multi-tenancy.

---

## Load Balancing at Gateway

After routing to a service **upstream**, pick an instance.

```
order_upstream:
  - 10.0.1.10:8080
  - 10.0.1.11:8080
  - 10.0.1.12:8080

Algorithms: round-robin, least connections, weighted
```

### With Service Discovery

Gateway doesn't use static IPs — asks registry for current instances.

```
Route: /orders → order-service
Discovery returns: [10.0.1.10, 10.0.1.11] (live list)
LB picks one
```

See [08-service-discovery.md](./08-service-discovery.md).

---

## Sticky Sessions

Same client → same backend instance.

```
Use when: legacy server-side session
Avoid when: JWT in cookie, stateless services

Prefer: external session store (Redis)
```

---

## Canary and Blue-Green Routing

### Canary

```
95% traffic → order-service v1
 5% traffic → order-service v2

Gateway or mesh splits by header, cookie, or random %
```

### Blue-Green

```
All traffic → blue (v1)
Deploy green (v2), test, flip gateway upstream to green
Instant cutover, easy rollback
```

---

## gRPC Load Balancing

HTTP/2 long-lived connections need **L7 aware** balancing.

```
Client-side LB: gRPC client resolves all IPs, picks subchannel
Proxy LB: Envoy understands gRPC, balances per RPC
```

Naive TCP round-robin pins one connection — uneven load.

---

## WebSocket Routing

```
Upgrade: websocket
Gateway maintains long-lived connection to correct backend
Sticky routing often required
```

Configure idle timeouts longer than HTTP defaults.

---

## Gateway vs Dedicated LB

| Component | Role |
|-----------|------|
| **Cloud LB (ALB/NLB)** | First hop from internet, TLS, health checks |
| **API Gateway (Kong)** | Path routing, auth, rate limit |
| **Service LB** | Internal traffic between tiers |

```
Internet → ALB → Kong → order-service instances
```

Layers can merge in smaller setups (Kong or Traefik alone).

---

## Summary

Gateway **routes by path, host, or header** to the right service. **Load balancing** picks a healthy instance — static list or dynamic from service discovery. Support canary routing and HTTP/2/gRPC-aware balancing for production.

---

[Next: Authentication and Authorization →](./06-authentication-and-authorization.md)
