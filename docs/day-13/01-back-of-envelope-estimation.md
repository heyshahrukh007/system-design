# Back-of-Envelope Estimation

[← Day 13 Index](./README.md) | [Next: Design Decision Framework →](./02-design-decision-framework.md)

## Why Estimate

Rough numbers steer architecture:

| Scale | Typical implication |
|-------|---------------------|
| 100 req/s | Single region, simple DB often enough |
| 10K req/s | Cache, replicas, careful indexing |
| 100K+ req/s | Partitioning, CDN, async, multiple tiers |

Off by 100× → wrong design. Off by 2× → usually fine.

Related: [Day 2 capacity](../day-02/04-capacity-design.md), [Day 10 design process](../day-10/01-the-design-process.md).

---

## Core Formulas

### QPS from DAU

```
Avg QPS ≈ (DAU × actions_per_user_per_day) / 86_400
Peak QPS ≈ Avg × peak_factor     (often 2–5×)
```

**Example:** 10M DAU, 20 actions/day, peak 3×

```
Avg = 10e6 × 20 / 86400 ≈ 2,300 QPS
Peak ≈ 7,000 QPS
```

### Storage

```
Storage ≈ records × bytes_per_record × copies × growth_years
```

Include: replicas, indexes (~20–50%+), backups, logs.

### Bandwidth

```
Egress ≈ QPS × response_bytes × 8 → bits/s
```

Video/images dominate — estimate media separately ([Day 10 streaming](../day-10/09-video-streaming.md)).

### Read / Write Split

```
If 100 reads : 1 write → cache and read replicas pay off
If write-heavy → partitioning, queues, careful primary sizing
```

---

## Useful Constants (Memorize)

| Constant | Value |
|----------|-------|
| Seconds/day | ~10^5 (86,400) |
| Seconds/month | ~2.5 × 10^6 |
| ms in a day | ~10^8 |
| 1 KB | 10^3 bytes (approx) |
| 1 MB | 10^6 |
| 1 GB | 10^9 |
| 1 TB | 10^12 |
| Latency DRAM | ~100 ns |
| Latency SSD | ~100 µs |
| Latency network DC | ~0.5–2 ms |
| Latency cross-region | ~50–150 ms |
| HDD sequential | ~100 MB/s order |

Latency hierarchy drives caching ([Day 5](../day-05/README.md)).

---

## Worked Mini-Examples

### URL Shortener — 100M new URLs/month

```
Writes ≈ 100e6 / 2.5e6 ≈ 40 QPS write
Reads often 10–100× writes → 400–4,000 QPS read
Storage: 100e6 × 500 B × 12 months ≈ 600 GB/year (+ indexes/replicas)
```

### Chat — 50M DAU, 20 messages/day

```
Writes ≈ 50e6 × 20 / 86400 ≈ 11,500 msg/s
Fan-out and presence dominate design more than raw QPS
```

---

## Estimation Rules

1. Round aggressively (2,314 → ~2,000).  
2. State assumptions out loud (peak factor, bytes/row).  
3. Estimate **reads and writes separately**.  
4. Identify the **bottleneck resource** (CPU, disk IOPS, network, storage).  
5. Revisit estimates when requirements change.

---

## Summary

Estimation is rough math for architecture choices. Get the order of magnitude right; refine later.

Next: [Design Decision Framework](./02-design-decision-framework.md).
