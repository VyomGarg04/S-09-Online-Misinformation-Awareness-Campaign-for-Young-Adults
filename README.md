# 🛡️ MediaShield — Digital Media Literacy & AI Fact-Checking Platform

> **MediaShield** is a modern, enterprise-grade digital media verification platform designed to fight online misinformation. It empowers users, journalists, and researchers with AI-driven claim credibility scoring, misinformation trend tracking, news domain trust analytics, and media literacy resources.

---

## 🌟 Key Features

- **⚡ AI Credibility Analysis Engine**: Paste URLs, raw claim text, or upload claim screenshots to receive instant credibility scores, evidence breakdowns, and factual verifications.
- **📊 Real-time Misinformation Dashboard**: Overview of total content items, verified accurate claims, pending analyses, and flagged misleading content with live updates.
- **📁 Content Library & Verification Hub**: Full CRUD management of news articles, social posts, WhatsApp forwards, and video transcripts with dynamic sorting (Date, Credibility, Title) and filters.
- **🛡️ Source Integrity & Bias Index**: Evaluate major media domain reliability ratings, factual accuracy track records, and political spectrum metrics.
- **📈 Information Journey & Misinformation Analytics**: Visualize claim mutation patterns, channel contagion density, and viral spread velocity across digital media.
- **🎓 Media Literacy & Verification Hub**: Interactive guides on reverse image lookup, deepfake analysis, source cross-checking, and interactive verification practice.
- **📱 Fully Responsive Experience**: Optimized for viewports at 1440px (Desktop), 1024px (Laptop), 768px (Tablet), and 390px (Mobile) with slide-over drawer navigation.
- **🌓 Intentional Dark & Light Themes**: Cohesive, accessible color system built with Tailwind CSS design tokens and smooth micro-animations.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router, Server & Client Components)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Base UI / Shadcn UI
- **State & Theme**: `next-themes` (Dark/Light mode support)
- **Toast Notifications**: `sonner`
- **Icons**: `lucide-react`
- **Validation**: `zod` & `react-hook-form`

### Backend
- **Framework**: Python 3.12, FastAPI, Uvicorn
- **ORM & DB**: SQLAlchemy, Alembic, SQLite / PostgreSQL
- **Security & Auth**: OAuth2 / Bearer JWT tokens with `passlib` bcrypt hashing
- **Testing**: `pytest`, `httpx`

---

## 📁 Folder Structure

```
media-shield/
├── backend/
│   ├── app/
│   │   ├── api/            # API endpoints (auth, content, ai, dashboard)
│   │   ├── core/           # Security, auth, config settings
│   │   ├── db/             # SQLAlchemy session & base setup
│   │   ├── models/         # Database models (User, ContentItem, Analysis)
│   │   ├── schemas/        # Pydantic validation schemas
│   │   └── services/       # AI analysis engine & business logic
│   ├── alembic/            # Database migration scripts
│   └── tests/              # Pytest backend test suite
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/         # Login & Registration pages
│   │   ├── (protected)/    # Dashboard, Analysis, Content, Trends, Sources, Resources, Profile
│   │   ├── layout.tsx      # Root layout with ThemeProvider & Toaster
│   │   └── page.tsx        # Landing Page (Hero, Features, How It Works, CTA, Footer)
│   ├── components/
│   │   ├── ai/             # AI breakdown & feedback components
│   │   ├── analysis/       # AI Analysis forms, results & history panel
│   │   ├── auth/           # Login & Register form components
│   │   ├── content/        # Content table, dialogs, filters & detail modals
│   │   ├── dashboard/      # Welcome banner, stats cards & recent activity
│   │   ├── landing/        # Public landing page sections
│   │   ├── layout/         # AppShell, Navbar, Sidebar & Mobile Drawer
│   │   └── ui/             # Reusable UI primitives (Button, Table, Dialog, Skeleton, etc.)
│   ├── lib/                # API fetch helpers & auth token manager
│   ├── services/           # Frontend service modules (auth, content, ai, dashboard)
│   └── types/              # TypeScript interface definitions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher)
- Python (v3.11 or higher)
- `npm` or `pnpm`

### Environment Variables Setup

#### Frontend (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

#### Backend (`backend/.env`):
```env
PROJECT_NAME=MediaShield
API_V1_STR=/api/v1
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=11520
DATABASE_URL=sqlite:///./sql_app.db
```

---

## ⚡ Installation & Local Execution

### 1. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt  # Or uv sync
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```
Backend API interactive docs will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎬 Recommended Demo Sequence

For testing or presentation demos, follow this smooth workflow:

1. **Landing Page (`/`)**: Overview of problem statement, features, interactive flow, and CTA.
2. **Register (`/register`)**: Create a new account with instant validation & toast feedback.
3. **Login (`/login`)**: Authenticate into the protected workspace.
4. **Dashboard (`/dashboard`)**: View real-time stats cards with skeletons, last updated badge, and quick action shortcuts.
5. **AI Analysis (`/analysis`)**: Submit a news link or text claim to run AI Credibility scoring, examine evidence breakdowns, and view recent analysis history.
6. **Content Library (`/content`)**: Filter articles by type or status, sort by Date / Credibility, view details, edit items, or create a new article.
7. **Source Index (`/sources`)**: Inspect domain reliability metrics and factual accuracy records.
8. **Literacy Hub (`/resources`)**: Review verification guides and test skills with the interactive claim quiz.
9. **User Profile (`/profile`)**: Manage profile settings and view account stats.
10. **Logout**: Safely sign out with session token cleanup and toast confirmation.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
