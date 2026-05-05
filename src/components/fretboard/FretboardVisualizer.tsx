import { useMemo } from "react";
import { StringRow } from "./StringRow";
import type { CellVariant } from "./FretCell";
import {
  getPitchClass,
  pitchClassToName,
  noteNameToSemitone,
  getScalePitchClasses,
  getScaleIntervalName,
  isRootNote,
  SCALES,
} from "../../lib/music-theory";
import type { FretboardHighlightMode } from "../../types/fretboard";

// Frets that get position-marker dots on a standard bass neck
const POSITION_MARKERS = new Set([3, 5, 7, 9, 12]);
const DOUBLE_DOT_FRETS = new Set([12]);

interface FretboardVisualizerProps {
  tuning: string[];
  fretCount: number;
  rootNote: string | null;
  highlightMode: FretboardHighlightMode;
  highlightScale: string | null;
}

function computeVariant(
  openStringSemitone: number,
  fret: number,
  rootNote: string | null,
  highlightMode: FretboardHighlightMode,
  scalePitchClasses: Set<number> | null,
  scaleIntervals: number[] | null,
  scaleIntervalNames: string[] | null,
): { label: string; variant: CellVariant } {
  const pitchClass = getPitchClass(openStringSemitone, fret);
  const noteName = pitchClassToName(pitchClass);

  if (highlightMode === "none" || !rootNote) {
    return { label: noteName, variant: "dim" };
  }

  const root = isRootNote(rootNote, pitchClass);

  if (highlightMode === "chromatic") {
    return { label: noteName, variant: root ? "root" : "tone" };
  }

  // scale or intervals mode — only show notes in the scale
  if (!scalePitchClasses?.has(pitchClass)) {
    return { label: noteName, variant: "hidden" };
  }

  if (highlightMode === "intervals" && scaleIntervals && scaleIntervalNames) {
    const intervalName =
      getScaleIntervalName(rootNote, pitchClass, scaleIntervals, scaleIntervalNames) ??
      noteName;
    return { label: intervalName, variant: root ? "root" : "tone" };
  }

  return { label: noteName, variant: root ? "root" : "tone" };
}

export function FretboardVisualizer({
  tuning,
  fretCount,
  rootNote,
  highlightMode,
  highlightScale,
}: FretboardVisualizerProps) {
  const frets = Array.from({ length: fretCount + 1 }, (_, i) => i);

  const scale = highlightScale ? SCALES[highlightScale] : null;
  const scalePitchClasses = useMemo(
    () =>
      rootNote && scale ? getScalePitchClasses(rootNote, scale.intervals) : null,
    [rootNote, scale],
  );

  // Render strings high-to-low (G first, E last) so the diagram matches the
  // player's view looking down at the neck.
  const displayStrings = [...tuning].reverse();

  return (
    <div className="overflow-x-auto pb-2">
      <div className="inline-block min-w-max">
        {/* Fret numbers */}
        <div className="flex items-center mb-1">
          <div className="w-8 shrink-0" />
          {frets.map((fret) => (
            <div
              key={fret}
              className={`w-12 shrink-0 text-center text-xs ${
                fret === 0 ? "mr-px" : ""
              } ${fret % 2 === 0 ? "text-gray-500" : "text-gray-700"}`}
            >
              {fret === 0 ? "" : fret}
            </div>
          ))}
        </div>

        {/* String rows */}
        {displayStrings.map((stringName, displayIndex) => {
          const openSemitone = noteNameToSemitone(stringName);
          const cells = frets.map((fret) =>
            computeVariant(
              openSemitone,
              fret,
              rootNote,
              highlightMode,
              scalePitchClasses,
              scale?.intervals ?? null,
              scale?.intervalNames ?? null,
            ),
          );
          return (
            <StringRow
              key={stringName}
              stringName={stringName}
              stringIndex={displayIndex}
              cells={cells}
            />
          );
        })}

        {/* Position marker dots */}
        <div className="flex items-center mt-2">
          <div className="w-8 shrink-0" />
          {frets.map((fret) => (
            <div
              key={fret}
              className="w-12 shrink-0 flex justify-center gap-1"
            >
              {POSITION_MARKERS.has(fret) && (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                  {DOUBLE_DOT_FRETS.has(fret) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
