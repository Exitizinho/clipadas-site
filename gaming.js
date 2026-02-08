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
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q")?.toLowerCase().trim();

  if (!q) return;

  const input = document.querySelector(".global-search");
  if (input) input.value = q;

  const cards = document.querySelectorAll(".gaming-card");

  cards.forEach(card => {
    const title =
      card.querySelector("h3")?.textContent.toLowerCase() || "";
    const channel =
      card.querySelector(".info span")?.textContent.toLowerCase() || "";

    card.style.display =
      title.includes(q) || channel.includes(q)
        ? ""
        : "none";
  });
});


});

