---
name: events-nextapp
description: Project-specific guidance for developing and maintaining the DevEvent Next.js application.
---

# DevEvent project guidance

Use this skill for implementation and maintenance work in this repository. This is the DevEvent application; do not assume architecture or endpoints from other projects apply here.

## Project structure

- `app/` contains the Next.js App Router layouts, pages, and API route handlers. Public event pages are under `(root)` and dashboard pages under `(dashboard)`.
- `app/api/events/` contains the event collection and slug API handlers.
- `components/` contains shared UI and booking components.
- `database/` contains Mongoose models; `lib/mongodb.ts` owns the cached MongoDB connection.
- `lib/actions/` contains server actions for events and bookings.

## Implementation conventions

1. Read the repository `AGENTS.md` and the relevant guide under `node_modules/next/dist/docs/` before changing Next.js code. This project uses Next.js 16; check installed documentation rather than relying on older API conventions.
2. Keep route handlers in `app/api/`, data models in `database/`, database connection logic in `lib/mongodb.ts`, and shared UI in `components/`.
3. Keep database access on the server. Use the existing Mongoose connection helper and models instead of opening a new connection in a page or component.
4. Preserve App Router server/client boundaries. Add client-component directives only for UI that needs browser state or event handlers.
5. Dynamic route parameters are asynchronous in this codebase. Follow the parameter types and awaiting pattern used by neighboring routes.
6. Event images use Cloudinary, and the configured remote image host is `res.cloudinary.com`. Update `next.config.ts` if a new remote image host is deliberately introduced.
7. Keep credentials and provider secrets in protected environment configuration. Never add them to source, documentation, client components, or logs.
8. When dependencies change, update `package.json` and `package-lock.json` together and verify the installed dependency tree.

## Validation

- Run `npm run lint` for linting.
- Run `npm run build` for a production build.
- `next.config.ts` currently sets `typescript.ignoreBuildErrors`; run `npx tsc --noEmit` as well when changing TypeScript or dependency types.
- Check `package.json` for available scripts before assuming a test command exists.
