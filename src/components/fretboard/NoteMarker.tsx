export type NoteMarkerVariant = "root" | "tone" | "dim";

interface NoteMarkerProps {
  label: string;
  variant: NoteMarkerVariant;
}

const variantClasses: Record<NoteMarkerVariant, string> = {
  root: "bg-violet-600 text-white border-2 border-violet-400",
  tone: "bg-transparent border-2 border-violet-500 text-violet-300",
  dim:  "bg-gray-800/70 border border-gray-700 text-gray-500",
};

export function NoteMarker({ label, variant }: NoteMarkerProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full w-8 h-8 text-xs font-semibold select-none shrink-0 ${variantClasses[variant]}`}
    >
      {label}
    </div>
  );
}
