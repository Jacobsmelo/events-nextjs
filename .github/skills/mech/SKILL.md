---
name: mech
description: Review code for correctness, regressions, authorization flaws, and missing tests; make focused fixes only when explicitly requested.
---

# Mech Code Reviewer

This skill is customized for the DevEvent Next.js application. For code reviews,
use the repository's focused reviewer agent at
`.github/agents/rubber-duck.agent.md` and follow its review constraints.

Use this skill when reviewing code changes or an implementation. Inspect the requested diff and enough surrounding code to understand intended behavior.

## DevEvent project context

- Keep App Router pages and API handlers in `app/`, shared UI in `components/`,
  Mongoose models in `database/`, and server actions and database helpers in
  `lib/`.
- Server-side MongoDB connections use `lib/mongodb.ts`. Check that database
  access and secrets are not exposed to client components.
- Preserve existing server/client boundaries, async route parameter patterns,
  and Cloudinary image host configuration.
- Before making Next.js code changes, read `AGENTS.md` and the relevant guide
  under `node_modules/next/dist/docs/`. Preserve the installed Next.js version's
  conventions and heed deprecation notices.
- For relevant code changes, run `npm run lint`, `npx tsc --noEmit`, and
  `npm run build`; report any checks that could not be run.

## Review approach

For every review invocation, create a `Security boundary check` todo/checklist item and complete it before concluding. Cover authentication/authorization, untrusted input and file/network access, secrets and sensitive-data exposure, and session/CORS/CSRF or service exposure where relevant. If no todo tool is available, track it as the first explicit checklist item.

1. Trace affected callers and tests when needed.
2. Look for concrete correctness issues, regressions, unsafe access boundaries, and missing tests.
3. Rank actionable findings by severity and confidence. Include file and line references, explain the impact, and suggest a concise fix.
4. Do not report speculative concerns or style-only feedback.
5. Keep reviews read-only unless the user explicitly asks for edits. An instruction to “edit” (or equivalent wording) authorizes focused changes to the reviewed code; do not treat a review request alone as permission to edit. Add or update targeted tests and run relevant checks for requested code changes.
6. If no actionable issues are found, say so and note any meaningful test gaps.

For reviews, list findings first, ordered by severity. End with a brief test-coverage note. For requested fixes, summarize the changes and verification results.

## Specialized review workflows

For reviews in these domains, invoke and follow the matching skill in addition to the review approach above:

- UI, accessibility, UX, or Web Interface Guidelines reviews: invoke
  `/web-design-guidelines` and follow
  `C:\Users\jacob\.copilot\skills\web-design-guidelines\SKILL.md`.
- Prompt safety, bias, security, or effectiveness reviews: invoke
  `/security-best-practices:ai-prompt-engineering-safety-review` and follow
  `C:\Users\jacob\.copilot\installed-plugins\_direct\github--awesome-copilot--plugins-security-best-practices-8310577b\skills\ai-prompt-engineering-safety-review\SKILL.md`.

Use these specialized workflows only when the requested review matches their
domain. Their machine-local DevEvent integration notes are maintained in the
referenced skill files.
