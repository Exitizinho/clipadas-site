const track = document.getElementById("carouselTrack");
const nextBtn = document.getElementById("carouselNext");
const prevBtn = document.getElementById("carouselPrev");

let index = 0;

const cardWidth = 282; // largura + gap
const visible = 4;

nextBtn.addEventListener("click", () => {
  const maxIndex = track.children.length - visible;
  if (index < maxIndex) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

function updateCarousel() {
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

const track = document.getElementById("videoTrack");
const slides = document.querySelectorAll(".video-slide");
const prevBtn = document.querySelector(".video-btn.left");
const nextBtn = document.querySelector(".video-btn.right");

let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  if (index < slides.length - 1) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

