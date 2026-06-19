# Health Checks

[← Client-Side vs Server-Side Discovery](./09-client-side-vs-server-side-discovery.md) | [Day 10 Index](./README.md) | [Next: Service Mesh Introduction →](./11-service-mesh-introduction.md)

## Purpose

Health checks tell **load balancers, gateways, and registries** which instances can receive traffic.

```
3 instances:
  A: healthy   → receives requests
  B: healthy   → receives requests
  C: failing   → removed from pool
```

Without health checks, traffic goes to dead instances — errors until manual intervention.

See [Day 9: Redundancy and HA](../day-09/04-redundancy-and-high-availability.md).

---

## Liveness vs Readiness

| Check | Question | Failure action |
|-------|----------|----------------|
| **Liveness** | Is process alive? | Restart container |
| **Readiness** | Can it handle traffic? | Remove from LB, don't restart |

```
App starts:
  Loading cache → readiness fails (not ready)
  Cache loaded → readiness passes → traffic flows

Deadlock:
  Liveness fails → orchestrator kills pod → new instance
```

Kubernetes defines both probe types explicitly.

---

## Shallow vs Deep Health

### Shallow

```
GET /health → 200 OK

Checks: process running, HTTP server up
Misses: database connection broken
```

### Deep

```
GET /health/ready
{
  "status": "ok",
  "checks": {
    "database": "ok",
    "redis": "ok",
    "disk": "ok"
  }
}

Any critical check fails → 503
```

Deep checks for **readiness**; keep **liveness** lightweight (avoid restart loops on slow DB).

---

## Gateway Integration

```
Gateway upstream health:
  Poll GET /health on each backend every 10s
  3 failures → mark down, stop routing
  Recovery → add back to pool

Or: use service discovery that already filters unhealthy (Consul, K8s endpoints)
```

---

## Health Check Parameters

| Parameter | Typical |
|-----------|---------|
| Interval | 10–30 s |
| Timeout | 2–5 s |
| Healthy threshold | 2 consecutive successes |
| Unhealthy threshold | 3 consecutive failures |

Aggressive checks → false positives. Slow checks → traffic to dead nodes longer.

---

## Graceful Shutdown

```
1. SIGTERM received
2. Mark readiness = failing (LB stops new traffic)
3. Finish in-flight requests (30 s grace)
4. Close connections, exit

Prevents: kill mid-request → user error + duplicate on retry
```

Align `terminationGracePeriodSeconds` with max request duration.

---

## Health Checks and Cascading Failure

```
Database slow → all apps fail deep health → all removed from LB → total outage

Fix:
  - Readiness checks only critical deps
  - Degraded mode: readiness passes, feature flags disable DB-heavy paths
  - Circuit breaker on DB before health fails
```

---

## Summary

**Liveness** restarts broken processes; **readiness** controls traffic routing. Use **deep checks** for dependencies on readiness only. Gateway and discovery consume health status to route around failed instances. Implement **graceful shutdown** to drain connections safely.

---

[Next: Service Mesh Introduction →](./11-service-mesh-introduction.md)
