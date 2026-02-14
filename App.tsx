
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TubeSystem } from './components/TubeSystem';
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';
import { BlendCursor } from './components/BlendCursor';
import { ClickExplosion } from './components/ClickExplosion';
import { Section, Project, AiItem } from './types';
import { NAV_ITEMS } from './constants';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAiItem, setSelectedAiItem] = useState<AiItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  // Scroll resistance refs
  const scrollAccumulator = useRef(0);
  const scrollTimeout = useRef<number | null>(null);
  const BASE_THRESHOLD = 300; 

  // When a project OR an AI item is selected, we switch visual system to DETAIL mode
  const currentVisualState = (selectedProject || selectedAiItem) ? Section.DETAIL : activeSection;

  const handleNavigate = useCallback((section: Section) => {
    if (section === activeSection || isTransitioning) return;
    
    // Close any details
    if (selectedProject || selectedAiItem) {
        setSelectedProject(null);
        setSelectedAiItem(null);
    }

    setActiveSection(section);
    setIsTransitioning(true);
    setIsMenuVisible(true);
    
    // Reset scroll accumulator on navigate
    scrollAccumulator.current = 0;

    setTimeout(() => setIsTransitioning(false), 1000); 
  }, [activeSection, isTransitioning, selectedProject, selectedAiItem]);

  const handleSelectProject = (project: Project) => {
      setSelectedProject(project);
      setIsMenuVisible(true);
  };
  
  const handleSelectAiItem = (item: AiItem) => {
      setSelectedAiItem(item);
      setIsMenuVisible(true);
  };

  const handleCloseDetail = () => {
      setSelectedProject(null);
      setSelectedAiItem(null);
      setIsMenuVisible(true);
  };

  const handleMenuVisibilityChange = (visible: boolean) => {
    setIsMenuVisible(visible);
  };

  // Scroll/Wheel support with RESISTANCE
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Disable section switching via scroll if we are in a detail view or transitioning
      if (isTransitioning || selectedProject || selectedAiItem) {
          scrollAccumulator.current = 0;
          return;
      }

      // Reset accumulator if scrolling in opposite direction
      if (Math.sign(e.deltaY) !== Math.sign(scrollAccumulator.current) && scrollAccumulator.current !== 0) {
          scrollAccumulator.current = 0;
      }

      // Accumulate scroll delta
      scrollAccumulator.current += e.deltaY;

      // Clear accumulator if user stops scrolling for a bit
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      // Increased timeout slightly to allow for "double swipe" gestures to accumulate
      scrollTimeout.current = window.setTimeout(() => {
          scrollAccumulator.current = 0;
      }, 300);

      // Determine threshold based on section and direction
      let currentThreshold = BASE_THRESHOLD;
      
      // Increase resistance for AI -> WORK and WORK -> ABOUT
      // Assuming forward navigation is positive deltaY
      if (e.deltaY > 0) {
          if (activeSection === Section.AI || activeSection === Section.WORK) {
              currentThreshold = 1000; // Significantly higher resistance
          }
      }

      // Check threshold
      if (Math.abs(scrollAccumulator.current) > currentThreshold) {
          const currentIndex = NAV_ITEMS.findIndex(item => item.id === activeSection);
          let nextIndex = currentIndex;

          if (scrollAccumulator.current > 0) {
            // Scroll Down / Next
            nextIndex = (currentIndex + 1) % NAV_ITEMS.length;
          } else {
            // Scroll Up / Prev
            nextIndex = (currentIndex - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
          }

          if (nextIndex !== currentIndex) {
            handleNavigate(NAV_ITEMS[nextIndex].id);
            // Reset after successful navigation
            scrollAccumulator.current = 0; 
          }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, isTransitioning, handleNavigate, selectedProject, selectedAiItem]);

  return (
    <div className="relative w-full h-screen bg-[#E5DED0] overflow-hidden selection:bg-[#EB431D] selection:text-white cursor-none">
      
      {/* Interactive Cursor */}
      <BlendCursor />
      <ClickExplosion />

      {/* Visual System Layer - Reacts to Detail Mode */}
      <TubeSystem activeSection={currentVisualState} onNavigate={handleNavigate} />
      
      {/* UI Layers */}
      <div className={`transition-opacity duration-500 ${(selectedProject || selectedAiItem) ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
          <Navigation 
            activeSection={activeSection} 
            onNavigate={handleNavigate} 
            isVisible={isMenuVisible} 
          />
      </div>

      <Content 
        section={currentVisualState} 
        activeProject={selectedProject}
        activeAiItem={selectedAiItem}
        onSelectProject={handleSelectProject}
        onSelectAiItem={handleSelectAiItem}
        onClose={handleCloseDetail}
        onToggleMenu={handleMenuVisibilityChange}
      />

      {/* Decorative corners & Footer */}
      {!(selectedProject || selectedAiItem) && (
        <>
            <motion.div 
                className="fixed top-6 right-6 md:top-8 md:right-8 text-xs md:text-sm font-mono font-bold text-white/90 mix-blend-difference pointer-events-none tracking-widest"
                animate={{ y: isMenuVisible ? 0 : -100, opacity: isMenuVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                SYS_STATUS: ONLINE
            </motion.div>
            
            {/* Footer Left */}
            <motion.div 
                className="fixed bottom-8 left-8 flex flex-col gap-2 pointer-events-auto"
                animate={{ y: isMenuVisible ? 0 : 100, opacity: isMenuVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-[10px] font-mono text-stone-500 tracking-widest leading-relaxed">
                    © 2026 Yuqi Lu<br />
                    All rights reserved
                </p>
                <div className="flex gap-4 mt-2">
                    <a href="#" className="text-stone-500 hover:text-[#EB431D] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="#" className="text-stone-500 hover:text-[#EB431D] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" className="text-stone-500 hover:text-[#EB431D] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </a>
                </div>
            </motion.div>
        </>
      )}
    </div>
  );
};

export default App;
