# CLAUDE.md – Newsletter Aggregator

This file is read automatically by Claude Code at the start of every session.
For full project context, architecture decisions, and data models → see `PROJECT_BRIEF.md`.

---

## What This Project Is

A personal morning briefing app. It connects to multiple email inboxes (Gmail + Outlook), fetches newsletters from configured senders, and uses Claude AI to produce a single unified daily digest. Deduplicates overlapping stories, merges cross-source context, and allows saving stories for weekend reading.

**Solo-use personal productivity tool. Not a multi-tenant SaaS.**

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| AI | Anthropic Claude API – model: `claude-sonnet-4-20250514` |
| Email – Gmail | Google Gmail API via OAuth 2.0 |
| Email – Outlook | Microsoft Graph API via OAuth 2.0 |
| Auth | `next-auth` v5 |
| Database | SQLite via Prisma |
| Scheduler | `node-cron` (local) |
| Email parsing | `@mozilla/readability` + `jsdom` |

---

## Project Structure

```
newsletter-aggregator/
├── app/
│   ├── page.tsx                  # Home – today's digest
│   ├── history/page.tsx          # Past digests
│   ├── saved/page.tsx            # Saved for later
│   ├── settings/page.tsx         # Source configuration
│   └── api/
│       ├── auth/                 # next-auth + OAuth callbacks
│       ├── fetch/route.ts        # Trigger manual email fetch
│       ├── digest/route.ts       # Digest CRUD
│       └── sources/route.ts      # Source config CRUD
├── lib/
│   ├── email/
│   │   ├── gmail.ts              # Gmail API client
│   │   ├── outlook.ts            # Microsoft Graph client
│   │   └── extractor.ts          # HTML email → clean text
│   ├── ai/
│   │   ├── aggregator.ts         # Main AI orchestration
│   │   └── prompts.ts            # All Claude prompts (centralized here)
│   ├── db/
│   │   ├── schema.prisma
│   │   └── queries.ts            # All DB queries go here, not inline
│   └── scheduler.ts              # Cron job
├── components/
│   ├── digest/                   # Digest display components
│   ├── settings/                 # Settings UI
│   └── ui/                       # Shared primitives
├── CLAUDE.md                     # This file
├── PROJECT_BRIEF.md              # Full spec & architecture detail
└── .env.local                    # Never commit
```

---

## Development Conventions

- **TypeScript strict mode** – no `any`, define types explicitly
- **All Claude prompts** live in `lib/ai/prompts.ts` – never inline prompts in business logic
- **All DB queries** go through `lib/db/queries.ts` – no raw Prisma calls scattered across the app
- **API routes** are thin – orchestration logic lives in `lib/`, not in `app/api/`
- **Environment variables** – always access via a typed `env.ts` wrapper, never `process.env.X` directly in components
- **Error handling** – every email fetch and AI call must have explicit error handling; a failed newsletter fetch should not block the digest from generating with available sources

---

## Environment Variables

```env
ANTHROPIC_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_TENANT_ID=common
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=file:./dev.db
```

---

## Implementation Phases

### ✅ Phase 1 – Foundation (start here)
- Next.js + Prisma + Tailwind setup
- Prisma schema (Source, FetchedEmail, Digest, SavedStory)
- Settings UI: manually add newsletter sources (no OAuth yet)
- Digest reading UI with **mock data** – build the UI before the backend

### ⬜ Phase 2 – Email Integration
- Gmail OAuth + fetch emails from configured senders
- HTML → clean text extraction
- Outlook OAuth + fetch emails
- Store fetched emails in DB

### ⬜ Phase 3 – AI Pipeline
- Per-newsletter story extraction (Claude API)
- Cross-newsletter aggregation + deduplication (Claude API)
- Real digest generated from real emails
- Save for later

### ⬜ Phase 4 – Polish
- Cron scheduler
- Error handling & resilience
- Digest history view
- Manual regenerate button

**Always ask before starting a new phase.** Mark tasks complete by checking them off here.

---

## Key Constraints & Decisions

- **Local-first for MVP** – app runs on localhost, cron runs while machine is on; deployment comes later
- **No multi-user auth needed** – this is a personal tool; next-auth is used only for Gmail/Outlook OAuth, not for user login
- **AI cost control** – cache per-email extractions in DB; only re-process if email content changed; never re-run aggregation on already-processed emails
- **Digest categories are predefined** – do not let Claude invent categories per run; use the fixed taxonomy defined in `lib/ai/prompts.ts`: EU Politics, Macro & Markets, Energy & Climate, Global Affairs, Business & Tech, Opinion & Analysis
- **Deduplication threshold** – only merge stories if they are about the same specific event, not just the same topic; when in doubt, keep separate with a cross-reference note

---

## Commands

```bash
npm run dev          # Start dev server
npx prisma studio    # Browse database
npx prisma migrate dev --name <name>   # Create migration
npm run cron         # Start scheduler manually (ts-node lib/scheduler.ts)
```

---

## What NOT To Do

- Do not put API keys or tokens anywhere except `.env.local`
- Do not call `process.env` directly in components – use the env wrapper
- Do not generate digest HTML in AI prompts – AI returns JSON, UI renders it
- Do not store raw OAuth tokens in localStorage – next-auth handles session storage
- Do not skip error handling on email fetch calls – partial failure must be graceful
