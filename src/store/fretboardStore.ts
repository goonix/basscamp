import { create } from "zustand";
import type { FretboardState, FretboardHighlightMode } from "../types/fretboard";

interface FretboardStore extends FretboardState {
  setRootNote: (note: string | null) => void;
  setHighlightMode: (mode: FretboardHighlightMode) => void;
  setHighlightScale: (scale: string | null) => void;
  setFretCount: (count: number) => void;
}

export const useFretboardStore = create<FretboardStore>((set) => ({
  tuning: ["E", "A", "D", "G"],
  fretCount: 12,
  rootNote: null,
  highlightMode: "none",
  highlightScale: "major",
  highlightPattern: null,
  setRootNote: (rootNote) => set({ rootNote }),
  setHighlightMode: (highlightMode) => set({ highlightMode }),
  setHighlightScale: (highlightScale) => set({ highlightScale }),
  setFretCount: (fretCount) => set({ fretCount }),
}));
