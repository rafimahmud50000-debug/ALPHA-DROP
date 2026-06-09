import React, { useState } from "react";
import { Product } from "../types";
import CyberIcon from "../components/CyberIcon";
import { useCartStore } from "../store/useCartStore";
import ProductReviews from "../components/ProductReviews";
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  Truck,
  Shield,
  Clock,
  Cpu,
  Bookmark,
  Share2,
  Zap,
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onNavigate: (path: string) => void;
}

export default function ProductDetailView({ product, onBack, onNavigate }: ProductDetailViewProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useCartStore((state) => state.addToast);
  const [addedPopup, setAddedPopup] = useState(false);
  const [copiedPopup, setCopiedPopup] = useState(false);

  const discountAmount = product.originalPrice - product.price;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedPopup(true);
    setTimeout(() => {
      setAddedPopup(false);
    }, 2500);
  };

  const handleBuyNow = () => {
    addToCart(product);
    addToast(`"${product.name}" added to cart. Proceeding to checkout!`, "success");
    onNavigate("/checkout");
  };

  const handleCopyShare = () => {
    setCopiedPopup(true);
    setTimeout(() => {
      setCopiedPopup(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-24 font-sans">
      {/* Back button row */}
      <div className="flex justify-between items-center bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-xs text-gray-500 hover:text-[#2bdf91] cursor-pointer transition font-bold"
          id="btn-detail-back"
        >
          <ArrowLeft size={14} className="stroke-[2.2]" />
          <span>Go Back</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="font-sans text-[11px] text-gray-400 hidden sm:inline">
            Product SKU: #{product.id}
          </span>
          <button
            onClick={handleCopyShare}
            className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-gray-400 hover:text-[#2bdf91] transition cursor-pointer"
            title="Secure Share"
          >
            <Share2 size={14} className="stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Shared Feedback Popup */}
      {copiedPopup && (
        <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl text-xs font-sans flex items-center justify-between gap-4 shadow-md max-w-sm ml-auto z-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping"></span>
            <span className="text-gray-900 font-medium tracking-tight">
              Secure sharing details ready & saved to ledger!
            </span>
          </div>
          <CheckCircle size={15} className="text-sky-500" />
        </div>
      )}

      {/* Item Added Toast Feedback Popup */}
      {addedPopup && (
        <div className="bg-[#e8fbf3] border border-[#2bdf91]/30 p-4 rounded-2xl text-xs font-sans flex items-center justify-between gap-4 shadow-md max-w-sm ml-auto z-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2bdf91] animate-ping"></span>
            <span className="text-gray-900 font-medium">
              <strong className="text-[#10b981]">{product.name}</strong> added to bag!
            </span>
          </div>
          <CheckCircle size={15} className="text-[#10b981]" />
        </div>
      )}

      {/* Split Main Page layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Modern Visualizer */}
        <div className="md:col-span-6 relative rounded-2xl border border-gray-100 bg-white p-8 flex flex-col items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[380px] shadow-sm">
          
          {/* Subtle concentric graphic designs behind icon */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-gray-100 bg-slate-50 flex items-center justify-center shadow-inner">
            <div className="absolute inset-3 rounded-full border border-dashed border-gray-200"></div>
            <div className="absolute inset-8 rounded-full border border-dotted border-gray-100 animate-spin"></div>
            <div className="absolute inset-12 rounded-full border border-gray-200/50 bg-white flex items-center justify-center">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#2bdf91]/40 animate-ping"></div>
            </div>

            {/* Glowing Icon Component */}
            <div className="relative z-10 transition duration-300 transform scale-125 text-gray-700 hover:text-[#2bdf91]">
              <CyberIcon name={product.imageIcon} className="text-gray-800" size={56} />
            </div>

            <span className="absolute bottom-4 font-sans text-[10px] text-teal-600 tracking-widest font-extrabold uppercase">
              ACTIVE_SECTOR
            </span>
          </div>

          <div className="relative z-10 mt-6 w-full text-center">
            {/* Spec status row */}
            <div className="flex justify-center gap-6 text-[10px] font-sans text-gray-400 border-t border-gray-50 pt-4">
              <div>
                <span className="block text-gray-900 font-extrabold">MATERIAL</span>
                <span>TITAN_FIBER</span>
              </div>
              <div>
                <span className="block text-gray-900 font-extrabold">TRANSIT</span>
                <span>Drone_48h</span>
              </div>
              <div>
                <span className="block text-gray-900 font-extrabold">STABILITY</span>
                <span>100% SECURE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Specifications and Purchase Layer */}
        <div className="md:col-span-6 space-y-6">
          <div className="space-y-2">
            
            {/* Category Breadcrumb */}
            <div className="flex items-center gap-1.5 font-sans text-[10px] tracking-widest text-gray-400 uppercase font-bold">
              <span>DROPS</span>
              <span>/</span>
              <span className="text-[#2bdf91] font-extrabold">{product.category}</span>
              <span>/</span>
              <span>REF_{product.id}</span>
            </div>

            {/* Core Name */}
            <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900 leading-tight uppercase tracking-tight">
              {product.name}
            </h1>

            {/* Short Tagline */}
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Price Block */}
          <div className="p-5 rounded-2xl bg-white border border-gray-100 space-y-2.5 shadow-sm">
            <div className="flex items-end gap-3 font-sans">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                ৳{product.price.toLocaleString("en-US")}
              </span>
              <div className="flex flex-col mb-1">
                <span className="text-gray-400 text-xs line-through leading-none">
                  ৳{product.originalPrice.toLocaleString("en-US")}
                </span>
                <span className="text-[#10b981] text-[10px] font-bold mt-1 uppercase tracking-wide">
                  -{product.discount}% INSTANT DROP SAVINGS
                </span>
              </div>
            </div>

            {/* Real Save computation */}
            <div className="text-[11px] font-sans text-gray-500 border-t border-gray-50 pt-3 flex items-center justify-between">
              <span className="font-medium">Direct Savings Today:</span>
              <span className="text-[#10b981] font-bold uppercase">
                Save ৳{discountAmount.toLocaleString("en-US")}
              </span>
            </div>
          </div>

          {/* Comprehensive Specifications list */}
          <div className="space-y-2">
            <div className="text-xs font-sans font-bold text-gray-900 uppercase tracking-widest flex items-center gap-1.5">
              <Cpu size={14} className="text-[#2bdf91] stroke-[2.2]" />
              <span>HARDWARE_CORE_SPECIFICATIONS:</span>
            </div>

            <ul className="space-y-1.5 font-sans text-xs text-gray-500">
              {product.specs.map((spec, index) => (
                <li key={index} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-gray-100/85 shadow-sm">
                  <span className="text-[#2bdf91] font-black text-sm select-none leading-none">›</span>
                  <span className="text-gray-700 font-medium">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action BUY NOW and ADD TO CART button layer */}
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-5 rounded-full bg-[#fff0f4] hover:bg-[#ffe3ea] text-[#f27495] font-sans text-[11px] sm:text-xs font-black uppercase tracking-wider transition duration-150 flex items-center justify-center gap-2 border border-[#f27495]/20 shadow-3xs hover:shadow-2xs active:scale-98 cursor-pointer text-center"
                id="btn-detail-add-to-cart"
              >
                <ShoppingCart size={14} className="stroke-[2.5]" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 px-5 rounded-full bg-[#f27495] hover:bg-[#eb5b80] text-white font-sans text-[11px] sm:text-xs font-black uppercase tracking-wider transition duration-150 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-98 cursor-pointer text-center"
                id="btn-detail-buy-now"
              >
                <Zap size={14} className="fill-white stroke-none" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Shipping, Returns & Security info */}
            <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-2xl bg-white border border-gray-100 text-[10px] font-sans text-gray-500 uppercase shadow-sm">
              <div className="flex flex-col items-center justify-center p-1.5 border-r border-[#f27495]/10">
                <Truck size={12} className="text-[#f27495] mb-1" />
                <span className="font-bold text-gray-800 mb-0.5">DRONE SPEED</span>
                <span>Worldwide</span>
              </div>
              <div className="flex flex-col items-center justify-center p-1.5 border-r border-[#f27495]/10">
                <Shield size={12} className="text-[#f27495] mb-1" />
                <span className="font-bold text-gray-800 mb-0.5">SECURE PAY</span>
                <span>Protected</span>
              </div>
              <div className="flex flex-col items-center justify-center p-1.5">
                <Clock size={12} className="text-[#f27495] mb-1" />
                <span className="font-bold text-gray-800 mb-0.5">30-DAY DROP</span>
                <span>Returns</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Brand New Verified Reviews & Ratings section */}
      <ProductReviews productId={product.id} productName={product.name} />
    </div>
  );
}
