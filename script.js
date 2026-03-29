const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const revealItems = document.querySelectorAll(".reveal");
const heroImage = document.querySelector(".hero-media img");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const GITHUB_OWNER = "Noa13g";
const GITHUB_REPO = "esprit-design-site";
const GITHUB_BRANCH = "main";

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
      if (img) img.style.transform = "";
    });
  });
}

async function fetchFolderImages(folder) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/images/${folder}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const files = await res.json();

  return files
    .filter(file => file.type === "file" && /\.(jpg|jpeg|png|webp)$/i.test(file.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));
}

function createProjectCard(project, coverUrl) {
  return `
    <a href="${project.href}" class="project-card reveal is-visible">
      <div class="project-media">
        <img src="${coverUrl}" alt="${project.title}" />
      </div>
      <div class="project-layer"></div>
      <div class="project-content">
        <span class="project-badge">${project.tag}</span>
        <h3>${project.title}</h3>
        <p>${project.text}</p>
      </div>
    </a>
  `;
}

async function renderAllProjectsPage() {
  const grid = document.getElementById("all-projects-grid");
  if (!grid) return;

  const projects = [
    { folder: "levis", title: "LEVIS", tag: "Appartement", text: "Rénovation haussmannienne et recherche d’équilibre.", href: "../projet-levis.html" },
    { folder: "chopin", title: "CHOPIN", tag: "Maison", text: "Une maison pensée dans la durée, avec chaleur et lisibilité.", href: "../projet-chopin.html" },
    { folder: "bali", title: "BALI", tag: "Ambiance", text: "Un projet lumineux, sensoriel et très incarné.", href: "../projet-bali.html" },
    { folder: "dardanelles", title: "DARDANELLES", tag: "Appartement", text: "Un projet compact et très efficace.", href: "#" },
    { folder: "estang", title: "ESTANG", tag: "Maison", text: "Un équilibre entre usage, clarté et confort.", href: "#" },
    { folder: "foch", title: "FOCH", tag: "Appartement", text: "Une écriture plus graphique et plus affirmée.", href: "#" },
    { folder: "london", title: "LONDON", tag: "Appartement", text: "Un projet structuré, lisible et contemporain.", href: "#" },
    { folder: "perche", title: "PERCHE", tag: "Maison", text: "Un lieu pensé pour la fluidité du quotidien.", href: "#" },
    { folder: "pinchinats", title: "PINCHINATS", tag: "Maison", text: "Une proposition douce, lumineuse et cohérente.", href: "#" },
    { folder: "plumier", title: "PLUMIER", tag: "Appartement", text: "Un projet optimisé jusque dans les détails.", href: "#" }
  ];

  const cards = await Promise.all(projects.map(async (project) => {
    const files = await fetchFolderImages(project.folder);
    const cover = files[0]?.download_url || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";
    return createProjectCard(project, cover);
  }));

  grid.innerHTML = cards.join("");
}

async function renderProjectGallery() {
  const gallery = document.getElementById("project-gallery");
  if (!gallery) return;

  const folder = gallery.dataset.folder;
  if (!folder) return;

  const files = await fetchFolderImages(folder);

  if (!files.length) {
    gallery.innerHTML = `<div class="gallery-empty">Aucune image trouvée pour ce projet.</div>`;
    return;
  }

  gallery.innerHTML = files.map(file => `
    <img src="${file.download_url}" alt="${file.name}" loading="lazy">
  `).join("");
}

renderAllProjectsPage();
renderProjectGallery();
