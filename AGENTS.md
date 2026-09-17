# Writing

Use the [stop-slop skill](/Users/krishna/.agents/skills/stop-slop/SKILL.md) for all prose, including UI copy, documentation, commit messages, and responses. Read the skill before writing and review the result against its checks. Keep Krishna's voice. Use concrete claims and remove filler, inflated language, formulaic contrasts, and em dashes.

# Design and content

This is Krishna's personal website. Preserve the minimal monochrome theme, narrow reading column, portrait, Space Grotesk and Spline Sans Mono typography. Use plain project lists and restrained motion. Do not add recruiting copy, availability, remote preferences, hiring calls to action, salary details, or a busy dashboard layout.

Describe projects at their implemented scope. Label experiments and unfinished work. Do not invent users, revenue, performance figures, or production readiness.

# Development

- Keep the existing pnpm lockfile and use pnpm for this checkout. Install dependencies through the package manager.
- Read version-matched framework documentation before upgrading or changing framework APIs.
- Prefer maintained libraries and the existing UI components. Keep changes small and readable; do not use `any`.
- Use kebab-case for new TypeScript and TSX files.
- Do not run package.json `db:*` commands. Ask Krishna to run them if required.
- Preserve database content and existing useful routes. Do not make the homepage depend on credentials or third-party APIs.
- Verify type checking, lint, the production build, and relevant browser behavior. Check keyboard use, mobile layouts, dark mode, and reduced motion.
- Do not commit, push, or deploy unless Krishna asks.

# Next.js documentation

After installing dependencies, read the documentation that matches the installed Next.js version. Use `node_modules/next/dist/docs` when the package includes it, and the official Next.js upgrade guides otherwise.
