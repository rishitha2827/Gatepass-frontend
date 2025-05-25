import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HODDashboard from './pages/HODDashboard';
import WatchmanDashboard from './pages/WatchmanDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/hod" element={<HODDashboard />} />
        <Route path="/watchman" element={<WatchmanDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
