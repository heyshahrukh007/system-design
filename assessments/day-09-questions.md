# Observability Deep Dive — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-09-answers.md](./answer-key/day-09-answers.md)




---

### Q01 [Easy] [Case Study] — SignalOps Checkout Error Spike





**Context:** SignalOps checkout error rate jumps from 0.1% to 8%. Social media complaints spike. On-call is paged at 2 AM.

**Select all that apply.**

Which observability outcomes shorten this incident compared to flying blind?

- [ ] A. Restart every pod first because "something is wrong with orders"
- [ ] B. Metric alert pinpoints when the spike started (e.g., 10:42 UTC)
- [ ] C. Trace shows Payment Service p99 at 12s while baseline is ~200ms
- [ ] D. Logs tied to trace_id reveal upstream Stripe 503 timeouts

---

### Q02 [Easy] — Defining Observability





**Select all that apply.**

Which statements correctly describe observability?

- [ ] A. Ability to understand internal system state from external outputs (logs, metrics, traces)
- [ ] B. How engineers see across services, queues, and databases in distributed systems
- [ ] C. Centralized, searchable signals because you cannot SSH-debug every pod at scale
- [ ] D. Same as uptime monitoring — binary healthy/unhealthy only

---

### Q03 [Easy] [Case Study] — SignalOps Silent Latency Creep





**Context:** SignalOps checkout p99 latency doubled over three weeks. No alert fired. Support tickets rose before engineering noticed.

**Select all that apply.**

Which are costs of flying blind illustrated here?

- [ ] A. Silent degradation — latency creeps before anyone pages
- [ ] B. Longer MTTR when the incident finally surfaces
- [ ] C. Customer churn from repeated slow checkout without internal visibility
- [ ] D. Guaranteed elimination of all dependency timeouts

---

### Q04 [Easy] — Observability vs Reliability





**Select all that apply.**

How do observability and reliability relate?

- [ ] A. Reliability patterns (circuit breakers, redundancy) still need observability to verify behavior
- [ ] B. Observability focuses on detect and diagnose; reliability on survive failures
- [ ] C. Observability replaces circuit breakers once metrics exist
- [ ] D. You need visibility into whether users saw fallback vs 500 when a breaker opens

---

### Q05 [Easy] [Case Study] — SignalOps Architecture Growth





**Context:** SignalOps moved from one monolith server to gateway + order + payment + inventory + async notification workers.

**Select all that apply.**

When does observability become non-negotiable?

- [ ] A. Single-server monolith with logs on local disk only forever
- [ ] B. Async queue paths where failure happens minutes after publish
- [ ] C. On-call production with user-facing SLOs
- [ ] D. Requests cross service boundaries — trace and request IDs required

---

### Q06 [Easy] — Design Mindset





**Select all that apply.**

Which practices match an observability-first design mindset?

- [ ] A. Instrument early — metrics before launch, not after the riskiest period
- [ ] B. Defer all logging until post-launch to maximize dev velocity only
- [ ] C. Alert on user symptoms (checkout success) not raw CPU alone
- [ ] D. Every log line should help answer what request, what service, what failed

---

### Q07 [Easy] — Monitoring vs Observability





**Select all that apply.**

Which contrasts monitoring and observability accurately?

- [ ] A. Monitoring asks "Is the system healthy?" with predefined dashboards and thresholds
- [ ] B. Observability supports exploratory questions like "Why is checkout slow for EU users?"
- [ ] C. Observability replaces the need to ever page on-call
- [ ] D. Monitoring handles known failure modes; observability helps novel first-time failures

---

### Q08 [Easy] [Case Study] — SignalOps Alert With No Data





**Context:** SignalOps pages on-call for elevated error rate, but engineers cannot filter logs by request or open a trace across services.

**Select all that apply.**

What production gap does this describe?

- [ ] A. Monitoring without observability — alert fires, insufficient data to debug
- [ ] B. Observability without monitoring — rich data but nobody notified
- [ ] C. Need both: monitor SLIs/symptoms and observe with logs and traces
- [ ] D. Metrics alone always show full stack traces for every error

---

### Q09 [Easy] [Case Study] — SignalOps Post-Deploy Latency





**Context:** After a deploy, SignalOps p99 latency doubled. Dashboards show the spike but not which dependency changed.

**Select all that apply.**

Which are "unknown unknown" style questions observability should answer?

- [ ] A. Do only Android clients fail while iOS succeeds?
- [ ] B. Which dependency regressed after the deploy?
- [ ] C. Do errors correlate with one database shard?
- [ ] D. Is disk usage above 90% on one node?

---

### Q10 [Easy] — Health Checks vs Deep Visibility





**Select all that apply.**

How do health checks differ from full observability?

- [ ] A. Health checks are binary up/down monitoring on `/health`
- [ ] B. An instance can return 200 on health yet be slow on DB queries or in retry storms
- [ ] C. Health checks alone replace RED metrics and tracing
- [ ] D. Observability covers elevated GC, slow queries, and degraded UX while "healthy"

---

### Q11 [Easy] [Case Study] — SignalOps Incident Workflow





**Context:** SignalOps error rate alert fires on order-service. On-call opens dashboards, logs, and a slow trace.

**Select all that apply.**

Which sequence uses the three pillars together?

- [ ] A. Traces only — skip aggregate trends and alerting
- [ ] B. Dashboard slice by service label, then drill to logs and traces
- [ ] C. Logs only — skip metrics because they lack context
- [ ] D. Metric alert on error rate, then logs filtered by trace_id, then trace showing time in payment

---

### Q12 [Easy] — Logs Pillar





**Select all that apply.**

What are logs best suited for?

- [ ] A. Discrete events with context — errors, audit trails, business events
- [ ] B. Debugging a specific request when correlated with trace_id or request_id
- [ ] C. Cheap fleet-wide alerting on every request without aggregation
- [ ] D. Per-event granularity at higher volume/cost than metrics

---

### Q13 [Easy] — Metrics Pillar





**Select all that apply.**

Which metric types and behaviors are correct?

- [ ] A. Counter — reset every minute by design for rate queries
- [ ] B. Counter — monotonic increase (e.g., http_requests_total)
- [ ] C. Histogram — latency distribution in buckets
- [ ] D. Gauge — value goes up or down (e.g., queue_depth)

---

### Q14 [Easy] — Traces Pillar





**Select all that apply.**

What do distributed traces provide?

- [ ] A. End-to-end path of one request across services with timing per span
- [ ] B. Latency analysis — which span consumed the most time
- [ ] C. Complete unsampled detail for every request at 100K RPS with no cost tradeoff
- [ ] D. Dependency mapping for microservices debugging

---

### Q15 [Medium] [Case Study] — SignalOps Metrics-Only Stack





**Context:** SignalOps invested only in Prometheus counters. No centralized logs or tracing. Errors doubled but on-call cannot see individual failure context.

**Select all that apply.**

Which anti-patterns apply?

- [ ] A. Only traces — miss aggregate trends and sampling gaps
- [ ] B. Using all three pillars with shared correlation IDs
- [ ] C. Metrics alone — know something changed but not where or full context
- [ ] D. Only logs — cannot alert efficiently at scale

---

### Q16 [Medium] [Case Study] — SignalOps Telemetry Pipeline





**Context:** SignalOps standardizes on OpenTelemetry SDKs in services, a collector, and Grafana for dashboards and alerts.

**Select all that apply.**

Which collection pattern matches modern observability stacks?

- [ ] A. Services → OpenTelemetry SDK/agent → collector → backends for logs, metrics, traces
- [ ] B. Metrics backend (e.g., Prometheus) plus trace backend (e.g., Jaeger/Tempo) plus log store
- [ ] C. Each engineer SSHs to pods to tail unstructured files during incidents
- [ ] D. Tool names vary but the pillar patterns are universal

---

### Q17 [Medium] — Structured Logging





**Select all that apply.**

Why prefer structured JSON logs over plain text?

- [ ] A. Treat logs like APIs with intentional fields
- [ ] B. Machine-parseable — filter, aggregate, and alert in log platforms
- [ ] C. Plain text is always faster to search across terabytes
- [ ] D. Stable field names enable queries like level=ERROR and service=order-service

---

### Q18 [Medium] [Case Study] — SignalOps Alert Fatigue





**Context:** SignalOps logged every health check and retry at ERROR. Pager fires nightly; on-call ignores real checkout failures.

**Select all that apply.**

Which logging practices reduce fatigue?

- [ ] A. Use WARN for recoverable oddities; ERROR for failed operations needing attention
- [ ] B. Do not log everything as ERROR
- [ ] C. DEBUG verbose detail off in prod or sampled
- [ ] D. Log passwords and API secrets for faster debugging

---

### Q19 [Medium] — Correlation IDs





**Select all that apply.**

How should request and trace correlation work?

- [ ] A. Each service generates a new request_id mid-chain for uniqueness
- [ ] B. Every log line includes request_id aligned with trace_id from tracing
- [ ] C. One request_id per user request propagated gateway → downstream services
- [ ] D. Gateway generates or forwards X-Request-Id and traceparent headers

---

### Q20 [Medium] — Safe Logging Content





**Select all that apply.**

What should appear in production logs?

- [ ] A. Request start/end, duration, error type, business IDs like order_id
- [ ] B. Downstream dependency failure details without secrets
- [ ] C. Full credit card numbers and API keys for audit
- [ ] D. Avoid huge response bodies and unredacted PII unless policy allows

---

### Q21 [Medium] [Case Study] — SignalOps Order Service SLOs





**Context:** SignalOps exports HTTP metrics from order-service for dashboards and SLO alerts.

**Select all that apply.**

Which metrics belong to the RED method for request-driven services?

- [ ] A. Duration — latency distribution (e.g., p99 from histogram)
- [ ] B. Utilization — CPU percent only, ignoring request outcomes
- [ ] C. Rate — requests per second
- [ ] D. Errors — failed requests per second or error ratio

---

### Q22 [Medium] [Case Study] — SignalOps Payment Latency





**Context:** SignalOps queries Prometheus for payment-service after a latency incident.

**Select all that apply.**

Which query ideas match RED instrumentation?

- [ ] A. rate(http_requests_total[5m]) for traffic
- [ ] B. Label http_requests_total with unbounded user_id for per-user SLO
- [ ] C. Error ratio from 5xx rate divided by total request rate
- [ ] D. histogram_quantile(0.99, http_request_duration_seconds) for tail latency

---

### Q23 [Medium] — USE Method





**Select all that apply.**

Which examples fit USE metrics for infrastructure resources?

- [ ] A. Utilization — active DB connections / max_connections
- [ ] B. Saturation — queries waiting on locks or disk queue depth
- [ ] C. Errors — replication failures or disk errors
- [ ] D. Rate — HTTP requests per second on an API route (RED, not USE)

---

### Q24 [Medium] [Case Study] — SignalOps Queue Backlog





**Context:** SignalOps notification workers fall behind; checkout API stays green while emails delay hours.

**Select all that apply.**

Which metric choices fit the worker and queue?

- [ ] A. Gauge queue_depth rising under load
- [ ] B. Counter messages_processed_total for throughput
- [ ] C. Histogram consumer_lag or processing duration
- [ ] D. Counter that decreases when messages complete

---

### Q25 [Medium] — Label Cardinality





**Select all that apply.**

Which label practices are sound?

- [ ] A. Never use user_id as a metric label — millions of unique values
- [ ] B. Slice by service, method, status — bounded cardinality
- [ ] C. Put unbounded IDs in metrics instead of logs/traces
- [ ] D. High cardinality explodes storage and query cost

---

### Q26 [Medium] [Case Study] — SignalOps Metric Cost Explosion





**Context:** An engineer added checkout_duration_seconds{user_id="..."}. Prometheus memory spiked within a day.

**Select all that apply.**

What went wrong and how to fix?

- [ ] A. Unbounded user_id label — high cardinality anti-pattern
- [ ] B. Prefer checkout_duration_seconds{status="success|failure"} instead
- [ ] C. Use logs/traces for per-user investigation, not metric labels
- [ ] D. Add every order_id as a label for precise alerting

---

### Q27 [Medium] — Golden Signals





**Select all that apply.**

How do Google's golden signals relate to RED/USE?

- [ ] A. Latency, traffic, errors, saturation — overlapping with RED for services and USE for resources
- [ ] B. RED covers rate, errors, duration for request-driven services
- [ ] C. Golden signals eliminate need for logs entirely
- [ ] D. USE covers utilization, saturation, errors on infrastructure

---

### Q28 [Medium] — Trace Structure





**Select all that apply.**

Which distributed tracing terms are correct?

- [ ] A. Trace — entire journey; spans — units of work with parent/child relationships
- [ ] B. Trace ID shared across spans; span ID unique per span
- [ ] C. Broken propagation stops the trace at the first hop with no downstream spans
- [ ] D. One span ID reused for every service in the chain

---

### Q29 [Medium] [Case Study] — SignalOps Missing Payment Span





**Context:** SignalOps traces show gateway and order-service but payment-service and Stripe never appear.

**Select all that apply.**

Likely causes and fixes?

- [ ] A. Gateway not forwarding trace context to order-service
- [ ] B. Payment service not extracting/injecting traceparent on outbound calls
- [ ] C. Traces always include all hops without instrumentation
- [ ] D. Broken propagation — common bug when headers dropped

---

### Q30 [Medium] [Case Study] — SignalOps Async Notification





**Context:** Checkout returns 201 quickly; notification worker logs errors 30 seconds later with no link to the API request.

**Select all that apply.**

How to maintain observability across async boundaries?

- [ ] A. Include trace_id (and correlation_id) in queue message metadata
- [ ] B. Search logs by trace_id across API publisher and consumer
- [ ] C. Assume sync HTTP trace covers post-response worker work automatically
- [ ] D. Propagate context from order.created publish through consume

---

### Q31 [Medium] — OpenTelemetry and Instrumentation





**Select all that apply.**

Which statements about OpenTelemetry and instrumentation are accurate?

- [ ] A. OpenTelemetry replaces need for structured logging entirely
- [ ] B. App → OTel SDK → collector → backends like Jaeger or Tempo
- [ ] C. Auto-instrumentation for HTTP, gRPC, DB drivers; manual spans for business steps
- [ ] D. Industry-standard APIs/SDKs for traces, metrics, and logs

---

### Q32 [Medium] — Trace Sampling





**Select all that apply.**

Which sampling strategies fit high-traffic production?

- [ ] A. Head sampling — decide at trace start (e.g., 1% of requests)
- [ ] B. Tail sampling — retain slow or errored traces
- [ ] C. Always sample failed checkout traces — never drop critical errors
- [ ] D. 100% trace every request at 100K RPS with no cost concern

---

### Q33 [Medium] [Case Study] — SignalOps N+1 in Inventory





**Context:** SignalOps trace shows dozens of repeated inventory DB child spans under one checkout span.

**Select all that apply.**

What can traces reveal here?

- [ ] A. Traces cannot show parallel vs serial work on a timeline
- [ ] B. N+1 or fan-out call pattern visible as many repeated child spans
- [ ] C. Retry storms appear as duplicate spans to the same dependency
- [ ] D. Longest span highlights which dependency dominates time

---

### Q34 [Medium] [Case Study] — SignalOps Service Launch Checklist





**Context:** SignalOps launches a new inventory-service into production behind the gateway.

**Select all that apply.**

Which minimum instrumentation should be in place?

- [ ] A. /health and /ready, RED metrics with low-cardinality labels
- [ ] B. JSON logs to stdout with request_id; propagate trace headers in/out
- [ ] C. Log and metric dependency failures; defer tracing until year two
- [ ] D. Metrics endpoint (Prometheus/OpenTelemetry) for scraping

---

### Q35 [Medium] — Gateway and Auto Instrumentation





**Select all that apply.**

Where should auto vs manual instrumentation focus?

- [ ] A. Auto replaces all business metrics like orders_per_minute
- [ ] B. Gateway: per-route rate, 4xx/5xx, latency histogram, 429 rate-limit metrics
- [ ] C. Auto for HTTP plumbing, DB drivers, framework middleware
- [ ] D. Manual spans at critical business steps like validate_cart or charge_payment

---

### Q36 [Hard] [Case Study] — SignalOps Gateway Access Logs





**Context:** SignalOps API gateway sees all north-south traffic. Mobile clients omit request IDs.

**Select all that apply.**

What should the gateway emit?

- [ ] A. Generate request_id if client did not send X-Request-Id
- [ ] B. Access logs: method, path, status, duration, user_id, request_id
- [ ] C. Per-route RED metrics plus rate-limit rejection counts
- [ ] D. Regenerate new trace IDs at each downstream hop for security

---

### Q37 [Hard] — Dashboard Design





**Select all that apply.**

Which belong on effective observability dashboards?

- [ ] A. Fifty nearly identical charts and vanity metrics nobody acts on
- [ ] B. Deploy markers annotated to correlate spikes with releases
- [ ] C. Level 1 system health — availability, error rate, p99 latency
- [ ] D. Level 2 per-service RED and dependency error rates

---

### Q38 [Hard] [Case Study] — SignalOps On-Call Dashboard





**Context:** SignalOps on-call opens Grafana during a checkout incident.

**Select all that apply.**

Which panels help the drill-down hierarchy?

- [ ] A. Platform error rate and p99, then order-service RED
- [ ] B. Queue depth and replication lag when dependencies suspect
- [ ] C. Raw CPU at 62% with no latency or error context as sole page trigger
- [ ] D. Latency percentiles p50, p95, p99 per service

---

### Q39 [Hard] — Alerting on Symptoms





**Select all that apply.**

Which alerts align with user impact?

- [ ] A. Any single 500 error pages immediately
- [ ] B. CPU > 90% for ten minutes **and** latency elevated — cause plus symptom
- [ ] C. Checkout error rate > 1% for five minutes
- [ ] D. p99 latency > 2s sustained — symptom users feel

---

### Q40 [Hard] [Case Study] — SignalOps CPU Pages





**Context:** SignalOps pages on-call whenever CPU > 50%. Checkout is fine; on-call disables alerts.

**Select all that apply.**

What makes this a bad alert?

- [ ] A. Not actionable — no required human fix when users unaffected
- [ ] B. Threshold too low without symptom correlation
- [ ] C. Contributes to alert fatigue — real P1s get ignored
- [ ] D. Perfect primary signal for checkout SLO burn

---

### Q41 [Hard] — Severity and Runbooks





**Select all that apply.**

Which practices match production alerting discipline?

- [ ] A. P3 — ticket next day for non-urgent items like disk 80%
- [ ] B. Page on every pod restart once with no restart loop threshold
- [ ] C. P1 pages immediately for checkout down or data loss
- [ ] D. Every P1/P2 alert links to a runbook with diagnostic steps

---

### Q42 [Hard] — Alert Routing and Noise





**Select all that apply.**

How should teams route and maintain alerts?

- [ ] A. P1 → PagerDuty primary on-call; aggregate by service and symptom
- [ ] B. Never tie alerts to runbooks — engineers should guess steps
- [ ] C. Avoid duplicate alerts firing the same underlying issue five ways
- [ ] D. Prune noisy alerts quarterly to fight fatigue

---

### Q43 [Hard] [Case Study] — SignalOps SLO Burn Page





**Context:** SignalOps checkout SLO is 99.9% per 30 days. A brief outage consumed 2% of the monthly error budget in one hour.

**Select all that apply.**

Which alerting philosophy fits?

- [ ] A. Fast burn — page when budget loss exceeds threshold in a short window
- [ ] B. Wake on-call for every isolated 500 regardless of budget
- [ ] C. Multi-window burn rate alerts — industry best practice
- [ ] D. Slow burn — ticket when budget drains faster than expected over hours

---

### Q44 [Hard] [Case Study] — SignalOps Checkout SLI





**Context:** SignalOps defines reliability by successful checkout within 30s, not process uptime.

**Select all that apply.**

Which SLI implementations are strong?

- [ ] A. checkout_completed / checkout_attempted with payment success within 30s
- [ ] B. Metrics labeled to match SLI definition; log failures with reason codes
- [ ] C. process_running == 1 as the only SLI
- [ ] D. Instrument the user journey, not just server up/down

---

### Q45 [Hard] — Error Budgets





**Select all that apply.**

How should teams use error budgets?

- [ ] A. High remaining budget — room for risky features; exhausted — freeze deploys and fix stability
- [ ] B. Budget = allowed unreliability derived from SLO (e.g., 0.1% for 99.9%)
- [ ] C. Error budget is only for finance — engineering ignores it for deploys
- [ ] D. Product and engineering share the budget as one team

---

### Q46 [Hard] — SLO Dashboards and SLA





**Select all that apply.**

What should SLO dashboards and internal vs external thresholds show?

- [ ] A. Rolling SLI, SLO target line, budget remaining, burn rate trend
- [ ] B. Alert at stricter internal SLO before customer SLA breach
- [ ] C. Internal SLO 99.95% with external SLA 99.9% — page on SLO not SLA
- [ ] D. Hide budget remaining so deploy decisions stay opaque

---

### Q47 [Hard] [Case Study] — SignalOps Deploy Freeze





**Context:** SignalOps error budget for checkout drops below 10% remaining mid-sprint. Product wants a major feature release Friday.

**Select all that apply.**

What should observability-driven policy suggest?

- [ ] A. Ignore budget — only SLA credits matter internally
- [ ] B. Dashboard burn rate answers "can we deploy today?"
- [ ] C. Ship anyway because metrics exist
- [ ] D. Notify stakeholders — deploy freeze or reduced risk until budget recovers

---

### Q48 [Hard] — Log Aggregation





**Select all that apply.**

Which log aggregation practices are correct?

- [ ] A. Apps write structured JSON to stdout; agents (Fluent Bit, Promtail) ship to central store
- [ ] B. Search by service, level, request_id, trace_id across the fleet
- [ ] C. Rely on log files inside containers without shipping — ephemeral pods lose data
- [ ] D. Tier retention: hot days for on-call, warm for review, cold for compliance if needed

---

### Q49 [Hard] [Case Study] — SignalOps Lost Pod Logs





**Context:** During an incident an engineer SSHs to a pod; it restarts before grep finishes. Logs were only on local disk.

**Select all that apply.**

What should SignalOps have done?

- [ ] A. Container stdout collection with labels: service, pod, environment
- [ ] B. Centralize logs — pod death should not erase evidence
- [ ] C. Keep DEBUG forever in hot tier for all services
- [ ] D. Control volume — drop noisy /health INFO, DEBUG off in prod

---

### Q50 [Hard] [Case Study] — SignalOps Mesh and East-West





**Context:** SignalOps runs a service mesh. Gateway metrics look fine but east-west payment→Stripe latency regressed.

**Select all that apply.**

Which observability layers apply in microservices?

- [ ] A. Gateway north-south access logs, RED, ID propagation
- [ ] B. Mesh sidecars export spans/metrics for east-west without replacing business logs
- [ ] C. Service graph from tracing shows dependency latency averages
- [ ] D. Mesh alone eliminates need for app correlation IDs and queue trace_id
