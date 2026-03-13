let searchTimeout;

const searchInput = document.querySelector(".global-search");

searchInput.addEventListener("input", () => {

  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {

    const query = searchInput.value.trim();

    if (query.length < 2) return;

    const { data, error } = await supabaseClient
      .from("videos")
      .select("*")
      .or(`title.ilike.%${query}%,channel.ilike.%${query}%`)
      .limit(12);

    if (error) {
      console.error(error);
      return;
    }

    showSearchResults(data, query);

  }, 300);

});

function highlight(text, query){

  if(!query) return text;

  const regex = new RegExp(`(${query})`, "gi");

  return text.replace(regex,'<span class="search-highlight">$1</span>');

}

function showSearchResults(videos, query) {

  let resultsBox = document.querySelector(".search-results");

  if (!resultsBox) {
    resultsBox = document.createElement("div");
    resultsBox.className = "search-results";
    document.querySelector(".search-box").appendChild(resultsBox);
  }

  if (!videos.length) {
    resultsBox.innerHTML = "<p>Sem resultados</p>";
    return;
  }

  resultsBox.innerHTML = videos.map(video => {

    const page = video.page || "";
    const platform = video.platform || "youtube";

    const icons = {
      gaming: "🎮",
      react: "😂",
      entretenimento: "🎉",
      topclipadas: "🎬",
      rage: "🔥"
    };

    const pageIcon = icons[page] || "🎬";

    return `
    
      <div class="search-item"
           data-id="${video.video_id}"
           data-platform="${platform}">

        <img src="https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg">

        <div class="search-info">

          <div class="search-title">
            <span class="category-icon">${pageIcon}</span>
            <h4>${highlight(video.title, query)}</h4>
          </div>

          <span class="search-channel">
            ${highlight(video.channel, query)}
          </span>

        </div>

      </div>
    `;

  }).join("");

  // CLICK RESULTADO
  resultsBox.querySelectorAll(".search-item").forEach(item => {

    item.addEventListener("click", () => {

      const id = item.dataset.id;
      const platform = item.dataset.platform;

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

      resultsBox.innerHTML = "";
      document.querySelector(".global-search").value = "";

    });

  });

}

document.addEventListener("click", (e) => {

  if (!e.target.closest(".search-box")) {

    const results = document.querySelector(".search-results");

    if (results) {
      results.innerHTML = "";
    }

  }

});
