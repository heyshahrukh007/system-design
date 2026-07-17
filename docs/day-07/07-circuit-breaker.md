# Circuit Breaker

[← Retries and Backoff](./06-retries-and-backoff.md) | [Day 7 Index](./README.md) | [Next: Bulkhead Pattern →](./08-bulkhead-pattern.md)

## The Problem

A failing dependency + unlimited retries = **cascading failure**.

```
Payment Service down
  → Order Service retries 100× per request
  → Order Service threads and CPU saturated
  → Order Service fails
  → Entire checkout broken (worse than payment alone)
```

**Circuit breaker** stops calling a failing service — fail fast, protect the caller.

---

## How It Works

Named after electrical circuit breakers — stop current when overload detected.

```
States:

  CLOSED (normal)
    Requests flow through
    Count failures

  OPEN (tripped)
    Requests fail immediately (no call to dependency)
    After cooldown → HALF-OPEN

  HALF-OPEN (testing)
    Allow one (or few) test requests
    Success → CLOSED
    Failure → OPEN again
```

```
        failures > threshold
CLOSED ──────────────────────▶ OPEN
  ▲                              │
  │ success                      │ timeout expires
  │                              ▼
  └──────────── HALF-OPEN ◀──────┘
```

---

## Example Flow

```
Payment circuit: CLOSED

Request 1–5: Payment timeout → failure count = 5
Threshold = 5 → circuit OPEN

Request 6–100: fail immediately ("payment temporarily unavailable")
  → no threads blocked on Payment Service
  → Order Service stays responsive for browse/cart

30 s later: HALF-OPEN
  Test request → Payment succeeds → CLOSED
```

---

## Configuration

| Parameter | Meaning | Example |
|-----------|---------|---------|
| **Failure threshold** | Failures before open | 5 in 10 s window |
| **Success threshold** | Successes to close from half-open | 3 |
| **Open duration** | How long stay open | 30 s |
| **Timeout** | Per-request timeout | 2 s |
| **Monitored calls** | What counts as failure | 5xx, timeout |

Tune per dependency criticality.

---

## What to Return When Open

| Strategy | User experience |
|----------|-----------------|
| **Error message** | "Payment unavailable, try later" |
| **Cached response** | Last known good data |
| **Default value** | Empty recommendations list |
| **Queue for later** | Order saved, payment retried async |
| **Fallback service** | Secondary payment provider |

Match to business rules — don't silently lose money.

---

## Circuit Breaker per Dependency

```
Order Service:
  circuit_breaker(payment_service)
  circuit_breaker(inventory_service)
  circuit_breaker(recommendation_service)

Payment OPEN    → checkout blocked (critical)
Recommendations OPEN → show popular items (non-critical)
```

Isolate circuits — one open circuit shouldn't trip unrelated ones.

---

## Libraries and Tools

| Tool | Ecosystem |
|------|-----------|
| **Resilience4j** | Java |
| **Polly** | .NET |
| **pybreaker** | Python |
| **Istio / Envoy** | Service mesh (outlier detection) |
| **Hystrix** | Java (maintenance mode — patterns still valid) |

Service mesh can implement circuit breaking at network layer without app code changes.

---

## Circuit Breaker vs Retry

```
Retry:     "Maybe it'll work on attempt 3"
Breaker:   "It's been failing — stop calling for 30 s"

Together:
  2–3 retries with backoff
  Then count toward breaker threshold
  Breaker opens → fail fast until recovery
```

---

## Monitoring

Alert when circuits open — indicates dependency pain.

```
Metrics:
  circuit_state (closed/open/half-open)
  circuit_failure_rate
  circuit_rejected_calls (fast fails while open)
```

Open circuit is a **symptom** — fix dependency or improve fallback.

---

## Summary

Circuit breaker **stops calling failing dependencies** after a threshold — CLOSED, OPEN, HALF-OPEN states. Prevents retry storms and cascading failure. Return meaningful fallbacks when open. One breaker per dependency, combined with timeouts and limited retries.

---

[Next: Bulkhead Pattern →](./08-bulkhead-pattern.md)
