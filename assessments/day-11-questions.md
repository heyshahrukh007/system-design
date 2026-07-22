# Distributed Systems Fundamentals — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-11-answers.md](./answer-key/day-11-answers.md)




---

### Q01





A network partition splits ReplicaWorks between US-East and EU-West. Shopping carts and inventory stock live in separate replicated stores.

**Select all that apply.**

Which CAP-aligned responses fit typical product choices?

- [ ] A. On a real WAN you can ignore partition tolerance and design for CA only
- [ ] B. Under partition you cannot guarantee both strict latest-read consistency and successful responses on every non-failing node
- [ ] C. Carts may stay available on each side and reconcile conflicts after heal (AP lean)
- [ ] D. Stock decrement should stay available on both sides and reconcile any overselling after the partition

---

### Q02





ReplicaWorks serves product catalog reads globally. The network is healthy; replicas sync asynchronously to cut write ACK latency.

**Select all that apply.**

Which PACELC / healthy-network statements apply?

- [ ] A. Async replication guarantees followers are current when the leader acknowledges a write
- [ ] B. When there is no partition, the trade-off is often latency vs consistency
- [ ] C. PACELC only applies during partitions; normal operation has no consistency cost
- [ ] D. Waiting for all replicas before ACK increases latency in exchange for fresher reads

---

### Q03





ReplicaWorks mixes social-style signals (view counts, bios) with money paths (wallet balance, paid SKU inventory).

**Select all that apply.**

Which pairings of domain and consistency expectation are sound?

- [ ] A. Marketing copy always requires the same linearizable consistency as wallet balances
- [ ] B. Every product page field must be linearizable globally with no staleness trade-off
- [ ] C. Wallet balance and inventory for paid checkout lean toward strong / linearizable reads
- [ ] D. View counts and like tallies can often be eventually consistent

---

### Q04





**Select all that apply.**

Which describe strong consistency in a distributed store?

- [ ] A. After a write completes, every subsequent read sees that write or a later one
- [ ] B. Coordination across replicas typically adds latency
- [ ] C. It removes the need for transactions when enforcing inventory and uniqueness constraints
- [ ] D. It is the same guarantee as ACID “consistency” (valid schema and constraints)

---

### Q05





ReplicaWorks bumps “items in cart” analytics and profile bios on heavily replicated nodes during flash sales.

**Select all that apply.**

Which fit eventual consistency?

- [ ] A. If writes stop, replicas eventually converge to the same value
- [ ] B. Reads may return stale values until replication catches up
- [ ] C. Eventual consistency never requires application-level conflict or merge rules
- [ ] D. A CDN cache is eventually consistent only when every edge invalidates synchronously before a write returns

---

### Q06





A seller updates their ReplicaWorks shop banner and immediately refreshes their dashboard.

**Select all that apply.**

Which practices support read-your-writes?

- [ ] A. Route the user’s reads after write to the primary or a sticky replica
- [ ] B. Every other user must see the new banner in the same millisecond
- [ ] C. Read-your-writes requires every client worldwide to observe the session’s write immediately
- [ ] D. Pass a version token on reads so the store returns at least what the client already wrote

---

### Q07





**Select all that apply.**

Which statements about causal consistency are correct?

- [ ] A. Causal consistency requires one global total order for all unrelated comment threads
- [ ] B. It is strictly stronger than linearizability for all operations
- [ ] C. A reply must not be visible without its parent comment in the thread
- [ ] D. Concurrent unrelated writes may appear in different orders to different clients

---

### Q08





ReplicaWorks stores session tokens on N=3 replicas with tunable W and R.

**Select all that apply.**

Which quorum facts apply?

- [ ] A. W = 2 and R = 2 with N = 3 is a classic majority quorum
- [ ] B. W + R > N makes read and write replica sets overlap for visibility of the latest write
- [ ] C. W = 1 and R = 1 with N = 3 is the strongest overlap configuration
- [ ] D. Raising W always lowers write latency because fewer replicas need coordination

---

### Q09





**Select all that apply.**

Which are true of leader–follower (primary–replica) replication?

- [ ] A. Followers may accept independent writes without coordination while remaining single-leader replicas
- [ ] B. One leader accepts all writes for that shard
- [ ] C. Failover and leader promotion are never needed
- [ ] D. A single writer simplifies conflict reasoning

---

### Q10





**Select all that apply.**

Which are real trade-offs of multi-leader replication?

- [ ] A. Last-write-wins by timestamp can discard a logically newer update under clock skew
- [ ] B. Every write must synchronously cross all regions before a multi-leader system can acknowledge it
- [ ] C. Conflict resolution is never required if you use two leaders
- [ ] D. The same row updated in two regions can produce write conflicts

---

### Q11





ReplicaWorks uses a Dynamo-style leaderless store for ephemeral cart lines with sloppy quorum when a preferred node is down.

**Select all that apply.**

Which leaderless properties apply?

- [ ] A. Clients or coordinators write to multiple replicas; quorum defines success
- [ ] B. No designated leader must be elected for each write
- [ ] C. Hinted handoff and read repair are never needed once quorum succeeds
- [ ] D. Leaderless stores require one fixed cluster-wide consistency level for every request

---

### Q12





**Select all that apply.**

Where does distributed consensus typically appear?

- [ ] A. Commit after a majority of nodes acknowledge a log entry (Raft-style)
- [ ] B. Consensus is unnecessary for control-plane metadata because configuration order never matters
- [ ] C. As the default path for every user-facing product row at web scale
- [ ] D. Agreeing on a replicated log for state machine replication

---

### Q13





Checkout touches inventory, payment, and order services with separate databases.

**Select all that apply.**

Which distributed coordination patterns fit microservices checkout?

- [ ] A. Two-phase commit: prepare locks across participants, then commit or abort
- [ ] B. Sagas provide the same cross-service ACID isolation as one global 2PC transaction
- [ ] C. XA-style 2PC is usually the default for long-running calls to external payment providers
- [ ] D. Saga: local transactions plus compensating steps on failure

---

### Q14





**Select all that apply.**

Which describe the transactional outbox pattern?

- [ ] A. Insert the business row and an outbox event row in one local DB transaction
- [ ] B. It addresses the crash between DB commit and message publish
- [ ] C. The request thread must publish the event before committing the business row for the outbox to work
- [ ] D. Outbox alone removes the need for idempotent consumers

---

### Q15





**Select all that apply.**

Which are sound idempotency practices?

- [ ] A. Network retries and double-clicks are rare enough to skip idempotent design
- [ ] B. Natural keys with INSERT … ON CONFLICT DO NOTHING for deduplication
- [ ] C. Client-supplied idempotency keys with stored first-success responses
- [ ] D. At-least-once delivery guarantees exactly-once effects even when handlers are not idempotent

---

### Q16





**Select all that apply.**

Which clarify common CAP misunderstandings?

- [ ] A. A CA system remains fully CA across a WAN partition without trade-offs
- [ ] B. Partition tolerance can be omitted safely whenever both replicas are deployed in the same region
- [ ] C. AP systems may serve from local replicas and diverge until reconciliation
- [ ] D. CP systems may reject writes or reads when a quorum cannot be reached

---

### Q17





ReplicaWorks lets merchandisers in US and EU edit the same SKU catalog with a leader per region.

**Select all that apply.**

Which risks and mitigations are real?

- [ ] A. Concurrent edits to one SKU need merge policy (LWW, app rules, or CRDTs)
- [ ] B. Partitioning or key design so concurrent edits collide less often helps
- [ ] C. Wall-clock LWW is immune to clock skew because timestamps always reflect causal order
- [ ] D. Multi-leader is operationally identical to single-leader with zero extra work

---

### Q18





**Select all that apply.**

Which describe monotonic reads?

- [ ] A. Sticky routing to the same replica or tracking minimum version helps
- [ ] B. Monotonic reads imply linearizability for all clients globally
- [ ] C. After observing value v, later reads do not return older values
- [ ] D. Reading arbitrary lagging replicas automatically preserves monotonic reads without version tracking

---

### Q19





The same ReplicaWorks Cassandra cluster serves flash-sale counters and credential updates.

**Select all that apply.**

Which tunable consistency choices fit?

- [ ] A. WRITE ONE is the strongest consistency choice for credential changes because it waits for every replica
- [ ] B. Password or API secret change with QUORUM or ALL
- [ ] C. Different requests on the same cluster can pick different W and R
- [ ] D. W = 1 and R = 1 with N = 3 satisfies W + R > N

---

### Q20





**Select all that apply.**

Which statements about sloppy quorum and hinted handoff are correct?

- [ ] A. Writes may land on substitute nodes when preferred replicas are unavailable
- [ ] B. Sloppy quorum provides strict linearizability during partitions without any reconciliation work
- [ ] C. Anti-entropy and read repair become unnecessary permanently
- [ ] D. When the preferred owner returns, hinted writes are forwarded to it

---

### Q21





**Select all that apply.**

Which describe keeping leaderless replicas aligned over time?

- [ ] A. Once one quorum succeeds, background repair and anti-entropy can be disabled permanently
- [ ] B. Read repair compares versions on read and updates stale replicas
- [ ] C. Periodic anti-entropy (e.g., Merkle-tree sync) complements read repair
- [ ] D. Read repair applies only to leader–follower, never leaderless stores

---

### Q22





ReplicaWorks stores reservation tokens on five replicas; operations use W = 3 and R = 3.

**Select all that apply.**

Which statements are correct?

- [ ] A. Majority W and R is a balanced durability and freshness profile
- [ ] B. W = N and R = 1 minimizes write latency while maximizing read latency
- [ ] C. Quorum overlap makes version metadata unnecessary because replicas always apply writes simultaneously
- [ ] D. W + R > N (6 > 5) yields overlapping read and write sets

---

### Q23





**Select all that apply.**

In leader–follower replication, how do sync and async followers differ?

- [ ] A. Sync replication increases write latency before ACK
- [ ] B. Async replication risks losing recent writes if the leader fails before replicate
- [ ] C. Async followers always provide stronger durability than sync on ACK
- [ ] D. Synchronous followers reduce durability because acknowledged writes exist on fewer nodes

---

### Q24





A network blip isolates the old Postgres primary; Patroni promotes a follower.

**Select all that apply.**

Which split-brain and mitigation facts apply?

- [ ] A. An unfenced old primary can still accept writes alongside the new primary
- [ ] B. Fencing tokens or leases help storage reject stale leader writes
- [ ] C. A brief partition never produces two writers if both nodes are alive
- [ ] D. Consensus-backed leadership alone fences every stale primary from storage without leases or tokens

---

### Q25





**Select all that apply.**

Which Raft ideas matter for system design?

- [ ] A. The leader appends to a log; a majority ack commits an entry
- [ ] B. Monotonic terms help followers reject stale leaders
- [ ] C. The FLP result means production clusters never elect leaders
- [ ] D. Raft followers execute unrelated command orders while still guaranteeing the same replicated state

---

### Q26





**Select all that apply.**

How do consensus logs and Dynamo-style quorum KV differ?

- [ ] A. Consensus targets one ordered history; quorum KV targets high availability I/O
- [ ] B. Quorum KV may allow concurrent writes repaired later; the log avoids ordering conflicts
- [ ] C. Every business write should flow through a global Raft cluster for scale
- [ ] D. Control plane metadata (leader, config) fits consensus; user data plane often does not

---

### Q27





Checkout saga: reserve inventory → charge card → create order. Payment fails after a successful reserve.

**Select all that apply.**

Which saga behaviors apply?

- [ ] A. The platform automatically performs a cross-service SQL ROLLBACK without compensations
- [ ] B. Run compensating release of the inventory reservation
- [ ] C. Other users might briefly see reserved-but-unpaid inventory
- [ ] D. Compensating steps must be idempotent under retries

---

### Q28





After order creation, ReplicaWorks emits events to email, warehouse, and analytics via Kafka.

**Select all that apply.**

Which saga and messaging patterns fit?

- [ ] A. Choreography: each service reacts to events without a central coordinator
- [ ] B. Orchestration: a coordinator service drives step order explicitly
- [ ] C. Both avoid holding distributed locks across services like long 2PC
- [ ] D. Choreography never pairs with transactional outbox on the producer

---

### Q29





**Select all that apply.**

Which are real limitations of two-phase commit (2PC)?

- [ ] A. Cross-region prepare rounds multiply latency
- [ ] B. Participants may hold locks during the prepare phase
- [ ] C. 2PC is ideal for long-running chains of HTTP microservice calls
- [ ] D. A coordinator crash mid-protocol can block participants

---

### Q30





Two regions update the same catalog document with wall-clock timestamps for LWW.

**Select all that apply.**

Which clock and conflict lessons apply?

- [ ] A. Wall time alone is a reliable sole authority for multi-writer merges
- [ ] B. Skewed clocks can cause LWW to keep the wrong value
- [ ] C. NTP step corrections can reorder perceived write times
- [ ] D. Vector clocks help detect concurrent siblings instead of blind LWW

---

### Q31





**Select all that apply.**

Which describe Lamport logical clocks?

- [ ] A. Lamport(A) < Lamport(B) always implies A happens-before B
- [ ] B. If A happens-before B, then Lamport(A) < Lamport(B)
- [ ] C. Useful for debugging order and some versioning when total order suffices
- [ ] D. On receive, update t = max(local, message) + 1

---

### Q32





ReplicaWorks chat spans US and EU data centers; messages must read naturally per conversation.

**Select all that apply.**

Which ordering approaches fit?

- [ ] A. Causal guarantees matter so replies are not seen without their parent message
- [ ] B. Synchronizing wall clocks across DCs alone guarantees global message order
- [ ] C. A stream partition keyed by conversation ID gives total order within that chat
- [ ] D. Order by conversation partition, not a single global wall clock across DCs

---

### Q33





**Select all that apply.**

Which comparisons between relational SQL and document stores are fair?

- [ ] A. A document store is always the best choice for a financial ledger
- [ ] B. SQL excels at multi-row ACID transactions and joins in one database
- [ ] C. Documents fit flexible schema and whole-aggregate reads by ID
- [ ] D. Checkout order headers and line items often map cleanly to relational models

---

### Q34





**Select all that apply.**

Which distinguish key–value from wide-column stores?

- [ ] A. Wide-column stores support rich ad-hoc joins like normalized SQL
- [ ] B. Wide-column rows use partition keys and clustering columns for time-ordered data
- [ ] C. Cassandra-style wide-column systems often expose tunable quorum reads and writes
- [ ] D. KV is opaque get/put by key with minimal query model

---

### Q35





ReplicaWorks runs Postgres for orders, Redis for sessions, Elasticsearch for search, and Cassandra for activity timelines.

**Select all that apply.**

Which architecture choices are sound?

- [ ] A. Match each store to access pattern, consistency, and scale needs
- [ ] B. Default to one global 2PC transaction spanning all stores for every request
- [ ] C. Cross-service checkout uses saga plus outbox rather than XA everywhere
- [ ] D. Polyglot persistence is normal at scale, not a smell by itself

---

### Q36





**Select all that apply.**

Which distinctions among consistency models are correct?

- [ ] A. Bounded staleness caps how far behind or how many versions reads may lag
- [ ] B. Sequential consistency: all clients see the same order, not necessarily real-time order
- [ ] C. Sequential consistency and eventual consistency are the same guarantee
- [ ] D. Linearizability is the strongest model described for “read latest write globally”

---

### Q37





During a partition, the payment shard cannot reach a majority; catalog CDN still serves cached pages.

**Select all that apply.**

Which CP vs AP style choices fit?

- [ ] A. Refuse inventory decrement or payment commit without quorum
- [ ] B. Strong linearizable reads everywhere with zero added latency cost
- [ ] C. For money paths, an explicit error is often better than silent oversell
- [ ] D. Continue browse-only catalog from local or cached replicas

---

### Q38





**Select all that apply.**

For N = 3, which statements about W and R trade-offs apply?

- [ ] A. W = 1, R = N yields fast writes and slower reads that contact all replicas
- [ ] B. Even with quorum overlap, versioning is needed if replicas apply writes at different times
- [ ] C. W = 1, R = N and W = N, R = 1 impose identical latency on writes and reads
- [ ] D. W = N, R = 1 waits for all replicas on write and reads from one

---

### Q39





One preferred replica is down; writes use sloppy quorum with hinted handoff to a substitute node.

**Select all that apply.**

Which consequences apply?

- [ ] A. The design trades stronger partition availability for weaker immediate consistency
- [ ] B. Repair complexity increases compared to strict quorums only on preferred nodes
- [ ] C. Clients always observe linearizable reads during sloppy writes
- [ ] D. When the owner recovers, hinted writes should be delivered to it

---

### Q40





**Select all that apply.**

Which reconcile theory with production consensus systems?

- [ ] A. FLP: perfect consensus is impossible in fully asynchronous models with crashes
- [ ] B. Two nodes can safely pick different leaders forever without votes or terms
- [ ] C. Real systems use timeouts, failure detectors, or partial synchrony to progress
- [ ] D. Agreement, validity, and termination are core consensus properties (informally)

---

### Q41





Orders commit in Postgres with outbox rows, but the relay worker stalls for ten minutes.

**Select all that apply.**

Which operational and design facts apply?

- [ ] A. Downstream warehouse consumers miss events until relay catches up
- [ ] B. Idempotent consumers tolerate duplicate publishes after relay retries
- [ ] C. Consumer inbox deduplication by message ID skips replays safely
- [ ] D. Outbox removes the need for local ACID transactions in the order service

---

### Q42





**Select all that apply.**

Which are valid strategies when multi-leader conflicts occur?

- [ ] A. Key or partition design to reduce concurrent writes on the same record
- [ ] B. Last-write-wins never drops user updates under concurrency
- [ ] C. CRDT data types that merge commutatively
- [ ] D. Application-specific merge rules (e.g., union of tags)

---

### Q43





Alice opens a ticket, Bob replies, Charlie loads the thread from a lagging replica.

**Select all that apply.**

Which causal and replication expectations apply?

- [ ] A. Causal consistency requires global real-time ordering of all events on the site
- [ ] B. Unrelated tickets may appear in different orders to different viewers under causal model
- [ ] C. Version vectors help detect concurrent writes that are not ordered by causality
- [ ] D. Charlie must not see Bob’s reply without Alice’s original message

---

### Q44





**Select all that apply.**

Under leaderless quorum writes, which are true?

- [ ] A. Quorum alone guarantees only one successful write can ever exist per key
- [ ] B. The application or merge policy must resolve or present conflicts
- [ ] C. Concurrent writes to overlapping quorums can produce sibling versions
- [ ] D. A single-leader log per partition avoids conflicting write orders for that partition

---

### Q45





Platform team debates XA 2PC vs orchestrated saga for inventory, payment, and order microservices across regions.

**Select all that apply.**

Which architectural judgments fit?

- [ ] A. 2PC is ideal when an external payment gateway takes eight minutes inside one XA transaction
- [ ] B. If all checkout data lived in one Postgres, a single local transaction could suffice
- [ ] C. Sagas require designing visible intermediate states, timeouts, and UX
- [ ] D. 2PC coordinator bottleneck and blocking fit poorly for long cross-service flows

---

### Q46





**Select all that apply.**

Which storage family mappings are appropriate?

- [ ] A. Graph databases for multi-hop relationship traversal (fraud rings, social graph)
- [ ] B. Graph stores should replace every OLTP system of record by default
- [ ] C. Relational SQL often remains authoritative for orders and billing
- [ ] D. Wide-column stores for massive time-ordered writes per partition key

---

### Q47





Payment retries may hit different API gateways in US and EU; Kafka may redeliver charge commands.

**Select all that apply.**

Which idempotency rules apply at scale?

- [ ] A. Handlers should be safe under message reordering
- [ ] B. Handlers may assume event 2 always arrives after event 1 globally
- [ ] C. Store key → response with TTL covering the client retry window
- [ ] D. Idempotency keys must be unique across retries and regions

---

### Q48





**Select all that apply.**

Which are anti-patterns called out for large distributed designs?

- [ ] A. Use relational storage with constraints for a financial ledger that needs invariants
- [ ] B. Deploy Cassandra without designing tables from query and partition paths
- [ ] C. Shard PostgreSQL on day one before exhausting vertical scale and replicas
- [ ] D. Use Kafka as the only durable system of record with no database of record

---

### Q49





ReplicaWorks combines multi-region catalog (multi-leader, merge), checkout (Postgres leader–follower, saga), and chat (partition-ordered streams).

**Select all that apply.**

Which platform-level statements are correct?

- [ ] A. Chat ordering per conversation beats a single global timestamp across DCs
- [ ] B. Control-plane leader election may rely on a consensus store (etcd, Consul, ZK)
- [ ] C. One consistency model should be mandated for every datastore and UI surface
- [ ] D. Catalog tolerates merge conflicts; checkout favors strong local ACID and careful sagas

---

### Q50





User checkout: saga reserves inventory, charges payment with idempotency key, creates order row and outbox event in one DB transaction, returns HTTP 201; warehouse consumes async.

**Select all that apply.**

Which statements about this flow are correct?

- [ ] A. The HTTP response must block until the warehouse consumer finishes
- [ ] B. Reserve and release inventory form a compensating pair on payment failure
- [ ] C. Order insert and outbox insert belong in the same local transaction
- [ ] D. Payment idempotency keys prevent duplicate charges when clients retry
