// ===== GALERIA =====
function changeImage(src) {
  document.getElementById("mainImage").src = src;
}

// ===== AVALIAÇÕES =====
const ratings = [
  { stars: 5, text: "Produto excelente, recomendo demais." },
  { stars: 4, text: "Muito bom, chegou rápido." },
  { stars: 5, text: "Compra segura, produto top." },
  { stars: 5, text: "Espuma dura bastante." },
  { stars: 4, text: "Bom custo benefício." },
  { stars: 5, text: "Perfeito para festas." }
];

const perPage = 3;
let currentPage = 1;

function calculateAverage() {
  const total = ratings.reduce((a, b) => a + b.stars, 0);
  return (total / ratings.length).toFixed(1);
}

function renderStars() {
  const starBox = document.getElementById("stars");
  const score = document.getElementById("score");
  const totalReviews = document.getElementById("totalReviews");

  score.innerText = calculateAverage();
  totalReviews.innerText = ratings.length;

  starBox.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    starBox.innerHTML += `<span class="star">★</span>`;
  }
}

function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  ratings.slice(start, end).forEach(r => {
    container.innerHTML += `
      <div class="review">
        <div class="star">${"★".repeat(r.stars)}</div>
        <p>${r.text}</p>
        <button onclick="this.parentElement.classList.toggle('expanded')">Ver mais</button>
      </div>
    `;
  });
}

function renderPagination() {
  const pages = Math.ceil(ratings.length / perPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= pages; i++) {
    pagination.innerHTML += `<span onclick="goPage(${i})">${i}</span>`;
  }
}

function goPage(page) {
  currentPage = page;
  renderReviews();
}

renderStars();
renderReviews();
renderPagination();
