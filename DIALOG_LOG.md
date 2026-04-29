# Dialog Log

One paragraph per entry — what changed and why, in plain prose. Update only when asked.

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
- Made the grocery table scroll inside its own box with a sticky header. The page is now capped at viewport height so the table is what overflows, not the page. Few rows hug their content (no empty space below), many rows shrink the table and scroll under the header. Pulled the scroll wrapper out into its own `TableContainer` so callers size it directly. Borders broke once the header went sticky — `border-collapse` paints lines on the table grid, not on the cells that move — so the table is now `border-separate` with the grid lines moved onto the cells themselves. They travel with the sticky header and stay 1px because each line is owned by only one side of any cell pair.
- Added a section filter to the grocery table, fed into TanStack via a controlled `columnFilters` array with `filterFn: "equalsString"` for exact match. The UI is the shadcn `Select` (Base UI flavor), with `null` representing "no filter" end-to-end — Base UI accepts any value type, so a `<SelectItem value={null}>` works without a sentinel string. The `columnFilters` array is wrapped in `useMemo` to keep its reference stable across renders; without that, TanStack's `autoResetPageIndex` saw a fresh array on every render and looped pagination resets infinitely.
