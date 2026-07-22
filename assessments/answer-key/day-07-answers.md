# Reliability & Fault Tolerance — Answer Key & Explanations (50)

Answer key for [day-07-questions.md](../day-07-questions.md)




---

### Q01

**Answer:** A, B

**Explanation:** A bounded timeout frees callers and a bulkhead protects unrelated capacity (B, C). Immediate retries amplify the outage (D), while continuing normal traffic after sustained failure defeats circuit breaking (C).

---

### Q02

**Answer:** A, B

**Explanation:** Reliability concerns surviving failures, and a fast system can still fail poorly (A, C). Scaling alone does not remove SPOFs (D), while performance concerns response speed rather than only failure survival (C).

---

### Q03

**Answer:** B, C

**Explanation:** Safety, contractual exposure, data loss, and business impact should shape reliability targets (B, D). One target does not fit every system (A), and redundancy adds rather than always lowers cost and complexity (D).

---

### Q04

**Answer:** A, B

**Explanation:** MTBF describes time between failures, and reducing MTTR improves availability (A, B). Correctness and timeliness can matter to availability (D), so a running process returning errors is not meaningfully available (C).

---

### Q05

**Answer:** B, C

**Explanation:** A 99.9% month permits about 43.8 minutes, while 99.99% permits roughly one-tenth as much (A, D). Maintenance treatment depends on policy (A), and 4.4 minutes corresponds to 99.99%, not 99.9% (D).

---

### Q06

**Answer:** A, C

**Explanation:** Four hours is the intended RTO, and hourly backups imply about a one-hour RPO (A, C). A target alone does not prove recovery speed without drills (B), and RPO concerns data loss rather than failover time (D).

---

### Q07

**Answer:** A, B

**Explanation:** Required sequential dependencies multiply risk, and unnecessary synchronous hops lower path availability (A, C). Independent redundancy can improve availability rather than always reduce it (C), and replicas need not fail together (D).

---

### Q08

**Answer:** B, C

**Explanation:** Each sole critical tier is a SPOF, and tested database replication reduces one such risk (A, B). Processes on one host do not remove the host SPOF (D), and app scaling does not make the database redundant (A).

---

### Q09

**Answer:** B, C

**Explanation:** Bounded timeouts and latency/error monitoring address partial failure (B, D). One isolated slow response should not permanently open a circuit (A), and a TCP connection does not prove application health (D).

---

### Q10

**Answer:** A, D

**Explanation:** Least privilege, tested recovery, canaries, and automated rollback reduce human-error impact (B, C). Blame adds no safeguard (C), and unreviewed manual changes are riskier than validated IaC (B).

---

### Q11

**Answer:** B, D

**Explanation:** Same-zone instances can tolerate one instance loss and preserve rolling-deploy capacity (A, D). They do not tolerate that zone's outage (A) or regional loss (C).

---

### Q12

**Answer:** A, D

**Explanation:** Active-passive may pay for idle standby, while active-active nodes already serve traffic (B, C). Active-active still has synchronization concerns (C), and passive promotion is neither guaranteed instantaneous nor decision-free (B).

---

### Q13

**Answer:** C, D

**Explanation:** Repeated readiness failures should remove traffic, and an appropriate deep readiness check can reflect critical dependencies (B, D). Using dependency readiness as liveness can create restart loops (B), while process liveness alone does not guarantee request success (A).

---

### Q14

**Answer:** A, B

**Explanation:** Stateless handling lets any healthy or replacement instance serve the next request (C, D). Keeping the only session copy in one instance, even with stickiness, undermines failover (A, B).

---

### Q15

**Answer:** C, D

**Explanation:** With N equal to four, N+1 is five and tolerates one server loss at peak (C, D). 2N would be eight, not five (B), and N+1 does not guarantee regional survival (A).

---

### Q16

**Answer:** C, D

**Explanation:** DNS caching can delay failover, so TTL must reflect the recovery objective (B, C). Neither a low TTL (B) nor health checking (A) bypasses every resolver and client cache.

---

### Q17

**Answer:** B, D

**Explanation:** Inner timeouts and downstream allocations must fit within the total deadline (B, D). Retries cannot safely exceed that deadline (A), and independent full-length timeouts exhaust the budget (C).

---

### Q18

**Answer:** A, B

**Explanation:** Connect and read timeouts bound distinct phases (C, D). A read timeout does not replace connect timeout (C), and a write timeout governs sending rather than reading the response (D).

---

### Q19

**Answer:** A, C

**Explanation:** A timed-out non-idempotent retry can duplicate effects, and abandoned server work can keep consuming resources (A, D). The client timeout does not prove server cancellation (B), while propagated cancellation can reduce waste (D).

---

### Q20

**Answer:** A, C

**Explanation:** Timeout handling should choose a bounded retry, fallback, or failure and cancel in-flight work when supported (B, D). Waiting indefinitely defeats the timeout (D), and suppressing diagnostics prevents useful correlation (B).

---

### Q21

**Answer:** A, C

**Explanation:** An unchanged unauthorized request should not be retried blindly, while a 503 can use bounded backoff (B, C). Malformed 400 requests need correction (B), and 429 handling should respect `Retry-After` rather than retry immediately (D).

---

### Q22

**Answer:** C, D

**Explanation:** Exponential backoff and jitter spread recovery traffic (B, C). Synchronized schedules (B) and unlimited attempts (A) sustain the retry storm.

---

### Q23

**Answer:** B, D

**Explanation:** A stable key and uniqueness constraint make retries represent one business operation (A, B). Discarding prior results repeats side effects (A), while a new identifier makes the retry new work (C).

---

### Q24

**Answer:** A, D

**Explanation:** Layered retries multiply attempts, so retry ownership should be coordinated (B, D). More retry layers increase load (B), and independent budgets do not automatically prevent multiplication (C).

---

### Q25

**Answer:** C, D

**Explanation:** Breakers stop calls during sustained failure, while retries may recover brief transient failures (C, D). Timeouts remain distinct and necessary (A), and an OPEN circuit should fail fast rather than permit retries through it (B).

---

### Q26

**Answer:** A, C, D

**Explanation:** OPEN circuits reject calls quickly; HALF-OPEN permits controlled probes after cooldown. Successful probes indicate recovery and can return the circuit to normal operation.

---

### Q27

**Answer:** A, B, C

**Explanation:** Breakers should react to dependency failures such as timeouts and relevant 5xx rates over a window. Valid client errors usually do not indicate dependency unhealthiness.

---

### Q28

**Answer:** A, B, D

**Explanation:** Recommendations are optional, so the core page can use an omitted or static fallback while degraded behavior is measured. Failing the whole page needlessly expands blast radius.

---

### Q29

**Answer:** B, C, D

**Explanation:** Dependencies have independent health, criticality, thresholds, and fallbacks. A global circuit lets one failure disable unrelated paths.

---

### Q30

**Answer:** A, C, D

**Explanation:** Separate bounded pools preserve checkout capacity when reporting overloads its allocation. An unbounded queue merely moves resource exhaustion into waiting work.

---

### Q31

**Answer:** A, B, D

**Explanation:** Bulkheads contain resource use before or during failure, while breakers stop repeated calls based on observed failure. Both still require per-call timeouts.

---

### Q32

**Answer:** A, B, D

**Explanation:** A semaphore bulkhead bounds concurrency with less overhead than a dedicated thread pool. It limits caller exposure but cannot guarantee downstream health.

---

### Q33

**Answer:** B, C, D

**Explanation:** A queue decouples intake from fixed consumer capacity and smooths temporary bursts. Queue depth and admission limits still matter because backlog cannot grow safely forever.

---

### Q34

**Answer:** B, C, D

**Explanation:** Capacity exhaustion should trigger bounded waiting, fast failure, or prioritized shedding. Unbounded blocking recreates system-wide starvation.

---

### Q35

**Answer:** A, B, C

**Explanation:** Optional features can be removed or replaced while the core purchase flow continues. Turning an optional dependency failure into a site-wide 500 is not graceful degradation.

---

### Q36

**Answer:** A, B, C

**Explanation:** Read-only service preserves safe functionality while writes are unavailable, with clear communication and monitoring. Silently accepting writes that cannot be preserved violates correctness.

---

### Q37

**Answer:** B, C, D

**Explanation:** Predefined priorities let the system shed low-value work before core traffic, and Retry-After communicates temporary rejection. Unbounded retention converts overload into memory or latency failure.

---

### Q38

**Answer:** A, C, D

**Explanation:** A breaker is the technical mechanism that skips unhealthy calls; degradation is the business and UX policy for the resulting response. Breakers cannot infer acceptable product behavior on their own.

---

### Q39

**Answer:** B, C, D

**Explanation:** Two writable primaries create split-brain and divergent histories. Majority decisions and fencing ensure the old primary cannot continue accepting writes after promotion.

---

### Q40

**Answer:** A, B, D

**Explanation:** Safe automation can shorten RTO, but promotion must consider health, lag, and split-brain risk. Asynchronous replication can still lose recent writes during automatic failover.

---

### Q41

**Answer:** B, C, D

**Explanation:** A usable backup must restore successfully, contain valid data, and meet the measured recovery objective. Backup-job success alone proves none of those outcomes.

---

### Q42

**Answer:** A, B, D

**Explanation:** More ready capacity generally costs more and reduces recovery time. Active-active is fastest to shift traffic but introduces the greatest data and operational complexity.

---

### Q43

**Answer:** A, B, C

**Explanation:** Documented procedures and practiced simulations improve execution, communication, and recovery speed. Untested runbooks can be incomplete or obsolete.

---

### Q44

**Answer:** A, B, C

**Explanation:** The SLI is the observed result, the SLO is the internal target, and the SLA is the customer agreement with consequences. The internal SLO is normally stricter than the SLA to provide a buffer.

---

### Q45

**Answer:** B, C, D

**Explanation:** Useful SLIs measure user-visible success, latency, freshness, and correctness. Process existence is an implementation signal, not proof that a user journey works.

---

### Q46

**Answer:** A, B, D

**Explanation:** Exhausting the budget should shift effort toward reducing risk and correcting major burn sources. Waiting for an SLA breach discards the SLO's early-warning purpose.

---

### Q47

**Answer:** A, B, D

**Explanation:** Burn rate expresses how quickly current failures consume allowed unreliability, and multiple windows catch both acute and sustained problems. This pages on material SLO risk rather than isolated noise.

---

### Q48

**Answer:** A, B, C

**Explanation:** Canary signals should gate rollout and trigger rollback before broad impact. Feature flags can disable the defective path without requiring a full deployment.

---

### Q49

**Answer:** A, B, C

**Explanation:** Controlled chaos starts with a steady state and hypothesis, then injects a bounded failure and observes the result. Unbounded experiments create incidents rather than useful evidence.

---

### Q50

**Answer:** A, C, D

**Explanation:** Action items should repair missing defenses, operational guidance, and duplicate-processing safety. Blame does not prevent recurrence or improve the architecture.
