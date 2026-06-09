import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { OrderConfirmation } from "../types";
import CyberIcon from "../components/CyberIcon";
import { ShieldCheck, Truck, CreditCard, Sparkles, AlertCircle, ArrowLeft, CheckCircle2, RefreshCw, Cpu, Activity } from "lucide-react";

export function BkashIcon({ className = "w-4 h-4 text-white" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="76,46 88,42 76,54" />
      <polygon points="46,18 76,46 44,68" />
      <polygon points="46,18 18,48 44,68" />
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

  const [email, setEmail] = useState(userEmail);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Bangladesh");
  const [paymentMethod] = useState("bkash");
  
  const [bkashNumber, setBkashNumber] = useState("");
  const [trxId, setTrxId] = useState("");

  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 2000 ? 0 : cartItems.length > 0 ? 120 : 0;
  const salesTax = subtotal * 0.08;
  const total = subtotal + shippingFee + salesTax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(null);

    if (!email || !firstName || !lastName || !address || !city || !postalCode) {
      setFormErrors("All contact, name, and address fields are required to deliver your goods.");
      return;
    }

    if (!bkashNumber || !trxId) {
      setFormErrors("Please provide both sender bKash number and Transaction ID.");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const generatedId = `ALPHA-${Math.floor(100000 + Math.random() * 900000)}`;
      
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
        paymentMethod: "bKash",
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      clearCart();
    }, 1800);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-24 font-sans">
        {/* Order Success Card */}
        <div className="bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl relative overflow-hidden space-y-6 shadow-sm">
          
          <div className="absolute top-0 right-0 bg-[#f27495] text-white font-bold text-[10px] tracking-wider px-4 py-1.5 uppercase rotate-45 translate-x-6 translate-y-2 select-none">
            Secure Order
          </div>

          <div className="text-center space-y-2.5">
            <div className="mx-auto w-16 h-16 rounded-full bg-pink-50 border-2 border-pink-200 flex items-center justify-center text-[#f27495] select-none">
              <CheckCircle2 size={32} className="stroke-[2]" />
            </div>
            
            <span className="text-xs text-[#f27495] font-semibold">
              Order Confirmed!
            </span>
            
            <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900 tracking-tight">
              Thank you for your order!
            </h1>
            
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              Your transaction has been verified successfully. Your dropshipping courier payload has been registered for swift dispatch.
            </p>
          </div>

          {/* Reference Meta Box */}
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-gray-150 pb-2">
              <span className="text-gray-500 font-bold">Order ID:</span>
              <span className="text-pink-600 font-bold select-all">{confirmedOrder.orderId}</span>
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-500 font-bold">Courier Carrier:</span>
              <span className="text-gray-900 font-semibold flex items-center gap-1">
                <Truck size={12} className="text-pink-600" /> Express Home Courier
              </span>
            </div>

            <div className="flex justify-between items-start text-[11px] gap-2">
              <span className="text-gray-500 font-bold shrink-0">Delivery Address:</span>
              <span className="text-gray-900 font-semibold text-right break-words">{confirmedOrder.deliveryAddress}</span>
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-500 font-bold">Payment Method:</span>
              <span className="text-gray-900 font-semibold">bKash Wallet Transaction</span>
            </div>
          </div>

          {/* Core Invoice Summary */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block">
              Items Ordered ({confirmedOrder.items.length}):
            </span>
            
            <div className="max-h-36 overflow-y-auto space-y-1.5 bg-slate-50 border border-slate-100 rounded-xl p-3">
              {confirmedOrder.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-xs py-1 border-b border-gray-100 last:border-0 font-medium font-sans">
                  <span className="text-gray-600 truncate max-w-[280px]">
                    {item.product.name} <strong className="text-gray-900 font-bold">x{item.quantity}</strong>
                  </span>
                  <span className="text-pink-600 font-bold">৳{(item.product.price * item.quantity).toLocaleString("en-US")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Calculation */}
          <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
            <div>
              <span className="text-xs text-gray-500 font-bold block">Total Paid Amount:</span>
              <span className="text-[10px] text-gray-400">Includes secure taxes and shipping fees</span>
            </div>
            <span className="text-2xl font-bold text-gray-950 font-sans">
              ৳{confirmedOrder.total.toLocaleString("en-US")}
            </span>
          </div>

          {/* Estimated dispatch message */}
          <div className="bg-pink-50 border border-pink-100 p-4 rounded-xl flex items-center gap-3 text-xs text-slate-700">
            <Activity size={18} className="text-[#f27495] shrink-0" />
            <p className="leading-relaxed font-sans">
              Estimated cargo delivery is <strong className="text-gray-900">48 hours</strong>. Secure order summary emails have been dispatched to <strong className="text-pink-600 font-semibold">{confirmedOrder.customerEmail}</strong>.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("/")}
              className="w-full py-3 bg-pink-50 hover:bg-[#fff0f4] text-[#f27495] hover:text-[#eb5b80] border border-pink-100 font-sans text-xs font-semibold rounded-xl tracking-wide transition cursor-pointer text-center"
              id="btn-return-base"
            >
              Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 font-sans text-neutral-900" id="checkout-pipeline-view">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f27495] text-white flex items-center justify-center">
            <CreditCard size={18} />
          </div>
          <div>
            <span className="text-[10px] tracking-wider font-semibold text-gray-405 block mb-0.5">Secure Transaction Panel</span>
            <h1 className="text-sm font-bold text-neutral-950">
              Checkout Details
            </h1>
          </div>
        </div>

        <button
          onClick={() => onNavigate("/cart")}
          className="font-sans text-xs text-neutral-600 hover:text-[#f27495] flex items-center gap-1.5 cursor-pointer font-bold transition border border-neutral-200 px-4 py-2 rounded-xl bg-white hover:border-[#f27495]"
          id="btn-checkout-back"
        >
          <ArrowLeft size={12} className="stroke-[2]" />
          <span>Adjust Cart Items</span>
        </button>
      </div>

      {formErrors && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-xs text-red-700 flex items-start gap-3">
          <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-600" />
          <span className="font-sans font-semibold">{formErrors}</span>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-neutral-305 rounded-2xl bg-white shadow-xs">
          <p className="font-sans text-xs font-semibold text-neutral-500">
            Your e-commerce cart is currently empty. Please select some items to purchase.
          </p>
          <button
            onClick={() => onNavigate("/")}
            className="mt-4 px-5 py-2.5 bg-[#f27495] text-white font-semibold text-xs rounded-xl transition cursor-pointer"
          >
            Return to Storefront
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Inputs */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Delivery Data block */}
            <div className="bg-white border border-gray-150 p-5 rounded-2xl space-y-4 shadow-sm">
              <h3 className="font-sans font-bold text-sm tracking-tight text-gray-900 flex items-center gap-2">
                <Truck size={16} className="text-pink-500" />
                <span>1. Delivery Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Email Address (Receipts)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-650">Shipping Carrier</label>
                  <div className="bg-slate-50 border border-slate-150 text-xs p-3 rounded-xl text-gray-500 select-none font-semibold">
                    Standard Express Courier
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Recipient First Name</label>
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
                  <label className="text-xs font-semibold text-gray-600">Recipient Last Name</label>
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
                  <label className="text-xs font-semibold text-gray-600">Physical Delivery Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="E.g. House 45, Road 12, Gulshan 2"
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="E.g. Dhaka"
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Postal Code / Zip</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="E.g. 1212"
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition"
                    required
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-slate-50 border border-slate-100 text-xs font-sans p-3 rounded-xl focus:outline-none focus:border-pink-500 text-gray-900 focus:bg-white transition w-full font-semibold"
                  >
                    <option value="Bangladesh">Bangladesh (Dhaka, Chittagong, Sylhet)</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Japan">Japan</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment bKash Details */}
            <div className="bg-pink-50/10 border border-pink-100 p-5 rounded-2xl space-y-4 shadow-sm">
              <h3 className="font-sans font-bold text-sm text-gray-900 flex items-center gap-2.5 border-b border-pink-50 pb-2">
                <div className="w-6 h-6 rounded-lg bg-[#e2125a] text-white flex items-center justify-center select-none shrink-0 shadow-xs">
                  <BkashIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span>2. bKash Payment Details</span>
              </h3>

              <div className="bg-pink-50 border border-pink-100 p-4 sm:p-5 space-y-3 text-xs rounded-xl">
                <span className="text-[11px] text-pink-600 font-bold block flex items-center gap-1.5">
                  <BkashIcon className="w-3.5 h-3.5 text-[#e2125a]" />
                  bKash Agent Instructions
                </span>

                <ol className="space-y-2 text-xs text-neutral-600 list-decimal pl-4 leading-normal font-medium">
                  <li>
                    Enter recipient bKash Number: <strong className="font-mono text-neutral-900 select-all font-bold bg-pink-100 border border-pink-200 px-2 py-0.5 rounded-md">01757178991</strong> (Personal)
                  </li>
                  <li>
                    Ammount to Send: <strong className="font-sans text-neutral-900 font-bold">৳{total.toLocaleString("en-US")}</strong>
                  </li>
                  <li>
                    Input your PIN, submit, and copy the Transaction ID.
                  </li>
                </ol>
              </div>

              {/* Verification Inputs */}
              <div className="space-y-3 bg-neutral-50 border border-neutral-100 rounded-xl p-4 text-xs">
                <span className="text-[11.5px] text-pink-500 block font-bold mb-2 flex items-center gap-1.5">
                  <BkashIcon className="w-3.5 h-3.5 text-pink-500" />
                  Payment Verification Block
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-neutral-600">Sender bKash Phone Number</label>
                    <input
                      type="text"
                      value={bkashNumber}
                      onChange={(e) => setBkashNumber(e.target.value)}
                      placeholder="e.g. 01712345678"
                      className="bg-white border border-neutral-150 p-3 rounded-xl focus:outline-none focus:border-pink-500 text-xs font-sans placeholder-neutral-300 text-gray-900"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-neutral-600">bKash Transaction ID (TrxID)</label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="e.g. 8N7X9Q2Y5"
                      className="bg-white border border-neutral-150 p-3 rounded-xl focus:outline-none focus:border-pink-500 text-xs font-sans placeholder-neutral-300 text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Summary column */}
          <div className="lg:col-span-5 bg-white border border-gray-150 p-5 rounded-2xl space-y-4 shadow-sm">
            <h3 className="font-sans font-bold text-sm tracking-tight text-gray-900 border-b border-gray-50 pb-2">
              Bag Summary
            </h3>

            {/* List */}
            <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-xl font-medium font-sans">
                  <div className="flex items-center gap-2 truncate max-w-[200px] sm:max-w-xs text-gray-700">
                    <CyberIcon name={item.product.imageIcon} className="text-[#f27495]" size={14} />
                    <span className="truncate">{item.product.name}</span>
                    <span className="text-gray-400 font-bold text-[10px]">x{item.quantity}</span>
                  </div>
                  <span className="text-gray-950 font-semibold shrink-0">
                    ৳{(item.product.price * item.quantity).toLocaleString("en-US")}
                  </span>
                </div>
              ))}
            </div>

            {/* Summaries */}
            <div className="space-y-2 border-t border-gray-50 pt-3 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-gray-550 font-semibold">Subtotal:</span>
                <span className="text-gray-900 font-bold">৳{subtotal.toLocaleString("en-US")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-555 font-semibold">Shipping Fee:</span>
                <span className="text-gray-900 font-semibold">
                  {shippingFee === 0 ? "Free" : `৳${shippingFee.toLocaleString("en-US")}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-555 font-semibold">Sales Tax (8%):</span>
                <span className="text-gray-900 font-semibold">৳{salesTax.toLocaleString("en-US")}</span>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
                <span className="text-pink-600 text-xs font-bold">Total Amount:</span>
                <span className="text-xl font-bold text-gray-950">
                  ৳{total.toLocaleString("en-US")}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#f27495] hover:bg-[#eb5b80] text-white font-sans text-xs font-bold tracking-wide transition flex items-center justify-center gap-2.5 shadow-sm cursor-pointer rounded-xl disabled:opacity-50"
                id="btn-submit-order"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} className="stroke-[2.2]" />
                    <span>Confirm Order</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[10px] font-sans text-gray-400 font-semibold text-center flex justify-center items-center gap-1.5 leading-tight">
              <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
              <span>Certified bKash SSL Encryption Layer Enabled</span>
            </div>
          </div>

        </form>
      )}
    </div>
  );
}
