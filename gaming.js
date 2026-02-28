document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     THUMBNAILS YOUTUBE
  ============================ */
  document.querySelectorAll("[data-id]").forEach(card => {

  const videoId = card.dataset.id;
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
     FUNÇÃO NORMALIZAR TEXTO
     - remove acentos
     - remove espaços
     - lowercase
  ============================ */
  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");
  }

  

/* ===========================
   MOBILE SIDEBAR (GAMING)
=========================== */
const menuBtn = document.querySelector(".mobile-menu-btn");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.body.classList.toggle("sidebar-open");
    sidebar.classList.toggle("open");
  });

  // clicar fora fecha
  document.addEventListener("click", (e) => {
    if (
      document.body.classList.contains("sidebar-open") &&
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      document.body.classList.remove("sidebar-open");
      sidebar.classList.remove("open");
    }
  });

  // clicar num link fecha
  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");
      sidebar.classList.remove("open");
    });
  });
}

  const modal = document.getElementById("videoModal");
const frame = document.getElementById("videoFrame");
const closeBtn = document.querySelector(".video-close");
const youtubeBtn = document.getElementById("youtubeLink");

/* ABRIR MODAL (funciona com vídeos dinâmicos) */
document.addEventListener("click", function (e) {

  const card = e.target.closest(".video-card");
  if (!card) return;

  e.preventDefault();

  const videoId = card.dataset.id;

  frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  youtubeBtn.href = `https://www.youtube.com/watch?v=${videoId}`;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
});

/* FECHAR MODAL */
function closeModal() {
  modal.classList.remove("open");
  frame.src = "";
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeModal);

/* clicar fora do vídeo */
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

/* ESC */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});



});

async function loadVideos(page, containerId) {

  const container = document.getElementById(containerId);

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("page", page)
    .order("date", { ascending: false })
    .limit(8);

  if (error) {
    console.error(error);
    container.innerHTML = "<p>Erro ao carregar vídeos</p>";
    return;
  }

  const videos = data;

  if (!videos.length) {
    container.innerHTML = "<p>Sem vídeos</p>";
    return;
  }

 container.innerHTML = videos.map(video => `
  <div class="video-card" data-id="${video.video_id}">
      <img src="https://i.ytimg.com/vi/${video.video_id}/maxresdefault.jpg">
      <div class="info">
        <h3>${video.title}</h3>
        <span>${video.channel}</span>
      </div>
    </div>
  `).join("");
  
   /* ===========================
     THUMBNAILS YOUTUBE
  ============================ */
  container.querySelectorAll("[data-id]").forEach(card => {

  const videoId = card.dataset.id;
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
}



