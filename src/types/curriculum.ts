export interface CurriculumModule {
  id: string;
  order: number;
  title: string;
  /** URL-safe slug, e.g. "fretboard-navigation" */
  slug: string;
  description: string;
  /** Path relative to project root, e.g. "curriculum/mod-01-fretboard.md" */
  markdownPath: string;
  drillIds: string[];
  learningGoals: string[];
}
