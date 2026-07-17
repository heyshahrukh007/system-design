# Why Observability?

[← Day 9 Index](./README.md) | [Next: Monitoring vs Observability →](./02-monitoring-vs-observability.md)

## The 2 AM Question

Checkout error rate jumps from 0.1% to 8%. Users complain on social media. On-call wakes up.

Without observability:

```
"Something is wrong with orders."
"Maybe the database?"
"Restart everything?"
```

With observability:

```
Error spike started 10:42 UTC
Trace shows Payment Service p99 = 12s (normal 200ms)
Stripe API timeout — 503 from upstream
Circuit breaker opened at 10:45
```

Same incident — minutes to root cause vs hours of guessing.

---

## What Is Observability?

**Observability** is the ability to understand internal system state from **external outputs** — logs, metrics, traces, and events.

You cannot SSH into every pod and printf-debug a distributed system at scale. You need centralized, searchable signals.

---

## Cost of Flying Blind

| Impact | Example |
|--------|---------|
| **Longer MTTR** | No traces → can't find slow dependency |
| **False fixes** | Restart app when DB is the problem |
| **Silent degradation** | Latency creeps up for weeks before alert |
| **Blame games** | "Works on my machine" across teams |
| **Customer churn** | Repeated slow checkout with no internal visibility |

From [Day 7](../day-07/02-reliability-metrics.md): lower **MTTR** improves availability. Observability is how you achieve fast MTTR.

---

## Observability vs Reliability

| Reliability | Observability |
|-------------|---------------|
| Survive failures | Detect and diagnose failures |
| Circuit breakers, redundancy | Logs, metrics, traces |
| Design patterns | Operations tooling |

Reliability patterns **need** observability to know they fired correctly.

```
Circuit breaker OPEN — did users see fallback or 500?
SLO error budget — how much downtime left this month?
```

---

## When You Need It Most

| Stage | Why |
|-------|-----|
| **Monolith, 1 server** | Logs on disk may suffice |
| **Multiple services** | Request crosses boundaries — need trace IDs |
| **Gateway + mesh** | North-south and east-west hops multiply |
| **Queues + async** | Failure happens minutes after publish |
| **On-call production** | Non-negotiable |

After [Day 8](../day-08/README.md), you have enough moving parts that observability is essential — not optional.

---

## Design Mindset

### Instrument Early

Adding metrics after launch means flying blind during the riskiest period.

### Optimize for Debugging

Every log line should help answer: *what request, what service, what failed?*

### Alert on Symptoms

Users care about checkout success — not that CPU is 62%.

---

## Summary

Observability reduces incident duration and guesswork. In distributed systems it is how engineers see across services, queues, and databases. Build it in from the start — especially after gateway, discovery, and mesh enter the picture.

---

[Next: Monitoring vs Observability →](./02-monitoring-vs-observability.md)
