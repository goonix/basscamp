import { create } from "zustand";
import type { FretboardState, FretboardHighlightMode } from "../types/fretboard";

const TUNINGS: Record<4 | 5, string[]> = {
  4: ["E", "A", "D", "G"],
  5: ["B", "E", "A", "D", "G"],
};

interface FretboardStore extends FretboardState {
  stringCount: 4 | 5;
  setStringCount: (count: 4 | 5) => void;
  setRootNote: (note: string | null) => void;
  setHighlightMode: (mode: FretboardHighlightMode) => void;
  setHighlightScale: (scale: string | null) => void;
  setFretCount: (count: number) => void;
}

export const useFretboardStore = create<FretboardStore>((set) => ({
  stringCount: 4,
  tuning: TUNINGS[4],
  fretCount: 12,
  rootNote: null,
  highlightMode: "none",
  highlightScale: "major",
  highlightPattern: null,
  setStringCount: (count) => set({ stringCount: count, tuning: TUNINGS[count] }),
  setRootNote: (rootNote) => set({ rootNote }),
  setHighlightMode: (highlightMode) => set({ highlightMode }),
  setHighlightScale: (highlightScale) => set({ highlightScale }),
  setFretCount: (fretCount) => set({ fretCount }),
}));
