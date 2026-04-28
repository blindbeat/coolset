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
