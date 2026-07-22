# Database Internals — Answer Key & Explanations (50)




---

### Q01

**Answer:** C, D

**Explanation:** Databases read pages, and a buffer miss can require slow storage I/O. They do not fetch an isolated column byte from disk.

---

### Q02

**Answer:** B, C

**Explanation:** Narrow projections reduce transfer and database I/O. Wider rows generally reduce page density rather than fitting more rows per page.

---

### Q03

**Answer:** A, C

**Explanation:** Sequential WAL writes support efficient durable commits and recovery can replay them. WAL must precede the related data-page flush, not follow it.

---

### Q04

**Answer:** A, C

**Explanation:** InnoDB clusters rows by primary key and random keys can reduce insert locality. PostgreSQL heap rows are not always physically ordered by primary key.

---

### Q05

**Answer:** B, D

**Explanation:** A unique constraint enforces email uniqueness and a primary key is non-null. A surrogate ID is intended to remain stable when mutable email changes.

---

### Q06

**Answer:** A, B

**Explanation:** Cascading deletion can fit owned line items, and indexing the child key speeds joins and cascades. An index does not make orphaned foreign-key values valid.

---

### Q07

**Answer:** A, B

**Explanation:** A composite key makes each order-product pair unique and allows a product in multiple orders. It does not require the first column alone to be unique.

---

### Q08

**Answer:** B, D

**Explanation:** UUIDs support distributed generation and time-ordered UUIDs improve locality. Auto-increment integers are compact and insertion-friendly, not wide and randomly placed.

---

### Q09

**Answer:** A, C

**Explanation:** Normalization keeps the current email in one authoritative user row and reduces redundancy. Repeating it across orders creates rather than prevents update anomalies.

---

### Q10

**Answer:** A, B

**Explanation:** A comma-separated list violates the course's atomic-value rule, while one phone per row avoids a repeating group. Separate rows are compatible with 1NF.

---

### Q11

**Answer:** B, D

**Explanation:** In 2NF, non-key attributes depend on the whole key, so product names belong in products. A product name depends on product alone, not the complete order-product pair.

---

### Q12

**Answer:** A, C

**Explanation:** User location depends transitively on `user_id`, and normalization reduces inconsistent copies. Keeping location on every order is not required for 3NF.

---

### Q13

**Answer:** A, B

**Explanation:** Purchase-time copies preserve history and intentionally trade redundancy for audit and read needs. Immutability does not mean the design is not denormalized.

---

### Q14

**Answer:** A, D

**Explanation:** `EXPLAIN` reveals index use and a selective B-tree lookup is roughly logarithmic. Such an index can avoid, not force, a full table scan.

---

### Q15

**Answer:** B, D

**Explanation:** Column order should reflect query patterns, and the index supports `user_id` plus `status`. Its leftmost `user_id` prefix can also be used alone.

---

### Q16

**Answer:** B, C

**Explanation:** A compatible predicate can use a partial index for active rows. Because it omits nonmatching rows, it can be much smaller than a full index.

---

### Q17

**Answer:** A, C

**Explanation:** Avoiding heap fetches reduces page reads, and `EXPLAIN ANALYZE` verifies the path. A covering index may avoid, not force, heap access.

---

### Q18

**Answer:** A, B

**Explanation:** Extra indexes consume space and add insert maintenance. Usage should be measured because a rarely used index may support a critical workload.

---

### Q19

**Answer:** A, D

**Explanation:** Aggregation can count matches and unmatched order columns are null. A left join from customers preserves rather than excludes customers without orders.

---

### Q20

**Answer:** A, C

**Explanation:** Join choice depends on estimates, indexes, and sizes, and the inner index enables fast lookups. A nested loop can be efficient for this shape.

---

### Q21

**Answer:** B, C

**Explanation:** A hash join can build from the smaller input and avoid repeated full scans. The table is built once, not rebuilt for each probe row.

---

### Q22

**Answer:** B, C

**Explanation:** A reporting system can protect OLTP traffic and a materialized view can precompute results. Materialized data still needs an explicit refresh policy.

---

### Q23

**Answer:** A, D

**Explanation:** `EXPLAIN ANALYZE` exposes estimate-versus-actual gaps, and stale statistics can cause poor plans. `ANALYZE` refreshes statistics rather than deleting them.

---

### Q24

**Answer:** B, D

**Explanation:** The output helps diagnose cache misses, and shared reads indicate storage access. Shared hits are pages found in memory, not fetched from storage.

---

### Q25

**Answer:** A, D

**Explanation:** ORMs commonly bind parameters, which helps prevent injection. Prepared statements can reduce repeated parse work rather than forcing a full reparse each time.

---

### Q26

**Answer:** B, C, D

**Explanation:** For small tables or low-selectivity predicates, a sequential scan can cost less than index traversal plus many random row fetches.

---

### Q27

**Answer:** A, B, C

**Explanation:** One transaction gives the transfer all-or-nothing atomicity, and durability preserves it after commit. Separate autocommits can leave a partial transfer.

---

### Q28

**Answer:** B, C, D

**Explanation:** Read Committed prevents dirty reads but permits non-repeatable reads and phantoms from transactions that commit between statements.

---

### Q29

**Answer:** A, C, D

**Explanation:** Consistent lock order reduces cycles; when one occurs, the database aborts a participant and the application can retry it.

---

### Q30

**Answer:** A, C, D

**Explanation:** External waits lengthen lock and connection ownership, increasing contention and pool pressure. Keep database transaction scope short.

---

### Q31

**Answer:** A, B, D

**Explanation:** MVCC preserves row versions for active snapshots and later reclaims obsolete versions. It reduces blocking but does not remove all locks.

---

### Q32

**Answer:** A, B, D

**Explanation:** Sagas, compensations, and transactional outboxes are common ways to coordinate eventually consistent services without defaulting to blocking 2PC.

---

### Q33

**Answer:** B, C, D

**Explanation:** ORMs improve object mapping and migration workflows, but their generated SQL still needs indexing, logging, and profiling.

---

### Q34

**Answer:** A, B, D

**Explanation:** A hybrid approach keeps productive ORM CRUD while using explainable raw SQL for complex reports. In-memory joins over all rows are usually costly.

---

### Q35

**Answer:** A, B, D

**Explanation:** One list query followed by one relation query per row is N+1. Repeated SQL shapes and query counts make it visible.

---

### Q36

**Answer:** A, B, D

**Explanation:** Select-in or prefetch loading uses a bounded query count without the parent-row multiplication of one very large join.

---

### Q37

**Answer:** A, B, C

**Explanation:** DataLoader batches keys and caches repeated request-local lookups. Monitoring confirms that resolver count is not driving query count.

---

### Q38

**Answer:** A, B, D

**Explanation:** Pool capacity is a fleet-wide budget: 10 × 30 can exceed the database limit. Operational and worker connections also need headroom.

---

### Q39

**Answer:** B, C, D

**Explanation:** Requests can wait because connections are busy or leaked even when individual queries are fast. Pool wait and SQL latency are separate metrics.

---

### Q40

**Answer:** B, C, D

**Explanation:** PgBouncer multiplexes client demand over fewer server connections. Transaction pooling is efficient, but session-bound behavior may require another mode.

---

### Q41

**Answer:** B, C, D

**Explanation:** Asynchronous replicas can lag, so primary routing or lag-aware routing is needed when a user must immediately observe a write.

---

### Q42

**Answer:** B, C, D

**Explanation:** Async replication reduces commit waiting but risks lag and data loss at failover. Sync waits for confirmation and may block when replicas are unavailable.

---

### Q43

**Answer:** B, C, D

**Explanation:** Replicas improve availability and reads but copy destructive changes too. Backups provide historical recovery, so both mechanisms are needed.

---

### Q44

**Answer:** A, B, C

**Explanation:** Promoting a lagging replica can lose recent writes, and fencing prevents two primaries from accepting divergent writes.

---

### Q45

**Answer:** A, C, D

**Explanation:** Replication copies the same dataset mainly for reads and availability; sharding divides the dataset to scale writes and storage.

---

### Q46

**Answer:** A, B, D

**Explanation:** A good shard key spreads traffic while co-locating data used together, keeping common requests on a single shard.

---

### Q47

**Answer:** B, C, D

**Explanation:** New writes concentrate in the current time range, creating a hot shard even if historical storage is balanced. A suitable hashed key can spread writes.

---

### Q48

**Answer:** A, B, D

**Explanation:** Independent shards cannot enforce cross-shard uniqueness or foreign keys natively. A global coordination mechanism is required.

---

### Q49

**Answer:** B, C, D

**Explanation:** Changing modulo N remaps many keys and requires migration. Consistent hashing limits movement but does not eliminate planning.

---

### Q50

**Answer:** A, B, C

**Explanation:** Without the shard key, the report becomes scatter-gather and must merge shard results. Precomputed analytics can keep that work off hot paths.
