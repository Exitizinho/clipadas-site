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

