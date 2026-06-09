import React, { useState } from "react";
import { 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  Ticket
} from "lucide-react";

interface AuthViewProps {
  onNavigate: (path: string) => void;
  onLoginSuccess: (user: { name: string; email: string; phone: string }) => void;
}

export default function AuthView({ onNavigate, onLoginSuccess }: AuthViewProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Validation feedback
  const [errMessage, setErrMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrMessage("");
    setSuccessMsg("");

    // Simple validation
    if (!isLoginTab && !name.trim()) {
      setErrMessage("Please enter your full name.");
      return;
    }
    
    if (!email.trim() || !email.includes("@")) {
      setErrMessage("Please provide a valid email address.");
      return;
    }

    if (!isLoginTab && !phone.trim()) {
      setErrMessage("Please enter a valid BD phone number.");
      return;
    }

    if (password.length < 6) {
      setErrMessage("Password must be at least 6 characters long.");
      return;
    }

    if (!agreeTerms) {
      setErrMessage("You must agree to the Terms and Conditions.");
      return;
    }

    // Success Simulation
    if (isLoginTab) {
      // Simulate Login
      const mockUser = {
        name: name.trim() || "Guest User",
        email: email.trim().toLowerCase(),
        phone: phone.trim() || "+880 1712-345678",
      };
      setSuccessMsg("Welcome back to AlphaDrop! Signing you in securely...");
      setTimeout(() => {
        onLoginSuccess(mockUser);
        onNavigate("/");
      }, 1200);
    } else {
      // Simulate Registration
      const newUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      };
      setSuccessMsg("Account successfully created! Claiming your ৳250 WELCOME250 coupon...");
      setTimeout(() => {
        onLoginSuccess(newUser);
        onNavigate("/");
      }, 1500);
    }
  };

  const handleGuestLogin = () => {
    const guestUser = {
      name: "Guest User",
      email: "guest@example.com",
      phone: "+880 1712-345678"
    };
    setSuccessMsg("Continuing as verified guest...");
    setTimeout(() => {
      onLoginSuccess(guestUser);
      onNavigate("/");
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 md:min-h-[580px]">
        
        {/* Left Side: Visual Showcase Banner with Local Vibe */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#f27495] to-[#d45677] text-white p-8 flex flex-col justify-between relative overflow-hidden select-none">
          {/* Wave mesh overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 C30,40 70,60 100,50 L100,100 L0,100 Z" fill="white" />
            </svg>
          </div>
          
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={11} className="text-yellow-300 animate-pulse" />
              <span>AlphaDrop Bangladesh</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight leading-none pt-2">
              Drones. Speeds. Authentic Deals.
            </h2>
            <p className="text-xs text-rose-100 font-medium">
              Join thousands of smart shoppers across Dhaka metropolitan areas leveraging instant dispatch couriers.
            </p>
          </div>

          <div className="relative z-10 space-y-4 my-8 md:my-0">
            {/* Feature lists */}
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="text-white font-bold" />
                </div>
                <div className="leading-tight">
                  <h4 className="text-[11.5px] font-bold">100% Verified BD Brands</h4>
                  <p className="text-[10px] text-white/70">Authentic Walton, Sunderbans, Aarong Handlooms.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="text-white font-bold" />
                </div>
                <div className="leading-tight">
                  <h4 className="text-[11.5px] font-bold">৳250 Welcome Voucher</h4>
                  <p className="text-[10px] text-white/70">Promo WELCOME250 claimed automatically on join.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="text-white font-bold" />
                </div>
                <div className="leading-tight">
                  <h4 className="text-[11.5px] font-bold">Biometric Security Scans</h4>
                  <p className="text-[10px] text-white/70">Secure storage keeps your addresses fully guarded.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[10px] text-rose-100 font-bold tracking-wider uppercase">
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} />
              GUARANTEED
            </span>
            <span>Est. 2026</span>
          </div>
        </div>

        {/* Right Side: Interactive Forms */}
        <div className="md:col-span-7 p-8 flex flex-col justify-between bg-[#fafcfb]" id="auth-panel-container">
          
          {/* Header tabs toggle */}
          <div>
            <div className="flex border-b border-gray-100 mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsLoginTab(true);
                  setErrMessage("");
                  setSuccessMsg("");
                }}
                className={`flex-1 pb-3 text-center text-xs font-black uppercase tracking-wider transition ${
                  isLoginTab 
                    ? "text-[#f27495] border-b-2 border-[#f27495]" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
                id="btn-tab-login"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginTab(false);
                  setErrMessage("");
                  setSuccessMsg("");
                }}
                className={`flex-1 pb-3 text-center text-xs font-black uppercase tracking-wider transition ${
                  !isLoginTab 
                    ? "text-[#f27495] border-b-2 border-[#f27495]" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
                id="btn-tab-signup"
              >
                Create Account
              </button>
            </div>

            {/* Error & Success indicators */}
            {errMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                <span>{errMessage}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs rounded-xl font-bold flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {/* Name box (only on sign up panel) */}
              {!isLoginTab && (
                <div className="space-y-1.5 focus-within:text-[#f27495] transition">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white border border-gray-250 focus:border-[#f27495]/60 pr-4 pl-10 py-2.5 rounded-xl text-xs font-sans tracking-tight focus:outline-none focus:ring-1 focus:ring-[#f27495]/20 shadow-xs"
                    />
                    <User size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Email box */}
              <div className="space-y-1.5 focus-within:text-[#f27495] transition">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-gray-250 focus:border-[#f27495]/60 pr-4 pl-10 py-2.5 rounded-xl text-xs font-sans tracking-tight focus:outline-none focus:ring-1 focus:ring-[#f27495]/20 shadow-xs"
                  />
                  <Mail size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Phone number box (only on sign up panel) */}
              {!isLoginTab && (
                <div className="space-y-1.5 focus-within:text-[#f27495] transition">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">BD Mobile Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +880 1712-345678"
                      className="w-full bg-white border border-gray-250 focus:border-[#f27495]/60 pr-4 pl-10 py-2.5 rounded-xl text-xs font-sans tracking-tight focus:outline-none focus:ring-1 focus:ring-[#f27495]/20 shadow-xs"
                    />
                    <Phone size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Password box */}
              <div className="space-y-1.5 focus-within:text-[#f27495] transition">
                <div className="flex items-center justify-between pl-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
                  {isLoginTab && (
                    <span 
                      type="button" 
                      onClick={() => setErrMessage("Please proceed via guest login or test another email configuration.")} 
                      className="text-[10px] font-bold text-[#f27495] hover:underline cursor-pointer select-none"
                    >
                      Forgot?
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-gray-250 focus:border-[#f27495]/60 pr-10 pl-10 py-2.5 rounded-xl text-xs font-sans tracking-tight focus:outline-none focus:ring-1 focus:ring-[#f27495]/20 shadow-xs"
                  />
                  <Lock size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Agree terms */}
              <div className="flex items-center gap-2 pt-1">
                <label className="inline-flex items-center gap-2 text-[11px] font-semibold text-gray-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="rounded text-[#f27495] accent-[#f27495] w-3.5 h-3.5 focus:ring-opacity-20 focus:ring-[#f27495]"
                  />
                  <span>I agree to the secure shopping policies and delivery terms.</span>
                </label>
              </div>

              {/* Actions submit buttons */}
              <button
                type="submit"
                className="w-full bg-[#f27495] hover:bg-[#d45677] text-white font-bold text-xs py-3 rounded-xl transition duration-150 shadow-md shadow-pink-100 flex items-center justify-center gap-2 active:scale-98 cursor-pointer mt-5"
                id="btn-auth-submit"
              >
                <span>{isLoginTab ? "Sign In Securely" : "Create My Account"}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

          {/* Quick guest bypass with Bangladesh details */}
          <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest pl-1">Or Quick Bypass</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full bg-white hover:bg-[#fff0f4]/40 text-gray-800 border border-gray-200 hover:border-[#f27495]/30 font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              id="btn-guest-bypass"
            >
              <Ticket size={13} className="text-[#f27495]" />
              <span>Login as Guest Tester (Default)</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
