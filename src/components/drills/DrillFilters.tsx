import type { DrillCatalogEntry, Genre, SkillLevel, Technique } from "../../types/drill";
import { useDrillStore } from "../../store/drillStore";

const selectClass =
  "bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-md px-2 py-1.5 focus:outline-none focus:border-violet-500 transition-colors";

interface DrillFiltersProps {
  catalog: DrillCatalogEntry[];
}

export function DrillFilters({ catalog }: DrillFiltersProps) {
  const { moduleId, genre, technique, skillLevel, setModuleId, setGenre, setTechnique, setSkillLevel, resetFilters } =
    useDrillStore();

  const isFiltered = moduleId || genre || technique || skillLevel;

  const modules = [...new Set(catalog.map((d) => d.moduleId))].sort();
  const genres = [...new Set(catalog.flatMap((d) => d.genre))].sort() as Genre[];
  const techniques = [...new Set(catalog.flatMap((d) => d.technique))].sort() as Technique[];

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Module
        </label>
        <select
          value={moduleId ?? ""}
          onChange={(e) => setModuleId(e.target.value || null)}
          className={selectClass}
        >
          <option value="">All</option>
          {modules.map((id) => (
            <option key={id} value={id}>
              {id.replace("mod-0", "Module ").replace("mod-", "Module ")}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Skill level
        </label>
        <select
          value={skillLevel ?? ""}
          onChange={(e) => setSkillLevel((e.target.value as SkillLevel) || null)}
          className={selectClass}
        >
          <option value="">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Genre
        </label>
        <select
          value={genre ?? ""}
          onChange={(e) => setGenre((e.target.value as Genre) || null)}
          className={selectClass}
        >
          <option value="">All</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Technique
        </label>
        <select
          value={technique ?? ""}
          onChange={(e) => setTechnique((e.target.value as Technique) || null)}
          className={selectClass}
        >
          <option value="">All</option>
          {techniques.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>
      </div>

      {isFiltered && (
        <button
          onClick={resetFilters}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors pb-1.5 cursor-pointer"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
