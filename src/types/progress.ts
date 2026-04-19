export interface PracticeSession {
  id: string;
  /** ISO 8601 date, e.g. "2026-04-05" */
  date: string;
  durationMinutes: number;
  topics: string[];
  drillsCompleted: string[];
  notes: string;
}

export type DrillRating =
  | 1 // needs work
  | 2 // getting it
  | 3; // solid

export interface DrillCompletion {
  drillId: string;
  /** ISO timestamp */
  completedAt: string;
  rating: DrillRating;
}

export interface ModuleProgress {
  moduleId: string;
  startedAt: string | null;
  completedAt: string | null;
  drillsCompleted: number;
  drillsTotal: number;
}

export interface UserPreferences {
  defaultTuning: "standard" | "drop-d" | "half-step-down";
  defaultFretCount: number;
  colorScheme: "light" | "dark" | "auto";
}
