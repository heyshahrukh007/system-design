# Timeouts

[← Redundancy and HA](./04-redundancy-and-high-availability.md) | [Day 7 Index](./README.md) | [Next: Retries and Backoff →](./06-retries-and-backoff.md)

## Why Timeouts Matter

Without a timeout, a caller waits **forever** for a response that may never come.

```
Order Service calls Payment API
Payment API hung (deadlock, network black hole)
Order Service thread blocked indefinitely
Thread pool exhausted → all orders fail
```

A **timeout** caps wait time — fail fast, free resources, try fallback or return error.

---

## Where to Set Timeouts

Every network call needs a timeout:

| Call | Typical Timeout |
|------|-----------------|
| Internal service (same DC) | 1–3 s |
| Database query | 500 ms – 2 s |
| Cache (Redis) | 100–500 ms |
| External API (payment) | 5–30 s |
| User-facing HTTP request | 30–60 s total |

### Timeout Budget

Total user request time is shared across all downstream calls.

```
User request budget: 3 s total

API Gateway:     100 ms
Order Service:   2.5 s budget
  ├─ DB:         500 ms
  ├─ Payment:    1.5 s
  └─ Inventory:  500 ms
```

Inner timeouts must be **shorter** than outer — parent still has time to handle failure.

---

## Connection vs Read Timeout

| Type | Meaning |
|------|---------|
| **Connect timeout** | Max time to establish TCP connection |
| **Read timeout** | Max time waiting for response after connected |
| **Write timeout** | Max time to send request body |
| **Idle timeout** | Max time connection sits unused in pool |

```
Connect timeout: 2 s   (server dead / wrong host)
Read timeout:    5 s   (server accepted but slow/hung)
```

---

## Timeout Failure Behavior

When timeout fires:

```
1. Cancel in-flight request (if possible)
2. Return error to caller
3. Log with correlation ID
4. Caller decides: retry, fallback, or fail user request
```

Don't timeout silently — propagate meaningful error upstream.

---

## Timeouts and Cascading Failures

```
Without timeouts:
  Slow Payment (30 s) × 100 concurrent = 100 threads blocked 30 s

With 2 s timeout:
  Payment fails at 2 s → thread freed → circuit may open → fast fail
```

Timeouts are the **first line of defense** against cascading failure.

---

## Timeouts vs Retries

```
Timeout alone:  fail after 2 s
Timeout + retry: fail, wait, try again (up to N times)

Total user wait = timeout × attempts + backoff
Keep within user-facing SLA
```

See [06-retries-and-backoff.md](./06-retries-and-backoff.md).

---

## Client vs Server Timeout

| Side | Setting |
|------|---------|
| **Client** | How long client waits for server |
| **Server** | How long server processes request (gateway, app) |

```
Client timeout (5 s) should be ≥ server processing limit (4 s)
If client timeout < server timeout → client gives up while server still working
```

Align timeouts across layers.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| No timeout (default infinite) | Set explicit timeouts everywhere |
| Same timeout for all dependencies | Tune per dependency latency |
| Timeout longer than LB idle timeout | LB cuts connection first — confusing errors |
| Timeout without fallback | Return degraded response or queue for retry |
| Ignoring timeout in connection pool | Pool threads still blocked |

---

## Summary

Set **timeouts on every external call** — connect and read separately. Budget timeouts from the user-facing SLA inward. Timeouts prevent hung threads, stop cascading failures, and enable retries or circuit breakers to act.

---

[Next: Retries and Backoff →](./06-retries-and-backoff.md)
