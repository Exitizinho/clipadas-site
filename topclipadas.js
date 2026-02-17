let currentSubcategory = "shorts";

function loadTopClipadas(subcategory) {

  fetch("videos.json")
    .then(res => res.json())
    .then(videos => {

      const filtered = videos.filter(video =>
        video.page === "topclipadas" &&
        video.subcategory === subcategory
      );

      const container =
        document.getElementById("topclipadasContainer");

      if (filtered.length === 0) {

        container.innerHTML =
          "<p>Sem clips ainda</p>";

        return;

      }

     container.innerHTML = filtered.map(video => {

  const media =
    video.platform === "twitch"
      ? `
        <iframe
          src="https://clips.twitch.tv/embed?clip=${video.id}&parent=${location.hostname}"
          allowfullscreen>
        </iframe>
      `
      : `
        <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg">
        <span class="play">▶</span>
      `;

  return `
    <div class="video-card"
      data-id="${video.id}"
      data-platform="${video.platform}">
     <div class="thumb ${video.platform === 'youtube' ? 'vertical' : ''}">
  ${media}
</div>
      <div class="info">
        <h3>${video.title}</h3>
        <span>${video.channel}</span>
      </div>
    </div>
  `;

}).join("");




      // modal click
      container.querySelectorAll(".video-card")
        .forEach(card => {

          card.onclick = () => {

           const id = card.dataset.id;
const platform = card.dataset.platform;

const modal =
  document.getElementById("videoModal");

const frame =
  document.getElementById("videoFrame");

const youtubeLink =
  document.getElementById("youtubeLink");

if (platform === "twitch") {

  frame.src =
    `https://clips.twitch.tv/embed?clip=${id}&parent=${location.hostname}`;

  youtubeLink.href =
    `https://www.twitch.tv/clip/${id}`;

} else {

  frame.src =
    `https://www.youtube.com/embed/${id}?autoplay=1`;

  youtubeLink.href =
    `https://www.youtube.com/watch?v=${id}`;

}

modal.classList.add("open");

          };

        });

    });

}


// tabs
document.querySelectorAll(".subcategory-tab")
  .forEach(tab => {

    tab.onclick = () => {

      document
        .querySelectorAll(".subcategory-tab")
        .forEach(t =>
          t.classList.remove("active")
        );

      tab.classList.add("active");

      loadTopClipadas(
        tab.dataset.subcategory
      );

    };

  });


// init
loadTopClipadas("shorts");

document.querySelector(".video-close").onclick = () => {

  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  modal.classList.remove("open");

  frame.src = "";

};

// fechar ao clicar fora do video-box
document.getElementById("videoModal").addEventListener("click", (e) => {

  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  // se clicou no fundo (fora da caixa)
  if (e.target === modal) {

    modal.classList.remove("open");
    frame.src = "";

  }

});


// fechar com tecla ESC
document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {

    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");

    if (modal.classList.contains("open")) {

      modal.classList.remove("open");
      frame.src = "";

    }

  }

});


