import { useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";

interface ResponsivePreviewProps {
  isDark: boolean;
  isRainbow: boolean;
  bodyFont: string;
  headingFont: string;
}

export function ResponsivePreview({ isDark, isRainbow, bodyFont, headingFont }: ResponsivePreviewProps) {
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const viewportSizes = {
    desktop: { width: '100%', widthPx: 1200, label: 'Desktop', icon: Monitor },
    tablet: { width: '600px', widthPx: 600, label: 'Tablet', icon: Tablet },
    mobile: { width: '375px', widthPx: 375, label: 'Mobile', icon: Smartphone },
  };

  const gridColumns = {
    desktop: 3,
    tablet: 2,
    mobile: 1,
  };

  const padding = {
    desktop: '32px 16px',
    tablet: '24px 12px',
    mobile: '16px 8px',
  };

  const getCardStyle = (index: number) => {
    const colors = ['#60A5FA', '#818CF8', '#C084FC', '#F0ABFC', '#F472B6', '#FB7185'];
    const color = colors[index % colors.length];
    
    if (isRainbow) {
      const gradientMap: Record<string, string> = {
        "#60A5FA": "linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)",
        "#818CF8": "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)",
        "#C084FC": "linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #d8b4fe 100%)",
        "#F0ABFC": "linear-gradient(135deg, #e879f9 0%, #f0abfc 50%, #f5d0fe 100%)",
        "#F472B6": "linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #f9a8d4 100%)",
        "#FB7185": "linear-gradient(135deg, #f43f5e 0%, #fb7185 50%, #fda4af 100%)",
      };
      return {
        background: gradientMap[color] || color,
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 8s ease infinite',
      };
    }
    return { backgroundColor: color };
  };

  return (
    <div 
      className="p-4 flex flex-col items-center overflow-hidden justify-center"
      style={{ 
        backgroundColor: isDark ? '#1a1a1a' : '#f8fafc',
        minHeight: '500px',
        maxHeight: '500px',
      }}
    >
      {/* Viewport selector */}
      <div 
        className="flex gap-2 mb-3 p-1 rounded-lg"
        style={{
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          border: `1px solid ${isDark ? '#404040' : '#e2e8f0'}`,
        }}
      >
        {(Object.keys(viewportSizes) as Array<keyof typeof viewportSizes>).map((size) => {
          const SizeIcon = viewportSizes[size].icon;
          return (
            <button
              key={size}
              onClick={() => setViewportSize(size)}
              className="flex items-center gap-2 px-4 py-2 rounded transition-all text-sm"
              style={{
                backgroundColor: viewportSize === size 
                  ? (isDark ? '#404040' : '#f1f5f9')
                  : 'transparent',
                color: isDark ? '#ffffff' : '#0f172a',
              }}
            >
              <SizeIcon className="w-4 h-4" />
              {viewportSizes[size].label}
            </button>
          );
        })}
      </div>

      {/* Ruler and container wrapper */}
      <div className="relative w-full flex flex-col items-center transition-all duration-500 ease-in-out">
        {/* Top ruler - width dimension */}
        <div 
          className="mb-2 flex items-center justify-center transition-all duration-500 ease-in-out"
          style={{
            maxWidth: viewportSize === 'desktop' ? '100%' : viewportSizes[viewportSize].width,
            width: '100%',
            opacity: viewportSize === 'desktop' ? 0 : 1,
            height: viewportSize === 'desktop' ? 0 : 'auto',
          }}
        >
          <div className="relative w-full flex items-center">
            {/* Left cap */}
            <div 
              className="transition-all duration-500"
              style={{ 
                width: '1px', 
                height: '8px', 
                backgroundColor: isDark ? '#666' : '#94a3b8' 
              }} 
            />
            {/* Line */}
            <div 
              className="flex-1 relative transition-all duration-500"
              style={{ 
                height: '1px', 
                backgroundColor: isDark ? '#666' : '#94a3b8' 
              }}
            >
              {/* Width label */}
              <div 
                className="absolute top-[-18px] left-1/2 transform -translate-x-1/2 px-2 rounded text-xs whitespace-nowrap transition-all duration-500"
                style={{ 
                  backgroundColor: isDark ? '#0f0f0f' : '#f8fafc',
                  color: isDark ? '#999' : '#64748b',
                }}
              >
                {viewportSizes[viewportSize].widthPx}px
              </div>
            </div>
            {/* Right cap */}
            <div 
              className="transition-all duration-500"
              style={{ 
                width: '1px', 
                height: '8px', 
                backgroundColor: isDark ? '#666' : '#94a3b8' 
              }} 
            />
          </div>
        </div>

        {/* Responsive container with side rulers */}
        <div className="relative transition-all duration-500 ease-in-out">
          {/* Left padding ruler */}
          <div 
            className="absolute left-0 top-0 bottom-0 flex items-center transition-all duration-500"
            style={{ transform: 'translateX(-24px)' }}
          >
            <div className="flex flex-col items-center h-full justify-center">
              <div 
                className="transition-all duration-500"
                style={{ 
                  width: '1px', 
                  height: '60px', 
                  backgroundColor: isDark ? '#666' : '#94a3b8' 
                }} 
              />
              <div 
                className="px-1 text-xs my-1 rounded transition-all duration-500"
                style={{ 
                  backgroundColor: isDark ? '#0f0f0f' : '#f8fafc',
                  color: isDark ? '#999' : '#64748b',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                {padding[viewportSize].split(' ')[1]}
              </div>
              <div 
                className="transition-all duration-500"
                style={{ 
                  width: '1px', 
                  height: '60px', 
                  backgroundColor: isDark ? '#666' : '#94a3b8' 
                }} 
              />
            </div>
          </div>

          {/* Main container */}
          <div 
            className="transition-all duration-500 ease-in-out"
            style={{ 
              maxWidth: viewportSizes[viewportSize].width,
              width: viewportSize === 'desktop' ? '100%' : viewportSizes[viewportSize].width,
            }}
          >
            {/* Hero section */}
            <div 
              className="rounded-t-2xl transition-all duration-500 ease-in-out"
              style={{ 
                padding: padding[viewportSize],
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                border: `1px solid ${isDark ? '#404040' : '#e2e8f0'}`,
                borderBottom: 'none',
              }}
            >
              <h2 
                className="transition-all duration-500 ease-in-out"
                style={{ 
                  fontSize: viewportSize === 'mobile' ? '1.125rem' : '1.5rem',
                  color: isDark ? '#ffffff' : '#0f172a',
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                  fontFamily: headingFont,
                }}
              >
                Responsive Layout
              </h2>
              <p 
                className="opacity-70 transition-all duration-500 ease-in-out"
                style={{ 
                  color: isDark ? '#ffffff' : '#0f172a',
                  fontSize: '0.75rem',
                  fontFamily: bodyFont,
                }}
              >
                Watch the grid adapt to different viewport sizes
              </p>
            </div>

            {/* Grid section */}
            <div 
              className="rounded-b-2xl transition-all duration-500 ease-in-out"
              style={{ 
                padding: padding[viewportSize],
                backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
                border: `1px solid ${isDark ? '#404040' : '#e2e8f0'}`,
                borderTop: 'none',
              }}
            >
              <div 
                className="grid transition-all duration-500 ease-in-out"
                style={{ 
                  gridTemplateColumns: `repeat(${gridColumns[viewportSize]}, 1fr)`,
                  gap: '16px',
                }}
              >
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="rounded-xl transition-all duration-500 ease-in-out"
                    style={{
                      ...getCardStyle(index),
                      height: viewportSize === 'mobile' ? '60px' : '70px',
                      border: '0.5px solid rgba(0,0,0,0.1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right padding ruler */}
          <div 
            className="absolute right-0 top-0 bottom-0 flex items-center transition-all duration-500"
            style={{ transform: 'translateX(24px)' }}
          >
            <div className="flex flex-col items-center h-full justify-center">
              <div 
                className="transition-all duration-500"
                style={{ 
                  width: '1px', 
                  height: '60px', 
                  backgroundColor: isDark ? '#666' : '#94a3b8' 
                }} 
              />
              <div 
                className="px-1 text-xs my-1 rounded transition-all duration-500"
                style={{ 
                  backgroundColor: isDark ? '#0f0f0f' : '#f8fafc',
                  color: isDark ? '#999' : '#64748b',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                {padding[viewportSize].split(' ')[1]}
              </div>
              <div 
                className="transition-all duration-500"
                style={{ 
                  width: '1px', 
                  height: '60px', 
                  backgroundColor: isDark ? '#666' : '#94a3b8' 
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info text */}
      <div 
        className="mt-3 text-xs text-center opacity-60 transition-all duration-500"
        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
      >
        Grid columns: {gridColumns[viewportSize]} • Padding: {padding[viewportSize]}
      </div>
    </div>
  );
}