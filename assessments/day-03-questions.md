# Core Infrastructure Components — MCQ Questions (50)

> **Answers and explanations:** see [answer-key/day-03-answers.md](./answer-key/day-03-answers.md)




---

### Q01





**Select all that apply.**

When a browser opens `https://shop.example.com/products` without a usable cache entry, which actions occur before the application can process the HTTP request?

- [ ] A. Complete TLS negotiation for HTTPS
- [ ] B. Paint the final page before contacting the server
- [ ] C. Resolve the hostname to an IP address
- [ ] D. Complete TLS negotiation before establishing any transport connection

---

### Q02





**Select all that apply.**

Which statements correctly describe the browser's initial handling of a URL?

- [ ] A. It checks HSTS rules that can require HTTPS
- [ ] B. It always queries the authoritative DNS server directly
- [ ] C. It must reuse an expired local cache entry without revalidation
- [ ] D. It parses the scheme, host, port, and path

---

### Q03





**Select all that apply.**

Which checks are part of validating a server's TLS certificate?

- [ ] A. The certificate is signed by a trusted certificate authority
- [ ] B. Certificate expiry and revocation are irrelevant after a trusted CA signs it
- [ ] C. The certificate's domain matches the requested hostname
- [ ] D. The server has the fewest active TCP connections

---

### Q04





**Select all that apply.**

Which statements about HTTP keep-alive and response compression are correct?

- [ ] A. Connection reuse requires a new transport handshake for every resource
- [ ] B. gzip or Brotli can reduce bytes transferred
- [ ] C. Keep-alive can reuse a TCP connection for additional resources
- [ ] D. Compression eliminates the need for TLS

---

### Q05





**Select all that apply.**

After HTML reaches the browser, which activities belong to the rendering path?

- [ ] A. Ask the database to construct the DOM
- [ ] B. Build the DOM from HTML
- [ ] C. Delegate layout and paint to the application's database server
- [ ] D. Build the CSSOM from CSS

---

### Q06





**Select all that apply.**

Which statements about DNS resolution are correct?

- [ ] A. A TLD server normally stores every application's database records
- [ ] B. A recursive resolver modifies authoritative records during each lookup
- [ ] C. Browser and operating-system caches can avoid a full lookup
- [ ] D. An authoritative DNS server is a source of truth for its domain

---

### Q07





**Select all that apply.**

Which DNS record descriptions are correct?

- [ ] A. An MX record specifies an HTTP reverse proxy
- [ ] B. A CNAME makes one name an alias of another name
- [ ] C. An AAAA record maps a name to an IPv6 address
- [ ] D. An A record maps a name directly to an IPv6 address

---

### Q08





**Select all that apply.**

What are consequences of choosing a low DNS TTL?

- [ ] A. Infrastructure changes take longer to reach newly resolving clients
- [ ] B. Health-checked failover can take effect sooner for newly resolving clients
- [ ] C. Every cached client switches endpoints instantaneously
- [ ] D. Recursive resolvers generally perform more queries

---

### Q09





**Select all that apply.**

Which capabilities can DNS contribute to a production architecture?

- [ ] A. Inspect an HTTP request body and reject SQL injection
- [ ] B. Decrypt and inspect HTTPS request bodies to choose an endpoint
- [ ] C. Provide basic distribution by returning multiple addresses
- [ ] D. Redirect resolution to a standby endpoint during failover

---

### Q10





**Select all that apply.**

During a server migration, which practices reduce the risk that users keep reaching the old server?

- [ ] A. Increase the TTL immediately before changing the address
- [ ] B. Assume every cache discards the old answer immediately, regardless of TTL
- [ ] C. Update records at the authoritative DNS provider
- [ ] D. Lower the relevant TTL before the migration

---

### Q11





**Select all that apply.**

Which are core responsibilities commonly handled by a load balancer?

- [ ] A. Route every request permanently to the same backend regardless of health
- [ ] B. Permanently store all application business data
- [ ] C. Remove unhealthy servers from rotation
- [ ] D. Support controlled draining during deployments

---

### Q12





**Select all that apply.**

Which statements distinguish Layer 4 and Layer 7 load balancing?

- [ ] A. Layer 7 can route `/api/*` and `/images/*` to different pools
- [ ] B. Layer 4 must parse cookies to select a backend
- [ ] C. Layer 4 routing selects backends by parsing HTTP paths
- [ ] D. Layer 7 routing can use HTTP paths and headers

---

### Q13





**Select all that apply.**

Which algorithm-to-workload matches are appropriate?

- [ ] A. IP hash guarantees perfectly even load across all backends
- [ ] B. Plain round robin guarantees equal CPU utilization for unequal servers
- [ ] C. Weighted round robin for backends with different capacities
- [ ] D. Least connections for workloads with long-lived connections

---

### Q14





**Select all that apply.**

Which statements about load-balancer health checks are correct?

- [ ] A. A deep health check should ignore required dependency failures
- [ ] B. A timed-out backend should continue receiving normal traffic
- [ ] C. A TCP check can verify that a port accepts connections
- [ ] D. An HTTP check can verify that an application endpoint responds

---

### Q15





**Select all that apply.**

Why are stateless application servers with a shared session store often preferred over sticky sessions?

- [ ] A. They make load-balancer health checks unnecessary
- [ ] B. Shared session state makes scaling and load distribution less flexible
- [ ] C. Requests can be routed to any healthy instance
- [ ] D. Failed instances do not strand in-memory session state

---

### Q16





**Select all that apply.**

Which functions are commonly provided by a reverse proxy?

- [ ] A. Terminate TLS and compress responses
- [ ] B. Publish every internal backend address directly to clients
- [ ] C. Route requests by path to different upstreams
- [ ] D. Replace authoritative DNS for the domain

---

### Q17





**Select all that apply.**

Which statements correctly compare a forward proxy and a reverse proxy?

- [ ] A. A forward proxy represents clients to destination servers
- [ ] B. A reverse proxy represents clients to arbitrary destination servers
- [ ] C. A reverse proxy can keep backend servers on a private network
- [ ] D. Both terms mean that the database directly accepts public traffic

---

### Q18





**Select all that apply.**

What benefits can request buffering at a reverse proxy provide?

- [ ] A. Shield a backend from a client that uploads very slowly
- [ ] B. Require the proxy to forward every byte immediately without buffering
- [ ] C. Reduce how long a backend connection is occupied by a slow client
- [ ] D. Guarantee that every backend operation is idempotent

---

### Q19





**Select all that apply.**

Which proxy headers help preserve original request context?

- [ ] A. `Content-Length` identifies the authoritative DNS server
- [ ] B. `X-Forwarded-Proto` can identify the client's original scheme
- [ ] C. `X-Forwarded-For` cryptographically proves the originating client IP
- [ ] D. Correct forwarded scheme information can prevent redirect loops

---

### Q20





**Select all that apply.**

Which features make an API gateway a specialized reverse proxy?

- [ ] A. API authentication and API-key enforcement
- [ ] B. Request or response transformation
- [ ] C. Physical disk partitioning for relational tables
- [ ] D. Physical rack power management for database servers

---

### Q21





**Select all that apply.**

Which outcomes are typical benefits of a CDN?

- [ ] A. Reduced static-content traffic to the origin
- [ ] B. Strong consistency for every personalized database read
- [ ] C. Lower latency by serving content from nearby edge locations
- [ ] D. Guaranteed absorption of every DDoS attack regardless of size

---

### Q22





**Select all that apply.**

What happens on a pull CDN cache miss?

- [ ] A. The edge must discard the returned object even when policy permits caching
- [ ] B. The origin is permanently removed from future deployments
- [ ] C. The requesting user receives the object after origin retrieval
- [ ] D. The edge requests the object from the origin

---

### Q23





**Select all that apply.**

Which content is generally well suited to long-lived CDN caching?

- [ ] A. A personalized account dashboard containing private data
- [ ] B. Public images and fonts must never be cached at an edge
- [ ] C. Versioned CSS files
- [ ] D. Content-hashed JavaScript bundles

---

### Q24





**Select all that apply.**

Which techniques help prevent stale static assets after a deployment?

- [ ] A. Publish every new build under the same immutable asset URL
- [ ] B. Reuse `/static/app.js` forever with an immutable one-year cache policy
- [ ] C. Purge or invalidate obsolete CDN entries when necessary
- [ ] D. Put a content hash or version in asset filenames

---

### Q25





**Select all that apply.**

Which statements about CDN architecture are correct?

- [ ] A. Every edge is the system's transactional source of truth
- [ ] B. An origin is the source from which cacheable content is fetched
- [ ] C. Anycast requires a unique public IP for every edge location
- [ ] D. A point of presence is an edge location near a group of users

---

### Q26





**Select all that apply.**

Which statements describe the cache-aside pattern?

- [ ] A. The application checks the cache before querying the database
- [ ] B. On a miss, the application loads data and stores it with a TTL
- [ ] C. The cache automatically owns all database loading without application logic
- [ ] D. Writes should update or invalidate affected cached entries

---

### Q27





**Select all that apply.**

Which caching-pattern descriptions are correct?

- [ ] A. Write-through synchronously updates cache and database
- [ ] B. Write-behind flushes cached writes to the database asynchronously
- [ ] C. Read-through requires every application caller to query the database first
- [ ] D. Refresh-ahead renews hot data before users encounter expiry

---

### Q28





**Select all that apply.**

Which factors support caching a value?

- [ ] A. It is never reused and is cheap to retrieve
- [ ] B. It changes slowly enough for the chosen freshness policy
- [ ] C. It is expensive to fetch or compute
- [ ] D. It is read frequently

---

### Q29





**Select all that apply.**

Which mitigations address a cache stampede when a popular key expires?

- [ ] A. Delete the entire cache whenever the key becomes popular
- [ ] B. Allow only one request to rebuild the value while others wait
- [ ] C. Stagger refresh times with probabilistic early expiration
- [ ] D. Refresh hot keys in the background before expiry

---

### Q30





**Select all that apply.**

Which statements correctly identify cache failure modes and mitigations?

- [ ] A. Stale data can be reduced with write invalidation or shorter TTLs
- [ ] B. Cache penetration can be reduced by briefly caching empty results
- [ ] C. A longer TTL always guarantees fresher data
- [ ] D. Cache avalanche risk can be reduced with redundant cache nodes and circuit breakers

---

### Q31





**Select all that apply.**

Before introducing database sharding, which measures should usually be considered?

- [ ] A. Reuse connections through connection pooling
- [ ] B. Split data across shards before measuring any bottleneck
- [ ] C. Optimize slow queries and add appropriate indexes
- [ ] D. Add caching to offload repeated reads

---

### Q32





**Select all that apply.**

Which statements about read replicas are correct?

- [ ] A. Asynchronous replication can return slightly stale data
- [ ] B. Replicas can distribute read traffic
- [ ] C. The primary commonly accepts writes
- [ ] D. Adding replicas automatically scales primary write throughput

---

### Q33





**Select all that apply.**

Which approaches can protect read-your-writes behavior when replicas lag?

- [ ] A. Route a user's immediate post-write reads to the primary
- [ ] B. Use synchronous replication for reads that require stronger freshness
- [ ] C. Send the original write only to an asynchronous replica
- [ ] D. Monitor replication lag and choose routing accordingly

---

### Q34





**Select all that apply.**

What are benefits of database connection pooling?

- [ ] A. Remove the need to optimize slow SQL queries
- [ ] B. Reuse established database connections
- [ ] C. Reduce repeated connection-setup overhead
- [ ] D. Limit the number of concurrent connections reaching the database

---

### Q35





**Select all that apply.**

Which properties make a shard key effective?

- [ ] A. It distributes traffic and data reasonably evenly
- [ ] B. It supports common request-routing patterns
- [ ] C. It avoids sending all current writes to one shard
- [ ] D. It guarantees that cross-shard joins are free

---

### Q36





**Select all that apply.**

Which trade-offs are introduced by sharding?

- [ ] A. Write load can be distributed across database nodes
- [ ] B. Rebalancing data becomes an operational concern
- [ ] C. Shard-key selection no longer matters
- [ ] D. Cross-shard queries become harder

---

### Q37





**Select all that apply.**

Which statements describe a message queue?

- [ ] A. A queue can absorb a traffic burst while workers process steadily
- [ ] B. Producers can submit work without waiting for consumers to finish
- [ ] C. A queue guarantees that every task completes exactly once without application design
- [ ] D. Persisted messages can survive a worker restart

---

### Q38





**Select all that apply.**

Which workload-to-messaging-model matches are appropriate?

- [ ] A. Direct synchronous API calls when the consumer may remain unavailable for hours
- [ ] B. Pub/sub when several services must react to one event
- [ ] C. Log-based stream when consumers need independent offsets and replay
- [ ] D. Point-to-point queue for distributing independent jobs among workers

---

### Q39





**Select all that apply.**

Which practices make queue consumers safer under retries?

- [ ] A. Include a unique message identifier
- [ ] B. Assume acknowledgment always occurs before any side effect
- [ ] C. Record or detect already-processed messages
- [ ] D. Make processing idempotent

---

### Q40





**Select all that apply.**

How should a system handle a message that repeatedly fails processing?

- [ ] A. Move it to a dead letter queue after a bounded number of attempts
- [ ] B. Retry it in a tight loop forever without limits
- [ ] C. Alert or expose the dead letter queue for investigation
- [ ] D. Retry with increasing backoff

---

### Q41





**Select all that apply.**

Which message-design practices are useful?

- [ ] A. Version schemas as message contracts evolve
- [ ] B. Include an event type so consumers can route the message
- [ ] C. Omit identifiers because duplicate delivery cannot occur
- [ ] D. Store large files externally and pass a reference

---

### Q42





**Select all that apply.**

Which signals indicate that a worker fleet may need to scale horizontally?

- [ ] A. The queue is consistently empty and workers are mostly idle
- [ ] B. Producers enqueue faster than consumers complete work
- [ ] C. Oldest-message age keeps increasing
- [ ] D. Queue depth keeps increasing

---

### Q43





**Select all that apply.**

Which characteristics define well-bounded microservices?

- [ ] A. Services can be deployed independently
- [ ] B. Services are split only into controller, validation, and database technical layers
- [ ] C. A service owns its data rather than sharing tables freely
- [ ] D. Each service represents a business capability

---

### Q44





**Select all that apply.**

Which are potential benefits of microservices when organizational scale justifies them?

- [ ] A. Independently scale a hot business capability
- [ ] B. Eliminate network and operational complexity
- [ ] C. Deploy one service without redeploying the whole application
- [ ] D. Give teams end-to-end ownership of services

---

### Q45





**Select all that apply.**

Which are real costs of a microservices architecture?

- [ ] A. All operations can use one local ACID transaction
- [ ] B. Distributed tracing is often needed for debugging
- [ ] C. Network calls require timeouts and failure handling
- [ ] D. Cross-service data consistency becomes harder

---

### Q46





**Select all that apply.**

Which statements about workers are correct?

- [ ] A. Queue workers process tasks outside the synchronous request path
- [ ] B. Scheduled workers can run reports or cleanup at specified times
- [ ] C. Stream processors can aggregate events from a log
- [ ] D. Every worker must expose a public HTTP endpoint

---

### Q47





**Select all that apply.**

When is asynchronous service communication a good fit?

- [ ] A. Temporary consumer unavailability should not block the producer
- [ ] B. The caller requires an immediate authorization decision before proceeding
- [ ] C. The caller need not receive the final result immediately
- [ ] D. Multiple services should react independently to an event

---

### Q48





**Select all that apply.**

Which actions belong to a saga that coordinates an order and payment across services?

- [ ] A. Confirm the order on success or run a compensating action on failure
- [ ] B. Create an order in a pending state
- [ ] C. Invoke the payment step
- [ ] D. Hold one database transaction open across all independent services

---

### Q49





**Select all that apply.**

Which conditions can justify extracting a service from a monolith?

- [ ] A. Team ownership conflicts repeatedly occur around the same domain
- [ ] B. The application is an early MVP with no demonstrated scaling or team pain
- [ ] C. One domain needs a substantially different scaling profile
- [ ] D. A module needs an independent release cadence

---

### Q50





**Select all that apply.**

Which end-to-end infrastructure choices correctly match their roles?

- [ ] A. Use a CDN for cacheable static assets near users
- [ ] B. Use a load balancer or reverse proxy to route traffic to healthy application instances
- [ ] C. Use DNS as the durable store for transactional order records
- [ ] D. Use a queue and workers for slow background tasks
