# Distributed Systems Fundamentals — Answer Key & Explanations (50)

Answer key for [day-11-questions.md](../day-11-questions.md)




---

### Q01 [Easy] [Case Study] — ReplicaWorks Partition Response

**Answer:** B, C, D

**Explanation:** Carts often AP; inventory/money paths CP. P is not optional on real networks (C wrong).

---

### Q02 [Easy] [Case Study] — ReplicaWorks Catalog Replication Latency

**Answer:** A, B, D

**Explanation:** PACELC’s “Else” is latency vs consistency when healthy (A). B ignores normal-operation trade-offs.

---

### Q03 [Easy] [Case Study] — ReplicaWorks Read Freshness by Domain

**Answer:** A, B, D

**Explanation:** Not every field needs linearizability (C). Feeds/counts vs money/inventory differ.

---

### Q04 [Easy] — Strong Consistency (Linearizability)

**Answer:** A, C, D

**Explanation:** Distributed consistency ≠ ACID schema consistency (B).

---

### Q05 [Easy] [Case Study] — ReplicaWorks Engagement Metrics

**Answer:** A, B, C

**Explanation:** Eventual may still need merge rules under multi-writer (D).

---

### Q06 [Easy] [Case Study] — ReplicaWorks Profile After Save

**Answer:** A, C, D

**Explanation:** Read-your-writes is session/self scoped, not global instant visibility (B).

---

### Q07 [Easy] — Causal Consistency

**Answer:** A, B, D

**Explanation:** Causal is weaker than linearizability, not stronger (C).

---

### Q08 [Easy] [Case Study] — ReplicaWorks Session Store Quorum

**Answer:** A, C, D

**Explanation:** W=1,R=1 with N=3 fails W+R>N (B).

---

### Q09 [Easy] — Leader–Follower Replication

**Answer:** A, B, C

**Explanation:** Failover is required when the leader fails (D).

---

### Q10 [Easy] — Multi-Leader Replication

**Answer:** A, C, D

**Explanation:** Multi-leader requires conflict handling (B).

---

### Q11 [Easy] [Case Study] — ReplicaWorks Cart KV

**Answer:** A, C, D

**Explanation:** Leaderless still needs repair/handoff (B).

---

### Q12 [Easy] — Consensus in Production

**Answer:** A, C, D

**Explanation:** Do not route all user data through global consensus (B).

---

### Q13 [Easy] [Case Study] — ReplicaWorks Checkout Coordination

**Answer:** B, C, D

**Explanation:** Sagas expose intermediate states; not cross-service ACID isolation (A).

---

### Q14 [Easy] — Transactional Outbox

**Answer:** A, B, C

**Explanation:** Consumers still need idempotency/inbox (D).

---

### Q15 [Easy] — Idempotency Basics

**Answer:** B, C, D

**Explanation:** Retries are normal at scale (A).

---

### Q16 [Medium] — CAP Misconceptions

**Answer:** A, C, D

**Explanation:** CA across partition on unreliable network is not realistic (B).

---

### Q17 [Medium] [Case Study] — ReplicaWorks Multi-Region Catalog Editors

**Answer:** B, C, D

**Explanation:** Multi-leader adds conflict and ops complexity (A).

---

### Q18 [Medium] — Monotonic Reads

**Answer:** A, B, C

**Explanation:** Monotonic is session-level, not global linearizability (D).

---

### Q19 [Medium] [Case Study] — ReplicaWorks Tunable Quorum per Operation

**Answer:** A, B, C

**Explanation:** 1+1=2 is not >3 for N=3 (D).

---

### Q20 [Medium] — Sloppy Quorum and Hinted Handoff

**Answer:** A, B, D

**Explanation:** Repair paths still matter (C).

---

### Q21 [Medium] — Read Repair and Anti-Entropy

**Answer:** A, B, C

**Explanation:** Read repair applies to leaderless/quorum systems too (D).

---

### Q22 [Medium] [Case Study] — ReplicaWorks Inventory Quorum N=5

**Answer:** A, B, D

**Explanation:** W=N,R=1 is high write latency, not minimal (C).

---

### Q23 [Medium] — Sync vs Async Followers

**Answer:** A, B, D

**Explanation:** Sync is stronger on ACK than async (C).

---

### Q24 [Medium] [Case Study] — ReplicaWorks Primary Failover

**Answer:** A, B, D

**Explanation:** Partitions can yield dual writers without fencing (C).

---

### Q25 [Medium] — Raft (Conceptual)

**Answer:** A, B, C

**Explanation:** FLP limits theory; clusters use partial sync in practice (D).

---

### Q26 [Medium] — Consensus Log vs Quorum KV

**Answer:** A, B, D

**Explanation:** Consensus does not scale as the data plane for every row (C).

---

### Q27 [Medium] [Case Study] — ReplicaWorks Saga Failure at Payment

**Answer:** B, C, D

**Explanation:** Cross-service rollback is not automatic SQL ROLLBACK (A).

---

### Q28 [Medium] [Case Study] — ReplicaWorks Order Events

**Answer:** A, B, C

**Explanation:** Choreography can still use outbox on producers (D).

---

### Q29 [Medium] — Two-Phase Commit Limits

**Answer:** A, B, D

**Explanation:** 2PC fits short homogeneous ops, not long HTTP chains (C).

---

### Q30 [Medium] [Case Study] — ReplicaWorks LWW on Catalog Fields

**Answer:** A, B, D

**Explanation:** Wall time alone is weak for multi-writer merge authority (C).

---

### Q31 [Medium] — Lamport Timestamps

**Answer:** A, B, C

**Explanation:** Lamport order does not imply happens-before converse (D).

---

### Q32 [Medium] [Case Study] — ReplicaWorks Chat Ordering

**Answer:** A, B, D

**Explanation:** Global wall clock across DCs is insufficient alone (C).

---

### Q33 [Medium] — SQL vs Document Stores

**Answer:** A, B, D

**Explanation:** Ledgers usually relational, not document-by-default (C).

---

### Q34 [Medium] — Key–Value vs Wide-Column

**Answer:** A, B, D

**Explanation:** Wide-column avoids rich joins (C).

---

### Q35 [Medium] [Case Study] — ReplicaWorks Polyglot Persistence

**Answer:** A, B, C

**Explanation:** Global 2PC across heterogeneous stores is fragile (D).

---

### Q36 [Hard] — Consistency Model Spectrum

**Answer:** A, B, D

**Explanation:** Sequential ≠ eventual (C).

---

### Q37 [Hard] [Case Study] — ReplicaWorks Partition Checkout Policy

**Answer:** B, C, D

**Explanation:** Strong global linearizability has coordination cost (A).

---

### Q38 [Hard] — Quorum Latency Profiles

**Answer:** A, C, D

**Explanation:** W=1,R=N vs W=N,R=1 swap write/read costs (B).

---

### Q39 [Hard] [Case Study] — ReplicaWorks Sloppy Quorum During Outage

**Answer:** A, B, D

**Explanation:** Sloppy quorum does not guarantee linearizable reads immediately (C).

---

### Q40 [Hard] — FLP and Practical Consensus

**Answer:** A, B, C

**Explanation:** Leaders require election/votes (D).

---

### Q41 [Hard] [Case Study] — ReplicaWorks Outbox Relay Stuck

**Answer:** A, B, D

**Explanation:** Outbox complements local ACID; does not replace it (C).

---

### Q42 [Hard] — Multi-Leader Conflict Handling

**Answer:** A, B, C

**Explanation:** LWW can lose updates under concurrency (D).

---

### Q43 [Hard] [Case Study] — ReplicaWorks Support Thread Visibility

**Answer:** A, C, D

**Explanation:** Causal does not impose one global real-time order for unrelated events (B).

---

### Q44 [Hard] — Leaderless Write Conflicts

**Answer:** A, B, C

**Explanation:** Different quorums can admit concurrent versions (D).

---

### Q45 [Hard] [Case Study] — ReplicaWorks 2PC vs Saga Decision

**Answer:** A, B, D

**Explanation:** Long external payment in XA 2PC is a poor fit (C).

---

### Q46 [Hard] — Storage Family Selection

**Answer:** A, C, D

**Explanation:** Graph complements OLTP; rarely replaces all relational SOR (B).

---

### Q47 [Hard] [Case Study] — ReplicaWorks Cross-Region Idempotency

**Answer:** A, C, D

**Explanation:** Do not assume global delivery order (B).

---

### Q48 [Hard] — Distributed Storage Anti-Patterns

**Answer:** A, B, C

**Explanation:** Relational ledger with constraints is appropriate (D is not an anti-pattern).

---

### Q49 [Hard] [Case Study] — ReplicaWorks Platform Consistency Mix

**Answer:** A, B, D

**Explanation:** Different subsystems need different models (C).

---

### Q50 [Hard] [Case Study] — ReplicaWorks End-to-End Checkout

**Answer:** A, B, D

**Explanation:** HTTP 201 can return before async warehouse processing (C).
