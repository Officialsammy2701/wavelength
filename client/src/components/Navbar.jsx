import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = 'http://127.0.0.1:3001/auth/logout';
  };

  return (
    <nav className="border-b border-[#ffffff10] px-6 py-4 flex items-center justify-between">
      <h1
        onClick={() => navigate('/dashboard')}
        className="text-2xl font-bold text-white cursor-pointer"
      >
        Wave<span className="text-[#e94560]">length</span>
      </h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="avatar" className="w-9 h-9 rounded-full object-cover border-2 border-[#e94560]/40" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#e94560]/20 flex items-center justify-center text-[#e94560] font-bold">
              {user?.displayName?.[0]}
            </div>
          )}
          <span className="text-[#aaaacc] text-sm">{user?.displayName}</span>
          <svg className={`w-4 h-4 text-[#666680] transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-[#16213e] border border-[#ffffff10] rounded-xl shadow-xl z-50 overflow-hidden">
            <button
              onClick={() => { navigate('/profile'); setOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm text-[#aaaacc] hover:bg-[#1a2a4a] hover:text-white transition flex items-center gap-2"
            >
              <span>🎵</span> Profile
            </button>
            <button
              onClick={() => { navigate('/matches'); setOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm text-[#aaaacc] hover:bg-[#1a2a4a] hover:text-white transition flex items-center gap-2"
            >
              <span>🔗</span> Matches
            </button>
            <button
              onClick={() => { navigate('/room/lobby'); setOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm text-[#aaaacc] hover:bg-[#1a2a4a] hover:text-white transition flex items-center gap-2"
            >
              <span>🎧</span> Listening Rooms
            </button>
            <div className="border-t border-[#ffffff10]" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-[#e94560] hover:bg-[#e94560]/10 transition flex items-center gap-2"
            >
              <span>→</span> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}