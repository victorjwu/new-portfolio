import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SoftwarePage from "./pages/SoftwarePage";
import ArtPage from "./pages/ArtPage";
import AmbientField from "./components/AmbientField";
import CursorDot from "./components/CursorDot";

export default function App() {
  return (
    <BrowserRouter>
      <AmbientField />
      <CursorDot />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/software-engineering" element={<SoftwarePage />} />
        <Route path="/art-creative" element={<ArtPage />} />
      </Routes>
    </BrowserRouter>
  );
}
