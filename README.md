# 🎓 GLA Anything

> One platform for GLA University students — Food 🍔 · Confessions 🎭 · Notes 📚 · Placements 🏢

A campus super-app built by a GLA student, for GLA students.

## Tech Stack

- **Frontend**: React + Vite + React Router
- **Backend**: Node.js + Express
- **Database**: MySQL + Sequelize
- **Auth**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS with CSS Variables (Space Grotesk font)

## Project Structure
```
gla-food-finder/
├── frontend/         → React app (UI)
├── backend/          → Node.js + Express API
└── README.md
```

## Features

- 🍔 **Food** — Browse inside + outside campus shops, mess options, price compare
- 🎭 **Confessions** — 100% anonymous feed, random animal identity, no name revealed ever
- 📚 **Notes & PYQ** — Subject-wise notes, free + premium content
- 🏢 **Placements** — Company listings, alerts, interview experiences
- 🔒 **Auth** — JWT login, save shops, unlock contacts & premium content
- 📱 **Responsive** — Works on mobile + desktop

## Quick Start

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your MySQL credentials
node seeders/seed.js   # create tables
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

## Environment Variables

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gla_anything
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

## From a GLA student who was tired of not knowing where to eat ;)
