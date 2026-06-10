import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Match from './pages/Match';
import Room from './pages/Room';
import AuthSuccess from './pages/AuthSuccess';
import AuthError from './pages/AuthError';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/match" element={<Match />} />
        <Route path="/room" element={<Room />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/auth/error" element={<AuthError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;