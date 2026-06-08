# Observability in Microservices

[← Log Aggregation](./10-log-aggregation.md) | [Day 9 Index](./README.md)

## Why Microservices Change Observability

Monolith: one process, one log stream, one stack trace.

After [Day 8](../day-08/README.md):

```
Client → Gateway → Order → Payment → Inventory
              ↘ Notification (async queue)
```

Failure can occur on **any hop**, minutes later on async path. You need **correlation** across boundaries.

---

## North-South vs East-West Visibility

| Traffic | Path | Observability focus |
|---------|------|---------------------|
| **North-south** | Client → gateway → services | Access logs, WAF, rate limits |
| **East-west** | Service ↔ service | Mesh traces, mTLS metrics, service graph |

Gateway sees external latency; **traces** see internal fan-out.

---

## Gateway Responsibilities

Single place to enforce:

- Generate/propagate `X-Request-Id` and `traceparent`
- Access logs with route, status, duration, user
- Per-route RED metrics
- Optional WAF / bot signals in logs

Downstream services **trust forwarded headers** — don't regenerate new IDs mid-chain.

---

## Service Mesh Observability

[Service mesh](../day-08/11-service-mesh-introduction.md) sidecars add without app code changes:

- Automatic mTLS and span export
- Per-service traffic metrics
- Service dependency graph

```
App → localhost Envoy → remote Envoy → app
         ↑ spans and metrics here
```

Mesh complements app instrumentation — doesn't replace business logs.

---

## Async and Queues

Sync traces end at HTTP response. Async work continues.

```
Order API returns 201
  → publishes order.created (include trace_id in message)
  → worker processes 30s later

Debug: search logs by trace_id across API and consumer
```

From [Day 6](../day-06/06-message-design.md): `correlation_id` and `trace_id` in message metadata.

---

## Service Ownership

Each team owns:

- Service dashboard (RED)
- Runbooks for their alerts
- Log field conventions (shared schema across org)

Platform team provides: collector, Grafana, alerting rules template, OpenTelemetry libraries.

---

## Dependency Maps

Tracing backends build **service graphs** automatically:

```
order-service → payment-service (120ms avg)
             → inventory-service (45ms avg)
             → postgres-order (30ms avg)
```

Useful for onboarding and finding unexpected coupling.

---

## Common Failures

| Problem | Symptom | Fix |
|---------|---------|-----|
| Broken trace propagation | Trace stops at gateway | Fix header forwarding |
| Different ID per service | Can't correlate logs | Single request_id at edge |
| Missing async linkage | Worker logs orphaned | trace_id in queue message |
| High-cardinality metrics | Cost explosion | Drop user_id labels |

---

## Summary

Microservices require **end-to-end correlation** — gateway generates IDs, services propagate traces, queues carry context. Combine **gateway metrics**, **app instrumentation**, and optional **mesh** telemetry for full picture.

---

[← Log Aggregation](./10-log-aggregation.md) | [Day 9 Index](./README.md)
