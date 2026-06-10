import { useEffect, useState } from 'react';
import api from '../lib/api';
import Navbar from '../components/Navbar';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get('/match');
        setMatches(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-2">Find Your <span className="text-[#e94560]">People</span></h2>
        <p className="text-[#666680] mb-10">People who share your frequency</p>

        {loading ? (
          <p className="text-[#666680] animate-pulse">Finding your matches...</p>
        ) : matches.length === 0 ? (
          <div className="bg-[#16213e] rounded-2xl p-8 text-center border border-[#ffffff10]">
            <p className="text-[#666680]">No matches yet. Be the first to generate your Sound Identity!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div key={match.id} className="bg-[#16213e] rounded-2xl p-6 border border-[#ffffff10] hover:border-[#e94560]/40 transition">
                <div className="flex items-center gap-3 mb-4">
                  {match.avatarUrl ? (
                    <img src={match.avatarUrl} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#e94560]/20 flex items-center justify-center text-[#e94560] font-bold text-lg">
                      {match.displayName?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{match.displayName}</p>
                    {match.soundIdentity?.title && (
                      <p className="text-[#e94560] text-xs">{match.soundIdentity.title}</p>
                    )}
                  </div>
                </div>
                {match.soundIdentity?.description && (
                  <p className="text-[#666680] text-sm line-clamp-2">{match.soundIdentity.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
