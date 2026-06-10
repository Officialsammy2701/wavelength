import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useStore from '../store/useStore';
import api from '../lib/api';

const Dashboard = () => {
  const { user } = useAuth();
  const { soundIdentity, setSoundIdentity, logout } = useStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateIdentity = async () => {
    setLoading(true);
    try {
      const res = await api.get('/user/sound-identity');
      setSoundIdentity(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white px-6 py-10 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black tracking-tighter">
          Wave<span className="text-[#8b5cf6]">length</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {user.avatarUrl && <img src={user.avatarUrl} className="w-9 h-9 rounded-full" alt="avatar" />}
            <span className="text-white/70 text-sm">{user.displayName}</span>
          </div>
          <button onClick={logout} className="text-white/40 hover:text-white text-sm transition">Logout</button>
        </div>
      </div>

      {/* Sound Identity Card */}
      <div className="rounded-3xl bg-white/5 border border-white/10 p-8 mb-6">
        <h2 className="text-xl font-bold mb-2">Your Sound Identity</h2>
        <p className="text-white/50 text-sm mb-6">Discover your musical personality powered by AI</p>

        {!soundIdentity ? (
          <button
            onClick={generateIdentity}
            disabled={loading}
            className="px-6 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Analyzing your sound...' : 'Generate My Sound Identity'}
          </button>
        ) : (
          <div>
            <div className="flex gap-3 mb-4">
              {soundIdentity.colorPalette?.map((color) => (
                <div key={color} className="w-8 h-8 rounded-full border-2 border-white/20" style={{ backgroundColor: color }} />
              ))}
            </div>
            <h3 className="text-2xl font-black text-[#8b5cf6] mb-3">{soundIdentity.title}</h3>
            <p className="text-white/70 mb-4">{soundIdentity.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {soundIdentity.traits?.map((trait) => (
                <span key={trait} className="px-3 py-1 rounded-full bg-[#8b5cf6]/20 text-[#8b5cf6] text-sm">{trait}</span>
              ))}
            </div>
            <p className="text-white/40 text-sm italic">Compatible with: {soundIdentity.compatibleWith}</p>
          </div>
        )}
      </div>

      {/* Nav Cards */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/match')}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left hover:bg-white/10 transition"
        >
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-bold mb-1">Find Your People</h3>
          <p className="text-white/40 text-sm">Match with others who share your sound</p>
        </button>
        <button
          onClick={() => navigate('/room')}
          className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left hover:bg-white/10 transition"
        >
          <div className="text-2xl mb-2">🎧</div>
          <h3 className="font-bold mb-1">Listen Together</h3>
          <p className="text-white/40 text-sm">Join a room and vibe in real time</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;