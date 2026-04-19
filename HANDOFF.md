# Basscamp — Session Handoff (2026-04-08)

## Where we left off

### Phase 1 — COMPLETE
- Vite + React 19 + TypeScript (strict) scaffolded and building clean
- Tailwind CSS v4, React Router v6, TanStack Query, Zustand, Supabase JS all installed
- All TypeScript types written: `src/types/{drill,curriculum,progress,fretboard,theory}.ts`
- Core music theory library: `src/lib/music-theory.ts` — 20 unit tests, all passing
- Supabase client stub: `src/lib/supabase.ts`
- Auth hook: `src/hooks/useSession.ts`
- `netlify.toml` configured with SPA redirect rule
- `.env.local.example` ready to copy

### Phase 2 — IN PROGRESS (needs Supabase project)
- SQL migration written: `supabase/migrations/001_initial_schema.sql`
  - Tables: `practice_sessions`, `drill_completions`, `user_preferences`
  - RLS policies for all tables
  - Trigger to auto-create user preferences on signup
- **NOT done yet:**
  - [ ] Create Supabase project at supabase.com
  - [ ] Run migration SQL in the Supabase SQL editor
  - [ ] Copy `.env.local.example` → `.env.local` and fill in `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`
  - [ ] Smoke-test the connection (`npm run dev`)

### Phases 3–10 — NOT started
See build order in the plan (below).

---

## Infrastructure
- **Deployment:** Coolify (self-hosted), static site
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Enable "SPA routing" / "Rewrite all paths to index.html" in Coolify UI
  - No config file needed in the repo
- **Backend:** Self-hosted Supabase on Coolify (not yet deployed)

---

## Quick commands
```bash
npm run dev        # start dev server
npm test           # run unit tests (20 passing)
npm run build      # production build (clean)
```

---

## Full plan
See: `/Users/mosborn/.claude/plans/enumerated-sprouting-crayon.md`

### Build order summary
| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Project init, types, music-theory.ts | ✅ Complete |
| 2 | Supabase schema + env vars | 🔶 In progress |
| 3 | Curriculum content (modules 01–03) + drills | ⬜ Not started |
| 4 | App shell: routing, layout, auth pages, curriculum view | ⬜ Not started |
| 5 | Fretboard visualizer | ⬜ Not started |
| 6 | Drill browser + drill detail pages | ⬜ Not started |
| 7 | Practice tracker (TanStack Query + Supabase) | ⬜ Not started |
| 8 | Reference page + Dashboard | ⬜ Not started |
| 9 | Netlify deploy + smoke test | ⬜ Not started |
| 10 | Polish: mobile, dark mode, keyboard shortcuts | ⬜ Not started |

---

## Key files
| File | Purpose |
|------|---------|
| `src/types/drill.ts` | Drill, Genre, Technique, TabBlock types |
| `src/types/curriculum.ts` | CurriculumModule type |
| `src/types/progress.ts` | PracticeSession, DrillCompletion, UserPreferences |
| `src/types/fretboard.ts` | FretboardState, FretPattern |
| `src/types/theory.ts` | Scale, IntervalDefinition |
| `src/lib/music-theory.ts` | Pure note/scale calculation functions |
| `src/lib/supabase.ts` | Supabase client (needs env vars) |
| `src/hooks/useSession.ts` | Auth session hook |
| `supabase/migrations/001_initial_schema.sql` | Full DB schema + RLS |
| `.env.local.example` | Template for local env vars |
