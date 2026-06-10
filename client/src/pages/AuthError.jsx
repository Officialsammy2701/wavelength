import { useNavigate } from 'react-router-dom';

const AuthError = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-4">
      <p className="text-white text-xl">Something went wrong with Spotify auth.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-[#1db954] text-black font-bold rounded-full hover:bg-[#1ed760] transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default AuthError;