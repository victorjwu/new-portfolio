
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import BubbleCursor from './components/BubbleCursor';
import './styles/global.css';

function App() {
  return (
    <Router>
      <BubbleCursor />
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* 
          Placeholder routes for future implementation:
          <Route path="/swe" element={<SoftwareEngineeringPage />} />
          <Route path="/creative" element={<CreativePage />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
