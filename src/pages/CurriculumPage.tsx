import { Link } from "react-router-dom";
import { useCurriculumStore } from "../store/curriculumStore";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export function CurriculumPage() {
  const modules = useCurriculumStore((s) => s.modules);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Curriculum</h1>
        <p className="text-gray-400 mt-2">
          Seven modules from fretboard basics to walking bass lines — each
          grounded in real genre contexts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {modules.map((mod) => (
          <Link key={mod.id} to={`/curriculum/${mod.slug}`}>
            <Card hover className="p-6 h-full flex gap-4">
              <div className="shrink-0">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-900/40 border border-violet-700/40 text-violet-300 font-bold text-sm">
                  {mod.order}
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-100 text-base leading-snug">
                  {mod.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1.5 line-clamp-2">
                  {mod.description}
                </p>
                {mod.drillIds.length > 0 && (
                  <Badge variant="default" className="mt-3">
                    {mod.drillIds.length} drill
                    {mod.drillIds.length !== 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
