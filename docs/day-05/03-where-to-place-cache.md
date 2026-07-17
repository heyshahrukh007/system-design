# Where Should Cache Be Placed?

[← What Is a Cache](./02-what-is-a-cache.md) | [Day 5 Index](./README.md) | [Next: What to Cache →](./04-what-to-cache.md)

## The Full Stack

Caching can happen at **every layer** between the user and the database. Each layer catches what the layer above missed.

```
User
  │
  ▼
Browser Cache          ← cached on user's device
  │
  ▼
CDN                    ← cached at edge, near user
  │
  ▼
Load Balancer          ← rarely caches (usually passes through)
  │
  ▼
Reverse Proxy          ← Nginx/Varnish cache (optional)
  │
  ▼
App Server             ← in-process cache (local RAM)
  │
  ▼
Distributed Cache      ← Redis / Memcached (shared RAM)
  │
  ▼
Database               ← buffer pool (internal cache)
  │
  ▼
Disk                   ← source of truth on persistent storage
```

**Rule:** Answer as **close to the user** as possible. Browser hit beats Redis hit beats DB query.

---

## Layer 1 — Browser Cache

Stored on the user's device. Fastest — no network at all.

```
Second visit to same CSS file:
  → browser serves from disk cache
  → 0 network requests
```

Controlled by HTTP headers from your server:

```http
Cache-Control: public, max-age=31536000    # cache 1 year
Cache-Control: no-cache, no-store            # never cache
ETag: "abc123"                               # revalidate if changed
```

| Good For | Bad For |
|----------|---------|
| Static assets (JS, CSS, images) | Personalized API responses |
| Fonts, logos | Sensitive user data |
| Versioned files (`app.v2.js`) | HTML that changes often |

See [Day 3: Browser](../day-03/01-request-journey.md#step-2--browser) and [Day 3: CDN](../day-03/05-cdn.md).

---

## Layer 2 — CDN Cache

Cached on edge servers worldwide. See [Day 3: CDN](../day-03/05-cdn.md).

```
User in Tokyo → Tokyo edge has logo.png → 10 ms
User in London → London edge has logo.png → 10 ms
Origin server in US → never touched
```

Best for: static files, public images, video, cacheable API responses.

---

## Layer 3 — Load Balancer

Load balancers **usually don't cache** — they distribute traffic.

Exception: some L7 load balancers (AWS CloudFront + ALB) or when LB embeds caching features.

```
Typical: LB → pass through to backend
Rare:    LB with built-in response cache for static routes
```

---

## Layer 4 — Reverse Proxy Cache

Nginx, Varnish, or HAProxy cache responses **before** they hit app servers.

```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m;

location /api/public/stats {
    proxy_cache api_cache;
    proxy_cache_valid 200 5m;
    proxy_pass http://backend;
}
```

| Good For | Detail |
|----------|--------|
| Public API responses | Same response for all users |
| Static HTML pages | Blog posts, marketing pages |
| Offloading app servers | Nginx serves cached JSON directly |

---

## Layer 5 — Application / In-Process Cache

Cache inside the app server's memory. **Not shared** across instances.

```python
# Python functools.lru_cache or local dict
@lru_cache(maxsize=1000)
def get_config(key):
    return db.query("SELECT value FROM config WHERE key = ?", key)
```

| Pros | Cons |
|------|------|
| Fastest possible (no network) | Each app instance has its own copy |
| No extra infrastructure | Invalidation hard across fleet |
| Good for config, enums | Memory per instance |

Use for **read-only, small, identical** data on all servers.

---

## Layer 6 — Distributed Cache (Redis / Memcached)

**Shared** cache all app servers talk to. The main application-level cache.

```
App Server 1 ──┐
App Server 2 ──┼──▶ Redis (centralized)
App Server 3 ──┘
```

| Good For | Detail |
|----------|--------|
| Session data | Shared login state |
| Product catalog | Hot DB query results |
| Rate limiting counters | Shared count across servers |
| Leaderboards | Real-time sorted sets (Redis) |

Covered in depth in [10-distributed-cache.md](./10-distributed-cache.md).

---

## Layer 7 — Database Cache

Two internal caches inside the database itself:

### Buffer Pool (Page Cache)

Hot **data pages** kept in RAM. See [Day 4: Storage Basics](../day-04/01-storage-basics.md).

```
Query needs row → page in buffer pool? → fast
                → page on disk? → slow read, then cached
```

You don't configure this directly — but indexes and query design affect hit rate.

### Query Cache (Legacy)

MySQL query cache (removed in MySQL 8.0) cached full query results. Modern apps use Redis instead.

---

## Request Flow Example

```
GET /static/app.js
  → Browser cache HIT → done (0 ms)

GET /images/hero.jpg
  → Browser MISS → CDN HIT → done (15 ms)

GET /api/products?page=1
  → Browser MISS → CDN MISS → Nginx MISS
  → App checks Redis HIT → done (2 ms)

GET /api/user/profile (personalized)
  → All edge caches MISS
  → Redis HIT → done (2 ms)

GET /api/user/profile (first visit)
  → Redis MISS → PostgreSQL → store Redis → done (40 ms)
```

---

## Choosing the Right Layer

| Data | Best Layer |
|------|------------|
| `logo.png`, `style.css` | Browser + CDN (long TTL) |
| Public product list API | CDN or Redis (short TTL) |
| User session | Redis (distributed) |
| User profile | Redis (short TTL, invalidate on update) |
| App config | In-process + Redis |
| Bank balance for transfer | **No cache** — read DB directly |
| Search results | Redis or Elasticsearch |

---

## Summary

Cache at **every layer** that can answer without hitting origin: browser → CDN → reverse proxy → in-process → Redis → DB buffer pool. Closer to the user = faster and less backend load. Match the layer to data sensitivity and sharing needs.

---

[Next: What to Cache →](./04-what-to-cache.md)
