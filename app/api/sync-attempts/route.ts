import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/lib/auth";

// GET /api/sync-attempts – returns latest 50 sync attempts with related order info.
export async function GET(req: NextRequest) {
  // Authentication
  const unauthorized = await requireAuth(req);
  if (unauthorized) return unauthorized;

  // Fetch attempts
  const attempts = await prisma.syncAttempt.findMany({
    orderBy: { startedAt: "desc" },
    take: 50,
    include: {
      orderSync: {
        select: {
          orderId: true,
          orderData: true,
          hubspotContactId: true,
          hubspotDealId: true,
        },
      },
    },
  });

  // Shape response (redact sensitive fields)
  const result = attempts.map((a) => {
    const order = a.orderSync;
    const orderData = (order.orderData ?? {}) as Record<string, unknown>;
    const customer = (orderData.customer ?? {}) as Record<string, unknown>;
    return {
      id: a.id,
      orderId: order.orderId,
      customerIdentifier: typeof customer.email === "string" ? customer.email : "",
      amount: typeof orderData.total === "number" ? orderData.total : null,
      currency: typeof orderData.currency === "string" ? orderData.currency : null,
      status: a.status,
      attemptCount: a.attemptNumber,
      hubspotContactId: order.hubspotContactId ?? null,
      hubspotDealId: order.hubspotDealId ?? null,
      errorSummary: a.errorMessage ?? null,
      lastUpdated: a.finishedAt ?? a.startedAt,
    };
  });

  return NextResponse.json(result);
}
