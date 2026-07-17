# CAP and PACELC

[← Day 11 Index](./README.md) | [Next: Consistency Models →](./02-consistency-models.md)

## The Problem

A distributed system stores data on more than one machine. Networks between those machines can fail, delay, or split the cluster into groups that cannot talk to each other. That split is a **network partition**.

When a partition happens, every write and read forces a choice: keep serving (possibly with stale or conflicting data), or refuse some requests until the cluster can agree again.

---

## CAP Theorem

**CAP** says that in the presence of a network partition, a distributed data store cannot simultaneously guarantee:

| Letter | Meaning |
|--------|---------|
| **C** Consistency | Every read returns the latest write (or an error) |
| **A** Availability | Every non-failing node responds successfully |
| **P** Partition tolerance | The system continues despite message loss between nodes |

On a real network, **P is not optional** — partitions happen. So the practical choice under partition is **CP** or **AP**.

```
                    Partition happens
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
     Prefer consistency            Prefer availability
     (CP)                          (AP)
     Refuse some writes/reads      Serve from local replica
     until quorum agrees           may return stale / diverge
```

### CP Example

A primary-replica database that **rejects writes** when it cannot reach a majority of replicas. Clients get errors instead of silent inconsistency. Banking ledgers often lean this way.

### AP Example

A DNS-like or shopping-cart cache that **keeps accepting writes** on each side of a partition and reconciles later. Users keep shopping; conflicts are resolved after the network heals.

### What CAP Does *Not* Mean

- It does not say you pick two letters forever and ignore the third.
- It does not apply only to databases — any replicated state faces the same trade-off.
- It does not mean “CA systems exist on unreliable networks.” Without partitions, CA is fine; with partitions, you still choose.

---

## PACELC

CAP only talks about **during a partition**. Most of the time the network is fine. **PACELC** extends the question:

> If there is a **P**artition, choose **A** or **C**;  
> **E**lse (normal operation), choose **L**atency or **C**onsistency.

| Mode | Trade-off |
|------|-----------|
| Partition | Availability vs Consistency |
| Else (healthy) | Latency vs Consistency |

Even with a healthy network, waiting for every replica to acknowledge a write (**strong consistency**) adds latency. Returning as soon as the local node has the data (**eventual consistency**) is faster but may show stale reads.

```
Healthy cluster, write "balance = 100":

  Strong path:  write → wait for sync to replicas → ACK  (higher latency, fresher reads)
  Fast path:    write → ACK local → replicate async     (lower latency, possible stale reads)
```

### Common PACELC Profiles

| System style | During partition | Else |
|--------------|------------------|------|
| Traditional RDBMS (sync replica) | CP | Prefer C (sync) |
| Dynamo-style KV | AP | Prefer L (async) |
| Tunable quorum (Cassandra, etc.) | Configurable | Configurable |

---

## How This Shows Up in Designs You Already Saw

| Day 10 / earlier design | CAP / PACELC angle |
|-------------------------|--------------------|
| [URL shortener](../day-10/02-url-shortener.md) redirects | Reads can be eventually consistent; rare stale redirect is often OK |
| [E-commerce checkout](../day-10/10-ecommerce-checkout.md) inventory | Prefer consistency on stock/payment; may refuse oversell under partition |
| [News feed](../day-10/05-news-feed.md) | Availability and latency matter more than seeing every post instantly |
| [Day 4 replication](../day-04/11-replication.md) lag | Classic “Else: Latency vs Consistency” — async replicas are faster, slightly stale |

---

## Design Questions to Ask

1. If two data centers cannot talk, should users still write?
2. Is a stale read worse than an error?
3. Under normal load, is an extra 5–20 ms of sync replication worth fresher reads?

Answer those before picking a database or replication mode.

---

## Summary

| Idea | Takeaway |
|------|----------|
| CAP | Under partition: consistency **or** availability |
| P is required | Real networks fail; design for it |
| PACELC | Even without partitions: latency **or** consistency |
| Product drives choice | Money and inventory ≠ social feed freshness |

Next: what “consistency” actually means for readers and writers — [Consistency Models](./02-consistency-models.md).
