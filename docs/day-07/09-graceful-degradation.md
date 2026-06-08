# Graceful Degradation

[← Bulkhead Pattern](./08-bulkhead-pattern.md) | [Day 7 Index](./README.md) | [Next: Failover and DR →](./10-failover-and-disaster-recovery.md)

## What Is Graceful Degradation?

When parts of the system fail, **reduce functionality** instead of failing completely.

```
Full experience:     product page + recommendations + reviews + live stock
Degraded experience: product page + cached stock (no recommendations, no reviews)

User can still buy. Non-critical features disabled.
```

Better partial service than total outage.

---

## Core vs Optional Features

Classify every feature:

| Tier | Definition | On failure |
|------|------------|------------|
| **Core** | Business cannot function without it | Must fix or failover |
| **Enhanced** | Important but not blocking | Degrade with fallback |
| **Optional** | Nice to have | Disable silently |

```
E-commerce:
  Core:      browse catalog, add to cart, checkout
  Enhanced:  product recommendations, search autocomplete
  Optional:  "customers also bought", live viewer count
```

---

## Degradation Strategies

| Strategy | Example |
|----------|---------|
| **Cached fallback** | Show stale recommendations from cache |
| **Static fallback** | Show "popular items" instead of personalized |
| **Default value** | Empty list instead of error page |
| **Feature flag off** | Disable reviews section via config |
| **Async later** | "Email receipt delayed" — queue send |
| **Read-only mode** | Browse works, checkout disabled during DB migration |

---

## Example: Recommendation Service Down

```
Normal path:
  GET /product/123 → Product Service + Recommendation Service

Degraded path:
  Recommendation circuit OPEN
  → return product without "You may also like"
  → log metric: recommendations_degraded
  → user sees product page (core path OK)
```

Don't return 500 for entire page because optional service failed.

---

## Example: Payment Down

Payment is **core** for checkout — can't fully degrade.

```
Options:
  1. Save cart, show "checkout temporarily unavailable"
  2. Queue order as PENDING, process payment when restored
  3. Offer alternative payment provider (fallback)

Don't: charge incorrectly or lose order data
```

Degradation rules differ by feature criticality.

---

## Graceful Degradation vs Circuit Breaker

| Circuit Breaker | Graceful Degradation |
|-----------------|----------------------|
| Mechanism — stop calling failing service | Policy — what to show when call skipped |
| Technical | Product/UX decision |

Breaker opens → degradation strategy executes.

---

## Load Shedding

Under extreme overload, **drop** low-priority traffic to protect core.

```
Priority:
  1. Paying checkout requests
  2. Logged-in users
  3. Anonymous browse
  4. Analytics beacons (drop first)

Return 503 for shed requests with Retry-After header
```

---

## Read-Only Degradation

Common during incidents or maintenance.

```
Database primary failing over to replica (lag 30 s):
  → enable read-only mode
  → browse and search work
  → checkout disabled until replication catches up
```

Communicate clearly to users: "Purchases temporarily disabled."

---

## Designing for Degradation

```
For each dependency:
  1. Is it core or optional?
  2. What fallback exists? (cache, static, empty)
  3. What does user see? (not a stack trace)
  4. How do we monitor degraded mode?
```

Test degradations in staging — flip circuit manually, verify UX.

---

## Summary

Graceful degradation keeps **core paths working** when optional dependencies fail. Classify features by tier, define fallbacks (cache, static, disable), and shed load under extreme pressure. Pair with circuit breakers — breaker detects failure, degradation defines response.

---

[Next: Failover and Disaster Recovery →](./10-failover-and-disaster-recovery.md)
