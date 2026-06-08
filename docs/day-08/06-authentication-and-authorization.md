# Authentication and Authorization at Gateway

[← Routing and Load Balancing](./05-routing-and-load-balancing.md) | [Day 8 Index](./README.md) | [Next: Rate Limiting at Gateway →](./07-rate-limiting-at-gateway.md)

## Why Auth at Gateway

Validate **once at the edge** — backends receive trusted identity headers.

```
Without gateway auth:
  Every service validates JWT → duplicated logic, bugs, inconsistency

With gateway auth:
  Gateway validates → adds X-User-Id → services trust gateway
```

See [Day 2: Security Design](../day-02/07-security-design.md).

---

## Authentication Methods

### JWT (JSON Web Token)

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Gateway:
  1. Verify signature (public key / shared secret)
  2. Check exp, iss, aud
  3. Extract sub (user id), roles, scopes
  4. Forward to backend
```

| Pros | Cons |
|------|------|
| Stateless | Hard to revoke before expiry |
| No session store at gateway | Token size in every request |
| Works across services | Must secure signing keys |

**Refresh tokens** handled by auth service — not every API call.

### API Keys

```
X-API-Key: sk_live_abc123

Gateway looks up key → tenant, rate limit tier, permissions
```

Common for **partner APIs** and **server-to-server** integrations.

### OAuth 2.0 / OIDC

```
User logs in via Google / Auth0
Auth server issues access token + refresh token
Gateway validates access token (introspection or JWT)
```

Standard for user-facing apps and third-party access.

---

## Authorization at Gateway

**Authentication** = who are you?  
**Authorization** = what can you do?

| Level | Gateway | Backend |
|-------|---------|---------|
| Coarse | Block unauthenticated requests | Fine-grained |
| Route-level | `/admin/*` requires admin role | Resource ownership |
| Scope | `orders:read` in JWT | `user owns order 123` |

```
Gateway: reject if no valid token
Order Service: reject if user_id != order.owner_id
```

Don't put all authorization in gateway — resource checks belong in services.

---

## Federated Identity

**Federated identity** lets users sign in with an external Identity Provider (IdP) — Google, Okta, Azure AD, Auth0 — instead of only your local password DB.

```
User → Gateway → redirect / OIDC → IdP (login)
                 ← ID token / access token
      → Gateway validates token → services
```

| Concept | Role |
|---------|------|
| **IdP** | Authenticates the user |
| **RP / your app** | Trusts IdP tokens (OIDC/SAML) |
| **SSO** | One login across many apps |

Gateway (or auth service) validates issuer, audience, signature, and expiry. Services still enforce **authorization** on resources.

---

## Passing Identity to Backends

```
Downstream headers (set by gateway, strip from client):
  X-User-Id: 789
  X-Tenant-Id: acme
  X-Roles: user,premium
  X-Request-Id: uuid
```

Backends must **reject** client-supplied `X-User-Id` — only trust gateway-injected headers (mTLS or private network).

---

## mTLS Between Gateway and Services

```
Client ──HTTPS──▶ Gateway ──mTLS──▶ Services

Both sides present certificates
Prevents impersonation inside VPC
```

Service mesh automates mTLS ([11](./11-service-mesh-introduction.md)).

---

## Public vs Internal Routes

```
/api/v1/public/*   → no auth (health, product catalog)
/api/v1/auth/*     → login, register
/api/v1/*          → JWT required
/internal/*        → mTLS only, no public access
```

Gateway policy per route.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Services trust client `X-User-Id` | Strip at gateway, inject verified values |
| Long-lived JWT (30 days) | Short access token + refresh |
| Auth logic only in gateway | Services enforce resource-level auth |
| Secrets in gateway config repo | Use secret manager (Vault, AWS Secrets) |

---

## Summary

Gateway validates **JWT, API keys, or OAuth tokens** at the edge and forwards identity to services. Coarse authorization at gateway; fine-grained checks in services. Use mTLS for internal trust. Never let clients spoof identity headers.

---

[Next: Rate Limiting at Gateway →](./07-rate-limiting-at-gateway.md)
