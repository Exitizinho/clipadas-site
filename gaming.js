document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     THUMBNAILS YOUTUBE (QUALIDADE)
  =============================== */
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

  /* ===============================
     SEARCH GAMING
  =============================== */
  const searchInput = document.querySelector(".global-search");
  if (!searchInput) return; // página sem search

  const cards = document.querySelectorAll(".gaming-card");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.querySelector(".info h3")?.innerText.toLowerCase() || "";
      const channel = card.querySelector(".info span")?.innerText.toLowerCase() || "";

      const match =
        title.includes(query) ||
        channel.includes(query);

      card.style.display = match ? "" : "none";
    });
  });

