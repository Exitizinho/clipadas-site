const track = document.getElementById("videoTrack");
let slides = [];
const prevBtn = document.querySelector(".video-btn.left");
const nextBtn = document.querySelector(".video-btn.right");
const dotsContainer = document.getElementById("carouselDots");

let index = 0;
let autoplayInterval = null;
let autoplayEnabled = true;

// ---------------- SLIDE ----------------
function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

// ---------------- DOTS ----------------
function createDots() {
  dotsContainer.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      stopAllVideos();
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

// ---------------- AUTOPLAY ----------------
function startAutoplay() {
  stopAutoplay();
  if (!autoplayEnabled) return;

  autoplayInterval = setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
  }, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = null;
}


// ---------------- BOTÕES ----------------
nextBtn.addEventListener("click", () => {
  autoplayEnabled = false;
  stopAutoplay();
  stopAllVideos();
  index = (index + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  autoplayEnabled = false;
  stopAutoplay();
  stopAllVideos();
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});


// ===============================
// Modal
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  const youtubeLink = document.getElementById("youtubeLink");
  const closeBtn = document.querySelector(".video-close");

  // ABRIR MODAL (para hero + trending + latest)
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

  // FECHAR
  function closeModal() {
    modal.classList.remove("open");
    frame.src = "";
    autoplayEnabled = true;
    startAutoplay();
  }

  closeBtn.addEventListener("click", closeModal);

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


  // thumbnails hero em qualidade máxima com fallback
slides.forEach(slide => {

  const id = slide.dataset.id;
  const img = slide.querySelector("img");

  if (!img) return;

  img.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  img.onerror = () => {
    img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

});

  async function loadHero() {

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("featured", true)
    .order("date", { ascending: false });

  if (error || !data.length) return;

  const track = document.getElementById("videoTrack");
  const dotsContainer = document.getElementById("carouselDots");

  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  data.forEach((video, i) => {

    track.innerHTML += `
      <div class="video-slide" data-id="${video.video_id}">
        <img src="https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg">
        <div class="hero-play-center"><span>▶</span></div>
      </div>
    `;

    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  });

  slides = document.querySelectorAll(".video-slide");

  initCarousel(); // ← inicializa depois de criar os slides
}

  async function loadTrending() {

  const container = document.getElementById("trendingContainer");

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("trending", true)
    .order("date", { ascending: false })
    .limit(6);

  if (error) return;

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

  async function loadLatest() {

  const container = document.getElementById("latestContainer");

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("date", { ascending: false })
    .limit(8);

  if (error) return;

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


function initCarousel() {

  if (!slides.length) return;

  createDots();
  updateCarousel();
  startAutoplay();

  slides.forEach(slide => {

    slide.addEventListener("mouseenter", stopAutoplay);
    slide.addEventListener("mouseleave", startAutoplay);

    slide.addEventListener("click", () => {

      const videoId = slide.dataset.id;

      frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;

      modal.classList.add("open");

      autoplayEnabled = false;
      stopAutoplay();

    });

  });
}

});

