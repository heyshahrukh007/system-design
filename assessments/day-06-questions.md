# Message Queues Deep Dive — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-06-answers.md](./answer-key/day-06-answers.md)





---

### Q01






**Context:** Checkout saves an order, then synchronously sends email and analytics events. Email latency raises the API response time by three seconds.

**Select all that apply.**

Which changes are appropriate?

- [ ] A. Return only after every downstream consumer acknowledges
- [ ] B. Let background workers process email and analytics
- [ ] C. Queue authentication and payment decisions even when the user needs an immediate result
- [ ] D. Publish non-critical side effects to a queue

---

### Q02






**Context:** A flash sale produces 10,000 orders per second, while workers can safely process 2,000 per second.

**Select all that apply.**

What can a queue provide?

- [ ] A. Guarantee zero processing delay during the spike
- [ ] B. Discard queued orders that cannot be processed during the traffic spike
- [ ] C. Buffer the temporary excess load
- [ ] D. Smooth work sent to a capacity-limited database

---

### Q03






**Select all that apply.**

Which statements distinguish queues from databases?

- [ ] A. A queue makes persistent business records unnecessary
- [ ] B. Queue work can always be reconstructed even when no durable business record exists
- [ ] C. A database normally remains the authoritative source of business state
- [ ] D. A queue carries transient commands or events between components

---

### Q04






**Context:** A report takes several minutes to generate, and the user does not need the result in the original HTTP response.

**Select all that apply.**

Which API design choices fit this workflow?

- [ ] A. Delete the completed report before notifying the user where to retrieve it
- [ ] B. Return `202 Accepted` with an export identifier
- [ ] C. Keep the HTTP connection open indefinitely as the only result mechanism
- [ ] D. Expose a status resource the client can poll

---

### Q05






**Select all that apply.**

Which operations usually belong on a synchronous critical path?

- [ ] A. Queue the search and return no results even though the user needs an immediate response
- [ ] B. Validate credentials for a login response
- [ ] C. Tell a buyer immediately that payment was declined
- [ ] D. Send a marketing analytics event

---

### Q06






**Context:** Four image workers share one task queue.

**Select all that apply.**

Which statements describe point-to-point queue behavior?

- [ ] A. Adding workers increases drain rate without limit, regardless of downstream capacity
- [ ] B. Each task is assigned to one worker at a time
- [ ] C. Every worker must process every image
- [ ] D. Competing workers divide tasks

---

### Q07






**Context:** An `order.created` notification must independently reach inventory, email, and analytics services.

**Select all that apply.**

Which design choices fit?

- [ ] A. Publish the event to a topic with separate subscriptions
- [ ] B. Share one retry state so a failure in analytics blocks inventory and email
- [ ] C. Put all services in one competing-consumer group
- [ ] D. Give each service an independent queue or consumer group

---

### Q08






**Context:** A new fraud model must reprocess six months of retained order events without disrupting existing consumers.

**Select all that apply.**

Which stream capabilities support this?

- [ ] A. Configurable event retention
- [ ] B. Force every consumer group to share one offset and advance together
- [ ] C. Deleting each event immediately after its first read
- [ ] D. Replaying from an earlier offset

---

### Q09






**Select all that apply.**

Which statements about messaging models are correct?

- [ ] A. Pub/sub delivers one event to only one subscription, like a competing task queue
- [ ] B. A task queue normally sends each job to one competing consumer
- [ ] C. A retained stream lets consumer groups read at different rates
- [ ] D. Redis Pub/Sub persists missed messages for offline subscribers by default

---

### Q10






**Context:** A Kafka topic has six partitions. One consumer group has eight active instances.

**Select all that apply.**

What should operators expect?

- [ ] A. Adding more instances always doubles throughput
- [ ] B. At most six instances can actively consume partitions in that group
- [ ] C. Two instances will normally be idle
- [ ] D. A separate consumer group steals partitions and events from the first group

---

### Q11






**Select all that apply.**

Which are broker responsibilities?

- [ ] A. Accept and route published messages
- [ ] B. Store messages according to durability and retention settings
- [ ] C. Decide all application business rules
- [ ] D. Execute every consumer's application-specific business rules inside the broker

---

### Q12






**Context:** An SQS consumer receives a message and becomes unresponsive without deleting it.

**Select all that apply.**

What does a correctly configured visibility timeout accomplish?

- [ ] A. Temporarily hides the in-flight message from other consumers
- [ ] B. Makes the message visible again if it is not deleted in time
- [ ] C. Permanently deletes the message as soon as one consumer receives it
- [ ] D. Proves that the business operation completed exactly once

---

### Q13






**Select all that apply.**

Which message metadata improves reliability and diagnostics?

- [ ] A. A plaintext credit-card number for debugging
- [ ] B. Omit schema versioning so incompatible payload changes are harder to identify
- [ ] C. A unique message or idempotency identifier
- [ ] D. A correlation or trace identifier

---

### Q14






**Context:** A video-transcoding request references a 500 MB uploaded file.

**Select all that apply.**

How should the message be designed?

- [ ] A. Embed the complete video in every queue message
- [ ] B. Store the video in object storage
- [ ] C. Embed the full 500 MB video because larger broker messages improve reliability
- [ ] D. Send an object key or secure reference

---

### Q15






**Context:** A producer adds an optional `currency` field to `order.created`.

**Select all that apply.**

Which practices reduce deployment breakage?

- [ ] A. Validate compatibility with a schema registry where appropriate
- [ ] B. Omit schema versions because all consumers always deploy simultaneously
- [ ] C. Rename required fields without migration because consumers update instantly
- [ ] D. Consumers ignore unknown fields

---

### Q16






**Select all that apply.**

Which statements correctly distinguish commands and events?

- [ ] A. `PaymentCaptured` expresses a fact that occurred
- [ ] B. A domain event must name and directly depend on one specific subscriber implementation
- [ ] C. Events require one specific consumer to obey the producer
- [ ] D. `ChargePayment` expresses an instruction

---

### Q17






**Context:** A metrics pipeline values speed over completeness and accepts occasional data loss.

**Select all that apply.**

Which properties fit at-most-once delivery?

- [ ] A. It is appropriate for loss-intolerant payment commands that must eventually complete
- [ ] B. Duplicate processing is expected by definition
- [ ] C. A message may be lost
- [ ] D. Failed delivery is not retried

---

### Q18






**Context:** A payment worker charges a card, crashes before acknowledging, and then receives the same message again.

**Select all that apply.**

What follows from this scenario?

- [ ] A. This is a normal at-least-once failure window
- [ ] B. A successful external side effect prevents the broker from redelivering the unacknowledged message
- [ ] C. Acknowledging before charging would guarantee no lost payment
- [ ] D. The payment operation needs an idempotency key

---

### Q19






**Select all that apply.**

Which statements about exactly-once claims are sound?

- [ ] A. Broker deduplication alone makes every downstream side effect exactly once
- [ ] B. End-to-end exactly-once effects are difficult across a broker, database, and external API
- [ ] C. A transactional broker offset guarantees exactly-once effects in any external payment API
- [ ] D. At-least-once delivery plus idempotency can produce an effectively once-only business outcome

---

### Q20






**Select all that apply.**

How does acknowledgment timing affect delivery semantics?

- [ ] A. Acknowledgment timing has no effect on loss or duplication
- [ ] B. Acknowledging before processing risks message loss on a crash
- [ ] C. Acknowledging after processing permits redelivery if the consumer crashes before the ack
- [ ] D. Acknowledging after processing eliminates all duplicate side effects without idempotency

---

### Q21






**Context:** Events for each bank account must remain ordered, but unrelated accounts should process in parallel.

**Select all that apply.**

Which design choices fit?

- [ ] A. Force every account through one global single-threaded queue
- [ ] B. Preserve order within each account's partition or FIFO group
- [ ] C. Send every account to one global partition even when unrelated accounts should run in parallel
- [ ] D. Partition by account identifier

---

### Q22






**Select all that apply.**

Which statements describe the ordering-throughput trade-off?

- [ ] A. Partitioned streams guarantee global ordering across all partitions
- [ ] B. One globally ordered partition is usually the most scalable design
- [ ] C. A single partition can provide global order but limits parallelism
- [ ] D. More partitions increase potential parallel consumption

---

### Q23






**Context:** Current events all use the current second as their partition key, overloading one partition.

**Select all that apply.**

Which responses are appropriate?

- [ ] A. Use an entity identifier when per-entity order matters
- [ ] B. Assume adding consumers fixes a hot partition automatically
- [ ] C. Avoid measuring key skew because partition load is always uniform
- [ ] D. Choose a key with better distribution

---

### Q24






**Context:** An older retry arrives after a newer state transition for the same order.

**Select all that apply.**

How can the consumer protect state?

- [ ] A. Use only wall-clock arrival timestamps, which always provide a reliable monotonic version
- [ ] B. Ignore stale events
- [ ] C. Track the latest processed version per entity
- [ ] D. Apply every arrival because broker delivery order is always business order

---

### Q25






**Context:** Queue depth keeps rising, so the team proposes adding 100 workers that all write to an already saturated database.

**Select all that apply.**

Which considerations are valid?

- [ ] A. More consumers can worsen downstream overload
- [ ] B. Consumer scaling is unlimited regardless of dependencies
- [ ] C. Use unbounded worker concurrency even when the database is already saturated
- [ ] D. Verify whether the database is the real bottleneck

---

### Q26






**Select all that apply.**

Which signals are useful for consumer autoscaling?

- [ ] A. Queue depth
- [ ] B. Consumer lag
- [ ] C. Age of the oldest message
- [ ] D. The producer application's logo color

---

### Q27






**Context:** A malformed message fails instantly and is retried forever.

**Select all that apply.**

How should the system handle it?

- [ ] A. Alert and retain diagnostic context
- [ ] B. Move it to a dead-letter queue
- [ ] C. Retry without delay forever
- [ ] D. Set a maximum retry count

---

### Q28






**Select all that apply.**

Which actions belong in a graceful consumer shutdown?

- [ ] A. Commit or acknowledge completed work
- [ ] B. Finish or safely abandon in-flight work based on the lease
- [ ] C. Kill the process immediately before recording progress
- [ ] D. Stop polling for new work

---

### Q29






**Select all that apply.**

Which statements about prefetch or batch size are correct?

- [ ] A. Maximum prefetch always minimizes latency and failures
- [ ] B. Larger batches can improve throughput
- [ ] C. Excessive prefetch can produce unfair work distribution
- [ ] D. Tuning should consider processing-time variance

---

### Q30






**Context:** A downstream API returns `503` to thousands of consumers at once.

**Select all that apply.**

Which retry policy is appropriate?

- [ ] A. Exponential backoff
- [ ] B. Random jitter
- [ ] C. Immediate synchronized retries with no cap
- [ ] D. A maximum delay and attempt limit

---

### Q31






**Select all that apply.**

Which failures are generally retryable?

- [ ] A. A permanently invalid message schema
- [ ] B. A `503 Service Unavailable`
- [ ] C. A rate-limit response with appropriate backoff
- [ ] D. A temporary connection reset

---

### Q32






**Select all that apply.**

What are valid dead-letter queue practices?

- [ ] A. Replay blindly in an endless loop
- [ ] B. Inspect and fix the root cause before replay
- [ ] C. Alert when messages arrive
- [ ] D. Monitor replayed messages for repeated failure

---

### Q33






**Context:** An inventory message may be delivered more than once.

**Select all that apply.**

Which consumer techniques support idempotency?

- [ ] A. Perform the business write and dedup record atomically when possible
- [ ] B. Increment inventory blindly on every delivery
- [ ] C. Enforce a unique processed-message key
- [ ] D. Use a conditional update with stable business semantics

---

### Q34






**Select all that apply.**

Which statements about broker-level deduplication are correct?

- [ ] A. Its time or producer-session window may be limited
- [ ] B. It can reduce duplicate deliveries within its documented scope
- [ ] C. It replaces application idempotency for all external side effects
- [ ] D. Consumers should still tolerate duplicates

---

### Q35






**Context:** An order row commits successfully, but the service crashes before publishing `order.created`.

**Select all that apply.**

How does a transactional outbox address this failure?

- [ ] A. Require a distributed two-phase commit with every broker
- [ ] B. Write the order and outbox record in one database transaction
- [ ] C. Make publication recoverable after the service restarts
- [ ] D. Publish pending outbox records with a separate relay

---

### Q36






**Context:** Payment succeeds, inventory reservation fails, and the order cannot complete.

**Select all that apply.**

Which saga behaviors are appropriate?

- [ ] A. Coordinate steps through choreography or orchestration
- [ ] B. Assume all service databases roll back through one local transaction
- [ ] C. Issue a compensating payment refund
- [ ] D. Transition the order to a cancelled state

---

### Q37






**Context:** Email, SMS, and push notifications need independent scaling and failure handling.

**Select all that apply.**

Which architecture supports this?

- [ ] A. Fan out one event to separate channel queues
- [ ] B. Give each queue its own workers and DLQ
- [ ] C. Make one worker synchronously complete all channels before any can proceed
- [ ] D. Allow one channel outage without blocking the others

---

### Q38






**Select all that apply.**

Which pattern-to-requirement mappings are correct?

- [ ] A. Priority queue — guarantee all low-priority work finishes first
- [ ] B. Sequential convoy — preserve per-key order while other keys run in parallel
- [ ] C. Pipes and filters — connect independently scalable processing stages
- [ ] D. Claim check — place a large payload elsewhere and send a reference

---

### Q39






**Context:** A database's changes must update a search index and warehouse without dual writes in application request code.

**Select all that apply.**

Which properties make change data capture suitable?

- [ ] A. Multiple downstream consumers can build separate projections
- [ ] B. It converts committed database changes into a stream
- [ ] C. It makes downstream state synchronously identical at every instant
- [ ] D. It reduces application-level dual-write coupling

---

### Q40






**Context:** A long-running background job must eventually return a result to a client.

**Select all that apply.**

Which approaches are valid?

- [ ] A. Correlate a request and reply using an identifier
- [ ] B. Omit correlation because responses always arrive in request order
- [ ] C. Use a callback or webhook for an external caller
- [ ] D. Store the result and expose a status API

---

### Q41






**Context:** A team needs a simple managed task queue in AWS with retries and a DLQ, but no event replay.

**Select all that apply.**

Which choices are reasonable?

- [ ] A. Use SQS as the task queue
- [ ] B. Use Lambda or worker instances as consumers
- [ ] C. Configure a redrive policy and visibility timeout
- [ ] D. Deploy Kafka solely because every queue requires a retained log

---

### Q42






**Context:** A platform needs high-throughput retained events, replay, CDC, and multiple independent consumer groups.

**Select all that apply.**

Which statements support choosing Kafka?

- [ ] A. Topics can retain events after consumption
- [ ] B. Consumers can restart from chosen offsets
- [ ] C. Partition planning and operational complexity remain trade-offs
- [ ] D. Kafka is necessarily simpler than SQS for one email worker

---

### Q43






**Select all that apply.**

When is RabbitMQ a reasonable choice?

- [ ] A. Moderate-volume task queues use AMQP
- [ ] B. Months of immutable-log replay are the main requirement
- [ ] C. Direct, topic, or fanout routing is useful
- [ ] D. Flexible exchange and binding rules are required

---

### Q44






**Select all that apply.**

Which statements about Redis messaging are correct?

- [ ] A. Redis Lists automatically provide retained-log replay from arbitrary offsets
- [ ] B. Redis Pub/Sub is fire-and-forget for offline subscribers
- [ ] C. Durability depends on persistence configuration
- [ ] D. Redis Streams supports consumer groups and acknowledgments

---

### Q45






**Context:** Publish rate is stable, consume rate drops, queue depth climbs, and the oldest message exceeds its SLA.

**Select all that apply.**

What do these signals indicate?

- [ ] A. Operators should inspect consumer and downstream bottlenecks
- [ ] B. Consumers are falling behind
- [ ] C. User-visible processing delay is increasing
- [ ] D. A near-zero DLQ proves the system is healthy

---

### Q46






**Select all that apply.**

Which production metrics should be monitored?

- [ ] A. Consumer lag and error rate
- [ ] B. DLQ depth never needs monitoring because dead-lettered messages cannot affect operations
- [ ] C. Queue depth and oldest-message age
- [ ] D. Publish and processing rates

---

### Q47






**Context:** Messages contain customer identifiers and sensitive operational data.

**Select all that apply.**

Which security practices apply?

- [ ] A. Grant producers and consumers least-privilege access
- [ ] B. Encrypt transport and stored broker data where required
- [ ] C. Put secrets in message bodies because queues are internal
- [ ] D. Minimize PII in payloads and logs

---

### Q48






**Select all that apply.**

When might a queue be the wrong tool?

- [ ] A. The user needs an immediate authoritative answer
- [ ] B. Strong consistency must be completed within one local transaction
- [ ] C. Work can tolerate eventual completion and needs spike absorption
- [ ] D. A simple low-traffic CRUD call has no asynchronous side effects

---

### Q49






**Context:** A broker restart loses queued orders even though producers received successful publish responses.

**Select all that apply.**

Which controls reduce this risk?

- [ ] A. Require acknowledgments consistent with the desired replica durability
- [ ] B. Use broker replication or a managed multi-zone service
- [ ] C. Acknowledge producers before storing messages to make durability stronger
- [ ] D. Enable durable persistence

---

### Q50






**Context:** An order pipeline requires at-least-once delivery, per-order sequencing, safe retries, and operational recovery.

**Select all that apply.**

Which combined design choices are sound?

- [ ] A. Partition or group messages by `order_id`
- [ ] B. Make consumers idempotent and acknowledge after successful processing
- [ ] C. Retry transient failures with backoff and route poison messages to a monitored DLQ
- [ ] D. Claim exactly-once business effects solely because the broker redelivers messages
