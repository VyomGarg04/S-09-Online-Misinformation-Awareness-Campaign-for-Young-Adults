# 🚀 MediaShield Deployment Guide

This guide provides step-by-step instructions to deploy **MediaShield** with:
- **Frontend**: Next.js 16 on [Vercel](https://vercel.com)
- **Backend**: FastAPI (Python 3.12) on [Render](https://render.com) or [Railway](https://railway.app)
- **Database**: PostgreSQL (Managed on Render / Railway / Supabase)

---

## Part 1: Deploy Backend (FastAPI + PostgreSQL)

### Option A: Render (Recommended - Free Tier Available)

1. **Push your code to GitHub / GitLab**.
2. Log into [Render Dashboard](https://dashboard.render.com).
3. Click **New +** → **Blueprints** (or **Web Service**).
4. Connect your GitHub repository (`media-shield`).
5. Render will automatically detect [`render.yaml`](file:///home/vyomgarg04/Developer/media-shield/render.yaml) and configure:
   - Web Service: `mediashield-backend`
   - Build Command: `pip install -r backend/requirements.txt && alembic -c backend/alembic.ini upgrade head`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Database: `mediashield-db` (PostgreSQL)
6. Set Environment Variables in Render Dashboard for `mediashield-backend`:
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key from [Google AI Studio](https://aistudio.google.com))*
   - `SECRET_KEY`: *(Generate a secure random string, e.g. `openssl rand -hex 32`)*
   - `CORS_ORIGINS`: `https://your-frontend-app.vercel.app` *(or leave blank to allow default Vercel regex)*
7. Click **Apply**.
8. Copy your backend live URL once deployed (e.g., `https://mediashield-backend.onrender.com`).

---

### Option B: Railway

1. Log into [Railway.app](https://railway.app).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select `media-shield` and set Root Directory to `/backend`.
4. Add a **PostgreSQL** service to the project.
5. In your Backend Service Settings, set Environment Variables:
   - `DATABASE_URL`: `${{ Postgres.DATABASE_URL }}`
   - `SECRET_KEY`: `your-secret-key`
   - `GEMINI_API_KEY`: `your-gemini-key`
   - `PORT`: `8000`
   - `BUILD_COMMAND`: `pip install -r requirements.txt && alembic upgrade head`
   - `START_COMMAND`: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
6. Click **Generate Domain** to get your backend URL.

---

## Part 2: Deploy Frontend (Next.js on Vercel)

1. Log into [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository (`media-shield`).
4. Select **Root Directory**: `frontend`.
5. Framework Preset: **Next.js** (automatically detected).
6. Under **Environment Variables**, add:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://mediashield-backend.onrender.com` *(Replace with your live backend URL)*
7. Click **Deploy**.

---

## 🛠️ Environment Variables Summary

### Frontend (`frontend/.env.local` / Vercel Environment Variables):
```env
NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com
```

### Backend (`backend/.env` / Render/Railway Environment Variables):
```env
PROJECT_NAME=MediaShield
API_V1_STR=/api/v1
SECRET_KEY=generate-a-secure-random-32-byte-hex-string
ACCESS_TOKEN_EXPIRE_MINUTES=11520
DATABASE_URL=postgresql://user:password@host:port/dbname
GEMINI_API_KEY=your-gemini-api-key
CORS_ORIGINS=https://your-frontend.vercel.app
```

---

## ✅ Post-Deployment Verification

1. Open your Vercel frontend URL (e.g. `https://mediashield.vercel.app`).
2. Register a new user account.
3. Verify landing page, dashboard loading, and AI analysis requests.
4. Access API Interactive Docs at `https://your-backend-service.onrender.com/docs`.
