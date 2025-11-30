

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import BubbleCursor from './components/BubbleCursor';
import SoftwarePage from './pages/SoftwarePage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <BubbleCursor />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/software" element={<SoftwarePage />} />
        {/* 
          Placeholder routes for future implementation:
          <Route path="/creative" element={<CreativePage />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
