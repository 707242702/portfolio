
import React, { useEffect, useState, useRef } from 'react';

// Configuration
const TRAIL_LENGTH = 30;
const STROKE_WIDTH = 25;
const STROKE_COLOR = "#EB431D"; // The Brand Red

interface Point {
  x: number;
  y: number;
  id: number;
}

export const BrushCursor: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const pointIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // 1. Track Mouse Position continuously
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 2. Animation Loop to update the trail
    const loop = () => {
      setPoints((prevPoints) => {
        const { x, y } = mousePosRef.current;
        const newPoint = { x, y, id: pointIdRef.current++ };
        
        // Add new point, keep only the last N points
        const newTrail = [...prevPoints, newPoint].slice(-TRAIL_LENGTH);
        
        return newTrail;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const getPath = (pts: Point[]) => {
    if (pts.length < 2) return "";
    return `M ${pts.map(p => `${p.x} ${p.y}`).join(' L ')}`;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-visible mix-blend-multiply">
      <svg className="w-full h-full overflow-visible">
        <defs>
            {/* Reusing a noise filter for the ink texture */}
            <filter id="ink-texture" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
                <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
            </filter>
        </defs>
        
        {/* Render the Trail */}
        <path
          d={getPath(points)}
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.6}
          filter="url(#ink-texture)"
        />
        
        {/* Render the "Tip" of the brush */}
        {points.length > 0 && (
            <circle 
                cx={points[points.length - 1].x} 
                cy={points[points.length - 1].y} 
                r={STROKE_WIDTH / 2} 
                fill={STROKE_COLOR}
                filter="url(#ink-texture)"
            />
        )}
      </svg>
    </div>
  );
};
