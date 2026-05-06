import { noteNameToSemitone, pitchClassToName } from "../../lib/music-theory";

interface ChordType {
  name: string;
  symbol: string;
  intervals: number[];
  formulaNames: string[];
  context: string;
}

const CHORD_TYPES: ChordType[] = [
  {
    name: "Major Triad",
    symbol: "Maj",
    intervals: [0, 4, 7],
    formulaNames: ["R", "3", "5"],
    context: "Bright and stable. Most common chord in rock and pop.",
  },
  {
    name: "Minor Triad",
    symbol: "min",
    intervals: [0, 3, 7],
    formulaNames: ["R", "b3", "5"],
    context: "Dark and stable. The minor alternative to major.",
  },
  {
    name: "Dominant 7th",
    symbol: "7",
    intervals: [0, 4, 7, 10],
    formulaNames: ["R", "3", "5", "b7"],
    context: "Tense and bluesy. The V chord in a ii–V–I.",
  },
  {
    name: "Minor 7th",
    symbol: "min7",
    intervals: [0, 3, 7, 10],
    formulaNames: ["R", "b3", "5", "b7"],
    context: "Smooth and rich. Everywhere in jazz, soul, and R&B.",
  },
  {
    name: "Major 7th",
    symbol: "Maj7",
    intervals: [0, 4, 7, 11],
    formulaNames: ["R", "3", "5", "7"],
    context: "Lush and dreamy. The I chord in jazz progressions.",
  },
  {
    name: "Half-Diminished",
    symbol: "min7b5",
    intervals: [0, 3, 6, 10],
    formulaNames: ["R", "b3", "b5", "b7"],
    context: "Dark and tense. The ii chord in a minor ii–V–i.",
  },
];

function chordNotes(rootNote: string, intervals: number[]): string[] {
  const rootSemitone = noteNameToSemitone(rootNote);
  return intervals.map((interval) =>
    pitchClassToName((rootSemitone + interval) % 12)
  );
}

interface ChordTonePanelProps {
  rootNote: string | null;
}

export function ChordTonePanel({ rootNote }: ChordTonePanelProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CHORD_TYPES.map((chord) => {
        const notes = rootNote ? chordNotes(rootNote, chord.intervals) : null;

        return (
          <div
            key={chord.symbol}
            className="bg-gray-900 border border-gray-800 rounded-lg p-5 space-y-3"
          >
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="font-semibold text-gray-100 text-sm">{chord.name}</h3>
                <span className="text-xs font-mono text-gray-500">{chord.symbol}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{chord.context}</p>
            </div>

            {/* Interval pills */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap gap-1.5">
                {chord.formulaNames.map((name, i) => (
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
          </div>
        );
      })}
    </div>
  );
}
