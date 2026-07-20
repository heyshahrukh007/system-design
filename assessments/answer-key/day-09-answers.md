# Observability Deep Dive — Answer Key & Explanations (50)

Answer key for [day-09-questions.md](../day-09-questions.md)




---

### Q01 [Easy] [Case Study] — SignalOps Checkout Error Spike

**Answer:** B, C, D

**Explanation:** Traces, logs with trace_id, and metric timestamps pinpoint root cause. Restart-everything guessing prolongs MTTR (A).

---

### Q02 [Easy] — Defining Observability

**Answer:** A, B, C

**Explanation:** Observability is external signals and cross-service visibility, not binary uptime alone (D).

---

### Q03 [Easy] [Case Study] — SignalOps Silent Latency Creep

**Answer:** A, B, C

**Explanation:** Blind spots cause silent degradation, longer MTTR, and churn. Observability does not guarantee zero timeouts (D).

---

### Q04 [Easy] — Observability vs Reliability

**Answer:** A, B, D

**Explanation:** Reliability survives failures; observability detects/diagnoses and validates breaker behavior. Metrics do not replace breakers (C).

---

### Q05 [Easy] [Case Study] — SignalOps Architecture Growth

**Answer:** B, C, D

**Explanation:** Distributed, async, and on-call production need correlation. Single-server local logs only does not scale (A).

---

### Q06 [Easy] — Design Mindset

**Answer:** A, C, D

**Explanation:** Instrument early, symptom alerts, debuggable logs. Deferring all instrumentation flies blind at launch (B).

---

### Q07 [Easy] — Monitoring vs Observability

**Answer:** A, B, D

**Explanation:** Monitoring thresholds vs exploratory diagnosis of novel failures. You still need monitoring to notify (C).

---

### Q08 [Easy] [Case Study] — SignalOps Alert With No Data

**Answer:** A, C

**Explanation:** Page without drill-down data is monitoring-only gap; production needs both detection and observability (B, D wrong).

---

### Q09 [Easy] [Case Study] — SignalOps Post-Deploy Latency

**Answer:** A, B, C

**Explanation:** Unknown-unknown debugging — dependency, client slice, shard. Disk >90% is a known monitored threshold (D).

---

### Q10 [Easy] — Health Checks vs Deep Visibility

**Answer:** A, B, D

**Explanation:** Health is binary; slow DB/GC/retry can hide behind 200. Health alone is insufficient (C).

---

### Q11 [Easy] [Case Study] — SignalOps Incident Workflow

**Answer:** B, D

**Explanation:** Metrics → logs → traces workflow uses pillars together. Logs-only or traces-only are anti-patterns (B, D).

---

### Q12 [Easy] — Logs Pillar

**Answer:** A, B, D

**Explanation:** Logs are event-level with context and cost. Fleet-wide per-request alerting belongs on metrics (C).

---

### Q13 [Easy] — Metrics Pillar

**Answer:** B, C, D

**Explanation:** Counter, gauge, histogram behaviors as documented. Counters are monotonic until process restart, not minutely reset (A).

---

### Q14 [Easy] — Traces Pillar

**Answer:** A, B, D

**Explanation:** Traces show path, timing, dependencies. Full unsampled 100K RPS ignores sampling cost (C).

---

### Q15 [Medium] [Case Study] — SignalOps Metrics-Only Stack

**Answer:** A, C, D

**Explanation:** Single-pillar gaps: metrics lack context, logs-only can't alert efficiently, traces-only miss aggregates. All three together is the fix (B).

---

### Q16 [Medium] [Case Study] — SignalOps Telemetry Pipeline

**Answer:** A, B, D

**Explanation:** OTel collector pattern and multi-backend stacks are standard. SSH grep per pod does not scale (C).

---

### Q17 [Medium] — Structured Logging

**Answer:** A, B, D

**Explanation:** JSON fields enable platform queries. Plain text grep at scale is slow (C).

---

### Q18 [Medium] [Case Study] — SignalOps Alert Fatigue

**Answer:** A, B, C

**Explanation:** Level discipline and sampling reduce noise. Secrets in logs are unsafe (D).

---

### Q19 [Medium] — Correlation IDs

**Answer:** B, C, D

**Explanation:** Single ID from gateway with trace alignment. Regenerating per service breaks correlation (A).

---

### Q20 [Medium] — Safe Logging Content

**Answer:** A, B, D

**Explanation:** Log outcomes and IDs, not secrets or huge bodies. PAN/keys must not appear (C).

---

### Q21 [Medium] [Case Study] — SignalOps Order Service SLOs

**Answer:** A, C, D

**Explanation:** RED is rate, errors, duration for request services. CPU utilization alone is USE-style (B).

---

### Q22 [Medium] [Case Study] — SignalOps Payment Latency

**Answer:** A, C, D

**Explanation:** rate, error ratio, histogram quantiles match RED. user_id labels explode cardinality (B).

---

### Q23 [Medium] — USE Method

**Answer:** A, B, C

**Explanation:** USE targets resources: utilization, saturation, errors. HTTP RPS is RED on services (D).

---

### Q24 [Medium] [Case Study] — SignalOps Queue Backlog

**Answer:** A, B, C

**Explanation:** Queue depth gauge, processed counter, lag/duration histogram fit workers. Counters do not decrease (D).

---

### Q25 [Medium] — Label Cardinality

**Answer:** A, B, D

**Explanation:** Bounded labels good; unbounded IDs belong in logs/traces. Putting IDs in metrics is the anti-pattern (C).

---

### Q26 [Medium] [Case Study] — SignalOps Metric Cost Explosion

**Answer:** A, B, C

**Explanation:** user_id label caused cardinality; use status labels and logs for per-user drill-down. order_id labels repeat the mistake (D).

---

### Q27 [Medium] — Golden Signals

**Answer:** A, B, D

**Explanation:** Golden signals align with RED/USE coverage. They complement logs, not replace them (C).

---

### Q28 [Medium] — Trace Structure

**Answer:** A, B, C

**Explanation:** Trace/span hierarchy and propagation rules. Each span has its own span ID (D).

---

### Q29 [Medium] [Case Study] — SignalOps Missing Payment Span

**Answer:** A, B, D

**Explanation:** Missing hops mean broken header propagation/instrumentation. Traces require propagation (C).

---

### Q30 [Medium] [Case Study] — SignalOps Async Notification

**Answer:** A, B, D

**Explanation:** Carry trace_id in messages and search across producer/consumer. HTTP trace does not auto-link async work (C).

---

### Q31 [Medium] — OpenTelemetry and Instrumentation

**Answer:** B, C, D

**Explanation:** OTel pipeline and auto+manual spans. Logs remain essential alongside OTel (A).

---

### Q32 [Medium] — Trace Sampling

**Answer:** A, B, C

**Explanation:** Head/tail sampling and keeping error traces. 100% at extreme RPS is not production-viable (D).

---

### Q33 [Medium] [Case Study] — SignalOps N+1 in Inventory

**Answer:** B, C, D

**Explanation:** Repeated spans, dominant span, retries visible in traces. Timelines show parallel vs serial (A).

---

### Q34 [Medium] [Case Study] — SignalOps Service Launch Checklist

**Answer:** A, B, D

**Explanation:** Health, RED, stdout JSON, propagation, metrics endpoint. Tracing with sampling belongs at prod launch (C).

---

### Q35 [Medium] — Gateway and Auto Instrumentation

**Answer:** B, C, D

**Explanation:** Auto for plumbing, manual for business steps, gateway per-route RED. Auto does not replace domain metrics (A).

---

### Q36 [Hard] [Case Study] — SignalOps Gateway Access Logs

**Answer:** A, B, C

**Explanation:** Gateway generates IDs, rich access logs, route RED. Regenerating trace IDs mid-chain breaks traces (D).

---

### Q37 [Hard] — Dashboard Design

**Answer:** B, C, D

**Explanation:** Tiered RED/USE dashboards with deploy markers. Vanity/chart spam wastes on-call time (A).

---

### Q38 [Hard] [Case Study] — SignalOps On-Call Dashboard

**Answer:** A, B, D

**Explanation:** System → service → dependency drill-down with percentiles. CPU alone without symptoms is weak paging (C).

---

### Q39 [Hard] — Alerting on Symptoms

**Answer:** B, C, D

**Explanation:** User-visible error rate and latency; CPU with latency for context. Single 500 pages create fatigue (A).

---

### Q40 [Hard] [Case Study] — SignalOps CPU Pages

**Answer:** A, B, C

**Explanation:** Low CPU threshold without user impact is noisy and erodes trust. Checkout SLO burn uses SLI/budget alerts (D).

---

### Q41 [Hard] — Severity and Runbooks

**Answer:** A, C, D

**Explanation:** P1/P2/P3 discipline with linked runbooks. One-off pod restart is not page-worthy alone (B).

---

### Q42 [Hard] — Alert Routing and Noise

**Answer:** A, C, D

**Explanation:** Route by severity, dedupe, prune quarterly. Runbooks are required for actionable pages (B).

---

### Q43 [Hard] [Case Study] — SignalOps SLO Burn Page

**Answer:** A, C, D

**Explanation:** Fast/slow burn rate on budget consumption beats paging every 500 (B).

---

### Q44 [Hard] [Case Study] — SignalOps Checkout SLI

**Answer:** A, B, D

**Explanation:** Journey-based checkout SLI with metrics and failure logs. process_running ignores user outcomes (C).

---

### Q45 [Hard] — Error Budgets

**Answer:** A, B, D

**Explanation:** Shared budget drives deploy risk decisions. Engineering must respect budget, not only finance (C).

---

### Q46 [Hard] — SLO Dashboards and SLA

**Answer:** A, B, C

**Explanation:** Show SLI, budget, burn; alert on stricter internal SLO. Hiding budget blocks deploy decisions (D).

---

### Q47 [Hard] [Case Study] — SignalOps Deploy Freeze

**Answer:** B, D

**Explanation:** Low budget triggers freeze/discussion; dashboards answer deploy safety. Ignoring budget or shipping blindly (B, D) violates SRE practice.

---

### Q48 [Hard] — Log Aggregation

**Answer:** A, B, D

**Explanation:** stdout → agent → central store with tiered retention and query by IDs. Local container files are lost on reschedule (C).

---

### Q49 [Hard] [Case Study] — SignalOps Lost Pod Logs

**Answer:** A, B, D

**Explanation:** Central shipping and volume control prevent evidence loss. DEBUG forever in hot tier is costly (C).

---

### Q50 [Hard] [Case Study] — SignalOps Mesh and East-West

**Answer:** A, B, C

**Explanation:** Gateway north-south plus mesh east-west and trace graphs; mesh complements app IDs and queue context (D).
