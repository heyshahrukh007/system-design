# News Feed / Timeline

[← Notification System](./04-notification-system.md) | [Day 10 Index](./README.md) | [Next: Chat / Messaging →](./06-chat-messaging.md)

## Overview

A news feed shows a personalized, time-ordered list of posts from people and pages a user follows — the core of Twitter, Instagram, LinkedIn, and Facebook. The central design tension is **fan-out on write** vs **fan-out on read**.

---

## Requirements

### Functional

- Users publish posts (text, images, links)
- Users follow other users
- Home feed: recent posts from followed accounts, ranked by recency (v1) or engagement (v2)
- Paginated feed API (cursor-based)

### Non-Functional

| Requirement | Target |
|-------------|--------|
| Feed read latency | &lt; 200 ms p99 |
| Post publish | &lt; 500 ms (user sees confirmation) |
| Scale | 300M users, 500M posts/day, avg 200 follows per user |
| Celebrity users | Up to 50M followers |

---

## Scale Estimates

```
Posts/day:     500M → ~6,000 writes/sec average
Feed reads:    10× posts → ~60,000 reads/sec
Fan-out write: Normal user 200 followers → 200 cache rows per post
Celebrity:     50M followers → 50M writes per post (prohibitive on write path)
```

---

## High-Level Architecture

```
┌──────────┐     ┌─────────────┐     ┌──────────────┐
│ Post API │────▶│ Post Service│────▶│ Posts DB     │
└──────────┘     └──────┬──────┘     │ (sharded)    │
                        │            └──────────────┘
                        ▼
                 ┌─────────────┐
                 │ Fan-out     │
                 │ Workers     │
                 └──────┬──────┘
                        ▼
              ┌──────────────────┐
              │ Feed cache       │  Redis: feed:{user_id} → [post_ids]
              │ (per user)       │
              └──────────────────┘
                        ▲
┌──────────┐     ┌────────┴─────┐
│ Feed API │────▶│ Feed Service │
└──────────┘     └──────────────┘
```

---

## Fan-Out on Write

When user A posts, **push post ID into every follower's feed cache**.

```
Post created (id=999)
→ For each follower F of A:
    LPUSH feed:F 999
    LTRIM feed:F 0 999   (keep last 1000 items)
```

**Pros:** Feed read is O(1) — read precomputed list from Redis  
**Cons:** Write amplification; celebrities break the model

**Use when:** Users have modest follower counts (&lt; 10K)

---

## Fan-Out on Read

Feed built at read time:

```
GET feed for user U:
1. Load list of users U follows
2. Fetch recent posts from each (or query posts by followee set)
3. Merge, sort, rank, paginate
```

**Pros:** No write amplification; celebrities cheap to post  
**Cons:** Read is expensive; hard at 200+ followees without optimization

**Use when:** Read-heavy celebrities or low-follow accounts

---

## Hybrid (Production Approach)

```
IF author.follower_count < 10_000:
    fan-out on write → push to follower feed caches
ELSE:
    fan-out on read → store post in celebrity timeline only
    merge at read time: cache_feed + celebrity_posts
```

Twitter and others use variants of this threshold.

---

## Data Model

**Posts (sharded by post_id or author_id)**

```sql
CREATE TABLE posts (
    id          BIGINT PRIMARY KEY,
    author_id   BIGINT NOT NULL,
    content     TEXT,
    created_at  TIMESTAMPTZ,
    ...
);
CREATE INDEX idx_author_created ON posts(author_id, created_at DESC);
```

**Follows**

```sql
CREATE TABLE follows (
    follower_id  BIGINT,
    followee_id  BIGINT,
    PRIMARY KEY (follower_id, followee_id)
);
```

**Feed cache (Redis)**

```
feed:{user_id} → sorted set or list of post_ids (newest first)
TTL optional; rebuild from DB on cold start
```

---

## Feed Read API

```
GET /v1/feed?cursor=eyJpZCI6OTk5fQ&limit=20

→ {
    "items": [ { "post_id", "author", "content", "created_at" }, ... ],
    "next_cursor": "..."
  }
```

Cursor = last seen post_id + timestamp — stable under new posts.

---

## Ranking (Beyond Chronological)

```
score = w1 * recency_decay + w2 * engagement + w3 * relationship_strength
```

- Precompute scores in fan-out worker for hot paths
- Or rank at read from small candidate set (top 500 from cache → re-rank top 20)

ML ranking is a separate pipeline — often async feature store updates.

---

## Media and CDN

Post images stored in object storage ([topic 8](./08-distributed-object-storage.md)); URLs in post body served via CDN ([Day 3](../day-03/05-cdn.md)).

---

## Reliability

| Issue | Mitigation |
|-------|------------|
| Fan-out worker lag | Queue depth alert; scale consumers |
| Hot author | Hybrid model; don't write 50M caches |
| Stale feed | Accept eventual consistency for fan-out (seconds) |
| Cache loss | Rebuild feed from posts + follows (slower path) |

---

## Trade-offs

| Decision | Choice | Why |
|----------|--------|-----|
| Default fan-out | Write for normal users | Fast reads for majority |
| Celebrities | Read-time merge | Avoid write storm |
| Feed store | Redis lists/sorted sets | Sub-ms reads at scale |
| Post storage | Sharded SQL or wide-column | By author_id for profile; by id globally |

---

## Summary

News feeds are a **fan-out problem**. Precompute feeds on write for most users; pull celebrity content on read; merge at request time. Cache per-user timelines in Redis and shard posts by author for efficient profile and fan-out queries.

---

[← Notification System](./04-notification-system.md) | [Day 10 Index](./README.md) | [Next: Chat / Messaging →](./06-chat-messaging.md)
