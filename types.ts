
export enum Section {
  HOME = 'HOME',
  AI = 'AI',
  WORK = 'WORK',
  ABOUT = 'ABOUT',
  DETAIL = 'DETAIL' // Used for both Work and AI details to clear the center
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  description: string;
  content: string[]; // Array of paragraphs for the mockup
  videos?: string[]; // Array of YouTube Video IDs
  images?: string[]; // Array of Image URLs
  client?: string;   // Optional client name override
}

export interface AiItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  content: string[];
  tags: string[];
  metrics?: { label: string; value: string }[];
  customHtml?: string;
}

export interface PathDefinition {
  id: string;
  color: string;
  // label property removed as requested
  d: Record<Section, string>;
  zIndex: number;
}

export interface NavItem {
  id: Section;
  label: string;
}
