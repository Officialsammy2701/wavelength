## WaveLength

### Description

"Music as a shared language" 

Category: Web app + AI + Music + Social

The real problem: Music is the most universal human connector but every music app is built for solo listening. Nobody has built a social layer that actually uses music to bring people together in a meaningful way.

What makes it different: It is not a playlist sharing app. It is a compatibility and connection tool built entirely around music taste and emotional relationship with sound.

What it does:
•	Connect your Spotify — AI analyzes not just what you listen to but how you listen (late night sad music, early morning hype, focus playlists, etc.)
•	Generates your "sound identity" — a visual + written profile of who you are through your music
•	Match with people who complement your sound identity (not just similar taste — complementary energy)
•	Shared listening rooms where two people listen simultaneously and react in real time
•	Weekly "resonance report" — what your music said about your week emotionally

What makes recruiters stop scrolling: Spotify API + AI personality profiling + real-time features + a beautiful UI that feels like a music magazine. This is a product people would actually pay for.

Tech: React + Spotify API + Claude API + Node.js + WebSockets + PostgreSQL

---

## Wavelength — Full Project Blueprint

### The Stack
| Layer | Tech | Why |
|-------|------|-----|
| Frontend | React + Vite + Tailwind CSS | Fast, modern, deployable to Vercel |
| Backend | Node.js + Express | Your strength, perfect for API work |
| Database | PostgreSQL + Prisma | Relational, professional, Railway-hosted |
| Auth | Spotify OAuth 2.0 | Login with Spotify = no signup friction |
| AI Layer | Claude API | Sound identity generation + resonance reports |
| Real-time | Socket.io | Shared listening rooms |
| Deployment | Vercel (frontend) + Railway (backend + DB) | Industry standard split |
| CI/CD | GitHub Actions | Auto-deploy on push |
| Containerization | Docker + docker-compose | Local dev environment |
| Testing | Jest + Supertest | Backend API tests |
| Docs | Swagger | API documentation |

---

### Folder Structure
```
wavelength/
├── client/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/            # Zustand state management
│   │   └── lib/              # API calls, helpers
│   └── vite.config.js
│
├── server/                   # Node.js + Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/         # Spotify, Claude, Socket logic
│   │   ├── middleware/
│   │   ├── prisma/           # Schema + migrations
│   │   └── tests/            # Jest + Supertest
│   └── index.js
│
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions CI/CD
├── docker-compose.yml
├── .env.example
└── README.md
```

---

### Core Features (Build Order)
**Week 1 — Foundation**
- Spotify OAuth login
- Pull user's top tracks, artists, listening history
- Store user profile in PostgreSQL via Prisma
- Basic React shell with routing

**Week 2 — The AI Core**
- Send listening data to Claude API
- Generate "Sound Identity" — a visual + written profile
- Resonance Report (weekly emotional music summary)
- Sound Identity displayed on profile page

**Week 3 — Social + Real-time**
- Compatibility matching algorithm (compare sound identities)
- Find your people — browse matched users
- Shared listening rooms with Socket.io
- Live reactions during shared listening

**Week 4 — Polish + Ship**
- GitHub Actions CI/CD pipeline
- Docker setup
- Swagger API docs
- README written as a case study
- Deploy to Vercel + Railway
- Performance testing + bug fixes

---

### The 5 Job Description Keywords to Hit
Based on what companies hiring junior fullstack/AI devs want right now:

1. `LLM API integration` — Claude API for sound identity
2. `Real-time communication` — Socket.io listening rooms
3. `OAuth 2.0 authentication` — Spotify login
4. `RESTful API design` — your Express backend
5. `CI/CD pipeline` — GitHub Actions auto-deploy

Every single one of these will be in Wavelength naturally — not forced.

---

### Your Resume Line (Ready to Use After Building)
> **Wavelength** — AI music identity and social connection platform | React, Node.js, Spotify API, Claude API, Socket.io, PostgreSQL, Docker
> - Engineered real-time shared listening rooms using Socket.io supporting simultaneous playback and live user reactions
> - Integrated Spotify OAuth 2.0 and Claude API to generate personality-driven sound identity profiles from user listening behavior
> - Built RESTful API with JWT middleware, rate limiting, and Swagger documentation deployed via CI/CD pipeline on Railway

---

## 3 Things You Need to Set Up

**1. Spotify Developer Account**
Go to [developer.spotify.com](https://developer.spotify.com) → create an app → grab your `Client ID` and `Client Secret`

`SPOTIFY_CLIENT_ID` = spotify_client_id_here
`SPOTIFY_CLIENT_SECRET`: spotify_client_secret_here
`SPOTIFY_REDIRECT_URL`: http://127.0.0.1:5000/api/auth/callback/spotify

**2. Anthropic API Key**
Go to [console.anthropic.com](https://console.anthropic.com) → create an API key

`ANTHROPIC_APT_KEY` = your_actual_claude_api_key_here

**3. GitHub Repo**
Create a new repo called `wavelength` — make it public so recruiters can find it

---

