const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { getSpotifyAuthUrl, getSpotifyTokens, getSpotifyUser } = require('../services/spotify.service');

const prisma = new PrismaClient();

const spotifyLogin = (req, res) => {
  const url = getSpotifyAuthUrl();
  res.redirect(url);
};

const spotifyCallback = async (req, res) => {
  try {
    console.log('🎵 Callback hit');
    console.log('Query params:', req.query);
    
    const { code, error } = req.query;
    
    if (error) {
      console.error('Spotify auth error:', error);
      return res.redirect(`${process.env.CLIENT_URL}/auth/error?error=${error}`);
    }
    
    if (!code) {
      console.error('No code received');
      return res.status(400).json({ error: 'No authorization code received' });
    }

    console.log('Exchanging code for tokens...');
    const tokens = await getSpotifyTokens(code);
    console.log('Tokens received ✓');
    
    const spotifyUser = await getSpotifyUser(tokens.access_token);
    console.log('Spotify user fetched:', spotifyUser.display_name);

    let user = await prisma.user.findUnique({ where: { spotifyId: spotifyUser.id } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          spotifyId: spotifyUser.id,
          displayName: spotifyUser.display_name,
          email: spotifyUser.email,
          avatarUrl: spotifyUser.images?.[0]?.url,
          spotifyUrl: spotifyUser.external_urls?.spotify,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }
      });
      console.log('New user created ✓');
    } else {
      user = await prisma.user.update({
        where: { spotifyId: spotifyUser.id },
        data: { accessToken: tokens.access_token, refreshToken: tokens.refresh_token }
      });
      console.log('Existing user updated ✓');
    }

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('JWT generated ✓');
    console.log('Redirecting to:', `${process.env.CLIENT_URL}/auth/success?token=${jwtToken}`);
    
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${jwtToken}`);
  } catch (err) {
    console.error('❌ Callback error:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  }
};

const refreshToken = async (req, res) => {
  res.json({ message: 'Refresh token endpoint' });
};

const logout = (req, res) => {
  const clientUrl = process.env.CLIENT_URL;
  res.redirect(
    `https://accounts.spotify.com/en/logout?continue=${encodeURIComponent(clientUrl)}`
  );
};

module.exports = { spotifyLogin, spotifyCallback, refreshToken, logout };