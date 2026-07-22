# System Design MCQ Bank — Days 1–13 Topics

**650 multi-select** practice questions (select all that apply). Each question has **two or more** correct answers. **50 questions per docs day**, aligned to [`docs/day-01`](../docs/day-01/) through [`docs/day-13`](../docs/day-13/).

Questions are scenario-based with misconception distractors. Headings are ID-only (`### Q01`) — no difficulty tags or topic titles.

Validated: [validation-report.md](./validation-report.md)

**Answers and explanations** are in a separate folder: [answer-key/](./answer-key/) — question files contain stems and options only.

---

## Question format

| Element | Convention |
|---------|------------|
| Heading | `### QNN` only |
| Stem | Short scenario or concept prompt; optional `**Context:**` block |
| Options | Four choices A–D; select all that apply |
| Answers | Separate answer-key file with letters + 1–2 sentence explanation |

---

## Folder layout

```
assessments/
├── day-01-questions.md … day-13-questions.md   ← questions only
├── answer-key/
│   ├── README.md
│   └── day-01-answers.md … day-13-answers.md   ← answers + explanations
├── scripts/shuffle-options.js
├── README.md
└── validation-report.md
```

---

| File | Topic | Questions |
|------|-------|-----------|
| [day-01-questions.md](./day-01-questions.md) → [answers](./answer-key/day-01-answers.md) | System Design Foundations | 50 |
| [day-02-questions.md](./day-02-questions.md) → [answers](./answer-key/day-02-answers.md) | Design Disciplines | 50 |
| [day-03-questions.md](./day-03-questions.md) → [answers](./answer-key/day-03-answers.md) | Core Infrastructure Components | 50 |
| [day-04-questions.md](./day-04-questions.md) → [answers](./answer-key/day-04-answers.md) | Database Internals | 50 |
| [day-05-questions.md](./day-05-questions.md) → [answers](./answer-key/day-05-answers.md) | Caching Deep Dive | 50 |
| [day-06-questions.md](./day-06-questions.md) → [answers](./answer-key/day-06-answers.md) | Message Queues Deep Dive | 50 |
| [day-07-questions.md](./day-07-questions.md) → [answers](./answer-key/day-07-answers.md) | Reliability & Fault Tolerance | 50 |
| [day-08-questions.md](./day-08-questions.md) → [answers](./answer-key/day-08-answers.md) | API Gateway & Service Discovery | 50 |
| [day-09-questions.md](./day-09-questions.md) → [answers](./answer-key/day-09-answers.md) | Observability Deep Dive | 50 |
| [day-10-questions.md](./day-10-questions.md) → [answers](./answer-key/day-10-answers.md) | Classic System Design Problems | 50 |
| [day-11-questions.md](./day-11-questions.md) → [answers](./answer-key/day-11-answers.md) | Distributed Systems Fundamentals | 50 |
| [day-12-questions.md](./day-12-questions.md) → [answers](./answer-key/day-12-answers.md) | Stream Processing & Event Architecture | 50 |
| [day-13-questions.md](./day-13-questions.md) → [answers](./answer-key/day-13-answers.md) | Synthesis | 50 |
| **Total** | | **650** |

---

## Recommended Study Order

Follow docs day-01 → day-13:

1. [Foundations](./day-01-questions.md)
2. [Design Disciplines](./day-02-questions.md)
3. [Core Infrastructure](./day-03-questions.md)
4. [Database Internals](./day-04-questions.md)
5. [Caching Deep Dive](./day-05-questions.md)
6. [Message Queues](./day-06-questions.md)
7. [Reliability](./day-07-questions.md)
8. [API Gateway & Discovery](./day-08-questions.md)
9. [Observability](./day-09-questions.md)
10. [Classic Designs](./day-10-questions.md)
11. [Distributed Systems](./day-11-questions.md)
12. [Stream / Event Architecture](./day-12-questions.md)
13. [Synthesis](./day-13-questions.md)

---

## Topic Quick Lookup

| Topic | File |
|-------|------|
| NFRs, design process, URL shortener intro | day-01 |
| HLD, LLD, capacity, security, API, performance | day-02 |
| DNS, LB, CDN, cache, queue, workers | day-03 |
| Indexes, transactions, N+1, replication, sharding | day-04 |
| Cache-aside, stampede, TTL, Redis | day-05 |
| Delivery guarantees, partitions, DLQ, outbox | day-06 |
| Timeouts, retries, circuit breaker, SLO/SLA, DR | day-07 |
| Gateway, discovery, mesh, health checks | day-08 |
| Logs, metrics, traces, RED/USE, error budgets | day-09 |
| Rate limit, feed, chat, checkout, storage | day-10 |
| CAP, quorum, consensus, saga | day-11 |
| Event sourcing, CQRS, CDC, Lambda/Kappa | day-12 |
| Estimation, trade-offs, component selection | day-13 |

---

## How to Practice

1. Open a **questions** file (e.g. [day-09-questions.md](./day-09-questions.md)).
2. Select **all** options you believe are correct.
3. Check the matching file in [answer-key/](./answer-key/).
4. Read **Explanation** for misses; review `docs/day-XX/` for that topic.

Option order is shuffled per question. To re-shuffle after editing: `node scripts/shuffle-options.js` (or pass day numbers, e.g. `node scripts/shuffle-options.js 09 10`).

---

## Source Material

Questions are grounded in topics from [docs/day-01/](../docs/day-01/) through [docs/day-13/](../docs/day-13/).
