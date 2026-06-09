import { create } from "zustand";
import { Product, CartItem } from "../types";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "info" | "error" | "warning";
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: "success" | "info" | "error" | "warning") => void;
  removeToast: (id: string) => void;
}

// Client-side helper to load state safely
const getInitialCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("alpha_drop_cart");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("alpha_drop_cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: getInitialCart(),
  searchQuery: "",
  toasts: [],

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  addToast: (message: string, type: "success" | "info" | "error" | "warning" = "success") => {
    set((state) => {
      const toastId = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setTimeout(() => {
        set((s) => ({
          toasts: s.toasts.filter((t) => t.id !== toastId)
        }));
      }, 3500);
      return {
        toasts: [...state.toasts, { id: toastId, message, type }]
      };
    });
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  },

  addToCart: (product: Product) => {
    set((state) => {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.product.id === product.id
      );

      let updatedItems: CartItem[];
      let message = "";
      if (existingIndex > -1) {
        updatedItems = [...state.cartItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        message = `Increased "${product.name}" quantity to ${updatedItems[existingIndex].quantity} in cart!`;
      } else {
        updatedItems = [...state.cartItems, { product, quantity: 1 }];
        message = `"${product.name}" successfully added to cart!`;
      }

      saveCartToStorage(updatedItems);

      const toastId = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setTimeout(() => {
        set((s) => ({
          toasts: s.toasts.filter((t) => t.id !== toastId)
        }));
      }, 3500);

      return {
        cartItems: updatedItems,
        toasts: [...state.toasts, { id: toastId, message, type: "success" }]
      };
    });
  },

  removeFromCart: (id: string) => {
    set((state) => {
      const itemToRemove = state.cartItems.find((item) => item.product.id === id);
      const updatedItems = state.cartItems.filter(
        (item) => item.product.id !== id
      );
      saveCartToStorage(updatedItems);

      const toastId = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const message = itemToRemove
        ? `"${itemToRemove.product.name}" removed from cart.`
        : "Item removed from cart.";

      setTimeout(() => {
        set((s) => ({
          toasts: s.toasts.filter((t) => t.id !== toastId)
        }));
      }, 3500);

      return {
        cartItems: updatedItems,
        toasts: [...state.toasts, { id: toastId, message, type: "info" }]
      };
    });
  },

  updateQuantity: (id: string, qty: number) => {
    set((state) => {
      const targetItem = state.cartItems.find(item => item.product.id === id);
      if (!targetItem) return {};

      let updatedItems = state.cartItems.map((item) => {
        if (item.product.id === id) {
          return { ...item, quantity: Math.max(1, qty) };
        }
        return item;
      });

      let removed = false;
      if (qty <= 0) {
        updatedItems = state.cartItems.filter((item) => item.product.id !== id);
        removed = true;
      }

      saveCartToStorage(updatedItems);

      const toastId = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const message = removed
        ? `"${targetItem.product.name}" removed from cart.`
        : `Updated "${targetItem.product.name}" quantity to ${Math.max(1, qty)}.`;

      setTimeout(() => {
        set((s) => ({
          toasts: s.toasts.filter((t) => t.id !== toastId)
        }));
      }, 3500);

      return {
        cartItems: updatedItems,
        toasts: [...state.toasts, { id: toastId, message, type: "info" }]
      };
    });
  },

  clearCart: () => {
    set((state) => {
      saveCartToStorage([]);
      const toastId = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const message = "Cart cleared completely.";

      setTimeout(() => {
        set((s) => ({
          toasts: s.toasts.filter((t) => t.id !== toastId)
        }));
      }, 3500);

      return {
        cartItems: [],
        toasts: [...state.toasts, { id: toastId, message, type: "warning" }]
      };
    });
  },
}));
