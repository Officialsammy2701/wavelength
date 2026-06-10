const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const generateSoundIdentity = async (topTracks, topArtists, displayName) => {
  const trackList = topTracks
    .slice(0, 20)
    .filter(t => t && t.name && t.artists && t.artists.length > 0)
    .map(t => `${t.name} by ${t.artists[0].name}`)
    .join(', ');

  const artistList = topArtists
    .slice(0, 10)
    .filter(a => a && a.name)
    .map(a => `${a.name} (${(a.genres || []).slice(0, 2).join(', ')})`)
    .join(', ');

  console.log('Sending to Claude - Tracks:', trackList.slice(0, 100));
  console.log('Sending to Claude - Artists:', artistList.slice(0, 100));

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Based on this person's music taste, create their "Sound Identity" — a personality profile told through music.

Name: ${displayName}
Top Tracks: ${trackList}
Top Artists: ${artistList}

Return a JSON object with these exact fields:
{
  "title": "a creative 2-4 word title for their sound identity (e.g. 'Midnight Frequency Chaser')",
  "description": "2-3 sentences describing their musical personality and what it says about them as a person",
  "traits": ["3-5 personality traits inferred from their music"],
  "listeningMoods": ["3 moods or situations they likely listen in"],
  "colorPalette": ["3 hex color codes that represent their sound"],
  "compatibleWith": "a short description of what kind of person would complement their sound"
}

Return only valid JSON, no other text.`
    }]
  });

  const raw = message.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(raw);
};

const generateResonanceReport = async (topTracks, topArtists, displayName) => {
  const trackList = topTracks.slice(0, 10).map(t => `${t.name} by ${t.artists[0].name}`).join(', ');
  const artistList = topArtists.slice(0, 5).map(a => a.name).join(', ');

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Based on this person's recent music listening, generate their weekly "Resonance Report" — an emotional music summary.

Name: ${displayName}
Recent Top Tracks: ${trackList}
Recent Top Artists: ${artistList}

Return a JSON object with these exact fields:
{
  "weekSummary": "2-3 sentences about the emotional tone of their week based on music",
  "dominantEmotion": "one word describing the dominant emotional state",
  "energyLevel": "low | medium | high",
  "topGenres": ["2-3 genres that dominated this week"],
  "insight": "one meaningful insight about what their music choices this week reveal",
  "songOfTheWeek": "the track that best captures their week (from the list provided)"
}

Return only valid JSON, no other text.`
    }]
  });

  const raw = message.content[0].text.replace(/```json|```/g, '').trim();
  return JSON.parse(raw);
};

module.exports = { generateSoundIdentity, generateResonanceReport };