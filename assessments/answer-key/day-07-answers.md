# Caching Deep Dive — Answer Key & Explanations (30)

Answer key for [day-07-questions.md](../day-07-questions.md)

---

### Q01 [Easy] [Case Study] — RetailHub Product Page Load

**Answer:** A, B, D

**Explanation:** Read-heavy catalog benefits from Redis speed and hit-rate math. Cache is not source of truth (C).

---

### Q02 [Easy] — Cache vs Database

**Answer:** A, B, D

**Explanation:** Cache is ephemeral and refillable. ACID durability belongs to DB (C).

---

### Q03 [Easy] [Case Study] — RetailHub Static Assets

**Answer:** A, B, C

**Explanation:** Multi-layer caching from browser/CDN to origin. LBs do not replace edge/browser cache (D).

---

### Q04 [Easy] — What Not to Cache

**Answer:** A, B, D

**Explanation:** Authoritative money movement and OTP need DB truth. Catalog with TTL+invalidation is cacheable (C).

---

### Q05 [Easy] [Case Study] — RetailHub Session Store

**Answer:** A, B, D

**Explanation:** Shared Redis or JWT for stateless fleet. Per-pod memory breaks behind LB (C).

---

### Q06 [Easy] — Cache Key Design

**Answer:** A, B, C

**Explanation:** Namespaced shared keys maximize reuse. Unique per-request keys never hit (D).

---

### Q07 [Medium] [Case Study] — RetailHub Cache-Aside Read Path

**Answer:** A, B, C

**Explanation:** App-managed lazy load and explicit invalidation; graceful Redis bypass. Auto-sync on write is read-through/write-through, not cache-aside (D).

---

### Q08 [Medium] — Cache-Aside Write Path

**Answer:** A, D

**Explanation:** DB first, then delete cache. Delete-before-commit races with stale refill (B). TTL-only for prices is risky (C).

---

### Q09 [Medium] [Case Study] — RetailHub Profile Settings

**Answer:** A, B, D

**Explanation:** Write-through fits immediate post-write reads on low-write paths. Cold-key write-through wastes RAM (C).

---

### Q10 [Medium] — Write-Back Cache Risks

**Answer:** A, B, D

**Explanation:** Write-back is fast and eventual — not for payments/inventory without durable queue (C).

---

### Q11 [Medium] [Case Study] — RetailHub Admin Price Update

**Answer:** A, B, D

**Explanation:** Multi-layer invalidation required. Delete-before-commit can repopulate stale data (C).

---

### Q12 [Medium] — TTL Best Practices

**Answer:** A, B, D

**Explanation:** Jitter prevents synchronized expiry; long TTL + invalidation for stable data. Uniform TTL on all keys causes stampedes (C).

---

### Q13 [Medium] [Case Study] — RetailHub Black Friday Stampede

**Answer:** A, B, D

**Explanation:** Hot-key expiry stampede — not penetration (C). Lock, jitter, refresh-ahead help.

---

### Q14 [Medium] — Cache Penetration

**Answer:** A, B, D

**Explanation:** Null caching, Bloom filters, validation, rate limits. Jitter does not stop invalid-key scans (C).

---

### Q15 [Hard] [Case Study] — RetailHub Redis Restart

**Answer:** A, B, C

**Explanation:** Empty cache avalanche — warm-up, HA, circuit breaker. Restart absolutely spikes DB load (D).

---

### Q16 [Hard] — Distributed Cache Architecture

**Answer:** A, B, D

**Explanation:** Cluster scales; noeviction errors when full. L1 is not auto-shared across pods (C).

---

### Q17 [Hard] [Case Study] — RetailHub Hot Celebrity Product

**Answer:** A, B, C

**Explanation:** Local cache, CDN, key splitting address hot keys. Sharding alone does not split one logical key (D).

---

### Q18 [Hard] — Read-Through vs Cache-Aside

**Answer:** A, B, D

**Explanation:** Read-through delegates miss load to cache layer; app still writes DB on updates (C).

---

### Q19 [Easy] — Multi-Layer Cache Stack

**Answer:** A, B, C

**Explanation:** Browser, CDN, Redis layers stack. MySQL query cache removed in 8.0 (D).

---

### Q20 [Easy] [Case Study] — RetailHub Rate Limit Counter

**Answer:** A, B, D

**Explanation:** Ephemeral Redis counters shared fleet-wide. Not financial ledger (C).

---

### Q21 [Medium] — Write-Through vs Cache-Aside Writes

**Answer:** A, B, C

**Explanation:** Cache-aside deletes; write-through sets both. Cache-aside is default, not write-through (D).

---

### Q22 [Medium] [Case Study] — RetailHub Display Balance

**Answer:** A, B, D

**Explanation:** Display TTL OK if transfers read locked DB balance. Never cache authoritative transfer balance (C).

---

### Q23 [Medium] — HTTP Cache Headers

**Answer:** A, B, C, D

**Explanation:** All four are valid Cache-Control semantics for different cache layers and sensitivity.

---

### Q24 [Medium] [Case Study] — RetailHub Deploy Cold Start

**Answer:** A, C

**Explanation:** Preload before traffic — warming. Refresh-ahead is ongoing TTL-based (B). Warming does not replace invalidation (D).

---

### Q25 [Hard] — Refresh-Ahead Pattern

**Answer:** A, B

**Explanation:** Proactive refresh before expiry vs one-time warm-up. Some staleness possible during refresh (D). They differ (C).

---

### Q26 [Hard] — Consistency Spectrum

**Answer:** A, B, D

**Explanation:** Write-through strongest; cache-aside default; write-back weakest/fastest. TTL-only without invalidation is weak, not strongest (C).

---

### Q27 [Easy] — Monitoring Cache Health

**Answer:** A, B, C, D

**Explanation:** All are valid operational signals for cache misconfiguration or failure.

---

### Q28 [Medium] [Case Study] — RetailHub Big Product JSON

**Answer:** A, B, D

**Explanation:** Split/compress/reference — big keys hurt Redis single thread. Larger keys are not free wins (C).

---

### Q29 [Hard] [Case Study] — RetailHub Invalidation Race

**Answer:** A, B, D

**Explanation:** Delete after commit; read primary or version on miss. Delete-before-commit worsens races (C).

---

### Q30 [Hard] — Circuit Breaker During Cache Outage

**Answer:** A, B, D

**Explanation:** Breaker protects DB; stale CDN/L1 may help briefly. Unlimited retries amplify outage (C).

---
