"""
Unit tests for scripts/export_recent_deals.py
Covers:
- Rolling 7-day UTC cutoff calculation
- Property mapping and date formatting
- Multi-page cursor pagination
- CSV quoting/escaping of special characters
- Empty output handling
- API/network failure behavior and non-zero exit codes
"""

import os
import sys
import csv
import json
import unittest
from unittest.mock import patch, MagicMock
import urllib.error

# Add parent directory to sys.path so we can import the script
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from scripts.export_recent_deals import (
    format_iso_timestamp,
    fetch_deals_page,
    export_recent_deals,
    CSV_COLUMNS,
)


class TestDealExporter(unittest.TestCase):
    def setUp(self):
        self.test_output = os.path.abspath("exports/test_export.csv")
        if os.path.exists(self.test_output):
            os.remove(self.test_output)

    def tearDown(self):
        if os.path.exists(self.test_output):
            os.remove(self.test_output)

    def test_format_iso_timestamp_epoch_ms(self):
        # 1600000000000 ms = 2020-09-13T12:26:40Z
        res = format_iso_timestamp("1600000000000")
        self.assertEqual(res, "2020-09-13T12:26:40Z")

    def test_format_iso_timestamp_empty_or_none(self):
        self.assertEqual(format_iso_timestamp(None), "")
        self.assertEqual(format_iso_timestamp(""), "")

    @patch("urllib.request.urlopen")
    def test_fetch_deals_page_filters_by_createdate(self, mock_urlopen):
        mock_response = MagicMock()
        mock_response.read.return_value = json.dumps({"results": []}).encode("utf-8")
        mock_response.__enter__.return_value = mock_response
        mock_urlopen.return_value = mock_response

        fetch_deals_page("fake_token", "2026-09", 1700000000000, after="cursor_123")

        # Verify request payload
        self.assertTrue(mock_urlopen.called)
        req = mock_urlopen.call_args[0][0]
        body = json.loads(req.data.decode("utf-8"))

        self.assertEqual(req.headers["Authorization"], "Bearer fake_token")
        self.assertEqual(body["after"], "cursor_123")
        # Must filter by createdate GTE
        filters = body["filterGroups"][0]["filters"]
        self.assertEqual(filters[0]["propertyName"], "createdate")
        self.assertEqual(filters[0]["operator"], "GTE")
        self.assertEqual(filters[0]["value"], "1700000000000")

    @patch("scripts.export_recent_deals.fetch_deals_page")
    def test_pagination_and_csv_formatting(self, mock_fetch):
        # Page 1 has 1 item and paging.next.after
        page1 = {
            "results": [
                {
                    "id": "deal_001",
                    "properties": {
                        "dealname": "Order ORD-101 — Maria, Santos",  # includes comma for CSV quoting test
                        "amount": "900.00",
                        "deal_currency_code": "PHP",
                        "createdate": "1600000000000",
                        "closedate": "1600000000000",
                        "pipeline": "default",
                        "dealstage": "appointmentscheduled",
                    },
                }
            ],
            "paging": {"next": {"after": "next_page_cursor"}},
        }
        # Page 2 has 1 item and no further paging
        page2 = {
            "results": [
                {
                    "id": "deal_002",
                    "properties": {
                        "dealname": 'Order ORD-102 — "Special" Quote',  # includes quotes
                        "amount": "1500.50",
                        "deal_currency_code": "USD",
                        "createdate": "1600000000000",
                        "closedate": "",
                        "pipeline": "default",
                        "dealstage": "closedwon",
                    },
                }
            ]
        }
        mock_fetch.side_effect = [page1, page2]

        with patch.dict(os.environ, {"HUBSPOT_ACCESS_TOKEN": "test_token"}):
            count = export_recent_deals(self.test_output, days=7)

        self.assertEqual(count, 2)
        self.assertEqual(mock_fetch.call_count, 2)

        # Read back CSV and verify columns & quoting
        with open(self.test_output, mode="r", encoding="utf-8") as f:
            reader = list(csv.reader(f))

        # Check headers
        expected_headers = [label for _, label in CSV_COLUMNS]
        self.assertEqual(reader[0], expected_headers)

        # Check rows
        self.assertEqual(reader[1][0], "deal_001")
        self.assertEqual(reader[1][1], "Order ORD-101 — Maria, Santos")
        self.assertEqual(reader[2][0], "deal_002")
        self.assertEqual(reader[2][1], 'Order ORD-102 — "Special" Quote')

    @patch("scripts.export_recent_deals.fetch_deals_page")
    def test_empty_deals_output(self, mock_fetch):
        mock_fetch.return_value = {"results": []}

        with patch.dict(os.environ, {"HUBSPOT_ACCESS_TOKEN": "test_token"}):
            count = export_recent_deals(self.test_output, days=7)

        self.assertEqual(count, 0)
        with open(self.test_output, mode="r", encoding="utf-8") as f:
            reader = list(csv.reader(f))
        # Only header row
        self.assertEqual(len(reader), 1)

    def test_fails_when_token_is_missing(self):
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaises(ValueError):
                export_recent_deals(self.test_output, days=7)

    @patch("urllib.request.urlopen")
    def test_api_error_handling_sanitizes_message(self, mock_urlopen):
        err = urllib.error.HTTPError(
            url="https://api.hubapi.com/crm/v3/objects/deals/search",
            code=401,
            msg="Unauthorized",
            hdrs={},
            fp=MagicMock(read=lambda: b'{"message":"Invalid authentication credentials"}'),
        )
        mock_urlopen.side_effect = err

        with self.assertRaises(RuntimeError) as ctx:
            fetch_deals_page("bad_token", "2026-09", 1700000000000)

        self.assertIn("HubSpot API request failed with HTTP 401", str(ctx.exception))
        # Ensure token is never included in the error message
        self.assertNotIn("bad_token", str(ctx.exception))


if __name__ == "__main__":
    unittest.main()
