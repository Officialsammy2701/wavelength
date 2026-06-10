const Landing = () => {
  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:3001/auth/login';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6] opacity-10 rounded-full blur-[120px] pointer-events-none" />

      {/* Logo */}
      <div className="mb-8 text-center z-10">
        <h1 className="text-6xl font-black text-white tracking-tighter">
          Wave<span className="text-[#8b5cf6]">length</span>
        </h1>
        <p className="text-[#666680] mt-3 text-lg">Music is your language. Find who speaks it.</p>
      </div>

      {/* Cards row */}
      <div className="flex gap-4 mb-12 z-10">
        {["Sound Identity", "Find Your People", "Listen Together"].map((feature) => (
          <div key={feature} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-sm backdrop-blur">
            {feature}
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={handleLogin}
        className="z-10 flex items-center gap-3 px-8 py-4 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold text-lg rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-[#1db954]/20"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        Continue with Spotify
      </button>

      <p className="mt-6 text-[#444460] text-sm z-10">
        Your music. Your identity. Your people.
      </p>
    </div>
  );
};

export default Landing;