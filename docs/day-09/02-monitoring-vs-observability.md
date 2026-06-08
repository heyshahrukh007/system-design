# Monitoring vs Observability

[← Why Observability?](./01-why-observability.md) | [Day 9 Index](./README.md) | [Next: The Three Pillars →](./03-three-pillars.md)

## Two Related Ideas

Teams often conflate them. Both matter.

| Monitoring | Observability |
|------------|---------------|
| "Is the system healthy?" | "Why is checkout slow for EU users?" |
| Predefined dashboards and alerts | Explore unknown questions |
| Known failure modes | Novel / first-time failures |
| Threshold-based | Hypothesis-driven debugging |
| Reactive paging | Investigative drill-down |

```
Monitoring:  CPU > 90% for 10 min → page
Observability: p99 latency up 3× → trace → DB replica lag → root cause
```

---

## Known vs Unknown Unknowns

**Monitoring** handles **known** problems you anticipated:

- Service down (health check fails)
- Disk > 90%
- Error rate > 1% for 5 minutes
- Queue depth > 10,000

**Observability** handles **unknown** problems:

- "Latency doubled after deploy — which dependency?"
- "Only Android clients fail — why?"
- "Errors correlate with one shard — which query?"

You explore with logs, metrics labels, and traces — questions you didn't pre-build alerts for.

---

## You Need Both

```
Monitoring without observability:
  Alert fires → engineer has no data to debug

Observability without monitoring:
  Rich data exists → nobody notified when users suffer
```

Production standard:

1. **Monitor** SLIs and symptoms (alert when bad)
2. **Observe** with high-cardinality logs and traces (debug why)

---

## Health Checks vs Observability

[Day 8 health checks](../day-08/10-health-checks.md) are **monitoring** — binary up/down.

Observability goes deeper:

```
Health:     instance returns 200 on /health
Observable: instance slow on DB queries, elevated GC, retry storms
```

An instance can be "healthy" yet degrade user experience.

---

## Metrics Alone Are Not Enough

Counters and gauges show **that** something changed. Traces and logs show **where** and **context**.

```
Metric:  http_errors_total{service="order"} doubled
Log:     "Stripe timeout" with order_id, user_id
Trace:   11s spent in payment-service → external API
```

---

## Summary

**Monitoring** watches known signals and pages on thresholds. **Observability** lets you ask new questions when monitors fire or users complain. Use monitoring for detection; use logs, metrics, and traces together for diagnosis.

---

[Next: The Three Pillars →](./03-three-pillars.md)
