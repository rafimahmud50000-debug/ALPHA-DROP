import React from "react";
import { Product } from "../types";
import CyberIcon from "./CyberIcon";
import { ShoppingBag, Eye, Star } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

interface ProductCardProps {
  key?: string;
  product: Product;
  onViewDetails: (id: string) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div
      className="group bg-white border border-gray-150 hover:border-[#f27495]/40 flex flex-col justify-between overflow-hidden transition-all duration-300 rounded-2xl p-4.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5"
      id={`product-card-${product.id}`}
    >
      {/* Aspect-Ratio Protected Media Section */}
      <div 
        onClick={() => onViewDetails(product.id)}
        className="cursor-pointer relative overflow-hidden flex items-center justify-center bg-slate-50/50 rounded-xl aspect-[5/4] w-full mb-4 border border-slate-100"
      >
        {/* FREE DELIVERY Tag */}
        <div className="absolute top-2.5 left-2.5 z-20">
          <div className="bg-[#fff0f4] border border-[#f27495]/15 text-[#f27495] font-sans text-[8.5px] font-black px-2 py-0.5 uppercase rounded-full shadow-3xs tracking-widest">
            FREE EXPRESS
          </div>
        </div>

        {/* Discount Tag */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <div className="bg-[#f27495] text-white font-sans text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase shadow-2xs tracking-widest">
            -{product.discount}% OFF
          </div>
        </div>
        
        {/* The Graphic Logo Icon (centered nicely, scales with clean spring curves) */}
        <div className="relative z-10 p-4 transition-transform duration-500 ease-out group-hover:scale-108">
          <CyberIcon name={product.imageIcon} className="text-slate-800" size={68} />
        </div>

        {/* Backdrop hover glow shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff0f4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          {/* Category Ribbon */}
          <span className="text-[8.5px] text-gray-400 font-extrabold uppercase tracking-widest block mb-1">
            {product.category}
          </span>

          {/* Title - Deep charcoal and bold headings */}
          <h3 
            onClick={() => onViewDetails(product.id)}
            className="font-sans font-black text-neutral-900 text-xs sm:text-sm tracking-tight leading-snug cursor-pointer hover:text-[#f27495] transition-colors line-clamp-2 min-h-[40px] mb-2"
          >
            {product.name}
          </h3>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[#f27495] font-mono font-black text-base sm:text-lg">
              ৳{product.price.toLocaleString("en-US")}
            </span>
            <span className="text-gray-400 font-mono text-xs line-through">
              ৳{product.originalPrice.toLocaleString("en-US")}
            </span>
          </div>

          {/* Ratings & Metadata */}
          <div className="flex items-center gap-1 text-[9px] text-amber-500 mb-4 font-bold uppercase tracking-wider">
            <Star size={11} fill="currentColor" className="text-amber-500" />
            <span className="text-amber-600 font-extrabold mr-1">5.0</span>
            <span className="text-gray-400 font-extrabold ml-1 leading-none">(33 reviews)</span>
          </div>
        </div>

        {/* Action Button: Custom interactive Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2.5 sm:py-3 bg-[#fff0f4]/60 hover:bg-[#f27495] text-[#f27495] hover:text-white border border-[#f27495]/15 hover:border-[#f27495] font-sans text-[9px] font-black tracking-widest uppercase transition-all duration-350 cursor-pointer rounded-xl flex items-center justify-center gap-2 shadow-3xs active:scale-[0.97]"
          id={`btn-quick-add-${product.id}`}
        >
          <ShoppingBag size={12} className="stroke-[2.5]" />
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  );
}
