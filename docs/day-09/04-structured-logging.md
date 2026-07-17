# Structured Logging

[← The Three Pillars](./03-three-pillars.md) | [Day 9 Index](./README.md) | [Next: Metrics — RED and USE →](./05-metrics-red-and-use.md)

## Plain Text vs Structured

```
Bad (plain text):
  2025-06-19 ERROR Payment failed for user 123 order 456 timeout

Good (structured JSON):
  {"level":"ERROR","service":"order","user_id":"123","order_id":"456","error":"timeout"}
```

Structured logs are **machine-parseable** — filter, aggregate, and alert in log platforms.

---

## Log Levels

| Level | Use |
|-------|-----|
| **DEBUG** | Verbose dev detail — off in prod usually |
| **INFO** | Normal business events — order created, job started |
| **WARN** | Recoverable oddity — retry succeeded, deprecated API used |
| **ERROR** | Operation failed — needs attention |
| **FATAL** | Process cannot continue — crash imminent |

Don't log everything as ERROR — alert fatigue follows.

---

## Correlation IDs

One ID per **user request** propagated across all services.

```
Mobile → Gateway (request_id: req-789)
       → Order Service (same req-789 in logs)
       → Payment Service (same req-789)
```

Also align with **trace_id** from distributed tracing ([06-distributed-tracing.md](./06-distributed-tracing.md)).

Gateway should generate or forward:

```http
X-Request-Id: req-789
traceparent: 00-abc123-def456-01
```

Every log line includes `request_id` and `trace_id`.

---

## What to Log

| Log | Don't log |
|-----|-----------|
| Request start/end, duration | Passwords, API secrets |
| Error type and message | Full credit card numbers |
| Business IDs (order_id, user_id) | PII unless policy allows |
| Downstream dependency failures | Huge response bodies |

From [Day 6 message design](../day-06/06-message-design.md): treat logs like APIs — intentional fields.

---

## Example Middleware

```python
def log_request(request, response, duration_ms):
    logger.info({
        "event": "http_request",
        "method": request.method,
        "path": request.path,
        "status": response.status_code,
        "duration_ms": duration_ms,
        "request_id": request.headers.get("X-Request-Id"),
        "user_id": request.user_id,
    })
```

---

## Sampling High-Volume Logs

Debug logs on every health check flood storage. Options:

- INFO+ only in production
- Sample DEBUG (1 in 100)
- Dynamic log level per service during incidents

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| No request ID | Generate at gateway, propagate |
| Logging in hot loops | Aggregate or sample |
| Secrets in logs | Redact at source |
| Unstructured strings | JSON with stable field names |
| Logs only on local disk | Ship to central aggregation ([10-log-aggregation.md](./10-log-aggregation.md)) |

---

## Summary

Use **structured JSON logs** with **correlation IDs** on every service. Log outcomes and errors with business context — never secrets. Centralize logs for search across the fleet.

---

[Next: Metrics — RED and USE →](./05-metrics-red-and-use.md)
