const { PrismaClient } = require('@prisma/client');
const { generateSoundIdentity, generateResonanceReport } = require('../services/claude.service');
const { getUserTopTracks, getUserTopArtists } = require('../services/spotify.service');

const prisma = new PrismaClient();

const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSoundIdentity = async (req, res) => {
  try {
    console.log('Fetching top tracks and artists for:', req.user.displayName);
    
    const [topTracks, topArtists] = await Promise.all([
      getUserTopTracks(req.user.accessToken),
      getUserTopArtists(req.user.accessToken)
    ]);

    console.log('Top tracks fetched:', topTracks.length);
    console.log('Top artists fetched:', topArtists.length);

    const identity = await generateSoundIdentity(topTracks, topArtists, req.user.displayName);
    console.log('Sound identity generated:', identity);

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
    const [topTracks, topArtists] = await Promise.all([
      getUserTopTracks(req.user.accessToken, 'short_term'),
      getUserTopArtists(req.user.accessToken, 'short_term')
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

module.exports = { getProfile, getSoundIdentity, getResonanceReport };