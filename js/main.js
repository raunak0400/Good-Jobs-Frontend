/* ============================================================
   Good Jobs — main.js  (frontend ↔ backend wiring)
   ============================================================ */

// ── API Base URL ─────────────────────────────────────────────
// Backend deployed on Render: https://good-jobs-backend.onrender.com
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'https://good-jobs-backend.onrender.com/api'
  : 'https://good-jobs-backend.onrender.com/api';

// ── Navbar scroll ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));

// ── Mobile hamburger ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }));
}

// ── Reveal on scroll ─────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Animated counters ─────────────────────────────────────────
function animateCounter(el, target, suffix) {
  let start = 0;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / 2000, 1);
    el.textContent = Math.floor(p * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.dataset.counter), e.target.dataset.suffix || '');
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));

// ── Toast notification ────────────────────────────────────────
function showToast(msg, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
  container.appendChild(t);
  setTimeout(() => t.classList.add('toast-show'), 10);
  setTimeout(() => { t.classList.remove('toast-show'); setTimeout(() => t.remove(), 400); }, 4000);
}

// ── API fetch helper ──────────────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  const res = await fetch(API_BASE + endpoint, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ── SVG icons ─────────────────────────────────────────────────
const SVG_PIN  = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const SVG_BAG  = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
const SVG_CLK  = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const SVG_WALK = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"/><path d="M15 8H9l-2 6h3l-1 8h4l-1-8h3z"/></svg>`;
const SVG_STAR = `<svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

// ── Render job card ───────────────────────────────────────────
function renderJobCard(job) {
  const typeClass = job.type === 'Full-time' ? 'badge-fulltime' : job.type === 'Part-time' ? 'badge-parttime' : 'badge-contract';
  return `
  <div class="job-card reveal card-glow" data-id="${job.id}">
    <div class="job-card-header">
      <div class="company-logo" style="background:${job.logoColor}">${job.logo}</div>
      <div class="job-info">
        <div class="job-title">${job.title}</div>
        <div class="company-name">${job.company}</div>
      </div>
    </div>
    <div class="job-meta">
      <span class="meta-tag">${SVG_PIN} ${job.area || job.city}</span>
      <span class="meta-tag">${SVG_BAG} ${job.industry}</span>
      <span class="meta-tag">${SVG_CLK} ${job.posted}</span>
    </div>
    <div class="job-skills">${job.skills.map(s=>`<span class="skill-badge">${s}</span>`).join('')}</div>
    <div class="job-footer">
      <span class="salary">${job.salaryDisplay}</span>
      <span class="job-type-badge ${typeClass}">${job.type}</span>
      <button class="btn btn-primary btn-sm" onclick="openJobModal(${job.id})">Apply Now</button>
    </div>
  </div>`;
}

// ── Render accommodation card ─────────────────────────────────
function renderAccCard(acc) {
  const typeClass = acc.type==='PG'?'badge-pg':acc.type==='Hostel'?'badge-hostel':'badge-apartment';
  return `
  <div class="acc-card reveal card-glow" data-id="${acc.id}">
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
        <div class="acc-rating">${SVG_STAR}${acc.rating}</div>
        <button class="btn btn-primary btn-sm" onclick="openAccModal(${acc.id})">Enquire</button>
      </div>
    </div>
  </div>`;
}

// ── In-memory cache ───────────────────────────────────────────
let _jobsCache = null;
let _accCache  = null;

async function getJobs(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await apiFetch('/jobs' + (qs ? '?' + qs : ''));
  return res.data;
}

async function getAccommodation(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await apiFetch('/accommodation' + (qs ? '?' + qs : ''));
  return res.data;
}

// ── Modal HTML factory ────────────────────────────────────────
function getModalContainer() {
  let m = document.getElementById('gjModal');
  if (!m) {
    m = document.createElement('div');
    m.id = 'gjModal';
    m.className = 'modal-overlay';
    m.addEventListener('click', e => { if (e.target === m) closeModal(); });
    document.body.appendChild(m);
  }
  return m;
}
function closeModal() {
  const m = document.getElementById('gjModal');
  if (m) { m.classList.remove('modal-open'); setTimeout(() => m.innerHTML = '', 300); }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Job detail modal (3-step apply flow) ─────────────────────
async function openJobModal(id) {
  try {
    const res = await apiFetch(`/jobs/${id}`);
    const job = res.data;
    const m = getModalContainer();
    const typeClass = job.type === 'Full-time' ? 'badge-fulltime' : job.type === 'Part-time' ? 'badge-parttime' : 'badge-contract';

    // ── Step 1: Full company details + big "Apply Now" button ─
    m.innerHTML = `
    <div class="modal-box" id="modalBox">
      <button class="modal-close" onclick="closeModal()">✕</button>

      <!-- Company Header -->
      <div class="modal-header">
        <div class="company-logo lg" style="background:${job.logoColor}">${job.logo}</div>
        <div>
          <div class="modal-title">${job.title}</div>
          <div class="modal-subtitle">${job.company} · ${job.area}, ${job.city}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
            <span class="job-type-badge ${typeClass}">${job.type}</span>
            <span class="meta-tag">${SVG_BAG} ${job.industry}</span>
            <span class="meta-tag">${SVG_CLK} Posted ${job.posted}</span>
          </div>
        </div>
      </div>

      <!-- Salary -->
      <div class="modal-salary">💰 ${job.salaryDisplay} &nbsp;·&nbsp; ${job.openings} opening${job.openings>1?'s':''}</div>

      <!-- Full Company Details -->
      <div class="modal-company-details">
        <div class="modal-section"><strong>About the Role</strong><p>${job.desc}</p></div>
        <div class="modal-section"><strong>Skills Required</strong>
          <div class="job-skills" style="margin-top:8px">${job.skills.map(s=>`<span class="skill-badge">${s}</span>`).join('')}</div>
        </div>
        <div class="modal-section"><strong>Requirements</strong>
          <ul class="modal-list">${(job.requirements||[]).map(r=>`<li>${r}</li>`).join('')}</ul>
        </div>
        <div class="modal-section"><strong>Benefits</strong>
          <ul class="modal-list">${(job.benefits||[]).map(b=>`<li>${b}</li>`).join('')}</ul>
        </div>
      </div>

      <hr class="modal-divider"/>

      <!-- Big Apply Now button (Step 1 → Step 2 trigger) -->
      <button class="apply-now-hero" id="applyNowHero">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/></svg>
        Apply Now
      </button>

      <!-- Step 2: Application form + Resume upload (hidden initially) -->
      <div class="apply-step2" id="applyStep2">
        <hr class="modal-divider" style="margin-top:24px"/>
        <div class="modal-section" style="margin-top:0">
          <strong>Your Details</strong>
          <form class="modal-form" id="applyForm" style="margin-top:12px">
            <div class="mform-row">
              <input class="form-input" type="text"  id="apName"  placeholder="Your full name *" required/>
              <input class="form-input" type="email" id="apEmail" placeholder="Email address *" required/>
            </div>
            <input class="form-input" type="tel" id="apPhone" placeholder="Phone number (optional)" style="margin-top:10px"/>
            <textarea class="form-textarea" id="apNote" placeholder="Short cover note (optional)" style="margin-top:10px;min-height:70px"></textarea>

            <!-- Resume Upload Zone -->
            <div class="resume-upload-zone" id="resumeZone">
              <div class="resume-upload-icon">
                <svg width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p class="resume-upload-label">Upload Your Resume <span class="resume-required">*</span></p>
              <p class="resume-upload-hint">PDF or Word · Max 5 MB</p>
              <input type="file" id="resumeFile" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display:none"/>
              <button type="button" class="resume-browse-btn" id="resumeBrowseBtn">Browse Files</button>
              <div class="resume-file-info" id="resumeFileInfo" style="display:none">
                <span class="resume-file-icon">📄</span>
                <span class="resume-file-name" id="resumeFileName"></span>
                <button type="button" class="resume-file-remove" id="resumeFileRemove">✕</button>
              </div>
            </div>

            <button type="submit" class="form-submit apply-submit-btn" id="applyBtn" style="margin-top:16px" disabled>
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="margin-right:6px"><polyline points="20 6 9 17 4 12"/></svg>
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>`;

    requestAnimationFrame(() => m.classList.add('modal-open'));

    // ── Step 1 → Step 2: Show apply form when "Apply Now" is clicked ─
    const heroBtn   = document.getElementById('applyNowHero');
    const step2     = document.getElementById('applyStep2');
    const submitBtn = document.getElementById('applyBtn');

    heroBtn.addEventListener('click', () => {
      heroBtn.classList.add('applied-click');
      setTimeout(() => {
        step2.classList.add('step2-visible');
        step2.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    });

    // ── Resume file input wiring ───────────────────────────────
    const fileInput      = document.getElementById('resumeFile');
    const browseBtn      = document.getElementById('resumeBrowseBtn');
    const fileInfo       = document.getElementById('resumeFileInfo');
    const fileNameEl     = document.getElementById('resumeFileName');
    const fileRemoveBtn  = document.getElementById('resumeFileRemove');
    const resumeZone     = document.getElementById('resumeZone');

    browseBtn.addEventListener('click', () => fileInput.click());

    // Drag & drop
    resumeZone.addEventListener('dragover', e => { e.preventDefault(); resumeZone.classList.add('drag-over'); });
    resumeZone.addEventListener('dragleave', () => resumeZone.classList.remove('drag-over'));
    resumeZone.addEventListener('drop', e => {
      e.preventDefault();
      resumeZone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files[0]) handleFileSelect(fileInput.files[0]);
    });

    fileRemoveBtn.addEventListener('click', () => {
      fileInput.value = '';
      fileInfo.style.display = 'none';
      browseBtn.style.display = '';
      resumeZone.classList.remove('has-file');
      submitBtn.disabled = true;
    });

    function handleFileSelect(file) {
      const allowedExts = ['pdf', 'doc', 'docx'];
      const ext = file.name.split('.').pop().toLowerCase();
      if (!allowedExts.includes(ext)) {
        showToast('Please upload a PDF or Word document.', 'error'); return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be under 5 MB.', 'error'); return;
      }
      fileNameEl.textContent = `${file.name} (${(file.size/1024).toFixed(0)} KB)`;
      fileInfo.style.display = 'flex';
      browseBtn.style.display = 'none';
      resumeZone.classList.add('has-file');
      submitBtn.disabled = false;
    }

    // ── Form submit: read file as base64, send to backend which emails it as attachment ─
    document.getElementById('applyForm').addEventListener('submit', async e => {
      e.preventDefault();
      const file = fileInput.files[0];
      if (!file) { showToast('Please upload your resume before submitting.', 'error'); return; }

      submitBtn.innerHTML = '<span class="btn-spinner"></span> Sending…';
      submitBtn.disabled = true;

      try {
        // Read file as base64 (strip the data URL prefix)
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload  = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const result = await apiFetch('/contact/resume', {
          method: 'POST',
          body: JSON.stringify({
            applicantName:  document.getElementById('apName').value,
            applicantEmail: document.getElementById('apEmail').value,
            applicantPhone: document.getElementById('apPhone').value || '',
            coverNote:      document.getElementById('apNote').value  || '',
            jobId:    job.id,
            jobTitle: job.title,
            fileName: file.name,
            fileSize: `${(file.size/1024).toFixed(0)} KB`,
            fileBase64: base64,
          }),
        });
        closeModal();
        showToast(result.message);
      } catch (err) {
        showToast(err.message || 'Submission failed. Please try again.', 'error');
        submitBtn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="margin-right:6px"><polyline points="20 6 9 17 4 12"/></svg> Submit Application`;
        submitBtn.disabled = false;
      }
    });

  } catch (err) { console.error('MODAL ERROR:', err); showToast('Could not load job details. Please try again.', 'error'); }
}

// ── Accommodation detail modal ────────────────────────────────
async function openAccModal(id) {
  try {
    const res = await apiFetch(`/accommodation/${id}`);
    const acc = res.data;
    const m = getModalContainer();
    const typeClass = acc.type==='PG'?'badge-pg':acc.type==='Hostel'?'badge-hostel':'badge-apartment';
    m.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" onclick="closeModal()">✕</button>
      <div class="modal-acc-thumb" style="background:${acc.color}">
        <span class="acc-type-badge ${typeClass}">${acc.type}</span>
        <span class="gender-badge">${acc.gender}</span>
        <div class="acc-rating-lg">${SVG_STAR} ${acc.rating}</div>
      </div>
      <div class="modal-header" style="margin-top:16px">
        <div>
          <div class="modal-title">${acc.name}</div>
          <div class="modal-subtitle">${SVG_PIN} ${acc.area}, ${acc.city}</div>
          <div class="modal-subtitle">${SVG_WALK} ${acc.distance}</div>
        </div>
        <div class="modal-price-box">₹${acc.price.toLocaleString()}<span>/mo</span></div>
      </div>
      <div class="modal-section"><strong>About this Property</strong><p>${acc.desc||'A verified accommodation listing on Good Jobs.'}</p></div>
      <div class="modal-section"><strong>Amenities</strong>
        <div class="acc-amenities" style="margin-top:8px">${acc.amenities.map(a=>`<span class="amenity">${a}</span>`).join('')}</div>
      </div>
      <div class="modal-section"><strong>Contact Owner</strong>
        <p style="color:var(--text-muted);font-size:.9rem">${acc.ownerName||'Verified Owner'} · <a href="tel:${acc.ownerPhone}" style="color:var(--primary-light)">${acc.ownerPhone||'Available on request'}</a></p>
      </div>
      <hr class="modal-divider"/>
      <div class="modal-section"><strong>Send an Enquiry</strong>
        <form class="modal-form" id="enquireForm">
          <div class="mform-row">
            <input class="form-input" type="text"  id="enName"  placeholder="Your full name *" required/>
            <input class="form-input" type="email" id="enEmail" placeholder="Email address *" required/>
          </div>
          <input class="form-input" type="tel" id="enPhone" placeholder="Phone number (optional)" style="margin-top:10px"/>
          <textarea class="form-textarea" id="enMsg" placeholder="Your message to the owner (optional)" style="margin-top:10px;min-height:80px"></textarea>
          <button type="submit" class="form-submit" id="enquireBtn" style="margin-top:16px">Send Enquiry</button>
        </form>
      </div>
    </div>`;
    requestAnimationFrame(() => m.classList.add('modal-open'));
    document.getElementById('enquireForm').addEventListener('submit', async e => {
      e.preventDefault();
      const btn = document.getElementById('enquireBtn');
      btn.textContent = 'Sending…'; btn.disabled = true;
      try {
        const r = await apiFetch('/contact/enquire', {
          method: 'POST',
          body: JSON.stringify({ enquirerName: document.getElementById('enName').value, enquirerEmail: document.getElementById('enEmail').value, enquirerPhone: document.getElementById('enPhone').value, message: document.getElementById('enMsg').value, accId: acc.id, accName: acc.name }),
        });
        closeModal();
        showToast(r.message);
      } catch (err) { showToast(err.message, 'error'); btn.textContent = 'Send Enquiry'; btn.disabled = false; }
    });
  } catch { showToast('Could not load accommodation details. Please try again.', 'error'); }
}

// ── Jobs page ─────────────────────────────────────────────────
async function initJobsPage() {
  const grid = document.getElementById('jobsGrid');
  if (!grid) return;
  let allJobs = [];
  grid.innerHTML = `<div style="color:var(--text-muted);padding:40px;text-align:center;grid-column:1/-1">Loading jobs…</div>`;
  try {
    allJobs = await getJobs();
    _jobsCache = allJobs;
  } catch { grid.innerHTML = `<div style="color:var(--text-muted);padding:40px;text-align:center;grid-column:1/-1">Could not load jobs. <a href="#" onclick="initJobsPage();return false" style="color:var(--primary-light)">Retry</a></div>`; return; }

  function render(jobs) {
    grid.innerHTML = jobs.length ? jobs.map(renderJobCard).join('') : `<div class="no-results"><div class="icon">🔍</div><h3>No jobs found</h3><p>Try adjusting your filters.</p></div>`;
    const count = document.getElementById('resultsCount');
    if (count) count.textContent = jobs.length;
    grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function applyFilters() {
    const city     = document.getElementById('filterCity')?.value     || '';
    const industry = document.getElementById('filterIndustry')?.value || '';
    const type     = document.getElementById('filterType')?.value     || '';
    const salary   = document.getElementById('filterSalary')?.value   || '';
    const search   = document.getElementById('jobSearch')?.value.toLowerCase() || '';
    render(allJobs.filter(j => {
      if (city     && j.city !== city)          return false;
      if (industry && j.industry !== industry)  return false;
      if (type     && j.type !== type)          return false;
      if (salary   && j.salaryMin < parseInt(salary)) return false;
      if (search   && !j.title.toLowerCase().includes(search) && !j.company.toLowerCase().includes(search)) return false;
      return true;
    }));
  }

  ['filterCity','filterIndustry','filterType','filterSalary'].forEach(id => document.getElementById(id)?.addEventListener('change', applyFilters));
  document.getElementById('jobSearch')?.addEventListener('input', applyFilters);
  document.getElementById('filterBtn')?.addEventListener('click', applyFilters);
  render(allJobs);
}

// ── Accommodation page ────────────────────────────────────────
async function initAccPage() {
  const grid = document.getElementById('accGrid');
  if (!grid) return;
  let allAcc = [];
  grid.innerHTML = `<div style="color:var(--text-muted);padding:40px;text-align:center;grid-column:1/-1">Loading listings…</div>`;
  try {
    allAcc = await getAccommodation();
    _accCache = allAcc;
  } catch { grid.innerHTML = `<div style="color:var(--text-muted);padding:40px;text-align:center;grid-column:1/-1">Could not load listings. <a href="#" onclick="initAccPage();return false" style="color:var(--primary-light)">Retry</a></div>`; return; }

  function render(acc) {
    grid.innerHTML = acc.length ? acc.map(renderAccCard).join('') : `<div class="no-results"><div class="icon">🏠</div><h3>No accommodation found</h3><p>Try adjusting your filters.</p></div>`;
    const count = document.getElementById('accCount');
    if (count) count.textContent = acc.length;
    grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function applyFilters() {
    const city   = document.getElementById('accCity')?.value   || '';
    const type   = document.getElementById('accType')?.value   || '';
    const gender = document.getElementById('accGender')?.value || '';
    const price  = document.getElementById('accPrice')?.value  || '';
    const search = document.getElementById('accSearch')?.value.toLowerCase() || '';
    render(allAcc.filter(a => {
      if (city   && a.city !== city)   return false;
      if (type   && a.type !== type)   return false;
      if (gender && a.gender !== gender && a.gender !== 'Any') return false;
      if (price  && a.price > parseInt(price))  return false;
      if (search && !a.name.toLowerCase().includes(search) && !a.area.toLowerCase().includes(search)) return false;
      return true;
    }));
  }

  ['accCity','accType','accGender','accPrice'].forEach(id => document.getElementById(id)?.addEventListener('change', applyFilters));
  document.getElementById('accSearch')?.addEventListener('input', applyFilters);
  document.getElementById('accFilterBtn')?.addEventListener('click', applyFilters);
  render(allAcc);
}

// ── Home page ─────────────────────────────────────────────────
async function initHomePage() {
  const featJobs = document.getElementById('featuredJobs');
  const featAcc  = document.getElementById('featuredAcc');
  if (!featJobs && !featAcc) return;
  try {
    if (featJobs) {
      const jobs = await getJobs();
      featJobs.innerHTML = jobs.slice(0, 4).map(renderJobCard).join('');
    }
    if (featAcc) {
      const acc = await getAccommodation();
      featAcc.innerHTML = acc.slice(0, 4).map(renderAccCard).join('');
    }
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } catch {
    if (featJobs) featJobs.innerHTML = `<div style="color:var(--text-muted);padding:40px;text-align:center;grid-column:1/-1">Could not load listings.</div>`;
    if (featAcc)  featAcc.innerHTML  = `<div style="color:var(--text-muted);padding:40px;text-align:center;grid-column:1/-1">Could not load listings.</div>`;
  }
}

// ── Hero search ───────────────────────────────────────────────
const heroSearchBtn = document.getElementById('heroSearchBtn');
if (heroSearchBtn) {
  heroSearchBtn.addEventListener('click', () => {
    const q    = document.getElementById('heroSearchInput')?.value || '';
    const type = document.getElementById('heroSearchType')?.value  || 'jobs';
    window.location.href = type === 'accommodation'
      ? `accommodation.html${q ? '?q=' + encodeURIComponent(q) : ''}`
      : `jobs.html${q ? '?q=' + encodeURIComponent(q) : ''}`;
  });
  document.getElementById('heroSearchInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') heroSearchBtn.click(); });
}

// ── URL param pre-fill ────────────────────────────────────────
const qParam = new URLSearchParams(window.location.search).get('q');
if (qParam) {
  const inp = document.getElementById('jobSearch') || document.getElementById('accSearch');
  if (inp) { inp.value = qParam; }
}

// ── Contact page tabs ─────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(target);
    if (panel) panel.classList.add('active');
  });
});

// ── Contact forms → API ───────────────────────────────────────
async function submitContactForm(formId, endpoint, mapFn) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const orig = btn.textContent;
    btn.textContent = 'Submitting…'; btn.disabled = true;
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      // Also grab selects/textareas not caught by FormData in some browsers
      form.querySelectorAll('input,select,textarea').forEach(el => { if (el.id) data[el.id] = el.value; });
      const mapped = mapFn ? mapFn(data) : data;
      const res = await apiFetch(endpoint, { method: 'POST', body: JSON.stringify(mapped) });
      form.reset();
      showToast(res.message);
    } catch (err) { showToast(err.message || 'Submission failed. Please try again.', 'error'); }
    btn.textContent = orig; btn.disabled = false;
  });
}

submitContactForm('jobForm',     '/contact/job',     d => d);
submitContactForm('roomForm',    '/contact/room',    d => d);
submitContactForm('generalForm', '/contact/general', d => d);

// ── Newsletter forms → API ────────────────────────────────────
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn   = form.querySelector('button');
    const email = form.querySelector('input[type="email"]')?.value;
    const orig  = btn.textContent;
    btn.textContent = '…'; btn.disabled = true;
    try {
      const res = await apiFetch('/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
      showToast(res.message);
      form.reset();
    } catch (err) { showToast(err.message || 'Please try again.', 'error'); }
    btn.textContent = orig; btn.disabled = false;
  });
});

// ── Init ──────────────────────────────────────────────────────
initHomePage();
initJobsPage();
initAccPage();
