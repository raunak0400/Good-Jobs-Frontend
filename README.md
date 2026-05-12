# Good Jobs — Frontend 🚀

**Good Jobs** is a platform connecting North-East India's workforce with verified job listings and safe accommodation in Ahmedabad. This repository contains the **static frontend** (HTML, CSS, JavaScript) that powers the user-facing website.

> 🔗 **Live Site:** *(your Vercel URL)*  
> 🔗 **Backend API:** [https://good-jobs-backend.onrender.com](https://good-jobs-backend.onrender.com)  
> 🔗 **Backend Repo:** [good-jobs-backend](https://github.com/raunak0400/good-jobs-backend) *(if public)*

---

## ✨ Features

- 🔍 **Job Search & Filters** — Search by keyword, city, industry, job type, and salary
- 🏠 **Accommodation Listings** — Browse PG, Hostel & Apartment listings with filters
- 📋 **Apply / Enquire Modals** — One-click application and accommodation enquiry forms
- 📬 **Contact Forms** — Post a Job, List Accommodation, General Enquiry tabs
- 📧 **Newsletter Signup** — Email subscription form in the footer
- 📱 **Fully Responsive** — Mobile-first design with hamburger nav
- ✨ **Smooth Animations** — Scroll reveal, animated counters, toast notifications

---

## 📁 Project Structure

```
Good-Jobs-Frontend/
├── index.html            ← Homepage (hero, featured jobs, accommodation, stats)
├── jobs.html             ← Jobs listing & search page
├── accommodation.html    ← Accommodation listing & search page
├── about.html            ← About Us page
├── contact.html          ← Contact / Post a Job / List Accommodation
├── css/
│   ├── style.css         ← Global styles & design system (colors, typography, layout)
│   └── components.css    ← Component styles (cards, modals, toasts, badges)
├── js/
│   └── main.js           ← All frontend logic: API calls, modals, filters, forms
└── images/
    ├── logo.png           ← Good Jobs logo
    └── hero.png           ← Hero section image
```

---

## 🌐 Live URLs

| Service | Platform | URL |
|---------|----------|-----|
| **Frontend** | Vercel | *(your Vercel URL)* |
| **Backend API** | Render | [https://good-jobs-backend.onrender.com](https://good-jobs-backend.onrender.com) |

---

## ⚡ Local Development

This is a **plain HTML/CSS/JS** project — no build tools or npm required.

### Option 1 — VS Code Live Server (recommended)

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **"Open with Live Server"**
3. The site opens at `http://127.0.0.1:5500`

### Option 2 — Open directly in browser

Just double-click `index.html` — everything works offline except the live API data (which requires the backend to be running).

### Running the backend locally (optional)

If you want live data from a local backend, clone the backend repo and run:

```bash
cd goodjobs-backend
npm install
npm run dev      # starts on http://localhost:3000
```

> When `main.js` detects `localhost`, it automatically switches to `http://localhost:3000/api`.

---

## 🔌 API Integration

The frontend communicates with the backend via a single constant in `js/main.js`:

```js
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'           // local dev
  : 'https://good-jobs-backend.onrender.com/api';  // production
```

All API calls go through the `apiFetch()` helper which automatically sets `Content-Type: application/json`.

### Endpoints used by the frontend

| Page | Method | Endpoint |
|------|--------|----------|
| Homepage | `GET` | `/api/jobs` |
| Homepage | `GET` | `/api/accommodation` |
| jobs.html | `GET` | `/api/jobs` |
| jobs.html | `GET` | `/api/jobs/:id` |
| accommodation.html | `GET` | `/api/accommodation` |
| accommodation.html | `GET` | `/api/accommodation/:id` |
| Apply modal | `POST` | `/api/contact/apply` |
| Enquire modal | `POST` | `/api/contact/enquire` |
| contact.html | `POST` | `/api/contact/job` |
| contact.html | `POST` | `/api/contact/room` |
| contact.html | `POST` | `/api/contact/general` |
| Footer | `POST` | `/api/newsletter` |

---

## 🚀 Deployment (Vercel)

Vercel hosts this static frontend for free with automatic HTTPS and global CDN.

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "Deploy frontend"
git push origin main
```

### Step 2 — Import on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New…" → "Project"**
3. Select the `Good-Jobs-Frontend` repository
4. Use these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Other` *(plain HTML)* |
| **Root Directory** | `.` |
| **Build Command** | *(leave blank)* |
| **Output Directory** | `.` |

5. Click **"Deploy"** — done! 🎉

Every push to `main` triggers an automatic redeployment.

---

## ✅ Post-Deployment Checklist

- [ ] Visit your Vercel URL — homepage loads with job cards from the live API
- [ ] `jobs.html` — all 15 jobs render, filters work
- [ ] Click **"Apply Now"** on any job — modal opens, form submits successfully
- [ ] `accommodation.html` — all 17 listings render, filters work
- [ ] Click **"Enquire"** on any listing — modal opens, form submits successfully
- [ ] `contact.html` — all 3 form tabs work (Post a Job, List Accommodation, General Enquiry)
- [ ] Newsletter form in the footer submits successfully
- [ ] Hero search bar navigates to `jobs.html?q=...`
- [ ] Hamburger menu works on mobile viewport

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS (custom design system) |
| Logic | Vanilla JavaScript (ES2020+) |
| Fonts | Google Fonts — *Inter* |
| Icons | Inline SVG |
| Hosting | Vercel |
| API | Render (Node.js / Express) |

---

## 📸 Pages Overview

| Page | Description |
|------|-------------|
| `index.html` | Landing page with hero search, featured jobs & accommodation, stats counter, testimonials |
| `jobs.html` | Full job listings with sidebar filters (city, industry, type, salary) |
| `accommodation.html` | Accommodation listings with filters (city, type, gender, price) |
| `about.html` | Team, mission, and story of Good Jobs |
| `contact.html` | Multi-tab contact form — Post a Job / List a Room / General Enquiry |

---

## 🔮 Roadmap

- [ ] Add authentication (Clerk or JWT) for employer dashboards
- [ ] Integrate real database (PostgreSQL on Neon + Prisma)
- [ ] Add email notifications via SendGrid
- [ ] Admin panel for managing submissions
- [ ] Image uploads for accommodation listings (Cloudinary)
- [ ] Custom domain setup

---

## 📄 License

MIT © 2025 Good Jobs
