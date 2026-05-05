import { useParams, Link } from "react-router-dom";
import { useDrill } from "../hooks/useDrill";
import { TabDisplay } from "../components/drills/TabDisplay";
import { DrillCompletionButton } from "../components/drills/DrillCompletionButton";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";

const SKILL_BADGE: Record<string, "green" | "yellow" | "red"> = {
  beginner: "green",
  intermediate: "yellow",
  advanced: "red",
};

const MODULE_LABELS: Record<string, string> = {
  "mod-01": "Module 1",
  "mod-02": "Module 2",
  "mod-03": "Module 3",
  "mod-04": "Module 4",
  "mod-05": "Module 5",
  "mod-06": "Module 6",
  "mod-07": "Module 7",
};

export function DrillDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: drill, isLoading, error } = useDrill(id ?? "");

  if (isLoading) {
    return <p className="text-gray-500 animate-pulse text-sm">Loading drill…</p>;
  }

  if (error || !drill) {
    return (
      <EmptyState
        title="Drill not found"
        description={error instanceof Error ? error.message : "That drill doesn't exist."}
        action={
          <Link to="/drills" className="text-violet-400 hover:text-violet-300 text-sm">
            ← Back to Drills
          </Link>
        }
      />
    );
  }

  return (
    <div className="max-w-3xl space-y-10">
      {/* Header */}
      <div>
        <Link
          to="/drills"
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← Drills
        </Link>
        <h1 className="text-2xl font-bold text-gray-100 mt-4">{drill.title}</h1>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-2 mt-3 items-center">
          <Badge variant="violet">{MODULE_LABELS[drill.moduleId] ?? drill.moduleId}</Badge>
          <Badge variant={SKILL_BADGE[drill.skillLevel] ?? "default"}>
            {drill.skillLevel}
          </Badge>
          {drill.genre.filter((g) => g !== "general").map((g) => (
            <Badge key={g} variant="default">{g}</Badge>
          ))}
          {drill.technique.map((t) => (
            <Badge key={t} variant="default">{t.replace("-", " ")}</Badge>
          ))}
          {drill.bpm && (
            <span className="text-xs text-gray-500 ml-2">{drill.bpm} BPM · {drill.timeSignature}</span>
          )}
        </div>

        <p className="text-gray-400 mt-4 leading-relaxed">{drill.description}</p>
      </div>

      {/* Instructions */}
      {drill.instructions.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-200">Instructions</h2>
          <ol className="space-y-2">
            {drill.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="shrink-0 w-5 h-5 rounded-full bg-violet-900/50 border border-violet-700/50 text-violet-300 text-xs flex items-center justify-center font-semibold mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Tab */}
      {drill.tab.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-200">Tab</h2>
          <TabDisplay blocks={drill.tab} />
        </section>
      )}

      {/* Variations */}
      {drill.variations.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-200">Variations</h2>
          {drill.variations.map((v, i) => (
            <div key={i} className="space-y-2">
              <p className="text-sm text-gray-400 font-medium">{v.label}</p>
              <TabDisplay blocks={[v.tab]} />
            </div>
          ))}
        </section>
      )}

      {/* Ensemble notes */}
      {drill.ensembleNotes && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-200">Ensemble Context</h2>
          <blockquote className="border-l-4 border-violet-600 pl-4 text-gray-400 italic text-sm leading-relaxed">
            {drill.ensembleNotes}
          </blockquote>
        </section>
      )}

      {/* Completion tracking */}
      <section className="border-t border-gray-800 pt-8 space-y-3">
        <h2 className="text-lg font-semibold text-gray-200">Track your progress</h2>
        <DrillCompletionButton drillId={drill.id} />
      </section>
    </div>
  );
}
