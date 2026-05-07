# 🚀 Saad Bin Saeed Khan — Portfolio v2.0

A production-grade full-stack portfolio built with **React 18**, **Redux Toolkit**, **Framer Motion**, **Tailwind CSS**, and an **Express.js + Nodemailer** backend for the contact form.

---

## ✨ Features

- 🌗 **Dark / Light mode** with system preference detection & localStorage persistence
- 🎬 **Smooth animations** via Framer Motion (staggered reveals, scroll-triggered, hover states)
- ⌨️ **Typewriter effect** on hero section cycling through roles
- 📊 **Animated stat counters** that trigger on scroll into view
- 🖼️ **Profile image** with spinning gradient ring
- 📡 **Live GitHub repos** fetched from the GitHub API with shimmer loading skeletons
- 🏆 **Featured projects** section (hand-curated above GitHub repos)
- 🎠 **Auto-scrolling testimonials carousel** with pause on hover
- 📬 **Real contact form** with full validation, rate-limiting, auto-reply email, and professional HTML email template
- 📈 **Scroll progress bar** at top of page
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🎨 **CSS design tokens** (`--bg-primary`, `--accent`, etc.) for seamless dark/light theming

---

## 🗂 Project Structure

```
portfolio-pro/
├── src/
│   ├── assets/           # Images, PDF resume, logo
│   ├── components/
│   │   ├── Navbar.jsx    # Fixed nav with active section tracking
│   │   ├── Hero.jsx      # Typewriter, profile ring, floating badges
│   │   ├── About.jsx     # Animated counters, timeline, tech stack
│   │   ├── Skills.jsx    # Animated progress bars by category
│   │   ├── Projects.jsx  # Featured cards + live GitHub repos
│   │   ├── Testimonials.jsx  # Infinite auto-scroll carousel
│   │   ├── Contact.jsx   # Full-stack form → Express backend
│   │   └── Footer.jsx    # Multi-column with back-to-top
│   ├── hooks/
│   │   ├── useTypewriter.js
│   │   └── useAppDispatch.js
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── themeSlice.js
│   │       └── portfolioSlice.js
│   ├── App.jsx           # Root with scroll progress bar
│   ├── index.css         # Design tokens, glass effects, animations
│   └── main.jsx
├── backend/              # Express.js contact API
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## ⚡ Frontend Setup

```bash
# 1. Install dependencies
npm install

# 2. Create env file
cp .env.example .env
# Set VITE_BACKEND_URL=http://localhost:5000 (or your deployed backend URL)

# 3. Run dev server
npm run dev
# → http://localhost:5173
```

---

## 📬 Backend Setup (Contact Form)

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create env file
cp .env.example .env
```

### Fill in `.env`:

```env
GMAIL_USER=saadkhan01999@gmail.com
GMAIL_PASS=your_16_char_app_password   # See below
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Getting Gmail App Password (required):
1. Go to **myaccount.google.com**
2. **Security** → **2-Step Verification** (enable if not already)
3. Search for **"App passwords"**
4. Create one for **Mail** → **Other** → Name it "Portfolio"
5. Copy the 16-character password into `GMAIL_PASS`

```bash
# 4. Start the backend
npm run dev
# → http://localhost:5000
```

Test it:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Hello","message":"This is a test message from the portfolio."}'
```

---

## 🌐 Deployment

### Frontend → Vercel
```bash
npm run build
# Upload `dist/` to Vercel
# Add env var: VITE_BACKEND_URL=https://your-backend.railway.app
```

### Backend → Railway (free)
1. Push `backend/` folder to GitHub
2. Create new Railway project → Deploy from GitHub
3. Add environment variables (GMAIL_USER, GMAIL_PASS, FRONTEND_URL, PORT)
4. Railway gives you a URL like `https://portfolio-backend-xyz.railway.app`

---

## 🔧 Customization Checklist

- [ ] Replace `src/assets/img.jpeg` with your real photo
- [ ] Replace `src/assets/hlogo.png` with your logo
- [ ] Replace `src/assets/latest.pdf` with your updated resume
- [ ] Update `portfolioSlice.js` → featured projects with real project details
- [ ] Update GitHub username in `portfolioSlice.js` → `fetchGitHubRepos`
- [ ] Fill in `backend/.env` with your Gmail App Password
- [ ] Update `VITE_BACKEND_URL` in frontend `.env` for production

---

## 📦 Tech Stack

| Layer       | Technology                            |
|-------------|---------------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS          |
| State       | Redux Toolkit                         |
| Animations  | Framer Motion                         |
| Icons       | Lucide React                          |
| Fonts       | Syne (headings), DM Sans (body), JetBrains Mono |
| Backend     | Express.js, Nodemailer, CORS          |
| Rate Limit  | express-rate-limit (5 msgs/hour/IP)   |
| Deployment  | Vercel (frontend) + Railway (backend) |

---

**Built with ❤️ by Saad Bin Saeed Khan**
