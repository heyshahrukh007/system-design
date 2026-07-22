# API Gateway & Service Discovery — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-08-answers.md](./answer-key/day-08-answers.md)




---

### Q01




**Context:** CloudMart runs a 400K-line monolith. A one-line CSS fix requires a full 25-minute deploy and weekend change window. Payment and catalog ship together.

**Select all that apply.**

Which signals favor splitting toward microservices over time?

- [ ] A. Deploy pain — any change requires full redeploy of unrelated modules
- [ ] B. Small team of 4 engineers still validating product-market fit
- [ ] C. One module needs 10× scale while blog traffic stays flat
- [ ] D. Split immediately whenever a monolith exceeds 100K lines, regardless of domain boundaries

---

### Q02




**Select all that apply.**

Which are genuine advantages of a monolithic architecture?

- [ ] A. Low operational overhead for early-stage products
- [ ] B. Simple local debugging — no network between modules
- [ ] C. Independent per-service deploy without coordination
- [ ] D. Automatic independent scaling of every module without deployment changes

---

### Q03




**Context:** CloudMart's startup spin-off has 6 engineers, unclear domain boundaries, and 2K daily users.

**Select all that apply.**

When is staying monolithic (or modular monolith) the better default?

- [ ] A. Low traffic and simple domain reduce distributed complexity
- [ ] B. Every team needs separate repos on day one
- [ ] C. Strong need for cross-module ACID transactions in one workflow
- [ ] D. Product uncertainty is best handled by maximizing the number of independently deployed services

---

### Q04




**Select all that apply.**

Which are real costs of adopting microservices?

- [ ] A. Network latency and failure modes between services
- [ ] B. Cross-service transactions remain as simple and atomic as in-process database transactions
- [ ] C. Eliminates all need for API gateways and discovery
- [ ] D. Distributed debugging and tracing across hops

---

### Q05




**Context:** CloudMart cannot rewrite its 400K-line monolith in one release. Orders are the highest-pain module. A gateway already sits in front of the monolith.

**Select all that apply.**

Which strangler-fig steps fit this migration?

- [ ] A. Put a facade/gateway in front and shift traffic slice by slice with monitoring
- [ ] B. Route all traffic to the new order service before validating any production path
- [ ] C. Delete unused monolith order code only after the new path carries production traffic
- [ ] D. Big-bang cutover of every module on the same weekend for consistency

---

### Q06




**Context:** CloudMart order service calls inventory 8,000 times/sec with strict latency SLO. Public mobile app uses REST.

**Select all that apply.**

Which protocol choices fit?

- [ ] A. Queues for fire-and-forget side effects (email, analytics)
- [ ] B. GraphQL between every internal microservice by default
- [ ] C. Plain-text email for synchronous high-throughput order → inventory calls
- [ ] D. REST/JSON for public client APIs — universal and debuggable

---

### Q07




**Select all that apply.**

When should service-to-service communication be asynchronous?

- [ ] A. Any operation whose result must be displayed before the HTTP response returns
- [ ] B. Payment authorization shown in the HTTP response to the user
- [ ] C. Fan-out to inventory, email, and analytics after order placed
- [ ] D. Decoupling producers from slow or flaky consumers

---

### Q08




**Context:** CloudMart's mobile app needs different field sets per screen — home feed vs checkout vs profile — from overlapping services.

**Select all that apply.**

Which client-facing API approach helps?

- [ ] A. GraphQL eliminates N+1 risk without server-side DataLoader design
- [ ] B. GraphQL for flexible client queries; not necessarily between every internal service
- [ ] C. GraphQL at the gateway — client requests exact fields in one round trip
- [ ] D. Expose every internal service directly so each mobile screen manages its own fan-out

---

### Q09




**Context:** CloudMart assumed private VPC meant internal HTTP needed no auth. A compromised pod scanned and called payment APIs directly.

**Select all that apply.**

Which internal authentication practices apply?

- [ ] A. Private network means any pod may impersonate any service safely
- [ ] B. One permanent shared password embedded in every service image
- [ ] C. Service mesh can automate mTLS between sidecars
- [ ] D. mTLS or service JWT — never trust VPC alone

---

### Q10




**Select all that apply.**

Which statements about gRPC in production are correct?

- [ ] A. HTTP/2 long-lived connections need L7-aware load balancing
- [ ] B. Combine with timeouts, retries on idempotent reads, circuit breakers
- [ ] C. Browser-native without grpc-web or gateway translation
- [ ] D. Schemaless payloads with no generated clients or compatibility checks

---

### Q11




**Context:** CloudMart's mobile app hardcodes auth.cloudmart.com, orders.internal:8080, and catalog.internal:3000. Certificate and CORS updates require app store releases.

**Select all that apply.**

How does an API gateway address this?

- [ ] A. Expose every microservice port directly for lower latency
- [ ] B. Require clients to discover and pin every backend pod address
- [ ] C. Centralize CORS, SSL termination, and routing in one place
- [ ] D. Hide internal hostnames and topology from external consumers

---

### Q12




**Select all that apply.**

How does an API gateway differ from a basic load balancer?

- [ ] A. Gateway is application-aware — path routing, auth, transforms
- [ ] B. LB always validates JWT and API keys; gateway never does
- [ ] C. A basic transport load balancer always performs per-resource authorization
- [ ] D. Gateway can terminate TLS and apply rate limits per route

---

### Q13




**Select all that apply.**

Which concerns are commonly centralized at the API gateway?

- [ ] A. SSL/TLS termination for public HTTPS
- [ ] B. Per-API-key rate limiting before backends
- [ ] C. Persist all application business state in gateway-local memory
- [ ] D. All resource-level authorization (user owns order 123)

---

### Q14




**Context:** CloudMart mobile needs lightweight payloads; web admin needs rich dashboards. One generic REST API causes over-fetching on mobile and under-powering on web.

**Select all that apply.**

Which architecture patterns help?

- [ ] A. BFF replaces all need for a gateway — clients call BFF ports directly on internet
- [ ] B. Gateway → BFF → microservices is common at larger scale
- [ ] C. BFF (Backend for Frontend) per client type behind the gateway
- [ ] D. Put client-specific presentation logic into every domain service

---

### Q15




**Context:** CloudMart exposes /v1/users, /v1/orders, /v1/products, and /graphql on api.cloudmart.com.

**Select all that apply.**

Which gateway routing responsibilities apply?

- [ ] A. Gateway should own all business rules and database queries
- [ ] B. Rewrite every versioned request to the newest backend with no compatibility period
- [ ] C. Path-based routing maps URL prefixes to backend services
- [ ] D. Host-based routing can separate public API from admin subdomain

---

### Q16




**Select all that apply.**

Which SSL/TLS termination practices are sound?

- [ ] A. Backends must always terminate TLS again for security — double encryption required always
- [ ] B. Optional mTLS between gateway and services for stricter internal trust
- [ ] C. Terminate HTTPS at gateway; forward HTTP on private network to backends
- [ ] D. Commit private TLS keys to the application repository for easy rotation

---

### Q17




**Select all that apply.**

Which edge responsibilities are sound gateway offloading / transform patterns?

- [ ] A. Offload TLS, JWT validation, compression, and rate limits so services stay thin
- [ ] B. Let clients supply trusted identity headers unchanged to simplify authentication
- [ ] C. Inject X-Request-Id and strip client-supplied spoofed identity headers
- [ ] D. Store shopping cart state in gateway memory for all users

---

### Q18




**Context:** CloudMart's mobile home screen needs user profile, recent orders, and notification count — three backend services.

**Select all that apply.**

How should the gateway or BFF handle this?

- [ ] A. Parallel backend calls merged into one JSON response — reduces client round trips
- [ ] B. Mobile client must call three services directly over the public internet
- [ ] C. API composition at edge helps slow mobile networks
- [ ] D. Move checkout invariants and payment state transitions into the gateway

---

### Q19




**Select all that apply.**

Which transport choices fit typical microservice APIs?

- [ ] A. Use UDP for payment RPCs because packet loss is automatically repaired by the protocol
- [ ] B. UDP for all internal order → payment RPCs because it is always faster and reliable
- [ ] C. TCP (HTTP/1.1, HTTP/2, TLS) is the default for service APIs and databases
- [ ] D. UDP suits loss-tolerant real-time media, DNS, or metrics firehose when designed for it

---

### Q20




**Context:** CloudMart misconfigured gateway: /api/v1/orders/* routed to catalog-service. Checkout returned product JSON for order IDs.

**Select all that apply.**

Which routing concepts prevent this class of failure?

- [ ] A. Explicit path-based upstream mapping per service
- [ ] B. Path routing is optional — any service can handle any path
- [ ] C. Separate admin and public routes by host or path prefix
- [ ] D. Skip route tests because configuration changes cannot affect upstream selection

---

### Q21




**Select all that apply.**

When is header-based routing at the gateway useful?

- [ ] A. Trust any client-provided tenant header without validation or normalization
- [ ] B. API version selection without changing URL path
- [ ] C. Replacing all need for authentication
- [ ] D. Multi-tenant routing via X-Tenant header to tenant-specific pools

---

### Q22




**Context:** CloudMart deploys order-service v2. Gateway sends 5% of traffic to v2; error rate on v2 is 3× v1.

**Select all that apply.**

Which traffic-shaping practices apply?

- [ ] A. Canary split at gateway or mesh — roll back by reducing v2 percentage
- [ ] B. Blue-green flips all traffic at once after validation
- [ ] C. Canary requires clients to change URLs for each version
- [ ] D. Evaluate the canary only from aggregate metrics that combine v1 and v2

---

### Q23




**Select all that apply.**

Why does naive TCP round-robin fail for gRPC?

- [ ] A. Add more TCP connections while keeping all RPCs permanently pinned to one backend
- [ ] B. HTTP/2 multiplexes many RPCs on one long-lived connection — uneven pinning
- [ ] C. Proxy that balances per RPC, not per connection
- [ ] D. gRPC always uses UDP so TCP LB does not apply

---

### Q24




**Context:** CloudMart extracts a modern Payment Service that must call a 15-year-old billing mainframe with cryptic field names and error codes. Product wants a clean payment domain model.

**Select all that apply.**

How should an anti-corruption layer (ACL) help?

- [ ] A. Makes replacing the legacy system later easier — swap behind the ACL
- [ ] B. New services should import mainframe schemas into every microservice API
- [ ] C. Expose legacy field names and error codes directly in the public payment API
- [ ] D. ACL sits between the new Payment Service and the legacy billing API/DB

---

### Q25




**Context:** CloudMart gateway validates JWT once and forwards X-User-Id to order-service. Order-service trusts any X-User-Id header from the network.

**Select all that apply.**

Which auth design fixes this?

- [ ] A. Coarse auth at gateway; resource checks (user owns order) in order-service
- [ ] B. Gateway strips client X-User-Id; injects verified identity after JWT validation
- [ ] C. Accept X-User-Id from any caller as long as the header is syntactically valid
- [ ] D. Services should trust any header if request comes from private IP

---

### Q26




**Select all that apply.**

Which API key practices at the gateway are correct?

- [ ] A. Lookup key → tenant, rate tier, and permissions
- [ ] B. Common for partner and server-to-server integrations
- [ ] C. Per-key rate limits enforce billing tiers
- [ ] D. API keys in gateway config git repo without secret manager

---

### Q27




**Context:** CloudMart /admin/* routes were reachable without role check at gateway. Any logged-in user could hit admin upstream.

**Select all that apply.**

How should gateway and services split authorization?

- [ ] A. Authentication at gateway; authorization split coarse (gateway) + fine (service)
- [ ] B. Services enforce fine-grained resource ownership
- [ ] C. Gateway alone decides if user 789 may access order 456 owned by user 123
- [ ] D. Gateway enforces route-level roles — /admin/* requires admin in JWT

---

### Q28




**Select all that apply.**

Which federated identity / token practices at the gateway are production-safe?

- [ ] A. Short-lived access tokens; refresh handled by auth service / IdP flow
- [ ] B. 30-day access JWT with no refresh — simplest UX
- [ ] C. Validate iss, aud, exp; trust external IdP (Google, Okta, Auth0) via OIDC
- [ ] D. Public routes (/health, catalog) explicitly allowlisted without auth

---

### Q29




**Select all that apply.**

What does mTLS between gateway and backends provide?

- [ ] A. Complements JWT user auth with service-to-service trust
- [ ] B. Service mesh can automate certificate rotation for sidecars
- [ ] C. Eliminates need for any user authentication at gateway
- [ ] D. Both sides present certificates — prevents impersonation inside VPC

---

### Q30




**Context:** A bot sends 12,000 req/s to CloudMart's search API through the gateway. Catalog pods hit 100% CPU; legitimate users see timeouts.

**Select all that apply.**

Which gateway protections apply?

- [ ] A. Rate limiting only inside catalog-service — gateway passes all traffic
- [ ] B. Stricter limits on expensive routes like /search
- [ ] C. Rate limit by IP or API key before traffic reaches catalog-service
- [ ] D. Return 429 with Retry-After when limit exceeded

---

### Q31




**Context:** CloudMart sees 50,000 POST /login attempts per hour from rotating IPs against stolen email list.

**Select all that apply.**

Which rate-limiting approaches help?

- [ ] A. Low limit on POST /login per IP (e.g., 5/min) — brute-force protection
- [ ] B. Sliding window smoother than fixed window for fairness
- [ ] C. Fixed window has no burst boundary problem at minute rollovers
- [ ] D. Token bucket allows controlled bursts while capping sustained abuse

---

### Q32




**Select all that apply.**

Which throttling mechanisms belong at the API gateway?

- [ ] A. HTTP 200 with silent drop — best UX for abusive clients
- [ ] B. Concurrency limit — cap in-flight requests; return 429 with Retry-After when exceeded
- [ ] C. Quota — total calls per day/month for billing tiers
- [ ] D. Rate limit — requests per second/minute (token bucket / sliding window)

---

### Q33




**Select all that apply.**

CloudMart runs 6 gateway replicas. Which distributed limit designs work?

- [ ] A. Token bucket in Redis with atomic INCR/EXPIRE
- [ ] B. Quota (daily total) separate from per-second rate burst control
- [ ] C. Shared Redis counters — all nodes see same count
- [ ] D. Per-node counters only — effective limit is limit × replica count

---

### Q34




**Context:** CloudMart's gateway config lists order-service at 10.0.1.10. After Kubernetes rollout, pods are at 10.0.2.x — all order API calls fail 502.

**Select all that apply.**

What fixes instance discovery?

- [ ] A. Service discovery — gateway queries registry for current healthy instances
- [ ] B. Logical service name (order-service) instead of hardcoded pod IP
- [ ] C. Static IPs work forever if autoscaler never runs
- [ ] D. Kubernetes DNS/Endpoints update pod lists on scale and deploy

---

### Q35




**Select all that apply.**

Which service discovery terms are correct?

- [ ] A. Registry stores logical service name → list of instance addresses
- [ ] B. Deregistration — instance removes itself on graceful shutdown
- [ ] C. Registration — instance announces itself on startup
- [ ] D. Hardcoded IP lists are the cloud-native default for autoscaled pods

---

### Q36




**Context:** CloudMart pods call http://order-service:8080/orders. No Eureka deployed. DNS resolves to ClusterIP; kube-proxy load-balances to endpoints.

**Select all that apply.**

Which statements about K8s discovery are correct?

- [ ] A. DNS TTL delays mean K8s never updates endpoints on pod death
- [ ] B. Stable DNS name with endpoints controller updating pod list on rollout
- [ ] C. Built-in server-side discovery — no separate registry required for K8s-native apps
- [ ] D. ClusterIP Service provides logical name decoupled from pod IPs

---

### Q37




**Select all that apply.**

Which statements about DNS-based service discovery are correct?

- [ ] A. Simple and universal — multiple A records for instances
- [ ] B. Basic DNS may lack health awareness without health-checked registry
- [ ] C. DNS always provides instant failover with zero stale traffic
- [ ] D. DNS TTL can delay propagation after instance failure

---

### Q38




**Select all that apply.**

How do health-aware registries improve discovery?

- [ ] A. Return all registered instances including crashed ones for retry practice
- [ ] B. Only return instances passing health checks to callers
- [ ] C. Consul/Eureka/K8s endpoints filter unhealthy nodes
- [ ] D. Tie registration to periodic GET /health probes

---

### Q39




**Context:** CloudMart has Go, Python, and Node services. Team debates Eureka+Ribbon (Java client LB) vs Kubernetes Services.

**Select all that apply.**

Which discovery pattern fits heterogeneous services?

- [ ] A. Server-side discovery via K8s Service DNS — simple HTTP clients
- [ ] B. Client-side discovery requires per-language libraries — higher coupling
- [ ] C. Client-side discovery eliminates all load balancer hops
- [ ] D. External clients still use gateway + LB (server-side) regardless

---

### Q40




**Select all that apply.**

Which describe client-side service discovery?

- [ ] A. Netflix Eureka + Ribbon is a classic Java stack example
- [ ] B. Caller queries registry and picks instance (Ribbon, gRPC resolver)
- [ ] C. No intermediary LB hop — direct to chosen instance
- [ ] D. Zero discovery logic in application code

---

### Q41




**Context:** Order-service calls inventory-service via http://inventory-service:8080 inside the cluster.

**Select all that apply.**

Which server-side discovery characteristics apply?

- [ ] A. Extra hop through kube-proxy or LB compared to direct client-side pick
- [ ] B. Client uses stable logical URL; platform picks healthy instance
- [ ] C. Lower client complexity — any language with HTTP
- [ ] D. Caller must embed Eureka client to resolve IPs

---

### Q42




**Select all that apply.**

How does service mesh hide discovery from application code?

- [ ] A. App calls localhost sidecar; sidecar has endpoint list from control plane
- [ ] B. Istio/Envoy pushes routes and endpoints to proxies
- [ ] C. A mesh automatically records business events and application state without application instrumentation
- [ ] D. Discovery and mTLS handled in data plane without app changes

---

### Q43




**Context:** CloudMart liveness probe hits /health/ready which checks PostgreSQL. DB blip causes all pods killed and restarted — worse outage.

**Select all that apply.**

Which health check design fixes this?

- [ ] A. Deep DB check on readiness, not liveness — avoid restart storm
- [ ] B. Liveness lightweight — process up; readiness checks DB for traffic routing
- [ ] C. Readiness failure removes pod from LB without killing container
- [ ] D. Same heavy check for liveness and readiness is safest

---

### Q44




**Select all that apply.**

Which statements about sidecar and ambassador helpers are correct?

- [ ] A. Ambassador focuses on outbound calls — local proxy to external/legacy dependencies
- [ ] B. Mesh data planes are a common sidecar implementation (e.g., Envoy)
- [ ] C. App business logic should embed mTLS and discovery SDKs instead of helpers
- [ ] D. Sidecar sits beside the app (same pod) and often proxies mesh traffic both ways

---

### Q45




**Context:** During CloudMart deploy, SIGKILL stops pods mid-request. Users see 502 and duplicate charges on retry.

**Select all that apply.**

Which graceful shutdown steps apply?

- [ ] A. Mark readiness failing — LB stops new traffic to draining pod
- [ ] B. Finish in-flight requests within terminationGracePeriodSeconds
- [ ] C. Align grace period with max request duration
- [ ] D. Immediate SIGKILL is best for fastest deploy velocity

---

### Q46




**Select all that apply.**

Database slow causes all apps to fail deep readiness and LB removes entire fleet. Which mitigations apply?

- [ ] A. Circuit breaker on DB before readiness fails entirely
- [ ] B. Readiness checks only truly critical deps; degraded mode for optional features
- [ ] C. Fail deep readiness on any slow dependency always — safest
- [ ] D. Feature flags disable DB-heavy paths while core stays ready

---

### Q47




**Context:** CloudMart has 35 microservices. Platform team proposes Istio day one for a 3-service MVP migration.

**Select all that apply.**

When is a full service mesh justified?

- [ ] A. Mesh required on day one for any Kubernetes deployment
- [ ] B. Many services needing mTLS, retries, and traffic policy without library sprawl
- [ ] C. Small team on early MVP — mesh ops overhead may outweigh benefits
- [ ] D. Start with gateway + K8s DNS + observability before mesh complexity

---

### Q48




**Context:** CloudMart uses Kong for mobile API and Istio between internal services.

**Select all that apply.**

Which north-south vs east-west split is correct?

- [ ] A. East-west: service-to-service inside cluster — mesh handles mTLS and retries
- [ ] B. Gateway for JWT and external rate limits; mesh for internal hop policy
- [ ] C. North-south: external client → API gateway into cluster
- [ ] D. Service mesh replaces all need for public API gateway

---

### Q49




**Select all that apply.**

CloudMart keeps payment timeouts and feature flags out of container images. Which practices fit?

- [ ] A. Both gateway (north-south) and mesh (east-west) can coexist with complementary scopes
- [ ] B. Change flags/timeouts without redeploy; secrets stay in Vault/KMS
- [ ] C. Put secrets in git next to gateway config for simpler deploys
- [ ] D. Central config store (etcd, Consul, AppConfig) for runtime-tunable keys

---

### Q50




**Context:** User POSTs /v1/orders on CloudMart. Flow: Cloud LB → Kong (JWT, rate limit) → order-service via discovery → gRPC catalog check → Kafka order.created → 201 to client. Payment runs async.

**Select all that apply.**

Which statements about this architecture are correct?

- [ ] A. Synchronous path must include 8-minute payment processor in HTTP request
- [ ] B. Catalog gRPC timeout/circuit breaker prevents hung checkout thread
- [ ] C. Gateway validates auth and routes before discovery picks order instance
- [ ] D. User gets 201 before async payment completes — hybrid sync/async
