
export enum Section {
  HOME = 'HOME',
  AI = 'AI',
  WORK = 'WORK',
  ABOUT = 'ABOUT',
  DETAIL = 'DETAIL' // Used for both Work and AI details to clear the center
}

export interface ColorSwatch {
  hex: string;
  role: string;
}

export interface ImageGroup {
  unitId: string;
  caption: string;
  images?: string[];
  imageLabels?: string[];
  videoSrc?: string;
  note?: string;
  annotation?: string;                              // Dashed-line label shown below image grid
  colorSwatches?: ColorSwatch[];                    // Interactive color palette
  detailCrop?: { src: string; label: string; imgTop: number; imgLeft: number }; // Zoomed crop annotation
  gridCols?: number;                                // Override column count: 1 | 2 (default) | 3 | 4
  heroLayout?: boolean;                             // 60:40 hero split — master left, distribution stack right
  deviceFrameSlots?: number[];                      // Image indices to wrap with phone device frame
  placeholderAspect?: string;                       // CSS aspect class for empty slots e.g. 'aspect-[16/9]'
  rightSlotAspect?: string;                         // Override aspect + force object-contain on heroLayout right-column slots
  splitLayout?: {                                    // Two-row layout: row1 uses square aspect, row2 uses 16:9 in N cols
    row1Count: number;
    row1Aspect: string;
    row2Count: number;
    row2Aspect: string;
    row2Cols?: number;
  };
  showFileLabel?: boolean;                          // Show FILE_NAME label + VIEW_ASSET_SPEC tooltip on hover
  hideTooltip?: boolean;                            // Suppress VIEW_ASSET_SPEC hover tooltip for this group
}

export interface ProjectModule {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  localVideos?: string[];
  localImages?: string[];
  localImageLabels?: string[];
  imageGroups?: ImageGroup[];
  tagline?: string;
  subHeader?: string;      // Secondary header line, e.g. "(Commercial_Infographic_Archive)"
  statusLabel?: string;    // Status label shown after the grid, triggers archive-strip grid mode
  gridMode?: string;       // 'spatial' → 4-col white-box grid; default → NumericCell
  processVideoId?: string; // YouTube video ID for [PROCESS_EVOLUTION] section
  specs?: { label: string; value: string }[];
  accentColor?: string;    // Per-module accent color for highlights, borders, nav
  sysLabel?: string;       // Override the auto-generated SYS_0X tab label, e.g. 'SYS_04.1'
}

export interface MotionAsset {
  id: string;
  src: string;
  type: 'mp4' | 'gif';
  idLabel: string;
  logLabel: string;
  span: 'full' | 'vertical' | 'default';
  module: 'A' | 'B' | 'C';
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
  modules?: ProjectModule[]; // New: Sub-sections/Modules
  accentColor?: string;      // Per-project accent color for nav hover
  focusLine?: string;        // Subtitle focus line shown in header area (e.g. "// FOCUS: ...")
  narrativeImage?: string;   // Left image for 60/40 narrative split section
  narrativeText?: string;    // Right text for 60/40 narrative split section
  imageIds?: string[];       // Archive ID labels for gallery images (e.g. "ATX_2227_GTR_01")
  motionAssets?: MotionAsset[];
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
