# Video Streaming

[← Distributed Object Storage](./08-distributed-object-storage.md) | [Day 10 Index](./README.md) | [Next: E-Commerce Checkout →](./10-ecommerce-checkout.md)

## Overview

A video platform lets users upload video, transcode it into multiple qualities, and stream it to viewers with **adaptive bitrate** — Netflix, YouTube, and Twitch all follow variants of this architecture.

---

## Requirements

### Functional

- Upload video (creator)
- Transcode to multiple resolutions/bitrates
- Playback with quality switching based on bandwidth
- Progress tracking (resume where you left off)
- Thumbnails and metadata

### Non-Functional

| Requirement | Target |
|-------------|--------|
| Upload | Support files up to 10 GB |
| Playback start | &lt; 2 s to first frame |
| Scale | 1M hours uploaded/day, 100M hours viewed/day |
| CDN | Serve 95%+ of bytes from edge |

---

## Scale Estimates

```
Viewing dominates bandwidth:
  100M hours/day × 2 Mbps avg ≈ 23 Pb/day egress → CDN mandatory

Upload: 1M hours/day → async transcoding farm, not real-time for all
```

---

## High-Level Architecture

```
Upload                    Processing                 Delivery
──────                    ──────────                 ────────

Creator ──▶ Upload API ──▶ Object Store (raw)
                │              │
                │              ▼
                │         Kafka (video.uploaded)
                │              │
                │              ▼
                │         Transcode Workers
                │              │
                │              ▼
                │         Object Store (HLS segments)
                │              │
                ▼              ▼
           Metadata DB    CDN ◀── Viewer
```

---

## Upload Path

**Resumable multipart upload** to object storage ([topic 8](./08-distributed-object-storage.md)):

```
1. POST /v1/videos → { video_id, upload_urls[] }
2. Client uploads chunks directly to storage (presigned URLs)
3. Complete upload → event video.uploaded
```

Direct-to-storage upload keeps API servers out of the byte path.

---

## Transcoding Pipeline

```
video.uploaded → Worker pulls raw file
              → FFmpeg: 360p, 720p, 1080p + audio
              → Output: HLS segments (.ts) + manifest (.m3u8)
              → Write segments to object store
              → Update metadata (status=ready, renditions[])
```

**Async and parallel** — many workers consume queue ([Day 6](../day-06/09-consumers-and-scaling.md)).

| Job state | Meaning |
|-----------|---------|
| uploaded | Raw in storage |
| processing | Transcode in progress |
| ready | All renditions available |
| failed | DLQ + retry |

---

## Playback: Adaptive Bitrate (ABR)

**HLS / DASH** split video into small segments (2–10 sec each).

```
# manifest.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=5000000
1080p/playlist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2500000
720p/playlist.m3u8
```

Client player:

```
Measure download speed
Pick highest sustainable bitrate
Switch up/down per segment — no full rebuffer
```

---

## Delivery Path

```
Viewer GET https://cdn.example.com/videos/{id}/720p/segment_042.ts
→ CDN edge (cache hit → instant)
→ Origin object store on miss
```

**CDN is non-optional** at scale ([Day 3](../day-03/05-cdn.md)). Origin handles long-tail and cache fill only.

---

## Metadata

```sql
CREATE TABLE videos (
    id            UUID PRIMARY KEY,
    owner_id      BIGINT,
    title         TEXT,
    status        VARCHAR(32),
    duration_sec  INT,
    created_at    TIMESTAMPTZ
);

CREATE TABLE renditions (
    video_id      UUID,
    resolution    VARCHAR(16),
    manifest_url  TEXT,
    bitrate       INT
);
```

---

## Live Streaming (Extension)

```
Encoder → ingest server (RTMP/WebRTC) → segmenter → CDN (low-latency HLS)
```

Live adds **seconds of latency** trade-off vs VOD. Separate ingest cluster; same CDN delivery model.

---

## Reliability

| Concern | Approach |
|---------|----------|
| Transcode failure | Retry; DLQ; notify creator |
| Hot viral video | CDN absorbs; origin shield |
| Partial upload | Multipart resume |
| Copyright / abuse | Async moderation queue before `ready` |

---

## Observability

- Transcode queue lag, job duration percentiles
- CDN cache hit ratio, origin egress
- Playback errors by region (client beacons → analytics pipeline)

---

## Trade-offs

| Decision | Choice | Why |
|----------|--------|-----|
| Format | HLS | Broad device support |
| Upload | Direct to object store | Scales bandwidth |
| Transcode | Async workers | CPU-heavy; decoupled |
| Delivery | CDN + segments | ABR + global latency |

---

## Summary

Video streaming is **upload → async transcode → segment storage → CDN playback**. The API path is thin; bytes flow through object storage and edge caches. Adaptive bitrate is a client + manifest design, not a single file download.

---

[← Distributed Object Storage](./08-distributed-object-storage.md) | [Day 10 Index](./README.md) | [Next: E-Commerce Checkout →](./10-ecommerce-checkout.md)
