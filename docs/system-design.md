# MediaShield — Technical System Design & Architecture

> Comprehensive System Design, Database Schemas, Component Architecture, and API Flow Sequences for MediaShield.

---

## 🏛️ 1. High-Level System Architecture

```
                               ┌──────────────────────────────────────────┐
                               │            Client Layer                  │
                               │  - Next.js 16 Web Application            │
                               │  - Responsive Desktop/Tablet/Mobile UI   │
                               │  - Tailwind CSS v4 & ThemeProvider       │
                               └────────────────────┬─────────────────────┘
                                                    │
                                                    │ HTTPS REST / Bearer JWT
                                                    ▼
                               ┌──────────────────────────────────────────┐
                               │            Backend Service               │
                               │  - FastAPI Application Server            │
                               │  - OAuth2 Authentication & Security      │
                               │  - Live Web URL Scraper (httpx)          │
                               │  - Gemini AI Credibility Engine          │
                               └───────────┬──────────────────┬───────────┘
                                           │                  │
                    SQLAlchemy ORM Session │                  │ Async Web Scraping
                                           ▼                  ▼
                               ┌───────────────┐      ┌───────────────┐
                               │ SQLite / PG   │      │ Live Web URLs │
                               │ Database      │      │ (News Sites)  │
                               └───────────────┘      └───────────────┘
```

---

## 🗄️ 2. Database Schema Specification (SQLAlchemy Models)

### `users` Table
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Primary Key, Autoincrement | Unique user identifier |
| `email` | String | Unique, Indexed, Not Null | User login email address |
| `username` | String | Unique, Indexed, Not Null | Public handle |
| `hashed_password` | String | Not Null | Bcrypt hashed password |
| `full_name` | String | Nullable | User display name |
| `created_at` | DateTime | Not Null, Default UTC | Account creation timestamp |

### `content` Table
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | Primary Key, Autoincrement | Unique content item identifier |
| `title` | String | Not Null, Indexed | Headline or claim title |
| `content` | Text | Not Null | Full article text, URL, or claim text |
| `content_type` | Enum | Not Null | `NEWS`, `SOCIAL_POST`, `WHATSAPP_FORWARD`, `BLOG`, `VIDEO` |
| `author` | String | Nullable | Original author or publisher name |
| `source` | String | Nullable | Source URL or publication domain |
| `theme` | String | Nullable | Category classification (e.g. `Politics`, `Health`, `Science`) |
| `subtheme` | String | Nullable | Specific sub-topic tag |
| `published_at` | DateTime | Nullable | Original publication timestamp |
| `created_at` | DateTime | Not Null, Default UTC | Record creation timestamp |
| `updated_at` | DateTime | Not Null, Default UTC | Last update timestamp |
| `credibility_score` | Float | Nullable | AI credibility rating percentage (0.0 to 100.0) |
| `fact_check_status` | Enum | Not Null | `PENDING`, `VERIFIED`, `MISLEADING`, `FALSE`, `UNVERIFIABLE` |
| `analysis_summary` | Text | Nullable | AI evaluation explanation & evidence breakdown |
| `owner_id` | Integer | ForeignKey(`users.id`), Not Null | User owner identifier |

---

## ⚡ 3. API Sequence Flow: Live URL Fact-Checking

```
User Container           AnalysisInputForm        FastAPI Endpoint        httpx Scraper        Gemini 2.0 API
     │                          │                        │                     │                    │
     │── Paste URL ────────────▶│                        │                     │                    │
     │                          │── POST /api/v1/ai/1 ──▶│                     │                    │
     │                          │                        │── GET Article URL ─▶│                    │
     │                          │                        │◀─ Title & Meta ─────│                    │
     │                          │                        │                                          │
     │                          │                        │── Analyze Claim + Title Context ────────▶│
     │                          │                        │◀─ Credibility Score & Verdict ───────────│
     │                          │                        │
     │                          │◀─ Return Analysis ─────│
     │                          │   Response JSON        │
     │◀─ Render Results ────────│
```

---

## 🔬 4. HTML5 Canvas Forensic Inspector Architecture

The **Deepfake & Media Forensic Inspector** performs client-side pixel manipulation scanning:
1. **Canvas Draw**: Loads sample or custom uploaded images onto an HTML5 `<canvas>` element.
2. **Pixel Math**: Iterates over image pixel buffer `ImageData.data` (RGBA) to compute:
   - Pixel-by-pixel RGB variance deltas across adjacent 16x16 block boundaries.
   - High-frequency edge noise spectrum for JPEG Error Level Analysis (ELA).
3. **Interactive Inspection**: Real-time cursor reticle tracks relative image coordinates (`X%`, `Y%`) and computes local RGB color values and region delta values.