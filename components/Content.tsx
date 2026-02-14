
import React, { useRef, useEffect, useState } from 'react';
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
    transition: { delay: 0.1, duration: 0.6, ease: "easeInOut" }
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

const ShatterChar = ({ char, magnitude = 300 }: { char: string, magnitude?: number }) => {
    const [animState, setAnimState] = useState({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
    
    const handleEnter = () => {
        // Calculate dynamic random values for every interaction
        const newX = (Math.random() - 0.5) * magnitude; 
        const newY = (Math.random() - 0.5) * magnitude; 
        const newR = (Math.random() - 0.5) * 120;
        const newS = 0.5 + Math.random() * 0.5;

        // Shatter State
        setAnimState({ x: newX, y: newY, rotate: newR, scale: newS, opacity: 0.4 });

        // Auto-Reset after delay
        setTimeout(() => {
            setAnimState({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
        }, 700);
    };

    return (
        <motion.span
            className="inline-block cursor-pointer select-none"
            onMouseEnter={handleEnter}
            animate={animState}
            transition={{ 
                type: "spring", 
                stiffness: 250, 
                damping: 18,
                mass: 0.8 
            }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
};

const ShatterTitle = ({ text, className, magnitude = 300 }: { text: string, className?: string, magnitude?: number }) => {
    return (
        <div className={className}>
            {text.split("").map((char, i) => (
                <ShatterChar key={i} char={char} magnitude={magnitude} />
            ))}
        </div>
    );
};

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
            {/* The Image - No Tint, Original Color */}
            <motion.img 
                src={src} 
                alt={`Illustration ${index + 1}`}
                className="w-full h-full object-cover"
                variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.05 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
            
            {/* Colored Border Reveal - Thinner (2px) to match other boxes */}
            <motion.div 
                className="absolute inset-0 border-[2px] pointer-events-none z-10"
                style={{ borderColor: borderColor }}
                variants={{
                    initial: { opacity: 0, scale: 0.98 },
                    hover: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    );
};

// --- Glass Card Component ---
// Manages the smooth transition of blur and opacity for "silky" feel
const GlassCard = ({ 
    children, 
    className = "", 
    onClick,
    delay = 0,
    hoverEffect = false,
    initialBlur = "0px",
    targetBlur = "12px"
}: { 
    children: React.ReactNode; 
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
    delay?: number;
    hoverEffect?: boolean;
    initialBlur?: string;
    targetBlur?: string;
}) => {
    return (
        <motion.div
            onClick={onClick}
            className={`
                relative border border-[#D9D9D9] 
                shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] 
                rounded-sm overflow-hidden 
                ${hoverEffect ? 'cursor-pointer group' : ''}
                ${className}
            `}
            initial={{ 
                opacity: 0, 
                backdropFilter: `blur(${initialBlur})`,
                backgroundColor: "rgba(229, 222, 208, 0)" 
            }}
            animate={{ 
                opacity: 1, 
                backdropFilter: `blur(${targetBlur})`,
                backgroundColor: "rgba(229, 222, 208, 0.6)" 
            }}
            whileHover={hoverEffect ? { 
                scale: 1.01, 
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(16px)",
                transition: { duration: 0.4, ease: "easeOut" }
            } : {}}
            transition={{ 
                duration: 0.8, 
                ease: [0.2, 0, 0.2, 1], // Cubic-bezier for smooth 'fogging' up
                delay: delay
            }}
            style={{ willChange: "transform, opacity, backdrop-filter" }}
        >
            {children}
        </motion.div>
    );
};

// --- Section Components ---

const HomeContent = ({ onToggleMenu }: { onToggleMenu: (v: boolean) => void }) => {
  const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
  
  return (
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex flex-col justify-center items-center pt-24 md:pt-0 overflow-y-auto overflow-x-hidden"
      >
        <div className="relative z-10 text-center mix-blend-multiply cursor-default flex flex-col items-center">
            {/* Static Title (No Animation) */}
            <h1 className="text-[15vw] font-bold tracking-tighter text-[#1D3557] leading-[0.9] select-none flex flex-wrap justify-center gap-2 md:gap-4">
                YUQI LU
            </h1>
            
            {/* Animated Subtitle (Keep Shatter Effect) */}
             <ShatterTitle 
                text="Illustrator & Designer"
                className="text-lg md:text-2xl font-mono text-stone-500 tracking-[0.2em] mt-4 uppercase select-none"
                magnitude={50}
            />
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
            <GlassCard 
                key={item.id} 
                onClick={() => onSelect(item)}
                delay={i * 0.1}
                hoverEffect={true}
                className="p-8 flex flex-col h-full"
            >
                <h3 className="text-xs font-mono text-stone-500 mb-4 tracking-widest">{item.subtitle}</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1D3557] mb-4 leading-none">{item.title}</h2>
                <p className="text-sm font-mono text-stone-600 mb-6 flex-grow">{item.description}</p>
                <div className="flex justify-end mt-auto">
                    <span className="text-xs font-bold text-[#1156D0] opacity-0 group-hover:opacity-100 transition-opacity">ACCESS &rarr;</span>
                </div>
            </GlassCard>
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
        <GlassCard className="w-full mb-8 pb-2 flex justify-between items-end p-4 flex-shrink-0" delay={0}>
            <span className="text-xs font-mono font-bold text-[#1D3557]">PROJECT_INDEX</span>
            <span className="text-xs font-mono text-stone-400">SELECT TO VIEW</span>
        </GlassCard>

        <div className="flex flex-col gap-2 pb-32 md:pb-12">
        {PROJECTS.map((project, i) => (
            <GlassCard 
                key={project.id} 
                onClick={() => onSelect(project)}
                delay={0.1 + (i * 0.1)}
                hoverEffect={true}
                className="p-6"
            >
                <div className="flex flex-col md:flex-row md:items-start justify-between relative z-10 gap-4">
                    <span className="font-mono text-xs text-stone-400 pt-1 md:pt-2">0{i + 1}</span>
                    
                    <div className="flex-1 flex flex-col">
                         <h3 className="text-2xl md:text-4xl font-bold text-stone-500 group-hover:text-[#1D3557] transition-colors duration-300 leading-tight">{project.title}</h3>
                         <p className="text-base md:text-lg text-stone-400 group-hover:text-stone-600 transition-colors duration-300 mt-2 leading-relaxed font-normal">{project.description}</p>
                    </div>

                    <span className="font-mono text-xs text-stone-500 pt-1 md:pt-2 group-hover:text-[#EB431D] text-right md:w-48">{project.category}</span>
                </div>
            </GlassCard>
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
        <GlassCard 
            className="p-8 md:p-12 shadow-xl max-w-5xl w-full flex flex-col md:flex-row gap-12 relative z-10 mb-32 md:mb-12 flex-shrink-0"
            hoverEffect={true}
            delay={0.2}
        >
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
                
                {/* TOOLS SECTION */}
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
        </GlassCard>
    </div>
  );
};

const ProjectDetail = ({ project, onClose, onSelectProject, onToggleMenu }: { project: Project; onClose: () => void; onSelectProject: (p:Project) => void; onToggleMenu: (v: boolean) => void }) => {
    const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
    
    useEffect(() => { if(scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; }, [project, scrollContainerRef]);

    const nextIndex = (PROJECTS.findIndex(p => p.id === project.id) + 1) % PROJECTS.length;
    const nextProject = PROJECTS[nextIndex];

    return (
        <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(229, 222, 208, 0)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)", backgroundColor: "rgba(229, 222, 208, 0.3)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(229, 222, 208, 0)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onClick={onClose} 
            className="fixed inset-0 w-full h-full flex flex-col pt-24 px-8 md:px-24 pointer-events-auto overflow-y-auto overflow-x-hidden cursor-pointer z-20"
            onWheel={(e) => e.stopPropagation()} 
        >
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="fixed top-8 right-8 z-50 text-xs font-mono font-bold tracking-widest text-stone-500 hover:text-[#EB431D] transition-colors flex items-center gap-2 bg-white/80 border border-[#D9D9D9] px-4 py-2 rounded-full backdrop-blur-sm shadow-sm cursor-pointer">
                CLOSE <span className="text-lg">×</span>
            </button>
            <div className="max-w-4xl mx-auto w-full pb-64 pt-16 md:pt-0 cursor-auto" onClick={(e) => e.stopPropagation()}>
                <GlassCard className="mb-16 p-8 !border-0" delay={0.2} initialBlur="0px" targetBlur="20px">
                    <span className="text-xs font-mono text-stone-400 mb-4 block tracking-widest">
                        {project.id === 'work-personal' ? 'Self-Initiated Work / Ongoing Series' : `${project.year} — ${project.category}`}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#1D3557] leading-[0.9] mb-8">{project.title}</h1>
                    <div className="flex flex-wrap gap-4 text-xs font-mono">
                        <span className="bg-[#1D3557] text-white px-3 py-1 rounded-sm">{project.role}</span>
                        <span className="bg-white/80 border border-stone-200/50 px-3 py-1 text-stone-500 rounded-sm">
                            {project.client ? project.client : 'CLIENT: CONFIDENTIAL'}
                        </span>
                    </div>
                </GlassCard>
                
                <GlassCard className="w-full p-8 h-fit" delay={0.4} initialBlur="0px" targetBlur="20px">
                    <p className="text-xl font-medium leading-relaxed text-stone-800 mb-12">{project.description}</p>
                    {/* UPDATED: Typography matches About Content (sans-serif, medium weight, stone-800) */}
                    <div className="space-y-4 text-base font-medium text-stone-800 leading-relaxed mb-12">
                        {project.content.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                    </div>

                    {project.images && project.images.length > 0 && (
                            <div className="space-y-8 border-t border-stone-200 pt-8 mt-12">
                            <h3 className="text-xs font-mono font-bold text-[#1D3557] tracking-widest uppercase mb-6">Featured Works</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {project.images.map((imgSrc, idx) => (
                                    <ImageCard key={idx} src={imgSrc} index={idx} />
                                ))}
                            </div>
                            </div>
                    )}

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
                </GlassCard>

                <div className="w-full mt-24 pt-12 border-t-2 border-[#1D3557]/10 flex flex-col items-end">
                     <button 
                        onClick={(e) => { e.stopPropagation(); onSelectProject(nextProject); }}
                        className="group text-right w-full md:w-auto flex items-center justify-end gap-6 cursor-pointer"
                     >
                        <div className="flex flex-col items-end">
                            <span className="block text-xs font-mono text-stone-400 tracking-widest group-hover:text-[#EB431D] transition-colors mb-1">NEXT PROJECT</span>
                             <span className="block text-xs font-mono font-bold tracking-widest text-[#1D3557] group-hover:text-[#EB431D] transition-colors duration-300">
                                {nextProject.title}
                             </span>
                        </div>
                        <span className="text-2xl text-[#1D3557] group-hover:text-[#EB431D] group-hover:translate-x-2 transition-all duration-300">
                           &rarr;
                        </span>
                     </button>
                </div>
            </div>
        </motion.div>
    );
};

const AiDetail = ({ item, onClose, onToggleMenu }: { item: AiItem; onClose: () => void, onToggleMenu: (v: boolean) => void }) => {
    const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
    
    useEffect(() => { if(scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; }, [item, scrollContainerRef]);

    return (
        <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(229, 222, 208, 0)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)", backgroundColor: "rgba(229, 222, 208, 0.3)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(229, 222, 208, 0)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onClick={onClose}
            className="fixed inset-0 w-full h-full flex flex-col pt-24 px-8 md:px-24 pointer-events-auto overflow-y-auto overflow-x-hidden cursor-pointer z-20"
            onWheel={(e) => e.stopPropagation()} 
        >
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="fixed top-8 right-8 z-50 text-xs font-mono font-bold tracking-widest text-stone-500 hover:text-[#1156D0] transition-colors flex items-center gap-2 bg-white/80 border border-[#D9D9D9] px-4 py-2 rounded-full backdrop-blur-sm shadow-sm cursor-pointer">
                CLOSE <span className="text-lg">×</span>
            </button>
            <div className="max-w-4xl mx-auto w-full pb-64 pt-16 md:pt-0 cursor-auto" onClick={(e) => e.stopPropagation()}>
                <GlassCard className="mb-16 p-8 !border-0" delay={0.2} initialBlur="0px" targetBlur="20px">
                    <span className="text-xs font-mono text-stone-400 mb-4 block tracking-widest">SYSTEM_MODULE — {item.subtitle}</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#1D3557] leading-[0.9] mb-8">{item.title}</h1>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono border border-[#1D3557] text-[#1D3557] px-2 py-1 rounded-sm uppercase">{tag}</span>
                        ))}
                    </div>
                </GlassCard>
                {item.customHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: item.customHtml }} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        <GlassCard className="md:col-span-8 p-8 h-fit" delay={0.4} initialBlur="0px" targetBlur="20px">
                            <p className="text-xl font-medium leading-relaxed text-stone-800 mb-12">{item.fullDescription}</p>
                            <div className="space-y-4 text-base font-medium text-stone-800 leading-relaxed">
                                {item.content.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                            </div>
                        </GlassCard>
                        
                        {item.metrics && item.metrics.length > 0 && (
                            <div className="md:col-span-4 space-y-4">
                                <GlassCard className="p-4" delay={0.6} initialBlur="0px" targetBlur="20px">
                                    <h4 className="text-xs font-bold text-[#1156D0] mb-4">METRICS</h4>
                                    <div className="space-y-4">
                                        {item.metrics.map((metric, i) => (
                                            <div key={i}>
                                                <span className="block text-[10px] font-mono text-stone-500 uppercase tracking-wider mb-1">{metric.label}</span>
                                                <span className="block text-lg font-bold text-[#1D3557]">{metric.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
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
        {/* Note: Detail views are no longer wrapped in generic motion.div because they handle their own full-screen entrance now */}
        {section === Section.DETAIL && activeProject && (
             <ProjectDetail 
                key="detail"
                project={activeProject} 
                onClose={onClose} 
                onSelectProject={onSelectProject}
                onToggleMenu={onToggleMenu} 
             />
        )}
        {section === Section.DETAIL && activeAiItem && (
             <AiDetail 
                key="ai-detail"
                item={activeAiItem} 
                onClose={onClose} 
                onToggleMenu={onToggleMenu} 
            />
        )}
      </AnimatePresence>
    </div>
  );
};
