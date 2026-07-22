# Message Queues Deep Dive — Answer Key & Explanations (50)

Answer key for [day-06-questions.md](../day-06-questions.md)





---

### Q01

**Answer:** B, D

**Explanation:** Queued workers should handle slow, non-critical side effects (A, B). Immediate authentication or payment decisions cannot simply be deferred (C), and waiting for every consumer preserves latency coupling (A).

---

### Q02

**Answer:** C, D

**Explanation:** A queue buffers excess work and smooths writes to a constrained database (A, C). It should retain, not discard, the backlog (B), and cannot provide zero delay under overload (A).

---

### Q03

**Answer:** C, D

**Explanation:** Databases normally retain authoritative state while queues carry transient commands or events (B, D). Reconstruction is only sometimes possible when durable state exists, so it is not guaranteed (B); queues do not replace business records (A).

---

### Q04

**Answer:** B, D

**Explanation:** Long jobs suit `202 Accepted` and a status resource (A, D). Deleting the result before retrieval is unusable (A), and relying only on an indefinitely held connection is fragile (C).

---

### Q05

**Answer:** B, C

**Explanation:** Login validation and an immediate payment-decline decision belong on the request path (A, C). A requested search result should not be queued without a result (A), while marketing analytics is asynchronous (D).

---

### Q06

**Answer:** B, D

**Explanation:** Competing consumers divide tasks so one worker owns each delivery (A, D). They do not all process every image (C), and worker scaling is bounded by broker and downstream capacity (A).

---

### Q07

**Answer:** A, D

**Explanation:** Independent subscriptions or groups let each service receive the event (B, C). Shared retry state couples failures (B), while one competing group would split rather than broadcast events (C).

---

### Q08

**Answer:** A, D

**Explanation:** Retention and offset replay provide historical reprocessing (A, B). Immediate deletion prevents replay (C), and groups need independent rather than shared offsets (B).

---

### Q09

**Answer:** B, C

**Explanation:** Retained streams support groups at different rates, while task queues distribute jobs among competitors (A, B). Redis Pub/Sub does not retain offline messages (D), and pub/sub broadcasts to subscriptions rather than selecting only one (A).

---

### Q10

**Answer:** B, C

**Explanation:** Six partitions allow at most six active consumers in one group, leaving two idle (A, C). More instances do not always add throughput (A), and a separate group reads independently rather than stealing events (D).

---

### Q11

**Answer:** A, B

**Explanation:** Brokers accept, route, and durably retain messages according to configuration (C, D). Application-specific rules do not belong in the broker (A, B).

---

### Q12

**Answer:** A, B

**Explanation:** A visibility timeout temporarily hides an in-flight message and exposes it again if not deleted (B, D). Receipt does not permanently delete it (C) or prove exactly-once completion (D).

---

### Q13

**Answer:** C, D

**Explanation:** Correlation and unique message identifiers support tracing and idempotency (C, D). Omitting schema versions harms compatibility diagnostics (B), and card data must not be embedded for debugging (A).

---

### Q14

**Answer:** B, D

**Explanation:** Store the video in object storage and send a secure reference (C, D). Embedding the full blob contradicts the need for small broker payloads (A, B).

---

### Q15

**Answer:** A, D

**Explanation:** Tolerant readers and compatibility validation support additive evolution (C, D). Omitting versions is unsafe (B), and renaming required fields without migration is breaking (C).

---

### Q16

**Answer:** A, D

**Explanation:** `ChargePayment` is an instruction and `PaymentCaptured` is a fact (C, D). Events need not target one consumer (C), and directly depending on a specific subscriber increases coupling (B).

---

### Q17

**Answer:** C, D

**Explanation:** At-most-once does not retry failed delivery and may lose a message (C, D). That can fit loss-tolerant telemetry, not loss-intolerant payments (A), and duplicates are not its defining behavior (B).

---

### Q18

**Answer:** A, D

**Explanation:** This is the normal at-least-once crash window, so payment processing needs idempotency (C, D). Early acknowledgment risks loss (C), and a successful side effect does not acknowledge the broker message (B).

---

### Q19

**Answer:** B, D

**Explanation:** End-to-end exactly-once effects are difficult, while at-least-once plus idempotency can achieve an effectively once-only outcome (B, C). Broker mechanisms alone cannot govern arbitrary downstream or external effects (A, D).

---

### Q20

**Answer:** B, C

**Explanation:** A post-processing acknowledgment permits redelivery before the ack, while an early acknowledgment risks loss (C, D). A later ack does not eliminate duplicate effects and still requires idempotency (D); timing materially changes semantics (A).

---

### Q21

**Answer:** B, D

**Explanation:** Partitioning by account preserves per-account order (B, C). Sending all accounts to one partition prevents unrelated parallelism (A, D).

---

### Q22

**Answer:** C, D

**Explanation:** More partitions enable parallelism, while one partition offers global order at a throughput cost (B, C). Partitioned streams lack global cross-partition order (A), and a global partition is not the most scalable design (B).

---

### Q23

**Answer:** A, D

**Explanation:** A distributed entity key can preserve relevant ordering while avoiding skew (A, C). Extra consumers cannot split one hot partition (B), and operators should measure rather than ignore skew (C).

---

### Q24

**Answer:** B, C

**Explanation:** Tracking the latest version and rejecting stale events protects state (C, D). Wall-clock arrival time is not a reliable monotonic business version (A), and broker arrival order is not always business order (D).

---

### Q25

**Answer:** A, D

**Explanation:** The team must identify the actual bottleneck, and more consumers can worsen database overload (A, B). Scaling is not unlimited (B), and unbounded concurrency is unsafe against a saturated dependency (C).

---

### Q26

**Answer:** A, B, C

**Explanation:** Depth, lag, and oldest-message age describe backlog size and urgency, making them useful scaling inputs.

---

### Q27

**Answer:** A, B, D

**Explanation:** Bounded retries and a monitored DLQ isolate poison messages for diagnosis. Infinite retries waste capacity and can block useful work.

---

### Q28

**Answer:** A, B, D

**Explanation:** Graceful shutdown stops intake, resolves in-flight work, and records completed progress. Immediate termination creates avoidable redelivery.

---

### Q29

**Answer:** B, C, D

**Explanation:** Larger fetches can raise throughput but can reduce fairness when work duration varies. Maximum prefetch is not universally optimal.

---

### Q30

**Answer:** A, B, D

**Explanation:** Exponential backoff, jitter, and limits prevent synchronized retry storms while allowing temporary failures to recover.

---

### Q31

**Answer:** B, C, D

**Explanation:** Connection resets, `503`, and rate limits are often transient. A permanently invalid schema should go directly to failure handling.

---

### Q32

**Answer:** B, C, D

**Explanation:** DLQ arrival should trigger investigation, controlled replay, and monitoring. Blind replay repeats the same failure.

---

### Q33

**Answer:** A, C, D

**Explanation:** Unique keys, stable conditional writes, and atomic dedup recording prevent repeated business effects. Blind increments are not idempotent.

---

### Q34

**Answer:** A, B, D

**Explanation:** Broker deduplication is useful but often bounded by time or session scope. Consumers must still handle duplicates safely.

---

### Q35

**Answer:** B, C, D

**Explanation:** Committing business state and outbox intent atomically makes a relay able to publish after a crash, without distributed two-phase commit.

---

### Q36

**Answer:** A, C, D

**Explanation:** A saga handles partial failure through explicit compensation and state transitions, coordinated by events or an orchestrator.

---

### Q37

**Answer:** A, B, D

**Explanation:** Separate fan-out queues let channels scale, retry, and fail independently. A combined worker restores tight coupling.

---

### Q38

**Answer:** B, C, D

**Explanation:** Claim check handles large payloads, pipes and filters compose stages, and sequential convoy preserves per-key order. Priority queues serve high-priority work first.

---

### Q39

**Answer:** A, B, D

**Explanation:** CDC streams committed changes to independent projections and avoids request-path dual writes. Downstream views remain eventually consistent.

---

### Q40

**Answer:** A, C, D

**Explanation:** Reply queues, status resources, and callbacks all return asynchronous results. Correlation is needed because completion order can differ from request order.

---

### Q41

**Answer:** A, B, C

**Explanation:** SQS, a redrive policy, visibility timeout, and managed or hosted workers fit a simple AWS job queue. Kafka is unnecessary when replay is not required.

---

### Q42

**Answer:** A, B, C

**Explanation:** Kafka provides retained partitioned logs and offset-based replay, with planning and operational costs. It is not simpler for every basic task queue.

---

### Q43

**Answer:** A, C, D

**Explanation:** RabbitMQ suits AMQP task queues and flexible exchange routing. It is not primarily a months-long replay log.

---

### Q44

**Answer:** B, C, D

**Explanation:** Redis Pub/Sub is ephemeral, while Streams adds groups and acknowledgments. Actual durability depends on configured persistence; Lists are not arbitrary-offset logs.

---

### Q45

**Answer:** A, B, C

**Explanation:** Falling consumption with growing, aging backlog indicates rising delay and a consumer or dependency bottleneck. An empty DLQ does not make backlog healthy.

---

### Q46

**Answer:** A, C, D

**Explanation:** Queue depth and age, publish and processing rates, and consumer lag and errors are essential production signals (B, C, D). DLQ depth also matters, so the claim that it never needs monitoring is false (B).

---

### Q47

**Answer:** A, B, D

**Explanation:** Queue security requires encryption, least privilege, and data minimization. Internal messaging does not make embedded secrets safe.

---

### Q48

**Answer:** A, B, D

**Explanation:** Immediate authoritative answers, simple synchronous CRUD, and single-transaction consistency may not justify queue complexity. Delay-tolerant bursty work is a strong queue use case.

---

### Q49

**Answer:** A, B, D

**Explanation:** Persistence, strong producer acknowledgments, and replication reduce acknowledged-message loss. Acknowledging before durable storage weakens guarantees.

---

### Q50

**Answer:** A, B, C

**Explanation:** Per-order partitioning, idempotent post-success acknowledgment, bounded retries, and a monitored DLQ address ordering and recovery. Redelivery alone does not produce exactly-once effects.
