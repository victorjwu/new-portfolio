

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import BubbleCursor from './components/BubbleCursor';
import SoftwarePage from './pages/SoftwarePage';
import VideoBackground from './components/VideoBackground';
import './styles/global.css';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/software" element={<SoftwarePage />} />
        {/* 
          Placeholder routes for future implementation:
          <Route path="/creative" element={<CreativePage />} />
        */}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <VideoBackground />
      <BubbleCursor />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
