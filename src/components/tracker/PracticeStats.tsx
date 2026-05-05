import { computeStats, formatDuration } from "../../lib/practice-stats";
import type { PracticeSession } from "../../types/progress";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
        {label}
      </p>
      <p className="text-3xl font-bold text-gray-100">{value}</p>
      {sub && <p className="text-xs text-gray-600 mt-1">{sub}</p>}
    </div>
  );
}

interface PracticeStatsProps {
  sessions: PracticeSession[];
}

export function PracticeStats({ sessions }: PracticeStatsProps) {
  const stats = computeStats(sessions);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard
        label="Streak"
        value={`${stats.streak}`}
        sub={stats.streak === 1 ? "day" : "days"}
      />
      <StatCard
        label="This week"
        value={`${stats.sessionsThisWeek}`}
        sub={stats.sessionsThisWeek === 1 ? "session" : "sessions"}
      />
      <StatCard
        label="Total time"
        value={formatDuration(stats.totalMinutes)}
        sub={`${stats.totalSessions} session${stats.totalSessions !== 1 ? "s" : ""}`}
      />
      <StatCard
        label="Avg session"
        value={
          stats.totalSessions > 0
            ? formatDuration(Math.round(stats.totalMinutes / stats.totalSessions))
            : "—"
        }
      />
    </div>
  );
}
