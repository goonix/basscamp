import { NavLink, useNavigate } from "react-router-dom";
import { useSession } from "../../hooks/useSession";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/Button";

const navLinks = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/curriculum", label: "Curriculum" },
  { to: "/drills", label: "Drills" },
  { to: "/fretboard", label: "Fretboard" },
  { to: "/reference", label: "Reference" },
  { to: "/tracker", label: "Tracker" },
];

export function TopNav() {
  const { session, loading } = useSession();
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <nav className="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-6 h-14">
        <span className="text-violet-400 font-bold text-lg tracking-tight shrink-0">
          Basscamp
        </span>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-gray-100 bg-gray-800"
                    : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        {!loading && (
          <div className="shrink-0">
            {session ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
