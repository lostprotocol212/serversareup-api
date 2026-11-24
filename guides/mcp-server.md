# Model Context Protocol (MCP) Integration Guide

> Canonical guide: [https://serversareup.com/docs/mcp](https://serversareup.com/docs/mcp) · Local package repo: [lostprotocol212/serversareup-mcp-server](https://github.com/lostprotocol212/serversareup-mcp-server) · Official Registry: `com.serversareup/mcp`

## Hosted Streamable HTTP Endpoints

- Primary URL: `https://serversareup.com/api/mcp/v1`
- Dedicated Subdomain: `https://mcp.serversareup.com`
- Server Card (SEP-1649): `https://serversareup.com/.well-known/mcp/server-card.json`
- A2A Agent Card: `https://serversareup.com/.well-known/agent-card.json`

## Zero-Auth Public Discovery Tools

Any unauthenticated MCP client calling `initialize` + `tools/list` on `https://serversareup.com/api/mcp/v1` can call:

1. `sau_search_catalog` — Filter live Linux, Windows, Docker/K3s, Virtual Datacenter & Game Server SKUs
2. `sau_recommend_plan` — Match workload requirements + budget to plans with `WELCOME20` pricing
3. `sau_compare_providers` — Benchmark `$/GB RAM` against 22 cloud & game-host providers
4. `sau_search_docs_and_tools` — Search docs and 22 free network/sysadmin utilities
5. `sau_get_platform_facts` — Retrieve US Dell PowerEdge R940 hardware specs, SLAs & promos

## Client Snippets

**Claude Code (OAuth browser approval):**

```bash
claude mcp add --transport http serversareup https://serversareup.com/api/mcp/v1
```

**Cursor / VS Code / Windsurf (`mcp.json`):**

```json
{
  "mcpServers": {
    "serversareup": {
      "url": "https://serversareup.com/api/mcp/v1",
      "headers": {
        "Authorization": "Bearer ${SAU_API_TOKEN}"
      }
    }
  }
}
```
