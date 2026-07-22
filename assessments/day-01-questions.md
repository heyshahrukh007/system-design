# System Design Foundations — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-01-answers.md](./answer-key/day-01-answers.md)




---

### Q01




**Select all that apply.**

A retail app slows down every evening as traffic rises. Which observations indicate a system-design problem?

- [ ] A. Response latency rises with concurrent users
- [ ] B. Adding a second application server would automatically eliminate every database bottleneck
- [ ] C. Database CPU reaches 95% during the peak
- [ ] D. A spelling error appears in one product description

---

### Q02





**Select all that apply.**

A manager says system design means copying the technology choices of large companies. Which responses correct that misconception?

- [ ] A. Engineers should compare trade-offs rather than memorize architectures
- [ ] B. A famous company's database is automatically suitable for every workload
- [ ] C. Team size and budget should be ignored once a popular architecture is identified
- [ ] D. Design starts from the system's own requirements and constraints

---

### Q03





**Select all that apply.**

A service must let customers upload receipts. Which statements are functional requirements?

- [ ] A. Uploads complete within two seconds at p95
- [ ] B. Customers can upload JPEG and PNG files
- [ ] C. The service encrypts all stored receipts
- [ ] D. Customers can delete a previously uploaded receipt

---

### Q04





**Select all that apply.**

A team is defining non-functional requirements for a payment API. Which targets are non-functional?

- [ ] A. Display a receipt page after a successful payment
- [ ] B. Maintain 99.99% availability
- [ ] C. Let a customer refund a transaction
- [ ] D. Keep p95 response latency below 200 ms

---

### Q05





**Select all that apply.**

An acknowledged order must survive a server restart and appear consistently to buyers. Which NFRs are directly involved?

- [ ] A. Availability
- [ ] B. Consistency
- [ ] C. Durability
- [ ] D. Search functionality

---

### Q06





**Select all that apply.**

A design review begins before implementation. Which activities belong early in the process?

- [ ] A. Postpone all scale estimates until after production launch
- [ ] B. Clarify functional and non-functional requirements
- [ ] C. Define what is out of scope
- [ ] D. Select every class name before discussing traffic

---

### Q07





**Select all that apply.**

After proposing a high-level architecture, what should the team do before approving it?

- [ ] A. Assume component failures are too rare to model
- [ ] B. Discuss why chosen components fit better than alternatives
- [ ] C. Finalize every class and helper method before evaluating architectural risks
- [ ] D. Identify likely bottlenecks

---

### Q08





**Select all that apply.**

A team needs common infrastructure primitives for a media application. Which component-purpose pairings are correct?

- [ ] A. Cache — provide permanent durable storage for all records
- [ ] B. Load balancer — distribute requests across servers
- [ ] C. CDN — execute authoritative database transactions near users
- [ ] D. Message queue — support asynchronous communication

---

### Q09





**Select all that apply.**

An API needs one public entry point for authentication and routing, while images need durable file storage. Which choices fit?

- [ ] A. Object storage for images
- [ ] B. Browser local storage as the only persistent metadata store
- [ ] C. CDN as the authoritative transactional database
- [ ] D. API gateway for routing and authentication

---

### Q10





**Select all that apply.**

Leadership wants an architecture that supports several teams. Which outcomes can clear component boundaries provide?

- [ ] A. All production failures become impossible
- [ ] B. Every engineer can safely own every component without explicit responsibility
- [ ] C. Changes are less likely to cause unintended side effects
- [ ] D. Teams can work in parallel with explicit interfaces

---

### Q11





**Select all that apply.**

A startup proposes ten services for an unvalidated product. Which concerns should affect the decision?

- [ ] A. Microservices are mandatory whenever a database is used
- [ ] B. Architecture should reflect current constraints and plausible growth
- [ ] C. Splitting into more services always reduces operational work
- [ ] D. A simple monolith may be easier for a small team

---

### Q12





**Select all that apply.**

A modular monolith serves an MVP. Which statements describe realistic advantages?

- [ ] A. Development and debugging can be simpler for a small team
- [ ] B. Every module can always be scaled independently
- [ ] C. Calls between modules automatically gain network-level fault isolation
- [ ] D. It is one deployable unit

---

### Q13





**Select all that apply.**

A monolith now has slow builds, risky deployments, and six teams changing the same codebase. Which actions are reasonable?

- [ ] A. Extract services by technical layer even when domain ownership remains shared
- [ ] B. Define bounded contexts before extracting services
- [ ] C. Split every class into a separate network service immediately
- [ ] D. Plan migration and service ownership deliberately

---

### Q14





**Select all that apply.**

A company considers microservices so checkout can scale separately from reporting. Which trade-offs should it expect?

- [ ] A. Elimination of network latency
- [ ] B. More difficult distributed debugging and operations
- [ ] C. Independent scaling of services
- [ ] D. Automatic consistency across services without coordination

---

### Q15





**Select all that apply.**

A team processes sporadic file-upload events with long idle periods. Which serverless characteristics are relevant?

- [ ] A. Serverless is always ideal for long-running jobs
- [ ] B. Automatic scaling can suit bursty traffic
- [ ] C. Pay-per-invocation can reduce idle cost
- [ ] D. Cold starts guarantee lower latency than an already-running process

---

### Q16





**Select all that apply.**

An order event must trigger inventory, notifications, and analytics without tightly coupling producers to consumers. Which statements support an event-driven design?

- [ ] A. New consumers can subscribe without changing the producer
- [ ] B. Asynchronous events can loosen coupling
- [ ] C. Every consumer is guaranteed to process each event exactly once automatically
- [ ] D. The broker automatically guarantees global ordering and idempotency for every consumer

---

### Q17





**Select all that apply.**

A product owner expects all event consumers to show new data instantly. Which risks challenge that expectation?

- [ ] A. Events remove the need for failure handling
- [ ] B. Consumers may receive duplicate or out-of-order messages
- [ ] C. Event-driven pipelines commonly introduce eventual consistency
- [ ] D. Asynchronous consumers make end-to-end tracing automatic without correlation IDs

---

### Q18





**Select all that apply.**

An architecture document shows major services, their data flow, and external payment providers. Which statements are accurate?

- [ ] A. It must include every class and method
- [ ] B. It replaces the need to review trade-offs with stakeholders
- [ ] C. It should expose major dependencies and boundaries
- [ ] D. This is high-level design

---

### Q19





**Select all that apply.**

Engineers are preparing implementation details for an Order Service. Which artifacts belong in low-level design?

- [ ] A. Only the company-wide service map, with no component internals
- [ ] B. Table schemas and indexes
- [ ] C. Class interfaces and order-state algorithms
- [ ] D. A company-wide map containing only service boxes

---

### Q20





**Select all that apply.**

A document compares PostgreSQL with MongoDB, sizes each service, and specifies replicas across three availability zones. How should it be characterized?

- [ ] A. It contains detailed-design decisions
- [ ] B. It includes technology, capacity, and deployment choices
- [ ] C. It avoids implementation constraints by remaining technology-agnostic
- [ ] D. It is limited to class-level software design

---

### Q21





**Select all that apply.**

A regulated company is gradually moving from its own data center to a cloud provider. Which statements are accurate?

- [ ] A. Compliance and migration constraints should influence the design
- [ ] B. A hybrid deployment can combine on-premises and cloud systems
- [ ] C. On-premises means the cloud provider exclusively owns and operates all hardware
- [ ] D. Multi-cloud and hybrid always mean the same thing

---

### Q22





**Select all that apply.**

A read-heavy domain has complex writes and needs an audit trail. Which data patterns may be evaluated?

- [ ] A. CQRS to separate read and write models
- [ ] B. Event sourcing to store state changes as events
- [ ] C. A single database is forbidden in every early-stage system
- [ ] D. A shared schema for every service to guarantee independent ownership

---

### Q23





**Select all that apply.**

An internal tool serves 20 employees and can be rebuilt in a week. Which choices reflect proportionate design?

- [ ] A. Apply a lighter process because the change is low-impact and reversible
- [ ] B. Require multi-region microservices before launch
- [ ] C. Require separate services even when a monolith meets every requirement
- [ ] D. Keep the architecture simple

---

### Q24





**Select all that apply.**

A bank is replacing the system that records customer balances. Which signals justify substantial up-front design?

- [ ] A. The change affects money and core data
- [ ] B. A failed migration would be painful to reverse
- [ ] C. Only one button color changes
- [ ] D. Reliability and security risks are minor because balances are numeric

---

### Q25





**Select all that apply.**

A product will launch globally after a viral campaign and enterprise customers require an uptime SLA. Which considerations favor architecture work now?

- [ ] A. New regional latency and availability requirements
- [ ] B. Expected order-of-magnitude traffic growth
- [ ] C. Enterprise SLAs can be evaluated only after repeated production outages
- [ ] D. The absence of current scale problems proves no planning is needed

---

### Q26





**Select all that apply.**

A production service experiences repeated outages. Which questions should guide a reliability redesign?

- [ ] A. Are there single points of failure?
- [ ] B. Can the service degrade gracefully?
- [ ] C. Are redundancy, retries, and circuit breakers appropriate?
- [ ] D. Which logo color will reduce database load?

---

### Q27





**Select all that apply.**

A database is overloaded at peak time. Which changes are plausible design responses rather than guarantees?

- [ ] A. Cache frequently read data
- [ ] B. Add read replicas for suitable read traffic
- [ ] C. Use connection pooling to control database connections
- [ ] D. Add more client retries without limits

---

### Q28





**Select all that apply.**

A team skipped failure modeling and API contract design. Which later costs are plausible?

- [ ] A. Cascading outages
- [ ] B. Breaking changes for clients
- [ ] C. Automatic reduction in infrastructure cost
- [ ] D. Data corruption or inconsistent behavior during failures

---

### Q29





**Select all that apply.**

Which changes normally need only light architecture work?

- [ ] A. Building a short-lived prototype to validate demand
- [ ] B. Fixing a localized bug in a well-understood module
- [ ] C. Replacing the core data model for all customers
- [ ] D. Adding a field by following an established API pattern

---

### Q30





**Select all that apply.**

A system was designed last year. Which events should trigger revisiting that design?

- [ ] A. New failure modes appear in production
- [ ] B. Traffic crosses a planned scale threshold
- [ ] C. The original diagram already exists
- [ ] D. Requirements change significantly

---

### Q31





**Select all that apply.**

A team must choose between a fast expensive design and a slower inexpensive one. Which statements reflect sound system-design reasoning?

- [ ] A. Constraints can make different choices correct for different systems
- [ ] B. Always maximize performance regardless of cost
- [ ] C. Document what is sacrificed by each alternative
- [ ] D. Evaluate the choice against explicit latency and budget targets

---

### Q32





**Select all that apply.**

A company doubles every server “for reliability,” causing its bill to spike. Which conclusions are justified?

- [ ] A. Redundancy should be tied to failure and availability targets
- [ ] B. Capacity estimates help avoid blind over-provisioning
- [ ] C. More infrastructure always produces proportional reliability
- [ ] D. Cost is a first-class design constraint

---

### Q33





**Select all that apply.**

A service needs 99.9% availability and graceful behavior when recommendations fail. Which design goals follow?

- [ ] A. Treat every optional component failure as a total outage
- [ ] B. Add recovery or redundancy appropriate to the target
- [ ] C. Remove single points of failure where needed
- [ ] D. Allow the core experience to continue without recommendations

---

### Q34





**Select all that apply.**

A team is starting a URL shortener. Which requirements are functional?

- [ ] A. Keep redirect latency below 100 ms
- [ ] B. Optionally expire short URLs
- [ ] C. Create a short URL from a long URL
- [ ] D. Redirect a short URL to its original destination

---

### Q35





**Select all that apply.**

Which targets are non-functional requirements for the starter URL shortener?

- [ ] A. Let users delete their links
- [ ] B. Keep redirects under 100 ms
- [ ] C. Support 100 million created URLs
- [ ] D. Maintain 99.9% availability

---

### Q36





**Select all that apply.**

The URL shortener expects 100 million creations and 1 billion redirects per month. Which estimates are reasonable?

- [ ] A. About 40 writes per second on average
- [ ] B. About 400 reads per second on average
- [ ] C. Roughly a 10:1 read-to-write ratio
- [ ] D. About 40,000 writes per second on average

---

### Q37





**Select all that apply.**

Each URL record averages about 600 bytes. What follows for 100 million records?

- [ ] A. Metadata must be included in capacity planning
- [ ] B. The estimate proves sharding is required on day one
- [ ] C. One modern database can plausibly hold the starter dataset
- [ ] D. Raw storage is roughly 60 GB

---

### Q38





**Select all that apply.**

A design includes `POST /api/v1/urls` and `GET /{short_code}`. Which statements are correct?

- [ ] A. Both operations have identical read and write behavior
- [ ] B. Clear API contracts belong in the design deep dive
- [ ] C. The POST endpoint creates a short URL
- [ ] D. The GET path resolves a code and returns a redirect

---

### Q39





**Select all that apply.**

A team hashes each long URL and takes seven characters for the code. Which properties must it account for?

- [ ] A. The same input can produce the same candidate code
- [ ] B. Truncation can create collisions
- [ ] C. Collision handling can use a salt and retry
- [ ] D. Hashing guarantees no two URLs ever share a seven-character result

---

### Q40





**Select all that apply.**

A team chooses an auto-incrementing ID encoded in Base62. Which statements are accurate?

- [ ] A. Sequential IDs may reveal approximate URL volume
- [ ] B. Base62 uses lowercase letters, uppercase letters, and digits
- [ ] C. Unique IDs produce collision-free encoded values
- [ ] D. A single counter can never become a bottleneck

---

### Q41





**Select all that apply.**

A developer proposes random seven-character codes without querying storage. Which review comments are valid?

- [ ] A. Random generation is simple
- [ ] B. A unique database constraint can reject collisions
- [ ] C. Randomness mathematically eliminates collision risk
- [ ] D. The insert path should check or enforce uniqueness

---

### Q42





**Select all that apply.**

The URL table stores `short_code`, `long_url`, `expires_at`, and `is_active`. Which schema decisions support correctness and performance?

- [ ] A. Make `short_code` unique
- [ ] B. Index `short_code` because redirects look it up
- [ ] C. Omit the destination URL because Redis is permanent storage
- [ ] D. Store expiration or active state if those features are supported

---

### Q43





**Select all that apply.**

A redirect request misses Redis. Which cache-aside steps should follow?

- [ ] A. Generate a new short code for the existing request
- [ ] B. Return the redirect after resolving the destination
- [ ] C. Cache a valid result with an appropriate TTL
- [ ] D. Query the database by short code

---

### Q44





**Select all that apply.**

The shortener uses permanent destinations and wants to reduce repeat traffic. Why might it choose HTTP 301?

- [ ] A. It guarantees every click reaches the analytics server
- [ ] B. It is suitable when the destination is intended to remain stable
- [ ] C. Repeat clicks may avoid the service
- [ ] D. Browsers can cache the redirect

---

### Q45





**Select all that apply.**

A product allows link destinations to change and needs every click counted server-side. Which statements favor HTTP 302?

- [ ] A. It always creates less server load than 301
- [ ] B. It can suit destinations that may change
- [ ] C. Requests continue to reach the shortener
- [ ] D. Clients are less likely to treat the redirect as permanently cacheable

---

### Q46





**Select all that apply.**

Traffic is highly skewed toward popular short links. Which caching conclusions are reasonable?

- [ ] A. A TTL can limit stale entries
- [ ] B. Every stored URL must be cached for caching to help
- [ ] C. Caching a popular subset can serve a large fraction of requests
- [ ] D. Redis can reduce database reads on the redirect hot path

---

### Q47





**Select all that apply.**

At the starter scale, why can PostgreSQL plus Redis and a monolithic API be sensible?

- [ ] A. One hundred million URLs mandate six microservices
- [ ] B. A small team avoids premature distributed-system complexity
- [ ] C. Redis supports the read-heavy redirect path
- [ ] D. The structured dataset is manageable in PostgreSQL

---

### Q48





**Select all that apply.**

Redirect traffic grows 10× and the single API server saturates. Which next steps directly address application and read scaling?

- [ ] A. Add read replicas when database reads become the bottleneck
- [ ] B. Remove Redis to send all reads to the primary
- [ ] C. Put a load balancer before multiple stateless API servers
- [ ] D. Consider local or geo-distributed caches for hot links

---

### Q49





**Select all that apply.**

At much larger scale, writes and the central ID counter become bottlenecks. Which evolutions are plausible?

- [ ] A. Keep a single counter as an unavoidable permanent dependency
- [ ] B. Adopt a distributed ID generator
- [ ] C. Re-evaluate choices based on measured bottlenecks
- [ ] D. Shard URL records by a short-code hash range

---

### Q50





**Select all that apply.**

A reviewer says the starter shortener should include global sharding, multi-cloud deployment, and event sourcing immediately. Which responses reflect the course's design approach?

- [ ] A. More components always make the system more reliable and cheaper
- [ ] B. Preserve paths to add scaling mechanisms later
- [ ] C. Revisit the design as scale and failure modes change
- [ ] D. Start with components justified by current requirements
