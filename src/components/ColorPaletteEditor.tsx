import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { ThemeMode } from "../App";

const initialCode = `import stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  primary: {
    mint: '#C7FFED',
    steel: '#BBC8CA',
    mauve: '#B592A0',
    rose: '#9C7178',
  }
});

// Usage example
const styles = stylex.create({
  button: {
    backgroundColor: colors.primary.mint,
    color: '#0f172a',
  }
});`;

const primaryColors = [
  {
    name: "Mint",
    hex: "#C7FFED",
    rgb: "199 / 255 / 237",
    cmyk: "22 / 0 / 7 / 0",
  },
  {
    name: "Steel",
    hex: "#BBC8CA",
    rgb: "187 / 200 / 202",
    cmyk: "7 / 1 / 0 / 21",
  },
  {
    name: "Mauve",
    hex: "#B592A0",
    rgb: "181 / 146 / 160",
    cmyk: "0 / 19 / 12 / 29",
  },
  {
    name: "Rose",
    hex: "#9C7178",
    rgb: "156 / 113 / 120",
    cmyk: "0 / 28 / 23 / 39",
  },
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
        "#C7FFED": "linear-gradient(135deg, #a1ffce 0%, #faffd1 100%)",
        "#BBC8CA": "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        "#B592A0": "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
        "#9C7178": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      };
      return { background: gradientMap[hex] || hex };
    }
    return { backgroundColor: hex };
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div
          className={`border ${
            isDark ? "border-slate-800" : "border-slate-200"
          } rounded-xl overflow-hidden ${
            isDark ? "bg-[#262626]" : "bg-white"
          } shadow-xl transition-colors duration-300`}
        >
          {/* Code Editor */}
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
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                colors.stylex.ts
              </span>
            </div>
            <button
              onClick={handleCopyCode}
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
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="grid lg:grid-cols-2">
            {/* Code editor */}
            <div className="relative border-r border-slate-200">
              <div className="absolute left-0 top-0 p-4 text-slate-500 font-mono text-sm pointer-events-none select-none leading-6">
                {code.split("\n").map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[500px] pl-12 pr-4 py-4 bg-slate-900 text-slate-50 font-mono text-sm resize-none focus:outline-none leading-6"
                spellCheck={false}
                style={{ tabSize: 2 }}
              />
            </div>

            {/* Output Preview - Color Palette on white background */}
            <div className="p-8 bg-white">
              <div className="grid grid-cols-2 gap-3">
                {primaryColors.map((color) => {
                  const isDarkColor = false; // Set all text to dark/black
                  return (
                    <button
                      key={color.name}
                      onClick={() => handleCopyColor(color.hex)}
                      className="relative p-4 rounded-2xl hover:scale-105 transition-transform cursor-pointer group"
                      style={{
                        ...getColorStyle(color.hex),
                        minHeight: "160px",
                        border: "1px solid rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      {copiedColor === color.hex && (
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-lg">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      )}
                      <div className={`absolute top-4 left-4 text-slate-900`}>
                        <div className="text-sm mb-1 font-semibold">
                          {color.name}
                        </div>
                      </div>
                      <div
                        className={`absolute bottom-4 left-4 right-4 text-slate-900 text-xs space-y-1 text-right`}
                      >
                        <div
                          style={{
                            borderTop: "1px solid rgba(0, 0, 0, 0.15)",
                          }}
                          className="pt-2"
                        />
                        <div className="opacity-90">{color.hex}</div>
                        <div
                          style={{
                            borderTop: "1px solid rgba(0, 0, 0, 0.15)",
                          }}
                          className="pt-1"
                        />
                        <div className="opacity-80">RGB: {color.rgb}</div>
                        <div
                          style={{
                            borderTop: "1px solid rgba(0, 0, 0, 0.15)",
                          }}
                          className="pt-1"
                        />
                        <div className="opacity-80">CMYK: {color.cmyk}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="text-center mt-6">
                <p className="text-xs text-slate-500">
                  Click any color to copy its hex value
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
