# 🔥 Daily Learning Streak Tracker

A full-stack web app built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS** that helps students maintain daily study habits by tracking their learning streak.

## Live Demo

> Deploy to Vercel and add your link here: `https://your-project.vercel.app`

---

## Features

- ✅ Mark "I Studied Today" with one click
- 🔥 Live streak counter — resets if you miss a day
- 📊 Total study days count
- 📅 Last studied date
- 📖 Full study history page (newest first)
- 🚫 Prevents duplicate entries for the same day

---

## Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | Next.js 14 (App Router) |
| Backend   | Next.js API Routes      |
| Language  | TypeScript              |
| Styling   | Tailwind CSS            |
| Storage   | Local JSON file         |
| Deployment| Vercel                  |

---

## Project Structure

```
app/
├── dashboard/        → Home page with streak stats & study button
├── history/          → Full study history list
├── api/
│   ├── study/        → POST - Mark today as studied
│   ├── streak/       → GET  - Returns streak, total days, last date
│   └── history/      → GET  - Returns all study dates
components/
├── StreakCard.tsx     → Stat display card
├── StudyButton.tsx   → Button with loading & feedback states
└── HistoryList.tsx   → Renders list of study dates
lib/
├── streakLogic.ts    → Pure streak calculation functions
└── storage.ts        → Read/write JSON data file
data/
└── study.json        → Persistent storage file
```

---

## How Streak Logic Works

1. When you click **"I Studied Today"**, today's date (`YYYY-MM-DD`) is saved.
2. The streak is calculated by looking at consecutive days from today (or yesterday) backwards.
3. If there's a gap of more than 1 day, the streak resets.
4. You cannot mark the same day twice.

**Example:**
```
10 March → Studied ✅
11 March → Studied ✅
12 March → Studied ✅
Streak = 3

13 March → Missed ❌
14 March → Studied ✅
Streak resets to = 1
```

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/kalnet-streak-tracker.git
cd kalnet-streak-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Click **Deploy** — no environment variables needed
4. Share your live link!

> **Note:** The `data/study.json` file is used for storage. On Vercel, the filesystem is ephemeral, so data resets on redeploy. For production persistence, consider upgrading to a database like Vercel Postgres or Supabase.

---

## API Reference

### `POST /api/study`
Mark today as studied.

**Response (success):**
```json
{ "success": true, "message": "Study session recorded!" }
```

**Response (already marked):**
```json
{ "success": false, "message": "You have already marked today." }
```

### `GET /api/streak`
Get current stats.

```json
{ "streak": 4, "totalDays": 10, "lastStudyDate": "14 March 2026" }
```

### `GET /api/history`
Get all study dates.

```json
{
  "history": [
    { "raw": "2026-03-14", "formatted": "14 March 2026" },
    { "raw": "2026-03-13", "formatted": "13 March 2026" }
  ]
}
```
