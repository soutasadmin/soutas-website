// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

const backToTopBtn = document.getElementById('backToTop');

// Smooth scroll behavior for back-to-top button
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer for active nav link (scroll-based only)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

const observerOptions = {
  threshold: 0.3,
  rootMargin: '-66px 0px -66px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 700,
  offset: 80,
  once: true,
  easing: 'ease-out-cubic'
});

// Preload critical images
window.addEventListener('load', () => {
  const links = document.querySelectorAll('a[href*="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

// Auto-close navbar collapse on mobile after clicking a link
window.addEventListener('load', () => {
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      });
    });
  }
});

// === SCROLL PROGRESS BAR ===
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
}

// === NAVBAR SCROLLED CLASS ===
const navbar = document.querySelector('.custom-navbar');
if (navbar) {
  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
}

// === ANIMATED STAT COUNTERS ===
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const startValue = target > 100 ? Math.floor(target * 0.97) : 0;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(startValue + (target - startValue) * eased);
    el.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + suffix;
    }
  }
  requestAnimationFrame(step);
}

const statsBar = document.querySelector('.stats-bar');
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

if (statsBar && statNumbers.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      statNumbers.forEach((el, i) => {
        setTimeout(() => animateCounter(el), i * 150);
      });
    }
  }, { threshold: 0.5 });
  counterObserver.observe(statsBar);
}

