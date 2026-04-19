export type Genre =
  | "funk"
  | "rnb"
  | "soul"
  | "rock"
  | "pop"
  | "jazz"
  | "blues"
  | "general";

export type Technique =
  | "fingerstyle"
  | "slap"
  | "pick"
  | "muting"
  | "ghost-notes"
  | "slides"
  | "hammer-ons"
  | "walking"
  | "groove"
  | "chord-tones";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface TabBlock {
  label: string;
  /** Raw ASCII tab string, rendered monospace */
  content: string;
}

export interface DrillVariation {
  label: string;
  tab: TabBlock;
}

export interface Drill {
  id: string;
  title: string;
  moduleId: string;
  skillLevel: SkillLevel;
  genre: Genre[];
  technique: Technique[];
  topics: string[];
  bpm: number | null;
  timeSignature: string;
  description: string;
  instructions: string[];
  tab: TabBlock[];
  variations: DrillVariation[];
  ensembleNotes: string | null;
}

/** Lightweight entry in drills/index.json — no tab content */
export interface DrillCatalogEntry {
  id: string;
  title: string;
  moduleId: string;
  skillLevel: SkillLevel;
  genre: Genre[];
  technique: Technique[];
  topics: string[];
  bpm: number | null;
  timeSignature: string;
  description: string;
}
