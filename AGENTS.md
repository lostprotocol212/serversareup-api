# AGENTS.md — Servers Are Up Cloud API, MCP & CLI Guide

> Canonical Docs: `https://serversareup.com/docs/api` · `https://serversareup.com/docs/mcp` · `https://serversareup.com/docs/cli`
> Hosted Streamable HTTP MCP: `https://serversareup.com/api/mcp/v1` (alias: `https://mcp.serversareup.com`)
> Public REST API v1: `https://serversareup.com/api/v1`
> OpenAPI 3.1 Spec: `https://serversareup.com/openapi.json` (`openapi/openapi.v1.json` in this repo)

## Zero-Auth Discovery (No Token Required)

- `GET https://serversareup.com/api/v1/version` — API health & version
- `GET https://serversareup.com/api/v1/catalog` — Live catalog, specs, and availability
- `GET https://serversareup.com/api/v1/recommend?workload=n8n` — Plan recommender with `WELCOME20` pricing
- `GET https://serversareup.com/api/benchmarks/cloud-pricing` — CC-BY-4.0 22-provider $/GB RAM dataset
- `GET https://serversareup.com/api/game-community/public-servers` — Live official public game server fleet
- `POST https://serversareup.com/api/mcp/v1` — Zero-auth MCP discovery (`sau_search_catalog`, `sau_recommend_plan`, `sau_compare_providers`, `sau_search_docs_and_tools`, `sau_get_platform_facts`)

## Connect Coding Agents in 1 Command

```bash
# Claude Code (browser OAuth)
claude mcp add --transport http serversareup https://serversareup.com/api/mcp/v1

# OpenAI Codex CLI
codex mcp add serversareup --url https://serversareup.com/api/mcp/v1

# Google Gemini CLI
gemini mcp add --transport http serversareup https://serversareup.com/api/mcp/v1
```

## Guardrails

1. Never invent product pricing or availability; fetch live truth from `/api/v1/catalog`.
2. Reuse `Idempotency-Key` across retries on mutating requests.
3. Prefer 60–3600s ephemeral Ed25519 SSH key leases (`POST /api/v1/instances/{id}/ssh-leases`) + `knownHosts` verification rather than static passwords or permanent keys.
