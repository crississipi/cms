import { redirect } from "next/navigation";
import { getSession } from "@/src/lib/auth/session";
import { logoutAction } from "@/src/lib/auth/actions";
import { prisma } from "@/src/lib/prisma";
import { RetryButton } from "./retry-button";
import { ExportDealsButton } from "./export-button";
import { SyncStatus } from "@/src/generated/prisma";

export const instant = false;

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Retrieve latest 50 sync attempts, newest first
  let attempts: Array<{
    id: string;
    orderSyncId: string;
    attemptNumber: number;
    status: SyncStatus;
    hubspotContactId: string | null;
    hubspotDealId: string | null;
    errorCategory: string | null;
    errorMessage: string | null;
    startedAt: Date;
    orderSync: {
      orderId: string;
      status: SyncStatus;
    };
  }> = [];
  let dbError: string | null = null;

  try {
    attempts = await prisma.syncAttempt.findMany({
      take: 50,
      orderBy: { startedAt: "desc" },
      include: {
        orderSync: {
          select: {
            orderId: true,
            status: true,
          },
        },
      },
    });
  } catch {
    dbError = "Unable to connect to the database to load sync attempts.";
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-serif text-stone-900 tracking-tight">
              Order-to-HubSpot Sync
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Live audit history (most recent 50 attempts)
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ExportDealsButton />
            <span className="text-xs text-stone-600 bg-stone-100 px-2 py-1 rounded">
              Signed in as <strong className="text-stone-800">{session.username}</strong>
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs text-stone-500 hover:text-stone-900 focus:outline-none focus:underline cursor-pointer"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {dbError ? (
          <div
            role="alert"
            className="p-4 bg-rose-50 border border-rose-200 rounded-md text-sm text-rose-800"
          >
            {dbError}
          </div>
        ) : attempts.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-md p-12 text-center">
            <h3 className="text-sm font-medium text-stone-900">No sync attempts recorded</h3>
            <p className="mt-1 text-xs text-stone-500">
              Webhook deliveries and retries will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-md shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200 text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 uppercase tracking-wider font-medium">
                  <tr>
                    <th scope="col" className="px-4 py-3">Timestamp (UTC)</th>
                    <th scope="col" className="px-4 py-3">Order ID</th>
                    <th scope="col" className="px-4 py-3">Attempt</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-4 py-3">HubSpot Contact</th>
                    <th scope="col" className="px-4 py-3">HubSpot Deal</th>
                    <th scope="col" className="px-4 py-3">Details / Error</th>
                    <th scope="col" className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {attempts.map((attempt) => {
                    const isFailed =
                      attempt.status === SyncStatus.FAILED ||
                      attempt.orderSync.status === SyncStatus.FAILED;

                    let statusBadgeClass =
                      "bg-stone-100 text-stone-700 border-stone-200";
                    if (attempt.status === SyncStatus.SYNCED) {
                      statusBadgeClass =
                        "bg-emerald-50 text-emerald-800 border-emerald-200";
                    } else if (attempt.status === SyncStatus.FAILED) {
                      statusBadgeClass =
                        "bg-rose-50 text-rose-800 border-rose-200";
                    } else if (attempt.status === SyncStatus.PROCESSING) {
                      statusBadgeClass =
                        "bg-amber-50 text-amber-800 border-amber-200";
                    }

                    return (
                      <tr key={attempt.id} className="hover:bg-stone-50/50">
                        <td className="px-4 py-3 whitespace-nowrap text-stone-500 font-mono">
                          {new Date(attempt.startedAt).toISOString().replace("T", " ").slice(0, 19)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-stone-900">
                          {attempt.orderSync.orderId}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                          #{attempt.attemptNumber}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${statusBadgeClass}`}
                          >
                            {attempt.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-stone-600 font-mono">
                          {attempt.hubspotContactId || "—"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-stone-600 font-mono">
                          {attempt.hubspotDealId || "—"}
                        </td>
                        <td className="px-4 py-3 max-w-xs truncate text-stone-500">
                          {attempt.errorMessage ? (
                            <span title={attempt.errorMessage}>
                              {attempt.errorCategory ? `[${attempt.errorCategory}] ` : ""}
                              {attempt.errorMessage}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          {isFailed ? (
                            <RetryButton
                              attemptId={attempt.id}
                              orderId={attempt.orderSync.orderId}
                            />
                          ) : (
                            <span className="text-stone-300">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
