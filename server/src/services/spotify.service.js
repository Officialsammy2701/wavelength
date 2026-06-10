const axios = require('axios');
const querystring = require('querystring');

const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'streaming',
  'user-read-playback-state',
  'user-modify-playback-state'
].join(' ');

const getSpotifyAuthUrl = () => {
  const params = querystring.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: SCOPES
  });
  return `https://accounts.spotify.com/authorize?${params}`;
};

const getSpotifyTokens = async (code) => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      }
    }
  );
  return response.data;
};

const getSpotifyUser = async (accessToken) => {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response.data;
};

const getUserTopTracks = async (accessToken, timeRange = 'medium_term', limit = 50) => {
  const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { time_range: timeRange, limit }
  });
  return response.data.items;
};

const getUserTopArtists = async (accessToken, timeRange = 'medium_term', limit = 50) => {
  const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { time_range: timeRange, limit }
  });
  return response.data.items;
};

const refreshAccessToken = async (refreshToken) => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      }
    }
  );
  return response.data.access_token;
};

module.exports = { getSpotifyAuthUrl, getSpotifyTokens, getSpotifyUser, getUserTopTracks, getUserTopArtists, refreshAccessToken };