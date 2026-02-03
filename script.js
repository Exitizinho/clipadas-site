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

