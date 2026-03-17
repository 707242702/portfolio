
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
    description: 'Scaling Pedagogical Storytelling: A 72-book evolution from hand-drawn storyboards to AI-integrated visual systems for Decodable Phonics.',
    fullDescription: '',
    content: [],
    tags: ['System Design', 'K-2 Series', 'Art Direction'],
    metrics: [
        { label: "Project Scope", value: "72 Books" },
        { label: "Team Structure", value: "6 Illustrators" },
        { label: "Output", value: "Print-ready" }
    ],
    customHtml: `<div style="width:100%;">

  <!-- ==================== INTRO ==================== -->
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;margin-bottom:48px;backdrop-filter:blur(4px);">
    <p style="font-size:20px;font-weight:500;line-height:1.55;color:#1D3557;margin:0 0 16px;">
      Scaling Pedagogical Storytelling
    </p>
    <p style="font-family:inherit;font-size:18px;line-height:1.75;color:#57534e;margin:0;">
      A 72-book evolution from hand-drawn storyboards to AI-integrated visual systems for Decodable Phonics \u2014 encoding pedagogical intent directly into AI instructions while preserving the artistic soul required for educational publishing.
    </p>
  </div>

  <!-- ==================== 01 \u2014 EVOLUTION OF PEDAGOGICAL CONTROL ==================== -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#EB431D;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">01</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Evolution of Pedagogical Control</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 12px;">From Hand-drawn Logic to AI Integration</p>
      <p style="font-family:inherit;font-size:14px;color:#78716c;line-height:1.7;margin:0;">
        The transition from Phase 1 to Phase 4 was not about replacing the illustrator, but about encoding pedagogical intent. We moved from physical storyboarding to a system where narrative constraints are embedded directly into AI instructions.
      </p>
    </div>
  </div>

  <!-- Phase Comparison Grid -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 12px;text-transform:uppercase;font-weight:600;">Three-Stage Evolution</p>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;margin-bottom:8px;">
    <div style="padding:20px;border:1px solid #D9D9D9;border-radius:2px 0 0 0;background:rgba(0,0,0,0.02);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#c0392b;margin:0;text-transform:uppercase;font-weight:600;min-height:32px;display:flex;align-items:flex-end;">Phase 1 \u2014 Manual</p>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-top:12px;">
        <img src="/images/ai-illustration/phase1-storyboard.webp" alt="Hand-drawn storyboard" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-size:12px;color:#78716c;margin:12px 0 0;line-height:1.6;">Full manual storyboarding. Pedagogical intent controlled through hand-drawn composition and spatial pacing.</p>
    </div>
    <div style="padding:20px;border:1px solid #D9D9D9;border-left:none;background:rgba(0,0,0,0.02);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#F3B013;margin:0;text-transform:uppercase;font-weight:600;min-height:32px;display:flex;align-items:flex-end;">Phase 2 \u2014 AI Draft</p>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-top:12px;">
        <img src="/images/ai-illustration/phase4-ai-draft.webp" alt="AI-generated 70% draft" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-size:12px;color:#78716c;margin:12px 0 0;line-height:1.6;">Prompt-driven generation via Nanobanana. 70% complete \u2014 structurally sound but surface too smooth for publishing.</p>
    </div>
    <div style="padding:20px;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 0 0;background:rgba(0,0,0,0.02);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0;text-transform:uppercase;font-weight:600;min-height:32px;display:flex;align-items:flex-end;">Phase 3 \u2014 Refined Final</p>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-top:12px;">
        <img src="/images/ai-illustration/phase-final-refined.webp" alt="Manually refined final illustration" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-size:12px;color:#78716c;margin:12px 0 0;line-height:1.6;">30% illustrator refinement: texture, brush edges, and hand-drawn feel restored for print-ready output.</p>
    </div>
  </div>
  <div style="background:rgba(235,67,29,0.05);border:1px solid #D9D9D9;border-top:none;border-radius:0 0 2px 2px;padding:16px 20px;margin-bottom:48px;display:flex;align-items:center;gap:12px;">
    <span style="font-size:20px;color:#EB431D;font-weight:700;flex-shrink:0;">\u2192</span>
    <p style="font-size:13px;color:#1D3557;margin:0;font-weight:500;">The tools changed, but compositional discipline and storytelling expertise remain consistent. Pedagogical intent is now encoded, not drawn.</p>
  </div>

  <!-- ==================== 02 \u2014 VISUAL LANGUAGE RULES ==================== -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#1156D0;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">02</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Visual Language Rules for K-2</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 8px;">Designed for early readers</p>
      <p style="font-family:inherit;font-size:14px;color:#78716c;line-height:1.7;margin:0;">
        A visual specification system built around the cognitive needs of K-2 learners \u2014 eliminating AI smoothness and visual noise to create warm, readable illustrations.
      </p>
    </div>
  </div>

  <!-- Style Origin & Comfort -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:24px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;border-radius:2px 0 0 2px;padding:24px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:700;">A \u2014 Style Origin & Comfort</p>
      <p style="font-family:inherit;font-size:14px;color:#78716c;line-height:1.7;margin:0 0 16px;">
        We use rough brush edges and visible textures to eliminate the \u201Cuncanny valley\u201D of AI smoothness, providing a warm, hand-drawn feel that reduces visual fatigue for children.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span style="font-size:11px;color:#1156D0;background:rgba(17,86,208,0.06);padding:4px 10px;border-radius:2px;font-weight:500;">Rough Brush Edges</span>
        <span style="font-size:11px;color:#1156D0;background:rgba(17,86,208,0.06);padding:4px 10px;border-radius:2px;font-weight:500;">Visible Textures</span>
        <span style="font-size:11px;color:#1156D0;background:rgba(17,86,208,0.06);padding:4px 10px;border-radius:2px;font-weight:500;">Hand-drawn Feel</span>
      </div>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:24px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:700;">B \u2014 Strategic Simplification</p>
      <p style="font-family:inherit;font-size:14px;color:#78716c;line-height:1.7;margin:0 0 16px;">
        No Line Art Policy. By removing harsh outlines, we reduce visual noise, allowing students to focus on core character actions and their correspondence with the text.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span style="font-size:11px;color:#1156D0;background:rgba(17,86,208,0.06);padding:4px 10px;border-radius:2px;font-weight:500;">No Line Art</span>
        <span style="font-size:11px;color:#1156D0;background:rgba(17,86,208,0.06);padding:4px 10px;border-radius:2px;font-weight:500;">Reduced Visual Noise</span>
        <span style="font-size:11px;color:#1156D0;background:rgba(17,86,208,0.06);padding:4px 10px;border-radius:2px;font-weight:500;">Focus on Action</span>
      </div>
    </div>
  </div>

  <!-- Texture Comparison -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:8px;">
    <div style="border:1px solid #D9D9D9;border-radius:2px 0 0 2px;overflow:hidden;">
      <div style="padding:10px 16px;background:rgba(192,57,43,0.06);border-bottom:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#c0392b;margin:0;text-transform:uppercase;font-weight:600;">Raw AI Output \u2014 Too Smooth</p>
      </div>
      <div style="padding:0;">
        <img src="/images/ai-illustration/texture-ai-raw.webp" alt="Raw MidJourney output with smooth gradients" style="display:block;width:100%;height:auto;">
      </div>
    </div>
    <div style="border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;overflow:hidden;">
      <div style="padding:10px 16px;background:rgba(26,130,78,0.06);border-bottom:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#1A824E;margin:0;text-transform:uppercase;font-weight:600;">After Refinement \u2014 Hand-Drawn Feel</p>
      </div>
      <div style="padding:0;">
        <img src="/images/ai-illustration/texture-refined.webp" alt="Refined with brush irregularity and texture" style="display:block;width:100%;height:auto;">
      </div>
    </div>
  </div>
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 48px;text-transform:uppercase;">Eliminating AI smoothness to meet K-2 visual comfort standards</p>

  <!-- ==================== 03 \u2014 COGNITIVE & LAYOUT LOGIC ==================== -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#F3B013;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">03</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#F3B013;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Cognitive & Layout Logic</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 8px;">Engineering visual flow for young minds</p>
      <p style="font-family:inherit;font-size:14px;color:#78716c;line-height:1.7;margin:0;">
        Every illustration is structurally designed to support word-decoding and phonics reading, ensuring visuals assist rather than distract from the learning process.
      </p>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:24px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;border-radius:2px 0 0 2px;padding:24px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#F3B013;margin:0 0 16px;text-transform:uppercase;font-weight:700;">A \u2014 Proportional Logic</p>
      <p style="font-family:inherit;font-size:14px;color:#78716c;line-height:1.7;margin:0 0 16px;">
        Standardized head-to-body ratios for all K-2 characters to ensure emotional expressions and physical actions are exaggerated and easily decodable by young minds.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span style="font-size:11px;color:#78716c;background:rgba(243,176,19,0.08);padding:4px 10px;border-radius:2px;font-weight:500;">Head-body Ratio</span>
        <span style="font-size:11px;color:#78716c;background:rgba(243,176,19,0.08);padding:4px 10px;border-radius:2px;font-weight:500;">Exaggerated Expression</span>
        <span style="font-size:11px;color:#78716c;background:rgba(243,176,19,0.08);padding:4px 10px;border-radius:2px;font-weight:500;">Cognitive Clarity</span>
      </div>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:24px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#F3B013;margin:0 0 16px;text-transform:uppercase;font-weight:700;">B \u2014 Copy-Safe Composition</p>
      <p style="font-family:inherit;font-size:14px;color:#78716c;line-height:1.7;margin:0 0 16px;">
        Every illustration systemically reserves negative space for text. The visual flow is engineered to guide the eye from left to right, mirroring the phonics reading path.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span style="font-size:11px;color:#78716c;background:rgba(243,176,19,0.08);padding:4px 10px;border-radius:2px;font-weight:500;">Negative Space</span>
        <span style="font-size:11px;color:#78716c;background:rgba(243,176,19,0.08);padding:4px 10px;border-radius:2px;font-weight:500;">Left-to-Right Flow</span>
        <span style="font-size:11px;color:#78716c;background:rgba(243,176,19,0.08);padding:4px 10px;border-radius:2px;font-weight:500;">Phonics Path</span>
      </div>
    </div>
  </div>

  <!-- Character Consistency Image -->
  <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-bottom:8px;">
    <img src="/images/ai-illustration/character-consistency.webp" alt="Character proportional consistency across the K-2 series" style="display:block;width:100%;height:auto;">
  </div>
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 48px;text-transform:uppercase;">Standardized proportions \u2014 consistent across characters, scenes & books</p>

  <!-- ==================== 04 \u2014 THE ART DIRECTOR'S REFINEMENT ==================== -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#1A824E;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">04</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 16px;text-transform:uppercase;font-weight:600;">The Art Director's Refinement</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 12px;">Controlled Imperfection</p>
      <p style="font-family:inherit;font-size:14px;color:#78716c;line-height:1.7;margin:0;">
        AI-generated outputs often suffer from \u201Cover-polishing.\u201D Our system includes a mandatory 30% Human Refinement stage to restore organic irregularities, ensuring the final print-ready assets possess the artistic soul required for educational publishing.
      </p>
    </div>
  </div>

  <!-- Before / After Refinement -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 12px;text-transform:uppercase;font-weight:600;">30% Human Refinement \u2014 Before & After</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:8px;">
    <div style="border:1px solid #D9D9D9;border-radius:2px 0 0 2px;overflow:hidden;">
      <div style="padding:10px 16px;background:rgba(243,176,19,0.06);border-bottom:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#F3B013;margin:0;text-transform:uppercase;font-weight:600;">AI Output \u2014 Over-polished</p>
      </div>
      <div style="padding:0;">
        <img src="/images/ai-illustration/phase4-ai-draft-2.webp" alt="AI-generated output before refinement" style="display:block;width:100%;height:auto;">
      </div>
    </div>
    <div style="border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;overflow:hidden;">
      <div style="padding:10px 16px;background:rgba(26,130,78,0.06);border-bottom:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#1A824E;margin:0;text-transform:uppercase;font-weight:600;">After Refinement \u2014 Artistic Soul Restored</p>
      </div>
      <div style="padding:0;">
        <img src="/images/ai-illustration/phase-final-refined-2.webp" alt="Final print-ready illustration with organic imperfections" style="display:block;width:100%;height:auto;">
      </div>
    </div>
  </div>

  <div style="background:rgba(26,130,78,0.05);border:1px solid #D9D9D9;border-top:none;border-radius:0 0 2px 2px;padding:16px 20px;margin-bottom:48px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div>
        <p style="font-size:12px;color:#F3B013;font-weight:500;margin:0 0 6px;">Over-polished symptoms:</p>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          <span style="font-size:10px;color:#78716c;background:rgba(243,176,19,0.06);padding:3px 8px;border-radius:2px;">Artificial gradients</span>
          <span style="font-size:10px;color:#78716c;background:rgba(243,176,19,0.06);padding:3px 8px;border-radius:2px;">Plastic surface</span>
          <span style="font-size:10px;color:#78716c;background:rgba(243,176,19,0.06);padding:3px 8px;border-radius:2px;">Generic feel</span>
        </div>
      </div>
      <div>
        <p style="font-size:12px;color:#1A824E;font-weight:500;margin:0 0 6px;">Restored qualities:</p>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          <span style="font-size:10px;color:#78716c;background:rgba(26,130,78,0.06);padding:3px 8px;border-radius:2px;">Organic irregularity</span>
          <span style="font-size:10px;color:#78716c;background:rgba(26,130,78,0.06);padding:3px 8px;border-radius:2px;">Brush texture</span>
          <span style="font-size:10px;color:#78716c;background:rgba(26,130,78,0.06);padding:3px 8px;border-radius:2px;">Artistic soul</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== METRICS ==================== -->
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:48px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#1D3557;margin:0;">72</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Books in pipeline</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#1156D0;margin:0;">70%</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">AI completion rate</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#1A824E;margin:0;">6</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Illustrators managed</p>
    </div>
  </div>

  <!-- ==================== OUTCOME ==================== -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Outcome</p>
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;">
    <p style="font-size:18px;line-height:1.65;color:#1D3557;margin:0 0 12px;">
      AI tools were not used as replacements. They functioned as accelerators.
    </p>
    <p style="font-family:inherit;font-size:16px;line-height:1.7;color:#78716c;margin:0;">
      The challenge wasn\u2019t just illustration; it was maintaining pedagogical integrity at scale. This system evolved from manual craftsmanship into a high-efficiency engine that turned 72 complex decodable books into a streamlined production reality.
    </p>
  </div>

</div>`
  },
  {
    id: 'ai-style',
    title: 'Style & Asset Architecture',
    subtitle: 'SYNTHETIC',
    description: 'Genetic-level prompt control \u2014 encoding visual DNA into AI instructions for zero-drift synthetic generation.',
    fullDescription: '',
    content: [],
    tags: ['Synthetic Generation', 'Identity Tokens', 'Prompt Architecture'],
    customHtml: `<div style="width:100%;">

  <!-- ==================== LEAD-IN ==================== -->
  <div style="margin-bottom:48px;">
    <p style="font-family:inherit;font-size:22px;line-height:1.6;color:#1D3557;margin:0 0 20px;font-weight:400;">
      From manual compositing to genetic-level instruction control.
    </p>
    <p style="font-family:inherit;font-size:16px;line-height:1.8;color:#78716c;margin:0 0 24px;">
      A dynamic prompt-based architecture that encodes artistic DNA into the generative process, ensuring zero visual drift across 72 books without the need for manual compositing.
    </p>
    <div style="background:rgba(0,0,0,0.03);border:1px solid #D9D9D9;border-radius:2px;padding:16px 20px;display:flex;align-items:center;gap:12px;">
      <div style="width:3px;height:36px;background:#1156D0;border-radius:1px;flex-shrink:0;"></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#1D3557;margin:0;line-height:1.6;">Every visual decision \u2014 character identity, material texture, environmental lighting \u2014 is written as an instruction the AI cannot override.</p>
    </div>
  </div>

  <!-- ==================== MODULE 01 \u2014 CHARACTER DNA ENCODING ==================== -->
  <div style="margin-bottom:56px;border-left:3px solid #EB431D;padding-left:24px;">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:white;background:#EB431D;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">01</span>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#EB431D;margin:0 0 2px;text-transform:uppercase;font-weight:600;">Character DNA Encoding</p>
        <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0;">Cross-Book Identity Control</p>
      </div>
    </div>

    <p style="font-family:inherit;font-size:15px;color:#78716c;line-height:1.8;margin:0 0 20px;">
      Managing consistency for 72 books requires more than a style guide \u2014 it requires Trait Hard-coding. We translate visual DNA (skin tone, hair texture, body proportions) into immutable Identity Tokens. The AI doesn\u2019t just \u201Cdraw\u201D Max; it executes a fixed genetic script, ensuring the same character emerges in every single generation.
    </p>

    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#EB431D;background:rgba(235,67,29,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(235,67,29,0.12);letter-spacing:0.05em;">Identity_Tokens</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#EB431D;background:rgba(235,67,29,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(235,67,29,0.12);letter-spacing:0.05em;">Trait_Extraction</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#EB431D;background:rgba(235,67,29,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(235,67,29,0.12);letter-spacing:0.05em;">Zero_Manual_Compositing</span>
    </div>

    <!-- Encoding Pipeline -->
    <div style="display:flex;align-items:stretch;gap:2px;margin-bottom:28px;">
      <div style="flex:1;background:#EB431D;padding:14px 16px;border-radius:2px 0 0 2px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(255,255,255,0.7);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Step 01</p>
        <p style="font-size:13px;color:white;margin:0;font-weight:500;">Trait Extraction</p>
        <p style="font-size:11px;color:rgba(255,255,255,0.7);margin:6px 0 0;line-height:1.5;">GPT translates visual DNA: age, skin, hair, proportions</p>
      </div>
      <div style="flex:1;background:rgba(235,67,29,0.82);padding:14px 16px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(255,255,255,0.7);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Step 02</p>
        <p style="font-size:13px;color:white;margin:0;font-weight:500;">Token Hard-coding</p>
        <p style="font-size:11px;color:rgba(255,255,255,0.7);margin:6px 0 0;line-height:1.5;">Traits encoded as locked instructions</p>
      </div>
      <div style="flex:1;background:rgba(235,67,29,0.64);padding:14px 16px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(255,255,255,0.7);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Step 03</p>
        <p style="font-size:13px;color:white;margin:0;font-weight:500;">Seed Management</p>
        <p style="font-size:11px;color:rgba(255,255,255,0.7);margin:6px 0 0;line-height:1.5;">Fixed seeds for structural stability</p>
      </div>
      <div style="flex:1;background:rgba(235,67,29,0.46);padding:14px 16px;border-radius:0 2px 2px 0;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(255,255,255,0.8);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Step 04</p>
        <p style="font-size:13px;color:white;margin:0;font-weight:500;">Stress Test</p>
        <p style="font-size:11px;color:rgba(255,255,255,0.8);margin:6px 0 0;line-height:1.5;">Extreme perspectives to verify token</p>
      </div>
    </div>

    <!-- Character proof -->
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 10px;text-transform:uppercase;">Same Identity Token \u2014 Max across 4 scenes</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:2px;margin-bottom:6px;">
      <div style="border-radius:2px;overflow:hidden;height:180px;background:#fff;"><img src="/images/ai-style/max-reference.webp" alt="Max reference" style="display:block;width:100%;height:100%;object-fit:contain;"></div>
      <div style="border-radius:2px;overflow:hidden;height:180px;"><img src="/images/ai-style/max-cafeteria.webp" alt="Max cafeteria" style="display:block;width:100%;height:100%;object-fit:cover;"></div>
      <div style="border-radius:2px;overflow:hidden;height:180px;"><img src="/images/ai-style/max-clay-art.webp" alt="Max art class" style="display:block;width:100%;height:100%;object-fit:cover;"></div>
      <div style="border-radius:2px;overflow:hidden;height:180px;"><img src="/images/ai-style/max-clay-spill.webp" alt="Max reaction" style="display:block;width:100%;height:100%;object-fit:cover;"></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:2px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#EB431D;margin:0;text-transform:uppercase;font-weight:600;">Reference Seed</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0;text-transform:uppercase;">Cafeteria</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0;text-transform:uppercase;">Art Class</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0;text-transform:uppercase;">Reaction</p>
    </div>
  </div>

  <!-- ==================== MODULE 02 \u2014 ENVIRONMENTAL DNA ==================== -->
  <div style="margin-bottom:56px;border-left:3px solid #1156D0;padding-left:24px;">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:white;background:#1156D0;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">02</span>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#1156D0;margin:0 0 2px;text-transform:uppercase;font-weight:600;">Environmental DNA & Visual Anchors</p>
        <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0;">Synthetic Environment Control</p>
      </div>
    </div>

    <p style="font-family:inherit;font-size:15px;color:#78716c;line-height:1.8;margin:0 0 20px;">
      We eliminated the need for manual compositing by developing a system of Visual Anchors. Instead of a physical library of props, we use a Prompt-based Material Registry. By hard-coding environmental variables \u2014 such as \u2018Matte Ceramic Texture\u2019 or \u2018Soft K-2 Classroom Lighting\u2019 \u2014 into the global architecture, the AI generates consistent objects and backgrounds directly within the scene.
    </p>

    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1156D0;background:rgba(17,86,208,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(17,86,208,0.12);letter-spacing:0.05em;">Material_Anchors</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1156D0;background:rgba(17,86,208,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(17,86,208,0.12);letter-spacing:0.05em;">Lighting_Presets</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1156D0;background:rgba(17,86,208,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(17,86,208,0.12);letter-spacing:0.05em;">Latent_Space_Consistency</span>
    </div>

    <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;margin-bottom:8px;">
      <img src="/images/ai-style/classroom-settings.png" alt="AI-generated classroom environment objects \u2014 furniture, windows, materials locked via environmental prompts" style="display:block;width:100%;height:auto;">
    </div>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0;text-transform:uppercase;">Environmental anchors \u2014 objects generated from prompt instructions, not assembled from a library</p>
  </div>

  <!-- ==================== MODULE 03 \u2014 SOURCE OF TRUTH ==================== -->
  <div style="margin-bottom:56px;border-left:3px solid #F3B013;padding-left:24px;">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:white;background:#F3B013;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">03</span>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#F3B013;margin:0 0 2px;text-transform:uppercase;font-weight:600;">The Source of Truth</p>
        <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0;">Master Prompt Architecture</p>
      </div>
    </div>

    <p style="font-family:inherit;font-size:15px;color:#78716c;line-height:1.8;margin:0 0 24px;">
      The Master Template is the single source of truth that enables 6 illustrators to produce unified results. Our architecture uses Global Style Variables \u2014 a fixed technical suffix appended to every prompt \u2014 to enforce brush weight, color temperature, and edge treatment automatically.
    </p>

    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#F3B013;background:rgba(243,176,19,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(243,176,19,0.12);letter-spacing:0.05em;">Global_Style_Variables</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#F3B013;background:rgba(243,176,19,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(243,176,19,0.12);letter-spacing:0.05em;">Modular_Prompting</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#F3B013;background:rgba(243,176,19,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(243,176,19,0.12);letter-spacing:0.05em;">Structural_Enforcement</span>
    </div>

    <!-- Prompt Architecture Diagram -->
    <div style="background:rgba(29,53,87,0.03);border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;margin-bottom:24px;">
      <div style="padding:10px 20px;border-bottom:1px solid rgba(0,0,0,0.06);background:rgba(0,0,0,0.02);">
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0;letter-spacing:0.08em;">prompt_architecture.config</p>
      </div>
      <div style="padding:20px;">
        <div style="display:flex;align-items:center;gap:4px;margin-bottom:16px;">
          <div style="background:#EB431D;padding:8px 16px;border-radius:2px;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:white;margin:0;font-weight:600;">[Subject]</p>
          </div>
          <span style="font-family:'JetBrains Mono',monospace;font-size:14px;color:#D9D9D9;">+</span>
          <div style="background:#1156D0;padding:8px 16px;border-radius:2px;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:white;margin:0;font-weight:600;">[Action]</p>
          </div>
          <span style="font-family:'JetBrains Mono',monospace;font-size:14px;color:#D9D9D9;">+</span>
          <div style="background:#F3B013;padding:8px 16px;border-radius:2px;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:white;margin:0;font-weight:600;">[Env Anchor]</p>
          </div>
          <span style="font-family:'JetBrains Mono',monospace;font-size:14px;color:#D9D9D9;">+</span>
          <div style="background:#1A824E;padding:8px 16px;border-radius:2px;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:white;margin:0;font-weight:600;">[Global Style Suffix]</p>
          </div>
        </div>
        <div style="border-top:1px solid rgba(0,0,0,0.06);padding-top:16px;">
          <div style="display:flex;gap:16px;">
            <div style="flex:1;">
              <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em;">Variable components</p>
              <p style="font-size:12px;color:#78716c;line-height:1.6;margin:0;">Subject, Action, and Environment change per scene. Written by individual illustrators.</p>
            </div>
            <div style="width:1px;background:#D9D9D9;flex-shrink:0;"></div>
            <div style="flex:1;">
              <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1A824E;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">Fixed component</p>
              <p style="font-size:12px;color:#78716c;line-height:1.6;margin:0;">The Global Style Suffix never changes. It enforces brush weight, color temperature, edge treatment, and texture rules automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;margin-bottom:8px;">
      <img src="/images/ai-style/gpt-workflow.webp" alt="GPT interface enforcing the Master Prompt Architecture" style="display:block;width:100%;height:auto;">
    </div>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0;text-transform:uppercase;">GPT interface \u2014 enforcing global style variables as the single source of truth</p>
  </div>

  <!-- ==================== MODULE 04 \u2014 TECHNICAL AUDIT ==================== -->
  <div style="margin-bottom:56px;border-left:3px solid #1A824E;padding-left:24px;">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:white;background:#1A824E;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">04</span>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#1A824E;margin:0 0 2px;text-transform:uppercase;font-weight:600;">Technical Audit Metrics</p>
        <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0;">Prompt Drift Detection</p>
      </div>
    </div>

    <p style="font-family:inherit;font-size:15px;color:#78716c;line-height:1.8;margin:0 0 20px;">
      Our audit process focuses on System Integrity. We don\u2019t check for \u201Ccompositing errors\u201D because there is no manual assembly. Instead, we monitor Prompt Drift \u2014 detecting if the AI has deviated from the established Visual DNA. If a character looks off, we recalibrate the instruction, ensuring the entire pipeline remains stable and scalable.
    </p>

    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1A824E;background:rgba(26,130,78,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(26,130,78,0.12);letter-spacing:0.05em;">Identity_Retention</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1A824E;background:rgba(26,130,78,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(26,130,78,0.12);letter-spacing:0.05em;">Pedagogical_Alignment</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1A824E;background:rgba(26,130,78,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(26,130,78,0.12);letter-spacing:0.05em;">Prompt_Drift_Check</span>
    </div>

    <!-- Audit Flow -->
    <div style="border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;margin-bottom:28px;">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;">
        <div style="padding:20px;border-right:1px solid #D9D9D9;">
          <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#1A824E;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Check 01</p>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 6px;">Identity Retention</p>
          <p style="font-size:12px;color:#78716c;line-height:1.6;margin:0;">Does the kid look the same? If the token drifted, recalibrate the instruction.</p>
        </div>
        <div style="padding:20px;border-right:1px solid #D9D9D9;">
          <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#1156D0;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Check 02</p>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 6px;">Pedagogical Alignment</p>
          <p style="font-size:12px;color:#78716c;line-height:1.6;margin:0;">Is the action clear? Actions must map to the decodable text.</p>
        </div>
        <div style="padding:20px;">
          <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#F3B013;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Check 03</p>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 6px;">Prompt Drift</p>
          <p style="font-size:12px;color:#78716c;line-height:1.6;margin:0;">Did the AI deviate from the Global Style Variables?</p>
        </div>
      </div>
      <div style="padding:14px 20px;background:rgba(26,130,78,0.04);border-top:1px solid #D9D9D9;display:flex;align-items:center;gap:10px;">
        <div style="width:3px;height:20px;background:#1A824E;border-radius:1px;flex-shrink:0;"></div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#1D3557;margin:0;font-weight:500;">Principle: Fix the instruction, not the output.</p>
      </div>
    </div>

    <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;margin-bottom:8px;">
      <img src="/images/ai-style/character-audit.webp" alt="Character audit \u2014 verifying identity tokens and detecting prompt drift" style="display:block;width:100%;height:auto;">
    </div>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0;text-transform:uppercase;">Audit matrix \u2014 detecting prompt drift across characters, scenes & environments</p>
  </div>

  <!-- ==================== SYSTEM METRICS ==================== -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-bottom:48px;">
    <div style="background:rgba(235,67,29,0.04);padding:24px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#EB431D;margin:0;">4</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#78716c;margin:6px 0 0;letter-spacing:0.08em;text-transform:uppercase;">Encoding Steps</p>
    </div>
    <div style="background:rgba(17,86,208,0.04);padding:24px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#1156D0;margin:0;">6</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#78716c;margin:6px 0 0;letter-spacing:0.08em;text-transform:uppercase;">Illustrators Aligned</p>
    </div>
    <div style="background:rgba(26,130,78,0.04);padding:24px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#1A824E;margin:0;">3</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#78716c;margin:6px 0 0;letter-spacing:0.08em;text-transform:uppercase;">Audit Checks</p>
    </div>
    <div style="background:rgba(243,176,19,0.04);padding:24px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#F3B013;margin:0;">0</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#78716c;margin:6px 0 0;letter-spacing:0.08em;text-transform:uppercase;">Manual Patches</p>
    </div>
  </div>

</div>`
  },
  {
    id: 'ai-production',
    title: 'Production Workflow',
    subtitle: 'STRUCTURED',
    description: 'A synchronized 10-step pipeline managing 72 books with the 70/30 human-AI rule, 6-illustrator scalability, and zero style drift.',
    fullDescription: '',
    content: [],
    tags: ['Pipeline Integration', 'Efficiency Metrics', 'Scalability'],
    customHtml: `<div style="width:100%;">

<!-- ==================== LEAD-IN ==================== -->
<div style="margin-bottom:56px;">
  <p style="font-family:inherit;font-size:22px;line-height:1.6;color:#1D3557;margin:0 0 16px;font-weight:400;">
    Systematic Production Cycle
  </p>
  <p style="font-family:inherit;font-size:16px;line-height:1.8;color:#78716c;margin:0;">
    To manage a 72-book series, we moved beyond individual creativity to a Synchronized Pipeline. This workflow ensures that whether it's Book 1 or Book 72, the quality remains indistinguishable.
  </p>
</div>

<!-- ==================== MODULE 01 ==================== -->
<div style="margin-bottom:64px;">
  <div style="border-top:4px solid #1156D0;padding-top:20px;margin-bottom:24px;">
    <div style="display:flex;align-items:baseline;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:700;color:#1156D0;line-height:1;">01</span>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#1156D0;margin:0 0 4px;text-transform:uppercase;font-weight:600;">The 10-Step Industrial Pipeline</p>
        <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0;">Systematic Production Cycle</p>
      </div>
    </div>
  </div>

  <!-- 10-Step Pipeline Grid: 2 columns x 5 rows -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;">
    <div style="padding:16px 20px;border-bottom:1px solid #D9D9D9;border-right:1px solid #D9D9D9;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#1156D0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">01</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Manuscript Analysis</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">Script & Keywords</p>
      </div>
    </div>
    <div style="padding:16px 20px;border-bottom:1px solid #D9D9D9;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#1156D0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">02</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">GPT Prompt Synthesis</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">Auto-generation</p>
      </div>
    </div>
    <div style="padding:16px 20px;border-bottom:1px solid #D9D9D9;border-right:1px solid #D9D9D9;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#1156D0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">03</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Asset Batching</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">Nanobanana Cloud</p>
      </div>
    </div>
    <div style="padding:16px 20px;border-bottom:1px solid #D9D9D9;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#EB431D;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">04</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Initial AI Rendering</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">70% Completion</p>
      </div>
    </div>
    <div style="padding:16px 20px;border-bottom:1px solid #D9D9D9;border-right:1px solid #D9D9D9;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#EB431D;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">05</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Pedagogical Review</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">Alignment Check</p>
      </div>
    </div>
    <div style="padding:16px 20px;border-bottom:1px solid #D9D9D9;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#EB431D;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">06</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Human Refinement</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">Textures & Edges</p>
      </div>
    </div>
    <div style="padding:16px 20px;border-bottom:1px solid #D9D9D9;border-right:1px solid #D9D9D9;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#EB431D;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">07</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Character Audit</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">Identity Consistency</p>
      </div>
    </div>
    <div style="padding:16px 20px;border-bottom:1px solid #D9D9D9;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#1A824E;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">08</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Layout Integration</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">InDesign Copy-Safe</p>
      </div>
    </div>
    <div style="padding:16px 20px;border-right:1px solid #D9D9D9;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#1A824E;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">09</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Final Proofing</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">Visual Logic</p>
      </div>
    </div>
    <div style="padding:16px 20px;display:flex;align-items:center;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:white;background:#1A824E;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">10</span>
      <div>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Export & Delivery</p>
        <p style="font-size:11px;color:#78716c;margin:2px 0 0;">Print-Ready Assets</p>
      </div>
    </div>
  </div>

  <!-- Phase Legend -->
  <div style="display:flex;gap:20px;margin-top:12px;">
    <div style="display:flex;align-items:center;gap:6px;">
      <div style="width:10px;height:10px;background:#1156D0;border-radius:1px;"></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#78716c;margin:0;letter-spacing:0.06em;text-transform:uppercase;">01-03 Foundation</p>
    </div>
    <div style="display:flex;align-items:center;gap:6px;">
      <div style="width:10px;height:10px;background:#EB431D;border-radius:1px;"></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#78716c;margin:0;letter-spacing:0.06em;text-transform:uppercase;">04-07 Quality Control</p>
    </div>
    <div style="display:flex;align-items:center;gap:6px;">
      <div style="width:10px;height:10px;background:#1A824E;border-radius:1px;"></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#78716c;margin:0;letter-spacing:0.06em;text-transform:uppercase;">08-10 Integration</p>
    </div>
  </div>
</div>

<!-- ==================== MODULE 02 ==================== -->
<div style="margin-bottom:64px;">
  <div style="border-top:4px solid #EB431D;padding-top:20px;margin-bottom:24px;">
    <div style="display:flex;align-items:baseline;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:700;color:#EB431D;line-height:1;">02</span>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#EB431D;margin:0 0 4px;text-transform:uppercase;font-weight:600;">Human-AI Collaboration Ratio</p>
        <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0;">Efficiency Metrics: 70/30 Rule</p>
      </div>
    </div>
  </div>

  <!-- 70/30 Split Bar -->
  <div style="display:flex;height:48px;border-radius:2px;overflow:hidden;margin-bottom:20px;">
    <div style="width:70%;background:#1156D0;display:flex;align-items:center;padding:0 20px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:white;margin:0;">AI 70%</p>
    </div>
    <div style="width:30%;background:#EB431D;display:flex;align-items:center;padding:0 16px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:white;margin:0;">Human 30%</p>
    </div>
  </div>

  <!-- Breakdown -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px;">
    <div style="padding:20px;background:rgba(17,86,208,0.04);border-radius:2px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#1156D0;margin:0 0 10px;text-transform:uppercase;font-weight:600;">AI Handles</p>
      <p style="font-size:13px;color:#78716c;line-height:1.7;margin:0;">Lighting, base coloring, perspective, and initial composition.</p>
    </div>
    <div style="padding:20px;background:rgba(235,67,29,0.04);border-radius:2px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#EB431D;margin:0 0 10px;text-transform:uppercase;font-weight:600;">Human Focuses On</p>
      <p style="font-size:13px;color:#78716c;line-height:1.7;margin:0;">High-value tasks: emotional expression, pedagogical accuracy, and artistic texture.</p>
    </div>
  </div>

  <!-- Stats -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
    <div style="border:1px solid #D9D9D9;border-radius:2px;padding:24px;text-align:center;">
      <p style="font-size:36px;font-weight:700;color:#1156D0;margin:0;">65%</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#78716c;margin:8px 0 0;letter-spacing:0.08em;text-transform:uppercase;">Time Saved Per Book</p>
      <p style="font-size:12px;color:#a8a29e;margin:4px 0 0;">vs. traditional methods</p>
    </div>
    <div style="border:1px solid #D9D9D9;border-radius:2px;padding:24px;text-align:center;">
      <p style="font-size:36px;font-weight:700;color:#1A824E;margin:0;">98%</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#78716c;margin:8px 0 0;letter-spacing:0.08em;text-transform:uppercase;">Consistency Rate</p>
      <p style="font-size:12px;color:#a8a29e;margin:4px 0 0;">initial character audit pass</p>
    </div>
  </div>
</div>

<!-- ==================== MODULE 03 ==================== -->
<div style="margin-bottom:64px;">
  <div style="border-top:4px solid #F3B013;padding-top:20px;margin-bottom:24px;">
    <div style="display:flex;align-items:baseline;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:700;color:#F3B013;line-height:1;">03</span>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#F3B013;margin:0 0 4px;text-transform:uppercase;font-weight:600;">Scalability & Team Management</p>
        <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0;">Managing 6 Illustrators at Scale</p>
      </div>
    </div>
  </div>

  <p style="font-family:inherit;font-size:15px;color:#78716c;line-height:1.8;margin:0 0 24px;">
    The system acts as a "Central Brain". Instead of 6 illustrators drawing in 6 different styles, they act as Refinement Experts within a unified AI-driven framework.
  </p>

  <!-- Advantages -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
    <div style="border:1px solid #D9D9D9;border-radius:2px;padding:24px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#F3B013;margin:0 0 10px;text-transform:uppercase;font-weight:600;">Onboarding Speed</p>
      <p style="font-size:28px;font-weight:700;color:#1D3557;margin:0 0 6px;">48 hrs</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">New illustrators match the series style using Prompt Architecture.</p>
    </div>
    <div style="border:1px solid #D9D9D9;border-radius:2px;padding:24px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#F3B013;margin:0 0 10px;text-transform:uppercase;font-weight:600;">Parallel Production</p>
      <p style="font-size:28px;font-weight:700;color:#1D3557;margin:0 0 6px;">12 books</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Simultaneous development per production cycle.</p>
    </div>
  </div>
</div>

<!-- ==================== MODULE 04 ==================== -->
<div style="margin-bottom:48px;">
  <div style="border-top:4px solid #1A824E;padding-top:20px;margin-bottom:24px;">
    <div style="display:flex;align-items:baseline;gap:12px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:700;color:#1A824E;line-height:1;">04</span>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#1A824E;margin:0 0 4px;text-transform:uppercase;font-weight:600;">Quality Control & Error Handling</p>
        <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0;">The "Kill-Switch" for AI Noise</p>
      </div>
    </div>
  </div>

  <p style="font-family:inherit;font-size:15px;color:#78716c;line-height:1.8;margin:0 0 24px;">
    Production isn't just about speed; it's about Stability. Our workflow includes a "Style Drift" check every 5 books to ensure the AI doesn't evolve away from the established pedagogical standards.
  </p>

  <!-- QC Process -->
  <div style="border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;">
    <div style="display:flex;">
      <div style="flex:1;padding:20px;border-right:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#1A824E;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Every 5 Books</p>
        <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 4px;">Style Drift Check</p>
        <p style="font-size:12px;color:#78716c;line-height:1.6;margin:0;">Compare current output against locked Visual DNA parameters.</p>
      </div>
      <div style="flex:1;padding:20px;border-right:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#EB431D;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">If Drift Detected</p>
        <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 4px;">Recalibrate Prompt</p>
        <p style="font-size:12px;color:#78716c;line-height:1.6;margin:0;">Adjust instruction tokens, not the output. Fix the source.</p>
      </div>
      <div style="flex:1;padding:20px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#1156D0;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Result</p>
        <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 4px;">Pipeline Stable</p>
        <p style="font-size:12px;color:#78716c;line-height:1.6;margin:0;">72 books, zero cumulative visual deviation.</p>
      </div>
    </div>
    <div style="padding:14px 20px;background:rgba(26,130,78,0.04);border-top:1px solid #D9D9D9;display:flex;align-items:center;gap:10px;">
      <div style="width:3px;height:20px;background:#1A824E;border-radius:1px;flex-shrink:0;"></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#1D3557;margin:0;font-weight:500;">Principle: Fix the instruction, not the output.</p>
    </div>
  </div>
</div>

</div>`
  },
  {
    id: 'ai-orchestrated',
    title: 'AI-Orchestrated\nSystems',
    subtitle: 'ORCHESTRATED',
    description: 'This website itself is part of the work: an agent-based pipeline for rapid iteration, reliable deployment, and measurable performance gains.',
    fullDescription: '',
    content: [],
    tags: ['Generative UI', 'Agent Workflow', 'React/Tailwind'],
    customHtml: `<div style="width:100%;">

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;margin-bottom:32px;backdrop-filter:blur(4px);">
    <p style="font-size:20px;font-weight:500;line-height:1.55;color:#1D3557;margin:0 0 16px;">
      Built as a modular, AI-driven web system.
    </p>
    <p style="font-family:inherit;font-size:18px;line-height:1.75;color:#57534e;margin:0 0 12px;">
      This project documents how I built, deployed, and optimized yuqilu.com through generative tools, structured prompts, and a controlled deployment pipeline — without writing code manually.
    </p>
    <p style="font-family:inherit;font-size:18px;line-height:1.75;color:#57534e;margin:0;">
      The process shifts the role of the designer from pixel-pusher to system director — defining rules, aesthetic constraints, and interaction models that the AI executes.
    </p>
  </div>

  <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;margin-bottom:8px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
    <img src="/images/ai-orchestrated/site-after.webp" alt="yuqilu.com homepage" style="display:block;width:100%;height:auto;">
  </div>
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 40px;text-transform:uppercase;">yuqilu.com — live site</p>

  <div style="background:rgba(17,86,208,0.05);border:1px solid #D9D9D9;padding:24px;border-radius:2px;margin-bottom:48px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;font-weight:700;margin:0 0 16px;text-transform:uppercase;">Tech Stack</p>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;">
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Architect</p>
        <p style="font-size:15px;font-weight:600;color:#1D3557;margin:0;">ChatGPT</p>
      </div>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Generator</p>
        <p style="font-size:15px;font-weight:600;color:#1D3557;margin:0;">AI Studio</p>
      </div>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Operations</p>
        <p style="font-size:15px;font-weight:600;color:#1D3557;margin:0;">Claude</p>
      </div>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Version</p>
        <p style="font-size:15px;font-weight:600;color:#1D3557;margin:0;">GitHub</p>
      </div>
      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Deploy</p>
        <p style="font-size:15px;font-weight:600;color:#1D3557;margin:0;">GitHub Pages</p>
      </div>
    </div>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;">System Architecture</p>
  <p style="font-family:inherit;font-size:16px;color:#78716c;margin:0 0 24px;">Prompt → Generate → Version → Deploy → Domain</p>

  <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;margin-bottom:8px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
    <img src="/images/ai-orchestrated/aistudio-interface.webp" alt="AI Studio interface" style="display:block;width:100%;height:auto;">
  </div>
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">AI Studio — prompt input (left) + live preview (right)</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:48px;">
    <div>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <img src="/images/ai-orchestrated/github-repo.webp" alt="GitHub repository" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:8px 0 0;text-transform:uppercase;">GitHub — source control</p>
    </div>
    <div>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <img src="/images/ai-orchestrated/netlify-deploy.webp" alt="Netlify deployment" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:8px 0 0;text-transform:uppercase;">GitHub Pages — auto deploy + AI agent</p>
    </div>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">System Modules</p>
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;margin-bottom:48px;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.1);">
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">Module</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">Tool</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">Role</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">Output</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1D3557;">Information Architecture</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">ChatGPT</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Define navigation and content logic</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Portfolio-ready sitemap</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1D3557;">Generative UI</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">AI Studio</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Constrain visual system, motion, layout</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Template-free custom frontend</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1D3557;">Version Control</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">GitHub</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Manage repository and structured updates</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Controlled iteration</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1D3557;">Deployment</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">GitHub Pages</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Auto build and domain binding</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Continuous delivery</td>
        </tr>
        <tr>
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1D3557;">Asset Management</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">GitHub repo</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Organize brand and visual assets</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Maintainable structure</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Evolution</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:0;">
    <div style="padding:28px;border:1px solid #D9D9D9;border-radius:2px 0 0 0;background:rgba(0,0,0,0.02);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#c0392b;margin:0 0 20px;text-transform:uppercase;font-weight:600;">Before</p>
      <div style="margin-bottom:16px;">
        <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 2px;">Template site builder</p>
        <p style="font-size:13px;color:#a8a29e;margin:0;">Rigid structure, limited expression</p>
      </div>
      <div style="margin-bottom:16px;">
        <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 2px;">Monthly subscription</p>
        <p style="font-size:13px;color:#a8a29e;margin:0;">Recurring cost for basic hosting</p>
      </div>
      <div style="margin-bottom:16px;">
        <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 2px;">Limited customization</p>
        <p style="font-size:13px;color:#a8a29e;margin:0;">Constrained by platform capabilities</p>
      </div>
      <div>
        <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 2px;">Manual content updates</p>
        <p style="font-size:13px;color:#a8a29e;margin:0;">Slow iteration, no version history</p>
      </div>
    </div>
    <div style="padding:28px;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 0 0;background:rgba(255,255,255,0.3);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 20px;text-transform:uppercase;font-weight:600;">After</p>
      <div style="margin-bottom:16px;">
        <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 2px;">AI-orchestrated modular system</p>
        <p style="font-size:13px;color:#a8a29e;margin:0;">Full design control through agent workflow</p>
      </div>
      <div style="margin-bottom:16px;">
        <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 2px;">Zero hosting cost</p>
        <p style="font-size:13px;color:#a8a29e;margin:0;">Free tier + professional infrastructure</p>
      </div>
      <div style="margin-bottom:16px;">
        <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 2px;">Custom frontend architecture</p>
        <p style="font-size:13px;color:#a8a29e;margin:0;">React + Vite + Framer Motion</p>
      </div>
      <div>
        <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 2px;">Continuous deployment pipeline</p>
        <p style="font-size:13px;color:#a8a29e;margin:0;">Push to deploy, instant updates</p>
      </div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:48px;">
    <div style="padding:16px;border:1px solid #D9D9D9;border-top:none;border-radius:0 0 0 2px;background:rgba(0,0,0,0.02);">
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;">
        <img src="/images/ai-orchestrated/wix-before.webp" alt="Old Wix website" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:8px 0 0;text-transform:uppercase;">Wix template — previous version</p>
    </div>
    <div style="padding:16px;border:1px solid #D9D9D9;border-top:none;border-left:none;border-radius:0 0 2px 0;background:rgba(255,255,255,0.3);">
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;">
        <img src="/images/ai-orchestrated/site-after.webp" alt="New website" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:8px 0 0;text-transform:uppercase;">yuqilu.com — AI-orchestrated version</p>
    </div>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Optimization</p>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#1A824E;margin:0;">60%</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Image size reduction</p>
      <p style="font-size:11px;color:#a8a29e;margin:2px 0 0;">JPG → WebP compression</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#1156D0;margin:0;">92%</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">CSS size reduction</p>
      <p style="font-size:11px;color:#a8a29e;margin:2px 0 0;">300KB CDN → 25KB compiled</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#c0392b;margin:0;">$0</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Monthly hosting cost</p>
      <p style="font-size:11px;color:#a8a29e;margin:2px 0 0;">Wix subscription → GitHub Pages free</p>
    </div>
  </div>

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:24px;border-radius:2px;margin-bottom:16px;display:flex;align-items:center;gap:24px;">
    <div style="flex-shrink:0;">
      <img src="/images/ai-orchestrated/lighthouse.webp" alt="Lighthouse scores" style="display:block;max-width:380px;border-radius:2px;">
    </div>
    <div>
      <p style="font-size:15px;font-weight:600;color:#1D3557;margin:0 0 8px;">Lighthouse Report</p>
      <p style="font-size:13px;color:#78716c;line-height:1.7;margin:0;">
        Performance <strong style="color:#1D3557;">94</strong> · Accessibility <strong style="color:#1D3557;">87</strong> · Best Practices <strong style="color:#1D3557;">96</strong> · SEO <strong style="color:#1D3557;">100</strong><br>
        All core metrics reach excellent levels after optimization.
      </p>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:48px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;">Open Graph Preview</p>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;">
        <img src="/images/ai-orchestrated/og-preview.webp" alt="Open Graph card" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-size:12px;color:#a8a29e;margin:10px 0 0;line-height:1.6;">Social share card with title, description, and thumbnail.</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;">Favicon</p>
      <div style="margin:12px 0;">
        <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;display:inline-block;">
          <img src="/images/ai-orchestrated/favicon-bar.webp" alt="Favicon in browser" style="display:block;max-width:260px;height:auto;">
        </div>
      </div>
      <p style="font-size:12px;color:#a8a29e;margin:10px 0 0;line-height:1.6;">Custom icon in browser tabs and bookmarks.</p>
    </div>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Outcome</p>
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;margin-bottom:16px;">
    <p style="font-size:18px;line-height:1.65;color:#1D3557;margin:0 0 8px;">
      This project reframes frontend development as system orchestration.
    </p>
    <p style="font-family:inherit;font-size:16px;line-height:1.7;color:#78716c;margin:0;">
      The output is not just a website — it's a reusable production model:
    </p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:24px;font-weight:700;color:#1D3557;margin:0 0 4px;">01</p>
      <p style="font-size:13px;font-weight:500;color:#1D3557;margin:0;">Maintainable</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:24px;font-weight:700;color:#1D3557;margin:0 0 4px;">02</p>
      <p style="font-size:13px;font-weight:500;color:#1D3557;margin:0;">Scalable</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:24px;font-weight:700;color:#1D3557;margin:0 0 4px;">03</p>
      <p style="font-size:13px;font-weight:500;color:#1D3557;margin:0;">Low Cost</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:24px;font-weight:700;color:#1D3557;margin:0 0 4px;">04</p>
      <p style="font-size:13px;font-weight:500;color:#1D3557;margin:0;">Fast Iteration</p>
    </div>
  </div>

</div>`
  },
  {
    id: 'ai-app-gallery',
    title: 'AI Studio\nApp Gallery',
    subtitle: 'INTERNAL TOOLING',
    description: 'If the right tool doesn\'t exist, I build it.',
    fullDescription: ' ',
    content: [],
    tags: ['AI Studio', 'Gemini API', 'React', 'Internal Tools'],
    customHtml: `<div style="width:100%;">

<style>
  .app-tab-radio { display:none; }
  .app-panel-1, .app-panel-2, .app-panel-3 { display:none; }
  #appTab1:checked ~ .app-tab-panels .app-panel-1 { display:block; }
  #appTab2:checked ~ .app-tab-panels .app-panel-2 { display:block; }
  #appTab3:checked ~ .app-tab-panels .app-panel-3 { display:block; }
  .app-gallery-img { cursor:pointer;transition:opacity 0.2s; }
  .app-gallery-img:hover { opacity:0.85; }
  .app-lightbox { display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;align-items:center;justify-content:center;cursor:pointer; }
  .app-lightbox:target { display:flex; }
  .app-lightbox img { max-width:90vw;max-height:90vh;object-fit:contain;border-radius:2px; }
  .app-lightbox-close { position:fixed;top:20px;right:24px;font-size:24px;color:white;text-decoration:none;font-family:'JetBrains Mono',monospace;z-index:10000; }
  .app-tab-label { cursor:pointer;flex:1;padding:14px 20px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;color:#78716c;background:rgba(0,0,0,0.03);border:1px solid #D9D9D9;border-radius:2px;transition:all 0.3s;text-align:center; }
  .app-tab-label:hover { color:#1D3557;background:rgba(0,0,0,0.06); }
  #appTab1:checked ~ .app-tab-bar .app-label-1 { color:white;background:#EB431D;border-color:#EB431D; }
  #appTab2:checked ~ .app-tab-bar .app-label-2 { color:white;background:#1156D0;border-color:#1156D0; }
  #appTab3:checked ~ .app-tab-bar .app-label-3 { color:white;background:#1A824E;border-color:#1A824E; }
</style>

<!-- THE MINDSET -->
<div style="margin-bottom:40px;">
  <p style="font-size:22px;font-weight:600;color:#1D3557;margin:0 0 16px;line-height:1.4;">
    "If the shoe doesn't fit, I make my own."
  </p>
  <p style="font-size:14px;color:#57534e;line-height:1.85;margin:0;">
    Every app here was born from a real obstacle I hit in work or life. Instead of waiting for existing software to catch up, I'd rather grab raw materials like Gemini API and assemble exactly the productivity I need. This shift from "user" to "creator" has been my biggest takeaway from the AI era.
  </p>
</div>

<!-- TAB SYSTEM (CSS-only) -->
<input type="radio" name="appTabs" id="appTab1" class="app-tab-radio" checked>
<input type="radio" name="appTabs" id="appTab2" class="app-tab-radio">
<input type="radio" name="appTabs" id="appTab3" class="app-tab-radio">

<!-- TAB BAR -->
<div class="app-tab-bar" style="display:flex;gap:12px;margin-bottom:32px;">
  <label for="appTab1" class="app-tab-label app-label-1">01 Texture_Lab</label>
  <label for="appTab2" class="app-tab-label app-label-2">02 IP_Engine</label>
  <label for="appTab3" class="app-tab-label app-label-3">03 Video_Deco</label>
</div>

<!-- TAB PANELS -->
<div class="app-tab-panels">

  <!-- ==================== TAB 1: TEXTURE_LAB ==================== -->
  <div class="app-panel-1">

    <div style="display:flex;gap:0;margin-bottom:24px;">
      <div style="width:56px;flex-shrink:0;background:#EB431D;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">01</span>
      </div>
      <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);">
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Texture Lab — Illustration Texture Converter</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;font-size:13px;line-height:1.7;color:#57534e;">
          <div style="padding-right:16px;border-right:1px solid #e7e5e4;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#c0392b;margin:0 0 6px;text-transform:uppercase;font-weight:600;">The Itch</p>
            <p style="margin:0;">AI-generated images always have that unmistakable "plastic" smoothness you can't unsee.</p>
          </div>
          <div style="padding:0 16px;border-right:1px solid #e7e5e4;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#EB431D;margin:0 0 6px;text-transform:uppercase;font-weight:600;">The Fix</p>
            <p style="margin:0;">I taught it to read edges. Instead of scattering noise across the whole image, it adds rough brush strokes precisely where objects meet backgrounds.</p>
          </div>
          <div style="padding-left:16px;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#1A824E;margin:0 0 6px;text-transform:uppercase;font-weight:600;">The Outcome</p>
            <p style="margin:0;">That hand-drawn warmth helped us preserve the illustration soul across all 72 children's books.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- App Interface -->
    <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;margin-bottom:8px;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
      <img src="/images/ai-app-gallery/texture-lab-ui.jpg" alt="Texture Lab interface — Upload, Artistic Settings, Art Canvas with comparison slider" style="display:block;width:100%;height:auto;">
    </div>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 32px;text-transform:uppercase;">Texture Lab UI — brush roughness, edge interlock, stroke density & paper grain controls</p>

    <!-- Before / After Comparison -->
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 12px;text-transform:uppercase;font-weight:600;">Output Comparison — Same Input, Two Styles</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;margin-bottom:8px;">
      <div style="border:1px solid #D9D9D9;border-radius:2px 0 0 2px;overflow:hidden;">
        <div style="padding:10px 16px;background:rgba(192,57,43,0.06);border-bottom:1px solid #D9D9D9;">
          <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#c0392b;margin:0;text-transform:uppercase;font-weight:600;">Original — AI Generated</p>
        </div>
        <div style="padding:0;"><img src="/images/ai-app-gallery/texture-lab-original.jpg" alt="Original AI-generated illustration" style="display:block;width:100%;height:auto;"></div>
      </div>
      <div style="border:1px solid #D9D9D9;border-left:none;overflow:hidden;">
        <div style="padding:10px 16px;background:rgba(235,67,29,0.06);border-bottom:1px solid #D9D9D9;">
          <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#EB431D;margin:0;text-transform:uppercase;font-weight:600;">Style A — Oil Texture</p>
        </div>
        <div style="padding:0;"><img src="/images/ai-app-gallery/texture-lab-oil.jpg" alt="Oil painting texture output" style="display:block;width:100%;height:auto;"></div>
      </div>
      <div style="border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;overflow:hidden;">
        <div style="padding:10px 16px;background:rgba(26,130,78,0.06);border-bottom:1px solid #D9D9D9;">
          <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#1A824E;margin:0;text-transform:uppercase;font-weight:600;">Style B — Dry Brush</p>
        </div>
        <div style="padding:0;"><img src="/images/ai-app-gallery/texture-lab-subtle.jpg" alt="Subtle dry brush texture output" style="display:block;width:100%;height:auto;"></div>
      </div>
    </div>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 32px;text-transform:uppercase;">Same character — AI smoothness eliminated through edge-aware texture injection</p>

  </div>

  <!-- ==================== TAB 2: IP_ENGINE ==================== -->
  <div class="app-panel-2">

    <div style="display:flex;gap:0;margin-bottom:24px;">
      <div style="width:56px;flex-shrink:0;background:#1156D0;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">02</span>
      </div>
      <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);">
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:600;">IP Engine — 3D Asset Inflation Engine</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;font-size:13px;line-height:1.7;color:#57534e;">
          <div style="padding-right:16px;border-right:1px solid #e7e5e4;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#c0392b;margin:0 0 6px;text-transform:uppercase;font-weight:600;">The Itch</p>
            <p style="margin:0;">Tired of the mindless grind from flat art to 3D to mockup rendering.</p>
          </div>
          <div style="padding:0 16px;border-right:1px solid #e7e5e4;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#1156D0;margin:0 0 6px;text-transform:uppercase;font-weight:600;">The Fix</p>
            <p style="margin:0;">Give it one image. It inflates the character into 3D, generates tri-view sheets, and composites a full set of poster mockups.</p>
          </div>
          <div style="padding-left:16px;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#1A824E;margin:0 0 6px;text-transform:uppercase;font-weight:600;">The Outcome</p>
            <p style="margin:0;">One person, one afternoon — that's all it takes to build what used to require a team and a full week.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Case Studies: 2D → Full 3D Kit -->
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 12px;text-transform:uppercase;font-weight:600;">Case Studies — 2D Reference → Full 3D Asset Kit</p>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:32px;">
      <a href="#lb-ip-elephant" class="app-gallery-img" style="display:block;border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;">
        <img src="/images/ai-app-gallery/ip-combined-elephant.jpg" alt="Elephant — 2D reference to full 3D asset kit" style="display:block;width:100%;height:auto;">
      </a>
      <a href="#lb-ip-star" class="app-gallery-img" style="display:block;border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;">
        <img src="/images/ai-app-gallery/ip-combined-star.jpg" alt="Star character — 2D reference to full 3D asset kit" style="display:block;width:100%;height:auto;">
      </a>
      <a href="#lb-ip-boy" class="app-gallery-img" style="display:block;border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;">
        <img src="/images/ai-app-gallery/ip-combined-boy.jpg" alt="Boy character — 2D reference to full 3D asset kit" style="display:block;width:100%;height:auto;">
      </a>
    </div>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 32px;text-transform:uppercase;">Click any image to view full resolution</p>

    <!-- Metrics -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
      <div style="background:rgba(17,86,208,0.04);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
        <p style="font-size:32px;font-weight:700;color:#1156D0;margin:0;">1</p>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#78716c;margin:6px 0 0;letter-spacing:0.08em;text-transform:uppercase;">Input Image</p>
      </div>
      <div style="background:rgba(17,86,208,0.04);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
        <p style="font-size:32px;font-weight:700;color:#1156D0;margin:0;">6-7</p>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#78716c;margin:6px 0 0;letter-spacing:0.08em;text-transform:uppercase;">Action Poses</p>
      </div>
      <div style="background:rgba(26,130,78,0.04);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
        <p style="font-size:32px;font-weight:700;color:#1A824E;margin:0;">Min</p>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#78716c;margin:6px 0 0;letter-spacing:0.08em;text-transform:uppercase;">vs. Days/Weeks</p>
      </div>
    </div>

  </div>

  <!-- LIGHTBOXES -->
  <div id="lb-ip-elephant" class="app-lightbox" onclick="window.location.hash=''"><a href="#" class="app-lightbox-close">&times;</a><img src="/images/ai-app-gallery/ip-combined-elephant.jpg" alt="Elephant full kit"></div>
  <div id="lb-ip-star" class="app-lightbox" onclick="window.location.hash=''"><a href="#" class="app-lightbox-close">&times;</a><img src="/images/ai-app-gallery/ip-combined-star.jpg" alt="Star character full kit"></div>
  <div id="lb-ip-boy" class="app-lightbox" onclick="window.location.hash=''"><a href="#" class="app-lightbox-close">&times;</a><img src="/images/ai-app-gallery/ip-combined-boy.jpg" alt="Boy character full kit"></div>
  <div id="lb-storyboard" class="app-lightbox" onclick="window.location.hash=''"><a href="#" class="app-lightbox-close">&times;</a><img src="/images/ai-app-gallery/video-deco-storyboard.jpg" alt="Storyboard analysis full"></div>

  <!-- ==================== TAB 3: VIDEO_DECO ==================== -->
  <div class="app-panel-3">

    <div style="display:flex;gap:0;margin-bottom:24px;">
      <div style="width:56px;flex-shrink:0;background:#1A824E;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">03</span>
      </div>
      <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);">
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Video Deco — Video Reverse Engineering</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;font-size:13px;line-height:1.7;color:#57534e;">
          <div style="padding-right:16px;border-right:1px solid #e7e5e4;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#c0392b;margin:0 0 6px;text-transform:uppercase;font-weight:600;">The Itch</p>
            <p style="margin:0;">Great videos are easy to admire but impossible to reverse-engineer into actionable production notes.</p>
          </div>
          <div style="padding:0 16px;border-right:1px solid #e7e5e4;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#1A824E;margin:0 0 6px;text-transform:uppercase;font-weight:600;">The Fix</p>
            <p style="margin:0;">It dissects videos like surgery — auto-extracting storyboards, analyzing camera language, and reverse-engineering the matching prompts.</p>
          </div>
          <div style="padding-left:16px;">
            <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.12em;color:#1A824E;margin:0 0 6px;text-transform:uppercase;font-weight:600;">The Outcome</p>
            <p style="margin:0;">Turns gut-level "I like this" into a rational playbook — giving our future video work a solid logical foundation.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Source Video & Storyboard Output -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">
      <div style="border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;">
        <div style="padding:10px 16px;background:rgba(26,130,78,0.06);border-bottom:1px solid #D9D9D9;">
          <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#1A824E;margin:0;text-transform:uppercase;font-weight:600;">Input — Source Video</p>
        </div>
        <video controls playsinline style="display:block;width:100%;height:auto;background:#000;">
          <source src="/images/ai-app-gallery/video-deco-source.mp4" type="video/mp4">
        </video>
      </div>
      <div style="border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;">
        <div style="padding:10px 16px;background:rgba(26,130,78,0.06);border-bottom:1px solid #D9D9D9;">
          <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#1A824E;margin:0;text-transform:uppercase;font-weight:600;">Output — Storyboard Analysis</p>
        </div>
        <a href="#lb-storyboard" class="app-gallery-img"><img src="/images/ai-app-gallery/video-deco-storyboard.jpg" alt="Video Deco storyboard output" style="display:block;width:100%;height:auto;"></a>
      </div>
    </div>

    <!-- Output Modules -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;margin-bottom:24px;">
      <div style="background:rgba(26,130,78,0.04);border:1px solid #D9D9D9;padding:14px;border-radius:2px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#1A824E;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">01</p>
        <p style="font-size:12px;font-weight:600;color:#1D3557;margin:0;">Storyboard Script</p>
      </div>
      <div style="background:rgba(26,130,78,0.04);border:1px solid #D9D9D9;padding:14px;border-radius:2px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#1A824E;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">02</p>
        <p style="font-size:12px;font-weight:600;color:#1D3557;margin:0;">Keyframe Extraction</p>
      </div>
      <div style="background:rgba(26,130,78,0.04);border:1px solid #D9D9D9;padding:14px;border-radius:2px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#1A824E;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">03</p>
        <p style="font-size:12px;font-weight:600;color:#1D3557;margin:0;">Camera Analysis</p>
      </div>
      <div style="background:rgba(26,130,78,0.04);border:1px solid #D9D9D9;padding:14px;border-radius:2px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#1A824E;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">04</p>
        <p style="font-size:12px;font-weight:600;color:#1D3557;margin:0;">Replication Prompt</p>
      </div>
    </div>

    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1A824E;background:rgba(26,130,78,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(26,130,78,0.12);letter-spacing:0.05em;">Gemini_API</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1A824E;background:rgba(26,130,78,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(26,130,78,0.12);letter-spacing:0.05em;">Video_Analysis</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1A824E;background:rgba(26,130,78,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(26,130,78,0.12);letter-spacing:0.05em;">Reverse_Engineering</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#1A824E;background:rgba(26,130,78,0.06);padding:5px 12px;border-radius:2px;border:1px solid rgba(26,130,78,0.12);letter-spacing:0.05em;">Prompt_Generation</span>
    </div>

  </div>

</div>

<!-- THE GROWING TOOLBOX -->
<div style="margin-top:48px;padding:28px;border:1px solid #D9D9D9;border-radius:2px;background:rgba(255,255,255,0.4);">
  <p style="font-size:16px;font-weight:600;color:#1D3557;margin:0 0 12px;">And much more...</p>
  <p style="font-size:14px;color:#57534e;line-height:1.8;margin:0;">
    This is just the tip of the iceberg. My AI Studio library holds 10+ custom apps for different scenarios — stick figure motion analysis, market trend scanning, automated batch renaming, and more. For me, AI isn't just a paintbrush. It's a machine that builds machines.
  </p>
</div>

</div>`
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'work-illustration',
    title: 'ILLUSTRATION SYSTEMS',
    category: 'Alphabet / Numeric / Characters / Zodiac / Icons',
    year: '2024',
    role: 'SYSTEM ARCHITECT',
    client: 'STATUS: SELF-INITIATED RESEARCH',
    description: 'Systematic explorations in modular geometry and visual logic.',
    content: [
      "A series of rule-based experiments defining new visual systems.",
      "This section demonstrates the construction of visual languages through rigorous grid adherence and modular repetition."
    ],
    modules: [
        {
          id: 'alphabet',
          title: 'ALPHABET_SYS',
          tagline: '[REVISIT & EVOLVE]',
          description: 'A series of character studies based on original hand-drawn illustrations. Every brushstroke and texture is manually crafted, then integrated into a standardized 24-unit icon grid. While AI is utilized solely to assist with motion dynamics, the core visual DNA remains 100% human-led.',
          tags: ['TYPOGRAPHY', 'GRID', 'SYSTEM'],
          image: 'https://picsum.photos/seed/sys_alpha/600/400',
          specs: [
            { label: 'Medium', value: '100% Original Hand-drawn Illustration' },
            { label: 'Motion', value: 'AI-Augmented Fluidity' },
            { label: 'Framework', value: '24-unit Icon Matrix' }
          ],
          localImages: [
            '/images/alphabet/a.jpg', '/images/alphabet/b.jpg', '/images/alphabet/c.jpg', '/images/alphabet/d.jpg',
            '/images/alphabet/e.jpg', '/images/alphabet/f.jpg', '/images/alphabet/g.jpg', '/images/alphabet/h.jpg',
            '/images/alphabet/i.jpg', '/images/alphabet/j.jpg', '/images/alphabet/k.jpg', '/images/alphabet/l.jpg',
            '/images/alphabet/m.jpg', '/images/alphabet/n.jpg', '/images/alphabet/o.jpg', '/images/alphabet/p.jpg',
            '/images/alphabet/q.jpg', '/images/alphabet/r.jpg', '/images/alphabet/s.jpg', '/images/alphabet/t.jpg',
            '/images/alphabet/u.jpg', '/images/alphabet/v.jpg', '/images/alphabet/w.jpg', '/images/alphabet/x.jpg',
            '/images/alphabet/y.jpg', '/images/alphabet/z.jpg'
          ],
          localVideos: [
            '/images/alphabet/a.mp4', '/images/alphabet/b.mp4', '/images/alphabet/c.mp4', '/images/alphabet/d.mp4',
            '/images/alphabet/e.mp4', '/images/alphabet/f.mp4', '/images/alphabet/g.mp4', '/images/alphabet/h.mp4',
            '/images/alphabet/i.mp4', '/images/alphabet/j.mp4', '/images/alphabet/k.mp4', '/images/alphabet/l.mp4',
            '/images/alphabet/m.mp4', '/images/alphabet/n.mp4', '/images/alphabet/o.mp4', '/images/alphabet/p.mp4',
            '/images/alphabet/q.mp4', '/images/alphabet/r.mp4', '/images/alphabet/s.mp4', '/images/alphabet/t.mp4',
            '/images/alphabet/u.mp4', '/images/alphabet/v.mp4', '/images/alphabet/w.mp4', '/images/alphabet/x.mp4',
            '/images/alphabet/y.mp4', '/images/alphabet/z.mp4'
          ]
        },
        {
          id: 'numeric',
          title: 'NUMERIC_SYS',
          tagline: '[DATA CLARITY]',
          description: 'An exploration of 0–9 numerals within the same 24-unit grid. This set focuses on the balance between stroke weight and negative space, ensuring the numerals feel like a natural extension of the alphabet system.',
          tags: ['DATA', 'UI', 'CLARITY'],
          image: 'https://picsum.photos/seed/sys_num/600/400',
          specs: [
            { label: 'Medium', value: '100% Original Hand-drawn Illustration' },
            { label: 'Grid System', value: '24-unit Icon Matrix (1920px Canvas)' },
            { label: 'Construction', value: 'Native Geometric Keylines' },
            { label: 'Logic', value: 'Optical Balance + Structural Integrity' }
          ],
          localImages: [
            '/images/numbers/0.jpg', '/images/numbers/1.jpg', '/images/numbers/2.jpg',
            '/images/numbers/3.jpg', '/images/numbers/4.jpg', '/images/numbers/5.jpg',
            '/images/numbers/6.jpg', '/images/numbers/7.jpg', '/images/numbers/8.jpg',
            '/images/numbers/9.jpg'
          ]
        },
        {
          id: 'character',
          title: 'CHAR_IP',
          tagline: '[SCALABLE ANATOMY]',
          description: 'Adapting organic forms into the 24-unit matrix. This section explores stylistic unity and structural integrity across a modular character system.',
          tags: ['IDENTITY', 'MASCOT', 'EMOTION'],
          image: 'https://picsum.photos/seed/sys_char/600/400',
          specs: [
            { label: 'Medium', value: '100% Original Hand-drawn Illustration' },
            { label: 'Grid', value: '24-unit Icon Matrix' },
            { label: 'Type', value: 'Character Anatomy' },
            { label: 'ID', value: 'Numeric Index 01–12' }
          ],
          localImages: [
            '/images/characters/01.jpg', '/images/characters/02.jpg', '/images/characters/03.jpg',
            '/images/characters/04.jpg', '/images/characters/05.jpg', '/images/characters/06.jpg',
            '/images/characters/07.jpg', '/images/characters/08.jpg', '/images/characters/09.jpg',
            '/images/characters/10.jpg', '/images/characters/11.jpg', '/images/characters/12.jpg'
          ],
          localVideos: [
            '/images/characters/01.mp4', '/images/characters/02.mp4', '/images/characters/03.mp4',
            '/images/characters/04.mp4', '/images/characters/05.mp4', '/images/characters/06.mp4',
            '/images/characters/07.mp4', '/images/characters/08.mp4', '/images/characters/09.mp4',
            '/images/characters/10.mp4', '/images/characters/11.mp4', '/images/characters/12.mp4'
          ]
        },
        {
          id: 'zodiac',
          title: 'ZODIAC_SYS',
          tagline: '[CULTURAL_IDENTITY]\n[12-UNIT_ICON_MATRIX]',
          description: 'A colored illustration series of the 12 Chinese Zodiac animals, built within the same modular 24-unit icon grid. Each character is fully hand-drawn and independently colored, with the complete set unified in a single composition.',
          tags: ['ILLUSTRATION', 'CULTURAL', 'CHARACTER'],
          image: '/images/zodiac/wholeset.jpg',
          gridMode: 'zodiac',
          accentColor: '#E54D1E',
          specs: [
            { label: 'Medium',    value: '100% Original Hand-drawn Illustration' },
            { label: 'Color',     value: 'Fully Colored — Individual + Unified Set' },
            { label: 'Framework', value: '24-unit Icon Matrix' },
            { label: 'ID',        value: 'Numeric Index 01–12' }
          ],
          localImages: [
            '/images/zodiac/01.jpg', '/images/zodiac/02.jpg', '/images/zodiac/03.jpg',
            '/images/zodiac/04.jpg', '/images/zodiac/05.jpg', '/images/zodiac/06.jpg',
            '/images/zodiac/07.jpg', '/images/zodiac/08.jpg', '/images/zodiac/09.jpg',
            '/images/zodiac/10.jpg', '/images/zodiac/11.jpg', '/images/zodiac/12.jpg'
          ],
          localImageLabels: [
            'ZODIAC_RAT_01', 'ZODIAC_OX_02', 'ZODIAC_TIGER_03',
            'ZODIAC_RABBIT_04', 'ZODIAC_DRAGON_05', 'ZODIAC_SNAKE_06',
            'ZODIAC_HORSE_07', 'ZODIAC_GOAT_08', 'ZODIAC_MONKEY_09',
            'ZODIAC_ROOSTER_10', 'ZODIAC_DOG_11', 'ZODIAC_PIG_12'
          ]
        },
        {
          id: 'iconography',
          title: 'ICON_SET',
          tagline: '[FUNCTIONAL_SYMBOLS]\n[UI_VISUAL_LANGUAGE]',
          description: 'A comprehensive iconography set developed for high-density interface applications. This system prioritizes semantic clarity and geometric precision, ensuring each symbol remains legible at small scales while maintaining a consistent 2px stroke DNA.',
          tags: ['ICON', 'UI', 'VECTOR'],
          image: 'https://picsum.photos/seed/sys_icon/600/400',
          specs: [
            { label: 'Medium',    value: '100% Vector-based Geometric Construction' },
            { label: 'Framework', value: '24px Standard Icon Matrix' },
            { label: 'Style',     value: 'Duotone / Consistent 2px Stroke' },
            { label: 'Logic',     value: 'Semantic Simplification & Scalability' }
          ],
          localImages: [
            '/images/icons/01.jpg', '/images/icons/02.jpg', '/images/icons/03.jpg',
            '/images/icons/04.jpg', '/images/icons/05.jpg', '/images/icons/06.jpg',
            '/images/icons/07.jpg', '/images/icons/08.jpg', '/images/icons/09.jpg',
            '/images/icons/10.jpg', '/images/icons/11.jpg', '/images/icons/12.jpg',
            '/images/icons/13.jpg', '/images/icons/14.jpg', '/images/icons/15.jpg',
            '/images/icons/16.jpg', '/images/icons/17.jpg', '/images/icons/18.jpg',
            '/images/icons/19.jpg', '/images/icons/20.jpg', '/images/icons/21.jpg',
            '/images/icons/22.jpg', '/images/icons/23.jpg', '/images/icons/24.jpg'
          ],
          localImageLabels: [
            'MEDIA_HUB', 'JUSTICE', 'ESSENTIALS', 'EASTERN', 'LUXURY', 'NATURE',
            'TREASURE', 'TO_GO', 'CLIMATE', 'FALL_TRAVEL', 'HAPPY_SUNDAY', 'DEAL',
            'NEW_ARRIVAL', 'CASH_FLOW', 'INFINITY', 'HYDRATION', 'WALLET', 'COMMUNITY',
            'SAVINGS', 'MOBILE_SEARCH', 'PRESIDENT_DAY', 'ENERGY', 'NEW_YEAR', 'SHOPPING'
          ]
        }
    ]
  },
  {
    id: 'work-marketing',
    title: 'INFORMATION STRUCTURES',
    category: 'Maps / Infographics / Packaging / Commercial_Communication',
    year: '2024',
    role: 'VISUAL DESIGNER',
    client: 'STATUS: SELF-INITIATED RESEARCH',
    accentColor: '#D55736',
    description: 'Integrated brand systems across spatial, editorial, and multichannel campaign design.',
    content: [
      "Four systems documented: Spatial navigation, process visualization, tactile logistics, and commercial communication.",
      "This section archives the systematic deployment of brand assets across multi-channel marketing platforms. Each unit follows a strict visual hierarchy to optimize information delivery and user engagement."
    ],
    modules: [
        {
          id: 'spatial-systems',
          title: 'SPATIAL_SYSTEMS',
          tagline: '[NAVIGATIONAL_CARTOGRAPHY]',
          description: 'A systematic approach to institutional navigation. Deconstructing a 140-acre campus into a modular library of 3D structural anchors and 2D environmental assets.',
          specs: [
            { label: 'Context', value: 'Institutional Navigation' },
            { label: 'Logic',   value: 'Spatial Hierarchy' },
            { label: 'Medium',  value: 'Vector-based Info-Architecture' }
          ],
          gridMode: 'spatial',
          image: '/images/map/whole_map.jpg',
          processVideoId: '',   // Add YouTube video ID here when available
          localImages: [
            '/images/map/str_01.jpg', '/images/map/str_02.jpg', '/images/map/str_03.jpg',
            '/images/map/str_04.jpg', '/images/map/str_05.jpg',
            '/images/map/env_06.jpg', '/images/map/env_07.jpg', '/images/map/env_08.jpg',
            '/images/map/env_09.jpg', '/images/map/env_10.jpg', '/images/map/env_11.jpg'
          ],
          localImageLabels: [
            'STR_01', 'STR_02', 'STR_03', 'STR_04', 'STR_05',
            'ENV_06', 'ENV_07', 'ENV_08', 'ENV_09', 'ENV_10', 'ENV_11'
          ]
        },
        {
          id: 'process-architecture',
          title: 'PROCESS_ARCHITECTURE',
          tagline: '[DATA_CHRONICLES]',
          subHeader: '(Archive_v1.0: Multilayered_Process_Mapping)',
          description: 'Decoding complex systems through visual modeling. This section explores the architectural transition of information across logical, biological, and historical dimensions.',
          accentColor: '#1156D0',
          gridMode: 'archive-grid',
          specs: [
            { label: 'Context', value: 'Commercial Production Archive' },
            { label: 'Logic',   value: 'Structural Narrative & Data Hierarchy' },
            { label: 'Medium',  value: 'Visual System Modeling' }
          ],
          statusLabel: '[STATUS: BRAND_PRESERVATION // HOVER_TO_ACTIVATE_CHROMA]',
          localImages: [
            '/images/infographics/01.jpg',
            '/images/infographics/02.jpg',
            '/images/infographics/03.jpg',
            '/images/infographics/04.jpg',
            '/images/infographics/05.jpg',
            '/images/infographics/06.jpg',
            '/images/infographics/07.jpg',
            '/images/infographics/08.jpg'
          ],
          localImageLabels: [
            'UNIT 02-01 / CHRONO_ENGINEERING',
            'UNIT 02-02 / DATA_INVENTORY',
            'UNIT 02-03 / ECOLOGICAL_SYSTEMS',
            'UNIT 02-04 / AGRONOMIC_LOGIC',
            'UNIT 02-05 / PATHOGEN_MAPPING',
            'UNIT 02-06 / LOGISTIC_HIERARCHY',
            'UNIT 02-07 / ARTISTIC_ANATOMY',
            'UNIT 02-08 / BIOLOGICAL_PROCESS'
          ]
        },
        {
          id: 'tactile-logistics',
          title: 'TACTILE_LOGISTICS',
          accentColor: '#D55736',
          tagline: '[SYS_03 / TACTILE_LOGISTICS]\n[PHYSICAL_INFORMATION_MAPPING]',
          description: "Project: Blackbird's Halloween Countdown System. This project explores the intersection of original hand-drawn narrative and tactile information structures. By translating 13 days of temporal sequence into 13 physical \"gateways\" (perforations), the packaging transforms from a static container into a non-linear storytelling device.",
          specs: [
            { label: 'Context',       value: 'Commercial Packaging & Visual Identity' },
            { label: 'Logic',         value: 'Temporal-to-Spatial Mapping (13-Day System)' },
            { label: 'Illustration',  value: '100% Original Hand-Drawn Assets' },
            { label: 'Medium',        value: 'Mixed Media (Analog Sketching + Digital Mastering)' }
          ],
          imageGroups: [
            {
              unitId: 'UNIT 03-A',
              caption: 'PHYSICAL_INTERACTION_LOGIC: CLOSED vs. DEPLOYED',
              images: [
                '/images/halloween/mockup.jpg',
                '/images/halloween/door-detail.jpg'
              ],
              imageLabels: ['CLOSED_STATE', 'DEPLOYED_STATE'],
              annotation: 'GATEWAY_COUNT: 13 / INTERACTION_TYPE: MANUAL_TEAR',
              hideTooltip: true
            },
            {
              unitId: 'UNIT 03-B',
              caption: 'CHROMATIC_SYSTEM: HALLOWEEN_EDITION_V1.0',
              images: [
                '/images/halloween/illustration-front.jpg',
                '/images/halloween/illustration-back.jpg'
              ],
              imageLabels: ['FRONT_FACE', 'BACK_FACE'],
              hideTooltip: true,
              colorSwatches: [
                { hex: '#161E1E', role: 'BACKGROUND_NIGHT' },
                { hex: '#9C402D', role: 'SHADOW_RUST' },
                { hex: '#D55736', role: 'ACCENT_PUMPKIN' },
                { hex: '#DBAA8B', role: 'GROUND_WARM' },
                { hex: '#E3D1B5', role: 'CREAM_LIGHT' },
                { hex: '#FFFFFF', role: 'HIGHLIGHT_WHITE' }
              ]
            },
            {
              unitId: 'UNIT 03-C',
              caption: 'SOURCE_EVOLUTION: ANALOG_TO_DIGITAL_WORKFLOW',
              detailCrop: {
                src: '/images/halloween/detail-crop.jpg',
                label: 'ASSET_DETAIL: CHARACTER_TEXTURE_04',
                imgTop: -180,
                imgLeft: -80
              },
              videoSrc: '/images/halloween/process.mp4',
              note: '// DOCUMENTATION: From initial graphite conceptualization to final vector-aligned digital rendering. All character assets are uniquely developed for this specific logistical structure.'
            }
          ]
        },
        {
          id: 'commercial-communication',
          title: 'COMMERCIAL_COMM',
          tagline: '[INTEGRATED_MARKETING_SYSTEMS]\n[MULTI_CHANNEL_BRAND_DEPLOYMENT]',
          description: 'This section archives the systematic deployment of brand assets across multi-channel marketing platforms. From email architecture to social narratives, each unit follows a strict visual hierarchy to optimize information delivery and user engagement.',
          accentColor: '#EB431D',
          specs: [
            { label: 'Context',  value: 'Brand Scalability & Marketing Logic' },
            { label: 'Logic',    value: 'Multi-Channel Visual Consistency' },
            { label: 'Medium',   value: 'Digital-First Brand Communication' },
            { label: 'Surface',  value: 'Email / Social / App / Motion' }
          ],
          imageGroups: [
            {
              unitId: 'UNIT 04-D1',
              caption: 'CASE_STUDY: MARDI_GRAS_SYSTEM',
              heroLayout: true,
              images: [
                '/images/commercial/MG24_EML_MASTER_V01.jpg',
                '/images/commercial/MG24_MOT_SQ_POST.mp4',
                '/images/commercial/MG24_MKT_STORY_9x16.jpg'
              ],
              imageLabels: [
                'MG24_EML_MASTER_V01',
                'MG24_MOT_SQ_POST',
                'MG24_MKT_STORY_9x16'
              ],
              note: '// CROSS_PLATFORM_ADAPTATION: Email master asset distributed across motion and story surfaces. Demonstrates channel-specific visual optimization.'
            },
            {
              unitId: 'UNIT 04-D2',
              caption: 'CASE_STUDY: PAYPAL_CASH_SYSTEM',
              images: [
                '/images/commercial/PYPL250_EML_HERO_CONV.jpg',
                '/images/commercial/PYPL250_UI_APP_FEED_LIVE.jpg'
              ],
              imageLabels: [
                'PYPL250_EML_HERO_CONV',
                'PYPL250_UI_APP_FEED_LIVE'
              ],
              gridCols: 2,
              hideTooltip: true,
              note: '// ENV_LOGIC: Documenting direct-to-app conversion. Story adaptation skipped for this specific sprint.'
            },
            {
              unitId: 'UNIT 04-E',
              caption: 'INTERFACE_PROMOTION: MARKETING_ASSETS',
              images: [
                '/images/commercial/AIRBNB_SUMMER_GETAWAY.jpg',
                '/images/commercial/AMZN250_GIFT_CARD.jpg',
                '/images/commercial/APPLE_WATCH_ULTRA.jpg',
                '/images/commercial/PYPL150_WIN_WEDNESDAY.jpg'
              ],
              imageLabels: [
                'AIRBNB_SUMMER_GETAWAY',
                'AMZN250_GIFT_CARD',
                'APPLE_WATCH_ULTRA',
                'PYPL150_WIN_WEDNESDAY'
              ],
              gridCols: 2,
              hideTooltip: true,
              note: '// MARKETING_ASSET_REPOSITORY: Partner banner components. 2×2 grid, natural proportions.'
            },
            {
              unitId: 'UNIT 04-F',
              caption: 'MOTION_MARKETING: TEMPORAL_INFORMATION_FLOW',
              images: [
                '/images/commercial/SOC_STPAT_LUCKY_SQ.gif',
                '/images/commercial/SOC_HAL_SPOOKY.gif',
                '/images/commercial/SOC_MOCHI_HEALTH.gif',
                '/images/commercial/SOC_1000_MILES.gif'
              ],
              imageLabels: [
                'SOC_STPAT_LUCKY_SQ',
                'SOC_HAL_SPOOKY',
                'SOC_MOCHI_HEALTH',
                'SOC_1000_MILES'
              ],
              gridCols: 2,
              hideTooltip: true,
              note: '// TEMPORAL_INFORMATION_FLOW: Visual hierarchy optimized for muted autoplay on social channels.'
            }
          ]
        }
    ]
  },
  {
    id: 'work-motion',
    title: 'MOTION SYSTEMS',
    category: 'INTEGRATED_KINETICS / CEL_RESEARCH',
    year: '2023',
    role: 'MOTION DESIGNER',
    client: 'STATUS: INTEGRATED_KINETICS / CEL_RESEARCH',
    description: 'Systematic explorations in temporal rhythm and kinetic logic.',
    focusLine: '// LOGIC: Deconstructing motion through commercial narratives and manual cel animation.',
    content: [],
    motionAssets: [
      { id: 'PROJ_EUF', src: '/images/motion/PROJ_EUF_SUSTAINABLE_NARRATIVE.mp4', type: 'mp4', idLabel: '// ID: PROJ_EUF: SUSTAINABLE_NARRATIVE', logLabel: '[AE / VECTOR_ANIMATION / 30S]', span: 'full', module: 'A' },
      { id: 'IDN_COVER', src: '/images/motion/EDITORIAL_IDN_SYSTEM_COVER.mp4', type: 'mp4', idLabel: '// ID: EDITORIAL: IDN_SYSTEM_COVER', logLabel: '[AE / VERTICAL_MOTION / 30S]', span: 'vertical', module: 'A' },
      { id: 'FIBER', src: '/images/motion/BRAND_GOOGLE_FIBER_KINETICS.gif', type: 'gif', idLabel: '// ID: BRAND: GOOGLE_FIBER_KINETICS', logLabel: '[AE / BRAND_IDENTITY / LOOP]', span: 'default', module: 'A' },
      { id: 'B2B_EMAIL', src: '/images/motion/COMMERCIAL_B2B_EMAIL_GIF.gif', type: 'gif', idLabel: '// ID: COMMERCIAL: B2B_EMAIL_ASSET', logLabel: '[AE / MARKETING_ASSETS / GIF]', span: 'default', module: 'A' },
      { id: 'BIRDS', src: '/images/motion/STUDY_ORGANIC_FLIGHT_RHYTHM.gif', type: 'gif', idLabel: '// ID: STUDY: ORGANIC_FLIGHT_RHYTHM', logLabel: '[AE / PUPPET_PINS / LOOP]', span: 'default', module: 'B' },
      { id: 'FLOWER', src: '/images/motion/BOTANICAL_BLOOM_LOGIC.gif', type: 'gif', idLabel: '// ID: BOTANICAL: BLOOM_LOGIC', logLabel: '[AE / PATH_ANIMATION / LOOP]', span: 'default', module: 'B' },
      { id: 'HAIR', src: '/images/motion/NARRATIVE_CAPILLARY_ADVENTURE.gif', type: 'gif', idLabel: '// ID: NARRATIVE: CAPILLARY_ADVENTURE', logLabel: '[CEL_ANIM / FRAME_BY_FRAME]', span: 'full', module: 'C' },
      { id: 'TEAR', src: '/images/motion/EXPERIMENTAL_CHARACTER_DISRUPTION.gif', type: 'gif', idLabel: '// ID: EXPERIMENTAL: CHARACTER_DISRUPTION', logLabel: '[CEL_ANIM / DISTORTION_STUDY]', span: 'default', module: 'C' },
      { id: 'TREE', src: '/images/motion/CHARACTER_XMAS_TREE_LOCOMOTION.gif', type: 'gif', idLabel: '// ID: CHARACTER: XMAS_TREE_LOCOMOTION', logLabel: '[CEL_ANIM / FRAME_BY_FRAME]', span: 'default', module: 'C' }
    ]
  },
  {
    id: 'work-personal',
    title: 'NARRATIVE ARCHIVES',
    category: 'Personal Research / Published Works',
    year: 'ONGOING',
    role: 'ARCHIVIST / ILLUSTRATOR',
    client: 'STATUS: ONGOING — RESEARCH + COMMERCIAL',
    accentColor: '#2C6281',
    description: 'From personal memory archives and visual research to professionally published illustration.',
    content: [
      "04.1 documents the visual research phase — deconstructing personal memory into modular motif systems.",
      "04.2 documents the commercial output phase — applying those narrative systems to professionally published works."
    ],
    modules: [
      {
        id: 'narrative-memory',
        title: 'NARRATIVE_MEMORY',
        sysLabel: 'SYS_04.1',
        accentColor: '#2C6281',
        tagline: '[SYS_04.1 / NARRATIVE_MEMORY]\n[FRAGMENTED_CHILDHOOD_ARCHIVE]',
        description: "Project: Fragmented Childhood Narratives. A systematic deconstruction of childhood memories through modular character assets and chromatic nostalgia. This archive explores how organic, hand-drawn storytelling can be indexed into a repeatable visual motif system.",
        specs: [
          { label: 'Context',   value: 'Personal Research & Visual Prototyping' },
          { label: 'Logic',     value: 'Memory Indexing → Emotion to Fixed Visual Symbol' },
          { label: 'Texture',   value: 'Analog Charcoal + Digital Grain' },
          { label: 'Medium',    value: 'Mixed Media — Analog Sketching + Digital Mastering' }
        ],
        imageGroups: [
          {
            unitId: 'UNIT 04-A',
            caption: 'CHARACTER_ASSET_INDEXING',
            images: [
              '/images/childhood/character-01.jpg',
              '/images/childhood/character-02.jpg',
              '/images/childhood/character-03.jpg',
              '/images/childhood/character-04.jpg',
              '/images/childhood/character-05.jpg',
              '/images/childhood/character-06.jpg',
              '/images/childhood/object-01.jpg',
              '/images/childhood/object-02.jpg',
              '/images/childhood/object-03.jpg'
            ],
            imageLabels: [
              'CHAR_01', 'CHAR_02', 'CHAR_03',
              'CHAR_04', 'CHAR_05', 'CHAR_06',
              'OBJ_01',  'OBJ_02',  'OBJ_03'
            ],
            gridCols: 3
          },
          {
            unitId: 'UNIT 04-B',
            caption: 'COMPOSITION_ARCHITECTURE: FULL_FRAME_RENDER',
            images: [
              '/images/childhood/scene-01.jpg',
              '/images/childhood/scene-02.jpg',
              '/images/childhood/scene-03.jpg'
            ],
            imageLabels: ['SCENE_01', 'SCENE_02', 'SCENE_03'],
            gridCols: 1,
            colorSwatches: [
              { hex: '#2D2C33', role: 'NIGHT_INK' },
              { hex: '#29615A', role: 'DEEP_TEAL' },
              { hex: '#2C6281', role: 'MEMORY_BLUE' },
              { hex: '#6D5657', role: 'DUSTY_ROSE' },
              { hex: '#B55D4E', role: 'RUST_WARM' },
              { hex: '#D99C36', role: 'AMBER_GLOW' },
              { hex: '#E1DAC5', role: 'PAPER_CREAM' }
            ]
          },
          {
            unitId: 'UNIT 04-C',
            caption: 'MATERIAL_DATA: ANALOG_GRAIN_ANALYSIS',
            images: [
              '/images/childhood/texture-01.jpg',
              '/images/childhood/texture-02.jpg'
            ],
            imageLabels: ['GRAIN_SAMPLE_01', 'GRAIN_SAMPLE_02'],
            note: '// TEXTURE_CLASS: analog medium on cartridge paper. Grain frequency: variable. Organic non-repeating pattern indicative of hand-applied medium.'
          }
        ]
      },
      {
        id: 'published-works',
        title: 'PUBLISHED_WORKS',
        sysLabel: 'SYS_04.2',
        accentColor: '#2C6281',
        tagline: '[SYS_04.2 / PUBLISHED_WORKS]\n[COMMERCIAL_LITERATURE_DEPLOYMENT]',
        description: "Project: Professional Children's Book Illustration. This module documents the application of narrative systems in professional publishing. It focuses on maintaining character consistency across complex layouts, rhythmic pacing of physical page-turns, and the technical logic of printed media.",
        specs: [
          { label: 'Context',     value: 'Professional Publishing & Narrative Direction' },
          { label: 'Platform',    value: 'Physical Distribution (Hardcover / Print)' },
          { label: 'Consistency', value: 'Character Stability across 32+ Multi-spread Layouts' },
          { label: 'Status',      value: 'Officially Published' }
        ],
        imageGroups: [
          {
            unitId: 'UNIT 04.2-A',
            caption: 'FUSSY_WILLIKERS: THE_BABY_SOCK_THIEF',
            heroLayout: true,
            placeholderAspect: 'aspect-square',
            rightSlotAspect: 'aspect-[2/1]',
            images: [
              '/images/published/FUSSY_COVER.jpg',
              '/images/published/INTERIOR_DETAIL_01.jpg',
              '/images/published/INTERIOR_DETAIL_02.jpg'
            ],
            imageLabels: ['', '', ''],
            note: '// VOL_01 // AUTHOR: RYAN & ASHLEY MCLEMORE // FORMAT: 8x10 PICTURE BOOK\n// Dynamic Perspective · Texture Layering · Character-Driven Layout'
          },
          {
            unitId: 'UNIT 04.2-B',
            caption: 'ANDREW_AND_THE_MAGIC_PAINT',
            heroLayout: true,
            placeholderAspect: 'aspect-square',
            images: [
              '/images/published/ANDREW_01.jpg',
              '/images/published/ANDREW_02.jpg',
              '/images/published/ANDREW_03.jpg'
            ],
            imageLabels: ['', '', ''],
            note: '// VOL_02 // AUTHOR: ED TO THE FUTURE // FORMAT: NARRATIVE SPREAD INDEX\n// Sequential Visual Flow · Chromatic Storytelling · Print-Ready Asset Management'
          }
        ]
      }
    ]
  },
  {
    id: 'work-spatial',
    title: 'SPATIAL NARRATIVES',
    category: 'Scenography / Concept Art',
    year: '2024',
    role: 'CONCEPT ARTIST',
    client: 'COMMERCIAL_PROJECT',
    description: 'Omni Austin Downtown // public area concept art',
    focusLine: '// FOCUS: THE AUSTIN SESSION — TRANSLATING MUSICAL DNA',
    narrativeImage: '/images/spatial/RAW_INPUT.png',
    narrativeText: "Austin, Texas carries a sonic identity unlike any American city. The \"Live Music Capital of the World\" isn't a tagline — it's an architectural reality: stages on every block, neon against limestone, the persistent hum of a Fender through an open door. The challenge: translate this into permanent visual language for the Omni Austin Downtown public areas — works that speak to locals and visitors alike without illustration or cliché.",
    content: [
      "Three large-format works commissioned for the hotel's public areas, translating Austin's musical DNA into abstract spatial compositions.",
      "Each piece deconstructs the geometry of string instruments — bridges, frets, soundholes — into structured geometric systems that hold their own as architectural art."
    ],
    images: [
      '/images/spatial/ATX_2227_GTR_MAIN.webp',
      '/images/spatial/ATX_2227_GTR_01.png',
      '/images/spatial/ATX_2227_GTR_02.avif'
    ],
    imageIds: [
      'ATX_2227_GTR_MAIN',
      'ATX_2227_GTR_01',
      'ATX_2227_GTR_02'
    ]
  }
];
