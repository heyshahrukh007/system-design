# Redundancy and High Availability

[← Failure Modes and SPOF](./03-failure-modes-and-spof.md) | [Day 7 Index](./README.md) | [Next: Timeouts →](./05-timeouts.md)

## Redundancy

**Redundancy** = duplicate components so one can fail while others continue.

```
Active-Active:
  Server A ──┐
  Server B ──┼── both serve traffic
  Server C ──┘

Active-Passive:
  Primary ── serves traffic
  Standby ── idle, takes over on failure
```

---

## Levels of Redundancy

### 1. Multiple Instances (Same Zone)

```
Load Balancer → [App 1, App 2, App 3]
```

Survives: one server crash.  
Does not survive: entire datacenter flood.

### 2. Multiple Availability Zones (AZ)

Cloud region split into isolated datacenters.

```
Region: us-east-1
  AZ-a: App + DB replica
  AZ-b: App + DB replica
  AZ-c: App + DB primary
```

Survives: single AZ outage.  
Standard for production web apps.

### 3. Multiple Regions

```
us-east-1 (primary)     eu-west-1 (secondary)
```

Survives: regional disaster.  
Higher cost, complexity (data replication lag, routing).

---

## Load Balancer + Health Checks

From [Day 3: Load Balancer](../day-03/03-load-balancer.md).

```
Every 10 s:
  GET /health → 200  → server in pool
  GET /health → 503 → removed from pool
```

### Deep Health Checks

```
Shallow:  process is running (returns 200)
Deep:     can reach database, cache, critical dependencies

Deep check fails → stop traffic before users hit errors
```

```json
GET /health
{
  "status": "healthy",
  "checks": {
    "database": "ok",
    "redis": "ok",
    "disk_space": "ok"
  }
}
```

---

## Database High Availability

See [Day 4: Replication](../day-04/11-replication.md).

```
Primary (writes) ──replicate──▶ Replica 1 (reads)
                            ──▶ Replica 2 (reads + failover candidate)

Automated failover (Patroni, RDS Multi-AZ):
  Primary dies → replica promoted → DNS/connection string updated
```

| Pattern | RTO | RPO |
|---------|-----|-----|
| Single DB | Hours | High |
| Primary + async replica | Minutes | Seconds of data |
| Primary + sync replica | Seconds | ~0 |
| Multi-region active-active | Seconds | Depends on conflict resolution |

---

## Stateless Application Servers

App servers must not hold unique session state — any instance can handle any request.

```
Stateless:
  Session in Redis / JWT token
  Any app server can serve any user

Stateful (bad for HA):
  Session in server memory
  User tied to one server — dies when that server dies
```

---

## N+1 and N+2 Redundancy

| Design | Meaning |
|--------|---------|
| **N+1** | N needed for load + 1 spare | One failure tolerated |
| **N+2** | N + 2 spares | Two failures tolerated |
| **2N** | Double capacity | Full redundancy |

```
Need 4 servers for peak load:
  N+1: run 5 servers
  2N:  run 8 servers (survives half dying)
```

During deploys, rolling update removes instances temporarily — N+1 covers that.

---

## Active-Active vs Active-Passive

| | Active-Active | Active-Passive |
|---|---------------|----------------|
| Standby usage | All nodes work | Standby idle |
| Cost | Higher utilization | Pay for idle standby |
| Failover | Instant (already serving) | Promotion delay |
| Complexity | Session, data sync | Simpler |
| Example | Multi-instance behind LB | DR site cold/warm |

---

## DNS and HA

DNS can be SPOF. Use:
- Low TTL for failover records
- Multiple DNS providers
- Health-checked DNS (Route 53, Cloudflare)

```
Primary region unhealthy → DNS points to secondary region
```

DNS caching delays failover — plan TTL accordingly.

---

## Queue and Cache HA

| Component | HA approach |
|-----------|-------------|
| **Redis** | Sentinel, Cluster, replicas |
| **Kafka** | Replication factor 3, min in-sync replicas |
| **RabbitMQ** | Mirrored queues, cluster |
| **SQS** | Managed multi-AZ (AWS handles) |

---

## Summary

Eliminate SPOFs with **multiple instances**, **multiple AZs**, and **health-checked load balancing**. Databases need **replication and automated failover**. Keep app servers **stateless**. Match redundancy level (AZ, region) to RTO/RPO targets.

---

[Next: Timeouts →](./05-timeouts.md)
