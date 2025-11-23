import { Menu, Github, Sun, Moon, Sparkles } from "lucide-react";
import { ThemeMode } from "../App";
import stylexLogoSmall from "figma:asset/stylex-logo-small.svg";

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
        background:
          "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      };
    }
    return {};
  };

  return (
    <header
      className={`sticky top-0 z-50 ${
        isDark ? "bg-[#1a1a1a]/80" : "bg-white/80"
      } backdrop-blur-md border-b ${
        isDark ? "border-slate-800" : "border-slate-200"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img
              src={stylexLogoSmall}
              alt="StyleX"
              className="h-6 w-auto opacity-100"
              style={
                isRainbow ? { filter: "hue-rotate(45deg) saturate(1.5)" } : {}
              }
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className={`${
                isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              } transition-colors`}
            >
              Documentation
            </a>
            <a
              href="#"
              className={`${
                isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              } transition-colors`}
            >
              Examples
            </a>
            <a
              href="#"
              className={`${
                isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              } transition-colors`}
            >
              Playground
            </a>
            <a
              href="#"
              className={`${
                isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              } transition-colors`}
            >
              Blog
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Dropdown */}
            <div
              className={`flex items-center gap-1 p-1 ${
                isDark ? "bg-slate-800" : "bg-slate-100"
              } rounded-lg`}
            >
              <button
                onClick={() => setThemeMode("light")}
                className={`p-2 rounded transition-colors ${
                  themeMode === "light"
                    ? isDark
                      ? "bg-slate-700"
                      : "bg-white shadow-sm"
                    : "hover:bg-slate-200"
                }`}
                title="Light mode"
              >
                <Sun
                  className={`w-4 h-4 ${
                    themeMode === "light"
                      ? "text-slate-900"
                      : isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                />
              </button>
              <button
                onClick={() => setThemeMode("dark")}
                className={`p-2 rounded transition-colors ${
                  themeMode === "dark"
                    ? "bg-slate-700 shadow-sm"
                    : isDark
                    ? "hover:bg-slate-700"
                    : "hover:bg-slate-200"
                }`}
                title="Dark mode"
              >
                <Moon
                  className={`w-4 h-4 ${
                    themeMode === "dark"
                      ? "text-white"
                      : isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                />
              </button>
              <button
                onClick={() => setThemeMode("rainbow")}
                className={`p-2 rounded transition-colors ${
                  themeMode === "rainbow"
                    ? isDark
                      ? "bg-slate-700"
                      : "bg-white shadow-sm"
                    : isDark
                    ? "hover:bg-slate-700"
                    : "hover:bg-slate-200"
                }`}
                title="Rainbow mode"
              >
                <Sparkles
                  className={`w-4 h-4 ${
                    themeMode === "rainbow"
                      ? "text-purple-600"
                      : isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                />
              </button>
            </div>
            <a
              href="#"
              className={`hidden sm:flex items-center gap-2 ${
                isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              } transition-colors`}
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              className={`md:hidden p-2 ${
                isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"
              } rounded-lg transition-colors`}
            >
              <Menu
                className={`w-5 h-5 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
