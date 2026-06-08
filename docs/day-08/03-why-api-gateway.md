# Why API Gateway?

[← Service-to-Service Communication](./02-service-to-service-communication.md) | [Day 8 Index](./README.md) | [Next: API Gateway Responsibilities →](./04-api-gateway-responsibilities.md)

## The Problem

Microservices expose many endpoints across many hosts.

```
Without gateway, client must know:
  auth.example.com
  orders.internal:8080
  payments.internal:9090
  catalog.internal:3000

Problems:
  - Multiple URLs, CORS, certs
  - Auth logic duplicated per service
  - Internal topology exposed
  - Mobile app update for every URL change
```

---

## What Is an API Gateway?

A **single entry point** for all client traffic — routes requests to appropriate backend services.

```
Mobile / Web / Partner API
         │
         ▼
   ┌─────────────┐
   │ API Gateway │
   └──────┬──────┘
          │
    ┌─────┼─────┬─────────┐
    ▼     ▼     ▼         ▼
  Auth  Order Payment  Catalog
```

Clients talk only to the gateway. Services stay internal.

---

## Why Not Just a Load Balancer?

| Load Balancer | API Gateway |
|---------------|-------------|
| Distributes traffic | Routes + application logic |
| L4/L7 TCP/HTTP | Path/host routing, auth, transform |
| Same backend pool | Many different services |
| SSL termination | + JWT validation, rate limits, API keys |

Gateway is **application-aware** reverse proxy. See [Day 3: Reverse Proxy](../day-03/04-reverse-proxy.md).

Many products combine both: AWS ALB + API Gateway, Kong, Nginx Plus, Traefik.

---

## Key Benefits

### 1. Single Public Face

One domain: `api.example.com`  
One TLS certificate. Simpler client configuration.

### 2. Centralized Cross-Cutting Concerns

| Concern | At gateway |
|---------|------------|
| Authentication | Validate JWT once |
| Rate limiting | Per API key / user |
| SSL/TLS | Terminate HTTPS |
| Request logging | One audit point |
| CORS | Configure once |

Services focus on business logic — not repeating auth in every service.

### 3. Hide Internal Architecture

```
Client sees:  GET /api/v1/orders
Gateway maps: → order-service.internal:8080/orders

Backend refactor, split, merge — client URL unchanged
```

### 4. Protocol Translation

```
Client: REST/JSON
Gateway → gRPC to internal services

Client: GraphQL
Gateway → multiple REST calls, aggregate response
```

### 5. Security Perimeter

Only gateway exposed to internet. Backend services in private subnet — no public IP.

```
Internet → Gateway (public) → Services (private VPC)
```

---

## When You Need a Gateway

| Situation | Gateway? |
|-----------|----------|
| Monolith, single app | Optional (Nginx in front is enough) |
| Multiple microservices, external clients | Yes |
| Mobile + web + partner APIs | Yes |
| Internal-only services (service mesh) | May use mesh without public gateway |
| Serverless (Lambda) | API Gateway / HTTP API |

---

## Gateway vs BFF (Backend for Frontend)

| API Gateway | BFF |
|-------------|-----|
| General entry, all clients | One BFF per client type |
| Shared routing rules | Tailored aggregation per UI |
| Kong, AWS API Gateway | `mobile-bff`, `web-bff` services |

```
Mobile app → Gateway → mobile-bff → microservices
Web app    → Gateway → web-bff    → microservices
```

**BFF** shapes payloads for one client (fewer round trips, mobile-friendly). Gateway still handles TLS, auth, and rate limits. Large orgs often use **Gateway → BFF → services**.

---

## Gatekeeper

Only the edge is public. It authenticates, throttles, and forwards; backends stay on a private network.

```
Internet → Gateway → private services
              ├── auth
              ├── TLS / WAF
              └── rate limits
```

Same job as the security perimeter above — one controlled entry, nothing else exposed.

---

## Popular Gateways

| Product | Notes |
|---------|-------|
| **Kong** | Plugins, OSS + enterprise |
| **AWS API Gateway** | Serverless, Lambda integration |
| **NGINX / NGINX Plus** | High performance, config-driven |
| **Traefik** | Kubernetes-native |
| **Envoy** | Data plane, often behind Istio |
| **Apigee** | Enterprise API management |
| **Azure API Management** | Microsoft cloud |

---

## Summary

API Gateway provides **one front door** for clients — routing, SSL, auth, rate limits, and hiding internal services. Essential for microservices with external consumers. Distinct from but often paired with load balancers and service discovery.

---

[Next: API Gateway Responsibilities →](./04-api-gateway-responsibilities.md)
