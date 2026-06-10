const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const room = await prisma.room.create({
      data: {
        name,
        participants: { create: { userId: req.user.id } }
      },
      include: { participants: true }
    });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      where: { isActive: true },
      include: { participants: { include: { user: { select: { displayName: true, avatarUrl: true } } } } }
    });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const joinRoom = async (req, res) => {
  try {
    const participant = await prisma.roomParticipant.create({
      data: { userId: req.user.id, roomId: req.params.roomId }
    });
    res.json(participant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    await prisma.roomParticipant.deleteMany({ where: { roomId: req.params.roomId } });
    await prisma.room.delete({ where: { id: req.params.roomId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRoom, getRooms, joinRoom, deleteRoom };