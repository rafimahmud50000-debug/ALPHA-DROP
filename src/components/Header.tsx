import React, { useState } from "react";
import { ShoppingCart, User, Truck, LogOut, Shield, Award, Package, Search, X, Mail, Menu, ChevronDown } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import AlphaDropLogo from "./AlphaDropLogo";

interface HeaderProps {
  onNavigate: (path: string) => void;
  userEmail?: string;
  currentUser?: { name: string; email: string; phone: string } | null;
}

export default function Header({ onNavigate, userEmail = "customer@alphadrop.net", currentUser }: HeaderProps) {
  const { cartItems, searchQuery, setSearchQuery } = useCartStore();
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  // Total count computed dynamically
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Categories list matching user's products
  const categoriesList = ["All", "Tech", "Fashion", "Appliance", "Accessory"];

  return (
    <header className="w-full bg-[#fcfcfc] shadow-sm border-b border-gray-100 flex flex-col font-sans">
      
      {/* 1. Hot Pink Top Bar Ribbon (as seen in the screenshot) */}
      <div className="w-full bg-[#fff0f4] border-b border-[#ffe3e9] py-2.5 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[11.5px] font-bold text-[#f27495]">
          <div className="inline-flex items-center gap-1 cursor-default">
            <span>Welcome to AlphaDrop Storefront</span>
          </div>
          
          <div className="flex items-center gap-5 font-sans">
            <span onClick={() => onNavigate("/help-center")} className="hover:underline cursor-pointer transition">Help & Support</span>
            {currentUser ? (
              <span onClick={() => onNavigate("/dashboard/notifications")} className="font-bold underline cursor-pointer hover:text-[#d45677] transition">{currentUser.name}</span>
            ) : (
              <span onClick={() => onNavigate("/auth")} className="font-bold underline cursor-pointer hover:text-[#d45677] transition animate-bounce">Login / Signup</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main E-Commerce Action Hub */}
      <div className="w-full bg-white py-4.5 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Row 1/Col 1: Logo & Categories Trigger */}
          <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
            
            {/* Logo Wrapper */}
            <div
              onClick={() => {
                setSearchQuery("");
                onNavigate("/");
              }}
              className="flex items-center cursor-pointer active:scale-95 transition shrink-0"
              id="header-logo-container"
            >
              <AlphaDropLogo mode="header" />
            </div>

            {/* Live Interactive Categories Dropdown Button (White with gray borders as shown on platform design) */}
            <div className="relative">
              <button
                onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                className="flex items-center gap-2.5 px-5 py-3 sm:py-3.5 border border-neutral-200 hover:border-emerald-800 rounded-sm bg-white text-neutral-700 hover:text-emerald-800 text-xs sm:text-sm font-semibold tracking-tight transition duration-150 cursor-pointer shadow-sm"
                id="btn-header-categories-dropdown"
              >
                <Menu size={16} className="text-neutral-700 hover:text-emerald-800" />
                <span>Categories</span>
                <ChevronDown size={14} className="opacity-60" />
              </button>

              {showCategoriesMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowCategoriesMenu(false)}></div>
                  <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white border border-gray-100 py-2.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-55 mb-1.5">
                      Select Department
                    </div>
                    {categoriesList.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setShowCategoriesMenu(false);
                          onNavigate("/products");
                          // Let the search query simulate filtering or show target
                          if (cat !== "All") {
                            setSearchQuery(cat);
                          } else {
                            setSearchQuery("");
                          }
                        }}
                        className="w-full text-left font-semibold text-xs px-4 py-2 text-gray-700 hover:bg-[#fff0f4] hover:text-[#f27495] transition flex items-center justify-between"
                      >
                        <span>{cat} Products</span>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-sans">go</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Center search element mimicking the precise layout rounded container and Search Button */}
          <div className="relative w-full sm:flex-1 max-w-3xl flex items-center">
            <div className="relative w-full flex">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="rechargeable fan"
                  className="w-full bg-[#f8faf9] text-[#111827] placeholder-[#8a9992] pl-11 pr-11 py-3 sm:py-3.5 rounded-l-xl text-xs sm:text-sm font-sans tracking-tight focus:outline-none focus:ring-2 focus:ring-[#f27495]/20 border border-gray-200 border-r-0 shadow-inner transition duration-200"
                  id="input-header-search"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-[#111827] cursor-pointer"
                    id="btn-clear-header-search"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  if (window.location.pathname !== "/" && window.location.hash !== "#/") {
                    onNavigate("/");
                  }
                }}
                className="bg-[#f27495] hover:bg-[#d45677] text-white px-6 sm:px-10 py-3 sm:py-3.5 rounded-r-xl text-xs sm:text-sm font-bold font-sans tracking-wide transition active:scale-95 duration-100 flex items-center gap-2 justify-center shadow-md shadow-pink-100 cursor-pointer"
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Cart, Mail Envelope and user account menu triggers styled in aesthetic Pink/Dark Theme */}
          <div className="flex items-center gap-4 shrink-0 justify-end w-full sm:w-auto">
            
            {/* 1. Envelope / Chat messages block as seen in header */}
            <button
              onClick={() => {
                onNavigate("/messages");
              }}
              className="relative p-2.5 rounded-full text-gray-500 hover:text-[#f27495] hover:bg-[#fff0f4] transition duration-150 cursor-pointer w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-100"
              title="Inbox"
              id="btn-header-mail"
            >
              <Mail size={19} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#f27495] text-white text-[9px] font-sans font-bold flex items-center justify-center shadow-sm">
                2
              </span>
            </button>

             {/* 2. User Profiles drop menu container */}
            <div className="relative">
              <button
                onClick={() => onNavigate(currentUser ? "/dashboard/notifications" : "/auth")}
                className="p-2.5 rounded-full text-gray-500 hover:text-[#f27495] hover:bg-[#fff0f4] transition duration-150 cursor-pointer w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-100"
                title={currentUser ? `${currentUser.name} Profile` : "Login / Signup"}
                id="btn-header-profile"
              >
                <User size={19} />
              </button>
            </div>

            {/* 3. Shopping Cart action with pink design styling and responsive badges */}
            <button
              onClick={() => onNavigate("/cart")}
              className="relative p-2.5 rounded-full text-gray-500 hover:text-[#f27495] hover:bg-[#fff0f4] transition duration-150 cursor-pointer w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-100"
              title="Current Cart"
              id="btn-header-cart"
            >
              <ShoppingCart size={19} className="text-gray-600 hover:text-[#f27495]" />
              
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-[#f27495] text-white text-[10px] font-sans font-bold flex items-center justify-center px-1 border border-white shadow-md">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
