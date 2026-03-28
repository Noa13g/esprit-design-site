const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const PROJECT_IMAGES = {
  levis: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  bali: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
  "chopin-sausset": "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
  dardanelles: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1400&q=80",
  plumier: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80",
  perche: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  goron: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
  foch: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?auto=format&fit=crop&w=1400&q=80",
  estang: "https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&w=1400&q=80",
  london: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
  manosque: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
  "figeac-parrines": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  pinchinats: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80"
};

function initNav() {
  const toggle = $("#mobile-toggle");
  const navCenter = $("#nav-center");

  if (toggle && navCenter) {
    toggle.addEventListener("click", () => {
      const isOpen = navCenter.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    $$("#nav-center a").forEach(link => {
      link.addEventListener("click", () => {
        navCenter.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const current = location.pathname.split("/").pop() || "index.html";
  $$("#nav-center a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
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

function getProjectImage(slug) {
  return PROJECT_IMAGES[slug] || "assets/logo-hero.webp";
}

function projectCard(project) {
  return `
    <article class="project-card reveal">
      <div class="project-image">
        <img src="${getProjectImage(project.slug)}" alt="${project.title}" loading="lazy">
      </div>

      <div class="project-content">
        <div class="project-topline">
          <span class="project-badge">${project.category}</span>
          <span class="project-size">${project.year}</span>
        </div>

        <h3>${project.title}</h3>
        <p class="project-location">${project.location}</p>
        <p class="project-summary">${project.summary}</p>

        <div class="project-actions">
          <a class="project-link" href="projet.html?slug=${project.slug}">Voir le projet</a>
        </div>
      </div>
    </article>
  `;
}

function renderFeaturedProjects() {
  const mount = $("#featured-projects");
  if (!mount || !window.ESPRIT_PROJECTS) return;

  mount.innerHTML = window.ESPRIT_PROJECTS.slice(0, 6).map(projectCard).join("");
  initReveal();
}

function renderReviews() {
  const mount = $("#reviews-grid");
  if (!mount || !window.ESPRIT_REVIEWS) return;

  mount.innerHTML = window.ESPRIT_REVIEWS.map(review => `
    <article class="quote-card reveal">
      <div class="quote-stars">★★★★★</div>
      <blockquote>“${review.text}”</blockquote>
      <div class="quote-footer">
        <strong>${review.author}</strong><br>
        ${review.title} · ${review.source}
      </div>
    </article>
  `).join("");

  initReveal();
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
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  renderFeaturedProjects();
  renderReviews();
  initHeroParallax();
  initYear();
});
