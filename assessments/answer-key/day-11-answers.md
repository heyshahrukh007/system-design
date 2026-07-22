# Distributed Systems Fundamentals — Answer Key (50)




---

### Q01

**Answer:** B, C

**Explanation:** CAP prevents strict consistency and full availability during a partition; carts can favor availability. Inventory should not reconcile overselling after accepting unsafe decrements (D), and partition tolerance is not optional (A).

---

### Q02

**Answer:** B, D

**Explanation:** PACELC’s “Else” captures the healthy-network latency-versus-consistency trade-off. Asynchronous replication does not guarantee acknowledged writes are already visible on followers (A).

---

### Q03

**Answer:** C, D

**Explanation:** Counts can tolerate eventual consistency, while balances and paid inventory need stronger guarantees. Marketing copy does not inherently require wallet-grade linearizability (A).

---

### Q04

**Answer:** A, B

**Explanation:** Strong consistency provides latest-write visibility and usually adds coordination latency. It neither replaces transactions (C) nor means ACID constraint consistency (D).

---

### Q05

**Answer:** A, B

**Explanation:** Eventual consistency permits stale reads but converges after writes stop. Multi-writer systems may need merge rules, and synchronous invalidation is not what makes a CDN eventually consistent (D).

---

### Q06

**Answer:** A, D

**Explanation:** Primary or sticky routing and minimum-version tokens preserve a client’s own writes. The guarantee is session-scoped, not immediate global visibility (B, D).

---

### Q07

**Answer:** C, D

**Explanation:** Causal consistency preserves dependencies such as reply-after-parent while allowing unrelated concurrent writes to vary in order. It does not require a global total order (A) or exceed linearizability (B).

---

### Q08

**Answer:** A, B

**Explanation:** With N=3, W=2 and R=2 overlap because W+R>N. Raising W normally waits for more replicas and therefore does not lower latency (D).

---

### Q09

**Answer:** B, D

**Explanation:** One leader accepts writes per shard, simplifying write ordering. Followers replicate rather than accept independent uncoordinated writes (A), and failover is still required (C).

---

### Q10

**Answer:** A, D

**Explanation:** Multi-leader systems can create concurrent row conflicts, and timestamp LWW is vulnerable to skew. They can acknowledge region-local writes; synchronous cross-region acknowledgment is not mandatory (B).

---

### Q11

**Answer:** A, B

**Explanation:** Leaderless writes go to multiple replicas without electing a designated writer. Consistency levels can be tunable per request (so C is false as written), and repair and handoff remain necessary (C).

---

### Q12

**Answer:** A, D

**Explanation:** Consensus commonly commits a majority-backed replicated log. It is useful for ordered control-plane metadata rather than unnecessary there (B), and should not be the default path for every product row (C).

---

### Q13

**Answer:** A, D

**Explanation:** 2PC has prepare and commit/abort phases, while sagas compose local transactions with compensations. XA across long external HTTP flows is not the usual default (C), and sagas do not provide global ACID isolation (B).

---

### Q14

**Answer:** A, B

**Explanation:** The business update and outbox row commit atomically, closing the database/publish crash gap. A relay publishes later rather than requiring pre-commit publication (C), and consumers still need idempotency (D).

---

### Q15

**Answer:** B, C

**Explanation:** Stable idempotency keys and unique natural keys deduplicate repeated operations. At-least-once delivery alone does not guarantee exactly-once effects without idempotent handling (D), and retries are routine (A).

---

### Q16

**Answer:** C, D

**Explanation:** CP may reject operations without quorum, while AP may serve divergent local state. Real networks can partition even within a region, so partition tolerance cannot simply be omitted (C, D).

---

### Q17

**Answer:** A, B

**Explanation:** Concurrent regional edits need conflict policy, and key design can reduce collisions. Naive wall-clock LWW is vulnerable—not immune—to clock skew (C), and multi-leader adds complexity (D).

---

### Q18

**Answer:** A, C

**Explanation:** Sticky routing or minimum-version tracking prevents a client from going backward after observing a value. Arbitrary lagging replicas do not preserve that property automatically (D), and it is weaker than global linearizability (B).

---

### Q19

**Answer:** B, C

**Explanation:** Requests can choose consistency levels independently, with stronger levels fitting credential changes. WRITE ONE favors low latency rather than being the strongest all-replica choice (A), and 1+1 does not exceed N=3 (D).

---

### Q20

**Answer:** A, D

**Explanation:** Substitute nodes accept writes and later forward hints to recovered owners. This improves availability but does not provide strict linearizability or eliminate reconciliation (B, C).

---

### Q21

**Answer:** B, C

**Explanation:** Anti-entropy repairs replicas periodically, while read repair fixes stale replicas encountered by reads. One successful quorum does not make background maintenance unnecessary (A), and read repair is not leader-only (D).

---

### Q22

**Answer:** A, D

**Explanation:** W=3 and R=3 overlap in an N=5 system, and majority reads/writes offer a balanced profile. Replicas can still differ in applied versions, so overlap does not remove version metadata needs (C); W=N does not minimize write latency (B).

---

### Q23

**Answer:** A, B

**Explanation:** Synchronous replication adds acknowledgment latency, while asynchronous replication can lose unreplicated recent writes during failover. Synchronous acknowledgment generally improves rather than reduces durability (D).

---

### Q24

**Answer:** A, B

**Explanation:** An old primary can continue writing unless a lease or fencing token lets storage reject it. Consensus-backed election reduces ambiguous claims but does not itself fence every stale storage write (D); partitions can create dual writers (C).

---

### Q25

**Answer:** A, B

**Explanation:** Raft uses monotonic terms and majority acknowledgment to establish committed log entries. Followers replicate the same ordered log rather than executing unrelated orders (D), and FLP does not prevent practical elections (C).

---

### Q26

**Answer:** A, B, D

**Explanation:** Consensus does not scale as the data plane for every row (C).

---

### Q27

**Answer:** B, C, D

**Explanation:** Cross-service rollback is not automatic SQL ROLLBACK (A).

---

### Q28

**Answer:** A, B, C

**Explanation:** Choreography can still use outbox on producers (D).

---

### Q29

**Answer:** A, B, D

**Explanation:** 2PC fits short homogeneous ops, not long HTTP chains (C).

---

### Q30

**Answer:** B, C, D

**Explanation:** Wall time alone is weak for multi-writer merge authority (A).

---

### Q31

**Answer:** B, C, D

**Explanation:** Lamport order does not imply happens-before converse (A).

---

### Q32

**Answer:** A, C, D

**Explanation:** Global wall clock across DCs is insufficient alone (B).

---

### Q33

**Answer:** B, C, D

**Explanation:** Ledgers usually relational, not document-by-default (A).

---

### Q34

**Answer:** B, C, D

**Explanation:** Wide-column avoids rich joins (A).

---

### Q35

**Answer:** A, C, D

**Explanation:** Global 2PC across heterogeneous stores is fragile (B).

---

### Q36

**Answer:** A, B, D

**Explanation:** Sequential ≠ eventual (C).

---

### Q37

**Answer:** A, C, D

**Explanation:** Strong global linearizability has coordination cost (B).

---

### Q38

**Answer:** A, B, D

**Explanation:** W=1,R=N vs W=N,R=1 swap write/read costs (C).

---

### Q39

**Answer:** A, B, D

**Explanation:** Sloppy quorum does not guarantee linearizable reads immediately (C).

---

### Q40

**Answer:** A, C, D

**Explanation:** Leaders require election/votes (B).

---

### Q41

**Answer:** A, B, C

**Explanation:** Outbox complements local ACID; does not replace it (D).

---

### Q42

**Answer:** A, C, D

**Explanation:** LWW can lose updates under concurrency (B).

---

### Q43

**Answer:** B, C, D

**Explanation:** Causal does not impose one global real-time order for unrelated events (A).

---

### Q44

**Answer:** B, C, D

**Explanation:** Different quorums can admit concurrent versions (A).

---

### Q45

**Answer:** B, C, D

**Explanation:** Long external payment in XA 2PC is a poor fit (A).

---

### Q46

**Answer:** A, C, D

**Explanation:** Graph complements OLTP; rarely replaces all relational SOR (B).

---

### Q47

**Answer:** A, C, D

**Explanation:** Do not assume global delivery order (B).

---

### Q48

**Answer:** B, C, D

**Explanation:** Relational ledger with constraints is appropriate (D is not an anti-pattern).

---

### Q49

**Answer:** A, B, D

**Explanation:** Different subsystems need different models (C).

---

### Q50

**Answer:** B, C, D

**Explanation:** HTTP 201 can return before async warehouse processing (A).
