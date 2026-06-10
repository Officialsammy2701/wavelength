import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { user, setUser, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user/profile');
        setUser(res.data);
      } catch (err) {
        logout();
        navigate('/');
      }
    };
    if (!user) fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-2">
          Welcome back, <span className="text-[#e94560]">{user?.displayName}</span>
        </h2>
        <p className="text-[#666680] mb-10">What's your frequency today?</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate('/profile')}
            className="bg-[#16213e] rounded-2xl p-6 cursor-pointer hover:bg-[#1a2a4a] transition border border-[#ffffff10] hover:border-[#e94560]/40"
          >
            <div className="text-3xl mb-3">🎵</div>
            <h3 className="text-xl font-semibold mb-1">Sound Identity</h3>
            <p className="text-[#666680] text-sm">Discover what your music says about you</p>
          </div>

          <div
            onClick={() => navigate('/matches')}
            className="bg-[#16213e] rounded-2xl p-6 cursor-pointer hover:bg-[#1a2a4a] transition border border-[#ffffff10] hover:border-[#e94560]/40"
          >
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="text-xl font-semibold mb-1">Find Your People</h3>
            <p className="text-[#666680] text-sm">Connect with people who share your frequency</p>
          </div>

          <div
            onClick={() => navigate('/room/lobby')}
            className="bg-[#16213e] rounded-2xl p-6 cursor-pointer hover:bg-[#1a2a4a] transition border border-[#ffffff10] hover:border-[#e94560]/40"
          >
            <div className="text-3xl mb-3">🎧</div>
            <h3 className="text-xl font-semibold mb-1">Listening Rooms</h3>
            <p className="text-[#666680] text-sm">Listen together in real time</p>
          </div>
        </div>
      </div>
    </div>
  );
}