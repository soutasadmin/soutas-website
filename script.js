// Show/hide back-to-top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


AOS.init({
  duration: 800,
  offset: 120,
  once: true, // animate only once
  easing: 'ease-in-out'
});

