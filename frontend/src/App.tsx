import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Login from './pages/Login';
import Home from './pages/Home';
import DarkDen from './pages/DarkDen';
import TimeMachine from './pages/TimeMachine';
import PastJourney from './pages/past/PastJourney';
import FutureJourney from './pages/future/FutureJourney';
import Present from './pages/Present';
import ProtectedRoute from './components/ProtectedRoute';
import FindingHeartStone from './pages/future/FindingHeartStone';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/dark-den" element={<ProtectedRoute><DarkDen /></ProtectedRoute>} />
          <Route path="/time-machine" element={<ProtectedRoute><TimeMachine /></ProtectedRoute>} />
          <Route path="/journey/past/*" element={<ProtectedRoute><PastJourney /></ProtectedRoute>} />
          <Route path="/journey/future/*" element={<ProtectedRoute><FutureJourney /></ProtectedRoute>} />
          <Route path="/present" element={<ProtectedRoute><Present /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/\" replace />} />
          <Route path="/FindMe" element={<FindingHeartStone />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;