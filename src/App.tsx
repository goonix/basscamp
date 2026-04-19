import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages will be added as they are built
function ComingSoon({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">{name} — coming soon</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComingSoon name="Dashboard" />} />
        <Route path="/fretboard" element={<ComingSoon name="Fretboard" />} />
        <Route path="/reference" element={<ComingSoon name="Reference" />} />
        <Route path="/drills" element={<ComingSoon name="Drills" />} />
        <Route path="/drills/:id" element={<ComingSoon name="Drill" />} />
        <Route path="/curriculum" element={<ComingSoon name="Curriculum" />} />
        <Route path="/curriculum/:id" element={<ComingSoon name="Module" />} />
        <Route path="/tracker" element={<ComingSoon name="Tracker" />} />
        <Route path="/login" element={<ComingSoon name="Login" />} />
        <Route path="/signup" element={<ComingSoon name="Sign Up" />} />
      </Routes>
    </BrowserRouter>
  );
}
