import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ThemeMode } from "../App";

const initialCode = `import stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  primary: {
    blue: '#60A5FA',
    indigo: '#818CF8',
    purple: '#C084FC',
    fuchsia: '#F0ABFC',
    pink: '#F472B6',
    rose: '#FB7185',
  }
});

// Usage example
const styles = stylex.create({
  button: {
    backgroundColor: colors.primary.blue,
    color: '#ffffff',
  }
});`;

const primaryColors = [
  { name: "Blue", hex: "#60A5FA", rgb: "96 / 165 / 250", cmyk: "62 / 34 / 0 / 2" },
  { name: "Indigo", hex: "#818CF8", rgb: "129 / 140 / 248", cmyk: "48 / 44 / 0 / 3" },
  { name: "Purple", hex: "#C084FC", rgb: "192 / 132 / 252", cmyk: "24 / 48 / 0 / 1" },
  { name: "Fuchsia", hex: "#F0ABFC", rgb: "240 / 171 / 252", cmyk: "5 / 32 / 0 / 1" },
  { name: "Pink", hex: "#F472B6", rgb: "244 / 114 / 182", cmyk: "0 / 53 / 25 / 4" },
  { name: "Rose", hex: "#FB7185", rgb: "251 / 113 / 133", cmyk: "0 / 55 / 47 / 2" },
];

interface ColorPaletteEditorProps {
  themeMode: ThemeMode;
}

export function ColorPaletteEditor({ themeMode }: ColorPaletteEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const isDark = themeMode === "dark";
  const isRainbow = themeMode === "rainbow";

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto relative">
        {/* Decorative vertical lines at block edges */}
        <div className={`absolute left-0 top-0 bottom-0 ${isDark ? "bg-neutral-700" : "bg-slate-200"}`} style={{ height: '200vh', top: '-50vh', width: '1px' }} />
        <div className={`absolute right-0 top-0 bottom-0 ${isDark ? "bg-neutral-700" : "bg-slate-200"}`} style={{ height: '200vh', top: '-50vh', width: '1px' }} />
        
        {/* Decorative horizontal lines at block start/end */}
        <div className={`absolute ${isDark ? "bg-neutral-700" : "bg-slate-200"}`} style={{ top: 0, width: '200vw', left: '-50vw', height: '1px' }} />
        <div className={`absolute ${isDark ? "bg-neutral-700" : "bg-slate-200"}`} style={{ bottom: 0, width: '200vw', left: '-50vw', height: '1px' }} />
        
        <div className={`border ${isDark ? "border-neutral-800" : "border-slate-200"} overflow-hidden ${isDark ? "bg-[#1a1a1a]" : "bg-white"} transition-colors duration-300`} style={{ border: 'var(--block-border)' }}>
          {/* Code Editor */}
          <div className={`flex items-center justify-between px-4 py-3 ${isDark ? "bg-[#2a2a2a]" : "bg-neutral-200 border-x border-neutral-300"} border-b ${isDark ? "border-neutral-700" : "border-neutral-300"}`}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className={`text-sm ${isDark ? "text-neutral-400" : "text-slate-600"}`}>colors.stylex.ts</span>
            </div>
            <button 
              onClick={handleCopyCode}
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

          <div className="grid lg:grid-cols-2">
            {/* Code editor */}
            <div className={`relative border-r ${isDark ? "border-neutral-800" : "border-slate-200"}`}>
              <div className={`absolute left-0 top-0 p-4 ${isDark ? "text-neutral-500" : "text-slate-500"} font-mono text-sm pointer-events-none select-none leading-6`}>
                {code.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full h-64 pl-12 pr-4 py-4 ${isDark ? "bg-[#1a1a1a]" : "bg-slate-900"} ${isDark ? "text-neutral-50" : "text-slate-50"} font-mono text-sm resize-none focus:outline-none leading-6`}
                spellCheck={false}
                style={{ tabSize: 2 }}
              />
            </div>

            {/* Output Preview - Color Palette on white background */}
            <div className="p-8 bg-white flex items-center">
              <div className="grid grid-cols-3 gap-3 w-full">
                {primaryColors.map((color) => {
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleCopyColor(color.hex)}
                      className="relative p-4 rounded-2xl hover:scale-105 transition-transform cursor-pointer group"
                      style={{
                        ...getColorStyle(color.hex),
                        minHeight: '160px',
                        border: '0.5px solid #000000',
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
                        <div className="text-sm mb-1" style={{ fontWeight: 700 }}>{color.name}</div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-slate-900 text-xs space-y-1 text-right">
                        <div style={{ borderTop: '0.5px solid #000000', opacity: 0.3 }} className="pt-2" />
                        <div className="opacity-90">
                          {color.hex}
                        </div>
                        <div style={{ borderTop: '0.5px solid #000000', opacity: 0.2 }} className="pt-1" />
                        <div className="opacity-80">RGB: {color.rgb}</div>
                        <div style={{ borderTop: '0.5px solid #000000', opacity: 0.2 }} className="pt-1" />
                        <div className="opacity-80">CMYK: {color.cmyk}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}