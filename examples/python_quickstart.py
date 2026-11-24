#!/usr/bin/env python3
"""Zero-dependency Servers Are Up REST API v1 quickstart client."""

import json
import os
import urllib.request

BASE = os.environ.get("SAU_API_BASE", "https://serversareup.com").rstrip("/")
TOKEN = os.environ.get("SAU_API_TOKEN", "")


def api_get(path: str, auth: bool = False) -> dict:
    headers = {"Accept": "application/json", "User-Agent": "sau-api-cookbook/1.0"}
    if auth:
        if not TOKEN:
            raise RuntimeError("Set SAU_API_TOKEN environment variable first.")
        headers["Authorization"] = f"Bearer {TOKEN}"
    req = urllib.request.Request(f"{BASE}{path}", headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))


if __name__ == "__main__":
    print("API Version:", json.dumps(api_get("/api/v1/version"), indent=2))
    rec = api_get("/api/v1/recommend?workload=n8n&users=10")
    print("Workload Recommendation:", json.dumps(rec, indent=2)[:800])
    if TOKEN:
        print("Owned Instances:", json.dumps(api_get("/api/v1/instances", auth=True), indent=2))
