/* ═══════════════════════════════════════════════════════════
   Good Jobs — Enhancements
   Features: hero text reveal, 3D card tilt, WhatsApp button,
   skeleton screens, page transitions, FAQ accordion,
   back-to-top, animated form success
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. PAGE TRANSITION ──────────────────────────────────── */
  const overlay = document.getElementById('pageTransitionOverlay');

  function doPageTransition(href) {
    if (!overlay) return (window.location.href = href);
    overlay.classList.add('pt-out');
    setTimeout(() => { window.location.href = href; }, 420);
  }

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      !href || href.startsWith('#') || href.startsWith('mailto:') ||
      href.startsWith('tel:') || href.startsWith('http') ||
      link.target === '_blank' || link.hasAttribute('data-no-transition')
    ) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      doPageTransition(href);
    });
  });
  // NOTE: overlay starts at opacity:0 in CSS — no JS fade-in needed.

  /* ── 2. HERO WORD-BY-WORD REVEAL ────────────────────────── */
  // Animation is pure CSS (@keyframes wordIn). JS only splits words
  // so CSS var(--wi) stagger delay works. No class toggling needed.
  function splitWords(el) {
    if (!el) return;
    // Preserve gradient-text spans
    const html = el.innerHTML;
    const temp = document.createElement('div');
    temp.innerHTML = html;

    function wrapWords(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach(w => {
          if (/^\s+$/.test(w)) {
            frag.appendChild(document.createTextNode(w));
          } else if (w) {
            const span = document.createElement('span');
            span.className = 'hero-word';
            span.textContent = w;
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT') {
        [...node.childNodes].forEach(wrapWords);
      }
    }

    [...temp.childNodes].forEach(wrapWords);
    el.innerHTML = '';
    el.appendChild(temp);

    const words = el.querySelectorAll('.hero-word');
    words.forEach((w, i) => {
      w.style.setProperty('--wi', i);
    });
  }

  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) splitWords(heroH1);
  // No need to add words-revealed — CSS animation fires automatically.

  /* ── 3. 3D CARD TILT ─────────────────────────────────────── */
  function initTilt(selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const cx = r.width  / 2;
        const cy = r.height / 2;
        const rotX = ((y - cy) / cy) * -7;   // max ±7deg
        const rotY = ((x - cx) / cx) *  7;
        card.style.transform = `translateY(-6px) perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        card.style.transition = 'box-shadow .15s, border-color .15s';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all .45s cubic-bezier(.34,1.56,.64,1)';
      });
    });
  }

  // Run once cards exist; re-run when new cards are added
  const tiltObserver = new MutationObserver(() => {
    initTilt('.job-card, .acc-card, .step-card, .testimonial-card, .contact-info-card');
  });
  tiltObserver.observe(document.body, { childList: true, subtree: true });
  initTilt('.job-card, .acc-card, .step-card, .testimonial-card, .contact-info-card');

  /* ── 4. SKELETON SCREENS ─────────────────────────────────── */
  window.GJ_showSkeletons = function (containerId, count = 6, type = 'job') {
    const el = document.getElementById(containerId);
    if (!el) return;
    let html = '';
    for (let i = 0; i < count; i++) {
      if (type === 'job') {
        html += `<div class="skeleton-card">
          <div class="skel-row">
            <div class="skel skel-circle"></div>
            <div style="flex:1">
              <div class="skel skel-line" style="width:70%;margin-bottom:8px"></div>
              <div class="skel skel-line" style="width:45%"></div>
            </div>
          </div>
          <div class="skel skel-line" style="width:90%;margin-top:14px"></div>
          <div class="skel skel-line" style="width:60%"></div>
          <div class="skel-tags">
            <div class="skel skel-tag"></div>
            <div class="skel skel-tag" style="width:72px"></div>
            <div class="skel skel-tag" style="width:56px"></div>
          </div>
          <div class="skel-footer">
            <div class="skel skel-line" style="width:30%"></div>
            <div class="skel skel-btn"></div>
          </div>
        </div>`;
      } else {
        html += `<div class="skeleton-card" style="padding:0;overflow:hidden">
          <div class="skel" style="height:190px;border-radius:0"></div>
          <div style="padding:20px">
            <div class="skel skel-line" style="width:75%;margin-bottom:8px"></div>
            <div class="skel skel-line" style="width:50%"></div>
            <div class="skel-tags" style="margin-top:14px">
              <div class="skel skel-tag"></div>
              <div class="skel skel-tag" style="width:64px"></div>
            </div>
          </div>
        </div>`;
      }
    }
    el.innerHTML = html;
  };

  /* ── 5. SALARY RANGE SLIDER ──────────────────────────────── */
  function initSalarySlider() {
    const wrap = document.getElementById('salarySliderWrap');
    if (!wrap) return;

    const minVal = 10000, maxVal = 60000, step = 1000;
    let curMin = minVal, curMax = maxVal;

    wrap.innerHTML = `
      <div class="salary-slider-label">
        <span class="salary-slider-title">Salary Range</span>
        <span class="salary-slider-value" id="salaryDisplay">₹${fmt(curMin)} – ₹${fmt(curMax)}</span>
      </div>
      <div class="salary-track-wrap">
        <div class="salary-track">
          <div class="salary-fill" id="salaryFill"></div>
          <input type="range" id="salaryMin" class="salary-thumb" min="${minVal}" max="${maxVal}" step="${step}" value="${curMin}">
          <input type="range" id="salaryMax" class="salary-thumb" min="${minVal}" max="${maxVal}" step="${step}" value="${curMax}">
        </div>
      </div>`;

    function fmt(n) { return (n / 1000).toFixed(0) + 'k'; }

    const minEl   = document.getElementById('salaryMin');
    const maxEl   = document.getElementById('salaryMax');
    const display = document.getElementById('salaryDisplay');
    const fill    = document.getElementById('salaryFill');

    function updateSlider() {
      curMin = +minEl.value;
      curMax = +maxEl.value;
      if (curMin > curMax) { [curMin, curMax] = [curMax, curMin]; minEl.value = curMin; maxEl.value = curMax; }
      const pMin = ((curMin - minVal) / (maxVal - minVal)) * 100;
      const pMax = ((curMax - minVal) / (maxVal - minVal)) * 100;
      fill.style.left  = pMin + '%';
      fill.style.width = (pMax - pMin) + '%';
      display.textContent = `₹${fmt(curMin)} – ₹${fmt(curMax)}`;
      // Expose values for main.js to pick up
      window.GJ_salaryRange = { min: curMin, max: curMax };
      document.dispatchEvent(new CustomEvent('salaryChange', { detail: { min: curMin, max: curMax } }));
    }

    minEl.addEventListener('input', updateSlider);
    maxEl.addEventListener('input', updateSlider);
    updateSlider();
  }
  initSalarySlider();

  /* ── 6. FAQ ACCORDION ─────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-question');
      const body = item.querySelector('.faq-answer');
      if (!btn || !body) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-open');
        // Close all
        document.querySelectorAll('.faq-item.faq-open').forEach(i => {
          i.classList.remove('faq-open');
          i.querySelector('.faq-answer').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('faq-open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }
  initFAQ();

  /* ── 7. BACK TO TOP ──────────────────────────────────────── */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('btt-visible', window.scrollY > 500);
    }, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 8. ANIMATED FORM SUCCESS ────────────────────────────── */
  function showFormSuccess(formEl) {
    const card = formEl.closest('.form-card');
    if (!card) return;

    card.innerHTML = `
      <div class="form-success">
        <div class="fs-ring">
          <svg class="fs-check" viewBox="0 0 52 52" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle class="fs-circle" cx="26" cy="26" r="23"/>
            <path class="fs-tick" d="M14 26l9 9 15-17"/>
          </svg>
        </div>
        <h3 class="fs-title">Sent Successfully!</h3>
        <p class="fs-msg">We've received your submission and will get back to you within 24 hours.</p>
        <button class="btn btn-outline" onclick="location.reload()">Submit Another</button>
      </div>`;

    // Fire confetti
    fireConfetti();
  }

  // Hook all contact forms
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      // Let main.js handle toasts first if it exists, then show success card
      setTimeout(() => showFormSuccess(form), 500);
    });
  });

  /* ── CONFETTI ─────────────────────────────────────────────── */
  function fireConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;';

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      r: Math.random() * 6 + 3,
      color: ['#00C9A7', '#00E5C0', '#E8A000', '#FFBE30', '#fff'][Math.floor(Math.random() * 5)],
      vy: Math.random() * 3 + 2,
      vx: (Math.random() - .5) * 2.5,
      spin: (Math.random() - .5) * .2,
      angle: Math.random() * Math.PI * 2,
      shape: Math.random() > .5 ? 'rect' : 'circle'
    }));

    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height);
        if (p.shape === 'rect') {
          ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        } else {
          ctx.beginPath();ctx.arc(0, 0, p.r, 0, Math.PI * 2);ctx.fill();
        }
        ctx.restore();
        p.x += p.vx; p.y += p.vy; p.angle += p.spin;
      });
      if (pieces.some(p => p.y < canvas.height)) {
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
        canvas.remove();
      }
    }
    draw();
    setTimeout(() => { cancelAnimationFrame(raf); canvas.remove(); }, 3500);
  }

  /* ── SCROLL PROGRESS (global) ─────────────────────────────── */
  const sp = document.getElementById('scrollProgress');
  if (sp) {
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      sp.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }



})();
