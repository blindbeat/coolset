# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Vite 8 + React 19 + TypeScript 6, ESLint 10 flat config. Package manager is **pnpm** (a `pnpm-lock.yaml` is present — do not introduce `npm` or `yarn` lockfiles).

No test framework is wired up. There is no router, state library, or styling system beyond hand-written CSS in `src/App.css` and `src/index.css`.

## Commands

- `pnpm dev` — Vite dev server with HMR.
- `pnpm build` — runs `tsc -b && vite build`. The TypeScript project-reference build runs **first**; type errors fail the build before Vite is invoked.
- `pnpm lint` — ESLint over the repo (flat config in `eslint.config.js`).
- `pnpm preview` — preview the production build.

There is no `typecheck` script; use `pnpm exec tsc -b` to type-check without producing a bundle (or `pnpm exec tsc -b --force` to bypass the build cache in `node_modules/.tmp/`).
