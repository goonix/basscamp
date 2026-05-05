import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useSession } from "./useSession";
import type { PracticeSession } from "../types/progress";

// Snake_case shape returned by Supabase
interface PracticeSessionRow {
  id: string;
  user_id: string;
  date: string;
  duration_minutes: number;
  topics: string[];
  drills_completed: string[];
  notes: string;
  created_at: string;
}

function rowToSession(row: PracticeSessionRow): PracticeSession {
  return {
    id: row.id,
    date: row.date,
    durationMinutes: row.duration_minutes,
    topics: row.topics,
    drillsCompleted: row.drills_completed,
    notes: row.notes,
  };
}

export interface LogSessionInput {
  date: string;
  durationMinutes: number;
  topics: string[];
  drillsCompleted: string[];
  notes: string;
}

const SESSIONS_KEY = (userId: string | undefined) => [
  "practice-sessions",
  userId,
];

export function usePracticeSessions() {
  const { session } = useSession();
  const userId = session?.user.id;

  return useQuery({
    queryKey: SESSIONS_KEY(userId),
    queryFn: async (): Promise<PracticeSession[]> => {
      const { data, error } = await supabase
        .from("practice_sessions")
        .select("*")
        .order("date", { ascending: false });
      if (error) throw error;
      return (data as PracticeSessionRow[]).map(rowToSession);
    },
    enabled: !!userId,
    staleTime: 30_000,
  });
}

export function useLogSession() {
  const { session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LogSessionInput) => {
      const { error } = await supabase.from("practice_sessions").insert({
        user_id: session!.user.id,
        date: input.date,
        duration_minutes: input.durationMinutes,
        topics: input.topics,
        drills_completed: input.drillsCompleted,
        notes: input.notes,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: SESSIONS_KEY(session?.user.id),
      });
    },
  });
}

export function useDeleteSession() {
  const { session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const { error } = await supabase
        .from("practice_sessions")
        .delete()
        .eq("id", sessionId);
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: SESSIONS_KEY(session?.user.id),
      });
    },
  });
}
