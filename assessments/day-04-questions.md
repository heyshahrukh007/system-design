# Website Request Lifecycle — MCQ Questions (14)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-04-answers.md](./answer-key/day-04-answers.md)

---

### Q01 [Easy] — Tracing a Shopper's Click


**Select all that apply.**

A user types `https://shop.example.com/products` and presses Enter (first visit, cache miss). Which steps occur in the correct order before the page renders?

- [ ] A. Browser parses URL → DNS resolves hostname → TCP handshake
- [ ] B. TLS negotiation → HTTP GET request → load balancer picks a server
- [ ] C. Backend loads data → HTML response → browser builds DOM and paints
- [ ] D. Browser paints the page → DNS lookup → TCP handshake

---

### Q02 [Easy] — Browser-Side Caching on Repeat Visits


**Select all that apply.**

Which storage layers can a modern browser use to avoid network requests?

- [ ] A. Memory cache for recently visited pages
- [ ] B. Disk cache for HTML, CSS, JS, and images
- [ ] C. Service Worker cache for offline-capable apps
- [ ] D. Server-side Redis as part of the browser process

---

### Q03 [Easy] — DNS Records for a Storefront


**Select all that apply.**

You configure DNS for `shop.example.com` pointing shoppers to your origin. Which record types are relevant?

- [ ] A. A record — hostname to IPv4 address
- [ ] B. AAAA record — hostname to IPv6 address
- [ ] C. CNAME — alias pointing to another hostname
- [ ] D. TTL — how long resolvers cache the answer

---

### Q04 [Easy] — Establishing a Secure Connection


**Select all that apply.**

Which messages belong to the TCP three-way handshake before HTTPS data flows?

- [ ] A. SYN — client initiates connection
- [ ] B. SYN-ACK — server acknowledges and responds
- [ ] C. ACK — client confirms; connection is open
- [ ] D. FIN-ACK — required first packet of every new session

---

### Q05 [Easy] — TLS Certificate Validation Failures


**Select all that apply.**

Before sending cookies and payment data, the browser validates the server's TLS certificate. Which checks does it perform?

- [ ] A. Certificate chain trusted by a known CA
- [ ] B. Certificate domain matches `shop.example.com`
- [ ] C. Certificate is within its validity period
- [ ] D. Certificate matches the server's RAM capacity

---

### Q06 [Medium] [Case Study] — 503 During ShopExample Flash Sale


**Context:** ShopExample runs three web servers behind an ALB. During a flash sale, users see `503 Service Unavailable`. CloudWatch shows two servers failing `/health` checks after a bad deploy; the third is at 99% CPU. TLS terminates at the load balancer.

**Select all that apply.**

Which load balancer responsibilities are relevant to this incident?

- [ ] A. Distribute traffic using round-robin or least-connections
- [ ] B. Remove unhealthy backends from the pool via health checks
- [ ] C. Terminate SSL/TLS and forward plain HTTP internally
- [ ] D. Execute SQL queries against PostgreSQL on behalf of shoppers

---

### Q07 [Medium] [Case Study] — Slow Product Page Backend


**Context:** ShopExample's `/products` page is slow. Traces show the app checks Redis key `products:page:1` first. Hit rate is 30%; misses run a PostgreSQL query averaging 180ms. Product data changes every few minutes.

**Select all that apply.**

Which cache-aside behaviors should the backend implement?

- [ ] A. On cache HIT — return cached JSON immediately
- [ ] B. On cache MISS — query DB, store result in Redis, then return
- [ ] C. Always skip cache to guarantee freshest data on every request
- [ ] D. Use a cache key like `products:page:1` for paginated lists

---

### Q08 [Medium] — HTTP Response Headers Shoppers Rely On


**Select all that apply.**

ShopExample returns HTML for `/products`. Which response headers affect browser behavior?

- [ ] A. `Content-Type: text/html` — interpret body as HTML
- [ ] B. `Content-Encoding: gzip` — decompress body before parsing
- [ ] C. `Cache-Control: max-age=60` — browser may reuse response for 60 seconds
- [ ] D. `Set-Cookie` with `HttpOnly; Secure` — store session cookie safely

---

### Q09 [Medium] — Why the Page Is Not Visible Immediately


**Select all that apply.**

Which steps are part of the browser rendering pipeline after HTML arrives?

- [ ] A. Parse HTML into a DOM tree
- [ ] B. Parse CSS into a CSSOM tree
- [ ] C. Build render tree → layout → paint → composite
- [ ] D. DNS lookup → TLS handshake → paint pixels

---

### Q10 [Medium] — Render-Blocking Resources


**Select all that apply.**

ShopExample's HTML references CSS, synchronous JS, and product images. Which resources can delay first paint?

- [ ] A. CSS — browser waits for styles before painting
- [ ] B. JavaScript without `defer`/`async` — blocks HTML parsing
- [ ] C. Images — typically do not block the entire page shell
- [ ] D. Images — always block all painting until every byte loads

---

### Q11 [Hard] [Case Study] — Where the Request Spends Time


**Context:** A shopper's first visit to `shop.example.com/products` shows a blank screen for 1.2s. APM shows: DNS 80ms, TCP+TLS 150ms, LB 3ms, backend 420ms, transfer 90ms, render+assets 500ms. No browser cache yet.

**Select all that apply.**

Which steps complete **before** the HTTP request reaches the backend application server?

- [ ] A. DNS resolution to an IP address
- [ ] B. TCP three-way handshake and TLS certificate verification
- [ ] C. Load balancer routing to a healthy web server
- [ ] D. PostgreSQL query for product rows

---

### Q12 [Hard] [Case Study] — ShopExample Outage Triage


**Context:** Support tickets spike. Users report different errors: some see certificate warnings, others `503`, others a blank page for 30s then `500 Internal Server Error`. The incident commander needs a layer-by-layer map.

**Select all that apply.**

Which failure-to-symptom pairings are plausible?

- [ ] A. Expired TLS certificate → browser security warning
- [ ] B. All load balancer backends unhealthy → `503 Service Unavailable`
- [ ] C. Database query timeout in backend → `500 Internal Server Error`
- [ ] D. Database timeout → `404 Not Found` to the shopper

---

### Q13 [Hard] — Latency Budget for First Meaningful Paint


**Select all that apply.**

ShopExample targets ~500ms–2s for first meaningful paint on a cold visit. Which typical timing ranges are realistic for individual layers?

- [ ] A. DNS lookup — roughly 20–120ms when cached locally
- [ ] B. TLS handshake — roughly 40–200ms
- [ ] C. Backend + database — roughly 50–300ms
- [ ] D. Total first meaningful paint — often ~500ms–2s end-to-end

---

### Q14 [Hard] [Case Study] — Engineering Practices in One Page Load


**Context:** Alice loads `https://shop.example.com/products` on a cold visit. The path touches DNS cache miss, TLS, ALB health checks, Nginx routing, Redis cache-aside, PostgreSQL, gzip response, CDN for images, and browser critical rendering path.

**Select all that apply.**

Which system design capabilities are actively exercised during this single page load?

- [ ] A. Layered caching — browser, CDN, Redis, and DNS cache
- [ ] B. Security — HTTPS, TLS verification, HttpOnly session cookies
- [ ] C. Reliability — load balancer health checks and multiple web servers
- [ ] D. Observability — access logs and latency metrics at each tier
