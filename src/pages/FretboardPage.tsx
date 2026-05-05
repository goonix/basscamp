import { useFretboardStore } from "../store/fretboardStore";
import { FretboardVisualizer } from "../components/fretboard/FretboardVisualizer";
import { Controls } from "../components/fretboard/Controls";

export function FretboardPage() {
  const { tuning, fretCount, rootNote, highlightMode, highlightScale } =
    useFretboardStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Fretboard</h1>
        <p className="text-gray-400 mt-2">
          Visualize notes, scales, and intervals across the neck.
        </p>
      </div>

      <Controls />

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <FretboardVisualizer
          tuning={tuning}
          fretCount={fretCount}
          rootNote={rootNote}
          highlightMode={highlightMode}
          highlightScale={highlightScale}
        />
      </div>

      {rootNote && highlightMode !== "none" && (
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>
            <span className="inline-block w-3 h-3 rounded-full bg-violet-600 mr-1.5 align-middle" />
            Root ({rootNote})
          </span>
          {(highlightMode === "scale" || highlightMode === "intervals") && (
            <span>
              <span className="inline-block w-3 h-3 rounded-full border-2 border-violet-500 mr-1.5 align-middle" />
              Scale tone
            </span>
          )}
          {highlightMode === "chromatic" && (
            <span>
              <span className="inline-block w-3 h-3 rounded-full border-2 border-violet-500 mr-1.5 align-middle" />
              Other note
            </span>
          )}
        </div>
      )}
    </div>
  );
}
