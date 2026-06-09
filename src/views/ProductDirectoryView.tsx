import React, { useState } from "react";
import { Product, Category } from "../types";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Filter, SlidersHorizontal, Package, RefreshCw, Grid3X3, Sparkles } from "lucide-react";

interface ProductDirectoryViewProps {
  onViewProduct: (id: string) => void;
  initialCategory?: Category | "All";
}

export default function ProductDirectoryView({
  onViewProduct,
  initialCategory = "All",
}: ProductDirectoryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(initialCategory);
  const [sortOrder, setSortOrder] = useState<"default" | "price-asc" | "price-desc" | "discount">("default");
  const products = PRODUCTS;

  const categories: (Category | "All")[] = ["All", "Tech", "Fashion", "Appliance", "Accessory"];

  // Filter products by selected category
  const filteredProducts = products.filter((product) => {
    return selectedCategory === "All" ? true : product.category === selectedCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "price-asc") return a.price - b.price;
    if (sortOrder === "price-desc") return b.price - a.price;
    if (sortOrder === "discount") return b.discount - a.discount;
    return 0; // default (id/array preservation)
  });

  return (
    <div className="space-y-6 pb-24">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#2bdf91]/10 p-2 border border-[#2bdf91]/20 text-[#2bdf91] rounded-xl animate-pulse">
            <Package size={20} />
          </div>
          <div>
            <h1 className="text-xl font-sans font-extrabold uppercase text-gray-900 tracking-tight">
              HARDWARE DIRECTORY
            </h1>
            <p className="font-sans text-[11px] text-gray-500">
              Verified live channels // Drone shipment ledger active
            </p>
          </div>
        </div>


      </div>

      {/* Control Panel: Filters & Sorting */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100/80 space-y-4 shadow-sm">
        
        {/* Category Pills Row */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[9px] font-sans text-gray-400 font-extrabold uppercase tracking-wider">
            <Filter size={11} className="text-[#2bdf91]" />
            <span>METRIC_FILTER:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-sans text-xs px-4 py-1.5 rounded-full transition duration-150 border cursor-pointer uppercase font-medium ${
                    isActive
                      ? "bg-[#2bdf91] text-[#0d1620] border-[#2bdf91] font-bold"
                      : "bg-slate-50 text-gray-600 border-slate-100 hover:border-gray-200 hover:bg-slate-100"
                  }`}
                  id={`btn-filter-pill-${cat}`}
                >
                  {cat === "All" ? "ALL RECORDS" : cat.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sorting Options row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 border-t border-gray-100 gap-3">
          <div className="flex items-center gap-2 text-[10px] font-sans text-gray-400 font-extrabold uppercase tracking-wider">
            <SlidersHorizontal size={12} className="text-[#2bdf91]" />
            <span>SORTING_PARAMETERS:</span>
          </div>

          <div className="flex flex-wrap gap-2 max-w-full">
            {[
              { key: "default", label: "INDEX_SEQUENCE" },
              { key: "price-asc", label: "PRICE: LOW-TO-HIGH" },
              { key: "price-desc", label: "PRICE: HIGH-TO-LOW" },
              { key: "discount", label: "CRITICAL DISCOUNT%" },
            ].map((opt) => {
              const isSelected = sortOrder === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setSortOrder(opt.key as any)}
                  className={`font-sans text-[10px] uppercase px-3 py-1 rounded-full border transition cursor-pointer ${
                    isSelected
                      ? "text-[#2bdf91] border-[#2bdf91]/40 bg-[#2bdf91]/10 font-bold"
                      : "text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-100"
                  }`}
                  id={`btn-sort-pill-${opt.key}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid display of sorted items */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-gray-200 rounded-2xl bg-white shadow-sm">
          <Sparkles className="mx-auto text-gray-300 animate-spin mb-4" size={32} />
          <h3 className="font-sans font-bold text-gray-900 uppercase mb-1 text-sm">
            Data Stream Unresponsive
          </h3>
          <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto">
            [WARNING]: The custom category metric yielded no query results. 
            Adjust your filter options or click below to restore default configuration.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSortOrder("default");
            }}
            className="mt-6 px-5 py-2 bg-[#2bdf91] text-[#0d1620] font-sans text-xs font-bold uppercase rounded-full shadow-sm hover:bg-[#3bf4a5] transition cursor-pointer"
            id="btn-restore-stream"
          >
            RESTORE DEFAULT STREAM
          </button>
        </div>
      )}
    </div>
  );
}
