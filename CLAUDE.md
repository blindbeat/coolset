# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Vite 8 + React 19 + TypeScript 6, **oxlint** 1.x for linting (config in `.oxlintrc.json`), **oxfmt** for formatting. Package manager is **pnpm** (a `pnpm-lock.yaml` is present — do not introduce `npm` or `yarn` lockfiles).

No test framework is wired up. There is no router, state library, or styling system beyond hand-written CSS in `src/App.css` and `src/index.css`.

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
