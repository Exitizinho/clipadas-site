let currentSubcategory = "shorts";
let currentVideos = [];
let currentIndex = 0;

async function loadTopClipadas(subcategory) {

  currentSubcategory = subcategory;

  const container = document.getElementById("topclipadasContainer");

  container.classList.remove("shorts-grid", "twitch-grid");
  container.classList.add(
    subcategory === "shorts" ? "shorts-grid" : "twitch-grid"
  );

  const { data, error } = await supabaseClient
    .from("videos")
    .select("*")
    .eq("page", "topclipadas")
    .eq("subcategory", subcategory)
    .order("date", { ascending: false });

  if (error || !data.length) {
    container.innerHTML = "<p>Sem clips ainda</p>";
    return;
  }

  currentVideos = data;

  container.innerHTML = data.map(video => {

    const media =
      video.platform === "twitch"
        ? `
          <iframe
            src="https://clips.twitch.tv/embed?clip=${video.video_id}&parent=${location.hostname}"
            allowfullscreen>
          </iframe>
        `
        : `
          <img src="https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg">
          <span class="play">▶</span>
        `;

    return `
      <div class="video-card ${video.platform === 'youtube' ? 'short-card' : 'twitch-card'}"
        data-id="${video.video_id}"
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

  activateModalClicks();
}

function activateModalClicks() {

  const container = document.getElementById("topclipadasContainer");

  container.querySelectorAll(".video-card").forEach(card => {

    card.onclick = () => {

      const id = card.dataset.id;
      const platform = card.dataset.platform;

      currentIndex = currentVideos.findIndex(v => v.video_id === id);

      const modal = document.getElementById("videoModal");
      const frame = document.getElementById("videoFrame");
      const youtubeLink = document.getElementById("youtubeLink");

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
      `https://clips.twitch.tv/embed?clip=${video.video_id}&parent=${location.hostname}`;

    youtubeLink.href =
      `https://clips.twitch.tv/${video.video_id}`;

  } else {

    frame.src =
      `https://www.youtube.com/embed/${video.video_id}?autoplay=1`;

    youtubeLink.href =
      `https://www.youtube.com/watch?v=${video.video_id}`;
  }
}

document.querySelectorAll(".subcategory-tab").forEach(tab => {

  tab.onclick = () => {

    document.querySelectorAll(".subcategory-tab")
      .forEach(t => t.classList.remove("active"));

    tab.classList.add("active");

    loadTopClipadas(tab.dataset.subcategory);
  };
});

document.querySelector(".video-close").onclick = () => {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  modal.classList.remove("open");
  frame.src = "";
};

document.getElementById("videoModal").addEventListener("click", e => {
  if (e.target.id === "videoModal") {
    e.target.classList.remove("open");
    document.getElementById("videoFrame").src = "";
  }
});

document.addEventListener("keydown", e => {

  if (e.key === "ArrowDown") changeVideo(1);
  if (e.key === "ArrowUp") changeVideo(-1);

  if (e.key === "Escape") {
    const modal = document.getElementById("videoModal");
    if (modal.classList.contains("open")) {
      modal.classList.remove("open");
      document.getElementById("videoFrame").src = "";
    }
  }
});

// INIT
loadTopClipadas("shorts");
