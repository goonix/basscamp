import { Link } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { useCurriculumStore } from "../store/curriculumStore";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export function DashboardPage() {
  const { session } = useSession();
  const modules = useCurriculumStore((s) => s.modules);
  const firstThree = modules.slice(0, 3);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">
          {session ? `Welcome back` : `Welcome to Basscamp`}
        </h1>
        <p className="text-gray-400 mt-2">
          Music theory for bass — applied, practical, and genre-aware.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          Start Learning
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {firstThree.map((mod) => (
            <Link key={mod.id} to={`/curriculum/${mod.slug}`}>
              <Card hover className="p-5 h-full">
                <Badge variant="violet" className="mb-3">
                  Module {mod.order}
                </Badge>
                <h3 className="font-semibold text-gray-100 text-sm leading-snug">
                  {mod.title}
                </h3>
                <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                  {mod.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link
            to="/curriculum"
            className="text-sm text-violet-400 hover:text-violet-300"
          >
            View all modules →
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          Quick Links
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { to: "/drills", label: "Drill Browser", desc: "Browse and filter exercises by genre and technique" },
            { to: "/fretboard", label: "Fretboard Visualizer", desc: "Explore scales and intervals on the neck" },
            { to: "/reference", label: "Theory Reference", desc: "Scales, intervals, and chord tone charts" },
          ].map(({ to, label, desc }) => (
            <Link key={to} to={to}>
              <Card hover className="p-5 h-full">
                <p className="font-medium text-gray-100 text-sm">{label}</p>
                <p className="text-gray-500 text-xs mt-1">{desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {!session && (
        <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <p className="text-gray-300 font-medium">Track your progress</p>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to log practice sessions, mark drills complete, and track your streak.
          </p>
          <div className="flex gap-3 mt-4">
            <Link
              to="/login"
              className="text-sm text-violet-400 hover:text-violet-300"
            >
              Sign in →
            </Link>
            <Link
              to="/signup"
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              Create account →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
