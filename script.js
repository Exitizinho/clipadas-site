const track = document.getElementById("videoTrack");
const slides = document.querySelectorAll(".video-slide");
const prevBtn = document.querySelector(".video-btn.left");
const nextBtn = document.querySelector(".video-btn.right");
const carousel = document.querySelector(".home-video-carousel");

let index = 0;
let autoplayInterval;

// ---- FUNÇÕES ----
function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots(); // assumes que já tens isto
}

function nextSlide() {
  index = (index + 1) % slides.length; // loop infinito
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
}

// ---- AUTOPLAY ----
function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 4000); // 4s
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// ---- BOTÕES ----
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// ---- PAUSE ON HOVER ----
carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

// ---- START ----
startAutoplay();

