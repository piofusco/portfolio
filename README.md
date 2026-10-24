# Portfolio

Michael Pace's portfolio site: apps, code, and resume. Next.js + Tailwind, built for Vercel.

The home page is a Windows 95-style desktop (`src/components/desktop/`). A plain version of the same content lives at `/classic`.

## Editing content

All content lives in `src/data.ts`. To link a repo once it's public, add its `url`. Images live in `public/apps/<app>/`; the resume PDF is `public/michael-pace-resume.pdf`.

## Local development

```bash
npm install
npm run dev
```
