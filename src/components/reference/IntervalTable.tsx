const INTERVALS = [
  { semitones: 0,  abbr: "R",   name: "Perfect Unison", bassContext: "The root — your anchor and starting point" },
  { semitones: 1,  abbr: "b2",  name: "Minor 2nd",      bassContext: "Chromatic neighbor; most common as a passing/approach note" },
  { semitones: 2,  abbr: "2",   name: "Major 2nd",       bassContext: "Whole step; appears in major, minor, and Dorian scales" },
  { semitones: 3,  abbr: "b3",  name: "Minor 3rd",       bassContext: "Minor quality; blues and pentatonic staple" },
  { semitones: 4,  abbr: "3",   name: "Major 3rd",       bassContext: "Major quality; chord tone in major triads" },
  { semitones: 5,  abbr: "4",   name: "Perfect 4th",     bassContext: "Open and strong; next string up at the same fret" },
  { semitones: 6,  abbr: "b5",  name: "Tritone",         bassContext: "Maximum tension; defines dominant 7th chords" },
  { semitones: 7,  abbr: "5",   name: "Perfect 5th",     bassContext: "Powerful and stable; root–fifth is the backbone of bass playing" },
  { semitones: 8,  abbr: "b6",  name: "Minor 6th",       bassContext: "Melancholic; appears in natural minor" },
  { semitones: 9,  abbr: "6",   name: "Major 6th",       bassContext: "Bright and relaxed; major pentatonic and major 6th chords" },
  { semitones: 10, abbr: "b7",  name: "Minor 7th",       bassContext: "Bluesy guide tone; defines dominant and minor 7th chords" },
  { semitones: 11, abbr: "7",   name: "Major 7th",       bassContext: "Tense upper guide tone; resolves up a half step to the root" },
] as const;

export function IntervalTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left px-3 py-2 text-xs text-gray-500 font-medium uppercase tracking-wider w-10">
              Semi
            </th>
            <th className="text-left px-3 py-2 text-xs text-gray-500 font-medium uppercase tracking-wider w-12">
              Abbr
            </th>
            <th className="text-left px-3 py-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="text-left px-3 py-2 text-xs text-gray-500 font-medium uppercase tracking-wider hidden sm:table-cell">
              Bass context
            </th>
          </tr>
        </thead>
        <tbody>
          {INTERVALS.map((interval) => (
            <tr
              key={interval.semitones}
              className="border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors"
            >
              <td className="px-3 py-2.5 text-gray-600 font-mono text-xs">
                {interval.semitones}
              </td>
              <td className="px-3 py-2.5">
                <span className="font-mono font-semibold text-violet-400 text-sm">
                  {interval.abbr}
                </span>
              </td>
              <td className="px-3 py-2.5 text-gray-200 font-medium">
                {interval.name}
              </td>
              <td className="px-3 py-2.5 text-gray-500 text-xs hidden sm:table-cell leading-relaxed">
                {interval.bassContext}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
