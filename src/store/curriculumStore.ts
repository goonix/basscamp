import { create } from "zustand";
import type { CurriculumModule } from "../types/curriculum";
import modulesJson from "../../curriculum/index.json";

interface CurriculumStore {
  modules: CurriculumModule[];
  getModuleById: (id: string) => CurriculumModule | undefined;
  getModuleBySlug: (slug: string) => CurriculumModule | undefined;
}

export const useCurriculumStore = create<CurriculumStore>(() => ({
  modules: modulesJson as CurriculumModule[],
  getModuleById: (id) =>
    (modulesJson as CurriculumModule[]).find((m) => m.id === id),
  getModuleBySlug: (slug) =>
    (modulesJson as CurriculumModule[]).find((m) => m.slug === slug),
}));
