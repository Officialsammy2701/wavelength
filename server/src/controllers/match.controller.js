const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getMatches = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { id: { not: req.user.id }, soundIdentity: { not: null } },
      select: { id: true, displayName: true, avatarUrl: true, soundIdentity: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCompatibility = async (req, res) => {
  try {
    const otherUser = await prisma.user.findUnique({ where: { id: req.params.userId } });
    if (!otherUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Compatibility endpoint', userId: req.params.userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMatches, getCompatibility };