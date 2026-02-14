
import React from 'react';
import { Section } from '../types';
import { NAV_ITEMS } from '../constants';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  isVisible: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate, isVisible }) => {
  return (
    <motion.nav 
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 mix-blend-difference text-white/90"
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
            y: isVisible ? 0 : -100,
            opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-xs md:text-sm font-mono font-bold tracking-widest mb-6">VISUAL_SYSTEM v1.0</h1>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="group flex items-center gap-3 py-2 md:py-1 focus:outline-none"
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
              <motion.div
                className={`w-1.5 h-1.5 rounded-full ${activeSection === item.id ? 'bg-white' : 'bg-white/40'}`}
                animate={{
                  scale: activeSection === item.id ? 1.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              {activeSection === item.id && (
                <motion.div
                  layoutId="active-ring"
                  className="absolute inset-0 border border-white rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </div>
            <span className={`text-[10px] md:text-xs font-mono tracking-widest transition-opacity ${activeSection === item.id ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
};
