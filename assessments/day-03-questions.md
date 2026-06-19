# Parking Lot System (LLD) — MCQ Questions (10)

Multi-select format: each question has **two or more** correct answers. Questions tagged **[Case Study]** include a business context block.

> **Answers and explanations:** see [answer-key/day-03-answers.md](./answer-key/day-03-answers.md)

---

### Q01 [Easy] — Modeling a Downtown Garage


**Select all that apply.**

You are designing an object model for a single-floor parking garage where cars are identified by license plate and receive a ticket on entry. Which entity responsibilities are correct?

- [ ] A. `ParkingLot` — owns spots; orchestrates enter, exit, and availability
- [ ] B. `ParkingSpot` — tracks whether one physical slot is free or occupied
- [ ] C. `Car` — identified by license plate
- [ ] D. `ParkingTicket` — responsible for freeing the spot when the car exits

---

### Q02 [Easy] — Spot State Transitions


**Select all that apply.**

Which state transitions are valid for a `ParkingSpot`?

- [ ] A. FREE → OCCUPIED when `park(car)` is called on an empty spot
- [ ] B. OCCUPIED → FREE when `vacate()` is called
- [ ] C. OCCUPIED → FREE when `park()` is called again
- [ ] D. Reject `park()` when the spot is already occupied

---

### Q03 [Easy] [Case Study] — MVP Scope for MetroGarage


**Context:** MetroGarage wants a software system for one downtown lot: cars enter, get a ticket, exit, and operators see how many spots are free. Phase 2 might add trucks, payments, and multiple floors — but not in the first release.

**Select all that apply.**

Which capabilities should **not** be built in the MVP?

- [ ] A. Hourly payment and billing on exit
- [ ] B. Assigning a free spot and issuing a ticket on entry
- [ ] C. Separate spot types for motorcycles and trucks
- [ ] D. Managing multiple unrelated parking lots from one admin panel

---

### Q04 [Medium] — Entry Flow Design


**Select all that apply.**

A driver arrives at the gate. The system must assign a spot and issue a ticket. Which steps belong in `enter(car)`?

- [ ] A. Reject if the same license plate already has an active ticket
- [ ] B. Find an available spot; reject with "lot full" if none exist
- [ ] C. Call `spot.park(car)`, create a ticket, register it as active
- [ ] D. Charge a flat fee before opening the gate

---

### Q05 [Medium] — REST API Contract for Gate Kiosks


**Select all that apply.**

Gate kiosks call your parking API. Which HTTP status and error code pairings are correct?

- [ ] A. Successful entry → `201 Created` with ticket details
- [ ] B. Lot full → `409 Conflict` with error `PARKING_FULL`
- [ ] C. Same car enters twice → `409 Conflict` with error `ALREADY_PARKED`
- [ ] D. Invalid ticket at exit → `404 Not Found` with error `INVALID_TICKET`

---

### Q06 [Medium] — Single Responsibility in the Object Model


**Select all that apply.**

Which responsibility assignments follow good LLD separation?

- [ ] A. `ParkingSpot` updates its own occupied/free flag
- [ ] B. `ParkingSpot` searches all spots to find the next free one
- [ ] C. `ParkingLot` finds a free spot and coordinates enter/exit
- [ ] D. `ParkingLot` calculates hourly payment on exit

---

### Q07 [Medium] [Case Study] — Production Bug: Double Booking


**Context:** After a busy Saturday, operators report two cars assigned to spot #14. Logs show two `enter()` calls 200ms apart for different plates when only one spot was free. The MVP runs single-process in memory with no locking.

**Select all that apply.**

Which edge cases and fixes address this class of bug?

- [ ] A. Same car entering twice → reject with `ALREADY_PARKED`
- [ ] B. Two concurrent enters racing for the last spot → need per-spot lock or DB transaction in production
- [ ] C. Exit twice with the same ticket → second exit fails; ticket already removed
- [ ] D. Zero spots configured → enter should always succeed

---

### Q08 [Hard] [Case Study] — INVALID_TICKET Spike at Exit Lanes


**Context:** Exit kiosks report a spike in `INVALID_TICKET` errors. Investigation shows drivers scanning paper tickets faded by sun, while the database still has active sessions. Some drivers try to exit twice after a successful first exit.

**Select all that apply.**

Which behaviors should the exit flow enforce?

- [ ] A. Reject unknown ticket IDs with `INVALID_TICKET`
- [ ] B. On successful exit, remove ticket from active registry so a second scan fails
- [ ] C. Never assign two cars to the same spot (correctness NFR)
- [ ] D. Support 10,000 concurrent entry races in the in-memory MVP without any locking

---

### Q09 [Hard] [Case Study] — Phase 2: Trucks and Paid Exits


**Context:** MetroGarage phase 2 adds large spots for trucks, compact spots for motorcycles, and payment on exit based on `entry_time`. The garage remains single-floor but must match vehicle type to compatible spots.

**Select all that apply.**

Which design extensions are appropriate?

- [ ] A. `SpotType` enum (compact, regular, large) matched to vehicle type
- [ ] B. On exit, compute fee from duration × rate using ticket `entry_time`
- [ ] C. `ParkingFloor` entity for multi-floor search — required immediately
- [ ] D. Optimistic locking on `is_occupied` when moving to a persisted database

---

### Q10 [Hard] [Case Study] — Clarifying a Vague Product Brief


**Context:** The product owner says: "Build a parking lot system." Before coding, you run a requirements workshop. You agree on: one lot, one floor, cars only, license plate identification, ticket on entry, in-memory storage for v1.

**Select all that apply.**

Which assumptions correctly bound the v1 design?

- [ ] A. One parking lot, single floor, cars only
- [ ] B. Ticket issued on entry linking car, spot, and entry time
- [ ] C. License plate identifies the vehicle
- [ ] D. Multi-lot registry with payment gateway integration in v1
