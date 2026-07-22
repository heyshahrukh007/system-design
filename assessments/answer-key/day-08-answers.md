# API Gateway & Service Discovery — Answer Key & Explanations (50)




---

### Q01

**Answer:** A, C

**Explanation:** Deploy pain and scale mismatch are split signals. Team size alone does not justify a split (B), and line count without domain analysis is not a sound trigger (D).

---

### Q02

**Answer:** A, B

**Explanation:** Monoliths offer low operational overhead and simple local debugging. Independent deployment (C) and automatic per-module scaling (D) are not inherent monolith advantages.

---

### Q03

**Answer:** A, C

**Explanation:** Low traffic and a need for cross-module ACID favor a monolith. Premature repo separation (B) and maximizing service count during product uncertainty (D) add avoidable complexity.

---

### Q04

**Answer:** A, D

**Explanation:** Network failure modes and distributed debugging are real costs. Cross-service transactions are not automatically as simple as local ACID (B), and microservices do not eliminate gateway or discovery needs (C).

---

### Q05

**Answer:** A, C

**Explanation:** A strangler migration shifts monitored slices behind a facade and removes old code only after validation. Big-bang replacement (D) or routing all traffic before validation (B) defeats incremental risk reduction.

---

### Q06

**Answer:** A, D

**Explanation:** REST fits public clients and queues fit fire-and-forget side effects. GraphQL everywhere (B) and email as a synchronous RPC transport (C) do not fit this high-throughput internal call.

---

### Q07

**Answer:** C, D

**Explanation:** Fan-out side effects and decoupling slow consumers fit asynchronous communication. A result required in the current response, including payment authorization (A, D), belongs on a synchronous path.

---

### Q08

**Answer:** B, C

**Explanation:** GraphQL at the edge gives clients flexible field selection and fewer round trips. It does not eliminate N+1 by itself (A), and exposing every internal service pushes unsafe fan-out to mobile clients (D).

---

### Q09

**Answer:** C, D

**Explanation:** Authenticate service hops with mTLS or service tokens, often automated by a mesh. A private network alone (A) or a permanent shared image password (B) does not establish strong service identity.

---

### Q10

**Answer:** A, B

**Explanation:** Production gRPC needs HTTP/2-aware balancing and bounded reliability controls. It is not browser-native (C), and it uses Protobuf contracts rather than unmanaged schemaless payloads (D).

---

### Q11

**Answer:** C, D

**Explanation:** A gateway hides topology and centralizes edge concerns such as CORS, TLS, and routing. Direct service exposure (A) or client-side pod discovery (B) increases coupling.

---

### Q12

**Answer:** A, D

**Explanation:** Gateways are application-aware and can apply route-level TLS and limits. A basic load balancer does not always validate credentials (B) or perform resource authorization (C).

---

### Q13

**Answer:** A, B

**Explanation:** Rate limiting and public TLS termination are common gateway concerns. Fine-grained ownership checks stay in services (D), and gateway-local business state is unsafe (C).

---

### Q14

**Answer:** B, C

**Explanation:** A gateway can own shared edge policy while per-client BFFs tailor aggregation. Directly exposing BFF ports (A) or duplicating presentation logic across domain services (D) weakens those boundaries.

---

### Q15

**Answer:** C, D

**Explanation:** Path- and host-based routing are gateway responsibilities. Business queries (A) and silently forcing every version to the newest backend (B) are not sound routing practices.

---

### Q16

**Answer:** B, C

**Explanation:** Edge TLS termination with optional internal mTLS are valid choices. Private keys must not be committed to source control (D), and double encryption is not universally required (A).

---

### Q17

**Answer:** A, C

**Explanation:** Gateways can sanitize identity headers and offload cross-cutting controls. Client identity headers must not be trusted unchanged (B), and user state should not live in gateway memory (D).

---

### Q18

**Answer:** A, C

**Explanation:** Parallel edge aggregation reduces mobile round trips. Direct public fan-out (B) and moving payment invariants into the gateway (D) create coupling and an oversized edge layer.

---

### Q19

**Answer:** C, D

**Explanation:** TCP is the normal service API transport, while UDP can fit intentionally loss-tolerant workloads. UDP is not automatically reliable for payment RPCs (A, D).

---

### Q20

**Answer:** A, C

**Explanation:** Explicit path mappings and route separation prevent accidental upstream selection. Route integration tests are necessary (D), and arbitrary service handling is unsafe (B).

---

### Q21

**Answer:** B, D

**Explanation:** Validated headers can select tenants or API versions. Header routing does not replace authentication (C), and untrusted tenant headers must not directly control routing (A).

---

### Q22

**Answer:** A, B

**Explanation:** Blue-green and canary strategies shape traffic without client URL changes. Canary metrics must be separated by version (D), and clients need not choose version URLs (C).

---

### Q23

**Answer:** B, C

**Explanation:** HTTP/2 multiplexing can pin many RPCs to one backend, so balancing must happen per RPC or subchannel. gRPC is not UDP (D), and merely preserving pinning does not solve imbalance (A).

---

### Q24

**Answer:** A, D

**Explanation:** An ACL isolates the payment domain and makes later replacement easier. Importing legacy schemas everywhere (B) or exposing legacy errors publicly (C) leaks the old model.

---

### Q25

**Answer:** A, B

**Explanation:** The gateway should sanitize and inject verified identity while services enforce resource authorization. Neither private IP origin (D) nor syntactically valid client headers (C) proves identity.

---

### Q26

**Answer:** A, B, C

**Explanation:** Secrets belong in Vault/Secrets Manager (D).

---

### Q27

**Answer:** A, B, D

**Explanation:** Resource ownership checks belong in services (C wrong at gateway only).

---

### Q28

**Answer:** A, C, D

**Explanation:** Federated IdP + short-lived tokens; allowlist public routes. Long-lived access JWTs are risky (B).

---

### Q29

**Answer:** A, B, D

**Explanation:** mTLS is service identity; user auth still at gateway (C).

---

### Q30

**Answer:** B, C, D

**Explanation:** Edge rate limit protects whole platform. Backend-only limit is too late (A).

---

### Q31

**Answer:** A, B, D

**Explanation:** Fixed window allows 2× burst at boundary (C false).

---

### Q32

**Answer:** B, C, D

**Explanation:** Throttling = rate + concurrency + quota. Never silently drop with fake 200 (A).

---

### Q33

**Answer:** A, B, C

**Explanation:** Without shared store, limits multiply by replica count (B describes the bug).

---

### Q34

**Answer:** A, B, D

**Explanation:** Containers change IPs — discovery required (C is fragile fiction).

---

### Q35

**Answer:** A, B, C

**Explanation:** Autoscaled environments need dynamic registry (D wrong).

---

### Q36

**Answer:** B, C, D

**Explanation:** K8s endpoints update on pod changes — not stale forever (A).

---

### Q37

**Answer:** A, B, D

**Explanation:** DNS has TTL/propagation trade-offs (D false).

---

### Q38

**Answer:** B, C, D

**Explanation:** Routing to dead instances causes errors (C wrong).

---

### Q39

**Answer:** A, B, D

**Explanation:** Server-side K8s DNS suits polyglot clients. Client-side adds per-language coupling (C overstates hop elimination).

---

### Q40

**Answer:** A, B, C

**Explanation:** Client-side discovery makes the caller query the registry and choose an instance, enabling caller-specific load balancing but coupling clients to discovery logic.

---

### Q41

**Answer:** A, B, C

**Explanation:** Server-side = simple client, platform LB. Eureka client is client-side (D).

---

### Q42

**Answer:** A, B, D

**Explanation:** A mesh data plane can handle endpoint discovery and mTLS transparently, but business-level telemetry and application state still require application instrumentation.

---

### Q43

**Answer:** A, B, C

**Explanation:** Heavy liveness on deps causes cascading kills (C wrong).

---

### Q44

**Answer:** A, B, D

**Explanation:** Helpers own cross-cutting proxy concerns. Embedding SDKs in every app is the anti-pattern (C).

---

### Q45

**Answer:** A, B, C

**Explanation:** Readiness draining, adequate grace periods, and completion of in-flight work prevent mid-request termination; immediate SIGKILL does not.

---

### Q46

**Answer:** A, B, D

**Explanation:** Selective readiness checks, circuit breakers, and degraded modes reduce the risk that one slow dependency removes the entire fleet.

---

### Q47

**Answer:** B, C, D

**Explanation:** Don't adopt mesh day one (C false). Grow into it.

---

### Q48

**Answer:** A, B, C

**Explanation:** Mesh does not replace public gateway (D).

---

### Q49

**Answer:** A, B, D

**Explanation:** Runtime config store + secret manager. Secrets must not live in git (C).

---

### Q50

**Answer:** B, C, D

**Explanation:** The gateway authenticates and routes, discovery selects an order instance, and bounded gRPC calls protect the synchronous path while payment continues asynchronously.
