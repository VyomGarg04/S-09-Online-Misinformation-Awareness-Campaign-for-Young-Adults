# 📚 MediaShield Documentation Directory

Welcome to the **MediaShield Project Documentation Hub**. This directory contains technical specifications, architecture diagrams, dev logs, and system design documents.

---

## 📑 Document Index

| Document | Purpose |
| :--- | :--- |
| **[problem-statement.md](file:///home/vyomgarg04/Developer/media-shield/docs/problem-statement.md)** | Detailed analysis of the online misinformation problem space, target demographics, and solution requirements. |
| **[system-design.md](file:///home/vyomgarg04/Developer/media-shield/docs/system-design.md)** | Technical system design, database schemas, component architecture, and API flow sequences. |
| **[dev-log.md](file:///home/vyomgarg04/Developer/media-shield/docs/dev-log.md)** | Development trajectory, architectural decisions, completed milestones, and changelog. |
| **[backlog.md](file:///home/vyomgarg04/Developer/media-shield/docs/backlog.md)** | Technical backlog, future enhancements, and planned feature roadmap. |

---

## 🏗️ Architecture Overview

```
[User Browser / Mobile] 
        │
        ▼ (HTTPS REST / JSON)
[Next.js 16 App Router] ──▶ [Theme & Auth State]
        │
        ▼ (OAuth2 Bearer JWT)
[FastAPI Backend] ─────────▶ [Google Gemini 2.0 API]
        │                      │
        ▼                      ▼
[SQLAlchemy ORM]        [httpx Web Scraper]
        │
        ▼
[SQLite / PostgreSQL]
```