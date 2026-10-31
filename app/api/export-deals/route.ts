import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/src/lib/auth";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

/**
 * GET /api/export-deals
 *
 * Runs scripts/export_recent_deals.py and streams the resulting CSV
 * back to the browser as a file download.
 *
 * Requires an authenticated session (same rules as the retry endpoint).
 */
export async function GET(req: NextRequest) {
  const unauthorized = await requireAuth(req);
  if (unauthorized) return unauthorized;

  const tmpFile = path.join(os.tmpdir(), `deals_export_${Date.now()}.csv`);

  // Run the Python script synchronously via a child process
  const result = await new Promise<{ ok: boolean; message: string }>(
    (resolve) => {
      const proc = spawn(
        "python",
        [
          path.join(process.cwd(), "scripts", "export_recent_deals.py"),
          "--output",
          tmpFile,
        ],
        {
          env: {
            ...process.env,
            // ensure the Python script inherits the HubSpot token
            HUBSPOT_ACCESS_TOKEN: process.env.HUBSPOT_ACCESS_TOKEN ?? "",
          },
          timeout: 30_000,
        }
      );

      let stderr = "";
      proc.stderr.on("data", (chunk: Buffer) => {
        stderr += chunk.toString();
      });

      proc.on("close", (code) => {
        if (code === 0) {
          resolve({ ok: true, message: "" });
        } else {
          resolve({ ok: false, message: stderr.trim() || `Exit code ${code}` });
        }
      });

      proc.on("error", (err) => {
        resolve({ ok: false, message: err.message });
      });
    }
  );

  if (!result.ok) {
    // Surface friendly errors – no token / no deals / python missing
    const isNoDeals =
      result.message.includes("No deals found") ||
      result.message.includes("No CSV was created");

    if (isNoDeals) {
      return NextResponse.json(
        { error: "No deals found in the last 7 days." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: `Export failed: ${result.message}` },
      { status: 500 }
    );
  }

  // Read the temp CSV and stream it as a download
  let csvBuffer: Buffer;
  try {
    csvBuffer = fs.readFileSync(tmpFile);
  } catch {
    return NextResponse.json(
      { error: "CSV file was not created." },
      { status: 500 }
    );
  } finally {
    // Always clean up
    try {
      fs.unlinkSync(tmpFile);
    } catch {
      /* ignore */
    }
  }

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const filename = `hubspot_deals_${today}.csv`;

  return new NextResponse(new Uint8Array(csvBuffer), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
