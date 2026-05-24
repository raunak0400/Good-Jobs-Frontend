# Good Jobs Frontend

<p align="center">
  <strong>Empowering North-East India's workforce — one job and one home at a time.</strong>
</p>

## Overview
Good Jobs is a unified platform built specifically to support young professionals and students from North-East India relocating to cities like Ahmedabad for work. 

Moving to a new city is overwhelming. Finding a job and securing safe, affordable accommodation simultaneously is a significant challenge. Good Jobs bridges this gap by providing a single platform where users can apply for verified jobs and find trusted, safe PG accommodations, hostels, and apartments near their workplaces.

## Features
- **Job Portal:** Browse and apply for verified job listings across various industries (Tech, Logistics, Design, HR, etc.).
- **Accommodation Portal:** Find verified PGs, hostels, and apartments with filters for gender, price, and amenities.
- **Unified Experience:** Apply for jobs and enquire about housing within a seamless, responsive UI.
- **Modern Aesthetics:** Built with a clean, dynamic, and glassmorphic UI design to provide a premium user experience.

## Tech Stack
- **HTML5** (Semantic structuring)
- **Vanilla CSS3** (Custom properties, CSS Grid/Flexbox, dynamic animations, modern glassmorphism)
- **Vanilla JavaScript** (ES6+, DOM manipulation, dynamic modal management)
- **Mock Backend Integration** (Frontend designed to interact seamlessly with a REST API backend via `apiFetch` in `main.js`)

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local development server (e.g., Live Server extension in VS Code, Python `http.server`, or Node `http-server`)

### Installation & Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/raunak0400/Good-Jobs-Frontend.git
   cd Good-Jobs-Frontend
   ```
2. Start a local server. For example, using Python:
   ```bash
   python -m http.server 3000
   ```
   Or using Node.js:
   ```bash
   npx http-server -p 3000
   ```
3. Open `http://localhost:3000` in your web browser.

## Project Structure
- `index.html`: Home page highlighting mission, stats, and testimonials.
- `jobs.html`: Full job board with filtering and dynamic application modals.
- `accommodation.html`: Housing listings mapped to specific locations.
- `about.html`: Our mission and team.
- `contact.html`: Contact information and location.
- `css/`: Contains custom design systems (`style.css`, `components.css`).
- `js/`: Core logic (`main.js`) handling UI state, filtering, and mock API calls.
- `backend/data/`: Mock data schemas for local testing.

## Contributing
We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
