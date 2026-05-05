import { useState } from "react";
import { usePracticeSessions } from "../hooks/usePracticeSessions";
import { PracticeStats } from "../components/tracker/PracticeStats";
import { LogSessionForm } from "../components/tracker/LogSessionForm";
import { SessionCard } from "../components/tracker/SessionCard";
import { EmptyState } from "../components/ui/EmptyState";

export function TrackerPage() {
  const { data: sessions = [], isLoading } = usePracticeSessions();
  const [formOpen, setFormOpen] = useState(true);

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Practice Tracker</h1>
        <p className="text-gray-400 mt-2">
          Log sessions, track your streak, and see where your time goes.
        </p>
      </div>

      {/* Stats */}
      {sessions.length > 0 && <PracticeStats sessions={sessions} />}

      {/* Log a session */}
      <section className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <button
          onClick={() => setFormOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-gray-800/50 transition-colors"
        >
          <span className="font-semibold text-gray-100">Log a session</span>
          <span className="text-gray-500 text-sm">{formOpen ? "▲" : "▼"}</span>
        </button>
        {formOpen && (
          <div className="px-5 pb-6 border-t border-gray-800 pt-5">
            <LogSessionForm onSuccess={() => setFormOpen(false)} />
          </div>
        )}
      </section>

      {/* History */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">History</h2>

        {isLoading && (
          <p className="text-gray-500 text-sm animate-pulse">Loading sessions…</p>
        )}

        {!isLoading && sessions.length === 0 && (
          <EmptyState
            title="No sessions yet"
            description="Log your first practice session above to start tracking your progress."
          />
        )}

        {sessions.map((s) => (
          <SessionCard key={s.id} session={s} />
        ))}
      </section>
    </div>
  );
}
