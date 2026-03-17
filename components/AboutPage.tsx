import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Download, Cpu, Layers, Mail, Linkedin, Instagram, ExternalLink } from 'lucide-react';

// ── Portfolio color system (replaces AI Studio COLORS) ───────────────────────
const C = {
  RED:    '#EB431D',
  BLUE:   '#1156D0',
  GREEN:  '#1A824E',
  YELLOW: '#F3B013',
  TEXT:   '#1D3557',
};

const PAPER_BG = 'bg-[#F0ECE4]';

// ── Data (latest from constants.ts, colors updated) ──────────────────────────
const EXPERIENCES = [
  {
    title: 'Senior Visual Systems Designer / Senior Illustrator',
    company: 'Imagine Learning',
    period: '2023 – PRESENT',
    description: 'Directing illustration systems and production for a 72-volume series, establishing scalable visual frameworks and integrating AI-assisted workflows to optimize multi-artist production cycles.',
    bullets: [
      'Orchestrated the end-to-end illustration production for a 72-volume series, ensuring a unified visual language and character system across the full production run.',
      'Reduced pre-production cycles by 50% through the strategic integration of AI-assisted drafting tools (NanoBanana and custom GPT workflows) into the creative pipeline.',
      'Authored and maintained the Illustration Style Guide, defining character architecture, lighting systems, and color standards for internal teams and global vendors.',
      'Led and mentored a team of 7 illustrators, providing art direction and maintaining rigorous visual quality standards across all titles.',
      'Collaborated with cross-functional teams to translate complex conceptual frameworks into clear, engaging visual storytelling.',
      'Contributed visual assets and refinement for high-priority publishing projects, ensuring systemic consistency across the portfolio.',
    ],
    color: C.RED,
  },
  {
    title: 'Visual Designer',
    company: 'Miles',
    period: 'Jul 2021 – May 2023',
    description: 'Architecting multi-channel visual assets and campaign systems to support high-growth product launches and digital marketing initiatives.',
    bullets: [
      'Produced high-impact marketing demo videos and visual assets for multi-platform product campaigns and promotional launches.',
      'Designed modular app icons, infographics, and web graphics to support cohesive product communication and marketing strategies.',
      'Engineered promotional email campaigns and social media graphics optimized for engagement across diverse marketing platforms.',
      'Partnered with engineering and marketing leadership to ensure all visual assets aligned with core product messaging and brand architecture.',
    ],
    color: C.BLUE,
  },
  {
    title: 'Digital Artist',
    company: 'Local Language Inc.',
    period: 'Jul 2020 – Jul 2021',
    description: 'Spearheading the creation of high-fidelity 2D and 3D visual systems for commercial environments and large-scale public installations.',
    bullets: [
      'Developed site-specific visual concepts for large-scale public installations and complex architectural environments.',
      'Translated conceptual artwork into high-fidelity 3D visualizations for spatial design and environmental branding projects.',
      'Produced executive-level visual proposals and presentation decks to communicate design intent and secure stakeholder alignment.',
    ],
    color: C.GREEN,
  },
  {
    title: 'Graphic Designer',
    company: 'Pacific Rim International School',
    period: '2018 – 2020',
    description: 'Directing the design and production of editorial systems and character-driven visual content for institutional communications.',
    bullets: [
      'Developed modular editorial systems and illustrated content to support complex learning and engagement initiatives.',
      'Managed the end-to-end production of annual publications and internal communication materials for the institutional community.',
    ],
    color: C.YELLOW,
  },
];

const LOGIC_DATA = [
  {
    a: { title: 'Character System Design', content: 'Standardized character proportions and pose structures across the 72-volume series to maintain recognizability and emotional consistency.', tags: ['Character_Systems', 'Visual_Consistency', 'Illustration_Framework'] },
    b: { title: 'Editorial Composition', content: 'Designed illustration compositions that systematically reserve space for text overlays while preserving reading flow and visual clarity.', tags: ['Editorial_Design', 'Reading_Flow', 'Content_Integration'] },
  },
  {
    a: { title: 'Brand System Development', content: 'Developed modular visual systems for cross-platform marketing campaigns and social content.', tags: ['Brand_Systems', 'Visual_Marketing', 'Design_Operations'] },
    b: { title: 'Performance Creative', content: 'Designed promotional email and social graphics supporting high-engagement marketing campaigns.', tags: ['Campaign_Assets', 'Performance_Design', 'Marketing_Creative'] },
  },
  {
    a: { title: '2D to 3D Visualization', content: 'Translated conceptual 2D artwork into high-fidelity 3D renderings for architectural environments.', tags: ['Spatial_Design', '3D_Visualization', 'Concept_Development'] },
    b: { title: 'Client Proposal Design', content: 'Structured visual narratives in presentation decks to clearly communicate design intent and support client decision-making.', tags: ['Client_Communication', 'Design_Presentation', 'Stakeholder_Alignment'] },
  },
  {
    a: { title: 'Educational Illustration', content: 'Designed character-driven illustrations supporting early learning and classroom engagement.', tags: ['Character_Systems', 'Learning_Design', 'Visual_Pedagogy'] },
    b: { title: 'Editorial Production', content: 'Managed the end-to-end design and production process for annual publications and institutional communications.', tags: ['Editorial_Design', 'Production_Design', 'Content_Curation'] },
  },
];

const SYSTEM_LOGS = [
  'ACTING_AS: VISUAL_SYSTEMS_ARCHITECT',
  'SPATIAL_LOGIC: A/B_ENABLED',
  'HIERARCHY: SYSTEM_CORE_PRIORITY',
  'CHECKING_CHARACTER_DNA: OK',
  'OPTIMIZING_PROMPT_PIPELINE: 100%',
  'VENDOR_SYNC: ACTIVE',
  'LATENT_SPACE_MAPPING: COMPLETE',
  'RETRIEVING_ASSET_CACHE...',
  'SYSTEM_INTEGRITY: 99.9%',
];

// ── Sub-components ────────────────────────────────────────────────────────────

const SystemTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SYSTEM_LOGS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-4 overflow-hidden relative w-64">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center"
        >
          <span className="font-mono text-[8px] opacity-40 uppercase tracking-widest truncate">
            &gt; {SYSTEM_LOGS[index]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const StaticModule = ({
  title, subtitle, color, children, moduleId,
}: {
  title: string; subtitle: string; color: string; children?: React.ReactNode; moduleId: string;
}) => (
  <motion.div
    whileHover={{ x: 4 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    className="relative w-full flex flex-col bg-white border-b border-black/5 last:border-b-0 overflow-hidden p-4 group/module"
  >
    {/* Vertical accent line */}
    <div
      className="absolute left-0 top-0 bottom-0 w-1 z-20 transition-all duration-300 group-hover/module:w-2"
      style={{ backgroundColor: color }}
    />
    <div className="relative z-10 w-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[7px] font-bold tracking-[0.2em]" style={{ color }}>{moduleId}</span>
            <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          </div>
          <div className="inline-block overflow-hidden">
            <motion.h3
              initial={false}
              whileHover={{ x: 2 }}
              className="font-mono text-[11px] font-black uppercase tracking-widest text-white px-2 py-0.5 rounded-[1px] relative z-10"
              style={{ backgroundColor: color }}
            >
              {title}
            </motion.h3>
          </div>
        </div>
        <span className="font-mono text-[7px] text-black/30 uppercase tracking-widest group-hover/module:text-black/60 transition-colors">{subtitle}</span>
      </div>
      <div className="relative pt-2 border-t border-black/5 group-hover/module:border-black/10 transition-colors">
        {children}
      </div>
    </div>
    <div className="absolute inset-0 pointer-events-none opacity-[0.01] group-hover/module:opacity-[0.03] transition-opacity bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
  </motion.div>
);

// ── Main component ────────────────────────────────────────────────────────────

const AboutPage: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  const segments = [
    { idx: 0, label: '2023-PRESENT', width: '30%', color: C.RED,    name: 'Imagine Learning' },
    { idx: 1, label: '2021-2023',    width: '25%', color: C.BLUE,   name: 'Miles' },
    { idx: 2, label: '2020-2021',    width: '15%', color: C.GREEN,  name: 'Local Language' },
    { idx: 3, label: '2018-2020',    width: '30%', color: C.YELLOW, name: 'Pacific Rim' },
  ];

  const activeExp = EXPERIENCES[hoveredIdx];
  const activeLogic = LOGIC_DATA[hoveredIdx];
  const activeIndexStr = (hoveredIdx + 1).toString().padStart(2, '0');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full p-5 flex flex-col space-y-5 text-[#1D3557]"
    >
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#1D3557]/20 pb-6 pt-2">
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col">
            <h1 className="text-4xl font-black tracking-tighter text-[#1D3557] leading-none mb-1">
              YUQI LU
            </h1>
            <div className="flex items-center">
              <span className="font-mono text-[7px] font-bold tracking-[0.2em] uppercase text-[#1D3557]/60">
                IDENTITY_VERIFIED // SYSTEM_AUTHOR
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="text-sm font-bold tracking-[0.05em] uppercase text-[#1D3557]">
              Visual Systems Designer · Senior Illustrator
            </span>
            <p className="text-[11px] font-medium text-stone-500 max-w-lg leading-relaxed border-l border-[#1D3557]/10 pl-3">
              Designing scalable visual systems, modular illustration frameworks, and AI-assisted creative workflows.
            </p>
          </div>
        </div>

        {/* Right: social links */}
        <div className="flex flex-col items-end space-y-4">
          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-[6px] text-stone-400 uppercase tracking-widest mb-1">CONNECT_PROTOCOLS</span>

            <a href="https://yuqisart.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link">
              <span className="font-mono text-[8px] font-bold tracking-widest text-[#1D3557]/70 group-hover/link:text-[#1D3557] transition-colors uppercase">yuqisart.com</span>
              <div className="p-1.5 rounded-[1px] bg-[#1D3557]/10 text-[#1D3557]/70 group-hover/link:bg-[#F3B013] group-hover/link:text-white transition-all">
                <ExternalLink size={10} />
              </div>
            </a>

            <a href="https://www.linkedin.com/in/yuqilu/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link">
              <span className="font-mono text-[8px] font-bold tracking-widest text-[#1D3557]/70 group-hover/link:text-[#1D3557] transition-colors uppercase">LinkedIn</span>
              <div className="p-1.5 rounded-[1px] bg-[#1D3557]/10 text-[#1D3557]/70 group-hover/link:bg-[#1156D0] group-hover/link:text-white transition-all">
                <Linkedin size={10} />
              </div>
            </a>

            <a href="https://www.instagram.com/spaceyuqio/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link">
              <span className="font-mono text-[8px] font-bold tracking-widest text-[#1D3557]/70 group-hover/link:text-[#1D3557] transition-colors uppercase">Instagram</span>
              <div className="p-1.5 rounded-[1px] bg-[#1D3557]/10 text-[#1D3557]/70 group-hover/link:bg-[#EB431D] group-hover/link:text-white transition-all">
                <Instagram size={10} />
              </div>
            </a>

            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=luyuqi0726@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link">
              <span className="font-mono text-[8px] font-bold tracking-widest text-[#1D3557]/70 group-hover/link:text-[#1D3557] transition-colors uppercase">Email</span>
              <div className="p-1.5 rounded-[1px] bg-[#1D3557]/10 text-[#1D3557]/70 group-hover/link:bg-[#1A824E] group-hover/link:text-white transition-all">
                <Mail size={10} />
              </div>
            </a>
          </div>

          <div className="font-mono text-[6pt] text-stone-400 tracking-widest uppercase flex items-center gap-2 bg-black/[0.02] px-3 py-1 rounded-full">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            SYSTEM_STATUS: OPTIMIZED
          </div>
        </div>
      </div>

      {/* 2. Timeline */}
      <div className="relative h-16 shrink-0">
        <div className="flex w-full h-8 items-end space-x-1 relative z-10">
          {segments.map((seg) => {
            const isActive = hoveredIdx === seg.idx;
            return (
              <motion.div
                key={seg.idx}
                onMouseEnter={() => setHoveredIdx(seg.idx)}
                whileHover={{ scaleY: 1.05, originY: 1 }}
                style={{ width: seg.width }}
                className="group relative cursor-pointer h-full flex flex-col justify-end"
              >
                <div
                  className={`absolute -top-4 left-0 font-mono text-[8px] font-bold transition-all duration-200 ${isActive ? 'opacity-100 -translate-y-0.5' : 'opacity-30'}`}
                  style={{ color: seg.color }}
                >
                  {seg.label}
                </div>
                <div className="relative w-full h-full flex items-end">
                  <motion.div
                    animate={{ height: isActive ? '16px' : '6px', backgroundColor: seg.color }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="w-full rounded-t-[2px] relative z-10"
                  />
                </div>
                <div className={`mt-1.5 font-mono text-[8px] font-bold uppercase tracking-wider whitespace-nowrap transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {seg.name}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="w-full h-[1px] bg-[#1D3557]/10 -mt-[1px]" />
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-12 gap-4">

        {/* Left 8-col: experience + logic cards */}
        <div className="col-span-12 md:col-span-8 flex flex-col space-y-4 relative">
          <div className="absolute inset-0 bg-[#F0ECE4] rounded-[5px] pointer-events-none z-0" />

          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F0ECE4] border border-white/50 rounded-[5px] relative shrink-0 z-10"
            >
              <div className="w-full relative z-10">
                <div className="flex">
                  <div
                    className="w-10 flex items-center justify-center font-black text-white text-base p-2 shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: activeExp.color }}
                  >
                    {activeIndexStr}
                  </div>
                  <div className={`p-3 flex-grow ${PAPER_BG}`}>
                    <h4 className="font-mono text-[9px] font-bold uppercase tracking-widest opacity-60 mb-0.5" style={{ color: activeExp.color }}>{activeExp.period}</h4>
                    <h3 className="text-base font-bold uppercase tracking-tight text-[#1D3557]">{activeExp.company}</h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h5 className="text-sm font-medium" style={{ color: C.BLUE }}>{activeExp.title}</h5>
                    <p className="text-[11px] opacity-60 leading-relaxed max-w-2xl">{activeExp.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {activeExp.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-[11px] flex items-start group"
                      >
                        <span className="mr-2 mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: activeExp.color }} />
                        <span className="opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity">{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* A/B Logic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={`${PAPER_BG} border border-white/30 p-4 rounded-[5px] group h-full transition-all duration-300 hover:border-[#F3B013] hover:bg-white relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#F3B013] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#F3B013] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#F3B013] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#F3B013] opacity-0 group-hover:opacity-100 transition-opacity" />
              <h6 className="font-mono text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: C.YELLOW }}>A — {activeLogic.a.title}</h6>
              <p className="text-[10px] leading-relaxed opacity-80 mb-3 font-medium">{activeLogic.a.content}</p>
              <div className="flex flex-wrap gap-1.5">
                {activeLogic.a.tags.map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 rounded-[2px] font-mono text-[8px] font-bold"
                    style={{ backgroundColor: `${C.YELLOW}22`, border: `1px solid ${C.YELLOW}44`, color: '#B8860D' }}
                  >{tag}</span>
                ))}
              </div>
            </div>

            <div className={`${PAPER_BG} border border-white/30 p-4 rounded-[5px] group h-full transition-all duration-300 hover:border-[#1156D0] hover:bg-white relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#1156D0] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#1156D0] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#1156D0] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#1156D0] opacity-0 group-hover:opacity-100 transition-opacity" />
              <h6 className="font-mono text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: C.BLUE }}>B — {activeLogic.b.title}</h6>
              <p className="text-[10px] leading-relaxed opacity-80 mb-3 font-medium">{activeLogic.b.content}</p>
              <div className="flex flex-wrap gap-1.5">
                {activeLogic.b.tags.map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 rounded-[2px] font-mono text-[8px] font-bold"
                    style={{ backgroundColor: `${C.BLUE}22`, border: `1px solid ${C.BLUE}44`, color: C.BLUE }}
                  >{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4-col: StaticModules + download */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
          <div className="flex flex-col rounded-[2px] bg-white border border-black/10 overflow-hidden shadow-sm">
            <StaticModule moduleId="SYS-01" title="EDUCATION" subtitle="ACADEMIC BACKGROUND" color={C.GREEN}>
              <div className="space-y-4 text-black/80">
                <div>
                  <h4 className="font-mono text-[8px] font-bold tracking-widest mb-1" style={{ color: C.GREEN }}>MASTER OF FINE ARTS</h4>
                  <p className="text-[10px] font-medium leading-tight">Academy of Art University (San Francisco)</p>
                </div>
                <div className="border-t border-black/5 pt-3">
                  <h4 className="font-mono text-[8px] font-bold tracking-widest mb-1" style={{ color: C.GREEN }}>BACHELOR OF ARTS</h4>
                  <p className="text-[10px] font-medium leading-tight">Xi'an Jiaotong University</p>
                </div>
              </div>
            </StaticModule>

            <StaticModule moduleId="SYS-02" title="CAPABILITIES" subtitle="CORE COMPETENCIES" color={C.RED}>
              <div className="space-y-4 text-black/80">
                <div>
                  <h4 className="font-mono text-[8px] font-bold mb-1 uppercase tracking-widest" style={{ color: C.RED }}>Design Systems</h4>
                  <p className="text-[10px] font-medium leading-tight">Illustration Systems, Art Direction, Visual Consistency, Creative Production.</p>
                </div>
                <div>
                  <h4 className="font-mono text-[8px] font-bold mb-1 uppercase tracking-widest" style={{ color: C.RED }}>AI Integration</h4>
                  <p className="text-[10px] font-medium leading-tight">AI-Assisted Illustration Workflow, Prompt Development, Workflow Prototyping.</p>
                </div>
                <div>
                  <h4 className="font-mono text-[8px] font-bold mb-1 uppercase tracking-widest" style={{ color: C.RED }}>Toolstack</h4>
                  <p className="text-[10px] font-medium leading-tight">Figma, AI Studio, Claude Code, NanoBanana, Photoshop, After Effects.</p>
                </div>
              </div>
            </StaticModule>

            <StaticModule moduleId="SYS-03" title="CHARACTER DNA" subtitle="VISUAL IMMUTABILITY" color={C.BLUE}>
              <div className="space-y-4 text-black/80">
                <div>
                  <h5 className="font-mono text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: C.BLUE }}>IDENTITY TOKENS</h5>
                  <p className="text-[10px] font-medium leading-tight">Hard-coding visual traits for 72-book consistency.</p>
                </div>
                <div>
                  <h5 className="font-mono text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: C.BLUE }}>0 DRIFT</h5>
                  <p className="text-[10px] font-medium leading-tight">Ensuring characters remain immutable across diverse generative scenes.</p>
                </div>
              </div>
            </StaticModule>
          </div>

          <a
            href="/yuqi-lu-resume.pdf"
            download
            className="shrink-0 h-10 flex items-center justify-between px-4 rounded-[2px] bg-[#1D3557] text-white cursor-pointer hover:text-black hover:bg-[#F3B013] border border-transparent hover:border-[#F3B013]/20 transition-all duration-300 group shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <Download size={12} className="group-hover:translate-y-0.5 transition-transform" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest">DOWNLOAD_RESUME.PDF</span>
            </div>
            <span className="font-mono text-[8px] opacity-40 ml-12 group-hover:opacity-100 transition-opacity">V1.5</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <motion.div variants={itemVariants} className="flex justify-between items-center font-mono text-[8px] opacity-20 pt-4 border-t border-[#1D3557]/10 shrink-0">
        <span>LOC: 47.6062° N, 122.3321° W // SEATTLE_WA</span>
        <SystemTicker />
      </motion.div>
    </motion.div>
  );
};

export default AboutPage;
