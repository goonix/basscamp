import { NoteMarker } from "./NoteMarker";
import type { NoteMarkerVariant } from "./NoteMarker";

export type CellVariant = "hidden" | NoteMarkerVariant;

interface FretCellProps {
  label: string;
  variant: CellVariant;
  isOpenString: boolean;
  stringIndex: number; // 0 = highest string (G), increasing toward lowest
}

// Higher strings are thinner/lighter; lower strings are thicker/darker.
// Covers up to 5 strings; falls back to mid-gray beyond that.
const STRING_COLORS = [
  "border-gray-400",  // G (highest)
  "border-gray-500",  // D
  "border-gray-500",  // A
  "border-gray-600",  // E
  "border-gray-700",  // B (lowest, 5-string only)
];

export function FretCell({ label, variant, isOpenString, stringIndex }: FretCellProps) {
  const stringColor = STRING_COLORS[stringIndex] ?? "border-gray-600";

  return (
    <div
      className={`
        relative flex items-center justify-center
        w-12 h-12 shrink-0
        ${isOpenString ? "border-r-4 border-r-gray-400" : "border-r border-r-gray-700"}
      `}
    >
      {/* String line running through the center */}
      <div className={`absolute inset-x-0 top-1/2 h-px ${stringColor} border-t`} />

      {/* Note marker (sits above string line) */}
      <div className="relative z-10">
        {variant !== "hidden" && <NoteMarker label={label} variant={variant} />}
      </div>
    </div>
  );
}
