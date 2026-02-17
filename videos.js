function loadVideos(pageName, containerId) {

  fetch("videos.json")
    .then(res => res.json())
    .then(videos => {

      const filtered = videos.filter(video =>
        video.page === pageName
      );

      const container = document.getElementById(containerId);

      if (filtered.length === 0) {
        container.innerHTML = "<p>Sem vídeos ainda 😅</p>";
        return;
      }

      filtered.forEach(video => {
        container.innerHTML += `
          <a href="#" class="video-card" data-id="${video.id}">
            <div class="thumb">
              <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg">
              <span class="play">▶</span>
            </div>
            <div class="info">
              <h3>${video.title}</h3>
              <span>${video.channel}</span>
            </div>
          </a>
        `;
      });

    });
}

function loadVideos(pageName, containerId) {

  fetch("videos.json")
    .then(res => res.json())
    .then(videos => {

      const filtered = videos.filter(video =>
        video.page === pageName
      );

      const container = document.getElementById(containerId);

      if (filtered.length === 0) {
        container.innerHTML = "<p>Sem vídeos ainda 😅</p>";
        return;
      }

      filtered.forEach(video => {
        container.innerHTML += `
          <a href="#" class="video-card" data-id="${video.id}">
            <div class="thumb">
              <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg">
              <span class="play">▶</span>
            </div>
            <div class="info">
              <h3>${video.title}</h3>
              <span>${video.channel}</span>
            </div>
          </a>
        `;
      });

    });
}

function loadHome() {

  fetch("videos.json")
    .then(res => res.json())
    .then(videos => {

      // ====================
      // HERO
      // ====================

      const heroTrack = document.getElementById("videoTrack");

      const featured = videos.filter(v => v.featured);

      if (featured.length === 0) {
        heroTrack.innerHTML = "<p>Sem vídeos em destaque</p>";
        return;
      }

      heroTrack.innerHTML = featured.map(video => `
        <div class="video-slide" data-id="${video.id}">
          <img class="hero-thumb"
               src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg">
          <div class="hero-overlay">
            <div class="hero-play hero-play-center">
            <svg viewBox="0 0 24 24">
          <path fill="white" d="M8 5v14l11-7z"/>
        </svg>
      </div>
            
            <div class="hero-info">
              <h2>${video.title}</h2>
              <span>${video.channel}</span>
            </div>
          </div>
        </div>
      `).join("");


      // ====================
      // CAROUSEL
      // ====================

      const slides = document.querySelectorAll(".video-slide");
      const track = document.getElementById("videoTrack");
      const dotsContainer = document.getElementById("carouselDots");

      let index = 0;
      let interval;

      function updateCarousel() {

        track.style.transform =
          `translateX(-${index * 100}%)`;

        dotsContainer
          .querySelectorAll("span")
          .forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
          });

      }

      function startAutoplay() {

        clearInterval(interval);

        interval = setInterval(() => {

          index = (index + 1) % slides.length;

          updateCarousel();

        }, 4000);

      }


      // DOTS
      dotsContainer.innerHTML = "";

      slides.forEach((slide, i) => {

        const dot = document.createElement("span");

        dot.onclick = () => {

          index = i;
          updateCarousel();
          startAutoplay();

        };

        dotsContainer.appendChild(dot);


        // CLICK HERO → abrir modal
        slide.onclick = () => {

          const videoId = slide.dataset.id;

          const modal = document.getElementById("videoModal");
          const frame = document.getElementById("videoFrame");
          const youtubeLink = document.getElementById("youtubeLink");

          frame.src =
            `https://www.youtube.com/embed/${videoId}?autoplay=1`;

          youtubeLink.href =
            `https://www.youtube.com/watch?v=${videoId}`;

          modal.classList.add("open");

        };

      });


      // BOTÕES
      document.querySelector(".video-btn.right").onclick = () => {

        index = (index + 1) % slides.length;

        updateCarousel();
        startAutoplay();

      };

      document.querySelector(".video-btn.left").onclick = () => {

        index = (index - 1 + slides.length) % slides.length;

        updateCarousel();
        startAutoplay();

      };

      // ====================
// SWIPE HERO (IPHONE + ANDROID)
// ====================

const videoWindow = document.querySelector(".video-window");

let startX = 0;
let endX = 0;

videoWindow.addEventListener("touchstart", (e) => {

  startX = e.changedTouches[0].clientX;

}, { passive: true });

videoWindow.addEventListener("touchend", (e) => {

  endX = e.changedTouches[0].clientX;

  const diff = startX - endX;

  if (Math.abs(diff) > 50) {

    if (diff > 0) {

      // swipe esquerda
      index = (index + 1) % slides.length;

    } else {

      // swipe direita
      index = (index - 1 + slides.length) % slides.length;

    }

    updateCarousel();
    startAutoplay();

  }

}, { passive: true });



      startAutoplay();

      updateCarousel();


      // ====================
      // ÚLTIMOS VIDEOS
      // ====================

      const latestContainer =
        document.getElementById("latestVideos");

      const latest = videos
        .filter(v => !v.featured)
        .sort((a,b) =>
          new Date(b.date) - new Date(a.date))
        .slice(0, 6);

      latestContainer.innerHTML = latest.map(video => `
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

// CLICK NOS ÚLTIMOS VIDEOS
document.querySelectorAll("#latestVideos .video-card")
.forEach(card => {

  card.addEventListener("click", () => {

    const videoId = card.dataset.video;

    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");
    const youtubeLink = document.getElementById("youtubeLink");

    frame.src =
      `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    youtubeLink.href =
      `https://www.youtube.com/watch?v=${videoId}`;

    modal.classList.add("open");

  });

});

      // ====================
// TRENDING VIDEOS
// ====================

const trendingContainer =
  document.getElementById("trendingVideos");

const trending = videos
  .filter(v => v.trending)
  .slice(0, 6);

trendingContainer.innerHTML = trending.map(video => `
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


// CLICK TRENDING
document.querySelectorAll("#trendingVideos .video-card")
.forEach(card => {

  card.addEventListener("click", () => {

    const videoId = card.dataset.video;

    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");
    const youtubeLink = document.getElementById("youtubeLink");

    frame.src =
      `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    youtubeLink.href =
      `https://www.youtube.com/watch?v=${videoId}`;

    modal.classList.add("open");

  });

});


    });
} 


