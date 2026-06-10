const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit('user_joined', { socketId: socket.id });
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('leave_room', (roomId) => {
      socket.leave(roomId);
      socket.to(roomId).emit('user_left', { socketId: socket.id });
    });

    socket.on('send_reaction', ({ roomId, reaction }) => {
      socket.to(roomId).emit('receive_reaction', { reaction, socketId: socket.id });
    });

    socket.on('sync_playback', ({ roomId, trackUri, position }) => {
      socket.to(roomId).emit('playback_sync', { trackUri, position });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { initSocket };