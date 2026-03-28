const PROJECTS = [
  {
    title: "Projet Lévis",
    location: "Paris",
    summary: "Rénovation complète d’un appartement haussmannien.",
    category: "Résidentiel",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  },
  {
    title: "Cabinet médical",
    location: "Aix-en-Provence",
    summary: "Création d’un espace moderne et fonctionnel.",
    category: "Professionnel",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f"
  },
  {
    title: "Maison Bali",
    location: "Bali",
    summary: "Villa contemporaine inspirée de l’environnement tropical.",
    category: "Résidentiel",
    year: "2022",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea"
  }
];

const REVIEWS = [
  {
    text: "Nous sommes ravis du résultat. Le projet est élégant et parfaitement adapté.",
    author: "Lisa & Anne-Claire"
  },
  {
    text: "Un accompagnement sérieux et créatif du début à la fin.",
    author: "Client Paris"
  },
  {
    text: "Excellente compréhension de nos besoins.",
    author: "Client Aix"
  }
];

function renderProjects() {
  const container = document.getElementById("featured-projects");
  if (!container) return;

  container.innerHTML = PROJECTS.map(p => `
    <div class="project-card">
      <img src="${p.image}">
      <div class="project-content">
        <h3>${p.title}</h3>
        <p>${p.location}</p>
        <p>${p.summary}</p>
      </div>
    </div>
  `).join("");
}

function renderReviews() {
  const container = document.getElementById("reviews-grid");
  if (!container) return;

  container.innerHTML = REVIEWS.map(r => `
    <div class="quote-card">
      <p>"${r.text}"</p>
      <strong>${r.author}</strong>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderReviews();
});
