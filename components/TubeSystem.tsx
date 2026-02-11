
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../types';
import { PATHS } from '../constants';

interface TubeSystemProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

export const TubeSystem: React.FC<TubeSystemProps> = ({ activeSection }) => {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
      <svg
        className="w-full h-full max-w-[1600px] max-h-[1200px]"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: 'visible' }}
      >
        <defs>
            {/* 
              Filter for Hand-Drawn / Rough Paper Effect 
              Creates jagged edges and slight internal noise
            */}
            <filter id="rough-paper" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
                <feTurbulence 
                    type="fractalNoise" 
                    baseFrequency="0.03" 
                    numOctaves="3" 
                    seed="2" 
                    result="noise" 
                />
                <feDisplacementMap 
                    in="SourceGraphic" 
                    in2="noise" 
                    scale="8" 
                    xChannelSelector="R" 
                    yChannelSelector="G" 
                />
            </filter>
        </defs>

        <AnimatePresence>
          {PATHS.map((path, index) => {
            const isHovered = hoveredPath === path.id;
            
            return (
              <motion.g 
                key={path.id} 
                style={{ zIndex: path.zIndex }} 
                className="pointer-events-auto cursor-pointer group"
                onMouseEnter={() => setHoveredPath(path.id)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {/* Background 'casing' - Wide hit area for easy interaction */}
                <motion.path
                  d={path.d[activeSection]}
                  stroke="transparent"
                  strokeWidth={120} 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  animate={{ d: path.d[activeSection] }}
                  transition={{
                      duration: 1.4,
                      ease: [0.4, 0, 0.2, 1] 
                  }}
                />

                {/* Main Path - With Rough Filter Applied */}
                <motion.path
                  d={path.d[activeSection]}
                  stroke={path.color}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  // Apply the rough paper filter
                  filter="url(#rough-paper)"
                  initial={false}
                  animate={{ 
                      d: path.d[activeSection],
                      // Breathing effect: 
                      strokeWidth: isHovered ? [38, 50, 38] : [32, 36, 32], 
                      
                      // Organic drift:
                      x: isHovered ? 0 : [0, 4, 0],
                      y: isHovered ? 0 : [0, -4, 0],
                  }}
                  transition={{
                    d: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                    strokeWidth: {
                      duration: isHovered ? 0.8 : 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop", 
                      delay: isHovered ? 0 : index * 0.7 
                    },
                    x: {
                       duration: 12 + index * 2,
                       ease: "easeInOut",
                       repeat: Infinity,
                       repeatType: "reverse", 
                       delay: index * 1.5
                    },
                    y: {
                       duration: 14 + index * 2,
                       ease: "easeInOut",
                       repeat: Infinity,
                       repeatType: "reverse", 
                       delay: index * 2.5
                    }
                  }}
                />
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
    </div>
  );
};
