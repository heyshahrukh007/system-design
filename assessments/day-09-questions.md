# Observability Deep Dive — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-09-answers.md](./answer-key/day-09-answers.md)




---

### Q01




**Context:** SignalOps checkout error rate jumps from 0.1% to 8%. Social media complaints spike. On-call is paged at 2 AM.

**Select all that apply.**

Which observability outcomes shorten this incident compared to flying blind?

- [ ] A. Metric alert pinpoints when the spike started (e.g., 10:42 UTC)
- [ ] B. Trace shows Payment Service p99 at 12s while baseline is ~200ms
- [ ] C. Delete traces and logs after each alert so responders start from a clean slate
- [ ] D. Restart every pod first because "something is wrong with orders"

---

### Q02




**Select all that apply.**

Which statements correctly describe observability?

- [ ] A. Ability to understand internal system state from external outputs (logs, metrics, traces)
- [ ] B. How engineers see across services, queues, and databases in distributed systems
- [ ] C. Keep telemetry only on each ephemeral pod because centralized search adds no value
- [ ] D. Same as uptime monitoring — binary healthy/unhealthy only

---

### Q03




**Context:** SignalOps checkout p99 latency doubled over three weeks. No alert fired. Support tickets rose before engineering noticed.

**Select all that apply.**

Which are costs of flying blind illustrated here?

- [ ] A. Longer MTTR when the incident finally surfaces
- [ ] B. Silent degradation — latency creeps before anyone pages
- [ ] C. Guaranteed elimination of all dependency timeouts
- [ ] D. Silent latency degradation improves retention because users rarely notice checkout speed

---

### Q04




**Select all that apply.**

How do observability and reliability relate?

- [ ] A. You need visibility into whether users saw fallback vs 500 when a breaker opens
- [ ] B. Observability replaces circuit breakers once metrics exist
- [ ] C. Once circuit breakers are configured, measuring their behavior is unnecessary
- [ ] D. Observability focuses on detect and diagnose; reliability on survive failures

---

### Q05




**Context:** SignalOps moved from one monolith server to gateway + order + payment + inventory + async notification workers.

**Select all that apply.**

When does observability become non-negotiable?

- [ ] A. Async queue paths where failure happens minutes after publish
- [ ] B. Single-server monolith with logs on local disk only forever
- [ ] C. User-facing SLOs make centralized telemetry optional because targets diagnose failures
- [ ] D. Requests cross service boundaries — trace and request IDs required

---

### Q06




**Select all that apply.**

Which practices match an observability-first design mindset?

- [ ] A. Instrument early — metrics before launch, not after the riskiest period
- [ ] B. Log messages should omit service and request context to minimize field count
- [ ] C. Defer all logging until post-launch to maximize dev velocity only
- [ ] D. Alert on user symptoms (checkout success) not raw CPU alone

---

### Q07




**Select all that apply.**

Which contrasts monitoring and observability accurately?

- [ ] A. Observability is limited to predefined yes/no health checks
- [ ] B. Monitoring asks "Is the system healthy?" with predefined dashboards and thresholds
- [ ] C. Monitoring handles known failure modes; observability helps novel first-time failures
- [ ] D. Observability replaces the need to ever page on-call

---

### Q08




**Context:** SignalOps pages on-call for elevated error rate, but engineers cannot filter logs by request or open a trace across services.

**Select all that apply.**

What production gap does this describe?

- [ ] A. Need both: monitor SLIs/symptoms and observe with logs and traces
- [ ] B. Metrics alone always show full stack traces for every error
- [ ] C. Observability without monitoring — rich data but nobody notified
- [ ] D. Monitoring without observability — alert fires, insufficient data to debug

---

### Q09




**Context:** After a deploy, SignalOps p99 latency doubled. Dashboards show the spike but not which dependency changed.

**Select all that apply.**

Which are "unknown unknown" style questions observability should answer?

- [ ] A. Do errors correlate with one database shard?
- [ ] B. Assume the most recently deployed dependency is responsible without comparing telemetry
- [ ] C. Do only Android clients fail while iOS succeeds?
- [ ] D. Is disk usage above 90% on one node?

---

### Q10




**Select all that apply.**

How do health checks differ from full observability?

- [ ] A. Observability covers elevated GC, slow queries, and degraded UX while "healthy"
- [ ] B. A successful `/health` response proves every user journey meets its latency SLO
- [ ] C. An instance can return 200 on health yet be slow on DB queries or in retry storms
- [ ] D. Health checks alone replace RED metrics and tracing

---

### Q11




**Context:** SignalOps error rate alert fires on order-service. On-call opens dashboards, logs, and a slow trace.

**Select all that apply.**

Which sequence uses the three pillars together?

- [ ] A. Dashboard slice by service label, then drill to logs and traces
- [ ] B. Metric alert on error rate, then logs filtered by trace_id, then trace showing time in payment
- [ ] C. Traces only — skip aggregate trends and alerting
- [ ] D. Logs only — skip metrics because they lack context

---

### Q12




**Select all that apply.**

What are logs best suited for?

- [ ] A. Cheap fleet-wide alerting on every request without aggregation
- [ ] B. Exact fleet-wide percentiles without aggregation or a metrics backend
- [ ] C. Per-event granularity at higher volume/cost than metrics
- [ ] D. Debugging a specific request when correlated with trace_id or request_id

---

### Q13




**Select all that apply.**

Which metric types and behaviors are correct?

- [ ] A. Gauge — a value that may only increase until the process restarts
- [ ] B. Counter — reset every minute by design for rate queries
- [ ] C. Histogram — latency distribution in buckets
- [ ] D. Counter — monotonic increase (e.g., http_requests_total)

---

### Q14




**Select all that apply.**

What do distributed traces provide?

- [ ] A. End-to-end path of one request across services with timing per span
- [ ] B. Guaranteed root-cause identification even when downstream services are not instrumented
- [ ] C. Complete unsampled detail for every request at 100K RPS with no cost tradeoff
- [ ] D. Dependency mapping for microservices debugging

---

### Q15




**Context:** SignalOps invested only in Prometheus counters. No centralized logs or tracing. Errors doubled but on-call cannot see individual failure context.

**Select all that apply.**

Which anti-patterns apply?

- [ ] A. Only logs — cannot alert efficiently at scale
- [ ] B. Only traces — miss aggregate trends and sampling gaps
- [ ] C. Using all three pillars with shared correlation IDs
- [ ] D. Metrics alone always preserve the complete payload and stack trace of every failed request

---

### Q16




**Context:** SignalOps standardizes on OpenTelemetry SDKs in services, a collector, and Grafana for dashboards and alerts.

**Select all that apply.**

Which collection pattern matches modern observability stacks?

- [ ] A. Tool names vary but the pillar patterns are universal
- [ ] B. Each engineer SSHs to pods to tail unstructured files during incidents
- [ ] C. Send all telemetry directly from every request to an engineer's laptop
- [ ] D. Metrics backend (e.g., Prometheus) plus trace backend (e.g., Jaeger/Tempo) plus log store

---

### Q17




**Select all that apply.**

Why prefer structured JSON logs over plain text?

- [ ] A. Stable field names enable queries like level=ERROR and service=order-service
- [ ] B. JSON guarantees low-cardinality fields even when arbitrary user IDs are logged
- [ ] C. Treat logs like APIs with intentional fields
- [ ] D. Plain text is always faster to search across terabytes

---

### Q18




**Context:** SignalOps logged every health check and retry at ERROR. Pager fires nightly; on-call ignores real checkout failures.

**Select all that apply.**

Which logging practices reduce fatigue?

- [ ] A. DEBUG verbose detail off in prod or sampled
- [ ] B. Log passwords and API secrets for faster debugging
- [ ] C. Use WARN for recoverable oddities; ERROR for failed operations needing attention
- [ ] D. Promote every successful health check to ERROR so dashboards stay active

---

### Q19




**Select all that apply.**

How should request and trace correlation work?

- [ ] A. Every log line includes request_id aligned with trace_id from tracing
- [ ] B. Gateway generates or forwards X-Request-Id and traceparent headers
- [ ] C. Each service generates a new request_id mid-chain for uniqueness
- [ ] D. Strip correlation headers at every service boundary to prevent cross-service searches

---

### Q20




**Select all that apply.**

What should appear in production logs?

- [ ] A. Request start/end, duration, error type, business IDs like order_id
- [ ] B. Include provider API keys in dependency errors so responders can replay calls
- [ ] C. Full credit card numbers and API keys for audit
- [ ] D. Avoid huge response bodies and unredacted PII unless policy allows

---

### Q21




**Context:** SignalOps exports HTTP metrics from order-service for dashboards and SLO alerts.

**Select all that apply.**

Which metrics belong to the RED method for request-driven services?

- [ ] A. Utilization — CPU percent only, ignoring request outcomes
- [ ] B. Rate — requests per second
- [ ] C. Errors — failed requests per second or error ratio
- [ ] D. Duration — record only the arithmetic mean so tail latency remains hidden

---

### Q22




**Context:** SignalOps queries Prometheus for payment-service after a latency incident.

**Select all that apply.**

Which query ideas match RED instrumentation?

- [ ] A. Count only successful responses and infer errors without recording status
- [ ] B. histogram_quantile(0.99, http_request_duration_seconds) for tail latency
- [ ] C. rate(http_requests_total[5m]) for traffic
- [ ] D. Label http_requests_total with unbounded user_id for per-user SLO

---

### Q23




**Select all that apply.**

Which examples fit USE metrics for infrastructure resources?

- [ ] A. Utilization — active DB connections / max_connections
- [ ] B. Rate — HTTP requests per second on an API route (RED, not USE)
- [ ] C. Saturation — queries waiting on locks or disk queue depth
- [ ] D. Errors — HTTP requests per second regardless of resource failures

---

### Q24




**Context:** SignalOps notification workers fall behind; checkout API stays green while emails delay hours.

**Select all that apply.**

Which metric choices fit the worker and queue?

- [ ] A. Histogram consumer_lag or processing duration
- [ ] B. Counter queue_depth_total that decrements whenever a message completes
- [ ] C. Counter that decreases when messages complete
- [ ] D. Counter messages_processed_total for throughput

---

### Q25




**Select all that apply.**

Which label practices are sound?

- [ ] A. Put unbounded IDs in metrics instead of logs/traces
- [ ] B. High cardinality explodes storage and query cost
- [ ] C. Slice by service, method, status — bounded cardinality
- [ ] D. Never use user_id as a metric label — millions of unique values

---

### Q26




**Context:** An engineer added checkout_duration_seconds{user_id="..."}. Prometheus memory spiked within a day.

**Select all that apply.**

What went wrong and how to fix?

- [ ] A. Add every order_id as a label for precise alerting
- [ ] B. Use logs/traces for per-user investigation, not metric labels
- [ ] C. Unbounded user_id label — high cardinality anti-pattern
- [ ] D. Prefer checkout_duration_seconds{status="success|failure"} instead

---

### Q27




**Select all that apply.**

How do Google's golden signals relate to RED/USE?

- [ ] A. Latency, traffic, errors, saturation — overlapping with RED for services and USE for resources
- [ ] B. RED covers rate, errors, duration for request-driven services
- [ ] C. Golden signals eliminate need for logs entirely
- [ ] D. USE covers utilization, saturation, errors on infrastructure

---

### Q28




**Select all that apply.**

Which distributed tracing terms are correct?

- [ ] A. Broken propagation stops the trace at the first hop with no downstream spans
- [ ] B. Trace ID shared across spans; span ID unique per span
- [ ] C. Trace — entire journey; spans — units of work with parent/child relationships
- [ ] D. One span ID reused for every service in the chain

---

### Q29




**Context:** SignalOps traces show gateway and order-service but payment-service and Stripe never appear.

**Select all that apply.**

Likely causes and fixes?

- [ ] A. Traces always include all hops without instrumentation
- [ ] B. Broken propagation — common bug when headers dropped
- [ ] C. Payment service not extracting/injecting traceparent on outbound calls
- [ ] D. Gateway not forwarding trace context to order-service

---

### Q30




**Context:** Checkout returns 201 quickly; notification worker logs errors 30 seconds later with no link to the API request.

**Select all that apply.**

How to maintain observability across async boundaries?

- [ ] A. Assume sync HTTP trace covers post-response worker work automatically
- [ ] B. Include trace_id (and correlation_id) in queue message metadata
- [ ] C. Propagate context from order.created publish through consume
- [ ] D. Search logs by trace_id across API publisher and consumer

---

### Q31




**Select all that apply.**

Which statements about OpenTelemetry and instrumentation are accurate?

- [ ] A. Industry-standard APIs/SDKs for traces, metrics, and logs
- [ ] B. OpenTelemetry replaces need for structured logging entirely
- [ ] C. App → OTel SDK → collector → backends like Jaeger or Tempo
- [ ] D. Auto-instrumentation for HTTP, gRPC, DB drivers; manual spans for business steps

---

### Q32




**Select all that apply.**

Which sampling strategies fit high-traffic production?

- [ ] A. Head sampling — decide at trace start (e.g., 1% of requests)
- [ ] B. Tail sampling — retain slow or errored traces
- [ ] C. 100% trace every request at 100K RPS with no cost concern
- [ ] D. Always sample failed checkout traces — never drop critical errors

---

### Q33




**Context:** SignalOps trace shows dozens of repeated inventory DB child spans under one checkout span.

**Select all that apply.**

What can traces reveal here?

- [ ] A. N+1 or fan-out call pattern visible as many repeated child spans
- [ ] B. Longest span highlights which dependency dominates time
- [ ] C. Retry storms appear as duplicate spans to the same dependency
- [ ] D. Traces cannot show parallel vs serial work on a timeline

---

### Q34




**Context:** SignalOps launches a new inventory-service into production behind the gateway.

**Select all that apply.**

Which minimum instrumentation should be in place?

- [ ] A. Metrics endpoint (Prometheus/OpenTelemetry) for scraping
- [ ] B. JSON logs to stdout with request_id; propagate trace headers in/out
- [ ] C. /health and /ready, RED metrics with low-cardinality labels
- [ ] D. Log and metric dependency failures; defer tracing until year two

---

### Q35




**Select all that apply.**

Where should auto vs manual instrumentation focus?

- [ ] A. Manual spans at critical business steps like validate_cart or charge_payment
- [ ] B. Auto replaces all business metrics like orders_per_minute
- [ ] C. Gateway: per-route rate, 4xx/5xx, latency histogram, 429 rate-limit metrics
- [ ] D. Auto for HTTP plumbing, DB drivers, framework middleware

---

### Q36




**Context:** SignalOps API gateway sees all north-south traffic. Mobile clients omit request IDs.

**Select all that apply.**

What should the gateway emit?

- [ ] A. Regenerate new trace IDs at each downstream hop for security
- [ ] B. Generate request_id if client did not send X-Request-Id
- [ ] C. Per-route RED metrics plus rate-limit rejection counts
- [ ] D. Access logs: method, path, status, duration, user_id, request_id

---

### Q37




**Select all that apply.**

Which belong on effective observability dashboards?

- [ ] A. Level 2 per-service RED and dependency error rates
- [ ] B. Fifty nearly identical charts and vanity metrics nobody acts on
- [ ] C. Deploy markers annotated to correlate spikes with releases
- [ ] D. Level 1 system health — availability, error rate, p99 latency

---

### Q38




**Context:** SignalOps on-call opens Grafana during a checkout incident.

**Select all that apply.**

Which panels help the drill-down hierarchy?

- [ ] A. Average latency as the only latency panel, because averages expose tail behavior
- [ ] B. Platform error rate and p99, then order-service RED
- [ ] C. Queue depth and replication lag when dependencies suspect
- [ ] D. Latency percentiles p50, p95, p99 per service

---

### Q39




**Select all that apply.**

Which alerts align with user impact?

- [ ] A. Checkout error rate > 1% for five minutes
- [ ] B. p99 latency > 2s sustained — symptom users feel
- [ ] C. CPU > 90% for ten minutes **and** latency elevated — cause plus symptom
- [ ] D. Any single 500 error pages immediately

---

### Q40




**Context:** SignalOps pages on-call whenever CPU > 50%. Checkout is fine; on-call disables alerts.

**Select all that apply.**

What makes this a bad alert?

- [ ] A. Not actionable — no required human fix when users unaffected
- [ ] B. Threshold too low without symptom correlation
- [ ] C. Contributes to alert fatigue — real P1s get ignored
- [ ] D. Perfect primary signal for checkout SLO burn

---

### Q41




**Select all that apply.**

Which practices match production alerting discipline?

- [ ] A. Page on every pod restart once with no restart loop threshold
- [ ] B. P1 pages immediately for checkout down or data loss
- [ ] C. Every P1/P2 alert links to a runbook with diagnostic steps
- [ ] D. P3 — ticket next day for non-urgent items like disk 80%

---

### Q42




**Select all that apply.**

How should teams route and maintain alerts?

- [ ] A. P1 → PagerDuty primary on-call; aggregate by service and symptom
- [ ] B. Avoid duplicate alerts firing the same underlying issue five ways
- [ ] C. Prune noisy alerts quarterly to fight fatigue
- [ ] D. Never tie alerts to runbooks — engineers should guess steps

---

### Q43




**Context:** SignalOps checkout SLO is 99.9% per 30 days. A brief outage consumed 2% of the monthly error budget in one hour.

**Select all that apply.**

Which alerting philosophy fits?

- [ ] A. Slow burn — ticket when budget drains faster than expected over hours
- [ ] B. Fast burn — page when budget loss exceeds threshold in a short window
- [ ] C. Multi-window burn rate alerts — industry best practice
- [ ] D. Wake on-call for every isolated 500 regardless of budget

---

### Q44




**Context:** SignalOps defines reliability by successful checkout within 30s, not process uptime.

**Select all that apply.**

Which SLI implementations are strong?

- [ ] A. Metrics labeled to match SLI definition; log failures with reason codes
- [ ] B. process_running == 1 as the only SLI
- [ ] C. Instrument the user journey, not just server up/down
- [ ] D. checkout_completed / checkout_attempted with payment success within 30s

---

### Q45




**Select all that apply.**

How should teams use error budgets?

- [ ] A. Error budget is only for finance — engineering ignores it for deploys
- [ ] B. Budget = allowed unreliability derived from SLO (e.g., 0.1% for 99.9%)
- [ ] C. High remaining budget — room for risky features; exhausted — freeze deploys and fix stability
- [ ] D. Product and engineering share the budget as one team

---

### Q46




**Select all that apply.**

What should SLO dashboards and internal vs external thresholds show?

- [ ] A. Rolling SLI, SLO target line, budget remaining, burn rate trend
- [ ] B. Hide budget remaining so deploy decisions stay opaque
- [ ] C. Internal SLO 99.95% with external SLA 99.9% — page on SLO not SLA
- [ ] D. Alert at stricter internal SLO before customer SLA breach

---

### Q47




**Context:** SignalOps error budget for checkout drops below 10% remaining mid-sprint. Product wants a major feature release Friday.

**Select all that apply.**

What should observability-driven policy suggest?

- [ ] A. Dashboard burn rate answers "can we deploy today?"
- [ ] B. Notify stakeholders — deploy freeze or reduced risk until budget recovers
- [ ] C. Ignore budget — only SLA credits matter internally
- [ ] D. Ship anyway because metrics exist

---

### Q48




**Select all that apply.**

Which log aggregation practices are correct?

- [ ] A. Rely on log files inside containers without shipping — ephemeral pods lose data
- [ ] B. Search by service, level, request_id, trace_id across the fleet
- [ ] C. Apps write structured JSON to stdout; agents (Fluent Bit, Promtail) ship to central store
- [ ] D. Tier retention: hot days for on-call, warm for review, cold for compliance if needed

---

### Q49




**Context:** During an incident an engineer SSHs to a pod; it restarts before grep finishes. Logs were only on local disk.

**Select all that apply.**

What should SignalOps have done?

- [ ] A. Keep DEBUG forever in hot tier for all services
- [ ] B. Control volume — drop noisy /health INFO, DEBUG off in prod
- [ ] C. Centralize logs — pod death should not erase evidence
- [ ] D. Container stdout collection with labels: service, pod, environment

---

### Q50




**Context:** SignalOps runs a service mesh. Gateway metrics look fine but east-west payment→Stripe latency regressed.

**Select all that apply.**

Which observability layers apply in microservices?

- [ ] A. Service graph from tracing shows dependency latency averages
- [ ] B. Mesh sidecars export spans/metrics for east-west without replacing business logs
- [ ] C. Gateway north-south access logs, RED, ID propagation
- [ ] D. Mesh alone eliminates need for app correlation IDs and queue trace_id
