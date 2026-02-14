const track = document.getElementById("videoTrack");
const slides = document.querySelectorAll(".video-slide");
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

// ---------------- VIDEOS ----------------
function stopAllVideos() {
  slides.forEach(slide => {
    const iframe = slide.querySelector("iframe");
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  });
}

// ⚠️ DETETAR PLAY REAL (mouse em cima do iframe)
slides.forEach(slide => {
  slide.addEventListener("mouseenter", () => {
    autoplayEnabled = false;
    stopAutoplay();
  });
});

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

// ---------------- INIT ----------------
createDots();
updateCarousel();
startAutoplay();



// ===============================
// HOME SEARCH → REDIRECT PARA GAMING
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".global-search");

  inputs.forEach(input => {
    input.addEventListener("keydown", e => {
      if (e.key !== "Enter") return;

      const query = input.value.trim();
      if (!query) return;

      // redireciona para gaming com query
      window.location.href = `gaming.html?q=${encodeURIComponent(query)}`;
    });
  });

  const modal = document.getElementById("videoModal");
const frame = document.getElementById("videoFrame");
const youtubeLink = document.getElementById("youtubeLink");
const closeBtn = document.querySelector(".video-close");

const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach(card => {
  card.addEventListener("click", function (e) {
    e.preventDefault();

    const videoId = this.dataset.video; // já é só o ID

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    frame.src = embedUrl;
    youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;

    modal.classList.add("open"); 
  });
});

// fechar botão
closeBtn.addEventListener("click", closeModal);

// fechar clicando fora
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});

// fechar ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  modal.classList.remove("open");
  frame.src = "";
}

});

