import { useState } from "react";
import { useLogSession, type LogSessionInput } from "../../hooks/usePracticeSessions";
import { Button } from "../ui/Button";
import type { DrillCatalogEntry } from "../../types/drill";
import catalogJson from "../../../drills/index.json";

const catalog = catalogJson as DrillCatalogEntry[];

const TOPIC_SUGGESTIONS = [
  "open strings",
  "natural notes",
  "fretboard navigation",
  "octave shapes",
  "quarter notes",
  "eighth notes",
  "syncopation",
  "groove",
  "locking with kick",
  "intervals",
  "perfect fifth",
  "major scale",
  "minor scale",
  "pentatonic",
  "blues scale",
  "chord tones",
  "walking bass",
  "ghost notes",
  "sight reading",
  "ear training",
];

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

interface LogSessionFormProps {
  onSuccess?: () => void;
}

export function LogSessionForm({ onSuccess }: LogSessionFormProps) {
  const { mutate: logSession, isPending, error } = useLogSession();

  const [date, setDate] = useState(todayISO);
  const [duration, setDuration] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [drillsCompleted, setDrillsCompleted] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [showDrills, setShowDrills] = useState(false);

  function toggleTopic(topic: string) {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }

  function toggleDrill(drillId: string) {
    setDrillsCompleted((prev) =>
      prev.includes(drillId) ? prev.filter((d) => d !== drillId) : [...prev, drillId]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const durationMinutes = parseInt(duration, 10);
    if (!durationMinutes || durationMinutes <= 0) return;

    const input: LogSessionInput = {
      date,
      durationMinutes,
      topics,
      drillsCompleted,
      notes: notes.trim(),
    };

    logSession(input, {
      onSuccess: () => {
        setDate(todayISO());
        setDuration("");
        setTopics([]);
        setDrillsCompleted([]);
        setNotes("");
        setShowDrills(false);
        onSuccess?.();
      },
    });
  }

  const inputClass =
    "w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Date + Duration */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            Date
          </label>
          <input
            type="date"
            required
            value={date}
            max={todayISO()}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            Duration (minutes)
          </label>
          <input
            type="number"
            required
            min={1}
            max={480}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="30"
            className={inputClass}
          />
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-2">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Topics practiced
        </label>
        <div className="flex flex-wrap gap-2">
          {TOPIC_SUGGESTIONS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => toggleTopic(topic)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                topics.includes(topic)
                  ? "bg-violet-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Drills completed */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setShowDrills((v) => !v)}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-pointer uppercase tracking-wider font-medium"
        >
          Drills completed{drillsCompleted.length > 0 ? ` (${drillsCompleted.length})` : ""}{" "}
          {showDrills ? "▲" : "▼"}
        </button>
        {showDrills && (
          <div className="grid gap-1.5 sm:grid-cols-2 max-h-48 overflow-y-auto border border-gray-800 rounded-md p-3">
            {catalog.map((drill) => (
              <label
                key={drill.id}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={drillsCompleted.includes(drill.id)}
                  onChange={() => toggleDrill(drill.id)}
                  className="accent-violet-500"
                />
                <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors leading-snug">
                  {drill.title}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="What felt good? What needs more work?"
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm" role="alert">
          {error instanceof Error ? error.message : "Failed to save session."}
        </p>
      )}

      <Button type="submit" loading={isPending}>
        Log session
      </Button>
    </form>
  );
}
