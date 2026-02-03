const track = document.getElementById("videoTrack");
const slides = document.querySelectorAll(".video-slide");
const prevBtn = document.querySelector(".video-btn.left");
const nextBtn = document.querySelector(".video-btn.right");
const indicatorsContainer = document.getElementById("videoIndicators");

let index = 0;

/* criar bolinhas */
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });

  indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".video-indicators span");

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

/* loop infinito */
nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});

const autoplayDelay = 5000; // 5 segundos
let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    index++;
    if (index >= slides.length) {
      index = 0; // volta ao primeiro
    }
    updateCarousel();
  }, autoplayDelay);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

/* iniciar autoplay */
startAutoplay();

/* pausa autoplay quando o user clica nas setas */
nextBtn.addEventListener("click", () => {
  stopAutoplay();
  index++;
  if (index >= slides.length) index = 0;
  updateCarousel();
  startAutoplay();
});

prevBtn.addEventListener("click", () => {
  stopAutoplay();
  index--;
  if (index < 0) index = slides.length - 1;
  updateCarousel();
  startAutoplay();
});

