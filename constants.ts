
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
    description: 'Large-scale curriculum publishing requires more than strong visuals. It requires structured systems.',
    fullDescription: 'I design illustration frameworks that maintain character consistency, environmental logic, and scalable visual rules across dozens of titles.',
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
    title: 'Style & Asset Architecture',
    subtitle: 'SYNTHETIC',
    description: 'To maintain cohesion across multiple books and teams, I developed shared style libraries, reference boards, and adaptive layout logic.',
    fullDescription: 'These systems reduce visual drift and allow AI-assisted assets to integrate seamlessly into existing design structures.',
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
    description: 'AI tools were integrated into an existing publishing pipeline — not as replacements, but as accelerators.',
    fullDescription: 'From draft generation to quality control, the workflow balances automation with manual oversight to ensure production reliability.',
    content: [
      "The working structure followed: Storyboard → Controlled prompt drafting → AI generation → Manual correction → Layout integration → Final asset export.",
      "This process allowed experimentation while respecting editorial schedules and print requirements.",
      "Automation supported the work. It did not override design judgment."
    ],
    tags: ['Pipeline Integration', 'Manual Correction', 'Print Ready']
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
    <p style="font-size:18px;line-height:1.75;color:#57534e;margin:0 0 12px;">
      This project documents how I built, deployed, and optimized yuqilu.com through generative tools, structured prompts, and a controlled deployment pipeline — without writing code manually.
    </p>
    <p style="font-size:18px;line-height:1.75;color:#57534e;margin:0;">
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
        <p style="font-size:15px;font-weight:600;color:#1D3557;margin:0;">Netlify</p>
      </div>
    </div>
  </div>

  <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#a8a29e;margin:0 0 12px;text-transform:uppercase;">System Architecture</p>
  <p style="font-size:16px;color:#78716c;margin:0 0 24px;">Prompt → Generate → Version → Deploy → Domain</p>

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
      <p style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#a8a29e;margin:8px 0 0;text-transform:uppercase;">Netlify — auto deploy + AI agent</p>
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
          <td style="padding:16px 18px;font-size:14px;color:#78716c;">Netlify</td>
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
      <p style="font-size:11px;color:#a8a29e;margin:2px 0 0;">Wix subscription → Netlify free</p>
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
    <p style="font-size:16px;line-height:1.7;color:#78716c;margin:0;">
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
    title: 'PERSONAL WORK',
    category: 'Self-Initiated Work',
    year: 'Ongoing Series',
    role: 'Illustrator & Visual Designer',
    description: 'Character studies and stylized pet illustrations',
    client: 'Independent Project',
    content: [
      "This collection brings together a series of self-initiated illustrations focused on character personality, color structure, and simplified form.",
      "The work explores how geometry and texture can coexist — combining bold color contrast with soft surface details to create expressive yet structured compositions.",
      "Each piece functions both as a finished illustration and as part of an ongoing visual study, refining proportion, rhythm, and material quality across a consistent system."
    ],
    images: [
      "https://picsum.photos/seed/10/800/600",
      "https://picsum.photos/seed/24/800/600",
      "https://picsum.photos/seed/56/800/600",
      "https://picsum.photos/seed/42/800/600",
      "https://picsum.photos/seed/99/800/600",
      "https://picsum.photos/seed/11/800/600",
      "https://picsum.photos/seed/73/800/600",
      "https://picsum.photos/seed/88/800/600"
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
