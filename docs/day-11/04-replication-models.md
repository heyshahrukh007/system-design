# Replication Models

[← Quorum Reads and Writes](./03-quorum-reads-writes.md) | [Day 11 Index](./README.md) | [Next: Consensus Basics →](./05-consensus-basics.md)

## Why Models Matter

[Day 4: Replication](../day-04/11-replication.md) covered how a primary streams changes to replicas. The **topology** — who can accept writes — changes failover, conflict rate, and geo latency.

Three main models:

1. Leader–follower (primary–replica)
2. Multi-leader (multi-primary)
3. Leaderless

---

## Leader–Follower

One **leader** accepts all writes. Followers replicate and serve reads (and act as failover candidates).

```
        Writes
          │
          ▼
     ┌─────────┐
     │ Leader  │
     └────┬────┘
          │ replicate
    ┌─────┼─────┐
    ▼     ▼     ▼
  F1     F2     F3   ← reads
```

| Pros | Cons |
|------|------|
| Simple conflict story (one writer) | Leader is a bottleneck and SPOF until failover |
| Easy to reason about ordering | Cross-region writes all go to one place |
| Mature tooling (Postgres, MySQL, etc.) | Failover must promote a follower |

**Sync vs async followers:** sync = stronger durability/consistency, higher write latency; async = faster writes, risk of data loss on leader crash ([Day 4](../day-04/11-replication.md)).

**Fits:** most OLTP apps, [URL shortener](../day-10/02-url-shortener.md) metadata DB, checkout order DB.

---

## Multi-Leader

Several nodes accept writes. Each is a leader for some clients or regions; they replicate to each other.

```
  Region US                Region EU
 ┌─────────┐  ◄──repl──► ┌─────────┐
 │ Leader  │             │ Leader  │
 └─────────┘             └─────────┘
```

| Pros | Cons |
|------|------|
| Low write latency per region | **Write conflicts** when same row updated in two places |
| Survive regional leader loss (partially) | Conflict resolution required |
| Offline-friendly (mobile sync variants) | Operationally harder |

**Conflict strategies:**

| Strategy | Idea |
|----------|------|
| Last-write-wins (LWW) | Highest timestamp wins — simple, can lose updates |
| App merge | Domain rules (e.g. union of tags) |
| CRDTs | Math types that merge commutatively |
| Avoid | Partition keys so concurrent edits are rare |

**Fits:** multi-region collaborative apps, some active-active deployments — not naive bank balances.

---

## Leaderless

No designated leader. Clients (or coordinators) send writes to multiple replicas; quorums decide success ([topic 3](./03-quorum-reads-writes.md)).

```
Client ──► Coordinator
              │
     ┌────────┼────────┐
     ▼        ▼        ▼
    N1       N2       N3
```

| Pros | Cons |
|------|------|
| No leader failover dance | Harder mental model |
| High write availability | Conflicts / sibling versions |
| Tunable R/W | Repair and hinted handoff needed |

**Fits:** Dynamo-style KV, high-scale session/cart stores, some IoT ingest paths.

---

## Comparison

| Dimension | Leader–follower | Multi-leader | Leaderless |
|-----------|-----------------|--------------|------------|
| Write path | Single leader | Several leaders | Any / quorum |
| Conflicts | Rare | Common | Common |
| Failover | Promote follower | Redirect region | No leader election |
| Geo writes | High latency to remote leader | Local leaders | Local quorums |
| Ops complexity | Lowest | High | Medium–high |

---

## Failover and Split Brain

Leader–follower needs **leader election** when the leader dies. Risks:

```
Network blip:
  Old leader still alive but unreachable from majority
  New leader elected
  → two writers if fencing is weak  ("split brain")
```

Mitigations: fencing tokens, lease-based leadership, store-level consensus ([topic 5](./05-consensus-basics.md)). Related ops: [Day 7: Failover](../day-07/10-failover-and-disaster-recovery.md).

---

## Choosing a Model

| Requirement | Lean toward |
|-------------|-------------|
| Simple ops, strong single-writer semantics | Leader–follower |
| Multi-region low-latency writes | Multi-leader or leaderless + careful conflict rules |
| Max write availability under failures | Leaderless with sloppy quorum |
| Strict invariants (money) | Leader–follower + sync or consensus-backed primary |

---

## Summary

Replication is not one pattern — it is a **write-authority** design. Pick the model that matches conflict tolerance and geography, then set sync/async and quorum on top.

Next: how nodes agree on one leader or one value — [Consensus Basics](./05-consensus-basics.md).
