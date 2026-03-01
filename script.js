const supabaseUrl = "https://TEU_PROJECT_ID.supabase.co";
const supabaseKey = "TUA_PUBLIC_ANON_KEY";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
// ===============================
// VARIÁVEIS GLOBAIS
// ===============================
let track;
let slides = [];
let prevBtn;
let nextBtn;
let dotsContainer;

let modal;
let frame;
let youtubeLink;

let index = 0;
let autoplayInterval = null;
let autoplayEnabled = true;


// ===============================
// INICIALIZAÇÃO
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTOS
  track = document.getElementById("videoTrack");
  prevBtn = document.querySelector(".video-btn.left");
  nextBtn = document.querySelector(".video-btn.right");
  dotsContainer = document.getElementById("carouselDots");

  modal = document.getElementById("videoModal");
  frame = document.getElementById("videoFrame");
  youtubeLink = document.getElementById("youtubeLink");

  // BOTÕES CAROUSEL
  prevBtn.addEventListener("click", () => {
    autoplayEnabled = false;
    stopAutoplay();
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    autoplayEnabled = false;
    stopAutoplay();
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  // MODAL CLICK GLOBAL (hero + trending + latest)
  document.addEventListener("click", function (e) {

    const card = e.target.closest(".video-card, .video-slide");
    if (!card) return;

    const videoId = card.dataset.id;
    if (!videoId) return;

    frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;

    modal.classList.add("open");

    autoplayEnabled = false;
    stopAutoplay();
  });

  // FECHAR MODAL
  function closeModal() {
    modal.classList.remove("open");
    frame.src = "";
    autoplayEnabled = true;
    startAutoplay();
  }

  document.querySelector(".video-close").addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  // 🚀 CARREGAR DADOS
  loadHero();
  loadTrending();
  loadLatest();
});


// ===============================
// CAROUSEL
// ===============================

function updateCarousel() {
  if (!slides.length) return;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function createDots() {
  dotsContainer.innerHTML = "";

  slides.forEach((_, i) => {
    const dot = document.createElement("span");

    dot.addEventListener("click", () => {
      autoplayEnabled = false;
      stopAutoplay();
      index = i;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll("span");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function startAutoplay() {
  stopAutoplay();
  if (!autoplayEnabled || slides.length <= 1) return;

  autoplayInterval = setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
  }, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = null;
}

function initCarousel() {

  if (!slides.length) return;

  createDots();
  updateCarousel();
  startAutoplay();

  slides.forEach(slide => {

    slide.addEventListener("mouseenter", stopAutoplay);
    slide.addEventListener("mouseleave", startAutoplay);

  });
}


// ===============================
// HERO (FEATURED)
// ===============================
async function loadHero() {

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("featured", true)
    .order("date", { ascending: false });

  if (error || !data.length) return;

  track.innerHTML = "";
  dotsContainer.innerHTML = "";
  index = 0;

  data.forEach(video => {

    track.innerHTML += `
      <div class="video-slide" data-id="${video.video_id}">
        <img src="https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg">
        <div class="hero-play-center"><span>▶</span></div>
      </div>
    `;
  });

  slides = document.querySelectorAll(".video-slide");

  initCarousel();
}


// ===============================
// TRENDING
// ===============================
async function loadTrending() {

  const container = document.getElementById("trendingvideos");

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("trending", true)
    .order("date", { ascending: false })
    .limit(6);

  if (error || !container) return;

  container.innerHTML = data.map(video => `
    <div class="video-card" data-id="${video.video_id}">
      <img src="https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg">
      <div class="info">
        <h4>${video.title}</h4>
        <span>${video.channel}</span>
      </div>
    </div>
  `).join("");
}


// ===============================
// ÚLTIMOS VÍDEOS
// ===============================
async function loadLatest() {

  const container = document.getElementById("latestvideos");

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("date", { ascending: false })
    .limit(8);

  if (error || !container) return;

  container.innerHTML = data.map(video => `
    <div class="video-card" data-id="${video.video_id}">
      <img src="https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg">
      <div class="info">
        <h4>${video.title}</h4>
        <span>${video.channel}</span>
      </div>
    </div>
  `).join("");
}
