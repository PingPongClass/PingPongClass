import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import DashBoard from './views/DashBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
