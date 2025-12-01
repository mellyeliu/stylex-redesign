import { Menu, Github, Sun, Moon, Sparkles } from "lucide-react";
import { ThemeMode } from "../App";
import stylexLogoSmall from 'figma:asset/0e4abf0dceb10c3592f1f6e9e367f6ecba656c92.png';
import stylexLogoDark from 'figma:asset/1e913e5352222e08fe5a30438eff3515723408cb.png';

interface HeaderProps {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export function Header({ themeMode, setThemeMode }: HeaderProps) {
  const isDark = themeMode === "dark";
  const isRainbow = themeMode === "rainbow";

  const cycleTheme = () => {
    if (themeMode === "light") setThemeMode("dark");
    else if (themeMode === "dark") setThemeMode("rainbow");
    else setThemeMode("light");
  };

  const getLogoStyle = () => {
    if (isRainbow) {
      return {
        background: "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      };
    }
    return {};
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] ${isDark ? "bg-neutral-900" : "bg-white"} backdrop-blur-md border-b ${isDark ? "border-neutral-700" : "border-slate-200"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-16">
            <img 
              src={isDark ? stylexLogoDark : stylexLogoSmall} 
              alt="StyleX" 
              className="h-6 w-auto"
              style={isRainbow ? { filter: "hue-rotate(45deg) saturate(1.5)" } : {}}
            />
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className={`${isDark ? "text-white hover:text-neutral-300" : "text-slate-600 hover:text-slate-900"} transition-colors`} style={{ fontFamily: "var(--heading-font)", fontWeight: 400 }}>Learn</a>
              <a href="#" className={`${isDark ? "text-white hover:text-neutral-300" : "text-slate-600 hover:text-slate-900"} transition-colors`} style={{ fontFamily: "var(--heading-font)", fontWeight: 400 }}>API</a>
              <a href="#" className={`${isDark ? "text-white hover:text-neutral-300" : "text-slate-600 hover:text-slate-900"} transition-colors`} style={{ fontFamily: "var(--heading-font)", fontWeight: 400 }}>Playground</a>
              <a href="#" className={`${isDark ? "text-white hover:text-neutral-300" : "text-slate-600 hover:text-slate-900"} transition-colors`} style={{ fontFamily: "var(--heading-font)", fontWeight: 400 }}>Blog</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-2 ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-slate-50 border-slate-200"} border rounded-lg transition-colors`}>
              <svg className={`w-4 h-4 ${isDark ? "text-neutral-400" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className={`text-sm bg-transparent outline-none w-32 ${isDark ? "text-white placeholder-neutral-500" : "text-slate-900 placeholder-slate-400"}`}
              />
            </div>
            
            {/* Theme Toggle Dropdown */}
            <div className={`flex items-center gap-1 p-1 ${isDark ? "bg-neutral-800" : "bg-slate-100"} rounded-lg`}>
              <button
                onClick={() => setThemeMode("light")}
                className={`p-2 rounded transition-colors ${themeMode === "light" ? (isDark ? "bg-neutral-700" : "bg-white shadow-sm") : isDark ? "hover:bg-neutral-700" : "hover:bg-slate-200"}`}
                title="Light mode"
              >
                <Sun className={`w-4 h-4 ${themeMode === "light" ? "text-slate-900" : isDark ? "text-neutral-400" : "text-slate-500"}`} />
              </button>
              <button
                onClick={() => setThemeMode("dark")}
                className={`p-2 rounded transition-colors ${themeMode === "dark" ? "bg-neutral-700 shadow-sm" : isDark ? "hover:bg-neutral-700" : "hover:bg-slate-200"}`}
                title="Dark mode"
              >
                <Moon className={`w-4 h-4 ${themeMode === "dark" ? "text-white" : isDark ? "text-neutral-400" : "text-slate-500"}`} />
              </button>
              <button
                onClick={() => setThemeMode("rainbow")}
                className={`p-2 rounded transition-colors ${themeMode === "rainbow" ? (isDark ? "bg-neutral-700" : "bg-white shadow-sm") : isDark ? "hover:bg-neutral-700" : "hover:bg-slate-200"}`}
                title="Rainbow mode"
              >
                <Sparkles className={`w-4 h-4 ${themeMode === "rainbow" ? "text-purple-600" : isDark ? "text-neutral-400" : "text-slate-500"}`} />
              </button>
            </div>
            <a 
              href="#" 
              className={`hidden sm:flex items-center gap-2 ${isDark ? "text-neutral-400 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`}
            >
              <Github className="w-5 h-5" />
            </a>
            <button className={`md:hidden p-2 ${isDark ? "hover:bg-neutral-800" : "hover:bg-slate-100"} rounded-lg transition-colors`}>
              <Menu className={`w-5 h-5 ${isDark ? "text-neutral-400" : "text-slate-600"}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}