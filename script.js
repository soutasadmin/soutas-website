// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

const backToTopBtn = document.getElementById('backToTop');

// Smooth scroll behavior for back-to-top button
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
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
  duration: 800,
  offset: 120,
  once: true,
  easing: 'ease-in-out'
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

