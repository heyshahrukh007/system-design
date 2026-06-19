# System Design MCQ Bank — Days 1–5 Topics

100 **multi-select** practice questions (select all that apply). Each question has **two or more** correct answers.

Questions are **real-world**, **scenario-based**, and include **43 case studies** with a business context block. No course-meta framing ("according to the curriculum", "Day 3", etc.).

Validated: [validation-report.md](./validation-report.md)

**Answers and explanations** are in a separate folder: [answer-key/](./answer-key/) — question files contain stems and options only.

---

## Question Types

| Type | Count | How to recognize |
|------|-------|------------------|
| **Case study** | 43 | Title includes `[Case Study]` + `**Context:**` block (company, metrics, incident) |
| **Scenario** | ~35 | 1–2 sentence situational stem |
| **Technical** | ~22 | Direct engineering question in production context |

---

## Folder layout

```
assessments/
├── day-01-questions.md … day-05-questions.md   ← questions only
├── answer-key/
│   ├── README.md
│   └── day-01-answers.md … day-05-answers.md   ← answers + explanations
├── README.md
└── validation-report.md
```

---
|------|-------|-----------|--------------|------|--------|------|
| File | Topic | Questions | Case studies | Easy | Medium | Hard |
|------|-------|-----------|--------------|------|--------|------|
| [day-01-questions.md](./day-01-questions.md) → [answers](./answer-key/day-01-answers.md) | Foundations & URL Shortener | 18 | 7 | 6 | 6 | 6 |
| [day-02-questions.md](./day-02-questions.md) → [answers](./answer-key/day-02-answers.md) | Design Disciplines | 28 | 10 | 9 | 10 | 9 |
| [day-03-questions.md](./day-03-questions.md) → [answers](./answer-key/day-03-answers.md) | Parking Lot (LLD) | 10 | 5 | 3 | 4 | 3 |
| [day-04-questions.md](./day-04-questions.md) → [answers](./answer-key/day-04-answers.md) | Website Request Lifecycle | 14 | 6 | 5 | 5 | 4 |
| [day-05-questions.md](./day-05-questions.md) → [answers](./answer-key/day-05-answers.md) | Infrastructure Components | 30 | 15 | 10 | 10 | 10 |
| **Total** | | **100** | **43** | **33** | **35** | **32** |

---

## Recurring Case Study Companies

Several questions reuse fictional companies so you can follow a narrative arc:

| Company | Files | Themes |
|---------|-------|--------|
| **LinkShare** | day-01 | URL shortener capacity, redirect latency, scaling |
| **ShopExample** | day-04 | End-to-end page load, outages, rendering |
| **MetroGarage** | day-03 | Parking MVP, bugs, phase-2 extensions |
| **RetailHub / StaticHub / GrowthCo** | day-05 | Black Friday LB, CDN, architecture evolution |

---

## Recommended Study Order

### By topic (follows docs/day-01 → day-05)

1. [Foundations & URL Shortener](./day-01-questions.md)
2. [Design Disciplines](./day-02-questions.md)
3. [Parking Lot LLD](./day-03-questions.md)
4. [Website Request Lifecycle](./day-04-questions.md)
5. [Infrastructure Components](./day-05-questions.md)

### By difficulty

1. All `[Easy]` questions across files  
2. All `[Medium]` questions  
3. All `[Hard]` and `[Case Study]` questions  

### Exam cram (high yield)

- [Website Request Lifecycle](./day-04-questions.md) — full HTTP path  
- [Infrastructure Components](./day-05-questions.md) — DNS, LB, cache, queue  
- LinkShare arc in [day-01-questions.md](./day-01-questions.md) (Q12–Q16)

---

## Topic Quick Lookup

| Topic | File | Example Q IDs |
|-------|------|---------------|
| NFRs, design process | day-01 | Q03, Q05 |
| Monolith / microservices | day-01 | Q06, Q07 |
| URL shortener (Base62, cache, 301) | day-01 | Q12–Q16 |
| HLD, LLD, capacity, scalability | day-02 | Q03–Q06, Q13–Q14 |
| Reliability (circuit breaker, nines) | day-02 | Q15, Q24 |
| Security (STRIDE, input validation) | day-02 | Q16, Q28 |
| Parking lot entities & API | day-03 | Q01–Q08 |
| Browser → DNS → TLS → LB → render | day-04 | Q01, Q06, Q11 |
| DNS, CDN, Redis, queues | day-05 | Q01–Q09, Q20–Q25 |

---

## How to Practice

1. Open a **questions** file (e.g. [day-01-questions.md](./day-01-questions.md)). Read each question and **Context** block for case studies.
2. Select **all** options you believe are correct. Write down your answers.
3. Check the matching file in [answer-key/](./answer-key/) (e.g. [day-01-answers.md](./answer-key/day-01-answers.md)).
4. Read **Explanation** for any missed questions; review `docs/day-XX/` for that topic.

---

## Source Material

Questions are grounded in topics from:

- [docs/day-01/](../docs/day-01/) through [docs/day-05/](../docs/day-05/)

Lesson links are not embedded in questions — use the docs index when you need to reread a topic.
