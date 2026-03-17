
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Project, AiItem, ProjectModule, ImageGroup, ColorSwatch, MotionAsset } from '../types';
import { PROJECTS, AI_ITEMS, COLORS } from '../constants';
import AboutPage from './AboutPage';

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

// Numeric cell — static image, CSS-only hover (scale + grid overlay), no color shift
const NUMERIC_GRID = `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 24V0H24' fill='none' stroke='rgba(0%2C0%2C0%2C0.08)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E")`;

const NumericCell: React.FC<{ src: string; label: string }> = ({ src, label }) => (
    <div className="group relative aspect-square overflow-hidden bg-stone-100 cursor-pointer">
        <img
            src={src}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-100 group-hover:scale-[1.05]"
        />
        {/* Grid overlay — appears on hover */}
        <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-100 opacity-0 group-hover:opacity-100"
            style={{ backgroundImage: NUMERIC_GRID }}
        />
        <span className="absolute bottom-1.5 left-2 font-mono text-[9px] font-bold z-20 select-none text-black/30">
            {label}
        </span>
    </div>
);

// Zodiac accent palette: orange-red, dark green, golden yellow, cobalt blue
const ZODIAC_PALETTE = ['#E54D1E', '#2A5C3A', '#C9971A', '#1E3A8C'];

const ZodiacCell: React.FC<{ src: string; label: string; colorIndex: number }> = ({ src, label, colorIndex }) => {
    const [hovered, setHovered] = useState(false);
    const accent = ZODIAC_PALETTE[colorIndex % 4];
    return (
        <div
            className="relative aspect-square overflow-hidden cursor-pointer transition-all duration-200"
            style={{
                backgroundColor: hovered ? accent + '18' : '#f5f5f4',
                border: `1px solid ${hovered ? accent : '#e7e5e4'}`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={src}
                alt={label}
                className="w-full h-full object-cover transition-transform duration-200"
                style={{ transform: hovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)' }}
            />
            <span
                className="absolute bottom-1.5 left-2 font-mono text-[9px] z-20 select-none transition-all duration-200"
                style={{
                    color: hovered ? accent : 'rgba(0,0,0,0.3)',
                    fontWeight: hovered ? 700 : 400,
                }}
            >
                {label}
            </span>
        </div>
    );
};

// Spatial cell — white box background, grayscale default, color on hover
// Used for map asset libraries (STR/ENV elements)
const SpatialCell: React.FC<{ src: string; label: string }> = ({ src, label }) => (
    <div className="group flex flex-col gap-1.5">
        <div className="aspect-square bg-white overflow-hidden p-3">
            <img
                src={src}
                alt={label}
                className="w-full h-full object-contain transition-all duration-500 grayscale group-hover:grayscale-0"
            />
        </div>
        <span className="font-mono text-[9px] text-stone-300 tracking-[0.2em] uppercase">
            {label}
        </span>
    </div>
);

// Archive strip — vertical sequence, full-width, original aspect ratio
// Grayscale + dim by default; hover reveals full color
const ArchiveStrip: React.FC<{ images: string[]; labels: string[] }> = ({ images, labels }) => (
    <div className="flex flex-col gap-40">
        {images.map((src, i) => (
            <div key={i} className="group">
                {/* Unit label above image */}
                <p className="font-mono text-[9px] text-stone-300 tracking-[0.25em] uppercase mb-2">
                    {labels[i] ?? `UNIT ${String(i + 1).padStart(2, '0')}`}
                </p>
                <img
                    src={src}
                    alt={labels[i]}
                    className="w-full h-auto block transition-all duration-500 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                />
            </div>
        ))}
    </div>
);

// Archive grid — first image full-width, rest in 2-col grid
// Default: fixed 450px crop showing top of infographic
// Hover: expands to full natural height, reveals complete content
const ArchiveGrid: React.FC<{ images: string[]; labels: string[] }> = ({ images, labels }) => {
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
    return (
        <div>
            {/* UNIT_01 — full-width, full height */}
            {images[0] && (
                <div className="group mb-8">
                    <p className="font-mono text-[9px] text-stone-300 tracking-[0.25em] uppercase mb-2">
                        {labels[0] ?? 'UNIT_01'}
                    </p>
                    <img
                        src={images[0]}
                        alt={labels[0]}
                        className="w-full h-auto block transition-all duration-700 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                    />
                </div>
            )}
            {/* UNIT_02 onwards — 2-column grid, hover to expand */}
            <div className="grid grid-cols-2 gap-2 items-start">
                {images.slice(1).map((src, ni) => {
                    const idx = ni + 1;
                    const label = labels[idx] ?? `UNIT_${String(idx + 1).padStart(2, '0')}`;
                    const isExpanded = expandedIdx === ni;
                    return (
                        <div
                            key={ni}
                            onMouseEnter={() => setExpandedIdx(ni)}
                            onMouseLeave={() => setExpandedIdx(null)}
                        >
                            <p className="font-mono text-[9px] text-stone-300 tracking-[0.25em] uppercase mb-1.5 leading-none">
                                {label}
                            </p>
                            <div
                                className="relative overflow-hidden transition-all duration-500 ease-in-out"
                                style={{ maxHeight: isExpanded ? '9999px' : '450px' }}
                            >
                                <img
                                    src={src}
                                    alt={label}
                                    className={`w-full h-auto block transition-all duration-500 ${
                                        isExpanded
                                            ? 'grayscale-0 brightness-100'
                                            : 'grayscale brightness-90'
                                    }`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Interactive color swatch row for palette display
const ColorSwatchRow: React.FC<{ swatches: ColorSwatch[] }> = ({ swatches }) => {
    const [hovered, setHovered] = useState<number | null>(null);
    return (
        <div className="mt-4">
            <p className="font-mono text-[8px] text-stone-400 tracking-[0.15em] uppercase mb-2">
                [PALETTE // HOVER_TO_ACTIVATE_DESCRIPTOR]
            </p>
            <div className="flex gap-1">
                {swatches.map((s, i) => (
                    <div
                        key={i}
                        className="relative flex-1 cursor-default"
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div
                            className="w-full h-10 transition-transform duration-200 hover:scale-y-110 origin-bottom"
                            style={{
                                backgroundColor: s.hex,
                                border: s.hex.toUpperCase() === '#FFFFFF' ? '1px solid #e5e5e5' : 'none'
                            }}
                        />
                        <p className="font-mono text-[7px] text-stone-400 tracking-tight text-center mt-1 truncate px-0.5">
                            {s.hex}
                        </p>
                        {hovered === i && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-stone-900 text-white font-mono text-[7px] tracking-[0.08em] px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
                                {s.role}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Illustration Systems Tab Component ──────────────────────────────────────
//
// URL scheme: #/work/work-illustration/{module.id}
// e.g. #/work/work-illustration/numeric
//
// Each tab updates the URL so users can refresh or share a direct link
// to a specific system (alphabet, numeric, character, iconography).
// ─────────────────────────────────────────────────────────────────────────────

const TAB_COLORS = [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.ORANGE];

const IllustrationTabSystem: React.FC<{ project: Project }> = ({ project }) => {
    const modules = project.modules || [];

    // Read initial tab index from URL hash segment:
    // #/work/work-illustration/numeric  →  index of module with id "numeric"
    const getInitialTab = (): number => {
        const tabId = window.location.hash.replace(/^#\//, '').split('/')[2];
        if (tabId) {
            const idx = modules.findIndex(m => m.id === tabId);
            if (idx >= 0) return idx;
        }
        return 0;
    };

    const [activeTab, setActiveTab] = useState<number>(getInitialTab);

    // Update tab state + URL when user hovers a tab
    const handleTabChange = (index: number) => {
        setActiveTab(index);
        const moduleId = modules[index]?.id;
        if (moduleId) {
            history.replaceState(null, '', `#/work/${project.id}/${moduleId}`);
        }
    };

    const activeModule = modules[activeTab];

    return (
        <div>

            {/* ── Nav hint ── */}
            <p className="font-mono text-[9px] text-stone-300 tracking-[0.25em] mb-3 uppercase select-none">
                // NAVIGATE_SYSTEMS
            </p>

            {/* ── Tab bar ── */}
            <div className="flex border-b border-[#D9D9D9] mb-10 overflow-x-auto">
                {modules.map((module, i) => {
                    const isActive = activeTab === i;
                    const color = TAB_COLORS[i % TAB_COLORS.length];
                    return (
                        <button
                            key={module.id}
                            onMouseEnter={() => handleTabChange(i)}
                            className="group relative flex flex-col items-start px-4 py-3 font-mono text-xs tracking-[0.15em] uppercase cursor-pointer whitespace-nowrap shrink-0 border-0 outline-none transition-colors duration-150"
                            style={{
                                color:           isActive ? color : '#a8a29e',
                                backgroundColor: isActive ? `${color}10` : 'transparent',
                                borderBottom:    isActive ? `3px solid ${color}` : '3px solid transparent',
                            }}
                        >
                            <span className="font-bold text-xs tracking-[0.12em] mb-1">
                                {module.sysLabel ?? `SYS_0${i + 1}`}
                            </span>
                            <span className="transition-colors duration-100">
                                {module.title}
                            </span>
                            {/* Animated underline shown only on inactive hover */}
                            {!isActive && (
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-200"
                                    style={{ backgroundColor: color }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ── Tab content (instant switch) ── */}
            {activeModule && (
                <div key={activeModule.id}>

                    {/* Content block — min-h only for grid tabs (keeps grid at consistent Y position).
                        Excluded for archive-strip mode (statusLabel) since it's a full-width vertical layout. */}
                    <div className={(activeModule.localVideos || (activeModule.localImages && !activeModule.statusLabel)) ? 'min-h-[300px]' : ''}>
                        {/* Tagline — supports multi-line via \n */}
                        {activeModule.tagline && (
                            <div className="mb-1">
                                {activeModule.tagline.split('\n').map((line, i) => (
                                    <p key={i} className="font-mono text-[10px] text-stone-400 tracking-[0.2em] uppercase leading-relaxed">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Sub-header — e.g. "(Commercial_Infographic_Archive)" */}
                        {activeModule.subHeader && (
                            <p className="font-mono text-[10px] text-stone-300 tracking-[0.18em] italic mb-3">
                                {activeModule.subHeader}
                            </p>
                        )}

                        {/* Description — only rendered when non-empty */}
                        {activeModule.description && (
                            <p className="text-base font-medium text-stone-700 leading-relaxed mb-8 max-w-2xl">
                                {activeModule.description}
                            </p>
                        )}

                        {/* Tech specs */}
                        {activeModule.specs && (() => {
                            const moduleAccent = activeModule.accentColor ?? '#EB431D';
                            return (
                                <div
                                    className="mb-10 font-mono text-[10px] pl-4 space-y-2 border-l-2"
                                    style={{ borderLeftColor: moduleAccent + '55' }}
                                >
                                    <p className="tracking-[0.15em] mb-3 uppercase" style={{ color: moduleAccent + 'bb' }}>[Tech Specs]</p>
                                    {activeModule.specs.map(spec => (
                                        <div key={spec.label} className="flex items-center gap-3">
                                            <span className="text-stone-400 min-w-[8rem] shrink-0">{spec.label}</span>
                                            {spec.label === 'Medium' ? (
                                                <span className="text-white px-2 py-0.5 font-bold" style={{ backgroundColor: moduleAccent }}>
                                                    // {spec.value}
                                                </span>
                                            ) : (
                                                <span className="text-stone-400">// {spec.value}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            );
                        })()}
                    </div>

                    {/* Visual grid
                        - gridMode 'spatial'           → SpatialCell 4-col white-box grid + map + video
                        - Has localVideos              → LetterCell (static jpg + hover plays mp4)
                        - Has localImages + statusLabel → ArchiveStrip (vertical, grayscale default)
                        - Has localImages only          → NumericCell (static jpg + CSS scale hover)
                        - Fallback                     → placeholder
                    */}
                    {activeModule.gridMode === 'zodiac' && activeModule.localImages ? (
                        <>
                            {/* 4×3 grid of 12 individual zodiac animals */}
                            <div className="grid grid-cols-4 gap-2">
                                {activeModule.localImages.map((src, ni) => (
                                    <ZodiacCell
                                        key={ni}
                                        src={src}
                                        label={activeModule.localImageLabels?.[ni] ?? `ZODIAC_${String(ni + 1).padStart(2, '0')}`}
                                        colorIndex={ni}
                                    />
                                ))}
                            </div>
                            {/* Wholeset — large display at the end */}
                            {activeModule.image && (
                                <div className="mt-16">
                                    <p className="font-mono text-[9px] text-stone-300 tracking-[0.25em] uppercase mb-3">
                                        [WHOLESET: COMPLETE_ZODIAC_MATRIX]
                                    </p>
                                    <img
                                        src={activeModule.image}
                                        alt="Zodiac Wholeset"
                                        className="w-full h-auto block"
                                    />
                                </div>
                            )}
                        </>
                    ) : activeModule.gridMode === 'archive-grid' && activeModule.localImages ? (
                        <ArchiveGrid
                            images={activeModule.localImages}
                            labels={activeModule.localImageLabels ?? []}
                        />
                    ) : activeModule.gridMode === 'spatial' && activeModule.localImages ? (
                        <>
                            {/* 4×3 asset grid (STR_01-05 + ENV_06-11) */}
                            <div className="grid grid-cols-4 gap-3">
                                {activeModule.localImages.map((src, ni) => (
                                    <SpatialCell
                                        key={ni}
                                        src={src}
                                        label={activeModule.localImageLabels?.[ni] ?? `ASSET_${String(ni + 1).padStart(2, '0')}`}
                                    />
                                ))}
                            </div>

                            {/* Full campus map — reference assembly */}
                            {activeModule.image && (
                                <div className="mt-16">
                                    <p className="font-mono text-[9px] text-stone-300 tracking-[0.25em] uppercase mb-3">
                                        [ASSEMBLY_REFERENCE: WHOLE_MAP]
                                    </p>
                                    <img
                                        src={activeModule.image}
                                        alt="Campus Map"
                                        className="w-full h-auto block"
                                    />
                                </div>
                            )}

                            {/* [PROCESS_EVOLUTION] video — shown when YouTube ID is provided */}
                            {activeModule.processVideoId && (
                                <div className="mt-16 pt-8 border-t border-stone-100">
                                    <p className="font-mono text-[9px] text-stone-300 tracking-[0.25em] uppercase mb-4">
                                        [PROCESS_EVOLUTION]
                                    </p>
                                    <div className="w-full aspect-video">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${activeModule.processVideoId}`}
                                            title="Process Evolution"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    ) : activeModule.localVideos ? (
                        <div className="grid grid-cols-4 gap-1">
                            {activeModule.localVideos.map((src, vi) => {
                                // Derive label from filename: "a.mp4" → "A", "01.mp4" → "01"
                                const base = src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
                                const label = base.length === 1 ? base.toUpperCase() : base;
                                return (
                                    <LetterCell
                                        key={vi}
                                        src={src}
                                        imgSrc={activeModule.localImages?.[vi]}
                                        letter={label}
                                    />
                                );
                            })}
                        </div>
                    ) : activeModule.localImages && activeModule.statusLabel ? (
                        // Archive strip mode: vertical sequence, original aspect ratio, grayscale default
                        <ArchiveStrip
                            images={activeModule.localImages}
                            labels={activeModule.localImageLabels ?? []}
                        />
                    ) : activeModule.localImages ? (
                        <div className="grid grid-cols-4 gap-1">
                            {activeModule.localImages.map((src, ni) => (
                                <NumericCell
                                    key={ni}
                                    src={src}
                                    label={activeModule.localImageLabels?.[ni] ?? String(ni + 1)}
                                />
                            ))}
                        </div>
                    ) : activeModule.imageGroups ? (
                        <div className="space-y-16">
                            {activeModule.imageGroups.map((group: ImageGroup, gi: number) => {
                            const groupAccent = activeModule.accentColor ?? '#888888';
                            return (
                                <div key={gi}>
                                    {/* Group header */}
                                    <div className="mb-4 pl-3 border-l-2" style={{ borderLeftColor: groupAccent }}>
                                        <p className="font-mono text-[9px] text-stone-400 tracking-[0.2em] uppercase">
                                            {group.unitId}
                                        </p>
                                        <p className="font-mono text-[9px] text-stone-300 tracking-[0.15em] uppercase mt-0.5">
                                            // {group.caption}
                                        </p>
                                    </div>

                                    {/* Image grid — heroLayout: 60:40 flex, left drives height, right splits equally */}
                                    {group.images && group.images.length > 0 && group.heroLayout && (
                                        <div className="flex gap-4">
                                            {/* Master asset — left 60%, natural height, drives container height */}
                                            <div className="flex-[3] flex flex-col gap-2">
                                                <div className={`relative bg-[#F9F9F9] border border-stone-200${group.placeholderAspect ? ` ${group.placeholderAspect} overflow-hidden` : ''}`}>
                                                    {group.images[0] ? (
                                                        <img
                                                            src={group.images[0]}
                                                            alt={group.imageLabels?.[0]}
                                                            className={group.placeholderAspect ? 'absolute inset-0 w-full h-full object-cover' : 'w-full h-auto block'}
                                                        />
                                                    ) : (
                                                        <div className={group.placeholderAspect ? 'absolute inset-0 border border-dashed border-stone-300 flex items-center justify-center p-3' : 'w-full aspect-[4/3] border border-dashed border-stone-300 flex items-center justify-center p-3'}>
                                                            <span className="font-mono text-[7px] text-stone-400 tracking-[0.12em] uppercase text-center leading-loose">
                                                                {group.imageLabels?.[0] ?? 'MASTER_ASSET_PENDING'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                {group.imageLabels?.[0] && (
                                                    <p className="font-mono text-[7px] text-stone-400 tracking-[0.1em] uppercase shrink-0">{group.imageLabels[0]}</p>
                                                )}
                                            </div>
                                            {/* Distribution stack — right 40%, stretches to match left, items split height equally */}
                                            <div className="flex-[2] self-stretch flex flex-col gap-3">
                                                {group.images.slice(1).map((src, ii) => {
                                                    const slotIdx = ii + 1;
                                                    return (
                                                        <div key={ii} className={group.rightSlotAspect ? 'w-full flex flex-col gap-1' : 'flex-1 flex flex-col gap-1 min-h-0'}>
                                                            <div className={`relative bg-[#F9F9F9] border border-stone-200${group.rightSlotAspect ? ` ${group.rightSlotAspect} overflow-hidden` : ' flex-1 min-h-0'}`}>
                                                                {src && src.endsWith('.mp4') ? (
                                                                    <video
                                                                        src={src}
                                                                        autoPlay
                                                                        loop
                                                                        muted
                                                                        playsInline
                                                                        className="absolute inset-0 w-full h-full object-contain"
                                                                    />
                                                                ) : src ? (
                                                                    <img
                                                                        src={src}
                                                                        alt={group.imageLabels?.[slotIdx]}
                                                                        className={`absolute inset-0 w-full h-full ${group.rightSlotAspect ? 'object-contain' : (group.placeholderAspect ? 'object-cover' : 'object-contain')}`}
                                                                    />
                                                                ) : (
                                                                    <div className="absolute inset-0 border border-dashed border-stone-300 flex items-center justify-center p-2">
                                                                        <span className="font-mono text-[7px] text-stone-400 tracking-[0.1em] uppercase text-center leading-loose">
                                                                            {group.imageLabels?.[slotIdx] ?? `SLOT_0${ii + 1}`}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {group.imageLabels?.[slotIdx] && (
                                                                <p className="font-mono text-[7px] text-stone-400 tracking-[0.1em] uppercase shrink-0">{group.imageLabels[slotIdx]}</p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Image grid — splitLayout: social posts grid + banners single column */}
                                    {group.images && group.images.length > 0 && !group.heroLayout && group.splitLayout && (
                                        <div className="space-y-8">
                                            {/* Row 1 — social posts (4 col, natural square proportions) */}
                                            <div className="grid grid-cols-4 gap-3">
                                                {group.images.slice(0, group.splitLayout.row1Count).map((src, ii) => (
                                                    <div key={ii} className="flex flex-col gap-2">
                                                        <div className="group/img relative bg-[#F9F9F9]">
                                                            {src ? (
                                                                <img
                                                                    src={src}
                                                                    alt={group.imageLabels?.[ii]}
                                                                    className="w-full h-auto block transition-transform duration-500 group-hover/img:scale-105"
                                                                />
                                                            ) : (
                                                                <div className="w-full aspect-square border border-dashed border-stone-300 flex items-center justify-center">
                                                                    <span className="font-mono text-[7px] text-stone-400 tracking-[0.1em] uppercase text-center">{group.imageLabels?.[ii]}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {group.imageLabels?.[ii] && (
                                                            <p className="font-mono text-[7px] text-stone-400 tracking-[0.1em] uppercase truncate">{group.imageLabels[ii]}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Row 2 — partner banners (single column, full width, natural proportions) */}
                                            <div className="flex flex-col gap-6">
                                                {group.images.slice(group.splitLayout.row1Count).map((src, ii) => {
                                                    const absIdx = ii + group.splitLayout!.row1Count;
                                                    return (
                                                        <div key={ii} className="flex flex-col gap-2">
                                                            <div className="group/img relative bg-[#F9F9F9]">
                                                                {src ? (
                                                                    <img
                                                                        src={src}
                                                                        alt={group.imageLabels?.[absIdx]}
                                                                        className="w-full h-auto block transition-transform duration-500 group-hover/img:scale-105"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full aspect-[16/9] border border-dashed border-stone-300 flex items-center justify-center">
                                                                        <span className="font-mono text-[7px] text-stone-400 tracking-[0.1em] uppercase text-center">{group.imageLabels?.[absIdx]}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {group.imageLabels?.[absIdx] && (
                                                                <p className="font-mono text-[7px] text-stone-400 tracking-[0.1em] uppercase">{group.imageLabels[absIdx]}</p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Image grid — uniform columns */}
                                    {group.images && group.images.length > 0 && !group.heroLayout && !group.splitLayout && (
                                        <div className={`grid gap-2 ${
                                            group.gridCols === 1 ? 'grid-cols-1' :
                                            group.gridCols === 3 ? 'grid-cols-3' :
                                            group.gridCols === 4 ? 'grid-cols-4' :
                                            'grid-cols-2'
                                        }`}>
                                            {group.images.map((src, ii) => {
                                                const hasFrame = group.deviceFrameSlots?.includes(ii);
                                                const isLastOdd = (!group.gridCols || group.gridCols === 2) &&
                                                    group.images!.length % 2 === 1 && ii === group.images!.length - 1;
                                                return (
                                                <div
                                                    key={ii}
                                                    className={`flex flex-col${isLastOdd ? ' col-span-2' : ''}`}
                                                >
                                                    <div className={`group/img relative bg-[#F9F9F9] border border-stone-200${group.placeholderAspect ? ` ${group.placeholderAspect} overflow-hidden` : ''}`}>
                                                        {src ? (
                                                            <img
                                                                src={src}
                                                                alt={group.imageLabels?.[ii] ?? `${group.unitId}_${ii + 1}`}
                                                                className={`${group.placeholderAspect ? 'absolute inset-0 w-full h-full object-cover' : 'w-full h-auto block'} transition-transform duration-500 group-hover/img:scale-105`}
                                                            />
                                                        ) : (
                                                            <div className={group.placeholderAspect ? 'absolute inset-0 border border-dashed border-stone-300 flex items-center justify-center p-2' : 'w-full aspect-[4/3] border border-dashed border-stone-300 flex items-center justify-center p-2'}>
                                                                <span className="font-mono text-[7px] text-stone-400 tracking-[0.1em] uppercase text-center leading-loose">
                                                                    {group.imageLabels?.[ii] ?? `${group.unitId}_${String(ii + 1).padStart(2, '0')}`}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {src && group.showFileLabel && group.imageLabels?.[ii] && (
                                                        <p className="mt-1 font-mono text-[8px] text-stone-400 tracking-[0.12em] uppercase">{group.imageLabels[ii]}</p>
                                                    )}
                                                </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Perforation annotation — dashed arrow bar below image grid */}
                                    {group.annotation && (
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="font-mono text-[9px] text-stone-400">&#8592;</span>
                                            <div className="flex-1 border-t border-dashed border-stone-300" />
                                            <span className="font-mono text-[8px] text-stone-400 tracking-[0.12em] uppercase whitespace-nowrap shrink-0">
                                                {group.annotation}
                                            </span>
                                            <div className="flex-1 border-t border-dashed border-stone-300" />
                                            <span className="font-mono text-[9px] text-stone-400">&#8594;</span>
                                        </div>
                                    )}

                                    {/* Interactive color swatches */}
                                    {group.colorSwatches && (
                                        <ColorSwatchRow swatches={group.colorSwatches} />
                                    )}

                                    {/* Detail crop — natural proportions, text fills remaining space */}
                                    {group.detailCrop && (
                                        <div className="mb-4 flex items-start gap-6">
                                            <div className="flex-shrink-0 bg-[#F9F9F9] border border-stone-200" style={{ width: '240px' }}>
                                                <img
                                                    src={group.detailCrop.src}
                                                    alt="detail"
                                                    className="w-full h-auto block"
                                                    style={{ aspectRatio: 'auto', objectFit: 'contain' }}
                                                />
                                            </div>
                                            <div className="flex-1 flex items-start gap-2 pt-1">
                                                <div className="w-8 flex-shrink-0" style={{ borderTop: '1px solid #D55736', marginTop: '4px' }} />
                                                <p className="font-mono text-[8px] text-stone-400 tracking-[0.15em] uppercase leading-relaxed">
                                                    {group.detailCrop.label}
                                                    <br />
                                                    <span className="text-stone-300">// Hand-drawn line weight: variable</span>
                                                    <br />
                                                    <span className="text-stone-300">// Texture class: organic / non-repeating</span>
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Archive video — autoplay loop, grid overlay */}
                                    {group.videoSrc && (
                                        <div className="relative w-full border border-stone-200">
                                            <video
                                                src={group.videoSrc}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-auto block bg-stone-900"
                                            />
                                            {/* Grid texture overlay */}
                                            <div
                                                className="absolute inset-0 pointer-events-none"
                                                style={{
                                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                                    backgroundSize: '24px 24px',
                                                }}
                                            />
                                            <div className="absolute top-2 left-2 font-mono text-[7px] text-white/40 tracking-[0.15em] uppercase">
                                                [ARCHIVE_VIDEO // AUTO_LOOP]
                                            </div>
                                        </div>
                                    )}

                                    {/* Optional process note */}
                                    {group.note && (
                                        <p className="mt-3 font-mono text-[9px] text-stone-400 tracking-[0.1em] leading-relaxed italic">
                                            {group.note}
                                        </p>
                                    )}
                                </div>
                            );
                            })}
                        </div>
                    ) : activeModule.image ? (
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
                            <img src={activeModule.image} alt={activeModule.title} className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.15em] text-stone-500 bg-white/80 px-2 py-1 uppercase">
                                Media — Pending Upload
                            </div>
                        </div>
                    ) : null}

                    {/* Status label — shown below archive grid */}
                    {activeModule.statusLabel && (
                        <p className="mt-4 font-mono text-[9px] text-stone-400 tracking-[0.2em] uppercase">
                            {activeModule.statusLabel}
                        </p>
                    )}

                </div>
            )}

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
      className="w-full h-full flex flex-col justify-start px-8 md:px-24 pt-48 md:pt-64 overflow-y-auto overflow-x-hidden"
    >
      <GlassCard
        className="w-full max-w-5xl mx-auto mb-32 md:mb-12 flex-shrink-0"
        hoverEffect={true}
        delay={0.1}
      >
        <AboutPage />
      </GlassCard>
    </div>
  );
};

// ─── Motion Asset Item (Intersection Observer playback) ─────────────────────
const MotionItem: React.FC<{ asset: MotionAsset }> = ({ asset }) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) videoRef.current.play();
          else videoRef.current.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isVertical = asset.span === 'vertical';
  const isAudioVideo = asset.type === 'mp4';

  const containerStyle: React.CSSProperties = {
    border: `1px solid ${hovered ? 'rgba(235, 67, 29, 0.55)' : 'rgba(235, 67, 29, 0.15)'}`,
    borderRadius: '3px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(253, 252, 250, 0.92)',
    boxShadow: hovered ? '0 8px 32px rgba(235,67,29,0.10)' : 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    cursor: 'pointer',
    ...(asset.span === 'full' ? { gridColumn: '1 / -1' } : {}),
    ...(isVertical ? { gridRow: 'span 2' } : {}),
  };

  const mediaStyle: React.CSSProperties = {
    width: '100%',
    display: 'block',
    imageRendering: 'crisp-edges' as any,
    transform: hovered ? 'scale(1.03)' : 'scale(1)',
    transition: 'transform 0.4s ease-out',
    ...(isVertical
      ? { minHeight: '480px', objectFit: 'contain', flex: 1, background: 'transparent' }
      : { objectFit: 'cover', flex: 1, minHeight: 0 }),
  };

  return (
    <div ref={ref} style={containerStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {asset.type === 'mp4' ? (
        <video
          ref={videoRef}
          src={asset.src}
          muted
          loop
          playsInline
          controls={isAudioVideo}
          style={mediaStyle}
        />
      ) : (
        <img src={asset.src} alt={asset.id} style={mediaStyle} />
      )}
      <div style={{ padding: '6px 10px', borderTop: '1px solid rgba(235, 67, 29, 0.1)', background: 'rgba(253, 252, 250, 0.92)' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: hovered ? '#EB431D' : '#c8a89e', lineHeight: 1.6, letterSpacing: '0.04em', transition: 'color 0.25s ease' }}>
          {asset.idLabel}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '9px', color: '#a8a29e', lineHeight: 1.6, letterSpacing: '0.04em' }}>
          {asset.logLabel}
        </div>
      </div>
    </div>
  );
};

const MODULE_META: Record<string, { label: string; subtitle: string }> = {
  A: { label: 'MODULE_A: COMMERCIAL_COMMUNICATION', subtitle: '// BRAND & NARRATIVE ASSETS' },
  B: { label: 'MODULE_B: ORGANIC_MECHANICS', subtitle: '// EXPERIMENTAL_STUDY: NATURAL_MOTION' },
  C: { label: 'MODULE_C: CEL_ANIMATION_ARCHIVE', subtitle: '// TECH: FRAME_BY_FRAME / DIGITAL_CEL' },
};

const MotionGridLayout: React.FC<{ assets: MotionAsset[] }> = ({ assets }) => {
  const modules = (['A', 'B', 'C'] as const).map(mod => ({
    mod,
    items: assets.filter(a => a.module === mod),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {modules.map(({ mod, items }) => {
        const meta = MODULE_META[mod];
        return (
          <div key={mod}>
            <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #e7e5e4' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#EB431D', letterSpacing: '0.1em' }}>
                {meta.label}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a8a29e', letterSpacing: '0.08em' }}>
                {meta.subtitle}
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridAutoFlow: 'dense',
              gap: '1.5rem',
            }}>
              {items.map(asset => (
                <MotionItem key={asset.id} asset={asset} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Spatial Narrative Layout (work-spatial / Austin Omni) ─────────────────
const SpatialNarrativeLayout: React.FC<{ project: Project }> = ({ project }) => {
    const accent = project.accentColor ?? '#EB431D';

    return (
        <div>
            {/* Focus line */}
            {project.focusLine && (
                <p className="font-mono text-xs tracking-widest mb-10" style={{ color: accent }}>
                    {project.focusLine}
                </p>
            )}

            {/* Narrative Section — 60 / 40 split */}
            {(project.narrativeImage || project.narrativeText) && (
                <div className="flex flex-col md:flex-row gap-8 mb-16">
                    {/* Left 60% — raw input image */}
                    {project.narrativeImage && (
                        <div className="md:w-3/5 flex-shrink-0">
                            <div className="relative overflow-hidden group cursor-pointer" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
                                <img
                                    src={project.narrativeImage}
                                    alt="RAW_INPUT"
                                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                />
                                <span className="absolute bottom-3 left-3 font-mono text-[9px] tracking-widest px-2 py-1"
                                    style={{ color: accent, background: 'rgba(255,255,255,0.72)' }}>
                                    // CREATION_LOG: RAW_INPUT
                                </span>
                            </div>
                        </div>
                    )}
                    {/* Right 40% — project context text */}
                    {project.narrativeText && (
                        <div className="md:w-2/5 flex flex-col justify-center gap-4">
                            <p className="font-mono text-[10px] tracking-widest uppercase text-stone-400">
                                // PROJECT_CONTEXT
                            </p>
                            <p className="text-sm font-medium text-stone-700 leading-relaxed">
                                {project.narrativeText}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Gallery — THE WORKS */}
            {project.images && project.images.length > 0 && (
                <div className="mb-16">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-stone-400 mb-8">
                        // CREATION_LOG: THE WORKS
                    </p>

                    {/* Hero image — full width */}
                    <div className="mb-8">
                        <div className="relative overflow-hidden group cursor-pointer" style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.10)' }}>
                            <img
                                src={project.images[0]}
                                alt={project.imageIds?.[0] ?? 'ATX_MAIN'}
                                className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                        </div>
                        <p className="font-mono text-[10px] tracking-widest mt-3 uppercase" style={{ color: accent }}>
                            // CREATION_LOG: REF: {project.imageIds?.[0] ?? 'ATX_2227_PA_MAIN'}
                        </p>
                    </div>

                    {/* Remaining images — 2-column alternating grid */}
                    {project.images.length > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.images.slice(1).map((img, i) => (
                                <div key={i}>
                                    <div className="relative overflow-hidden group cursor-pointer" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                                        <img
                                            src={img}
                                            alt={project.imageIds?.[i + 1] ?? `ATX_${i + 1}`}
                                            className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                                        />
                                    </div>
                                    <p className="font-mono text-[10px] tracking-widest mt-3 uppercase" style={{ color: accent }}>
                                        // CREATION_LOG: REF: {project.imageIds?.[i + 1] ?? `ATX_2227_0${i + 1}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Written content paragraphs */}
            <div className="space-y-4 text-base font-medium text-stone-800 leading-relaxed">
                {project.content.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
        </div>
    );
};
// ───────────────────────────────────────────────────────────────────────────

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onToggleMenu: (v: boolean) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onSelectProject, onToggleMenu }) => {
    const { scrollContainerRef, handleScroll } = useScrollMenuLogic(onToggleMenu);
    const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
    const [hoveredPrev, setHoveredPrev] = useState(false);
    const [hoveredNext, setHoveredNext] = useState(false);
    const accent = project.accentColor ?? '#EB431D';

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
                        {project.id === 'work-personal' ? 'Self-Initiated Work / Ongoing Series' : project.id === 'work-marketing' ? project.category : `${project.year} — ${project.category}`}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-[#1D3557] leading-[0.9] mb-8 uppercase">{project.title}</h1>
                    <div className="flex flex-wrap gap-4 text-xs font-mono">
                        <span className="bg-[#1D3557] text-white px-3 py-1 rounded-sm uppercase">{project.role}</span>
                        <span className="bg-white/80 border border-white px-3 py-1 text-stone-500 rounded-sm uppercase">
                            {project.client}
                        </span>
                    </div>
                    {project.focusLine && (
                        <p className="font-mono text-[11px] tracking-widest mt-5 uppercase" style={{ color: accent }}>
                            {project.focusLine}
                        </p>
                    )}
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
                    <p className="text-xl font-medium leading-relaxed text-stone-800 mb-12">{project.description}</p>

                    {project.id === 'work-motion' && project.motionAssets ? (
                        <MotionGridLayout assets={project.motionAssets} />
                    ) : project.id === 'work-spatial' ? (
                        /* Curated gallery layout for spatial / scenography projects */
                        <SpatialNarrativeLayout project={project} />
                    ) : (project.id === 'work-illustration' || project.id === 'work-marketing' || project.id === 'work-personal') ? (
                        /* Tab-based layout for modular system projects */
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
                        className="text-left flex items-center justify-start gap-6 cursor-pointer"
                        onMouseEnter={() => setHoveredPrev(true)}
                        onMouseLeave={() => setHoveredPrev(false)}
                     >
                        <span
                            className={`text-2xl transition-all duration-300${hoveredPrev ? ' -translate-x-2' : ''}`}
                            style={{ color: hoveredPrev ? accent : '#1D3557' }}
                        >
                           &larr;
                        </span>
                        <div className="flex flex-col items-start">
                            <span
                                className="block text-xs font-mono tracking-widest transition-colors mb-1"
                                style={{ color: hoveredPrev ? accent : '#78716c' }}
                            >PREV PROJECT</span>
                            <span
                                className="block text-xs font-mono font-bold tracking-widest transition-colors duration-300 uppercase"
                                style={{ color: hoveredPrev ? accent : '#1D3557' }}
                            >{prevProject.title}</span>
                        </div>
                     </button>

                     {/* NEXT PROJECT */}
                     <button
                        onClick={(e) => { e.stopPropagation(); onSelectProject(nextProject); }}
                        className="text-right flex items-center justify-end gap-6 cursor-pointer"
                        onMouseEnter={() => setHoveredNext(true)}
                        onMouseLeave={() => setHoveredNext(false)}
                     >
                        <div className="flex flex-col items-end">
                            <span
                                className="block text-xs font-mono tracking-widest transition-colors mb-1"
                                style={{ color: hoveredNext ? accent : '#78716c' }}
                            >NEXT PROJECT</span>
                            <span
                                className="block text-xs font-mono font-bold tracking-widest transition-colors duration-300 uppercase"
                                style={{ color: hoveredNext ? accent : '#1D3557' }}
                            >{nextProject.title}</span>
                        </div>
                        <span
                            className={`text-2xl transition-all duration-300${hoveredNext ? ' translate-x-2' : ''}`}
                            style={{ color: hoveredNext ? accent : '#1D3557' }}
                        >
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
