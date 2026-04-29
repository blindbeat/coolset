# Dialog Log

One paragraph per entry — what changed and why, in plain prose. Update only when asked.

## 2026-04-28

- Set up this log alongside `CLAUDE.md` for the Coolset exercise. Both update only when asked, so the project agent doesn't drown the repo in churn.
- Replaced ESLint with oxlint and added oxfmt for formatting — both much faster than the JavaScript-based originals. A single `check` script now bundles lint, format, and typecheck, and `build` runs it first, so a regression in any of them blocks shipping.

## 2026-04-29

- Verified the local Figma MCP works — designs can be pulled into the agent as code plus screenshots — and documented the access pattern in `CLAUDE.md` so future sessions don't have to relearn it.
- Installed Tailwind CSS v4. The v4 setup is CSS-first (no JavaScript config), which keeps theme tokens next to the styles they configure.
- Wired up a Stop hook that runs `pnpm check` before each turn finishes, so any formatting, lint, or type regression the agent introduces is caught on the spot rather than at PR time.
- Cleared out the Vite default page — logos, demo CSS, the counter button — leaving a centered "hello world" as a clean canvas.
- Added an oxfmt config so it sorts Tailwind class names automatically (reading the actual theme from CSS) and recognizes our `cn` helper. Pulled in TanStack Table and a couple of small class-merging utilities for the grocery table that came next.
- Built the first version of the grocery table from the Figma reference — a thin, shadcn-style table primitive driven by TanStack Table, read-only. Numbers are right-aligned through a single column flag rather than scattered formatting, and prices go through one shared formatter so the display stays consistent.
- Switched typechecking from the standard TypeScript compiler to `tsgo`, the new Go-based rewrite from Microsoft. It's much faster, and confirmed it actually catches real errors rather than exiting silently — which would have been a nasty surprise.
- Added pagination to the grocery table per the Figma reference. The component is split in two on purpose: a presentational `Pagination` that takes plain props, and a thin wrapper that adapts a TanStack table to it, so the feature site stays a single line.
- Installed shadcn/ui in its Base UI flavor and ported the pagination chevrons to the shadcn Button. The first install silently picked the Radix-based preset because of a missed flag; a clean rerun fixed it.
- Made the grocery table scroll inside its own box, with the header staying in place at the top. The page no longer overflows; the table does. Borders had to move from the table grid onto individual cells so they'd survive the now-sticky header without getting left behind during scroll.
- Added a section filter above the table — pick a section and the rows narrow down to just that. Built on shadcn's Select, with "no filter" represented as `null` end-to-end so there's no magic string to maintain.
- Made the table header sort-aware. Sortable columns show a subtle arrow that lights up when active and flips direction; non-sortable columns stay flat. The Section column opts out — it makes more sense as a filter.
- Wired up left-column pinning so the name column stays visible as the table scrolls horizontally. Header and body cells share the same pinning logic so they line up, and a small layering tweak keeps the corner cell on top during diagonal scroll. Only kicks in once the table actually overflows its container.
- Made the row above the table (title and section filter) and the row below (pagination) wrap cleanly when the page narrows — they stack onto two lines with a tighter vertical gap instead of getting cramped on one.
- Replaced the click-anywhere-on-the-header sort with explicit sort and pin buttons on each column, both keyboard-reachable. Pinning is now exclusive — pinning a new column unpins the old one — and the pinned column gets a subtle right-edge shadow that communicates depth as content scrolls beneath it.
- Swapped the native rows-per-page dropdown for the same shadcn Select that powers the section filter, so both controls look and behave the same.
- Cleaned up the table styles by leaning on the project's design tokens — body text and default borders already match what was being repeated on every cell, so those classes came out. Briefly experimented with shifting the foreground color before sticking with the original. Also simplified the section filter by reading and writing it directly through TanStack instead of mirroring the value in local React state.
- Made the name column auto-pin on narrow screens, while keeping the manual pin button as the source of truth — a click locks in your choice and stops the auto rule from second-guessing it. A small viewport-watching hook drives the responsive part, and it only re-renders the table when the viewport actually crosses the threshold, not on every pixel of resize.
