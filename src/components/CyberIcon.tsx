import React from "react";
import {
  Zap,
  Wind,
  Snowflake,
  Grid,
  ShieldAlert,
  Tv,
  Keyboard,
  HardDrive,
  Smartphone,
  Headphones,
  Shirt,
  Scissors,
  Smile,
  Activity,
  Heart,
  Clock,
  Wallet,
  Glasses,
  Briefcase,
  CupSoda,
  Search,
  ShoppingCart,
  User,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CheckCircle,
  Home,
  SlidersHorizontal,
  ChevronRight,
  Filter,
  Check,
  Package,
  Sparkles,
} from "lucide-react";

// Explicit mapper to prevent any runtime string resolve issues
const iconMap: Record<string, React.ComponentType<any>> = {
  Zap,
  Wind,
  Snowflake,
  Grid,
  ShieldAlert,
  Tv,
  Keyboard,
  HardDrive,
  SmartphoneCharging: Smartphone, // map SmartphoneCharging to standard Smartphone
  Smartphone,
  Headphones,
  Shirt,
  Scissors,
  Smile,
  Footprints: Activity, // map Footprints to general Activity icon
  Activity,
  Heart,
  Clock,
  Wallet,
  Glasses,
  Briefcase,
  CupSoda,
  Search,
  ShoppingCart,
  User,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CheckCircle,
  Home,
  SlidersHorizontal,
  ChevronRight,
  Filter,
  Check,
  Package,
  Sparkles,
};

interface CyberIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function CyberIcon({ name, className = "", size = 24 }: CyberIconProps) {
  const IconComponent = iconMap[name] || Zap; // fallback to Zap
  return <IconComponent className={className} size={size} />;
}
