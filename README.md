# LiMa — Livestock Management Frontend

React + Vite + TypeScript frontend for a Livestock Management System, based on the provided HTML wireframe and architecture prompt.

## Current Focus

**Landing page is fully implemented** to match the attached wireframe (layout, colors, typography, sections, CTAs, language toggle placeholder, navigation).

All other routes (`/login`, `/register`, `/onboarding`, `/home`, farm-scoped modules, etc.) are **placeholders** for this iteration.

## Quick Start

```bash
cd lima-frontend
npm install
npm run dev
```

Open http://localhost:5173

## Structure (partial, focused on landing)

- `src/features/landing/views/pages/LandingPage.tsx` — full landing page from wireframe
- `src/app/router/AppRouter.tsx` — routes (landing + placeholders)
- `src/theme/tokens.ts` — design tokens extracted from wireframe
- `src/shared/components/PlaceholderPage.tsx` — generic placeholder

## Next steps (per master prompt)

- Full folder structure for all features
- Auth, onboarding, farms, dashboard modules with ViewModels / stores / repositories
- Supabase + FastAPI infrastructure
- i18n (en/fil)
- MainLayout with sidebar
- PWA, etc.

## Design tokens (from wireframe)

- Primary: `#163D29`
- Secondary / accent green: `#708D36`, `#5C7A26`
- Background: `#F7F8F2`
- Features section: `#D9E4C3`
- CTA: `#2E663A`
- Fonts: Inter + Plus Jakarta Sans
