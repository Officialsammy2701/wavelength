import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';
import useAuthStore from '../store/useAuthStore';
import api from '../lib/api';

const socket = io('http://127.0.0.1:3001');

export default function Room() {
  const { roomId } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [reactions, setReactions] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetchRooms();
    if (roomId !== 'lobby') {
      socket.emit('join_room', roomId);
    }
    socket.on('receive_reaction', ({ reaction }) => {
      setReactions((prev) => [...prev.slice(-10), reaction]);
    });
    socket.on('user_joined', () => {
      setReactions((prev) => [...prev, '👋']);
    });
    return () => {
      socket.off('receive_reaction');
      socket.off('user_joined');
      if (roomId !== 'lobby') socket.emit('leave_room', roomId);
    };
  }, [roomId]);

  useEffect(() => {
    const filtered = rooms.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRooms(filtered);
  }, [search, rooms]);

  const fetchRooms = async () => {
    try {
      const res = await api.get('/room');
      setRooms(res.data);
      setFilteredRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createRoom = async () => {
    if (!roomName.trim()) return;
    try {
      await api.post('/room', { name: roomName });
      setRoomName('');
      setShowCreate(false);
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await api.delete(`/room/${id}`);
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  const leaveRoom = () => {
    socket.emit('leave_room', roomId);
    navigate('/room/lobby');
  };

  const sendReaction = (emoji) => {
    socket.emit('send_reaction', { roomId, reaction: emoji });
    setReactions((prev) => [...prev.slice(-10), emoji]);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-4xl font-bold">
            Listening <span className="text-[#e94560]">Rooms</span>
          </h2>
          {roomId !== 'lobby' && (
            <button
              onClick={leaveRoom}
              className="px-4 py-2 bg-[#e94560]/20 text-[#e94560] rounded-full text-sm hover:bg-[#e94560]/30 transition"
            >
              ← Leave Room
            </button>
          )}
        </div>
        <p className="text-[#666680] mb-10">Listen together in real time</p>

        {/* Search + Create Bar */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rooms..."
              className="w-full bg-[#16213e] border border-[#ffffff15] rounded-xl px-4 py-3 text-white placeholder-[#444460] focus:outline-none focus:border-[#e94560]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 text-[#666680] hover:text-white"
              >✕</button>
            )}
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-6 py-3 bg-[#e94560] rounded-xl font-semibold hover:opacity-80 transition whitespace-nowrap"
          >
            + Create Room
          </button>
        </div>

        {/* Create Room Panel */}
        {showCreate && (
          <div className="bg-[#16213e] rounded-2xl p-6 mb-6 border border-[#e94560]/20">
            <h3 className="text-lg font-semibold mb-4">New Room</h3>
            <div className="flex gap-3">
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && createRoom()}
                placeholder="Room name..."
                className="flex-1 bg-[#0f0f1a] border border-[#ffffff15] rounded-xl px-4 py-3 text-white placeholder-[#444460] focus:outline-none focus:border-[#e94560]"
                autoFocus
              />
              <button
                onClick={createRoom}
                className="px-6 py-3 bg-[#e94560] rounded-xl font-semibold hover:opacity-80 transition"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-3 bg-[#ffffff10] rounded-xl hover:bg-[#ffffff15] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Live Reactions (inside a room) */}
        {roomId !== 'lobby' && (
          <div className="bg-[#16213e] rounded-2xl p-6 mb-8 border border-[#ffffff10]">
            <h3 className="text-lg font-semibold mb-4">React in Real Time</h3>
            <div className="flex gap-3 mb-4">
              {['🔥', '❤️', '🎵', '😭', '🚀', '👏'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => sendReaction(emoji)}
                  className="text-2xl hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap min-h-8">
              {reactions.map((r, i) => (
                <span key={i} className="text-2xl animate-bounce">{r}</span>
              ))}
            </div>
          </div>
        )}

        {/* Room List */}
        {filteredRooms.length === 0 ? (
          <div className="bg-[#16213e] rounded-2xl p-8 text-center border border-[#ffffff10]">
            <p className="text-[#666680]">
              {search ? `No rooms matching "${search}"` : 'No active rooms yet. Create one!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="bg-[#16213e] rounded-2xl p-6 border border-[#ffffff10] hover:border-[#e94560]/40 transition">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{room.name}</h3>
                  <button
                    onClick={() => deleteRoom(room.id)}
                    className="text-[#666680] hover:text-[#e94560] transition text-sm ml-2"
                    title="Delete room"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-[#666680] text-sm mb-4">
                  {room.participants?.length} listener{room.participants?.length !== 1 ? 's' : ''}
                </p>
                <button
                  onClick={() => navigate(`/room/${room.id}`)}
                  className="px-4 py-2 bg-[#e94560]/20 text-[#e94560] rounded-full text-sm hover:bg-[#e94560]/30 transition"
                >
                  Join Room
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}