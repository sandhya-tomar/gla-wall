# 🚀 Complete Setup Guide — GLA Anything

---

## STEP 1 — Install MySQL on your laptop

### If you don't have MySQL:
1. Download **XAMPP** from https://www.apachefriends.org  
   (Easiest for students — has MySQL + phpMyAdmin built in)
2. Install and open XAMPP Control Panel
3. Start **Apache** and **MySQL** (click the Start buttons)
4. Open browser → go to: http://localhost/phpmyadmin

### Create the database:
In phpMyAdmin, click "New" → type `gla_anything` → click Create

---

## STEP 2 — Setup backend

```bash
cd gla-food-finder/backend

# Install all packages
npm install

# Copy the env file and fill in your details
cp .env.example .env
```

Now open `.env` and change:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gla_anything
DB_USER=root
DB_PASSWORD=          ← leave blank if XAMPP default, or your MySQL password
JWT_SECRET=gla2024supersecretkey123456789
```

---

## STEP 3 — Seed the database (add all initial data)

```bash
cd backend
node seeders/seed.js
```

This will create ALL tables and fill them with:
- 8 campus food shops (inside + outside)
- 3 mess options with prices
- 8 notes/PYQs
- 4 placement listings
- 1 admin account

**Admin login:** `admin@gla.ac.in` / `admin123`

---

## STEP 4 — Start the backend server

```bash
cd backend
npm run dev
```

You should see:
```
✅ MySQL connected & tables synced
🚀 Server on http://localhost:5000
```

---

## STEP 5 — Start the frontend

Open a NEW terminal tab:
```bash
cd gla-food-finder/frontend
npm install
npm run dev
```

Open browser → http://localhost:5173 🎉

---

## STEP 6 — Add more data (shops, mess, notes)

### Option A — Use phpMyAdmin (easiest!)
1. Go to http://localhost/phpmyadmin
2. Click on `gla_anything` database
3. Click on `shops` / `mess` / `notes` table
4. Click "Insert" tab
5. Fill in the details and click Go

### Option B — Use the API (with Postman or browser)
First login as admin to get token, then POST to:
- `POST /api/shops` — add new shop
- `POST /api/mess`  — add new mess
- `POST /api/notes` — add new note
- `POST /api/placements` — add placement

---

## Database tables created automatically:

| Table        | What it stores                        |
|-------------|---------------------------------------|
| users        | Student accounts, login info          |
| shops        | Food shops (inside + outside campus)  |
| mess         | Mess options with prices              |
| reviews      | All reviews for shops and mess        |
| confessions  | Anonymous posts (userId hidden)       |
| notes        | Notes and PYQ files                   |
| placements   | Company listings                      |
| saved_shops  | Which user saved which shop           |

---

## Troubleshooting:

**"Access denied for user root"**  
→ Your MySQL password is wrong in .env

**"Unknown database gla_anything"**  
→ You forgot to create the database in phpMyAdmin (Step 1)

**"Cannot connect to localhost:5000"**  
→ Backend isn't running. Check terminal for errors.

**Frontend shows blank / no data**  
→ Did you run `node seeders/seed.js`? Check if backend is running.

---

## Adding a real shop from your campus:

Just go to phpMyAdmin → `shops` table → Insert:
- name: "Sharma Dhaba"
- category: "meals"
- location: "outside"
- address: "Near East Gate"
- phone: "98765XXXXX"
- isVeg: 0 (no) or 1 (yes)
- isOpen: 1
- emoji: 🍽️

Save and refresh the app — shop appears instantly!
