# Bulkhead Pattern

[← Circuit Breaker](./07-circuit-breaker.md) | [Day 7 Index](./README.md) | [Next: Graceful Degradation →](./09-graceful-degradation.md)

## The Idea

Named after ship bulkheads — watertight walls that contain flooding to one section.

**Bulkhead** isolates resources so failure in one area doesn't drain the entire system.

```
Without bulkhead:
  Slow payment calls consume ALL threads
  Browse, search, cart — also starved

With bulkhead:
  Payment pool: 20 threads (saturated)
  Browse pool:   80 threads (still healthy)
```

---

## Thread Pool Bulkhead

Separate thread pools per dependency or feature.

```
Order Service thread pools:
  checkout_pool:     30 threads → payment, inventory
  read_pool:         50 threads → order history, status
  background_pool:   20 threads → async notifications

Checkout slow → only checkout_pool affected
```

```java
// Resilience4j ThreadPoolBulkhead
ThreadPoolBulkhead paymentBulkhead = ThreadPoolBulkhead.of("payment",
    ThreadPoolBulkheadConfig.custom()
        .maxThreadPoolSize(20)
        .queueCapacity(10)
        .build());
```

---

## Connection Pool Bulkhead

Separate DB connection pools per service area.

```
Pool A: 20 connections → checkout (critical)
Pool B: 30 connections → reporting (non-critical)

Heavy report query can't steal all connections from checkout
```

See [Day 4: Connection Pooling](../day-04/10-connection-pooling.md).

---

## Service Bulkhead

Deploy critical and non-critical workloads on **separate infrastructure**.

```
Cluster 1: checkout, payment (strict SLO)
Cluster 2: analytics, batch jobs (best effort)

Batch job CPU spike → doesn't affect checkout cluster
```

Kubernetes: separate deployments, resource limits, node pools.

---

## Semaphore Bulkhead

Limit concurrent calls to a dependency without full thread pool.

```
Max 10 concurrent calls to Recommendation API
Request 11 waits or fails immediately

Recommendation slow → max 10 threads stuck, not unlimited
```

Lighter weight than separate thread pools.

---

## Bulkhead vs Circuit Breaker

| Bulkhead | Circuit Breaker |
|----------|-----------------|
| Limits resource sharing | Stops calls after failures |
| Prevents starvation | Prevents wasted calls to dead service |
| Proactive isolation | Reactive to failure rate |

Use **together** — bulkhead contains blast radius; breaker stops hammering dead dependency.

---

## Queue as Bulkhead

[Message queue](../day-06/01-why-queues.md) decouples producers from consumer capacity.

```
API publishes to queue (fast)
Workers consume at fixed rate (100/s)

Spike of 10,000/s → queue absorbs → workers drain steadily
API thread pool unaffected
```

---

## Bulkhead Sizing

```
Too small:  legitimate traffic rejected under load
Too large:  no isolation benefit

Start with:
  measure peak concurrent calls per dependency
  pool size = peak × 1.5
  monitor rejections and queue depth
```

---

## Failure When Bulkhead Full

When pool exhausted:

```
Options:
  1. Fail fast — return 503 immediately
  2. Queue briefly — small wait queue (bounded)
  3. Shed load — drop low-priority requests

Never block unbounded — that recreates the problem
```

---

## Summary

Bulkhead **isolates resources** — thread pools, connection pools, or clusters per feature or dependency. One slow area can't exhaust shared capacity. Combine with circuit breakers and size pools from measured concurrency.

---

[Next: Graceful Degradation →](./09-graceful-degradation.md)
