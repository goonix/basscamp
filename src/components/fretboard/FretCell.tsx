import { NoteMarker } from "./NoteMarker";
import type { NoteMarkerVariant } from "./NoteMarker";

export type CellVariant = "hidden" | NoteMarkerVariant;

interface FretCellProps {
  label: string;
  variant: CellVariant;
  isOpenString: boolean;
}

const STRING_COLORS = [
  "border-gray-500",  // G (top, index 0 in display order)
  "border-gray-600",
  "border-gray-600",
  "border-gray-500",  // E (bottom)
];

interface FretCellProps {
  label: string;
  variant: CellVariant;
  isOpenString: boolean;
  stringIndex: number; // 0 = G (top), 3 = E (bottom)
}

export function FretCell({ label, variant, isOpenString, stringIndex }: FretCellProps) {
  const stringColor = STRING_COLORS[stringIndex] ?? "border-gray-600";

  return (
    <div
      className={`
        relative flex items-center justify-center
        w-12 h-12 shrink-0
        ${isOpenString
          ? "border-r-4 border-r-gray-400"
          : `border-r border-r-gray-700`
        }
      `}
    >
      {/* String line running through the center */}
      <div className={`absolute inset-x-0 top-1/2 h-px ${stringColor} border-t`} />

      {/* Note marker (sits above string line) */}
      <div className="relative z-10">
        {variant === "hidden" ? null : (
          <NoteMarker label={label} variant={variant} />
        )}
      </div>
    </div>
  );
}
