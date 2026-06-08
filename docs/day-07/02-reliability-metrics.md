# Reliability Metrics

[← Why Reliability](./01-why-reliability.md) | [Day 7 Index](./README.md) | [Next: Failure Modes and SPOF →](./03-failure-modes-and-spof.md)

## Core Metrics

| Metric | Definition | Use |
|--------|------------|-----|
| **Availability** | % of time system is up and serving correctly | SLA commitments |
| **MTBF** | Mean Time Between Failures | How often things break |
| **MTTR** | Mean Time To Recover / Repair | How fast you fix |
| **RPO** | Recovery Point Objective — max acceptable data loss | Backup frequency |
| **RTO** | Recovery Time Objective — max acceptable downtime | Failover speed |

```
Availability ≈ MTBF / (MTBF + MTTR)

Lower MTTR → higher availability (even with same failure rate)
```

---

## Availability and the Nines

| Availability | Downtime / Year | Downtime / Month |
|--------------|-----------------|------------------|
| 99% (two nines) | 3.65 days | 7.2 hours |
| 99.9% (three nines) | 8.76 hours | 43.8 minutes |
| 99.95% | 4.38 hours | 21.9 minutes |
| 99.99% (four nines) | 52.6 minutes | 4.4 minutes |
| 99.999% (five nines) | 5.26 minutes | 26 seconds |

Each additional nine is roughly **10× harder** to achieve.

```
99.9%  → 43 min/month budget
99.99% → 4 min/month budget

Planned maintenance, deploys, and incidents all consume the budget.
```

---

## MTBF and MTTR

### MTBF (Mean Time Between Failures)

Average time between incidents.

```
10 failures in 8760 hours (1 year)
MTBF = 8760 / 10 = 876 hours (~36 days between failures)
```

Improve by: better hardware, fewer bugs, chaos testing to find weak points.

### MTTR (Mean Time To Recover)

Average time from incident start to restored service.

```
Incident timeline:
  10:00 — alert fires
  10:05 — on-call acknowledges
  10:25 — root cause fixed, service restored
  MTTR = 25 minutes
```

Improve by: monitoring, runbooks, automation, practice (game days).

---

## RPO and RTO (Disaster Recovery)

### RPO — Recovery Point Objective

How much data you can afford to **lose**.

```
RPO = 1 hour → backups every hour → worst case lose 1 hour of writes
RPO = 0      → synchronous replication → no data loss (higher cost)
```

### RTO — Recovery Time Objective

How long service can be **down** before recovery.

```
RTO = 4 hours → restore from backup within 4 hours acceptable
RTO = 30 sec  → automated failover required
```

| Tier | RPO | RTO | Strategy |
|------|-----|-----|----------|
| Low | 24 h | 8 h | Daily backups |
| Medium | 1 h | 1 h | Hourly backups + replicas |
| High | minutes | minutes | Multi-AZ sync replication |
| Critical | ~0 | ~0 | Active-active multi-region |

---

## Error Rate vs Availability

Availability is not just "server up" — responses must be **correct and timely**.

```
Server returns 500 for 10% of requests:
  Technically "up" but effectively unreliable

Measure:
  success rate = successful requests / total requests
  latency SLO  = p99 < 300 ms
```

See [11-sli-slo-and-sla.md](./11-sli-slo-and-sla.md) for SLI definitions.

---

## Dependency Availability Math

How you combine components changes end-to-end availability.

### Series (sequential dependencies)

All must be up. Availabilities **multiply**.

```
Service A (99.9%) → Service B (99.9%) → Service C (99.9%)

Combined ≈ 0.999 × 0.999 × 0.999 ≈ 99.7%

More dependencies in critical path → lower end-to-end availability
```

### Parallel (redundant copies)

Any one healthy copy is enough. Failure probabilities multiply.

```
Two independent replicas, each 99%:
  P(both down) = 0.01 × 0.01 = 0.0001
  Combined availability ≈ 99.99%

Three replicas at 99% → even higher (diminishing ops cost trade-off)
```

| Topology | Formula (independent failures) | Effect |
|----------|--------------------------------|--------|
| **Series** A then B | `A × B` | Hurts availability |
| **Parallel** A or B | `1 − (1−A)(1−B)` | Helps availability |

Mitigate series risk: remove unnecessary sync hops, cache, fallbacks, bulkheads. Raise parallel redundancy for SPOFs ([04-redundancy](./04-redundancy-and-high-availability.md)).

---

## Summary

Measure reliability with **availability**, **MTBF**, **MTTR**, **RPO**, and **RTO**. The nines define downtime budget. Lower MTTR and careful dependency design improve availability without chasing impossible perfection.

---

[Next: Failure Modes and SPOF →](./03-failure-modes-and-spof.md)
