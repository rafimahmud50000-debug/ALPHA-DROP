export type Category = "Tech" | "Fashion" | "Appliance" | "Accessory";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage, e.g. 15 for 15% off
  category: Category;
  imageIcon: string; // Lucide icon reference string
  description: string;
  specs: string[];
  glowColor: string; // HEX or color class for the futuristic neon glow (e.g., "#2bdf91" or "emerald")
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderConfirmation {
  orderId: string;
  customerName: string;
  customerEmail: string;
  deliveryAddress: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}
