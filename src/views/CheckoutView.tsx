import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { OrderConfirmation } from "../types";
import CyberIcon from "../components/CyberIcon";
import { ShieldCheck, Truck, CreditCard, Sparkles, AlertCircle, ArrowLeft, CheckCircle2, RefreshCw, Cpu, Activity } from "lucide-react";

// Beautiful custom bKash geometric origami bird logo
export function BkashIcon({ className = "w-4 h-4 text-white" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head/Beak area */}
      <polygon points="76,46 88,42 76,54" />
      {/* Front main wing/body */}
      <polygon points="46,18 76,46 44,68" />
      {/* Back tail/left wing */}
      <polygon points="46,18 18,48 44,68" />
      {/* Lower wing flap */}
      <polygon points="44,68 18,48 38,82" />
    </svg>
  );
}

interface CheckoutViewProps {
  onNavigate: (path: string) => void;
  userEmail?: string;
}

export default function CheckoutView({ onNavigate, userEmail = "customer@alphadrop.net" }: CheckoutViewProps) {
  const { cartItems, clearCart } = useCartStore();

  // Form states
  const [email, setEmail] = useState(userEmail);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [paymentMethod] = useState("bkash");
  
  // Custom mock inputs for payment
  const [bkashNumber, setBkashNumber] = useState("");
  const [trxId, setTrxId] = useState("");

  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  // Math totals identical to cart view
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 2000 ? 0 : cartItems.length > 0 ? 120 : 0;
  const salesTax = subtotal * 0.08;
  const total = subtotal + shippingFee + salesTax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(null);

    // Validate inputs
    if (!email || !firstName || !lastName || !address || !city || !postalCode) {
      setFormErrors("ALL STRUCTURAL METRIC FIELDS (EMAIL, NAMES, ADDRESSES) ARE STRICTLY MANDATORY TO COMPASS DRONE COORDINATES.");
      return;
    }

    if (!bkashNumber || !trxId) {
      setFormErrors("BKASH PROTOCOL REQUIRES SENDER NUMBER AND TRANSACTION ID.");
      return;
    }

    // Process order simulation
    setIsSubmitting(true);
    
    // Simulate network delays
    setTimeout(() => {
      const generatedId = `ALPHA-${Math.floor(100000 + Math.random() * 900000)}-${country.substring(0, 3).toUpperCase()}`;
      
      const newOrder: OrderConfirmation = {
        orderId: generatedId,
        customerName: `${firstName} ${lastName}`,
        customerEmail: email,
        deliveryAddress: `${address}, ${city}, ${postalCode}, ${country}`,
        items: [...cartItems],
        subtotal,
        tax: salesTax,
        shipping: shippingFee,
        total,
        paymentMethod: paymentMethod.toUpperCase(),
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      clearCart(); // Clear active cart upon final order submission
    }, 1800);
  };

  // If order is successfully confirmed, render gorgeous order confirmation layout
  if (confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-24 font-sans">
        {/* Holographic Confirmation Card */}
        <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl relative overflow-hidden space-y-6 shadow-sm">
          {/* Futuristic neon diagonal accent */}
          <div className="absolute top-0 right-0 bg-[#e2125a] text-white font-black text-[9px] tracking-widest px-4 py-1.5 uppercase rotate-45 translate-x-6 translate-y-2 select-none">
            SECURED_DROP
          </div>

          <div className="text-center space-y-2.5">
            <div className="mx-auto w-16 h-16 rounded-full bg-pink-100 border-2 border-pink-300 flex items-center justify-center text-pink-600 select-none">
              <CheckCircle2 size={32} className="stroke-[2.2]" />
            </div>
            
            <span className="text-[10px] text-pink-600 tracking-[0.2em] font-extrabold uppercase">
              // DROP_TRANSMITTED_STABLE
            </span>
            
            <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-gray-900 tracking-tight">
              TRANSACTION COMPLETED
            </h1>
            
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              Your dropshipping requisition has been validated and injected into the automated logistics ledger.
            </p>
          </div>

          {/* Reference Meta Box */}
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-gray-150 pb-2">
              <span className="text-gray-450 font-bold uppercase tracking-wide text-[10px]">TRACK ORDER ID:</span>
              <span className="text-pink-600 font-extrabold select-all">{confirmedOrder.orderId}</span>
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-455 font-bold uppercase tracking-wide text-[10px]">COURIER ROUTE:</span>
              <span className="text-gray-900 font-bold flex items-center gap-1">
                <Truck size={12} className="text-pink-600" /> AUTOMATED CARGO DRONE
              </span>
            </div>

            <div className="flex justify-between items-start text-[11px] gap-2">
              <span className="text-gray-455 font-bold uppercase tracking-wide text-[10px] shrink-0">DROP COORDINATES:</span>
              <span className="text-gray-900 font-bold text-right break-words">{confirmedOrder.deliveryAddress}</span>
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-455 font-bold uppercase tracking-wide text-[10px]">PAYMENT PROTOCOL:</span>
              <span className="text-gray-900 font-bold uppercase">{confirmedOrder.paymentMethod} REGISTER</span>
            </div>
          </div>

          {/* Core Invoice Summary */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Requisition Manifest list ({confirmedOrder.items.length} items):
            </span>
            
             <div className="max-h-36 overflow-y-auto space-y-1.5 bg-slate-50 border border-slate-100 rounded-xl p-3">
               {confirmedOrder.items.map((item) => (
                 <div key={item.product.id} className="flex justify-between text-xs py-1 border-b border-gray-100 last:border-0 font-medium font-sans">
                   <span className="text-gray-600 truncate max-w-[280px]">
                     {item.product.name} <strong className="text-gray-900 font-black">x{item.quantity}</strong>
                   </span>
                   <span className="text-pink-600 font-bold">৳{(item.product.price * item.quantity).toLocaleString("en-US")}</span>
                 </div>
               ))}
             </div>
           </div>
 
           {/* Total Calculation */}
           <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
             <div>
               <span className="text-[10px] text-gray-450 font-bold block uppercase tracking-wide">TOTAL TRANSACTION VALUE:</span>
               <span className="text-[9px] text-pink-500 font-bold">INCLUSIVE OF 8% VAULT SECURITY EXCISE</span>
             </div>
             <span className="text-2xl font-black text-gray-950 font-sans">
               ৳{confirmedOrder.total.toLocaleString("en-US")}
             </span>
           </div>

          {/* Estimated countdown message */}
          <div className="bg-pink-100/50 border border-pink-300/60 p-3.5 rounded-xl flex items-center gap-3 text-xs text-slate-700">
            <Activity size={18} className="text-pink-500 shrink-0" />
            <p className="leading-relaxed font-sans">
              Estimated cargo delivery is <strong className="text-gray-900">48 hours</strong>. Secure telemetry details are being routed to your communication node <strong className="text-pink-600 font-bold">{confirmedOrder.customerEmail}</strong>.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("/")}
              className="w-full py-4 rounded-full bg-pink-100 hover:bg-pink-200 border border-pink-300 text-pink-800 font-sans text-xs font-black uppercase tracking-wider transition cursor-pointer text-center"
              id="btn-return-base"
            >
              RETURN TO STOREFRONT
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 font-sans text-neutral-900" id="checkout-pipeline-view">
      {/* View Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[2px] bg-neutral-950 text-white flex items-center justify-center border border-neutral-900">
            <CreditCard size={16} />
          </div>
          <div>
            <span className="text-[8px] tracking-[0.25em] font-extrabold text-neutral-400 uppercase block mb-0.5">SECURE TRANSACTION PROTOCOL</span>
            <h1 className="text-sm font-black uppercase text-neutral-950 tracking-[0.1em]">
              CHECKOUT TERMINAL GATES
            </h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate("/cart")}
          className="font-sans text-[10px] text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 cursor-pointer font-black uppercase tracking-wider transition border border-neutral-200 px-4 py-2.5 rounded-[2px] bg-white hover:border-neutral-900"
          id="btn-checkout-back"
        >
          <ArrowLeft size={12} className="stroke-[2.2]" />
          <span>ADJUST INVENTORY BAG</span>
        </button>
      </div>

      {formErrors && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-[2px] text-xs text-red-700 flex items-start gap-3">
          <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-600" />
          <span className="font-mono uppercase tracking-wider text-[10.5px] font-black">[WARNING CRITICAL ERROR]: {formErrors}</span>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-neutral-300 rounded-[2px] bg-[#ffffff] shadow-xs">
          <p className="font-sans text-[10px] tracking-widest uppercase font-black text-neutral-500">
            [ABORTED]: NO CONNOTATIONS ACTIVE IN TRANSIT CHANNELS.
          </p>
          <button
            onClick={() => onNavigate("/")}
            className="mt-4 px-6 py-3 bg-neutral-950 text-white font-black tracking-widest text-[10px] uppercase rounded-[2px] transition cursor-pointer"
          >
            RETURN BASE
          </button>
        </div>
      ) : (
        /* Checkout Splits columns */
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Input Coordinates */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Delivery Data block */}
            <div className="bg-white border border-gray-100 p-5 rounded-2xl space-y-4 shadow-sm">
              <h3 className="font-sans font-extrabold text-xs uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <Truck size={14} className="text-pink-500" />
                <span>1. SECURE DELIVERY COORDINATES</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">COMMUNICATION NODE (EMAIL)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">ROUTING SYSTEM</label>
                  <div className="bg-slate-50 border border-slate-100 text-[10px] p-3 rounded-xl text-gray-400 select-none font-bold">
                    DOD_DRONE_TRANS_LOCK
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">RECIPIENT FORENAME</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter First Name"
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">RECIPIENT SURNAME</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter Last Name"
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">STEEL PHYSICAL ADDRESS</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="E.g. Penthouse 12A, 1482 Cyber Plaza, 10th Hub"
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">CITY SECTOR</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="E.g. Neo Tokyo"
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">ZIP / LOCATOR CODE</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="E.g. 98101"
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">COUNTRY DIVISION STATE</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition w-full font-bold"
                  >
                    <option value="United States">UNITED STATES OF AMERICA [US_ENG]</option>
                    <option value="Canada">CANADA CORE [CA_FRN]</option>
                    <option value="Japan">JAPANESE ARCHIPELAGO [JP_NPT]</option>
                    <option value="United Kingdom">UNITED KINGDOM SECTOR [UK_LON]</option>
                    <option value="Germany">GERMAN ALLIANCE [DE_BER]</option>
                    <option value="Australia">OCEANIA DIVISION [AU_SYD]</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment options selection block */}
            <div className="bg-pink-50/10 border border-pink-200/80 p-5 rounded-2xl space-y-4 shadow-sm">
              <h3 className="font-sans font-extrabold text-xs uppercase tracking-wider text-gray-900 flex items-center gap-2.5 border-b border-pink-50 pb-2">
                <div className="w-6 h-6 rounded-[5px] bg-[#e2125a] text-white flex items-center justify-center select-none shrink-0 shadow-xs">
                  <BkashIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span>2. BKASH PAYMENT PROTOCOL</span>
              </h3>

              {/* Instructions Panel */}
              <div className="bg-pink-100/50 border border-pink-200 p-4 sm:p-5 space-y-3 text-xs">
                <span className="text-[9px] text-pink-600 font-black uppercase tracking-wider block flex items-center gap-1.5">
                  <BkashIcon className="w-3.5 h-3.5 text-[#e2125a]" />
                  // SEND MONEY INSTRUCTIONS
                </span>

                <ol className="space-y-2 text-[11px] text-neutral-600 list-decimal pl-4 leading-normal font-medium">
                  <li>
                    Enter recipient bKash Number: <strong className="font-mono text-neutral-900 select-all font-black bg-pink-200/60 px-2 py-0.5 rounded-sm">01757-178991</strong> (Personal)
                  </li>
                  <li>
                    Amount to Send: <strong className="font-mono text-neutral-900 font-extrabold font-sans">৳{total.toLocaleString("en-US")}</strong>
                  </li>
                  <li>
                    Enter your PIN and complete the transaction
                  </li>
                  <li>
                    Copy the Transaction ID (TrxID) and inputs below to verify payment.
                  </li>
                </ol>
              </div>

              {/* Inputs */}
              <div className="space-y-3 bg-neutral-50 border border-neutral-100 rounded-xl p-4 text-xs">
                <span className="text-[9px] text-pink-500 block font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BkashIcon className="w-3.5 h-3.5 text-pink-500" />
                  // TRANSFER VERIFICATION BLOCK
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">SENDER BKASH NUMBER</label>
                    <input
                      type="text"
                      value={bkashNumber}
                      onChange={(e) => setBkashNumber(e.target.value)}
                      placeholder="e.g. 017XXXXXXXX"
                      className="bg-white border border-neutral-100 p-3 rounded-xl focus:outline-none focus:border-pink-500 text-xs font-sans placeholder-neutral-300"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">TRANSACTION ID (TRXID)</label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="e.g. 8N7X9Q2Y5"
                      className="bg-white border border-neutral-100 p-3 rounded-xl focus:outline-none focus:border-pink-500 text-xs font-sans placeholder-neutral-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Invoice manifest box */}
          <div className="lg:col-span-5 bg-white border border-gray-100 p-5 rounded-2xl space-y-4 shadow-sm">
            <h3 className="font-sans font-extrabold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-50 pb-2">
              REQUISITION MANIFEST
            </h3>

            {/* Micro items list */}
            <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center bg-slate-50 border border-slate-100/60 p-3 rounded-xl font-medium font-sans">
                  <div className="flex items-center gap-2 truncate max-w-[200px] sm:max-w-xs text-gray-700">
                    <CyberIcon name={item.product.imageIcon} className="text-pink-500" size={14} />
                    <span className="truncate">{item.product.name}</span>
                    <span className="text-gray-400 text-[10px] font-bold">x{item.quantity}</span>
                  </div>
                  <span className="text-gray-950 font-extrabold shrink-0">
                    ৳{(item.product.price * item.quantity).toLocaleString("en-US")}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations summaries */}
            <div className="space-y-2 border-t border-gray-50 pt-3 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-gray-450 font-bold uppercase text-[10px] tracking-wide">RAW PORTFOLIO TOTAL:</span>
                <span className="text-gray-900 font-bold">৳{subtotal.toLocaleString("en-US")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-455 font-bold uppercase text-[10px] tracking-wide">DRONE COURIER TARIFF:</span>
                <span className="text-gray-900 font-bold">
                  {shippingFee === 0 ? "FREE" : `৳${shippingFee.toLocaleString("en-US")}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-455 font-bold uppercase text-[10px] tracking-wide">VAULT SECURITY EXCISE [8%]:</span>
                <span className="text-gray-900 font-bold">৳{salesTax.toLocaleString("en-US")}</span>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
                <span className="text-pink-600 text-[10px] font-black uppercase tracking-wider">COMPUTED TOTAL:</span>
                <span className="text-xl font-black text-gray-950">
                  ৳{total.toLocaleString("en-US")}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 border border-pink-300 font-sans text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2.5 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                id="btn-submit-order"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>SYNCHRONIZING LOGISTICS...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} className="stroke-[2.5]" />
                    <span>AUTHORIZE TRANSACTION</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[9px] font-sans text-gray-400 font-bold text-center uppercase flex justify-center items-center gap-1.5 leading-tight">
              <Activity size={12} className="text-pink-500 shrink-0 animate-pulse" />
              <span>LOGISTICS COORDINATES CAPTURED SUCCESSFULLY FOR DISPATCH</span>
            </div>
          </div>

        </form>
      )}
    </div>
  );
}
