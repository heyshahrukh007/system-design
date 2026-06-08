# Failover and Disaster Recovery

[← Graceful Degradation](./09-graceful-degradation.md) | [Day 7 Index](./README.md) | [Next: SLI, SLO, and SLA →](./11-sli-slo-and-sla.md)

## Failover

**Failover** = switching to standby when primary fails.

```
Normal:    Primary DB serves reads + writes
Failure:   Primary unreachable
Failover:  Replica promoted to primary
Recovery:  Traffic flows to new primary
```

Goal: minimize downtime (RTO) and data loss (RPO). See [02-reliability-metrics.md](./02-reliability-metrics.md).

---

## Types of Failover

### Automatic

```
Health check fails 3× → orchestrator promotes replica
DNS / connection pool updated
Typical RTO: 30 s – 2 min
```

Tools: RDS Multi-AZ, Patroni, Kubernetes, keepalived.

### Manual

```
On-call detects failure → runs failover runbook
Typical RTO: minutes to hours
```

Used when automatic failover risks split-brain or data loss.

---

## Split-Brain

Two nodes both think they're primary — diverging writes.

```
Primary (network isolated) still accepting writes
Replica promoted to primary also accepting writes
Network heals → conflicting data
```

Prevention:
- Quorum / majority vote (etcd, Consul)
- STONITH (shoot the other node in the head)
- Fencing — old primary forcibly shut down

---

## Disaster Recovery (DR)

Plan for large-scale failures: region loss, ransomware, catastrophic data corruption.

### Backup Strategy

| Type | RPO | Notes |
|------|-----|-------|
| **Full backup** | 24 h+ | Complete snapshot |
| **Incremental** | Hours | Changes since last full |
| **Continuous (WAL)** | Minutes | Stream every change |
| **Cross-region copy** | Minutes | Survives region loss |

**Test restores regularly** — untested backup = no backup.

```
Restore drill quarterly:
  1. Restore backup to isolated environment
  2. Verify data integrity
  3. Measure actual RTO
```

---

## DR Topologies

### Backup and Restore (Cold)

```
Primary region active
DR region: backups only

Failover: restore backup, redeploy (hours)
Cost: low
```

### Warm Standby

```
DR region: scaled-down copy, data replicated
Failover: scale up DR (tens of minutes)
Cost: medium
```

### Hot Standby / Active-Passive

```
DR region: full stack running, not taking traffic
Failover: DNS flip (minutes)
Cost: high
```

### Active-Active (Multi-Region)

```
Both regions serve traffic
Failover: automatic traffic shift
Cost: highest — conflict resolution, data sync complexity
```

---

## Runbooks

Documented steps for incident response.

```
Failover Runbook: Database Primary Failure
  1. Confirm primary down (not network blip)
  2. Check replication lag on replica
  3. If lag < 30 s: trigger automated failover
  4. Verify new primary accepting writes
  5. Update application connection strings if needed
  6. Monitor error rates
  7. Post-incident: rebuild old primary as replica
```

Runbooks reduce MTTR — engineers don't invent steps during outage.

---

## Data Center / Region Failure

```
us-east-1 unavailable:
  Route 53 health check fails
  Traffic to eu-west-1
  Users may need re-login (session not replicated)
  Accept eventual consistency on user-generated content
```

Multi-region is expensive — reserve for systems that justify it.

---

## Application-Level Failover

Not just infrastructure:

```
Primary payment provider down:
  → circuit opens
  → route to secondary provider (Stripe → Adyen)

Primary search index stale:
  → fall back to database search (slow but works)
```

---

## DR Testing

| Test | Frequency |
|------|-----------|
| Backup restore | Quarterly |
| Tabletop exercise (walk through runbook) | Monthly |
| Game day (simulate AZ failure in staging) | Quarterly |
| Full region failover drill | Annually (if multi-region) |

---

## Summary

**Failover** switches to standby on failure — automatic when safe, manual when not. **DR** plans for catastrophic loss with backups, replication, and regional strategy. Define RPO/RTO, write runbooks, test restores, and guard against split-brain.

---

[Next: SLI, SLO, and SLA →](./11-sli-slo-and-sla.md)
