import { create } from "zustand";
import type { Genre, SkillLevel, Technique } from "../types/drill";

interface DrillFilterState {
  moduleId: string | null;
  genre: Genre | null;
  technique: Technique | null;
  skillLevel: SkillLevel | null;
  setModuleId: (id: string | null) => void;
  setGenre: (genre: Genre | null) => void;
  setTechnique: (technique: Technique | null) => void;
  setSkillLevel: (level: SkillLevel | null) => void;
  resetFilters: () => void;
}

export const useDrillStore = create<DrillFilterState>((set) => ({
  moduleId: null,
  genre: null,
  technique: null,
  skillLevel: null,
  setModuleId: (moduleId) => set({ moduleId }),
  setGenre: (genre) => set({ genre }),
  setTechnique: (technique) => set({ technique }),
  setSkillLevel: (skillLevel) => set({ skillLevel }),
  resetFilters: () => set({ moduleId: null, genre: null, technique: null, skillLevel: null }),
}));
