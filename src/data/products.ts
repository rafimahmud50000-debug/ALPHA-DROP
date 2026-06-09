import { Product } from "../types";

export const PRODUCTS: Product[] = [
  // Appliance Category
  {
    id: "APL-BD01",
    name: "Walton Rechargeable AC/DC Standing Fan (Wrf-16A)",
    price: 5800,
    originalPrice: 7200,
    discount: 19,
    category: "Appliance",
    imageIcon: "Wind",
    description: "High-capacity rechargeable standing fan with automatic over-discharge protection systems. Offers up to 8 hours of backup air during power outages across Dhaka and Chittagong cities.",
    specs: ["12V 4.5Ah Lead-Acid Battery", "3-Speed continuous selector level", "Built-in bright night LED light", "Quiet brushless motor blade"],
    glowColor: "#48c9a6"
  },
  {
    id: "APL-BD02",
    name: "Vision Premium Induction Cooker (V-Ind-01)",
    price: 3100,
    originalPrice: 3800,
    discount: 18,
    category: "Appliance",
    imageIcon: "Zap",
    description: "Energy-saving digital induction heating cooker with a hard polished ceramic glass plate. Perfect for fast multi-variant cooking in modern Bangladeshi households.",
    specs: ["2000W high speed performance", "8 discrete temperature levels", "Smart cookware sensor system", "Multi-functional meal presets"],
    glowColor: "#f27495"
  },
  {
    id: "APL-BD03",
    name: "Singer Aero-Crisp 4L Air Fryer",
    price: 8500,
    originalPrice: 11000,
    discount: 22,
    category: "Appliance",
    imageIcon: "Grid",
    description: "An advanced convection tabletop air fryer allowing rapid hot circular ventilation. Re-engineer traditional home recipes with 90% less oil.",
    specs: ["4.0-Liter non-stick internal drawer", "Integrated mechanical timer dial", "AeroVent exhaust safety systems", "Anti-scald easy-grip handle"],
    glowColor: "#48c9a6"
  },

  // Tech Category
  {
    id: "TEC-BD01",
    name: "Walton Tamarind MX5 Core-i5 Laptop",
    price: 52000,
    originalPrice: 59000,
    discount: 11,
    category: "Tech",
    imageIcon: "Tv",
    description: "Elegant metal-finishing productivity laptop containing a high-speed Intel Core-i5 11th Gen processor, 8GB DDR4 RAM, and 512GB ultra-fast M.2 SSD storage.",
    specs: ["14.0-inch Full-HD anti-glare panel", "Intel Iris Xe Graphics processing", "Up to 6 hours active battery life", "Premium backlit keyboard layout"],
    glowColor: "#f27495"
  },
  {
    id: "TEC-BD02",
    name: "Mars Mini IPS Router Backup Power unit",
    price: 1650,
    originalPrice: 2200,
    discount: 25,
    category: "Tech",
    imageIcon: "SmartphoneCharging",
    description: "Dual-voltage micro backup power unit designed to keep Wi-Fi routers, ONU, and IP cameras running uninterrupted for up to 8 hours during power shedding.",
    specs: ["8800mAh high grade Lithium-Ion cell", "Outputs: 9V, 12V, POE, USB-5V", "Robust over-charge circuit security", "Intelligent battery status LEDs"],
    glowColor: "#48c9a6"
  },

  // Fashion Category
  {
    id: "FAS-BD01",
    name: "Dhakai Jamdani Handloom Saree (Heritage Sutan)",
    price: 8500,
    originalPrice: 15000,
    discount: 43,
    category: "Fashion",
    imageIcon: "Shirt",
    description: "Traditional meticulously handwoven masterpiece by local weavers of Narayanganj. Features the legendary red and golden floral motifs with super light comfortable hand spun thread.",
    specs: ["100% genuine fine handloom cotton", "Authentic traditional floral patterns", "Lightweight and easy drape weave", "Includes matchable blouse pieces"],
    glowColor: "#f27495"
  },
  {
    id: "FAS-BD02",
    name: "Rajshahi Silk Premium Handloom Panjabi",
    price: 3400,
    originalPrice: 4800,
    discount: 29,
    category: "Fashion",
    imageIcon: "Smile",
    description: "Sophisticated and breathable celebration wear crafted with authentic Rajshahi mulberry silk threads. Adorned with delicate collar work borders.",
    specs: ["Rajshahi pure grade-A silk", "Custom collar-button handwork", "Regular breathable comfort fitting", "Ideal for Eid, Puja or wedding festivities"],
    glowColor: "#48c9a6"
  },
  {
    id: "FAS-BD03",
    name: "Aarong Nakshi Kantha Hand-sewn Cotton Shawl",
    price: 4200,
    originalPrice: 5900,
    discount: 28,
    category: "Fashion",
    imageIcon: "Scissors",
    description: "A gorgeous winter garment featuring detailed handcrafted Nakshi Kantha embroidery work telling traditional folk stories of rural Bengal.",
    specs: ["Hand-spun organic country cotton", "Authentic running stitch details", "Spacious 2.2-meter overall length", "Preserves centuries of artisanal skills"],
    glowColor: "#f27495"
  },

  // Accessory Category
  {
    id: "ACC-BD01",
    name: "Sunderbans Natural Pure Honey (Aarong Organics)",
    price: 1200,
    originalPrice: 1500,
    discount: 20,
    category: "Accessory",
    imageIcon: "CupSoda",
    description: "Organic wildflower honey collected sustainably by local honey gatherers (Mowals) of Sunderbans mangrove forests. Fully verified for chemical purity.",
    specs: ["100% natural, no added syrups", "Rich in natural vitamins and minerals", "Sourced from native Khalsi wildflowers", "Net volume weight is 500 grams"],
    glowColor: "#f27495"
  },
  {
    id: "ACC-BD02",
    name: "Dhaka Heritage Handwoven Jute Laptop Sleeve",
    price: 950,
    originalPrice: 1400,
    discount: 32,
    category: "Accessory",
    imageIcon: "Briefcase",
    description: "Eco-friendly, water-resistant protective laptop sleeves carefully stitched from high-quality golden jute fibers. Helps empower local weaving families.",
    specs: ["Premium bio-degradable golden jute", "Plush soft-knit protective foam lining", "Sturdy alloy zipper lock sliding", "Supports laptops up to 15.6 inches"],
    glowColor: "#48c9a6"
  },
  {
    id: "ACC-BD03",
    name: "Traditional Sylhet Monipuri Handcraft Slingbag",
    price: 1450,
    originalPrice: 2100,
    discount: 30,
    category: "Accessory",
    imageIcon: "Wallet",
    description: "Elegant, colorful cross-body handbags embroidered with pristine geometric patterns using old-heritage Monipuri community handloom skills.",
    specs: ["Authentic weaving from Sylhet artisan guilds", "Magnetic flap lock clasp coupler", "Double internal cash zippered slots", "Adjustable hand-stitched strap cords"],
    glowColor: "#f27495"
  }
];
