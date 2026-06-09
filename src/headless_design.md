# Alpha Drop - Elite Headless Frontend Architecture Blueprint
### Powered by Next.js (App Router), Tailwind CSS v4, and Radix UI

This blueprint represents a highly optimized, production-ready Headless Frontend architecture modeled after modern enterprise e-commerce platforms like CartUp. It features zero boilerplate, strict type safety, layout-shift prevention, dynamic routing, and hydrated client states.

---

## 1. Directory Structure (`app/` Router)

```bash
├── app/
│   ├── layout.tsx                # Dynamic Root HTML Shell, Fonts, & Metadata
│   ├── page.tsx                  # Server Component - Landing View & Hero Static Drops
│   ├── products/
│   │   ├── page.tsx              # Server Component - Full Product Catalog (SEO Pre-rendered)
│   │   └── [id]/
│   │       └── page.tsx          # Dynamic Server Routing - SEO Optimized PDP
│   ├── cart/
│   │   └── page.tsx              # Hydrated Client Component - Multi-Vendor Store Grid
│   ├── checkout/
│   │   └── page.tsx              # Secure checkout gateway layout
│   └── api/
│       └── products/route.ts     # Edge API endpoint for fast catalog retrieval
├── components/
│   ├── ui/                       # Radix UI or custom Tailwind primitives
│   │   ├── dialog.tsx            # Modal structure
│   │   ├── accordion.tsx         # Accessible FAQ collapsible blocks
│   │   └── card.tsx              # Aspect-ratio-constrained Product Cards
│   ├── Header.tsx                # Blurred backdrop floating structural navigation header
│   └── Footer.tsx                # Complete local corporate directories footer
├── store/
│   └── useCartStore.ts           # State engine for shopping cart persistence
├── types/
│   └── index.ts                  # Pristine unified types and interfaces
└── tailwind.config.ts            # Strict styling config
```

---

## 2. Core Server & Client Code Blocks

### A. Root Layout Server Component (`app/layout.tsx`)
```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpha Drop | Premium Dropshipping Hub",
  description: "Highly curated premium household electronics, traditional handloom sarees, and smart backups with free express delivery.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-pink-100 selection:text-pink-900">
        <Header />
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### B. High-Performance PDP Dynamic Server Component (`app/products/[id]/page.tsx`)
```tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import AddToCartButton from "./AddToCartButton";

interface PageProps {
  params: { id: string };
}

// Generate Static Paths at build time for instant responses
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white border border-gray-150 p-6 sm:p-10 rounded-2xl shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: LayoutShift Protected Media Display */}
        <div className="lg:col-span-6 bg-slate-50/50 rounded-2xl border border-gray-150 p-12 flex items-center justify-center relative aspect-square w-full">
          <div className="absolute top-4 left-4 bg-pink-100 text-pink-700 text-[10px] font-black px-2.5 py-1 uppercase rounded-md">
            -{product.discount}% OFF
          </div>
          <div className="w-48 h-48 relative transform hover:scale-105 transition-transform duration-300">
            {/* Dynamic Vector Icon / Optimized WebP Media */}
            <div className="text-slate-800 flex items-center justify-center h-full w-full">
              {/* Lazy Loaded Asset Placeholder */}
              <span className="font-black text-xs uppercase tracking-widest text-[#f27495]">PREMIUM SELECTION</span>
            </div>
          </div>
        </div>

        {/* Right Side: Structured Specifications */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-[#f27495] uppercase tracking-widest bg-[#fff0f4] px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-tight pt-1">
              {product.name}
            </h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-mono font-black text-[#f27495]">
              ৳{product.price.toLocaleString()}
            </span>
            <span className="text-sm font-mono text-slate-400 line-through">
              ৳{product.originalPrice.toLocaleString()}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            {product.description}
          </p>

          <div className="border-t border-slate-100 pt-5 space-y-3">
            <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider">Parameters & Specifications</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.specs.map((spec, index) => (
                <li key={index} className="text-[11px] text-slate-500 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Micro-interaction Add Button */}
          <div className="pt-6">
            <AddToCartButton product={product} />
          </div>
        </div>

      </div>
    </div>
  );
}
```

### C. Headless Multi-Vendor Cart Component with local state grouped by Store Header (`app/cart/page.tsx`)
```tsx
"use client";

import React, { useMemo } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, Plus, Minus, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CartClientPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCartStore();

  // Multi-Vendor Grouping Strategy based on vendor classifications of Bangladesh catalog
  const vendorGroupedItems = useMemo(() => {
    const groups: Record<string, { storeName: string; items: typeof cartItems }> = {
      "walton_singer": { storeName: "🔋 Alpha Electronics Store (Walton / Singer Official)", items: [] },
      "traditional": { storeName: "🧵 Heritage Weaves & Local Artisans", items: [] },
      "organics": { storeName: "🍯 Sundarbans Organics & Health cooperatives", items: [] },
    };

    cartItems.forEach((item) => {
      const id = item.product.id;
      if (id.startsWith("APL-BD") || id.startsWith("TEC-BD")) {
        groups["walton_singer"].items.push(item);
      } else if (id.startsWith("FAS-BD")) {
        groups["traditional"].items.push(item);
      } else {
        groups["organics"].items.push(item);
      }
    });

    // Strip empty categories
    return Object.entries(groups).filter(([_, group]) => group.items.length > 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const shippingFee = subtotal > 2000 ? 0 : cartItems.length > 0 ? 120 : 0;
  const salesTax = subtotal * 0.08;
  const total = subtotal + shippingFee + salesTax;

  if (cartItems.length === 0) {
    return (
      <div className="p-16 text-center bg-white border border-gray-150 rounded-2xl max-w-xl mx-auto shadow-sm">
        <h2 className="text-sm font-black uppercase text-neutral-800 tracking-wider">No active items in cargo queue</h2>
        <p className="text-[11px] text-slate-500 mt-2 mb-6 uppercase tracking-wider">Browse Walton MX5 notebooks, standing fans, and organic honeys to populate.</p>
        <Link href="/products" className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-pink-600 text-[10px] font-black uppercase tracking-widest transition">
          Browse Drops Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Grouped Stores Left Column */}
      <div className="lg:col-span-8 space-y-6">
        {vendorGroupedItems.map(([storeKey, group]) => (
          <div key={storeKey} className="bg-white border border-gray-150 rounded-2xl shadow-2xs overflow-hidden">
            <div className="bg-slate-50 border-b border-gray-150 px-5 py-3 flex items-center justify-between">
              <span className="text-[10px] font-black text-neutral-800 tracking-wider uppercase">
                {group.storeName}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#f27495] bg-[#fff0f4] px-2.5 py-0.5 rounded-full">
                DISPATCHING DIRECT
              </span>
            </div>

            <div className="p-5 divide-y divide-slate-100">
              {group.items.map((item) => (
                <div key={item.product.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg p-2 border border-gray-150 flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-black uppercase text-slate-400">{item.product.imageIcon}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-neutral-900 leading-tight">{item.product.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">৳{item.product.price.toLocaleString()} x {item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-gray-150">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 text-slate-500 hover:text-black">
                        <Minus size={10} />
                      </button>
                      <span className="text-xs font-mono font-bold px-3 min-w-[24px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 text-slate-500 hover:text-[#f27495]">
                        <Plus size={10} />
                      </button>
                    </div>
                    
                    <span className="text-xs font-mono font-black text-slate-800 w-24 text-right">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>

                    <button onClick={() => removeFromCart(item.product.id)} className="text-slate-300 hover:text-red-500 p-1">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center bg-white border border-gray-150 p-4 rounded-2xl">
          <button onClick={clearCart} className="text-[9px] font-black text-rose-500 tracking-widest uppercase hover:underline">
            CLEAR FULL ORDER STACK
          </button>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">{cartItems.length} UNIFIED SLOTS REQUESTED</span>
        </div>
      </div>

      {/* Calculations Right Column */}
      <div className="lg:col-span-4 bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-6">
        <div>
          <h3 className="text-xs font-black text-neutral-900 tracking-wider uppercase border-b border-slate-100 pb-3">
            Invoicing Flow
          </h3>
        </div>

        <div className="space-y-3 text-xs text-slate-600 font-medium">
          <div className="flex justify-between">
            <span>Cargo Goods Subtotal:</span>
            <span className="font-mono text-slate-900">৳{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Corporate Shipping Charge:</span>
            <span className="font-mono text-slate-900">{shippingFee === 0 ? "FREE" : `৳${shippingFee}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax [8%]:</span>
            <span className="font-mono text-slate-900">৳{salesTax.toLocaleString()}</span>
          </div>
          <div className="border-t border-slate-100 pt-3 flex justify-between items-end font-bold">
            <span className="text-neutral-900">Aggregate Total Outflow:</span>
            <span className="text-lg font-mono text-[#f27495] font-black">৳{total.toLocaleString()}</span>
          </div>
        </div>

        <Link href="/checkout" className="w-full bg-[#f27495] hover:bg-[#d45677] text-white py-4 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition shadow-md shadow-pink-100">
          <CreditCard size={12} />
          PROCEED TO CHECKOUT
          <ChevronRight size={12} />
        </Link>
      </div>

    </div>
  );
}
```

---

## 3. Highly Optimized Tailwind Config (`src/index.css`)
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;950&family=Space+Grotesk:wght@400;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
}

/* Fluid responsive spacing rules & custom scrollbars */
@layer utilities {
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```
