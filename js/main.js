/* ====================================================
   NE CONNECT — main.js
   ==================================================== */

// ── Navbar scroll behaviour ──────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Mobile hamburger menu ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ── Reveal on scroll (Intersection Observer) ─────────
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── Animated counters ────────────────────────────────
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}
const counterEls = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.counter);
      const suffix = e.target.dataset.suffix || '';
      animateCounter(e.target, target, suffix);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

// ── Contact page tabs ─────────────────────────────────
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(target);
    if (panel) panel.classList.add('active');
  });
});

// ── Newsletter form ───────────────────────────────────
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#16a34a';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
  });
});

// ── Job / Accommodation Data ──────────────────────────
const JOBS = [
  // ── Featured companies ───────────────────────────────────────────────────
  { id:1,  title:'Social Media Executive',       company:'Gripit',                        city:'Ahmedabad', industry:'Marketing',       salaryMin:18000, salaryDisplay:'₹18,000 – ₹20,000/mo', type:'Full-time',  posted:'1 day ago',    logo:'GR', logoColor:'#E11D48', skills:['Instagram','Content Creation','Analytics'],        desc:'Manage Gripit\'s social channels and grow our digital presence.' },
  { id:2,  title:'Sales & Marketing Executive',  company:'Flavaroma',                     city:'Ahmedabad', industry:'Marketing',       salaryMin:20000, salaryDisplay:'₹20,000 – ₹25,000/mo', type:'Full-time',  posted:'2 days ago',   logo:'FL', logoColor:'#F59E0B', skills:['B2B Sales','Digital Marketing','CRM'],              desc:'Drive sales growth for Flavaroma\'s expanding product line.' },
  { id:3,  title:'Brand Designer / Creative Lead',company:'Anchoredge Branding Solutions', city:'Ahmedabad', industry:'Design',          salaryMin:25000, salaryDisplay:'₹25,000 – ₹30,000/mo', type:'Full-time',  posted:'3 days ago',   logo:'AB', logoColor:'#7C3AED', skills:['Branding','Figma','Illustrator','Strategy'],        desc:'Lead creative campaigns and brand identity work for top clients.' },
  { id:4,  title:'Software Developer',           company:'Skynet Technologies',            city:'Ahmedabad', industry:'IT & Technology', salaryMin:20000, salaryDisplay:'₹20,000 – ₹25,000/mo', type:'Full-time',  posted:'1 day ago',    logo:'ST', logoColor:'#0D9488', skills:['React','Node.js','REST APIs'],                       desc:'Build and maintain scalable web platforms at Skynet.' },
  { id:5,  title:'Full Stack Developer',         company:'GJ Tech Solutions Pvt Ltd',     city:'Ahmedabad', industry:'IT & Technology', salaryMin:18000, salaryDisplay:'₹18,000 – ₹23,000/mo', type:'Full-time',  posted:'4 days ago',   logo:'GJ', logoColor:'#059669', skills:['Vue.js','Laravel','MySQL','Docker'],                 desc:'Develop end-to-end web solutions for our enterprise clients.' },
  { id:6,  title:'ERP Implementation Consultant',company:'VasyERP Solutions',             city:'Ahmedabad', industry:'IT & Technology', salaryMin:20000, salaryDisplay:'₹20,000 – ₹23,000/mo', type:'Full-time',  posted:'2 days ago',   logo:'VE', logoColor:'#2563EB', skills:['ERP','Business Analysis','SQL','Training'],         desc:'Implement and customise ERP systems for SMEs across Gujarat.' },
  { id:7,  title:'Mobile App Developer',         company:'ASI Technology',                city:'Ahmedabad', industry:'IT & Technology', salaryMin:21000, salaryDisplay:'₹21,000 – ₹23,000/mo', type:'Full-time',  posted:'3 days ago',   logo:'AS', logoColor:'#0891B2', skills:['Flutter','Dart','Firebase','iOS/Android'],           desc:'Build cross-platform mobile apps for a growing tech firm.' },
  { id:8,  title:'UI/UX Designer',               company:'Spacestem',                     city:'Ahmedabad', industry:'Design',          salaryMin:22000, salaryDisplay:'₹22,000 – ₹24,000/mo', type:'Full-time',  posted:'1 day ago',    logo:'SP', logoColor:'#6D28D9', skills:['Figma','Prototyping','User Research','Motion'],      desc:'Craft intuitive, visually stunning digital experiences.' },
  { id:9,  title:'Product Manager',              company:'Cygnet.one',                    city:'Ahmedabad', industry:'IT & Technology', salaryMin:23000, salaryDisplay:'₹23,000 – ₹25,000/mo', type:'Full-time',  posted:'Today',        logo:'CY', logoColor:'#0F766E', skills:['Agile','Roadmapping','Jira','Stakeholder Mgmt'],    desc:'Own the product vision and roadmap for a cutting-edge SaaS platform.' },
  { id:10, title:'Operations Manager',           company:'Speed Bird Service',            city:'Ahmedabad', industry:'Logistics',       salaryMin:25000, salaryDisplay:'₹25,000 – ₹30,000/mo', type:'Full-time',  posted:'Today',        logo:'SB', logoColor:'#D97706', skills:['Logistics','Team Leadership','Fleet Mgmt','Excel'], desc:'Oversee day-to-day courier and delivery operations across Gujarat.' },
  // ── Additional listings ──────────────────────────────────────────────────
  { id:11, title:'Content & SEO Writer',         company:'Anchoredge Branding Solutions', city:'Ahmedabad', industry:'Marketing',       salaryMin:18000, salaryDisplay:'₹18,000 – ₹22,000/mo', type:'Part-time',  posted:'5 days ago',   logo:'AB', logoColor:'#7C3AED', skills:['SEO','Copywriting','WordPress'],                      desc:'Write compelling blogs and web content for brand clients.' },
  { id:12, title:'DevOps Engineer',              company:'Skynet Technologies',            city:'Ahmedabad', industry:'IT & Technology', salaryMin:22000, salaryDisplay:'₹22,000 – ₹28,000/mo', type:'Full-time',  posted:'3 days ago',   logo:'ST', logoColor:'#0D9488', skills:['AWS','Docker','CI/CD','Linux'],                       desc:'Build and maintain cloud infrastructure for our SaaS products.' },
  { id:13, title:'Accounts Executive',           company:'Speed Bird Service',            city:'Ahmedabad',industry:'Finance',         salaryMin:18000, salaryDisplay:'₹18,000 – ₹22,000/mo', type:'Full-time',  posted:'1 week ago',   logo:'SB', logoColor:'#D97706', skills:['Tally','GST','Invoicing','MS Excel'],                desc:'Handle day-to-day accounts for our Dibrugarh branch.' },
  { id:14, title:'QA / Test Engineer',           company:'VasyERP Solutions',             city:'Ahmedabad', industry:'IT & Technology', salaryMin:19000, salaryDisplay:'₹19,000 – ₹22,000/mo', type:'Full-time',  posted:'6 days ago',   logo:'VE', logoColor:'#2563EB', skills:['Selenium','Manual Testing','JIRA','Python'],         desc:'Ensure software quality through rigorous test planning and execution.' },
  { id:15, title:'Graphic Designer',             company:'Gripit',                        city:'Ahmedabad', industry:'Design',          salaryMin:18000, salaryDisplay:'₹18,000 – ₹20,000/mo', type:'Full-time',  posted:'2 days ago',   logo:'GR', logoColor:'#E11D48', skills:['Adobe Suite','Canva','Motion Graphics'],              desc:'Create eye-catching visuals for Gripit\'s campaigns and products.' },
];

const ACCOMMODATION = [
  // ── PG Rooms ─────────────────────────────────────────────────────────────
  { id:1,  name:'NE Boys PG — Navrangpura',            area:'Navrangpura',      city:'Ahmedabad',  type:'PG',          gender:'Male',   price:4500,  amenities:['WiFi','Meals','Laundry','AC'],            rating:4.3, distance:'0.5 km from CG Road',        color:'linear-gradient(135deg,#0D9488,#0F766E)' },
  { id:2,  name:'Comfort Girls PG — Satellite',      area:'Satellite',           city:'Ahmedabad',  type:'PG',          gender:'Female', price:5200,  amenities:['WiFi','Meals','Security','CCTV'],         rating:4.5, distance:'1 km from corporate offices',       color:'linear-gradient(135deg,#059669,#047857)' },
  { id:3,  name:'Comfort Inn Girls PG',       area:'Bodakdev',    city:'Ahmedabad',  type:'PG',          gender:'Female', price:5500,  amenities:['WiFi','Meals','AC','Power Backup'],       rating:4.2, distance:'Near SG Highway office hub',            color:'linear-gradient(135deg,#DB2777,#BE185D)' },
  { id:4,  name:'Urban Nest Co-living',       area:'Prahlad Nagar',             city:'Ahmedabad',  type:'PG',          gender:'Any',    price:6800,  amenities:['WiFi','AC','Gym','24/7 Water'],           rating:4.6, distance:'Near Prahlad Nagar offices',       color:'linear-gradient(135deg,#7C3AED,#6D28D9)' },
  { id:5,  name:'Riverside Executive PG',     area:'Vastrapur',       city:'Ahmedabad',  type:'PG',          gender:'Male',   price:7200,  amenities:['WiFi','AC','Meals','Gym','Rooftop'],      rating:4.7, distance:'Near Vastrapur Lake',          color:'linear-gradient(135deg,#0891B2,#0E7490)' },
  { id:6,  name:'Chandkheda Boys PG',       area:'Chandkheda',        city:'Ahmedabad', type:'PG',          gender:'Male',   price:4000,  amenities:['WiFi','Meals','Laundry'],                 rating:4.1, distance:'Near Chandkheda IT cluster',            color:'linear-gradient(135deg,#0D9488,#0369A1)' },
  // ── Hostels ───────────────────────────────────────────────────────────────
  { id:7,  name:'NE Student Hostel — Navrangpura',    area:'Navrangpura',           city:'Ahmedabad',  type:'Hostel',      gender:'Male',   price:3800,  amenities:['WiFi','Meals','Study Room'],              rating:4.0, distance:'0.3 km from Navrangpura metro',  color:'linear-gradient(135deg,#0369A1,#1D4ED8)' },
  { id:8,  name:'Maninagar Girls Hostel',      area:'Maninagar',           city:'Ahmedabad',  type:'Hostel',      gender:'Female', price:4200,  amenities:['WiFi','Meals','CCTV','24/7 Security'],    rating:4.4, distance:'Near Maninagar Railway Station',           color:'linear-gradient(135deg,#9D174D,#BE185D)' },
  { id:9,  name:'NE Co-ed Hostel — Chandkheda',          area:'Chandkheda',           city:'Ahmedabad',  type:'Hostel',      gender:'Any',    price:3500,  amenities:['WiFi','Meals','Study Hall','Library'],    rating:4.2, distance:'Near Chandkheda Metro Station',              color:'linear-gradient(135deg,#1D4ED8,#7C3AED)' },
  // ── Apartments ────────────────────────────────────────────────────────────
  { id:10, name:'1 BHK — Navrangpura',          area:'Navrangpura',          city:'Ahmedabad',  type:'Apartment',   gender:'Any',    price:9500,  amenities:['WiFi','Parking','24/7 Security','Water'], rating:4.4, distance:'Near IT Park, Navrangpura',         color:'linear-gradient(135deg,#D97706,#B45309)' },
  { id:11, name:'2 BHK — CG Road',            area:'CG Road',            city:'Ahmedabad',  type:'Apartment',   gender:'Any',    price:14000, amenities:['WiFi','Parking','Lift','Power Backup'],   rating:4.6, distance:'2 min walk to CG Road',   color:'linear-gradient(135deg,#0F766E,#0891B2)' },
  { id:12, name:'Studio Flat — Satellite',   area:'Satellite',         city:'Ahmedabad',  type:'Apartment',   gender:'Any',    price:8000,  amenities:['WiFi','Fully Furnished','Balcony'],       rating:4.3, distance:'Near Satellite commercial area',         color:'linear-gradient(135deg,#6D28D9,#C2410C)' },
  { id:13, name:'2 BHK — Bodakdev',           area:'Bodakdev',           city:'Ahmedabad',  type:'Apartment',   gender:'Any',    price:12500, amenities:['WiFi','Parking','Modular Kitchen','Lift'], rating:4.5, distance:'10 min from SG Highway offices', color:'linear-gradient(135deg,#065F46,#0D9488)' },
  { id:14, name:'1 BHK — SG Highway',         area:'SG Highway',         city:'Ahmedabad',  type:'Apartment',   gender:'Any',    price:10000, amenities:['WiFi','Parking','24/7 Water','Modular Kitchen'], rating:4.4, distance:'Central Ahmedabad, near metro',  color:'linear-gradient(135deg,#1E40AF,#0891B2)' },
  { id:15, name:'3 BHK — Thaltej',            area:'Thaltej',            city:'Ahmedabad',  type:'Apartment',   gender:'Any',    price:18000, amenities:['WiFi','Parking','Gym','Pool','Security'], rating:4.8, distance:'Near Thaltej, SG Highway',    color:'linear-gradient(135deg,#7C2D12,#DC2626)' },
  { id:16, name:'1 BHK — Maninagar',  area:'Maninagar',            city:'Ahmedabad', type:'Apartment',   gender:'Any',    price:8500,  amenities:['WiFi','Parking','24/7 Security'],         rating:4.2, distance:'Central Maninagar',              color:'linear-gradient(135deg,#0D9488,#059669)' },
  { id:17, name:'Premium Studio — Prahlad Nagar',   area:'Prahlad Nagar',            city:'Ahmedabad',   type:'Apartment',   gender:'Any',    price:7000,  amenities:['WiFi','Furnished','Parking'],             rating:4.1, distance:'Near Prahlad Nagar offices',               color:'linear-gradient(135deg,#4338CA,#7C3AED)' },
];

// ── Render Job Cards ──────────────────────────────────
const SVG_PIN   = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const SVG_BAG   = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
const SVG_CLK   = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const SVG_WALK  = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0M5.5 8.5l3-1.5 2 4 3 2 1 5M10 11l1.5 3.5"/></svg>`;

function renderJobCard(job) {
  const typeClass = job.type === 'Full-time' ? 'badge-fulltime' : job.type === 'Part-time' ? 'badge-parttime' : 'badge-contract';
  return `
  <div class="job-card reveal" data-city="${job.city}" data-industry="${job.industry}" data-type="${job.type}" data-salary="${job.salaryMin}">
    <div class="job-card-header">
      <div class="company-logo" style="background:${job.logoColor}">${job.logo}</div>
      <div class="job-info">
        <div class="job-title">${job.title}</div>
        <div class="company-name">${job.company}</div>
      </div>
    </div>
    <div class="job-meta">
      <span class="meta-tag">${SVG_PIN} ${job.city}</span>
      <span class="meta-tag">${SVG_BAG} ${job.industry}</span>
      <span class="meta-tag">${SVG_CLK} ${job.posted}</span>
    </div>
    <div class="job-skills">${job.skills.map(s=>`<span class="skill-badge">${s}</span>`).join('')}</div>
    <div class="job-footer">
      <span class="salary">${job.salaryDisplay}</span>
      <span class="job-type-badge ${typeClass}">${job.type}</span>
      <a href="contact.html" class="btn btn-primary btn-sm">Apply Now</a>
    </div>
  </div>`;
}

// ── Render Accommodation Cards ────────────────────────
function renderAccCard(acc) {
  const typeClass = acc.type==='PG'?'badge-pg':acc.type==='Hostel'?'badge-hostel':'badge-apartment';
  return `
  <div class="acc-card reveal" data-city="${acc.city}" data-type="${acc.type}" data-gender="${acc.gender}" data-price="${acc.price}">
    <div class="acc-thumb" style="background:${acc.color}">
      <span class="acc-type-badge ${typeClass}">${acc.type}</span>
      <span class="gender-badge">${acc.gender}</span>
    </div>
    <div class="acc-body">
      <div class="acc-name">${acc.name}</div>
      <div class="acc-area">${SVG_PIN} ${acc.area}, ${acc.city}</div>
      <div class="acc-area" style="margin-top:-10px">${SVG_WALK} ${acc.distance}</div>
      <div class="acc-amenities">${acc.amenities.map(a=>`<span class="amenity">${a}</span>`).join('')}</div>
      <div class="acc-footer">
        <div class="acc-price">₹${acc.price.toLocaleString()}<span>/month</span></div>
        <div class="acc-rating"><span class="star">★</span>${acc.rating}</div>
        <a href="contact.html" class="btn btn-primary btn-sm">Enquire</a>
      </div>
    </div>
  </div>`;
}

// ── Jobs page init ─────────────────────────────────────
function initJobsPage() {
  const grid = document.getElementById('jobsGrid');
  if (!grid) return;

  let filtered = [...JOBS];

  function render() {
    grid.innerHTML = filtered.length
      ? filtered.map(renderJobCard).join('')
      : `<div class="no-results"><div class="icon">🔍</div><h3>No jobs found</h3><p>Try adjusting your filters.</p></div>`;
    const count = document.getElementById('resultsCount');
    if (count) count.textContent = filtered.length;
    // re-observe reveals
    grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function applyFilters() {
    const city     = document.getElementById('filterCity')?.value     || '';
    const industry = document.getElementById('filterIndustry')?.value || '';
    const type     = document.getElementById('filterType')?.value     || '';
    const salary   = document.getElementById('filterSalary')?.value   || '';
    const search   = document.getElementById('jobSearch')?.value.toLowerCase() || '';

    filtered = JOBS.filter(j => {
      if (city     && j.city     !== city)     return false;
      if (industry && j.industry !== industry) return false;
      if (type     && j.type     !== type)     return false;
      if (salary   && j.salaryMin < parseInt(salary)) return false;
      if (search   && !j.title.toLowerCase().includes(search) && !j.company.toLowerCase().includes(search)) return false;
      return true;
    });
    render();
  }

  ['filterCity','filterIndustry','filterType','filterSalary'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', applyFilters);
  });
  document.getElementById('jobSearch')?.addEventListener('input', applyFilters);
  document.getElementById('filterBtn')?.addEventListener('click', applyFilters);

  render();
}

// ── Accommodation page init ───────────────────────────
function initAccPage() {
  const grid = document.getElementById('accGrid');
  if (!grid) return;

  let filtered = [...ACCOMMODATION];

  function render() {
    grid.innerHTML = filtered.length
      ? filtered.map(renderAccCard).join('')
      : `<div class="no-results"><div class="icon">🏠</div><h3>No accommodation found</h3><p>Try adjusting your filters.</p></div>`;
    const count = document.getElementById('accCount');
    if (count) count.textContent = filtered.length;
    grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function applyFilters() {
    const city   = document.getElementById('accCity')?.value   || '';
    const type   = document.getElementById('accType')?.value   || '';
    const gender = document.getElementById('accGender')?.value || '';
    const price  = document.getElementById('accPrice')?.value  || '';
    const search = document.getElementById('accSearch')?.value.toLowerCase() || '';

    filtered = ACCOMMODATION.filter(a => {
      if (city   && a.city   !== city)   return false;
      if (type   && a.type   !== type)   return false;
      if (gender && a.gender !== gender && a.gender !== 'Any') return false;
      if (price  && a.price  >  parseInt(price))  return false;
      if (search && !a.name.toLowerCase().includes(search) && !a.area.toLowerCase().includes(search)) return false;
      return true;
    });
    render();
  }

  ['accCity','accType','accGender','accPrice'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', applyFilters);
  });
  document.getElementById('accSearch')?.addEventListener('input', applyFilters);
  document.getElementById('accFilterBtn')?.addEventListener('click', applyFilters);

  render();
}

// ── Home page featured cards ──────────────────────────
function initHomePage() {
  const featJobs = document.getElementById('featuredJobs');
  if (featJobs) featJobs.innerHTML = JOBS.slice(0,4).map(renderJobCard).join('');

  const featAcc = document.getElementById('featuredAcc');
  if (featAcc) featAcc.innerHTML = ACCOMMODATION.slice(0,4).map(renderAccCard).join('');

  // re-observe
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Hero search forward ───────────────────────────────
const heroSearchBtn = document.getElementById('heroSearchBtn');
if (heroSearchBtn) {
  heroSearchBtn.addEventListener('click', () => {
    const q    = document.getElementById('heroSearchInput')?.value || '';
    const type = document.getElementById('heroSearchType')?.value  || 'jobs';
    const url  = type === 'accommodation'
      ? `accommodation.html${q ? '?q='+encodeURIComponent(q) : ''}`
      : `jobs.html${q ? '?q='+encodeURIComponent(q) : ''}`;
    window.location.href = url;
  });
  document.getElementById('heroSearchInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') heroSearchBtn.click();
  });
}

// ── Contact form submit ───────────────────────────────
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const orig = btn.textContent;
    btn.textContent = '✓ Submitted! We\'ll be in touch soon.';
    btn.style.background = 'linear-gradient(135deg,#16a34a,#15803d)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 4000);
  });
});

// ── Init ──────────────────────────────────────────────
initHomePage();
initJobsPage();
initAccPage();

// pre-fill search from URL params
const urlParams = new URLSearchParams(window.location.search);
const qParam = urlParams.get('q');
if (qParam) {
  const inp = document.getElementById('jobSearch') || document.getElementById('accSearch');
  if (inp) { inp.value = qParam; inp.dispatchEvent(new Event('input')); }
}

