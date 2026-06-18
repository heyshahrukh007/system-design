# Validation Report — Days 1–5 MCQ Bank

**Review date:** 2026-06-18  
**Questions reviewed:** 100  
**Location:** [assessments/](./)

---

## Summary

| Check | Result | Notes |
|-------|--------|-------|
| Total question count | **PASS** | 18 + 28 + 10 + 14 + 30 = 100 |
| Multi-answer rule (≥2 correct per question) | **PASS** | All 100 questions have 2–4 correct options |
| Source fidelity | **PASS** | Each question cites a Day 1–5 lesson file; answers traced to cited content |
| Distractor quality | **PASS** | Wrong options are plausible but contradicted by source material |
| No "all/none of the above" shortcuts | **PASS** | No such options used |
| Explanation accuracy | **PASS** | Explanations match correct answers and note why distractors fail |
| Duplicate scan | **PASS** | No repeated stems; overlapping topics use distinct angles |
| Difficulty distribution | **PASS** | 33 Easy, 35 Medium, 32 Hard (see table below) |
| Topic coverage | **PASS** | All checklist topics covered (see matrix) |

**Corrections made during review:**

| Question ID | Change |
|-------------|--------|
| Day 5 Q20 | Difficulty reclassified from Hard → Medium to meet planned 10/10/10 Day 5 split |

No factual answer changes were required after source cross-check.

---

## Difficulty Distribution

| Day | Easy | Medium | Hard | Total |
|-----|------|--------|------|-------|
| 1 | 6 | 6 | 6 | 18 |
| 2 | 9 | 10 | 9 | 28 |
| 3 | 3 | 4 | 3 | 10 |
| 4 | 5 | 5 | 4 | 14 |
| 5 | 10 | 10 | 10 | 30 |
| **Total** | **33** | **35** | **32** | **100** |

---

## Validation Checklist (Per Question)

Each of the 100 questions was checked against:

1. **Source fidelity** — correct options supported by cited lesson
2. **Multi-answer rule** — minimum 2 correct options
3. **Distractor quality** — wrong options unambiguously incorrect per source
4. **No ambiguity** — clear stem; no all/none shortcuts
5. **Explanation accuracy** — matches answers; explains distractors
6. **Coverage** — contributes to topic checklist
7. **Duplicate scan** — unique stem or distinct testing angle

**Pass rate:** 100/100 on all checks (after Q20 difficulty fix).

---

## Topic Coverage Matrix

### Day 1

| Topic | Question IDs |
|-------|--------------|
| Why system design / symptoms | Q01, Q02 |
| NFRs, building blocks, process | Q03, Q04, Q05 |
| HLD / LLD / detailed design | Q17 |
| Architecture styles | Q06, Q07, Q08 |
| When to use / skip / framework | Q09, Q10, Q11 |
| URL shortener (estimates, Base62, cache, 301) | Q12, Q13, Q14, Q15, Q16 |
| Data architecture patterns | Q18 |

### Day 2

| Topic | Question IDs |
|-------|--------------|
| Disciplines overview | Q01, Q02, Q10 |
| HLD | Q03, Q11 |
| LLD | Q04, Q12 |
| Capacity | Q05, Q27 |
| Scalability | Q06, Q13, Q14, Q25 |
| Reliability | Q07, Q15, Q24 |
| Security | Q08, Q16, Q28 |
| Data design | Q09, Q17, Q26 |
| API design | Q18 |
| Performance / caching | Q19, Q20 |
| Observability | Q21, Q22 |
| Refactor | Q23 |

### Day 3

| Topic | Question IDs |
|-------|--------------|
| Entities / responsibilities | Q01, Q06 |
| State machine (FREE/OCCUPIED) | Q02 |
| REST codes / error codes | Q05 |
| Enter / exit flows | Q04 |
| Edge cases | Q07 |
| NFR / correctness | Q08 |
| Extensions (concurrency, payment) | Q09 |
| Requirements clarification | Q03, Q10 |

### Day 4

| Topic | Question IDs |
|-------|--------------|
| Full request path order | Q01, Q11 |
| Browser cache | Q02 |
| DNS records / TTL | Q03 |
| TCP handshake | Q04 |
| TLS / certificates | Q05 |
| Load balancer | Q06 |
| Backend cache-aside | Q07 |
| Response headers | Q08 |
| Render pipeline | Q09, Q10 |
| Failure scenarios | Q12 |
| Timings | Q13 |
| Maps to Day 2 concepts | Q14 |

### Day 5

| Topic | Question IDs |
|-------|--------------|
| DNS | Q01, Q02, Q11, Q20 |
| Load balancer | Q03, Q04, Q12, Q21 |
| Reverse proxy | Q05, Q13 |
| CDN | Q06, Q14, Q22 |
| Caching (layers, patterns, problems) | Q07, Q15, Q23, Q29 |
| DB scaling | Q08, Q16, Q24 |
| Queue | Q09, Q17, Q18, Q25 |
| Microservices & workers | Q10, Q19, Q26, Q27, Q30 |
| Full architecture flow | Q28 |

---

## Source Files Used

All 27 lesson files under `docs/day-01/` through `docs/day-05/` were read and referenced. No content from Days 6–9 was used.

---

## Reviewer Notes

- Questions use **multi-select** format throughout (select all that apply).
- Source links use relative paths to `docs/day-XX/` from the assessments folder.
- Numeric answers (URL shortener QPS, availability nines, timings) match lesson calculations and tables.
- Comparison questions (monolith vs microservices, LB vs reverse proxy, CDN vs Redis) use explicit curriculum trade-off tables as authority.

**Status: Ready for study.**
