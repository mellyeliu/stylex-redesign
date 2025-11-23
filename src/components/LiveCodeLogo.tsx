import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ThemeMode } from "../App";
import stylexLogo from "figma:asset/f40bb20ac78d73bb44934e3722111b8019f1e4d4.png";

const initialCode = `import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  logo: {
    fontSize: '48px',
    fontWeight: 700,
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  accent: {
    color: '#3b82f6',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
  }
});

export function Logo() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.logo)}>
        Style<span {...stylex.props(styles.accent)}>X</span>
      </h1>
    </div>
  );
}`;

interface LiveCodeLogoProps {
  themeMode: ThemeMode;
}

export function LiveCodeLogo({ themeMode }: LiveCodeLogoProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = themeMode === "dark";
  const isRainbow = themeMode === "rainbow";

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
    if (isDark) {
      return { color: "#ffffff" };
    }
    return { color: "#0f172a" };
  };

  const getAccentStyle = () => {
    if (isRainbow) {
      return {
        background: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      };
    }
    return { color: "#3b82f6" };
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Logo Preview - sits on top */}
        <div
          className={`p-12 rounded-t-xl border ${
            isDark ? "border-slate-800" : "border-slate-200"
          } border-b-0 transition-colors duration-300 relative overflow-hidden`}
        >
          {/* Center radial gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
            }}
          />
          <div className="text-center relative z-10">
            <div className="inline-block mb-8">
              <img src={stylexLogo} alt="StyleX Logo" className="h-20" />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3 bg-[#E879F9] text-white rounded-lg hover:opacity-90 transition-opacity border border-[#2a2a2a]">
                Get Started
              </button>
              <button className="px-8 py-3 bg-[#6366F1] text-white rounded-lg hover:opacity-90 transition-colors border border-[#2a2a2a]">
                Thinking in StyleX
              </button>
            </div>
          </div>
        </div>

        {/* Code editor */}
        <div
          className={`border ${
            isDark ? "border-slate-800" : "border-slate-200"
          } rounded-b-xl overflow-hidden ${
            isDark ? "bg-[#262626]" : "bg-white"
          } shadow-xl transition-colors duration-300`}
        >
          {/* Editor header */}
          <div
            className={`flex items-center justify-between px-4 py-3 ${
              isDark ? "bg-[#1a1a1a]" : "bg-slate-50"
            } border-b ${isDark ? "border-slate-800" : "border-slate-200"}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span
                className={`text-sm font-semibold ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Logo.tsx
              </span>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
                isDark
                  ? "text-slate-300 hover:text-white hover:bg-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              } rounded-lg transition-colors`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy code
                </>
              )}
            </button>
          </div>

          {/* Code editor area */}
          <div className="relative">
            <div className="absolute left-0 top-0 p-4 text-slate-500 font-mono text-sm pointer-events-none select-none leading-6">
              {code.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 pl-12 pr-4 py-4 bg-slate-900 text-slate-50 font-mono text-sm resize-none focus:outline-none leading-6"
              spellCheck={false}
              style={{ tabSize: 2 }}
            />
          </div>
        </div>

        <div className="mt-8 text-center"></div>
      </div>
    </section>
  );
}
