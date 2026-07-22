# Observability Deep Dive — Answer Key & Explanations (50)




---

### Q01

**Answer:** A, B

**Explanation:** Trace latency and metric timing quickly narrow the incident. Deleting diagnostic evidence (C) or restarting everything blindly (D) prolongs MTTR.

---

### Q02

**Answer:** A, B

**Explanation:** Observability infers internal state from signals across components. It is broader than binary uptime (D), and pod-local telemetry is lost or fragmented at scale (C).

---

### Q03

**Answer:** A, B

**Explanation:** Blind spots allow degradation to remain silent and increase MTTR. Slow checkout can hurt retention (D), and observability cannot guarantee zero dependency timeouts (C).

---

### Q04

**Answer:** A, D

**Explanation:** Reliability mechanisms survive failures while observability detects impact and verifies fallbacks. Breakers still need measurement (C), and telemetry does not replace them (B).

---

### Q05

**Answer:** A, D

**Explanation:** Distributed request paths and asynchronous work require correlation. Local-only logs do not scale (B), and an SLO states a target but does not diagnose violations (C).

---

### Q06

**Answer:** A, D

**Explanation:** Instrumenting before launch and alerting on user symptoms support production diagnosis. Deferring telemetry (C) or omitting request and service context (B) leaves responders blind.

---

### Q07

**Answer:** B, C

**Explanation:** Monitoring detects known conditions; observability supports novel exploratory diagnosis beyond fixed checks. Observability does not eliminate paging (D) and is not limited to binary health checks (A).

---

### Q08

**Answer:** A, D

**Explanation:** Page without drill-down data is monitoring-only gap; production needs both detection and observability (B, D wrong).

---

### Q09

**Answer:** A, C

**Explanation:** Correlating failures with a shard or client platform explores dimensions not anticipated by a fixed alert. Disk threshold checks are known monitoring (D), and assuming causality without telemetry (B) is not diagnosis.

---

### Q10

**Answer:** A, C

**Explanation:** A process can be healthy while users experience slow queries, GC, or retries. Health alone does not replace RED and tracing (D), nor does a 200 prove journey SLO compliance (B).

---

### Q11

**Answer:** A, B

**Explanation:** Metrics → logs → traces workflow uses pillars together. Logs-only or traces-only are anti-patterns (B, D).

---

### Q12

**Answer:** C, D

**Explanation:** Logs preserve contextual, per-event detail for individual requests. Exact fleet percentiles require aggregation (B), while efficient fleet-wide alerting generally belongs on metrics (A).

---

### Q13

**Answer:** C, D

**Explanation:** Counters increase monotonically and histograms capture distributions. Counters do not reset each minute (B), and gauges may move both up and down (A).

---

### Q14

**Answer:** A, D

**Explanation:** Traces show a request's service path and dependency timing. Missing instrumentation limits diagnosis (B), and retaining every trace at extreme traffic has a cost tradeoff (C).

---

### Q15

**Answer:** A, B

**Explanation:** Logs-only and traces-only approaches each miss important aggregate capabilities. Using correlated pillars is the fix (C); metrics alone do not retain every payload and stack trace (D).

---

### Q16

**Answer:** A, D

**Explanation:** Modern stacks combine specialized backends, with tooling choices varying by organization. Pod-by-pod SSH (B) and streaming request telemetry to personal laptops (C) are not scalable collection designs.

---

### Q17

**Answer:** A, C

**Explanation:** Intentional structured fields enable reliable filtering and aggregation. Plain text is harder to query at scale (D), and JSON syntax does not prevent high-cardinality values (B).

---

### Q18

**Answer:** A, C

**Explanation:** Sampling debug detail and reserving ERROR for failed operations reduce fatigue. Secrets are unsafe (B), and marking successful health checks as errors creates noise (D).

---

### Q19

**Answer:** A, B

**Explanation:** The gateway should generate or forward IDs and every log should carry aligned correlation fields. Regenerating IDs (C) or stripping headers (D) breaks end-to-end searches.

---

### Q20

**Answer:** A, D

**Explanation:** Production logs should capture outcomes, durations, errors, and useful business IDs while limiting PII and payload size. Card data (C) and provider keys (B) must not be logged.

---

### Q21

**Answer:** B, C

**Explanation:** RED includes request rate and error rate. CPU-only utilization is a resource signal (A), and an arithmetic mean alone does not represent the duration distribution or tail (D).

---

### Q22

**Answer:** B, C

**Explanation:** Request rate and histogram quantiles are valid RED queries. Status must be recorded to calculate errors (A), while unbounded user IDs create cardinality problems (D).

---

### Q23

**Answer:** A, C

**Explanation:** Connection utilization and waiting work represent USE utilization and saturation. HTTP rate is RED (B), and requests per second is not a resource error measure (D).

---

### Q24

**Answer:** A, D

**Explanation:** Processing duration or lag histograms and monotonically increasing processed counters fit workers. Counters do not decrease (C), so a decrementing queue-depth counter is invalid (B).

---

### Q25

**Answer:** B, C, D

**Explanation:** Bounded labels good; unbounded IDs belong in logs/traces. Putting IDs in metrics is the anti-pattern (A).

---

### Q26

**Answer:** B, C, D

**Explanation:** user_id label caused cardinality; use status labels and logs for per-user drill-down. order_id labels repeat the mistake (A).

---

### Q27

**Answer:** A, B, D

**Explanation:** Golden signals align with RED/USE coverage. They complement logs, not replace them (C).

---

### Q28

**Answer:** A, B, C

**Explanation:** Trace/span hierarchy and propagation rules. Each span has its own span ID (D).

---

### Q29

**Answer:** B, C, D

**Explanation:** Missing hops mean broken header propagation/instrumentation. Traces require propagation (A).

---

### Q30

**Answer:** B, C, D

**Explanation:** Carry trace_id in messages and search across producer/consumer. HTTP trace does not auto-link async work (A).

---

### Q31

**Answer:** A, C, D

**Explanation:** OTel pipeline and auto+manual spans. Logs remain essential alongside OTel (B).

---

### Q32

**Answer:** A, B, D

**Explanation:** Head/tail sampling and keeping error traces. 100% at extreme RPS is not production-viable (C).

---

### Q33

**Answer:** A, B, C

**Explanation:** Repeated spans, dominant span, retries visible in traces. Timelines show parallel vs serial (D).

---

### Q34

**Answer:** A, B, C

**Explanation:** Health, RED, stdout JSON, propagation, metrics endpoint. Tracing with sampling belongs at prod launch (D).

---

### Q35

**Answer:** A, C, D

**Explanation:** Auto for plumbing, manual for business steps, gateway per-route RED. Auto does not replace domain metrics (B).

---

### Q36

**Answer:** B, C, D

**Explanation:** Gateway generates IDs, rich access logs, route RED. Regenerating trace IDs mid-chain breaks traces (A).

---

### Q37

**Answer:** A, C, D

**Explanation:** Tiered RED/USE dashboards with deploy markers. Vanity/chart spam wastes on-call time (B).

---

### Q38

**Answer:** B, C, D

**Explanation:** Layered service and dependency panels plus latency percentiles support drill-down; an average alone can hide severe tail latency.

---

### Q39

**Answer:** A, B, C

**Explanation:** User-visible error rate and latency; CPU with latency for context. Single 500 pages create fatigue (D).

---

### Q40

**Answer:** A, B, C

**Explanation:** Low CPU threshold without user impact is noisy and erodes trust. Checkout SLO burn uses SLI/budget alerts (D).

---

### Q41

**Answer:** B, C, D

**Explanation:** P1/P2/P3 discipline with linked runbooks. One-off pod restart is not page-worthy alone (A).

---

### Q42

**Answer:** A, B, C

**Explanation:** Route by severity, dedupe, prune quarterly. Runbooks are required for actionable pages (D).

---

### Q43

**Answer:** A, B, C

**Explanation:** Fast/slow burn rate on budget consumption beats paging every 500 (D).

---

### Q44

**Answer:** A, C, D

**Explanation:** Journey-based checkout SLI with metrics and failure logs. process_running ignores user outcomes (B).

---

### Q45

**Answer:** B, C, D

**Explanation:** Shared budget drives deploy risk decisions. Engineering must respect budget, not only finance (A).

---

### Q46

**Answer:** A, C, D

**Explanation:** Show SLI, budget, burn; alert on stricter internal SLO. Hiding budget blocks deploy decisions (B).

---

### Q47

**Answer:** A, B

**Explanation:** A nearly exhausted error budget should inform deployment risk and may trigger a freeze or reduced-risk release policy until reliability recovers.

---

### Q48

**Answer:** B, C, D

**Explanation:** stdout → agent → central store with tiered retention and query by IDs. Local container files are lost on reschedule (A).

---

### Q49

**Answer:** B, C, D

**Explanation:** Central shipping and volume control prevent evidence loss. DEBUG forever in hot tier is costly (A).

---

### Q50

**Answer:** A, B, C

**Explanation:** Gateway north-south plus mesh east-west and trace graphs; mesh complements app IDs and queue context (D).
