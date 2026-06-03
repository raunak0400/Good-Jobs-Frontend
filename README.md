<div align="center">

# 🌟 Good Jobs — Frontend

### *Empowering North-East India's Workforce, One Job at a Time*

[![Live Site](https://img.shields.io/badge/Live%20Site-goodjobs.in-0d9488?style=for-the-badge&logo=vercel&logoColor=white)](https://good-jobs-frontend.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Frontend-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/raunak0400/Good-Jobs-Frontend)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<br/>

> A beautifully designed, fully responsive job portal connecting North-East India's skilled workforce with top employers in Ahmedabad and beyond.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🖥️ Pages](#️-pages)
- [🗂️ Project Structure](#️-project-structure)
- [🎨 Design System](#-design-system)
- [⚙️ How It Works](#️-how-it-works)
- [🔗 API Integration](#-api-integration)
- [🚀 Getting Started](#-getting-started)
- [📦 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🧭 Core Functionality
- **Browse & Search Jobs** — Filter by city, industry, job type, and minimum salary in real time
- **Job Detail Modal** — Click any job card to open a rich modal with full role description, requirements, benefits, and salary
- **One-Click Apply** — Submit your CV as a PDF/Word attachment directly from the modal — sent straight to the employer's inbox via Resend
- **Accommodation Listings** — Browse PGs, hostels, and apartments with amenity filters and direct owner enquiry
- **Accommodation Enquiry** — Send enquiries to property owners without leaving the page
- **Job Alerts Newsletter** — Subscribe to receive curated opportunities by email
- **Post a Job / Room** — Employers and property owners can submit listings via the contact forms

### 💅 UX & Design
- **Dark-first premium design** with teal gradient accents and glassmorphism cards
- **Fully responsive** — pixel-perfect on mobile, tablet, and desktop
- **Smooth reveal animations** on scroll using `IntersectionObserver`
- **Animated counters** on the homepage statistics section
- **Toast notifications** for all form submissions (success and error)
- **Drag-and-drop resume upload** with file type and size validation
- **Keyboard accessibility** — Escape key closes all modals

### 🔍 SEO
- Descriptive `<title>` and `<meta name="description">` on every page
- Single `<h1>` per page with semantic HTML5 structure
- Fast page loads with no build step required

---

## 🖥️ Pages

| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Hero search, featured jobs, featured accommodation, stats, CTA |
| **Find Jobs** | `jobs.html` | Full job listings with search + multi-filter, paginated cards |
| **Accommodation** | `accommodation.html` | Verified PG/hostel listings with filter by type, gender, price |
| **About** | `about.html` | Mission, team story, and stats about the platform |
| **Contact** | `contact.html` | Tabbed forms: Post a Job, List a Room, General Enquiry |

---

## 🗂️ Project Structure

```
ne-connect/                     ← Frontend root
├── index.html                  ← Home page
├── jobs.html                   ← Job listings page
├── accommodation.html          ← Accommodation listings page
├── about.html                  ← About us page
├── contact.html                ← Contact & forms page
│
├── css/
│   ├── style.css               ← Global design system (tokens, base, layout)
│   └── components.css          ← Component styles (cards, modals, badges, forms)
│
├── js/
│   └── main.js                 ← All frontend logic, API calls, modal rendering
│
├── images/
│   └── logo.png                ← Platform logo
│
├── backend/                    ← Backend API (see backend/README.md)
│
├── package.json
├── README.md
└── .gitignore
```

---

## 🎨 Design System

The design system lives in `css/style.css` and `css/components.css`.

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#0d9488` | Teal — primary actions, links |
| `--primary-light` | `#14b8a6` | Hover states, highlights |
| `--primary-dark` | `#0f766e` | Active states |
| `--bg-base` | `#0a0f1e` | Dark navy background |
| `--bg-card` | `#111827` | Card backgrounds |
| `--bg-elevated` | `#1a2235` | Elevated surfaces, modals |
| `--text-primary` | `#f1f5f9` | Body text |
| `--text-muted` | `#94a3b8` | Secondary text |
| `--text-subtle` | `#64748b` | Captions, hints |
| `--accent` | `#f59e0b` | Amber — badges, highlights |

### Typography
- **Font**: `Inter` via Google Fonts (fallback: system-ui, sans-serif)
- **Scale**: From `0.75rem` (captions) to `3rem` (hero headings)

### Key Components
- `.job-card` / `.acc-card` — Glassmorphism listing cards with hover glow
- `.modal-overlay` / `.modal-box` — Animated overlay + content panel
- `.btn`, `.btn-primary`, `.btn-sm`, `.btn-lg` — Button variants
- `.skill-badge`, `.job-type-badge` — Inline chip labels
- `.toast`, `.toast-success`, `.toast-error` — Stack-based notification system
- `.resume-upload-zone` — Drag-and-drop file upload area

---

## ⚙️ How It Works

### Job Cards → Modal → Apply Flow

```
User clicks anywhere on a job card
        ↓
openJobModal(id) called
        ↓
GET /api/jobs/:id  →  full job data fetched
        ↓
Job Detail Modal opens (title, company, salary, requirements, benefits)
        ↓
User clicks "Apply Now" inside the modal
        ↓
openApplyPopup(job) called
        ↓
Apply Popup opens (Name, Email, Phone, Cover Note, Resume Upload)
        ↓
POST /api/contact/resume  →  CV emailed to employer via Resend
        ↓
Success toast shown, modal closed
```

### Filtering (Jobs & Accommodation)
All filtering is done **client-side** on the full dataset fetched once on page load:
- Job filters: City, Industry, Type, Min Salary, Search query
- Accommodation filters: City, Type (PG/Hostel/Apartment), Gender, Max Price, Search

---

## 🔗 API Integration

The frontend connects to the deployed backend at:

```
https://good-jobs-backend.onrender.com/api
```

All API calls are made through a central helper in `main.js`:

```javascript
async function apiFetch(endpoint, options = {}) {
  const res = await fetch(API_BASE + endpoint, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}
```

### Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/jobs` | Fetch all job listings |
| `GET` | `/api/jobs/:id` | Fetch single job detail |
| `GET` | `/api/accommodation` | Fetch all accommodation listings |
| `GET` | `/api/accommodation/:id` | Fetch single accommodation detail |
| `POST` | `/api/contact/resume` | Submit job application with CV attachment |
| `POST` | `/api/contact/enquire` | Submit accommodation enquiry |
| `POST` | `/api/contact/job` | Post a new job vacancy |
| `POST` | `/api/contact/room` | List a new accommodation |
| `POST` | `/api/contact/general` | General contact enquiry |
| `POST` | `/api/newsletter` | Subscribe to job alerts |

---

## 🚀 Getting Started

No build step required — it's plain HTML, CSS, and JavaScript.

### Prerequisites
- A modern browser (Chrome, Firefox, Edge, Safari)
- The backend running locally **or** pointed at the live API

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/raunak0400/Good-Jobs-Frontend.git
cd Good-Jobs-Frontend

# 2. Open any page directly in your browser
open index.html

# — OR — serve with a local dev server (recommended)
npx serve .
# Then visit http://localhost:3000
```

> **Tip:** If you want to test against a local backend, update `API_BASE` in `js/main.js`:
> ```js
> const API_BASE = 'http://localhost:3000/api';
> ```

---

## 📦 Deployment

The frontend is a **static site** — deploy to any static host:

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
Drag and drop the project folder into [app.netlify.com/drop](https://app.netlify.com/drop).

### GitHub Pages
Push to the `main` branch and enable GitHub Pages in the repository settings (root `/`).

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

---

<div align="center">

Made with ❤️ for **North-East India**

[![Good Jobs](https://img.shields.io/badge/Good-Jobs-0d9488?style=for-the-badge)](https://good-jobs-frontend.vercel.app)

*Bridging the gap between talent and opportunity*

</div>
