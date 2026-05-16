import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SoftwarePage from "./pages/SoftwarePage";
import ArtPage from "./pages/ArtPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/software-engineering" element={<SoftwarePage />} />
        <Route path="/art-creative" element={<ArtPage />} />
      </Routes>
    </BrowserRouter>
  );
}
