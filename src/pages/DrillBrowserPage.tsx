import { useMemo } from "react";
import type { DrillCatalogEntry } from "../types/drill";
import { useDrillStore } from "../store/drillStore";
import { DrillCard } from "../components/drills/DrillCard";
import { DrillFilters } from "../components/drills/DrillFilters";
import { EmptyState } from "../components/ui/EmptyState";
import catalogJson from "../../drills/index.json";

const catalog = catalogJson as DrillCatalogEntry[];

export function DrillBrowserPage() {
  const { moduleId, genre, technique, skillLevel } = useDrillStore();

  const filtered = useMemo(() => {
    return catalog.filter((d) => {
      if (moduleId && d.moduleId !== moduleId) return false;
      if (skillLevel && d.skillLevel !== skillLevel) return false;
      if (genre && !d.genre.includes(genre)) return false;
      if (technique && !d.technique.includes(technique)) return false;
      return true;
    });
  }, [moduleId, genre, technique, skillLevel]);

  const isFiltered = moduleId || genre || technique || skillLevel;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Drills</h1>
        <p className="text-gray-400 mt-2">
          Practical exercises organized by module, genre, and technique.
        </p>
      </div>

      <DrillFilters catalog={catalog} />

      {filtered.length === 0 ? (
        <EmptyState
          title="No drills match those filters"
          description="Try clearing some filters to see more results."
        />
      ) : (
        <>
          <p className="text-xs text-gray-600 -mb-4">
            {filtered.length} drill{filtered.length !== 1 ? "s" : ""}
            {isFiltered ? " match your filters" : ""}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((drill) => (
              <DrillCard key={drill.id} drill={drill} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
