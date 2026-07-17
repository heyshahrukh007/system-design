# Service-to-Service Communication

[← Monolith vs Microservices](./01-monolith-vs-microservices.md) | [Day 8 Index](./README.md) | [Next: Why API Gateway →](./03-why-api-gateway.md)

## Sync vs Async

| | Synchronous | Asynchronous |
|---|-------------|--------------|
| Caller waits | Yes | No |
| Protocol | HTTP, gRPC | Queue, event bus |
| Use when | Need immediate answer | Side effects, fan-out |
| Coupling | Tighter | Looser |

See [Day 6: Sync vs Async](../day-06/03-sync-vs-async-communication.md).

```
User checkout (sync):  API → Payment Service → response
Order placed (async):  Order Service → queue → Email, Inventory, Analytics
```

Most systems use **both**.

---

## TCP vs UDP (Transport Choice)

| | **TCP** | **UDP** |
|--|---------|---------|
| Connection | Reliable, ordered stream | Datagrams, no guarantee |
| Overhead | Handshake, retransmit | Lower latency |
| Typical use | HTTP, gRPC, databases | DNS, video/voice, gaming, metrics firehose |

```
Almost all service APIs: TCP (HTTP/1.1, HTTP/2, TLS)
Real-time media / custom discovery: often UDP (+ app-level reliability)
```

System design default: **TCP** for APIs. Choose UDP only when you explicitly need low latency and can tolerate or repair loss.

---

## REST (HTTP + JSON)

Default for public and internal APIs.

```
GET    /users/123
POST   /orders
PUT    /users/123
DELETE /carts/items/5
```

| Pros | Cons |
|------|------|
| Universal, browser-friendly | Verbose, no strict schema |
| Easy to debug (curl) | Over-fetching / under-fetching |
| Caching with HTTP semantics | Multiple round trips |

**Internal calls:** same patterns, often with service auth headers.

See [Day 2: API Design](../day-02/09-api-design.md) for REST principles.

---

## gRPC (HTTP/2 + Protobuf)

Binary protocol with **strong contracts**.

```protobuf
service OrderService {
  rpc GetOrder(GetOrderRequest) returns (Order);
  rpc CreateOrder(CreateOrderRequest) returns (Order);
}
```

| Pros | Cons |
|------|------|
| Fast, compact | Not browser-native (needs grpc-web) |
| Code generation from schema | Learning curve |
| Streaming support | Load balancer needs HTTP/2 aware |
| Ideal service-to-service | |

**Use for:** internal high-throughput calls (order → inventory).

---

## GraphQL

Client specifies **exact fields** needed — single endpoint.

```graphql
query {
  user(id: "123") {
    name
    orders { id total }
  }
}
```

| Pros | Cons |
|------|------|
| Flexible for clients | Complexity at server |
| Reduces over-fetching | N+1 query risk |
| One round trip | Harder to cache at CDN |

**Use for:** mobile/web clients with varied data needs. Often exposed **through API Gateway**, not service-to-service.

---

## Choosing a Protocol

| Scenario | Choice |
|----------|--------|
| Public REST API | REST |
| Mobile app, flexible UI | GraphQL at gateway |
| Internal service calls, performance | gRPC |
| Fire-and-forget events | Kafka, SQS ([Day 6](../day-06/README.md)) |
| Browser real-time | WebSocket |

```
Typical stack:
  Client ──REST/GraphQL──▶ API Gateway ──gRPC──▶ internal services
                                    ──queue──▶ async workers
```

---

## Service-to-Service Auth

Internal calls must be authenticated — not open on private network.

| Method | Detail |
|--------|--------|
| **mTLS** | Mutual TLS — both sides present certs |
| **Service JWT** | Short-lived token issued by auth service |
| **API key** | Shared secret per service (simpler) |
| **Mesh identity** | Sidecar handles mTLS automatically ([11](./11-service-mesh-introduction.md)) |

Never trust "private VPC" alone.

---

## Timeouts, Retries, Circuit Breakers

Every service call needs reliability patterns from [Day 7](../day-07/README.md):

```
Order → Inventory (gRPC)
  timeout: 2 s
  retry: 2× with backoff (idempotent read)
  circuit breaker: open after 5 failures
```

---

## API Versioning (Service Contracts)

Services evolve independently — version internal APIs.

```
/v1/orders  →  legacy consumers
/v2/orders  →  new fields, breaking changes

gRPC: package versioning, new RPC methods
```

Gateway can route `/api/v1/*` → v1 backends, `/api/v2/*` → v2.

---

## Summary

**REST** for public and general use. **gRPC** for fast internal RPC. **GraphQL** for flexible client queries at the gateway. **Queues** for async. Combine sync calls with Day 7 reliability patterns and authenticate every hop.

---

[Next: Why API Gateway →](./03-why-api-gateway.md)
