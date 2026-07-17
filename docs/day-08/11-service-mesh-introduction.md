# Service Mesh Introduction

[← Health Checks](./10-health-checks.md) | [Day 8 Index](./README.md) | [Next: Real-World Flow →](./12-real-world-flow.md)

## What Is a Service Mesh?

A **service mesh** handles service-to-service communication infrastructure — mTLS, retries, metrics, tracing — via **sidecar proxies** next to each app.

```
Without mesh:
  Each service implements retries, TLS, tracing libraries

With mesh:
  App → localhost sidecar (Envoy) → network → remote sidecar → app
  Policy in control plane (Istio)
```

---

## Architecture

```
┌──────────────── Control Plane (Istio) ────────────────┐
│  Config: routes, policies, certs                     │
└────────────────────────┬────────────────────────────┘
                         │ pushes config
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   ┌─────────┐      ┌─────────┐      ┌─────────┐
   │ App +   │      │ App +   │      │ App +   │
   │ Sidecar │      │ Sidecar │      │ Sidecar │
   └────┬────┘      └────┬────┘      └────┬────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                   Data plane (mTLS mesh)
```

| Component | Role |
|-----------|------|
| **Data plane** | Sidecar proxy (Envoy) — handles traffic |
| **Control plane** | Istio, Linkerd — config, certs, discovery |

---

## What Mesh Provides

| Feature | Detail |
|---------|--------|
| **mTLS** | Automatic encrypted service-to-service |
| **Load balancing** | Client-side LB in sidecar |
| **Retries & timeouts** | Policy without code changes |
| **Circuit breaking** | Outlier detection |
| **Observability** | Metrics, traces per hop |
| **Traffic splitting** | Canary % without app change |
| **Access control** | Which service can call which |

Overlaps with gateway for some features — different scope.

---

## North-South vs East-West

```
North-South:  external client → into cluster (API Gateway)
East-West:    service ↔ service inside cluster (Service Mesh)

Internet → Gateway → [mesh] Order → Payment → Inventory
                         ↑
                    mesh handles internal hops
```

| Layer | Traffic |
|-------|---------|
| **API Gateway** | Client → platform |
| **Service mesh** | Service → service |

Can use both — gateway for public API, mesh for internal reliability.

---

## Sidecar Pattern

A **sidecar** is a helper process deployed beside each service instance (same pod/host) that handles cross-cutting concerns.

```
┌─────────────────────────┐
│  Pod                    │
│  ┌─────────┐ ┌────────┐ │
│  │  App    │─│ Sidecar│─│── network
│  └─────────┘ └────────┘ │
└─────────────────────────┘
```

| Sidecar often owns | App stays focused on |
|--------------------|----------------------|
| mTLS, retries, metrics | Business logic |
| Proxy to mesh | Domain APIs |

Service mesh data planes are the common sidecar implementation.

---

## Ambassador Pattern

An **ambassador** is a helper for **outbound** calls — a local proxy the app talks to instead of calling the remote system directly.

```
App → localhost ambassador → external API / legacy system
         (retries, discovery, auth headers, circuit breaking)
```

| vs Sidecar | Ambassador focus |
|------------|------------------|
| Sidecar | Often bidirectional / mesh proxy |
| Ambassador | Client-side gateway to a dependency |

Useful for legacy SOAP/HTTP APIs, sharded backends, or unstable third parties — without baking that complexity into every language SDK.

---

## Popular Meshes

| Mesh | Notes |
|------|-------|
| **Istio** | Feature-rich, Envoy-based, complex |
| **Linkerd** | Lightweight, Rust micro-proxy |
| **Consul Connect** | HashiCorp ecosystem |
| **AWS App Mesh** | Managed, Envoy |

---

## When to Adopt a Mesh

| Adopt when | Skip when |
|------------|-----------|
| Many microservices, polyglot | Monolith or few services |
| mTLS everywhere required | Simple K8s + gateway enough |
| Need traffic policy without redeploys | Team small, ops overhead high |
| Deep distributed tracing required | Early MVP |

**Don't adopt mesh on day one.** Start with gateway + K8s DNS + good observability ([Day 7](../day-07/README.md)).

---

## Mesh vs API Gateway Overlap

| Capability | Gateway | Mesh |
|------------|---------|------|
| Public entry | Yes | No |
| JWT validation | Yes | Rare |
| Rate limit external | Yes | Internal quotas |
| mTLS internal | Possible | Core feature |
| Retries between services | No | Yes |

---

## Summary

Service mesh adds **sidecar proxies** for **east-west** traffic — mTLS, LB, retries, observability without app library bloat. **Istio + Envoy** is the common stack. Use **API Gateway** for north-south; mesh for internal service communication at scale.

---

[Next: Real-World Flow →](./12-real-world-flow.md)
