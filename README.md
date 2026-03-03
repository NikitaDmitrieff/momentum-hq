# Momentum HQ

> Personal ops cockpit for founders: daily plan, priorities, time blocks, and review.

## Live Demo

**[https://momentum-hq.vercel.app](https://momentum-hq.vercel.app)**

## Overview

Momentum HQ is a focused daily operating system designed for founders. It provides a structured workspace to:

- **Plan** your day with a clear intention
- **Prioritize** up to three big rocks that must move forward
- **Time-block** your calendar to protect deep work
- **Review** each day with structured reflection questions

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- Mock auth via React Context (swap in NextAuth / Clerk as needed)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Landing page
│   ├── globals.css
│   ├── login/
│   │   └── page.tsx        # Login page (mock auth)
│   └── dashboard/
│       ├── layout.tsx      # Dashboard shell + sidebar nav
│       ├── page.tsx        # Today's plan + task list
│       ├── priorities/
│       │   └── page.tsx    # Big Rocks (max 3)
│       ├── time-blocks/
│       │   └── page.tsx    # Daily schedule builder
│       └── review/
│           └── page.tsx    # End-of-day reflection
└── context/
    └── auth.tsx            # Mock auth context
```

## Deployment

The app is deployed on Vercel. A GitHub Actions workflow (`.github/workflows/deploy.yml`) handles CI/CD on every push to `main`.

To set up your own deployment:
1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as GitHub repository secrets
3. Push to `main` — the workflow deploys automatically

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NikitaDmitrieff/momentum-hq)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Navigate to `/login` and sign in with any credentials (mock auth — no real validation).

## Auth

Auth is currently mocked via a React Context (`src/context/auth.tsx`). Any email/password combination works. The mock user is:

```
Name:  Alex Founder
Email: alex@momentum-hq.com
```

To add real auth, replace the `AuthProvider` with NextAuth.js or Clerk.

## Roadmap

- [ ] Persist data to Supabase
- [ ] Real authentication (Clerk or NextAuth)
- [ ] Weekly review view
- [ ] Streak tracking
- [ ] Calendar sync (Google Calendar)
- [ ] Mobile-responsive sidebar (drawer)
