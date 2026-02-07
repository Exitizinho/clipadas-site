document.querySelectorAll(".gaming-card").forEach(card => {
  const url = card.dataset.video;

  let videoId = null;

  if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1];
  }

  if (videoId) {
    const img = card.querySelector("img");
    img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
});
