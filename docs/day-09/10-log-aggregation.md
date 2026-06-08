# Log Aggregation

[← SLO Alerting and Error Budgets](./09-slo-alerting-and-error-budgets.md) | [Day 9 Index](./README.md) | [Next: Observability in Microservices →](./11-observability-in-microservices.md)

## Why Centralize Logs?

```
50 app instances × local log files
  → SSH into random pod to grep
  → pod dies → logs gone
  → incident takes hours
```

**Log aggregation** ships all logs to one searchable system.

```
Every pod → stdout (JSON)
         → log agent (Fluent Bit, Promtail)
         → central store (Loki, ELK, CloudWatch)
         → search UI (Grafana, Kibana)
```

---

## Collection Pattern

Containers should log to **stdout/stderr** — platform collects.

```
App writes JSON to stdout
Kubernetes / VM agent tails container logs
Agent batches and forwards with labels:
  service, environment, pod, host
```

Don't write log files inside containers without shipping — ephemeral disks lose data.

---

## Search and Query

Structured JSON enables powerful filters:

```
service="order-service"
level="ERROR"
request_id="req-789"

trace_id="abc123"  → all logs for one distributed request
```

Plain text grep across terabytes is slow — structure matters ([04-structured-logging.md](./04-structured-logging.md)).

---

## Retention

| Tier | Retention | Use |
|------|-----------|-----|
| **Hot** | 7–30 days | Active debugging, on-call |
| **Warm** | 30–90 days | Incident review, audits |
| **Cold/archive** | 1–7 years | Compliance (if required) |

Longer retention = higher cost. Don't keep DEBUG forever.

---

## Log Volume Control

| Technique | Detail |
|-----------|--------|
| Log level per env | DEBUG dev only |
| Sampling | Sample noisy info logs |
| Drop health checks | `/health` 200 not logged at INFO |
| Aggregation | Metric from logs for counts |

---

## Security

- **No secrets** in logs — tokens, passwords, PAN
- **PII policy** — mask or omit per regulation
- **Access control** — production logs restricted
- **Encryption** in transit and at rest

---

## Log-Based Metrics

Some platforms derive metrics from log streams:

```
Count ERROR lines per minute → alert
"payment timeout" string rate → dashboard
```

Useful when code can't be changed quickly — prefer native metrics long-term.

---

## Common Stacks

| Stack | Components |
|-------|------------|
| **ELK** | Elasticsearch, Logstash/Fluentd, Kibana |
| **Loki** | Promtail, Grafana Loki, Grafana |
| **Cloud** | CloudWatch Logs, GCP Logging, Azure Monitor |

Concepts identical — pick based on ops preference and cost.

---

## Summary

Ship **structured logs** to a **central store** with retention tiers. Search by `request_id` and `trace_id` across all services. Control volume and protect sensitive data.

---

[Next: Observability in Microservices →](./11-observability-in-microservices.md)
