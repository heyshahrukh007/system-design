# Consensus Basics

[← Replication Models](./04-replication-models.md) | [Day 11 Index](./README.md) | [Next: Distributed Transactions vs Saga →](./06-distributed-transactions-vs-saga.md)

## The Problem

Several nodes must **agree on a single value** (or a single sequence of values) even when some crash or messages are delayed.

Examples:

- Which node is the **leader**?
- What is the next entry in a **replicated log**?
- Did this **configuration change** commit?

This is harder than it looks: two nodes can both think they are leader, or accept different values, if they decide independently.

---

## Why Agreement Is Hard

```
Node A proposes v=1
Node B proposes v=2
Network delays A's messages
  → Without a protocol, cluster can split opinions
```

Requirements for consensus (informally):

| Property | Meaning |
|----------|---------|
| **Agreement** | No two correct nodes decide different values |
| **Validity** | The decided value was proposed by some node |
| **Termination** | Eventually every correct node decides (under assumptions) |

The **FLP result** (theory): in a fully asynchronous network with even one possible crash, perfect consensus is impossible. Real systems add timeouts, failure detectors, or partial synchrony so they can make progress in practice.

---

## Replicated Log Mental Model

Most practical systems do not agree on one-off values only — they agree on an **ordered log** of commands:

```
Index:  1        2        3        4
Log:   SET x=1  SET y=2  SET x=3  DEL y
```

Every node applies the same log in the same order → same state (state machine replication).

```
Client write
    │
    ▼
Leader appends to log
    │
    ▼
Followers replicate entry
    │
    ▼
Once majority has it → commit → apply to state machine → reply OK
```

This is how etcd, Consul, ZooKeeper-style systems, and many database failover layers work under the hood.

---

## Raft (Conceptual)

**Raft** is a consensus algorithm designed to be understandable. Roles:

| Role | Job |
|------|-----|
| **Leader** | Acceptes client writes, appends log, replicates |
| **Follower** | Replicates leader’s log, responds to RPCs |
| **Candidate** | Campaigns for votes during election |

### Leader Election

```
Follower timeout (no heartbeat)
  → becomes Candidate
  → requests votes for a new term
  → majority votes → becomes Leader
  → sends heartbeats
```

Terms are monotonically increasing numbers that help reject stale leaders.

### Log Replication

1. Leader appends entry locally  
2. Sends `AppendEntries` to followers  
3. When majority acknowledges → entry is **committed**  
4. Leader applies and notifies followers to apply  

Safety: a leader only commits entries from its own term under Raft’s rules; followers reject inconsistent logs and get repaired.

You do not need to implement Raft to design systems — you need to know **majority + term + log** is how “one writer” stays safe.

---

## Paxos (At a Glance)

**Paxos** is the classic consensus protocol family. Same goal as Raft (agree on values / log), different presentation. Many production systems historically used Multi-Paxos variants. For system design, treat Paxos/Raft as interchangeable **ideas**: quorums, ballots/terms, and committed log entries.

---

## Where Consensus Shows Up

| System piece | Role of consensus |
|--------------|-------------------|
| etcd / Consul / ZooKeeper | Service discovery, config, locks |
| Kafka controller / KRaft | Partition leadership metadata |
| DB failover (Patroni, etc.) | Who is primary |
| Chubby / similar lock services | Distributed locks and leases |

App services usually **use** these systems rather than reinvent consensus.

---

## Consensus vs Quorum KV

| | Consensus log | Quorum KV (Dynamo-style) |
|--|---------------|---------------------------|
| Goal | One ordered history | High availability reads/writes |
| Conflicts | Avoided by single log order | Allowed; repair later |
| Latency | Majority round-trips | Tunable; can be ONE |
| Use | Metadata, leadership, config | Large-scale user data |

Do not put every user write through a global consensus cluster — it does not scale like a partitioned data store. Use consensus for **control plane**; use partitioned storage for **data plane**.

---

## Fencing and Leases

After election, the old leader might still be alive:

```
Old leader: still accepts a write (stale)
New leader: also accepts writes
→ split brain
```

**Fencing token / lease:** storage or lock service issues a monotonic token; resources reject lower tokens. Related to [Day 7 failover](../day-07/10-failover-and-disaster-recovery.md).

---

## Summary

| Idea | Takeaway |
|------|----------|
| Consensus | Nodes agree on one value / log order |
| Majority | Typical safety threshold |
| Raft/Paxos | Algorithms behind etcd, ZK, many HA primaries |
| Use sparingly | Control plane, not every business write |

Next: coordinating work across services without a global transaction manager — [Distributed Transactions vs Saga](./06-distributed-transactions-vs-saga.md).
