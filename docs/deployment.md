# Deployment Notes

## Current Runtime

The app is a Next.js App Router project.

Local development:

```bash
npm run dev -- --port 3000
```

Production build smoke:

```bash
npm run build
npm run start
```

## Current Storage

The current build is local-first and file-backed:

- Base personas: `data/personas.json`
- Persona council rosters: `data/council-rosters.json`
- Persona council runs and related records: `data/council-runs.json`

Base persona screens do not read fixture personas. If `data/personas.json` is
empty, the app should show the empty state until a user creates a persona.

Council screens do not seed historical runs or rosters. If the council JSON
files are empty, the app shows empty council states until a real roster or run
is created/imported.

## Deployment Constraint

Local JSON is suitable for local dogfooding and hosts with a persistent writable
filesystem. It is not the production storage plan for serverless or immutable
deployments.

Before production deployment, choose one durable storage adapter:

- Managed Postgres for multi-user/serverless deployment.
- SQLite only when the host provides a persistent volume.
- Object storage plus optimistic version checks for simple single-user JSON
  documents.

Until that adapter exists, deploy this app as a local or persistent-filesystem
preview, not as a production multi-user service.

## Usage Semantics

Persona `status: "active"` means the persona is available inside this app as a
saved record. It does not mean the persona is running as an agent, used by an
external app, or automatically included in live launches.

Actual use paths today:

- `/` lists saved personas from `data/personas.json`.
- `/personas/new` creates a saved persona through `/api/personas`.
- `/personas/[id]` and `/personas/[id]/edit` read saved persona records.
- `/competitive-research` filters saved personas by the
  `competitive-research` tag.
- `/councils/new` selects roster personas for a planned council run.

Live agent launch remains gated behind generated command packets and explicit
operator action.
