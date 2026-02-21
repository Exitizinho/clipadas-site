let currentSubcategory = "shorts";

let currentVideos = [];
let currentIndex = 0;

function loadTopClipadas(subcategory) {

  const container = document.getElementById("topclipadasContainer");

container.classList.remove("shorts-grid", "twitch-grid");
container.classList.add(subcategory === "shorts" ? "shorts-grid" : "twitch-grid");

  fetch("videos.json")
    .then(res => res.json())
    .then(videos => {

      currentVideos = videos.filter(video =>
  video.page === "topclipadas" &&
  video.subcategory === subcategory
);

const filtered = currentVideos;

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
        <img src="https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg">
        <span class="play">▶</span>
      `;

 return `
  <div class="video-card ${video.platform === 'youtube' ? 'short-card' : 'twitch-card'}"
  data-id="${video.id}"
  data-platform="${video.platform}">
   <div class="thumb ${video.subcategory === 'shorts' ? 'vertical' : ''}">
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
            currentIndex = currentVideos.findIndex(v => v.id === id);

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
  `https://clips.twitch.tv/${id}`;

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

function changeVideo(direction) {

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = currentVideos.length - 1;
  }

  if (currentIndex >= currentVideos.length) {
    currentIndex = 0;
  }

  const video = currentVideos[currentIndex];

  const frame = document.getElementById("videoFrame");
  const youtubeLink = document.getElementById("youtubeLink");

  if (video.platform === "twitch") {

    frame.src =
      `https://clips.twitch.tv/embed?clip=${video.id}&parent=${location.hostname}`;

    youtubeLink.href =
      `https://clips.twitch.tv/${video.id}`;

  } else {

    frame.src =
      `https://www.youtube.com/embed/${video.id}?autoplay=1`;

    youtubeLink.href =
      `https://www.youtube.com/watch?v=${video.id}`;
  }
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

  if (e.key === "ArrowDown") changeVideo(1);
if (e.key === "ArrowUp") changeVideo(-1);

  if (e.key === "Escape") {

    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");

    if (modal.classList.contains("open")) {

      modal.classList.remove("open");
      frame.src = "";

    }

  }

  });

/* ===========================
   MOBILE SIDEBAR (TOPCLIPADAS)
=========================== */

 const menuBtn = document.querySelector(".mobile-menu-btn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.body.classList.toggle("sidebar-open");
    sidebar.classList.toggle("open");
  });

  // clicar fora fecha
  document.addEventListener("click", (e) => {
    if (
      document.body.classList.contains("sidebar-open") &&
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      document.body.classList.remove("sidebar-open");
      sidebar.classList.remove("open");
    }
  });

  // clicar num link fecha
  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");
      sidebar.classList.remove("open");
    });
  });
}

document.querySelector(".modal-down").onclick = () => {
  changeVideo(1);
};

document.querySelector(".modal-up").onclick = () => {
  changeVideo(-1);
};

let scrollLocked = false;

document.addEventListener("wheel", (e) => {

  const modal = document.getElementById("videoModal");

  // Só funciona se modal estiver aberto
  if (!modal.classList.contains("open")) return;

  // evita spam de scroll
  if (scrollLocked) return;

  scrollLocked = true;

  if (e.deltaY > 0) {
    // scroll down
    changeVideo(1);
  } else {
    // scroll up
    changeVideo(-1);
  }

  // pequeno delay para não trocar 10 vídeos de uma vez
  setTimeout(() => {
    scrollLocked = false;
  }, 500);

});
