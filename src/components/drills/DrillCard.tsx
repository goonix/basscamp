import { Link } from "react-router-dom";
import type { DrillCatalogEntry } from "../../types/drill";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

const SKILL_BADGE: Record<string, "green" | "yellow" | "red"> = {
  beginner: "green",
  intermediate: "yellow",
  advanced: "red",
};

const MODULE_LABELS: Record<string, string> = {
  "mod-01": "Mod 1",
  "mod-02": "Mod 2",
  "mod-03": "Mod 3",
  "mod-04": "Mod 4",
  "mod-05": "Mod 5",
  "mod-06": "Mod 6",
  "mod-07": "Mod 7",
};

interface DrillCardProps {
  drill: DrillCatalogEntry;
}

export function DrillCard({ drill }: DrillCardProps) {
  return (
    <Link to={`/drills/${drill.id}`}>
      <Card hover className="p-5 h-full flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-100 text-sm leading-snug">
            {drill.title}
          </h3>
          <Badge variant={SKILL_BADGE[drill.skillLevel] ?? "default"} className="shrink-0">
            {drill.skillLevel}
          </Badge>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">
          {drill.description}
        </p>

        <div className="flex flex-wrap gap-1.5 items-center">
          <Badge variant="violet">{MODULE_LABELS[drill.moduleId] ?? drill.moduleId}</Badge>
          {drill.genre.filter((g) => g !== "general").map((g) => (
            <Badge key={g} variant="default">{g}</Badge>
          ))}
          {drill.bpm && (
            <span className="text-xs text-gray-600 ml-auto">{drill.bpm} BPM</span>
          )}
        </div>
      </Card>
    </Link>
  );
}
