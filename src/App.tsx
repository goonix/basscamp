import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSession } from "./hooks/useSession";
import { Layout } from "./components/layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { CurriculumPage } from "./pages/CurriculumPage";
import { ModuleDetailPage } from "./pages/ModuleDetailPage";
import { FretboardPage } from "./pages/FretboardPage";
import { ReferencePage } from "./pages/ReferencePage";
import { DrillBrowserPage } from "./pages/DrillBrowserPage";
import { DrillDetailPage } from "./pages/DrillDetailPage";
import { TrackerPage } from "./pages/TrackerPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

function RequireAuth() {
  const { session, loading } = useSession();
  if (loading) return null;
  return session ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/curriculum/:id" element={<ModuleDetailPage />} />
          <Route path="/fretboard" element={<FretboardPage />} />
          <Route path="/reference" element={<ReferencePage />} />
          <Route path="/drills" element={<DrillBrowserPage />} />
          <Route path="/drills/:id" element={<DrillDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Auth-protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/tracker" element={<TrackerPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
