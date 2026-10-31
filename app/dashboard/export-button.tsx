"use client";

import { useState } from "react";

export function ExportDealsButton() {
  const [state, setState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleExport() {
    setState("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/export-deals", { method: "GET" });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      // Trigger a file download from the blob response
      const blob = await res.blob();
      const contentDisposition = res.headers.get("content-disposition") ?? "";
      const match = contentDisposition.match(/filename="([^"]+)"/);
      const filename = match ? match[1] : "hubspot_deals.csv";

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setState("success");
      setTimeout(() => setState("idle"), 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Export failed");
      setState("error");
      setTimeout(() => setState("idle"), 5000);
    }
  }

  const label = {
    idle: "Export Deals CSV",
    loading: "Exporting…",
    success: "Downloaded ✓",
    error: "Export Failed",
  }[state];

  const btnClass = {
    idle: "bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800",
    loading: "bg-stone-300 text-stone-600 border-stone-300 cursor-wait",
    success: "bg-emerald-100 text-emerald-800 border-emerald-300",
    error: "bg-rose-100 text-rose-800 border-rose-300",
  }[state];

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleExport}
        disabled={state === "loading"}
        aria-live="polite"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer disabled:cursor-wait ${btnClass}`}
      >
        {state === "loading" ? (
          <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path d="M8.75 2a.75.75 0 0 0-1.5 0v6.19L5.03 5.97a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.19V2ZM3 10.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.25 15h7.5A2.75 2.75 0 0 0 14.5 12.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-7.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
          </svg>
        )}
        {label}
      </button>

      {state === "error" && errorMsg && (
        <span role="alert" className="text-xs text-rose-600">
          {errorMsg}
        </span>
      )}

      {state !== "error" && (
        <span className="text-xs text-stone-400">
          Last 7 days · HubSpot deals
        </span>
      )}
    </div>
  );
}
