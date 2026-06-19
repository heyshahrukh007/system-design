# Service Discovery

[← Rate Limiting at Gateway](./07-rate-limiting-at-gateway.md) | [Day 10 Index](./README.md) | [Next: Client-Side vs Server-Side Discovery →](./09-client-side-vs-server-side-discovery.md)

## The Problem

Services scale up and down. IPs change. Deployments replace instances.

```
Yesterday: order-service at 10.0.1.10
Today:     new pod at 10.0.2.45, old one gone

Hardcoded IP in gateway config → broken
```

**Service discovery** answers: *where are the healthy instances of `order-service` right now?*

---

## Core Concepts

| Term | Meaning |
|------|---------|
| **Service name** | Logical name: `order-service` |
| **Instance** | One running copy with host:port |
| **Registry** | Database of services and instances |
| **Registration** | Instance announces itself on startup |
| **Deregistration** | Instance removes itself on shutdown |
| **Health check** | Registry marks unhealthy instances |

```
Registry:
  order-service → [10.0.1.10:8080, 10.0.1.11:8080]
  user-service  → [10.0.2.20:8080]
```

---

## How It Works

```
1. order-service instance starts on 10.0.1.12:8080
2. Registers with registry: "order-service" + address
3. Gateway / LB queries registry for "order-service"
4. Gets list of healthy instances
5. Load balances request to one instance
6. On crash, health check fails → instance removed
```

---

## Service Registry Tools

| Tool | Ecosystem |
|------|-----------|
| **Consul** | HashiCorp, health checks, KV store |
| **etcd** | Kubernetes backing store |
| **ZooKeeper** | Older Hadoop/Kafka ecosystems |
| **Eureka** | Netflix, Spring Cloud |
| **Kubernetes DNS** | `order-service.namespace.svc.cluster.local` |
| **AWS Cloud Map** | AWS native discovery |

---

## DNS-Based Discovery

Simplest form — DNS name resolves to multiple A records.

```
order-service.internal → 10.0.1.10, 10.0.1.11, 10.0.1.12

Client resolves DNS → picks one IP (client-side LB)
```

Kubernetes Services work this way — ClusterIP + kube-proxy or iptables/IPVS.

| Pros | Cons |
|------|------|
| Simple, universal | TTL delays propagation |
| No extra client library | Limited health awareness in basic DNS |

---

## Health-Aware Discovery

Registry only returns **healthy** instances.

```
Consul health check: GET /health every 10s
Fails 3× → remove from catalog
Gateway query → only healthy nodes returned
```

Ties to [10-health-checks.md](./10-health-checks.md).

---

## Discovery in Kubernetes

```
Deployment: order-service (3 replicas)

Service: order-service (ClusterIP)
  → stable DNS name
  → load balances to pod endpoints

Endpoints controller updates pod list on scale/rollout

Other pods call: http://order-service:8080/orders
```

Built-in discovery — no Eureka needed for K8s-native apps.

---

## When Discovery Matters

| Setup | Discovery |
|-------|-----------|
| Single server | Not needed |
| Fixed VMs + LB | Static config or basic DNS |
| Auto-scaling containers | Registry or K8s DNS required |
| Multi-cloud | Consul, Cloud Map |

---

## Summary

Service discovery maps **logical service names** to **current healthy instances**. Instances register on start; registry removes failures. Kubernetes DNS is the default in K8s; Consul/Eureka for broader ecosystems. Gateway and LB query registry instead of hardcoding IPs.

---

[Next: Client-Side vs Server-Side Discovery →](./09-client-side-vs-server-side-discovery.md)
