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
      title: "THE ESSENTIALS",
      tagline: "CURATED MODERN LIVING",
      subtitle: "DISCOUNT RATIOS UP TO 56% OFF",
      badge: "SEASON 2026 EDITION",
      leadDesc: "A masterclass in daily utility. Handselected high-performance household solutions, rechargeable standing units, and premium backups customized for structural stability.",
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
      title: "MONSOON SPECIALS",
      tagline: "SOPHISTICATED OUTDOORS",
      subtitle: "FLAT 40% OFF THE WEAVE COLLECTION",
      badge: "TRADITIONAL MEETS MODERN",
      leadDesc: "Embrace the beauty of handloom threads and high-density performance weaves. Water-resistant protective luxury sleeves and handcrafted Monipuri slingbags.",
      bgColor: "bg-[#fafcfb]",
      textColor: "text-neutral-900",
      borderColor: "border-neutral-200/80",
      accentColor: "#48c9a6",
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
      title: "SMART LIVING",
      tagline: "PRECISE DOMESTICITY",
      subtitle: "100% BRAND AUTHENTICITY ASSURANCE",
      badge: "WALTON & SINGER HIGHLIGHTS",
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
    <div className="w-full relative overflow-hidden group select-none transition-colors duration-500" id="editorial-hero">
      {/* Container with sharp custom border - no standard rounded-2xl */}
      <div className={`w-full border-y md:border ${s.borderColor} ${s.bgColor} p-6 sm:p-10 md:p-14 flex flex-col md:grid md:grid-cols-12 gap-8 items-stretch min-h-[460px] relative transition-all duration-500`}>
        
        {/* Left Editorial Text Block */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-8 relative z-20">
          <div className="space-y-4">
            {/* Minimal High-End Badge */}
            <div className="flex items-center gap-2">
              <span className={`text-[9px] tracking-[0.25em] font-extrabold uppercase px-3 py-1 bg-neutral-900/10 dark:bg-white/10 ${s.textColor} border border-current/10 rounded-[3px]`}>
                {s.badge}
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.accentColor }} />
              <span className="text-[9px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
                {s.tagline}
              </span>
            </div>

            {/* Giant Editorial Headline */}
            <h1 className={`font-sans font-black tracking-tight leading-[0.9] text-3xl sm:text-5xl md:text-6xl uppercase ${s.textColor}`}>
              {s.title}
            </h1>
            
            <p className={`text-xs sm:text-sm font-bold tracking-wide`} style={{ color: s.accentColor }}>
              {s.subtitle}
            </p>

            <p className="text-[12px] sm:text-[13px] leading-relaxed text-neutral-400 font-medium max-w-md">
              {s.leadDesc}
            </p>
          </div>

          {/* Hand-crafted custom Sharp CTA Button and Slider Controllers */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
            <button
              onClick={onExplore}
              className="px-8 py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-900 dark:hover:bg-neutral-100 font-sans text-xs font-black uppercase tracking-[0.2em] transition duration-200 flex items-center justify-between sm:justify-start gap-4 border border-white/10 group/cta cursor-pointer rounded-[3px]"
              id="hero-editorial-explore-btn"
            >
              <span>DISCOVER NOW</span>
              <ArrowRight size={14} className="group-hover/cta:translate-x-1.5 transition" />
            </button>

            {/* Micro Slider Indicators */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-current/10 flex items-center justify-center text-neutral-400 hover:text-white transition duration-150 cursor-pointer"
                title="Previous Selection"
              >
                <ArrowLeft size={12} />
              </button>
              
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className="h-1 transition-all duration-350 cursor-pointer rounded-[1px]"
                    style={{
                      width: activeSlide === idx ? "28px" : "6px",
                      backgroundColor: activeSlide === idx ? s.accentColor : "rgb(156, 163, 175, 0.4)"
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-current/10 flex items-center justify-center text-neutral-400 hover:text-white transition duration-150 cursor-pointer"
                title="Next Selection"
              >
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Asymmetric Overlapping Product Cards */}
        <div className="md:col-span-5 flex items-center justify-center md:justify-end relative pr-2 md:pr-4 mt-6 md:mt-0 z-10">
          
          {/* Content Wrapper */}
          <div className="relative w-full max-w-[320px] h-[240px] sm:h-[280px]">
            {s.products.map((item, idx) => {
              // Asymmetrical rotation & translation offsets to create a hand-crafted depth
              const isEven = idx % 2 === 0;
              const rotation = isEven ? "-rotate-6 translate-x-[-15%] sm:translate-x-[-25%] translate-y-[5%]" : "rotate-3 translate-x-[15%] sm:translate-x-[10%] translate-y-[-10%]";
              const zIndex = isEven ? "z-10" : "z-20";

              return (
                <div 
                  key={idx} 
                  onClick={onExplore}
                  className={`absolute inset-0 bg-white border border-neutral-200/50 p-4 rounded-[4px] flex flex-col justify-between shadow-lg select-all group/item cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:z-30 ${rotation} ${zIndex}`}
                >
                  {/* Aspect image frame */}
                  <div className="w-full h-[60%] overflow-hidden bg-neutral-100 rounded-[2px] relative border border-neutral-150">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover/item:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 left-1.5 text-[7px] tracking-widest font-black uppercase bg-neutral-900 text-white px-2 py-0.5 rounded-[1px]">
                      {item.type}
                    </div>
                  </div>

                  {/* Title metadata with strong typographic contrast */}
                  <div className="pt-2 text-left">
                    <h4 className="text-[10px] tracking-wide font-black uppercase text-neutral-900 leading-tight block truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[9px] tracking-normal font-extrabold text-[#f27495]">
                        {item.price}
                      </span>
                      <span className="text-[8px] tracking-widest text-neutral-400 font-extrabold uppercase">
                        ACQUIRE →
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

