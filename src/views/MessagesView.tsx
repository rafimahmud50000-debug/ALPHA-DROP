import React from "react";
import { Mail, ShieldCheck } from "lucide-react";

export default function MessagesView({ onNavigate }: { onNavigate: (path: string) => void }) {
  const messages = [
    { id: 1, title: "Welcome to Alphadrop", body: "Thank you for joining our automated fulfillment network. Your communication node is now fully active." },
    { id: 2, title: "System Operational", body: "All secure dispatch drones and micro-pipelines are running at peak efficiency." }
  ];

  return (
    <div className="space-y-6 pb-24 font-sans text-neutral-800" id="messages-view">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-pink-50 text-pink-400 flex items-center justify-center border border-pink-100">
            <Mail size={16} />
          </div>
          <div>
            <span className="text-[8px] tracking-[0.25em] font-extrabold text-neutral-400 uppercase block mb-0.5">YOUR PERSONAL</span>
            <h1 className="text-sm font-black uppercase text-neutral-800 tracking-[0.1em]">
              INBOX
            </h1>
          </div>
        </div>
      </div>
      
      {messages.map(msg => (
          <div key={msg.id} className="p-5 border border-neutral-100 rounded-sm bg-white shadow-sm">
              <h3 className="font-sans font-black text-xs uppercase tracking-widest text-pink-500 mb-2">{msg.title}</h3>
              <p className="text-xs text-neutral-600 font-medium">{msg.body}</p>
          </div>
      ))}
      

    </div>
  );
}
