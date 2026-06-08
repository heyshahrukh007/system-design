# Dashboards and Alerting

[← Instrumentation](./07-instrumentation.md) | [Day 9 Index](./README.md) | [Next: SLO Alerting and Error Budgets →](./09-slo-alerting-and-error-budgets.md)

## Dashboards

Visualize metrics for humans — on-call, deploy reviews, capacity planning.

### Hierarchy

```
Level 1 — Executive / system health
  Overall availability, error rate, p99 latency

Level 2 — Service dashboard (per microservice)
  RED metrics, dependency error rates, queue depth

Level 3 — Deep dive
  DB connections, cache hit rate, JVM GC, per-endpoint latency
```

One screen for "is the platform OK?" — drill down from there.

---

## What Belongs on a Dashboard

| Include | Skip |
|---------|------|
| RED metrics per service | 50 nearly identical charts |
| Error rate over time | Raw CPU without context |
| Latency percentiles (p50, p95, p99) | Unlabeled counters |
| Queue depth, replication lag | Vanity metrics nobody acts on |
| Deploy markers | — |

Annotate deploys — correlates spikes with releases.

---

## Alerting Principles

Alerts must be **actionable**. If it pages a human, they must be able to **do something**.

### Alert on Symptoms

| Symptom (good) | Cause-only (weak alone) |
|----------------|-------------------------|
| Checkout error rate > 1% | CPU > 70% |
| p99 latency > 2s for 5 min | One pod restarted |
| SLO burn rate high | Disk usage changed 5% |

Symptoms map to **user impact**. Causes help diagnosis after symptom fires.

---

## Severity Levels

| Level | Response | Example |
|-------|----------|---------|
| **P1** | Page immediately | Checkout down, data loss |
| **P2** | Page business hours / urgent | Error rate 5× baseline |
| **P3** | Ticket next day | Disk 80%, cert expires in 14d |
| **P4** | Info | Deploy completed, autoscale event |

---

## Good vs Bad Alerts

| Bad | Good |
|-----|------|
| Any single 500 error | Error rate > 1% for 5 min |
| CPU > 50% | CPU > 90% for 10 min **and** latency elevated |
| "Pod restarted once" | Restart loop > 3 in 10 min |

**Alert fatigue** kills on-call — prune quarterly.

---

## Runbooks

Every P1/P2 alert links to a **runbook**:

```
Alert: order-service error rate high
Runbook:
  1. Check payment-service dashboard
  2. Check recent deploys
  3. Search logs: trace_id from example error
  4. Escalate to payments team if Stripe 503
```

From [Day 7 DR runbooks](../day-07/10-failover-and-disaster-recovery.md) — same discipline for incidents.

---

## Alert Routing

```
P1 → PagerDuty → primary on-call
P2 → Slack + on-call during business hours
P3 → Jira ticket
```

Avoid duplicate alerts — aggregate by service and symptom.

---

## Summary

**Dashboards** visualize RED/USE metrics at system and service levels. **Alert** on user-facing symptoms with clear severity. Link **runbooks** to every page-worthy alert. Prune noise aggressively.

---

[Next: SLO Alerting and Error Budgets →](./09-slo-alerting-and-error-budgets.md)
