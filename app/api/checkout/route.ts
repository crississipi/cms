import { NextRequest, NextResponse } from "next/server";
import { getProductBySku, catalog } from "@/src/lib/catalog";
import { computeHmac } from "@/src/lib/security/hmac";
import { getEnv } from "@/src/lib/env";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer } = body;

    // Validate customer details
    if (!customer?.email || !customer?.first_name || !customer?.last_name) {
      return NextResponse.json(
        { error: "Customer email, first name, and last name are required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart cannot be empty." },
        { status: 400 }
      );
    }

    // SERVER-AUTHORITATIVE PRICE RECALCULATION
    // Any client-supplied prices are strictly discarded.
    let calculatedTotal = 0;
    const validatedItems: Array<{ sku: string; name: string; qty: number; price: number }> = [];

    for (const item of items) {
      const product = getProductBySku(item.sku);
      if (!product) {
        return NextResponse.json(
          { error: `Unknown SKU: ${item.sku}` },
          { status: 400 }
        );
      }
      const qty = Math.max(1, Math.min(100, Math.floor(Number(item.qty) || 1)));
      calculatedTotal += product.price * qty;
      validatedItems.push({
        sku: product.sku,
        name: product.name,
        qty,
        price: product.price,
      });
    }

    // Generate unique order ID and timezone-aware ISO timestamp
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-VALV-${Date.now().toString().slice(-6)}-${randomSuffix}`;
    const createdAt = new Date().toISOString();

    // Build canonical order webhook payload
    const orderPayload = {
      event: "order.created",
      order_id: orderId,
      created_at: createdAt,
      customer: {
        email: customer.email.trim().toLowerCase(),
        first_name: customer.first_name.trim(),
        last_name: customer.last_name.trim(),
        phone: customer.phone ? customer.phone.trim() : undefined,
      },
      items: validatedItems,
      currency: "PHP",
      total: Math.round(calculatedTotal * 100) / 100,
    };

    // Sign the raw JSON payload with HMAC-SHA256
    const env = getEnv();
    const rawPayloadBuffer = Buffer.from(JSON.stringify(orderPayload), "utf-8");
    // computeHmac signature as hex string:
    const signatureHex = computeHmac(env.ORDER_WEBHOOK_SECRET, rawPayloadBuffer).toString("hex");

    // Dispatch directly to the internal webhook receiver pipeline
    const origin = req.nextUrl.origin || "http://localhost:3000";
    const webhookRes = await fetch(`${origin}/api/webhooks/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [env.ORDER_SIGNATURE_HEADER.toLowerCase()]: `sha256=${signatureHex}`,
      },
      body: rawPayloadBuffer,
    });

    const webhookData = await webhookRes.json();

    return NextResponse.json({
      success: webhookRes.ok,
      order_id: orderId,
      total: orderPayload.total,
      currency: orderPayload.currency,
      items: orderPayload.items,
      webhookStatus: webhookRes.status,
      syncResult: webhookData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error during checkout." },
      { status: 500 }
    );
  }
}
