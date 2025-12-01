import { useEffect, useRef, useState } from "react";
import { ThemeMode } from "../App";

interface SolarBackgroundProps {
  themeMode: ThemeMode;
}

export function SolarBackground({ themeMode }: SolarBackgroundProps) {
  const orbitsCanvasRef = useRef<HTMLCanvasElement>(null);
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const planetsRef = useRef<Array<{ orbit: number; angle: number; size: number; speed: number }>>([]);
  const starsRef = useRef<Array<{ x: number; y: number; size: number; cluster: number; opacity: number }>>([]);
  const starCharsRef = useRef<Array<{ x: number; y: number; size: number; char: string; cluster: number; opacity: number }>>([]);
  const clusterOpacitiesRef = useRef<Array<{ baseOpacity: number; phase: number; speed: number }>>([]);
  const isDark = themeMode === "dark";
  const isRainbow = themeMode === "rainbow";
  const [orbitsOpacity, setOrbitsOpacity] = useState(1);

  // Track scroll position to fade out orbits
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 800; // Fade out completely after 800px of scroll
      const opacity = Math.max(0, 1 - (scrollY / maxScroll));
      setOrbitsOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Stars effect - separate layer with no opacity
  useEffect(() => {
    const starsCanvas = starsCanvasRef.current;
    if (!starsCanvas) return;

    const starsCtx = starsCanvas.getContext("2d");
    if (!starsCtx) return;

    const resizeStarsCanvas = () => {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = document.documentElement.scrollHeight;
      
      // Regenerate stars when canvas size changes
      starsRef.current = [];
      starCharsRef.current = [];
      
      // Initialize cluster opacity controllers (8 clusters)
      const numClusters = 8;
      clusterOpacitiesRef.current = [];
      for (let i = 0; i < numClusters; i++) {
        clusterOpacitiesRef.current.push({
          baseOpacity: 0.3 + Math.random() * 0.7, // Random base opacity between 0.3 and 1
          phase: Math.random() * Math.PI * 2, // Random starting phase
          speed: 0.0005 + Math.random() * 0.001 // Random speed for variety
        });
      }
      
      // Position center at approximately where the StyleX logo is
      const centerX = starsCanvas.width * 0.5;
      const centerY = 300; // Approximate position of logo center
      
      // Double the stars to compensate for fading
      const numStars = isDark ? 800 : 600;
      
      // Star characters for light mode
      const starChars = ["݁", "˖", "⊹", "࣪"];
      
      for (let i = 0; i < numStars; i++) {
        // In light mode, cluster stars around logo using normal distribution
        let x, y;
        
        if (!isDark) {
          // Create clustered distribution around logo
          // Use Box-Muller transform for gaussian distribution
          const gaussianRandom = () => {
            let u = 0, v = 0;
            while(u === 0) u = Math.random();
            while(v === 0) v = Math.random();
            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
          };
          
          // 70% of stars clustered near logo
          if (Math.random() < 0.7) {
            const spreadX = starsCanvas.width * 0.25; // Horizontal spread
            const spreadY = starsCanvas.height * 0.15; // Vertical spread
            x = centerX + gaussianRandom() * spreadX;
            y = centerY + gaussianRandom() * spreadY;
          } else {
            // 30% scattered across the page
            x = Math.random() * starsCanvas.width;
            y = Math.random() * starsCanvas.height;
          }
          
          // Clamp to canvas bounds
          x = Math.max(0, Math.min(starsCanvas.width, x));
          y = Math.max(0, Math.min(starsCanvas.height, y));
        } else {
          // Dark mode: evenly distributed
          x = Math.random() * starsCanvas.width;
          y = Math.random() * starsCanvas.height;
        }
        
        const size = Math.random() * 0.8 + 0.3;
        const cluster = Math.floor(Math.random() * numClusters); // Assign to random cluster
        
        starsRef.current.push({ x, y, size, cluster, opacity: 1 });
        
        // For light mode, also store character info
        if (!isDark) {
          starCharsRef.current.push({
            x,
            y,
            size: 8 + Math.random() * 6, // Font size between 8-14px
            char: starChars[Math.floor(Math.random() * starChars.length)],
            cluster,
            opacity: 1
          });
        }
      }
      
      // Draw stars immediately after generating
      drawStars();
    };

    const drawStars = () => {
      starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      
      // Update cluster opacities
      clusterOpacitiesRef.current.forEach((cluster) => {
        cluster.phase += cluster.speed;
      });
      
      if (isDark) {
        // Dark mode: draw white dots with cluster-based opacity
        starsRef.current.forEach((star) => {
          const cluster = clusterOpacitiesRef.current[star.cluster];
          if (!cluster) return;
          
          // Calculate opacity using sine wave for smooth fading - peak at 100%
          const opacity = 0.2 + 0.8 * (Math.sin(cluster.phase) * 0.5 + 0.5);
          
          starsCtx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          starsCtx.beginPath();
          starsCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          starsCtx.fill();
        });
      } else {
        // Light mode: draw decorative characters with cluster-based opacity
        starsCtx.textAlign = "center";
        starsCtx.textBaseline = "middle";
        
        starCharsRef.current.forEach((starChar) => {
          const cluster = clusterOpacitiesRef.current[starChar.cluster];
          if (!cluster) return;
          
          // Calculate opacity using sine wave for smooth fading - peak at 100%
          const opacity = 0.2 + 0.8 * (Math.sin(cluster.phase) * 0.5 + 0.5);
          
          starsCtx.fillStyle = `rgba(100, 100, 100, ${opacity})`;
          starsCtx.font = `${starChar.size}px serif`;
          starsCtx.fillText(starChar.char, starChar.x, starChar.y);
        });
      }
      
      // Continue animation
      requestAnimationFrame(drawStars);
    };

    // Initial setup with slight delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      resizeStarsCanvas();
      drawStars(); // Start animation loop
    }, 0);
    
    window.addEventListener("resize", resizeStarsCanvas);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeStarsCanvas);
    };
  }, [isDark]);

  // Orbits and planets effect - with opacity
  useEffect(() => {
    const canvas = orbitsCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize planets with rotation speeds if not already initialized
    if (planetsRef.current.length === 0) {
      const sameSpeed = 0.0004; // All planets move at the same speed
      planetsRef.current = [
        { orbit: 2, angle: 0, size: 14, speed: sameSpeed },
        { orbit: 2, angle: 2.09, size: 20, speed: sameSpeed },   // ~120 degrees
        { orbit: 2, angle: 4.19, size: 18, speed: sameSpeed },   // ~240 degrees
        { orbit: 3, angle: 0.52, size: 22, speed: sameSpeed },   // ~30 degrees
        { orbit: 3, angle: 2.62, size: 12, speed: sameSpeed },   // ~150 degrees
        { orbit: 3, angle: 4.71, size: 19, speed: sameSpeed },   // ~270 degrees
        { orbit: 4, angle: 1.05, size: 17, speed: sameSpeed },   // ~60 degrees
        { orbit: 4, angle: 3.14, size: 11, speed: sameSpeed },   // ~180 degrees
        { orbit: 4, angle: 5.24, size: 21, speed: sameSpeed },   // ~300 degrees
        { orbit: 5, angle: 0, size: 15, speed: sameSpeed },
        { orbit: 5, angle: 1.57, size: 24, speed: sameSpeed },   // ~90 degrees
        { orbit: 5, angle: 3.14, size: 16, speed: sameSpeed },   // ~180 degrees
        { orbit: 5, angle: 4.71, size: 20, speed: sameSpeed },   // ~270 degrees
      ];
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Position center at approximately where the StyleX logo is
      // Header is about 80-100px, then py-12 (48px), then p-8 (32px), plus logo height/2
      const centerX = canvas.width * 0.5;
      const centerY = 300; // Approximate position of logo center

      // Draw concentric circles (orbits)
      const numOrbits = 8; // Reduced from 10 to remove outer circles
      const baseSpacing = Math.min(canvas.width, canvas.height) / 20;
      
      ctx.lineWidth = 0.5;
      
      for (let i = 1; i <= numOrbits; i++) {
        const spacingVariation = 1 + Math.sin(i * 0.5) * 0.08;
        const radius = baseSpacing * i * spacingVariation;
        
        // Calculate opacity - more noticeable fade with each ring
        const fadeProgress = (i - 1) / (numOrbits - 1);
        const baseOpacity = 0.6 * (1 - fadeProgress * 0.95); // Fade from 0.6 to 0.03
        
        if (isRainbow) {
          // Rainbow mode - add subtle color glow to circles
          // Rotate through hues based on orbit index
          const hue = (i * 36) % 360; // 10 orbits = full color wheel
          ctx.strokeStyle = `hsla(${hue}, 80%, 45%, ${baseOpacity})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `hsla(${hue}, 90%, 40%, ${Math.min(baseOpacity * 1.5, 1)})`;
        } else {
          ctx.strokeStyle = isDark 
            ? `rgba(200, 200, 200, ${baseOpacity})`
            : `rgba(55, 65, 81, ${baseOpacity})`;
          ctx.shadowBlur = 0;
        }
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Reset shadow after drawing circles
      ctx.shadowBlur = 0;

      // Update planet angles for animation
      planetsRef.current.forEach((planet) => {
        planet.angle += planet.speed;
      });

      // Draw planets
      planetsRef.current.forEach((planet, index) => {
        // Use the same spacing variation calculation as the orbits
        const spacingVariation = 1 + Math.sin(planet.orbit * 0.5) * 0.08;
        const radius = baseSpacing * planet.orbit * spacingVariation;
        const x = centerX + Math.cos(planet.angle) * radius;
        const y = centerY + Math.sin(planet.angle) * radius;

        // Create radial gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, planet.size);
        
        if (isRainbow) {
          // Rainbow mode - each planet gets a different gradient color
          // Using same opacity pattern as light mode for consistency
          const colors = [
            { dark: "rgba(127, 29, 29, 0.8)", mid: "rgba(220, 38, 38, 0.6)", light: "rgba(252, 165, 165, 0.3)" }, // Red
            { dark: "rgba(124, 45, 18, 0.8)", mid: "rgba(234, 88, 12, 0.6)", light: "rgba(254, 215, 170, 0.3)" }, // Orange
            { dark: "rgba(113, 63, 18, 0.8)", mid: "rgba(202, 138, 4, 0.6)", light: "rgba(254, 240, 138, 0.3)" }, // Yellow
            { dark: "rgba(20, 83, 45, 0.8)", mid: "rgba(22, 163, 74, 0.6)", light: "rgba(187, 247, 208, 0.3)" }, // Green
            { dark: "rgba(30, 58, 138, 0.8)", mid: "rgba(37, 99, 235, 0.6)", light: "rgba(191, 219, 254, 0.3)" }, // Blue
            { dark: "rgba(76, 29, 149, 0.8)", mid: "rgba(124, 58, 237, 0.6)", light: "rgba(221, 214, 254, 0.3)" }, // Purple
            { dark: "rgba(131, 24, 67, 0.8)", mid: "rgba(219, 39, 119, 0.6)", light: "rgba(251, 207, 232, 0.3)" }, // Pink
            { dark: "rgba(19, 78, 74, 0.8)", mid: "rgba(5, 150, 105, 0.6)", light: "rgba(204, 251, 241, 0.3)" }, // Teal
            { dark: "rgba(91, 33, 182, 0.8)", mid: "rgba(147, 51, 234, 0.6)", light: "rgba(233, 213, 255, 0.3)" }, // Violet
            { dark: "rgba(136, 19, 55, 0.8)", mid: "rgba(225, 29, 72, 0.6)", light: "rgba(253, 242, 248, 0.3)" }, // Rose
            { dark: "rgba(22, 78, 99, 0.8)", mid: "rgba(14, 165, 233, 0.6)", light: "rgba(207, 250, 254, 0.3)" }, // Cyan
            { dark: "rgba(112, 26, 117, 0.8)", mid: "rgba(192, 38, 211, 0.6)", light: "rgba(250, 232, 255, 0.3)" }, // Fuchsia
          ];
          const color = colors[index % colors.length];
          gradient.addColorStop(0, color.dark);
          gradient.addColorStop(0.5, color.mid);
          gradient.addColorStop(1, color.light);
        } else if (isDark) {
          gradient.addColorStop(0, "rgba(180, 180, 180, 0.8)");
          gradient.addColorStop(0.5, "rgba(100, 100, 100, 0.6)");
          gradient.addColorStop(1, "rgba(50, 50, 50, 0.3)");
        } else {
          gradient.addColorStop(0, "rgba(75, 75, 75, 0.8)");
          gradient.addColorStop(0.5, "rgba(155, 155, 155, 0.6)");
          gradient.addColorStop(1, "rgba(205, 205, 205, 0.3)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, planet.size, 0, Math.PI * 2);
        ctx.fill();

        // Add outline
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Continue animation
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDark, isRainbow]);

  return (
    <>
      {/* Stars layer - fades on scroll */}
      <canvas
        ref={starsCanvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: orbitsOpacity }}
      />
      {/* Orbits and planets layer - fades on scroll */}
      <canvas
        ref={orbitsCanvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: orbitsOpacity }}
      />
    </>
  );
}