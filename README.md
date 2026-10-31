# Valve & Tee — Order-to-HubSpot Integration

A production-ready e-commerce order synchronization system built with **Next.js**, **Prisma**, **Aiven PostgreSQL**, and **HubSpot CRM**. Features a live storefront, HMAC-secured webhook pipeline, idempotent sync engine, authenticated operations dashboard, Python CSV exporter, Docker support, and n8n automation workflows.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Database | Aiven PostgreSQL + Prisma ORM 7 |
| CRM | HubSpot CRM v3 API (Contacts, Deals, Associations) |
| Auth | `crypto.scryptSync` + `jose` JWT cookies |
| Webhook Security | HMAC-SHA256 signed payloads |
| Styling | Tailwind CSS v4 |
| Testing | Vitest (42 tests) |
| Exporter | Python 3 (stdlib only) |
| Containers | Docker + Docker Compose |
| Automation | n8n workflow JSON templates |

---

## Features

- **Storefront** — Interactive product catalog at `/` with cart, randomizable customer form, and HMAC-signed simulated checkout.
- **Webhook Ingestion** — `POST /api/webhooks/orders` verifies HMAC-SHA256 signatures, validates payload with Zod, and enforces a 64 KB size cap.
- **Idempotent Sync Engine** — Atomic DB claim lease prevents duplicate processing; deduplicates by `order_id`; upserts HubSpot Contact + Deal and associates them.
- **Operations Dashboard** — Authenticated at `/dashboard`; shows latest 50 sync attempts with status, HubSpot IDs, error messages, and a **Retry** button for failed syncs.
- **Python CSV Exporter** — `scripts/export_recent_deals.py` fetches HubSpot deals created in the last 7 days and writes a UTF-8 CSV for accounting.
- **Export Deals Button** — Dashboard button calls `GET /api/export-deals` which runs the Python script server-side and streams the CSV as a file download.
- **Docker** — Multi-stage `Dockerfile` + `docker-compose.yml` for containerised deployment.
- **n8n Automation** — Importable workflow JSON for webhook proxying and error alerting.

---

## Prerequisites

- **Node.js** >= 20.x
- **npm** >= 9.x
- **Python** >= 3.9
- **Docker & Docker Compose** (optional)
- **Aiven PostgreSQL** database with TLS
- **HubSpot Private App** access token with CRM scopes

---

## Environment Setup

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DTBASE_URL` | PostgreSQL connection string |
| `HUBSPOT_ACCESS_TOKEN` | HubSpot Private App token |
| `HUBSPOT_PIPELINE_ID` | HubSpot Deal pipeline ID |
| `HUBSPOT_DEAL_STAGE_ID` | HubSpot Deal stage ID |
| `ORDER_WEBHOOK_SECRET` | 64-byte hex secret for HMAC-SHA256 signing |
| `ADMIN_USERNAME` | Dashboard login username |
| `ADMIN_PASSWORD_HASH` | Scrypt hash in format `salt:hash` |
| `AUTH_SECRET` | JWT session signing key (min 32 chars) |

### Required HubSpot Private App Scopes

- `crm.objects.contacts.read` / `write`
- `crm.objects.deals.read` / `write`
- `crm.schemas.deals.read`
- `crm.objects.associations.write`

### Required HubSpot Custom Property

Create a Deal property with internal name **`external_order_id`** (type: single-line text) in your HubSpot portal before first use.

---

## Installation & Running

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Apply DB migrations to Aiven PostgreSQL
npx prisma migrate deploy

# Start development server
npm run dev
```

App runs at **http://localhost:3000**.

---

## Usage

### Storefront

1. Visit `http://localhost:3000`
2. Add items to cart, fill in customer details, and place a simulated order
3. The server signs the payload with HMAC-SHA256 and sends it through the webhook pipeline

### Dashboard

1. Visit `http://localhost:3000/dashboard` and log in
2. View sync attempt history, HubSpot Contact/Deal IDs, and error details
3. Click **Retry** on failed rows to replay the sync
4. Click **Export Deals CSV** to download a CSV of HubSpot deals from the last 7 days

### Python CSV Exporter (CLI)

```bash
# Requires HUBSPOT_ACCESS_TOKEN in environment or .env
python scripts/export_recent_deals.py --output exports/deals.csv

# Optional: look back more than 7 days
python scripts/export_recent_deals.py --days 14 --output exports/deals_14d.csv
```

---

## Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Apply migrations
npx prisma migrate deploy

# (Dev only) Create a new migration after schema changes
npx prisma migrate dev --name <migration-name>
```

---

## Webhook Signing Protocol

All order payloads must carry an HMAC-SHA256 signature over the **exact raw request bytes**:

```
Header: X-Order-Signature: sha256=<hex_digest>
```

Example payload:

```json
{
  "event": "order.created",
  "order_id": "ORD-10482",
  "created_at": "2026-09-20T14:32:00+08:00",
  "customer": {
    "email": "maria.santos@example.com",
    "first_name": "Maria",
    "last_name": "Santos",
    "phone": "+639171234567"
  },
  "items": [{ "sku": "TSH-BLK-M", "name": "Black Tee (M)", "qty": 2, "price": 450.00 }],
  "currency": "PHP",
  "total": 900.00
}
```

---

## Testing

```bash
# Full TypeScript test suite (42 tests, 12 suites)
npm test

# TypeScript strict type check
npm run type-check

# ESLint
npm run lint
```

---

## Docker

```bash
# Build image
docker compose build

# Start application
docker compose up -d

# Run migrations inside container
docker compose run --rm app npx prisma migrate deploy

# View logs
docker compose logs -f app

# Stop
docker compose down
```

---

## n8n Automation (Optional)

Two importable workflow templates are in `n8n/`:

| File | Purpose |
|---|---|
| `order-sync-workflow.json` | Receives orders at `POST /webhook/order-sync` and forwards to `/api/webhooks/orders` with raw body + signature intact |
| `error-notification-workflow.json` | Fires on any n8n execution failure and posts an alert to Slack / Discord / Teams |

**To use:**
1. Run n8n: `docker compose --profile n8n up` or `npx n8n`
2. Import both JSON files via **Workflows → Import from File**
3. Set n8n environment variables: `APP_BASE_URL`, `INCIDENT_ALERT_WEBHOOK_URL`
4. Link the error workflow as the error handler for the sync workflow
5. Activate both workflows

---

## Project Structure

```
.
├── app/                    # Next.js App Router pages & API routes
│   ├── page.tsx            # Storefront (/)
│   ├── dashboard/          # Operations dashboard (/dashboard)
│   ├── login/              # Auth (/login)
│   └── api/                # API routes (webhooks, checkout, export, retry)
├── src/
│   ├── lib/                # Core logic (auth, HubSpot, sync service, env, prisma)
│   └── generated/prisma/   # Prisma generated client
├── prisma/                 # Schema and migrations
├── scripts/                # Python exporter + TS worker scripts
├── tests/                  # Vitest test suites
├── n8n/                    # n8n workflow JSON templates
├── docker-compose.yml
├── Dockerfile
└── .env.example
```
