# Reliability & Fault Tolerance — Answer Key & Explanations (30)

Answer key for [day-09-questions.md](../day-09-questions.md)

---

### Q01 [Easy] [Case Study] — UptimeCorp Checkout Outage

**Answer:** A, B, D

**Explanation:** Cascading thread exhaustion and blast radius. Speed ≠ reliability (C).

---

### Q02 [Easy] — Reliability vs Performance vs Scalability

**Answer:** A, B, C

**Explanation:** Three distinct concerns. Scale does not imply fault tolerance (D).

---

### Q03 [Easy] [Case Study] — UptimeCorp SLA Math

**Answer:** A, B, D

**Explanation:** SLO stricter than SLA; nines math. SLI/SLO/SLA are distinct (C).

---

### Q04 [Easy] — RPO vs RTO

**Answer:** A, B, D

**Explanation:** RPO = data loss window; RTO = downtime window. Different metrics (C).

---

### Q05 [Easy] [Case Study] — UptimeCorp SPOF Audit

**Answer:** A, B, C

**Explanation:** Single DB/Redis are SPOF. Redundant stateless app instances reduce app-tier SPOF. Multi-AZ does not remove all SPOF such as regional disaster (D).

---

### Q06 [Easy] — Serial Dependency Availability

**Answer:** A, B, D

**Explanation:** Serial availability multiplies down. More dependencies matter (C false).

---

### Q07 [Medium] [Case Study] — UptimeCorp Multi-AZ Deploy

**Answer:** A, B, D

**Explanation:** Multi-AZ + deep checks + stateless sessions. Shallow checks insufficient (C).

---

### Q08 [Medium] — Active-Active vs Active-Passive

**Answer:** A, B, D

**Explanation:** Redundancy models and N+1. Passive promotion has delay (C).

---

### Q09 [Medium] [Case Study] — UptimeCorp Hung Payment Call

**Answer:** A, B, D

**Explanation:** Timeouts fail fast and prevent cascade. Infinite timeout unacceptable (C).

---

### Q10 [Medium] — Timeout Budget

**Answer:** A, B, C

**Explanation:** Budget inner calls to user SLA; client timeout should cover server processing time. One global timeout for all dependencies is poor practice (D).

---

### Q11 [Medium] [Case Study] — UptimeCorp Retry Storm

**Answer:** A, B, D

**Explanation:** Backoff+jitter, transient-only, layer coordination. Retry forever on 503 worsens outage (C).

---

### Q12 [Medium] — Idempotent Retries

**Answer:** A, B, D

**Explanation:** POST transfer needs idempotency key. Blind POST retry is unsafe (C).

---

### Q13 [Medium] [Case Study] — UptimeCorp Circuit Opens

**Answer:** A, B, D

**Explanation:** CB states and per-dependency isolation. Open ≠ fixed (C).

---

### Q14 [Medium] — Circuit Breaker vs Retries

**Answer:** A, C, D

**Explanation:** Complementary patterns. Not either/or (B).

---

### Q15 [Hard] [Case Study] — UptimeCorp Bulkhead Saves Browse

**Answer:** A, B, D

**Explanation:** Bulkhead vs breaker distinction. Different problems (C).

---

### Q16 [Hard] — Bulkhead Types

**Answer:** A, B, C

**Explanation:** Pools, connection separation, queue as bulkhead. Too-large bulkhead loses isolation (D).

---

### Q17 [Hard] [Case Study] — UptimeCorp Graceful Degradation

**Answer:** A, B, D

**Explanation:** Tiered features and fallbacks. Don't 500 whole page for optional block (C).

---

### Q18 [Hard] — Load Shedding Priority

**Answer:** A, B, D

**Explanation:** Priority shedding with Retry-After. Not equal treatment under overload (C).

---

### Q19 [Easy] [Case Study] — UptimeCorp Regional Failover Drill

**Answer:** A, B, D

**Explanation:** Drills and tested restores. Multi-region is costly, not universal default (C).

---

### Q20 [Easy] — Split-Brain Prevention

**Answer:** A, B, D

**Explanation:** Quorum/fencing; manual failover tradeoff. Split-brain is dangerous (C).

---

### Q21 [Medium] [Case Study] — UptimeCorp Error Budget Burn

**Answer:** A, B, C

**Explanation:** Burn-rate alerts and budget policy; exclude client 4xx from SLI typically. Single error paging is noisy (D).

---

### Q22 [Medium] — SLI Selection

**Answer:** A, C, D

**Explanation:** User-journey SLIs. Process-up ping insufficient alone (B).

---

### Q23 [Medium] [Case Study] — UptimeCorp Canary Deploy

**Answer:** A, B, D

**Explanation:** Canary + rollback + flags. Big-bang is high risk (C).

---

### Q24 [Medium] — Defense in Depth Stack

**Answer:** A, C, D

**Explanation:** Layered patterns together. One pattern insufficient (B).

---

### Q25 [Hard] [Case Study] — UptimeCorp Chaos Experiment

**Answer:** A, B, D

**Explanation:** Hypothesis-driven chaos with fixes. Not uncontrolled prod chaos day one (C).

---

### Q26 [Hard] — Partial vs Total Failure

**Answer:** A, B, D

**Explanation:** Slow partial failures cascade; need timeouts/breakers. Partial failures matter (C false).

---

### Q27 [Easy] — MTBF and MTTR

**Answer:** A, C, D

**Explanation:** MTTR reduction helps availability. MTBF alone insufficient with long MTTR (B).

---

### Q28 [Medium] [Case Study] — UptimeCorp Read-Only Mode

**Answer:** A, B, D

**Explanation:** Partial degradation during DB lag. Don't checkout on stale inventory (C).

---

### Q29 [Hard] — Designing for Failure Checklist

**Answer:** A, B, C

**Explanation:** Redundancy, idempotency, blameless postmortems. Many outages are self-inflicted deploys (D false).

---

### Q30 [Hard] [Case Study] — UptimeCorp Game Day

**Answer:** A, B, D

**Explanation:** Game days improve MTTR; complement metrics/SLOs (C false).

---
