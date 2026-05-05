import { FretCell } from "./FretCell";
import type { CellVariant } from "./FretCell";

interface CellData {
  label: string;
  variant: CellVariant;
}

interface StringRowProps {
  stringName: string;
  stringIndex: number;
  cells: CellData[]; // index 0 = open string (fret 0)
}

export function StringRow({ stringName, stringIndex, cells }: StringRowProps) {
  return (
    <div className="flex items-center">
      <div className="w-8 shrink-0 text-xs font-mono font-semibold text-gray-500 text-right pr-2">
        {stringName}
      </div>
      {cells.map((cell, fret) => (
        <FretCell
          key={fret}
          label={cell.label}
          variant={cell.variant}
          isOpenString={fret === 0}
          stringIndex={stringIndex}
        />
      ))}
    </div>
  );
}
