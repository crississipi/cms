// src/lib/catalog.ts
// Server‑only product catalog used by the demo storefront.
// Each product has a stable SKU, name, price (in PHP), and optional description.

export interface Product {
  sku: string;
  name: string;
  price: number; // major currency units (PHP)
}

export const catalog: Product[] = [
  {
    sku: "TSH-BLK-M",
    name: "Black Tee (M)",
    price: 450.0,
  },
  // Additional sample products to illustrate cart behavior (optional).
  {
    sku: "TSH-WHT-L",
    name: "White Tee (L)",
    price: 500.0,
  },
];

export function getProductBySku(sku: string): Product | undefined {
  return catalog.find((p) => p.sku === sku);
}
