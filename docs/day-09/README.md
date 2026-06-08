# Day 9 — Observability (Deep Dive)

You built a distributed system — gateway, services, queues, databases. When checkout slows at 2 AM, observability answers: *what broke, where, and why?*

See also: [Day 2: Observability Design](../day-02/11-observability-design.md) for a shorter overview.

## Topics

| # | Topic | File |
|---|-------|------|
| 1 | [Why Observability?](./01-why-observability.md) | Cost of flying blind, ops mindset |
| 2 | [Monitoring vs Observability](./02-monitoring-vs-observability.md) | Known vs unknown unknowns |
| 3 | [The Three Pillars](./03-three-pillars.md) | Logs, metrics, traces |
| 4 | [Structured Logging](./04-structured-logging.md) | JSON logs, correlation IDs |
| 5 | [Metrics — RED and USE](./05-metrics-red-and-use.md) | Counters, gauges, histograms |
| 6 | [Distributed Tracing](./06-distributed-tracing.md) | Spans, trace context, latency |
| 7 | [Instrumentation](./07-instrumentation.md) | What to instrument, where |
| 8 | [Dashboards and Alerting](./08-dashboards-and-alerting.md) | Symptoms, severity, runbooks |
| 9 | [SLO Alerting and Error Budgets](./09-slo-alerting-and-error-budgets.md) | Burn rate, paging policy |
| 10 | [Log Aggregation](./10-log-aggregation.md) | Central logs, retention, search |
| 11 | [Observability in Microservices](./11-observability-in-microservices.md) | Propagation, gateway, mesh |

## Reading Order

Read 1 → 11 in sequence. Topics 1–3 set context; 4–7 cover instrumentation; 8–11 cover operations.

## Key Takeaways

- **Observability** explains system behavior from external outputs — logs, metrics, traces.
- **Monitoring** catches known failures; **observability** debugs novel problems.
- Use **correlation IDs** and **distributed tracing** across gateway and services.
- Alert on **user-facing symptoms** and **SLO burn rate** — not raw CPU alone.
- Instrument from day one — retrofitting visibility after launch is painful.

## Related

- [Day 2: Observability Design](../day-02/11-observability-design.md)
- [Day 7: SLI, SLO, and SLA](../day-07/11-sli-slo-and-sla.md)
- [Day 8: API Gateway](../day-08/README.md)
- [Day 6: Message correlation](../day-06/06-message-design.md)
- [Day 10: Classic System Design Problems](../day-10/README.md)
