import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { ThemeMode } from "../App";
import { CodeHighlight } from "./CodeHighlight";
import stylexLogo from 'figma:asset/f40bb20ac78d73bb44934e3722111b8019f1e4d4.png';
import stylexLogoDark from 'figma:asset/ff20503b11c6d1ce94547ab2788e8abe2a29e180.png';

const initialCode = `const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  logo: {
    fontSize: '48px',
    fontWeight: 700,
  },
});

export function Logo() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.logo)}>
        StyleX
      </h1>
    </div>
  );
}`;

const transpiledCode = `export function Logo() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.logo)}>
        StyleX
      </h1>
    </div>
  );
}`;

const cssCode = `.x1 { display: flex; }
.x2 { align-items: center; }
.x3 { justify-content: center; }
.x4 { padding: 2rem; }
.x5 { font-size: 48px; }
.x6 { font-weight: 700; }`;

interface LiveCodeLogoProps {
  themeMode: ThemeMode;
}

export function LiveCodeLogo({ themeMode }: LiveCodeLogoProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [copiedTranspiled, setCopiedTranspiled] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isDark = themeMode === "dark";
  const isRainbow = themeMode === "rainbow";
  
  const borderRadius = "0.75rem"; // Always use large border radius
  
  const words = ["expressive", "type-safe", "build-time", "predictable", "atomic", "composable", "themable"];
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 0 : 2000;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting backward
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTranspiled = () => {
    navigator.clipboard.writeText(transpiledCode);
    setCopiedTranspiled(true);
    setTimeout(() => setCopiedTranspiled(false), 2000);
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Logo preview */}
        <div 
          className={`p-8 flex items-center justify-center transition-colors duration-300`} 
          style={{ 
            borderRadius: `${borderRadius} ${borderRadius} 0 0`,
            background: isDark 
              ? 'radial-gradient(ellipse 45% 50% at center, rgba(13, 13, 13, 0.98) 0%, rgba(13, 13, 13, 0.98) 60%, rgba(13, 13, 13, 0.85) 75%, rgba(13, 13, 13, 0.5) 88%, rgba(13, 13, 13, 0) 100%)'
              : 'radial-gradient(ellipse 45% 50% at center, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.98) 60%, rgba(255, 255, 255, 0.85) 75%, rgba(255, 255, 255, 0.5) 88%, rgba(255, 255, 255, 0) 100%)'
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <img 
              src={isDark ? stylexLogoDark : stylexLogo} 
              alt="StyleX Logo" 
              className="h-64 w-auto"
              style={isRainbow ? { filter: "hue-rotate(45deg) saturate(1.5)" } : {}}
            />
            
            {/* Tagline */}
            <p className={`text-lg ${isDark ? "text-neutral-400" : "text-slate-600"} text-center mb-2`}>
              The <span className="font-bold">{displayText}</span> styling system for the modern web.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <button 
                className={`px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity`}
                style={isRainbow ? {
                  background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 25%, #8b5cf6 75%, #a855f7 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 8s ease infinite",
                  border: isDark ? "1px solid #404040" : "1px solid #e2e8f0",
                  fontFamily: "var(--heading-font)"
                } : {
                  backgroundColor: "#E879F9",
                  border: isDark ? "1px solid rgba(0, 0, 0, 0.3)" : "1px solid rgba(0, 0, 0, 0.15)",
                  fontFamily: "var(--heading-font)"
                }}
              >
                Get Started
              </button>
              <button 
                className={`px-8 py-3 text-white rounded-lg hover:opacity-90 transition-colors`}
                style={isRainbow ? {
                  background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 25%, #d946ef 50%, #ec4899 75%, #f472b6 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 8s ease infinite",
                  border: isDark ? "1px solid #404040" : "1px solid #e2e8f0",
                  fontFamily: "var(--heading-font)"
                } : {
                  backgroundColor: "#6366F1",
                  border: isDark ? "1px solid rgba(0, 0, 0, 0.3)" : "1px solid rgba(0, 0, 0, 0.15)",
                  fontFamily: "var(--heading-font)"
                }}
              >
                Thinking in StyleX
              </button>
            </div>
          </div>
        </div>

        {/* Three code editors side by side */}
        <div className="grid grid-cols-3 gap-0">
          {/* JS Code editor */}
          <div 
            className={`overflow-hidden ${isDark ? "bg-[#1a1a1a]" : "bg-white"} transition-colors duration-300 border ${isDark ? "border-neutral-700" : "border-slate-200"}`} 
            style={{ borderRadius: `0 0 0 ${borderRadius}` }}
          >
            {/* Editor header */}
            <div className={`flex items-center justify-between px-4 py-3 ${isDark ? "bg-[#2a2a2a]" : "bg-neutral-200 border-x border-neutral-300"} border-b ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className={`text-sm ${isDark ? "text-neutral-400" : "text-slate-600"}`} style={{ fontFamily: "var(--accent-font)" }}>Define styles</span>
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

            {/* Code editor area */}
            <div className="relative">
              {/* Line numbers */}
              <div className={`absolute left-0 top-0 p-4 ${isDark ? "text-neutral-500" : "text-slate-500"} font-mono text-sm pointer-events-none select-none leading-6`}>
                {code.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              {/* Syntax highlighted code overlay */}
              <div className={`absolute left-0 top-0 pl-12 pr-4 py-4 pointer-events-none ${isDark ? "text-neutral-50" : "text-slate-50"}`}>
                <CodeHighlight code={code} isDark={isDark} />
              </div>
              
              {/* Invisible textarea for editing */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full h-80 pl-12 pr-4 py-4 ${isDark ? "bg-[#1a1a1a]" : "bg-slate-900"} font-mono text-sm resize-none focus:outline-none leading-6 caret-white`}
                spellCheck={false}
                style={{ tabSize: 2, color: 'transparent' }}
              />
            </div>
          </div>

          {/* Transpiled code editor */}
          <div 
            className={`overflow-hidden ${isDark ? "bg-[#1a1a1a]" : "bg-white"} transition-colors duration-300 border ${isDark ? "border-neutral-700" : "border-slate-200"}`}
          >
            {/* Editor header */}
            <div className={`flex items-center justify-between px-4 py-3 ${isDark ? "bg-[#2a2a2a]" : "bg-neutral-200 border-x border-neutral-300"} border-b ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className={`text-sm ${isDark ? "text-neutral-400" : "text-slate-600"}`} style={{ fontFamily: "var(--accent-font)" }}>Use styles</span>
              </div>
              <button 
                onClick={handleCopyTranspiled}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDark ? "text-neutral-300 hover:text-white hover:bg-neutral-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"} rounded-lg transition-colors`}
              >
                {copiedTranspiled ? (
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

            {/* Code editor area */}
            <div className="relative">
              {/* Line numbers */}
              <div className={`absolute left-0 top-0 p-4 ${isDark ? "text-neutral-500" : "text-slate-500"} font-mono text-sm pointer-events-none select-none leading-6`}>
                {transpiledCode.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              {/* Syntax highlighted code overlay */}
              <div className={`absolute left-0 top-0 pl-12 pr-4 py-4 pointer-events-none ${isDark ? "text-neutral-50" : "text-slate-50"}`}>
                <CodeHighlight code={transpiledCode} isDark={isDark} />
              </div>
              
              {/* Read-only div */}
              <div className={`w-full h-80 pl-12 pr-4 py-4 ${isDark ? "bg-[#1a1a1a]" : "bg-slate-900"} font-mono text-sm overflow-auto`}>
                <div style={{ opacity: 0 }}>
                  <CodeHighlight code={transpiledCode} isDark={isDark} />
                </div>
              </div>
            </div>
          </div>

          {/* CSS code editor */}
          <div 
            className={`overflow-hidden ${isDark ? "bg-[#1a1a1a]" : "bg-white"} transition-colors duration-300 border ${isDark ? "border-neutral-700" : "border-slate-200"}`} 
            style={{ borderRadius: `0 0 ${borderRadius} 0` }}
          >
            {/* Editor header */}
            <div className={`flex items-center justify-between px-4 py-3 ${isDark ? "bg-[#2a2a2a]" : "bg-neutral-200 border-x border-neutral-300"} border-b ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className={`text-sm ${isDark ? "text-neutral-400" : "text-slate-600"}`} style={{ fontFamily: "var(--accent-font)" }}>styles.css</span>
              </div>
              <button 
                onClick={handleCopyCSS}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm ${isDark ? "text-neutral-300 hover:text-white hover:bg-neutral-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"} rounded-lg transition-colors`}
              >
                {copiedCSS ? (
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

            {/* Code editor area */}
            <div className="relative">
              {/* Line numbers */}
              <div className={`absolute left-0 top-0 p-4 ${isDark ? "text-neutral-500" : "text-slate-500"} font-mono text-sm pointer-events-none select-none leading-6`}>
                {cssCode.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              {/* Syntax highlighted code overlay */}
              <div className={`absolute left-0 top-0 pl-12 pr-4 py-4 pointer-events-none ${isDark ? "text-neutral-50" : "text-slate-50"}`}>
                <CodeHighlight code={cssCode} isDark={isDark} />
              </div>
              
              {/* Read-only div */}
              <div className={`w-full h-80 pl-12 pr-4 py-4 ${isDark ? "bg-[#1a1a1a]" : "bg-slate-900"} font-mono text-sm overflow-auto`}>
                <div style={{ opacity: 0 }}>
                  <CodeHighlight code={cssCode} isDark={isDark} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}