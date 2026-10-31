"""scripts/export_deals.py

Export HubSpot deals created in the last 7 days to a CSV file.

Usage:
  python export_deals.py [-o OUTPUT]

The script reads the HubSpot private‑app access token from the
environment variable ``HUBSPOT_ACCESS_TOKEN``.

It uses the HubSpot CRM v3 search endpoint to fetch deals filtered
by the *createdate* property.  All pages are retrieved, respecting
rate‑limit (`429`) responses via exponential back‑off with jitter and
the ``Retry‑After`` header when present.

The resulting CSV contains a stable column order and is written to a
temporary file before being atomically renamed to the final destination
so that a failed export never leaves a partial file.
"""

import argparse
import csv
import datetime
import json
import os
import sys
import time
from pathlib import Path
from typing import Any, Dict, Iterable, List

try:
    import requests
except ImportError as e:  # pragma: no cover – requests is a runtime dependency
    sys.stderr.write("The 'requests' package is required to run this script. Install it with 'pip install requests'.\n")
    raise SystemExit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
API_BASE = "https://api.hubapi.com"
SEARCH_ENDPOINT = "/crm/v3/objects/deals/search"
PROPERTIES = [
    "dealname",
    "amount",
    "currency",
    "pipeline",
    "dealstage",
    "createdate",
    "closedate",
]
PAGE_SIZE = 100  # HubSpot max per request
MAX_RETRIES = 5
BASE_DELAY = 1.0  # seconds
# ---------------------------------------------------------------------------

def _load_dotenv():
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


def get_access_token() -> str:
    _load_dotenv()
    token = os.getenv("HUBSPOT_ACCESS_TOKEN")
    if not token:
        sys.stderr.write("Error: HUBSPOT_ACCESS_TOKEN environment variable is not set.\n")
        raise SystemExit(1)
    return token

def utc_now() -> datetime.datetime:
    return datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc)

def iso_millis(dt: datetime.datetime) -> str:
    """Return HubSpot timestamp (milliseconds since epoch) as string."""
    epoch = datetime.datetime(1970, 1, 1, tzinfo=datetime.timezone.utc)
    return str(int((dt - epoch).total_seconds() * 1000))

def build_search_payload(since: datetime.datetime, after: str | None = None) -> Dict[str, Any]:
    payload: Dict[str, Any] = {
        "filterGroups": [
            {
                "filters": [
                    {
                        "propertyName": "createdate",
                        "operator": "GT",
                        "value": iso_millis(since),
                    }
                ]
            }
        ],
        "properties": PROPERTIES,
        "limit": PAGE_SIZE,
    }
    if after:
        payload["after"] = after
    return payload

def request_with_retry(method: str, url: str, **kwargs) -> requests.Response:
    """Perform an HTTP request with bounded exponential back‑off.

    Retries are performed for transient errors (status 429, 5xx, connection
    errors). Permanent errors (4xx other than 429) are raised immediately.
    """
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = requests.request(method, url, timeout=10, **kwargs)
        except requests.RequestException as exc:
            if attempt == MAX_RETRIES:
                raise
            delay = BASE_DELAY * (2 ** (attempt - 1)) + (0.5 * time.time() % 1)
            time.sleep(delay)
            continue

        if response.status_code == 429:
            # Respect Retry‑After if present
            retry_after = response.headers.get("Retry-After")
            delay = float(retry_after) if retry_after and retry_after.isdigit() else (BASE_DELAY * (2 ** attempt))
            time.sleep(delay)
            continue
        if 500 <= response.status_code < 600:
            if attempt == MAX_RETRIES:
                response.raise_for_status()
            delay = BASE_DELAY * (2 ** attempt) + (0.5 * time.time() % 1)
            time.sleep(delay)
            continue
        # Non‑retryable status (including 2xx, 4xx other than 429)
        response.raise_for_status()
        return response
    # Should never reach here
    raise RuntimeError("Exhausted retries without a successful response")

def fetch_deals(since: datetime.datetime) -> Iterable[Dict[str, Any]]:
    token = get_access_token()
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    after: str | None = None
    while True:
        payload = build_search_payload(since, after)
        resp = request_with_retry("POST", f"{API_BASE}{SEARCH_ENDPOINT}", headers=headers, json=payload)
        data = resp.json()
        for deal in data.get("results", []):
            # Flatten the properties dict for easier CSV consumption
            flat = {"id": deal.get("id")}
            props = deal.get("properties", {})
            flat.update({k: props.get(k) for k in PROPERTIES})
            yield flat
        # Pagination token
        after = data.get("paging", {}).get("next", {}).get("after")
        if not after:
            break

def write_csv(deals: List[Dict[str, Any]], output_path: Path) -> None:
    # Define a stable column order
    columns = ["id", "dealname", "amount", "currency", "pipeline", "dealstage", "createdate", "closedate"]
    # Write to a temporary file first
    tmp_path = output_path.with_suffix(".tmp")
    with tmp_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=columns, quoting=csv.QUOTE_ALL)
        writer.writeheader()
        for row in deals:
            writer.writerow({col: row.get(col, "") for col in columns})
    # Atomic rename
    tmp_path.replace(output_path)

def main() -> None:
    parser = argparse.ArgumentParser(description="Export HubSpot deals created in the last 7 days to CSV.")
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=None,
        help="Path of the CSV file to write. Defaults to 'deals_<YYYYMMDD>.csv' in the current directory.",
    )
    args = parser.parse_args()

    output_path = args.output
    if output_path is None:
        today = utc_now().date().strftime("%Y%m%d")
        output_path = Path(f"deals_{today}.csv")

    since = utc_now() - datetime.timedelta(days=7)
    try:
        deals = list(fetch_deals(since))
    except Exception as exc:
        sys.stderr.write(f"Failed to retrieve deals: {exc}\n")
        raise SystemExit(1)

    if not deals:
        sys.stderr.write("No deals found for the given period. No CSV was created.\n")
        raise SystemExit(0)

    try:
        write_csv(deals, output_path)
    except Exception as exc:
        sys.stderr.write(f"Failed to write CSV file: {exc}\n")
        raise SystemExit(1)

    print(f"Exported {len(deals)} deals to {output_path.resolve()}")

if __name__ == "__main__":
    main()
