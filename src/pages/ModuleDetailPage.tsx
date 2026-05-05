import { useParams, Link } from "react-router-dom";
import { useCurriculumStore } from "../store/curriculumStore";
import { useMarkdown } from "../hooks/useMarkdown";
import { MarkdownRenderer } from "../components/ui/MarkdownRenderer";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";

export function ModuleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const getModuleBySlug = useCurriculumStore((s) => s.getModuleBySlug);
  const mod = id ? getModuleBySlug(id) : undefined;
  const { content, loading, error } = useMarkdown(mod?.markdownPath ?? "");

  if (!mod) {
    return (
      <EmptyState
        title="Module not found"
        description="That module doesn't exist yet."
        action={
          <Link to="/curriculum" className="text-violet-400 hover:text-violet-300 text-sm">
            ← Back to Curriculum
          </Link>
        }
      />
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <Link
          to="/curriculum"
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← Curriculum
        </Link>
        <div className="flex items-center gap-3 mt-4">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-900/40 border border-violet-700/40 text-violet-300 font-bold text-sm shrink-0">
            {mod.order}
          </span>
          <h1 className="text-2xl font-bold text-gray-100">{mod.title}</h1>
        </div>
        <p className="text-gray-400 mt-3">{mod.description}</p>

        {mod.learningGoals.length > 0 && (
          <div className="mt-5 bg-gray-900 border border-gray-800 rounded-lg p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Learning Goals
            </p>
            <ul className="space-y-1.5">
              {mod.learningGoals.map((goal) => (
                <li key={goal} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-violet-500 mt-0.5 shrink-0">✓</span>
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-gray-500 text-sm animate-pulse">Loading module content…</div>
      )}

      {error && (
        <EmptyState
          title="Could not load module content"
          description={error.message}
        />
      )}

      {content && <MarkdownRenderer content={content} />}

      {mod.drillIds.length > 0 && (
        <div className="border-t border-gray-800 pt-8">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">
            Drills for this module
          </h2>
          <div className="flex flex-wrap gap-2">
            {mod.drillIds.map((drillId) => (
              <Link key={drillId} to={`/drills/${drillId}`}>
                <Badge variant="violet" className="cursor-pointer hover:opacity-80 transition-opacity">
                  {drillId}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
