# Distributed Tracing

[← Metrics — RED and USE](./05-metrics-red-and-use.md) | [Day 9 Index](./README.md) | [Next: Instrumentation →](./07-instrumentation.md)

## The Problem

Monolith: one stack trace shows the full path.

Microservices: one checkout hits gateway → order → payment → inventory. Where did 2 seconds go?

**Distributed tracing** follows one request across all hops.

---

## Core Concepts

| Term | Meaning |
|------|---------|
| **Trace** | Entire journey of one request |
| **Span** | One unit of work (one service call, one DB query) |
| **Parent span** | Caller |
| **Child span** | Callee or sub-operation |
| **Trace ID** | Same ID across all spans in one trace |
| **Span ID** | Unique per span |

```
Trace ID: abc123
  Span: gateway (12ms)
    └─ Span: order-service (180ms)
         ├─ Span: db.insert (45ms)
         └─ Span: payment-service (120ms)
              └─ Span: stripe.api (115ms)
```

---

## Context Propagation

Trace context must pass on every outbound call.

```http
traceparent: 00-<trace-id>-<span-id>-01
```

| Layer | Responsibility |
|-------|----------------|
| **Gateway** | Start or continue trace, inject headers |
| **Services** | Extract context, create child spans, propagate |
| **Mesh sidecar** | Can auto-inject ([Day 8](../day-08/11-service-mesh-introduction.md)) |
| **Async queue** | Put trace_id in message ([Day 6](../day-06/06-message-design.md)) |

Broken propagation = trace stops at first hop — common bug.

---

## OpenTelemetry

Industry-standard APIs and SDKs for traces, metrics, and logs.

```
App code → OTel SDK → OTel Collector → Jaeger / Tempo / X-Ray
```

Auto-instrumentation exists for HTTP, gRPC, DB drivers — manual spans for business logic.

```python
with tracer.start_as_current_span("charge_payment"):
    stripe.charge(...)
```

---

## What Traces Reveal

| Question | Trace shows |
|----------|-------------|
| Which service is slow? | Longest span |
| N+1 calls? | Many repeated DB child spans |
| Retry storm? | Duplicate spans same dependency |
| Parallel vs serial? | Span timeline overlap |

Ties to [Day 4 N+1](../day-04/09-n-plus-one-query-problems.md) — visible as span fan-out.

---

## Sampling

Full tracing every request at 100K RPS is expensive.

| Strategy | Detail |
|----------|--------|
| **Head sampling** | Decide at start — trace 1% of requests |
| **Tail sampling** | Keep traces that are slow or errored |
| **Always sample errors** | Never drop failed checkout traces |

Production: sample most traffic, **keep all errors and high-latency** traces.

---

## Traces vs Logs

| Traces | Logs |
|--------|------|
| Request path and timing | Detailed error messages |
| Service dependency map | Business context, stack traces |
| Sampled | Complete detail per error when logged |

Link them with shared `trace_id` — click from trace to logs.

---

## Summary

**Traces** map request flow across services with spans and timing. Propagate **trace context** through gateway, HTTP, gRPC, and queues. Use **OpenTelemetry** and **sampling** for production scale.

---

[Next: Instrumentation →](./07-instrumentation.md)
