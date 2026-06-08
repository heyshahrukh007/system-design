# SLO Alerting and Error Budgets

[← Dashboards and Alerting](./08-dashboards-and-alerting.md) | [Day 9 Index](./README.md) | [Next: Log Aggregation →](./10-log-aggregation.md)

## Connecting Observability to SLOs

[Day 7](../day-07/11-sli-slo-and-sla.md) defined **SLI**, **SLO**, **SLA**, and **error budget**. Observability **measures** SLIs and **alerts** when budgets burn too fast.

```
SLI:  % successful checkout requests (non-5xx, < 30s)
SLO:  99.9% per 30-day window
Error budget: 0.1% ≈ 43.2 min/month of bad requests
```

---

## SLI Implementation

Instrument the **user journey**, not just server up/down.

```
Good SLI:
  checkout_completed / checkout_attempted
  (payment succeeded within 30s)

Weak SLI:
  process_running == 1
```

Use metrics with labels matching SLI definition. Log failures with reason codes for drill-down.

---

## Error Budget

Budget = allowed unreliability.

```
SLO 99.9% → budget 0.1%

Budget remaining high  → OK to ship risky features
Budget exhausted       → freeze deploys, fix stability
```

Product and engineering share the budget — not opposing teams.

---

## Burn Rate Alerting

Alert on **how fast** budget is consumed — not every blip.

| Window | Meaning |
|--------|---------|
| **Fast burn** | 2% of monthly budget gone in 1 hour → page now |
| **Slow burn** | 10% of monthly budget gone in 6 hours → ticket |

```
Bad:  single 500 → wake on-call
Good: burning budget 10× normal rate → page
```

Google SRE multi-window, multi-burn-rate alerts — industry best practice.

---

## SLO Dashboard

Show operators:

- Current SLI (rolling 30 days)
- SLO target line
- Error budget remaining (% or minutes)
- Burn rate trend

Visible in Grafana/Datadog — one glance answers "can we deploy today?"

---

## SLA vs SLO Alerting

| SLO alert | SLA alert |
|-----------|-----------|
| Internal — act before customers breach contract | Customer-facing — credits, penalties |
| Stricter threshold | Looser threshold |

Internal SLO 99.95%, external SLA 99.9% — alert at SLO, not SLA.

---

## Example Checkout SLO

```
SLI measurement:
  sum(rate(checkout_success_total[30d]))
  /
  sum(rate(checkout_attempts_total[30d]))

Alerts:
  - Fast burn: budget loss > 2% in 1h → P1
  - Slow burn: budget loss > 5% in 6h → P2
  - Budget < 10% remaining → deploy freeze notification
```

---

## Summary

Measure **SLIs** with metrics on user-visible paths. Track **error budgets** on dashboards. Alert on **burn rate**, not isolated errors. Tie observability directly to reliability commitments from Day 7.

---

[Next: Log Aggregation →](./10-log-aggregation.md)
