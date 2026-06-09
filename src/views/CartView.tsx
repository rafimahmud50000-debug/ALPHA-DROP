import React, { useMemo } from "react";
import { useCartStore } from "../store/useCartStore";
import CyberIcon from "../components/CyberIcon";
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, CreditCard, ChevronRight, ShoppingBag, Store } from "lucide-react";

interface CartViewProps {
  onNavigate: (path: string) => void;
}

export default function CartView({ onNavigate }: CartViewProps) {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCartStore();

  // Multi-vendor Storefront headers based on authentic product lines
  const vendorGroups = useMemo(() => {
    const groups: Record<string, { storeName: string; badge: string; items: typeof cartItems }> = {
      "walton_singer": { 
        storeName: "🔌 Walton & Singer Tech Hub (Official)", 
        badge: "AUTOMATED FAST DISPATCH",
        items: [] 
      },
      "heritage_traditional": { 
        storeName: "🧵 Dhakai Weavers & Traditional Wear Guild", 
        badge: "LOCAL ARTISAN CERTIFIED",
        items: [] 
      },
      "sunderbans_organics": { 
        storeName: "🍯 Sundarbans Organics & Jute Cooperatives", 
        badge: "100% PURE & BIODEGRADABLE",
        items: [] 
      },
    };

    cartItems.forEach((item) => {
      const id = item.product.id;
      if (id.startsWith("APL-BD") || id.startsWith("TEC-BD")) {
        groups["walton_singer"].items.push(item);
      } else if (id.startsWith("FAS-BD")) {
        groups["heritage_traditional"].items.push(item);
      } else {
        groups["sunderbans_organics"].items.push(item);
      }
    });

    return Object.entries(groups).filter(([_, group]) => group.items.length > 0);
  }, [cartItems]);

  // Computations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Free shipping over ৳2,000, else ৳120
  const shippingFee = subtotal > 2000 ? 0 : cartItems.length > 0 ? 120 : 0;
  // 8% tax calculation
  const salesTax = subtotal * 0.08;
  const total = subtotal + shippingFee + salesTax;

  const handleUpdateQty = (id: string, currentQty: number, change: number) => {
    updateQuantity(id, currentQty + change);
  };

  return (
    <div className="space-y-6 pb-24 font-sans text-neutral-800" id="cart-container-system">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-stone-50 text-stone-400 flex items-center justify-center border border-stone-100">
            <ShoppingBag size={16} />
          </div>
          <div>
            <span className="text-[8px] tracking-[0.25em] font-extrabold text-neutral-400 uppercase block mb-0.5">YOUR PERSONAL</span>
            <h1 className="text-sm font-black uppercase tracking-[0.1em] text-neutral-800">
              SHOPPING CART
            </h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate("/products")}
          className="font-sans text-[10px] text-neutral-500 hover:text-neutral-800 flex items-center gap-1.5 cursor-pointer font-black uppercase tracking-wider transition border border-neutral-200 px-4 py-2.5 rounded-sm bg-white hover:border-neutral-400"
          id="btn-cart-back-to-drops"
        >
          <ArrowLeft size={12} className="stroke-[2.2]" />
          <span>RETURN TO STORE</span>
        </button>
      </div>

      {cartItems.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center border border-neutral-100 rounded-sm bg-white shadow-sm">
          <ShoppingBag className="mx-auto text-neutral-200 mb-4 stroke-[1.5]" size={36} />
          <h3 className="font-sans font-black text-neutral-800 uppercase mb-1 text-xs tracking-widest">
            YOUR CART IS EMPTY
          </h3>
          <p className="font-sans text-xs text-neutral-400 max-w-sm mx-auto mb-6 leading-relaxed uppercase tracking-wider text-[10px]">
            You have not added any products to your cart yet. Browse our premium collections to select your items.
          </p>
          <button
            onClick={() => onNavigate("/products")}
            className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-900 text-white font-sans text-[10px] font-black tracking-widest uppercase rounded-sm transition cursor-pointer"
            id="btn-cart-empty-load"
          >
            BROWSE PRODUCTS
          </button>
        </div>
      ) : (
        /* Filled Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Side: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            
            {vendorGroups.map(([storeKey, group]) => (
              <div 
                key={storeKey} 
                className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden"
                id={`cart-store-group-${storeKey}`}
              >
                {/* Store Header Banner */}
                <div className="bg-slate-50 border-b border-gray-150 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <Store size={15} className="text-[#f27495]" />
                    <span className="text-[11px] font-black text-neutral-800 tracking-wide uppercase">
                      {group.storeName}
                    </span>
                  </div>
                  <span className="text-[8.5px] font-black tracking-widest text-[#f27495] bg-[#fff0f4] border border-[#f27495]/15 px-2.5 py-0.5 rounded-full uppercase leading-none self-start sm:self-auto">
                    {group.badge}
                  </span>
                </div>

                <div className="p-4 sm:p-5 divide-y divide-slate-100">
                  {group.items.map((item) => {
                    const rowTotal = item.product.price * item.quantity;
                    return (
                      <div
                        key={item.product.id}
                        className="py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
                        id={`cart-item-row-${item.product.id}`}
                      >
                        {/* Product Details Section */}
                        <div className="flex items-center gap-4">
                          {/* Item visual logo icon or real product image */}
                          <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-gray-150 flex items-center justify-center relative overflow-hidden">
                            {item.product.imageUrl ? (
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-contain mix-blend-multiply"
                              />
                            ) : (
                              <CyberIcon name={item.product.imageIcon} className="text-neutral-500" size={20} />
                            )}
                            <span className="absolute top-0 left-0 bg-neutral-200 text-neutral-700 font-sans text-[7.5px] font-black px-1.5 py-0.5 rounded-br-lg rounded-tl-xl tracking-wide uppercase text-[7px]">
                              {item.product.id}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-sans font-black text-xs text-neutral-900 uppercase tracking-tight">
                              {item.product.name}
                            </h4>
                            <p className="font-sans text-[9px] text-neutral-400 font-extrabold uppercase tracking-wider mt-0.5">
                              CAT: {item.product.category}
                            </p>
                            
                            {/* Price display per single unit */}
                            <div className="flex items-center gap-2 mt-1 font-mono text-xs text-neutral-600 font-bold">
                              <span>৳{item.product.price.toLocaleString("en-US")}</span>
                              <span className="text-neutral-300 uppercase text-[9px] tracking-wider font-sans font-medium">/ unit</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Modifier and Calculations */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-neutral-50 sm:border-t-0 pt-3 sm:pt-0">
                          
                          {/* Quantities +/- Buttons */}
                          <div className="flex items-center bg-slate-50 border border-gray-200 rounded-lg p-1 shadow-3xs">
                            <button
                              onClick={() => handleUpdateQty(item.product.id, item.quantity, -1)}
                              className="w-7 h-7 flex items-center justify-center text-[#f27495] hover:text-[#d45677] transition cursor-pointer hover:bg-white rounded-md hover:shadow-3xs"
                              title="Reduce Load"
                              id={`btn-cart-dec-${item.product.id}`}
                            >
                              <Minus size={10} className="stroke-[3]" />
                            </button>

                            <span className="font-mono text-xs font-black px-3.5 text-neutral-800 min-w-[34px] text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => handleUpdateQty(item.product.id, item.quantity, 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#f27495] hover:text-[#d45677] transition cursor-pointer hover:bg-white rounded-md hover:shadow-3xs"
                              title="Increase Load"
                              id={`btn-cart-inc-${item.product.id}`}
                            >
                              <Plus size={10} className="stroke-[3]" />
                            </button>
                          </div>

                          {/* Subtotal row */}
                          <div className="font-sans text-right min-w-[100px]">
                            <span className="text-neutral-400 text-[8px] block uppercase font-extrabold tracking-wider">SUBTOTAL</span>
                            <span className="text-neutral-900 font-mono font-black text-xs sm:text-sm">
                              ৳{rowTotal.toLocaleString("en-US")}
                            </span>
                          </div>

                          {/* Instant Removal Trash */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-neutral-300 hover:text-rose-500 hover:bg-rose-50 border border-transparent hover:border-gray-200 rounded-lg transition cursor-pointer"
                            title="Remove Item"
                            id={`btn-cart-purge-${item.product.id}`}
                          >
                            <Trash2 size={12} className="stroke-[2.5]" />
                          </button>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Clear all triggers */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to clear your cart?")) {
                    clearCart();
                  }
                }}
                className="font-sans text-[9px] text-[#f27495] hover:text-white bg-[#fff0f4] hover:bg-[#f27495] border border-[#f27495]/20 px-4 py-2.5 rounded-full font-black uppercase tracking-widest cursor-pointer transition shadow-3xs"
                id="btn-cart-clear-all"
              >
                CLEAR ALL ITEMS
              </button>

              <span className="font-sans text-[8px] text-[#f27495] uppercase tracking-widest font-black bg-[#fff0f4] border border-[#f27495]/15 px-3.5 py-1.5 rounded-full shadow-3xs">
                {cartItems.length} UNIFIED SLOTS REQUESTED
              </span>
            </div>

          </div>

          {/* Right Side: Calculation Details Block */}
          <div className="lg:col-span-4 bg-white border border-pink-100 p-6 rounded-sm space-y-5 shadow-sm">
            <div className="border-b border-pink-50 pb-3">
              <span className="text-[8px] tracking-[0.25em] font-extrabold text-pink-300 uppercase block">ORDER DETAILS</span>
              <h3 className="font-sans font-black text-xs uppercase tracking-wider text-pink-900 mt-0.5">
                ORDER SUMMARY
              </h3>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex justify-between pb-3 border-b border-dashed border-pink-50">
                <span className="text-pink-400 font-extrabold tracking-widest text-[9px] uppercase">SUBTOTAL:</span>
                <span className="text-pink-900 font-mono font-bold">৳{subtotal.toLocaleString("en-US")}</span>
              </div>
              
              <div className="flex justify-between pb-3 border-b border-dashed border-pink-50">
                <span className="text-pink-400 font-extrabold tracking-widest text-[9px] uppercase">SHIPPING FEE:</span>
                <span className="text-pink-900 font-bold uppercase text-[10px]">
                  {shippingFee === 0 ? (
                    <strong className="text-pink-600 font-black tracking-widest text-[9px]">FREE</strong>
                  ) : (
                    `৳${shippingFee.toLocaleString("en-US")}`
                  )}
                </span>
              </div>

              <div className="flex justify-between pb-3 border-b border-dashed border-pink-50">
                <span className="text-pink-400 font-extrabold tracking-widest text-[9px] uppercase">TAX [8%]:</span>
                <span className="text-pink-900 font-mono font-bold">৳{salesTax.toLocaleString("en-US")}</span>
              </div>

              {shippingFee > 0 && (
                <div className="text-[9px] text-pink-600 bg-pink-50 p-3 rounded-sm border border-pink-100 leading-relaxed font-sans uppercase font-bold tracking-wider">
                  💡 Add <strong>৳2,000</strong> or more to your cart for FREE shipping!
                </div>
              )}

              <div className="pt-3 flex justify-between items-end border-t border-pink-50">
                <div>
                  <span className="text-[8px] font-extrabold text-pink-500 tracking-widest block uppercase mb-1">TOTAL AMOUNT</span>
                  <span className="text-pink-600 font-black tracking-widest uppercase text-[10px] block">ORDER TOTAL:</span>
                </div>
                <span className="text-2xl font-black text-pink-900 leading-none tracking-tight font-mono">
                  ৳{total.toLocaleString("en-US")}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate("/checkout")}
                className="w-full py-4 px-4 bg-pink-600 hover:bg-pink-700 border border-pink-600 text-white font-sans text-[10px] font-black uppercase tracking-widest transition flex items-center justify-center gap-2 rounded-sm shadow-sm cursor-pointer"
                id="btn-cart-checkout"
              >
                <CreditCard size={12} className="stroke-[2.5]" />
                <span>PROCEED TO CHECKOUT</span>
                <ChevronRight size={12} className="stroke-[2.5]" />
              </button>
            </div>


          </div>

        </div>
      )}
    </div>
  );
}
