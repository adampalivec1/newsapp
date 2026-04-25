# Newsletter Aggregator – Project Brief

## Overview

A personal morning briefing app that connects to multiple email inboxes, fetches newsletters from configured senders, and uses AI to produce a single unified daily digest. The digest deduplicates overlapping stories, enriches them with cross-source context, and allows saving interesting stories for later reading.

**Primary user:** Solo use (personal productivity tool)
**Primary interface:** Web app (local-first MVP, deployable later)
**Core value:** Replace 90 minutes of manual newsletter reading with a 15-minute AI-curated briefing

---

## Problem Statement

The user receives 6–10 newsletters daily across two inboxes:
- **Personal Gmail** – EU/Brussels-focused: Politico Brussels Playbook, Euractiv Reporter
- **Alumni university Outlook** – global finance/economics: Financial Times newsletters (×3), The Economist, others

Reading each individually is time-consuming. Manually copying content into AI is high-friction. Stories frequently overlap across sources without adding new context. The user wants a single morning entry point that surfaces everything important without repetition.

---

## Core Features

### MVP (Phase 1)

1. **Email source configuration**
   - Connect Gmail account via OAuth 2.0
   - Connect Outlook/Microsoft account via OAuth 2.0
   - Specify newsletter senders per inbox (email address or domain)
   - Set fetch window (e.g., "emails received since yesterday 18:00")

2. **Scheduled fetch & processing**
   - Configurable daily trigger time (e.g., 06:30)
   - Fetch emails from configured sources
   - Extract readable text content from HTML emails (strip boilerplate, ads, unsubscribe links)

3. **AI aggregation & digest generation**
   - Deduplicate stories that appear across multiple newsletters
   - Merge complementary context (e.g., Politico's Brussels angle + FT's market angle on the same story)
   - Categorize stories into thematic sections (EU Politics, Markets & Economy, Global Affairs, etc.)
   - Generate a structured morning digest with:
     - Top 3–5 "must read" stories (with source attribution)
     - Thematic sections with story summaries
     - "Also in today's newsletters" – minor items briefly noted

4. **Save for later**
   - Flag individual stories or sections as "weekend reading"
   - Saved stories view with original source context

5. **Digest UI**
   - Clean reading interface for the daily digest
   - History of past digests
   - Manual "regenerate" button

### Phase 2 (Post-MVP)

- Mobile-responsive PWA
- Custom digest tone/focus settings (e.g., "emphasize EU regulatory news")
- Keyword/topic watchlist (always highlight stories mentioning specific terms)
- Export digest to email or PDF
- Integration with read-later apps (Pocket, Instapaper, Omnivore)
- Digest sharing (generate a shareable link)

---

## Technical Architecture

### Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS |
| Backend | Next.js API Routes |
| AI | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| Email – Gmail | Google Gmail API (OAuth 2.0) |
| Email – Outlook | Microsoft Graph API (OAuth 2.0) |
| Database | SQLite via Prisma (local MVP) |
| Scheduler | `node-cron` (local) or Vercel Cron Jobs (deployed) |
| Auth tokens | Stored in SQLite, encrypted at rest |

### Directory Structure

```
newsletter-aggregator/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Today's digest (home)
│   ├── history/page.tsx        # Past digests
│   ├── saved/page.tsx          # Saved for later
│   ├── settings/page.tsx       # Source configuration
│   └── api/
│       ├── auth/               # OAuth callbacks
│       ├── fetch/              # Trigger manual fetch
│       ├── digest/             # Digest CRUD
│       └── sources/            # Source config CRUD
├── lib/
│   ├── email/
│   │   ├── gmail.ts            # Gmail API client
│   │   ├── outlook.ts          # Microsoft Graph client
│   │   └── extractor.ts        # HTML → readable text
│   ├── ai/
│   │   ├── aggregator.ts       # Main AI orchestration
│   │   ├── prompts.ts          # All Claude prompts
│   │   └── types.ts
│   ├── db/
│   │   ├── schema.prisma
│   │   └── queries.ts
│   └── scheduler.ts            # Cron job setup
├── components/
│   ├── digest/                 # Digest display components
│   ├── settings/               # Settings UI components
│   └── ui/                     # Shared UI primitives
├── .env.local                  # API keys (never commit)
└── PLANNING.md                 # This file
```

---

## Data Models

### Source
```typescript
{
  id: string
  provider: 'gmail' | 'outlook'
  accountEmail: string
  senderEmail: string          // e.g. "playbook@politico.eu"
  displayName: string          // e.g. "Politico Brussels Playbook"
  category: string             // e.g. "EU Politics"
  active: boolean
  fetchWindowHours: number     // How far back to look (default: 20)
}
```

### FetchedEmail
```typescript
{
  id: string
  sourceId: string
  subject: string
  receivedAt: DateTime
  rawHtml: string
  extractedText: string
  processedAt: DateTime | null
}
```

### Digest
```typescript
{
  id: string
  date: Date
  generatedAt: DateTime
  sections: DigestSection[]    // JSON
  topStories: Story[]          // JSON
  rawSources: string[]         // FetchedEmail IDs used
  status: 'generating' | 'ready' | 'error'
}
```

### SavedStory
```typescript
{
  id: string
  digestId: string
  storySnapshot: Story         // JSON
  savedAt: DateTime
  readAt: DateTime | null
  tags: string[]
}
```

---

## AI Prompting Strategy

### Step 1 – Per-newsletter extraction
For each fetched email, extract structured stories:
```
Input: raw newsletter text
Output: JSON array of { headline, summary, category, importance: 1-5 }
```

### Step 2 – Cross-newsletter aggregation
```
Input: all extracted stories from all newsletters (today)
Task:
  1. Cluster stories about the same underlying event/topic
  2. For each cluster, merge into one story with:
     - Combined context from all sources
     - Source attribution list
     - Richer summary than any single source provided
  3. Rank by importance and relevance
  4. Output structured digest JSON
```

### Step 3 – Digest rendering
The digest JSON is rendered by the UI. The AI does not generate HTML.

**Key prompt constraints:**
- Always preserve source attribution
- When deduplicating: only merge if stories are truly about the same event (not just the same topic)
- Note explicitly when sources disagree or provide contradictory information
- Separate "hard news" from "opinion/analysis"

---

## OAuth Setup Requirements

### Gmail API
1. Google Cloud Console → New Project
2. Enable Gmail API
3. Create OAuth 2.0 credentials (Web application)
4. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Scopes needed: `gmail.readonly`

### Microsoft Graph (Outlook)
1. Azure Portal → App registrations → New registration
2. Redirect URI: `http://localhost:3000/api/auth/callback/microsoft`
3. API permissions: `Mail.Read`
4. Generate client secret

### Environment Variables
```env
# Anthropic
ANTHROPIC_API_KEY=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Microsoft
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_TENANT_ID=common

# App
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=file:./dev.db
```

---

## Implementation Order (Recommended)

### Week 1 – Foundation
- [ ] Next.js project setup, Prisma + SQLite, Tailwind
- [ ] Settings UI: add/configure newsletter sources (manual entry first, no OAuth yet)
- [ ] Mock digest data → build and polish the digest reading UI

### Week 2 – Email Integration
- [ ] Gmail OAuth flow + fetch emails from configured senders
- [ ] HTML email → clean text extraction (`@extractus/article-parser` or custom)
- [ ] Outlook OAuth flow + fetch emails
- [ ] Store fetched emails in DB

### Week 3 – AI Pipeline
- [ ] Per-newsletter story extraction (Claude API)
- [ ] Cross-newsletter aggregation + deduplication (Claude API)
- [ ] Wire up to generate real digest from real emails
- [ ] "Save for later" functionality

### Week 4 – Polish
- [ ] Scheduler / cron job
- [ ] Error handling (what if a newsletter didn't arrive?)
- [ ] Digest history
- [ ] Manual regenerate

---

## Key Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Gmail/Outlook OAuth complexity | Use `next-auth` library which handles most of this |
| HTML email parsing variability | Use a headless extractor + fallback to full text strip |
| Claude API cost with long newsletters | Chunk long newsletters; cache per-email extractions |
| Newsletter arrives after scheduled fetch | Allow manual re-fetch; configurable fetch window |
| OAuth token expiry | Refresh token flow built into next-auth |

---

## Open Questions to Resolve

1. **Local vs. deployed?** Starting local is faster, but means the app only runs when your machine is on. If you want it running autonomously at 06:30 every day, a small VPS (€3/month on Hetzner) or Railway makes more sense even early on.

2. **FT/Economist paywalled newsletters** – the newsletters themselves land as emails, so the content is in the inbox regardless of paywall. No special handling needed. But confirm: do these newsletters contain full article text or just teasers with links?

3. **Category taxonomy** – you probably want to define your own sections upfront (EU Politics, Macro/Markets, Energy & Climate, Global Affairs, etc.) and instruct Claude to fit stories into them, rather than letting it invent categories each day.

4. **Digest format preference** – bullet points + one-paragraph summaries? Or more magazine-style flowing prose? Worth deciding before building the UI.

---

## Notes for Claude Code

When starting implementation in Claude Code:
- Reference this document as the source of truth for architecture decisions
- Start with `npx create-next-app@latest newsletter-aggregator --typescript --tailwind --app`
- Initialize Prisma: `npx prisma init --datasource-provider sqlite`
- Use `next-auth` for OAuth: `npm install next-auth`
- Use Anthropic SDK: `npm install @anthropic-ai/sdk`
- For email HTML extraction: `npm install @mozilla/readability jsdom` 
