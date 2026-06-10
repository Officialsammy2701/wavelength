import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../lib/api';

const Match = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/match')
      .then((res) => setUsers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white px-6 py-10 max-w-4xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="text-white/40 hover:text-white mb-8 text-sm transition">← Back</button>
      <h2 className="text-3xl font-black mb-2">Find Your People</h2>
      <p className="text-white/40 mb-8">People whose sound complements yours</p>

      {loading ? (
        <p className="text-white/40">Finding matches...</p>
      ) : users.length === 0 ? (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
          <p className="text-white/40">No matches yet. More people need to generate their Sound Identity.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {users.map((u) => (
            <div key={u.id} className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                {u.avatarUrl && <img src={u.avatarUrl} className="w-10 h-10 rounded-full" alt="" />}
                <span className="font-bold">{u.displayName}</span>
              </div>
              {u.soundIdentity && (
                <>
                  <p className="text-[#8b5cf6] font-semibold text-sm mb-2">{u.soundIdentity.title}</p>
                  <div className="flex gap-2 flex-wrap">
                    {u.soundIdentity.traits?.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-1 rounded-full bg-white/5 text-white/50 text-xs">{t}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Match;