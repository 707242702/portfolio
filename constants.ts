
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
    description: 'From hand-drawn storyboards to AI-integrated visual systems — a 72-book evolution.',
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
      From Hand-Drawn Storyboards to AI-Integrated Visual Systems
    </p>
    <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0 0 12px;">
      Before integrating AI, I personally hand-drew 30\u201340 storyboard books. Each book required character blocking, scene composition planning, emotional direction, and spatial pacing across pages. This phase built a strong narrative and compositional foundation.
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
      <p style="font-size:12px;color:#78716c;margin:0;line-height:1.6;">30\u201340 storyboard books drawn manually. Full narrative control.</p>
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
      <p style="font-size:12px;color:#78716c;margin:0;line-height:1.6;">Customized GPT prompt system. Storyboard phase eliminated.</p>
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
        <p style="font-size:12px;font-weight:600;color:#1D3557;margin:0 0 4px;">Academic Doc</p>
        <p style="font-size:10px;color:#a8a29e;margin:0;">Structured manuscript</p>
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
        <p style="font-size:10px;color:#a8a29e;margin:0;">Final asset export</p>
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
    </div>
  </div>

  <!-- ==================== 2. TEXTURE COMPARISON ==================== -->
  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:24px;border-radius:2px;margin-bottom:16px;">
    <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:700;">Texture & Brush Rules \u2014 Controlled Imperfection</p>
    <p style="font-size:14px;color:#1D3557;font-weight:500;margin:0 0 16px;">MidJourney outputs were too smooth. The 30% refinement is not cosmetic\u200a\u2014\u200ait is precise artistic control.</p>

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
      Over multiple iterations, the system evolved from manual storyboarding to a scalable AI-assisted production model embedded within a traditional publishing pipeline. The most complex challenge was not illustration refinement \u2014 it was designing and stabilizing the prompt architecture that ensured character consistency across books.
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

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;margin-bottom:32px;backdrop-filter:blur(4px);">
    <p style="font-size:20px;font-weight:500;line-height:1.55;color:#1D3557;margin:0 0 16px;">
      How the System is Organized
    </p>
    <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0;">
      To maintain cohesion across 72 books and multiple illustrators, I developed a structured asset architecture \u2014 shared character libraries, prompt systems, and standardized layout templates that reduce visual drift and make consistency measurable rather than intuitive.
    </p>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">System Components</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:48px;">
    <div style="padding:28px;border:1px solid #D9D9D9;border-radius:2px 0 0 0;background:rgba(255,255,255,0.4);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#EB431D;margin:0 0 16px;text-transform:uppercase;font-weight:600;">01 \u2014 Character Library</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 8px;">Front-facing references only</p>
      <p style="font-size:13px;color:#78716c;line-height:1.7;margin:0;">No standardized side/back views. No rigid pose sheets. Identity is maintained via the prompt system rather than traditional model sheets. This approach trades exhaustive documentation for scalable prompt-based consistency.</p>
    </div>
    <div style="padding:28px;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 0 0;background:rgba(255,255,255,0.4);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1156D0;margin:0 0 16px;text-transform:uppercase;font-weight:600;">02 \u2014 Prompt Architecture</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 8px;">Customized GPT converts documents to prompts</p>
      <p style="font-size:13px;color:#78716c;line-height:1.7;margin:0;">Academic Designer document \u2192 page-specific structured prompts. Each prompt contains character specification, scene instruction, emotional tone, environment detail, and age-appropriate context. This replaces manual prompt writing entirely.</p>
    </div>
    <div style="padding:28px;border:1px solid #D9D9D9;border-top:none;border-radius:0 0 0 2px;background:rgba(255,255,255,0.4);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 16px;text-transform:uppercase;font-weight:600;">03 \u2014 Layout System</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 8px;">7 page layout types</p>
      <p style="font-size:13px;color:#78716c;line-height:1.7;margin:0;">InDesign templates provided by in-house designers. Image-first generation with text added later in layout phase. Layout complexity intentionally minimal for K\u2013K2 age range.</p>
    </div>
    <div style="padding:28px;border:1px solid #D9D9D9;border-left:none;border-top:none;border-radius:0 0 2px 0;background:rgba(255,255,255,0.4);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#F3B013;margin:0 0 16px;text-transform:uppercase;font-weight:600;">04 \u2014 Asset Pipeline</p>
      <p style="font-size:14px;font-weight:500;color:#1D3557;margin:0 0 8px;">Generation \u2192 Refinement \u2192 Integration</p>
      <p style="font-size:13px;color:#78716c;line-height:1.7;margin:0;">AI-generated assets flow through Figma for illustrator refinement (3 revision rounds), then to Smartsheet for review by Designer + Academic Designer, and finally to the in-house team for layout integration.</p>
    </div>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Prompt Structure</p>

  <div style="background:rgba(0,0,0,0.03);border:1px solid #D9D9D9;padding:24px;border-radius:2px;margin-bottom:48px;font-family:'JetBrains Mono',monospace;">
    <p style="font-size:11px;color:#a8a29e;margin:0 0 16px;letter-spacing:0.1em;">// GENERATED PROMPT TEMPLATE</p>
    <div style="display:grid;grid-template-columns:120px 1fr;gap:8px;font-size:12px;">
      <span style="color:#1156D0;font-weight:600;">CHARACTER:</span>
      <span style="color:#1D3557;">[name], [skin_tone], [hair], [clothing], [age], [personality]</span>
      <span style="color:#1156D0;font-weight:600;">SCENE:</span>
      <span style="color:#1D3557;">[location], [action], [objects], [background_elements]</span>
      <span style="color:#1156D0;font-weight:600;">EMOTION:</span>
      <span style="color:#1D3557;">[mood], [facial_expression], [body_language]</span>
      <span style="color:#1156D0;font-weight:600;">ENVIRONMENT:</span>
      <span style="color:#1D3557;">[indoor/outdoor], [palette_ref], [lighting_direction]</span>
      <span style="color:#1156D0;font-weight:600;">CONTEXT:</span>
      <span style="color:#1D3557;">[age_range: K-K2], [educational_goal], [page_number]</span>
    </div>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Version Evolution</p>

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;margin-bottom:48px;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.1);">
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">Version</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">Method</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">AI Involvement</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1D3557;">v1.0</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Fully Hand-drawn Storyboard</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">None</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1D3557;">v2.0</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">AI Image + Hand Sketch Hybrid</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Reference generation</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1D3557;">v3.0</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">AI 70% + Manual Refinement</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Draft generation</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1156D0;">v3.5</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Customized GPT Prompt System</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Automated prompt generation</td>
        </tr>
        <tr>
          <td style="padding:16px 18px;font-size:14px;font-weight:600;color:#1A824E;">v4.0</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Streamlined Production</td>
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Storyboard phase eliminated</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Key Metrics</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:28px;font-weight:700;color:#1D3557;margin:0;">7</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Layout types</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:28px;font-weight:700;color:#1156D0;margin:0;">5</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Prompt parameters</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:28px;font-weight:700;color:#1A824E;margin:0;">4</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Version iterations</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:28px;font-weight:700;color:#EB431D;margin:0;">0</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Manual prompts</p>
    </div>
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

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:32px;border-radius:2px;margin-bottom:32px;backdrop-filter:blur(4px);">
    <p style="font-size:20px;font-weight:500;line-height:1.55;color:#1D3557;margin:0 0 16px;">
      AI Integrated into Traditional Publishing
    </p>
    <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0 0 12px;">
      AI tools were integrated into an existing publishing pipeline \u2014 not as replacements, but as accelerators. From draft generation to quality control, the workflow balances automation with manual oversight to ensure production reliability.
    </p>
    <p style="font-family:Georgia,serif;font-size:18px;line-height:1.75;color:#57534e;margin:0;">
      Automation supported the work. It did not override design judgment.
    </p>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Step-by-Step Pipeline</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:48px;">
    <div style="border:1px solid #D9D9D9;border-radius:2px 0 0 0;">
      <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,0.05);display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1156D0;flex-shrink:0;width:24px;">01</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">Academic Designer provides manuscript</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">Structured document with educational content</p>
        </div>
      </div>
      <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,0.05);display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1156D0;flex-shrink:0;width:24px;">02</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">Upload to Customized GPT</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">Document parsed by trained model</p>
        </div>
      </div>
      <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,0.05);display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1156D0;flex-shrink:0;width:24px;">03</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">GPT generates structured prompts</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">Per-page prompts with character + scene data</p>
        </div>
      </div>
      <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,0.05);display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1156D0;flex-shrink:0;width:24px;">04</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">Prompts to Nanobanana</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">Single-page illustration generation</p>
        </div>
      </div>
      <div style="padding:20px 24px;display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1156D0;flex-shrink:0;width:24px;">05</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">Import to Figma</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">AI outputs staged for refinement</p>
        </div>
      </div>
    </div>
    <div style="border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;">
      <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,0.05);display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1A824E;flex-shrink:0;width:24px;">06</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">Illustrator refinement</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">3 revision rounds \u2014 texture, composition, errors</p>
        </div>
      </div>
      <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,0.05);display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1A824E;flex-shrink:0;width:24px;">07</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">Upload to Smartsheet</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">Tracking and status management</p>
        </div>
      </div>
      <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,0.05);display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1A824E;flex-shrink:0;width:24px;">08</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">Review cycle</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">Designer + Academic Designer approval</p>
        </div>
      </div>
      <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,0.05);display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1A824E;flex-shrink:0;width:24px;">09</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">Final asset export</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">Print-ready file preparation</p>
        </div>
      </div>
      <div style="padding:20px 24px;display:flex;align-items:flex-start;gap:16px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;color:#1A824E;flex-shrink:0;width:24px;">10</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:#1D3557;margin:0 0 2px;">Layout integration</p>
          <p style="font-size:12px;color:#a8a29e;margin:0;">In-house design team finalizes in InDesign</p>
        </div>
      </div>
    </div>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Efficiency Impact</p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;margin-bottom:48px;">
    <div style="padding:28px;border:1px solid #D9D9D9;border-radius:2px 0 0 2px;background:rgba(0,0,0,0.02);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#c0392b;margin:0 0 20px;text-transform:uppercase;font-weight:600;">Previous Pipeline</p>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="font-size:12px;color:#78716c;background:rgba(0,0,0,0.05);padding:6px 12px;border-radius:2px;">Manual Storyboard</span>
        <span style="color:#a8a29e;font-size:14px;">\u2192</span>
        <span style="font-size:12px;color:#78716c;background:rgba(0,0,0,0.05);padding:6px 12px;border-radius:2px;">Manual Sketch</span>
        <span style="color:#a8a29e;font-size:14px;">\u2192</span>
        <span style="font-size:12px;color:#78716c;background:rgba(0,0,0,0.05);padding:6px 12px;border-radius:2px;">Refinement</span>
        <span style="color:#a8a29e;font-size:14px;">\u2192</span>
        <span style="font-size:12px;color:#78716c;background:rgba(0,0,0,0.05);padding:6px 12px;border-radius:2px;">Final</span>
      </div>
      <p style="font-size:12px;color:#a8a29e;margin:16px 0 0;font-style:italic;">Multiple manual phases before production</p>
    </div>
    <div style="padding:28px;border:1px solid #D9D9D9;border-left:none;border-radius:0 2px 2px 0;background:rgba(255,255,255,0.3);">
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;color:#1A824E;margin:0 0 20px;text-transform:uppercase;font-weight:600;">Current Pipeline</p>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="font-size:12px;color:#1D3557;font-weight:500;background:rgba(26,130,78,0.08);padding:6px 12px;border-radius:2px;">AI Draft (70%)</span>
        <span style="color:#a8a29e;font-size:14px;">\u2192</span>
        <span style="font-size:12px;color:#1D3557;font-weight:500;background:rgba(26,130,78,0.08);padding:6px 12px;border-radius:2px;">Refinement Only</span>
        <span style="color:#a8a29e;font-size:14px;">\u2192</span>
        <span style="font-size:12px;color:#1D3557;font-weight:500;background:rgba(26,130,78,0.08);padding:6px 12px;border-radius:2px;">Final</span>
      </div>
      <p style="font-size:12px;color:#1A824E;margin:16px 0 0;font-weight:500;">Storyboard phase eliminated entirely</p>
    </div>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Tool Ecosystem</p>

  <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;border-radius:2px;overflow:hidden;margin-bottom:48px;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.1);">
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">Tool</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">Phase</th>
          <th style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;text-align:left;padding:14px 18px;color:#a8a29e;font-weight:500;">Function</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:14px 18px;font-size:14px;font-weight:600;color:#1D3557;">Customized GPT</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Pre-production</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Document parsing \u2192 structured prompts</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:14px 18px;font-size:14px;font-weight:600;color:#1D3557;">Nanobanana</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Generation</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Single-page AI illustration</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:14px 18px;font-size:14px;font-weight:600;color:#1D3557;">Figma</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Refinement</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Illustrator correction workspace</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(0,0,0,0.05);">
          <td style="padding:14px 18px;font-size:14px;font-weight:600;color:#1D3557;">Smartsheet</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Management</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Progress tracking + review workflow</td>
        </tr>
        <tr>
          <td style="padding:14px 18px;font-size:14px;font-weight:600;color:#1D3557;">InDesign</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Final Output</td>
          <td style="padding:14px 18px;font-size:14px;color:#78716c;">Print-ready layout integration</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Critical Insight</p>

  <div style="background:rgba(17,86,208,0.05);border:1px solid #D9D9D9;border-left:3px solid #1156D0;padding:28px 28px 28px 32px;border-radius:2px;margin-bottom:48px;">
    <p style="font-size:16px;font-weight:500;color:#1D3557;margin:0 0 12px;">
      The bottleneck is not illustration refinement.
    </p>
    <p style="font-family:Georgia,serif;font-size:15px;line-height:1.75;color:#78716c;margin:0;">
      The most complex phase is designing and stabilizing the Customized GPT prompt architecture. Once stabilized, generation scales linearly. The system investment is front-loaded \u2014 prompt engineering is the true production bottleneck, not artistic execution.
    </p>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 16px;text-transform:uppercase;">Outcome</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#1A824E;margin:0;">70%</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">AI completion rate</p>
      <p style="font-size:11px;color:#a8a29e;margin:2px 0 0;">Per illustration</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#1156D0;margin:0;">10</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Pipeline steps</p>
      <p style="font-size:11px;color:#a8a29e;margin:2px 0 0;">End-to-end workflow</p>
    </div>
    <div style="background:rgba(255,255,255,0.4);border:1px solid #D9D9D9;padding:20px;border-radius:2px;text-align:center;">
      <p style="font-size:32px;font-weight:700;color:#EB431D;margin:0;">3</p>
      <p style="font-size:12px;color:#78716c;margin:4px 0 0;">Revision rounds</p>
      <p style="font-size:11px;color:#a8a29e;margin:2px 0 0;">Per illustration</p>
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
    category: 'Maps / Books / Packaging',
    year: '2024',
    role: 'VISUAL DESIGNER',
    client: 'STATUS: SELF-INITIATED RESEARCH',
    description: 'Systematic explorations in modular geometry and visual logic.',
    content: [
      "A series of rule-based experiments defining new visual systems.",
      "Focusing on the translation of complex data into accessible visual narratives through spatial organization."
    ],
    images: [
      "https://picsum.photos/seed/info_1/1200/800",
      "https://picsum.photos/seed/info_2/1200/800",
      "https://picsum.photos/seed/info_3/1200/800",
      "https://picsum.photos/seed/info_4/1200/800"
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
