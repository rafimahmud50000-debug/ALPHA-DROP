import React, { useState } from "react";
import { 
  User, 
  MapPin, 
  Ticket, 
  ShoppingBag, 
  RotateCcw, 
  XSquare, 
  Star, 
  Heart, 
  MessageSquare, 
  LogOut, 
  Bell, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  ChevronDown, 
  ShieldAlert, 
  Send 
} from "lucide-react";
import { useCartStore } from "../store/useCartStore";

interface DashboardViewProps {
  onNavigate: (path: string) => void;
  userEmail: string;
  currentUser?: { name: string; email: string; phone: string } | null;
  onLogout?: () => void;
}

type TabType = 
  | "notifications" 
  | "profile" 
  | "address" 
  | "voucher" 
  | "returns" 
  | "cancellation" 
  | "reviews" 
  | "wishlist" 
  | "chat";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: "order" | "promo" | "security";
}

export default function DashboardView({ onNavigate, userEmail, currentUser, onLogout }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("notifications");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const { cartItems } = useCartStore();

  // Simulated notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "N-1",
      title: "Order Delivered Successfully ✓",
      description: "Your Arctic Hunter Smart Backpack has been successfully delivered to your shipping address in Dhaka.",
      date: "2026-06-07 11:24 AM",
      read: false,
      type: "order",
    },
    {
      id: "N-2",
      title: "Account Loyalty Verified",
      description: "Thanks for being a verified user! Express shipping priority benefits and live tracking alerts are now forever unlocked.",
      date: "2026-06-06 09:12 AM",
      read: false,
      type: "security",
    },
    {
      id: "N-3",
      title: "Mop Up Discount ৳250 Active",
      description: "Scan code or use WELCOME250 on checkout to get flat ৳250 off your very first order.",
      date: "2026-06-05 04:30 PM",
      read: true,
      type: "promo",
    },
    {
      id: "N-4",
      title: "Order Dispatch Safety Upgraded",
      description: "Our logistics warehouse reported complete security and standard safety scans on all appliance and tech items in dispatch.",
      date: "2026-06-04 02:15 PM",
      read: true,
      type: "order",
    }
  ]);

  // Profile Form States
  const [profileName, setProfileName] = useState(currentUser?.name || "Guest User");
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || "+880 1712-345678");
  const [profileGender, setProfileGender] = useState("Male");
  const [profileDob, setProfileDob] = useState("1996-06-07");
  const [profileSaved, setProfileSaved] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name);
      setProfilePhone(currentUser.phone);
    }
  }, [currentUser]);

  // Vouchers state
  const [vouchers] = useState([
    { code: "WELCOME250", amount: "৳250 OFF", desc: "First order welcome discount", minSpend: "৳1,000", validTill: "2026-12-31" },
    { code: "DOMINATOR50", amount: "50% OFF", desc: "Flash Sale tech bonus", minSpend: "৳5,000", validTill: "2026-08-30" },
    { code: "FREESHIP", amount: "Free Shipping", desc: "Express checkout delivery coupon", minSpend: "None", validTill: "2026-10-15" }
  ]);

  // Addresses state
  const [addresses, setAddresses] = useState([
    { id: "A-1", label: "Home Address (Default)", name: "Guest User", phone: "+880 1712-345678", region: "Dhaka - South", addressDetail: "House 45, Road 11, Dhanmondi, Dhaka" },
    { id: "A-2", label: "Office Address", name: "Guest User", phone: "+880 1911-876543", region: "Dhaka - North", addressDetail: "Level 14, Tower B, Gulshan Circle 2, Dhaka" }
  ]);

  // Support Chat Message States
  const [chatMessages, setChatMessages] = useState([
    { sender: "agent", text: "Hello! I am AlphaDrop Support Assist, your virtual shopping helper. How can I assist you with your express order tracking, returns, or vouchers today?", time: "1:25 PM" }
  ]);
  const [newChatText, setNewChatText] = useState("");

  const handleSendChatMessage = (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const textToSend = directText || newChatText;
    if (!textToSend.trim()) return;
    const userMsg = { sender: "user", text: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    const currentInput = textToSend.toLowerCase();
    if (!directText) {
      setNewChatText("");
    }

    // Simulate automated agent reply
    setTimeout(() => {
      let response = "Thanks for the message. Our support staff is online and actively reviewing your details.";
      if (currentInput.includes("order") || currentInput.includes("delivery") || currentInput.includes("track")) {
        response = "Your orders are dispatching via our fast courier system. Your active parcel has left our main warehouse and will arrive shortly.";
      } else if (currentInput.includes("voucher") || currentInput.includes("coupon") || currentInput.includes("250") || currentInput.includes("code")) {
        response = "Your ৳250 app launch discount welcomes you! Apply the code 'WELCOME250' on checkout for instant reduction.";
      } else if (currentInput.includes("refund") || currentInput.includes("return")) {
        response = "Returns are easy! Click on 'My Returns' in the sidebar options to generate return labels.";
      }

      setChatMessages(prev => [...prev, { sender: "agent", text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="w-full pb-20 animate-in fade-in duration-200 font-sans">
      
      {/* 1. Header Navigation Route Status Indicator */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight font-sans">
          My Account Dashboard
        </h1>
        <p className="text-xs text-gray-400 font-medium">
          Manage secure profile nodes, discount vouchers, and live delivery settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Sidebar exactly replicating the user's uploaded screenshot */}
        <div className="md:col-span-4 lg:col-span-3 space-y-2 shrink-0">
          
          {/* Sidebar container (White Card with neat divider elements) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
            
            {/* Header: User Greetings block */}
            <div className="pb-4 border-b border-gray-100">
              <span className="text-[11px] text-gray-400 font-semibold block">Hello,</span>
              <h2 className="text-base font-black text-gray-900 tracking-tight leading-tight mb-1.5">{profileName}</h2>
              <span className="inline-flex items-center gap-1 bg-[#dcfce7] text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Verified Account
              </span>
            </div>

            {/* Sidebar Categories Options List exactly matching screenshot links */}
            <div className="space-y-4 text-xs">
              
              {/* Highlighted Notification Option at the very top */}
              <div className="space-y-1">
                <button 
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl font-black transition border ${
                    activeTab === "notifications" 
                      ? "bg-[#fff0f4] text-[#e60067] border-pink-100 shadow-sm" 
                      : "text-gray-700 hover:text-[#e60067] hover:bg-gray-50 border-gray-150"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Bell size={14} className="text-[#e60067]" />
                    <span className="uppercase tracking-wider text-[11px]">Notification Alerts</span>
                  </div>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="bg-[#e60067] text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </div>

              {/* Group 1: Manage My Account */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-gray-800 text-[11px] uppercase tracking-wider pb-1">
                  <User size={13} className="text-[#e60067]" />
                  <span>Manage My Account</span>
                </div>
                <div className="pl-5 space-y-1">
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left py-1 px-2 rounded-lg font-semibold transition ${
                      activeTab === "profile" 
                        ? "bg-[#fff0f4] text-[#e60067]" 
                        : "text-gray-500 hover:text-[#e60067] hover:bg-gray-50"
                    }`}
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => setActiveTab("address")}
                    className={`w-full text-left py-1 px-2 rounded-lg font-semibold transition ${
                      activeTab === "address" 
                        ? "bg-[#fff0f4] text-[#e60067]" 
                        : "text-gray-500 hover:text-[#e60067] hover:bg-gray-50"
                    }`}
                  >
                    Address Book
                  </button>
                </div>
              </div>

              {/* Group 2: Voucher Center */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-gray-800 text-[11px] uppercase tracking-wider pb-1">
                  <Ticket size={13} className="text-[#e60067]" />
                  <span>Voucher Center</span>
                </div>
                <div className="pl-5 space-y-1">
                  <button 
                    onClick={() => setActiveTab("voucher")}
                    className={`w-full text-left py-1 px-2 rounded-lg font-semibold transition ${
                      activeTab === "voucher" 
                        ? "bg-[#fff0f4] text-[#e60067]" 
                        : "text-gray-500 hover:text-[#e60067] hover:bg-gray-50"
                    }`}
                  >
                    My Voucher
                  </button>
                </div>
              </div>

              {/* Group 3: My Orders */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-gray-800 text-[11px] uppercase tracking-wider pb-1">
                  <ShoppingBag size={13} className="text-[#e60067]" />
                  <span>My Orders</span>
                </div>
                <div className="pl-5 space-y-1">
                  <button 
                    onClick={() => setActiveTab("returns")}
                    className={`w-full text-left py-1 px-2 rounded-lg font-semibold transition ${
                      activeTab === "returns" 
                        ? "bg-[#fff0f4] text-[#e60067]" 
                        : "text-gray-500 hover:text-[#e60067] hover:bg-gray-50"
                    }`}
                  >
                    My Returns
                  </button>
                  <button 
                    onClick={() => setActiveTab("cancellation")}
                    className={`w-full text-left py-1 px-2 rounded-lg font-semibold transition ${
                      activeTab === "cancellation" 
                        ? "bg-[#fff0f4] text-[#e60067]" 
                        : "text-gray-500 hover:text-[#e60067] hover:bg-gray-50"
                    }`}
                  >
                    My Cancellation
                  </button>
                </div>
              </div>

              {/* Individual options */}
              <div className="space-y-1 pt-2 border-t border-gray-100">
                
                {/* My Reviews */}
                <button 
                  onClick={() => setActiveTab("reviews")}
                  className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl font-semibold transition ${
                    activeTab === "reviews" 
                      ? "bg-[#fff0f4] text-[#e60067]" 
                      : "text-gray-600 hover:text-[#e60067] hover:bg-gray-50"
                  }`}
                >
                  <Star size={13.5} />
                  <span>My Reviews</span>
                </button>

                {/* My Wishlist */}
                <button 
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl font-semibold transition ${
                    activeTab === "wishlist" 
                      ? "bg-[#fff0f4] text-[#e60067]" 
                      : "text-gray-600 hover:text-[#e60067] hover:bg-gray-50"
                  }`}
                >
                  <Heart size={13.5} />
                  <span>My Wishlist</span>
                </button>

                {/* Live Support Agent Chat */}
                <button 
                  onClick={() => setActiveTab("chat")}
                  className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl font-semibold transition ${
                    activeTab === "chat" 
                      ? "bg-[#fff0f4] text-[#e60067]" 
                      : "text-gray-600 hover:text-[#e60067] hover:bg-gray-50"
                  }`}
                >
                  <MessageSquare size={13.5} />
                  <span>Live Chat</span>
                </button>

                {/* Logout out link */}
                <button 
                  onClick={() => {
                    if (onLogout) {
                      onLogout();
                    } else {
                      onNavigate("/");
                    }
                  }}
                  className="w-full flex items-center gap-2 py-2 px-3 rounded-xl font-semibold text-rose-600 hover:bg-rose-50 transition text-left cursor-pointer"
                >
                  <LogOut size={13.5} />
                  <span>Logout</span>
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Active Panel content area */}
        <div className="md:col-span-8 lg:col-span-9">
          
          {/* Main Card component containing the switching states */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[460px] flex flex-col justify-between">
            
            {/* -------------------- 1. TAB: NOTIFICATIONS (Exact replication of screenshot heading) -------------------- */}
            {activeTab === "notifications" && (
              <div className="flex-1 flex flex-col justify-between">
                
                {/* Header of Content */}
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Notification</h3>
                    <button 
                      onClick={markAllAsRead}
                      className="text-[10px] text-gray-400 hover:text-[#e60067] font-bold uppercase tracking-wider"
                    >
                      Mark all as read
                    </button>
                  </div>

                  {/* List of active notifications */}
                  <div className="space-y-4.5">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-4 rounded-xl border transition duration-150 flex gap-3 ${
                          notif.read 
                            ? "bg-stone-50/50 border-gray-100 opacity-75" 
                            : "bg-[#fff0f4]/15 border-[#ffe3e9] shadow-xs"
                        }`}
                      >
                        <div className="mt-0.5">
                          {notif.type === "order" && <CheckCircle size={15} className="text-emerald-500 shrink-0" />}
                          {notif.type === "security" && <User size={15} className="text-[#00b5cc] shrink-0" />}
                          {notif.type === "promo" && <Ticket size={15} className="text-[#e60067] shrink-0" />}
                        </div>
                        
                        <div className="flex-grow space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-xs ${notif.read ? "font-semibold text-gray-700" : "font-extrabold text-gray-900"}`}>
                              {notif.title}
                            </h4>
                            <span className="text-[9px] text-gray-430 font-mono">{notif.date}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 leading-relaxed">{notif.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTTOM PAGINATION: Replicating "<<  <  >  >>  10 v" precisely from screenshot */}
                <div className="mt-8 border-t border-gray-100 pt-5 flex items-center justify-center gap-4.5">
                  <div className="flex items-center gap-1">
                    {/* Double left */}
                    <button 
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="p-1 px-1.5 bg-gray-50 border border-gray-100 rounded text-gray-400 hover:text-[#e60067] hover:bg-[#fff0f4] disabled:opacity-40 select-none transition cursor-pointer"
                    >
                      <ChevronsLeft size={11.5} className="inline stroke-[2.5]" />
                    </button>
                    
                    {/* Single left */}
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1 px-1.5 bg-gray-50 border border-gray-100 rounded text-gray-400 hover:text-[#e60067] hover:bg-[#fff0f4] disabled:opacity-40 select-none transition cursor-pointer"
                    >
                      <ChevronLeft size={11.5} className="inline stroke-[2.5]" />
                    </button>

                    <span className="text-[11px] font-bold text-gray-500 px-3 select-none">
                      Page 1 of 1
                    </span>

                    {/* Single right */}
                    <button 
                      disabled={true}
                      className="p-1 px-1.5 bg-gray-50 border border-gray-100 rounded text-gray-400 hover:text-[#f27495] hover:bg-[#fff0f4] disabled:opacity-40 select-none transition cursor-pointer"
                    >
                      <ChevronRight size={11.5} className="inline stroke-[2.5]" />
                    </button>

                    {/* Double right */}
                    <button 
                      disabled={true}
                      className="p-1 px-1.5 bg-gray-50 border border-gray-100 rounded text-gray-400 hover:text-[#f27495] hover:bg-[#fff0f4] disabled:opacity-40 select-none transition cursor-pointer"
                    >
                      <ChevronsRight size={11.5} className="inline stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Dropdown selector for Page Limit (labeled 10) */}
                  <div className="relative">
                    <button
                      onClick={() => setShowPageDropdown(!showPageDropdown)}
                      className="flex items-center gap-1.5 pl-3 pr-2 py-1 bg-gray-50 select-none border border-gray-100 hover:border-gray-300 rounded font-bold font-mono text-[11px] text-gray-600 transition"
                    >
                      <span>{pageSize}</span>
                      <ChevronDown size={11} className="opacity-70" />
                    </button>

                    {showPageDropdown && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setShowPageDropdown(false)}></div>
                        <div className="absolute right-0 bottom-full mb-1 bg-white border border-gray-100 rounded-lg shadow-lg py-1 w-16 z-40 text-center text-xs">
                          {[5, 10, 20].map((size) => (
                            <button
                              key={size}
                              onClick={() => {
                                setPageSize(size);
                                setShowPageDropdown(false);
                              }}
                              className="w-full py-1 hover:bg-[#fff0f4] hover:text-[#f27495] font-semibold transition"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* -------------------- 2. TAB: MY PROFILE -------------------- */}
            {activeTab === "profile" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">Manage My Account / Profile</h3>
                  <p className="text-[11px] text-gray-400">Keep personal ledger coordinates and delivery profiles synchronized.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Full Name</label>
                    <input 
                      type="text" 
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-[#f27495]/40 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Address (Secured)</label>
                    <input 
                      type="email" 
                      value={userEmail} 
                      disabled
                      className="w-full bg-stone-100/80 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-500 cursor-not-allowed outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Phone Mobile</label>
                    <input 
                      type="text" 
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-[#f27495]/40 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Date of Birth</label>
                    <input 
                      type="date" 
                      value={profileDob}
                      onChange={(e) => setProfileDob(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-[#f27495]/40 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Gender</label>
                    <div className="flex gap-4">
                      {["Male", "Female", "Prefer non-binary"].map((g) => (
                        <label key={g} className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 cursor-pointer">
                          <input 
                            type="radio" 
                            name="gender" 
                            checked={profileGender === g}
                            onChange={() => setProfileGender(g)}
                            className="accent-[#f27495]"
                          />
                          <span>{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => {
                      setProfileSaved(true);
                      setTimeout(() => setProfileSaved(false), 2500);
                    }}
                    className="bg-[#f27495] hover:bg-[#d45677] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition duration-150 active:scale-95 cursor-pointer min-w-[120px] text-center"
                  >
                    {profileSaved ? "✓ Saved!" : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* -------------------- 3. TAB: ADDRESS BOOK -------------------- */}
            {activeTab === "address" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Address Book</h3>
                    <p className="text-[11px] text-gray-400">Current geo-coordinates for drone flight navigation deliveries.</p>
                  </div>
                  <button 
                    onClick={() => {
                      const mockLabels = ["Secondary Office", "Warehouse Node", "Alternate Hub", "Summer Cottage"];
                      const mockAddressesList = [
                        "Flat B4, House 102/A, Mirpur 12, Dhaka",
                        "Plot 18, Block H, Sector 1, Uttara, Dhaka",
                        "Flat 3A, Imperial Tower, Banani Road 11, Dhaka",
                        "Wrf House, Lalbagh Fort Road, Old Dhaka"
                      ];
                      const randIdx = Math.floor(Math.random() * mockLabels.length);
                      setAddresses(prev => [...prev, {
                        id: `A-${Date.now()}`,
                        label: mockLabels[randIdx],
                        name: profileName,
                        phone: profilePhone,
                        region: "Dhaka North",
                        addressDetail: mockAddressesList[randIdx]
                      }]);
                    }}
                    className="border border-[#f27495] text-[#f27495] hover:bg-[#fff0f4] font-bold text-[10px] uppercase tracking-wider px-3.5 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    + Add New Route
                  </button>
                </div>

                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-[#f27495]" />
                          <span className="font-extrabold text-gray-900 text-xs">{addr.label}</span>
                        </div>
                        <div className="text-[11px] text-gray-500 space-y-0.5 ml-5">
                          <p className="font-semibold text-gray-700">{addr.name} // {addr.phone}</p>
                          <p className="italic text-gray-400">{addr.region}</p>
                          <p className="font-medium text-gray-600">{addr.addressDetail}</p>
                        </div>
                      </div>
                      
                      {addresses.length > 1 ? (
                        <button 
                          onClick={() => {
                            setAddresses(prev => prev.filter(a => a.id !== addr.id));
                          }}
                          className="text-[10px] text-rose-500 hover:underline font-bold cursor-pointer"
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="text-[9px] text-gray-400 font-extrabold uppercase">
                          SECURED PRIMARY ROUTE
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------- 4. TAB: MY VOUCHER -------------------- */}
            {activeTab === "voucher" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">Voucher Center</h3>
                  <p className="text-[11px] text-gray-400">Apply your high-fidelity coupons on the order summary page for direct discounts.</p>
                </div>

                {/* Voucher grid layout with pink coupon vibe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vouchers.map((v) => (
                    <div key={v.code} className="border-2 border-dashed border-[#f27495]/30 bg-gradient-to-br from-white to-[#fff0f4]/20 rounded-2xl overflow-hidden shadow-xs flex">
                      {/* Left Block Badge */}
                      <div className="bg-[#f27495] text-white p-4.5 flex flex-col justify-center items-center text-center shrink-0 w-24">
                        <Ticket size={22} className="opacity-90 mb-1" />
                        <span className="text-[11px] font-black uppercase tracking-wider">{v.amount}</span>
                      </div>
                      
                      {/* Right Details */}
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <span className="bg-pink-100 text-[#f27495] font-mono font-bold text-[9px] px-1.5 py-0.5 rounded leading-none">
                            {v.code}
                          </span>
                          <h4 className="text-xs font-bold text-gray-900 mt-1.5">{v.desc}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">Min. Spend: {v.minSpend}</p>
                        </div>
                        <p className="text-[9px] text-gray-400 border-t border-gray-50 pt-1.5 mt-2 font-mono">
                          Expires: {v.validTill}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------- 5. TAB: RETURNS -------------------- */}
            {activeTab === "returns" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">Returns Management</h3>
                  <p className="text-[11px] text-gray-400">View or file secure product return clearances.</p>
                </div>

                <div className="py-12 text-center rounded-2xl border border-gray-50 bg-gray-50/20 max-w-lg mx-auto space-y-3">
                  <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                    <RotateCcw size={20} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-800">No active return authorizations filed</h4>
                  <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed">
                    If any item arrives damage-bound, you can coordinate a secure reverse-drone pickup path within 7 days of package delivery.
                  </p>
                </div>
              </div>
            )}

            {/* -------------------- 6. TAB: CANCELLATIONS -------------------- */}
            {activeTab === "cancellation" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">My Cancellations</h3>
                  <p className="text-[11px] text-gray-400">Revoked orders before dispatch clearances.</p>
                </div>

                <div className="py-12 text-center rounded-2xl border border-gray-50 bg-gray-50/20 max-w-lg mx-auto space-y-3">
                  <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                    <XSquare size={20} />
                  </div>
                  <h4 className="text-xs font-bold text-gray-800">No cancelled transactions</h4>
                  <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Your flight routes compile optimally. No order cancellations are currently logged.
                  </p>
                </div>
              </div>
            )}

            {/* -------------------- 7. TAB: REVIEWS -------------------- */}
            {activeTab === "reviews" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">Product Ratings & Reviews</h3>
                  <p className="text-[11px] text-gray-400">Share your hardware satisfaction index with other product community modules.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-rose-50 rounded-xl bg-[#fff0f4]/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">Arctic Hunter Smart Backpack</span>
                      <div className="flex gap-0.5 text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={11} className="fill-current" />)}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed italic">
                      "Incredible drone drop timing. The ballistic polyester is absolutely water-shielded. Highly recommended for heavy travel routines!"
                    </p>
                    <span className="text-[9px] text-[#f27495] font-mono block">Published: 2026-06-03</span>
                  </div>

                  <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/30 space-y-1 text-center py-6">
                    <p className="text-[10px] text-gray-400">You have 2 pending items awaiting review. Keep sharing tech indices!</p>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 8. TAB: WISHLIST -------------------- */}
            {activeTab === "wishlist" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-bold text-gray-900">My Wishlist</h3>
                  <p className="text-[11px] text-gray-400">Saved items to trace for next discount drops.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-gray-150 rounded-xl flex items-center gap-3 bg-white hover:border-[#f27495]/30 transition group">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#f27495]">Arctic Hunter Backpack</h4>
                      <p className="text-[10px] text-[#f27495] font-bold mt-0.5">৳3,450</p>
                    </div>
                  </div>

                  <div className="p-3 border border-gray-150 rounded-xl flex items-center gap-3 bg-white hover:border-[#f27495]/30 transition group">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#f27495]">Awei 22.5W Powerbank</h4>
                      <p className="text-[10px] text-[#f27495] font-bold mt-0.5">৳1,890</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 9. TAB: LIVE SUPPORT CHET -------------------- */}
            {activeTab === "chat" && (
              <div className="flex flex-col justify-between h-[450px]">
                
                {/* Chat Head */}
                <div className="border-b border-gray-150 pb-3 mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      ALPHADROP SUPPORT ASSIST
                    </h3>
                    <p className="text-[10px] text-gray-400 font-medium">Equipped with automatic AI intelligence for rapid resolution.</p>
                  </div>
                  <span className="text-[9px] bg-pink-100 text-[#f27495] font-black px-2.5 py-1 rounded-full font-sans uppercase tracking-wider">Active</span>
                </div>

                {/* Chat Body panel */}
                <div className="flex-grow overflow-y-auto space-y-4 pr-1 no-scrollbar border border-gray-100 p-3 bg-neutral-50/50 rounded-xl max-h-[260px]">
                  {chatMessages.map((msg, i) => {
                    const isUser = msg.sender === "user";
                    return (
                      <div 
                        key={i} 
                        className={`flex gap-2.5 max-w-[85%] ${
                          isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                        }`}
                      >
                        {/* Avatar */}
                        <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border text-[10px] font-black ${
                          isUser 
                            ? "bg-stone-100 border-stone-200 text-stone-700" 
                            : "bg-pink-100 border-pink-200 text-pink-600"
                        }`}>
                          {isUser ? <User size={12} className="stroke-[2.2]" /> : <MessageSquare size={12} className="stroke-[2.2]" />}
                        </div>

                        {/* Content text */}
                        <div className="flex flex-col">
                          <div className={`px-3.5 py-2.5 rounded-xl text-[11px] font-sans font-medium leading-relaxed shadow-xs ${
                            isUser 
                              ? "bg-slate-900 text-white rounded-tr-none" 
                              : "bg-white border border-gray-150/75 text-neutral-800 rounded-tl-none"
                          }`}>
                            {msg.text}
                          </div>
                          <span className={`text-[8px] text-gray-400 mt-1 font-mono ${isUser ? "text-right" : "text-left"}`}>
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Suggestions Actions */}
                <div className="pt-2">
                  <span className="text-[8px] tracking-[0.1em] font-black text-neutral-400 uppercase block mb-1.5">Quick Solutions</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "🎟️ Welcome Coupon", query: "Can you tell me about the WELCOME250 coupon?" },
                      { label: "📦 Track Order", query: "How do I track my active express deliveries?" },
                      { label: "🔄 Return Policy", query: "What is your product return policy?" },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendChatMessage(undefined, item.query)}
                        className="text-[9px] font-sans font-extrabold uppercase tracking-wider bg-white hover:bg-[#fff0f4] border border-gray-200 hover:border-[#f27495]/40 text-neutral-600 hover:text-[#f27495] px-2.5 py-1.5 rounded-full transition cursor-pointer shadow-2xs"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat form box input */}
                <form onSubmit={(e) => handleSendChatMessage(e)} className="mt-3 flex gap-2">
                  <input 
                    type="text" 
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                    placeholder="Ask about WELCOME250, deliveries, or returns..."
                    className="flex-grow bg-white border border-gray-200 rounded-full px-4 py-3 text-[11px] focus:ring-1 focus:ring-[#f27495]/40 outline-none shadow-2xs font-medium"
                  />
                  <button 
                    type="submit"
                    className="w-10 h-10 bg-[#f27495] hover:bg-slate-900 text-white rounded-full transition duration-150 active:scale-95 flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
                  >
                    <Send size={13} className="stroke-[2.2]" />
                  </button>
                </form>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
