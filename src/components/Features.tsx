import { Zap, Palette, Smartphone, Code2, Moon, Package } from "lucide-react";
import { ThemeMode } from "../App";

const features = [
  {
    icon: Zap,
    title: "Atomic CSS",
    description: "Generates minimal, optimized CSS with atomic classes for maximum performance."
  },
  {
    icon: Palette,
    title: "Theming APIs",
    description: "Define and customize design tokens with stylex.defineVars() for consistent theming."
  },
  {
    icon: Smartphone,
    title: "Type Safety",
    description: "Full TypeScript support with compile-time type checking and autocompletion."
  },
  {
    icon: Code2,
    title: "Predictable",
    description: "Merge styles predictably. The last style applied wins!"
  },
  {
    icon: Moon,
    title: "Composable",
    description: "Share styles between components with little runtime cost."
  },
  {
    icon: Package,
    title: "Expressive",
    description: "CSS features like media queries, pseudo-classes, keyframes, and more."
  }
];

const companies = [
  { name: "Facebook" },
  { name: "Instagram" },
  { name: "Messenger" },
  { name: "WhatsApp" },
  { name: "Threads" },
  { name: "Figma" },
  { name: "Snowflake" },
  { name: "HubSpot" },
];

interface FeaturesProps {
  themeMode: ThemeMode;
}

export function Features({ themeMode }: FeaturesProps) {
  const isDark = themeMode === "dark";
  const isRainbow = themeMode === "rainbow";
  
  const borderRadius = "0.75rem"; // Always use large border radius

  // Split companies into two rows
  const firstRowCompanies = companies.slice(0, 4);
  const secondRowCompanies = companies.slice(4, 8);
  
  // Duplicate arrays multiple times for seamless looping across full width
  const duplicatedFirstRow = [...firstRowCompanies, ...firstRowCompanies, ...firstRowCompanies, ...firstRowCompanies];
  const duplicatedSecondRow = [...secondRowCompanies, ...secondRowCompanies, ...secondRowCompanies, ...secondRowCompanies];
  
  // Calculate offset for extending lines to avoid covering border radius corners
  const radiusValue = borderRadius !== "0px" ? borderRadius : "0";
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Features Grid Block */}
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8`}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <div 
              key={index}
              className={`p-6 ${isDark ? "bg-[#1a1a1a] border-neutral-700 hover:border-blue-500" : "bg-white border-slate-200 hover:border-blue-200"} border hover:shadow-lg transition-all group relative`}
              style={{ borderRadius }}
            >
              <div className={`w-12 h-12 ${
                isRainbow 
                  ? "bg-gradient-to-br from-purple-100 to-pink-100" 
                  : (isDark ? "bg-neutral-700" : "bg-slate-100")
              } rounded-lg flex items-center justify-center mb-4 ${
                isDark ? "group-hover:bg-neutral-600" : "group-hover:bg-slate-200"
              } transition-colors`}>
                <Icon className={`w-6 h-6 ${
                  isRainbow 
                    ? "text-purple-600" 
                    : (isDark ? "text-white" : "text-slate-600")
                }`} />
              </div>
              <h3 className={`mb-2 ${isDark ? "text-white" : "text-slate-900"}`}><strong>{feature.title}</strong></h3>
              <p className={`${isDark ? "text-neutral-300" : "text-slate-600"}`}>
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA Block - separate from features */}
      <div 
        className={`max-w-7xl mx-auto relative mt-20 overflow-hidden border ${isDark ? "border-neutral-700" : "border-slate-200"}`}
        style={{ borderRadius }}
      >
        
        <div className={`p-12 ${isDark ? "bg-[#0d0d0d]" : "bg-white"} text-center transition-colors duration-300`}>
        
        <p className={`${isDark ? "text-neutral-300" : "text-slate-600"} text-lg mb-8 max-w-2xl mx-auto`}>
          Join thousands of developers building beautiful products with StyleX.
        </p>
        
        {/* Logo Banner */}
        <div className="relative -mx-12 overflow-hidden py-8 space-y-4">
          {/* Fade gradients on edges */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: isDark 
                ? "linear-gradient(to right, #0d0d0d 0%, transparent 100%)"
                : "linear-gradient(to right, #ffffff 0%, transparent 100%)"
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: isDark 
                ? "linear-gradient(to left, #0d0d0d 0%, transparent 100%)"
                : "linear-gradient(to left, #ffffff 0%, transparent 100%)"
            }}
          />
          
          {/* First row - scrolling left to right */}
          <div className="flex gap-6 animate-scroll px-12">
            {duplicatedFirstRow.map((company, index) => (
              <div 
                key={`first-${company.name}-${index}`}
                className={`flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full border transition-colors duration-300 ${
                  isDark
                    ? "border-neutral-700 bg-neutral-900/50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <span className={`whitespace-nowrap ${isDark ? "text-neutral-300" : "text-slate-700"}`}>
                  {company.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Second row - scrolling right to left */}
          <div className="flex gap-6 px-12" style={{ animation: 'scroll 25s linear infinite reverse' }}>
            {duplicatedSecondRow.map((company, index) => (
              <div 
                key={`second-${company.name}-${index}`}
                className={`flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full border transition-colors duration-300 ${
                  isDark
                    ? "border-neutral-700 bg-neutral-900/50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <span className={`whitespace-nowrap ${isDark ? "text-neutral-300" : "text-slate-700"}`}>
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      </div>
    </section>
  );
}