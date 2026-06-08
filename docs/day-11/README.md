# Day 11 — Distributed Systems Fundamentals

Day 10 applied patterns to full systems. Day 11 covers why those trade-offs exist once you have multiple machines, networks, and failures — the ideas behind checkout consistency, feed lag, chat ordering, and replication choices.

## Topics

| # | Topic | File |
|---|-------|------|
| 1 | [CAP and PACELC](./01-cap-and-pacelc.md) | Consistency, availability, partition trade-offs |
| 2 | [Consistency Models](./02-consistency-models.md) | Strong, eventual, causal, read-your-writes |
| 3 | [Quorum Reads and Writes](./03-quorum-reads-writes.md) | N, W, R |
| 4 | [Replication Models](./04-replication-models.md) | Leader-follower, multi-leader, leaderless |
| 5 | [Consensus Basics](./05-consensus-basics.md) | Agreeing across nodes |
| 6 | [Distributed Transactions vs Saga](./06-distributed-transactions-vs-saga.md) | 2PC, saga, outbox |
| 7 | [Clocks, Ordering, Idempotency](./07-clocks-ordering-idempotency.md) | Time and safe retries |
| 8 | [SQL vs NoSQL vs Wide-Column](./08-sql-nosql-wide-column.md) | Storage by access pattern |

## Reading Order

1 → 8. Vocabulary first, then how systems implement it, then coordination and storage choice.

## Related

- [Day 4: Database Internals](../day-04/README.md)
- [Day 7: Reliability](../day-07/README.md)
- [Day 10: Classic Problems](../day-10/README.md)
- [Day 12: Streams & Events](../day-12/README.md)
