# 🛡️ MediaShield — Digital Media Literacy & AI Fact-Checking Platform

> **MediaShield** is a state-of-the-art digital media verification ecosystem designed to combat online misinformation. It equips users, researchers, and media professionals with AI-driven credibility scoring, live web URL article extraction, misinformation trend analytics, source reliability indexing, HTML5 Canvas forensic media inspection, and interactive literacy education.

---

## 🚀 Highlights & Key Features

- **🤖 AI Credibility Engine**: Submit URLs, news headlines, raw claim text, or screenshots to receive instant credibility scores, evidence breakdowns, and factual verifications.
- **📰 Live Web URL Extraction**: Automatically scrapes live web headlines, article descriptions, and domain metadata via backend `httpx` parsing to provide real, contextual article summaries.
- **🔬 HTML5 Canvas Forensic Inspector**: Performs dynamic pixel error level analysis (ELA), compression artifact detection, and live RGB noise reticle inspection to detect photoshopped or AI-generated media.
- **📊 Real-time Workspace Dashboard**: Live stats cards, skeleton loaders, retry error handling, "Last updated" relative timestamp, and theme distribution analytics.
- **📁 Content Library & Filtering**: Full CRUD management of news articles, social posts, WhatsApp forwards, and video transcripts with dynamic sorting (Date, Credibility, Title) and pagination.
- **🛡️ Source Integrity & Bias Index**: Evaluate domain reliability ratings, factual accuracy records, and political spectrum metrics for major media outlets.
- **📈 Misinformation Journey Analytics**: Monitor viral contagion density, channel spread velocity, and claim mutation lifecycles.
- **💬 AI Social Debunking Generator**: Generate shareable counter-fact responses with integrated claim summaries for WhatsApp, X (Twitter) threads, and custom social graphics.
- **📱 Fully Responsive & Dark/Light Themes**: Pixel-perfect layout across 1440px (Desktop), 1024px (Laptop), 768px (Tablet), and 390px (Mobile) with slide-over drawer navigation and theme switcher.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router, Server & Client Components), React 19, TypeScript, Tailwind CSS v4, Base UI / Shadcn UI |
| **State & UI** | `next-themes` (Dark/Light Mode), `sonner` (Toast Notifications), `lucide-react` (Icons) |
| **Forms & Validation** | `react-hook-form`, `zod` schema validation |
| **Backend** | Python 3.12, FastAPI, Uvicorn, SQLAlchemy ORM, Alembic Migrations |
| **AI & Scraping** | Google Gemini 2.0 Flash API, `httpx` async HTML parser |
| **Security** | OAuth2 Bearer JWT tokens, `passlib` (bcrypt password hashing) |
| **Database** | SQLite (Development) / PostgreSQL (Production) |

---

## 📁 Repository Structure

```
media-shield/
├── backend/
│   ├── app/
│   │   ├── ai/             # Gemini AI prompt engine, fallback heuristics & live URL scraper
│   │   ├── api/v1/         # FastAPI endpoints (auth, content, ai, dashboard, health)
│   │   ├── core/           # Security, config & CORS middleware
│   │   ├── database/       # SQLAlchemy models, enums & session builder
│   │   ├── repositories/   # Data access queries & statistics aggregations
│   │   ├── schemas/        # Pydantic validation schemas
│   │   └── services/       # Business logic (analysis_service, content_service, auth_service)
│   ├── alembic/            # Database schema migration scripts
│   └── README.md           # Backend documentation & API setup guide
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/         # Login & Registration route pages
│   │   ├── (protected)/    # Dashboard, Analysis, Content, Trends, Sources, Resources, Profile
│   │   ├── layout.tsx      # Root layout with ThemeProvider & Toaster
│   │   └── page.tsx        # Landing Page (Hero, Features, How It Works, CTA, Footer)
│   ├── components/
│   │   ├── ai/             # AI feedback components
│   │   ├── analysis/       # AI Analysis forms, results view, Deepfake Inspector & Debunking generator
│   │   ├── auth/           # Login & Register form components
│   │   ├── content/        # Content table, dialogs, filters & detail modals
│   │   ├── dashboard/      # Welcome banner, stats cards & recent activity
│   │   ├── landing/        # Public landing page sections
│   │   ├── layout/         # AppShell, Navbar, Sidebar & Mobile Drawer
│   │   └── ui/             # Reusable UI primitives (Button, Table, Dialog, Skeleton)
│   ├── lib/                # API fetch helper with NetworkError shield & auth token manager
│   ├── services/           # Frontend API services (auth, content, ai, dashboard)
│   └── README.md           # Frontend architecture & component guide
│
└── docs/                   # System design, dev logs & architecture documentation
```

---

## ⚡ Quick Start Guide

### 1. Environment Configuration

#### Frontend (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Backend (`backend/.env`):
```env
PROJECT_NAME=MediaShield
API_V1_STR=/api/v1
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=11520
DATABASE_URL=sqlite:///./sql_app.db
GEMINI_API_KEY=your-gemini-api-key-optional
```

---

### 2. Running the Application

#### Step 1: Start Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt  # Or uv sync
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```
Interactive API Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

#### Step 2: Start Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open Workspace: [http://localhost:3000](http://localhost:3000)

---

## 🎬 Recommended Presentation Demo Flow

1. **Landing Page (`/`)**: Feature overview, interactive claims preview, and CTA.
2. **Register (`/register`)**: Create account with instant validation and toast feedback.
3. **Login (`/login`)**: Authenticate into the workspace shell.
4. **Dashboard (`/dashboard`)**: View real-time stats cards with skeletons, last updated badge, and theme distribution.
5. **AI Analysis (`/analysis`)**: Paste a news URL or text claim to run AI Credibility scoring, inspect live web article summaries, test HTML5 Canvas media forensics, and review recent analysis history.
6. **Content Library (`/content`)**: Filter by type/status, sort dynamically by Date or Credibility, view item details, or edit articles.
7. **Source Index (`/sources`)**: Inspect news domain reliability scores and factual accuracy records.
8. **Literacy Hub (`/resources`)**: Explore verification guides and practice claim evaluation.
9. **User Profile (`/profile`)**: Review profile settings and statistics.
10. **Logout**: Safely end session with token removal and toast confirmation.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
