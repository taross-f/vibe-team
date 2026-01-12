# Adaptive AI Flow-Kanban

Adaptive roles and AI-flavored flow orchestration prototype built with Next.js 15, Tailwind CSS, Zustand, and Vitest.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Scripts

- `npm run dev` – start the Next.js dev server
- `npm run build` – production build
- `npm run start` – start the built app
- `npm run lint` – ESLint via `next lint`
- `npm run typecheck` – TypeScript `tsc --noEmit`
- `npm test` – Vitest (jsdom + React Testing Library)

## TDD checkpoints

- Added tests for the mocked GitHub login & role selection (`src/__tests__/login-page.test.tsx`) before implementing `/login` and the Zustand store.
- Added board rendering, role-based ordering, and AI suggestion tests (`src/__tests__/board-page.test.tsx`, `src/__tests__/ai-suggestions.test.ts`) before implementing the board UI and suggestion layer.

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push/PR:
- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test`

## Notes

- OAuth is mocked; the login button sets an authenticated state and reveals role selection.
- Role-based styling and ordering are applied without silent fallbacks; unauthenticated access to `/board` throws an explicit error.
- AI suggestions use a rule-based layer (`src/lib/aiSuggestions.ts`) designed to be replaceable with a future LLM backend.
