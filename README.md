# Created by humans

To add some reasoning about my decisions, which might seem unoptimal. And to add some context on applied toolkit.

## AI

I was mainly using Claude Code in two parallel windows + Cursor for manual editing (the "tab" model of Cursor is still superior, even though Cursor as a product is rather questionale in 2026). I was considering if I should utilize workspaces for parallel tasks, but I decided against it, as I was already experimenting with Oxlint/Oxfmt/tsgo and didn't want to introduce a lot of changes against my "default" toolkit.

I was also reliant on Figma MCP. I wasn't able to connect directly to provided Figma mock, so I copied it in to a private workspace and exposed it for MCP (everything locally). I find it rather helpful for UI implementation with AI. Even though modern AI tools produce mediocre UI and are not as good with CSS as I'd love them to be.

Somewhere between 90% and 98% of code is produced by Claude. That is a privilege of "default" project that doesn't have a lot of "AI traps", ofcourse. in real projects this number for me is somewhere between 80% and 95%

## Tanstack table as a core

I was debating internally between using table library or building custom state for table things, like sorting, pagination, filtering etc. I decided in favor of table headless library, as this is what I would use in a real project maintained by a team. It is a bit of a "heavy" library and it has some rather unusual way how it is used with React. It is also not (yet) compatible with compiler, even though next version that IS compatible is in active development. So it has it's own drawbacks. Nevertherless I see more good then harm in utilizing it and I'd happily debate that if there's a room for it, let me know!

## Interactivity, a11y, what is different than Figma mock shows.

I didn't found any hints in how interactive elements should behave in terms of UI, so I was a bit creative and decided to use a headless library (Base-UI) with shadcn for fast prototyping, I also replaced "filter" button at the top with a selector, as it felt more natural in this particular setup.

I applied some changes to table column headers to support accesible sorting/pinning. It wasn't part of design, but It is a good and a11y friendly way to do it, so i was deliberately stepping away from Figma mock.

I treated Hero icons pack more as a suggestion, and decided to use Lucide icons. It seems that hero icons is a dormant library and have a limited set of available icons. It is in the end a UI/UX designer choise, but From my (developer) perspective I usually prefer to use something that is actively maintained, which was a reason to opt out of hero icons in this particular case.

All of this questions would decided in a dialog with team in general and UI/UX person in particular in a real life scenario, ofcourse.

## Oxlint + Oxfmt + tsgo instead of Eslint + Prettier + ts.

In my experience, for optimal AI utilization having a reliable feedback loop with static tooling (linting, formatting, types) is maybe the most critical part of utilizing AI successfully. Standard tooling is alright, but it's unacceptably slow for bigger projects. So I believe it's inevitable that we have to migrate most of projects from Eslint and prettier in next 2 years. In this project it is not required and eslint/prettier speed is sufficient, but I wanted to experiment for my own experience with this (newer) tooling around typescript projects. Not as a part of assignment but as a learning opportunity.

## Timing

In total I spend somewhere close to 4:00 to 4:30 hours on the task. Most was taken by setup, which is an overkill but also a building block for any real application, and not mounting formatting/linting/tailwind/base-ui/claude-hooks and other libraries/tools may have saved some time for me, but is not realistic path for a real project.
