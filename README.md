# Good Jobs 🚀

**Good Jobs** is a platform that connects North-East India's workforce with verified job listings and safe accommodation in Ahmedabad (and beyond). Job seekers can search and apply for jobs, enquire about PG rooms and apartments, and employers/property owners can submit listings through the contact forms.

---

## 📁 Project Structure

```
ne-connect/
├── index.html            ← Homepage
├── jobs.html             ← Jobs listing & search page
├── accommodation.html    ← Accommodation listing & search page
├── about.html            ← About Us page
├── contact.html          ← Contact / Post a Job / List Accommodation
├── css/
│   ├── style.css         ← Global styles, design system
│   └── components.css    ← Component styles (cards, modals, toasts)
├── js/
│   └── main.js           ← Frontend logic, API calls, modals
├── images/
│   ├── logo.png
│   └── hero.png
└── backend/
    ├── server.js         ← Express app entry point
    ├── package.json
    ├── .env.example      ← Copy to .env for local dev
    ├── .gitignore
    ├── data/
    │   ├── jobs.js           ← 15 mock job listings
    │   ├── accommodation.js  ← 17 mock accommodation listings
    │   └── submissions.js    ← In-memory form submission store
    └── routes/
        ├── jobs.js           ← GET /api/jobs, GET /api/jobs/:id
        ├── accommodation.js  ← GET /api/accommodation, GET /api/accommodation/:id
        └── contact.js        ← POST endpoints for all forms + newsletter
```

---

## 🌐 Live URLs

| Service | Platform | URL |
|---------|----------|-----|
| **Frontend** | Vercel | *(your Vercel URL)* |
| **Backend API** | Render | *(your Render URL)* |

---

## ⚡ Local Development

### 1. Start the Backend

```bash
cd backend
cp .env.example .env       # Create your local .env
npm install                # Only needed first time
npm run dev                # Starts with nodemon on http://localhost:3000
```

Verify it's running:
```
http://localhost:3000/api/health
http://localhost:3000/api/jobs
http://localhost:3000/api/accommodation
```

### 2. Open the Frontend

Since the frontend is plain HTML/CSS/JS, just open `index.html` in your browser directly — or use the VS Code **Live Server** extension for auto-reload.

> **Note:** When running locally, `main.js` automatically uses `http://localhost:3000/api` as the API base URL.

---

## 🔌 API Reference

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/jobs` | Get all jobs |
| `GET` | `/api/jobs?q=react` | Search by keyword |
| `GET` | `/api/jobs?city=Ahmedabad` | Filter by city |
| `GET` | `/api/jobs?industry=Marketing` | Filter by industry |
| `GET` | `/api/jobs?type=Full-time` | Filter by job type |
| `GET` | `/api/jobs?salary=20000` | Filter by minimum salary |
| `GET` | `/api/jobs/:id` | Get single job by ID |

### Accommodation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/accommodation` | Get all listings |
| `GET` | `/api/accommodation?q=navrangpura` | Search by name/area |
| `GET` | `/api/accommodation?type=PG` | Filter by type (PG/Hostel/Apartment) |
| `GET` | `/api/accommodation?gender=Female` | Filter by gender preference |
| `GET` | `/api/accommodation?maxPrice=8000` | Filter by max monthly price |
| `GET` | `/api/accommodation/:id` | Get single listing by ID |

### Contact / Forms

| Method | Endpoint | Body fields |
|--------|----------|-------------|
| `POST` | `/api/contact/job` | `companyName, companyEmail, jobTitle, jobCity, jobIndustry, jobType, jobDesc` |
| `POST` | `/api/contact/room` | `propName, ownerName, ownerPhone, propType, propGender, propCity, propPrice, propAddress` |
| `POST` | `/api/contact/general` | `genName, genEmail, genSubject, genMessage` |
| `POST` | `/api/contact/apply` | `applicantName, applicantEmail, jobId, jobTitle, coverNote` |
| `POST` | `/api/contact/enquire` | `enquirerName, enquirerEmail, accId, accName, message` |
| `POST` | `/api/newsletter` | `email` |

---

## 🚀 Deployment

---

### Part 1 — Deploy Backend to Render

> Render is a cloud platform that runs your Node.js server. The free tier is more than enough for this project.

#### Step 1: Push backend to GitHub

First, create a **separate GitHub repository** for the backend (recommended) OR push the entire `ne-connect` folder. Either works.

If you want a separate repo for the backend only:

```bash
cd ne-connect/backend
git init
git add .
git commit -m "Initial backend commit"
# Create a new repo on github.com called "goodjobs-backend"
git remote add origin https://github.com/YOUR_USERNAME/goodjobs-backend.git
git push -u origin main
```

Or push the whole project (both frontend and backend) to one repo:

```bash
cd ne-connect
git add .
git commit -m "Add backend and fix frontend"
git push
```

#### Step 2: Create a Render account

1. Go to [https://render.com](https://render.com)
2. Sign up with your GitHub account

#### Step 3: Create a new Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `goodjobs-api` (or any name you like) |
| **Region** | Singapore (closest to India) |
| **Branch** | `main` |
| **Root Directory** | `backend` *(if using whole-project repo)* or leave blank *(if backend-only repo)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | Free |

4. Click **"Create Web Service"**

#### Step 4: Add Environment Variables on Render

In your Render dashboard → your service → **"Environment"** tab, add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` *(Render sets this automatically too)* |

#### Step 5: Get your Render URL

After deployment (takes ~2–3 minutes), Render gives you a URL like:
```
https://goodjobs-api.onrender.com
```

Test it:
```
https://goodjobs-api.onrender.com/api/health
https://goodjobs-api.onrender.com/api/jobs
```

#### Step 6: Update the frontend API URL

Open `js/main.js` and update line 4 with your actual Render URL:

```js
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://YOUR-ACTUAL-RENDER-URL.onrender.com/api';   // ← change this
```

> ⚠️ **Important:** Render's free tier **spins down** the server after 15 minutes of inactivity. The first request after spin-down takes ~30 seconds. To avoid this, you can use [UptimeRobot](https://uptimerobot.com) (free) to ping `/api/health` every 5 minutes.

---

### Part 2 — Deploy Frontend to Vercel

> Vercel hosts static websites for free with automatic HTTPS and global CDN.

#### Step 1: Ensure your frontend is in GitHub

Your `ne-connect` folder (all HTML/CSS/JS files) must be committed to GitHub.

```bash
cd ne-connect
git add .
git commit -m "Complete frontend with backend API integration"
git push
```

#### Step 2: Create a Vercel account

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with your GitHub account

#### Step 3: Import your project

1. Click **"Add New…"** → **"Project"**
2. Select your GitHub repository (`ne-connect` or your repo name)
3. Fill in these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Other` *(it's plain HTML, not a framework)* |
| **Root Directory** | `.` *(or the folder containing `index.html`)* |
| **Build Command** | *(leave blank)* |
| **Output Directory** | `.` *(leave as-is)* |

4. Click **"Deploy"**

#### Step 4: Your site is live!

Vercel gives you a URL like:
```
https://goodjobs.vercel.app
```

Every time you push to GitHub, Vercel automatically redeploys.

---

## ✅ Post-Deployment Checklist

After deploying both services, run through these checks:

- [ ] Visit `https://your-render-url.onrender.com/api/health` — should return `{ "status": "ok" }`
- [ ] Visit your Vercel URL — homepage should load with job cards from the API
- [ ] Open `jobs.html` — all 15 jobs should render, filters should work
- [ ] Click **"Apply Now"** on any job — modal should open
- [ ] Fill and submit the Apply form — should see a green success toast
- [ ] Open `accommodation.html` — all 17 listings should render
- [ ] Click **"Enquire"** on any listing — modal should open
- [ ] Fill and submit the Enquire form — should see a green success toast
- [ ] Open `contact.html` — test all 3 form tabs (Post a Job, List Accommodation, General Enquiry)
- [ ] Test the newsletter form in the footer
- [ ] Test the hero search bar (should navigate to `jobs.html?q=...`)
- [ ] Test the hamburger menu on mobile viewport

---

## 🔮 What to Do Next (When You Have Real Data)

### 1. Add a Real Database

The current backend uses **in-memory mock data** — this means data resets every time the server restarts. When you're ready to go live with real data:

**Recommended:** PostgreSQL on [Neon](https://neon.tech) (free tier) + [Prisma ORM](https://www.prisma.io)

Steps:
```bash
cd backend
npm install @prisma/client
npm install -D prisma
npx prisma init
```

Then define your schema in `prisma/schema.prisma` and replace the data files with Prisma calls.

### 2. Add Real Email Notifications

When someone submits a form, you'll want an email notification. Use **SendGrid** (free tier: 100 emails/day):

```bash
npm install @sendgrid/mail
```

Add to `.env`:
```
SENDGRID_API_KEY=your_key
NOTIFICATION_EMAIL=hello@goodjobs.in
```

### 3. Add Admin Panel

To view and manage form submissions, add a simple password-protected admin route:
```
GET /api/admin/submissions  (with Bearer token auth)
```

Or use [Retool](https://retool.com) as a no-code admin UI connected to your API.

### 4. Add Authentication

When you want employers/owners to log in and manage their listings:
- Use [Clerk](https://clerk.com) for easy auth (free tier available)
- Or implement JWT + bcrypt manually

### 5. Add Image Uploads

For accommodation photos, use [Cloudinary](https://cloudinary.com) (free tier):
```bash
npm install cloudinary multer
```

### 6. Point a Custom Domain

On Vercel: **Settings → Domains → Add domain** → follow DNS instructions.

On Render: **Dashboard → your service → Settings → Custom Domain**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, Vanilla CSS, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Data | In-memory mock data (JSON) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Future DB | PostgreSQL (Neon) + Prisma |

---

## 📝 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (defaults to 3000; Render sets this automatically) |
| `NODE_ENV` | No | `development` or `production` |

*(More variables will be added when real DB and email are integrated)*

---

## 📄 License

MIT © 2025 Good Jobs
