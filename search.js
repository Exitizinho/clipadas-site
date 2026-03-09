const searchInput = document.querySelector(".global-search");

searchInput.addEventListener("input", async () => {

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

  showSearchResults(data);
});

function showSearchResults(videos) {

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

  const icons = {
    gaming: "🎮",
    react: "😂",
    entretenimento: "🎉",
    topclipadas: "📱",
    rage: "🔥"
  };

  const icon = icons[page] || "🎬";

  return `
  
    <div class="search-item" data-id="${video.video_id}">
      <img src="https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg">

      <div class="search-info">
        <h4>${icon} ${video.title}</h4>
        <span class="search-channel">${video.channel}</span>
      </div>

    </div>

  `;

}).join("");

  // 🔥 CLICK RESULTADO
  resultsBox.querySelectorAll(".search-item").forEach(item => {

    item.addEventListener("click", () => {

      const id = item.dataset.id;

      const modal = document.getElementById("videoModal");
      const frame = document.getElementById("videoFrame");
      const youtubeLink = document.getElementById("youtubeLink");

      frame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      youtubeLink.href = `https://www.youtube.com/watch?v=${id}`;

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
