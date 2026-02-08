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
  const searchInput = document.getElementById("gamingSearch");
  const cards = document.querySelectorAll(".gaming-card");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
      const creator = card.querySelector("span")?.textContent.toLowerCase() || "";

      if (title.includes(value) || creator.includes(value)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });

});

