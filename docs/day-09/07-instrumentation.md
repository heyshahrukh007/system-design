# Instrumentation

[← Distributed Tracing](./06-distributed-tracing.md) | [Day 9 Index](./README.md) | [Next: Dashboards and Alerting →](./08-dashboards-and-alerting.md)

## What Is Instrumentation?

Code and config that **emits** observability data — logs, metrics, traces.

```
Uninstrumented service:  "It's slow" — no data
Instrumented service:    p99, error rate, traces per endpoint
```

---

## What to Instrument

| Layer | Metrics | Logs | Traces |
|-------|---------|------|--------|
| **HTTP/gRPC handlers** | RED per route | Request start/end | Top-level span |
| **DB queries** | Latency, pool usage | Slow query warn | Child span per query |
| **Cache** | Hit/miss rate | — | Optional span |
| **External APIs** | Latency, errors | Timeout details | Child span |
| **Queue publish/consume** | Lag, process rate | Poison messages | Span per message |
| **Business events** | Orders created/min | order_id on success | — |

---

## Where to Start

Minimum viable instrumentation per service:

1. **Health endpoints** — liveness/readiness ([Day 8](../day-08/10-health-checks.md))
2. **RED metrics** on every API route
3. **Structured logs** with request_id
4. **Trace propagation** on inbound and outbound HTTP
5. **Error logging** with stack trace and correlation IDs

Add depth incrementally — don't block launch on 100% span coverage.

---

## Gateway Instrumentation

[API Gateway](../day-08/04-api-gateway-responsibilities.md) sees all north-south traffic — instrument heavily.

```
Per route:
  request rate, 4xx, 5xx, latency histogram
  rate limit rejections (429)

Access logs:
  method, path, status, duration, client_ip, user_id, request_id
```

Gateway generates `request_id` if client didn't send one.

---

## Auto vs Manual

| Auto-instrumentation | Manual |
|---------------------|--------|
| HTTP server/client, DB drivers | Business spans ("validate_cart") |
| Framework middleware | Custom metrics (orders_per_minute) |
| Fast to adopt | Domain-specific insight |

Use auto for plumbing; add manual spans at **critical business steps**.

---

## Cardinality and Cost

Instrument wisely:

```
Good metric:  checkout_duration_seconds{status="success|failure"}
Bad metric:   checkout_duration_seconds{user_id="..."}
```

Log volume control:

- INFO for request summary
- DEBUG off in prod or sampled
- ERROR always with context

---

## Instrumentation Checklist per Service

- [ ] `/health` and `/ready` endpoints
- [ ] Prometheus/OpenTelemetry metrics endpoint
- [ ] RED metrics with low-cardinality labels
- [ ] JSON logs to stdout (container-friendly)
- [ ] Propagate `X-Request-Id` and trace headers
- [ ] Log and metric on dependency failures (payment, DB)
- [ ] Document dashboards in team wiki

---

## Phased Rollout

| Phase | Add |
|-------|-----|
| **Dev** | Structured logs, health checks |
| **Staging** | Metrics, basic Grafana board |
| **Prod launch** | Alerts on 5xx rate, tracing with sampling |
| **Mature** | SLO dashboards, log-based metrics, runbooks |

---

## Summary

**Instrumentation** is deliberate emission of logs, metrics, and traces. Start with RED metrics, correlation IDs, and trace propagation at the gateway. Expand to DB, cache, and queue boundaries — match depth to production risk.

---

[Next: Dashboards and Alerting →](./08-dashboards-and-alerting.md)
