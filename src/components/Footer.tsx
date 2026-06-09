import React from "react";
import { Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 pt-10 mt-16 text-gray-700 bg-white rounded-2xl p-6 sm:p-8 shadow-inner select-none w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
        
        {/* Col 1: Corporate details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-sans font-black text-gray-900 text-lg uppercase tracking-wider">
              Alpha<span className="text-[#f27495]">Drop</span>
            </span>
          </div>

          <p className="text-[11px] text-gray-500 leading-normal font-sans">
            Gulshan 2, Dhaka,<br />
            Bangladesh
          </p>

          <div className="text-[11px] space-y-1 font-semibold text-gray-700">
            <p className="hover:text-[#f27495] transition">📞 +8801757178991</p>
            <p className="text-gray-400 text-[10px]">9 am - 9 pm (Everyday)</p>
            <p className="hover:text-[#f27495] transition">✉️ customer.care@alphadrop.net</p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 pt-1">
            <span className="p-1.5 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:text-[#f27495] hover:bg-[#fff0f4] transition cursor-pointer"><Facebook size={12.5} /></span>
            <span className="p-1.5 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:text-[#f27495] hover:bg-[#fff0f4] transition cursor-pointer"><Youtube size={12.5} /></span>
            <span className="p-1.5 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:text-[#f27495] hover:bg-[#fff0f4] transition cursor-pointer"><Linkedin size={12.5} /></span>
            <span className="p-1.5 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:text-[#f27495] hover:bg-[#fff0f4] transition cursor-pointer"><Instagram size={12.5} /></span>
          </div>
        </div>

        {/* Col 2: Brand/AlphaDrop Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-900 tracking-tight border-b border-gray-100 pb-1.5">
            AlphaDrop
          </h4>
          <div className="flex flex-col gap-2 text-[11px] text-gray-500 font-semibold font-sans">
            <button onClick={() => onNavigate("/help-center#about")} className="text-left hover:text-[#f27495] hover:underline transition cursor-pointer">About Us</button>
            <button onClick={() => onNavigate("/help-center#faqs")} className="text-left hover:text-[#f27495] hover:underline transition cursor-pointer">FAQs & Support</button>
            <button onClick={() => onNavigate("/help-center#cookies")} className="text-left hover:text-[#f27495] hover:underline transition cursor-pointer">Cookies Policy</button>
          </div>
        </div>

        {/* Col 3: Customer Care links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-900 tracking-tight border-b border-gray-100 pb-1.5">
            Customer Care
          </h4>
          <div className="flex flex-col gap-2 text-[11px] text-gray-500 font-semibold font-sans">
            <button onClick={() => onNavigate("/help-center#refund")} className="text-left hover:text-[#f27495] hover:underline transition cursor-pointer">Return & Refund Policy</button>
            <button onClick={() => onNavigate("/help-center#cookies")} className="text-left hover:text-[#f27495] hover:underline transition cursor-pointer">Privacy Policy</button>
            <button onClick={() => onNavigate("/help-center#warranty")} className="text-left hover:text-[#f27495] hover:underline transition cursor-pointer">Warranty Policy</button>
            <button onClick={() => onNavigate("/help-center#terms")} className="text-left hover:text-[#f27495] hover:underline transition cursor-pointer">Terms & Conditions</button>
          </div>
        </div>

        {/* Col 4: Payment Methods (Only bKash as requested) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-900 tracking-tight border-b border-gray-100 pb-1.5">
            Payment Methods
          </h4>
          
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-gray-150 px-4 py-2 rounded-xl text-center text-xs font-semibold text-pink-600 block shadow-3xs font-sans">
              bKash
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-50 text-left">
            <span className="text-[7.5px] text-gray-400 block mt-1">
              Powered by Secure Payment Gateways
            </span>
          </div>
        </div>

      </div>

      {/* Copyright notice row */}
      <div className="border-t border-gray-150 pt-5 text-center text-[10px] text-gray-400 font-medium">
        © Copyright 2026 AlphaDrop All Rights Reserved.
      </div>
    </footer>
  );
}
