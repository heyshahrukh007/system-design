# The Three Pillars

[← Monitoring vs Observability](./02-monitoring-vs-observability.md) | [Day 9 Index](./README.md) | [Next: Structured Logging →](./04-structured-logging.md)

## Logs, Metrics, Traces

The foundation of modern observability. Each answers different questions.

| Pillar | Question | Granularity | Cost |
|--------|----------|-------------|------|
| **Logs** | What happened? | Per event | Higher volume |
| **Metrics** | How much / how fast? | Aggregated over time | Efficient |
| **Traces** | Where did time go? | Per request path | Medium (with sampling) |

Use all three — they reinforce each other.

---

## Logs

Discrete **events** with context.

```json
{
  "timestamp": "2025-06-19T10:30:00Z",
  "level": "ERROR",
  "service": "order-service",
  "trace_id": "abc123",
  "request_id": "req-789",
  "message": "payment_failed",
  "error": "upstream timeout",
  "duration_ms": 30012
}
```

**Best for:** errors, audit trails, business events, debugging specific requests.

See [04-structured-logging.md](./04-structured-logging.md).

---

## Metrics

**Numerical** measurements over time — cheap to store and alert on.

| Type | Behavior | Example |
|------|----------|---------|
| **Counter** | Only increases | `http_requests_total` |
| **Gauge** | Up or down | `queue_depth`, `active_connections` |
| **Histogram** | Distribution | `http_request_duration_seconds` |

**Best for:** dashboards, SLOs, capacity planning, alerts.

See [05-metrics-red-and-use.md](./05-metrics-red-and-use.md).

---

## Traces

End-to-end path of one request across services.

```
Trace abc123 (total 245ms)
├── API Gateway           12ms
├── Order Service        180ms
│   ├── validate_cart     5ms
│   ├── DB insert        45ms
│   └── Payment Service  120ms
│       └── Stripe API   115ms
└── response              3ms
```

**Best for:** latency analysis, dependency mapping, microservices debugging.

See [06-distributed-tracing.md](./06-distributed-tracing.md).

---

## How They Work Together

```
1. Alert: error rate > 1% (metric)
2. Dashboard: spike on order-service (metric by label)
3. Logs: filter trace_id, see "Stripe timeout" (log)
4. Trace: open slow trace, 11s in payment (trace)
5. Fix: reduce payment timeout, open circuit (reliability)
```

---

## Events (Optional Fourth)

Some teams add **events** or **analytics** streams (deploy markers, feature flags, business KPIs). Overlaps with logs but often separate tooling.

```
deploy_event: order-service v2.4.1 at 10:40 UTC
→ correlate latency change with deploy
```

---

## Anti-Pattern: One Pillar Only

| Only logs | Can't alert efficiently; expensive at scale |
| Only metrics | No context for individual failures |
| Only traces | Miss aggregate trends; sampling gaps |

---

## Collection Stack (Typical)

```
Services → OpenTelemetry SDK / agent
         → Collector
         → Logs backend (Loki, ELK, CloudWatch)
         → Metrics backend (Prometheus, Datadog)
         → Trace backend (Jaeger, Tempo, X-Ray)
         → Grafana dashboards + alert manager
```

Tool names vary — patterns are universal.

---

## Summary

**Logs** tell what happened. **Metrics** show trends and power alerts. **Traces** show request flow across services. Production observability combines all three with shared correlation IDs.

---

[Next: Structured Logging →](./04-structured-logging.md)
