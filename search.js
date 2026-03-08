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

  resultsBox.innerHTML = videos.map(video => `
  
    <div class="search-item" data-id="${video.video_id}">
      <img src="https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg">
      <div>
        <h4>${video.title}</h4>
        <span>${video.channel}</span>
      </div>
    </div>

  `).join("");

}
