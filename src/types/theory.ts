export interface Scale {
  name: string;
  /** Semitones from root, e.g. [0, 2, 4, 5, 7, 9, 11] */
  intervals: number[];
  /** Human-readable interval names, e.g. ["R","2","3","4","5","6","7"] */
  intervalNames: string[];
  modes?: string[];
  genreContext: string;
}

export type IntervalQuality =
  | "perfect"
  | "major"
  | "minor"
  | "augmented"
  | "diminished";

export interface IntervalDefinition {
  semitones: number;
  /** Abbreviated name, e.g. "P5" */
  shortName: string;
  /** Full name, e.g. "Perfect Fifth" */
  longName: string;
  quality: IntervalQuality;
  /** Distance in frets on the same string */
  fretDistance: number;
  soundDescription: string;
}
