# Chat / Messaging

[← News Feed](./05-news-feed.md) | [Day 10 Index](./README.md) | [Next: Search Autocomplete →](./07-search-autocomplete.md)

## Overview

A chat system lets users send messages in real time — one-to-one and group conversations. Challenges include **low-latency delivery**, **online presence**, **message history**, and **sync across devices**.

---

## Requirements

### Functional

- One-to-one and group chats
- Send/receive text and media
- Message history with pagination
- Read receipts and typing indicators (optional v1)
- Online/offline presence

### Non-Functional

| Requirement | Target |
|-------------|--------|
| Message delivery latency | &lt; 200 ms p99 for online users |
| Availability | 99.9% |
| Scale | 50M DAU, 1B messages/day |
| Ordering | Per-conversation total order |

---

## Scale Estimates

```
Messages/day: 1B → ~12,000 msg/sec average, ~40K peak
Storage: 1B × 200 bytes avg ≈ 200 GB/day → tiered retention + cold storage
Connections: 50M DAU, ~10% concurrent → 5M WebSocket connections
```

---

## High-Level Architecture

```
┌────────┐  WebSocket   ┌──────────────┐
│ Client │◀────────────▶│ Chat Gateway │  (connection layer, stateful)
└────────┘              └──────┬───────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        ┌──────────┐   ┌──────────┐   ┌──────────────┐
        │ Message  │   │ Presence │   │ Notification │
        │ Service  │   │ Service  │   │ (offline push)│
        └────┬─────┘   └────┬─────┘   └──────────────┘
             │              │
             ▼              ▼
        ┌──────────┐   ┌──────────┐
        │ Messages │   │  Redis   │  presence, pub/sub routing
        │ DB       │   └──────────┘
        └──────────┘
             │
        ┌────▼─────┐
        │  Kafka   │  (cross-region, async fan-out)
        └──────────┘
```

---

## Connection Layer (Chat Gateway)

Clients hold **long-lived WebSocket** connections to gateway nodes.

```
User U connects → Gateway G1 (sticky session or consistent hash by user_id)
U's socket lives on G1 until disconnect
```

**Problem:** Recipient R may be on Gateway G2.

**Solution:** **Pub/sub routing bus** (Redis Pub/Sub, or dedicated message router):

```
G1 receives message for R → publish to channel "user:R" → G2 subscribed → push to R's socket
```

Gateway is **stateful** — scale by adding nodes and routing via user_id affinity.

---

## Message Flow (Online Recipient)

```
1. User A sends message via WebSocket to Gateway G1
2. G1 → Message Service: validate, persist, assign sequence_id
3. Message Service writes to DB (conversation_id, seq, body, timestamp)
4. Message Service publishes delivery event (recipient_id=B)
5. Router delivers to Gateway holding B's connection
6. B receives message in real time
7. A gets ACK with server message_id
```

**Persist before deliver** — if gateway crashes after deliver but before store, message is lost. Write to DB (or WAL) first, then push.

---

## Data Model

**Conversations**

```sql
CREATE TABLE conversations (
    id            BIGINT PRIMARY KEY,
    type          VARCHAR(16),  -- direct, group
    created_at    TIMESTAMPTZ
);

CREATE TABLE conversation_members (
    conversation_id  BIGINT,
    user_id          BIGINT,
    PRIMARY KEY (conversation_id, user_id)
);
```

**Messages (partitioned by conversation_id)**

```sql
CREATE TABLE messages (
    conversation_id  BIGINT,
    sequence_id      BIGINT,       -- monotonic per conversation
    sender_id        BIGINT,
    body             TEXT,
    created_at       TIMESTAMPTZ,
    PRIMARY KEY (conversation_id, sequence_id)
);
```

`sequence_id` gives strict ordering within a chat without global coordination.

---

## History API

```
GET /v1/conversations/{id}/messages?before_seq=500&limit=50
```

- Paginate backwards by `sequence_id`
- Index: `(conversation_id, sequence_id DESC)`
- Hot conversations: cache recent window in Redis

---

## Presence

```
User connects    → SET presence:{user_id} = online, TTL 60s, heartbeat every 30s
User disconnects → DEL or let TTL expire → offline
```

Friends query presence via Presence Service (batch `MGET`).

**Last seen:** Update on disconnect or periodic heartbeat.

---

## Offline Users

If recipient has no active connection:

```
Message persisted → trigger push notification ([topic 4](./04-notification-system.md))
On next app open → client syncs via history API (missed messages since last_seq)
```

---

## Group Chat

```
Message to group G with 500 members:
1. Persist once
2. Fan-out delivery to 500 online sessions (via pub/sub)
3. Offline members → push notifications (batched or summarized for large groups)
```

Large groups may use **read receipts at aggregate level** only to reduce fan-out.

---

## Multi-Device Sync

Same user logged in on phone and laptop:

```
All devices subscribe to user:{user_id}
Message delivered to all active sessions
Read cursor stored per (user_id, conversation_id) — sync read state
```

---

## Reliability

| Concern | Approach |
|---------|----------|
| Duplicate delivery | Client dedupes by `message_id`; idempotent send with client-generated UUID |
| Gateway failure | Client reconnects to another gateway; sync from last_ack_seq |
| Partition / ordering | Per-conversation sequence from DB or distributed counter per conv |
| Kafka | Cross-DC replication for disaster recovery |

---

## Trade-offs

| Decision | Choice | Why |
|----------|--------|-----|
| Transport | WebSocket | Bi-directional, low latency |
| Routing | Pub/sub between gateways | Recipients not on same node |
| Order key | Per-conversation sequence | Simpler than global order |
| Storage | SQL partitioned by conversation | Range queries for history |

---

## Summary

Chat systems split **connection management** (stateful gateways) from **message persistence** (stateless services + DB). Route between gateways with pub/sub, assign per-conversation sequence IDs, persist before push, and use notifications for offline users.

---

[← News Feed](./05-news-feed.md) | [Day 10 Index](./README.md) | [Next: Search Autocomplete →](./07-search-autocomplete.md)
