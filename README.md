# Wavelength 🎵

> Discover your Sound Identity, find people who share your frequency, and listen together in real time.

## Live Demo
- **Live Demo:** [wavelength-orcin-five.vercel.app](https://wavelength-orcin-five.vercel.app)
- **Backend API:** [wavelength-production-f493.up.railway.app](https://wavelength-production-f493.up.railway.app) 
- **Health Check:** [wavelength-production-f493.up.railway.app/health](https://wavelength-production-f493.up.railway.app/health)

---

## What it does

Wavelength analyzes your Spotify listening history using AI to generate a **Sound Identity** — a personality profile told through your music. It then matches you with people who complement your frequency and lets you listen together in real time.

## Tech Stack

React · Node.js · PostgreSQL · Prisma · Spotify API · Claude API · Socket.io · JWT · Docker · GitHub Actions

## Features

- Spotify OAuth 2.0 login
- AI-generated Sound Identity and weekly Resonance Report
- Real-time listening rooms with live reactions
- Compatibility matching based on music taste

## Running Locally

```bash
# Clone
git clone https://github.com/Officialsammy2701/wavelength.git

# Install dependencies
cd server && npm install
cd ../client && npm install

# Start database
docker-compose up -d postgres

# Run migrations
cd server && npx prisma migrate dev

# Start backend
npm run dev

# Start frontend (new terminal)
cd client && npm run dev
```

Set up your `.env` using `.env.example` — you'll need a Spotify Developer app and Anthropic API key.

---

## Author

- Website - [Ismail Akande](https://github.com/Officialsammy2701)

---

*Built with intention. Every feature exists for a reason.*