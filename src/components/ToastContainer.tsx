import React from "react";
import { useCartStore } from "../store/useCartStore";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function ToastContainer() {
  const toasts = useCartStore((state) => state.toasts);
  const removeToast = useCartStore((state) => state.removeToast);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          let bgColor = "bg-white border-slate-100";
          let icon = <CheckCircle2 className="text-[#f27495]" size={18} />;

          if (toast.type === "success") {
            bgColor = "bg-emerald-50 border-emerald-200/60 text-emerald-950";
            icon = <CheckCircle2 className="text-emerald-500" size={18} />;
          } else if (toast.type === "info") {
            bgColor = "bg-sky-50 border-sky-200/60 text-sky-950";
            icon = <Info className="text-sky-500" size={18} />;
          } else if (toast.type === "warning" || toast.type === "error") {
            bgColor = "bg-rose-50 border-rose-200/60 text-rose-950";
            icon = <AlertCircle className="text-rose-500" size={18} />;
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`p-4 rounded-xl border shadow-lg flex items-center justify-between gap-3 pointer-events-auto ${bgColor}`}
              id={`toast-alert-${toast.id}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="shrink-0">{icon}</span>
                <p className="text-[11px] sm:text-xs font-semibold leading-relaxed tracking-tight">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-black/5 rounded-lg text-neutral-400 hover:text-neutral-600 transition cursor-pointer"
                id={`toast-dismiss-${toast.id}`}
                title="Dismiss"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
