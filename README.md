# LiMa — Livestock Management Frontend

LiMa is a React single-page application for livestock farm management. The frontend is organized by feature and uses a layered architecture with the Model–View–ViewModel (MVVM) pattern for feature workflows.

## Tech Stack

- **React 19** for the UI
- **TypeScript 7** for static typing
- **Vite 6** for development and production builds
- **Material UI 6** and Emotion for interface components and styling
- **React Router 7** for client-side routing
- **Supabase JavaScript client** for authentication and session access
- **FastAPI REST API** for application data, accessed through the shared API client

## Getting Started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically http://localhost:5173).

Configure local environment variables in `.env.local` or `.env`:

```dotenv
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-publishable-key>
VITE_API_URL=<your-api-url>
```

In Vite development mode, API requests use the `/api` path and are proxied to `http://localhost:8000`. Configure the proxy target in `vite.config.ts` if your local backend uses another address. Do not commit credentials or secrets.

## Architecture

The codebase uses feature-oriented modules and separates UI, workflow state, and data access.

### Layers

- **Presentation** — React pages and components under `features/*/view` (or `features/*/views`) render the UI and forward user actions.
- **ViewModel** — Hooks under `features/*/viewmodel` coordinate page state and actions, keeping workflow logic out of presentational components.
- **Model and data access** — Types, entities, and formatting helpers under `features/*/model` define feature data and behavior. Gateway interfaces describe required operations; gateway implementations connect to the REST API.
- **Application and shared infrastructure** — `src/app` contains routing, layouts, providers, and the shared API client. `src/shared` and `src/theme` provide reusable components and design tokens.

### MVVM example: farms

The farms page follows this flow:

1. `YourFarmPage` is the **View**. It renders loading, error, empty, invitation, and farm-list states.
2. `useYourFarmsViewModel` is the **ViewModel**. It loads farms and invitations, manages state, and exposes actions to the page.
3. `FarmsGateway` is the model-facing data contract. `supabaseFarmsGateway` implements it using the shared API client and farm endpoints.

This keeps the page UI independent of the HTTP details and makes the data source replaceable through the gateway.

## Project Structure

```text
src/
  app/
    layout/       Shared application layouts
    providers/    Supabase client, API client, and endpoint definitions
    router/       Application routes and route guards
  features/
    authentication/
      model/      Authentication data access
      viewModel/  Authentication workflows
      views/      Login and registration UI
    farm/
      model/      Farm types, formatting, and gateway
      view/       Farm pages and reusable farm UI
      viewmodel/  Farm page state and actions
    landing/
      views/      Landing page
  shared/         Reusable application components
  theme/          Design tokens
```

## Current Implementation

- Landing page, login, and registration screens are implemented.
- The authenticated farm listing and farm-loading flow are implemented.
- Invitation loading currently returns an empty list until the invitations API is available.
- Onboarding, farm creation, and most farm-scoped routes currently use placeholder pages.

## Commands

```bash
npm run dev      # Start the Vite development server
npm run build    # Type-check and create a production build
npm run preview  # Preview the production build locally
```
