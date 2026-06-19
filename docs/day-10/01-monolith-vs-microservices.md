# Monolith vs Microservices

[← Day 10 Index](./README.md) | [Next: Service-to-Service Communication →](./02-service-to-service-communication.md)

## Monolith

All application logic in **one deployable unit** — one codebase, one process (or tightly coupled cluster).

```
┌─────────────────────────────────────┐
│            Monolith                 │
│  ┌──────┐ ┌──────┐ ┌────────────┐  │
│  │ Auth │ │Orders│ │  Payments  │  │
│  └──────┘ └──────┘ └────────────┘  │
│         Shared Database             │
└─────────────────────────────────────┘
```

| Pros | Cons |
|------|------|
| Simple to develop and deploy | Hard to scale one part independently |
| Easy local debugging | Large codebase, slow builds |
| No network between modules | One bug can crash everything |
| ACID transactions across modules | Team conflicts on same repo |
| Good for MVPs and early stage | Technology lock-in |

---

## Microservices

Application split into **independently deployable services**, each owning a bounded domain.

```
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│ Auth │  │Order │  │Payment│  │Notify│
└──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘
   │         │         │         │
  DB-A      DB-B      DB-C     (queue)
```

| Pros | Cons |
|------|------|
| Scale services independently | Operational complexity |
| Team owns service end-to-end | Network latency between calls |
| Technology choice per service | Distributed debugging |
| Fault isolation (partial) | Data consistency harder |
| Faster deploys per service | Needs gateway, discovery, monitoring |

See [Day 5: Microservices](../day-05/08-microservices-and-workers.md).

---

## When to Stay Monolith

- Small team (&lt; 10 engineers)
- Product still finding fit (MVP)
- Low traffic, simple domain
- Strong need for cross-module transactions

**Modular monolith:** clear module boundaries inside one deployable — split later without rewrite.

---

## When to Split into Microservices

| Signal | Detail |
|--------|--------|
| Deploy pain | Any change requires full redeploy |
| Scale mismatch | One module needs 10× capacity |
| Team growth | Many teams on one repo |
| Different SLAs | Payment needs 99.99%, blog 99% |
| Clear domain boundaries | Order, catalog, user are distinct |

Extract **one service at a time** — strangler fig pattern ([Day 2: Refactor](../day-02/12-refactor-design.md)).

---

## What Changes With Microservices

Monolith: modules call in-process.  
Microservices: services call over network — need:

| Capability | Why |
|------------|------|
| **API Gateway** | Single public entry ([03](./03-why-api-gateway.md)) |
| **Service discovery** | Find instance IPs ([08](./08-service-discovery.md)) |
| **Load balancing** | Spread across replicas ([05](./05-routing-and-load-balancing.md)) |
| **Auth at edge** | Centralize security ([06](./06-authentication-and-authorization.md)) |
| **Queues** | Async between services ([Day 8](../day-08/README.md)) |
| **Observability** | Trace across hops |

Day 10 covers the **entry and routing** layer.

---

## Comparison Table

| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| Deploy unit | One | Per service |
| Communication | In-process | HTTP, gRPC, queue |
| Data | Often one DB | DB per service (ideal) |
| Entry point | One server | API Gateway |
| Finding services | N/A | Service discovery |
| Failure blast radius | Whole app | Per service (if designed well) |

---

## Summary

Start with a **monolith** or **modular monolith** until pain is real. Microservices add **gateway, discovery, and ops** overhead in exchange for scale and team autonomy. Day 10 assumes a distributed layout — even if you're monolithic today, the patterns apply as you grow.

---

[Next: Service-to-Service Communication →](./02-service-to-service-communication.md)
