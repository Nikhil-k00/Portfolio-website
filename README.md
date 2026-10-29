# Nikhil K — Developer Portfolio

React 19 + TypeScript + Vite portfolio site with a Vercel serverless contact form.

## Tech stack

- React 19
- TypeScript (strict)
- Vite 7
- Tailwind CSS 3
- Radix UI / shadcn-style components
- Framer Motion
- Vercel Serverless Functions (Node.js, Nodemailer) for contact delivery

## Prerequisites

- Node.js 20.19+ or 22.12+ (Vite 7 requirement; this repo was built/tested with Node 24)
- npm 10+

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Starts the Vite dev server. The contact form posts to `/api/send-contact`. In plain Vite dev mode the endpoint is not served unless you run the Vercel dev server (`vercel dev`); otherwise use a deployed preview.

## Lint

```bash
npm run lint
```

Runs ESLint over the TypeScript/TSX source.

## Build

```bash
npm run build
```

Runs `tsc -b` (type check) and then `vite build`, outputting to `dist/`.

## Preview production build

```bash
npm run preview
```

## Deployment (Vercel)

`vercel.json` is configured with:

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

Import the repository into Vercel or run `vercel` from the project root. Vercel will detect the Vite frontend and the Node.js serverless function in `api/`.

The contact function lives in `api/send-contact.js` and is deployed automatically by Vercel. SMTP credentials must be added in the Vercel project settings (Environment Variables).

### Contact form SMTP environment variables

Set these in Vercel (Project Settings -> Environment Variables). Do not commit secret values.

Required:

- `SMTP_HOST` — SMTP server hostname
- `SMTP_USER` — SMTP username / authenticated sender
- `SMTP_PASS` — SMTP password or app password

Optional:

- `SMTP_PORT` — SMTP port (defaults to `587`; use `465` for implicit TLS)
- `CONTACT_TO_EMAIL` — recipient address (defaults to `nikhil82647@gmail.com`)

If the required variables are missing, the function returns `Mail server not configured` and the UI prompts visitors to email directly.

## Public contact

- Email: `nikhil82647@gmail.com`
- GitHub: https://github.com/Nikhil-k00
- LinkedIn: https://www.linkedin.com/in/nikhil-k-7b564a2b9/
