# Saad Bin Saeed Khan — Portfolio

Personal portfolio of **Saad Bin Saeed Khan**, Full Stack Developer (MERN).
Live: <https://ssamportfolio.netlify.app/>

Built with **React 18**, **Vite**, **Tailwind CSS**, **Redux Toolkit** and **Framer Motion**, deployed on **Netlify**.
An optional **Express + Nodemailer** API for the contact form lives in [`backend/`](backend/).

---

## Highlights

- **Real projects only.** Every project links to its GitHub repository, and every screenshot was captured from the actual app running locally.
- **Editorial project showcase.** Featured projects with an accessible screenshot carousel (swipe, arrow keys, buttons, dots), a full-screen lightbox, a filterable grid and a live "More on GitHub" list.
- **Light and dark themes.** Semantic design tokens, OS preference by default, remembered manual choice and no flash on load.
- **Responsive from 320 px to 4K.** Fluid type with `clamp()`, a centred 1280 px content column and no horizontal scrolling.
- **Accessible.** Semantic landmarks, skip link, visible focus, 44 px touch targets, reduced-motion support and WCAG AA colour contrast in both themes.
- **Working contact form.** Uses Netlify Forms, your own API or a pre-filled email. It never shows a fake "sent" message.
- **SEO.** Canonical URL, Open Graph and Twitter cards, JSON-LD `Person` data, sitemap, robots and a 404 page.

## Project structure

```
├── index.html                 # Meta/SEO, no-flash theme script, Netlify form stub
├── netlify.toml               # Build, cache and security headers, old résumé redirect
├── public/                    # Favicons, og-image.jpg, résumé PDF, robots, sitemap, 404
├── backend/                   # Optional Express + Nodemailer contact API
└── src/
    ├── data/                  # ← All content: profile.js, projects.js, skills.js
    ├── assets/projects/<id>/  # Project screenshots (<view>-800.webp, <view>-1600.webp)
    ├── components/
    │   ├── layout/            # Header (desktop + mobile nav), Footer
    │   ├── sections/          # Hero, About, Skills, Projects, Services, Journey, Contact
    │   ├── projects/          # FeaturedProject, ProjectCard, ProjectGallery, Lightbox, GitHubRepos
    │   └── ui/                # Logo, ThemeToggle, SectionHeading, Reveal, SocialLinks, …
    ├── hooks/                 # useThemeSync, useActiveSection
    ├── lib/                   # images (responsive srcset), contact (form delivery), gallery
    ├── store/                 # Redux Toolkit: theme + GitHub repositories
    └── index.css              # Design tokens (light/dark), fonts, component classes
```

## Run locally

Requires Node.js 18 or newer (Netlify builds with Node 20).

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint       # ESLint (React, hooks)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run check      # lint + build
```

## Editing content

All text lives in `src/data/`, so you never need to touch the components.

| What                                      | Where                     |
| ----------------------------------------- | ------------------------- |
| Name, role, contact, socials, availability | `src/data/profile.js`     |
| Services, process, journey, certifications | `src/data/profile.js`     |
| Skills                                    | `src/data/skills.js`      |
| Projects (featured and grid)              | `src/data/projects.js`    |
| Résumé PDF                                | `public/resume/saad-bin-saeed-khan-resume.pdf` |

### Adding a project

1. Capture screenshots at **1280 × 800** (16:10), ideally at 2× density.
2. Save them as WebP in `src/assets/projects/<project-id>/`, naming each view `<view>-1600.webp` and `<view>-800.webp`.
3. Add an entry to `projects` in `src/data/projects.js`. Set `featured: true` for an editorial block, and `liveUrl` once it is deployed.

A missing image shows a styled "Preview not available" placeholder instead of a broken icon.

## Contact form

The delivery method is chosen at build time (`src/lib/contact.js`):

| Mode | When | What happens |
| --- | --- | --- |
| **Netlify Forms** | Built on Netlify and `VITE_BACKEND_URL` is empty (the default) | Submissions appear in Netlify, under Site → Forms |
| **Express API** | `VITE_BACKEND_URL` is set | POSTs to `backend/` (Nodemailer + Gmail), which also sends an auto-reply |
| **Email app** | Anywhere else (e.g. `npm run dev`) | Opens the visitor's email app with the message pre-filled |

If sending fails, the visitor sees the reason and a one-click "send it by email instead" link that keeps their message.

**One-time Netlify setup:**

1. Open Site configuration → Forms and click **Enable form detection**, then redeploy.
2. Under Forms → Form notifications, add an email notification to `saadkhan01999@gmail.com`.

Spam protection uses the Netlify honeypot field (`bot-field`). You can turn on reCAPTCHA in Netlify if spam becomes an issue.

**Optional: Express backend.** This is only needed if you prefer Gmail delivery with auto-replies.

```bash
cd backend
npm install
cp .env.example .env   # set GMAIL_USER and a Gmail App Password in GMAIL_PASS
npm run dev            # http://localhost:5000
```

Then set `VITE_BACKEND_URL` (see `.env.example`) in Netlify → Site configuration → Environment variables to the deployed backend URL, and redeploy.

## Deploy to Netlify

`netlify.toml` already sets everything up:

- Build command `npm run build`, publish directory `dist`, Node 20
- Long-term caching for fingerprinted assets, plus security headers
- A 301 redirect from the old résumé path (`/src/assets/latest.pdf`) to the new one

To deploy, connect the GitHub repository in Netlify (*Add new site → Import an existing project*). Every push to `main` then deploys automatically.

**If the domain changes,** update the URL in `index.html` (canonical, Open Graph, JSON-LD), `public/sitemap.xml`, and `public/robots.txt`.
