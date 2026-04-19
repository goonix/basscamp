export type FretboardHighlightMode =
  | "none"
  | "chromatic"
  | "scale"
  | "intervals"
  | "pattern";

export interface FretPosition {
  string: number;
  fret: number;
  label: string;
}

export interface FretPattern {
  name: string;
  positions: FretPosition[];
}

export interface FretboardState {
  /** Low to high, e.g. ["E", "A", "D", "G"] */
  tuning: string[];
  fretCount: number;
  rootNote: string | null;
  highlightMode: FretboardHighlightMode;
  /** Scale name, e.g. "major", "minor-pentatonic" */
  highlightScale: string | null;
  highlightPattern: FretPattern | null;
}
