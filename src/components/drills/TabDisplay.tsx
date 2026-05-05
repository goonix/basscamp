import type { TabBlock } from "../../types/drill";

// Colors match standard bass string conventions (high → low)
const STRING_LABEL_COLORS: Record<string, string> = {
  G: "text-sky-400",
  D: "text-emerald-400",
  A: "text-amber-400",
  E: "text-red-400",
  B: "text-purple-400",
};

function TabLine({ line }: { line: string }) {
  // Match lines that begin with a string label followed by spaces and a pipe
  const match = line.match(/^([GDAEB])(\s+\|.*)/);
  if (!match) {
    return <span className="text-gray-500">{line}</span>;
  }
  const [, label, rest] = match;
  return (
    <span>
      <span className={STRING_LABEL_COLORS[label!] ?? "text-gray-300"}>
        {label}
      </span>
      <span className="text-gray-300">{rest}</span>
    </span>
  );
}

interface TabDisplayProps {
  blocks: TabBlock[];
}

export function TabDisplay({ blocks }: TabDisplayProps) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <div key={i}>
          {block.label && (
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              {block.label}
            </p>
          )}
          <div className="overflow-x-auto">
            <pre className="bg-gray-950 border border-gray-800 rounded-lg p-4 text-sm font-mono leading-relaxed inline-block min-w-full">
              {block.content.split("\n").map((line, j) => (
                <span key={j} className="block">
                  <TabLine line={line} />
                </span>
              ))}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}
