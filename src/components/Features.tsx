import { Zap, Palette, Smartphone, Code2, Moon, Package } from "lucide-react";
import { ThemeMode } from "../App";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized for performance with minimal CSS output and fast build times.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description:
      "Tailor every aspect of your design system to match your brand perfectly.",
  },
  {
    icon: Smartphone,
    title: "Responsive by Default",
    description:
      "Build responsive layouts with intuitive breakpoint utilities.",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    description:
      "Clean syntax and excellent autocomplete support in all major editors.",
  },
  {
    icon: Moon,
    title: "Dark Mode Ready",
    description: "First-class dark mode support with simple variant modifiers.",
  },
  {
    icon: Package,
    title: "Component Library",
    description:
      "Access hundreds of pre-built components to speed up development.",
  },
];

interface FeaturesProps {
  themeMode: ThemeMode;
}

export function Features({ themeMode }: FeaturesProps) {
  const isDark = themeMode === "dark";
  const isRainbow = themeMode === "rainbow";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`p-6 ${
                isDark
                  ? "bg-[#262626] border-slate-800 hover:border-blue-500"
                  : "bg-white border-slate-200 hover:border-blue-200"
              } rounded-xl border hover:shadow-lg transition-all group`}
            >
              <div
                className={`w-12 h-12 ${
                  isRainbow
                    ? "bg-gradient-to-br from-purple-100 to-pink-100"
                    : isDark
                    ? "bg-blue-950"
                    : "bg-blue-50"
                } rounded-lg flex items-center justify-center mb-4 ${
                  isDark ? "group-hover:bg-blue-900" : "group-hover:bg-blue-100"
                } transition-colors`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isRainbow ? "text-purple-600" : "text-blue-600"
                  }`}
                />
              </div>
              <h3
                className={`mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                {feature.title}
              </h3>
              <p className={`${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-20 p-12 ${
          isRainbow
            ? "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
            : isDark
            ? "bg-[#262626]"
            : "bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50"
        } rounded-2xl border ${
          isDark ? "border-slate-800" : "border-blue-100"
        } text-center transition-colors duration-300`}
      >
        <p
          className={`${
            isDark ? "text-slate-300" : "text-slate-600"
          } text-lg mb-8 max-w-2xl mx-auto`}
        >
          Join thousands of developers building beautiful products with StyleX.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className={`px-8 py-3 ${
              isRainbow
                ? "bg-gradient-to-r from-purple-600 to-pink-600"
                : "bg-blue-600"
            } text-white rounded-lg hover:opacity-90 transition-opacity`}
          >
            Get Started for Free
          </button>
          <button
            className={`px-8 py-3 ${
              isDark
                ? "bg-[#1a1a1a] text-white border-slate-800"
                : "bg-white text-slate-700 border-slate-200"
            } rounded-lg border hover:bg-opacity-90 transition-colors`}
          >
            View Examples
          </button>
        </div>
      </div>
    </section>
  );
}
