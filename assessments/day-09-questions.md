# Reliability & Fault Tolerance — MCQ Questions (30)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-09-answers.md](./answer-key/day-09-answers.md)

---

### Q01 [Easy] [Case Study] — UptimeCorp Checkout Outage

**Context:** UptimeCorp's payment API slows to 30 seconds. Order service threads block waiting. The entire site returns 503 even though product catalog and cart APIs are healthy.

**Select all that apply.**

What reliability principle was violated?

- [ ] A. Slow dependency caused cascading failure — thread pool exhaustion
- [ ] B. Reliability means surviving partial failures, not zero failures ever
- [ ] C. Fast APIs are automatically reliable APIs
- [ ] D. Blast radius was not limited — one dependency took down unrelated paths

---

### Q02 [Easy] — Reliability vs Performance vs Scalability

**Select all that apply.**

Which distinctions are correct?

- [ ] A. Performance — speed of a single request under normal conditions
- [ ] B. Scalability — handling increased load/volume
- [ ] C. Reliability — correct behavior when components fail
- [ ] D. A scalable system is automatically reliable under dependency failure

---

### Q03 [Easy] [Case Study] — UptimeCorp SLA Math

**Context:** UptimeCorp promises customers 99.9% availability in the SLA. Engineering targets 99.95% internally.

**Select all that apply.**

Which metric relationships are correct?

- [ ] A. SLO (internal target) should be stricter than SLA (customer contract) — buffer before breach
- [ ] B. 99.9% ≈ 43.8 minutes downtime per month
- [ ] C. SLA, SLO, and SLI are interchangeable terms
- [ ] D. Each additional nine is roughly ten times harder to achieve

---

### Q04 [Easy] — RPO vs RTO

**Select all that apply.**

UptimeCorp defines disaster recovery targets after regional failure.

- [ ] A. RPO — maximum acceptable data loss measured in time
- [ ] B. RTO — maximum acceptable downtime before service restored
- [ ] C. RPO and RTO measure the same thing
- [ ] D. Daily backups only may imply RPO up to 24 hours

---

### Q05 [Easy] [Case Study] — UptimeCorp SPOF Audit

**Context:** UptimeCorp runs one load balancer, one PostgreSQL primary (no replica), one Redis node, and DNS with no secondary provider.

**Select all that apply.**

Which are single points of failure (SPOF)?

- [ ] A. Single database primary with no failover replica
- [ ] B. Single Redis instance with no replica/Sentinel
- [ ] C. Three stateless app servers behind one LB — app tier alone is not SPOF if any instance can serve
- [ ] D. Multi-AZ deployment with health-checked redundant instances eliminates all SPOF without multi-region

---

### Q06 [Easy] — Serial Dependency Availability

**Select all that apply.**

Checkout calls Auth (99.9%) → Inventory (99.9%) → Payment (99.9%) synchronously in series.

- [ ] A. Combined availability ≈ 0.999³ ≈ 99.7% — worse than each service alone
- [ ] B. Parallelize, cache, or add fallbacks to reduce serial dependency risk
- [ ] C. More sync dependencies in the critical path never affect end-to-end availability
- [ ] D. Your SLA cannot exceed a dependency's SLA without fallback or caching

---

### Q07 [Medium] [Case Study] — UptimeCorp Multi-AZ Deploy

**Context:** UptimeCorp runs three API instances across two availability zones behind an ALB with deep health checks (DB + Redis reachable).

**Select all that apply.**

Which HA practices apply?

- [ ] A. Multi-AZ survives datacenter-level failure within a region
- [ ] B. Deep health checks remove instances that cannot reach dependencies
- [ ] C. Shallow health check (process up) is sufficient for production traffic routing
- [ ] D. Stateless app servers with sessions in Redis — not in pod memory

---

### Q08 [Medium] — Active-Active vs Active-Passive

**Select all that apply.**

Which statements compare redundancy models?

- [ ] A. Active-active — all nodes serve traffic simultaneously
- [ ] B. Active-passive — standby idle until failover promotion
- [ ] C. Active-passive failover is always instant with zero promotion delay
- [ ] D. N+1 redundancy — one extra instance covers failure during rolling deploy

---

### Q09 [Medium] [Case Study] — UptimeCorp Hung Payment Call

**Context:** UptimeCorp order service calls payment API with no timeout. Payment hangs indefinitely. 200 threads block; new checkout requests queue until timeout at the gateway.

**Select all that apply.**

What should UptimeCorp implement first?

- [ ] A. Client timeout shorter than user-facing SLA — fail fast and free threads
- [ ] B. Timeout is first-line defense against cascading failure
- [ ] C. Default infinite timeout on internal calls is acceptable
- [ ] D. Inner dependency timeouts should be shorter than outer gateway timeout budget

---

### Q10 [Medium] — Timeout Budget

**Select all that apply.**

User-facing checkout SLA is 5 seconds total. Order service calls three dependencies.

- [ ] A. Sum of inner timeouts + retries must fit within user SLA
- [ ] B. Client timeout should be ≥ server processing limit to avoid client giving up while server still works
- [ ] C. Typical internal API timeout range: 1–3 seconds; DB: 500 ms–2 s; Redis: 100–500 ms
- [ ] D. One global 30-second timeout for all dependencies is best practice

---

### Q11 [Medium] [Case Study] — UptimeCorp Retry Storm

**Context:** Payment API returns 503 for 30 seconds. 5,000 clients retry simultaneously every second with no backoff. Payment receives 5× normal load and stays down longer.

**Select all that apply.**

What fixes apply?

- [ ] A. Exponential backoff with jitter on retries
- [ ] B. Retry only transient errors (503, timeout) — not 400/401
- [ ] C. Retry all errors including invalid payload forever
- [ ] D. Coordinate retry budgets across layers — avoid 3×3×3 compounded attempts

---

### Q12 [Medium] — Idempotent Retries

**Select all that apply.**

UptimeCorp retries `POST /transfer` on timeout.

- [ ] A. Requires Idempotency-Key or dedup store — otherwise retry may double-charge
- [ ] B. GET and idempotent PUT with key are safer to retry
- [ ] C. Retrying non-idempotent POST without protection is safe
- [ ] D. Async queue workers may allow more retries (5–10) than sync user path (2–3)

---

### Q13 [Medium] [Case Study] — UptimeCorp Circuit Opens

**Context:** Payment API fails 8 times in 10 seconds. UptimeCorp's circuit breaker opens — checkout returns immediate fallback error instead of waiting 30 s per request.

**Select all that apply.**

Which circuit breaker facts are correct?

- [ ] A. States: CLOSED → OPEN (fail fast) → HALF-OPEN (test) → CLOSED or OPEN
- [ ] B. Stops wasted calls to a failing dependency — protects caller resources
- [ ] C. Open circuit means the payment API is fixed
- [ ] D. Per-dependency circuits — payment open should not trip unrelated recommendation circuit

---

### Q14 [Medium] — Circuit Breaker vs Retries

**Select all that apply.**

How do retries and circuit breakers work together?

- [ ] A. Complementary — 2–3 retries on transient failure, then count toward open threshold
- [ ] B. Circuit breaker replaces retries entirely — use one or the other
- [ ] C. Retries help brief blips; circuit breaker stops sustained outage amplification
- [ ] D. Unlimited retries while circuit is closed can still saturate the caller during prolonged outage

---

### Q15 [Hard] [Case Study] — UptimeCorp Bulkhead Saves Browse

**Context:** Payment processing uses a dedicated thread pool (20 threads). Recommendations use a separate pool (30 threads). Payment slows but product browse and cart remain responsive.

**Select all that apply.**

What pattern is this?

- [ ] A. Bulkhead — isolate resource pools so one area cannot drain the entire system
- [ ] B. Bulkhead is proactive isolation; circuit breaker is reactive to failure rate
- [ ] C. Bulkhead and circuit breaker solve identical problems
- [ ] D. When bulkhead is full: fail fast (503) or bounded queue — not unbounded block

---

### Q16 [Hard] — Bulkhead Types

**Select all that apply.**

Which are bulkhead implementations?

- [ ] A. Separate thread pools per dependency or feature tier
- [ ] B. Separate DB connection pools for checkout vs reporting queries
- [ ] C. Message queue absorbing spike while workers drain at fixed rate
- [ ] D. Larger bulkhead always improves isolation without trade-off

---

### Q17 [Hard] [Case Study] — UptimeCorp Graceful Degradation

**Context:** Recommendations service is down. UptimeCorp product pages load without "You may also like" section. Checkout and cart work normally.

**Select all that apply.**

Which degradation principles apply?

- [ ] A. Feature tiers: core (checkout) vs optional (recommendations) — disable optional silently
- [ ] B. Circuit breaker is mechanism; graceful degradation is policy for what UX to show
- [ ] C. Return 500 for entire product page when optional service fails
- [ ] D. Cached or static fallback for recommendations is a valid strategy

---

### Q18 [Hard] — Load Shedding Priority

**Select all that apply.**

UptimeCorp must drop traffic under extreme overload.

- [ ] A. Shed lowest priority first: analytics beacons before anonymous browse before paying checkout
- [ ] B. Return 503 with Retry-After for shed requests
- [ ] C. All traffic types must be treated equally during overload
- [ ] D. Payment path is core — cannot fully degrade authorized checkout without explicit policy

---

### Q19 [Easy] [Case Study] — UptimeCorp Regional Failover Drill

**Context:** Primary region fails. Route 53 shifts traffic to secondary region. RTO target is 15 minutes; last quarter drill measured 22 minutes due to untested runbook steps.

**Select all that apply.**

What DR practices improve outcomes?

- [ ] A. Tested runbooks and quarterly restore/failover drills reduce MTTR
- [ ] B. Untested backup equals no backup — verify restores, not just snapshots
- [ ] C. Multi-region is free and default for all systems regardless of tier
- [ ] D. Automatic failover RTO often 30 s–2 min; manual avoids split-brain risk but slower

---

### Q20 [Easy] — Split-Brain Prevention

**Select all that apply.**

During DB failover, two nodes briefly believe they are primary and accept writes.

- [ ] A. Split-brain causes diverging writes — must be prevented with quorum, STONITH, or fencing
- [ ] B. Patroni, RDS Multi-AZ, and etcd quorum help coordinate safe failover
- [ ] C. Split-brain is harmless — databases merge conflicting writes automatically
- [ ] D. Manual failover trades speed for reduced split-brain risk in some architectures

---

### Q21 [Medium] [Case Study] — UptimeCorp Error Budget Burn

**Context:** UptimeCorp SLO is 99.95% availability (0.05% error budget ≈ 22 min/month). A bad deploy burns 12% of the monthly budget in one hour. Pager fires on fast burn rate.

**Select all that apply.**

Which SLO/error budget practices apply?

- [ ] A. Alert on error budget burn rate — not every single 500 error
- [ ] B. Budget exhausted → freeze risky features; focus stability
- [ ] C. SLI measures successful valid requests — typically exclude client 4xx from availability SLI
- [ ] D. One 500 error should always page on-call immediately

---

### Q22 [Medium] — SLI Selection

**Select all that apply.**

Which are valid SLIs for UptimeCorp checkout?

- [ ] A. Percentage of checkout attempts completing payment within 30 seconds
- [ ] B. Server process "up" ping alone — sufficient for user-perceived availability
- [ ] C. P99 latency of payment API
- [ ] D. Error rate (5xx + timeout) on checkout path

---

### Q23 [Medium] [Case Study] — UptimeCorp Canary Deploy

**Context:** UptimeCorp deploys new order service to 5% of traffic, monitors checkout SLI for 10 minutes, then rolls to 100%. SLI drops 0.3% during canary — pipeline auto-rolls back.

**Select all that apply.**

Which safe deploy practices apply?

- [ ] A. Canary limits blast radius of bad deploys — majority of traffic unaffected
- [ ] B. Automated rollback when SLI degrades during canary window
- [ ] C. Big-bang deploy to 100% without metrics is fastest and safest
- [ ] D. Feature flags can disable bad code paths without full redeploy

---

### Q24 [Medium] — Defense in Depth Stack

**Select all that apply.**

UptimeCorp layers reliability patterns on the payment path.

- [ ] A. Redundancy → timeouts → retries → circuit breaker → bulkhead → graceful degradation → failover
- [ ] B. One pattern alone (e.g., circuit breaker only) is sufficient defense
- [ ] C. Patterns work together — not in isolation
- [ ] D. Assume failure — design, test, and operate for components breaking

---

### Q25 [Hard] [Case Study] — UptimeCorp Chaos Experiment

**Context:** SRE kills one AZ instance during business hours. Hypothesis: "Checkout SLI stays above 99.9%." SLI drops to 98% — sessions were in pod memory.

**Select all that apply.**

What chaos engineering practices apply?

- [ ] A. Define steady-state metric (checkout SLI) and hypothesis before injecting failure
- [ ] B. Start with small blast radius in staging, then controlled production experiments
- [ ] C. Chaos in full production without limits on day one is standard first step
- [ ] D. Fix findings — move sessions to Redis; rerun experiment to validate

---

### Q26 [Hard] — Partial vs Total Failure

**Select all that apply.**

Which statements about failure modes are correct?

- [ ] A. Partial/slow failures are harder to detect than total outage — need latency/error-rate alerts
- [ ] B. Cascading failure can start from one slow dependency without multiple root causes
- [ ] C. Only total failures require design attention
- [ ] D. Timeouts and circuit breakers address slow partial failures

---

### Q27 [Easy] — MTBF and MTTR

**Select all that apply.**

Availability relates to MTBF and MTTR.

- [ ] A. Lowering MTTR raises availability without reducing failure frequency
- [ ] B. Higher MTBF alone guarantees high availability if MTTR is hours
- [ ] C. Availability ≈ MTBF / (MTBF + MTTR)
- [ ] D. Incident MTTR spans alert → fix → verified restoration

---

### Q28 [Medium] [Case Study] — UptimeCorp Read-Only Mode

**Context:** Primary DB fails over to replica with 45-second lag. UptimeCorp enables read-only mode: browse works, checkout disabled with clear banner.

**Select all that apply.**

What degradation strategy is this?

- [ ] A. Graceful degradation — partial function over total outage
- [ ] B. Core browse path alive; enhanced checkout paused until consistency restored
- [ ] C. Continue accepting payments against potentially stale inventory during failover
- [ ] D. Communicate clearly to users — better than silent wrong charges

---

### Q29 [Hard] — Designing for Failure Checklist

**Select all that apply.**

Which belong on UptimeCorp's reliability checklist?

- [ ] A. Eliminate SPOF with multi-instance, multi-AZ redundancy and health checks
- [ ] B. Idempotency on all write paths that retry (API, queue, failover)
- [ ] C. Blameless postmortems with owned action items after incidents
- [ ] D. Most outages are external hardware — ignore deploy pipeline quality

---

### Q30 [Hard] [Case Study] — UptimeCorp Game Day

**Context:** UptimeCorp simulates payment provider 503 for one hour. On-call follows runbook, enables cached fallback for order status, communicates via status page. MTTR improves 40% vs last real incident.

**Select all that apply.**

What practices does this exercise?

- [ ] A. Game day — scheduled incident simulation improves runbooks and MTTR
- [ ] B. Test degradations in staging by manually opening circuits before production need
- [ ] C. Game days replace need for metrics, SLOs, or automated rollback
- [ ] D. Problem→pattern: dependency down → circuit breaker + fallback + comms

---
