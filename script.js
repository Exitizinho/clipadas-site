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
  } else {
    index = 0; // volta ao primeiro
  }
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = slides.length - 1; // vai para o último
  }
  updateCarousel();
});

