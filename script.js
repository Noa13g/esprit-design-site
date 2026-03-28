const reveals = document.querySelectorAll('.reveal, .reveal-scale');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
reveals.forEach((el) => observer.observe(el));

const mobileToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
if (mobileToggle && mobileNav) {
  mobileToggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
}

const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -5;
    const rotateY = ((x / rect.width) - 0.5) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-media img');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const y = Math.min(window.scrollY * 0.06, 28);
  hero.style.transform = `translateY(${y}px) scale(1.03)`;
}, { passive: true });
