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
   SEARCH GLOBAL (HOME + GAMING)
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = document.querySelectorAll(".global-search");

  if (!searchInputs.length) return;

  // Apanha cards da HOME e da GAMING
  const cards = document.querySelectorAll(".gaming-card, .video-card");

  searchInputs.forEach(input => {
    input.addEventListener("input", () => {
      const query = input.value.toLowerCase().trim();

      cards.forEach(card => {
        const titleEl = card.querySelector("h3");
        const channelEl = card.querySelector(".info span");

        // ignora cards sem texto (iframes, etc)
        if (!titleEl && !channelEl) return;

        const title = titleEl ? titleEl.textContent.toLowerCase() : "";
        const channel = channelEl ? channelEl.textContent.toLowerCase() : "";

        const match =
          title.includes(query) ||
          channel.includes(query);

        card.style.display = match ? "" : "none";
      });
    });
  });
});



});

