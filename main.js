// ── MOBILE MENU ──────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Fechar menu ao clicar em um link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ── NAVIGATION ──────────────────────────────────────────────
function navTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = document.querySelector('nav').offsetHeight;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ── PORTFOLIO FILTER ─────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const portItems  = document.querySelectorAll('.port-item');
const noResults  = document.getElementById('noResults');
const grid       = document.getElementById('portfolioGrid');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    let visible = 0;
    portItems.forEach(item => {
      const cat = item.dataset.category;
      if (filter === 'todos' || cat === filter) {
        item.classList.remove('hidden');
        visible++;
      } else {
        item.classList.add('hidden');
      }
    });

    // Show/hide no-results message
    noResults.classList.toggle('visible', visible === 0);

    // Toggle filtered layout class for grid re-flow
    grid.classList.toggle('filtered', filter !== 'todos');
  });
});

// ── SCROLL REVEAL ────────────────────────────────────────────
const isMobile = window.innerWidth <= 768;
const revealThreshold = isMobile ? 0.15 : 0.1;
const revealDuration = isMobile ? '0.4s' : '0.5s';

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: revealThreshold });

document.querySelectorAll('.service-card, .port-item, .process-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity ${revealDuration} ease, transform ${revealDuration} ease, background 0.3s, padding-left 0.3s`;
  observer.observe(el);
});
