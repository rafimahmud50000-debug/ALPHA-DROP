import React from "react";
import { Product } from "../types";
import CyberIcon from "./CyberIcon";
import { ShoppingBag, Star } from "lucide-react";
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
      className="group bg-white border border-gray-150 hover:border-[#f27495]/40 flex flex-col justify-between overflow-hidden transition-all duration-300 rounded-2xl p-4 sm:p-4.5 shadow-2s hover:shadow-md hover:-translate-y-0.5"
      id={`product-card-${product.id}`}
    >
      {/* Aspect-Ratio Protected Media Section */}
      <div 
        onClick={() => onViewDetails(product.id)}
        className="cursor-pointer relative overflow-hidden flex items-center justify-center bg-slate-50/50 rounded-xl aspect-[5/4] w-full mb-3.5 border border-slate-100"
      >
        {/* FREE DELIVERY Tag */}
        <div className="absolute top-2.5 left-2.5 z-20">
          <div className="bg-pink-50 border border-pink-100 text-[#f27495] font-sans text-[10px] font-semibold px-2.5 py-0.5 rounded-md shadow-3xs">
            Free Express
          </div>
        </div>

        {/* Discount Tag */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <div className="bg-[#f27495] text-white font-sans text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-2xs">
            -{product.discount}% Off
          </div>
        </div>
        
        {/* The Graphic Logo Icon */}
        <div className="relative z-10 p-4 transition-transform duration-500 ease-out group-hover:scale-108">
          <CyberIcon name={product.imageIcon} className="text-slate-800" size={64} />
        </div>

        {/* Backdrop hover glow shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff0f4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          {/* Category Ribbon */}
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider block mb-1">
            {product.category}
          </span>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(product.id)}
            className="font-sans font-bold text-gray-900 text-xs sm:text-[14px] tracking-tight leading-snug cursor-pointer hover:text-[#f27495] transition-colors line-clamp-2 min-h-[40px] mb-2"
          >
            {product.name}
          </h3>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[#f27495] font-sans font-bold text-base sm:text-[17px]">
              ৳{product.price.toLocaleString("en-US")}
            </span>
            <span className="text-gray-400 font-sans text-xs line-through">
              ৳{product.originalPrice.toLocaleString("en-US")}
            </span>
          </div>

          {/* Ratings & Metadata */}
          <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-3.5 font-semibold">
            <Star size={11} fill="currentColor" className="text-amber-450" />
            <span className="text-amber-600 font-bold mr-0.5">5.0</span>
            <span className="text-gray-400 font-medium">(33 reviews)</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2 bg-pink-50 hover:bg-[#f27495] text-[#f27495] hover:text-white border border-[#f27495]/20 font-sans text-xs font-semibold rounded-xl tracking-wide hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-3xs"
          id={`btn-quick-add-${product.id}`}
        >
          <ShoppingBag size={12} className="stroke-[2]" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
