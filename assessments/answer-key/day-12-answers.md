# Stream Processing & Event Architecture — Answer Key (50)





---

### Q01

**Answer:** B, D

**Explanation:** An append-only history preserves every wallet change, and snapshots accelerate reconstruction. Overwritten state—whether rows or events—cannot reconstruct arbitrary past balances (C, D).

---

### Q02

**Answer:** C, D

**Explanation:** CRUD offers familiar tooling and direct current-state queries. It neither supplies immutable history (A) nor requires replaying all mutations to read current state (B).

---

### Q03

**Answer:** B, D

**Explanation:** A small current-state editor fits CRUD; event sourcing or physical CQRS would add unjustified complexity.

---

### Q04

**Answer:** C, D

**Explanation:** Commands express rejectable intent; events record facts that have occurred. Not every message is an event (A), and an event is not a still-rejectable command (B).

---

### Q05

**Answer:** B, C

**Explanation:** Historical reconstruction and rebuildable projections strongly favor event sourcing. A simple settings page does not (A), and event sourcing increases rather than eliminates schema-evolution obligations (D).

---

### Q06

**Answer:** B, C

**Explanation:** A snapshot plus subsequent events preserves the authoritative history while reducing replay work.

---

### Q07

**Answer:** C, D

**Explanation:** Old-schema readability and personal-data erasure are genuine event-sourcing costs. Projections still require storage (B), and replay and projection operations are not eliminated (A).

---

### Q08

**Answer:** A, B

**Explanation:** CQRS separates command and query models and can remain logical within one deployment. Event sourcing is optional (C), and physically separate models commonly permit rather than eliminate lag (D).

---

### Q09

**Answer:** C, D

**Explanation:** Version waiting and optimistic UI can bridge known projection lag. Reading only a lagging projection cannot distinguish lag from failure (B), and zero lag cannot be promised (A).

---

### Q10

**Answer:** B, D

**Explanation:** Independent OLAP and high-volume denormalized dashboards can justify dedicated read models. Tiny primary-key lookups do not inherently require separation (C, D).

---

### Q11

**Answer:** C, D

**Explanation:** CDC tails committed logs and avoids application dual writes. Raw changes may lack domain semantics (A), and CDC normally captures updates and deletes as well as inserts (B).

---

### Q12

**Answer:** A, D

**Explanation:** An outbox atomically commits state with curated domain events. The application defines those event boundaries; a connector cannot infer all business semantics alone (C), and exact physical mirroring favors raw CDC (B).

---

### Q13

**Answer:** B, D

**Explanation:** Snapshot-to-stream handoff requires checkpointed positions and enough log retention. Changes during the snapshot must not be discarded (C), and failures may still cause duplicates (A).

---

### Q14

**Answer:** A, B

**Explanation:** Required-field renames and delete tombstones need explicit downstream handling. Decoders do not automatically absorb every schema change (C), and hot-table volume can affect throughput, contrary to D.

---

### Q15

**Answer:** A, D

**Explanation:** Separate database and broker commits can produce duplicate publication or publish-before-rollback divergence. A failed publish cannot undo an independently committed database transaction (C); one local transaction would avoid the gap (B).

---

### Q16

**Answer:** B, D

**Explanation:** Occurrence timestamps and event-time windows preserve the meaning of delayed mobile events. Processing time is not occurrence time (C), and dropping all delayed events is not a sound lateness policy (A).

---

### Q17

**Answer:** A, C

**Explanation:** Watermarks estimate event-time progress and help trigger window results. They neither prove no earlier event can arrive (D) nor remove the need for a late-data policy (B).

---

### Q18

**Answer:** A, C

**Explanation:** Tumbling windows produce non-overlapping counts, while session windows use idle gaps. A five-minute result every minute is sliding rather than tumbling (B), and a global window does not fit routine minute counts (D).

---

### Q19

**Answer:** B, D

**Explanation:** A 24-hour join needs state TTL and recoverable checkpoints. Unlimited growth is unsafe (C), while unpartitioned state conflicts with keyed horizontal scaling (A).

---

### Q20

**Answer:** B, C

**Explanation:** Stream-stream joins generally need time bounds, and CDC can maintain reference state. Stream-table joins do support enrichment, so D is false; late and missing records still need policy (D).

---

### Q21

**Answer:** B, C

**Explanation:** Salting and recombining partial aggregates can split a hot key when ordering permits. Cluster-wide averages do not identify a specific hot partition (D), and one indivisible partition cannot use added consumers concurrently (A).

---

### Q22

**Answer:** A, C

**Explanation:** Lambda combines a historical batch path with a serving layer that merges results. It also has a speed path, so D is false, and duplicate implementations are a known risk rather than a guaranteed single implementation (D).

---

### Q23

**Answer:** B, C

**Explanation:** Kappa uses one stream-processing implementation and rebuilds by replaying retained events. It therefore requires retention planning (A) and does not discard its replayable log immediately (D).

---

### Q24

**Answer:** A, B

**Explanation:** Nightly finance reconciliation suits batch, while fraud decisions need streaming latency. The pipelines should share canonical facts rather than maintain unrelated, potentially divergent sources (D); finance need not be forced into sub-second processing (C).

---

### Q25

**Answer:** B, C, D

**Explanation:** Lambda can reuse batch systems but risks drift; Kappa simplifies logic while demanding replay discipline.

---

### Q26

**Answer:** A, B, D

**Explanation:** Immediate blocking, outage detection, and live operations lose value when delayed.

---

### Q27

**Answer:** B, C, D

**Explanation:** Reconciliation, historical analysis, and training favor complete reproducible batch computation.

---

### Q28

**Answer:** B, C, D

**Explanation:** Freshness should reflect actionability and staleness cost relative to operational expense.

---

### Q29

**Answer:** B, C, D

**Explanation:** Approximation can suit massive dashboard counts, while billing requires exact auditable values.

---

### Q30

**Answer:** A, C, D

**Explanation:** Delivery can repeat, so end-to-end once-only effects depend on sink transactions or idempotency.

---

### Q31

**Answer:** A, B, D

**Explanation:** Stable keys, atomic local effects, and crash tests address the side-effect/offset failure window.

---

### Q32

**Answer:** A, B, D

**Explanation:** Upserts, uniqueness, and expected versions converge safely; blind increments repeat effects.

---

### Q33

**Answer:** A, C, D

**Explanation:** A unique inbox record committed with business changes makes duplicate deliveries harmless locally.

---

### Q34

**Answer:** A, C, D

**Explanation:** Deduplication requires a stable identity shared by retries, not a fresh ID per attempt.

---

### Q35

**Answer:** A, B, C

**Explanation:** Bounded retries and observable quarantine prevent poison events from blocking the hot path.

---

### Q36

**Answer:** A, B, C

**Explanation:** Duplicate delivery, boundary crashes, and replay exercise the conditions idempotency must survive.

---

### Q37

**Answer:** A, C, D

**Explanation:** Freshness, partition skew, and sink behavior distinguish the common causes of growing lag.

---

### Q38

**Answer:** A, B, C

**Explanation:** Batching, controlled backpressure, and capacity-aware scaling improve throughput without silent loss.

---

### Q39

**Answer:** A, B, C

**Explanation:** Message rates vary, so time lag better expresses freshness while count lag still aids diagnosis.

---

### Q40

**Answer:** A, B, D

**Explanation:** Safe replay needs retained input, duplicate-safe logic, and a controlled way to rebuild results.

---

### Q41

**Answer:** B, C, D

**Explanation:** Isolated builds, throttling, and validation protect serving workloads during replay.

---

### Q42

**Answer:** A, B, C

**Explanation:** Retention balances recoverability and outage tolerance against storage and compliance costs.

---

### Q43

**Answer:** A, C

**Explanation:** Additive defaults and dual-format readers preserve compatibility; semantic reuse and unsupported removal do not.

---

### Q44

**Answer:** A, B, C

**Explanation:** Consumers expand first, producers migrate second, and old support contracts only after lag clears.

---

### Q45

**Answer:** A, B, C

**Explanation:** Registries identify and validate schemas but cannot infer or repair every semantic incompatibility.

---

### Q46

**Answer:** A, C, D

**Explanation:** Lag, flow rates, checkpoints, restarts, and quarantined failures expose end-to-end stream health.

---

### Q47

**Answer:** A, B, D

**Explanation:** Healthy resources and liveness do not guarantee fresh data; explicit lag and timestamps do.

---

### Q48

**Answer:** A, B, C

**Explanation:** Keying by account preserves its order while multiple partitions provide cross-account parallelism.

---

### Q49

**Answer:** A, B, C

**Explanation:** Data minimization, indirection, and crypto-shredding can reconcile replay with erasure requirements.

---

### Q50

**Answer:** A, B, C

**Explanation:** This is a CRUD-plus-events hybrid with shared consumers, not event sourcing unless the log is authoritative.
