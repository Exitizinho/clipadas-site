document.querySelectorAll(".gaming-card").forEach(card => {
  const videoUrl = card.dataset.video;
  if (!videoUrl) return;

  const videoId = videoUrl.split("v=")[1]?.split("&")[0];
  if (!videoId) return;

  const img = card.querySelector("img");
  img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
});
