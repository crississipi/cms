"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  sku: string;
  name: string;
  price: number;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    sku: "TSH-BLK-M",
    name: "Black Tee (M)",
    price: 450.0,
    description: "Premium heavyweight organic cotton t-shirt in classic matte black.",
  },
  {
    sku: "TSH-WHT-L",
    name: "White Tee (L)",
    price: 500.0,
    description: "Relaxed-fit crisp white tee crafted from combed ring-spun cotton.",
  },
];

const RANDOM_CUSTOMERS = [
  { first_name: "Liam", last_name: "Reyes", domain: "outlook.com", phone: "+63917" },
  { first_name: "Sofia", last_name: "Cruz", domain: "gmail.com", phone: "+63918" },
  { first_name: "Mateo", last_name: "Garcia", domain: "icloud.com", phone: "+63919" },
  { first_name: "Isabella", last_name: "Bautista", domain: "proton.me", phone: "+63920" },
  { first_name: "Noah", last_name: "Mendoza", domain: "yahoo.com", phone: "+63921" },
  { first_name: "Chloe", last_name: "Navarro", domain: "gmail.com", phone: "+63922" },
];

function generateRandomCustomer() {
  const template = RANDOM_CUSTOMERS[Math.floor(Math.random() * RANDOM_CUSTOMERS.length)];
  const randomNum = Math.floor(100 + Math.random() * 900);
  const randomSuffix = Math.floor(1000000 + Math.random() * 9000000);
  return {
    first_name: template.first_name,
    last_name: template.last_name,
    email: `${template.first_name.toLowerCase()}.${template.last_name.toLowerCase()}${randomNum}@${template.domain}`,
    phone: `${template.phone}${randomSuffix}`,
  };
}

export default function Storefront() {
  const [cart, setCart] = useState<{ [sku: string]: number }>({});

  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const randomizeCustomer = () => {
    setCustomer(generateRandomCustomer());
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const updateQuantity = (sku: string, delta: number) => {
    setCart((prev) => {
      const current = prev[sku] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[sku];
        return copy;
      }
      return { ...prev, [sku]: next };
    });
  };

  const cartItems = PRODUCTS.map((p) => ({
    ...p,
    qty: cart[p.sku] || 0,
  })).filter((p) => p.qty > 0);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError("Please add at least one item to your cart.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setOrderResult(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((i) => ({ sku: i.sku, qty: i.qty })),
          customer,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process order.");
      }

      setOrderResult(data);
      // Reset cart on successful placement
      setCart({});
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-900 selection:text-stone-50">
      {/* Navigation Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white font-bold text-sm tracking-wider">
              V
            </div>
            <span className="font-serif text-lg tracking-tight font-semibold text-stone-900">
              VALVE &amp; TEE
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
              Live Storefront
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link
              href="/dashboard"
              className="text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-stone-100 border border-stone-200"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Admin Dashboard &rarr;
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-stone-500 uppercase mb-2">
            Order-to-HubSpot Lifecycle Demo
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight font-medium">
            Curated Essentials
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Simulate a real e-commerce checkout. Orders are signed on the server with HMAC-SHA256,
            verified, and synchronized to HubSpot CRM with atomic duplicate protection.
          </p>
        </div>

        {orderResult ? (
          /* Order Confirmation View */
          <div className="max-w-2xl mx-auto bg-white border border-stone-200 rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200 text-lg">
                ✓
              </div>
              <div>
                <h2 className="text-xl font-serif font-medium text-stone-900">
                  Order Accepted &amp; Dispatched
                </h2>
                <p className="text-xs text-stone-500 font-mono">
                  Order ID: {orderResult.order_id}
                </p>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-stone-600">
                <span>Webhook Ingestion Status:</span>
                <span className="font-semibold text-stone-900">
                  HTTP {orderResult.webhookStatus}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>HubSpot Sync Lifecycle:</span>
                <span className="uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {orderResult.syncResult?.status || "QUEUED / PROCESSED"}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Verified Server Total:</span>
                <span className="font-semibold text-stone-900">
                  {orderResult.currency} {orderResult.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="flex-1 text-center px-4 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-mono hover:bg-stone-800 transition-colors"
              >
                Inspect in Operations Dashboard &rarr;
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOrderResult(null);
                  setCart({});
                  setCustomer({ first_name: "", last_name: "", email: "", phone: "" });
                }}
                className="px-4 py-2.5 rounded-lg border border-stone-200 text-stone-700 text-xs font-mono hover:bg-stone-50 transition-colors"
              >
                Place Another Test Order
              </button>
            </div>
          </div>
        ) : (
          /* Storefront Grid & Checkout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Products Column */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-2">
                1. Product Catalog
              </h2>
              {PRODUCTS.map((product) => {
                const count = cart[product.sku] || 0;
                return (
                  <div
                    key={product.sku}
                    className="bg-white border border-stone-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-stone-300"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-stone-900 text-base">
                          {product.name}
                        </h3>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                          {product.sku}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 max-w-md">
                        {product.description}
                      </p>
                      <p className="text-sm font-semibold font-mono text-stone-900 mt-2">
                        PHP {product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      {count > 0 ? (
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50 font-mono text-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.sku, -1)}
                            className="px-3 py-1.5 hover:bg-stone-200 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 py-1.5 font-bold min-w-8 text-center bg-white">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.sku, 1)}
                            className="px-3 py-1.5 hover:bg-stone-200 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.sku, 1)}
                          className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-mono hover:bg-stone-800 transition-colors"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart & Customer Checkout Column */}
            <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                  2. Cart &amp; Customer Checkout
                </h2>
                <button
                  type="button"
                  onClick={randomizeCustomer}
                  className="text-[11px] font-mono text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-50 px-2 py-0.5 rounded transition-colors"
                >
                  🎲 Randomize Customer
                </button>
              </div>

              {/* Cart Review */}
              <div className="border-b border-stone-100 pb-4 mb-4">
                {cartItems.length === 0 ? (
                  <p className="text-xs text-stone-400 font-mono py-4 text-center">
                    Your cart is currently empty.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.sku}
                        className="flex justify-between items-center text-xs font-mono"
                      >
                        <span className="text-stone-700">
                          {item.qty} × {item.name}
                        </span>
                        <span className="font-semibold text-stone-900">
                          PHP {(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-stone-100 pt-2 flex justify-between items-center font-mono">
                      <span className="text-xs font-bold text-stone-900 uppercase">
                        Order Total
                      </span>
                      <span className="text-base font-bold text-stone-900">
                        PHP {cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-600 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.first_name}
                      onChange={(e) =>
                        setCustomer({ ...customer, first_name: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-stone-600 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.last_name}
                      onChange={(e) =>
                        setCustomer({ ...customer, last_name: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-600 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full mt-4 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  {isSubmitting ? "Signing & Syncing..." : `Place Simulated Order (PHP ${cartTotal.toFixed(2)})`}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
