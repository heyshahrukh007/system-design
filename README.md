# System Design Documentation

A day-by-day guide to system design — fundamentals through distributed systems and event pipelines.

## How to Use This Repo

Each day is published under `docs/day-XX/`. Every day folder contains focused topics you can read in order or jump to individually.


**Practice questions:** 650 multi-select MCQs (50 per day) with separate answer keys in [assessments/](./assessments/), aligned to docs/day-01 through docs/day-13.

## Index

<table>
  <thead>
    <tr>
      <th align="left" width="70">Day</th>
      <th align="left">Topics</th>
      <th align="left" width="150">Folder</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="70">1</td>
      <td>Why System Design, What It Is, Types, When to Use, Starter Example</td>
      <td width="150" nowrap><a href="./docs/day-01/">docs/day-01</a></td>
    </tr>
    <tr>
      <td>2</td>
      <td>HLD, LLD, Capacity, Scalability, Reliability, Security, Data, API, Performance, Observability, Refactor</td>
      <td nowrap><a href="./docs/day-02/">docs/day-02</a></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Request Journey + Core Infrastructure (DNS, LB, CDN, Caching, DB Scaling, Queue, Workers)</td>
      <td nowrap><a href="./docs/day-03/">docs/day-03</a></td>
    </tr>
    <tr>
      <td>4</td>
      <td>Database Internals (Storage, Keys, Indexes, Transactions, ORM, Replication, Sharding)</td>
      <td nowrap><a href="./docs/day-04/">docs/day-04</a></td>
    </tr>
    <tr>
      <td>5</td>
      <td>Caching Deep Dive (Patterns, Invalidation, TTL, Redis, Cache Problems)</td>
      <td nowrap><a href="./docs/day-05/">docs/day-05</a></td>
    </tr>
    <tr>
      <td>6</td>
      <td>Message Queues Deep Dive (Models, Guarantees, Patterns, Kafka, SQS)</td>
      <td nowrap><a href="./docs/day-06/">docs/day-06</a></td>
    </tr>
    <tr>
      <td>7</td>
      <td>Reliability &amp; Fault Tolerance (Circuit Breaker, HA, SLO, DR)</td>
      <td nowrap><a href="./docs/day-07/">docs/day-07</a></td>
    </tr>
    <tr>
      <td>8</td>
      <td>API Gateway &amp; Service Discovery (Routing, Auth, Mesh)</td>
      <td nowrap><a href="./docs/day-08/">docs/day-08</a></td>
    </tr>
    <tr>
      <td>9</td>
      <td>Observability Deep Dive (Logs, Metrics, Traces, SLO Alerting)</td>
      <td nowrap><a href="./docs/day-09/">docs/day-09</a></td>
    </tr>
    <tr>
      <td>10</td>
      <td>Classic System Design Problems (URL Shortener, Feed, Chat, Storage, Streaming, Checkout)</td>
      <td nowrap><a href="./docs/day-10/">docs/day-10</a></td>
    </tr>
    <tr>
      <td>11</td>
      <td>Distributed Systems Fundamentals (CAP, Consistency, Quorum, Replication, Consensus, Saga)</td>
      <td nowrap><a href="./docs/day-11/">docs/day-11</a></td>
    </tr>
    <tr>
      <td>12</td>
      <td>Stream Processing &amp; Event Architecture (Event Sourcing, CQRS, CDC, Lambda/Kappa)</td>
      <td nowrap><a href="./docs/day-12/">docs/day-12</a></td>
    </tr>
    <tr>
      <td>13</td>
      <td>Synthesis (Estimation, Patterns, Glossary, Trade-offs, Walkthrough)</td>
      <td nowrap><a href="./docs/day-13/">docs/day-13</a></td>
    </tr>
  </tbody>
</table>

## Structure

```
system-design/
├── README.md
└── docs/
    ├── day-01/
    │   ├── README.md
    │   ├── 01-why-system-design.md
    │   ├── 02-what-is-system-design.md
    │   ├── 03-types-of-system-design.md
    │   ├── 04-when-to-use-system-design.md
    │   └── 05-starter-example.md
    └── day-02/
        ├── README.md
        ├── 01-types-of-system-design.md
        ├── 02-hld.md
        ├── 03-lld.md
        ├── 04-capacity-design.md
        ├── 05-scalability-design.md
        ├── 06-reliability-design.md
        ├── 07-security-design.md
        ├── 08-data-design.md
        ├── 09-api-design.md
        ├── 10-performance-design.md
        ├── 11-observability-design.md
        └── 12-refactor-design.md
    └── day-03/
        ├── README.md
        ├── 01-request-journey.md
        ├── 02-dns.md
        ├── 03-load-balancer.md
        ├── 04-reverse-proxy.md
        ├── 05-cdn.md
        ├── 06-caching.md
        ├── 07-db-scaling.md
        ├── 08-queue.md
        └── 09-microservices-and-workers.md
    └── day-04/
        ├── README.md
        ├── 01-storage-basics.md
        ├── 02-keys.md
        ├── 03-normalization.md
        ├── 04-indexes.md
        ├── 05-joins-and-lookups.md
        ├── 06-query-execution.md
        ├── 07-transactions.md
        ├── 08-orm.md
        ├── 09-n-plus-one-query-problems.md
        ├── 10-connection-pooling.md
        ├── 11-replication.md
        └── 12-sharding.md
    └── day-05/
        ├── README.md
        ├── 01-why-caching.md
        ├── 02-what-is-a-cache.md
        ├── 03-where-to-place-cache.md
        ├── 04-what-to-cache.md
        ├── 05-cache-aside-pattern.md
        ├── 06-write-through-cache.md
        ├── 07-write-back-cache.md
        ├── 08-cache-invalidation.md
        ├── 09-ttl.md
        ├── 10-distributed-cache.md
        ├── 11-cache-problems.md
        └── 12-other-patterns-and-best-practices.md
    └── day-06/
        ├── README.md
        ├── 01-why-queues.md
        ├── 02-what-is-a-message-queue.md
        ├── 03-sync-vs-async-communication.md
        ├── 04-queue-pubsub-and-streams.md
        ├── 05-core-components.md
        ├── 06-message-design.md
        ├── 07-delivery-guarantees.md
        ├── 08-ordering-and-partitioning.md
        ├── 09-consumers-and-scaling.md
        ├── 10-retry-dlq-and-idempotency.md
        ├── 11-queue-patterns.md
        └── 12-tools-operations-and-tradeoffs.md
    └── day-07/
        ├── README.md
        ├── 01-why-reliability.md
        ├── 02-reliability-metrics.md
        ├── 03-failure-modes-and-spof.md
        ├── 04-redundancy-and-high-availability.md
        ├── 05-timeouts.md
        ├── 06-retries-and-backoff.md
        ├── 07-circuit-breaker.md
        ├── 08-bulkhead-pattern.md
        ├── 09-graceful-degradation.md
        ├── 10-failover-and-disaster-recovery.md
        ├── 11-sli-slo-and-sla.md
        └── 12-designing-for-failure.md
    └── day-08/
        ├── README.md
        ├── 01-monolith-vs-microservices.md
        ├── 02-service-to-service-communication.md
        ├── 03-why-api-gateway.md
        ├── 04-api-gateway-responsibilities.md
        ├── 05-routing-and-load-balancing.md
        ├── 06-authentication-and-authorization.md
        ├── 07-rate-limiting-at-gateway.md
        ├── 08-service-discovery.md
        ├── 09-client-side-vs-server-side-discovery.md
        ├── 10-health-checks.md
        ├── 11-service-mesh-introduction.md
        └── 12-real-world-flow.md
    └── day-09/
        ├── README.md
        ├── 01-why-observability.md
        ├── 02-monitoring-vs-observability.md
        ├── 03-three-pillars.md
        ├── 04-structured-logging.md
        ├── 05-metrics-red-and-use.md
        ├── 06-distributed-tracing.md
        ├── 07-instrumentation.md
        ├── 08-dashboards-and-alerting.md
        ├── 09-slo-alerting-and-error-budgets.md
        ├── 10-log-aggregation.md
        └── 11-observability-in-microservices.md
    └── day-10/
        ├── README.md
        ├── 01-the-design-process.md
        ├── 02-url-shortener.md
        ├── 03-rate-limiter.md
        ├── 04-notification-system.md
        ├── 05-news-feed.md
        ├── 06-chat-messaging.md
        ├── 07-search-autocomplete.md
        ├── 08-distributed-object-storage.md
        ├── 09-video-streaming.md
        ├── 10-ecommerce-checkout.md
        └── 11-analytics-metrics-pipeline.md
    └── day-11/
        ├── README.md
        ├── 01-cap-and-pacelc.md
        ├── 02-consistency-models.md
        ├── 03-quorum-reads-writes.md
        ├── 04-replication-models.md
        ├── 05-consensus-basics.md
        ├── 06-distributed-transactions-vs-saga.md
        ├── 07-clocks-ordering-idempotency.md
        └── 08-sql-nosql-wide-column.md
    └── day-12/
        ├── README.md
        ├── 01-event-sourcing-vs-crud.md
        ├── 02-cqrs.md
        ├── 03-change-data-capture.md
        ├── 04-stream-processing.md
        ├── 05-lambda-vs-kappa.md
        ├── 06-realtime-vs-batch.md
        ├── 07-idempotent-stream-consumers.md
        └── 08-lag-replay-schema-evolution.md
    └── day-13/
        ├── README.md
        ├── 01-back-of-envelope-estimation.md
        ├── 02-design-decision-framework.md
        ├── 03-rules-of-thumb.md
        ├── 04-pattern-catalog.md
        ├── 05-terminology-glossary.md
        ├── 06-trade-off-matrix.md
        ├── 07-component-selection-guide.md
        └── 08-end-to-end-walkthrough.md
```
