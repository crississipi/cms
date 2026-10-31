# Order-to-HubSpot Integration & Sync Dashboard

A resilient, production-ready order synchronization demonstration system built with Next.js App Router (TypeScript), Aiven for PostgreSQL, Prisma ORM, and HubSpot CRM APIs. It ingests HMAC-SHA256 signed order webhooks, guarantees concurrent and delivery idempotency, syncs customer and order data into HubSpot CRM Contacts and Deals, records per-attempt audit trails, provides an authenticated dashboard for viewing attempts and manually retrying failures, features an interactive customer-facing demo storefront, and exports Deals to CSV via a standalone Python utility.

---

## 1. Architecture & Flow

```mermaid
flowchart TD
    Store[Storefront / Mock Sender] -->|POST /api/webhooks/orders + HMAC| Route[Next.js Webhook Route]
    Route --> SizeCheck{Request Size & Content-Type}
    SizeCheck -->|Valid| HMAC[Raw-Body HMAC-SHA256 Verification]
    HMAC -->|Verified| Schema[Zod Payload Schema Validation]
    Schema -->|Valid| SyncSvc[Order Sync Service]
    
    subgraph OrderSyncService [Order Sync Service & Persistence]
        SyncSvc --> DBCheck[(Aiven PostgreSQL via Prisma)]
        DBCheck --> Claim[Atomic Conditional Claim Lease]
        Claim --> HSReconcile[Reconcile Remote Deal by external_order_id]
        HSReconcile --> HSContact[Search or Upsert Contact]
        HSContact --> HSDeal[Create Deal & Associate to Contact]
        HSDeal --> DBAudit[Persist SyncAttempt & SyncJob State]
    end

    subgraph OperationsDashboard [Protected Operations Dashboard]
        Admin[Operations Admin] -->|Login| Auth[Scrypt & Signed JWT Session]
        Auth --> DashboardView[Dashboard: Latest 50 Sync Attempts]
        DashboardView -->|Click Retry on Failed Row| RetryRoute[POST /api/sync-attempts/:id/retry]
        RetryRoute -->|Re-read DB state & replay| SyncSvc
    end

    subgraph PythonExporter [Python Deal Exporter]
        CLI[scripts/export_deals.py] -->|Search API createdate >= 7d UTC cutoff| HubSpotAPI[HubSpot CRM v3 Search]
        HubSpotAPI --> CSV[UTF-8 CSV Output]
    end
```

### End-to-End Ingestion Sequence

```mermaid
sequenceDiagram
    autonumber
    participant Client as Storefront / Webhook Sender
    participant API as /api/webhooks/orders
    participant DB as Aiven PostgreSQL (Prisma)
    participant HS as HubSpot CRM API

    Client->>API: POST order.created (X-Order-Signature: sha256=<hex>)
    API->>API: Enforce size cap (MAX_REQUEST_BYTES) & Content-Type: application/json
    API->>API: Verify HMAC-SHA256 over exact raw request bytes
    API->>API: Parse JSON & validate with Zod schema (decimal-safe totals)
    API->>DB: Upsert OrderSync row (idempotency key: order_id)
    API->>DB: Conditionally claim exclusive processing lease (claimedUntil)
    alt Order already synced
        API-->>Client: 200 OK (status: duplicate_completed)
    else Lease held by concurrent worker
        API-->>Client: 409 Conflict (status: duplicate_processing)
    else Lease acquired
        API->>HS: Search Contact by normalized email
        HS-->>API: Contact found / null
        API->>HS: Create or update Contact
        API->>HS: Search Deal by external_order_id
        alt Deal exists (e.g. from previous remote timeout)
            API->>API: Reuse existing Deal ID
        else Deal missing
            API->>HS: Create Deal with external_order_id
        end
        API->>HS: Associate Deal with Contact
        API->>DB: Record SyncAttempt (SYNCED), update OrderSync
        API-->>Client: 200 OK (status: synced)
    end
```

---

## 2. Technology Stack & Key Libraries

- **Framework & Runtime:** Next.js 16 (App Router), Node.js v20/v22/v24.
- **Language & Type Safety:** TypeScript strict mode, Zod 4.
- **Database & ORM:** Aiven for PostgreSQL with TLS, Prisma ORM 7 (`@prisma/adapter-pg`).
- **CRM Integration:** HubSpot CRM APIs (Contacts, Deals, Associations, Search), centralized on API version `2026-09`.
- **Authentication & Security:** Native `crypto.scryptSync` / `timingSafeEqual`, `jose` JWT cookies (`HttpOnly`, `SameSite=lax`), HMAC-SHA256 signature verification.
- **Data Exporter:** Python 3 (standard library: `urllib.request`, `csv`, `json`, `argparse`).
- **Styling:** Tailwind CSS v4.
- **Containerization:** Multi-stage Dockerfile and Docker Compose.
- **Workflow Automation (Bonus):** n8n exportable workflows.

---

## 3. Prerequisites & Environment Setup

### Prerequisites
- Node.js >= 20.x (Node 22 LTS recommended)
- npm >= 9.x
- Python >= 3.9 (for CSV export script and tests)
- Docker & Docker Compose (optional, for containerized run)
- Aiven PostgreSQL database instance (or compatible PostgreSQL with TLS)
- HubSpot Private App access token with CRM scopes

### Environment Variables
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Example / Default |
|---|---|---|
| `DTBASE_URL` | PostgreSQL connection string (TLS enabled) | `postgres://avnadmin:...@...aivencloud.com:port/defaultdb?sslmode=require` |
| `DIRECT_DTBASE_URL` | Direct connection for migrations (if using PgBouncer) | Optional |
| `HUBSPOT_ACCESS_TOKEN` | HubSpot Private App Access Token | `pat-na1-...` |
| `HUBSPOT_API_VERSION` | HubSpot CRM API version | `2026-09` |
| `HUBSPOT_PIPELINE_ID` | HubSpot Deal Pipeline ID | `default` |
| `HUBSPOT_DEAL_STAGE_ID` | HubSpot Deal Stage ID | `appointmentscheduled` |
| `ORDER_WEBHOOK_SECRET` | Shared secret for HMAC-SHA256 signing | `your-secret-hex-string` |
| `ORDER_SIGNATURE_HEADER` | Header name containing the signature | `x-order-signature` |
| `MAX_REQUEST_BYTES` | Maximum payload size in bytes | `65536` (64 KB) |
| `ADMIN_USERNAME` | Operations dashboard admin username | `admin` |
| `ADMIN_PASSWORD_HASH` | Scrypt password hash (`salt:hash`) | Generated via script / seed |
| `AUTH_SECRET` | Secret key for JWT session cookies (min 32 chars) | `your-random-32-character-secret...` |
| `NODE_ENV` | Application environment | `development` / `production` / `test` |

---

## 4. Database Setup & Prisma Migrations

This project uses **Prisma 7** configured via `prisma.config.ts`.

1. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

2. Apply migrations to Aiven PostgreSQL:
   ```bash
   npx prisma migrate deploy
   ```

3. (For development schema changes):
   ```bash
   npx prisma migrate dev --name <migration-name>
   ```

---

## 5. HubSpot CRM Setup & Scopes

### Required HubSpot Private App Permissions:
- `crm.objects.contacts.read`
- `crm.objects.contacts.write`
- `crm.objects.deals.read`
- `crm.objects.deals.write`

### Configuration:
1. Ensure the custom property `external_order_id` is created on Deals in your HubSpot portal (type: text, searchable).
2. Set `HUBSPOT_PIPELINE_ID` and `HUBSPOT_DEAL_STAGE_ID` in your `.env` to match the target pipeline and stage in your HubSpot portal.

---

## 6. Webhook Signing Protocol

External and internal senders must calculate an HMAC-SHA256 signature using `ORDER_WEBHOOK_SECRET` over the **exact raw request bytes** (before JSON parsing):

```text
Header: X-Order-Signature: sha256=<hex_digest>
```
*(Both `sha256=<hex>` and bare `<hex>` formats are accepted).*

### Canonical Order Payload:
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
  "items": [
    {
      "sku": "TSH-BLK-M",
      "name": "Black Tee (M)",
      "qty": 2,
      "price": 450.00
    }
  ],
  "currency": "PHP",
  "total": 900.00
}
```

---

## 7. Local Startup & Demonstration

### Local Development Server:
```bash
npm run dev
```
The server starts at `http://localhost:3000`.

### Storefront Demo:
1. Navigate to `http://localhost:3000/`.
2. Browse products from the server-controlled catalog (e.g. *Black Tee (M)*).
3. Add items to cart and review line totals.
4. Proceed to checkout, fill in customer information, and submit order.
5. The checkout server computes canonical prices, signs the payload with HMAC-SHA256, and submits to the webhook receiver.
6. The order confirmation displays the generated `order_id` and provides a direct link to the operations dashboard.

### Dashboard Access & Authentication:
1. Navigate to `http://localhost:3000/dashboard` (or `/login`).
2. Log in with `ADMIN_USERNAME` and password.
3. The dashboard lists the **latest 50 sync attempts** with status indicators, attempt counts, Deal IDs, and error messages.
4. For failed syncs, an authorized **Retry** button replays the idempotent sync service without creating duplicates.

### Mock Sample Webhook Sender:
```bash
npx tsx scripts/send-sample-order.ts
```
Sends a signed order directly to `http://localhost:3000/api/webhooks/orders` and logs the server response.

---

## 8. Python CSV Deal Exporter

The standalone Python CLI exports Deals created during the previous 7 days (UTC) to a standardized accounting CSV file.

### Usage:
```bash
# Run with default 7-day filter (outputs to exports/deals_<timestamp>.csv):
python scripts/export_deals.py

# Or specify custom output path and lookback window:
python scripts/export_deals.py --output exports/my_deals.csv --days 7
```

### Features:
- Safe atomic output: writes to a temporary file (`.tmp`) and publishes only on success.
- Handles pagination across all matching Deals.
- Gracefully handles empty results and rate-limiting (`429` with backoff).
- Standardized columns: `Deal ID`, `Deal Name`, `Amount`, `Currency`, `Create Date (UTC)`, `Close Date (UTC)`, `Pipeline`, `Stage`.

---

## 9. Verification & Test Commands

All test and verification commands run deterministically:

```bash
# 1. Run full TypeScript/Node.js test suite (42 tests, 12 suites)
npm test

# 2. Run Python exporter test suite (7 tests)
python -m unittest discover -s tests -p "test_*.py"

# 3. TypeScript strict type-check
npm run type-check

# 4. ESLint linting
npm run lint

# 5. Production Next.js build
npm run build
```

---

## 10. Docker Setup (Bonus)

A multi-stage `Dockerfile` and `docker-compose.yml` are provided:

```bash
# Build the container image:
docker compose build

# Start the application:
docker compose up -d

# View container logs:
docker compose logs -f app

# Run database migrations inside container:
docker compose run --rm app npx prisma migrate deploy

# Stop containers:
docker compose down
```

### Docker Features:
- Base: `node:22-alpine` with non-root user (`nextjs:nodejs`).
- No secrets baked into the image (`.dockerignore` protects `.env*`).
- Built-in container health check hitting `/api/health`.
- Connects directly to Aiven PostgreSQL (no unnecessary local PostgreSQL service).

---

## 11. n8n Workflows (Bonus)

Located in `n8n/`:
- `n8n/order-sync-workflow.json`: Complete orchestration workflow for webhook reception, validation, and forwarding to the application pipeline.
- `n8n/error-workflow.json`: Error notification workflow for alerting on failed sync attempts.
- See `n8n/README.md` for import instructions and environment configuration.

---

## 12. Known Assumptions & Future Improvements

- **Floating-point rounding:** Currencies with decimal fractions (such as PHP centavos) are validated using integer minor unit arithmetic (`Math.round(val * 100)`) with 1-cent rounding tolerance.
- **Deal Close Date:** Placed orders set `closedate` to the order's `created_at` timestamp in milliseconds.
- **Future Improvements:**
  - Dedicated background queue runner (e.g. BullMQ / Redis) for enterprise multi-tenant horizontal scaling.
  - HubSpot Line Items CRM object sync in addition to Deal level amount/currency.
  - Two-factor authentication (TOTP) on the operations dashboard.
