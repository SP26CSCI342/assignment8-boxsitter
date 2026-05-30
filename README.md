# PlateScout — Assignment 8

Name: Leyton Houck

## Live URLs

- **Client:** https://platescout-leyton.vercel.app
- **Server:** https://platescout-leyton.onrender.com
- **Server health check:** https://platescout-leyton.onrender.com/api/health

## Local setup

1. Clone the repo
2. Copy `server/.env.example` to `server/.env` and fill in `MONGO_URI` + `JWT_SECRET`
3. From the root: `npm install` (client) and `cd server && npm install` (server)
4. Two terminals: `npm run dev` (root, client) + `npm run dev` (server)
5. Open http://localhost:5173

## What I learned during deployment

Honestly, deployment was pretty easy. I have developed web apps in the past and
deployed with various services like firebase and github pages. So the basic
process was very similar to what I had done in the past. Coordinating everything
between the services to make sure they could communicate was the trickiest part,
but not too bad.
