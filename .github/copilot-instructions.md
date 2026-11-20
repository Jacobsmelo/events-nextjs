# DevEvent Copilot instructions

- For repository architecture and implementation conventions, follow the `events-nextapp` skill in `.github/skills/events-nextapp/SKILL.md`.
- Read `AGENTS.md` and the relevant installed Next.js guide under `node_modules/next/dist/docs/` before making Next.js changes.
- Keep App Router pages and API handlers in `app/`, shared UI in `components/`, Mongoose models in `database/`, and server actions and database helpers in `lib/`.
- Use `lib/mongodb.ts` for server-side MongoDB connections. Never expose database access or secrets to client components.
- Preserve existing server/client boundaries, async route parameter patterns, and the Cloudinary image host configuration.
- Keep dependency manifests and lockfiles in sync. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` when relevant.
