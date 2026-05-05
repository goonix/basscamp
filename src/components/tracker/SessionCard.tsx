import { useState } from "react";
import type { PracticeSession } from "../../types/progress";
import { useDeleteSession } from "../../hooks/usePracticeSessions";
import { formatDuration, formatSessionDate } from "../../lib/practice-stats";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface SessionCardProps {
  session: PracticeSession;
}

export function SessionCard({ session }: SessionCardProps) {
  const { mutate: deleteSession, isPending } = useDeleteSession();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteSession(session.id);
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-100 text-sm">
            {formatSessionDate(session.date)}
          </p>
          <p className="text-2xl font-bold text-violet-400 mt-0.5">
            {formatDuration(session.durationMinutes)}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {confirmDelete ? (
            <>
              <span className="text-xs text-gray-500">Delete?</span>
              <Button
                variant="danger"
                size="sm"
                loading={isPending}
                onClick={handleDelete}
              >
                Yes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmDelete(false)}
              >
                No
              </Button>
            </>
          ) : (
            <button
              onClick={handleDelete}
              className="text-xs text-gray-700 hover:text-gray-400 transition-colors cursor-pointer"
              aria-label="Delete session"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {session.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {session.topics.map((topic) => (
            <Badge key={topic} variant="default">
              {topic}
            </Badge>
          ))}
        </div>
      )}

      {session.drillsCompleted.length > 0 && (
        <p className="text-xs text-gray-500">
          {session.drillsCompleted.length} drill
          {session.drillsCompleted.length !== 1 ? "s" : ""} completed
        </p>
      )}

      {session.notes && (
        <p className="text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-3">
          {session.notes}
        </p>
      )}
    </div>
  );
}
