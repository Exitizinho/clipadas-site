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



document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = document.querySelectorAll(".global-search");

  if (!searchInputs.length) return;

  // Apanha cards da HOME e da GAMING
  const cards = document.querySelectorAll(".gaming-card, .video-card");

  searchInputs.forEach(input => {
    input.addEventListener("input", () => {
      const query = input.value.toLowerCase().trim();

      cards.forEach(card => {
        const titleEl = card.querySelector("h3");
        const channelEl = card.querySelector(".info span");

        // ignora cards sem texto (iframes, etc)
        if (!titleEl && !channelEl) return;

        const title = titleEl ? titleEl.textContent.toLowerCase() : "";
        const channel = channelEl ? channelEl.textContent.toLowerCase() : "";

        const match =
          title.includes(query) ||
          channel.includes(query);

        card.style.display = match ? "" : "none";
      });
    });
  });
});

