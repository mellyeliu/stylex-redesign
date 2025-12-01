import { Header } from "./components/Header";
import { LiveCodeLogo } from "./components/LiveCodeLogo";
import { ScrollFeatures } from "./components/ScrollFeatures";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { SolarBackground } from "./components/SolarBackground";
import { useState } from "react";

export type ThemeMode = "light" | "dark" | "rainbow";
export type FontFamily = 
  | "share-tech" 
  | "roboto-mono" 
  | "fira-code" 
  | "jetbrains" 
  | "source-code" 
  | "space-mono" 
  | "b612" 
  | "ibm-plex" 
  | "inter" 
  | "instrument-sans" 
  | "manrope" 
  | "dm-sans" 
  | "dm-mono"
  | "jakarta" 
  | "sora"
  | "syne-mono"
  | "xanh-mono";

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [accentFont, setAccentFont] = useState<FontFamily>("share-tech");

  const isDark = themeMode === "dark";

  const cycleAccentFont = () => {
    const fonts: FontFamily[] = ["share-tech", "roboto-mono", "fira-code", "jetbrains", "source-code", "space-mono", "b612", "ibm-plex", "inter", "instrument-sans", "manrope", "dm-sans", "dm-mono", "jakarta", "sora", "syne-mono", "xanh-mono"];
    const currentIndex = fonts.indexOf(accentFont);
    const nextIndex = (currentIndex + 1) % fonts.length;
    setAccentFont(fonts[nextIndex]);
  };

  const getAccentFontFamily = () => {
    switch (accentFont) {
      case "share-tech":
        return "'Share Tech Mono', monospace";
      case "roboto-mono":
        return "'Roboto Mono', monospace";
      case "fira-code":
        return "'Fira Code', monospace";
      case "jetbrains":
        return "'JetBrains Mono', monospace";
      case "source-code":
        return "'Source Code Pro', monospace";
      case "space-mono":
        return "'Space Mono', monospace";
      case "b612":
        return "'B612 Mono', monospace";
      case "ibm-plex":
        return "'IBM Plex Mono', monospace";
      case "inter":
        return "'Inter', monospace";
      case "instrument-sans":
        return "'Instrument Sans', sans-serif";
      case "manrope":
        return "'Manrope', sans-serif";
      case "dm-sans":
        return "'DM Sans', sans-serif";
      case "dm-mono":
        return "'DM Mono', monospace";
      case "jakarta":
        return "'Plus Jakarta Sans', sans-serif";
      case "sora":
        return "'Sora', sans-serif";
      case "syne-mono":
        return "'Syne Mono', monospace";
      case "xanh-mono":
        return "'Xanh Mono', monospace";
      default:
        return "'Share Tech Mono', monospace";
    }
  };

  const getFontDisplayName = (font: FontFamily) => {
    switch (font) {
      case "share-tech":
        return "Share Tech Mono";
      case "roboto-mono":
        return "Roboto Mono";
      case "fira-code":
        return "Fira Code";
      case "jetbrains":
        return "JetBrains Mono";
      case "source-code":
        return "Source Code Pro";
      case "space-mono":
        return "Space Mono";
      case "b612":
        return "B612 Mono";
      case "ibm-plex":
        return "IBM Plex Mono";
      case "inter":
        return "Inter";
      case "instrument-sans":
        return "Instrument Sans";
      case "manrope":
        return "Manrope";
      case "dm-sans":
        return "DM Sans";
      case "dm-mono":
        return "DM Mono";
      case "jakarta":
        return "Plus Jakarta Sans";
      case "sora":
        return "Sora";
      case "syne-mono":
        return "Syne Mono";
      case "xanh-mono":
        return "Xanh Mono";
      default:
        return "Share Tech Mono";
    }
  };

  const isSansSerif = (font: FontFamily) => {
    return ["inter", "instrument-sans", "manrope", "dm-sans", "jakarta", "sora"].includes(font);
  };

  const getFontSize = () => {
    // Reduce size for sans serif fonts
    const bodyIsSans = isSansSerif(accentFont);
    
    if (bodyIsSans) {
      return "14.4px"; // 90% of 16px
    }
    return "16px";
  };

  return (
    <div 
      className={`min-h-screen ${isDark ? "bg-[#0d0d0d]" : "bg-white"} ${isDark ? "dark" : ""} overflow-x-hidden`} 
      style={{ 
        fontFamily: "'Instrument Sans', sans-serif",
        // Make bold text bolder with Share Tech Mono
        '--font-weight-bold': accentFont === 'share-tech' ? '900' : '700',
        '--font-weight-semibold': accentFont === 'share-tech' ? '800' : '600',
        '--font-weight-medium': accentFont === 'share-tech' ? '700' : '500',
        '--accent-font': getAccentFontFamily(),
        '--font-size': getFontSize(),
      } as React.CSSProperties}
    >
      {/* Solar background */}
      <SolarBackground themeMode={themeMode} />
      
      <div className="relative z-10">
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        
        {/* Padding to prevent content from being hidden under fixed header */}
        <div className="h-16" />
        
        {/* Font family toggle button */}
        <button
          onClick={cycleAccentFont}
          className={`fixed bottom-8 left-8 z-50 px-4 py-2 rounded-lg text-sm transition-all ${isDark ? "bg-neutral-800 text-white hover:bg-neutral-700" : "bg-slate-100 text-slate-900 hover:bg-slate-200"} shadow-lg`}
        >
          Font: {getFontDisplayName(accentFont)}
        </button>
        
        <LiveCodeLogo themeMode={themeMode} />
        <ScrollFeatures themeMode={themeMode} bodyFont={getAccentFontFamily()} />
        <Features themeMode={themeMode} />
        <Footer themeMode={themeMode} />
      </div>
    </div>
  );
}