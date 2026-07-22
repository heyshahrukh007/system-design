# Stream Processing & Event Architecture — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-12-answers.md](./answer-key/day-12-answers.md)





---

### Q01




**Select all that apply.**
Which choices fit a wallet that must reconstruct balances at any past date?

- [ ] A. Mutable events that are overwritten whenever the wallet balance changes
- [ ] B. An append-only authoritative history
- [ ] C. Overwritten rows with discarded history
- [ ] D. Periodic snapshots plus newer events

---

### Q02




**Select all that apply.**
Which are strengths of CRUD for a small current-state application?

- [ ] A. Automatic immutable history
- [ ] B. A requirement to replay every historical mutation before reading current state
- [ ] C. Straightforward current-state queries
- [ ] D. Familiar relational and ORM tooling

---

### Q03




**Select all that apply.**
An internal editor needs only current state and has no audit requirement. Which conclusions follow?

- [ ] A. Full replay history is mandatory
- [ ] B. Event sourcing adds avoidable complexity
- [ ] C. Physical CQRS is mandatory
- [ ] D. CRUD is likely sufficient

---

### Q04




**Select all that apply.**
Which statements correctly distinguish commands from events?

- [ ] A. Every broker message is an event
- [ ] B. Events are commands that can be rejected before anything occurs
- [ ] C. Events record facts that occurred
- [ ] D. Commands express intent and may be rejected

---

### Q05




**Select all that apply.**
Which requirements strongly favor event sourcing?

- [ ] A. Minimum complexity for a settings page
- [ ] B. Multiple rebuildable projections
- [ ] C. Historical state reconstruction
- [ ] D. Eliminating the need to evolve schemas or maintain old event readers

---

### Q06




**Select all that apply.**
An aggregate has millions of events. Which actions improve load time without breaking event sourcing?

- [ ] A. Delete all snapshotted events
- [ ] B. Store versioned snapshots
- [ ] C. Replay only events newer than the snapshot
- [ ] D. Rewrite old events as current state

---

### Q07




**Select all that apply.**
Which are real event-sourcing costs?

- [ ] A. Guaranteeing that no projection storage or replay operations are needed
- [ ] B. Eliminating all read-model storage
- [ ] C. Maintaining readability of old schemas
- [ ] D. Deliberate personal-data erasure design

---

### Q08




**Select all that apply.**
Which statements about CQRS are correct?

- [ ] A. Command and query models serve different needs
- [ ] B. CQRS can be logical within one deployable
- [ ] C. CQRS always requires event sourcing
- [ ] D. Physical CQRS guarantees synchronous read-model updates with no observable lag

---

### Q09




**Select all that apply.**
An order write succeeds before its read-model entry appears. Which mitigations are sound?

- [ ] A. Promise that projections never lag
- [ ] B. Read only the lagging projection and treat a missing order as a failed write
- [ ] C. Wait for a returned version token
- [ ] D. Optimistically update the UI

---

### Q10




**Select all that apply.**
Which workloads can justify separate CQRS read models?

- [ ] A. A dedicated read model is required for every primary-key lookup, regardless of scale
- [ ] B. High-volume denormalized dashboards
- [ ] C. One tiny current-row lookup
- [ ] D. Independent OLAP reporting

---

### Q11




**Select all that apply.**
Which statements support CDC for database-to-search synchronization?

- [ ] A. It always emits rich domain semantics
- [ ] B. CDC captures inserts only; updates and deletes must be polled separately
- [ ] C. It avoids an application dual write
- [ ] D. It tails committed database-log changes

---

### Q12




**Select all that apply.**
When is an outbox preferable to raw row-level CDC?

- [ ] A. State and outgoing event must commit atomically
- [ ] B. Every physical row mutation must be mirrored exactly
- [ ] C. The database connector alone infers all business event boundaries without application input
- [ ] D. Consumers need curated domain events

---

### Q13




**Select all that apply.**
A CDC connector snapshots a table and then tails its WAL. What must the design handle?

- [ ] A. No duplicate processing under any failure
- [ ] B. Checkpointed connector positions
- [ ] C. The connector may discard all changes committed while its initial snapshot is running
- [ ] D. Log retention covering connector outages

---

### Q14




**Select all that apply.**
Which CDC conditions need explicit downstream handling?

- [ ] A. Delete records or tombstones
- [ ] B. A required-field rename without migration
- [ ] C. Captured-schema changes can be ignored because every downstream decoder adapts automatically
- [ ] D. A table’s high update rate cannot affect downstream CDC throughput or lag

---

### Q15




**Select all that apply.**
Which failures expose a separate database-and-broker dual write?

- [ ] A. Publish success followed by database rollback
- [ ] B. One local transaction committing both records
- [ ] C. A broker publish failure automatically rolls back an already committed independent database transaction
- [ ] D. A retry publishing the business change twice

---

### Q16




**Select all that apply.**
Delayed mobile events feed purchase totals. Which choices improve correctness?

- [ ] A. Drop every event that arrives after processing-time ingestion begins
- [ ] B. Window by event time
- [ ] C. Treat processing time as occurrence time
- [ ] D. Include occurrence timestamps

---

### Q17




**Select all that apply.**
Which statements about watermarks are correct?

- [ ] A. They help close or emit windows
- [ ] B. Watermarks make a late-data policy unnecessary because no earlier event can arrive
- [ ] C. They estimate event-time progress
- [ ] D. They prove no earlier event can arrive

---

### Q18




**Select all that apply.**
Which window choices match their stated questions?

- [ ] A. Tumbling for non-overlapping minute counts
- [ ] B. A five-minute metric emitted each minute is a non-overlapping tumbling window
- [ ] C. Session for activity separated by idle gaps
- [ ] D. Unbounded global for routine minute counts

---

### Q19




**Select all that apply.**
A keyed stream join retains 24 hours of state. What must be designed?

- [ ] A. Keep join state unpartitioned on every worker while preserving keyed scalability
- [ ] B. Recovery checkpoints
- [ ] C. Unmeasured unlimited growth
- [ ] D. State TTL and cleanup

---

### Q20




**Select all that apply.**
Which statements about streaming joins are correct?

- [ ] A. Stream-table joins cannot use reference data to enrich incoming records
- [ ] B. Stream-stream joins usually need time bounds
- [ ] C. CDC can maintain an enrichment table
- [ ] D. Late and missing data need no policy

---

### Q21




**Select all that apply.**
One celebrity key overloads a partition. Which responses help?

- [ ] A. Add consumers while keeping one indivisible partition
- [ ] B. Combine distributed partial aggregates
- [ ] C. Salt the key where ordering permits
- [ ] D. Cluster-wide average lag alone identifies which partition contains the hot key

---

### Q22




**Select all that apply.**
Which properties characterize Lambda architecture?

- [ ] A. A historical batch path
- [ ] B. Lambda architecture uses only a batch path and has no low-latency serving updates
- [ ] C. A serving layer that merges results
- [ ] D. Guaranteed single implementation logic

---

### Q23




**Select all that apply.**
Which properties characterize Kappa architecture?

- [ ] A. No retention planning
- [ ] B. No equivalent batch and speed implementations
- [ ] C. Rebuilds with updated stream logic
- [ ] D. Kappa discards source events immediately, so historical replay is unavailable

---

### Q24




**Select all that apply.**
A company needs second-level fraud decisions and nightly finance reconciliation. Which choices are defensible?

- [ ] A. Batch finance reconciliation
- [ ] B. Stream fraud decisions
- [ ] C. Force finance entirely into sub-second processing
- [ ] D. Maintain unrelated source facts for fraud and finance so their totals may diverge

---

### Q25




**Select all that apply.**
Which are genuine Lambda-versus-Kappa trade-offs?

- [ ] A. Kappa makes historical recomputation free
- [ ] B. Lambda risks logic drift
- [ ] C. Lambda can reuse a batch estate
- [ ] D. Kappa requires replay discipline

---

### Q26




**Select all that apply.**
Which workloads usually merit real-time or near-real-time processing?

- [ ] A. Detecting a current checkout outage
- [ ] B. Updating a live operations dashboard
- [ ] C. Producing an annual export
- [ ] D. Blocking suspicious authorization

---

### Q27




**Select all that apply.**
Which workloads are good batch candidates?

- [ ] A. Blocking fraud before a response
- [ ] B. Revenue reconciliation
- [ ] C. Training over months of data
- [ ] D. Historical cohort analysis

---

### Q28




**Select all that apply.**
What should drive an analytics freshness tier?

- [ ] A. A rule that every metric is sub-second
- [ ] B. Pipeline cost and complexity
- [ ] C. Need for immediate action
- [ ] D. Cost of stale results

---

### Q29




**Select all that apply.**
Dashboard uniques are huge-scale, while usage billing must be exact. Which choices fit?

- [ ] A. Approximate billing solely to save money
- [ ] B. Approximate dashboard uniques within accepted error
- [ ] C. Document approximation as a product choice
- [ ] D. Exact auditable billing totals

---

### Q30




**Select all that apply.**
Which statements expose the exactly-once illusion?

- [ ] A. Idempotent or transactional boundaries are required
- [ ] B. A broker flag prevents every duplicate charge
- [ ] C. Retries and redelivery can still occur
- [ ] D. External sink effects determine end-to-end correctness

---

### Q31




**Select all that apply.**
A consumer may crash after charging but before committing its offset. Which safeguards matter?

- [ ] A. Atomic recording of local processed IDs and effects
- [ ] B. A stable payment idempotency key
- [ ] C. In-memory deduplication alone
- [ ] D. Crash testing at the effect-offset boundary

---

### Q32




**Select all that apply.**
Which writes are idempotent?

- [ ] A. Upsert order status to `PAID`
- [ ] B. Insert under a unique event ID
- [ ] C. Blindly increment balance on every delivery
- [ ] D. Update only from the expected prior version

---

### Q33




**Select all that apply.**
What makes an inbox-table consumer robust?

- [ ] A. Duplicate insertion preventing repeated effects
- [ ] B. Recording the inbox after an unguarded external effect
- [ ] C. A unique message-ID constraint
- [ ] D. Inbox and business writes in one transaction

---

### Q34




**Select all that apply.**
Which deduplication keys are sound?

- [ ] A. A business operation ID reused on retries
- [ ] B. A new consumer UUID per attempt
- [ ] C. A stable producer event ID
- [ ] D. A charge-scoped payment idempotency key

---

### Q35




**Select all that apply.**
A malformed event blocks a partition through infinite retries. Which responses help?

- [ ] A. Bounded backoff for transient failures
- [ ] B. Quarantine persistent failures in a DLQ
- [ ] C. Alert on DLQ depth and age
- [ ] D. Silently discard the event

---

### Q36




**Select all that apply.**
Which tests reveal idempotency defects?

- [ ] A. Replay history into a clean projection
- [ ] B. Deliver the same event twice
- [ ] C. Crash after effect but before acknowledgment
- [ ] D. Test only single-delivery success

---

### Q37




**Select all that apply.**
Consumer lag grows under steady ingress. Which measurements help isolate the cause?

- [ ] A. Sink latency and errors
- [ ] B. Topic size without group data
- [ ] C. Record lag and time lag
- [ ] D. Per-partition throughput and skew

---

### Q38




**Select all that apply.**
Which actions can reduce lag from a slow downstream database?

- [ ] A. Scale only within sink capacity
- [ ] B. Batch sink writes
- [ ] C. Apply visible backpressure
- [ ] D. Drop unprocessed business events

---

### Q39




**Select all that apply.**
Why measure lag in time as well as messages?

- [ ] A. Equal counts can represent different delays
- [ ] B. Time lag maps to freshness SLOs
- [ ] C. Count lag varies with traffic rate
- [ ] D. Time lag makes partition analysis unnecessary

---

### Q40




**Select all that apply.**
A projection bug affected seven days. What makes replay safe?

- [ ] A. Idempotent replacement or isolated rebuild
- [ ] B. A duplicate-tolerant corrected consumer
- [ ] C. Ignoring historical schemas
- [ ] D. At least seven days of source retention

---

### Q41




**Select all that apply.**
Which replay strategies reduce serving risk?

- [ ] A. Blindly reset production at peak
- [ ] B. Validate invariants before cutover
- [ ] C. Throttle replay against shared sinks
- [ ] D. Build a new projection before switching

---

### Q42




**Select all that apply.**
What should determine event-log retention?

- [ ] A. Required replay horizon
- [ ] B. Expected outage duration
- [ ] C. Cost and compliance constraints
- [ ] D. Assuming projection bugs never happen

---

### Q43




**Select all that apply.**
Which changes support a new consumer reading old events?

- [ ] A. Accept both old and new representations
- [ ] B. Reuse a field for unrelated semantics
- [ ] C. Add an optional field with a default
- [ ] D. Remove a required field without fallback

---

### Q44




**Select all that apply.**
Which steps form a safe expand-and-contract event migration?

- [ ] A. Migrate producers to the new form
- [ ] B. Remove old support after producers and lag clear
- [ ] C. Deploy consumers understanding both forms
- [ ] D. Remove old support first

---

### Q45




**Select all that apply.**
What value does a schema registry provide?

- [ ] A. Schema identity and version tracking
- [ ] B. Configured compatibility checks
- [ ] C. Producer-consumer contract governance
- [ ] D. Automatic repair of semantic breaks

---

### Q46




**Select all that apply.**
Which signals are essential for stream operations?

- [ ] A. Lag by group and partition
- [ ] B. Broker CPU alone
- [ ] C. Input/output throughput and latency
- [ ] D. Checkpoint failures and DLQ depth

---

### Q47




**Select all that apply.**
A projector has healthy CPU but views are ten minutes stale. Which conclusions follow?

- [ ] A. Resource health does not prove freshness
- [ ] B. Freshness needs a lag SLO
- [ ] C. Process liveness guarantees current views
- [ ] D. End-to-end timestamps expose delay

---

### Q48




**Select all that apply.**
A stream needs per-account ordering and horizontal scale. Which choices fit?

- [ ] A. Partition by account ID
- [ ] B. Keep one account on one partition
- [ ] C. Provision partitions for expected parallelism
- [ ] D. Randomize each event while preserving order

---

### Q49




**Select all that apply.**
How can an event-sourced service support personal-data erasure?

- [ ] A. Use erasable per-subject encryption keys
- [ ] B. Store references or redacted facts
- [ ] C. Keep unnecessary PII out of events
- [ ] D. Assume append-only storage overrides obligations

---

### Q50




**Select all that apply.**
A design uses CRUD orders, an outbox, Kafka, stream-built search, and nightly reconciliation. Which statements fit?

- [ ] A. Stream and batch consumers can share canonical events
- [ ] B. Orders remain the current-state source of truth
- [ ] C. The outbox avoids a fragile dual write
- [ ] D. The design is automatically pure event sourcing
