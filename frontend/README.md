# 💻 MediaShield Frontend

> Next.js 16 Web Application for MediaShield — Digital Media Literacy & AI Fact-Checking Workspace.

---

## 🎨 Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router with React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Base UI / Shadcn UI primitives
- **Theme Engine**: `next-themes` (Dark/Light mode support)
- **Toast Notifications**: `sonner`
- **Icons**: `lucide-react`
- **Form Management**: `react-hook-form` & `zod` validation

---

## 📁 Component Directory Map

```
frontend/
├── app/
│   ├── (auth)/             # Login & Register route pages
│   ├── (protected)/        # Protected workspace routes
│   │   ├── analysis/       # AI Credibility Analysis Page & History
│   │   ├── content/        # Content Hub & Dynamic Sorting Table
│   │   ├── dashboard/      # Misinformation Overview Dashboard
│   │   ├── profile/        # User Profile & Preferences
│   │   ├── resources/      # Media Literacy & Verification Hub
│   │   ├── sources/        # Source Integrity & Bias Index
│   │   └── trends/         # Misinformation Journey Analytics
│   ├── layout.tsx          # Root layout with ThemeProvider & Toaster
│   └── page.tsx            # Public Landing Page
│
├── components/
│   ├── ai/                 # AI breakdown & feedback components
│   ├── analysis/           # Analysis forms, results view, Deepfake Inspector & Debunking generator
│   ├── auth/               # Login & Register form components
│   ├── branding/           # Logo & Wordmark branding components
│   ├── content/            # Content table, dialogs, filters & detail modals
│   ├── dashboard/          # Welcome banner, stats cards & recent activity
│   ├── landing/            # Landing page hero, features, CTA & footer
│   ├── layout/             # AppShell, Navbar, Sidebar & Mobile Drawer
│   ├── profile/            # User profile cards & settings
│   ├── resources/          # Literacy guides & interactive claim quiz
│   ├── sources/            # Media outlet source cards & index filters
│   ├── trends/             # Viral radar & claim journey timeline
│   └── ui/                 # Reusable UI primitives (Button, Table, Dialog, Skeleton)
│
├── lib/
│   ├── api.ts              # apiFetch wrapper with NetworkError shield
│   ├── auth.ts             # JWT token storage & session manager
│   └── utils.ts            # Tailwind class merge utilities
│
├── services/               # Client API services (auth, content, ai, dashboard)
└── types/                  # TypeScript interface definitions
```

---

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build production bundle with TypeScript type checking
npm run build

# Run production server
npm run start

# Run ESLint validation
npm run lint
```

---

## 🔧 Environment Configuration

Create a `.env.local` file in `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## 📱 Responsive Screen Support

The frontend is fully optimized for all standard viewports:
- **1440px+**: Desktop view with dual-column layouts and persistent sidebar.
- **1024px**: Laptop view with collapsible content structures.
- **768px**: Tablet view with responsive mobile drawer navigation.
- **390px**: Mobile view with single-column cards and horizontal table scrolling.
