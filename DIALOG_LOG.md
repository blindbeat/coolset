# Dialog Log

Brief log of dialog turns: what was done and why. Updated only when the user explicitly asks.

## 2026-04-28

- Created `DIALOG_LOG.md` (Coolset testing exercise). Update `CLAUDE.md` and this log only when explicitly asked.
- Swapped ESLint for oxlint and added oxfmt. Added `fix`, `format`, `typecheck`, and `check` scripts, with `build` now gated on `check`. `CLAUDE.md` updated.

## 2026-04-29

- Verified local Figma MCP (`get_design_context` + `get_screenshot`) on hardcoded test file `BDZdbcGYGz4qROFTKheRhu` node `0:334`. Added a brief Figma-access section to `CLAUDE.md`.
- Installed and set up Tailwind CSS v4 (via `@tailwindcss/vite`, CSS-first, no JS config). `CLAUDE.md` updated.
- Added a Stop hook (`.claude/settings.json`) running `pnpm run check` before turn end so formatting/lint/types regressions block the agent.
- Stripped Vite default boilerplate down to a centered "hello world". Removed demo assets, `App.css`, and the custom CSS in `index.css`.
- Added `.oxfmtrc.json` enabling oxfmt's built-in Tailwind class sorting (reads theme from `src/index.css`, recognizes `clsx`/`cn`). Added `@tanstack/react-table`, `clsx`, and `tailwind-merge` dependencies.
- Built the grocery table from the Figma reference: a shadcn-style `<Table>` primitive driven by TanStack Table, read-only. Numeric columns are right-aligned via a `meta.numeric` flag on the column definition rather than scattered class checks, source rows are pre-flattened so column defs use plain string accessors, and numbers go through a module-scope `Intl.NumberFormat`.
- Switched typechecking from `tsc` to `tsgo`, the new Go-based TypeScript compiler from Microsoft. Pinned to the `beta` channel so it tracks upstream as it stabilizes. Confirmed it actually catches errors (not just exiting silently) and updated `CLAUDE.md`.
- Added pagination to the grocery table per the Figma reference, using Lucide for the chevrons. The component splits in two: a presentational `Pagination` that takes plain props (page index/size, totals, handlers) and a thin `TablePagination` wrapper that consumes a TanStack `Table` instance and forwards the right state — so the feature site is just `<TablePagination table={table} />`.
- Installed shadcn/ui with the Base UI flavor. The critical flag was `--base base` on `init` — missed on the first try, which silently produced a Radix-based preset and required a clean re-run. Added the shadcn `Button` component and used it for the pagination's prev/next chevrons; dropped the `asChild` prop and the `radix-ui` dep since nothing needs polymorphic rendering yet.
