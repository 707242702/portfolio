
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

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;margin-bottom:32px;backdrop-filter:blur(4px);">
    <p style="font-size:20px;font-weight:500;line-height:1.55;color:#1D3557;margin:0 0 16px;">
      Scaling Pedagogical Storytelling
    </p>
    <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0 0 12px;">
      From hand-drawn storyboards to AI-integrated visual systems \u2014 a 72-book evolution for Decodable Phonics.
    </p>
    <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0;">
      However, it was time-intensive and not scalable for a 72-book pipeline. The system needed to evolve.
    </p>
  </div>

  <!-- ==================== 1. PHASE 1 vs PHASE 4 COMPARISON ==================== -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Evolution Comparison</p>

  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;margin-bottom:8px;">
    <div style="padding:20px;border:1px solid #D9D9D9;border-radius:2px 0 0 0;background:rgba(0,0,0,0.02);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#c0392b;margin:0;text-transform:uppercase;font-weight:600;min-height:32px;display:flex;align-items:flex-end;">Phase 1 \u2014 Hand-Drawn</p>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-top:12px;">
        <img src="/images/ai-illustration/phase1-storyboard.webp" alt="Hand-drawn storyboard" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-size:12px;color:#78716c;margin:12px 0 0;line-height:1.6;">Full manual storyboarding. Narrative control through hand-drawn composition and spatial pacing.</p>
    </div>
    <div style="padding:20px;border:1px solid #D9D9D9;border-left:none;background:rgba(0,0,0,0.02);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#F3B013;margin:0;text-transform:uppercase;font-weight:600;min-height:32px;display:flex;align-items:flex-end;">Phase 2 \u2014 AI 70% Draft</p>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-top:12px;">
        <img src="/images/ai-illustration/phase4-ai-draft.webp" alt="AI-generated 70% draft" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-size:12px;color:#78716c;margin:12px 0 0;line-height:1.6;">Prompt-driven generation via Nanobanana. 70% complete, but surface too smooth.</p>
    </div>
    <div style="padding:20px;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 0 0;background:rgba(0,0,0,0.02);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0;text-transform:uppercase;font-weight:600;min-height:32px;display:flex;align-items:flex-end;">Phase 3 \u2014 Refined Final</p>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-top:12px;">
        <img src="/images/ai-illustration/phase-final-refined.webp" alt="Manually refined final illustration" style="display:block;width:100%;height:auto;">
      </div>
      <p style="font-size:12px;color:#78716c;margin:12px 0 0;line-height:1.6;">30% illustrator refinement: texture, brush edges, and hand-drawn feel restored.</p>
    </div>
  </div>
  <div style="background:rgba(17,86,208,0.05);border:1px solid #D9D9D9;border-top:none;border-radius:0 0 2px 2px;padding:16px 20px;margin-bottom:48px;display:flex;align-items:center;gap:12px;">
    <span style="font-size:20px;color:#1156D0;font-weight:700;flex-shrink:0;">\u2192</span>
    <p style="font-size:13px;color:#1D3557;margin:0;font-weight:500;">Same scene, three stages: from hand-drawn storyboard to AI draft to refined print-ready illustration. The tools changed, but compositional discipline and storytelling expertise remain consistent.</p>
  </div>

  <!-- ==================== EVOLUTION TIMELINE ==================== -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Evolution Timeline</p>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-bottom:48px;">
    <div style="padding:24px;border:1px solid #D9D9D9;border-radius:2px 0 0 2px;background:rgba(255,255,255,0.3);position:relative;">
      <div style="position:absolute;top:12px;right:12px;width:8px;height:8px;border-radius:50%;background:#EB431D;"></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;font-weight:600;">Phase 1</p>
      <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 4px;">Hand-Drawn Era</p>
      <p style="font-size:12px;color:#78716c;margin:0;line-height:1.6;">Foundational Phase: 30\u201340 storyboard books drawn manually to establish narrative logic, compositional standards, and pedagogical scaffolding.</p>
    </div>
    <div style="padding:24px;border:1px solid #D9D9D9;border-left:none;background:rgba(255,255,255,0.3);position:relative;">
      <div style="position:absolute;top:12px;right:12px;width:8px;height:8px;border-radius:50%;background:#F3B013;"></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;font-weight:600;">Phase 2</p>
      <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 4px;">AI-Assisted Sketch</p>
      <p style="font-size:12px;color:#78716c;margin:0;line-height:1.6;">AI image + hand sketch hybrid approach begins.</p>
    </div>
    <div style="padding:24px;border:1px solid #D9D9D9;border-left:none;background:rgba(255,255,255,0.3);position:relative;">
      <div style="position:absolute;top:12px;right:12px;width:8px;height:8px;border-radius:50%;background:#1156D0;"></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;font-weight:600;">Phase 3</p>
      <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 4px;">AI 70% Completion</p>
      <p style="font-size:12px;color:#78716c;margin:0;line-height:1.6;">AI draft \u2248 70% complete. Illustrator refinement \u2248 30%.</p>
    </div>
    <div style="padding:24px;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;background:rgba(255,255,255,0.3);position:relative;">
      <div style="position:absolute;top:12px;right:12px;width:8px;height:8px;border-radius:50%;background:#1A824E;"></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;font-weight:600;">Phase 4</p>
      <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 4px;">Prompt Architecture</p>
      <p style="font-size:12px;color:#78716c;margin:0;line-height:1.6;">System Maturity: Customized GPT prompt architecture. Physical storyboarding is eliminated as narrative constraints are now embedded directly into the AI instructions.</p>
    </div>
  </div>

  <!-- ==================== 4. VISUAL PIPELINE DIAGRAM ==================== -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Production Pipeline</p>

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px 24px;border-radius:2px;margin-bottom:48px;">
    <div style="display:flex;align-items:stretch;gap:0;">

      <div style="flex:1;text-align:center;position:relative;">
        <div style="width:64px;height:64px;margin:0 auto 12px;border-radius:50%;background:rgba(29,53,87,0.08);border:2px solid #1D3557;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:24px;">&#128196;</span>
        </div>
        <p style="font-size:12px;font-weight:600;color:#1D3557;margin:0 0 4px;">Academic Manuscript</p>
        <p style="font-size:10px;color:#a8a29e;margin:0;">Phonics-based scripts & pedagogical constraints</p>
        <div style="position:absolute;top:32px;right:-8px;width:16px;height:2px;background:#D9D9D9;"></div>
      </div>

      <div style="flex:1;text-align:center;position:relative;">
        <div style="width:64px;height:64px;margin:0 auto 12px;border-radius:50%;background:rgba(17,86,208,0.08);border:2px solid #1156D0;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:24px;">&#129504;</span>
        </div>
        <p style="font-size:12px;font-weight:600;color:#1156D0;margin:0 0 4px;">Custom GPT</p>
        <p style="font-size:10px;color:#a8a29e;margin:0;">Parse + prompt gen</p>
        <div style="position:absolute;top:32px;right:-8px;width:16px;height:2px;background:#D9D9D9;"></div>
      </div>

      <div style="flex:1;text-align:center;position:relative;">
        <div style="width:64px;height:64px;margin:0 auto 12px;border-radius:50%;background:rgba(243,176,19,0.1);border:2px solid #F3B013;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:24px;">&#9997;&#65039;</span>
        </div>
        <p style="font-size:12px;font-weight:600;color:#1D3557;margin:0 0 4px;">Nanobanana</p>
        <p style="font-size:10px;color:#a8a29e;margin:0;">AI generation (70%)</p>
        <div style="position:absolute;top:32px;right:-8px;width:16px;height:2px;background:#D9D9D9;"></div>
      </div>

      <div style="flex:1;text-align:center;position:relative;">
        <div style="width:64px;height:64px;margin:0 auto 12px;border-radius:50%;background:rgba(235,67,29,0.08);border:2px solid #EB431D;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:24px;">&#128396;</span>
        </div>
        <p style="font-size:12px;font-weight:600;color:#1D3557;margin:0 0 4px;">Illustrator</p>
        <p style="font-size:10px;color:#a8a29e;margin:0;">Refinement (30%)</p>
        <div style="position:absolute;top:32px;right:-8px;width:16px;height:2px;background:#D9D9D9;"></div>
      </div>

      <div style="flex:1;text-align:center;">
        <div style="width:64px;height:64px;margin:0 auto 12px;border-radius:50%;background:rgba(26,130,78,0.08);border:2px solid #1A824E;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:24px;">&#128214;</span>
        </div>
        <p style="font-size:12px;font-weight:600;color:#1A824E;margin:0 0 4px;">Print-Ready</p>
        <p style="font-size:10px;color:#a8a29e;margin:0;">Layout-Ready Assets: Optimized with copy-safe areas for seamless in-house InDesign integration.</p>
      </div>

    </div>

    <div style="display:flex;justify-content:space-between;margin-top:24px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.06);">
      <div style="display:flex;align-items:center;gap:6px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#D9D9D9;"></div>
        <span style="font-size:10px;color:#a8a29e;font-family:'JetBrains Mono',monospace;letter-spacing:0.1em;">INPUT</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#1156D0;"></div>
        <span style="font-size:10px;color:#a8a29e;font-family:'JetBrains Mono',monospace;letter-spacing:0.1em;">AI PROCESSING</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#EB431D;"></div>
        <span style="font-size:10px;color:#a8a29e;font-family:'JetBrains Mono',monospace;letter-spacing:0.1em;">HUMAN REFINEMENT</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#1A824E;"></div>
        <span style="font-size:10px;color:#a8a29e;font-family:'JetBrains Mono',monospace;letter-spacing:0.1em;">OUTPUT</span>
      </div>
    </div>
  </div>

  <!-- ==================== VISUAL LANGUAGE RULES ==================== -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Visual Language Rules</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:24px;border-radius:2px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:700;">Style Origin</p>
      <p style="font-size:14px;color:#1D3557;font-weight:500;margin:0 0 8px;">Initial direction generated in MidJourney</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span style="font-size:11px;color:#78716c;background:rgba(0,0,0,0.04);padding:4px 10px;border-radius:2px;">Hand-drawn feel</span>
        <span style="font-size:11px;color:#78716c;background:rgba(0,0,0,0.04);padding:4px 10px;border-radius:2px;">Rough brush edges</span>
        <span style="font-size:11px;color:#78716c;background:rgba(0,0,0,0.04);padding:4px 10px;border-radius:2px;">Visible texture</span>
        <span style="font-size:11px;color:#78716c;background:rgba(0,0,0,0.04);padding:4px 10px;border-radius:2px;">Clear light\u2013shadow</span>
        <span style="font-size:11px;color:#78716c;background:rgba(0,0,0,0.04);padding:4px 10px;border-radius:2px;">No line art</span>
      </div>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:24px;border-radius:2px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:700;">Proportional Logic</p>
      <p style="font-size:14px;color:#1D3557;font-weight:500;margin:0 0 8px;">Three-line proportional structure</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span style="font-size:11px;color:#78716c;background:rgba(0,0,0,0.04);padding:4px 10px;border-radius:2px;">Head-body ratio</span>
        <span style="font-size:11px;color:#78716c;background:rgba(0,0,0,0.04);padding:4px 10px;border-radius:2px;">Relative scale</span>
        <span style="font-size:11px;color:#78716c;background:rgba(0,0,0,0.04);padding:4px 10px;border-radius:2px;">Implicit system</span>
      </div>
      <p style="font-size:12px;color:#78716c;margin:12px 0 0;line-height:1.6;">Cognitive Clarity: Compositions are designed to support word-decoding, ensuring visuals assist rather than distract from the learning process.</p>
    </div>
  </div>

  <!-- ==================== 2. TEXTURE COMPARISON ==================== -->
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:24px;border-radius:2px;margin-bottom:16px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:700;">Texture & Brush Rules \u2014 Controlled Imperfection</p>
    <p style="font-size:14px;color:#1D3557;font-weight:500;margin:0 0 16px;">MidJourney outputs were too smooth. Refinement is not cosmetic; it is about removing AI-generated 'visual noise' to meet professional publishing standards.</p>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:16px;">
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

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div>
        <p style="font-size:12px;color:#c0392b;font-weight:500;margin:0 0 6px;">Problems in raw output:</p>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          <span style="font-size:10px;color:#78716c;background:rgba(192,57,43,0.06);padding:3px 8px;border-radius:2px;">Artificial gradients</span>
          <span style="font-size:10px;color:#78716c;background:rgba(192,57,43,0.06);padding:3px 8px;border-radius:2px;">Over-polished surface</span>
          <span style="font-size:10px;color:#78716c;background:rgba(192,57,43,0.06);padding:3px 8px;border-radius:2px;">Plastic-like edges</span>
        </div>
      </div>
      <div>
        <p style="font-size:12px;color:#1A824E;font-weight:500;margin:0 0 6px;">Manual corrections applied:</p>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          <span style="font-size:10px;color:#78716c;background:rgba(26,130,78,0.06);padding:3px 8px;border-radius:2px;">Brush irregularity</span>
          <span style="font-size:10px;color:#78716c;background:rgba(26,130,78,0.06);padding:3px 8px;border-radius:2px;">Edge breakage</span>
          <span style="font-size:10px;color:#78716c;background:rgba(26,130,78,0.06);padding:3px 8px;border-radius:2px;">Organic texture</span>
        </div>
      </div>
    </div>
  </div>

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:24px;border-radius:2px;margin-bottom:48px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:700;">Color & Lighting</p>
    <p style="font-size:14px;color:#1D3557;font-weight:500;margin:0 0 8px;">Human-directed palettes</p>
    <p style="font-size:13px;color:#78716c;line-height:1.7;margin:0;">Indoor and outdoor palettes defined by humans. AI does not auto-decide color. Lighting is AI-generated first, then manually adjusted. Flexibility preferred over strict enforcement.</p>
  </div>

  <!-- ==================== 3. CHARACTER CONSISTENCY ARCHIVE ==================== -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Character Consistency System</p>

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:28px;border-radius:2px;margin-bottom:16px;">
    <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 20px;">Customized GPT enforces identity control across books</p>

    <div style="display:grid;grid-template-columns:1fr 2fr;gap:24px;margin-bottom:24px;">

      <div style="background:rgba(17,86,208,0.04);border:1px solid #D9D9D9;border-radius:2px;padding:20px;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#1156D0;margin:0 0 14px;text-transform:uppercase;font-weight:600;">GPT-Extracted Traits</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:16px;height:16px;border-radius:50%;background:#F4C7A3;border:1px solid #D9D9D9;flex-shrink:0;"></div>
            <span style="font-size:12px;color:#1D3557;font-weight:500;">Skin tone</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:16px;height:16px;border-radius:50%;background:#C85A2F;border:1px solid #D9D9D9;flex-shrink:0;"></div>
            <span style="font-size:12px;color:#1D3557;font-weight:500;">Hair color</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:16px;height:16px;border-radius:50%;background:#5B8C5A;border:1px solid #D9D9D9;flex-shrink:0;"></div>
            <span style="font-size:12px;color:#1D3557;font-weight:500;">Clothing palette</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:16px;height:16px;border-radius:2px;background:rgba(0,0,0,0.06);border:1px solid #D9D9D9;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:8px;color:#78716c;">K2</div>
            <span style="font-size:12px;color:#1D3557;font-weight:500;">Age range</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:16px;height:16px;border-radius:2px;background:rgba(0,0,0,0.06);border:1px solid #D9D9D9;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:8px;color:#78716c;">\u263A</div>
            <span style="font-size:12px;color:#1D3557;font-weight:500;">Personality traits</span>
          </div>
        </div>
      </div>

      <div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;">Same Characters \u2014 Multiple Scenes, Poses & Dynamics</p>
        <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
          <img src="/images/ai-illustration/character-consistency.webp" alt="Character consistency across multiple scenes and poses" style="display:block;width:100%;height:auto;">
        </div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:8px 0 0;text-transform:uppercase;">Prompt-based identity control across books</p>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0;border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;">
      <div style="padding:16px;text-align:center;background:rgba(17,86,208,0.05);border-right:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em;">Step 1</p>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Upload Reference</p>
      </div>
      <div style="padding:16px;text-align:center;background:rgba(17,86,208,0.03);border-right:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em;">Step 2</p>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">GPT Extracts Traits</p>
      </div>
      <div style="padding:16px;text-align:center;background:rgba(17,86,208,0.05);border-right:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em;">Step 3</p>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Generate Prompt</p>
      </div>
      <div style="padding:16px;text-align:center;background:rgba(17,86,208,0.03);border-right:1px solid #D9D9D9;">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em;">Step 4</p>
        <p style="font-size:13px;font-weight:600;color:#1D3557;margin:0;">Reuse Across Pages</p>
      </div>
      <div style="padding:16px;text-align:center;background:rgba(17,86,208,0.05);">
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em;">Result</p>
        <p style="font-size:13px;font-weight:600;color:#1A824E;margin:0;">Consistent Identity</p>
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
    <p style="font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#78716c;margin:0;">
      The challenge wasn't just illustration; it was maintaining pedagogical integrity at scale. This system evolved from manual craftsmanship into a high-efficiency engine that turned 72 complex decodable books into a streamlined production reality.
    </p>
  </div>

</div>`
  },
  {
    id: 'ai-style',
    title: 'Style & Asset Architecture',
    subtitle: 'SYNTHETIC',
    description: 'How the system is organized \u2014 character libraries, prompt architecture, and layout templates.',
    fullDescription: '',
    content: [],
    tags: ['Visual Guides', 'Color Theory', 'Standardization'],
    customHtml: `<div style="width:100%;">

  <!-- INTRO SECTION -->
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;margin-bottom:48px;backdrop-filter:blur(4px);">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
      <div style="background:#EB431D;padding:4px 12px;border-radius:2px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:white;text-transform:uppercase;font-weight:600;">V1.0</span>
      </div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#a8a29e;text-transform:uppercase;">Visual System</span>
    </div>
    <p style="font-size:20px;font-weight:500;line-height:1.55;color:#1D3557;margin:0 0 16px;">
      Large-Scale AI Industrialization for Educational Publishing
    </p>
    <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0;">
      A structured asset framework that replaces traditional static style guides with prompt-based identity encoding &#8212; automating the alignment between visual style and pedagogical objectives across a 72-book production pipeline.
    </p>
  </div>

  <!-- ==================== 01 — ASSET ARCHITECTURE ==================== -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#EB431D;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">01</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);max-width:440px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Asset Architecture Logic</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 12px;">Structured framework for 72-book visual consistency</p>
      <p style="font-size:14px;color:#78716c;line-height:1.7;margin:0 0 20px;">
        To ensure visual unity across 72 books in a long-cycle pipeline, I built a structured asset framework. The system replaces traditional static character sheets with prompt-based identity encoding &#8212; automating alignment between visual style and pedagogical goals, reducing visual drift to near zero.
      </p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <span style="font-size:11px;color:#EB431D;background:rgba(235,67,29,0.06);padding:4px 12px;border-radius:2px;font-weight:500;">Identity Encoding</span>
        <span style="font-size:11px;color:#EB431D;background:rgba(235,67,29,0.06);padding:4px 12px;border-radius:2px;font-weight:500;">Zero Visual Drift</span>
        <span style="font-size:11px;color:#EB431D;background:rgba(235,67,29,0.06);padding:4px 12px;border-radius:2px;font-weight:500;">Scalable Framework</span>
      </div>
    </div>
  </div>

  <!-- Asset Library -->
  <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-bottom:8px;">
    <img src="/images/ai-style/assets-library.webp" alt="Character asset library — poses, expressions, environments" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;">
  </div>
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 24px;text-transform:uppercase;">Prompt-based identity control across characters, poses &amp; environments</p>

  <!-- Identity Encoding: Same character across scenes -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 12px;text-transform:uppercase;font-weight:600;">Identity Encoding &#8212; Max across scenes</p>
  <div style="display:grid;grid-template-columns:auto 1fr 1fr 1fr;gap:0;margin-bottom:8px;">
    <div style="border:1px solid #D9D9D9;border-radius:2px 0 0 2px;overflow:hidden;width:160px;">
      <img src="/images/ai-style/max-reference.webp" alt="Max — character reference" style="display:block;width:100%;height:100%;object-fit:cover;">
    </div>
    <div style="border:1px solid #D9D9D9;border-left:none;overflow:hidden;">
      <img src="/images/ai-style/max-cafeteria.webp" alt="Max in cafeteria scene" style="display:block;width:100%;height:100%;object-fit:cover;">
    </div>
    <div style="border:1px solid #D9D9D9;border-left:none;overflow:hidden;">
      <img src="/images/ai-style/max-clay-art.webp" alt="Max doing clay art" style="display:block;width:100%;height:100%;object-fit:cover;">
    </div>
    <div style="border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;overflow:hidden;">
      <img src="/images/ai-style/max-clay-spill.webp" alt="Max reacting to spill" style="display:block;width:100%;height:100%;object-fit:cover;">
    </div>
  </div>
  <div style="display:grid;grid-template-columns:auto 1fr 1fr 1fr;gap:0;margin-bottom:48px;">
    <div style="width:160px;padding:8px 12px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#EB431D;margin:0;text-transform:uppercase;font-weight:600;">Reference</p>
    </div>
    <div style="padding:8px 12px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0;text-transform:uppercase;">Cafeteria</p>
    </div>
    <div style="padding:8px 12px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0;text-transform:uppercase;">Art Class</p>
    </div>
    <div style="padding:8px 12px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:9px;color:#a8a29e;margin:0;text-transform:uppercase;">Reaction</p>
    </div>
  </div>

  <!-- ==================== 02 — PROPRIETARY AI AGENTS ==================== -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#1156D0;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">02</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);max-width:440px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Proprietary AI Agents</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 8px;">Two complementary Custom GPTs as system engines</p>
      <p style="font-size:14px;color:#78716c;line-height:1.7;margin:0;">
        The core of the system is driven by two complementary Custom GPTs that handle logic transformation and consistency enforcement respectively.
      </p>
    </div>
  </div>

  <!-- Two GPT Agent Cards -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:24px;">
    <div style="border:1px solid #D9D9D9;border-radius:2px 0 0 2px;padding:24px;background:rgba(17,86,208,0.03);">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#1156D0;"></div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#1156D0;margin:0;text-transform:uppercase;font-weight:700;">Agent 01</p>
      </div>
      <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 4px;">PEDAGOGICAL_TRANSLATOR</p>
      <p style="font-size:12px;color:#1156D0;margin:0 0 16px;font-weight:500;">Decodable K-2 Illustration Assistant</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em;">Role</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0 0 16px;">Bridges academic manuscripts and visual production.</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em;">Logic</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Parses decodable reader scripts, converts academic constraints (e.g., avoiding specific letter-combination interference) into AI rendering instructions &#8212; ensuring each illustration functions as a pedagogical scaffold.</p>
    </div>
    <div style="border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:24px;background:rgba(26,130,78,0.03);">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#1A824E;"></div>
        <p style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;color:#1A824E;margin:0;text-transform:uppercase;font-weight:700;">Agent 02</p>
      </div>
      <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 4px;">CONSISTENCY_ENFORCER</p>
      <p style="font-size:12px;color:#1A824E;margin:0 0 16px;font-weight:500;">Re-create Decodable Book Assistant</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em;">Role</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0 0 16px;">Locks visual asset reproducibility.</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em;">Logic</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Manages cross-page character identity control. Encodes character traits, lighting rules, and copy-safe areas into reusable prompt seeds &#8212; ensuring protagonist appearance and compositional logic remain consistent across 72 books.</p>
    </div>
  </div>

  <!-- GPT Workflow Screenshot -->
  <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-bottom:8px;">
    <img src="/images/ai-style/gpt-workflow.webp" alt="Custom GPT interface — Re-create Decodable Book Assistant" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;">
  </div>
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 48px;text-transform:uppercase;">Custom GPT Interface: Programming narrative constraints into the generation engine</p>

  <!-- ==================== 03 — PROMPT ENGINEERING ==================== -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#F3B013;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">03</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);max-width:440px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#F3B013;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Prompt Engineering Architecture</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 8px;">Systematized instruction components</p>
      <p style="font-size:14px;color:#78716c;line-height:1.7;margin:0;">
        Every prompt is constructed from three core modules that together produce layout-ready assets directly from AI generation.
      </p>
    </div>
  </div>

  <!-- Prompt Components - Code Style -->
  <div style="background:rgba(0,0,0,0.03);border:1px solid #D9D9D9;padding:0;border-radius:2px;margin-bottom:24px;overflow:hidden;">
    <div style="padding:12px 24px;border-bottom:1px solid rgba(0,0,0,0.06);background:rgba(0,0,0,0.02);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#a8a29e;margin:0;letter-spacing:0.1em;">// SYSTEMATIZED INSTRUCTION COMPONENTS</p>
    </div>
    <div style="padding:24px;">
      <div style="margin-bottom:20px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:#EB431D;">IDENTITY_ENCODING</span>
        <p style="font-size:13px;color:#78716c;line-height:1.6;margin:8px 0 0;">Lock 5 key dimensions: skin tone, hairstyle, clothing, body proportions, personality expression.</p>
      </div>
      <div style="margin-bottom:20px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:#1156D0;">ENVIRONMENT_PRESETS</span>
        <p style="font-size:13px;color:#78716c;line-height:1.6;margin:8px 0 0;">Standardize warm, clear, low-cognitive-load lighting required for K-2 age range.</p>
      </div>
      <div>
        <span style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:#1A824E;">LAYOUT_AWARE</span>
        <p style="font-size:13px;color:#78716c;line-height:1.6;margin:8px 0 0;">Explicitly define copy-safe zones within prompts, ensuring AI output is layout-ready.</p>
      </div>
    </div>
  </div>

  <!-- Copy-Safe Area Diagram -->
  <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-bottom:8px;">
    <img src="/images/ai-style/copy-safe-area.webp" alt="AI-generated spreads with copy-safe text zones marked" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;">
  </div>
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 48px;text-transform:uppercase;">Layout Integration: AI-generated assets with pre-planned copy-safe areas (pink dashed = text zone)</p>

  <!-- ==================== 04 — VERSION EVOLUTION ==================== -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#1A824E;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">04</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);max-width:440px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Version Evolution</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 8px;">From manual intuition to architectural production</p>
      <p style="font-size:14px;color:#78716c;line-height:1.7;margin:0;">
        Four production model iterations, each building on the last.
      </p>
    </div>
  </div>

  <!-- Version Table -->
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;margin-bottom:48px;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.1);">
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 20px;color:#a8a29e;font-weight:500;width:80px;">Version</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 20px;color:#a8a29e;font-weight:500;">Production Model</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 20px;color:#a8a29e;font-weight:500;">Core Driver</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:right;padding:14px 20px;color:#a8a29e;font-weight:500;width:100px;">Efficiency</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 20px;font-size:14px;font-weight:700;color:#a8a29e;">v1.0</td>
          <td style="padding:16px 20px;font-size:14px;color:#1D3557;font-weight:500;">Pure Hand-Drawn Storyboard</td>
          <td style="padding:16px 20px;font-size:14px;color:#78716c;">Artistic Intuition</td>
          <td style="padding:16px 20px;font-size:14px;color:#a8a29e;text-align:right;font-family:'JetBrains Mono',monospace;">Baseline</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 20px;font-size:14px;font-weight:700;color:#F3B013;">v2.0</td>
          <td style="padding:16px 20px;font-size:14px;color:#1D3557;font-weight:500;">AI Reference + Hand-Drawn Hybrid</td>
          <td style="padding:16px 20px;font-size:14px;color:#78716c;">Mixed Mode</td>
          <td style="padding:16px 20px;font-size:14px;color:#F3B013;text-align:right;font-family:'JetBrains Mono',monospace;font-weight:600;">2x</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 20px;font-size:14px;font-weight:700;color:#1156D0;">v3.0</td>
          <td style="padding:16px 20px;font-size:14px;color:#1D3557;font-weight:500;">AI Generation + 30% Refinement</td>
          <td style="padding:16px 20px;font-size:14px;color:#78716c;">Streamlined Production</td>
          <td style="padding:16px 20px;font-size:14px;color:#1156D0;text-align:right;font-family:'JetBrains Mono',monospace;font-weight:600;">5x</td>
        </tr>
        <tr>
          <td style="padding:16px 20px;font-size:14px;font-weight:700;color:#1A824E;">v4.0</td>
          <td style="padding:16px 20px;font-size:14px;color:#1D3557;font-weight:500;">Architectural Production</td>
          <td style="padding:16px 20px;font-size:14px;color:#78716c;">GPT Agent Workflow</td>
          <td style="padding:16px 20px;font-size:14px;color:#1A824E;text-align:right;font-family:'JetBrains Mono',monospace;font-weight:600;">10x</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ==================== 05 — VISUAL DEFINITION & STABILITY ==================== -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#c0392b;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">05</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);max-width:440px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#c0392b;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Refinement Evolution</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 8px;">From AI raw output to publication-ready character</p>
      <p style="font-size:14px;color:#78716c;line-height:1.7;margin:0;">
        The 30% manual refinement is not cosmetic &#8212; it is the quality gate that transforms generic AI output into print-standard illustration. Each character passes through three defined stages.
      </p>
    </div>
  </div>

  <!-- Refinement Evolution Image -->
  <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-bottom:8px;background:#fff;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;">
    <img src="/images/ai-production/character-evolution.webp" alt="Character refinement evolution — MidJourney raw output to first manual refinement to final character design" style="display:block;max-width:100%;max-height:100%;object-fit:contain;">
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;margin-bottom:8px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#c0392b;text-transform:uppercase;margin:0;font-weight:600;">01 &#8212; MidJourney Raw</p>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#F3B013;text-transform:uppercase;margin:0;text-align:center;font-weight:600;">02 &#8212; First Refine</p>
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#1A824E;text-transform:uppercase;margin:0;text-align:right;font-weight:600;">03 &#8212; Final Design</p>
  </div>
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 48px;text-transform:uppercase;">Correcting proportions, adding hand-drawn texture, and locking character identity</p>

  <!-- Character Audit Matrix -->
  <div style="display:flex;gap:0;margin-bottom:24px;">
    <div style="width:56px;flex-shrink:0;background:#c0392b;border-radius:2px 0 0 2px;display:flex;align-items:flex-start;justify-content:center;padding-top:28px;">
      <span style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:white;">06</span>
    </div>
    <div style="flex:1;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;padding:28px;background:rgba(255,255,255,0.4);max-width:440px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#c0392b;margin:0 0 16px;text-transform:uppercase;font-weight:600;">Character Audit</p>
      <p style="font-size:15px;font-weight:500;color:#1D3557;margin:0 0 8px;">Identity consistency verified across 72 books</p>
      <p style="font-size:14px;color:#78716c;line-height:1.7;margin:0;">
        Every character maintains locked proportions, color palette, and facial features across all scenes and environments &#8212; verified by the Re-create Decodable Book Assistant.
      </p>
    </div>
  </div>

  <!-- Character Matrix Image -->
  <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);margin-bottom:8px;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;background:#fff;">
    <img src="/images/ai-illustration/character-consistency.webp" alt="Character audit matrix — multiple characters maintaining consistent identity across different scenes, poses, and environments" style="display:block;max-width:100%;max-height:100%;object-fit:contain;">
  </div>
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:0 0 48px;text-transform:uppercase;">Zero identity drift: characters verified across scenes, poses &amp; environments</p>

  <!-- KEY METRICS -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">System Metrics</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:48px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:28px;font-weight:700;color:#EB431D;margin:0;">2</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Custom GPT Agents</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:28px;font-weight:700;color:#1156D0;margin:0;">5</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Identity Dimensions</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:28px;font-weight:700;color:#1A824E;margin:0;">10x</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Efficiency Gain</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:28px;font-weight:700;color:#F3B013;margin:0;">0</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Manual Prompts</p>
    </div>
  </div>

  <!-- OUTCOME -->
  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Outcome</p>
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;">
    <p style="font-size:18px;line-height:1.65;color:#1D3557;margin:0 0 12px;">
      The system transformed illustration production from an artisan craft into an engineered pipeline.
    </p>
    <p style="font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#78716c;margin:0;">
      By encoding artistic decisions into reusable prompt architecture and AI agents, the most complex challenge shifted from manual illustration to designing systems that ensure consistency, scalability, and pedagogical alignment at industrial scale.
    </p>
  </div>

</div>`
  },
  {
    id: 'ai-production',
    title: 'Production Workflow',
    subtitle: 'STRUCTURED',
    description: 'AI integrated into traditional publishing \u2014 a 10-step pipeline from manuscript to print-ready assets.',
    fullDescription: '',
    content: [],
    tags: ['Pipeline Integration', 'Manual Correction', 'Print Ready'],
    customHtml: `<div style="width:100%;">

<style>
.pw-pipeline{position:relative;padding:0 0 16px}
.pw-pipeline::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;background:#D9D9D9;transform:translateX(-50%)}
.pw-step{display:flex;padding:12px 0;position:relative}
.pw-step-l{justify-content:flex-start}
.pw-step-r{justify-content:flex-end}
.pw-card{width:calc(50% - 36px);max-width:440px;background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;border-radius:2px;padding:24px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:background 0.3s ease,border-color 0.3s ease}
.pw-card:hover{background:rgba(255,255,255,0.85);border-color:#a8a29e}
.pw-node{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;border:2px solid;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;z-index:2;background:#E5DED0}
.pw-phase{text-align:center;padding:32px 0 16px;position:relative;z-index:2}
.pw-phase-tag{display:inline-block;background:#E5DED0;padding:6px 20px;border:1px solid;border-radius:2px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600}
.pw-nav-link{text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a8a29e;transition:color 0.2s ease}
.pw-nav-link:hover{color:#1D3557}
@media(max-width:768px){
.pw-pipeline::before{left:24px}
.pw-step{justify-content:flex-end!important}
.pw-card{width:calc(100% - 64px)!important}
.pw-node{left:24px!important}
}
</style>

<!-- INTRO -->
<div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;margin-bottom:48px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);">
  <p style="font-size:20px;font-weight:500;line-height:1.55;color:#1D3557;margin:0 0 16px;">
    10-Step Precision Integration Pipeline
  </p>
  <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0 0 12px;">
    AI tools were integrated into an existing publishing pipeline &#8212; not as replacements, but as accelerators. From manuscript parsing to 300 DPI print-ready export, the workflow balances automation with manual oversight across 10 precisely defined stages.
  </p>
  <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0;">
    Automation supported the work. It did not override design judgment.
  </p>
</div>

<!-- ==================== PIPELINE ==================== -->
<div class="pw-pipeline">

  <!-- ===== PHASE 1: FOUNDATIONAL ===== -->
  <div class="pw-phase"><span class="pw-phase-tag" style="color:#1156D0;border-color:#1156D0;">01&#8211;03 Foundational</span></div>

  <!-- Step 01 -->
  <div class="pw-step pw-step-l">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Academic Manuscript</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">Parse decodable reading scripts</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Structured manuscript from Academic Designer defines narrative, vocabulary constraints, and page-by-page educational goals for K&#8211;K2 readers.</p>
    </div>
    <div class="pw-node" style="border-color:#1156D0;color:#1156D0;">01</div>
  </div>

  <!-- Step 02 -->
  <div class="pw-step pw-step-r">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Prompt Engineering</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">Decodable Illustration Assistant transforms documents</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Utilizing the custom <strong>Decodable Illustration Assistant</strong>, academic 'phonics constraints' are automatically encoded into precise visual prompts.</p>
    </div>
    <div class="pw-node" style="border-color:#1156D0;color:#1156D0;">02</div>
  </div>

  <!-- Step 03 -->
  <div class="pw-step pw-step-l">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Base Generation</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">AI produces initial 70% draft</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Prompts fed to Nanobanana for single-page AI illustration generation. Output is approximately 70% complete &#8212; structurally sound but surface too smooth.</p>
    </div>
    <div class="pw-node" style="border-color:#1156D0;color:#1156D0;">03</div>
  </div>

  <!-- ===== PHASE 2: QUALITY CONTROL ===== -->
  <div class="pw-phase"><span class="pw-phase-tag" style="color:#EB431D;border-color:#EB431D;">04&#8211;07 Quality Control</span></div>

  <!-- Step 04 -->
  <div class="pw-step pw-step-r">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Academic Compliance Verification</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">Academic compliance verification</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Academic Designer reviews AI output for educational accuracy &#8212; verifying vocabulary constraints, age-appropriateness, and alignment with decodable reading standards.</p>
    </div>
    <div class="pw-node" style="border-color:#EB431D;color:#EB431D;">04</div>
  </div>

  <!-- Academic Review Evidence -->
  <div style="margin:24px 0 32px;padding:0 48px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;">Academic Designer Feedback</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <img src="/images/ai-production/academic-annotation.webp" alt="Storyboard sketch with Academic Designer feedback — adjusting teacher expression for age-appropriate tone" style="display:block;width:100%;height:auto;">
      </div>
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <img src="/images/ai-production/academic-review.webp" alt="Figma review comments from Academic Designer verifying decodable text compliance" style="display:block;width:100%;height:auto;">
      </div>
    </div>
    <p style="font-family:Georgia,serif;font-size:13px;color:#a8a29e;margin:8px 0 0;line-height:1.6;">Academic Designer reviews every spread in Figma &#8212; verifying vocabulary constraints, character expressions, and educational tone before illustration proceeds.</p>
  </div>

  <!-- Step 05 -->
  <div class="pw-step pw-step-l">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Digital Refinement</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">Illustrator correction in Figma</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Illustrators correct compositional errors, fix anatomical issues, and adjust proportions through 3 revision rounds in Figma workspace.</p>
    </div>
    <div class="pw-node" style="border-color:#EB431D;color:#EB431D;">05</div>
  </div>

  <!-- Step 06 -->
  <div class="pw-step pw-step-r">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Texture Injection</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">Hand-drawn texture restoration</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">The 30% manual refinement is not merely cosmetic; it is strictly about removing AI-generated 'visual noise' to meet rigorous professional publishing standards.</p>
    </div>
    <div class="pw-node" style="border-color:#EB431D;color:#EB431D;">06</div>
  </div>

  <!-- Step 07 -->
  <div class="pw-step pw-step-l">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Consistency Check</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">Re-create Assistant locks character identity</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;"><strong>Re-create Decodable Book Assistant</strong> locks the 'Character Audit', ensuring zero identity drift across the entire 72-book series.</p>
    </div>
    <div class="pw-node" style="border-color:#EB431D;color:#EB431D;">07</div>
  </div>

  <!-- Character Audit Matrix -->
  <div style="margin:24px 0 32px;padding:0 48px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;">Character Audit &#8212; Identity Consistency Across 72 Books</p>
    <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 4px 16px rgba(0,0,0,0.06);background:#fff;">
      <img src="/images/ai-illustration/character-consistency.webp" alt="Character audit matrix — multiple characters maintaining consistent identity across different scenes, poses, and environments" style="display:block;width:100%;height:auto;">
    </div>
    <p style="font-family:Georgia,serif;font-size:13px;color:#a8a29e;margin:8px 0 0;line-height:1.6;">Every character maintains locked proportions, color palette, and facial features across all scenes &#8212; verified by the Re-create Decodable Book Assistant.</p>
  </div>

  <!-- ===== PHASE 3: INTEGRATION ===== -->
  <div class="pw-phase"><span class="pw-phase-tag" style="color:#1A824E;border-color:#1A824E;">08&#8211;10 Integration</span></div>

  <!-- Step 08 -->
  <div class="pw-step pw-step-r">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Layout-Aware Prep</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">Pre-planned copy-safe text zones</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">System pre-allocates <strong>Copy-Safe Zones</strong>, ensuring 100% compatibility with in-house InDesign templates for seamless handoff.</p>
    </div>
    <div class="pw-node" style="border-color:#1A824E;color:#1A824E;">08</div>
  </div>

  <!-- Copy-Safe Zone Demonstration -->
  <div style="margin:24px 0 32px;padding:0 48px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;">Copy-Safe Zone &#8212; Text Integration Ready</p>
    <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;box-shadow:0 4px 16px rgba(0,0,0,0.06);">
      <img src="/images/ai-production/copy-safe-area.webp" alt="Finished illustration spreads with copy-safe text zones marked — pink dashed areas reserved for InDesign text placement" style="display:block;width:100%;height:auto;">
    </div>
    <p style="font-family:Georgia,serif;font-size:13px;color:#a8a29e;margin:8px 0 0;line-height:1.6;">Pre-allocated text zones (pink) ensure every illustration is delivery-ready for in-house InDesign layout &#8212; no repositioning needed.</p>
  </div>

  <!-- Step 09 -->
  <div class="pw-step pw-step-l">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Editorial Approval</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">Final review via Smartsheet</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Designer and Academic Designer approve final assets through Smartsheet review workflow. Status tracking ensures nothing ships without dual sign-off.</p>
    </div>
    <div class="pw-node" style="border-color:#1A824E;color:#1A824E;">09</div>
  </div>

  <!-- Step 10 -->
  <div class="pw-step pw-step-r">
    <div class="pw-card">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 8px;text-transform:uppercase;font-weight:600;">Final Asset Export</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 6px;">300 DPI print-ready output</p>
      <p style="font-size:13px;color:#78716c;line-height:1.6;margin:0;">Approved assets exported at 300 DPI for print production. In-house design team integrates into InDesign templates for final book layout.</p>
    </div>
    <div class="pw-node" style="border-color:#1A824E;color:#1A824E;">10</div>
  </div>

</div>

<!-- ==================== METRICS ==================== -->
<p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:32px 0 16px;text-transform:uppercase;">Pipeline Metrics</p>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:48px;">
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;backdrop-filter:blur(10px);">
    <p style="font-size:28px;font-weight:700;color:#1156D0;margin:0;">10</p>
    <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Pipeline Steps</p>
  </div>
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;backdrop-filter:blur(10px);">
    <p style="font-size:28px;font-weight:700;color:#EB431D;margin:0;">3</p>
    <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Revision Rounds</p>
  </div>
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;backdrop-filter:blur(10px);">
    <p style="font-size:28px;font-weight:700;color:#1A824E;margin:0;">300</p>
    <p style="font-size:12px;color:#78716c;margin:4px 0 0;">DPI Output</p>
  </div>
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;backdrop-filter:blur(10px);">
    <p style="font-size:28px;font-weight:700;color:#F3B013;margin:0;">2</p>
    <p style="font-size:12px;color:#78716c;margin:4px 0 0;">GPT Agents</p>
  </div>
</div>

<!-- ==================== CRITICAL INSIGHT ==================== -->
<div style="background:rgba(17,86,208,0.05);border:1px solid #D9D9D9;border-left:3px solid #1156D0;padding:28px 28px 28px 32px;border-radius:2px;margin-bottom:48px;backdrop-filter:blur(10px);">
  <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0 0 12px;">
    Technical Summary
  </p>
  <p style="font-family:Georgia,serif;font-size:15px;line-height:1.75;color:#78716c;margin:0;">
    The challenge wasn't just illustration details, but designing and stabilizing the Custom GPT prompt architecture. Once the architecture was locked, production achieved linear scalability.
  </p>
</div>

<!-- ==================== BOTTOM NAVIGATION ==================== -->
<div style="display:flex;justify-content:space-between;align-items:center;padding:24px 0;border-top:1px solid #D9D9D9;">
  <a class="pw-nav-link" href="/#/ai/style-asset-architecture" style="color:#a8a29e;text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">
    &#8592; PREVIOUS: STYLE &amp; ASSET ARCHITECTURE
  </a>
  <a class="pw-nav-link" href="/#/work" style="color:#a8a29e;text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">
    NEXT: PERSONAL WORK &#8594;
  </a>
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
    <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0 0 12px;">
      This project documents how I built, deployed, and optimized yuqilu.com through generative tools, structured prompts, and a controlled deployment pipeline — without writing code manually.
    </p>
    <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0;">
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
  <p style="font-family:Georgia,serif;font-size:16px;color:#78716c;margin:0 0 24px;">Prompt → Generate → Version → Deploy → Domain</p>

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
        <img src="/images/ai-orchestrated/wix-before.webp" alt="Old Wix website" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;">
      </div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:8px 0 0;text-transform:uppercase;">Wix template — previous version</p>
    </div>
    <div style="padding:16px;border:1px solid #D9D9D9;border-top:none;border-left:none;border-radius:0 0 2px 0;background:rgba(255,255,255,0.3);">
      <div style="border-radius:2px;overflow:hidden;border:1px solid #D9D9D9;">
        <img src="/images/ai-orchestrated/site-after.webp" alt="New website" style="display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;">
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
    <p style="font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#78716c;margin:0;">
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
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'work-illustration',
    title: 'ILLUSTRATION SYSTEMS',
    category: 'Alphabet / Numeric / Characters',
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
          description: 'MODULAR TYPOGRAPHY CONSTRUCTED FROM PRIMITIVES',
          tags: ['TYPOGRAPHY', 'GRID', 'SYSTEM'],
          image: 'https://picsum.photos/seed/sys_alpha/600/400'
        },
        {
          id: 'numeric',
          title: 'NUMERIC_SYS',
          description: 'NUMERAL SETS FOR DATA CLARITY',
          tags: ['DATA', 'UI', 'CLARITY'],
          image: 'https://picsum.photos/seed/sys_num/600/400'
        },
        {
          id: 'character',
          title: 'CHAR_IP',
          description: 'SCALABLE ANATOMICAL RULES',
          tags: ['IDENTITY', 'MASCOT', 'EMOTION'],
          image: 'https://picsum.photos/seed/sys_char/600/400'
        },
        {
          id: 'iconography',
          title: 'ICON_SET',
          description: 'REDUCTIVE SYMBOLIC LANGUAGE',
          tags: ['ICON', 'UI', 'VECTOR'],
          image: 'https://picsum.photos/seed/sys_icon/600/400'
        }
    ]
  },
  {
    id: 'work-marketing',
    title: 'INFORMATION STRUCTURES',
    category: 'Maps / Infographics / Packaging',
    year: '2024',
    role: 'VISUAL DESIGNER',
    client: 'STATUS: SELF-INITIATED RESEARCH',
    description: 'Systematic explorations in modular geometry and visual logic.',
    content: [
      "A series of rule-based experiments defining new visual systems.",
      "Focusing on the translation of complex data into accessible visual narratives through spatial organization."
    ],
    // Replace images with modules for subsections
    modules: [
        {
          id: 'maps',
          title: 'SPATIAL_MAPS',
          description: 'CARTOGRAPHIC SYSTEMS',
          tags: ['WAYFINDING', 'TOPOGRAPHY'],
          image: 'https://picsum.photos/seed/maps_1/600/400'
        },
        {
          id: 'infographics',
          title: 'DATA_VIS',
          description: 'COMPLEX DATA SYNTHESIS',
          tags: ['QUANTITATIVE', 'FLOW'],
          image: 'https://picsum.photos/seed/info_1/600/400'
        },
        {
          id: 'packaging',
          title: 'PACK_SYS',
          description: 'PHYSICAL INFORMATION ARCHITECTURE',
          tags: ['TACTILE', 'UNBOXING'],
          image: 'https://picsum.photos/seed/pack_1/600/400'
        }
    ]
  },
  {
    id: 'work-motion',
    title: 'MOTION SYSTEMS',
    category: 'Loops / Patterns / Generative',
    year: '2023',
    role: 'MOTION DESIGNER',
    client: 'STATUS: SELF-INITIATED RESEARCH',
    description: 'Systematic explorations in modular geometry and visual logic.',
    content: [
      "A series of rule-based experiments defining new visual systems.",
      "Exploring the temporal dimension of static systems through repetition, rhythm, and procedural generation."
    ],
    // New modules for GIF grid
    modules: [
        {
          id: 'loop-01',
          title: 'KINETIC_01',
          description: '[SYSTEM_TYPE: RHYTHMIC_LOOP]',
          tags: ['GENERATIVE', 'PHYSICS'],
          image: 'https://picsum.photos/seed/motion_gif_1/400/400' 
        },
        {
          id: 'loop-02',
          title: 'FLUID_SIM',
          description: '[ENGINE: PARTICLE_FLOW]',
          tags: ['SIMULATION', 'NOISE'],
          image: 'https://picsum.photos/seed/motion_gif_2/400/400' 
        },
        {
          id: 'loop-03',
          title: 'GRID_PULSE',
          description: '[BEHAVIOR: REACTIVE]',
          tags: ['AUDIO', 'VISUALIZER'],
          image: 'https://picsum.photos/seed/motion_gif_3/400/400' 
        }
    ],
    videos: [
        '_Qt3sRB3gh4', // Main video
        '1mDwq-1DYBs', // Short
        'JpTWv7R63s0'  // Short/Video
    ]
  },
  {
    id: 'work-personal',
    title: 'NARRATIVE ARCHIVES',
    category: 'Memory / Documentation / Portrait',
    year: 'ONGOING',
    role: 'ARCHIVIST',
    client: 'STATUS: SELF-INITIATED RESEARCH',
    description: 'Systematic explorations in modular geometry and visual logic.',
    content: [
      "A series of rule-based experiments defining new visual systems.",
      "Documenting personal narratives through repeatable visual motifs and structured composition."
    ],
    images: [
      "https://picsum.photos/seed/p_10/600/600",
      "https://picsum.photos/seed/p_24/600/600",
      "https://picsum.photos/seed/p_56/600/600",
      "https://picsum.photos/seed/p_42/600/600",
      "https://picsum.photos/seed/p_99/600/600",
      "https://picsum.photos/seed/p_11/600/600",
      "https://picsum.photos/seed/p_73/600/600",
      "https://picsum.photos/seed/p_88/600/600",
      "https://picsum.photos/seed/p_12/600/600",
      "https://picsum.photos/seed/p_13/600/600"
    ]
  },
  {
    id: 'work-spatial',
    title: 'SPATIAL NARRATIVES',
    category: 'Scenography / 3D Concepts',
    year: '2022',
    role: 'CONCEPT ARTIST',
    client: 'STATUS: SELF-INITIATED RESEARCH',
    description: 'Systematic explorations in modular geometry and visual logic.',
    content: [
      "A series of rule-based experiments defining new visual systems.",
      "Extruding 2D visual logic into 3D environments to test spatial coherence."
    ],
    images: [
      "https://picsum.photos/seed/spatial_1/1200/800",
      "https://picsum.photos/seed/spatial_2/1200/800",
      "https://picsum.photos/seed/spatial_3/1200/800"
    ]
  }
];
