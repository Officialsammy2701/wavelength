
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b border-[#ffffff10] px-6 py-4 flex items-center justify-between">
      <h1
        onClick={() => navigate('/dashboard')}
        className="text-2xl font-bold text-white cursor-pointer"
      >
        Wave<span className="text-[#e94560]">length</span>
      </h1>

      <div className="flex items-center gap-6">
        <button onClick={() => navigate('/profile')} className="text-[#aaaacc] hover:text-white transition text-sm">
          Profile
        </button>
        <button onClick={() => navigate('/matches')} className="text-[#aaaacc] hover:text-white transition text-sm">
          Matches
        </button>
        <div className="flex items-center gap-3">
            {user?.avatarUrl && (
                <img src={user.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-[#e94560]/40" />
            )}
            {user?.displayName && (
                <span className="text-[#aaaacc] text-sm">{user.displayName}</span>
            )}
            <button
                onClick={handleLogout}
                className="text-sm text-[#666680] hover:text-[#e94560] transition"
            >
                Logout
            </button>
        </div>
      </div>
    </nav>
  );
}