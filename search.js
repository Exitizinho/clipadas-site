/* ========================= */
/* LER QUERY DA URL */
/* ========================= */
const params = new URLSearchParams(window.location.search);
const query = params.get("q");

document.getElementById("searchQuery").innerText =
  query ? `Pesquisa por: "${query}"` : "Sem pesquisa";

/* ========================= */
/* BASE DE DADOS DOS VÍDEOS */
/* (tu depois aumentas isto) */
/* ========================= */
const videos = [
  {
    title: "CRIME SIMULATOR #2 A FOMOS PRESOS PELA POLICIA...",
    channel: "Clips do Tiagovski",
    id: "-l1uQfw62b0",
    category: "rage"
  },
  {
    title: "EAFC 26 MODO CARREIRA #40 - CRISE!!!!!",
    channel: "RicFazeres",
    id: "QwT357zVTd0",
    category: "gaming"
  },
  {
    title: "É GIGANTE E PERIGOSA - CAIRN - Parte 2",
    channel: "RicFazeres",
    id: "ymwtawaxXXE",
    category: "rage"
  }
];

/* ========================= */
/* FILTRO */
/* ========================= */
const resultsContainer = document.getElementById("results");
const noResults = document.getElementById("noResults");

if (query) {
  const filtered = videos.filter(video =>
    video.title.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    noResults.style.display = "block";
  } else {
    filtered.forEach(video => {
      resultsContainer.innerHTML += `
        <a href="${video.category}.html"
           class="rage-card">
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
  }
}
</script>

</body>
</html>
