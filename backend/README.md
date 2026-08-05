# ⚙️ MediaShield Backend

> FastAPI RESTful Service for MediaShield — AI-Powered Misinformation Detection & Content Verification Platform.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Python 3.12 & FastAPI
- **ORM & DB**: SQLAlchemy 2.0 & SQLite / PostgreSQL
- **Database Migrations**: Alembic
- **AI & Web Scraping**: Google Gemini 2.0 Flash API & `httpx` async HTML parser
- **Security & Authentication**: OAuth2 Bearer JWT Tokens with `passlib` bcrypt password hashing
- **Testing**: `pytest`, `httpx`

---

## 📁 Directory Structure

```
backend/
├── app/
│   ├── ai/                 # Gemini prompt template, fallback analyzer & httpx URL scraper
│   ├── api/                # API router & v1 endpoint modules
│   │   ├── router.py       # Main API v1 router aggregator
│   │   └── v1/             # Endpoint implementations (auth, content, ai, health)
│   ├── core/               # Configuration settings, security, exception handlers & CORS middleware
│   ├── database/           # SQLAlchemy base, models (User, Content), enums & session builder
│   ├── dependencies/       # FastAPI dependency injection (get_db, get_current_user)
│   ├── repositories/       # Database queries & statistics aggregation helpers
│   ├── schemas/            # Pydantic validation schemas
│   ├── services/           # Core business logic (analysis_service, content_service, auth_service)
│   └── main.py             # FastAPI app initialization, middleware & exception handlers
│
├── alembic/                # Database migration scripts & alembic.ini config
├── tests/                  # Pytest backend test suite
└── pyproject.toml          # Python project dependencies
```

---

## 🔌 API Endpoints Reference

### Authentication (`/api/v1/auth`)
- `POST /auth/register` — Register a new user account.
- `POST /auth/login` — Authenticate and receive a Bearer JWT access token.
- `GET /auth/me` — Retrieve current authenticated user profile.

### Content Library (`/api/v1/content`)
- `GET /content` — List content items with optional search, type, status, and theme filters.
- `POST /content` — Create a new content item.
- `GET /content/{content_id}` — Retrieve detailed content item.
- `PUT /content/{content_id}` — Update existing content item.
- `DELETE /content/{content_id}` — Delete content item.
- `GET /content/stats` — Retrieve aggregated dashboard statistics.
- `GET /content/themes` — Retrieve content counts grouped by theme.

### AI Credibility Engine (`/api/v1/ai`)
- `POST /ai/{content_id}` — Perform AI credibility analysis and URL metadata scraping on a content item.
- `POST /ai/{content_id}/reanalyze` — Force a fresh AI credibility re-analysis.

---

## ⚡ Setup & Execution

### 1. Environment Setup

Create a `.env` file in `backend/`:

```env
PROJECT_NAME=MediaShield
API_V1_STR=/api/v1
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=11520
DATABASE_URL=sqlite:///./sql_app.db
GEMINI_API_KEY=your-gemini-api-key-optional
```

### 2. Run Database Migrations & Server

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt  # Or uv sync

# Apply database migrations
alembic upgrade head

# Start FastAPI development server
uvicorn app.main:app --reload --port 8000
```

Interactive OpenAPI Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)