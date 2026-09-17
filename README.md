# krishnaaa.com

My personal site, built with Next.js, React, TypeScript, and Tailwind CSS.

## Local development

Use pnpm because this repository has a pnpm lockfile.

```sh
pnpm install
pnpm dev
```

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

Biome handles formatting and linting. Run `pnpm format` to format files.

## Content

Edit `src/content/site.ts` for projects, experience, and writing. The homepage shows three projects; `/projects` includes the experiments. Keep descriptions clear about work in progress.

Keep the narrow layout, monochrome colors, portrait, and existing fonts. Motion should stay small and respect reduced-motion preferences. Read `AGENTS.md` and the stop-slop skill before writing copy.

The resume lives at `public/resume.pdf`. Its editable source and generator live in `/Users/krishna/Desktop/job/resumes`. Copy a reviewed PDF here after regenerating it.

## Optional services

The homepage, project list, and writing links need no service credentials. Copy `.env.example` to `.env.local` if you need the optional pages:

- `DATABASE_URL`: Neon PostgreSQL for snippets and the existing newsletter action. Without it, the snippets page shows a service message.
- `GITHUB_ACCESS_TOKEN`: Read-only access to public repository history. Without it, the activity page links to GitHub. The contribution calendar uses its public endpoint.
- `SENDGRID_API_KEY`: Contact email through the existing verified sender. Without it, the contact page shows email and social links. The form validates lengths and uses a honeypot; it does not provide distributed rate limiting. Configure host-level rate limiting before exposing the form to public traffic.

I did not run migrations, send email, or change production data during the refresh. Run database commands yourself when needed. Keep secrets out of Git.

## Before publishing

Check mobile and desktop layouts, keyboard navigation, light and dark themes, the resume link, and service configuration on the intended host. The repository changes do not deploy the site.
