const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function initMobileNav() {
  const toggle = $("#mobile-toggle");
  const nav = $("#nav-links");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  $$("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initReveal() {
  const items = $$(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px"
  });

  items.forEach(item => observer.observe(item));
}

function initHeroParallax() {
  const heroImage = $(".hero-media img");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!heroImage || reduceMotion) return;

  window.addEventListener("scroll", () => {
    const y = Math.min(window.scrollY * 0.08, 32);
    heroImage.style.transform = `scale(1.03) translateY(${y}px)`;
  }, { passive: true });
}

function initYear() {
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initReveal();
  initHeroParallax();
  initYear();
});
