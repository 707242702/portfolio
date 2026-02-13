
import { Section, PathDefinition, Project, AiItem } from './types';

// Visual System Colors
export const COLORS = {
  RED: '#EB431D',      // Vibrant Red
  BLUE: '#1156D0',     // Cobalt Blue
  GREEN: '#1A824E',    // Deep Green
  ORANGE: '#F3B013',   // Golden Yellow
  PAPER: '#E5DED0',    // Warm Beige/Grey Paper
  TEXT: '#1D3557'
};

// Geometric Path System
// Canvas ViewBox: 0 0 1000 800
// Extended coordinates (-400 to 1400) ensure lines go fully off-screen.

export const PATHS: PathDefinition[] = [
  {
    id: 'pipe-1',
    color: COLORS.RED,
    zIndex: 10,
    d: {
      // RED: 2 Segments.
      // Direction: Top -> Bottom / Right -> Left flow
      
      // Home: "The Slash" (Extended)
      [Section.HOME]: "M 1400 -200 C 1100 50, 700 350, 400 550 C 100 750, -100 900, -400 1200",
      
      // AI: "Organic Wave" (Extended Left and Right)
      [Section.AI]: "M -400 150 C 200 150, 500 250, 600 450 C 700 650, 1000 700, 1400 700",
      
      // Work: "Vertical Column 1" (Extended Top/Bottom)
      [Section.WORK]: "M 200 -400 C 200 -133, 200 133, 200 400 C 200 666, 200 933, 200 1200",
      
      // About: "Curve Wrap" (Extended)
      [Section.ABOUT]: "M 600 -400 C 600 -200, 600 100, 600 200 C 600 500, 400 900, -200 1200",
      
      // Detail: Top Border (Extended)
      [Section.DETAIL]: "M -400 60 C 200 60, 500 60, 500 60 C 500 60, 800 60, 1400 60" 
    }
  },
  {
    id: 'pipe-2',
    color: COLORS.BLUE,
    zIndex: 20,
    d: {
      // BLUE: 1 Segment.
      // Direction: Generally Left -> Right
      
      // Home: "The Arc" (Extended Left -400, Right 1400)
      [Section.HOME]: "M -400 50 C 100 150, 900 600, 1400 1100",
      
      // AI: "Horizontal" (Extended)
      [Section.AI]: "M -400 600 C 200 600, 800 600, 1400 600",
      
      // Work: "Vertical Column 2" (Extended)
      [Section.WORK]: "M 400 -400 C 400 133, 400 666, 400 1200",
      
      // About: "Horizontal" (Extended)
      [Section.ABOUT]: "M -400 400 C 200 400, 800 400, 1400 400",
      
      // Detail: Right Border (Extended Vertical)
      [Section.DETAIL]: "M 940 -400 C 940 133, 940 666, 940 1200"
    }
  },
  {
    id: 'pipe-3',
    color: COLORS.GREEN,
    zIndex: 15,
    d: {
      // GREEN: 3 Segments.
      // Structure: M -> C1 -> C2 -> C3
      // NOTE: All sections must have 3 segments for smooth interpolation.
      
      // Home: Adjusted "Curvy" and "Separated" path.
      // Starts Top-Right (950, -200).
      // Curves drastically to the RIGHT of center (roughly 600-700 x range) to avoid the central junction (500,400).
      // Then curves back to Bottom-Left (200, 1200).
      [Section.HOME]: "M 950 -200 C 950 200, 750 300, 700 500 C 650 700, 500 900, 350 1050 C 300 1125, 250 1160, 200 1200",
      
      // AI: "Diagonal"
      [Section.AI]: "M 1400 -200 C 1100 33, 900 150, 700 300 C 500 450, 300 650, 100 800 C -100 950, -250 1075, -400 1200",
      
      // Work: "Vertical Column 3"
      [Section.WORK]: "M 600 -400 C 600 -100, 600 100, 600 400 C 600 600, 600 800, 600 900 C 600 1000, 600 1100, 600 1200",
      
      // About: "Snake"
      [Section.ABOUT]: "M -400 300 C -100 300, 100 300, 300 300 C 500 300, 500 100, 700 100 C 1000 100, 1200 100, 1400 100",
      
      // Detail: Left Border
      [Section.DETAIL]: "M 60 -400 C 60 -100, 60 100, 60 400 C 60 600, 60 800, 60 900 C 60 1000, 60 1100, 60 1200"
    }
  },
  {
    id: 'pipe-4',
    color: COLORS.ORANGE,
    zIndex: 5,
    d: {
      // ORANGE: 2 Segments.
      
      // Home: "The Horizon"
      [Section.HOME]: "M -400 350 C 133 350, 400 450, 500 450 C 700 500, 1000 550, 1400 550",
      
      // AI: "Horizontal"
      [Section.AI]: "M -400 350 C 200 350, 500 350, 500 350 C 500 350, 800 350, 1400 350",
      
      // Work: "Vertical Column 4"
      [Section.WORK]: "M 800 -400 C 800 -133, 800 133, 800 400 C 800 666, 800 933, 800 1200",
      
      // About: "Vertical Divider"
      [Section.ABOUT]: "M 800 -400 C 800 -133, 800 133, 800 400 C 800 666, 800 933, 800 1200",
      
      // Detail: Bottom Border
      [Section.DETAIL]: "M -400 740 C 200 740, 500 740, 500 740 C 500 740, 800 740, 1400 740"
    }
  }
];

export const NAV_ITEMS = [
  { id: Section.HOME, label: 'HOME' },
  { id: Section.AI, label: 'AI' },
  { id: Section.WORK, label: 'WORK' },
  { id: Section.ABOUT, label: 'ABOUT' },
];

export const AI_ITEMS: AiItem[] = [
  {
    id: 'ai-illustration',
    title: 'Illustration Systems',
    subtitle: 'AUTONOMOUS',
    description: 'Large publishing projects require more than strong visuals. They require consistency.',
    fullDescription: 'In the 72-book K–2 decodable series, I helped establish a structured illustration framework that allowed multiple illustrators and AI-generated assets to align under a unified visual language.',
    content: [
      "This included:",
      "• Character proportion guidelines",
      "• Lighting structure templates",
      "• Color hierarchy definitions",
      "• Texture application rules",
      "AI was used as a tool, but not as a decision-maker. All outputs passed through a defined correction and refinement process.",
      "The focus was clarity and consistency, not speed."
    ],
    tags: ['System Design', 'K-2 Series', 'Art Direction'],
    metrics: [
        { label: "Project Scope", value: "72 Books" },
        { label: "Team Structure", value: "6 Illustrators" },
        { label: "Output", value: "Print-ready" }
    ]
  },
  {
    id: 'ai-style',
    title: 'Style Libraries',
    subtitle: 'SYNTHETIC',
    description: 'To maintain visual cohesion across projects, I developed a set of shared visual references and working rules.',
    fullDescription: 'These libraries defined: Indoor and outdoor color palettes, Warm light and shadow behavior, Controlled highlight placement, Texture layering workflow.',
    content: [
      "By documenting these systems, we reduced subjective interpretation and improved alignment across contributors.",
      "Consistency became measurable rather than intuitive."
    ],
    tags: ['Visual Guides', 'Color Theory', 'Standardization']
  },
  {
    id: 'ai-production',
    title: 'Production Workflow',
    subtitle: 'STRUCTURED',
    description: 'AI tools were integrated into an existing publishing pipeline rather than replacing it.',
    fullDescription: 'The working structure followed: Storyboard → Controlled prompt drafting → AI generation → Manual correction → Layout integration → Final asset export.',
    content: [
      "This process allowed experimentation while respecting editorial schedules and print requirements.",
      "Automation supported the work. It did not override design judgment."
    ],
    tags: ['Pipeline Integration', 'Manual Correction', 'Print Ready']
  },
  {
    id: 'ai-layout',
    title: 'Layout Exploration',
    subtitle: 'ADAPTIVE',
    description: 'In parallel, I explored how AI-assisted assets could adapt within layout systems.',
    fullDescription: 'Using Figma prototypes, I tested: Flexible grid behaviors, Visual hierarchy under varied content density, Asset scaling without distortion, Curriculum-driven composition logic.',
    content: [
      "The goal was not novelty.",
      "It was usability within real classroom contexts."
    ],
    tags: ['Figma Prototyping', 'Grid Systems', 'UX/UI']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'work-illustration',
    title: 'ILLUSTRATION SYSTEMS',
    category: 'Illustration / Visual Consistency',
    year: '2024',
    role: 'Lead Illustrator',
    description: 'Long-form series & character development',
    content: [
      "Developing comprehensive illustration systems that scale across hundreds of assets. This work focuses on creating consistent character models, environment rules, and style guides that allow multiple contributors to maintain a unified aesthetic.",
      "The approach prioritizes modularity—building assets that can be reconfigured without losing their visual identity. This ensures longevity and adaptability for large-scale publishing and digital products."
    ]
  },
  {
    id: 'work-marketing',
    title: 'MARKETING & VISUAL DESIGN',
    category: 'Marketing / Brand / Digital',
    year: '2024',
    role: 'Visual Designer',
    description: 'Campaign assets, infographics, and brand alignment',
    content: [
      "Translating brand strategy into compelling visual narratives. From social media campaigns to complex infographics, this body of work ensures that every touchpoint reinforces the core brand identity.",
      "Emphasis is placed on clarity and hierarchy, ensuring that marketing materials are not just visually striking, but also effectively communicate the intended message to the target audience."
    ]
  },
  {
    id: 'work-motion',
    title: 'MOTION & ANIMATION',
    category: 'Motion / Interaction',
    year: '2023',
    role: 'Motion Designer',
    description: '2D motion, GIF systems, and visual experiments',
    content: [
      "Bringing static systems to life through calculated motion. This collection explores how animation can enhance user experience and storytelling without becoming a distraction.",
      "Projects range from UI micro-interactions to narrative GIF series, all governed by a physics-based animation language that feels natural and responsive."
    ],
    videos: [
        '_Qt3sRB3gh4', // Main video
        '1mDwq-1DYBs', // Short
        'JpTWv7R63s0'  // Short/Video
    ]
  },
  {
    id: 'work-personal',
    title: 'PERSONAL EXPLORATION',
    category: 'Self-Initiated / Research',
    year: 'Ongoing',
    role: 'Illustrator & Researcher',
    description: 'Character studies, pet illustrations, and style experiments',
    content: [
      "A playground for testing new tools, code, and visual styles. This section documents the process of daily iteration, where failure is part of the discovery.",
      "Recent work includes a series of stylized pet illustrations exploring color theory and character expression, balancing sharp geometry with organic textures."
    ],
    images: [
      "https://i.ibb.co/sdr3sLgF/Untitled-Artwork-8.jpg",
      "https://i.ibb.co/Ts1N7Fc/Untitled-Artwork-39.jpg",
      "https://i.ibb.co/hRpkhcc8/Untitled-Artwork.jpg"
    ]
  },
  {
    id: 'work-spatial',
    title: 'INSTALLATION & SPATIAL ART',
    category: 'Spatial / Concept Development',
    year: '2022',
    role: 'Concept Artist',
    description: 'Digital rendering and large-scale visual concepts',
    content: [
      "Exploring the intersection of digital aesthetics and physical space. These concepts visualize large-scale installations and environmental graphics.",
      "Using 3D rendering tools, I simulate how light, texture, and form interact in spatial contexts, proposing immersive experiences that challenge conventional architectural surfaces."
    ]
  }
];
