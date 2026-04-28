# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Vite 8 + React 19 + TypeScript 6, **oxlint** 1.x for linting (config in `.oxlintrc.json`), **oxfmt** for formatting. **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first config — no `tailwind.config.js`, customize via `@theme` in CSS if needed). Package manager is **pnpm** (a `pnpm-lock.yaml` is present — do not introduce `npm` or `yarn` lockfiles).

No test framework is wired up. There is no router or state library. Styling is Tailwind utilities plus hand-written CSS variables and base styles in `src/App.css` and `src/index.css` (Tailwind imported at the top of `index.css`).

## Commands

- `pnpm dev` — Vite dev server with HMR.
- `pnpm build` — runs `pnpm check && vite build`. All checks (lint, format, typecheck) must pass before Vite is invoked.
- `pnpm lint` — oxlint over the repo.
- `pnpm fix` — oxlint with `--fix` (auto-applies fixable lint issues).
- `pnpm format` — oxfmt over the repo.
- `pnpm format:check` — oxfmt in check mode (fails if anything is unformatted).
- `pnpm typecheck` — `tsc -b` (project-reference build, no bundle).
- `pnpm check` — runs `lint`, `format:check`, and `typecheck` in sequence; this is the gate `build` enforces.
- `pnpm preview` — preview the production build.

Use `pnpm exec tsc -b --force` to bypass the TypeScript build cache in `node_modules/.tmp/` if needed.

## Figma designs

Read via local Figma MCP (`mcp__figma-local__*`). File must be open in Figma desktop. Test file is hardcoded: fileKey `BDZdbcGYGz4qROFTKheRhu`, node `0:334` ("Today's groceries").

- Tools are deferred — load via `ToolSearch` (`select:mcp__figma-local__get_design_context,mcp__figma-local__get_screenshot`).
- Parse URL: `?node-id=X-Y` → nodeId `X:Y`.
- Call `get_design_context` (code, prefer) **and** `get_screenshot` (visual). Use `get_metadata` only to discover child node IDs.
- Output is React + Tailwind — adapt to this project's plain CSS in `src/App.css` / `src/index.css`. Map MCP tokens (e.g. `#e2e8f0`, `#020617`, `#71717a`, fonts `SF Pro Text` / `Inter`) to direct values. Asset URLs from `localhost:3845` work as-is.
- "Resource couldn't be accessed" → file not open in desktop or no permission. Don't retry blindly.
