import { NOTE_NAMES, SCALES } from "../../lib/music-theory";
import { useFretboardStore } from "../../store/fretboardStore";

const SCALE_OPTIONS = [
  { value: "major", label: "Major" },
  { value: "natural-minor", label: "Natural Minor" },
  { value: "minor-pentatonic", label: "Minor Pentatonic" },
  { value: "major-pentatonic", label: "Major Pentatonic" },
  { value: "blues", label: "Blues" },
  { value: "dorian", label: "Dorian" },
  { value: "mixolydian", label: "Mixolydian" },
];

const MODE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "chromatic", label: "All notes" },
  { value: "scale", label: "Scale" },
  { value: "intervals", label: "Intervals" },
] as const;

const FRET_OPTIONS = [12, 16, 20];

const selectClass =
  "bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-md px-2 py-1.5 focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

export function Controls() {
  const {
    rootNote, highlightMode, highlightScale, fretCount, stringCount,
    setRootNote, setHighlightMode, setHighlightScale, setFretCount, setStringCount,
  } = useFretboardStore();

  const needsRoot = highlightMode !== "none";
  const needsScale = highlightMode === "scale" || highlightMode === "intervals";

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Highlight
        </label>
        <select
          value={highlightMode}
          onChange={(e) =>
            setHighlightMode(e.target.value as typeof highlightMode)
          }
          className={selectClass}
        >
          {MODE_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Root note
        </label>
        <select
          value={rootNote ?? ""}
          onChange={(e) => setRootNote(e.target.value || null)}
          disabled={!needsRoot}
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

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Scale
        </label>
        <select
          value={highlightScale ?? ""}
          onChange={(e) => setHighlightScale(e.target.value || null)}
          disabled={!needsScale}
          className={selectClass}
        >
          {Object.keys(SCALES).map((key) => {
            const opt = SCALE_OPTIONS.find((o) => o.value === key);
            return (
              <option key={key} value={key}>
                {opt?.label ?? key}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Frets
        </label>
        <select
          value={fretCount}
          onChange={(e) => setFretCount(Number(e.target.value))}
          className={selectClass}
        >
          {FRET_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Strings
        </label>
        <div className="flex rounded-md border border-gray-700 overflow-hidden">
          {([4, 5] as const).map((count) => (
            <button
              key={count}
              onClick={() => setStringCount(count)}
              className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                stringCount === count
                  ? "bg-violet-600 text-white"
                  : "bg-gray-900 text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
