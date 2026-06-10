import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import api from '../lib/api';

const socket = io('http://127.0.0.1:3001');

const Room = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/room').then((res) => setRooms(res.data)).catch(console.error);

    socket.on('receive_reaction', ({ reaction }) => {
      setReactions((prev) => [...prev, reaction]);
      setTimeout(() => setReactions((prev) => prev.slice(1)), 2000);
    });

    socket.on('user_joined', () => console.log('Someone joined'));

    return () => socket.disconnect();
  }, []);

  const createRoom = async () => {
    if (!roomName.trim()) return;
    const res = await api.post('/room', { name: roomName });
    setRooms((prev) => [...prev, res.data]);
    joinRoom(res.data);
    setRoomName('');
  };

  const joinRoom = (room) => {
    setActiveRoom(room);
    socket.emit('join_room', room.id);
  };

  const sendReaction = (emoji) => {
    socket.emit('send_reaction', { roomId: activeRoom.id, reaction: emoji });
    setReactions((prev) => [...prev, emoji]);
    setTimeout(() => setReactions((prev) => prev.slice(1)), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white px-6 py-10 max-w-4xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="text-white/40 hover:text-white mb-8 text-sm transition">← Back</button>
      <h2 className="text-3xl font-black mb-2">Listen Together</h2>
      <p className="text-white/40 mb-8">Create or join a room to vibe in real time</p>

      {!activeRoom ? (
        <>
          {/* Create room */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-6">
            <h3 className="font-bold mb-4">Create a Room</h3>
            <div className="flex gap-3">
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Room name..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#8b5cf6] transition"
              />
              <button onClick={createRoom} className="px-6 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-xl font-semibold transition">
                Create
              </button>
            </div>
          </div>

          {/* Active rooms */}
          <div className="space-y-3">
            {rooms.map((room) => (
              <div key={room.id} className="rounded-2xl bg-white/5 border border-white/10 p-5 flex justify-between items-center">
                <div>
                  <p className="font-bold">{room.name}</p>
                  <p className="text-white/40 text-sm">{room.participants?.length || 0} listening</p>
                </div>
                <button onClick={() => joinRoom(room)} className="px-5 py-2 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-full text-sm font-semibold hover:bg-[#8b5cf6]/30 transition">
                  Join
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Active room view */
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-center relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <button onClick={() => setActiveRoom(null)} className="text-white/40 hover:text-white text-sm transition">Leave</button>
          </div>

          <div className="w-24 h-24 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mx-auto mb-6 text-4xl">
            🎧
          </div>

          <h3 className="text-2xl font-black mb-2">{activeRoom.name}</h3>
          <p className="text-white/40 mb-8">You're listening together</p>

          {/* Reactions */}
          <div className="h-12 mb-6 flex items-center justify-center gap-2">
            {reactions.map((r, i) => (
              <span key={i} className="text-2xl animate-bounce">{r}</span>
            ))}
          </div>

          {/* Reaction buttons */}
          <div className="flex justify-center gap-4">
            {['🔥', '💜', '🎵', '✨', '😭'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => sendReaction(emoji)}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-xl transition hover:scale-110"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;