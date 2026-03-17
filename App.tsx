
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TubeSystem } from './components/TubeSystem';
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';
import { BlendCursor } from './components/BlendCursor';
import { ClickExplosion } from './components/ClickExplosion';
import { Section, Project, AiItem } from './types';
import { NAV_ITEMS, PROJECTS, AI_ITEMS } from './constants';
import { motion } from 'framer-motion';

// Parse URL hash into initial app state
const parseHash = () => {
  const hash = window.location.hash.replace(/^#\/?/, ''); // e.g. "work/work-illustration"
  const [section, id] = hash.split('/');
  if (section === 'work') {
    const project = id ? (PROJECTS.find(p => p.id === id) ?? null) : null;
    return { section: Section.WORK, project, aiItem: null };
  }
  if (section === 'ai') {
    const aiItem = id ? (AI_ITEMS.find(i => i.id === id) ?? null) : null;
    return { section: Section.AI, project: null, aiItem };
  }
  if (section === 'about') return { section: Section.ABOUT, project: null, aiItem: null };
  return { section: Section.HOME, project: null, aiItem: null };
};

const initial = parseHash();

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(initial.section);
  const [selectedProject, setSelectedProject] = useState<Project | null>(initial.project);
  const [selectedAiItem, setSelectedAiItem] = useState<AiItem | null>(initial.aiItem);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  // Sync state → URL hash
  // NOTE: if the current hash already starts with the correct project path,
  // we leave it alone so sub-components (e.g. IllustrationTabSystem) can
  // append their own tab segment without being overwritten.
  useEffect(() => {
    let hash = '';
    if (selectedProject) {
      const base = `#/work/${selectedProject.id}`;
      if (window.location.hash.startsWith(base)) return; // preserve tab sub-path
      hash = base;
    } else if (selectedAiItem) {
      hash = `#/ai/${selectedAiItem.id}`;
    } else if (activeSection === Section.WORK)  hash = '#/work';
    else if (activeSection === Section.AI)      hash = '#/ai';
    else if (activeSection === Section.ABOUT)   hash = '#/about';
    // HOME: clear hash
    const current = window.location.hash;
    if (hash !== current) history.replaceState(null, '', hash || window.location.pathname);
  }, [activeSection, selectedProject, selectedAiItem]);

  // Scroll resistance refs
  const scrollAccumulator = useRef(0);
  const swipeCount = useRef(0);
  const scrollTimeout = useRef<number | null>(null);
  const lastSwipeTime = useRef(0); // Cooldown between swipes

  // Touch refs for mobile swipe
  const touchStartY = useRef<number | null>(null);
  const touchSwipeCount = useRef(0);
  const lastTouchSwipeTime = useRef(0);

  // Threshold for a single swipe gesture
  const SINGLE_SWIPE_THRESHOLD = 500;
  // Required swipes to trigger navigation
  const REQUIRED_SWIPES = 2;
  // Minimum pause between counted swipes (ms) — high enough to block inertia double-count
  const SWIPE_COOLDOWN = 800;

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
    
    // Reset mechanisms on navigate
    scrollAccumulator.current = 0;
    swipeCount.current = 0;

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

  // Scroll/Wheel support with "Double Swipe" Logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Disable section switching via scroll if we are in a detail view or transitioning
      if (isTransitioning || selectedProject || selectedAiItem) {
          scrollAccumulator.current = 0;
          swipeCount.current = 0;
          return;
      }

      // 1. Accumulate Delta
      // Reset accumulator if scrolling in opposite direction of current accumulation
      if (Math.sign(e.deltaY) !== Math.sign(scrollAccumulator.current) && scrollAccumulator.current !== 0) {
          scrollAccumulator.current = 0;
      }
      scrollAccumulator.current += e.deltaY;

      // 2. Clear accumulator AND swipe count if user stops scrolling
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      
      scrollTimeout.current = window.setTimeout(() => {
          scrollAccumulator.current = 0;
          swipeCount.current = 0; // Reset swipe count on idle
      }, 800); // 800ms idle resets the "double swipe" requirement

      // 3. Detect a Single Swipe
      if (Math.abs(scrollAccumulator.current) > SINGLE_SWIPE_THRESHOLD) {
          const direction = Math.sign(scrollAccumulator.current);
          const now = Date.now();

          // Only count this swipe if enough time passed since last one (prevents inertia double-count)
          if (now - lastSwipeTime.current > SWIPE_COOLDOWN) {
              swipeCount.current += 1;
              lastSwipeTime.current = now;
          }

          // Reset accumulator to detect the *next* swipe cleanly
          scrollAccumulator.current = 0; 

          // 4. Check if we reached required swipes
          if (swipeCount.current >= REQUIRED_SWIPES) {
              const currentIndex = NAV_ITEMS.findIndex(item => item.id === activeSection);
              let nextIndex = currentIndex;

              if (direction > 0) {
                // Scroll Down / Next
                nextIndex = (currentIndex + 1) % NAV_ITEMS.length;
              } else {
                // Scroll Up / Prev
                nextIndex = (currentIndex - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
              }

              if (nextIndex !== currentIndex) {
                handleNavigate(NAV_ITEMS[nextIndex].id);
                // Reset everything after successful navigation
                scrollAccumulator.current = 0; 
                swipeCount.current = 0;
              }
          }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, isTransitioning, handleNavigate, selectedProject, selectedAiItem]);

  // Touch support for mobile swipe navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      if (isTransitioning || selectedProject || selectedAiItem) {
        touchStartY.current = null;
        touchSwipeCount.current = 0;
        return;
      }

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      // Minimum swipe distance threshold
      if (Math.abs(deltaY) < 60) return;

      const now = Date.now();
      if (now - lastTouchSwipeTime.current < SWIPE_COOLDOWN) return;

      touchSwipeCount.current += 1;
      lastTouchSwipeTime.current = now;

      // Reset swipe count after idle
      setTimeout(() => { touchSwipeCount.current = 0; }, 1200);

      if (touchSwipeCount.current >= REQUIRED_SWIPES) {
        const currentIndex = NAV_ITEMS.findIndex(item => item.id === activeSection);
        const direction = deltaY > 0 ? 1 : -1;
        const nextIndex = (currentIndex + direction + NAV_ITEMS.length) % NAV_ITEMS.length;
        if (nextIndex !== currentIndex) {
          handleNavigate(NAV_ITEMS[nextIndex].id);
          touchSwipeCount.current = 0;
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
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
                className="fixed bottom-8 left-8 flex flex-col gap-2 pointer-events-auto z-10"
                animate={{ y: isMenuVisible ? 0 : 100, opacity: isMenuVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-[10px] font-mono text-stone-500 tracking-widest leading-relaxed">
                    © 2026 Yuqi Lu<br />
                    All rights reserved
                </p>
                <div className="flex gap-4 mt-2">
                    <a href="https://www.linkedin.com/in/yuqilu/" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-[#EB431D] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="https://www.instagram.com/spaceyuqio/" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-[#EB431D] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=luyuqi0726@gmail.com" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-[#EB431D] transition-colors">
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
