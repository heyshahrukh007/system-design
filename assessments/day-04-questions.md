# Database Internals — MCQ Questions (50)

Multi-select format: each question has **two or more** correct answers.

> **Answers and explanations:** see [answer-key/day-04-answers.md](./answer-key/day-04-answers.md)




---

### Q01





A dashboard reads one row from a large table, but the buffer-pool hit ratio is low.

**Select all that apply.**

- [ ] A. More application servers guarantee fewer database page reads
- [ ] B. The engine normally reads only the requested column byte from disk
- [ ] C. A cache miss can require a page read from disk
- [ ] D. Database I/O is commonly page-oriented

---

### Q02





A list endpoint uses `SELECT *` on a table with several large text columns.

**Select all that apply.**

- [ ] A. `SELECT *` always improves buffer-pool efficiency
- [ ] B. Narrow projections can reduce database I/O
- [ ] C. Selecting only required columns can reduce transferred data
- [ ] D. Wider rows always let more rows fit on each database page

---

### Q03





An insert is acknowledged, then the database crashes before dirty data pages are flushed.

**Select all that apply.**

- [ ] A. Sequential WAL writes support durable commits efficiently
- [ ] B. WAL makes backups unnecessary
- [ ] C. Recovery can replay WAL after restart
- [ ] D. WAL is written only after the related data page is safely flushed

---

### Q04





A team compares PostgreSQL heap storage with InnoDB clustered storage.

**Select all that apply.**

- [ ] A. InnoDB stores table rows in primary-key index order
- [ ] B. PostgreSQL always stores heap rows physically in primary-key order
- [ ] C. Random primary keys can reduce insert locality in a clustered index
- [ ] D. A database buffer pool is the same cache as application Redis

---

### Q05





A `users` table needs a stable identifier and unique email addresses.

**Select all that apply.**

- [ ] A. A surrogate `id` must change whenever the user's email changes
- [ ] B. A `UNIQUE` constraint can enforce email uniqueness
- [ ] C. A primary key may contain duplicate values
- [ ] D. A primary key must be non-null

---

### Q06





An `order_items` row must reference an existing order.

**Select all that apply.**

- [ ] A. Indexing the child foreign-key column can speed joins and cascades
- [ ] B. `ON DELETE CASCADE` may suit line items owned by an order
- [ ] C. An indexed foreign key permits child rows whose parent does not exist
- [ ] D. Every database automatically indexes every foreign key

---

### Q07





A product may appear once per order, but in many different orders.

**Select all that apply.**

- [ ] A. The same `product_id` can appear with different `order_id` values
- [ ] B. `(order_id, product_id)` can be a composite primary key
- [ ] C. `product_id` must be globally unique in `order_items`
- [ ] D. Composite uniqueness requires the first key column alone to be unique

---

### Q08





A public API is choosing between auto-increment IDs and UUIDs.

**Select all that apply.**

- [ ] A. Auto-increment integers require random insertion locations and wide storage
- [ ] B. UUIDs can be generated independently across services
- [ ] C. Sequential IDs are always opaque to API clients
- [ ] D. Time-ordered UUIDs can improve locality over random UUIDs

---

### Q09





An orders table repeats the customer's current email on every order.

**Select all that apply.**

- [ ] A. Moving customer data to a `users` table reduces redundancy
- [ ] B. Repeating the email on every order prevents update anomalies
- [ ] C. Normalization stores each current fact in one authoritative place
- [ ] D. Repetition guarantees consistent customer data

---

### Q10





A table stores phone numbers as `"555-0100,555-0101"` in one column.

**Select all that apply.**

- [ ] A. The design violates the course's 1NF atomic-value rule
- [ ] B. One phone per row avoids a repeating group
- [ ] C. A separate row per phone necessarily violates 1NF
- [ ] D. Comma-separated values make relational filtering simpler

---

### Q11





`order_items(order_id, product_id, product_name, quantity)` has a composite key.

**Select all that apply.**

- [ ] A. `product_name` necessarily depends on the complete order-product key
- [ ] B. Moving product names to `products` helps reach 2NF
- [ ] C. `quantity` necessarily violates 2NF
- [ ] D. 2NF requires non-key columns to depend on the whole key

---

### Q12





An order stores `user_id`, `user_city`, and `user_country`.

**Select all that apply.**

- [ ] A. User location depending on `user_id` is a transitive dependency
- [ ] B. 3NF encourages non-key columns to depend on other non-key columns
- [ ] C. Normalization can reduce inconsistent location updates
- [ ] D. Keeping copied location fields on every order is required for 3NF

---

### Q13





Checkout copies product name and price onto an immutable order line.

**Select all that apply.**

- [ ] A. Denormalization trades some redundancy for read or audit needs
- [ ] B. The copy can preserve purchase-time history
- [ ] C. Every copied field is automatically a schema error
- [ ] D. Copying immutable purchase-time fields is never denormalization

---

### Q14





A million-row lookup by email performs a sequential scan.

**Select all that apply.**

- [ ] A. A selective index lookup is roughly logarithmic
- [ ] B. An index removes all write costs
- [ ] C. A B-tree index forces the engine to scan every row for an email lookup
- [ ] D. `EXPLAIN` can show whether the index is used

---

### Q15





An index exists on `(user_id, status, created_at)`.

**Select all that apply.**

- [ ] A. A composite index cannot support a predicate on its first column alone
- [ ] B. `WHERE user_id = ? AND status = ?` can use it
- [ ] C. `WHERE status = ?` is equally supported without `user_id`
- [ ] D. Column order should reflect important query patterns

---

### Q16





Most queries request only active orders, which are 3% of the table.

**Select all that apply.**

- [ ] A. A partial index must contain every table row
- [ ] B. A partial index can speed matching active-order queries
- [ ] C. The query predicate must be compatible with the index condition
- [ ] D. A partial index must occupy the same space as a full-table index

---

### Q17





A query filters by `user_id` and returns only `user_id` and `status`.

**Select all that apply.**

- [ ] A. Avoiding heap fetches can reduce page reads
- [ ] B. A covering index always forces an additional heap fetch for every row
- [ ] C. `EXPLAIN ANALYZE` can verify the actual access path
- [ ] D. A covering index has no storage or write overhead

---

### Q18





A write-heavy table has twelve rarely used indexes.

**Select all that apply.**

- [ ] A. Every insert may require multiple index updates
- [ ] B. Unused indexes consume disk space
- [ ] C. More indexes always improve write throughput
- [ ] D. All rarely used indexes should be dropped without measuring their workload

---

### Q19





A report must include every customer, even customers with no orders.

**Select all that apply.**

- [ ] A. Aggregation can count matched orders per customer
- [ ] B. A `LEFT JOIN` from customers excludes customers without orders
- [ ] C. An `INNER JOIN` preserves customers without orders
- [ ] D. Unmatched order columns will be `NULL`

---

### Q20





A planner joins a small filtered table to a large table with an indexed join key.

**Select all that apply.**

- [ ] A. The inner index supports fast repeated lookups
- [ ] B. A nested-loop join is always inefficient even with a small outer input and indexed inner key
- [ ] C. Join strategy depends on sizes, indexes, and estimates
- [ ] D. A cross join is required for equality matching

---

### Q21





Two large tables are joined on equality without useful indexes.

**Select all that apply.**

- [ ] A. A merge join never benefits from sorted inputs
- [ ] B. A hash join can outperform repeated full inner scans
- [ ] C. A hash join may build a hash table from the smaller input
- [ ] D. The hash table must be rebuilt for every row of the larger input

---

### Q22





A repeated report joins and aggregates millions of rows.

**Select all that apply.**

- [ ] A. Moving the join into an application loop guarantees fewer round trips
- [ ] B. A reporting replica or warehouse can protect OLTP traffic
- [ ] C. A materialized view can precompute the expensive result
- [ ] D. A materialized view stays current automatically without any refresh policy

---

### Q23





After a bulk load, estimated row counts differ sharply from actual counts.

**Select all that apply.**

- [ ] A. `EXPLAIN ANALYZE` compares estimates with actual execution
- [ ] B. The optimizer ignores value distributions and row counts
- [ ] C. Running `ANALYZE` deletes planner statistics instead of refreshing them
- [ ] D. Stale statistics can produce a poor execution plan

---

### Q24





`EXPLAIN ANALYZE` reports many shared reads and few shared hits.

**Select all that apply.**

- [ ] A. Shared hits indicate pages fetched from storage rather than memory
- [ ] B. Shared reads indicate pages fetched from storage
- [ ] C. `ANALYZE` never executes the query
- [ ] D. The output can help diagnose cache misses

---

### Q25





The same parameterized lookup runs thousands of times per minute.

**Select all that apply.**

- [ ] A. Parameter binding helps prevent SQL injection
- [ ] B. Prepared statements guarantee one optimal plan forever
- [ ] C. Prepared statements require the SQL to be reparsed from scratch on every execution
- [ ] D. ORMs commonly issue parameterized SQL

---

### Q26





A small table matches 80% of its rows for a filter despite having an index.

**Select all that apply.**

- [ ] A. Every sequential scan proves the optimizer is broken
- [ ] B. Selectivity and table size influence plan choice
- [ ] C. A sequential scan may be cheaper than many random heap lookups
- [ ] D. An index is not automatically the best plan

---

### Q27





A transfer debits one account and credits another.

**Select all that apply.**

- [ ] A. Atomicity prevents committing only the debit
- [ ] B. Both updates should share one transaction
- [ ] C. Durability means a committed transfer survives a crash
- [ ] D. Separate autocommit statements provide the same guarantee

---

### Q28





At Read Committed, a transaction reads the same row twice while another transaction commits an update.

**Select all that apply.**

- [ ] A. Dirty reads are required at Read Committed
- [ ] B. A repeated range query may also see phantoms
- [ ] C. The two reads may return different values
- [ ] D. This is a non-repeatable read

---

### Q29





Two transactions lock account rows in opposite order and deadlock.

**Select all that apply.**

- [ ] A. Retrying the aborted transaction can be appropriate
- [ ] B. Holding locks during HTTP calls prevents deadlocks
- [ ] C. Consistent lock ordering reduces deadlock risk
- [ ] D. The database may abort one transaction

---

### Q30





A service keeps a transaction open while waiting 20 seconds for an external API.

**Select all that apply.**

- [ ] A. The transaction may hold locks and a pooled connection
- [ ] B. An idle transaction has no operational cost
- [ ] C. External work should usually occur outside the transaction
- [ ] D. Long transactions can increase contention

---

### Q31





PostgreSQL updates a frequently changed row under MVCC.

**Select all that apply.**

- [ ] A. An update creates a new row version
- [ ] B. Vacuum can reclaim obsolete versions
- [ ] C. MVCC eliminates every kind of database lock
- [ ] D. Older snapshots may still see an old version

---

### Q32





An order workflow spans separate Order, Payment, and Inventory databases.

**Select all that apply.**

- [ ] A. A saga can coordinate local transactions with compensations
- [ ] B. A transactional outbox can reliably publish local changes
- [ ] C. Cross-service two-phase commit is always the default choice
- [ ] D. Eventual consistency is common across service boundaries

---

### Q33





A CRUD service uses an ORM for most data access.

**Select all that apply.**

- [ ] A. An ORM makes indexes unnecessary
- [ ] B. Migrations can version schema changes
- [ ] C. The ORM maps tables and relationships to language objects
- [ ] D. Generated SQL should still be logged and profiled

---

### Q34





A complex analytics query uses window functions and twelve joins.

**Select all that apply.**

- [ ] A. The final SQL should be checked with `EXPLAIN`
- [ ] B. Raw SQL can be a practical escape hatch
- [ ] C. Loading all rows and joining in memory is always safer
- [ ] D. The team can keep the ORM for ordinary CRUD

---

### Q35





An endpoint loads 100 orders, then lazily loads each customer.

**Select all that apply.**

- [ ] A. This is an N+1 query pattern
- [ ] B. Query count grows with the number of orders
- [ ] C. Fast individual queries make round-trip count irrelevant
- [ ] D. SQL logs can reveal repeated query shapes

---

### Q36





A page needs posts and their large comment collections.

**Select all that apply.**

- [ ] A. A batched `IN` query can load comments in a second query
- [ ] B. `prefetch_related` or select-in loading can avoid N+1
- [ ] C. Lazy access inside the render loop is the safest default
- [ ] D. One huge join may duplicate parent data extensively

---

### Q37





A GraphQL request resolves authors separately for 200 posts.

**Select all that apply.**

- [ ] A. Request-scoped caching can avoid duplicate loads
- [ ] B. A DataLoader can batch author IDs
- [ ] C. Query-count monitoring can detect this pattern
- [ ] D. One database query per resolver is required by GraphQL

---

### Q38





Ten application instances each configure a pool of 30 connections; the database limit is 100.

**Select all that apply.**

- [ ] A. Capacity should leave headroom for operations and workers
- [ ] B. Fleet demand can reach 300 connections
- [ ] C. Increasing every pool to 60 fixes the database limit
- [ ] D. Pool sizing must account for all instances

---

### Q39





Requests time out waiting for a pool connection, although SQL execution is fast.

**Select all that apply.**

- [ ] A. This symptom proves a missing table index
- [ ] B. Pool wait time should be monitored separately from query time
- [ ] C. A leaked connection can gradually drain the pool
- [ ] D. All pooled connections may be busy

---

### Q40





Many short-lived services connect through PgBouncer.

**Select all that apply.**

- [ ] A. Pooling caches query results like Redis
- [ ] B. Session-dependent features may constrain pooling-mode choice
- [ ] C. Transaction pooling can reuse a server connection after each transaction
- [ ] D. The pooler can multiplex many clients onto fewer database connections

---

### Q41





A user updates a profile on the primary, then immediately reads from an asynchronous replica.

**Select all that apply.**

- [ ] A. Asynchronous replication guarantees immediate visibility
- [ ] B. Replica lag can return the old profile
- [ ] C. Lag-aware routing is another mitigation
- [ ] D. Routing recent reads to the primary can provide read-your-writes

---

### Q42





A team chooses between synchronous and asynchronous replication.

**Select all that apply.**

- [ ] A. Synchronous replication can never reduce availability
- [ ] B. Synchronous replication waits for replica confirmation
- [ ] C. Asynchronous replication favors lower write latency
- [ ] D. Asynchronous failover can lose recent acknowledged writes

---

### Q43





Operations wants both a replica and backups.

**Select all that apply.**

- [ ] A. A replica always replaces point-in-time backups
- [ ] B. Replication can support failover and read scaling
- [ ] C. Backups support recovery to an earlier point
- [ ] D. A replicated accidental delete can reach replicas

---

### Q44





A primary fails while one asynchronous replica is several seconds behind.

**Select all that apply.**

- [ ] A. Promoting that replica may increase recovery-point loss
- [ ] B. Failover should consider replica lag
- [ ] C. Fencing helps prevent split-brain writes
- [ ] D. Any replica promotion guarantees zero lost commits

---

### Q45





A single primary has reached its write and storage limits.

**Select all that apply.**

- [ ] A. Read replicas alone do not distribute primary writes
- [ ] B. Replication and sharding solve exactly the same problem
- [ ] C. Sharding splits different rows across database nodes
- [ ] D. Sharding can scale write throughput and storage

---

### Q46





An orders service must choose a shard key.

**Select all that apply.**

- [ ] A. A good key distributes load evenly
- [ ] B. A shared `user_id` key can co-locate orders and line items
- [ ] C. A low-cardinality status is usually an even shard key
- [ ] D. Hot-path queries should usually route to one shard

---

### Q47





Orders are range-sharded by creation month, and nearly all writes target this month.

**Select all that apply.**

- [ ] A. Date-range sharding always balances append traffic
- [ ] B. Even total storage does not guarantee even current traffic
- [ ] C. Hashing a suitable tenant or user key may spread writes better
- [ ] D. The current range can become a hot shard

---

### Q48





Users are sharded by `user_id`, but email must be globally unique.

**Select all that apply.**

- [ ] A. Per-shard unique constraints cannot detect duplicates on other shards
- [ ] B. A global lookup or index service can coordinate uniqueness
- [ ] C. Native foreign keys automatically span independent shards
- [ ] D. Global constraints require explicit distributed design

---

### Q49





A system changes routing from `hash(key) % 4` to `% 8`.

**Select all that apply.**

- [ ] A. Changing the divisor is sufficient with no migration
- [ ] B. Consistent hashing can reduce key movement
- [ ] C. Resharding requires data movement and a cutover plan
- [ ] D. Naive modulo changes the destination for many keys

---

### Q50





A report counts active orders without a shard-key predicate.

**Select all that apply.**

- [ ] A. The router may need to query every shard
- [ ] B. A warehouse or precomputed aggregate may better serve the report
- [ ] C. Partial results must be merged
- [ ] D. Cross-shard queries are ideal for every hot request path
