# Design Disciplines — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-02-answers.md](./answer-key/day-02-answers.md)





---

### Q01





**Select all that apply.**

Which disciplines primarily define system structure and boundaries?

- [ ] A. API design primarily determines runtime CPU and memory capacity
- [ ] B. High-level design
- [ ] C. Data design
- [ ] D. Capacity design

---

### Q02





**Select all that apply.**

Which disciplines focus mainly on how well a system behaves?

- [ ] A. Reliability design
- [ ] B. Performance design
- [ ] C. Low-level design
- [ ] D. Security design focuses only on naming classes and modules

---

### Q03





**Select all that apply.**

Which stage-to-discipline pairings are appropriate?

- [ ] A. Incident response — observability and reliability
- [ ] B. Pre-launch — security, performance, reliability, observability
- [ ] C. Compliance audit — scalability and refactoring only
- [ ] D. Greenfield — skip HLD and capacity work until after launch

---

### Q04





**Select all that apply.**

Which statements show that design disciplines interact?

- [ ] A. Database choices affect scale, performance, and reliability
- [ ] B. API contracts affect security and observability
- [ ] C. Capacity and scalability are interchangeable
- [ ] D. Non-functional needs never affect architectural decisions

---

### Q05





**Select all that apply.**

Which items belong in an HLD?

- [ ] A. Exact method implementations
- [ ] B. Major components and responsibilities
- [ ] C. Every private helper method and local variable
- [ ] D. External dependencies and deployment view

---

### Q06





**Select all that apply.**

Which details should usually be deferred from HLD?

- [ ] A. Specific database indexes
- [ ] B. Major third-party integrations
- [ ] C. Exact instance counts must be frozen permanently in the HLD
- [ ] D. Class names and method signatures

---

### Q07





**Select all that apply.**

Which service-boundary choices follow HLD guidance?

- [ ] A. Separate Order and Payment when domains differ
- [ ] B. Split services by controller and repository layers
- [ ] C. Keep component ownership deliberately shared across every team
- [ ] D. Group capabilities by bounded context

---

### Q08





**Select all that apply.**

Which artifacts are typical HLD deliverables?

- [ ] A. Context diagram
- [ ] B. Complete source code
- [ ] C. Component diagram
- [ ] D. Sequence diagrams are useful only after all source code is complete

---

### Q09





**Select all that apply.**

Which elements commonly belong in an LLD?

- [ ] A. Annual infrastructure budget
- [ ] B. Classes and module dependencies
- [ ] C. Concurrency decisions are unrelated to component-level design
- [ ] D. Schemas, indexes, and constraints

---

### Q10





**Select all that apply.**

Which responsibilities match a layered service design?

- [ ] A. Repository formats HTTP responses for clients
- [ ] B. Service enforces business rules
- [ ] C. Controller owns SQL and payment rules
- [ ] D. Controller parses requests and formats responses

---

### Q11





**Select all that apply.**

Which statements about idempotency are correct?

- [ ] A. It is unnecessary for payments because retries cannot duplicate charges
- [ ] B. It requires a different result on every retry
- [ ] C. It prevents duplicate side effects on retries
- [ ] D. A key can map retries to a stored response

---

### Q12





**Select all that apply.**

Which areas deserve deeper LLD?

- [ ] A. Failure-prone payments and migrations
- [ ] B. Hot paths need less design because they execute frequently
- [ ] C. Complex state machines or pricing
- [ ] D. Stable boilerplate CRUD

---

### Q13





**Select all that apply.**

For 1M users making 50 requests daily, which calculations are correct?

- [ ] A. About 17,400 peak QPS at a 3x ratio
- [ ] B. Size only for average QPS
- [ ] C. 50M requests per day
- [ ] D. About 580 average QPS

---

### Q14





**Select all that apply.**

Which overheads belong in storage estimates?

- [ ] A. Indexes
- [ ] B. Backups consume no storage and can be omitted from estimates
- [ ] C. Only raw record bytes
- [ ] D. Replicas

---

### Q15





**Select all that apply.**

Which capacity mappings are appropriate?

- [ ] A. Database — raw row count only, regardless of storage or IOPS
- [ ] B. Queue — annual DAU regardless of message size
- [ ] C. App servers — peak QPS divided by benchmarked capacity
- [ ] D. Cache — size of hot data

---

### Q16





**Select all that apply.**

Which practices provide capacity headroom?

- [ ] A. Assume a failed zone removes load instead of shifting it
- [ ] B. Allow for reduced capacity during rolling deploys
- [ ] C. Size exactly to predicted peak
- [ ] D. Include spikes and growth before review

---

### Q17





**Select all that apply.**

Which statements compare vertical and horizontal scaling correctly?

- [ ] A. Vertical scaling adds more machines behind a load balancer
- [ ] B. Vertical scaling has a hardware ceiling
- [ ] C. Horizontal scaling adds machines
- [ ] D. Horizontal scaling removes distributed complexity

---

### Q18





**Select all that apply.**

Which techniques relieve read-heavy database load?

- [ ] A. Cache hot data
- [ ] B. Disable pooling and use only the primary
- [ ] C. Use a CDN to execute personalized transactional database queries
- [ ] D. Add read replicas

---

### Q19





**Select all that apply.**

Which choices make app servers easier to scale horizontally?

- [ ] A. Let any server validate a token
- [ ] B. Store session state only in each server's local memory
- [ ] C. Use stateless servers behind a load balancer
- [ ] D. Keep each session only in one server

---

### Q20





**Select all that apply.**

Which statements about sharding are correct?

- [ ] A. It should always precede caching
- [ ] B. Cross-shard queries and rebalancing become trivial automatically
- [ ] C. It distributes data and write load
- [ ] D. Shard keys affect hot partitions

---

### Q21





**Select all that apply.**

Which metrics describe reliability and recovery?

- [ ] A. MTTR is mean time to recover
- [ ] B. Availability measures the database's allocated disk percentage
- [ ] C. RTO is peak QPS
- [ ] D. RPO is acceptable data-loss window

---

### Q22





**Select all that apply.**

Which patterns limit cascading dependency failures?

- [ ] A. Timeouts
- [ ] B. Unlimited immediate retries
- [ ] C. Retry every failed dependency call immediately at a fixed interval
- [ ] D. Circuit breakers

---

### Q23





**Select all that apply.**

Which health-check and redundancy statements are correct?

- [ ] A. Stop routing to unhealthy instances
- [ ] B. Place all redundant critical instances in one failure zone
- [ ] C. Avoid critical single points of failure
- [ ] D. Report healthy when a required database is unreachable

---

### Q24





**Select all that apply.**

Which disaster-recovery practices are sound?

- [ ] A. Set RPO and RTO from business needs
- [ ] B. Test restores regularly
- [ ] C. Replication eliminates the need for backups and restore testing
- [ ] D. Assume a backup job guarantees recovery

---

### Q25





**Select all that apply.**

Which controls address authentication or authorization?

- [ ] A. AES-256 as the only identity check
- [ ] B. OIDC for SSO
- [ ] C. RBAC, ABAC, or ACLs
- [ ] D. MFA automatically grants every authenticated user all permissions

---

### Q26





**Select all that apply.**

Which data-protection practices are correct?

- [ ] A. TLS 1.2+ in transit
- [ ] B. Encryption at rest
- [ ] C. Secrets in a secret manager
- [ ] D. Plaintext passwords for recovery

---

### Q27





**Select all that apply.**

Which threat-and-mitigation pairings are correct?

- [ ] A. SQL injection — parameterized queries
- [ ] B. XSS — output encoding and CSP
- [ ] C. CSRF — tokens and SameSite cookies
- [ ] D. Command injection — pass input to a shell

---

### Q28





**Select all that apply.**

Which choices support defense in depth?

- [ ] A. Internet-facing databases
- [ ] B. Private database subnets
- [ ] C. Rate limits on login and writes
- [ ] D. Authorization in services as well as gateways

---

### Q29





**Select all that apply.**

Which requirements lean toward relational SQL?

- [ ] A. Highly variable schema as the only need
- [ ] B. Strong integrity constraints
- [ ] C. Complex joins
- [ ] D. ACID payment transactions

---

### Q30





**Select all that apply.**

Which NoSQL pairings are appropriate?

- [ ] A. Key-value — sessions and caching
- [ ] B. Wide-column — high write volume
- [ ] C. Graph — relationship-heavy queries
- [ ] D. Document — mandatory multi-table joins

---

### Q31





**Select all that apply.**

Which schema and indexing statements are correct?

- [ ] A. Normalization reduces redundancy
- [ ] B. Denormalization can speed reads
- [ ] C. Indexes add write cost
- [ ] D. Every column should be indexed

---

### Q32





**Select all that apply.**

Which consistency choices fit their use cases?

- [ ] A. Strong consistency for balances
- [ ] B. Eventual consistency for feeds
- [ ] C. Read-your-writes for profile edits
- [ ] D. Eventual consistency for inventory that must never oversell

---

### Q33





**Select all that apply.**

Which data-flow descriptions are correct?

- [ ] A. CQRS separates read and write models
- [ ] B. Event sourcing discards prior events
- [ ] C. ETL moves operational data to a warehouse
- [ ] D. CDC streams database changes

---

### Q34





**Select all that apply.**

Which API styles fit their stated needs?

- [ ] A. REST for public CRUD APIs
- [ ] B. gRPC for typed internal calls
- [ ] C. WebSocket for bidirectional real-time traffic
- [ ] D. Webhooks for in-process method calls

---

### Q35





**Select all that apply.**

Which REST endpoints are resource-oriented?

- [ ] A. GET /users/123
- [ ] B. POST /users
- [ ] C. GET /users/123/orders
- [ ] D. POST /createUser

---

### Q36





**Select all that apply.**

Which status-code uses are correct?

- [ ] A. 403 for insufficient permission
- [ ] B. 401 for missing or invalid authentication
- [ ] C. 429 for an unknown resource
- [ ] D. 201 for creation

---

### Q37





**Select all that apply.**

Which API changes are usually backward-compatible?

- [ ] A. Add a new endpoint
- [ ] B. Add an optional response field
- [ ] C. Remove a used field
- [ ] D. Add an optional query parameter

---

### Q38





**Select all that apply.**

Which practices improve API safety and operability?

- [ ] A. Change field types without versioning
- [ ] B. Paginate lists
- [ ] C. Include request IDs and consistent errors
- [ ] D. Use idempotency keys for creates

---

### Q39





**Select all that apply.**

Which metrics reveal performance under load?

- [ ] A. Average latency alone
- [ ] B. QPS or TPS
- [ ] C. Latency percentiles
- [ ] D. Error rate

---

### Q40





**Select all that apply.**

Which actions follow the optimization hierarchy?

- [ ] A. Reduce work with pagination
- [ ] B. Avoid work with caching
- [ ] C. Buy hardware before measuring
- [ ] D. Move suitable work off the critical path

---

### Q41





**Select all that apply.**

Which cache-pattern descriptions are correct?

- [ ] A. Write-through updates cache and database
- [ ] B. Cache-aside populates after a miss
- [ ] C. TTL guarantees freshness
- [ ] D. Write-behind flushes asynchronously

---

### Q42





**Select all that apply.**

Which techniques reduce network or I/O overhead?

- [ ] A. Batch small calls
- [ ] B. Reuse connections
- [ ] C. Create a database client per request
- [ ] D. Compress text responses

---

### Q43





**Select all that apply.**

Which load-test scenarios provide distinct evidence?

- [ ] A. Baseline at expected load
- [ ] B. Stress to breaking point
- [ ] C. Soak for memory leaks
- [ ] D. Peak above expected load

---

### Q44





**Select all that apply.**

Which statements distinguish monitoring and observability?

- [ ] A. Both are useful
- [ ] B. Monitoring handles only unknown unknowns
- [ ] C. Observability investigates novel failures
- [ ] D. Monitoring uses predefined alerts

---

### Q45





**Select all that apply.**

Which telemetry pairings are correct?

- [ ] A. Metrics — aggregated numbers
- [ ] B. Logs — contextual events
- [ ] C. Gauges — values that only increase
- [ ] D. Traces — requests across services

---

### Q46





**Select all that apply.**

Which alerting practices reduce noise?

- [ ] A. Aggregate instance alerts
- [ ] B. Page on every error
- [ ] C. Alert on sustained user symptoms
- [ ] D. Link runbooks to pages

---

### Q47





**Select all that apply.**

Which service-level statements are correct?

- [ ] A. SLI is a measurement
- [ ] B. Exhausted error budget permits ignoring reliability
- [ ] C. SLO is an internal target
- [ ] D. SLA is a customer contract

---

### Q48





**Select all that apply.**

Which signals can justify refactoring?

- [ ] A. No system or code exists yet
- [ ] B. Architecture cannot handle growth
- [ ] C. Releases break unrelated features
- [ ] D. Delivery and onboarding slow down

---

### Q49





**Select all that apply.**

Which practices support safe incremental refactoring?

- [ ] A. Use feature flags
- [ ] B. Change everything in one release
- [ ] C. Define success metrics
- [ ] D. Test critical paths first

---

### Q50





**Select all that apply.**

Which migration strategies follow refactor guidance?

- [ ] A. Strangler fig routing
- [ ] B. Dual-write, backfill, verify, then switch reads
- [ ] C. Run API v1 and v2 during migration
- [ ] D. Prefer big-bang rewrites
