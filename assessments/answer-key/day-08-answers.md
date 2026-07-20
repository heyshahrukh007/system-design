# API Gateway & Service Discovery — Answer Key & Explanations (50)

Answer key for [day-08-questions.md](../day-08-questions.md)


---

### Q01 [Easy] [Case Study] — CloudMart Deploy Bottleneck

**Answer:** A, B, C

**Explanation:** Deploy pain and scale mismatch are split signals. Early MVP small team should often stay modular monolith (D).

---

### Q02 [Easy] — Monolith Advantages

**Answer:** A, B, C

**Explanation:** Monoliths excel at simplicity and cross-module transactions. Per-service deploy is microservices (D).

---

### Q03 [Easy] [Case Study] — CloudMart MVP Team Size

**Answer:** B, C, D

**Explanation:** Early stage favors monolith/modular monolith. Separate repos day one is premature (A).

---

### Q04 [Easy] — Microservices Trade-offs

**Answer:** B, C, D

**Explanation:** Microservices need gateway, discovery, observability — not eliminate them (A).

---

### Q05 [Easy] [Case Study] — CloudMart Strangler Fig

**Answer:** A, C, D

**Explanation:** Strangler fig migrates slice-by-slice behind a facade/gateway. Big-bang rewrite is the anti-pattern (B).

---

### Q06 [Easy] [Case Study] — CloudMart Internal RPC Choice

**Answer:** A, C, D

**Explanation:** Typical stack: REST public, gRPC internal, queues async. GraphQL everywhere internal is overkill (B).

---

### Q07 [Easy] — Sync vs Async Between Services

**Answer:** A, B, D

**Explanation:** User-visible payment decision needs sync path. Async for reactions (C wrong for async-only).

---

### Q08 [Easy] [Case Study] — CloudMart Mobile Data Needs

**Answer:** A, B, D

**Explanation:** GraphQL/BFF at edge for clients. N+1 still needs server design (C).

---

### Q09 [Medium] [Case Study] — CloudMart Internal Service Trust

**Answer:** A, B, C

**Explanation:** Authenticate every hop. VPC is not sufficient (D).

---

### Q10 [Medium] — gRPC Production Considerations

**Answer:** A, B, D

**Explanation:** gRPC is not browser-native (C). Needs HTTP/2-aware LB and Day 7 reliability patterns.

---

### Q11 [Easy] [Case Study] — CloudMart Client URL Sprawl

**Answer:** A, C, D

**Explanation:** Gateway is single front door. Direct port exposure worsens client sprawl (B).

---

### Q12 [Easy] — API Gateway vs Load Balancer

**Answer:** A, B, D

**Explanation:** Auth/rate limits are gateway strengths, not typical LB (C reversed).

---

### Q13 [Easy] — Gateway Cross-Cutting Concerns

**Answer:** B, C, D

**Explanation:** Fine-grained resource auth stays in services (A). Gateway does coarse edge auth.

---

### Q14 [Medium] [Case Study] — CloudMart Mobile vs Web APIs

**Answer:** B, C, D

**Explanation:** Gateway still front door; BFF tailors per UI. BFF alone without gateway loses central edge policy (A).

---

### Q15 [Medium] [Case Study] — CloudMart Gateway Routing Table

**Answer:** A, C, D

**Explanation:** Gateway routes and versions — not business logic or DB (B).

---

### Q16 [Medium] — TLS at the Gateway

**Answer:** A, C, D

**Explanation:** Internal HTTP on private VPC is common; mTLS optional upgrade (C overstates).

---

### Q17 [Medium] — Gateway Offloading and Transforms

**Answer:** B, C, D

**Explanation:** Offload cross-cutting edge work; transform headers/protocols. No session state in gateway (A).

---

### Q18 [Medium] [Case Study] — CloudMart Dashboard Aggregation

**Answer:** A, B, C

**Explanation:** Aggregation at gateway/BFF is standard. Forcing three public calls defeats gateway purpose (D).

---

### Q19 [Medium] — TCP vs UDP for Service APIs

**Answer:** A, B, D

**Explanation:** Default APIs use TCP. UDP only for loss-tolerant low-latency cases — not payment RPCs (C).

---

### Q20 [Medium] [Case Study] — CloudMart Path Routing Incident

**Answer:** A, B, D

**Explanation:** Deliberate path→service mapping required. Random routing is wrong (C).

---

### Q21 [Medium] — Header-Based Routing

**Answer:** B, C, D

**Explanation:** Header routing for canary/tenant/version — not auth replacement (A).

---

### Q22 [Medium] [Case Study] — CloudMart Canary Release

**Answer:** A, B, C

**Explanation:** Canary/blue-green hide version routing from clients (C false).

---

### Q23 [Hard] — gRPC Load Balancing

**Answer:** A, B, D

**Explanation:** gRPC uses HTTP/2 on TCP (C wrong). Connection pinning causes hot spots.

---

### Q24 [Medium] [Case Study] — CloudMart Anti-Corruption Layer

**Answer:** A, C, D

**Explanation:** ACL translates legacy models at the boundary. Do not leak mainframe schemas everywhere (B).

---

### Q25 [Medium] [Case Study] — CloudMart JWT at Edge

**Answer:** A, B, C

**Explanation:** Never trust client identity headers or IP alone (D).

---

### Q26 [Medium] — API Keys for Partners

**Answer:** A, C, D

**Explanation:** Secrets belong in Vault/Secrets Manager (B).

---

### Q27 [Medium] [Case Study] — CloudMart Admin Route Exposure

**Answer:** A, B, D

**Explanation:** Resource ownership checks belong in services (C wrong at gateway only).

---

### Q28 [Hard] — Federated Identity and Tokens

**Answer:** A, C, D

**Explanation:** Federated IdP + short-lived tokens; allowlist public routes. Long-lived access JWTs are risky (B).

---

### Q29 [Medium] — mTLS Gateway to Service

**Answer:** B, C, D

**Explanation:** mTLS is service identity; user auth still at gateway (A).

---

### Q30 [Medium] [Case Study] — CloudMart Scraping Attack

**Answer:** A, B, D

**Explanation:** Edge rate limit protects whole platform. Backend-only limit is too late (C).

---

### Q31 [Easy] [Case Study] — CloudMart Login Brute Force

**Answer:** A, C, D

**Explanation:** Fixed window allows 2× burst at boundary (C false).

---

### Q32 [Medium] — Throttling at the Gateway

**Answer:** A, B, D

**Explanation:** Throttling = rate + concurrency + quota. Never silently drop with fake 200 (C).

---

### Q33 [Hard] — Distributed Rate Limiting

**Answer:** A, B, C

**Explanation:** Without shared store, limits multiply by replica count (B describes the bug).

---

### Q34 [Easy] [Case Study] — CloudMart Hardcoded Upstream IPs

**Answer:** A, B, D

**Explanation:** Containers change IPs — discovery required (C is fragile fiction).

---

### Q35 [Easy] — Service Registry Concepts

**Answer:** A, B, D

**Explanation:** Autoscaled environments need dynamic registry (D wrong).

---

### Q36 [Medium] [Case Study] — CloudMart Kubernetes Service DNS

**Answer:** A, C, D

**Explanation:** K8s endpoints update on pod changes — not stale forever (B).

---

### Q37 [Medium] — DNS-Based Discovery Trade-offs

**Answer:** A, B, D

**Explanation:** DNS has TTL/propagation trade-offs (D false).

---

### Q38 [Medium] — Health-Aware Registry

**Answer:** A, B, C

**Explanation:** Routing to dead instances causes errors (C wrong).

---

### Q39 [Medium] [Case Study] — CloudMart Polyglot Services

**Answer:** B, C, D

**Explanation:** Server-side K8s DNS suits polyglot clients. Client-side adds per-language coupling (C overstates hop elimination).

---

### Q40 [Medium] — Client-Side Discovery

**Answer:** B, C, D

**Explanation:** Client-side embeds discovery in caller (C false).

---

### Q41 [Medium] [Case Study] — CloudMart Internal Call Pattern

**Answer:** B, C, D

**Explanation:** Server-side = simple client, platform LB. Eureka client is client-side (A).

---

### Q42 [Hard] — Mesh Data Plane Discovery

**Answer:** A, B, C

**Explanation:** Mesh removes SDK need from app (C false).

---

### Q43 [Medium] [Case Study] — CloudMart Pod Restart Loop

**Answer:** A, B, D

**Explanation:** Heavy liveness on deps causes cascading kills (C wrong).

---

### Q44 [Medium] — Sidecar vs Ambassador

**Answer:** B, C, D

**Explanation:** Helpers own cross-cutting proxy concerns. Embedding SDKs in every app is the anti-pattern (A).

---

### Q45 [Medium] [Case Study] — CloudMart Deploy Connection Drops

**Answer:** A, B, C

**Explanation:** Drain before exit prevents mid-request kill (C wrong).

---

### Q46 [Hard] — Health Check Cascading Failure

**Answer:** A, C, D

**Explanation:** Blind deep readiness amplifies outages (C wrong).

---

### Q47 [Medium] [Case Study] — CloudMart Mesh Adoption Debate

**Answer:** A, B, D

**Explanation:** Don't adopt mesh day one (C false). Grow into it.

---

### Q48 [Medium] [Case Study] — CloudMart Traffic Directions

**Answer:** A, C, D

**Explanation:** Mesh does not replace public gateway (B).

---

### Q49 [Hard] — External Config Store and Edge Split

**Answer:** B, C, D

**Explanation:** Runtime config store + secret manager. Secrets must not live in git (A).

---

### Q50 [Hard] [Case Study] — CloudMart Order Placement Flow

**Answer:** B, C, D

**Explanation:** Payment async after 201; sync path stays fast (C wrong).
