# Validation Report — Days 1–5 MCQ Bank

**Last revalidation:** 2026-06-18  
**Questions reviewed:** 100  
**Answer keys reviewed:** 100  
**Location:** [assessments/](./) — questions in root; answers in [answer-key/](./answer-key/)

---

## Revalidation Summary

| Check | Result | Details |
|-------|--------|---------|
| Question count | **PASS** | 18 + 28 + 10 + 14 + 30 = 100 |
| Answer key count | **PASS** | 100 entries — 1:1 with questions |
| Q ↔ A ID/title match | **PASS** | All Q01–Qxx titles and difficulty tags align |
| Answer letters valid | **PASS** | Every letter in each answer exists in that question's options |
| Multi-select rule (≥2 correct) | **PASS** | 100/100 have 2–4 correct options |
| Explanations present | **PASS** | 100/100 answer-key entries include **Explanation** |
| Answers separated from questions | **PASS** | 0 `**Answer:**` / `**Explanation:**` in question files |
| Answer-key links in question files | **PASS** | All 5 question files link to matching answer-key file |
| Banned meta phrases | **PASS** | 0 matches (curriculum, Day N, Source:, listed in, etc.) |
| Case studies (≥40) | **PASS** | 40 tagged `[Case Study]` with **Context** blocks |
| Difficulty split | **PASS** | Easy 33 / Medium 35 / Hard 32 |
| Per-file question counts | **PASS** | 18 / 28 / 10 / 14 / 30 |

**Overall status: PASS — ready for exam practice**

---

## Fixes Applied During Revalidation

| Item | Action |
|------|--------|
| day-02 Q22 | Removed duplicate `**Select all that apply.**` stem |
| day-02 Q25 | Removed duplicate `**Select all that apply.**` stem |

---

## Structural Validation

### Question files (`day-XX-questions.md`)

Each file contains:

- Topic header and link to matching answer key
- Question stems, optional **Context** for case studies
- Four options (A–D) per question
- No answers or explanations

### Answer key files (`answer-key/day-XX-answers.md`)

Each file contains:

- Matching question ID and title
- **Answer:** with comma-separated letters
- **Explanation:** with rationale for correct options and distractors

### Cross-file pairing

| Questions | Answer key | Count | Case studies |
|-----------|------------|-------|--------------|
| [day-01-questions.md](./day-01-questions.md) | [answer-key/day-01-answers.md](./answer-key/day-01-answers.md) | 18 | 8 |
| [day-02-questions.md](./day-02-questions.md) | [answer-key/day-02-answers.md](./answer-key/day-02-answers.md) | 28 | 9 |
| [day-03-questions.md](./day-03-questions.md) | [answer-key/day-03-answers.md](./answer-key/day-03-answers.md) | 10 | 6 |
| [day-04-questions.md](./day-04-questions.md) | [answer-key/day-04-answers.md](./answer-key/day-04-answers.md) | 14 | 6 |
| [day-05-questions.md](./day-05-questions.md) | [answer-key/day-05-answers.md](./answer-key/day-05-answers.md) | 30 | 16 |
| **Total** | | **100** | **40** |

---

## Difficulty Distribution

| File | Easy | Medium | Hard | Total |
|------|------|--------|------|-------|
| day-01 | 6 | 6 | 6 | 18 |
| day-02 | 9 | 10 | 9 | 28 |
| day-03 | 3 | 4 | 3 | 10 |
| day-04 | 5 | 5 | 4 | 14 |
| day-05 | 10 | 10 | 10 | 30 |
| **Total** | **33** | **35** | **32** | **100** |

---

## Content Quality Notes

| Note | Severity | Status |
|------|----------|--------|
| Real-world / case-study framing (no course meta) | Info | Verified |
| day-02 has 9 case studies (original target was 10 per file plan) | Advisory | Acceptable — total 40 meets bank target |
| Answer letter distribution balanced across A–D | Info | No single-letter answers |
| Spot-check: LinkShare arc (day-01 Q12–16), ShopExample (day-04), infra cases (day-05) | Info | Answers consistent with topic facts |

---

## Topic Coverage Matrix

### Foundations & URL Shortener (day-01)

| Topic | Question IDs |
|-------|--------------|
| Why design / scaling symptoms | Q01, Q02 |
| NFRs, building blocks, process | Q03, Q04, Q05 |
| Architecture styles | Q06, Q07, Q08 |
| When to design / skip / decision gate | Q09, Q10, Q11 |
| LinkShare URL shortener arc | Q12, Q13, Q14, Q15, Q16 |
| HLD/LLD/detailed + data patterns | Q17, Q18 |

### Design Disciplines (day-02)

| Topic | Question IDs |
|-------|--------------|
| Disciplines overview | Q01, Q02, Q10 |
| HLD / LLD | Q03, Q04, Q11, Q12 |
| Capacity / scalability | Q05, Q06, Q13, Q14, Q25 |
| Reliability | Q07, Q15, Q24 |
| Security / STRIDE | Q08, Q16, Q28 |
| Data / CAP | Q09, Q17, Q26 |
| API / performance / cache | Q18, Q19, Q20 |
| Observability / SLO | Q21, Q22 |
| Refactor | Q23, Q27 |

### Parking Lot LLD (day-03)

| Topic | Question IDs |
|-------|--------------|
| Entities / state machine | Q01, Q02, Q06 |
| MVP scope | Q03, Q10 |
| Enter/exit / API | Q04, Q05 |
| Edge cases / concurrency | Q07, Q08 |
| Extensions | Q09 |

### Website Request Lifecycle (day-04)

| Topic | Question IDs |
|-------|--------------|
| Request path order | Q01, Q11 |
| Browser cache / DNS / TCP / TLS | Q02, Q03, Q04, Q05 |
| LB / backend cache-aside | Q06, Q07 |
| Response / rendering | Q08, Q09, Q10 |
| Failures / timings / full stack | Q12, Q13, Q14 |

### Infrastructure Components (day-05)

| Topic | Question IDs |
|-------|--------------|
| DNS | Q01, Q02, Q11, Q20 |
| Load balancer | Q03, Q04, Q12, Q21 |
| Reverse proxy | Q05, Q13 |
| CDN | Q06, Q14, Q22 |
| Caching | Q07, Q15, Q23, Q29 |
| DB scaling | Q08, Q16, Q24 |
| Queue | Q09, Q17, Q18, Q25 |
| Microservices / workers / saga | Q10, Q19, Q26, Q27, Q30 |
| Full stack flow | Q28 |

---

## How to Re-run Validation

From `assessments/`:

1. Confirm 100 questions and 100 answer entries (grep `^### Q` in each file).
2. Confirm no `**Answer:**` in `day-*-questions.md`.
3. Confirm 100 `**Explanation:**` in `answer-key/day-*-answers.md`.
4. Spot-check a sample of Q/A pairs for logical consistency.

**Status: Validated and ready for study.**
