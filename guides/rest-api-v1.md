# REST API v1 Quick Reference

> Canonical guide: [https://serversareup.com/docs/api](https://serversareup.com/docs/api) · Machine contract: [`../openapi/openapi.v1.json`](../openapi/openapi.v1.json)

## Base URL & Authentication

- **API Base:** `https://serversareup.com/api/v1`
- **Bearer Token:** `Authorization: Bearer sau_...` (mint least-privilege Personal Access Tokens at `https://serversareup.com/account/api-keys`)
- **Zero-Auth Public Endpoints:** `GET /version`, `GET /catalog`, `GET /recommend?workload=<stack>`

## Scopes

| Scope | Grants |
| --- | --- |
| `catalog:read` | Public & account catalog reads |
| `account:read` | Account metadata and quotas |
| `instances:read` | List/inspect instances and published access endpoints |
| `instances:write` | Rename instances, update tags, and configure entry points |
| `instances:power` | Start, stop, restart, rebuild, resize, snapshots |
| `instances:exec` | Non-interactive command execution (`60s` max) and ephemeral `60–3600s` SSH leases |
| `instances:files:read` / `write` | UTF-8 guest file read/write (`5 MB` max) |
| `ssh-keys:read` / `write` | Account SSH key registry |
| `cloud:read` / `write` | Resource Manager groups/locks, Azure-hosted Cloud Storage, Multi-Model Cloud DB, Key Vault, SIEM |
| `webhooks:write` | Manage HMAC-SHA256 webhook subscriptions |
| `billing:read` / `write` | Orders and Virtual Datacenter capacity |

## Core Lifecycle Endpoints

```bash
# 1. Check health & live catalog without an API key
curl -sS https://serversareup.com/api/v1/version
curl -sS "https://serversareup.com/api/v1/catalog?type=VM"

# 2. List owned instances
curl -sS -H "Authorization: Bearer $SAU_API_TOKEN" \
  https://serversareup.com/api/v1/instances

# 3. Execute non-interactive command inside a RUNNING guest
curl -sS -X POST "https://serversareup.com/api/v1/instances/${INSTANCE_ID}/exec" \
  -H "Authorization: Bearer $SAU_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"command":"uname -a && uptime","timeoutMs":15000}'

# 4. Mint a 30-minute Ed25519 ephemeral SSH lease
curl -sS -X POST "https://serversareup.com/api/v1/instances/${INSTANCE_ID}/ssh-leases" \
  -H "Authorization: Bearer $SAU_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"publicKey":"ssh-ed25519 AAAA... deploy-bot","leaseSeconds":1800}'
```

## Rate Limits & Idempotency

- Check `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, and `Retry-After` on `429`.
- Supply `Idempotency-Key: <uuid>` on mutating `POST` and `DELETE` calls so safe retries never duplicate orders or leases.
- All errors use `{ "error": string, "code": string, "details"?: object, "retryAfter"?: number }`.
