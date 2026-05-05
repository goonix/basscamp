import { useQuery } from "@tanstack/react-query";
import type { Drill } from "../types/drill";

// Matches drills/mod01/*.json etc. — excludes drills/index.json
const drillModules = import.meta.glob("/drills/*/*.json", {
  import: "default",
}) as Record<string, () => Promise<Drill>>;

export function useDrill(drillId: string) {
  return useQuery({
    queryKey: ["drill", drillId],
    queryFn: async (): Promise<Drill> => {
      const key = Object.keys(drillModules).find((k) =>
        k.includes(`/${drillId}`)
      );
      if (!key) throw new Error(`Drill not found: ${drillId}`);
      return drillModules[key]!();
    },
    staleTime: Infinity,
  });
}
