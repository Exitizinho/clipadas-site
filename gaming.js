document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     THUMBNAILS YOUTUBE
  ============================ */
  document.querySelectorAll("[data-video]").forEach(card => {
    const url = card.dataset.video;
    let videoId = null;

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }
    if (!videoId) return;

    const img = card.querySelector("img");
    if (!img) return;

    const maxRes = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    const hqRes  = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    const testImg = new Image();
    testImg.src = maxRes;
    testImg.onload = () => img.src = maxRes;
    testImg.onerror = () => img.src = hqRes;

    img.loading = "lazy";
    img.decoding = "async";
  });

 /* ===========================
   SEARCH GAMING (TÍTULO + CANAL)
=========================== */
const input = document.querySelector(".global-search");
const cards = document.querySelectorAll(".gaming-card");
const noResults = document.getElementById("noResults");

function filterCards(query) {
  query = query.toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(card => {
    const title =
      card.querySelector("h3")?.textContent.toLowerCase() || "";
    let channel =
      card.querySelector(".info span")?.textContent.toLowerCase() || "";
    channel = channel.replace(/^by\s+/i, "").trim();

    const match =
      title.includes(query) || channel.includes(query);

    card.style.display = match ? "" : "none";
    if (match) visibleCount++;
  });

  if (visibleCount === 0) {
    noResults.style.display = "block";
    noResults.textContent = `❌ Nenhum vídeo encontrado para "${query}"`;
  } else {
    noResults.style.display = "none";
  }
}

if (input) {
  input.addEventListener("input", () => {
    filterCards(input.value);
  });
}

/* ===========================
   QUERY vinda da HOME (?q=)
=========================== */
const params = new URLSearchParams(window.location.search);
const q = params.get("q");

if (q && input) {
  input.value = q;
  filterCards(q);
}
  });



