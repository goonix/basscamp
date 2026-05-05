import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <TopNav />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
