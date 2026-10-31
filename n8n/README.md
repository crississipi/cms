# n8n Automation Workflows

This directory contains clean, importable workflow JSON templates for [n8n](https://n8n.io/) to orchestrate order synchronization and error alerting.

---

## 1. Security Architecture & Boundary

Per [AGENTS.md](../AGENTS.md):
- **HMAC Verification & Idempotency Boundary:** Native n8n environments often disable access to arbitrary Node.js built-ins (`crypto`) within Code nodes for security (`N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` / isolated runners). Rather than silently weakening HMAC verification or creating an unauthenticated backend route, the primary workflow acts as a **thin orchestrator** forwarding raw request bytes and signature headers directly to the hardened application route (`POST /api/webhooks/orders`).
- **No Embedded Credentials:** Neither workflow JSON embeds access tokens, database URLs, API secrets, or webhooks. All connection details use n8n environment variables (`$env.APP_BASE_URL`, `$env.INCIDENT_ALERT_WEBHOOK_URL`) or n8n Credential Stores.

---

## 2. Included Workflows

### 1. `order-sync-workflow.json`
- **Trigger:** Webhook node (`POST /webhook/order-sync`) with `rawBody: true`.
- **Action:** HTTP Request node forwarding raw payload and `x-order-signature` header to `{{ $env.APP_BASE_URL || 'http://localhost:3000' }}/api/webhooks/orders`.
- **Response:** Respond to Webhook node returning the exact JSON status (`synced`, `duplicate_completed`, `queued`) and HTTP status code (`200`, `202`, `401`, `409`, `422`).

### 2. `error-notification-workflow.json`
- **Trigger:** n8n `Error Trigger` node (activates automatically whenever an execution fails across workflows configured with this error handler).
- **Format:** Extracts workflow name, execution ID, timestamp, and sanitized failure message.
- **Alert:** HTTP Request node posting formatted incident alerts to `$env.INCIDENT_ALERT_WEBHOOK_URL` (Slack, Discord, Microsoft Teams, or custom incident response webhook).

---

## 3. Post-Import Configuration

After importing these files into your n8n instance (**Workflows > Import from File**):
1. **Configure Environment Variables in n8n:**
   - `APP_BASE_URL`: Base URL of the deployed application (e.g. `https://your-domain.com` or `http://host.docker.internal:3000`).
   - `ORDER_SIGNATURE_HEADER`: Header name for HMAC verification (default: `x-order-signature`).
   - `INCIDENT_ALERT_WEBHOOK_URL`: Your team's Slack or incident alert incoming webhook URL.
2. **Associate Error Workflow:**
   - Open `Order to HubSpot Webhook Sync` > **Workflow Settings** > **Error Workflow** > select `Order Sync Error Notification`.
3. **Activate Workflows:**
   - Toggle both workflows to **Active**.
