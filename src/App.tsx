import { Header } from "./components/Header";
import { LiveCodeLogo } from "./components/LiveCodeLogo";
import { ColorPaletteEditor } from "./components/ColorPaletteEditor";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { useState } from "react";

export type ThemeMode = "light" | "dark" | "rainbow";

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const getBackgroundClass = () => {
    if (themeMode === "dark") return "bg-[#1a1a1a]";
    if (themeMode === "rainbow") return "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50";
    return "bg-white";
  };

  const getTextClass = () => {
    return themeMode === "dark" ? "text-white" : "text-slate-900";
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} relative transition-colors duration-300`}>
      {/* Grid overlay */}
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, ${themeMode === "dark" ? "rgb(71 85 105 / 0.2)" : "rgb(226 232 240 / 0.3)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${themeMode === "dark" ? "rgb(71 85 105 / 0.2)" : "rgb(226 232 240 / 0.3)"} 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10">
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        <LiveCodeLogo themeMode={themeMode} />
        <ColorPaletteEditor themeMode={themeMode} />
        <Features themeMode={themeMode} />
        <Footer themeMode={themeMode} />
      </div>
    </div>
  );
}