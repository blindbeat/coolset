# Created by humans

To add some reasoning about my decisions, which might seem suboptimal. And to add some context on the applied toolkit.

## AI

I was mainly using Claude Code in two parallel windows + Cursor for manual editing (the "tab" model of Cursor is still superior, even though Cursor as a product is rather questionable in 2026). I was considering if I should utilize workspaces for parallel tasks, but I decided against it, as I was already experimenting with Oxlint/Oxfmt/tsgo and didn't want to introduce a lot of changes against my "default" toolkit.

I was also reliant on Figma MCP. I wasn't able to connect directly to the provided Figma mock, so I copied it into a private workspace and exposed it for MCP (everything locally). I find it rather helpful for UI implementation with AI, even though modern AI tools produce mediocre UI and are not as good with CSS as I'd love them to be.

Somewhere between 90% and 98% of the code is produced by Claude. That is a privilege of a "default" project that doesn't have a lot of "AI traps", of course. In real projects this number for me is somewhere between 80% and 95%.

## Tanstack table as a core

I was debating internally between using a table library or building custom state for table things, like sorting, pagination, filtering etc. I decided in favor of a headless table library, as this is what I would use in a real project maintained by a team. It is a bit of a "heavy" library and it has a rather unusual way of being used with React. It is also not (yet) compatible with the compiler, even though the next version that IS compatible is in active development. So it has its own drawbacks. Nevertheless, I see more good than harm in utilizing it, and I'd happily debate that if there's room for it. Let me know!

## Interactivity, a11y, and what differs from the Figma mock

I didn't find any hints on how interactive elements should behave in terms of UI, so I was a bit creative and decided to use a headless library (Base-UI) with shadcn for fast prototyping. I also replaced the "filter" button at the top with a selector, as it felt more natural in this particular setup.

I applied some changes to table column headers to support accessible sorting/pinning. It wasn't part of the design, but it is a good and a11y-friendly way to do it, so I was deliberately stepping away from the Figma mock.

I treated the Heroicons pack more as a suggestion, and decided to use Lucide icons. It seems that Heroicons is a dormant library and has a limited set of available icons. It is in the end a UI/UX designer's choice, but from my (developer) perspective I usually prefer to use something that is actively maintained, which was a reason to opt out of Heroicons in this particular case.

All of these questions would be decided in a dialog with the team in general, and the UI/UX person in particular, in a real-life scenario, of course.

## Oxlint + Oxfmt + tsgo instead of ESLint + Prettier + tsc

In my experience, for optimal AI utilization, having a reliable feedback loop with static tooling (linting, formatting, types) is maybe the most critical part of utilizing AI successfully. Standard tooling is alright, but it's unacceptably slow for bigger projects. So I believe it's inevitable that we'll have to migrate most projects from ESLint and Prettier in the next 2 years. In this project it is not required, and ESLint/Prettier speed is sufficient, but I wanted to experiment for my own experience with this (newer) tooling around TypeScript projects. Not as part of the assignment but as a learning opportunity.

## Timing

In total I spent somewhere close to 4:00 to 4:30 hours on the task. Most was taken by setup, which is overkill but also a building block for any real application; not mounting formatting/linting/tailwind/base-ui/claude-hooks and other libraries/tools may have saved some time for me, but it is not a realistic path for a real project.
