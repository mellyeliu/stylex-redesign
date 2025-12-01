import { useState, useEffect } from "react";
import { ThemeMode } from "../App";

interface AnimationsPreviewProps {
  themeMode: ThemeMode;
  bodyFont: string;
  headingFont: string;
}

const animations = [
  {
    name: "linear",
    easing: "linear",
    color: "#0EA5E9",
    curve: "M 10 90 L 90 10",
  },
  {
    name: "ease-out",
    easing: "cubic-bezier(0, 0, 0.2, 1)",
    color: "#A855F7",
    curve: "M 10 90 Q 10 10, 90 10",
  },
  {
    name: "ease-in-out",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    color: "#EC4899",
    curve: "M 10 90 Q 10 50, 50 50 Q 90 50, 90 10",
  },
  {
    name: "ease-in",
    easing: "cubic-bezier(0.4, 0, 1, 1)",
    color: "#6366F1",
    curve: "M 10 90 Q 90 90, 90 10",
  },
];

export function AnimationsPreview({ themeMode, bodyFont, headingFont }: AnimationsPreviewProps) {
  const isDark = themeMode === "dark";
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation on mount
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);

    // Repeat animation every 3 seconds
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsAnimating(true);
      }, 100);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      className="p-8 flex items-center justify-center"
      style={{ 
        backgroundColor: isDark ? '#1a1a1a' : '#f8fafc',
        transition: 'background-color 0.3s ease',
        fontFamily: bodyFont,
      }}
    >
      <div className="w-full max-w-2xl space-y-6">
        {animations.map((anim) => (
          <div key={anim.name} className="flex items-center gap-6">
            {/* Curve visualization */}
            <div 
              className="flex-shrink-0 w-16 h-16 rounded flex items-center justify-center"
              style={{
                border: `1px solid ${isDark ? '#404040' : '#e2e8f0'}`,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 100 100">
                <path
                  d={anim.curve}
                  fill="none"
                  stroke={anim.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Animation name and track */}
            <div className="flex-1">
              <div 
                className="mb-2 text-sm"
                style={{ 
                  color: isDark ? '#d4d4d4' : '#475569',
                  fontFamily: bodyFont,
                }}
              >
                {anim.name}
              </div>
              
              {/* Track - thin line */}
              <div 
                className="relative h-12 rounded overflow-hidden"
                style={{
                  border: `1px solid ${isDark ? '#404040' : '#e2e8f0'}`,
                }}
              >
                {/* Animated box */}
                <div
                  className="absolute top-1/2 rounded"
                  style={{
                    width: '48px',
                    height: '32px',
                    backgroundColor: anim.color,
                    transform: isAnimating 
                      ? 'translate(calc(100% + 320px), -50%)' 
                      : 'translate(4px, -50%)',
                    transition: isAnimating 
                      ? `transform 2s ${anim.easing}`
                      : 'none',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}