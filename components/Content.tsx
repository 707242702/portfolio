
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Project, AiItem, ProjectModule } from '../types';
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

interface ShatterCharProps {
  char: string;
  magnitude?: number;
  enableColor?: boolean;
}

const ShatterChar: React.FC<ShatterCharProps> = ({ char, magnitude = 300, enableColor = true }) => {
    const [animState, setAnimState] = useState({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
    const [color, setColor] = useState<string>('inherit');
    
    const handleEnter = () => {
        // Calculate dynamic random values for every interaction
        const newX = (Math.random() - 0.5) * magnitude; 
        const newY = (Math.random() - 0.5) * magnitude; 
        const newR = (Math.random() - 0.5) * 120;
        const newS = 0.5 + Math.random() * 0.5;
        
        // Pick a random system color for fun
        if (enableColor) {
            const systemColors = [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.ORANGE];
            const randomColor = systemColors[Math.floor(Math.random() * systemColors.length)];
            setColor(randomColor);
        }

        // Shatter State
        setAnimState({ x: newX, y: newY, rotate: newR, scale: newS, opacity: 0.8 });

        // Auto-Reset after delay
        setTimeout(() => {
            setAnimState({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
            setColor('inherit');
        }, 700);
    };

    return (
        <motion.span
            className="inline-block cursor-pointer select-none transition-colors duration-300"
            onMouseEnter={handleEnter}
            animate={animState}
            style={{ color }}
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

interface ShatterTitleProps {
  text: string;
  className?: string;
  magnitude?: number;
  enableColor?: boolean;
}

const ShatterTitle: React.FC<ShatterTitleProps> = ({ text, className, magnitude = 300, enableColor = true }) => {
    return (
        <div className={className}>
            {text.split("").map((char, i) => (
                <ShatterChar key={i} char={char} magnitude={magnitude} enableColor={enableColor} />
            ))}
        </div>
    );
};

// Playful Tag Component for About Page
const PlayfulTag: React.FC<{ text: string }> = ({ text }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverColor, setHoverColor] = useState(COLORS.TEXT);

    return (
        <motion.span
            className="text-[10px] uppercase font-mono bg-stone-300/30 text-stone-600 px-2 py-1 rounded-sm cursor-pointer inline-block select-none border border-transparent"
            onMouseEnter={() => {
                setIsHovered(true);
                // Pick random color from system colors
                const colors = [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.ORANGE];
                setHoverColor(colors[Math.floor(Math.random() * colors.length)]);
            }}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? (Math.random() * 6 - 3) : 0, // Random tilt +/- 3deg
                color: isHovered ? hoverColor : '#57534e', // stone-600
                backgroundColor: isHovered ? '#ffffff' : 'rgba(214, 211, 209, 0.3)',
                borderColor: isHovered ? hoverColor : 'transparent'
            }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
            {text}
        </motion.span>
    );
};

interface ImageCardProps {
  src: string;
  index: number;
  aspectClass?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, index, aspectClass }) => {
    // Pick a random system color for the hover border
    const systemColors = [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.ORANGE];
    const borderColor = systemColors[index % systemColors.length];

    return (
        <motion.div 
            className={`relative w-full overflow-hidden bg-white rounded-sm shadow-sm border border-white cursor-pointer group ${aspectClass || 'h-full'}`}
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
            
            {/* Colored Border Reveal */}
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

// Single letter cell — static jpg by default, hover plays mp4 on top
const LetterCell: React.FC<{ src: string; imgSrc?: string; letter: string }> = ({ src, imgSrc, letter }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [active, setActive] = useState(false);

    const handleEnter = () => { setActive(true); videoRef.current?.play(); };
    const handleLeave = () => {
        setActive(false);
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    };

    return (
        <div
            className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* Static image */}
            {imgSrc && <img src={imgSrc} alt={letter} className="absolute inset-0 w-full h-full object-cover" />}
            {/* Video overlay — fades in on hover */}
            <video
                ref={videoRef}
                src={src}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                style={{ opacity: active ? 1 : 0 }}
            />
            <span className="absolute bottom-1.5 left-2 font-mono text-[9px] font-bold z-20 select-none text-black/30">
                {letter}
            </span>
        </div>
    );
};

// Tab system for Illustration Systems project
const IllustrationTabSystem: React.FC<{ project: Project }> = ({ project }) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabColors = [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.ORANGE];
    const modules = project.modules || [];

    return (
        <div>
            {/* Console label above tabs */}
            <p className="font-mono text-[9px] text-stone-300 tracking-[0.25em] mb-3 uppercase select-none">
                // NAVIGATE_SYSTEMS
            </p>

            {/* Tab bar */}
            <div className="flex border-b border-[#D9D9D9] mb-10 overflow-x-auto">
                {modules.map((module, i) => {
                    const isActive = activeTab === i;
                    const color = tabColors[i];
                    return (
                        <button
                            key={module.id}
                            onMouseEnter={() => setActiveTab(i)}
                            className="group relative flex flex-col items-start px-6 py-4 font-mono text-xs tracking-[0.28em] uppercase cursor-pointer whitespace-nowrap shrink-0 border-0 outline-none transition-colors duration-150"
                            style={{
                                color: isActive ? color : '#a8a29e',
                                backgroundColor: isActive ? `${color}10` : 'transparent',
                                borderBottom: isActive ? `3px solid ${color}` : '3px solid transparent',
                            }}
                        >
                            <span
                                className="font-bold text-sm tracking-[0.22em] mb-1 transition-colors duration-100"
                                style={{ color: isActive ? color : undefined }}
                            >
                                {`SYS_0${i + 1}`}
                            </span>
                            <span className="transition-colors duration-100 group-hover:text-stone-800">
                                {module.title}
                            </span>
                            {/* Hover underline for inactive tabs */}
                            {!isActive && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-200" style={{ backgroundColor: color }} />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab content — instant switch, no animation */}
            {modules.map((module, i) => activeTab === i && (
                <div key={module.id}>
                    {/* Tagline */}
                    {module.tagline && (
                        <p className="font-mono text-[10px] text-stone-400 tracking-[0.2em] mb-3 uppercase">
                            {module.tagline}
                        </p>
                    )}

                    {/* Description */}
                    <p className="text-base font-medium text-stone-700 leading-relaxed mb-8 max-w-2xl">
                        {module.description}
                    </p>

                    {/* Tech specs */}
                    {module.specs && (
                        <div className="mb-10 font-mono text-[10px] border-l-2 border-stone-200 pl-4 space-y-2">
                            <p className="text-stone-400 tracking-[0.15em] mb-3 uppercase">[Tech Specs]</p>
                            {module.specs.map(spec => (
                                <div key={spec.label} className="flex gap-3">
                                    <span className="text-stone-400 w-20 shrink-0">{spec.label}</span>
                                    <span className="text-stone-500">// {spec.value}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Visual content */}
                    {module.localVideos ? (
                        // ALPHABET_SYS: 4 columns, static jpg + hover video
                        <div className="grid grid-cols-4 gap-1">
                            {module.localVideos.map((src, vi) => (
                                <LetterCell
                                    key={vi}
                                    src={src}
                                    imgSrc={module.localImages?.[vi]}
                                    letter={String.fromCharCode(65 + vi)}
                                />
                            ))}
                        </div>
                    ) : module.image ? (
                        // Other tabs: static, original color, no overlay
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                            <img
                                src={module.image}
                                alt={module.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.15em] text-stone-500 bg-white/80 px-2 py-1 uppercase">
                                Media — Pending Upload
                            </div>
                        </div>
                    ) : null}
                </div>
            ))}

            {/* Global System Note */}
            <div className="mt-16 pt-6 border-t border-stone-100 space-y-1.5">
                {project.content.map((para, i) => (
                    <p key={i} className="font-mono text-[9px] text-stone-300 tracking-wide leading-relaxed">
                        / {para}
                    </p>
                ))}
            </div>
        </div>
    );
};

interface ModuleCardProps {
    module: ProjectModule;
    index: number;
    minimal?: boolean;
    onClick?: () => void;
    isExpanded?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, index, minimal = false, onClick, isExpanded = false }) => {
    // Cycle system colors
    const colors = [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.ORANGE];
    const hoverColor = colors[index % colors.length];

    if (minimal) {
        return (
            <motion.div 
                className="group relative flex flex-col gap-2 cursor-pointer"
                initial="initial"
                whileHover="hover"
            >
                {/* Minimalist Tech Frame */}
                <div className="relative w-full aspect-square overflow-hidden bg-stone-100 border border-[#D9D9D9] p-1">
                    {module.image && (
                        <motion.img 
                            src={module.image} 
                            alt={module.title}
                            className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    )}
                    {/* Technical Crosshairs */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-stone-400 opacity-50" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-stone-400 opacity-50" />
                </div>
                
                {/* Minimalist Metadata */}
                <div className="flex justify-between items-end font-mono text-[9px] text-stone-500">
                    <div className="flex flex-col">
                        <span className="uppercase text-[#1D3557] font-bold group-hover:text-[var(--hover-color)] transition-colors" style={{ "--hover-color": hoverColor } as React.CSSProperties}>
                            {module.title}
                        </span>
                        <span className="opacity-70">{module.description}</span>
                    </div>
                    <span>0{index + 1}</span>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="group relative flex flex-col gap-4 cursor-pointer"
            initial="initial"
            whileHover="hover"
            style={{ "--hover-color": hoverColor } as React.CSSProperties}
            onClick={onClick}
        >
            {/* Image Container - High Contrast System Look */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-900 rounded-sm">
                {/* The Image */}
                {module.image && (
                    <motion.img 
                        src={module.image} 
                        alt={module.title}
                        className="w-full h-full object-cover opacity-90"
                        variants={{
                            initial: { scale: 1, filter: "grayscale(100%) contrast(1.2)" },
                            hover: { scale: 1.05, filter: "grayscale(0%) contrast(1.1)", opacity: 1 }
                        }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    />
                )}
                
                {/* System Overlay Grid/Scanline */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMCAwSDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30 pointer-events-none" />
                
                {/* Scan Bar Animation */}
                <motion.div 
                    className="absolute inset-0 w-full h-[2px] bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
                    variants={{
                        initial: { top: "-10%", opacity: 0 },
                        hover: { top: "110%", opacity: 1 }
                    }}
                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 0.2 }}
                />

                {/* Corner Markers */}
                <div className="absolute top-0 left-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-1.5 h-1.5 bg-white shadow-sm" />
                </div>
                <div className="absolute bottom-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-1.5 h-1.5 bg-white shadow-sm" />
                </div>
            </div>
            
            {/* Typography & Info */}
            <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest group-hover:text-[var(--hover-color)] transition-colors">SYS_0{index + 1}</span>
                    <motion.div 
                        className="h-[1px] bg-stone-300 flex-grow origin-left"
                        variants={{ initial: { scaleX: 0.2 }, hover: { scaleX: 1 } }}
                        transition={{ duration: 0.4 }}
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#1D3557] mb-1 group-hover:text-black transition-colors">{module.title}</h3>
                    {module.localVideos && (
                        <span className="text-[10px] font-mono text-stone-400 group-hover:text-[var(--hover-color)] transition-colors">
                            {isExpanded ? '[ − ]' : '[ + ]'}
                        </span>
                    )}
                </div>
                <p className="text-sm text-stone-500 font-medium leading-relaxed max-w-xs">{module.description}</p>

                {/* Interactive Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {module.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] font-mono uppercase tracking-wide transition-colors duration-300 text-[#a8a29e] group-hover:text-[var(--hover-color)]"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};


// --- Glass Card Component ---
// Manages the smooth transition of blur and opacity for "silky" feel

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  delay?: number;
  hoverEffect?: boolean;
  initialBlur?: string;
  targetBlur?: string;
  borderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  hoverBlur?: string;
  hoverScale?: number;
  mixBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'difference'; // New prop
}

const GlassCard: React.FC<GlassCardProps> = ({ 
    children, 
    className = "", 
    onClick,
    delay = 0,
    hoverEffect = false,
    initialBlur = "0px",
    targetBlur = "12px",
    borderColor = "border-[#D9D9D9]",
    backgroundColor = "rgba(229, 222, 208, 0.6)",
    hoverBackgroundColor = "rgba(255, 255, 255, 0.8)",
    hoverBlur = "16px",
    hoverScale = 1.01,
    mixBlendMode = 'normal'
}) => {
    return (
        <motion.div
            onClick={onClick}
            className={`
                relative border ${borderColor} 
                shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] 
                rounded-sm overflow-hidden 
                ${hoverEffect ? 'cursor-pointer group' : ''}
                ${className}
            `}
            initial={{ 
                opacity: 0, 
                backdropFilter: `blur(${initialBlur})`,
                backgroundColor: backgroundColor.replace('0.6', '0') // Start transparent-ish
            }}
            animate={{ 
                opacity: 1, 
                backdropFilter: `blur(${targetBlur})`,
                backgroundColor: backgroundColor
            }}
            whileHover={hoverEffect ? { 
                scale: hoverScale, 
                backgroundColor: hoverBackgroundColor,
                backdropFilter: `blur(${hoverBlur})`,
                transition: { duration: 0.4, ease: "easeOut" }
            } : {}}
            transition={{ 
                duration: 0.8, 
                ease: [0.2, 0, 0.2, 1], // Cubic-bezier for smooth 'fogging' up
                delay: delay
            }}
            style={{ 
                willChange: "transform, opacity, backdrop-filter",
                mixBlendMode: mixBlendMode // Apply blend mode
            }}
        >
            {children}
        </motion.div>
    );
};

// --- Section Components ---

interface HomeContentProps {
  onToggleMenu: (v: boolean) => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ onToggleMenu }) => {
  const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
  
  return (
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex flex-col justify-center items-center pt-24 md:pt-0 overflow-y-auto overflow-x-hidden"
      >
        <div className="relative z-10 text-center mix-blend-multiply cursor-default flex flex-col items-center">
             {/* Interactive Main Title - Colors Enabled */}
             <ShatterTitle 
                text="YUQI LU"
                className="text-[15vw] font-bold tracking-tighter text-[#1D3557] leading-[0.9] select-none flex flex-wrap justify-center gap-2 md:gap-4"
                magnitude={150}
                enableColor={true}
            />
            
            {/* Animated Subtitle - Motion ONLY, No Color Change */}
             <ShatterTitle 
                text="Illustrator & Designer"
                className="text-lg md:text-2xl font-mono text-stone-500 tracking-[0.2em] mt-4 uppercase select-none"
                magnitude={50}
                enableColor={false}
            />
        </div>
      </div>
  );
};

interface AIContentProps {
  onSelect: (item: AiItem) => void;
  onToggleMenu: (v: boolean) => void;
}

const AIContent: React.FC<AIContentProps> = ({ onSelect, onToggleMenu }) => {
  const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);

  const decodableItems = AI_ITEMS.filter(item => ['ai-illustration', 'ai-style', 'ai-production'].includes(item.id));
  const infraItems = AI_ITEMS.filter(item => ['ai-orchestrated', 'ai-app-gallery'].includes(item.id));

  const renderCard = (item: AiItem, i: number, delay: number) => (
    <GlassCard
        key={item.id}
        onClick={() => onSelect(item)}
        delay={delay}
        hoverEffect={true}
        hoverScale={1.02}
        className="p-8 flex flex-col h-full"
    >
        <h3 className="text-xs font-mono text-stone-500 mb-4 tracking-[0.1em] group-hover:text-[#EB431D] transition-colors duration-300">{item.subtitle}</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1D3557] mb-4 leading-none whitespace-pre-line group-hover:text-black transition-colors duration-300">{item.title}</h2>
        <p className="text-sm font-mono text-stone-600 mb-6 flex-grow group-hover:text-stone-800 transition-colors duration-300">{item.description}</p>
        <div className="flex justify-end mt-auto">
            <span className="text-xs font-bold text-[#EB431D] opacity-0 group-hover:opacity-100 transition-opacity duration-300">ACCESS &rarr;</span>
        </div>
    </GlassCard>
  );

  return (
    <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full flex flex-col justify-start px-8 md:px-24 pt-48 md:pt-64 overflow-y-auto overflow-x-hidden"
    >
        <div className="pb-32 md:pb-12 max-w-6xl mx-auto w-full">
            {/* Group A: Decodable Illustration System */}
            <div className="mb-5 flex items-center gap-3">
                <div className="w-1 h-5 rounded-full bg-[#EB431D]"></div>
                <span className="text-xs font-mono text-[#EB431D] font-semibold tracking-[0.08em] uppercase">A — Decodable Illustration System</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {decodableItems.map((item, i) => renderCard(item, i, i * 0.1))}
            </div>

            {/* Group B: AI Infrastructure */}
            <div className="mb-5 flex items-center gap-3">
                <div className="w-1 h-5 rounded-full bg-[#1156D0]"></div>
                <span className="text-xs font-mono text-[#1156D0] font-semibold tracking-[0.08em] uppercase">B — AI Infrastructure</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {infraItems.map((item, i) => renderCard(item, i, 0.3 + i * 0.1))}
            </div>
        </div>
    </div>
  );
};

interface WorkContentProps {
  onSelect: (p: Project) => void;
  onToggleMenu: (v: boolean) => void;
}

const WorkContent: React.FC<WorkContentProps> = ({ onSelect, onToggleMenu }) => {
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
                // Removed borderColor="border-white" to use default #D9D9D9 like AI page
            >
                <div className="flex flex-col md:flex-row md:items-start justify-between relative z-10 gap-6 md:gap-8">
                    {/* Index */}
                    <span className="font-mono text-xs text-stone-400 pt-1 md:pt-2 w-8 shrink-0">0{i + 1}</span>
                    
                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                         <h3 className="text-2xl md:text-4xl font-bold text-stone-500 group-hover:text-[#1D3557] transition-colors duration-300 leading-tight uppercase">{project.title}</h3>
                         {/* Removed uppercase, reduced size */}
                         <p className="text-sm md:text-base text-stone-400 group-hover:text-stone-600 transition-colors duration-300 mt-2 leading-relaxed font-normal max-w-2xl tracking-wide">
                            {project.description}
                         </p>
                    </div>

                    {/* Right Column: Category - Removed [VIEW CASE STUDY] */}
                    <div className="flex flex-col items-end pt-1 md:pt-2 md:w-64 shrink-0 gap-3">
                        <span className="font-mono text-xs text-stone-500 group-hover:text-[#EB431D] text-right transition-colors uppercase tracking-tight leading-snug">
                            {project.category}
                        </span>
                    </div>
                </div>
            </GlassCard>
        ))}
        </div>
    </div>
  );
};

interface AboutContentProps {
  onToggleMenu: (v: boolean) => void;
}

const AboutContent: React.FC<AboutContentProps> = ({ onToggleMenu }) => {
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
                    <ShatterTitle 
                        text="YUQI LU" 
                        className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D3557] leading-[0.9] mb-6 flex flex-wrap gap-x-4 cursor-default"
                        magnitude={30} // Less explosive than home
                        enableColor={true} // Default to true
                    />
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
                            <PlayfulTag key={tag} text={tag} />
                        ))}
                    </div>
                </div>
                
                <div className="hidden md:flex gap-6 mt-auto pt-8">
                    {['TWITTER', 'GITHUB', 'EMAIL'].map((social) => (
                        <a key={social} href="#" className="text-xs font-bold text-stone-400 hover:text-stone-600 transition-colors flex">
                             <ShatterTitle text={social} magnitude={5} enableColor={true} />
                        </a>
                    ))}
                </div>
            </div>
            
            {/* RIGHT COLUMN */}
            <div className="flex-1 border-t md:border-t-0 md:border-l border-stone-300/50 pt-8 md:pt-0 md:pl-12 flex flex-col">
                <div className="text-base font-medium text-stone-800 leading-relaxed mb-8 space-y-4">
                    <motion.p whileHover={{ x: 5, color: COLORS.BLUE }} transition={{ type: 'spring', stiffness: 300 }} className="cursor-default">
                        I design visual systems that support clarity at scale.
                    </motion.p>
                    <motion.p whileHover={{ x: 5, color: COLORS.RED }} transition={{ type: 'spring', stiffness: 300 }} className="cursor-default">
                        My work centers on building structured illustration frameworks, aligning multi-contributor output, and translating complex ideas into accessible visual language.
                    </motion.p>
                    <motion.p whileHover={{ x: 5, color: COLORS.GREEN }} transition={{ type: 'spring', stiffness: 300 }} className="cursor-default">
                        I’m interested in how design decisions sustain over time — across teams, tools, and evolving production environments.
                    </motion.p>
                    
                    <div className="pt-2">
                        <p className="mb-2">Rather than focusing on individual outputs, I focus on:</p>
                        <ul className="list-none space-y-1 text-stone-600 pl-4 border-l-2 border-[#1D3557]/20 hover:border-[#1D3557] transition-colors">
                            {['repeatable visual logic', 'consistency across contributors', 'documentation that supports alignment', 'workflows that allow iteration without fragmentation'].map(item => (
                                <motion.li 
                                    key={item} 
                                    whileHover={{ x: 5, color: COLORS.ORANGE }}
                                    className="cursor-default"
                                >
                                    • {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <motion.p whileHover={{ x: 5, color: COLORS.TEXT }} transition={{ type: 'spring', stiffness: 300 }} className="cursor-default">
                        Emerging tools are part of my process, but structure remains the foundation.
                    </motion.p>
                    <motion.p 
                        className="font-bold text-[#1D3557] cursor-default"
                        whileHover={{ scale: 1.02, originX: 0 }}
                    >
                        Strong design is not only expressive — it is durable.
                    </motion.p>
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

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onToggleMenu: (v: boolean) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onSelectProject, onToggleMenu }) => {
    const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
    const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

    useEffect(() => { if(scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; setExpandedModuleId(null); }, [project, scrollContainerRef]);

    const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    
    const nextProject = PROJECTS[nextIndex];
    const prevProject = PROJECTS[prevIndex];

    // Determine layout config based on project type
    const getLayoutConfig = (id: string) => {
        if (id === 'work-personal') {
             return { 
                 containerClass: 'columns-2 md:columns-4 gap-4 space-y-4', 
                 itemClass: 'mb-4 break-inside-avoid aspect-auto' 
             };
        }
        if (id === 'work-illustration') {
             return { 
                 containerClass: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6', 
                 itemClass: 'aspect-square' 
             };
        }
        if (['work-marketing', 'work-spatial'].includes(id)) {
             return { 
                 containerClass: 'grid grid-cols-1 md:grid-cols-2 gap-6', 
                 itemClass: 'aspect-[4/3]' 
             };
        }
        // Fallback
        return { 
            containerClass: 'flex flex-col gap-8', 
            itemClass: 'aspect-video w-full' 
        };
    };

    const layout = getLayoutConfig(project.id);
    const isMotionProject = project.id === 'work-motion';

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
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="fixed top-8 right-8 z-50 text-xs font-mono font-bold tracking-widest text-stone-500 hover:text-[#EB431D] transition-colors flex items-center gap-2 bg-white/80 border border-white px-4 py-2 rounded-full backdrop-blur-sm shadow-sm cursor-pointer">
                CLOSE <span className="text-lg">×</span>
            </button>
            <div className="max-w-4xl mx-auto w-full pb-64 pt-16 md:pt-0 cursor-auto" onClick={(e) => e.stopPropagation()}>
                {/* TITLE CARD */}
                <GlassCard 
                    className="mb-16 p-8 border-0 shadow-none" 
                    delay={0.2} 
                    initialBlur="0px" 
                    targetBlur="0px"
                    backgroundColor="transparent"
                    borderColor="border-transparent"
                    hoverEffect={false}
                >
                    <span className="text-xs font-mono text-stone-400 mb-4 block tracking-widest uppercase">
                        {project.id === 'work-personal' ? 'Self-Initiated Work / Ongoing Series' : `${project.year} — ${project.category}`}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#1D3557] leading-[0.9] mb-8 uppercase">{project.title}</h1>
                    <div className="flex flex-wrap gap-4 text-xs font-mono">
                        <span className="bg-[#1D3557] text-white px-3 py-1 rounded-sm uppercase">{project.role}</span>
                        <span className="bg-white/80 border border-white px-3 py-1 text-stone-500 rounded-sm uppercase">
                            {project.client}
                        </span>
                    </div>
                </GlassCard>
                
                {/* CONTENT CARD */}
                <GlassCard 
                    className="w-full p-8 h-fit transition-colors duration-300" 
                    delay={0.4} 
                    initialBlur="0px" 
                    targetBlur="0px" 
                    backgroundColor="rgba(253, 252, 250, 0.92)" 
                    hoverEffect={false}
                    hoverScale={1}
                    borderColor="border-[#E5E5E5]"
                >
                    <p className="text-xl font-medium leading-relaxed text-stone-800 mb-12 uppercase">{project.description}</p>

                    {project.id === 'work-illustration' ? (
                        /* Illustration Systems: Tab-based layout */
                        <IllustrationTabSystem project={project} />
                    ) : (
                        <>
                            {/* SECTION 1: MODULES / GIF GRID */}
                            {project.modules && project.modules.length > 0 && (
                                <div className="mb-16">
                                    <div className={`${isMotionProject ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : layout.containerClass}`}>
                                        {project.modules.map((module, i) => (
                                            <ModuleCard
                                                key={module.id}
                                                module={module}
                                                index={i}
                                                minimal={isMotionProject}
                                                isExpanded={expandedModuleId === module.id}
                                                onClick={module.localVideos ? () => setExpandedModuleId(expandedModuleId === module.id ? null : module.id) : undefined}
                                            />
                                        ))}
                                    </div>
                                    {/* Expanded video grid */}
                                    <AnimatePresence>
                                        {expandedModuleId && (() => {
                                            const expandedModule = project.modules?.find(m => m.id === expandedModuleId);
                                            if (!expandedModule?.localVideos) return null;
                                            return (
                                                <motion.div
                                                    key={expandedModuleId}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-6">
                                                        {expandedModule.localVideos.map((src, i) => (
                                                            <div key={i} className="aspect-square overflow-hidden rounded-sm bg-stone-100">
                                                                <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            );
                                        })()}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* SECTION 2: IMAGES (Non-Motion) */}
                            {project.images && project.images.length > 0 && (
                                <div className={`mb-16 ${layout.containerClass}`}>
                                    {project.images.map((img, i) => (
                                        <div key={i} className={layout.itemClass}>
                                            <ImageCard src={img} index={i} aspectClass={layout.itemClass} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* SECTION 3: VIDEOS (YouTube Embeds) */}
                            {project.videos && project.videos.length > 0 && (
                                <div className="flex flex-col gap-12 mb-16">
                                    {project.videos.map((videoId, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <GlassCard
                                                className="w-full aspect-video p-0 rounded-sm overflow-hidden"
                                                mixBlendMode="multiply"
                                                initialBlur="4px"
                                                targetBlur="0px"
                                                borderColor="border-transparent"
                                                backgroundColor="rgba(255,255,255,0.1)"
                                            >
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={`https://www.youtube.com/embed/${videoId}`}
                                                    title={`Project Video ${i + 1}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                ></iframe>
                                            </GlassCard>
                                            <span className="font-mono text-[9px] text-stone-400 tracking-widest uppercase">
                                                [VIDEO_REF_{i+1}]: YOUTUBE_EMBED_PROTOCOL // {videoId}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-4 text-base font-medium text-stone-800 leading-relaxed mb-12">
                                {project.content.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                            </div>
                        </>
                    )}
                </GlassCard>

                {/* Navigation Footer */}
                <div className="w-full mt-12 flex justify-between items-center px-4">
                     {/* PREVIOUS PROJECT */}
                     <button 
                        onClick={(e) => { e.stopPropagation(); onSelectProject(prevProject); }}
                        className="group text-left flex items-center justify-start gap-6 cursor-pointer"
                     >
                        <span className="text-2xl text-[#1D3557] group-hover:text-[#EB431D] group-hover:-translate-x-2 transition-all duration-300">
                           &larr;
                        </span>
                        <div className="flex flex-col items-start">
                            <span className="block text-xs font-mono text-stone-400 tracking-widest group-hover:text-[#EB431D] transition-colors mb-1">PREV PROJECT</span>
                             <span className="block text-xs font-mono font-bold tracking-widest text-[#1D3557] group-hover:text-[#EB431D] transition-colors duration-300 uppercase">
                                {prevProject.title}
                             </span>
                        </div>
                     </button>

                     {/* NEXT PROJECT */}
                     <button 
                        onClick={(e) => { e.stopPropagation(); onSelectProject(nextProject); }}
                        className="group text-right flex items-center justify-end gap-6 cursor-pointer"
                     >
                        <div className="flex flex-col items-end">
                            <span className="block text-xs font-mono text-stone-400 tracking-widest group-hover:text-[#EB431D] transition-colors mb-1">NEXT PROJECT</span>
                             <span className="block text-xs font-mono font-bold tracking-widest text-[#1D3557] group-hover:text-[#EB431D] transition-colors duration-300 uppercase">
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

const StableHtml: React.FC<{ html: string }> = React.memo(({ html }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => { if (ref.current) ref.current.innerHTML = html; }, [html]);
    return <div ref={ref} className="mb-12" />;
});

const AiDetail: React.FC<{ item: AiItem; onClose: () => void; onSelectAiItem: (item: AiItem) => void; onToggleMenu: (v: boolean) => void }> = ({ item, onClose, onSelectAiItem, onToggleMenu }) => {
    const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);

    useEffect(() => { if(scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; }, [item, scrollContainerRef]);

    const currentIndex = AI_ITEMS.findIndex(a => a.id === item.id);
    const prevItem = AI_ITEMS[(currentIndex - 1 + AI_ITEMS.length) % AI_ITEMS.length];
    const nextItem = AI_ITEMS[(currentIndex + 1) % AI_ITEMS.length];

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
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="fixed top-8 right-8 z-50 text-xs font-mono font-bold tracking-widest text-stone-500 hover:text-[#EB431D] transition-colors flex items-center gap-2 bg-white/80 border border-white px-4 py-2 rounded-full backdrop-blur-sm shadow-sm cursor-pointer">
                CLOSE <span className="text-lg">×</span>
            </button>
            
            <div className="max-w-4xl mx-auto w-full pb-64 pt-16 md:pt-0 cursor-auto" onClick={(e) => e.stopPropagation()}>
                {/* HEADER */}
                <GlassCard 
                    className="mb-16 p-8 border-0 shadow-none" 
                    delay={0.2} 
                    initialBlur="0px" 
                    targetBlur="0px"
                    backgroundColor="transparent"
                    borderColor="border-transparent"
                    hoverEffect={false}
                >
                    <span className="text-xs font-mono text-stone-400 mb-4 block tracking-[0.1em] uppercase">{item.subtitle}</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#1D3557] leading-[0.9] mb-8 uppercase">{item.title}</h1>
                    <div className="flex flex-wrap gap-4 text-xs font-mono">
                         {item.tags.map(tag => (
                             <span key={tag} className="bg-[#1D3557] text-white px-3 py-1 rounded-sm uppercase">{tag}</span>
                         ))}
                    </div>
                </GlassCard>

                {/* CONTENT */}
                <GlassCard 
                    className="w-full p-8 h-fit transition-colors duration-300" 
                    delay={0.4} 
                    initialBlur="0px" 
                    targetBlur="0px" 
                    backgroundColor="rgba(229, 222, 208, 0)" 
                    hoverEffect={false}
                    hoverScale={1}
                    borderColor="border-transparent"
                >
                    <p className="text-xl font-medium leading-relaxed text-stone-800 mb-12">{item.fullDescription || item.description}</p>
                    
                    {/* METRICS */}
                    {item.metrics && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 pb-12 border-b border-stone-300">
                            {item.metrics.map((m, i) => (
                                <div key={i}>
                                    <p className="text-xs font-mono text-stone-500 mb-1 uppercase">{m.label}</p>
                                    <p className="text-xl font-bold text-[#1D3557]">{m.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CUSTOM HTML — use ref to prevent scroll re-renders from resetting radio buttons */}
                    {item.customHtml && (
                        <StableHtml html={item.customHtml} />
                    )}

                    {/* TEXT CONTENT */}
                    <div className="space-y-4 text-base font-medium text-stone-800 leading-relaxed mb-12">
                        {item.content.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                    </div>
                </GlassCard>

                {/* Navigation Footer */}
                <div className="w-full mt-12 flex justify-between items-center px-4">
                     <button
                        onClick={(e) => { e.stopPropagation(); onSelectAiItem(prevItem); }}
                        className="group text-left flex items-center justify-start gap-6 cursor-pointer"
                     >
                        <span className="text-2xl text-[#1D3557] group-hover:text-[#EB431D] group-hover:-translate-x-2 transition-all duration-300">
                           &larr;
                        </span>
                        <div className="flex flex-col items-start">
                            <span className="block text-xs font-mono text-stone-400 tracking-[0.1em] group-hover:text-[#EB431D] transition-colors mb-1">PREV</span>
                             <span className="block text-xs font-mono font-bold tracking-[0.1em] text-[#1D3557] group-hover:text-[#EB431D] transition-colors duration-300 uppercase whitespace-pre-line">
                                {prevItem.title}
                             </span>
                        </div>
                     </button>

                     <button
                        onClick={(e) => { e.stopPropagation(); onSelectAiItem(nextItem); }}
                        className="group text-right flex items-center justify-end gap-6 cursor-pointer"
                     >
                        <div className="flex flex-col items-end">
                            <span className="block text-xs font-mono text-stone-400 tracking-[0.1em] group-hover:text-[#EB431D] transition-colors mb-1">NEXT</span>
                             <span className="block text-xs font-mono font-bold tracking-[0.1em] text-[#1D3557] group-hover:text-[#EB431D] transition-colors duration-300 uppercase whitespace-pre-line">
                                {nextItem.title}
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

export const Content: React.FC<ContentProps> = ({ 
  section, 
  activeProject, 
  activeAiItem, 
  onSelectProject, 
  onSelectAiItem, 
  onClose,
  onToggleMenu 
}) => {
  return (
    <AnimatePresence mode="wait">
      {activeProject && (
        <ProjectDetail 
            key="project-detail" 
            project={activeProject} 
            onClose={onClose} 
            onSelectProject={onSelectProject}
            onToggleMenu={onToggleMenu}
        />
      )}
      
      {activeAiItem && !activeProject && (
        <AiDetail
            key="ai-detail"
            item={activeAiItem}
            onClose={onClose}
            onSelectAiItem={onSelectAiItem}
            onToggleMenu={onToggleMenu}
        />
      )}

      {!activeProject && !activeAiItem && (
        <motion.div
            key={section}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="fixed inset-0 w-full h-full pointer-events-auto z-10"
        >
            {section === Section.HOME && <HomeContent onToggleMenu={onToggleMenu} />}
            {section === Section.AI && <AIContent onSelect={onSelectAiItem} onToggleMenu={onToggleMenu} />}
            {section === Section.WORK && <WorkContent onSelect={onSelectProject} onToggleMenu={onToggleMenu} />}
            {section === Section.ABOUT && <AboutContent onToggleMenu={onToggleMenu} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
