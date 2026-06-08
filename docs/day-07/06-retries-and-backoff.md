# Retries and Backoff

[← Timeouts](./05-timeouts.md) | [Day 7 Index](./README.md) | [Next: Circuit Breaker →](./07-circuit-breaker.md)

## When to Retry

Many failures are **transient** — they succeed if tried again.

| Transient (retry) | Permanent (don't retry) |
|-------------------|-------------------------|
| 503 Service Unavailable | 400 Bad Request |
| Connection timeout | 401 Unauthorized |
| Connection reset | 404 Not Found |
| 429 Too Many Requests (with backoff) | Invalid payload |
| Database deadlock | Business rule violation |

Retry only when another attempt might succeed.

---

## Basic Retry Loop

```
attempt = 0
while attempt < MAX_RETRIES:
    try:
        result = call_service()
        return result
    except TransientError:
        attempt += 1
        sleep(backoff(attempt))
raise MaxRetriesExceeded
```

---

## Exponential Backoff

Wait longer between each attempt — reduces load on struggling service.

```
delay = base × 2^attempt

attempt 0: 100 ms
attempt 1: 200 ms
attempt 2: 400 ms
attempt 3: 800 ms
attempt 4: 1600 ms (cap at max_delay)
```

```python
def backoff(attempt, base=0.1, max_delay=30):
    delay = min(base * (2 ** attempt), max_delay)
    jitter = random.uniform(0, delay * 0.1)
    return delay + jitter
```

---

## Jitter

Without jitter, all clients retry at the same moment — **retry storm**.

```
1000 clients fail at 10:00:00
All retry at 10:00:01 → dependency overwhelmed again

With jitter:
  Retries spread over 10:00:01 – 10:00:03
  Dependency recovers
```

**Full jitter:** `sleep(random(0, delay))`  
**Equal jitter:** `sleep(delay/2 + random(0, delay/2))`

---

## Idempotent Retries

Retries can execute the same operation twice.

```
POST /transfer $100 without idempotency → retry = double charge
POST /transfer with Idempotency-Key: abc → retry = same result
```

Always retry **idempotent** operations safely. See [Day 6: Idempotency](../day-06/10-retry-dlq-and-idempotency.md).

---

## Retry Limits

| Setting | Typical |
|---------|---------|
| Max attempts | 3–5 |
| Max total time | Within user SLA or async |
| Retry only idempotent methods | GET, PUT with idempotency key |

```
Sync user request:  2–3 retries max, tight timeout
Async queue worker: 5–10 retries with long backoff → DLQ
```

---

## Retries vs Circuit Breaker

| Retries | Circuit Breaker |
|---------|-----------------|
| Keep trying same dependency | Stop calling failing dependency |
| Good for brief blips | Good for sustained outages |
| Can worsen overload | Protects downstream |

Use **both**: limited retries, then circuit opens. See [07-circuit-breaker.md](./07-circuit-breaker.md).

---

## Retry at Different Layers

| Layer | Example |
|-------|---------|
| HTTP client | Retry 503 with backoff |
| Load balancer | Retry another healthy server |
| Database driver | Reconnect on connection drop |
| Message queue | Redeliver on visibility timeout |
| DNS resolver | Try next nameserver |

Coordinate — don't multiply retries at every layer (3×3×3 = 27 attempts).

---

## Retry Budget (Advanced)

Limit total retries across system to prevent overload.

```
Google SRE: retry budget as fraction of request volume
If retries exceed budget → fail fast, don't amplify load
```

---

## Summary

Retry **transient** failures with **exponential backoff and jitter**. Cap attempts and total time. Ensure **idempotency** before retrying writes. Combine with circuit breakers — retries help blips, breakers stop sustained cascades.

---

[Next: Circuit Breaker →](./07-circuit-breaker.md)
