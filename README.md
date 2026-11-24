# Servers Are Up — Public API, MCP & CLI Cookbook

> Official machine-readable **OpenAPI 3.1 contract**, **Streamable HTTP MCP** quickstarts, **CLI recipes**, **Agent Skills**, and **Context7** documentation for [Servers Are Up](https://serversareup.com).

[![Servers Are Up Status](https://serversareup.com/api/badges/status)](https://serversareup.com/status)
[![MCP Ready — 129 Scoped Tools](https://serversareup.com/api/badges/mcp-ready)](https://serversareup.com/mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## What Is Inside

| Directory / File | Contents | Canonical Source |
| --- | --- | --- |
| [`openapi/openapi.v1.json`](openapi/openapi.v1.json) | Canonical OpenAPI 3.1 REST API v1 schema | [https://serversareup.com/openapi.json](https://serversareup.com/openapi.json) |
| [`guides/rest-api-v1.md`](guides/rest-api-v1.md) | Auth scopes, idempotency, rate limits, guest exec & SSH leases | [https://serversareup.com/docs/api](https://serversareup.com/docs/api) |
| [`guides/mcp-server.md`](guides/mcp-server.md) | Zero-auth + OAuth2 Streamable HTTP MCP for Claude, Codex, Cursor, Gemini | [https://serversareup.com/docs/mcp](https://serversareup.com/docs/mcp) |
| [`guides/sau-cli.md`](guides/sau-cli.md) | `sau` CLI workflows & resource management | [https://serversareup.com/docs/cli](https://serversareup.com/docs/cli) |
| [`examples/`](examples) | Ephemeral Ed25519 SSH lease generator, HMAC webhook verifier, Python SDK-free client, GitHub Actions deploy | — |
| [`skills/serversareup/SKILL.md`](skills/serversareup/SKILL.md) | Agent Skill (`SKILL.md`) for Claude Code, Codex, Cursor & Antigravity | [`SKILL.md`](https://serversareup.com/.well-known/agent-skills/serversareup/SKILL.md) |
| [`context7.json`](context7.json) | Context7 indexing configuration | [https://serversareup.com/llms-full.txt](https://serversareup.com/llms-full.txt) |

## Try Without Signing Up

```bash
# Live API health + 2026 Open Cloud VPS Pricing Benchmark (CC-BY-4.0)
curl -sS https://serversareup.com/api/v1/version
curl -sS "https://serversareup.com/api/v1/recommend?workload=librechat&users=15"
curl -sS https://serversareup.com/api/benchmarks/cloud-pricing
```

## Related Repositories & Links

- **MCP Server (`@serversareup/mcp-server`):** [lostprotocol212/serversareup-mcp-server](https://github.com/lostprotocol212/serversareup-mcp-server) · Official MCP Registry: `com.serversareup/mcp`
- **Terminal CLI (`@serversareup/cli`):** [lostprotocol212/serversareup-cli](https://github.com/lostprotocol212/serversareup-cli)
- **VPS & Game Benchmark (`vpsbench`):** [lostprotocol212/vpsbench](https://github.com/lostprotocol212/vpsbench)
- **Active 5+ Player Game Server Communities:** Switch off paid hosts free at [https://serversareup.com/free-game-servers](https://serversareup.com/free-game-servers)
- **New Paid Compute:** Use code `WELCOME20` (`20% off` first order) at [https://serversareup.com/pricing?promo=WELCOME20](https://serversareup.com/pricing?promo=WELCOME20)
