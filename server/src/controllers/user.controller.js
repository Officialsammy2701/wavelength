const { PrismaClient } = require('@prisma/client');
const { generateSoundIdentity, generateResonanceReport } = require('../services/claude.service');
const { getUserTopTracks, getUserTopArtists, refreshAccessToken } = require('../services/spotify.service');

const prisma = new PrismaClient();

const getSoundIdentity = async (req, res) => {
  try {
    console.log('Fetching top tracks and artists for:', req.user.displayName);

    // Refresh token first
    const freshToken = await refreshAccessToken(req.user.refreshToken);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { accessToken: freshToken }
    });

    const [topTracks, topArtists] = await Promise.all([
      getUserTopTracks(freshToken),
      getUserTopArtists(freshToken)
    ]);

    console.log('Top tracks fetched:', topTracks.length);
    console.log('Top artists fetched:', topArtists.length);

    const identity = await generateSoundIdentity(topTracks, topArtists, req.user.displayName);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { soundIdentity: identity }
    });

    res.json(identity);
  } catch (err) {
    console.error('❌ Sound identity error:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  }
};

const getResonanceReport = async (req, res) => {
  try {
    const freshToken = await refreshAccessToken(req.user.refreshToken);

    const [topTracks, topArtists] = await Promise.all([
      getUserTopTracks(freshToken, 'short_term'),
      getUserTopArtists(freshToken, 'short_term')
    ]);

    const report = await generateResonanceReport(topTracks, topArtists, req.user.displayName);

    await prisma.resonanceReport.create({
      data: {
        userId: req.user.id,
        weekOf: new Date(),
        report
      }
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProfile, getSoundIdentity, getResonanceReport };