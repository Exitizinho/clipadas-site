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

function loadHomeVideos() {

  fetch("videos.json")
    .then(res => res.json())
    .then(videos => {

      // HERO
      const heroTrack = document.getElementById("videoTrack");

      const featured = videos.filter(v => v.featured);

      heroTrack.innerHTML = featured.map(video => `
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


      // thumbnails
      const slides = document.querySelectorAll(".video-slide");

      slides.forEach(slide => {

        const id = slide.dataset.id;
        const img = slide.querySelector("img");

        img.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

        img.onerror = () => {
          img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        };

        // CLICK NOS SLIDES (ABRIR MODAL)
slides.forEach(slide => {

  slide.addEventListener("click", () => {

    const videoId = slide.dataset.id;

    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");
    const youtubeLink = document.getElementById("youtubeLink");

    frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;

    modal.classList.add("open");

  });

});


      });


      // ÚLTIMOS VIDEOS
      const latest = document.getElementById("latestVideos");

      const latestVideos = videos
        .sort((a,b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

      latest.innerHTML = latestVideos.map(video => `
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


      // =========================
      // CAROUSEL (AGORA NO SÍTIO CERTO)
      // =========================

      const track = document.getElementById("videoTrack");
      const dotsContainer = document.getElementById("carouselDots");

      let index = 0;
      let autoplayInterval;


      // DOTS
      dotsContainer.innerHTML = "";

      slides.forEach((_, i) => {

        const dot = document.createElement("span");

        dot.onclick = () => {
          index = i;
          updateCarousel();
        };

        dotsContainer.appendChild(dot);

      });


      function updateCarousel() {

        track.style.transform = `translateX(-${index * 100}%)`;

        const dots = dotsContainer.querySelectorAll("span");

        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });

      }


      // BOTÕES
      document.querySelector(".video-btn.right").onclick = () => {
        index = (index + 1) % slides.length;
        updateCarousel();
      };

      document.querySelector(".video-btn.left").onclick = () => {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
      };


      // AUTOPLAY
      function startAutoplay() {

        clearInterval(autoplayInterval);

        autoplayInterval = setInterval(() => {

          index = (index + 1) % slides.length;

          updateCarousel();

        }, 4000);

      }


      updateCarousel();
      startAutoplay();

    });

}



