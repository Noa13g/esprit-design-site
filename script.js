const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const revealItems = document.querySelectorAll(".reveal");
const heroImage = document.querySelector(".hero-media img");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateNavbar() {
  if (!navbar) return;
  if (window.scrollY > 24) {
    navbar.classList.add("is-scrolled");
  } else {
    navbar.classList.remove("is-scrolled");
  }
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const opened = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", opened ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
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

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

if (!reduceMotion && heroImage) {
  window.addEventListener("scroll", () => {
    const offset = Math.min(window.scrollY * 0.08, 36);
    const scale = 1.02 + Math.min(window.scrollY * 0.00005, 0.03);
    heroImage.style.transform = `translateY(${offset}px) scale(${scale})`;
    updateNavbar();
  }, { passive: true });
} else {
  window.addEventListener("scroll", updateNavbar, { passive: true });
}

updateNavbar();

if (!reduceMotion) {
  document.querySelectorAll(".project-card").forEach(card => {
    const img = card.querySelector(".project-media img");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;

      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      if (img) {
        img.style.transform = `scale(1.08) translate(${rotateY * 0.6}px, ${rotateX * 0.6}px)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      if (img) {
        img.style.transform = "";
      }
    });
  });
}
