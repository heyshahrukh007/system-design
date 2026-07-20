# System Design MCQ Bank — Days 1–13 Topics

490 **multi-select** practice questions (select all that apply). Each question has **two or more** correct answers.

Questions are **real-world**, **scenario-based**, and include **~234 case studies** with a business context block. No course-meta framing ("according to the curriculum", "Day 3", etc.).

Validated: [validation-report.md](./validation-report.md) (may lag newest days)

**Answers and explanations** are in a separate folder: [answer-key/](./answer-key/) — question files contain stems and options only.

---

## Question Types

| Type | How to recognize |
|------|------------------|
| **Case study** | Title includes `[Case Study]` + `**Context:**` block (company, metrics, incident) |
| **Scenario** | 1–2 sentence situational stem |
| **Technical** | Direct engineering question in production context |

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

| File | Topic | Questions | Case studies | Easy | Medium | Hard |
|------|-------|-----------|--------------|------|--------|------|
| [day-01-questions.md](./day-01-questions.md) → [answers](./answer-key/day-01-answers.md) | Foundations & URL Shortener | 18 | 7 | 6 | 6 | 6 |
| [day-02-questions.md](./day-02-questions.md) → [answers](./answer-key/day-02-answers.md) | Design Disciplines | 28 | 8 | 9 | 10 | 9 |
| [day-03-questions.md](./day-03-questions.md) → [answers](./answer-key/day-03-answers.md) | Parking Lot (LLD) | 10 | 5 | 3 | 4 | 3 |
| [day-04-questions.md](./day-04-questions.md) → [answers](./answer-key/day-04-answers.md) | Website Request Lifecycle | 14 | 5 | 5 | 5 | 4 |
| [day-05-questions.md](./day-05-questions.md) → [answers](./answer-key/day-05-answers.md) | Infrastructure Components | 30 | 15 | 10 | 10 | 10 |
| [day-06-questions.md](./day-06-questions.md) → [answers](./answer-key/day-06-answers.md) | Database Internals | 50 | 23 | 15 | 20 | 15 |
| [day-07-questions.md](./day-07-questions.md) → [answers](./answer-key/day-07-answers.md) | Caching Deep Dive | 50 | 24 | 15 | 21 | 14 |
| [day-08-questions.md](./day-08-questions.md) → [answers](./answer-key/day-08-answers.md) | API Gateway & Service Discovery | 50 | 27 | 14 | 29 | 7 |
| [day-09-questions.md](./day-09-questions.md) → [answers](./answer-key/day-09-answers.md) | Observability Deep Dive | 50 | 26 | 14 | 21 | 15 |
| [day-10-questions.md](./day-10-questions.md) → [answers](./answer-key/day-10-answers.md) | Classic System Design Problems | 50 | 24 | 14 | 22 | 14 |
| [day-11-questions.md](./day-11-questions.md) → [answers](./answer-key/day-11-answers.md) | Distributed Systems Fundamentals | 50 | 26 | 15 | 20 | 15 |
| [day-12-questions.md](./day-12-questions.md) → [answers](./answer-key/day-12-answers.md) | Stream Processing & Event Architecture | 50 | 25 | 15 | 21 | 14 |
| [day-13-questions.md](./day-13-questions.md) → [answers](./answer-key/day-13-answers.md) | Synthesis | 40 | 19 | 12 | 16 | 12 |
| **Total** | | **490** | **234** | **147** | **205** | **138** |

---

## Recurring Case Study Companies

| Company | Files | Themes |
|---------|-------|--------|
| **LinkShare** | day-01, day-10 | URL shortener capacity, redirect latency, scaling |
| **ShopExample** | day-04 | End-to-end page load, outages, rendering |
| **MetroGarage** | day-03 | Parking MVP, bugs, phase-2 extensions |
| **RetailHub** | day-05, day-07 | Black Friday LB/CDN, cache stampede, invalidation |
| **LedgerFlow** | day-06 | Indexes, transactions, replication, sharding |
| **CloudMart** | day-08 | API gateway, discovery, mesh, north-south traffic |
| **SignalOps** | day-09 | Traces, SLO burn, log correlation, alerting |
| **ThrottleAPI / PingCast / FeedlyX / ChatNest** | day-10 | Rate limits, notifications, feeds, chat |
| **BlobVault / StreamFlix / CartPay / MetricRiver** | day-10 | Storage, video, checkout, analytics |
| **ReplicaWorks** | day-11 | CAP, quorum, replication, sagas |
| **EventPipe** | day-12 | Event sourcing, CQRS, CDC, stream ops |
| **DesignLab** | day-13 | Estimation, trade-offs, component selection |

---

## Recommended Study Order

### By topic (follows docs/day-01 → day-13)

1. [Foundations & URL Shortener](./day-01-questions.md)
2. [Design Disciplines](./day-02-questions.md)
3. [Parking Lot LLD](./day-03-questions.md)
4. [Website Request Lifecycle](./day-04-questions.md)
5. [Infrastructure Components](./day-05-questions.md)
6. [Database Internals](./day-06-questions.md)
7. [Caching Deep Dive](./day-07-questions.md)
8. [API Gateway & Service Discovery](./day-08-questions.md)
9. [Observability Deep Dive](./day-09-questions.md)
10. [Classic System Design Problems](./day-10-questions.md)
11. [Distributed Systems Fundamentals](./day-11-questions.md)
12. [Stream Processing & Event Architecture](./day-12-questions.md)
13. [Synthesis](./day-13-questions.md)

### By difficulty

1. All `[Easy]` questions across files
2. All `[Medium]` questions
3. All `[Hard]` and `[Case Study]` questions

### Exam cram (high yield)

- [Website Request Lifecycle](./day-04-questions.md) — full HTTP path
- [Infrastructure Components](./day-05-questions.md) — DNS, LB, cache, queue
- [Database Internals](./day-06-questions.md) — indexes, transactions, N+1, sharding
- [Caching Deep Dive](./day-07-questions.md) — patterns, invalidation, stampede
- [API Gateway & Service Discovery](./day-08-questions.md) — gateway, discovery, mesh
- [Observability Deep Dive](./day-09-questions.md) — pillars, tracing, SLO burn
- [Classic System Design Problems](./day-10-questions.md) — shortener, feed, chat, checkout
- [Distributed Systems Fundamentals](./day-11-questions.md) — CAP, quorum, consensus
- [Synthesis](./day-13-questions.md) — estimation and trade-offs

---

## Topic Quick Lookup

| Topic | File | Example Q IDs |
|-------|------|---------------|
| NFRs, design process | day-01 | Q03, Q05 |
| URL shortener arc | day-01, day-10 | day-01 Q12–Q16 |
| HLD, capacity, security | day-02 | Q03–Q06, Q16 |
| Parking lot LLD | day-03 | Q01–Q08 |
| Browser → DNS → render | day-04 | Q01, Q06, Q11 |
| DNS, LB, CDN, queues | day-05 | Q01–Q09, Q20–Q25 |
| Storage, indexes, ACID | day-06 | Q01, Q04, Q09, Q23, Q34, Q42 |
| Cache-aside, stampede | day-07 | Q07–Q09, Q13–Q15 |
| Gateway, discovery, mesh | day-08 | Q11–Q13, Q34–Q50 |
| Logs, metrics, traces | day-09 | Q01–Q20 |
| SLO burn, dashboards | day-09 | Q25–Q40 |
| Classic designs (feed, chat, checkout) | day-10 | Q20–Q50 |
| CAP, consistency, quorum | day-11 | Q01–Q15 |
| Replication, consensus, saga | day-11 | Q16–Q40 |
| Event sourcing, CQRS, CDC | day-12 | Q01–Q20 |
| Lambda/Kappa, lag, schema | day-12 | Q25–Q50 |
| Estimation, trade-offs, patterns | day-13 | Q01–Q40 |

---

## How to Practice

1. Open a **questions** file (e.g. [day-09-questions.md](./day-09-questions.md)). Read each question and **Context** block for case studies.
2. Select **all** options you believe are correct. Write down your answers.
3. Check the matching file in [answer-key/](./answer-key/) (e.g. [day-09-answers.md](./answer-key/day-09-answers.md)).
4. Read **Explanation** for any missed questions; review `docs/day-XX/` for that topic.

Option order is shuffled per question so correct answers are not predictable by position. To re-shuffle after editing questions, run `node scripts/shuffle-options.js` from this folder (or pass day numbers, e.g. `node scripts/shuffle-options.js 09 10 11`).

---

## Source Material

Questions are grounded in topics from:

- [docs/day-01/](../docs/day-01/) through [docs/day-13/](../docs/day-13/)

Lesson links are not embedded in questions — use the docs index when you need to reread a topic.
