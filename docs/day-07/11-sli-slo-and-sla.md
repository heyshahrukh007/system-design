# SLI, SLO, and SLA

[← Failover and DR](./10-failover-and-disaster-recovery.md) | [Day 7 Index](./README.md) | [Next: Designing for Failure →](./12-designing-for-failure.md)

## Why Measure Reliability?

You can't improve what you don't measure. SLIs, SLOs, and SLAs turn reliability into **concrete numbers** teams can engineer toward.

---

## Definitions

| Term | Meaning | Audience |
|------|---------|----------|
| **SLI** | Service Level Indicator — what you measure | Engineering |
| **SLO** | Service Level Objective — internal target | Engineering + product |
| **SLA** | Service Level Agreement — contract with consequences | Customers |

```
SLI:  actual measurement (99.95% availability this month)
SLO:  internal goal (target 99.9%)
SLA:  promise to customer (99.9% or credit refund)
```

**SLO should be stricter than SLA** — buffer before breaching contract.

---

## Common SLIs

| SLI | Measurement |
|-----|-------------|
| **Availability** | successful requests / total requests |
| **Latency** | % of requests faster than threshold (p99 < 300 ms) |
| **Error rate** | 5xx responses / total responses |
| **Throughput** | requests handled per second |
| **Data freshness** | % of reads within N seconds of write |
| **Correctness** | % of responses matching validation |

### Availability SLI

```
Availability = successful_requests / total_valid_requests

Exclude:
  client errors (4xx) — usually user's fault
  deliberate load shed with 503 (document policy)

Include:
  5xx server errors
  timeouts from user perspective
```

### Latency SLI

```
Latency SLI = requests with duration < 300 ms / total requests

Or: p99 latency < 500 ms over 28-day window
```

---

## Setting SLOs

```
Too loose:  users unhappy before SLO fires
Too tight:  team can't ship features (no error budget)

Start from:
  1. User expectations (what feels broken?)
  2. Historical performance (what's achievable?)
  3. Business tier (free vs enterprise)
```

| Service | Example SLO |
|---------|-------------|
| Public API | 99.9% availability, p99 < 500 ms |
| Internal batch | 99% jobs complete within 24 h |
| Payment path | 99.95% availability |

---

## Error Budget

Budget of acceptable unreliability.

```
SLO: 99.9% availability per month
Error budget: 0.1% = 43.8 minutes downtime/month

Budget remaining: 30 min → OK to ship risky deploy
Budget exhausted: 0 min → freeze features, focus on stability
```

Error budget connects reliability and velocity — not opposing forces.

```
High reliability SLO + aggressive shipping
  → only works if error budget tracked and respected
```

---

## SLA (Customer Contract)

```
SLA: 99.9% uptime per billing month
Breach: 10% service credit
Measurement: excluding scheduled maintenance (max 4 h/month)

SLA < internal SLO:
  SLO 99.95% internally
  SLA 99.9% to customer
  0.05% buffer for surprises
```

---

## Alerting on SLOs

Alert on **error budget burn rate**, not every blip.

```
Bad alert:  one 500 error → page on-call
Good alert:  burning 10% of monthly budget in 1 hour → page

Multi-window:
  Fast burn:  2% budget in 1 h → critical
  Slow burn:  10% budget in 6 h → ticket
```

See [Day 2: Observability](../day-02/11-observability-design.md).

---

## SLI Implementation

```
1. Instrument: metrics on every request (Prometheus, Datadog)
2. Aggregate: rolling 28-day or calendar month window
3. Dashboard: current SLI vs SLO line
4. Report: monthly reliability review
```

```promql
# Availability SLI (simplified)
sum(rate(http_requests_total{status!~"5.."}[28d]))
/
sum(rate(http_requests_total[28d]))
```

---

## User Journeys vs Server Metrics

Measure SLIs on **user-visible paths**, not just server up/down.

```
Checkout SLI:
  success = payment completed within 30 s
  not just "API returned 200"
```

Synthetic monitoring probes critical flows from outside.

---

## Summary

**SLI** measures reliability. **SLO** sets internal targets. **SLA** commits to customers with consequences. Use **error budgets** to balance shipping and stability. Alert on budget burn, not raw error counts.

---

[Next: Designing for Failure →](./12-designing-for-failure.md)
