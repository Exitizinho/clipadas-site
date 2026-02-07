document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-video]").forEach(card => {
    const url = card.dataset.video;

    let videoId = null;

    // youtu.be/ID
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    // youtube.com/watch?v=ID
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }

    if (!videoId) return;

    const img = card.querySelector("img");
    img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    img.loading = "lazy";
  });
});
