# Client-Side vs Server-Side Discovery

[← Service Discovery](./08-service-discovery.md) | [Day 10 Index](./README.md) | [Next: Health Checks →](./10-health-checks.md)

## Two Patterns

### Client-Side Discovery

Client queries registry, picks instance, connects directly.

```
Order Service (client)
  1. Query registry: "inventory-service" → [IP1, IP2, IP3]
  2. Pick IP2 (round-robin / random)
  3. HTTP call directly to IP2
```

### Server-Side Discovery

Client calls **load balancer** or **gateway** — intermediary queries registry.

```
Order Service (client)
  1. HTTP call to inventory-service.internal (or via gateway)
  2. Load balancer queries registry
  3. LB forwards to healthy instance
```

---

## Comparison

| Aspect | Client-Side | Server-Side |
|--------|-------------|-------------|
| Who picks instance | Client library | Load balancer / gateway |
| Client complexity | Higher (discovery lib) | Lower (just call URL) |
| Language coupling | Per-language client | Any HTTP client |
| Load algorithm | Client chooses | LB chooses |
| Examples | Eureka + Ribbon, gRPC | K8s Service, ALB, Nginx |
| Extra hop | No | Yes (LB) |

---

## Client-Side Discovery (Detail)

```
┌────────────┐     query      ┌──────────┐
│   Client   │ ──────────────▶│ Registry │
│  (Ribbon)  │ ◀──────────────│ (Eureka) │
└─────┬──────┘   instance list└──────────┘
      │
      │ direct HTTP
      ▼
┌────────────┐
│ Instance B │
└────────────┘
```

| Pros | Cons |
|------|------|
| No LB hop — lower latency | Discovery logic in every service |
| Client-aware load balancing | Must update libraries |
| Fine-grained control | Registry coupling |

**Netflix stack:** Eureka (registry) + Ribbon (client LB) — common in Spring Cloud.

---

## Server-Side Discovery (Detail)

```
┌────────────┐                ┌────────────┐     query    ┌──────────┐
│   Client   │ ──request───▶ │ Load       │ ───────────▶│ Registry │
│            │                │ Balancer   │ ◀───────────│          │
└────────────┘                └─────┬──────┘   instances  └──────────┘
                                    │
                                    ▼
                              ┌────────────┐
                              │ Instance B │
                              └────────────┘
```

| Pros | Cons |
|------|------|
| Simple clients | Extra network hop |
| Centralized LB policies | LB can be SPOF (mitigate with HA) |
| Any language | |

**Kubernetes:** standard pattern — call Service DNS, kube-proxy handles rest.

---

## Hybrid in Practice

```
External clients → API Gateway (server-side) → services

Internal service A → service B:
  K8s: server-side via ClusterIP DNS
  Or: client-side gRPC with xDS (Envoy) resolving endpoints
```

---

## Service Mesh Discovery

Mesh control plane (Istio) pushes endpoint list to **sidecar proxies** — client always talks to localhost sidecar.

```
App → localhost:15001 (Envoy sidecar) → picks instance from control plane

App code unchanged — discovery in data plane
```

See [11-service-mesh-introduction.md](./11-service-mesh-introduction.md).

---

## Choosing a Pattern

| Situation | Pattern |
|-----------|---------|
| Kubernetes microservices | Server-side (K8s Services) |
| Spring/Java Netflix stack | Client-side Eureka |
| Public API consumers | Server-side (gateway + LB) |
| gRPC high performance internal | Client-side or mesh |
| Heterogeneous polyglot services | Server-side preferred |

---

## Summary

**Client-side discovery:** caller queries registry and picks instance — flexible, more client code. **Server-side discovery:** caller hits LB/gateway, intermediary picks instance — simpler clients, Kubernetes default. Mesh sidecars hide discovery from application code entirely.

---

[Next: Health Checks →](./10-health-checks.md)
