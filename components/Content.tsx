
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Project, AiItem } from '../types';
import { PROJECTS, AI_ITEMS, COLORS } from '../constants';

interface ContentProps {
  section: Section;
  activeProject: Project | null;
  activeAiItem: AiItem | null;
  onSelectProject: (project: Project) => void;
  onSelectAiItem: (item: AiItem) => void;
  onClose: () => void;
  onToggleMenu: (visible: boolean) => void;
}

// Updated variants: Opacity only, no slide-up, for smoother mobile transitions
const contentVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { delay: 0.2, duration: 0.6, ease: "easeInOut" }
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// Hook to handle scroll direction logic for hiding/showing menu
const useScrollMenuLogic = (onToggleMenu: (visible: boolean) => void) => {
    const lastScrollY = useRef(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        
        const currentScrollY = scrollContainerRef.current.scrollTop;
        const delta = currentScrollY - lastScrollY.current;

        // Threshold to avoid jitter
        if (Math.abs(delta) > 10) {
            if (delta > 0 && currentScrollY > 50) {
                // Scrolling down AND passed the top
                onToggleMenu(false);
            } else if (delta < 0) {
                // Scrolling up
                onToggleMenu(true);
            }
        }
        
        // Always show if at very top (safeguard)
        if (currentScrollY <= 10) {
            onToggleMenu(true);
        }

        lastScrollY.current = currentScrollY;
    };

    return { scrollContainerRef, handleScroll };
};

// --- Sub-Components ---

const ImageCard = ({ src, index }: { src: string, index: number }) => {
    // Pick a random system color for the hover border
    const systemColors = [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.ORANGE];
    const borderColor = systemColors[index % systemColors.length];

    return (
        <motion.div 
            className="relative w-full aspect-square overflow-hidden bg-white rounded-sm shadow-sm border border-[#D9D9D9] cursor-pointer group"
            initial="initial"
            whileHover="hover"
        >
            {/* The Image */}
            <motion.img 
                src={src} 
                alt={`Illustration ${index + 1}`}
                className="w-full h-full object-cover"
                variants={{
                    initial: { scale: 1, filter: 'sepia(80%) grayscale(20%)' },
                    hover: { scale: 1.08, filter: 'sepia(0%) grayscale(0%)' }
                }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            />
            
            {/* Sepia/Noise Overlay - Fades out on hover */}
            <motion.div 
                className="absolute inset-0 bg-[#E5DED0] mix-blend-color pointer-events-none"
                variants={{
                    initial: { opacity: 0.6 },
                    hover: { opacity: 0 }
                }}
                transition={{ duration: 0.4 }}
            />

            {/* Colored Border Reveal */}
            <motion.div 
                className="absolute inset-0 border-[6px] pointer-events-none z-10"
                style={{ borderColor: borderColor }}
                variants={{
                    initial: { opacity: 0, scale: 0.95 },
                    hover: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.3 }}
            />
            
            {/* Caption Tag */}
            <motion.div
                className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 z-20"
                variants={{
                    initial: { opacity: 0, y: 10 },
                    hover: { opacity: 1, y: 0 }
                }}
            >
                <span className="text-[10px] font-mono font-bold text-[#1D3557]">FIG 0{index + 1}</span>
            </motion.div>
        </motion.div>
    );
};

const HomeContent = ({ onToggleMenu }: { onToggleMenu: (v: boolean) => void }) => {
  const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
  
  return (
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex flex-col justify-center items-center pt-24 md:pt-0 overflow-y-auto overflow-x-hidden"
      >
        <div className="relative z-10 text-center mix-blend-multiply cursor-default">
            {/* Reverted to static H1 as requested */}
            <h1 className="text-[15vw] font-bold tracking-tighter text-[#1D3557] leading-[0.9] select-none">
                YUQI LU
            </h1>
          <p className="text-lg md:text-2xl font-mono text-stone-500 tracking-[0.2em] mt-4 uppercase">
            Illustrator & Designer
          </p>
        </div>
      </div>
  );
};

const AIContent = ({ onSelect, onToggleMenu }: { onSelect: (item: AiItem) => void, onToggleMenu: (v: boolean) => void }) => {
  const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
  
  return (
    <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex flex-col justify-start xl:justify-center px-8 md:px-24 pt-56 xl:pt-32 overflow-y-auto overflow-x-hidden" 
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32 md:pb-12 max-w-6xl mx-auto">
        {AI_ITEMS.map((item, i) => (
            <div 
                key={item.id} 
                onClick={() => onSelect(item)}
                className="bg-[#E5DED0]/60 backdrop-blur-md border border-[#D9D9D9] p-8 hover:bg-white hover:scale-[1.02] hover:shadow-lg transition-all duration-500 group cursor-pointer relative z-10 flex-shrink-0 rounded-sm"
            >
            <h3 className="text-xs font-mono text-stone-500 mb-4 tracking-widest">{item.subtitle}</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D3557] mb-4 leading-none">{item.title}</h2>
            <p className="text-sm font-mono text-stone-600 mb-6">{item.description}</p>
            <div className="flex justify-end">
                <span className="text-xs font-bold text-[#1156D0] opacity-0 group-hover:opacity-100 transition-opacity">ACCESS &rarr;</span>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

const WorkContent = ({ onSelect, onToggleMenu }: { onSelect: (p: Project) => void, onToggleMenu: (v: boolean) => void }) => {
  const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);

  return (
    <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex flex-col justify-start px-8 md:px-24 pt-48 md:pt-64 overflow-y-auto overflow-x-hidden" 
    >
        <div className="w-full mb-8 pb-2 flex justify-between items-end bg-white/40 backdrop-blur-md border border-[#D9D9D9] p-4 rounded-sm flex-shrink-0 shadow-sm">
        <span className="text-xs font-mono font-bold text-[#1D3557]">PROJECT_INDEX</span>
        <span className="text-xs font-mono text-stone-400">SELECT TO VIEW</span>
        </div>
        <div className="flex flex-col gap-2 pb-32 md:pb-12">
        {PROJECTS.map((project, i) => (
            <div 
                key={project.id} 
                onClick={() => onSelect(project)}
                className="group relative bg-[#E5DED0]/60 backdrop-blur-md border border-[#D9D9D9] p-6 cursor-pointer hover:bg-white hover:shadow-lg transition-all duration-300 flex-shrink-0 rounded-sm"
            >
                <div className="flex flex-col md:flex-row md:items-start justify-between relative z-10 gap-4">
                    <span className="font-mono text-xs text-stone-400 pt-2">0{i + 1}</span>
                    
                    <div className="flex-1 flex flex-col">
                         <h3 className="text-3xl md:text-5xl font-bold text-stone-500 group-hover:text-[#1D3557] transition-colors duration-300 leading-tight">{project.title}</h3>
                         <p className="text-lg text-stone-400 group-hover:text-stone-600 transition-colors duration-300 mt-2 leading-relaxed font-normal">{project.description}</p>
                    </div>

                    <span className="font-mono text-xs text-stone-500 pt-2 group-hover:text-[#EB431D] text-right md:w-48">{project.category}</span>
                </div>
            </div>
        ))}
        </div>
    </div>
  );
};

const AboutContent = ({ onToggleMenu }: { onToggleMenu: (v: boolean) => void }) => {
  const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);

  return (
    <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex flex-col items-center justify-start xl:justify-center px-8 md:px-24 pt-56 xl:pt-32 overflow-y-auto overflow-x-hidden" 
    >
        <div className="bg-[#E5DED0]/60 backdrop-blur-md border border-[#D9D9D9] p-8 md:p-12 shadow-xl max-w-5xl w-full flex flex-col md:flex-row gap-12 relative z-10 hover:bg-white/80 transition-colors duration-500 group mb-32 md:mb-12 flex-shrink-0 rounded-sm">
        
        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col">
            <div>
                <span className="block text-xs font-mono text-stone-400 mb-6 tracking-widest">PROFILE</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D3557] leading-[0.9] mb-6">
                    YUQI LU
                </h2>
                <div className="font-mono text-sm text-[#1D3557] space-y-1 mb-12">
                    <p className="font-bold">Visual Systems Designer</p>
                    <p className="text-stone-600">Illustration & Structured Workflows</p>
                </div>
            </div>
            
            {/* TOOLS SECTION: MOVED HERE */}
            <div className="space-y-4 mb-12 md:mb-0">
                <h4 className="text-xs font-mono font-bold text-[#1D3557] pb-2 border-b border-stone-200/50 w-fit">TOOLS & SYSTEMS</h4>
                <div className="flex flex-wrap gap-2">
                    {['Figma', 'Workflow Design', 'Illustration Systems', 'Visual Governance', 'Generative Exploration', 'Cross-Team Collaboration'].map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-mono bg-stone-300/30 text-stone-600 px-2 py-1 rounded-sm">{tag}</span>
                    ))}
                </div>
            </div>
            
             <div className="hidden md:flex gap-6 mt-auto pt-8">
                <a href="#" className="text-xs font-bold text-stone-400 hover:text-[#EB431D]">TWITTER</a>
                <a href="#" className="text-xs font-bold text-stone-400 hover:text-[#1156D0]">GITHUB</a>
                <a href="#" className="text-xs font-bold text-stone-400 hover:text-[#1A824E]">EMAIL</a>
            </div>
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="flex-1 border-t md:border-t-0 md:border-l border-stone-300/50 pt-8 md:pt-0 md:pl-12 flex flex-col">
            <div className="text-base font-medium text-stone-800 leading-relaxed mb-8 space-y-4">
                <p>I design visual systems that support clarity at scale.</p>
                <p>My work centers on building structured illustration frameworks, aligning multi-contributor output, and translating complex ideas into accessible visual language.</p>
                <p>I’m interested in how design decisions sustain over time — across teams, tools, and evolving production environments.</p>
                
                <div className="pt-2">
                    <p className="mb-2">Rather than focusing on individual outputs, I focus on:</p>
                    <ul className="list-none space-y-1 text-stone-600 pl-4 border-l-2 border-[#1D3557]/20">
                        <li>• repeatable visual logic</li>
                        <li>• consistency across contributors</li>
                        <li>• documentation that supports alignment</li>
                        <li>• workflows that allow iteration without fragmentation</li>
                    </ul>
                </div>

                <p>Emerging tools are part of my process, but structure remains the foundation.</p>
                <p className="font-bold text-[#1D3557]">Strong design is not only expressive — it is durable.</p>
            </div>

             {/* Mobile social links */}
             <div className="flex md:hidden gap-6 mt-8 pt-4 border-t border-stone-200/50">
                <a href="#" className="text-xs font-bold text-stone-400 hover:text-[#EB431D]">TWITTER</a>
                <a href="#" className="text-xs font-bold text-stone-400 hover:text-[#1156D0]">GITHUB</a>
                <a href="#" className="text-xs font-bold text-stone-400 hover:text-[#1A824E]">EMAIL</a>
            </div>
        </div>
        </div>
    </div>
  );
};

const ProjectDetail = ({ project, onClose, onToggleMenu }: { project: Project; onClose: () => void, onToggleMenu: (v: boolean) => void }) => {
    const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
    
    useEffect(() => { if(scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; }, [project, scrollContainerRef]);

    return (
        <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full h-full flex flex-col pt-24 px-8 md:px-24 pointer-events-auto overflow-y-auto overflow-x-hidden bg-[#E5DED0]/30 backdrop-blur-md"
            onWheel={(e) => e.stopPropagation()} 
        >
            <button onClick={onClose} className="fixed top-8 right-8 z-50 text-xs font-mono font-bold tracking-widest text-stone-500 hover:text-[#EB431D] transition-colors flex items-center gap-2 bg-white/80 border border-[#D9D9D9] px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
                CLOSE <span className="text-lg">×</span>
            </button>
            <div className="max-w-4xl mx-auto w-full pb-32 pt-16 md:pt-0">
                <div className="mb-16 pb-8 bg-white/40 border border-[#D9D9D9] p-8 rounded-sm backdrop-blur-sm shadow-sm">
                    <span className="text-xs font-mono text-stone-400 mb-4 block tracking-widest">{project.year} — {project.category}</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#1D3557] leading-[0.9] mb-8">{project.title}</h1>
                    <div className="flex flex-wrap gap-4 text-xs font-mono">
                        <span className="bg-[#1D3557] text-white px-3 py-1 rounded-sm">{project.role}</span>
                        <span className="bg-white/80 border border-stone-200/50 px-3 py-1 text-stone-500 rounded-sm">CLIENT: CONFIDENTIAL</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-8 bg-white/40 border border-[#D9D9D9] p-8 rounded-sm backdrop-blur-sm h-fit shadow-sm">
                        <p className="text-xl font-medium leading-relaxed text-stone-800 mb-12">{project.description}</p>
                        <div className="space-y-6 text-stone-600 font-serif text-lg leading-relaxed mb-12">
                            {project.content.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                        </div>

                        {/* Image Grid Section */}
                        {project.images && project.images.length > 0 && (
                             <div className="space-y-8 border-t border-stone-200 pt-8 mt-12">
                                <h3 className="text-xs font-mono font-bold text-[#1D3557] tracking-widest uppercase mb-6">Featured Works</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {project.images.map((imgSrc, idx) => (
                                        <ImageCard key={idx} src={imgSrc} index={idx} />
                                    ))}
                                </div>
                             </div>
                        )}

                        {/* Video Section */}
                        {project.videos && project.videos.length > 0 && (
                            <div className="space-y-8 border-t border-stone-200 pt-8 mt-8">
                                <h3 className="text-xs font-mono font-bold text-[#1D3557] tracking-widest uppercase mb-6">Visual Documentation</h3>
                                <div className="grid grid-cols-1 gap-8">
                                    {project.videos.map((videoId, index) => (
                                        <div key={index} className="w-full aspect-video bg-black/5 rounded-sm overflow-hidden border border-[#D9D9D9] shadow-sm">
                                            <iframe 
                                                width="100%" 
                                                height="100%" 
                                                src={`https://www.youtube.com/embed/${videoId}`} 
                                                title={`Project Video ${index + 1}`} 
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                referrerPolicy="strict-origin-when-cross-origin" 
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AiDetail = ({ item, onClose, onToggleMenu }: { item: AiItem; onClose: () => void, onToggleMenu: (v: boolean) => void }) => {
    const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
    
    useEffect(() => { if(scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; }, [item, scrollContainerRef]);

    return (
        <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full h-full flex flex-col pt-24 px-8 md:px-24 pointer-events-auto overflow-y-auto overflow-x-hidden bg-[#E5DED0]/30 backdrop-blur-md"
            onWheel={(e) => e.stopPropagation()} 
        >
            <button onClick={onClose} className="fixed top-8 right-8 z-50 text-xs font-mono font-bold tracking-widest text-stone-500 hover:text-[#1156D0] transition-colors flex items-center gap-2 bg-white/80 border border-[#D9D9D9] px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
                CLOSE <span className="text-lg">×</span>
            </button>
            <div className="max-w-4xl mx-auto w-full pb-32 pt-16 md:pt-0">
                <div className="mb-16 pb-8 bg-white/40 border border-[#D9D9D9] p-8 rounded-sm backdrop-blur-sm shadow-sm">
                    <span className="text-xs font-mono text-stone-400 mb-4 block tracking-widest">SYSTEM_MODULE — {item.subtitle}</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#1D3557] leading-[0.9] mb-8">{item.title}</h1>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono border border-[#1D3557] text-[#1D3557] px-2 py-1 rounded-sm uppercase">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-8 bg-white/40 border border-[#D9D9D9] p-8 rounded-sm backdrop-blur-sm h-fit shadow-sm">
                         <p className="text-xl font-medium leading-relaxed text-stone-800 mb-12">{item.fullDescription}</p>
                         <div className="space-y-6 text-stone-600 font-serif text-lg leading-relaxed">
                            {item.content.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                        </div>
                    </div>
                    
                    {/* Metrics Section: Conditionally Rendered */}
                    {item.metrics && item.metrics.length > 0 && (
                        <div className="md:col-span-4 space-y-4">
                            <div className="p-4 bg-[#1156D0]/5 border border-[#D9D9D9] rounded-sm backdrop-blur-sm">
                                <h4 className="text-xs font-bold text-[#1156D0] mb-4">METRICS</h4>
                                <div className="space-y-4">
                                    {item.metrics.map((metric, i) => (
                                        <div key={i}>
                                            <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1">{metric.label}</span>
                                            <span className="block text-lg font-bold text-[#1D3557]">{metric.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

export const Content: React.FC<ContentProps> = ({ section, activeProject, activeAiItem, onSelectProject, onSelectAiItem, onClose, onToggleMenu }) => {
  return (
    <div className={`fixed inset-0 z-10 flex ${section === Section.DETAIL ? 'items-start' : 'items-center'} justify-center pointer-events-none`}>
      <AnimatePresence mode="wait">
        {section === Section.HOME && (
             <motion.div 
               key="home" 
               className="w-full h-full pointer-events-auto"
               variants={contentVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
             >
               <HomeContent onToggleMenu={onToggleMenu} />
             </motion.div>
        )}
        {section === Section.AI && !activeAiItem && (
             <motion.div 
               key="ai" 
               className="w-full h-full pointer-events-auto"
               variants={contentVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
             >
               <AIContent onSelect={onSelectAiItem} onToggleMenu={onToggleMenu} />
             </motion.div>
        )}
        {section === Section.WORK && (
             <motion.div 
               key="work" 
               className="w-full h-full pointer-events-auto"
               variants={contentVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
             >
               <WorkContent onSelect={onSelectProject} onToggleMenu={onToggleMenu} />
             </motion.div>
        )}
        {section === Section.ABOUT && (
             <motion.div 
               key="about" 
               className="w-full h-full pointer-events-auto"
               variants={contentVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
             >
               <AboutContent onToggleMenu={onToggleMenu} />
             </motion.div>
        )}
        {section === Section.DETAIL && activeProject && (
             <motion.div 
               key="detail" 
               className="w-full h-full pointer-events-auto"
               variants={contentVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
             >
                 <ProjectDetail project={activeProject} onClose={onClose} onToggleMenu={onToggleMenu} />
             </motion.div>
        )}
        {section === Section.DETAIL && activeAiItem && (
             <motion.div 
               key="ai-detail" 
               className="w-full h-full pointer-events-auto"
               variants={contentVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
             >
                 <AiDetail item={activeAiItem} onClose={onClose} onToggleMenu={onToggleMenu} />
             </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
