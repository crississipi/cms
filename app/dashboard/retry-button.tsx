"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RetryButtonProps {
  attemptId: string;
  orderId: string;
}

export function RetryButton({ attemptId, orderId }: RetryButtonProps) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; ok: boolean } | null>(null);
  const router = useRouter();

  async function handleRetry() {
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch(`/api/sync-attempts/${encodeURIComponent(attemptId)}/retry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setFeedback({
          ok: true,
          message: data.status === "synced" ? "Synced" : `Queued (${data.status})`,
        });
        router.refresh();
      } else {
        setFeedback({
          ok: false,
          message: data.error || "Retry failed",
        });
      }
    } catch {
      setFeedback({ ok: false, message: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleRetry}
        disabled={loading}
        aria-label={`Retry sync for order ${orderId}`}
        className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-stone-500 disabled:opacity-50 transition-colors cursor-pointer"
      >
        {loading ? "Retrying..." : "Retry"}
      </button>
      {feedback && (
        <span
          role="status"
          className={`text-xs ${feedback.ok ? "text-emerald-700 font-medium" : "text-rose-600"}`}
        >
          {feedback.message}
        </span>
      )}
    </div>
  );
}
