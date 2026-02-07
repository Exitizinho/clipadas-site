document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-video]").forEach(card => {
    const url = card.dataset.video;
    let videoId = null;

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } 
    else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }

    if (!videoId) return;

    // procura SEMPRE o img correto
    const img =
      card.querySelector(".hero-bg") ||
      card.querySelector(".video-thumb");

    if (!img) return;

    // thumbnail de melhor qualidade possível
    img.src = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    img.loading = "lazy";

    // fallback automático se o maxres não existir
    img.onerror = () => {
      img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    };
  });
});
