
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

interface Burst {
  id: number;
  x: number;
  y: number;
}

const PARTICLE_COUNT = 16;
// Add bright colors to the mix
const BURST_COLORS = [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.ORANGE, '#FF6B6B', '#4ECDC4'];

const Particle = ({ color, index }: { color: string; index: number }) => {
  // Random physics for "cute pop"
  // Distribute mostly efficiently but with randomness
  const angle = (index / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
  const velocity = Math.random() * 60 + 40; // 40-100px travel
  
  const tx = Math.cos(angle) * velocity;
  const ty = Math.sin(angle) * velocity;
  
  const size = Math.random() * 8 + 4; // 4px to 12px

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        left: -size / 2, // Center align
        top: -size / 2,
      }}
      initial={{ x: 0, y: 0, scale: 0 }}
      animate={{ 
        x: tx, 
        y: ty, 
        scale: [0, 1.2, 0], // Pop up then shrink
        opacity: [1, 1, 0]
      }}
      transition={{ 
        duration: 0.6 + Math.random() * 0.2, 
        ease: [0.175, 0.885, 0.32, 1.275] // BackOut easing for "pop" effect
      }}
    />
  );
};

const BurstGroup = ({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="absolute pointer-events-none" 
      style={{ left: x, top: y }}
    >
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <Particle 
            key={i} 
            color={BURST_COLORS[i % BURST_COLORS.length]} 
            index={i}
        />
      ))}
      {/* Central "Pop" Ring */}
      <motion.div 
        className="absolute border-2 border-white rounded-full opacity-50"
        style={{ left: -1, top: -1 }} // Approximate centering
        initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.8 }}
        animate={{ 
            width: 60, 
            height: 60, 
            x: -30, 
            y: -30, 
            opacity: 0 
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export const ClickExplosion: React.FC = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking on interactive elements might be distracting? 
      // Actually user wants it on click, so global is fine.
      const newBurst = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setBursts(prev => [...prev, newBurst]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const removeBurst = (id: number) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {bursts.map(burst => (
        <BurstGroup 
          key={burst.id} 
          x={burst.x} 
          y={burst.y} 
          onComplete={() => removeBurst(burst.id)} 
        />
      ))}
    </div>
  );
};
