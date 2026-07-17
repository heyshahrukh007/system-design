# Designing for Failure

[← SLI, SLO, and SLA](./11-sli-slo-and-sla.md) | [Day 7 Index](./README.md)

## The Principle

**Everything fails all the time.** — Werner Vogels, AWS

Design assumes components fail. Test failures deliberately. Operate with failure in mind.

---

## Defense in Depth Stack

Layers that work together:

```
1. Redundancy          — no SPOF ([04](./04-redundancy-and-high-availability.md))
2. Health checks       — remove bad instances
3. Timeouts            — don't wait forever ([05](./05-timeouts.md))
4. Retries + backoff   — handle transient errors ([06](./06-retries-and-backoff.md))
5. Circuit breaker     — stop cascading ([07](./07-circuit-breaker.md))
6. Bulkhead            — isolate resources ([08](./08-bulkhead-pattern.md))
7. Graceful degradation— partial service ([09](./09-graceful-degradation.md))
8. Queue               — async buffer ([Day 6](../day-06/README.md))
9. Failover + DR       — recover from disaster ([10](./10-failover-and-disaster-recovery.md))
10. Monitoring + SLOs  — detect and measure ([11](./11-sli-slo-and-sla.md))
```

Missing one layer leaves gaps.

---

## Chaos Engineering

Intentionally inject failures in controlled environments to find weaknesses.

| Experiment | What it tests |
|------------|---------------|
| Kill random app instance | LB routing, stateless design |
| Add 5 s latency to DB | Timeouts, circuit breakers |
| Partition network between services | Retry storms, split behavior |
| Fill disk on one node | Monitoring, alerts |
| DNS failure | Resolver caching, fallback |
| AZ failure | Multi-AZ redundancy |

**Tools:** Chaos Monkey, Gremlin, AWS FIS, Litmus (Kubernetes)

```
Process:
  1. Define steady-state (normal metrics)
  2. Hypothesis: "AZ failure won't drop availability below 99.9%"
  3. Inject failure in staging or limited prod (blast radius control)
  4. Observe: did hypothesis hold?
  5. Fix gaps, repeat
```

Start in staging. Production chaos requires executive buy-in and careful blast radius.

---

## Game Days

Scheduled incident simulation with the team.

```
Scenario: Payment provider returning 503 for 1 hour
  On-call responds as if real
  Test: runbooks, comms, dashboards, escalation
  Debrief: what broke, what to improve
```

Improves MTTR without waiting for real outages.

---

## Safe Deployments

Most outages are self-inflicted (bad deploy).

| Practice | Reliability benefit |
|----------|---------------------|
| **Canary** | 5% traffic first — catch errors early |
| **Blue-green** | Instant rollback to old version |
| **Rolling deploy** | Gradual replacement with health checks |
| **Feature flags** | Disable feature without redeploy |
| **Automated rollback** | Error rate spike → revert automatically |

```
Deploy pipeline:
  deploy canary → monitor 10 min → SLI stable → roll out 100%
  SLI drops → auto rollback
```

---

## Idempotency Everywhere

Retries, failover, and queues duplicate work. Design idempotent operations.

```
Payments, orders, webhooks, message consumers
  → idempotency key in DB
  → unique constraints
  → "already processed" short-circuit
```

See [Day 6: Idempotency](../day-06/10-retry-dlq-and-idempotency.md).

---

## Postmortems

After incidents — blameless, factual, action-oriented.

```
Template:
  Summary (what happened, duration, impact)
  Timeline
  Root cause (technical + contributing factors)
  What went well
  What went poorly
  Action items (owner + due date)
```

Action items feed back into design — new timeout, new runbook, new chaos test.

---

## Reliability Checklist

### Architecture
- [ ] No SPOF in critical path
- [ ] Multi-AZ for production
- [ ] Stateless app servers
- [ ] DB replication + tested failover
- [ ] Backups with tested restore

### Application
- [ ] Timeouts on all external calls
- [ ] Retries with backoff + jitter (idempotent only)
- [ ] Circuit breakers on fragile dependencies
- [ ] Bulkheads for thread/connection pools
- [ ] Graceful degradation for optional features

### Operations
- [ ] SLIs and SLOs defined
- [ ] Alerts on error budget burn
- [ ] Runbooks for top failure modes
- [ ] On-call rotation and escalation
- [ ] Postmortem process

### Testing
- [ ] Load tests before major events
- [ ] Failover drill (DB, region)
- [ ] Chaos or game day quarterly

---

## Quick Reference

| Problem | Pattern |
|---------|---------|
| Dependency slow | Timeout, circuit breaker |
| Dependency down | Circuit breaker, fallback, degrade |
| Thread exhaustion | Bulkhead, async queue |
| Traffic spike | Auto-scale, queue, load shed |
| Region loss | Multi-region DR |
| Bad deploy | Canary, rollback, feature flags |
| Duplicate processing | Idempotency |
| Unknown weak points | Chaos engineering, game days |

---

## Summary

Design for failure with layered defenses — redundancy through SLOs. **Chaos engineering** and **game days** find gaps before users do. Safe deploys and idempotency prevent self-inflicted outages. Use the checklist to audit any system design.

---

[← SLI, SLO, and SLA](./11-sli-slo-and-sla.md) | [Day 7 Index](./README.md)
