# 🍽️ GLA Food Finder

A campus food discovery app for GLA University students.

## Tech Stack
- **Frontend**: React + Vite + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS with CSS Variables

## Project Structure
```
gla-food-finder/
├── frontend/         → React app (UI)
├── backend/          → Node.js + Express API
└── README.md
```

## Quick Start

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your MongoDB URI
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

## Features
- Browse food shops (inside + outside campus)
- Affordable outside mess listings
- Student reviews (no login needed for reading/writing)
- Sign up to unlock: save shops, view contacts, exclusive deals
- Mobile-first design built for hostel students
