/* ========================= */
/* LER QUERY DA URL */
/* ========================= */
const params = new URLSearchParams(window.location.search);
const query = params.get("q");

const queryText = document.getElementById("searchQuery");
if (query) {
  queryText.innerText = `Pesquisa por: "${query}"`;
} else {
  queryText.innerText = "Sem pesquisa";
}

/* ========================= */
/* BASE DE DADOS DOS VÍDEOS */
/* ========================= */
const videos = [
  {
    title: "CRIME SIMULATOR #2 A FOMOS PRESOS PELA POLICIA...",
    channel: "Clips do Tiagovski",
    id: "-l1uQfw62b0",
    category: "gaming"
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
    category: "gaming"
  }
];

/* ========================= */
/* FILTRO */
/* ========================= */
const resultsContainer = document.getElementById("results");
const noResults = document.getElementById("noResults");

if (query) {
  const q = query.toLowerCase();

  const filtered = videos.filter(video =>
    video.title.toLowerCase().includes(q) ||
    video.channel.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";

    filtered.forEach(video => {
      resultsContainer.innerHTML += `
        <a href="${video.category}.html" class="video-card">
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
