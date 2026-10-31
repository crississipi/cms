#!/usr/bin/env python3
"""
HubSpot Deal-to-CSV Exporter
Exports Deals created in the preceding seven days (UTC) to a CSV file.

Adheres strictly to the guidelines in AGENTS.md:
- Read-only queries via HubSpot CRM Search API.
- Reads HUBSPOT_ACCESS_TOKEN from environment. Never accepts token as CLI flag or prints it.
- Filters by Deal creation timestamp (`createdate`), NOT close date.
- Stable accounting-friendly columns and escaping.
- Full cursor-based pagination.
- Exits safely with non-zero exit code on errors without exposing secrets.
"""

import os
import sys
import csv
import json
import argparse
import urllib.request
import urllib.error
from datetime import datetime, timedelta, timezone

DEFAULT_HUBSPOT_API_VERSION = "2026-09"
DEAL_SEARCH_ENDPOINT = "https://api.hubapi.com/crm/v3/objects/deals/search"

CSV_COLUMNS = [
    ("deal_id", "Deal ID"),
    ("dealname", "Deal Name"),
    ("amount", "Amount"),
    ("deal_currency_code", "Currency"),
    ("createdate", "Create Date (UTC)"),
    ("closedate", "Close Date (UTC)"),
    ("pipeline", "Pipeline"),
    ("dealstage", "Stage"),
]


def format_iso_timestamp(val: str | None) -> str:
    """Safely converts HubSpot millisecond epoch or ISO string to standard UTC ISO-8601 string."""
    if not val:
        return ""
    try:
        if val.isdigit() or (val.startswith("-") and val[1:].isdigit()):
            dt = datetime.fromtimestamp(int(val) / 1000.0, tz=timezone.utc)
            return dt.strftime("%Y-%m-%dT%H:%M:%SZ")
        dt = datetime.fromisoformat(val.replace("Z", "+00:00"))
        return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    except Exception:
        return str(val)


def fetch_deals_page(token: str, api_version: str, cutoff_ms: int, after: str | None = None) -> dict:
    """Fetches a single page of deals created since cutoff_ms using the CRM Search API."""
    url = f"{DEAL_SEARCH_ENDPOINT}?version={api_version}"

    filter_group = {
        "filters": [
            {
                "propertyName": "createdate",
                "operator": "GTE",
                "value": str(cutoff_ms),
            }
        ]
    }

    properties = [
        "dealname",
        "amount",
        "deal_currency_code",
        "createdate",
        "closedate",
        "pipeline",
        "dealstage",
    ]

    payload: dict = {
        "filterGroups": [filter_group],
        "properties": properties,
        "limit": 100,
        "sorts": [
            {
                "propertyName": "createdate",
                "direction": "ASCENDING",
            }
        ],
    }

    if after:
        payload["after"] = after

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "HubSpot-Deal-Exporter/1.0",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            resp_body = resp.read().decode("utf-8")
            return json.loads(resp_body)
    except urllib.error.HTTPError as e:
        status_code = e.code
        safe_msg = f"HubSpot API request failed with HTTP {status_code}"
        try:
            err_body = e.read().decode("utf-8")
            parsed = json.loads(err_body)
            if "message" in parsed:
                safe_msg += f": {parsed['message']}"
        except Exception:
            pass
        raise RuntimeError(safe_msg) from None
    except urllib.error.URLError as e:
        raise RuntimeError(f"Network error connecting to HubSpot: {e.reason}") from None


def _load_dotenv():
    """Loads variables from local .env if present and not already set."""
    candidates = [
        os.path.join(os.getcwd(), ".env"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"),
        os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env"),
    ]
    for env_path in candidates:
        if os.path.isfile(env_path):
            try:
                with open(env_path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            k = k.strip()
                            v = v.strip().strip('"').strip("'")
                            if k and k not in os.environ:
                                os.environ[k] = v
                break
            except Exception:
                pass


def export_recent_deals(output_path: str, days: int = 7) -> int:
    """Exports deals created in the last `days` days to CSV. Returns count of exported rows."""
    _load_dotenv()
    token = os.environ.get("HUBSPOT_ACCESS_TOKEN", "").strip()
    if not token:
        raise ValueError("HUBSPOT_ACCESS_TOKEN environment variable is not set or empty.")

    api_version = os.environ.get("HUBSPOT_API_VERSION", DEFAULT_HUBSPOT_API_VERSION).strip()

    # Calculate runtime UTC cutoff (rolling 7 days)
    now_utc = datetime.now(timezone.utc)
    cutoff_dt = now_utc - timedelta(days=days)
    cutoff_ms = int(cutoff_dt.timestamp() * 1000)

    # Ensure output directory exists
    output_dir = os.path.dirname(os.path.abspath(output_path))
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)

    after = None
    total_exported = 0

    with open(output_path, mode="w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile, quoting=csv.QUOTE_MINIMAL)
        # Write header
        writer.writerow([label for _, label in CSV_COLUMNS])

        while True:
            page = fetch_deals_page(token, api_version, cutoff_ms, after)
            results = page.get("results", [])

            for item in results:
                deal_id = item.get("id", "")
                props = item.get("properties", {}) or {}

                row = [
                    deal_id,
                    props.get("dealname", "") or "",
                    props.get("amount", "") or "",
                    props.get("deal_currency_code", "") or "",
                    format_iso_timestamp(props.get("createdate")),
                    format_iso_timestamp(props.get("closedate")),
                    props.get("pipeline", "") or "",
                    props.get("dealstage", "") or "",
                ]
                writer.writerow(row)
                total_exported += 1

            paging = page.get("paging")
            if paging and "next" in paging and "after" in paging["next"]:
                after = paging["next"]["after"]
            else:
                break

    return total_exported


def main():
    parser = argparse.ArgumentParser(
        description="Export HubSpot deals created in the preceding seven days to CSV."
    )
    default_filename = f"exports/deals_{datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')}.csv"
    parser.add_argument(
        "--output",
        "-o",
        default=os.environ.get("EXPORTER_OUTPUT_PATH", default_filename),
        help=f"Destination CSV path (default: {default_filename} or EXPORTER_OUTPUT_PATH)",
    )
    parser.add_argument(
        "--days",
        "-d",
        type=int,
        default=7,
        help="Number of preceding days to look back for deal creation (default: 7)",
    )

    args = parser.parse_args()

    try:
        count = export_recent_deals(args.output, args.days)
        print(f"Successfully exported {count} deals to '{args.output}'.")
        sys.exit(0)
    except Exception as e:
        # Never print secrets or raw tokens
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
