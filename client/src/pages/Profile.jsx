import { useState, useEffect } from "react";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/useAuthStore";

export default function Profile() {
  const { user } = useAuthStore();
  const [identity, setIdentity] = useState(null);
  const [report, setReport] = useState(null);
  const [loadingIdentity, setLoadingIdentity] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    const loadSavedIdentity = async () => {
      try {
        const res = await api.get("/user/profile");
        if (res.data.soundIdentity) {
          setIdentity(res.data.soundIdentity);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadSavedIdentity();
  }, []);

  const fetchIdentity = async () => {
    setLoadingIdentity(true);
    try {
      const res = await api.get("/user/sound-identity");
      setIdentity(res.data);
    } catch (err) {
      console.error("Sound identity error:", err.response?.data || err.message);
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
    setLoadingIdentity(false);
  };

  const fetchReport = async () => {
    setLoadingReport(true);
    try {
      const res = await api.get("/user/resonance-report");
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoadingReport(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* User Header */}
        <div className="flex items-center gap-4 mb-10">
          {user?.avatarUrl && (
            <img
              src={user.avatarUrl}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#e94560]"
            />
          )}
          <div>
            <h2 className="text-3xl font-bold">{user?.displayName}</h2>
            <p className="text-[#666680] text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Sound Identity */}
        <div className="bg-[#16213e] rounded-2xl p-6 mb-6 border border-[#ffffff10]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">🎵 Sound Identity</h3>
            <button
              onClick={fetchIdentity}
              disabled={loadingIdentity}
              className="px-4 py-2 bg-[#e94560] rounded-full text-sm hover:opacity-80 transition disabled:opacity-50"
            >
              {loadingIdentity ? "Generating..." : "Generate"}
            </button>
          </div>

          {identity ? (
            <div>
              <h4 className="text-2xl font-bold text-[#e94560] mb-2">
                {identity.title}
              </h4>
              <p className="text-[#aaaacc] mb-4">{identity.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {identity.traits?.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 bg-[#0f0f1a] rounded-full text-sm text-[#aaaacc] border border-[#ffffff15]"
                  >
                    {trait}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {identity.colorPalette?.map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border border-[#ffffff20]"
                    style={{ backgroundColor: `#${color.replace("#", "")}` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-[#666680] text-sm">
              Generate your Sound Identity to see what your music says about
              you.
            </p>
          )}
        </div>

        {/* Resonance Report */}
        <div className="bg-[#16213e] rounded-2xl p-6 border border-[#ffffff10]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">📊 Resonance Report</h3>
            <button
              onClick={fetchReport}
              disabled={loadingReport}
              className="px-4 py-2 bg-[#e94560] rounded-full text-sm hover:opacity-80 transition disabled:opacity-50"
            >
              {loadingReport ? "Generating..." : "Generate"}
            </button>
          </div>

          {report ? (
            <div>
              <p className="text-[#aaaacc] mb-4">{report.weekSummary}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0f0f1a] rounded-xl p-4">
                  <p className="text-[#666680] text-xs mb-1">
                    Dominant Emotion
                  </p>
                  <p className="text-white font-semibold capitalize">
                    {report.dominantEmotion}
                  </p>
                </div>
                <div className="bg-[#0f0f1a] rounded-xl p-4">
                  <p className="text-[#666680] text-xs mb-1">Energy Level</p>
                  <p className="text-white font-semibold capitalize">
                    {report.energyLevel}
                  </p>
                </div>
                <div className="bg-[#0f0f1a] rounded-xl p-4 col-span-2">
                  <p className="text-[#666680] text-xs mb-1">
                    Song of the Week
                  </p>
                  <p className="text-white font-semibold">
                    {report.songOfTheWeek}
                  </p>
                </div>
              </div>
              <p className="text-[#e94560] text-sm mt-4 italic">
                "{report.insight}"
              </p>
            </div>
          ) : (
            <p className="text-[#666680] text-sm">
              Generate your weekly Resonance Report to see what your music
              reveals about your week.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
