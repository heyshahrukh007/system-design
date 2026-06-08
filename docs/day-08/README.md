# Day 8 — API Gateway & Service Discovery

How traffic enters a distributed system, routes to the right service, and finds healthy instances — gateway responsibilities, discovery patterns, and the path from monolith to mesh.

See also: [Day 3: Reverse Proxy](../day-03/04-reverse-proxy.md), [Day 3: Load Balancer](../day-03/03-load-balancer.md), [Day 3: Microservices](../day-03/09-microservices-and-workers.md).

## Topics

| # | Topic | File |
|---|-------|------|
| 1 | [Monolith vs Microservices](./01-monolith-vs-microservices.md) | When to split, trade-offs |
| 2 | [Service-to-Service Communication](./02-service-to-service-communication.md) | REST, gRPC, GraphQL, sync vs async |
| 3 | [Why API Gateway](./03-why-api-gateway.md) | Single entry point |
| 4 | [API Gateway Responsibilities](./04-api-gateway-responsibilities.md) | SSL, routing, transform, aggregate |
| 5 | [Routing and Load Balancing](./05-routing-and-load-balancing.md) | Path-based, host-based, LB at gateway |
| 6 | [Authentication and Authorization](./06-authentication-and-authorization.md) | JWT, API keys, OAuth at edge |
| 7 | [Rate Limiting at Gateway](./07-rate-limiting-at-gateway.md) | Throttling, quotas |
| 8 | [Service Discovery](./08-service-discovery.md) | How services find each other |
| 9 | [Client-Side vs Server-Side Discovery](./09-client-side-vs-server-side-discovery.md) | Eureka, Consul, K8s DNS |
| 10 | [Health Checks](./10-health-checks.md) | Liveness, readiness, gateway integration |
| 11 | [Service Mesh Introduction](./11-service-mesh-introduction.md) | Istio, Envoy, sidecars |
| 12 | [Real-World Flow](./12-real-world-flow.md) | End-to-end request walkthrough |

## Reading Order

Read 1 → 12 in sequence. Topics 1–2 set context; 3–7 cover the gateway; 8–11 cover discovery and mesh; 12 ties everything together.

## Key Takeaways

- **API Gateway** is the public front door — routing, auth, rate limits in one place.
- **Service discovery** lets services find instances without hardcoded IPs.
- **Server-side discovery** (load balancer + registry) is common in cloud/Kubernetes.
- Gateway handles **north-south** traffic; **service mesh** often handles **east-west**.
- Start simple (gateway + K8s DNS) before adopting a full mesh.

## Related

- [Day 3: Request Journey](../day-03/01-request-journey.md)
- [Day 6: Sync vs Async](../day-06/03-sync-vs-async-communication.md)
- [Day 7: Reliability](../day-07/README.md)
- [Day 9: Observability](../day-09/README.md)
- [Day 2: API Design](../day-02/09-api-design.md)
