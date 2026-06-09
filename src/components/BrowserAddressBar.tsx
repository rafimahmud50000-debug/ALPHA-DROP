import React from "react";
import { ArrowLeft, Sparkles, ShieldAlert, Check } from "lucide-react";

interface BrowserAddressBarProps {
  currentPath: string;
  onBack?: () => void;
  canGoBack?: boolean;
}

export default function BrowserAddressBar({
  currentPath,
  onBack,
  canGoBack = false,
}: BrowserAddressBarProps) {
  // Map simulated paths to physical NextJS App Router file equivalents
  const getFileEquivalent = (path: string) => {
    if (path === "/" || path === "") return "app/page.tsx (Homepage)";
    if (path === "/products") return "app/products/page.tsx (Directory)";
    if (path.startsWith("/products/")) {
      const parts = path.split("/");
      const id = parts[parts.length - 1];
      return `app/products/[id]/page.tsx (Detail: ${id})`;
    }
    if (path === "/cart") return "app/cart/page.tsx (Cart Overview)";
    if (path === "/checkout") return "app/checkout/page.tsx (Checkout Gate)";
    return `app/${path}.tsx`;
  };

  const getUrlEquivalent = (path: string) => {
    return `https://alphadrop.com${path}`;
  };

  return (
    <div className="w-full bg-[#12080c] border-b border-[#2b0818] px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono select-none gap-2">
      <div className="flex items-center gap-3">
        {/* Back navigation button simulating browser arrow */}
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={`p-1.5 rounded transition ${
            canGoBack
              ? "text-[#f27495] hover:bg-[#2b0818] hover:text-[#fff0f4] cursor-pointer"
              : "text-[#2b0818] cursor-not-allowed"
          }`}
          title="Back to Previous View"
          id="btn-browser-back"
        >
          <ArrowLeft size={14} />
        </button>



        {/* Address Path Display */}
        <div className="flex items-center gap-1.5 text-gray-400 overflow-hidden truncate font-sans">
          <span className="font-bold">Path:</span>
          <span className="text-[#ffe6f0] font-mono tracking-tight text-[11px] truncate">
            {getFileEquivalent(currentPath)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 self-end sm:self-auto">
        {/* Mock Address URL */}
        <div className="bg-[#0c0307] border border-[#2b0818] px-3 py-1 rounded-full text-[11px] text-[#f27495] flex items-center gap-1.5 max-w-[220px] sm:max-w-xs truncate font-mono">
          <span className="text-gray-550 font-bold uppercase tracking-wider text-[9px]">URL:</span>
          <span className="text-gray-300 select-all truncate selection:bg-[#f27495]/20 font-sans font-medium text-[11px]">{getUrlEquivalent(currentPath)}</span>
        </div>
      </div>
    </div>
  );
}
