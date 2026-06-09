import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto scroll slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % 3);
  };

  const slides = [
    {
      title: "Modern Living Essentials",
      tagline: "Curated quality products",
      subtitle: "Up to 56% off today only",
      badge: "2026 Collection",
      leadDesc: "A masterclass in daily utility. Handselected high-performance household solutions, rechargeable standing units, and premium backups customized for active homes.",
      bgColor: "bg-[#111827]",
      textColor: "text-white",
      borderColor: "border-neutral-800",
      accentColor: "#f27495",
      products: [
        {
          name: "Arctic Hunter Pro",
          type: "Travel Armor Bag",
          price: "৳3,450",
          img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400",
        },
        {
          name: "Rechargeable Air Unit",
          type: "Standing Smart Fan",
          price: "৳5,800",
          img: "https://images.unsplash.com/photo-1618944847023-38aa001235f0?auto=format&fit=crop&q=80&w=400",
        }
      ]
    },
    {
      title: "Monsoon Special Drops",
      tagline: "Sophisticated outdoor gear",
      subtitle: "Flat 40% off traditional weave",
      badge: "Traditional Heritage Weave",
      leadDesc: "Embrace the beauty of handloom threads and high-density performance weaves. Water-resistant protective luxury sleeves and handcrafted Monipuri slingbags.",
      bgColor: "bg-[#fafcfb]",
      textColor: "text-neutral-900",
      borderColor: "border-neutral-200/80",
      accentColor: "#f27495",
      products: [
        {
          name: "Handwoven Jute Laptop Sleeve",
          type: "Bio-Degradable Fiber",
          price: "৳950",
          img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
        },
        {
          name: "Dhakai Handloom Silk",
          type: "Heritage Saree Premium",
          price: "৳8,500",
          img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400",
        }
      ]
    },
    {
      title: "Smart Home Appliances",
      tagline: "Precise kitchen & electronic units",
      subtitle: "100% Sourced authentication",
      badge: "Walton & Singer Highlights",
      leadDesc: "Upgrade home micro-climates and modern kitchens. High-efficiency brushless systems, rapid convection technology, and electronic cooking utilities with minimal layout footprints.",
      bgColor: "bg-[#090d16]",
      textColor: "text-white",
      borderColor: "border-slate-900",
      accentColor: "#f27495",
      products: [
        {
          name: "Detonal Core Kettle",
          type: "Premium Kitchen",
          price: "৳6,400",
          img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400",
        }
      ]
    }
  ];

  const s = slides[activeSlide];

  return (
    <div className="w-full relative overflow-hidden group select-none transition-colors duration-500 rounded-3xl shadow-sm" id="editorial-hero">
      <div className={`w-full border ${s.borderColor} ${s.bgColor} p-6 sm:p-10 md:p-14 flex flex-col md:grid md:grid-cols-12 gap-8 items-stretch min-h-[460px] relative transition-all duration-500`}>
        
        {/* Left Editorial Text Block */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-8 relative z-20">
          <div className="space-y-4">
            {/* Minimal High-End Badge */}
            <div className="flex items-center gap-2">
              <span className={`text-[10px] tracking-wider font-semibold px-2.5 py-0.5 rounded-lg bg-white/10 ${s.textColor} border border-current/10`}>
                {s.badge}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f27495]" />
              <span className="text-[10px] font-bold text-gray-400 capitalize">
                {s.tagline}
              </span>
            </div>

            {/* Giant Editorial Headline */}
            <h1 className={`font-sans font-bold tracking-tight leading-[1] text-3xl sm:text-4xl md:text-5xl ${s.textColor}`}>
              {s.title}
            </h1>
            
            <p className="text-sm font-semibold tracking-wide" style={{ color: s.accentColor }}>
              {s.subtitle}
            </p>

            <p className="text-[12px] sm:text-[13px] leading-relaxed text-gray-400 font-medium max-w-md">
              {s.leadDesc}
            </p>
          </div>

          {/* Slider actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
            <button
              onClick={onExplore}
              className="px-6 py-3 bg-[#f27495] hover:bg-[#eb5b80] text-white hover:shadow-md font-sans text-xs font-semibold tracking-wide transition duration-200 flex items-center justify-between sm:justify-start gap-4 cursor-pointer rounded-xl"
              id="hero-editorial-explore-btn"
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} className="group-hover/cta:translate-x-1.5 transition" />
            </button>

            {/* Indicator dots navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-current/10 flex items-center justify-center text-gray-400 hover:text-white transition duration-150 cursor-pointer"
                title="Previous Slide"
              >
                <ArrowLeft size={12} />
              </button>
              
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className="h-1.5 transition-all duration-350 cursor-pointer rounded-full"
                    style={{
                      width: activeSlide === idx ? "24px" : "6px",
                      backgroundColor: activeSlide === idx ? "#f27495" : "rgba(156, 163, 175, 0.4)"
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-current/10 flex items-center justify-center text-gray-400 hover:text-white transition duration-150 cursor-pointer"
                title="Next Slide"
              >
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Asymmetric Overlapping Product Cards */}
        <div className="md:col-span-5 flex items-center justify-center md:justify-end relative pr-2 md:pr-4 mt-6 md:mt-0 z-10">
          
          <div className="relative w-full max-w-[320px] h-[240px] sm:h-[280px]">
            {s.products.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const rotation = isEven ? "-rotate-6 translate-x-[-15%] sm:translate-x-[-25%] translate-y-[5%]" : "rotate-3 translate-x-[15%] sm:translate-x-[10%] translate-y-[-10%]";
              const zIndex = isEven ? "z-10" : "z-20";

              return (
                <div 
                  key={idx} 
                  onClick={onExplore}
                  className={`absolute inset-0 bg-white border border-neutral-100 p-4 rounded-2xl flex flex-col justify-between shadow-lg group/item cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:z-30 ${rotation} ${zIndex}`}
                >
                  <div className="w-full h-[60%] overflow-hidden bg-neutral-50 rounded-xl relative border border-neutral-100">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover/item:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 left-1.5 text-[8px] tracking-wide font-semibold bg-neutral-900 text-white px-2 py-0.5 rounded-md">
                      {item.type}
                    </div>
                  </div>

                  <div className="pt-2 text-left">
                    <h4 className="text-[12px] font-bold text-neutral-800 leading-tight block truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[11px] font-bold text-[#f27495]">
                        {item.price}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400">
                        View Product
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
