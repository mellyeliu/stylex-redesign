import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ThemeMode } from "../App";
import { CodeHighlight } from "./CodeHighlight";
import { AnimationsPreview } from "./AnimationsPreview";
import { ResponsivePreview } from "./ResponsivePreview";

const primaryColors = [
  { name: "Blue", hex: "#60A5FA", rgb: "96 / 165 / 250", cmyk: "62 / 34 / 0 / 2" },
  { name: "Indigo", hex: "#818CF8", rgb: "129 / 140 / 248", cmyk: "48 / 44 / 0 / 3" },
  { name: "Purple", hex: "#C084FC", rgb: "192 / 132 / 252", cmyk: "24 / 48 / 0 / 1" },
  { name: "Fuchsia", hex: "#F0ABFC", rgb: "240 / 171 / 252", cmyk: "5 / 32 / 0 / 1" },
  { name: "Pink", hex: "#F472B6", rgb: "244 / 114 / 182", cmyk: "0 / 53 / 25 / 4" },
  { name: "Rose", hex: "#FB7185", rgb: "251 / 113 / 133", cmyk: "0 / 55 / 47 / 2" },
];

const features = [
  {
    id: 1,
    title: "Theming",
    description: "Define and theme type-safe design tokens",
    code: `export const colors = stylex.defineVars({
  primary: {
    blue: '#60A5FA',
    indigo: '#818CF8',
    purple: '#C084FC',
    fuchsia: '#F0ABFC',
    pink: '#F472B6',
    rose: '#FB7185',
  }
});`,
    hasOutput: true,
    outputType: "colors",
  },
  {
    id: 2,
    title: "Responsive Design",
    description: "Use shareable breakpoints, pseudo-classes, or descendant selectors",
    code: `const styles = stylex.create({
  hero: {
    padding: '64px 24px',
    '@media (max-width: 768px)': {
      padding: '32px 16px',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});`,
    hasOutput: true,
    outputType: "responsive",
  },
  {
    id: 3,
    title: "Animations",
    description: "Define keyframes and view transition animations",
    code: `const fadeIn = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const styles = stylex.create({
  linear: {
    animationName: fadeIn,
    animationDuration: '2s',
    animationTimingFunction: 'linear',
  },
  easeOut: {
    animationTimingFunction: 'ease-out',
  },
  easeInOut: {
    animationTimingFunction: 'ease-in-out',
  },
});`,
    hasOutput: true,
    outputType: "animations",
  },
];

interface ScrollFeaturesProps {
  themeMode: ThemeMode;
  bodyFont: string;
}

export function ScrollFeatures({ themeMode, bodyFont }: ScrollFeaturesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  const isDark = themeMode === "dark";
  const isRainbow = themeMode === "rainbow";
  
  const borderRadius = "0.75rem"; // Always use large border radius

  const handleCopy = () => {
    navigator.clipboard.writeText(features[activeIndex].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const getColorStyle = (hex: string) => {
    if (isRainbow) {
      const gradientMap: Record<string, string> = {
        "#60A5FA": "linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)",
        "#818CF8": "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)",
        "#C084FC": "linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #d8b4fe 100%)",
        "#F0ABFC": "linear-gradient(135deg, #e879f9 0%, #f0abfc 50%, #f5d0fe 100%)",
        "#F472B6": "linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #f9a8d4 100%)",
        "#FB7185": "linear-gradient(135deg, #f43f5e 0%, #fb7185 50%, #fda4af 100%)",
      };
      return { background: gradientMap[hex] || hex };
    }
    return { backgroundColor: hex };
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Feature navigation - clickable headers */}
        <div 
          className={`p-8 ${isDark ? "bg-[#0d0d0d]" : "bg-white"} transition-colors duration-300 border ${isDark ? "border-neutral-700" : "border-slate-200"}`} 
          style={{ borderRadius: `${borderRadius} ${borderRadius} 0 0` }}
        >
          <div className="flex items-center justify-between gap-8">
            {features.map((feature, index) => (
              <button 
                key={feature.id} 
                onClick={() => setActiveIndex(index)}
                className="flex items-center gap-4 flex-1 group"
              >
                {/* Number circle */}
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index === activeIndex 
                      ? isDark 
                        ? "border-white text-white" 
                        : "border-slate-900 text-slate-900"
                      : isDark
                        ? "border-neutral-700 text-neutral-600 group-hover:border-neutral-600"
                        : "border-slate-300 text-slate-400 group-hover:border-slate-400"
                  }`}
                  style={{
                    transform: index === activeIndex ? "rotate(0deg)" : "rotate(20deg)",
                    borderWidth: '1px',
                    fontFamily: bodyFont,
                  }}
                >
                  <span className="text-xl" style={{ fontWeight: index === activeIndex ? 700 : 400 }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Feature title and description */}
                <div className="flex flex-col gap-1 items-start flex-1">
                  <h3 
                    className={`transition-all duration-300 text-left ${
                      index === activeIndex 
                        ? isDark 
                          ? "text-white" 
                          : "text-slate-900"
                        : isDark
                          ? "text-neutral-600 group-hover:text-neutral-500"
                          : "text-slate-400 group-hover:text-slate-500"
                    }`}
                    style={{ 
                      fontWeight: index === activeIndex ? 700 : 400,
                      fontSize: '1.125rem',
                      fontFamily: bodyFont,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <span className={`text-sm text-left ${
                    index === activeIndex 
                      ? isDark 
                        ? "text-white" 
                        : "text-slate-900"
                      : isDark
                        ? "text-neutral-500"
                        : "text-slate-500"
                  }`} style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {feature.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Code block or split view */}
        <div 
          className={`overflow-hidden ${isDark ? "bg-[#1a1a1a]" : "bg-white"} transition-colors duration-300 border ${isDark ? "border-neutral-700" : "border-slate-200"}`} 
          style={{ borderRadius: `0 0 ${borderRadius} ${borderRadius}` }}
        >
          {/* Editor header */}
          <div className={`flex items-center justify-between px-4 py-3 ${isDark ? "bg-[#2a2a2a]" : "bg-neutral-200 border-x border-neutral-300"} border-b ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className={`text-sm ${isDark ? "text-neutral-400" : "text-slate-600"}`}>
                {activeIndex === 0 ? "colors.stylex.ts" : `${features[activeIndex].title.replace(/\s+/g, '')}.tsx`}
              </span>
            </div>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDark ? "text-neutral-300 hover:text-white hover:bg-neutral-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"} rounded-lg transition-colors`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Content */}
          {features[activeIndex].hasOutput ? (
            // Split view with output preview
            <div className="grid lg:grid-cols-2">
              {/* Code editor */}
              <div className={`relative border-r ${isDark ? "border-neutral-800" : "border-slate-200"}`}>
                <div className={`absolute left-0 top-0 p-4 ${isDark ? "text-neutral-500" : "text-slate-500"} font-mono text-sm pointer-events-none select-none leading-6`}>
                  {features[activeIndex].code.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className={`pl-12 pr-4 py-4 ${isDark ? "bg-[#1a1a1a] text-neutral-50" : "bg-slate-900 text-slate-50"} font-mono text-sm leading-6`} style={{ minHeight: '500px' }}>
                  <CodeHighlight code={features[activeIndex].code} isDark={isDark} />
                </div>
              </div>

              {/* Output Preview */}
              {features[activeIndex].outputType === "colors" && (
                <div 
                  className="p-8 flex items-center transition-colors duration-300"
                  style={{ 
                    backgroundColor: isDark ? '#1a1a1a' : '#f8fafc',
                  }}
                >
                  <div className="grid grid-cols-3 gap-3 w-full">
                    {primaryColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleCopyColor(color.hex)}
                        className="relative p-4 rounded-2xl hover:scale-105 transition-transform cursor-pointer group"
                        style={{
                          ...getColorStyle(color.hex),
                          minHeight: '160px',
                          border: `1px solid ${isDark ? '#404040' : '#e2e8f0'}`,
                          boxShadow: isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          backgroundSize: isRainbow ? "200% 200%" : "auto",
                          animation: isRainbow ? "gradient-shift 8s ease infinite" : "none"
                        }}
                      >
                        {copiedColor === color.hex && (
                          <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-lg">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 text-slate-900">
                          <div className="text-sm mb-1" style={{ fontFamily: bodyFont, fontWeight: 700 }}>{color.name}</div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-slate-900 text-xs space-y-1 text-right" style={{ fontFamily: bodyFont }}>
                          <div style={{ borderTop: '0.5px solid #000000', opacity: 0.3 }} className="pt-2" />
                          <div className="opacity-90">{color.hex}</div>
                          <div style={{ borderTop: '0.5px solid #000000', opacity: 0.2 }} className="pt-1" />
                          <div className="opacity-80">RGB: {color.rgb}</div>
                          <div style={{ borderTop: '0.5px solid #000000', opacity: 0.2 }} className="pt-1" />
                          <div className="opacity-80">CMYK: {color.cmyk}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {features[activeIndex].outputType === "animations" && (
                <AnimationsPreview themeMode={themeMode} bodyFont={bodyFont} />
              )}

              {features[activeIndex].outputType === "responsive" && (
                <ResponsivePreview isDark={isDark} isRainbow={isRainbow} bodyFont={bodyFont} />
              )}
            </div>
          ) : (
            // Regular code display
            <div className="relative">
              {/* Line numbers */}
              <div className={`absolute left-0 top-0 p-4 ${isDark ? "text-neutral-500" : "text-slate-500"} font-mono text-sm pointer-events-none select-none leading-6`}>
                {features[activeIndex].code.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              {/* Syntax highlighted code */}
              <div className={`pl-12 pr-4 py-4 ${isDark ? "bg-[#1a1a1a] text-neutral-50" : "bg-slate-900 text-slate-50"} font-mono text-sm leading-6 transition-opacity duration-300`}>
                <CodeHighlight code={features[activeIndex].code} isDark={isDark} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}