import { Link } from "react-router-dom";
import { usePracticeSessions } from "../../hooks/usePracticeSessions";
import { computeStats, formatDuration, formatSessionDate } from "../../lib/practice-stats";

export function PracticeSnapshot() {
  const { data: sessions = [], isLoading } = usePracticeSessions();

  if (isLoading) return null;
  if (sessions.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-gray-300 font-medium text-sm">Start your practice streak</p>
          <p className="text-gray-600 text-xs mt-1">Log your first session to begin tracking.</p>
        </div>
        <Link
          to="/tracker"
          className="text-sm text-violet-400 hover:text-violet-300 shrink-0 transition-colors"
        >
          Log session →
        </Link>
      </div>
    );
  }

  const stats = computeStats(sessions);
  const lastSession = sessions[0];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-6">
          <div>
            <p className="text-3xl font-bold text-violet-400">{stats.streak}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {stats.streak === 1 ? "day streak" : "day streak"}
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-100">{stats.sessionsThisWeek}</p>
            <p className="text-xs text-gray-500 mt-0.5">this week</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-100">
              {formatDuration(stats.totalMinutes)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">total time</p>
          </div>
        </div>
        <Link
          to="/tracker"
          className="text-sm text-violet-400 hover:text-violet-300 shrink-0 transition-colors"
        >
          Tracker →
        </Link>
      </div>

      {lastSession && (
        <p className="text-xs text-gray-600 mt-4">
          Last session: {formatSessionDate(lastSession.date)}
          {lastSession.topics.length > 0 && (
            <> · {lastSession.topics.slice(0, 2).join(", ")}
              {lastSession.topics.length > 2 ? ` +${lastSession.topics.length - 2} more` : ""}
            </>
          )}
        </p>
      )}
    </div>
  );
}
