# Wavelength 🎵

> AI music identity and social connection platform — discover what your music says about you, find people who share your frequency, and listen together in real time.

**Live Demo:** [wavelength.vercel.app](#) *(coming soon)*
**Backend API:** [wavelength-api.railway.app](#) *(coming soon)*

---

## The Problem

Music is the most universal human connector — but every music app is built for solo listening. There's no meaningful social layer that uses music to bring people together beyond playlist sharing.

## The Solution

Wavelength analyzes your Spotify listening behavior using AI to generate a **Sound Identity** — a personality profile told through your music. It then matches you with people who complement your frequency and lets you listen together in real time.

---

## Features

- **Spotify OAuth 2.0** — seamless login with your Spotify account
- **AI Sound Identity** — Claude AI analyzes your top 50 tracks and artists to generate a unique musical personality profile
- **Resonance Report** — weekly emotional music summary powered by AI
- **Compatibility Matching** — find people who complement your sound
- **Real-time Listening Rooms** — listen together with live reactions via WebSockets
- **JWT Authentication** — secure token-based auth with protected routes

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL, Prisma ORM |
| Auth | Spotify OAuth 2.0, JWT |
| AI | Anthropic Claude API |
| Real-time | Socket.io |
| Deployment | Vercel (frontend), Railway (backend + DB) |
| CI/CD | GitHub Actions |

---

## Architecture

```
Client (React + Vite)
    ↓ HTTP requests
Express REST API (Node.js)
    ↓ Prisma ORM
PostgreSQL Database
    ↓ External APIs
Spotify API + Anthropic Claude API
    ↓ Real-time
Socket.io (WebSockets)
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Docker Desktop (for local PostgreSQL)
- Spotify Developer Account
- Anthropic API Key

### Installation

```bash
# Clone the repo
git clone https://github.com/Officialsammy2701/wavelength.git
cd wavelength

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables

Create a `.env` file in the `server/` folder:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3001/auth/callback
ANTHROPIC_API_KEY=your_anthropic_api_key
DATABASE_URL=postgresql://postgres:password@localhost:5432/wavelength
JWT_SECRET=your_jwt_secret
PORT=3001
CLIENT_URL=http://localhost:5173
```

### Run Locally

```bash
# Start the database
docker-compose up -d postgres

# Run database migrations
cd server && npx prisma migrate dev

# Start the backend
npm run dev

# In a new terminal, start the frontend
cd client && npm run dev
```

Open `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/auth/login` | Initiate Spotify OAuth | No |
| GET | `/auth/callback` | Spotify OAuth callback | No |
| GET | `/user/profile` | Get current user profile | Yes |
| GET | `/user/sound-identity` | Generate AI sound identity | Yes |
| GET | `/user/resonance-report` | Generate weekly resonance report | Yes |
| GET | `/match` | Get compatible users | Yes |
| POST | `/room` | Create listening room | Yes |
| GET | `/room` | Get active rooms | Yes |
| POST | `/room/:id/join` | Join a room | Yes |

---

## Performance

- API response time: < 200ms for standard endpoints
- Sound Identity generation: < 3s (Claude API)
- WebSocket connection: < 100ms latency

---

## Roadmap

- [ ] Spotify playback control in listening rooms
- [ ] Advanced compatibility algorithm using audio features
- [ ] Mobile app (React Native + Expo)
- [ ] Playlist generation based on compatibility
- [ ] Group listening rooms with chat

---

## Author

**Ismail** — CS Student @ UPEI
- GitHub: [@Officialsammy2701]( https://github.com/Officialsammy2701)
- Portfolio: *coming soon*

---

*Built with intention. Every feature exists for a reason.*