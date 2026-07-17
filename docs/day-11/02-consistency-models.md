# Consistency Models

[← CAP and PACELC](./01-cap-and-pacelc.md) | [Day 11 Index](./README.md) | [Next: Quorum Reads and Writes →](./03-quorum-reads-writes.md)

## What “Consistency” Means Here

In distributed systems, **consistency** describes what a client is allowed to observe after writes — not the same as ACID “consistency” (valid schema/constraints) from [Day 4: Transactions](../day-04/07-transactions.md).

```
Client A writes x = 1
Client B reads x
  → Must B see 1? Always? Eventually? Only if B is A?
```

Different answers are different **consistency models**.

---

## Strong Consistency (Linearizability)

After a write completes, **every** subsequent read (from any client) sees that write or a later one. Operations appear to take effect at a single point in time, in a global order.

```
T1: Client A: SET x=1  → OK
T2: Client B: GET x    → must return 1 (not 0)
```

| Pros | Cons |
|------|------|
| Simple mental model | Higher latency (coordination) |
| Easy to reason about money, inventory | Lower availability under partition |

Used when wrong answers are expensive: balances, unique username claims, inventory decrement.

---

## Eventual Consistency

If no new writes occur, **all replicas eventually** converge to the same value. In the meantime, reads may be stale.

```
Write x=1 on replica A
Read x on replica B soon after → might still see old value
Later → all replicas show x=1
```

| Pros | Cons |
|------|------|
| High availability, low latency | Temporary anomalies |
| Scales geographically | Harder app logic (conflict handling) |

Common for: social counts, profile bios, CDN-cached pages, secondary indexes that catch up asynchronously.

---

## Read-Your-Writes

After **you** write, **your** subsequent reads see that write. Other users may still see older data.

```
You update avatar → refresh profile → you see new avatar
Friend may see old avatar for a few seconds
```

Often enough for settings UIs and “I just posted” flows. Implemented with sticky sessions, reading from the primary after write, or version tokens.

---

## Monotonic Reads

Once you have seen a value, you never go **backward** in time on later reads (no “time travel”).

```
Bad (non-monotonic):
  Read 1: x=5
  Read 2: x=3   ← older replica

Good:
  Read 1: x=5
  Read 2: x=5 or newer
```

Sticky routing to the same replica (or tracking a minimum version) helps.

---

## Causal Consistency

If operation B **causally depends** on A (B happened after A in a happens-before sense — e.g. reply to a comment), everyone sees A before B. Concurrent, unrelated writes may be seen in different orders by different clients.

```
Alice posts "Hello"
Bob replies "Hi Alice"   ← causally after Alice's post
Charlie must not see Bob's reply without Alice's post
```

Weaker than linearizability, stronger than pure eventual. Useful for comment threads and collaborative edits.

---

## Other Useful Guarantees

| Model | Meaning |
|-------|---------|
| **Sequential consistency** | All clients see the same order of operations (not necessarily real-time order) |
| **Bounded staleness** | Reads are at most *N* seconds / versions behind |
| **Session consistency** | Guarantees (read-your-writes, monotonic) within one session |

---

## Choosing a Model

| Domain | Typical choice |
|--------|----------------|
| Payments, inventory, unique constraints | Strong |
| User profile, likes count, feed ranking inputs | Eventual or bounded staleness |
| “My own” settings / posts | Read-your-writes |
| Comment threads, chat history | Causal or strong per conversation |

Tie this to [Day 10](../day-10/README.md): checkout leans strong; feed and notifications lean eventual with careful UX.

---

## Application Implications

1. **UI** — show “updating…” or optimistic UI when eventual is OK.
2. **Idempotency** — retries under weak consistency need keys ([topic 7](./07-clocks-ordering-idempotency.md)).
3. **Conflicts** — multi-writer eventual systems need merge rules (LWW, CRDTs, app-level resolve).

---

## Summary

| Model | Strength | Typical use |
|-------|----------|-------------|
| Linearizable / strong | Strongest | Money, stock |
| Causal | Medium | Related events |
| Read-your-writes / monotonic | Session-level | UX after own writes |
| Eventual | Weakest (but scalable) | Feeds, caches, replicas |

Next: how many replicas must agree for a read or write — [Quorum Reads and Writes](./03-quorum-reads-writes.md).
