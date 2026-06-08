# Metrics — RED and USE

[← Structured Logging](./04-structured-logging.md) | [Day 9 Index](./README.md) | [Next: Distributed Tracing →](./06-distributed-tracing.md)

## Why Metrics?

Logs are rich but expensive at billions of events. **Metrics** aggregate — perfect for dashboards and alerts.

```
1 million requests/minute:
  Logs:  1M log lines/min → costly
  Metrics: 1 counter increment + histogram samples → cheap
```

---

## Metric Types

| Type | Behavior | Example |
|------|----------|---------|
| **Counter** | Monotonic increase | `http_requests_total`, `errors_total` |
| **Gauge** | Current value | `memory_bytes`, `queue_depth` |
| **Histogram** | Distribution in buckets | `request_duration_seconds` |

Counters reset only on process restart — use `rate()` over time windows in queries.

---

## RED Method (Services)

For each **request-driven service**:

| Letter | Metric | Meaning |
|--------|--------|---------|
| **R**ate | Requests per second | Load |
| **E**rrors | Failed requests per second | Reliability |
| **D**uration | Latency distribution | Performance |

```
order-service:
  rate(http_requests_total[5m])
  rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])
  histogram_quantile(0.99, http_request_duration_seconds)
```

Every HTTP/gRPC service should export RED metrics.

---

## USE Method (Resources)

For **infrastructure** — CPU, DB, cache, queues:

| Letter | Metric | Meaning |
|--------|--------|---------|
| **U**tilization | % time busy | CPU, disk, connection pool used |
| **S**aturation | Queue / wait depth | Threads waiting, disk queue |
| **E**rrors | Error count | Disk errors, timeouts |

```
PostgreSQL:
  Utilization: active_connections / max_connections
  Saturation:  queries waiting on locks
  Errors:      replication failures
```

From [Day 5](../day-05/10-distributed-cache.md): Redis hit rate, memory, evictions are USE-style metrics.

---

## Labels (Cardinality Warning)

Labels slice metrics — powerful but dangerous.

```
Good:  http_requests_total{service="order", method="POST", status="500"}
Bad:   http_requests_total{user_id="12345"}  ← millions of unique values
```

**High cardinality** explodes storage and query cost. Never label unbounded IDs as metric dimensions — use logs/traces for that.

---

## Golden Signals (Google SRE)

Related framework:

- **Latency** — request time
- **Traffic** — demand
- **Errors** — failure rate
- **Saturation** — how full the system is

RED + USE cover the same ground for services vs resources.

---

## Example Prometheus-Style Export

```
# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="POST",path="/orders",status="201"} 15432

# HELP http_request_duration_seconds Request latency
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.1"} 12000
http_request_duration_seconds_bucket{le="0.5"} 14800
```

Tools: Prometheus, Grafana, Datadog, CloudWatch — concepts transfer.

---

## Summary

Export **RED** metrics per service and **USE** metrics per resource. Use counters, gauges, and histograms. Keep label cardinality low. Metrics drive dashboards and SLO alerts ([09-slo-alerting-and-error-budgets.md](./09-slo-alerting-and-error-budgets.md)).

---

[Next: Distributed Tracing →](./06-distributed-tracing.md)
