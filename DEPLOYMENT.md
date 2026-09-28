# 🚀 MediaShield Deployment Guide (100% Free - No Credit Card Required)

This guide provides step-by-step instructions to deploy **MediaShield** completely free without requiring any credit card or payment information:
- **Frontend**: Next.js 16 on [Vercel](https://vercel.com) (Free, No Card Required)
- **Backend**: FastAPI (Python 3.12) on [Render](https://render.com) (Free Plan, No Card Required)
- **Database**: SQLite (Included) or [Neon.tech](https://neon.tech) / [Supabase](https://supabase.com) (Free PostgreSQL, No Card Required)

---

## 💳 Why Render Asked For Payment Info & How to Bypass It

Render requires a credit card on file ONLY if you use their Managed Blueprint Database. By selecting **Free Web Service** with **SQLite** or an external free database like **Neon.tech**, **NO credit card is required at all**.

---

## Part 1: Deploy Backend on Render (No Credit Card)

### Method 1: Render Web Service (Recommended Manual Setup)

1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository (`media-shield`).
4. Fill in the following fields:
   - **Name**: `mediashield-backend`
   - **Root Directory**: `backend`
   - **Language**: `Python 3`
   - **Branch**: `main`
   - **Build Command**: `pip install -r requirements.txt && alembic upgrade head`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Select **Free** ($0/month).
5. Scroll down to **Environment Variables** and add:
   - `PROJECT_NAME`: `MediaShield`
   - `API_V1_STR`: `/api/v1`
   - `SECRET_KEY`: `generate-any-random-32-character-string`
   - `DATABASE_URL`: `sqlite:///./sql_app.db` *(or your free Neon PostgreSQL URL)*
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key from Google AI Studio)*
6. Click **Create Web Service**.
7. Render will build and deploy your service. Copy the live API URL (e.g. `https://mediashield-backend.onrender.com`).

---

## Part 2: Deploy Frontend on Vercel (No Credit Card)

1. Log into [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository (`media-shield`).
4. Select **Root Directory**: `frontend`.
5. Framework Preset: **Next.js**.
6. Under **Environment Variables**, add:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://mediashield-backend.onrender.com` *(Replace with your live Render backend URL)*
7. Click **Deploy**.

---

## 🗄️ Optional: Free Cloud PostgreSQL without Credit Card

If you want a cloud PostgreSQL database instead of local SQLite:
1. Sign up at [Neon.tech](https://neon.tech) (100% Free PostgreSQL, No credit card needed).
2. Create a new project and copy your connection string (e.g., `postgresql://alex:password@ep-cool-db.us-east-2.aws.neon.tech/neondb?sslmode=require`).
3. Set `DATABASE_URL` in your Render Environment Variables to that connection string.
