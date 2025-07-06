# 🎬 Movie Explorer (MERN + Vite + Tailwind)

> Search TMDB, infinite-scroll the results and save favourites.

---

🚀 Tech Stack Used

<p align="left"> <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React" /> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" /> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js" /> <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white" alt="Express" /> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white" alt="MongoDB" /> <img src="https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white" alt="Mongoose" /> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white" alt="Axios" /> <img src="https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=react-router&logoColor=white" alt="React Router" /> <img src="https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white" alt="PWA" /> </p>

---

📁 Project Structure

<pre> movie-explorer/
│
├─ backend/                         # Node + Express (MERN API)
│  ├─ config/                       # DB + helper configs
│  │  └─ db.js
│  ├─ controllers/                  # Future controller modules
│  ├─ middleware/                   # Custom middleware (auth, etc.)
│  ├─ models/
│  │  └─ movieFavourite.js
│  ├─ routes/
│  │  ├─ favouriteRoutes.mjs
│  │  └─ searchRoutes.mjs
│  ├─ node_modules/
│  ├─ package.json                  # **NO dependencies here** – all hoisted
│  └─ server.mjs
│
├─ frontend/                        # React (+SWC) client
│  ├─ public/                       # vite public assets
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ MovieCard.jsx
│  │  │  └─ NavBar.jsx
│  │  ├─ context/
│  │  │  └─ FavouritesContext.jsx
│  │  ├─ hooks/
│  │  │  └─ useMovieSearch.js
│  │  ├─ pages/
│  │  │  ├─ Home.jsx
│  │  │  └─ MovieDetails.jsx
│  │  ├─ styles/                    # CSS Modules & Tailwind layer
│  │  │  ├─ Layout.module.css
│  │  │  ├─ MoviesGrid.module.css
│  │  │  └─ MovieCard.module.css
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ vite.config.js
│  └─ tailwind.config.js
│
├─ node_modules/                    # **All workspace-shared deps**
├─ .env        # public vars (DEV_PORT, PREVIEW_PORT, PORT)
├─ .env.local  # secrets (TMDB_API_KEY, MONGO_URI, JWT_SECRET …)
├─ .npmrc      # workspaces-hoist=false   ← keeps deps hoisted
└─ package.json  # root workspace + scripts</pre>

## Features

| Area          | Tech & Notes                                                     |
| ------------- | ---------------------------------------------------------------- |
| **Frontend**  | Vite 7 + React (SWC), Tailwind CSS, React-Router v6, React Icons |
| **State**     | Local context + `useReducer` for favourites                      |
| **API Proxy** | Express route → TMDB (keeps API key secret) w/ axios-retry       |
| **DB**        | MongoDB Atlas via Mongoose (stores favourites per user)          |
| **Auth Stub** | Session cookie (`express-session` + `connect-mongo`)             |
| **PWA**       | vite-plugin-pwa – JSON + poster cache                            |
| **Infra**     | PNPM-style workspaces with `npm workspaces`, hoist disabled      |

---

## Quick start

```bash
# 1  clone
git clone https://github.com/<you>/movie-explorer.git
cd movie-explorer

# 2  install deps (root + workspaces)
npm i

# 3  create secrets
.env and .env.local
in .env(optional): keep your port number
in .env.local : keep your key and secret key
# edit TMDB_API_KEY, MONGO_URI, …

# 4  dev (concurrently runs backend :2005 + frontend :2003)
npm run dev
Script	What it does
npm run dev	nodemon + vite with proxy
npm run build	Build React into frontend/dist
npm run lint	ESLint (optionally add Prettier)

API
Method	Route	Purpose
GET	/api/search?query⟨q⟩	Proxy to TMDB search
GET	/api/favourites	List logged-in favourites
POST	/api/favourites	Toggle favourite {tmdbId}


Next -- Road-map
🔲 JWT login

🔲 Unit tests with Vitest + supertest

🔲 Deploy (Render + Netlify)

Credits
TMDB © themoviedb.org

Icons by react-icons

Design inspired by tailwind-UI
```

Built as a learning exercise – use it, tweak it, break it, fix it. Have fun! 🎉
