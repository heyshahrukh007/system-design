# Day 3 — Core Infrastructure Components

Start with the full request journey, then go deep on each building block — what it is, why it exists, how it works, and when to use it.

These pieces show up in almost every production web system.

## Topics

| # | Component | File |
|---|-----------|------|
| 1 | [Request Journey](./01-request-journey.md) | What happens when you visit a website |
| 2 | [DNS](./02-dns.md) | Domain names → IP addresses |
| 3 | [Load Balancer](./03-load-balancer.md) | Distribute traffic across servers |
| 4 | [Reverse Proxy](./04-reverse-proxy.md) | Front door for backend servers |
| 5 | [CDN](./05-cdn.md) | Serve content from the edge |
| 6 | [Caching](./06-caching.md) | Store hot data for fast reads |
| 7 | [DB Scaling](./07-db-scaling.md) | Grow databases under load |
| 8 | [Queue](./08-queue.md) | Async work and decoupling |
| 9 | [Microservices & Workers](./09-microservices-and-workers.md) | Split services, background jobs |

## How They Connect

```
User
  │
  ▼
DNS ──▶ Load Balancer / Reverse Proxy ──▶ Web / API Servers
              │                                    │
              ▼                                    ├──▶ Cache
            CDN (static assets)                    ├──▶ Queue ──▶ Workers
                                                   └──▶ DB (scaled)
```

## Reading Order

Read 1 → 9 in sequence. Topic 1 is the story; 2–9 are the deep dives along that path.

## Related

- [Day 2: Scalability Design](../day-02/05-scalability-design.md)
- [Day 2: Performance Design](../day-02/10-performance-design.md)
- [Day 4: Database Internals](../day-04/README.md)
