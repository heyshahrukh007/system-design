# API Gateway & Service Discovery — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-08-answers.md](./answer-key/day-08-answers.md)


---

### Q01 [Easy] [Case Study] — CloudMart Deploy Bottleneck



**Context:** CloudMart runs a 400K-line monolith. A one-line CSS fix requires a full 25-minute deploy and weekend change window. Payment and catalog ship together.

**Select all that apply.**

Which signals favor splitting toward microservices over time?

- [ ] A. Clear domain boundaries — catalog, orders, and payments are distinct
- [ ] B. One module needs 10× scale while blog traffic stays flat
- [ ] C. Deploy pain — any change requires full redeploy of unrelated modules
- [ ] D. Small team of 4 engineers still validating product-market fit

---

### Q02 [Easy] — Monolith Advantages



**Select all that apply.**

Which are genuine advantages of a monolithic architecture?

- [ ] A. Low operational overhead for early-stage products
- [ ] B. ACID transactions across modules in one database
- [ ] C. Simple local debugging — no network between modules
- [ ] D. Independent per-service deploy without coordination

---

### Q03 [Easy] [Case Study] — CloudMart MVP Team Size



**Context:** CloudMart's startup spin-off has 6 engineers, unclear domain boundaries, and 2K daily users.

**Select all that apply.**

When is staying monolithic (or modular monolith) the better default?

- [ ] A. Every team needs separate repos on day one
- [ ] B. Strong need for cross-module ACID transactions in one workflow
- [ ] C. Product still finding fit — minimize ops surface area
- [ ] D. Low traffic and simple domain reduce distributed complexity

---

### Q04 [Easy] — Microservices Trade-offs



**Select all that apply.**

Which are real costs of adopting microservices?

- [ ] A. Eliminates all need for API gateways and discovery
- [ ] B. Distributed debugging and tracing across hops
- [ ] C. Network latency and failure modes between services
- [ ] D. Harder cross-service data consistency without careful design

---

### Q05 [Easy] [Case Study] — CloudMart Strangler Fig



**Context:** CloudMart cannot rewrite its 400K-line monolith in one release. Orders are the highest-pain module. A gateway already sits in front of the monolith.

**Select all that apply.**

Which strangler-fig steps fit this migration?

- [ ] A. Put a facade/gateway in front and shift traffic slice by slice with monitoring
- [ ] B. Big-bang cutover of every module on the same weekend for consistency
- [ ] C. Delete unused monolith order code only after the new path carries production traffic
- [ ] D. Route `/orders/*` to a new order service while `/legacy/*` still hits the monolith

---

### Q06 [Easy] [Case Study] — CloudMart Internal RPC Choice



**Context:** CloudMart order service calls inventory 8,000 times/sec with strict latency SLO. Public mobile app uses REST.

**Select all that apply.**

Which protocol choices fit?

- [ ] A. gRPC + Protobuf for high-throughput internal order → inventory calls
- [ ] B. GraphQL between every internal microservice by default
- [ ] C. REST/JSON for public client APIs — universal and debuggable
- [ ] D. Queues for fire-and-forget side effects (email, analytics)

---

### Q07 [Easy] — Sync vs Async Between Services



**Select all that apply.**

When should service-to-service communication be asynchronous?

- [ ] A. Decoupling producers from slow or flaky consumers
- [ ] B. Fan-out to inventory, email, and analytics after order placed
- [ ] C. Payment authorization shown in the HTTP response to the user
- [ ] D. Side effects where the caller does not need an immediate result

---

### Q08 [Easy] [Case Study] — CloudMart Mobile Data Needs



**Context:** CloudMart's mobile app needs different field sets per screen — home feed vs checkout vs profile — from overlapping services.

**Select all that apply.**

Which client-facing API approach helps?

- [ ] A. GraphQL at the gateway — client requests exact fields in one round trip
- [ ] B. GraphQL for flexible client queries; not necessarily between every internal service
- [ ] C. GraphQL eliminates N+1 risk without server-side DataLoader design
- [ ] D. BFF per client type is an alternative to a single flexible GraphQL layer

---

### Q09 [Medium] [Case Study] — CloudMart Internal Service Trust



**Context:** CloudMart assumed private VPC meant internal HTTP needed no auth. A compromised pod scanned and called payment APIs directly.

**Select all that apply.**

Which internal authentication practices apply?

- [ ] A. Service mesh can automate mTLS between sidecars
- [ ] B. mTLS or service JWT — never trust VPC alone
- [ ] C. Short-lived service tokens issued by a central auth component
- [ ] D. Private network means any pod may impersonate any service safely

---

### Q10 [Medium] — gRPC Production Considerations



**Select all that apply.**

Which statements about gRPC in production are correct?

- [ ] A. HTTP/2 long-lived connections need L7-aware load balancing
- [ ] B. Strong contracts via Protobuf with code generation
- [ ] C. Browser-native without grpc-web or gateway translation
- [ ] D. Combine with timeouts, retries on idempotent reads, circuit breakers

---

### Q11 [Easy] [Case Study] — CloudMart Client URL Sprawl



**Context:** CloudMart's mobile app hardcodes auth.cloudmart.com, orders.internal:8080, and catalog.internal:3000. Certificate and CORS updates require app store releases.

**Select all that apply.**

How does an API gateway address this?

- [ ] A. Centralize CORS, SSL termination, and routing in one place
- [ ] B. Expose every microservice port directly for lower latency
- [ ] C. Hide internal hostnames and topology from external consumers
- [ ] D. Single public domain (api.cloudmart.com) — one TLS cert, simpler clients

---

### Q12 [Easy] — API Gateway vs Load Balancer



**Select all that apply.**

How does an API gateway differ from a basic load balancer?

- [ ] A. Gateway is application-aware — path routing, auth, transforms
- [ ] B. LB typically distributes traffic to one pool; gateway routes to many services
- [ ] C. LB always validates JWT and API keys; gateway never does
- [ ] D. Gateway can terminate TLS and apply rate limits per route

---

### Q13 [Easy] — Gateway Cross-Cutting Concerns



**Select all that apply.**

Which concerns are commonly centralized at the API gateway?

- [ ] A. All resource-level authorization (user owns order 123)
- [ ] B. JWT validation and request logging at the edge
- [ ] C. SSL/TLS termination for public HTTPS
- [ ] D. Per-API-key rate limiting before backends

---

### Q14 [Medium] [Case Study] — CloudMart Mobile vs Web APIs



**Context:** CloudMart mobile needs lightweight payloads; web admin needs rich dashboards. One generic REST API causes over-fetching on mobile and under-powering on web.

**Select all that apply.**

Which architecture patterns help?

- [ ] A. BFF replaces all need for a gateway — clients call BFF ports directly on internet
- [ ] B. API gateway for shared routing/auth; BFF for tailored aggregation
- [ ] C. BFF (Backend for Frontend) per client type behind the gateway
- [ ] D. Gateway → BFF → microservices is common at larger scale

---

### Q15 [Medium] [Case Study] — CloudMart Gateway Routing Table



**Context:** CloudMart exposes /v1/users, /v1/orders, /v1/products, and /graphql on api.cloudmart.com.

**Select all that apply.**

Which gateway routing responsibilities apply?

- [ ] A. Path-based routing maps URL prefixes to backend services
- [ ] B. Gateway should own all business rules and database queries
- [ ] C. Host-based routing can separate public API from admin subdomain
- [ ] D. API versioning routes /v1 and /v2 to different backend pools

---

### Q16 [Medium] — TLS at the Gateway



**Select all that apply.**

Which SSL/TLS termination practices are sound?

- [ ] A. Terminate HTTPS at gateway; forward HTTP on private network to backends
- [ ] B. Backends must always terminate TLS again for security — double encryption required always
- [ ] C. Central certificate management (ACM, Let's Encrypt) at the edge
- [ ] D. Optional mTLS between gateway and services for stricter internal trust

---

### Q17 [Medium] — Gateway Offloading and Transforms



**Select all that apply.**

Which edge responsibilities are sound gateway offloading / transform patterns?

- [ ] A. Store shopping cart state in gateway memory for all users
- [ ] B. Path rewrite and protocol translation (REST client → gRPC backend)
- [ ] C. Offload TLS, JWT validation, compression, and rate limits so services stay thin
- [ ] D. Inject X-Request-Id and strip client-supplied spoofed identity headers

---

### Q18 [Medium] [Case Study] — CloudMart Dashboard Aggregation



**Context:** CloudMart's mobile home screen needs user profile, recent orders, and notification count — three backend services.

**Select all that apply.**

How should the gateway or BFF handle this?

- [ ] A. API composition at edge helps slow mobile networks
- [ ] B. Keep aggregation thin — no heavy business rules in gateway
- [ ] C. Parallel backend calls merged into one JSON response — reduces client round trips
- [ ] D. Mobile client must call three services directly over the public internet

---

### Q19 [Medium] — TCP vs UDP for Service APIs



**Select all that apply.**

Which transport choices fit typical microservice APIs?

- [ ] A. Choose UDP only when you need low latency and can tolerate or repair loss
- [ ] B. TCP (HTTP/1.1, HTTP/2, TLS) is the default for service APIs and databases
- [ ] C. UDP for all internal order → payment RPCs because it is always faster and reliable
- [ ] D. UDP suits loss-tolerant real-time media, DNS, or metrics firehose when designed for it

---

### Q20 [Medium] [Case Study] — CloudMart Path Routing Incident



**Context:** CloudMart misconfigured gateway: /api/v1/orders/* routed to catalog-service. Checkout returned product JSON for order IDs.

**Select all that apply.**

Which routing concepts prevent this class of failure?

- [ ] A. Explicit path-based upstream mapping per service
- [ ] B. Integration tests that hit gateway routes end-to-end
- [ ] C. Path routing is optional — any service can handle any path
- [ ] D. Separate admin and public routes by host or path prefix

---

### Q21 [Medium] — Header-Based Routing



**Select all that apply.**

When is header-based routing at the gateway useful?

- [ ] A. Replacing all need for authentication
- [ ] B. API version selection without changing URL path
- [ ] C. Canary releases — route small % to v2 via header or cookie
- [ ] D. Multi-tenant routing via X-Tenant header to tenant-specific pools

---

### Q22 [Medium] [Case Study] — CloudMart Canary Release



**Context:** CloudMart deploys order-service v2. Gateway sends 5% of traffic to v2; error rate on v2 is 3× v1.

**Select all that apply.**

Which traffic-shaping practices apply?

- [ ] A. Canary split at gateway or mesh — roll back by reducing v2 percentage
- [ ] B. Monitor error rate and latency per upstream pool during canary
- [ ] C. Blue-green flips all traffic at once after validation
- [ ] D. Canary requires clients to change URLs for each version

---

### Q23 [Hard] — gRPC Load Balancing



**Select all that apply.**

Why does naive TCP round-robin fail for gRPC?

- [ ] A. HTTP/2 multiplexes many RPCs on one long-lived connection — uneven pinning
- [ ] B. Need L7-aware proxy (Envoy) or client-side subchannel LB
- [ ] C. gRPC always uses UDP so TCP LB does not apply
- [ ] D. Proxy that balances per RPC, not per connection

---

### Q24 [Medium] [Case Study] — CloudMart Anti-Corruption Layer



**Context:** CloudMart extracts a modern Payment Service that must call a 15-year-old billing mainframe with cryptic field names and error codes. Product wants a clean payment domain model.

**Select all that apply.**

How should an anti-corruption layer (ACL) help?

- [ ] A. ACL maps legacy fields, IDs, and errors so the new domain stays clean
- [ ] B. New services should import mainframe schemas into every microservice API
- [ ] C. ACL sits between the new Payment Service and the legacy billing API/DB
- [ ] D. Makes replacing the legacy system later easier — swap behind the ACL

---

### Q25 [Medium] [Case Study] — CloudMart JWT at Edge



**Context:** CloudMart gateway validates JWT once and forwards X-User-Id to order-service. Order-service trusts any X-User-Id header from the network.

**Select all that apply.**

Which auth design fixes this?

- [ ] A. Coarse auth at gateway; resource checks (user owns order) in order-service
- [ ] B. Backends reject client-supplied identity headers — trust gateway only via network policy/mTLS
- [ ] C. Gateway strips client X-User-Id; injects verified identity after JWT validation
- [ ] D. Services should trust any header if request comes from private IP

---

### Q26 [Medium] — API Keys for Partners



**Select all that apply.**

Which API key practices at the gateway are correct?

- [ ] A. Lookup key → tenant, rate tier, and permissions
- [ ] B. API keys in gateway config git repo without secret manager
- [ ] C. Common for partner and server-to-server integrations
- [ ] D. Per-key rate limits enforce billing tiers

---

### Q27 [Medium] [Case Study] — CloudMart Admin Route Exposure



**Context:** CloudMart /admin/* routes were reachable without role check at gateway. Any logged-in user could hit admin upstream.

**Select all that apply.**

How should gateway and services split authorization?

- [ ] A. Authentication at gateway; authorization split coarse (gateway) + fine (service)
- [ ] B. Services enforce fine-grained resource ownership
- [ ] C. Gateway alone decides if user 789 may access order 456 owned by user 123
- [ ] D. Gateway enforces route-level roles — /admin/* requires admin in JWT

---

### Q28 [Hard] — Federated Identity and Tokens



**Select all that apply.**

Which federated identity / token practices at the gateway are production-safe?

- [ ] A. Validate iss, aud, exp; trust external IdP (Google, Okta, Auth0) via OIDC
- [ ] B. 30-day access JWT with no refresh — simplest UX
- [ ] C. Short-lived access tokens; refresh handled by auth service / IdP flow
- [ ] D. Public routes (/health, catalog) explicitly allowlisted without auth

---

### Q29 [Medium] — mTLS Gateway to Service



**Select all that apply.**

What does mTLS between gateway and backends provide?

- [ ] A. Eliminates need for any user authentication at gateway
- [ ] B. Both sides present certificates — prevents impersonation inside VPC
- [ ] C. Service mesh can automate certificate rotation for sidecars
- [ ] D. Complements JWT user auth with service-to-service trust

---

### Q30 [Medium] [Case Study] — CloudMart Scraping Attack



**Context:** A bot sends 12,000 req/s to CloudMart's search API through the gateway. Catalog pods hit 100% CPU; legitimate users see timeouts.

**Select all that apply.**

Which gateway protections apply?

- [ ] A. Rate limit by IP or API key before traffic reaches catalog-service
- [ ] B. Stricter limits on expensive routes like /search
- [ ] C. Rate limiting only inside catalog-service — gateway passes all traffic
- [ ] D. Return 429 with Retry-After when limit exceeded

---

### Q31 [Easy] [Case Study] — CloudMart Login Brute Force



**Context:** CloudMart sees 50,000 POST /login attempts per hour from rotating IPs against stolen email list.

**Select all that apply.**

Which rate-limiting approaches help?

- [ ] A. Sliding window smoother than fixed window for fairness
- [ ] B. Fixed window has no burst boundary problem at minute rollovers
- [ ] C. Token bucket allows controlled bursts while capping sustained abuse
- [ ] D. Low limit on POST /login per IP (e.g., 5/min) — brute-force protection

---

### Q32 [Medium] — Throttling at the Gateway



**Select all that apply.**

Which throttling mechanisms belong at the API gateway?

- [ ] A. Rate limit — requests per second/minute (token bucket / sliding window)
- [ ] B. Quota — total calls per day/month for billing tiers
- [ ] C. HTTP 200 with silent drop — best UX for abusive clients
- [ ] D. Concurrency limit — cap in-flight requests; return 429 with Retry-After when exceeded

---

### Q33 [Hard] — Distributed Rate Limiting



**Select all that apply.**

CloudMart runs 6 gateway replicas. Which distributed limit designs work?

- [ ] A. Quota (daily total) separate from per-second rate burst control
- [ ] B. Shared Redis counters — all nodes see same count
- [ ] C. Token bucket in Redis with atomic INCR/EXPIRE
- [ ] D. Per-node counters only — effective limit is limit × replica count

---

### Q34 [Easy] [Case Study] — CloudMart Hardcoded Upstream IPs



**Context:** CloudMart's gateway config lists order-service at 10.0.1.10. After Kubernetes rollout, pods are at 10.0.2.x — all order API calls fail 502.

**Select all that apply.**

What fixes instance discovery?

- [ ] A. Service discovery — gateway queries registry for current healthy instances
- [ ] B. Logical service name (order-service) instead of hardcoded pod IP
- [ ] C. Static IPs work forever if autoscaler never runs
- [ ] D. Kubernetes DNS/Endpoints update pod lists on scale and deploy

---

### Q35 [Easy] — Service Registry Concepts



**Select all that apply.**

Which service discovery terms are correct?

- [ ] A. Registration — instance announces itself on startup
- [ ] B. Registry stores logical service name → list of instance addresses
- [ ] C. Hardcoded IP lists are the cloud-native default for autoscaled pods
- [ ] D. Deregistration — instance removes itself on graceful shutdown

---

### Q36 [Medium] [Case Study] — CloudMart Kubernetes Service DNS



**Context:** CloudMart pods call http://order-service:8080/orders. No Eureka deployed. DNS resolves to ClusterIP; kube-proxy load-balances to endpoints.

**Select all that apply.**

Which statements about K8s discovery are correct?

- [ ] A. Stable DNS name with endpoints controller updating pod list on rollout
- [ ] B. DNS TTL delays mean K8s never updates endpoints on pod death
- [ ] C. Built-in server-side discovery — no separate registry required for K8s-native apps
- [ ] D. ClusterIP Service provides logical name decoupled from pod IPs

---

### Q37 [Medium] — DNS-Based Discovery Trade-offs



**Select all that apply.**

Which statements about DNS-based service discovery are correct?

- [ ] A. DNS TTL can delay propagation after instance failure
- [ ] B. Simple and universal — multiple A records for instances
- [ ] C. DNS always provides instant failover with zero stale traffic
- [ ] D. Basic DNS may lack health awareness without health-checked registry

---

### Q38 [Medium] — Health-Aware Registry



**Select all that apply.**

How do health-aware registries improve discovery?

- [ ] A. Tie registration to periodic GET /health probes
- [ ] B. Consul/Eureka/K8s endpoints filter unhealthy nodes
- [ ] C. Only return instances passing health checks to callers
- [ ] D. Return all registered instances including crashed ones for retry practice

---

### Q39 [Medium] [Case Study] — CloudMart Polyglot Services



**Context:** CloudMart has Go, Python, and Node services. Team debates Eureka+Ribbon (Java client LB) vs Kubernetes Services.

**Select all that apply.**

Which discovery pattern fits heterogeneous services?

- [ ] A. Client-side discovery eliminates all load balancer hops
- [ ] B. Client-side discovery requires per-language libraries — higher coupling
- [ ] C. Server-side discovery via K8s Service DNS — simple HTTP clients
- [ ] D. External clients still use gateway + LB (server-side) regardless

---

### Q40 [Medium] — Client-Side Discovery



**Select all that apply.**

Which describe client-side service discovery?

- [ ] A. Zero discovery logic in application code
- [ ] B. No intermediary LB hop — direct to chosen instance
- [ ] C. Caller queries registry and picks instance (Ribbon, gRPC resolver)
- [ ] D. Netflix Eureka + Ribbon is a classic Java stack example

---

### Q41 [Medium] [Case Study] — CloudMart Internal Call Pattern



**Context:** Order-service calls inventory-service via http://inventory-service:8080 inside the cluster.

**Select all that apply.**

Which server-side discovery characteristics apply?

- [ ] A. Caller must embed Eureka client to resolve IPs
- [ ] B. Extra hop through kube-proxy or LB compared to direct client-side pick
- [ ] C. Client uses stable logical URL; platform picks healthy instance
- [ ] D. Lower client complexity — any language with HTTP

---

### Q42 [Hard] — Mesh Data Plane Discovery



**Select all that apply.**

How does service mesh hide discovery from application code?

- [ ] A. App calls localhost sidecar; sidecar has endpoint list from control plane
- [ ] B. Discovery and mTLS handled in data plane without app changes
- [ ] C. Istio/Envoy pushes routes and endpoints to proxies
- [ ] D. Apps must import Eureka SDK for every outbound call

---

### Q43 [Medium] [Case Study] — CloudMart Pod Restart Loop



**Context:** CloudMart liveness probe hits /health/ready which checks PostgreSQL. DB blip causes all pods killed and restarted — worse outage.

**Select all that apply.**

Which health check design fixes this?

- [ ] A. Liveness lightweight — process up; readiness checks DB for traffic routing
- [ ] B. Deep DB check on readiness, not liveness — avoid restart storm
- [ ] C. Same heavy check for liveness and readiness is safest
- [ ] D. Readiness failure removes pod from LB without killing container

---

### Q44 [Medium] — Sidecar vs Ambassador



**Select all that apply.**

Which statements about sidecar and ambassador helpers are correct?

- [ ] A. App business logic should embed mTLS and discovery SDKs instead of helpers
- [ ] B. Ambassador focuses on outbound calls — local proxy to external/legacy dependencies
- [ ] C. Sidecar sits beside the app (same pod) and often proxies mesh traffic both ways
- [ ] D. Mesh data planes are a common sidecar implementation (e.g., Envoy)

---

### Q45 [Medium] [Case Study] — CloudMart Deploy Connection Drops



**Context:** During CloudMart deploy, SIGKILL stops pods mid-request. Users see 502 and duplicate charges on retry.

**Select all that apply.**

Which graceful shutdown steps apply?

- [ ] A. Finish in-flight requests within terminationGracePeriodSeconds
- [ ] B. Mark readiness failing — LB stops new traffic to draining pod
- [ ] C. Align grace period with max request duration
- [ ] D. Immediate SIGKILL is best for fastest deploy velocity

---

### Q46 [Hard] — Health Check Cascading Failure



**Select all that apply.**

Database slow causes all apps to fail deep readiness and LB removes entire fleet. Which mitigations apply?

- [ ] A. Readiness checks only truly critical deps; degraded mode for optional features
- [ ] B. Fail deep readiness on any slow dependency always — safest
- [ ] C. Circuit breaker on DB before readiness fails entirely
- [ ] D. Feature flags disable DB-heavy paths while core stays ready

---

### Q47 [Medium] [Case Study] — CloudMart Mesh Adoption Debate



**Context:** CloudMart has 35 microservices. Platform team proposes Istio day one for a 3-service MVP migration.

**Select all that apply.**

When is a full service mesh justified?

- [ ] A. Small team on early MVP — mesh ops overhead may outweigh benefits
- [ ] B. Start with gateway + K8s DNS + observability before mesh complexity
- [ ] C. Mesh required on day one for any Kubernetes deployment
- [ ] D. Many services needing mTLS, retries, and traffic policy without library sprawl

---

### Q48 [Medium] [Case Study] — CloudMart Traffic Directions



**Context:** CloudMart uses Kong for mobile API and Istio between internal services.

**Select all that apply.**

Which north-south vs east-west split is correct?

- [ ] A. East-west: service-to-service inside cluster — mesh handles mTLS and retries
- [ ] B. Service mesh replaces all need for public API gateway
- [ ] C. North-south: external client → API gateway into cluster
- [ ] D. Gateway for JWT and external rate limits; mesh for internal hop policy

---

### Q49 [Hard] — External Config Store and Edge Split



**Select all that apply.**

CloudMart keeps payment timeouts and feature flags out of container images. Which practices fit?

- [ ] A. Put secrets in git next to gateway config for simpler deploys
- [ ] B. Change flags/timeouts without redeploy; secrets stay in Vault/KMS
- [ ] C. Both gateway (north-south) and mesh (east-west) can coexist with complementary scopes
- [ ] D. Central config store (etcd, Consul, AppConfig) for runtime-tunable keys

---

### Q50 [Hard] [Case Study] — CloudMart Order Placement Flow



**Context:** User POSTs /v1/orders on CloudMart. Flow: Cloud LB → Kong (JWT, rate limit) → order-service via discovery → gRPC catalog check → Kafka order.created → 201 to client. Payment runs async.

**Select all that apply.**

Which statements about this architecture are correct?

- [ ] A. Synchronous path must include 8-minute payment processor in HTTP request
- [ ] B. User gets 201 before async payment completes — hybrid sync/async
- [ ] C. Gateway validates auth and routes before discovery picks order instance
- [ ] D. Catalog gRPC timeout/circuit breaker prevents hung checkout thread
