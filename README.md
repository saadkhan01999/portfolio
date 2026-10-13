# Saad Bin Saeed Khan — Portfolio

Personal portfolio of **Saad Bin Saeed Khan**, Full Stack Developer (MERN).
Live: <https://ssamportfolio.netlify.app/>

Built with **React 18**, **Vite**, **Tailwind CSS**, **Redux Toolkit** and **Framer Motion**, deployed on **Netlify**.
An optional **Express + Nodemailer** API for the contact form lives in [`backend/`](backend/).

---

## Highlights

- **Real projects, presented as products.** Adeena Traders (instalment & retail system), KSF Pharmacy System, Feather & Bone (live at featherbonepk.com) and more. Each one is an art-directed panel with a full case study: the challenge, what was built, key numbers, the stack and a screenshot carousel. Source code is not linked.
- **Scroll storytelling.** Featured projects pin and stack as you scroll. A 3D hero showcase follows the pointer, and gradient progress lines fill with scroll.
- **Command palette.** Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> (or <kbd>/</kbd>) to jump to a section, open a case study, switch theme, copy the email address or download the résumé.
- **Services that sell.** Eight services (custom software, business websites, web apps & SaaS, custom design, e-commerce, portfolio sites, dashboards, mobile apps), each tied to a project where it shipped, plus what every project includes and a closing call to action.
- **Certificates.** Course certificates show as cards in the Journey section and open full-size in a viewer.
- **Shareable case studies.** `?project=ksf-pharmacy` opens a case study directly, and the browser's Back button closes it. `/#contact` and other section links land exactly on the section.
- **Polish.** A scroll progress bar, a back-to-top button with a progress ring and a circular-reveal theme switch. There is also a live local-time card, count-up stats, a tech marquee and cursor spotlight cards.
- **Light and dark themes.** Semantic design tokens, OS preference by default, remembered manual choice and no flash on load.
- **Responsive from 320 px to 4K**, accessible (axe: 0 violations; skip link; focus management in every dialog; 44 px targets; reduced-motion support) and fast. Dialog code loads on demand, offscreen sections skip rendering, and scroll effects use native CSS scroll timelines.
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
    ├── assets/projects/<id>/  # Project images (<view>-800/1600.webp; phones <view>-390/780.webp)
    ├── components/
    │   ├── layout/            # Header, Footer, CommandPalette, ScrollUi (progress bar, back to top)
    │   ├── sections/          # Hero, Work, Services, About, Skills, Journey, Contact
    │   ├── projects/          # FeaturedStack, CaseStudy, ProjectCard, ProjectGallery, Lightbox, ProjectVisual
    │   └── ui/                # Effects (aurora, rotator, count-up, marquee), DeviceFrames, Logo, …
    ├── hooks/                 # theme, active section, palette shortcut, case-study URL, spotlight
    ├── lib/                   # images, contact (form delivery), panel colours, platform
    ├── store/                 # Redux Toolkit: theme + UI (palette, open case study)
    └── index.css              # Design tokens (light/dark), fonts, effects
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
| Services, process, journey, certificates  | `src/data/profile.js`     |
| Skills                                    | `src/data/skills.js`      |
| Projects (featured and grid)              | `src/data/projects.js`    |
| Résumé PDF                                | `public/resume/saad-bin-saeed-khan-resume.pdf` |

### Adding a project

1. Export images as WebP into `src/assets/projects/<project-id>/`:
   - Desktop screens or slides go in as `<view>-1600.webp` and `<view>-800.webp`. Pass `{ width, height }` to `screenshot()` if they aren't 16:10 (in `visual.windows`, use `{ view, width, height }`).
   - Phone screens go in as `<view>-780.webp` and `<view>-390.webp`.
2. Add an entry to `src/data/projects.js`:
   - For a stacking panel, set `featured: true`, then give it a `theme` (panel colours) and a `visual` (which screens to frame).
   - Optional fields are `metrics`, `tagline`, `platforms` and `liveUrl`.
3. Everything else (case study, command palette entry, footer link) picks the new project up automatically.

A missing image shows a styled "Preview not available" placeholder instead of a broken icon.

### Adding certificates

1. Export the scan as WebP into `src/assets/certificates/` in two widths, e.g. `<id>-800.webp` and `<id>-1600.webp`.
2. Add it to `certificates` in `src/data/profile.js` with `certificateImage('<id>', [800, 1600], { width, height }, alt, caption)`.
3. To link it from the timeline, set `certificateId: '<id>'` on a `journey` entry.

Courses without a scan go in `certifications` and are listed under "Also completed".

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
