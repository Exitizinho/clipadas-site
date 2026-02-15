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
  
}

// ⚠️ DETETAR PLAY REAL (mouse em cima do iframe)
slides.forEach(slide => {

  slide.addEventListener("mouseenter", () => {
    stopAutoplay();
  });

  slide.addEventListener("mouseleave", () => {
    startAutoplay();
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
// Modal
// ===============================
document.addEventListener("DOMContentLoaded", () => {

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
  autoplayEnabled = true;
  startAutoplay(); 
}

 slides.forEach(slide => {

  slide.addEventListener("click", () => {

    const videoId = slide.dataset.id;

    frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;

    modal.classList.add("open");

    autoplayEnabled = false;
    stopAutoplay();

  });

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

 document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  const youtubeLink = document.getElementById("youtubeLink");
  fetch("videos.json")
    .then(res => res.json())
    .then(videos => {
      const heroTrack = document.getElementById("videoTrack");
      const featuredVideos = videos.filter(v => v.featured);
      heroTrack.innerHTML = featuredVideos.map(video => `
        <div class="video-slide" data-id="${video.id}">
          <img class="hero-thumb">
          <div class="hero-overlay">
            <div class="hero-play hero-play-center">▶</div>
            <div class="hero-info">
              <h2>${video.title}</h2>
              <span>${video.channel}</span>
            </div>
          </div>
        </div>
      `).join("");
      const slides = document.querySelectorAll(".video-slide");
      // thumbnails
      slides.forEach(slide => {
        const id = slide.dataset.id;
        const img = slide.querySelector("img");
        img.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
        img.onerror = () => {
          img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        };
      });
      // CLICK
      slides.forEach(slide => {
        slide.addEventListener("click", () => {
          const videoId = slide.dataset.id;
          frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
          youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
          modal.classList.add("open");
        });
      });
    });
});



      // =========================
      // ÚLTIMOS VÍDEOS
      // =========================

      const latestContainer = document.getElementById("latestVideos");

      const latestVideos = videos
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

      latestContainer.innerHTML = latestVideos.map(video => `
        <div class="video-card" data-video="${video.id}">

          <div class="thumb">
            <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg">
            <span class="play">▶</span>
          </div>

          <div class="info">
            <h3>${video.title}</h3>
            <span>${video.channel}</span>
          </div>

        </div>
      `).join("");

    });

});




});

