import React from "react";

interface AlphaDropLogoProps {
  /** Mode of rendering:
   * - 'full': Delivery truck illustration + alphadrop text + slogan
   * - 'header': Delivery truck illustration + alphadrop text (compact layout for headers)
   * - 'icon-only': Just the gorgeous delivery truck illustration
   * - 'text-only': Just the alphabetical brand typography
   */
  mode?: "full" | "header" | "icon-only" | "text-only";
  /** Width/Height scale of the logo/icon container */
  size?: number;
  /** Custom typography size class for the brand name */
  textClass?: string;
}

export default function AlphaDropLogo({
  mode = "full",
  size = 52,
  textClass = "text-xl",
}: AlphaDropLogoProps) {
  
  // Custom SVG Delivery Truck showing speed lines, rounded pink cargo box with "a", and mint green cabin
  const renderDeliveryTruckIcon = (iconSize: number = 52) => (
    <svg
      width={iconSize * 1.5}
      height={iconSize}
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block select-none flex-shrink-0"
    >
      {/* 4 horizontal speed lines (Soft Pink #f27495) */}
      <rect x="18" y="39" width="22" height="5.5" rx="2.75" fill="#f27495" />
      <rect x="6" y="52" width="34" height="5.5" rx="2.75" fill="#f27495" />
      <rect x="20" y="65" width="18" height="5.5" rx="2.75" fill="#f27495" />
      <rect x="12" y="78" width="26" height="5.5" rx="2.75" fill="#f27495" />

      {/* Truck Cab / Cabin (Mint Green #48c9a6) */}
      <path
        d="M 90 48 
           L 122 48 
           C 134 48, 144 58, 144 70 
           L 144 95 
           L 90 95 
           Z"
        fill="#48c9a6"
      />
      
      {/* Bottom Chassis layer (Mint Green #48c9a6) connecting cabin to cargo box */}
      <rect x="44" y="88" width="94" height="11" rx="5.5" fill="#48c9a6" />

      {/* Cargo Box (Soft Pink #f27495) */}
      <rect x="44" y="29" width="61" height="61" rx="12" fill="#f27495" />

      {/* Lowercase white bold 'a' path custom drawn inside pink cargo box */}
      <path
        d="M 83 74 
           C 83 80, 77 82, 72 82 
           C 64 82, 60 77, 60 70 
           C 60 63, 65 59, 73 59 
           C 78 59, 81 61, 83 63
           M 83 54 
           L 83 82"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Windshield in Cabinet (White) */}
      <path
        d="M 98 54 
           H 118 
           C 124 54, 131 59, 131 66 
           L 131 72 
           C 131 76, 127 79, 123 79 
           H 98 
           Z"
        fill="white"
      />

      {/* Small circle headlight in front of the Cab (White) */}
      <circle cx="138" cy="80" r="2.5" fill="white" />

      {/* Truck Wheels (Charcoal Gray #2d3748 with White Hubcaps) */}
      {/* Back Wheel */}
      <circle cx="66" cy="98" r="11" fill="#2d3748" />
      <circle cx="66" cy="98" r="4.5" fill="white" />
      
      {/* Front Wheel */}
      <circle cx="114" cy="98" r="11" fill="#2d3748" />
      <circle cx="114" cy="98" r="4.5" fill="white" />
    </svg>
  );

  if (mode === "icon-only") {
    return <div className="inline-flex items-center">{renderDeliveryTruckIcon(size)}</div>;
  }

  if (mode === "text-only") {
    return (
      <div className="flex flex-col items-center select-none font-sans">
        <h1 className={`font-black tracking-tight ${textClass} leading-none`}>
          <span className="text-[#f27495]">Alpha</span>
          <span className="text-[#48c9a6]">Drop</span>
        </h1>
      </div>
    );
  }

  if (mode === "header") {
    return (
      <div className="flex items-center gap-2">
        {/* Render Delivery Truck Icon */}
        {renderDeliveryTruckIcon(40)}
        <div className="flex flex-col select-none font-sans justify-center">
          <span className="font-sans font-black text-[#f27495] text-2xl sm:text-2.5xl tracking-tight leading-none lowercase">
            Alpha<span className="text-[#48c9a6]">Drop</span>
          </span>
        </div>
      </div>
    );
  }

  // Default 'full' mode: Large display version (exactly like the uploaded logo with subtext!)
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 select-none font-sans">
      {/* Large visual logo */}
      {renderDeliveryTruckIcon(90)}
      
      {/* Brand Name Typography */}
      <h2 className={`font-sans font-black tracking-tight select-none mt-2 text-[#f27495] ${textClass}`}>
        AlphaDrop
      </h2>

      {/* Slogan Subtext */}
      <p className="text-[#48c9a6] text-xs font-semibold tracking-wide mt-1.5 font-sans">
        -- Where Demand Meets No Boundaries --
      </p>
    </div>
  );
}
