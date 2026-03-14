const supabaseUrl = "https://tjuoffrvparnbjqdkbbd.supabase.co";
const supabaseKey = "sb_publishable__mJcSyoWJ8XzxN_0vOysAQ_Kru4kzjO";

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

  track = document.getElementById("videoTrack");
  prevBtn = document.querySelector(".video-btn.left");
  nextBtn = document.querySelector(".video-btn.right");
  dotsContainer = document.getElementById("carouselDots");

  modal = document.getElementById("videoModal");
  frame = document.getElementById("videoFrame");
  youtubeLink = document.getElementById("youtubeLink");

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

  // MODAL CLICK GLOBAL
  document.addEventListener("click", function (e) {

    const card = e.target.closest(".video-card, .video-slide");
    if (!card) return;

    const videoId = card.dataset.id;
    if (!videoId) return;

    /* REMOVE PREVIEWS */
    document.querySelectorAll(".video-card iframe").forEach(i => i.remove());

    frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;

    modal.classList.add("open");

    autoplayEnabled = false;
    stopAutoplay();
  });

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

  loadHero();
  loadTrending();
  loadLatest();
});


// ===============================
// HOVER PREVIEW
// ===============================
function initHoverPreview() {

  document.querySelectorAll(".video-card").forEach(card => {

    const videoId = card.dataset.id;
    const img = card.querySelector("img");

    if (!videoId || !img) return;

    let iframe = null;

    card.addEventListener("mouseenter", () => {

      if (iframe) return;

      iframe = document.createElement("iframe");

      iframe.src =
        `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`;

      iframe.allow = "autoplay";
      iframe.frameBorder = "0";

      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.pointerEvents = "none";
      iframe.style.borderRadius = "10px";

      const wrapper = img.parentElement;
      wrapper.style.position = "relative";

      wrapper.appendChild(iframe);

    });

    card.addEventListener("mouseleave", () => {

      if (!iframe) return;

      iframe.remove();
      iframe = null;

    });

  });

}


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
// HERO
// ===============================
async function loadHero() {

  const { data, error } = await supabaseClient
    .from("videos")
    .select("*")
    .eq("page", "home")
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

  const { data, error } = await supabaseClient
    .from("videos")
    .select("*")
    .eq("trending", true)
    .order("date", { ascending: false })
    .limit(3);

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

  initHoverPreview();
}


// ===============================
// ÚLTIMOS VÍDEOS
// ===============================
async function loadLatest() {

  const container = document.getElementById("latestvideos");

  const { data, error } = await supabaseClient
    .from("videos")
    .select("*")
    .eq("featured", false)
    .eq("trending", false)
    .neq("page", "topclipadas")
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

  initHoverPreview();
}
