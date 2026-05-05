/**
 * Pure music theory functions for the fretboard visualizer and reference features.
 * All functions are stateless and side-effect-free for easy testing.
 */

export const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

/** Semitone offsets for standard bass tuning (low to high: E A D G) */
export const STANDARD_TUNING_SEMITONES: readonly number[] = [4, 9, 2, 7];

/** Semitone offset from C for each open string name */
const NOTE_TO_SEMITONE: Record<string, number> = {
  C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
  "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
};

/**
 * Returns the pitch class (0–11, where 0 = C) of the note at a given
 * string and fret position.
 *
 * @param openStringSemitone - semitone of the open string (0 = C, 4 = E, etc.)
 * @param fret - fret number (0 = open)
 */
export function getPitchClass(openStringSemitone: number, fret: number): number {
  return (openStringSemitone + fret) % 12;
}

/**
 * Returns the note name for a given pitch class.
 * Always returns the sharp spelling (e.g. "F#" not "Gb").
 */
export function pitchClassToName(pitchClass: number): NoteName {
  return NOTE_NAMES[((pitchClass % 12) + 12) % 12];
}

/**
 * Returns the semitone offset (0–11) for a note name string.
 * Accepts sharp spellings only (e.g. "F#", not "Gb").
 */
export function noteNameToSemitone(note: string): number {
  const semitone = NOTE_TO_SEMITONE[note];
  if (semitone === undefined) {
    throw new Error(`Unknown note name: "${note}"`);
  }
  return semitone;
}

/**
 * Returns the note name at a specific fret on a string, given the open-string note name.
 */
export function getNoteAtFret(openStringNote: string, fret: number): NoteName {
  const openSemitone = noteNameToSemitone(openStringNote);
  const pitchClass = getPitchClass(openSemitone, fret);
  return pitchClassToName(pitchClass);
}

/**
 * Returns the set of pitch classes active in a scale, given a root note and
 * an interval pattern (semitones from root).
 *
 * @example getScalePitchClasses("G", [0, 2, 4, 5, 7, 9, 11]) // G major
 */
export function getScalePitchClasses(
  rootNote: string,
  intervals: number[]
): Set<number> {
  const rootSemitone = noteNameToSemitone(rootNote);
  return new Set(intervals.map((interval) => (rootSemitone + interval) % 12));
}

/**
 * Returns the interval name (e.g. "b3", "5", "R") for a pitch class within
 * a scale, or null if the pitch class is not in the scale.
 *
 * @param intervals - semitone offsets from root for each scale degree
 * @param intervalNames - parallel name array (e.g. ["R","2","b3","4","5","b7"])
 */
export function getScaleIntervalName(
  rootNote: string,
  pitchClass: number,
  intervals: number[],
  intervalNames: string[],
): string | null {
  const rootSemitone = noteNameToSemitone(rootNote);
  const semitoneDistance = ((pitchClass - rootSemitone) + 12) % 12;
  const idx = intervals.indexOf(semitoneDistance);
  return idx >= 0 ? (intervalNames[idx] ?? null) : null;
}

/**
 * Returns whether a pitch class is the root note.
 */
export function isRootNote(rootNote: string, pitchClass: number): boolean {
  return noteNameToSemitone(rootNote) === pitchClass;
}

/**
 * Converts a tuning string array (e.g. ["E","A","D","G"]) to semitone offsets.
 */
export function tuningToSemitones(tuning: string[]): number[] {
  return tuning.map(noteNameToSemitone);
}

/**
 * Returns an ordered list of all notes at each fret position for a given string.
 *
 * @param openStringNote - e.g. "E"
 * @param fretCount - how many frets to include (0 through fretCount)
 */
export function getStringNotes(
  openStringNote: string,
  fretCount: number
): NoteName[] {
  return Array.from({ length: fretCount + 1 }, (_, fret) =>
    getNoteAtFret(openStringNote, fret)
  );
}

/**
 * Named scale interval patterns (semitones from root).
 * Used by the fretboard visualizer and reference page.
 */
export const SCALES: Record<string, { intervals: number[]; intervalNames: string[] }> = {
  major: {
    intervals: [0, 2, 4, 5, 7, 9, 11],
    intervalNames: ["R", "2", "3", "4", "5", "6", "7"],
  },
  "natural-minor": {
    intervals: [0, 2, 3, 5, 7, 8, 10],
    intervalNames: ["R", "2", "b3", "4", "5", "b6", "b7"],
  },
  "minor-pentatonic": {
    intervals: [0, 3, 5, 7, 10],
    intervalNames: ["R", "b3", "4", "5", "b7"],
  },
  "major-pentatonic": {
    intervals: [0, 2, 4, 7, 9],
    intervalNames: ["R", "2", "3", "5", "6"],
  },
  blues: {
    intervals: [0, 3, 5, 6, 7, 10],
    intervalNames: ["R", "b3", "4", "b5", "5", "b7"],
  },
  dorian: {
    intervals: [0, 2, 3, 5, 7, 9, 10],
    intervalNames: ["R", "2", "b3", "4", "5", "6", "b7"],
  },
  mixolydian: {
    intervals: [0, 2, 4, 5, 7, 9, 10],
    intervalNames: ["R", "2", "3", "4", "5", "6", "b7"],
  },
};
