# Distributed Object Storage

[← Search Autocomplete](./07-search-autocomplete.md) | [Day 10 Index](./README.md) | [Next: Video Streaming →](./09-video-streaming.md)

## Overview

Object storage holds **large binary blobs** — images, videos, backups, logs — as immutable files addressed by key. Systems like Amazon S3, Google Cloud Storage, and MinIO underpin feeds, chat media, and video platforms.

---

## Requirements

### Functional

- Upload and download objects by key (path)
- Object metadata: size, content-type, checksum, custom tags
- List objects by prefix (directory-like)
- Versioning and lifecycle rules (expire after N days)

### Non-Functional

| Requirement | Target |
|-------------|--------|
| Durability | 99.999999999% (11 nines) — do not lose blobs |
| Availability | 99.99% |
| Scale | Petabytes, billions of objects |
| Max object size | Multi-GB (multipart upload) |

---

## High-Level Architecture

```
┌────────┐     ┌─────────────┐     ┌──────────────────────────────┐
│ Client │────▶│ API /       │────▶│ Metadata DB                  │
│        │     │ Upload GW   │     │ (object key → locations)     │
└────────┘     └──────┬──────┘     └──────────────────────────────┘
                      │
                      ▼
              ┌───────────────┐
              │ Data nodes    │  (blobs on disk)
              │ + replication │
              └───────────────┘
```

**Separation:** Small metadata in SQL/NoSQL; **blob bytes on cheap disk** with replication.

---

## Object Model

```
Bucket: user-uploads
Key:    users/12345/avatar/2026-07-02.jpg
Value:  bytes + metadata

PUT  /buckets/{bucket}/objects/{key}
GET  /buckets/{bucket}/objects/{key}
```

Objects are **immutable** — updates create new version or new key.

---

## Upload Flow

**Small object (&lt; 5 MB):**

```
PUT body → API → write to data nodes (replica quorum) → commit metadata
```

**Large object (multipart):**

```
1. Initiate multipart upload → upload_id
2. PUT part 1, 2, ... N (parallel) → part ETags
3. Complete multipart → assemble metadata, mark object ready
```

Parallel parts maximize throughput; resume on failure without restarting.

---

## Storage Layout

```
Object key hashed → placement group → N replica nodes

Example: replication factor 3
  key hash → nodes [D7, D12, D31]
```

**Metadata record:**

```json
{
  "bucket": "user-uploads",
  "key": "users/123/photo.jpg",
  "size": 2048000,
  "checksum": "sha256:abc...",
  "replicas": ["d7", "d12", "d31"],
  "version_id": "v1"
}
```

---

## Durability: Replication vs Erasure Coding

| Method | How | Trade-off |
|--------|-----|-----------|
| **Replication** | 3 full copies on different nodes/racks | Simple; 3× storage cost |
| **Erasure coding** | Split into data + parity shards (e.g. 8+4) | ~1.5× storage; harder rebuild |

Hot/frequently accessed: replication  
Cold/archive tiers: erasure coding ([Day 3](../day-03/07-db-scaling.md) tiering mindset)

---

## Read Path

```
GET key
1. Lookup metadata → replica locations
2. Read from nearest healthy replica (load balancer / consistent hash)
3. Stream bytes to client
4. Verify checksum
```

**CDN integration** ([Day 3](../day-03/05-cdn.md)): public assets served from edge; origin is object store.

---

## Valet Key (Temporary Access)

Grant clients **time-limited, scoped credentials** to upload/download directly from object storage — without proxying bytes through your API servers.

```
1. Client → API: "I need to upload photo"
2. API checks authz → issues pre-signed URL (Valet Key) valid 5 min, PUT only to key uploads/u1/...
3. Client PUT bytes → Object store directly
4. Client → API: "upload complete" → API verifies and records metadata
```

| Benefit | Detail |
|---------|--------|
| Offload bandwidth | API not in the data path |
| Least privilege | Key limited to one object/action/TTL |
| Security | No long-lived public bucket writes |

Also called **pre-signed URL** / **SAS token** depending on cloud. Same idea for secure downloads of private objects.

---

## Consistency

```
After successful PUT, GET must return object (read-after-write consistency)
```

Metadata service coordinates: object not visible until all required replicas ack (or quorum per design).

**Eventual consistency** variants exist in some systems for list operations — know your provider's guarantees.

---

## Garbage Collection

```
Delete object → tombstone metadata → async GC removes bytes from data nodes
Versioning → old versions collected per lifecycle policy
```

Orphan parts from failed multipart uploads — sweeper job after 7 days.

---

## Failure Handling

| Failure | Response |
|---------|----------|
| Data node down | Serve from other replica; re-replicate ([Day 7](../day-07/04-redundancy-and-high-availability.md)) |
| Rack failure | Replicas placed across racks/zones |
| Bit rot | Background scrub compares checksums |
| Region loss | Cross-region replication for DR ([Day 7](../day-07/10-failover-and-disaster-recovery.md)) |

---

## Used By Other Day 10 Systems

| System | Use |
|--------|-----|
| News feed | Post images |
| Chat | Media attachments |
| Video streaming | Source files, transcoded segments ([topic 9](./09-video-streaming.md)) |

---

## Trade-offs

| Decision | Choice | Why |
|----------|--------|-----|
| Interface | Key-value blob | No random write inside file — simplifies replication |
| Metadata | Central DB | Fast lookup; blobs stay on data nodes |
| Durability | 3-way replication + scrub | Industry standard for hot data |
| Public delivery | CDN in front | Latency and egress cost |

---

## Summary

Distributed object storage splits **metadata** from **blob bytes**, places replicas (or erasure shards) across nodes and racks, and exposes a simple PUT/GET API. Durability comes from replication and verification — not single-disk reliability.

---

[← Search Autocomplete](./07-search-autocomplete.md) | [Day 10 Index](./README.md) | [Next: Video Streaming →](./09-video-streaming.md)
