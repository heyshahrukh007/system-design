# Distributed Systems Fundamentals — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-11-answers.md](./answer-key/day-11-answers.md)




---

### Q01 [Easy] [Case Study] — ReplicaWorks Partition Response





**Context:** A network partition splits ReplicaWorks between US-East and EU-West. Shopping carts and inventory stock live in separate replicated stores.

**Select all that apply.**

Which CAP-aligned responses fit typical product choices?

- [ ] A. On a real WAN you can ignore partition tolerance and design for CA only
- [ ] B. Under partition you cannot guarantee both strict latest-read consistency and successful responses on every non-failing node
- [ ] C. Carts may stay available on each side and reconcile conflicts after heal (AP lean)
- [ ] D. Stock decrement for checkout should refuse or error rather than silently oversell (CP lean)

---

### Q02 [Easy] [Case Study] — ReplicaWorks Catalog Replication Latency





**Context:** ReplicaWorks serves product catalog reads globally. The network is healthy; replicas sync asynchronously to cut write ACK latency.

**Select all that apply.**

Which PACELC / healthy-network statements apply?

- [ ] A. When there is no partition, the trade-off is often latency vs consistency
- [ ] B. Waiting for all replicas before ACK increases latency in exchange for fresher reads
- [ ] C. PACELC only applies during partitions; normal operation has no consistency cost
- [ ] D. Async replication to followers lowers write latency but allows briefly stale reads

---

### Q03 [Easy] [Case Study] — ReplicaWorks Read Freshness by Domain





**Context:** ReplicaWorks mixes social-style signals (view counts, bios) with money paths (wallet balance, paid SKU inventory).

**Select all that apply.**

Which pairings of domain and consistency expectation are sound?

- [ ] A. View counts and like tallies can often be eventually consistent
- [ ] B. Wallet balance and inventory for paid checkout lean toward strong / linearizable reads
- [ ] C. Every product page field must be linearizable globally with no staleness trade-off
- [ ] D. Briefly stale marketing copy may be acceptable with UX that sets expectations

---

### Q04 [Easy] — Strong Consistency (Linearizability)





**Select all that apply.**

Which describe strong consistency in a distributed store?

- [ ] A. After a write completes, every subsequent read sees that write or a later one
- [ ] B. It is the same guarantee as ACID “consistency” (valid schema and constraints)
- [ ] C. Coordination across replicas typically adds latency
- [ ] D. Fits inventory decrements and unique username claims where wrong answers are costly

---

### Q05 [Easy] [Case Study] — ReplicaWorks Engagement Metrics





**Context:** ReplicaWorks bumps “items in cart” analytics and profile bios on heavily replicated nodes during flash sales.

**Select all that apply.**

Which fit eventual consistency?

- [ ] A. Reads may return stale values until replication catches up
- [ ] B. If writes stop, replicas eventually converge to the same value
- [ ] C. CDN-cached pages and secondary indexes that catch up async are common examples
- [ ] D. Eventual consistency never requires application-level conflict or merge rules

---

### Q06 [Easy] [Case Study] — ReplicaWorks Profile After Save





**Context:** A seller updates their ReplicaWorks shop banner and immediately refreshes their dashboard.

**Select all that apply.**

Which practices support read-your-writes?

- [ ] A. Route the user’s reads after write to the primary or a sticky replica
- [ ] B. Every other user must see the new banner in the same millisecond
- [ ] C. Session-scoped guarantees for “my settings” UIs are a typical use case
- [ ] D. Pass a version token on reads so the store returns at least what the client already wrote

---

### Q07 [Easy] — Causal Consistency





**Select all that apply.**

Which statements about causal consistency are correct?

- [ ] A. Comment threads and related event chains are a natural fit
- [ ] B. Concurrent unrelated writes may appear in different orders to different clients
- [ ] C. It is strictly stronger than linearizability for all operations
- [ ] D. A reply must not be visible without its parent comment in the thread

---

### Q08 [Easy] [Case Study] — ReplicaWorks Session Store Quorum





**Context:** ReplicaWorks stores session tokens on N=3 replicas with tunable W and R.

**Select all that apply.**

Which quorum facts apply?

- [ ] A. W + R > N makes read and write replica sets overlap for visibility of the latest write
- [ ] B. W = 1 and R = 1 with N = 3 is the strongest overlap configuration
- [ ] C. W = 2 and R = 2 with N = 3 is a classic majority quorum
- [ ] D. Raising W generally slows writes but improves durability of acknowledged data

---

### Q09 [Easy] — Leader–Follower Replication





**Select all that apply.**

Which are true of leader–follower (primary–replica) replication?

- [ ] A. A single writer simplifies conflict reasoning
- [ ] B. One leader accepts all writes for that shard
- [ ] C. Followers replicate the log and often serve reads
- [ ] D. Failover and leader promotion are never needed

---

### Q10 [Easy] — Multi-Leader Replication





**Select all that apply.**

Which are real trade-offs of multi-leader replication?

- [ ] A. The same row updated in two regions can produce write conflicts
- [ ] B. Conflict resolution is never required if you use two leaders
- [ ] C. Writes can stay local to a region for lower latency
- [ ] D. Last-write-wins by timestamp can discard a logically newer update under clock skew

---

### Q11 [Easy] [Case Study] — ReplicaWorks Cart KV





**Context:** ReplicaWorks uses a Dynamo-style leaderless store for ephemeral cart lines with sloppy quorum when a preferred node is down.

**Select all that apply.**

Which leaderless properties apply?

- [ ] A. Per-request READ/WRITE levels (ONE, QUORUM, ALL) tune latency vs safety
- [ ] B. Hinted handoff and read repair are never needed once quorum succeeds
- [ ] C. No designated leader must be elected for each write
- [ ] D. Clients or coordinators write to multiple replicas; quorum defines success

---

### Q12 [Easy] — Consensus in Production





**Select all that apply.**

Where does distributed consensus typically appear?

- [ ] A. Agreeing on a replicated log for state machine replication
- [ ] B. As the default path for every user-facing product row at web scale
- [ ] C. etcd, Consul, or ZooKeeper-style control plane metadata
- [ ] D. Commit after a majority of nodes acknowledge a log entry (Raft-style)

---

### Q13 [Easy] [Case Study] — ReplicaWorks Checkout Coordination





**Context:** Checkout touches inventory, payment, and order services with separate databases.

**Select all that apply.**

Which distributed coordination patterns fit microservices checkout?

- [ ] A. Sagas provide the same cross-service ACID isolation as one global 2PC transaction
- [ ] B. Saga: local transactions plus compensating steps on failure
- [ ] C. XA-style 2PC across HTTP services is rarely the default choice
- [ ] D. Two-phase commit: prepare locks across participants, then commit or abort

---

### Q14 [Easy] — Transactional Outbox





**Select all that apply.**

Which describe the transactional outbox pattern?

- [ ] A. Insert the business row and an outbox event row in one local DB transaction
- [ ] B. It addresses the crash between DB commit and message publish
- [ ] C. A relay worker publishes from the outbox and marks rows sent
- [ ] D. Outbox alone removes the need for idempotent consumers

---

### Q15 [Easy] — Idempotency Basics





**Select all that apply.**

Which are sound idempotency practices?

- [ ] A. Network retries and double-clicks are rare enough to skip idempotent design
- [ ] B. Natural keys with INSERT … ON CONFLICT DO NOTHING for deduplication
- [ ] C. Client-supplied idempotency keys with stored first-success responses
- [ ] D. At-least-once delivery plus idempotent handlers approximates exactly-once effects

---

### Q16 [Medium] — CAP Misconceptions





**Select all that apply.**

Which clarify common CAP misunderstandings?

- [ ] A. Partition tolerance is required on real networks; partitions happen
- [ ] B. A CA system remains fully CA across a WAN partition without trade-offs
- [ ] C. CP systems may reject writes or reads when a quorum cannot be reached
- [ ] D. AP systems may serve from local replicas and diverge until reconciliation

---

### Q17 [Medium] [Case Study] — ReplicaWorks Multi-Region Catalog Editors





**Context:** ReplicaWorks lets merchandisers in US and EU edit the same SKU catalog with a leader per region.

**Select all that apply.**

Which risks and mitigations are real?

- [ ] A. Multi-leader is operationally identical to single-leader with zero extra work
- [ ] B. Partitioning or key design so concurrent edits collide less often helps
- [ ] C. Concurrent edits to one SKU need merge policy (LWW, app rules, or CRDTs)
- [ ] D. Clock skew can make naive LWW keep the wrong version

---

### Q18 [Medium] — Monotonic Reads





**Select all that apply.**

Which describe monotonic reads?

- [ ] A. After observing value v, later reads do not return older values
- [ ] B. Reading different lagging replicas without stickiness can cause “time travel”
- [ ] C. Sticky routing to the same replica or tracking minimum version helps
- [ ] D. Monotonic reads imply linearizability for all clients globally

---

### Q19 [Medium] [Case Study] — ReplicaWorks Tunable Quorum per Operation





**Context:** The same ReplicaWorks Cassandra cluster serves flash-sale counters and credential updates.

**Select all that apply.**

Which tunable consistency choices fit?

- [ ] A. Analytics counter increment with WRITE ONE for low latency
- [ ] B. Password or API secret change with QUORUM or ALL
- [ ] C. Different requests on the same cluster can pick different W and R
- [ ] D. W = 1 and R = 1 with N = 3 satisfies W + R > N

---

### Q20 [Medium] — Sloppy Quorum and Hinted Handoff





**Select all that apply.**

Which statements about sloppy quorum and hinted handoff are correct?

- [ ] A. Writes may land on substitute nodes when preferred replicas are unavailable
- [ ] B. The pattern leans toward higher availability (AP) with more repair work
- [ ] C. Anti-entropy and read repair become unnecessary permanently
- [ ] D. When the preferred owner returns, hinted writes are forwarded to it

---

### Q21 [Medium] — Read Repair and Anti-Entropy





**Select all that apply.**

Which describe keeping leaderless replicas aligned over time?

- [ ] A. Quorum gives a request-time guarantee; background repair maintains health
- [ ] B. Read repair compares versions on read and updates stale replicas
- [ ] C. Periodic anti-entropy (e.g., Merkle-tree sync) complements read repair
- [ ] D. Read repair applies only to leader–follower, never leaderless stores

---

### Q22 [Medium] [Case Study] — ReplicaWorks Inventory Quorum N=5





**Context:** ReplicaWorks stores reservation tokens on five replicas; operations use W = 3 and R = 3.

**Select all that apply.**

Which statements are correct?

- [ ] A. W + R > N (6 > 5) yields overlapping read and write sets
- [ ] B. Version vectors or timestamps are still needed to pick the newest value on read
- [ ] C. W = N and R = 1 minimizes write latency while maximizing read latency
- [ ] D. Majority W and R is a balanced durability and freshness profile

---

### Q23 [Medium] — Sync vs Async Followers





**Select all that apply.**

In leader–follower replication, how do sync and async followers differ?

- [ ] A. Sync replication increases write latency before ACK
- [ ] B. Async replication risks losing recent writes if the leader fails before replicate
- [ ] C. Async followers always provide stronger durability than sync on ACK
- [ ] D. Sync followers move acknowledged writes closer to strong durability

---

### Q24 [Medium] [Case Study] — ReplicaWorks Primary Failover





**Context:** A network blip isolates the old Postgres primary; Patroni promotes a follower.

**Select all that apply.**

Which split-brain and mitigation facts apply?

- [ ] A. An unfenced old primary can still accept writes alongside the new primary
- [ ] B. Fencing tokens or leases help storage reject stale leader writes
- [ ] C. A brief partition never produces two writers if both nodes are alive
- [ ] D. Consensus-backed leadership stores reduce ambiguous primary claims

---

### Q25 [Medium] — Raft (Conceptual)





**Select all that apply.**

Which Raft ideas matter for system design?

- [ ] A. Monotonic terms help followers reject stale leaders
- [ ] B. The leader appends to a log; a majority ack commits an entry
- [ ] C. Followers replicate the leader’s log for state machine replication
- [ ] D. The FLP result means production clusters never elect leaders

---

### Q26 [Medium] — Consensus Log vs Quorum KV





**Select all that apply.**

How do consensus logs and Dynamo-style quorum KV differ?

- [ ] A. Consensus targets one ordered history; quorum KV targets high availability I/O
- [ ] B. Quorum KV may allow concurrent writes repaired later; the log avoids ordering conflicts
- [ ] C. Every business write should flow through a global Raft cluster for scale
- [ ] D. Control plane metadata (leader, config) fits consensus; user data plane often does not

---

### Q27 [Medium] [Case Study] — ReplicaWorks Saga Failure at Payment





**Context:** Checkout saga: reserve inventory → charge card → create order. Payment fails after a successful reserve.

**Select all that apply.**

Which saga behaviors apply?

- [ ] A. The platform automatically performs a cross-service SQL ROLLBACK without compensations
- [ ] B. Other users might briefly see reserved-but-unpaid inventory
- [ ] C. Compensating steps must be idempotent under retries
- [ ] D. Run compensating release of the inventory reservation

---

### Q28 [Medium] [Case Study] — ReplicaWorks Order Events





**Context:** After order creation, ReplicaWorks emits events to email, warehouse, and analytics via Kafka.

**Select all that apply.**

Which saga and messaging patterns fit?

- [ ] A. Choreography: each service reacts to events without a central coordinator
- [ ] B. Orchestration: a coordinator service drives step order explicitly
- [ ] C. Both avoid holding distributed locks across services like long 2PC
- [ ] D. Choreography never pairs with transactional outbox on the producer

---

### Q29 [Medium] — Two-Phase Commit Limits





**Select all that apply.**

Which are real limitations of two-phase commit (2PC)?

- [ ] A. Participants may hold locks during the prepare phase
- [ ] B. A coordinator crash mid-protocol can block participants
- [ ] C. 2PC is ideal for long-running chains of HTTP microservice calls
- [ ] D. Cross-region prepare rounds multiply latency

---

### Q30 [Medium] [Case Study] — ReplicaWorks LWW on Catalog Fields





**Context:** Two regions update the same catalog document with wall-clock timestamps for LWW.

**Select all that apply.**

Which clock and conflict lessons apply?

- [ ] A. Skewed clocks can cause LWW to keep the wrong value
- [ ] B. NTP step corrections can reorder perceived write times
- [ ] C. Wall time alone is a reliable sole authority for multi-writer merges
- [ ] D. Vector clocks help detect concurrent siblings instead of blind LWW

---

### Q31 [Medium] — Lamport Timestamps





**Select all that apply.**

Which describe Lamport logical clocks?

- [ ] A. On receive, update t = max(local, message) + 1
- [ ] B. Useful for debugging order and some versioning when total order suffices
- [ ] C. If A happens-before B, then Lamport(A) < Lamport(B)
- [ ] D. Lamport(A) < Lamport(B) always implies A happens-before B

---

### Q32 [Medium] [Case Study] — ReplicaWorks Chat Ordering





**Context:** ReplicaWorks chat spans US and EU data centers; messages must read naturally per conversation.

**Select all that apply.**

Which ordering approaches fit?

- [ ] A. Order by conversation partition, not a single global wall clock across DCs
- [ ] B. A stream partition keyed by conversation ID gives total order within that chat
- [ ] C. Synchronizing wall clocks across DCs alone guarantees global message order
- [ ] D. Causal guarantees matter so replies are not seen without their parent message

---

### Q33 [Medium] — SQL vs Document Stores





**Select all that apply.**

Which comparisons between relational SQL and document stores are fair?

- [ ] A. Checkout order headers and line items often map cleanly to relational models
- [ ] B. SQL excels at multi-row ACID transactions and joins in one database
- [ ] C. A document store is always the best choice for a financial ledger
- [ ] D. Documents fit flexible schema and whole-aggregate reads by ID

---

### Q34 [Medium] — Key–Value vs Wide-Column





**Select all that apply.**

Which distinguish key–value from wide-column stores?

- [ ] A. KV is opaque get/put by key with minimal query model
- [ ] B. Wide-column rows use partition keys and clustering columns for time-ordered data
- [ ] C. Wide-column stores support rich ad-hoc joins like normalized SQL
- [ ] D. Cassandra-style wide-column systems often expose tunable quorum reads and writes

---

### Q35 [Medium] [Case Study] — ReplicaWorks Polyglot Persistence





**Context:** ReplicaWorks runs Postgres for orders, Redis for sessions, Elasticsearch for search, and Cassandra for activity timelines.

**Select all that apply.**

Which architecture choices are sound?

- [ ] A. Cross-service checkout uses saga plus outbox rather than XA everywhere
- [ ] B. Polyglot persistence is normal at scale, not a smell by itself
- [ ] C. Match each store to access pattern, consistency, and scale needs
- [ ] D. Default to one global 2PC transaction spanning all stores for every request

---

### Q36 [Hard] — Consistency Model Spectrum





**Select all that apply.**

Which distinctions among consistency models are correct?

- [ ] A. Sequential consistency: all clients see the same order, not necessarily real-time order
- [ ] B. Linearizability is the strongest model described for “read latest write globally”
- [ ] C. Sequential consistency and eventual consistency are the same guarantee
- [ ] D. Bounded staleness caps how far behind or how many versions reads may lag

---

### Q37 [Hard] [Case Study] — ReplicaWorks Partition Checkout Policy





**Context:** During a partition, the payment shard cannot reach a majority; catalog CDN still serves cached pages.

**Select all that apply.**

Which CP vs AP style choices fit?

- [ ] A. Strong linearizable reads everywhere with zero added latency cost
- [ ] B. For money paths, an explicit error is often better than silent oversell
- [ ] C. Refuse inventory decrement or payment commit without quorum
- [ ] D. Continue browse-only catalog from local or cached replicas

---

### Q38 [Hard] — Quorum Latency Profiles





**Select all that apply.**

For N = 3, which statements about W and R trade-offs apply?

- [ ] A. W = 1, R = N yields fast writes and slower reads that contact all replicas
- [ ] B. W = 1, R = N and W = N, R = 1 impose identical latency on writes and reads
- [ ] C. W = N, R = 1 waits for all replicas on write and reads from one
- [ ] D. Even with quorum overlap, versioning is needed if replicas apply writes at different times

---

### Q39 [Hard] [Case Study] — ReplicaWorks Sloppy Quorum During Outage





**Context:** One preferred replica is down; writes use sloppy quorum with hinted handoff to a substitute node.

**Select all that apply.**

Which consequences apply?

- [ ] A. Repair complexity increases compared to strict quorums only on preferred nodes
- [ ] B. When the owner recovers, hinted writes should be delivered to it
- [ ] C. Clients always observe linearizable reads during sloppy writes
- [ ] D. The design trades stronger partition availability for weaker immediate consistency

---

### Q40 [Hard] — FLP and Practical Consensus





**Select all that apply.**

Which reconcile theory with production consensus systems?

- [ ] A. FLP: perfect consensus is impossible in fully asynchronous models with crashes
- [ ] B. Real systems use timeouts, failure detectors, or partial synchrony to progress
- [ ] C. Agreement, validity, and termination are core consensus properties (informally)
- [ ] D. Two nodes can safely pick different leaders forever without votes or terms

---

### Q41 [Hard] [Case Study] — ReplicaWorks Outbox Relay Stuck





**Context:** Orders commit in Postgres with outbox rows, but the relay worker stalls for ten minutes.

**Select all that apply.**

Which operational and design facts apply?

- [ ] A. Idempotent consumers tolerate duplicate publishes after relay retries
- [ ] B. Downstream warehouse consumers miss events until relay catches up
- [ ] C. Outbox removes the need for local ACID transactions in the order service
- [ ] D. Consumer inbox deduplication by message ID skips replays safely

---

### Q42 [Hard] — Multi-Leader Conflict Handling





**Select all that apply.**

Which are valid strategies when multi-leader conflicts occur?

- [ ] A. CRDT data types that merge commutatively
- [ ] B. Application-specific merge rules (e.g., union of tags)
- [ ] C. Key or partition design to reduce concurrent writes on the same record
- [ ] D. Last-write-wins never drops user updates under concurrency

---

### Q43 [Hard] [Case Study] — ReplicaWorks Support Thread Visibility





**Context:** Alice opens a ticket, Bob replies, Charlie loads the thread from a lagging replica.

**Select all that apply.**

Which causal and replication expectations apply?

- [ ] A. Version vectors help detect concurrent writes that are not ordered by causality
- [ ] B. Causal consistency requires global real-time ordering of all events on the site
- [ ] C. Unrelated tickets may appear in different orders to different viewers under causal model
- [ ] D. Charlie must not see Bob’s reply without Alice’s original message

---

### Q44 [Hard] — Leaderless Write Conflicts





**Select all that apply.**

Under leaderless quorum writes, which are true?

- [ ] A. Concurrent writes to overlapping quorums can produce sibling versions
- [ ] B. The application or merge policy must resolve or present conflicts
- [ ] C. A single-leader log per partition avoids conflicting write orders for that partition
- [ ] D. Quorum alone guarantees only one successful write can ever exist per key

---

### Q45 [Hard] [Case Study] — ReplicaWorks 2PC vs Saga Decision





**Context:** Platform team debates XA 2PC vs orchestrated saga for inventory, payment, and order microservices across regions.

**Select all that apply.**

Which architectural judgments fit?

- [ ] A. Sagas require designing visible intermediate states, timeouts, and UX
- [ ] B. 2PC coordinator bottleneck and blocking fit poorly for long cross-service flows
- [ ] C. 2PC is ideal when an external payment gateway takes eight minutes inside one XA transaction
- [ ] D. If all checkout data lived in one Postgres, a single local transaction could suffice

---

### Q46 [Hard] — Storage Family Selection





**Select all that apply.**

Which storage family mappings are appropriate?

- [ ] A. Graph databases for multi-hop relationship traversal (fraud rings, social graph)
- [ ] B. Graph stores should replace every OLTP system of record by default
- [ ] C. Relational SQL often remains authoritative for orders and billing
- [ ] D. Wide-column stores for massive time-ordered writes per partition key

---

### Q47 [Hard] [Case Study] — ReplicaWorks Cross-Region Idempotency





**Context:** Payment retries may hit different API gateways in US and EU; Kafka may redeliver charge commands.

**Select all that apply.**

Which idempotency rules apply at scale?

- [ ] A. Handlers should be safe under message reordering
- [ ] B. Handlers may assume event 2 always arrives after event 1 globally
- [ ] C. Store key → response with TTL covering the client retry window
- [ ] D. Idempotency keys must be unique across retries and regions

---

### Q48 [Hard] — Distributed Storage Anti-Patterns





**Select all that apply.**

Which are anti-patterns called out for large distributed designs?

- [ ] A. Deploy Cassandra without designing tables from query and partition paths
- [ ] B. Use Kafka as the only durable system of record with no database of record
- [ ] C. Shard PostgreSQL on day one before exhausting vertical scale and replicas
- [ ] D. Use relational storage with constraints for a financial ledger that needs invariants

---

### Q49 [Hard] [Case Study] — ReplicaWorks Platform Consistency Mix





**Context:** ReplicaWorks combines multi-region catalog (multi-leader, merge), checkout (Postgres leader–follower, saga), and chat (partition-ordered streams).

**Select all that apply.**

Which platform-level statements are correct?

- [ ] A. Control-plane leader election may rely on a consensus store (etcd, Consul, ZK)
- [ ] B. Catalog tolerates merge conflicts; checkout favors strong local ACID and careful sagas
- [ ] C. One consistency model should be mandated for every datastore and UI surface
- [ ] D. Chat ordering per conversation beats a single global timestamp across DCs

---

### Q50 [Hard] [Case Study] — ReplicaWorks End-to-End Checkout





**Context:** User checkout: saga reserves inventory, charges payment with idempotency key, creates order row and outbox event in one DB transaction, returns HTTP 201; warehouse consumes async.

**Select all that apply.**

Which statements about this flow are correct?

- [ ] A. Reserve and release inventory form a compensating pair on payment failure
- [ ] B. Order insert and outbox insert belong in the same local transaction
- [ ] C. The HTTP response must block until the warehouse consumer finishes
- [ ] D. Payment idempotency keys prevent duplicate charges when clients retry
