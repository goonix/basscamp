import { useState } from "react";
import { NOTE_NAMES, SCALES } from "../lib/music-theory";
import { IntervalTable } from "../components/reference/IntervalTable";
import { ScaleCard } from "../components/reference/ScaleCard";
import { ChordTonePanel } from "../components/reference/ChordTonePanel";

const selectClass =
  "bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-md px-2 py-1.5 focus:outline-none focus:border-violet-500 transition-colors";

export function ReferencePage() {
  const [rootNote, setRootNote] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Theory Reference</h1>
          <p className="text-gray-400 mt-2">
            Intervals, scales, and chord tones — pick a root note to see everything in a specific key.
          </p>
        </div>

        <div className="flex flex-col gap-1 shrink-0">
          <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            Root note
          </label>
          <select
            value={rootNote ?? ""}
            onChange={(e) => setRootNote(e.target.value || null)}
            className={selectClass}
          >
            <option value="">— none —</option>
            {NOTE_NAMES.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Intervals */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-100 border-b border-gray-800 pb-2">
          Intervals
        </h2>
        <p className="text-sm text-gray-500">
          The 12 intervals — the building blocks of every scale, chord, and bass line.
        </p>
        <IntervalTable />
      </section>

      {/* Scales */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-100 border-b border-gray-800 pb-2">
          Scales
        </h2>
        <p className="text-sm text-gray-500">
          {rootNote
            ? `Showing scales in the key of ${rootNote}. Root notes are highlighted in violet.`
            : "Select a root note above to see the actual notes in each scale."}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(SCALES).map(([key, scale]) => (
            <ScaleCard
              key={key}
              scaleKey={key}
              intervals={scale.intervals}
              intervalNames={scale.intervalNames}
              rootNote={rootNote}
            />
          ))}
        </div>
      </section>

      {/* Chord tones */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-100 border-b border-gray-800 pb-2">
          Chord Tones
        </h2>
        <p className="text-sm text-gray-500">
          Common chord types and the intervals that define them. Outlining chord tones is
          the foundation of jazz, R&B, and advanced groove playing.
          {rootNote ? ` Showing notes for root ${rootNote}.` : " Select a root note to see actual notes."}
        </p>
        <ChordTonePanel rootNote={rootNote} />
      </section>
    </div>
  );
}
