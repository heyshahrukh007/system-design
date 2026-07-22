# Reliability & Fault Tolerance — MCQ Questions (50)

> **Answers and explanations:** see [answer-key/day-07-answers.md](./answer-key/day-07-answers.md)




---

### Q01





**Context:** A payment API slows to 30 seconds, exhausting checkout threads and making unrelated pages unavailable.

**Select all that apply.**

Which changes directly reduce this failure's blast radius?

- [ ] A. Isolate payment calls in a bulkhead
- [ ] B. Add a bounded payment timeout
- [ ] C. Keep sending normal traffic after sustained failures and only record the errors
- [ ] D. Retry every timeout immediately until it succeeds

---

### Q02





**Select all that apply.**

Which statements correctly distinguish reliability from performance and scalability?

- [ ] A. Reliability asks whether service continues when components fail
- [ ] B. A fast system can still be unreliable during dependency failure
- [ ] C. Performance measures only whether the service survives component failure
- [ ] D. Scalability alone eliminates single points of failure

---

### Q03





**Context:** A non-critical internal tool and a payment platform request the same five-nines target.

**Select all that apply.**

Which considerations should influence their reliability targets?

- [ ] A. Every production system requires exactly the same target
- [ ] B. Safety, contractual, and data-loss consequences
- [ ] C. Business impact of downtime
- [ ] D. Redundant infrastructure always lowers both cost and operational complexity

---

### Q04





**Select all that apply.**

Which statements about availability metrics are correct?

- [ ] A. Lowering MTTR can improve availability without changing failure frequency
- [ ] B. MTBF measures average time between failures
- [ ] C. A server returning incorrect 500 responses is available because its process is running
- [ ] D. Correctness and timeliness are excluded from every meaningful availability measure

---

### Q05





**Context:** A service has a 99.9% monthly availability target.

**Select all that apply.**

Which statements follow from this target?

- [ ] A. Planned maintenance never consumes error budget, regardless of the measurement policy
- [ ] B. Its monthly error budget is about 43.8 minutes
- [ ] C. Moving to 99.99% leaves roughly one-tenth as much downtime
- [ ] D. It permits about 4.4 minutes of downtime per month

---

### Q06





**Context:** Backups run hourly, and the business requires service restoration within four hours.

**Select all that apply.**

Which interpretations are correct?

- [ ] A. The intended RPO is approximately one hour
- [ ] B. A documented four-hour target proves recovery will finish on time without restore drills
- [ ] C. The intended RTO is four hours
- [ ] D. RPO defines how quickly traffic must fail over

---

### Q07





**Select all that apply.**

How does dependency topology affect end-to-end availability?

- [ ] A. Sequential critical dependencies generally multiply their availabilities
- [ ] B. Adding unnecessary synchronous hops can lower end-to-end availability
- [ ] C. Two independent redundant copies always reduce availability below either copy alone
- [ ] D. Parallel replicas always fail together by definition

---

### Q08





**Context:** An architecture has one load balancer, one application server, and one database without a replica.

**Select all that apply.**

Which findings are valid?

- [ ] A. Auto-scaling the single app process makes the database redundant
- [ ] B. Database replication with tested failover reduces database SPOF risk
- [ ] C. Each listed component is a potential single point of failure
- [ ] D. Multiple app processes on the same single host eliminate that host as a SPOF

---

### Q09





**Context:** A dependency sometimes responds slowly but rarely goes completely offline.

**Select all that apply.**

Which responses fit this partial failure?

- [ ] A. Open the circuit permanently after the first isolated slow response
- [ ] B. Monitor latency and error rate, not only up/down health
- [ ] C. Use bounded timeouts
- [ ] D. Treat a successful TCP connection as proof of healthy behavior

---

### Q10





**Select all that apply.**

Which controls reduce incidents caused by human error?

- [ ] A. Least privilege and tested backups
- [ ] B. Prefer unreviewed manual configuration because it is safer than validated infrastructure as code
- [ ] C. Blaming the operator so future systems need no safeguards
- [ ] D. Canary deployment with automated rollback

---

### Q11





**Context:** Three application instances run in one availability zone.

**Select all that apply.**

What does this design tolerate?

- [ ] A. Three instances in one zone already tolerate a complete outage of that zone
- [ ] B. Failure of one application instance
- [ ] C. Complete regional loss
- [ ] D. Some rolling-deploy capacity loss when spare capacity exists

---

### Q12





**Select all that apply.**

Which statements compare active-active and active-passive designs correctly?

- [ ] A. Active-active nodes already serve traffic
- [ ] B. Active-passive promotion is always instantaneous and requires no health decision
- [ ] C. Active-active removes all data-conflict and synchronization concerns
- [ ] D. Active-passive pays for standby capacity that may be idle

---

### Q13





**Context:** A load balancer's health endpoint returns 200 whenever the process is alive, even when the process cannot reach its database.

**Select all that apply.**

Which changes improve traffic routing?

- [ ] A. Keep routing to it because process liveness guarantees request success
- [ ] B. Use the deep database readiness check as liveness and restart the process whenever the database is unreachable
- [ ] C. Add an appropriate deep readiness check for critical dependencies
- [ ] D. Remove an instance from rotation after repeated failed checks

---

### Q14





**Select all that apply.**

Why do stateless application servers improve high availability?

- [ ] A. Any healthy instance can handle a user's next request
- [ ] B. Instance replacement need not preserve unique in-memory sessions
- [ ] C. Keep each user's only session copy in one instance's memory
- [ ] D. Sticky sessions in one server's memory guarantee seamless failover

---

### Q15





**Context:** Peak load needs four servers, and one server may be unavailable during a rolling deploy.

**Select all that apply.**

Which capacity statements are correct?

- [ ] A. N+1 guarantees survival of an entire region outage
- [ ] B. 2N means running five servers when peak demand requires four
- [ ] C. N+1 can tolerate one server failure at peak
- [ ] D. N+1 means running five servers

---

### Q16





**Context:** DNS directs traffic to a secondary region after the primary fails, but many clients keep using cached records.

**Select all that apply.**

Which conclusions are valid?

- [ ] A. Health-checked DNS bypasses resolver and client caches during every failover
- [ ] B. A low TTL guarantees every client switches instantly
- [ ] C. DNS caching can delay failover
- [ ] D. TTL must be chosen with the failover objective in mind

---

### Q17





**Context:** A user-facing request has a three-second total deadline and calls three downstream services.

**Select all that apply.**

Which timeout practices are sound?

- [ ] A. Let retries and backoff exceed the caller's total deadline
- [ ] B. Allocate downstream timeouts within the total deadline
- [ ] C. Give every downstream call a three-second timeout independently
- [ ] D. Keep inner timeouts short enough for the caller to handle failure

---

### Q18





**Select all that apply.**

Which timeout types are correctly described?

- [ ] A. Read timeout limits waiting for a response after connection
- [ ] B. Connect timeout limits time establishing a connection
- [ ] C. Read timeout replaces the need for a connect timeout
- [ ] D. Write timeout limits only how long the client waits to read the response

---

### Q19





**Context:** The HTTP client times out after two seconds, but the server continues processing for ten seconds.

**Select all that apply.**

What risks or remedies apply?

- [ ] A. Abandoned server work can continue consuming resources
- [ ] B. The client timeout proves the server stopped the operation
- [ ] C. Retrying a non-idempotent operation may duplicate effects
- [ ] D. Propagating cancellation cannot reduce abandoned server work

---

### Q20





**Select all that apply.**

What should normally happen when a downstream timeout fires?

- [ ] A. Cancel the in-flight operation when supported
- [ ] B. Suppress timeout diagnostics so callers cannot correlate the failure
- [ ] C. Choose a bounded retry, fallback, or upstream failure
- [ ] D. Swallow the timeout and wait indefinitely on the same resource

---

### Q21





**Context:** A service receives 400, 401, 429, and 503 responses from a dependency.

**Select all that apply.**

Which retry choices are generally appropriate?

- [ ] A. Retry 503 with bounded backoff
- [ ] B. Retry malformed 400 requests unchanged
- [ ] C. Do not blindly retry 401 without correcting authorization
- [ ] D. Ignore `Retry-After` and retry every 429 immediately

---

### Q22





**Context:** Ten thousand clients fail simultaneously and all retry exactly one second later.

**Select all that apply.**

Which measures reduce the resulting retry storm?

- [ ] A. Allow unlimited retry attempts so every client keeps pressure on the dependency
- [ ] B. Synchronizing every client's retry schedule
- [ ] C. Exponential backoff
- [ ] D. Random jitter

---

### Q23





**Context:** A payment request times out after the provider may already have charged the card.

**Select all that apply.**

Which design choices make a retry safer?

- [ ] A. Discard prior results so every retry repeats the external charge
- [ ] B. Enforce a uniqueness constraint for the business operation
- [ ] C. Issue a new operation identifier on every retry
- [ ] D. Send a stable idempotency key

---

### Q24





**Context:** A gateway retries three times, a service retries three times, and its database driver retries three times.

**Select all that apply.**

Which statements are correct?

- [ ] A. Retry ownership should be coordinated across layers
- [ ] B. More retry layers always reduce dependency load
- [ ] C. Independent retry budgets at every layer prevent attempt multiplication automatically
- [ ] D. Layered retries can multiply attempts dramatically

---

### Q25





**Select all that apply.**

Which statements distinguish retries from circuit breakers?

- [ ] A. A timeout and a breaker are interchangeable controls
- [ ] B. Retries should continue through an OPEN circuit instead of failing fast
- [ ] C. Retries can recover from brief transient failures
- [ ] D. A breaker stops calls during a sustained failure

---

### Q26





**Context:** A payment circuit is OPEN after repeated timeouts.

**Select all that apply.**

What behavior is expected?

- [ ] A. Calls fail fast without reaching payment
- [ ] B. OPEN means requests continue normally while failures are only logged
- [ ] C. After a cooldown, limited probe calls may enter HALF-OPEN
- [ ] D. A successful recovery probe can move the circuit toward CLOSED

---

### Q27





**Select all that apply.**

Which events should usually count toward opening a dependency circuit?

- [ ] A. Relevant 5xx responses
- [ ] B. Repeated timeouts
- [ ] C. Failure rate over a configured window
- [ ] D. Every valid 4xx client error

---

### Q28





**Context:** The recommendation dependency's circuit opens while the product service remains healthy.

**Select all that apply.**

Which responses are appropriate?

- [ ] A. Return the product without recommendations
- [ ] B. Show a static popular-items fallback
- [ ] C. Return 500 for the entire product page
- [ ] D. Track circuit state and degraded-response metrics

---

### Q29





**Select all that apply.**

Why should circuits usually be isolated per dependency?

- [ ] A. A single global circuit minimizes unrelated blast radius
- [ ] B. Per-dependency metrics make failure symptoms easier to interpret
- [ ] C. Payment failures should not automatically trip inventory's circuit
- [ ] D. Different dependencies may need different thresholds and fallbacks

---

### Q30





**Context:** Slow reporting queries consume every database connection, blocking checkout.

**Select all that apply.**

Which bulkhead changes address this failure?

- [ ] A. Reserve capacity for the critical checkout path
- [ ] B. Give reporting an unbounded wait queue
- [ ] C. Bound reporting concurrency
- [ ] D. Separate connection pools for reporting and checkout

---

### Q31





**Select all that apply.**

Which statements correctly compare bulkheads and circuit breakers?

- [ ] A. Bulkheads limit shared-resource exhaustion
- [ ] B. Bulkheads are proactive isolation; breakers react to failure signals
- [ ] C. Either pattern alone makes timeouts unnecessary
- [ ] D. Circuit breakers stop calls after observed failures

---

### Q32





**Context:** A semaphore allows at most ten concurrent recommendation calls.

**Select all that apply.**

What does this design accomplish?

- [ ] A. It caps the number of callers tied up by that dependency
- [ ] B. Excess calls can fail fast or wait in a bounded queue
- [ ] C. It guarantees the dependency itself never fails
- [ ] D. It is a lighter-weight bulkhead than a dedicated thread pool

---

### Q33





**Context:** A queue absorbs a sudden burst while workers process at a fixed rate.

**Select all that apply.**

How can the queue act as a bulkhead?

- [ ] A. It makes queue depth and overload limits unnecessary
- [ ] B. It bounds worker concurrency against the downstream service
- [ ] C. It can smooth a temporary traffic spike
- [ ] D. It decouples producer request threads from consumer processing time

---

### Q34





**Select all that apply.**

What should happen when a bulkhead reaches capacity?

- [ ] A. Block an unlimited number of callers
- [ ] B. Use only a bounded short queue
- [ ] C. Fail fast for work that cannot wait
- [ ] D. Shed lower-priority load when appropriate

---

### Q35





**Context:** Reviews and recommendations fail, but catalog and checkout remain healthy.

**Select all that apply.**

Which choices represent graceful degradation?

- [ ] A. Substitute static popular items for recommendations
- [ ] B. Omit reviews temporarily
- [ ] C. Keep the core purchase journey available
- [ ] D. Fail the entire site because the full experience is unavailable

---

### Q36





**Context:** The primary database is failing over and writes are temporarily unsafe.

**Select all that apply.**

Which degraded-mode decisions are reasonable?

- [ ] A. Disable checkout with a clear user message
- [ ] B. Allow read-only browsing when reads remain safe
- [ ] C. Monitor how long the service remains degraded
- [ ] D. Accept writes silently and discard them

---

### Q37





**Context:** Extreme overload threatens checkout, search, analytics, and anonymous browsing.

**Select all that apply.**

Which load-shedding policies protect core service?

- [ ] A. Preserve unlimited low-priority work in memory
- [ ] B. Return 503 with Retry-After where appropriate
- [ ] C. Define priorities before the incident
- [ ] D. Drop low-priority analytics before payment traffic

---

### Q38





**Select all that apply.**

Which statements distinguish graceful degradation from a circuit breaker?

- [ ] A. The breaker decides when to stop calling a failing dependency
- [ ] B. A breaker automatically determines every acceptable business fallback
- [ ] C. Degradation defines the product behavior after functionality is unavailable
- [ ] D. An open breaker can trigger a cached or static fallback

---

### Q39





**Context:** During a network partition, an isolated old primary and a promoted replica both accept writes.

**Select all that apply.**

Which statements apply?

- [ ] A. Promoting every reachable replica avoids the problem
- [ ] B. Quorum and fencing can reduce the risk
- [ ] C. Writes can diverge and conflict when the network heals
- [ ] D. This is split-brain

---

### Q40





**Select all that apply.**

Which statements about automatic and manual failover are correct?

- [ ] A. Health checks and replication state should inform promotion
- [ ] B. Manual failover may be safer when promotion risks data loss or split-brain
- [ ] C. Automatic failover guarantees zero RPO in every replication mode
- [ ] D. Automatic failover can reduce RTO

---

### Q41





**Context:** A team has daily backups but has never restored one.

**Select all that apply.**

Which actions make the disaster-recovery plan credible?

- [ ] A. Assume a successful backup job proves recovery
- [ ] B. Verify data integrity after restoration
- [ ] C. Restore into an isolated environment
- [ ] D. Measure actual recovery time against RTO

---

### Q42





**Select all that apply.**

Which DR topology trade-offs are correct?

- [ ] A. Backup-and-restore is relatively cheap but usually has a long RTO
- [ ] B. Active-active adds data synchronization and conflict complexity
- [ ] C. Hot standby is cheaper than storing backups only
- [ ] D. Warm standby costs more but can recover faster than cold restore

---

### Q43





**Select all that apply.**

How do runbooks and game days improve recovery?

- [ ] A. Game days exercise dashboards, escalation, and communication
- [ ] B. Repeated practice can lower MTTR
- [ ] C. Runbooks reduce improvisation during incidents
- [ ] D. Written runbooks eliminate the need to test failover

---

### Q44





**Context:** Engineering measures 99.94% successful requests, targets 99.95%, and promises customers 99.9% with service credits.

**Select all that apply.**

Which labels are correct?

- [ ] A. 99.94% is an SLI result
- [ ] B. 99.95% is an internal SLO
- [ ] C. 99.9% with credits is an SLA
- [ ] D. The SLA should always be stricter than the SLO

---

### Q45





**Select all that apply.**

Which are useful user-oriented SLIs?

- [ ] A. Whether the API process PID exists
- [ ] B. Percentage of valid requests returning correct, timely responses
- [ ] C. Percentage of checkout attempts completed successfully within 30 seconds
- [ ] D. Percentage of reads meeting a freshness threshold

---

### Q46





**Context:** A service has exhausted its monthly error budget after several risky deployments.

**Select all that apply.**

Which responses align with error-budget policy?

- [ ] A. Prioritize reliability work
- [ ] B. Slow or freeze risky feature releases
- [ ] C. Ignore the budget because the contractual SLA has not yet been breached
- [ ] D. Investigate the largest sources of budget burn

---

### Q47





**Select all that apply.**

Why are burn-rate alerts often better than paging on each raw error?

- [ ] A. They relate failures to the SLO's allowed unreliability
- [ ] B. Multi-window alerts can distinguish fast burns from slow burns
- [ ] C. One isolated 500 always consumes the full monthly budget
- [ ] D. They reduce noise while detecting sustained harmful failure rates

---

### Q48





**Context:** A canary receives 5% of traffic and its error rate rises sharply.

**Select all that apply.**

Which safe-deployment actions are appropriate?

- [ ] A. Automatically roll back when the defined SLI threshold is breached
- [ ] B. Stop the rollout
- [ ] C. Use feature flags when possible to disable the faulty path quickly
- [ ] D. Continue to 100% so the sample becomes larger

---

### Q49





**Select all that apply.**

Which practices make a chaos experiment responsible and useful?

- [ ] A. Control blast radius and start in staging
- [ ] B. Define normal steady-state metrics first
- [ ] C. State a falsifiable hypothesis
- [ ] D. Inject an unbounded production failure without rollback controls

---

### Q50





**Context:** An incident review finds a missing timeout, an unclear failover step, and retry-driven duplicate orders.

**Select all that apply.**

Which post-incident actions address the systemic causes?

- [ ] A. Update and rehearse the failover runbook
- [ ] B. Close the review after identifying the individual who was on call
- [ ] C. Add idempotency controls to order processing
- [ ] D. Add and test the timeout
