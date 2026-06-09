import React, { useState, useEffect } from "react";
import { 
  User, 
  CreditCard, 
  MapPin, 
  Package, 
  XOctagon, 
  RotateCcw, 
  Lock, 
  Bell, 
  ChevronRight, 
  PhoneCall,
  Search,
  Building2,
  ShieldCheck,
  Cookie,
  FileText,
  Info,
  Trash2,
  Check,
  HelpCircle,
  TrendingUp,
  Compass,
  AlertCircle,
  DollarSign
} from "lucide-react";

interface HelpCenterViewProps {
  onNavigate: (path: string) => void;
  userEmail: string;
  currentPath?: string;
}

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  isPinkText?: boolean;
}

export default function HelpCenterView({ onNavigate, userEmail, currentPath }: HelpCenterViewProps) {
  // Tabs: "faqs" | "about" | "cookies" | "terms"
  const [activeTab, setActiveTab] = useState<"faqs" | "about" | "cookies" | "terms">("faqs");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("rating-reviews");
  
  // Interactive cookies simulator state
  const [cookieConsent, setCookieConsent] = useState<{
    necessary: boolean;
    preferences: boolean;
    analytical: boolean;
  }>(() => {
    const saved = localStorage.getItem("alpha_drop_cookie_preferences");
    return saved ? JSON.parse(saved) : { necessary: true, preferences: true, analytical: false };
  });

  const [cookieStatusMsg, setCookieStatusMsg] = useState<string | null>(null);
  const [cacheSizeReport, setCacheSizeReport] = useState<string>("Calculating...");

  // Sync route hashes to switch active tab automatically
  useEffect(() => {
    if (currentPath) {
      if (currentPath.includes("#about")) {
        setActiveTab("about");
      } else if (currentPath.includes("#cookies") || currentPath.includes("#privacy")) {
        setActiveTab("cookies");
      } else if (currentPath.includes("#terms")) {
        setActiveTab("terms");
      } else if (currentPath.includes("#faqs")) {
        setActiveTab("faqs");
      } else if (currentPath.includes("#refund")) {
        setActiveTab("faqs");
        setExpandedId("refund-policy");
        setTimeout(() => {
          document.getElementById("faq-refund-policy")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else if (currentPath.includes("#warranty")) {
        setActiveTab("faqs");
        setExpandedId("warranty-policy");
        setTimeout(() => {
          document.getElementById("faq-warranty-policy")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [currentPath]);

  // Read LocalStorage size for policy metadata feedback
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        sum += (localStorage.getItem(key) || "").length * 2; // Roughly 2 bytes per char
      }
    }
    setCacheSizeReport(`${(sum / 1024).toFixed(2)} KB used`);
  }, [cookieStatusMsg]);

  const saveCookieConsent = (updated: typeof cookieConsent) => {
    setCookieConsent(updated);
    localStorage.setItem("alpha_drop_cookie_preferences", JSON.stringify(updated));
    setCookieStatusMsg("Preferences saved successfully! Caches updated.");
    setTimeout(() => setCookieStatusMsg(null), 3000);
  };

  const handleClearCache = () => {
    // Clear only app keys or just show reset confirmation
    const keysToRemove = [
      "alpha_drop_cart",
      "alpha_drop_cookie_preferences",
      "alpha_drop_currentUser"
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));
    setCookieStatusMsg("Cache cleared! All temporary store parameters have been reset.");
    setCookieConsent({ necessary: true, preferences: false, analytical: false });
    setTimeout(() => setCookieStatusMsg(null), 4000);
  };

  const quickLinks = [
    { label: "My Profile Details", icon: User, tab: "profile" },
    { label: "Pending Payments", icon: CreditCard, faqId: "payment-methods" },
    { label: "Courier Addresses", icon: MapPin, tab: "address" },
    { label: "Track Shipment", icon: Package, faqId: "shipping" },
    { label: "Cancel Order Ticket", icon: XOctagon, tab: "cancellation" },
    { label: "Request refund", icon: RotateCcw, tab: "returns" },
    { label: "Security Console", icon: Lock, tab: "profile" },
    { label: "App Alerts", icon: Bell, tab: "notifications" }
  ];

  const faqs: AccordionItem[] = [
    {
      id: "dropship-workings",
      title: "How does the AlphaDrop dropshipping model work?",
      content: "AlphaDrop operates by linking premium international and regional factory channels directly and safely to dropshippers and end-buyers. Once you register a purchase order via our secured checkout, the order data packets are processed, curated, and routed directly to source suppliers (like Walton-certified components or Singer smart products). They packages, custom-wrap, and dispatch the item directly to your doorstep in Bangladesh, cutting out multiple middle layers and passing immense dollar savings back to you."
    },
    {
      id: "campaigns",
      title: "Campaign Discounts & Flash Voucher Events",
      content: "Learn about our ongoing AlphaDrop promotion campaigns. We periodically organize seasonal sales, discount coupons, and express free shipping events across Dhaka, Chittagong, Sylhet, and major metropolitan hubs in Bangladesh. Vouchers can be redeemed instantly during checkout."
    },
    {
      id: "vouchers",
      title: "Voucher Codes Redemption Guide",
      content: "Vouchers can be claimed from the Voucher Center in your Account Dashboard. Type 'WELCOME250' during checkout to redeem your flat ৳250 off coupon on your first order of ৳1000 or above."
    },
    {
      id: "order-placement",
      title: "Order Placement Guidelines",
      content: "To place an order, select items from the Products directory list, add them to your Cart, supply a valid delivery phone number and shipping address, and select 'Place Order'. All prices include import and processing overheads, so you pay exactly what you see."
    },
    {
      id: "order-management",
      title: "How can I trace/track my dropshipped packages?",
      content: "Tracking is fully automated! Once your item has been verified at the central supplier fulfillment depot, an SMS tracking ledger notification is generated. You can trace its transit journey on your Account Dashboard under the 'Track My Order' visual logs tab."
    },
    {
      id: "rating-reviews",
      title: "Buyer Rating & Review Guidelines",
      content: "Your opinion drives our supply chain curation! After receiving your items, navigate to the product detail page, scroll down to the Ratings & Reviews section, fill out your name, select your desired Star rating (1-5), and share your honest feedback. You can even upvote other helpful reviews.",
      isPinkText: true
    },
    {
      id: "shipping",
      title: "Bangladesh-Wide Delivery Speed & Areas",
      content: "Fulfillment is completed via premier local logistics partners. Deliveries inside Dhaka Metropolitan take between 24 to 48 hours. Deliveries outside Dhaka (other districts/divisions) are delivered and verified within 48 to 72 hours max."
    },
    {
      id: "payment-methods",
      title: "Fully Confirmed Local Payment Gateways",
      content: "We proudly accept cash on delivery (Dhaka), secure bKash transfers, Nagad gateway systems, as well as VISA, MasterCard, and American Express cards."
    },
    {
      id: "refund-policy",
      title: "Standard Returns & Refund Policy",
      content: "Our hassle-free return window is active for 7 calendar days after delivery. If an item arrives damaged, non-functional, or does not match the product images, simply write to us to request a verification ticket. Once verified, we will arrange a return and full monetary reimbursement."
    },
    {
      id: "refund-process",
      title: "How can I process reviews/refunds?",
      content: "You can click on 'Return Product' inside your help desk console or account settings. Fill in basic details of the complaint, tag active photographs showing the issue, and choose refund to bKash/Nagad or bank transfer. Your amount is repaid within 3 to 5 business days."
    },
    {
      id: "warranty-policy",
      title: "12-Month Replacement Warranty Cover",
      content: "Excellent inventory warranty tracking: All active technical apparatus, appliances, and electronic inventory carry a 12-Month AlphaDrop Replacement Shield Policy covering structural defects and internal technical malfunctions."
    }
  ];

  const handleQuickLinkClick = (link: typeof quickLinks[0]) => {
    if (link.tab) {
      onNavigate(`/dashboard/notifications`);
    } else if (link.faqId) {
      setExpandedId(link.faqId);
      const element = document.getElementById(`faq-${link.faqId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full pb-10 animate-in fade-in duration-200 font-sans">
      
      {/* Page Title Header */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Corporate Hub</h1>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-50 border border-pink-100/60 text-[#f27495]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f27495] animate-ping"></span>
          <span>SYSTEM CHANNELS: ACTIVE</span>
        </div>
      </div>

      {/* 1. Large Magenta Welcome Banner */}
      <div className="w-full bg-gradient-to-r from-[#f27495] to-[#e05b7d] text-white rounded-2xl p-8 sm:p-10 mb-8 shadow-sm flex flex-col justify-center relative overflow-hidden select-none">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,100 50,55 T100,50" fill="none" stroke="white" strokeWidth="3" />
            <path d="M0,20 Q30,80 60,35 T100,80" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-10 space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-pink-100 opacity-90 block">
            AlphaDrop Corporate Center
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight uppercase">
            Hi, Rafi Mahmud, select resources & policies
          </h2>
          <p className="text-[10px] text-pink-50/80 font-bold uppercase tracking-widest mt-1">
            Bangladesh's premiere dropshipping directory and fast fulfillment infrastructure
          </p>
        </div>
      </div>

      {/* 🛠️ TAB CHANGER REGISTRY BUTTON SYSTEM */}
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-gray-150 shadow-xs max-w-2xl select-none">
        <button
          onClick={() => setActiveTab("faqs")}
          className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-sans text-xs font-black uppercase tracking-wider cursor-pointer text-center transition flex items-center justify-center gap-2 ${
            activeTab === "faqs"
              ? "bg-[#fff0f4] text-[#f27495] shadow-3xs"
              : "bg-transparent text-gray-500 hover:text-gray-800 hover:bg-slate-50"
          }`}
        >
          <HelpCircle size={14} />
          <span>FAQ Directory</span>
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-sans text-xs font-black uppercase tracking-wider cursor-pointer text-center transition flex items-center justify-center gap-2 ${
            activeTab === "about"
              ? "bg-[#fff0f4] text-[#f27495] shadow-3xs"
              : "bg-transparent text-gray-500 hover:text-gray-800 hover:bg-slate-50"
          }`}
        >
          <Building2 size={14} />
          <span>About Us</span>
        </button>

        <button
          onClick={() => setActiveTab("cookies")}
          className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl font-sans text-xs font-black uppercase tracking-wider cursor-pointer text-center transition flex items-center justify-center gap-2 ${
            activeTab === "cookies"
              ? "bg-[#fff0f4] text-[#f27495] shadow-3xs"
              : "bg-transparent text-gray-500 hover:text-gray-800 hover:bg-slate-50"
          }`}
        >
          <Cookie size={14} />
          <span>Cookies & Privacy</span>
        </button>

        <button
          onClick={() => setActiveTab("terms")}
          className={`flex-1 min-w-[150px] px-4 py-3 rounded-xl font-sans text-xs font-black uppercase tracking-wider cursor-pointer text-center transition flex items-center justify-center gap-2 ${
            activeTab === "terms"
              ? "bg-[#fff0f4] text-[#f27495] shadow-3xs"
              : "bg-transparent text-gray-500 hover:text-gray-800 hover:bg-slate-50"
          }`}
        >
          <FileText size={14} />
          <span>Terms & Conditions</span>
        </button>
      </div>

      {/* ==================== TAB 1: FAQ DIRECTORY ==================== */}
      {activeTab === "faqs" && (
        <div className="space-y-6">
          {/* Quick Links Group */}
          <div className="bg-white rounded-2xl border border-gray-150 shadow-sm p-6 select-none">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Quick Customer Support Routing Indices
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 text-center">
              {quickLinks.map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <div 
                    key={idx}
                    onClick={() => handleQuickLinkClick(link)}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-[#fff0f4]/40 cursor-pointer group transition duration-200"
                  >
                    <div className="w-11 h-11 rounded-full border-1.5 border-gray-100 group-hover:border-[#f27495] group-hover:bg-[#fff0f4]/50 flex items-center justify-center text-gray-400 group-hover:text-[#f27495] transition-all duration-200 mb-2 shadow-3xs">
                      <IconComponent size={18} className="stroke-[2.5]" />
                    </div>
                    
                    <span className="text-[9.5px] font-extrabold text-gray-700 leading-tight group-hover:text-[#f27495] transition duration-150 uppercase tracking-wide">
                      {link.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accordion Lists */}
          <div className="space-y-4">
            <div className="relative max-w-md">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQ repository database (e.g., Returns, bKash, Speed...)"
                className="w-full text-xs font-semibold bg-white border border-gray-150 rounded-xl pl-10 pr-4 py-3 focus:border-[#f27495] outline-none transition shadow-3xs"
              />
              <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3 text-[9px] text-[#f27495] hover:text-pink-700 font-black uppercase tracking-wider cursor-pointer"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden divide-y divide-gray-100">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedId === faq.id;
                const textClass = faq.isPinkText 
                  ? "text-[#f27495]" 
                  : isExpanded 
                    ? "text-gray-950 font-bold" 
                    : "text-gray-800";

                return (
                  <div 
                    key={faq.id} 
                    id={`faq-${faq.id}`}
                    className={`transition-colors duration-200 ${isExpanded ? "bg-slate-50/20" : ""}`}
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                      className="w-full py-4 px-6 flex items-center justify-between text-left transition hover:bg-gray-50 select-none cursor-pointer"
                    >
                      <span className={`text-[12px] sm:text-xs font-black tracking-normal uppercase ${textClass}`}>
                        {faq.title}
                      </span>
                      
                      <ChevronRight 
                        size={14} 
                        className={`transform transition-transform text-gray-400 duration-200 ${
                          isExpanded ? "rotate-90 text-[#f27495]" : ""
                        }`} 
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-5 pt-0.5 text-xs text-gray-600 leading-relaxed max-w-3xl animate-in slide-in-from-top-1 duration-200">
                        <p className="font-semibold text-gray-650 bg-slate-50/40 p-4 rounded-xl border border-gray-100 shadow-3xs leading-relaxed font-sans">
                          {faq.content}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="p-10 text-center text-xs text-gray-400 font-mono">
                  No matching dropshipping FAQ references discovered.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: ABOUT US (OUR STORY) ==================== */}
      {activeTab === "about" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Main Info Box */}
          <div className="bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <Building2 className="text-[#f27495]" size={26} />
              <div>
                <h2 className="text-base font-black uppercase text-gray-900 tracking-tight">Our Sourcing Manifesto</h2>
                <p className="text-[10px] text-gray-400 font-extrabold uppercase mt-0.5">Who we are & how we deliver absolute value</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-xs font-semibold text-gray-600 leading-relaxed font-sans">
                <p>
                  Founded in <span className="text-gray-900 font-black">2026 in Dhaka, Bangladesh</span>, AlphaDrop was built with a simple, disruptive idea: eliminate the inefficient logistics networks that cause retail prices to skyrocket in South Asia.
                </p>
                <p>
                  By partnering with verified factories and tier-1 production pipelines globally (including top-rated manufacturers of consumer smart tech, fashion apparel, and home essentials), we process orders directly at the source. This means zero third-party warehouses, zero holding costs, and zero retail storefront markups.
                </p>
                <p>
                  Every catalog item listed on AlphaDrop matches Walton/Singer level performance audits. When you buy, you’re connected live, secure, and covered under our full 12-Month replacement pledge.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="bg-pink-50 text-[#f27495] text-[9px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
                    Dhaka Headquarters
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
                    Sourced Globally
                  </span>
                  <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
                    48-Hr Delivery
                  </span>
                </div>
              </div>

              {/* Graphic stats card block */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-center space-y-1">
                  <TrendingUp className="text-[#f27495] mx-auto" size={20} />
                  <div className="text-2xl font-mono font-black text-gray-900">48 hrs</div>
                  <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Avg Delivery Target</div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-center space-y-1">
                  <Compass className="text-pink-500 mx-auto" size={20} />
                  <div className="text-2xl font-mono font-black text-gray-900">100%</div>
                  <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Factory Sourced</div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-center space-y-1">
                  <ShieldCheck className="text-[#f27495] mx-auto" size={20} />
                  <div className="text-2xl font-mono font-black text-gray-900">12 Mo</div>
                  <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Product Coverage</div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-center space-y-1">
                  <DollarSign className="text-pink-550 mx-auto" size={20} />
                  <div className="text-2xl font-mono font-black text-gray-900">30%+</div>
                  <div className="text-[9px] text-gray-400 font-black uppercase tracking-wider">Dollar Savings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Sourcing pipeline flow chart */}
          <div className="bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase text-gray-900 tracking-wider">
              The AlphaDrop Sourcing Model vs Regular Retail
            </h3>

            <div className="space-y-4">
              {/* AlphaDrop Pipeline */}
              <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wide text-emerald-800">
                    Our Streamlined Model (Factory Direct)
                  </span>
                  <span className="text-[9px] text-emerald-700 font-bold bg-emerald-100/60 px-2.5 py-0.5 rounded-full uppercase">
                    Highest efficiency
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-gray-500 font-bold">
                  <span className="px-3 py-1 bg-white border border-gray-150 rounded-lg text-emerald-700">Factory Sourcing</span>
                  <ChevronRight size={12} className="rotate-90 sm:rotate-0 text-gray-300" />
                  <span className="px-3 py-1 bg-white border border-gray-150 rounded-lg text-emerald-700">Digital Catalog Verification</span>
                  <ChevronRight size={12} className="rotate-90 sm:rotate-0 text-gray-300" />
                  <span className="px-3 py-1 bg-white border border-gray-150 rounded-lg text-emerald-700">Direct Express Delivery</span>
                </div>
              </div>

              {/* Regular Retail */}
              <div className="bg-rose-50/30 border border-rose-100 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wide text-rose-800">
                    Traditional Retail Logistics Chain
                  </span>
                  <span className="text-[9px] text-rose-750 font-bold bg-rose-100/60 px-2.5 py-0.5 rounded-full uppercase">
                    35% Price Inflated
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[9px] text-gray-400 font-semibold">
                  <span className="px-2.5 py-1 bg-white border border-gray-100 rounded-lg">Foreign Middlemen</span>
                  <ChevronRight size={10} className="rotate-90 sm:rotate-0 text-gray-200" />
                  <span className="px-2.5 py-1 bg-white border border-gray-100 rounded-lg">Warehousing & Storage Markups</span>
                  <ChevronRight size={10} className="rotate-90 sm:rotate-0 text-gray-200" />
                  <span className="px-2.5 py-1 bg-white border border-gray-100 rounded-lg">Stores, Salesmen & Rent overhead</span>
                  <ChevronRight size={10} className="rotate-90 sm:rotate-0 text-gray-200" />
                  <span className="px-2.5 py-1 bg-white border border-gray-100 rounded-lg">Customer Delivery</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 3: COOKIES & PRIVACY POLICY ==================== */}
      {activeTab === "cookies" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          <div className="bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
            
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <Cookie className="text-[#f27495]" size={26} />
              <div>
                <h2 className="text-base font-black uppercase text-gray-900 tracking-tight">Cookies & Privacy Guidelines</h2>
                <p className="text-[10px] text-gray-400 font-extrabold uppercase mt-0.5">Transparent control over data cache tracking</p>
              </div>
            </div>

            <div className="text-xs font-semibold text-gray-600 leading-relaxed font-sans space-y-4">
              <p>
                At AlphaDrop dropshipping networks, we take digital data protection seriously. Under global GDPR directives and digital consumer laws, we supply transparent specifications detailing exactly how we store, trace, and utilize data session fragments.
              </p>
              <p>
                We do NOT participate in profile marketing or unsolicited cookie tracking. Our application utilizes secure sandboxed <span className="text-gray-900 font-bold">local state storage (localStorage)</span> exclusively to retain your active workspace sessions, items inside your Cart, and review likes tags.
              </p>
            </div>

            {/* Cookies preference list manager details */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100/80">
              <h3 className="text-[11.5px] font-black text-gray-800 uppercase tracking-wide">
                Configured Store Cookie Categories
              </h3>

              <div className="space-y-3 font-sans text-xs text-gray-600 font-semibold">
                
                {/* Categoriy 1: Necessary cookies */}
                <div className="bg-white p-3.5 rounded-xl border border-gray-150 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 tracking-tight">Strictly Necessary Cookies</span>
                      <span className="bg-emerald-50 text-emerald-800 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-100/50 scale-90">
                        Always Active
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400">Maintains items in your Cart, tracking IDs, and account session tokens in localStorage.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookieConsent.necessary}
                    disabled
                    className="w-4 h-4 cursor-not-allowed accent-teal-600"
                  />
                </div>

                {/* Categoriy 2: Preference cookies */}
                <div className="bg-white p-3.5 rounded-xl border border-gray-150 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 tracking-tight">Preference & Search Cookies</span>
                      <span className="bg-indigo-50 text-indigo-800 text-[8px] font-black uppercase px-2 py-0.5 rounded-full scale-90">
                        Optional
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400">Stores category selectors, search query entries, and custom navigation history for faster loadtimes.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookieConsent.preferences}
                    onChange={(e) => saveCookieConsent({ ...cookieConsent, preferences: e.target.checked })}
                    className="w-4 h-4 cursor-pointer accent-[#f27495]"
                  />
                </div>

                {/* Categoriy 3: Analytical cookies */}
                <div className="bg-white p-3.5 rounded-xl border border-gray-150 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 tracking-tight">Analytical & Upvote Cookies</span>
                      <span className="bg-indigo-50 text-indigo-800 text-[8px] font-black uppercase px-2 py-0.5 rounded-full scale-90">
                        Optional
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400">Retains liked product reviews, feedback star inputs, and general session lengths.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookieConsent.analytical}
                    onChange={(e) => saveCookieConsent({ ...cookieConsent, analytical: e.target.checked })}
                    className="w-4 h-4 cursor-pointer accent-[#f27495]"
                  />
                </div>

              </div>

              {/* Status Report Badge */}
              {cookieStatusMsg && (
                <div className="bg-emerald-50 border border-emerald-150 p-3 rounded-xl flex items-center gap-2 text-emerald-800 text-[10.5px] font-black uppercase animate-bounce mt-2 tracking-wider">
                  <Check size={14} />
                  <span>{cookieStatusMsg}</span>
                </div>
              )}
            </div>

            {/* Clear Cookie Caches action block */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 p-5 rounded-2xl">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <AlertCircle size={13} className="text-amber-500 shrink-0" />
                  <span className="text-xs font-black text-gray-800 uppercase tracking-tight">Technical Data Report</span>
                </div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">
                  Estimated Sandbox size: <span className="text-[#f27495] font-mono">{cacheSizeReport}</span>
                </p>
              </div>

              <button
                onClick={handleClearCache}
                className="flex items-center gap-2 bg-[#fff0f4] hover:bg-[#ffe3ea] text-[#f27495] hover:text-rose-700 px-5 py-3 rounded-xl transition duration-150 font-sans text-[11px] font-black uppercase tracking-wider border border-pink-100/50 cursor-pointer active:scale-95"
              >
                <Trash2 size={13} />
                <span>Delete all Saved Store Cookies</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ==================== TAB 4: TERMS & CONDITIONS ==================== */}
      {activeTab === "terms" && (
        <div className="bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6 animate-in fade-in duration-300">
          
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <FileText className="text-[#f27495]" size={26} />
            <div>
              <h2 className="text-base font-black uppercase text-gray-900 tracking-tight">Terms & Conditions of Service</h2>
              <p className="text-[10px] text-gray-400 font-extrabold uppercase mt-0.5">The legal framework of the dropshipping agreement</p>
            </div>
          </div>

          <div className="text-xs font-semibold text-gray-650 leading-relaxed font-sans space-y-5">
            <div className="space-y-1">
              <h3 className="font-black text-gray-950 uppercase tracking-tight text-[11px]">1. Scope of Service Agreement</h3>
              <p>
                By interacting with AlphaDrop platforms, utilizing checkout facilities, and registering an active profile account, you signify your unreserved commitment to these Terms. We operate strictly as an automated direct-to-factory router (dropship network) based out of Gulshan 2, Dhaka, Bangladesh.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-gray-950 uppercase tracking-tight text-[11px]">2. Payment Processing & Currencies</h3>
              <p>
                All prices listed across our categories are processed in Bangladeshi Taka (৳/BDT). We support Cash on Delivery inside Dhaka Metropolitan bounds only, alongside prompt verified bKash/Nagad transactions.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-gray-950 uppercase tracking-tight text-[11px]">3. Import Curation Security</h3>
              <p>
                Our logistics experts manage all standard processing, customs, and import duties directly. The final cost quoted upon checkout includes all custom packing clearances. You will never face extra customs collection claims during physical delivery.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-gray-950 uppercase tracking-tight text-[11px]">4. Dispute Clarifications</h3>
              <p>
                Any transaction claim or shipment discrepancy will be settled directly and amicably under Bangladesh Consumer Right Directives, facilitated by our express corporate help hotlines.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* 4. Didn't discover content, Pink Phone Contact Box */}
      <div className="bg-[#fcfcfc] border border-gray-150 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 shadow-3xs max-w-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-tight">Still seeking special assistance?</h4>
          <p className="text-[10.5px] text-gray-400 font-black uppercase mt-1 tracking-wider leading-relaxed">Our dispatch agents and corporate desk are active 9 am - 9 pm everyday.</p>
        </div>

        <a 
          href="tel:+8801757178991"
          className="flex items-center gap-3 bg-[#f27495] hover:bg-[#d45677] text-white px-5 py-3 rounded-xl transition duration-150 shadow-sm active:scale-95 group font-bold shrink-0 self-center"
        >
          <PhoneCall size={16} className="animate-bounce" />
          <div className="text-left font-sans leading-none">
            <span className="text-[9px] font-black uppercase tracking-wider block opacity-85">Call Corporate Care</span>
            <span className="text-xs font-black block mt-0.5">01757178991</span>
          </div>
        </a>
      </div>

    </div>
  );
}
