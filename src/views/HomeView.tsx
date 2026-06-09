import React, { useState } from "react";
import { Product, Category } from "../types";
import { PRODUCTS } from "../data/products";
import Hero from "../components/Hero";
import CountdownTimer from "../components/CountdownTimer";
import ProductCard from "../components/ProductCard";
import { Search, Zap, Laptop, Shirt, Home as HomeIcon, Clock, ChevronRight, AlertTriangle, Sparkles, Briefcase, Wind, Award, Gem, Star, Radio, RefreshCw } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import AlphaDropLogo from "../components/AlphaDropLogo";

// Helper component to render icons dynamically
const CategoryIcon = ({ name, size, className }: { name: string; size: number; className?: string }) => {
  switch (name) {
    case "Laptop": return <Laptop size={size} className={className} />;
    case "Shirt": return <Shirt size={size} className={className} />;
    case "Wind": return <Wind size={size} className={className} />;
    case "Briefcase": return <Briefcase size={size} className={className} />;
    case "Sparkles": return <Sparkles size={size} className={className} />;
    case "HomeIcon": return <HomeIcon size={size} className={className} />;
    case "Zap": return <Zap size={size} className={className} />;
    default: return <Clock size={size} className={className} />;
  }
};

interface VisualCategoryItem {
  key: string;
  label: string;
  subtext: string;
  categoryTarget: Category | "All";
  iconName: string;
  badge?: string;
  badgeBg?: string;
  accentColor: string;
  gradient: string;
}

const CUSTOM_CATEGORIES: VisualCategoryItem[] = [
  {
    key: "computing",
    label: "Computer & Laptops",
    subtext: "Walton MX5 Series",
    categoryTarget: "Tech",
    iconName: "Laptop",
    badge: "11% OFF",
    badgeBg: "bg-red-500 text-white",
    accentColor: "border-pink-300 text-pink-600 hover:bg-[#fff0f4]",
    gradient: "from-pink-50 to-pink-100"
  },
  {
    key: "traditional_wear",
    label: "Traditional Wear",
    subtext: "Jamdani & Silk",
    categoryTarget: "Fashion",
    iconName: "Shirt",
    badge: "HOT",
    badgeBg: "bg-amber-500 text-white",
    accentColor: "border-amber-300 text-amber-700 hover:bg-amber-55/35",
    gradient: "from-amber-50 to-amber-100"
  },
  {
    key: "smart_cooling",
    label: "Home & Cooling",
    subtext: "AC/DC Fans & Air",
    categoryTarget: "Appliance",
    iconName: "Wind",
    badge: "BACKUP",
    badgeBg: "bg-emerald-500 text-white",
    accentColor: "border-emerald-300 text-emerald-700 hover:bg-emerald-55/30",
    gradient: "from-emerald-50 to-emerald-100"
  },
  {
    key: "handicrafts",
    label: "Artisanal Bags",
    subtext: "Jute & Handloom",
    categoryTarget: "Accessory",
    iconName: "Briefcase",
    badge: "ECO",
    badgeBg: "bg-indigo-500 text-white",
    accentColor: "border-indigo-300 text-indigo-700 hover:bg-indigo-50",
    gradient: "from-indigo-50 to-indigo-100"
  },
  {
    key: "healthy_organics",
    label: "Health & Organics",
    subtext: "Sunderbans Honey",
    categoryTarget: "Accessory",
    iconName: "Sparkles",
    badge: "PURE",
    badgeBg: "bg-orange-500 text-white",
    accentColor: "border-orange-300 text-orange-850 hover:bg-orange-50",
    gradient: "from-yellow-50 to-orange-100"
  },
  {
    key: "kitchen_appliances",
    label: "Smart Cookers",
    subtext: "Convection Air Fryer",
    categoryTarget: "Appliance",
    iconName: "HomeIcon",
    badge: "EFFICIENT",
    badgeBg: "bg-rose-500 text-white",
    accentColor: "border-rose-300 text-rose-700 hover:bg-rose-50",
    gradient: "from-rose-50 to-rose-100"
  },
  {
    key: "network_backup",
    label: "Power Backup",
    subtext: "Router Smart IPS",
    categoryTarget: "Tech",
    iconName: "Zap",
    badge: "8H RUN",
    badgeBg: "bg-sky-500 text-white",
    accentColor: "border-sky-300 text-sky-700 hover:bg-sky-50/50",
    gradient: "from-sky-50 to-sky-100"
  },
  {
    key: "all_collections",
    label: "View All Drops",
    subtext: "Full Factory Queue",
    categoryTarget: "All",
    iconName: "Clock",
    badge: "100% REAL",
    badgeBg: "bg-[#f27495] text-white",
    accentColor: "border-[#f27495]/40 text-[#f27495] hover:bg-[#fff0f4]",
    gradient: "from-pink-50 to-pink-100/60"
  }
];

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onViewProduct: (id: string) => void;
}

export default function HomeView({ onNavigate, onViewProduct }: HomeViewProps) {
  const { searchQuery, setSearchQuery } = useCartStore();
  const products = PRODUCTS;
  
  // Appliance is active by default showing the highlighted appliance card from the screenshot
  const [activeCategory, setActiveCategory] = useState<Category | "All">("Appliance");
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("smart_cooling");

  // Filter products based on search and category tab
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesCategory =
      activeCategory === "All" ? true : product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Flash Sale products
  const flashSaleProducts = products.filter((p) => p.discount >= 28)
    .sort((a, b) => b.discount - a.discount);

  const handleCategorySelection = (category: Category) => {
    if (activeCategory === category) {
      setActiveCategory("All"); // Toggle all
    } else {
      setActiveCategory(category);
    }
  };

  return (
    <div className="space-y-6 pb-24 bg-slate-50 min-h-screen">
      {/* 1. Search Feedback */}
      {searchQuery && (
        <div className="bg-white border border-neutral-200 p-4 rounded-sm text-xs font-sans text-neutral-700 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="font-medium text-neutral-900">
              Showing search results for "<span className="text-emerald-800 font-bold">{searchQuery}</span>"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-red-700 font-medium hover:underline text-[11px]"
            >
              Clear Search
            </button>
          </div>
          {filteredProducts.length === 0 && (
            <div className="py-2 text-neutral-600 flex items-center gap-1.5 mt-2">
              <AlertTriangle size={14} className="text-amber-700" />
              <span>No products match the search query. Try another keyword.</span>
            </div>
          )}
        </div>
      )}

      {/* 2. Hero */}
      <Hero onExplore={() => {
        setActiveCategory("All");
        onNavigate("/products");
      }} />

      {/* 2.5: Highlight Banner */}
      <div className="bg-white text-slate-900 p-6 sm:p-8 flex flex-col justify-between border border-neutral-200 rounded-2xl relative overflow-hidden shadow-sm" id="home-bento-highlights">
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider text-pink-600 uppercase">AlphaDrop Premium Catalog</span>
          <h3 className="font-sans font-bold text-lg sm:text-xl md:text-2xl tracking-tight leading-tight text-neutral-850">
            Connecting premium smart manufacturing directly with express home delivery.
          </h3>
        </div>
      </div>

       {/* 3. Categories (Circular Grid exactly matching Cartup layout but in AlphaDrop style) */}
      <div className="bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-xs" id="bespoke-category-selector">
        
        {/* Categories Section Heading */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3.5 mb-6">
          <div>
            <h2 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#f27495] rounded-full inline-block"></span>
              Trending Categories
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Active: <span className="text-[#f27495] font-bold">{activeCategory}</span>
            </p>
          </div>
          {activeCategory !== "All" && (
            <button
              onClick={() => {
                setActiveCategory("All");
                setSelectedCategoryKey("all_collections");
              }}
              className="text-xs font-semibold text-[#f27495] bg-pink-50 hover:bg-[#f27495] hover:text-white border border-pink-100 px-3.5 py-1.5 rounded-xl transition duration-155 cursor-pointer shadow-3xs"
            >
              Show All Products
            </button>
          )}
        </div>

        {/* Categories Circle Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-x-4 gap-y-7 justify-items-center">
          {CUSTOM_CATEGORIES.map((item) => {
            const isActive = selectedCategoryKey === item.key && activeCategory === item.categoryTarget;
            return (
              <div 
                key={item.key} 
                onClick={() => {
                  setActiveCategory(item.categoryTarget);
                  setSelectedCategoryKey(item.key);
                }}
                className="group flex flex-col items-center cursor-pointer select-none"
                id={`category-node-${item.key}`}
              >
                {/* circle wrapper */}
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center relative transition-all duration-300 border-2 ${
                  isActive 
                    ? "border-[#f27495] bg-[#fff0f4] shadow-md ring-4 ring-[#f27495]/15 scale-[1.04]"
                    : "border-gray-150 bg-white hover:border-[#f27495]/50 hover:shadow-xs group-hover:scale-105"
                }`}>
                  {/* Subtle dynamic background gradient circle */}
                  <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${item.gradient} opacity-75 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Centered Icon with crisp outline */}
                  <div className={`relative z-10 ${isActive ? "text-[#f27495]" : "text-neutral-600 group-hover:text-[#f27495]"} transition-colors`}>
                    <CategoryIcon name={item.iconName} size={28} className="stroke-[1.8]" />
                  </div>

                  {/* Curated floating badge */}
                  {item.badge && (
                    <span className={`absolute -top-1 -right-1 text-[8px] font-bold tracking-wide px-2 py-0.5 rounded-md shadow-3xs uppercase ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Readable caption labels */}
                <div className="text-center mt-3 max-w-[110px]">
                  <span className={`text-[12px] font-bold tracking-tight block leading-tight ${isActive ? "text-[#f27495]" : "text-neutral-800 group-hover:text-[#f27495]"}`}>
                    {item.label}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400 block mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.subtext}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 4. Flash Sale */}
      <div 
        className="relative bg-white text-neutral-900 border border-gray-150 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden rounded-2xl shadow-sm" 
        style={{
          backgroundImage: "radial-gradient(circle, #fff1f2 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px"
        }}
        id="editorial-flash-panel"
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 z-10 w-full md:w-auto">
          {/* Logo icon frame */}
          <div className="w-12 h-12 bg-pink-50 text-pink-500 border border-pink-100 flex items-center justify-center rounded-xl shrink-0">
            <Clock size={18} className="stroke-[2]" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-pink-500">Flash Promotion Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            </div>
            <h3 className="font-sans font-bold text-sm tracking-tight text-neutral-800">
              Exclusive Factory-Direct Deals
            </h3>
            <p className="font-sans text-xs text-neutral-400 font-medium">
              High-quality items sourced directly from international manufacturers.
            </p>
          </div>
        </div>

        {/* Countdown + CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto z-10 shrink-0">
          <div className="bg-white/80 backdrop-blur-xs border border-gray-150 p-2.5 rounded-xl shadow-xs flex items-center justify-center sm:justify-start gap-3">
            <span className="text-xs font-semibold text-gray-500">Ends in:</span>
            <CountdownTimer />
          </div>

          <button
            onClick={() => {
              setActiveCategory("All");
              onNavigate("/products");
            }}
            className="bg-[#f27495] hover:bg-[#eb5b80] text-white font-sans text-xs font-semibold px-5 py-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap"
            id="btn-flash-acquire-offers"
          >
            Explore Offers
            <ChevronRight size={12} className="stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 5. Catalog */}
      <div className="space-y-4" id="streamline-catalog-stream">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} onViewDetails={onViewProduct} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-neutral-400">No products found.</div>
        )}
      </div>
    </div>
  );
}
