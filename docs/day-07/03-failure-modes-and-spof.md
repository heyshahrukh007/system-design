# Failure Modes and SPOF

[← Reliability Metrics](./02-reliability-metrics.md) | [Day 7 Index](./README.md) | [Next: Redundancy and HA →](./04-redundancy-and-high-availability.md)

## Failure Modes

Categories of things that break in production.

| Mode | Example | Frequency |
|------|---------|-----------|
| **Hardware** | Disk failure, server crash, rack outage | Common |
| **Network** | Partition, packet loss, DNS failure | Common |
| **Software bug** | Null pointer, infinite loop, memory leak | Common |
| **Dependency failure** | Payment API down, DB unreachable | Very common |
| **Overload** | Traffic spike exceeds capacity | Common |
| **Human error** | Bad deploy, wrong config, deleted table | Very common |
| **Data corruption** | Bad migration, partial write | Occasional |
| **Security incident** | DDoS, breach, certificate expiry | Occasional |
| **Cascading failure** | One slow service takes down callers | Common in microservices |

---

## Cascading Failure

The most dangerous pattern in distributed systems.

```
Payment Service slows down (2 s response)
  → Order Service threads block waiting
  → Order Service stops accepting new requests
  → API Gateway times out
  → Users see full site outage

Root cause: one dependency. Blast radius: entire system.
```

Prevention: [timeouts](./05-timeouts.md), [circuit breakers](./07-circuit-breaker.md), [bulkheads](./08-bulkhead-pattern.md), [queues](../day-06/01-why-queues.md).

---

## Single Point of Failure (SPOF)

A component that, if it fails, takes down the **entire system**.

```
SPOF examples:
  ✗ One app server
  ✗ One database (no replica)
  ✗ One load balancer (no secondary)
  ✗ One Redis instance (sessions lost)
  ✗ One region / availability zone
  ✗ One message broker
  ✗ One DNS provider (no secondary)
```

### SPOF Audit

Draw architecture diagram. For each box ask:

```
If this dies, does the system stop?
  YES → SPOF → add redundancy or failover
  NO  → acceptable (or degraded mode)
```

```
Before:
  Users → LB → App → DB

SPOFs: LB (1), App (1), DB (1)

After:
  Users → LB pair → App (3 instances, 2 AZs) → DB primary + 2 replicas
```

---

## Partial vs Total Failure

| Type | Behavior | Design response |
|------|----------|-----------------|
| **Total** | Component completely dead | Failover to standby |
| **Partial** | Slow, flaky, intermittent | Timeouts, circuit breaker |
| **Degraded** | Reduced capacity | Load shed, scale out |
| **Byzantine** | Wrong answers (rare) | Checksums, validation |

Partial failures are harder to detect than total outages — monitoring latency and error rate, not just up/down.

---

## Common SPOF Fixes

| SPOF | Fix |
|------|-----|
| Single app server | Multiple instances behind load balancer |
| Single database | Primary + replicas, automated failover |
| Single cache | Redis Sentinel or Cluster |
| Single queue broker | Clustered Kafka / RabbitMQ mirror |
| Single region | Multi-region active-passive or active-active |
| Single third-party API | Fallback provider or cached response |

---

## Dependency Failure

External services fail on their own schedule.

```
Your SLA cannot exceed your dependency's SLA.

Payment provider 99.9% → your checkout path capped at 99.9% without fallback
```

Options:
- Cache last-known-good data
- Queue for retry (async)
- Secondary provider
- Graceful degradation (disable feature)

---

## Human Error

Majority of production incidents involve human action.

| Error | Prevention |
|-------|------------|
| Bad deploy | Canary, blue-green, automated rollback |
| Wrong config | IaC, peer review, config validation |
| Dropped table | Backup, soft delete, least privilege |
| Capacity misjudgment | Auto-scaling, load tests |

Blameless postmortems improve systems — not punish people.

---

## Summary

Failures come from hardware, network, software, dependencies, overload, and human error. **Cascading failures** spread from one weak component. Audit for **SPOFs** and add redundancy. Partial failures need timeouts and circuit breakers — not just failover plans.

---

[Next: Redundancy and High Availability →](./04-redundancy-and-high-availability.md)
