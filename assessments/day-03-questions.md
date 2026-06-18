# Day 3 — MCQ Questions (10)

Multi-select format: each question has **two or more** correct answers.

---

### Q01 [Easy] — Parking Lot Entities

**Select all that apply.**

Which entities and responsibilities are correct for the parking lot design?

- [ ] A. `ParkingLot` — owns spots; handles enter, exit, availability
- [ ] B. `ParkingSpot` — tracks occupied or free state for one slot
- [ ] C. `Car` — identified by license plate
- [ ] D. `ParkingTicket` — frees the spot on exit (primary responsibility)

**Answer:** A, B, C

**Explanation:** Lot orchestrates; spot owns its state; car holds identity. The ticket records entry — the lot frees the spot on exit, not the ticket itself (D).

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)

---

### Q02 [Easy] — Spot State Machine

**Select all that apply.**

Which statements about the parking spot state machine are correct?

- [ ] A. Valid transition: FREE → OCCUPIED via `park()`
- [ ] B. Valid transition: OCCUPIED → FREE via `vacate()`
- [ ] C. Valid transition: OCCUPIED → FREE via `park()`
- [ ] D. Invalid: `park()` when already occupied

**Answer:** A, B, D

**Explanation:** `park()` moves FREE to OCCUPIED; `vacate()` moves OCCUPIED to FREE. Calling `park()` when occupied is invalid (C is wrong, D is correct).

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)

---

### Q03 [Easy] — Out of Scope (v1)

**Select all that apply.**

Which items are explicitly **out of scope** for parking lot v1?

- [ ] A. Payment and hourly billing
- [ ] B. Cars entering and exiting with tickets
- [ ] C. Motorcycles, trucks, handicapped spots
- [ ] D. Multi-lot management

**Answer:** A, C, D

**Explanation:** Payment, multiple vehicle types, and multi-lot management are out of scope. Enter/exit with tickets is a core functional requirement (B).

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)

---

### Q04 [Medium] — Enter Operation Flow

**Select all that apply.**

Which steps belong to the `enter(car)` flow?

- [ ] A. Reject if car already has an active ticket
- [ ] B. Find first available spot; reject if none (lot full)
- [ ] C. Call `spot.park(car)` and create a `ParkingTicket`
- [ ] D. Charge payment before issuing ticket

**Answer:** A, B, C

**Explanation:** Enter checks duplicate entry, finds a spot, parks the car, and issues a ticket. Payment is out of scope for v1 (D).

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)

---

### Q05 [Medium] — REST API Responses

**Select all that apply.**

Which HTTP status codes and error codes match the parking lot API design?

- [ ] A. `POST /enter` → 201 Created on success
- [ ] B. Lot full → 409 Conflict with `PARKING_FULL`
- [ ] C. Duplicate entry → 409 Conflict with `ALREADY_PARKED`
- [ ] D. Invalid ticket on exit → 404 Not Found with `INVALID_TICKET`

**Answer:** A, B, C, D

**Explanation:** All four pairings match the API specification in the lesson.

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)

---

### Q06 [Medium] — Responsibility Split

**Select all that apply.**

Which responsibility assignments follow the design's single-responsibility split?

- [ ] A. `ParkingSpot` manages its own occupied/free state
- [ ] B. `ParkingSpot` searches all spots for a free slot
- [ ] C. `ParkingLot` orchestrates enter/exit and ticket registry
- [ ] D. `ParkingLot` stores payment logic

**Answer:** A, C

**Explanation:** Spots manage their own state; the lot orchestrates and searches. Spot does not search (B); payment is out of scope for lot (D).

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)

---

### Q07 [Medium] — Edge Cases

**Select all that apply.**

Which edge-case behaviors are specified in the design?

- [ ] A. Same car tries to enter twice → `ALREADY_PARKED`
- [ ] B. Exit twice with same ticket → second exit fails (ticket already removed)
- [ ] C. Invalid ticket on exit → `INVALID_TICKET`
- [ ] D. Zero spots configured → enter always succeeds

**Answer:** A, B, C

**Explanation:** Duplicate entry, double exit, and invalid ticket are documented edge cases. Zero spots means enter always fails (D).

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)

---

### Q08 [Hard] — NFR and Correctness

**Select all that apply.**

Which non-functional requirements apply to the parking lot v1 design?

- [ ] A. Never assign two cars to the same spot
- [ ] B. Instant response for in-memory single lot
- [ ] C. Easy to extend for floors, vehicle types, payment
- [ ] D. Must support 10,000 concurrent entry races in v1

**Answer:** A, B, C

**Explanation:** Correctness (no double assignment), instant in-memory response, and extensibility are stated NFRs. Concurrency/races are explicitly deferred — single-process for v1 (D).

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)

---

### Q09 [Hard] — Design Extensions

**Select all that apply.**

Which extension approaches are suggested in the curriculum?

- [ ] A. Multiple vehicle types → `SpotType` enum; match car to compatible spot
- [ ] B. Concurrency → DB transaction or lock per spot; optimistic locking on `is_occupied`
- [ ] C. Multiple floors → `ParkingFloor` contains spots; search floor by floor
- [ ] D. Payment → compute duration × rate from `entry_time` on exit

**Answer:** A, B, C, D

**Explanation:** All four extensions appear in the extensions table with design changes.

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)

---

### Q10 [Hard] — Requirements Clarification

**Select all that apply.**

Which assumptions were made when clarifying the minimal requirements?

- [ ] A. One parking lot, single floor, cars only
- [ ] B. Ticket issued on entry with spot and entry time
- [ ] C. License plate identifies the car
- [ ] D. Multi-lot registry with payment integration in v1

**Answer:** A, B, C

**Explanation:** Single lot, single floor, cars only, ticket on entry, and license plate ID are v1 assumptions. Multi-lot and payment are out of scope (D).

**Source:** [docs/day-03/01-parking-lot-design.md](../docs/day-03/01-parking-lot-design.md)
