/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";

// Views
import HomeView from "./views/HomeView";
import ProductDirectoryView from "./views/ProductDirectoryView";
import ProductDetailView from "./views/ProductDetailView";
import CartView from "./views/CartView";
import CheckoutView from "./views/CheckoutView";
import DashboardView from "./views/DashboardView";
import HelpCenterView from "./views/HelpCenterView";
import AuthView from "./views/AuthView";
import MessagesView from "./views/MessagesView";
import Footer from "./components/Footer";

import { Product } from "./types";
import { PRODUCTS } from "./data/products";

// State hooks and store
import { useCartStore } from "./store/useCartStore";
import { Terminal, Shield, Sparkles, Cpu, Radio, Network, Scroll, HelpCircle } from "lucide-react";
import ToastContainer from "./components/ToastContainer";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [pathHistory, setPathHistory] = useState<string[]>(["/"]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const products = PRODUCTS;

  interface UserProfile {
    name: string;
    email: string;
    phone: string;
  }

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("alpha_drop_user");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object" && "name" in parsed) {
            return parsed as UserProfile;
          }
        }

        // If they explicitly logged out, preserve that logged out state
        const hasLoggedOut = localStorage.getItem("alpha_drop_logged_out");
        if (hasLoggedOut === "true") {
          return null;
        }
      } catch (e) {
        console.error("Error loading user context:", e);
      }
    }
    // No default logged in user
    return null;
  });

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("alpha_drop_user", JSON.stringify(user));
        localStorage.removeItem("alpha_drop_logged_out");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("alpha_drop_user");
        localStorage.setItem("alpha_drop_logged_out", "true");
      } catch (e) {
        console.error(e);
      }
    }
    navigate("/auth");
  };

  // Live user email from custom system credentials
  const userEmail = currentUser?.email || "customer@alphadrop.net";

  // Navigation controller with precise state-saving history tracking
  const navigate = (path: string, params?: { id: string }) => {
    setCurrentPath(path);
    setPathHistory((prev) => [...prev, path]);

    if (path.startsWith("/products/") && params?.id) {
      setSelectedProductId(params.id);
    } else if (path === "/products") {
      // Keep selected ID if already set, but reset if desired
    } else if (path === "/") {
      setSelectedProductId(null);
    }
  };

  const handleBack = () => {
    if (pathHistory.length > 1) {
      const newHistory = [...pathHistory];
      newHistory.pop(); // remove current page
      const prevPath = newHistory[newHistory.length - 1]; // pick previous page
      
      setPathHistory(newHistory);
      setCurrentPath(prevPath);

      // Restore specific product selection detail references on back
      if (prevPath.startsWith("/products/")) {
        const parts = prevPath.split("/");
        setSelectedProductId(parts[parts.length - 1]);
      } else {
        setSelectedProductId(null);
      }
    }
  };

  // Automated virtual live dropshipping order feed (aesthetic side-panel for high-tech premium feel on large desktops)
  const [liveOrders, setLiveOrders] = useState<{ id: string; item: string; country: string; time: string }[]>([
    { id: "TX-4201", item: "NEON DET-CORE KETTLE", country: "DE_BER", time: "Just Now" },
    { id: "TX-9482", item: "GRID DRIVE SSD", country: "JP_NPT", time: "2 min ago" },
    { id: "TX-1104", item: "ORBIT SEAMLESS HOOD", country: "US_ENG", time: "5 min ago" },
  ]);

  useEffect(() => {
    // Random dropshipping order simulator
    const orderItemsList = [
      "SYNAPSE GLOW MECHANIC DECK",
      "QUANTUM HUMIDIFY POD",
      "CRYO-CHILL RAPID BEVERAGE REEF",
      "STRIKER TEK-VEST v1.2",
      "OXY-TITANIUM INTEGRAL CHRONO",
      "CYBER BLOCK WALLET ZERO"
    ];
    const countryCodes = ["US_WA", "CA_ONT", "UK_LON", "JP_OSA", "DE_BER", "SG_CHG"];

    const interval = setInterval(() => {
      const rdId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
      const rdItem = orderItemsList[Math.floor(Math.random() * orderItemsList.length)];
      const rdCountry = countryCodes[Math.floor(Math.random() * countryCodes.length)];
      
      setLiveOrders((prev) => [
        { id: rdId, item: rdItem, country: rdCountry, time: "Just Now" },
        ...prev.slice(0, 4)
      ]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  const handleViewProduct = (id: string) => {
    navigate(`/products/${id}`, { id });
  };

  // Find product reference when page details are mapped
  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      
      {/* Primary Navigation Header */}
      <Header
        onNavigate={(path) => navigate(path)}
        userEmail={userEmail}
        currentUser={currentUser}
      />

      {/* Main Container (Full width, clean and beautifully centered like modern platform layout) */}
      <main className="flex-grow max-w-[1440px] w-full mx-auto px-4 md:px-8 py-8">
        
        {/* Main Storefront Panel */}
        <section className="w-full transition-all duration-300">
          {currentPath === "/" && (
            <HomeView
              onNavigate={(path) => navigate(path)}
              onViewProduct={handleViewProduct}
            />
          )}

          {currentPath === "/auth" && (
            <AuthView
              onNavigate={(path) => navigate(path)}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {currentPath === "/products" && (
            <ProductDirectoryView
              onViewProduct={handleViewProduct}
            />
          )}

          {currentPath.startsWith("/products/") && (
            <ProductDetailView
              product={currentProduct}
              onBack={handleBack}
              onNavigate={(path) => navigate(path)}
            />
          )}

          {currentPath === "/cart" && (
            <CartView
              onNavigate={(path) => navigate(path)}
            />
          )}

          {currentPath === "/checkout" && (
            <CheckoutView
              onNavigate={(path) => navigate(path)}
              userEmail={userEmail}
            />
          )}

          {currentPath === "/messages" && (
            <MessagesView
              onNavigate={(path) => navigate(path)}
            />
          )}

          {(currentPath === "/dashboard" || currentPath === "/dashboard/notifications") && (
            <DashboardView
              onNavigate={(path) => navigate(path)}
              userEmail={userEmail}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          )}

          {currentPath.startsWith("/help-center") && (
            <HelpCenterView
              onNavigate={(path) => navigate(path)}
              userEmail={userEmail}
              currentPath={currentPath}
            />
          )}
        </section>

        <Footer onNavigate={(path) => navigate(path)} />

      </main>
      
      {/* Interactive Global Toast Notification System */}
      <ToastContainer />
    </div>
  );
}
