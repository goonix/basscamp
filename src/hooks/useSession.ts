import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface SessionState {
  session: Session | null;
  /** True while the initial session check is in flight */
  loading: boolean;
}

/**
 * Returns the current Supabase auth session and subscribes to auth state changes.
 * `loading` is true only on the initial mount until Supabase resolves the session.
 */
export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({
    session: null,
    loading: true,
  });

  useEffect(() => {
    // Resolve the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({ session, loading: false });
    });

    // Subscribe to future auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ session, loading: false });
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
