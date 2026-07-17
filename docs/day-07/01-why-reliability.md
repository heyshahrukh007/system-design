# Why Reliability?

[← Day 7 Index](./README.md) | [Next: Reliability Metrics →](./02-reliability-metrics.md)

## What Goes Wrong Without It

A system that works in development often breaks in production:

```
Payment API slow for 30 seconds
  → thread pool exhausted
  → all checkout requests timeout
  → entire site appears down
```

One failing dependency took down everything. That's a **reliability** problem — not a feature bug.

---

## Cost of Downtime

| Impact | Example |
|--------|---------|
| **Revenue** | E-commerce down 1 hour during sale → direct lost sales |
| **Trust** | Users switch to competitor after repeated outages |
| **SLA penalties** | Enterprise contracts with refund clauses |
| **Engineering cost** | Emergency pages, postmortems, firefighting |
| **Data loss** | Unrecoverable transactions, legal exposure |

```
99.9% uptime  = ~8.7 hours downtime/year
99.99% uptime = ~52 minutes downtime/year

For a $10M/year revenue site:
  1 hour outage during peak ≈ $10K+ lost (varies by business)
```

Reliability is not free — but outages are often more expensive.

---

## Reliability vs Performance vs Scalability

| Concern | Question |
|---------|----------|
| **Performance** | How fast for one request? |
| **Scalability** | How many requests can we handle? |
| **Reliability** | Does it keep working when things fail? |

A fast system that crashes under dependency failure is unusable.  
A scalable system with no redundancy loses all capacity when one node dies.

All three matter. Reliability ensures **the system survives reality**.

---

## The Design Mindset

### Hope Is Not a Strategy

```
Bad:  "The database won't fail."
Good: "When the database fails, read replicas take over in < 30 s."
```

### Fail Fast, Recover Fast

Detect problems quickly. Don't let bad state spread. Restore service automatically where possible.

### Blast Radius

Limit how far failure spreads.

```
Bad:  one service crash → entire monolith down
Good: payment service down → checkout disabled, browsing still works
```

### Defense in Depth

Multiple layers of protection:

```
Timeouts → Retries → Circuit breaker → Bulkhead → Graceful degradation → Failover
```

---

## Where Reliability Shows Up

| Layer | Example |
|-------|---------|
| **Infrastructure** | Multi-AZ, load balancer health checks |
| **Application** | Circuit breakers, timeouts, idempotent retries |
| **Data** | Replication, backups, failover |
| **Operations** | Monitoring, alerts, runbooks, on-call |
| **Process** | Canary deploys, rollbacks, chaos tests |

From the [request journey](../day-03/01-request-journey.md): DNS, load balancer, and DB can each fail independently — reliability design addresses each layer.

---

## How Much Reliability Do You Need?

Not every system needs five nines.

| System | Typical target |
|--------|----------------|
| Internal admin tool | 99% |
| B2C web app | 99.9% |
| Payment platform | 99.95% – 99.99% |
| Medical / safety critical | 99.999%+ |

Higher reliability costs more — redundant infra, more engineering, slower deploys. Match investment to business impact.

---

## Summary

Reliability keeps systems working when components fail. Downtime costs revenue and trust. Design assuming failure, limit blast radius, and invest in reliability proportional to business need.

---

[Next: Reliability Metrics →](./02-reliability-metrics.md)
