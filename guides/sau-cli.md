# `sau` CLI Quick Guide

> Canonical guide: [https://serversareup.com/docs/cli](https://serversareup.com/docs/cli) · Source repo: [lostprotocol212/serversareup-cli](https://github.com/lostprotocol212/serversareup-cli)

## Installation (Node.js 20+)

```bash
npm install -g https://serversareup.com/downloads/serversareup-cli.tgz
sau auth login --token sau_your_token
```

## Everyday Commands

```bash
# Inspect live catalog without waiting for web UI
sau catalog -o table

# List and operate compute instances
sau instances list -o table
sau instances exec <instance-id> -- systemctl status nginx --no-pager
sau instances ssh <instance-id> --json
sau instances power <instance-id> restart

# Manage snapshots, Resource Manager groups, Cloud Storage & Multi-Model Cloud DB
sau snapshots list <instance-id>
sau group list -o table
sau storage blobs-list -o table
sau cosmosdb list -o table
sau sentinel show -o table
```
