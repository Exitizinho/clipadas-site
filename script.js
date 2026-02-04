const track = document.getElementById("videoTrack");
const slides = document.querySelectorAll(".video-slide");
const prevBtn = document.querySelector(".video-btn.left");
const nextBtn = document.querySelector(".video-btn.right");
const carousel = document.querySelector(".home-video-carousel");
const dots = document.querySelectorAll(".carousel-dot");

let index = 0;
let autoplayInterval;
let isPlaying = false;

/* ---------------- FUNÇÕES ---------------- */

function updateCarousel() {
  stopAllVideos();
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
}

/* ---------------- AUTOPLAY ---------------- */

function startAutoplay() {
  if (!isPlaying) {
    autoplayInterval = setInterval(nextSlide, 4000);
  }
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

/* ---------------- PARAR TODOS OS VÍDEOS ---------------- */

function stopAllVideos() {
  slides.forEach(slide => {
    const iframe = slide.querySelector("iframe");
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  });
  isPlaying = false;
}

/* ---------------- DETETAR PLAY REAL ---------------- */

slides.forEach(slide => {
  const iframe = slide.querySelector("iframe");

  iframe.addEventListener("load", () => {
    iframe.contentWindow.postMessage(
      '{"event":"listening","id":""}',
      "*"
    );
  });
});

/* ---------------- BOTÕES ---------------- */

nextBtn.addEventListener("click", () => {
  stopAutoplay();
  nextSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoplay();
  prevSlide();
});

/* ---------------- DOTS ---------------- */

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    stopAutoplay();
    index = i;
    updateCarousel();
  });
});

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

/* ---------------- PAUSE ON HOVER ---------------- */

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

/* ---------------- START ---------------- */

startAutoplay();

