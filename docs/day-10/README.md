# Day 10 — Classic System Design Problems

You have the building blocks — DNS, load balancers, databases, caches, queues, reliability patterns, gateways, and observability. Today you apply them to real systems people build in production: URL shorteners, feeds, chat, storage, streaming, and more.

See also: [Day 1: Starter Example](../day-01/05-starter-example.md) for an introductory URL shortener walkthrough.

## Topics

| # | Topic | File |
|---|-------|------|
| 1 | [The Design Process](./01-the-design-process.md) | Requirements, estimates, architecture, trade-offs |
| 2 | [URL Shortener](./02-url-shortener.md) | Redirect path, encoding, global scale |
| 3 | [Rate Limiter](./03-rate-limiter.md) | Token bucket, sliding window, distributed limits |
| 4 | [Notification System](./04-notification-system.md) | Push, email, SMS, fan-out, delivery guarantees |
| 5 | [News Feed / Timeline](./05-news-feed.md) | Fan-out on write vs read, ranking |
| 6 | [Chat / Messaging](./06-chat-messaging.md) | Real-time delivery, presence, history |
| 7 | [Search Autocomplete](./07-search-autocomplete.md) | Trie, fuzzy search, Bloom filter, ranking |
| 8 | [Distributed Object Storage](./08-distributed-object-storage.md) | Blobs, replication, erasure coding |
| 9 | [Video Streaming](./09-video-streaming.md) | Upload, transcoding, adaptive bitrate |
| 10 | [E-Commerce Checkout](./10-ecommerce-checkout.md) | Inventory, payment, idempotency, sagas |
| 11 | [Analytics / Metrics Pipeline](./11-analytics-metrics-pipeline.md) | Ingestion, aggregation, OLAP |

## Reading Order

Read 1 first — it defines the workflow used in every problem. Then read 2 → 11 in any order, or follow the table sequence.

## Key Takeaways

- Every design starts with **requirements and scale** — they drive every component choice.
- **Read-heavy** systems lean on cache and CDN; **write-heavy** systems lean on queues and partitioning.
- **Async** decouples producers from slow consumers (notifications, analytics, transcoding).
- **Idempotency** and **delivery guarantees** matter whenever money, inventory, or messages are involved.
- Patterns from Days 3–9 recur: you are combining them, not learning new magic.

## Related

- [Day 3: Core Infrastructure](../day-03/README.md)
- [Day 5: Caching](../day-05/README.md)
- [Day 6: Message Queues](../day-06/README.md)
- [Day 7: Reliability](../day-07/README.md)
- [Day 8: API Gateway](../day-08/README.md)
- [Day 9: Observability](../day-09/README.md)
