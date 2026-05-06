import { noteNameToSemitone, pitchClassToName } from "../../lib/music-theory";

function stepsToFormula(intervals: number[]): string {
  const steps: string[] = [];
  for (let i = 0; i < intervals.length; i++) {
    const next = i < intervals.length - 1 ? intervals[i + 1]! : 12;
    const gap = next - intervals[i]!;
    steps.push(gap === 1 ? "H" : gap === 2 ? "W" : "m3");
  }
  return steps.join(" – ");
}

function scaleNotes(rootNote: string, intervals: number[]): string[] {
  const rootSemitone = noteNameToSemitone(rootNote);
  return intervals.map((interval) =>
    pitchClassToName((rootSemitone + interval) % 12)
  );
}

const SCALE_DISPLAY_NAMES: Record<string, string> = {
  major:            "Major",
  "natural-minor":  "Natural Minor",
  "minor-pentatonic": "Minor Pentatonic",
  "major-pentatonic": "Major Pentatonic",
  blues:            "Blues",
  dorian:           "Dorian",
  mixolydian:       "Mixolydian",
};

const SCALE_GENRE_TAGS: Record<string, string> = {
  major:            "Rock · Pop · Country",
  "natural-minor":  "Rock · Metal · Pop",
  "minor-pentatonic": "Blues · Rock · Funk",
  "major-pentatonic": "Country · Pop · Rock",
  blues:            "Blues · Jazz · Rock",
  dorian:           "Jazz · Funk · R&B",
  mixolydian:       "Rock · Blues · Jazz",
};

interface ScaleCardProps {
  scaleKey: string;
  intervals: number[];
  intervalNames: string[];
  rootNote: string | null;
}

export function ScaleCard({ scaleKey, intervals, intervalNames, rootNote }: ScaleCardProps) {
  const notes = rootNote ? scaleNotes(rootNote, intervals) : null;
  const formula = stepsToFormula(intervals);
  const displayName = SCALE_DISPLAY_NAMES[scaleKey] ?? scaleKey;
  const genreTag = SCALE_GENRE_TAGS[scaleKey] ?? "";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5 space-y-4">
      <div>
        <h3 className="font-semibold text-gray-100">{displayName}</h3>
        <p className="text-xs text-gray-600 mt-0.5">{genreTag}</p>
      </div>

      {/* Interval pills */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap gap-1.5">
          {intervalNames.map((name, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded text-xs font-semibold font-mono ${
                name === "R"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-800 border border-gray-700 text-violet-300"
              }`}
            >
              {name}
            </span>
          ))}
        </div>

        {/* Note names (when root is selected) */}
        {notes && (
          <div className="flex flex-wrap gap-1.5">
            {notes.map((note, i) => (
              <span
                key={i}
                className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded text-xs font-medium ${
                  i === 0
                    ? "bg-violet-900/50 text-violet-200 border border-violet-700/50"
                    : "bg-gray-900 border border-gray-800 text-gray-400"
                }`}
              >
                {note}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Step formula */}
      <p className="text-xs text-gray-700 font-mono tracking-wide">{formula}</p>
    </div>
  );
}
