import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useSession } from "../../hooks/useSession";
import { Link } from "react-router-dom";

interface Rating {
  value: 1 | 2 | 3;
  label: string;
  activeClass: string;
}

const RATINGS: Rating[] = [
  { value: 1, label: "Needs work", activeClass: "bg-red-700 border-red-600 text-white" },
  { value: 2, label: "Getting it", activeClass: "bg-yellow-700 border-yellow-600 text-white" },
  { value: 3, label: "Solid", activeClass: "bg-green-700 border-green-600 text-white" },
];

interface DrillCompletionButtonProps {
  drillId: string;
}

interface LastCompletion {
  rating: number;
  completed_at: string;
}

export function DrillCompletionButton({ drillId }: DrillCompletionButtonProps) {
  const { session } = useSession();
  const queryClient = useQueryClient();
  const userId = session?.user.id;

  const { data: last } = useQuery<LastCompletion | null>({
    queryKey: ["drill-completion", drillId, userId],
    queryFn: async () => {
      const { data } = await supabase
        .from("drill_completions")
        .select("rating, completed_at")
        .eq("drill_id", drillId)
        .order("completed_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data;
    },
    enabled: !!userId,
    staleTime: 60_000,
  });

  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: async (rating: 1 | 2 | 3) => {
      const { error } = await supabase.from("drill_completions").insert({
        user_id: userId!,
        drill_id: drillId,
        rating,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["drill-completion", drillId, userId],
      });
    },
  });

  if (!session) {
    return (
      <p className="text-sm text-gray-500">
        <Link to="/login" className="text-violet-400 hover:text-violet-300">
          Sign in
        </Link>{" "}
        to track your progress.
      </p>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-green-400 text-sm">Logged!</span>
        <button
          onClick={reset}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
        >
          Log again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400">How did it go?</p>
      <div className="flex flex-wrap gap-2">
        {RATINGS.map(({ value, label, activeClass }) => (
          <button
            key={value}
            onClick={() => mutate(value)}
            disabled={isPending}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
              border-gray-700 text-gray-300 hover:border-gray-500 hover:text-gray-100
              ${activeClass ? `hover:${activeClass}` : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
      {last && (
        <p className="text-xs text-gray-600">
          Last logged:{" "}
          {["", "Needs work", "Getting it", "Solid"][last.rating]} —{" "}
          {new Date(last.completed_at).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
