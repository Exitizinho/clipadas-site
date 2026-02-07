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
    if (!img) return;

    // URLs das thumbnails
    const maxRes = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    const hqRes  = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    // Tenta carregar MAXRES primeiro
    const testImg = new Image();
    testImg.src = maxRes;

    testImg.onload = () => {
      // maxres existe
      img.src = maxRes;
    };

    testImg.onerror = () => {
      // fallback para hq
      img.src = hqRes;
    };

    img.loading = "lazy";
    img.decoding = "async";
  });
});

