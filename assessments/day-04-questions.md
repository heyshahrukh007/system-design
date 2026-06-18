# Day 4 — MCQ Questions (14)

Multi-select format: each question has **two or more** correct answers.

---

### Q01 [Easy] — Request Path Order

**Select all that apply.**

Which steps occur in the correct order when Alice visits `https://shop.example.com/products`?

- [ ] A. Browser parses URL → DNS lookup → TCP handshake
- [ ] B. TLS handshake → HTTPS request → load balancer
- [ ] C. Backend/database → response → browser render
- [ ] D. Browser render → DNS lookup → TCP handshake

**Answer:** A, B, C

**Explanation:** The chain is browser → DNS → TCP → TLS → HTTP → LB → web server → backend → response → render. Render happens last, not before DNS (D).

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q02 [Easy] — Browser Cache Layers

**Select all that apply.**

Which browser cache layers are listed in the scenario?

- [ ] A. Memory cache — recently visited pages
- [ ] B. Disk cache — HTML, CSS, JS, images
- [ ] C. Service Worker — offline-capable apps
- [ ] D. Redis cache — browser-local key-value store

**Answer:** A, B, C

**Explanation:** Memory, disk, and Service Worker caches are browser layers. Redis is an application/server cache, not a browser layer (D).

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q03 [Easy] — DNS Records

**Select all that apply.**

Which DNS record types are relevant in the website visit scenario?

- [ ] A. A record — domain to IPv4 address
- [ ] B. AAAA record — domain to IPv6 address
- [ ] C. CNAME — alias to another domain
- [ ] D. TTL — how long to cache the answer

**Answer:** A, B, C, D

**Explanation:** All four appear in the DNS section of the scenario walkthrough.

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q04 [Easy] — TCP Three-Way Handshake

**Select all that apply.**

Which packets are part of the TCP three-way handshake?

- [ ] A. SYN — client initiates connection
- [ ] B. SYN-ACK — server accepts and responds
- [ ] C. ACK — client confirms; connection open
- [ ] D. FIN-ACK — first step of every new connection

**Answer:** A, B, C

**Explanation:** SYN, SYN-ACK, and ACK establish the connection. FIN-ACK is for closing connections, not the initial handshake (D).

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q05 [Easy] — TLS Certificate Checks

**Select all that apply.**

What does the browser verify during TLS certificate validation?

- [ ] A. Certificate signed by a trusted CA
- [ ] B. Domain matches the URL (e.g., `shop.example.com`)
- [ ] C. Certificate is not expired
- [ ] D. Certificate matches the server's RAM size

**Answer:** A, B, C

**Explanation:** CA signature, domain match, expiry, and revocation are checked. RAM size is irrelevant to TLS validation (D).

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q06 [Medium] — Load Balancer Responsibilities

**Select all that apply.**

What does the load balancer do in this scenario?

- [ ] A. Distribute traffic (round-robin, least connections, IP hash)
- [ ] B. Health checks — stop sending traffic to dead servers
- [ ] C. SSL termination — decrypt HTTPS, forward HTTP internally
- [ ] D. Execute SQL queries against PostgreSQL directly

**Answer:** A, B, C

**Explanation:** LB distributes, health-checks, and may terminate SSL. SQL queries run in backend services, not the load balancer (D).

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q07 [Medium] — Backend Cache-Aside

**Select all that apply.**

For `/products`, which cache-aside steps are described?

- [ ] A. Check Redis key `products:page:1` first
- [ ] B. Cache HIT → return cached JSON (~5ms)
- [ ] C. Cache MISS → query DB, store in cache (~50ms)
- [ ] D. Always query DB first; never use cache for product lists

**Answer:** A, B, C

**Explanation:** The backend checks Redis first; HIT is fast, MISS queries PostgreSQL and populates cache. Caching is explicitly used (D is false).

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q08 [Medium] — HTTP Response Headers

**Select all that apply.**

Which response header meanings are correctly described?

- [ ] A. `Content-Type: text/html` — browser renders as HTML
- [ ] B. `Content-Encoding: gzip` — body is compressed
- [ ] C. `Cache-Control: max-age=60` — browser may cache 60 seconds
- [ ] D. `Set-Cookie` with `HttpOnly; Secure` — session cookie stored securely

**Answer:** A, B, C, D

**Explanation:** All four header explanations match the response section.

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q09 [Medium] — Browser Rendering Pipeline

**Select all that apply.**

Which steps are part of the browser rendering pipeline?

- [ ] A. Parse HTML → build DOM tree
- [ ] B. Parse CSS → build CSSOM tree
- [ ] C. Build render tree → layout → paint → composite
- [ ] D. DNS lookup → TLS handshake → paint

**Answer:** A, B, C

**Explanation:** DOM, CSSOM, render tree, layout, paint, and composite are rendering steps. DNS and TLS happen before rendering (D mixes network with render).

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q10 [Medium] — Render-Blocking Resources

**Select all that apply.**

Which resources can block rendering per the scenario?

- [ ] A. CSS — browser waits (render-blocking)
- [ ] B. JS without defer/async — blocks HTML parsing
- [ ] C. Images — block entire page paint until all load
- [ ] D. Images — page shows; images fill in later (non-blocking)

**Answer:** A, B, D

**Explanation:** CSS and synchronous JS block rendering. Images do not block the full page — layout shows while images load (C contradicts D).

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q11 [Hard] — Steps Before Backend

**Select all that apply.**

Which steps occur **before** the HTTP request reaches the backend application server?

- [ ] A. DNS resolution
- [ ] B. TCP three-way handshake
- [ ] C. TLS handshake and certificate verification
- [ ] D. Load balancer routing to a web server

**Answer:** A, B, C, D

**Explanation:** All network and front-door steps (DNS, TCP, TLS, LB, web server routing) precede the application backend handling business logic.

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q12 [Hard] — Failure Scenarios

**Select all that apply.**

Which failure-and-experience pairings are from the "What Can Go Wrong?" table?

- [ ] A. DNS domain expired → "Site can't be reached"
- [ ] B. TLS expired certificate → security warning
- [ ] C. All LB backends unhealthy → 503 Service Unavailable
- [ ] D. Backend database timeout → 404 Not Found

**Answer:** A, B, C

**Explanation:** DNS, TLS, and LB failures match the table. Database timeout causes 500 Internal Server Error, not 404 (D).

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q13 [Hard] — Typical Timings

**Select all that apply.**

Which timing ranges match the timeline summary?

- [ ] A. DNS lookup: 20–120ms (typical)
- [ ] B. TLS handshake: 40–200ms
- [ ] C. Backend + database: 50–300ms
- [ ] D. Total first meaningful paint: ~500ms – 2s

**Answer:** A, B, C, D

**Explanation:** All four ranges appear in the timeline summary table.

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)

---

### Q14 [Hard] — Mapping to System Design Concepts

**Select all that apply.**

Which Day 2 concepts appear in the website visit scenario?

- [ ] A. HLD — load balancer → web server → backend services
- [ ] B. Caching — DNS cache, Redis, browser cache, CDN
- [ ] C. Security — HTTPS, TLS certificates, HttpOnly cookies
- [ ] D. Observability — access logs and latency metrics per layer

**Answer:** A, B, C, D

**Explanation:** The "How This Maps to System Design" table links all four concepts (plus scalability, performance, reliability) to steps in the scenario.

**Source:** [docs/day-04/01-visit-website-scenario.md](../docs/day-04/01-visit-website-scenario.md)
