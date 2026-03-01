document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     THUMBNAILS YOUTUBE
  ============================ */
  document.querySelectorAll("[data-video]").forEach(card => {
    const url = card.dataset.video;
    let videoId = null;

document.addEventListener("DOMContentLoaded", () => {


  
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
   MOBILE SIDEBAR (RAGE)
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

  const card = e.target.closest(".video-card, .hero-card");
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

  const { data, error } = await supabaseClient
    .from("videos")
    .select("*")
    .eq("page", page)
    .eq("featured", false)
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
        <h4>${video.title}</h4>
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

  loadrageHero();
  
}

async function loadrageHero() {

  const { data, error } = await supabaseClient
    .from("videos")
    .select("*")
    .eq("page", "rage")
    .eq("featured", true)
    .order("date", { ascending: false })
    .limit(1);

  if (error || !data.length) return;

  const video = data[0];

  const hero = document.getElementById("rageHero");
  const title = hero.querySelector(".hero-title");
  const channel = hero.querySelector(".hero-channel");
  const thumb = hero.querySelector(".hero-bg");
  const button = hero.querySelector(".hero-btn");

  title.textContent = video.title;
  channel.textContent = video.channel;
  thumb.src = `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`;

  hero.dataset.id = video.video_id;
  button.dataset.id = video.video_id;
}

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
     SEARCH RAGE (TÍTULO + CANAL)
  ============================ */
  const input = document.querySelector(".global-search");
  const cards = document.querySelectorAll(".rage-card");
  const noResults = document.getElementById("noResults");

  function filterCards(query) {
    const normalizedQuery = normalizeText(query);
    let visibleCount = 0;

    cards.forEach(card => {
      const title =
        card.querySelector("h3")?.textContent || "";
      let channel =
        card.querySelector(".info span")?.textContent || "";

      channel = channel.replace(/^by\s+/i, "");

      const searchableText =
        normalizeText(title + " " + channel);

      const match = searchableText.includes(normalizedQuery);

      card.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });

    if (visibleCount === 0 && normalizedQuery !== "") {
      noResults.style.display = "block";
      noResults.textContent = `😕 Nenhum vídeo encontrado para "${query}"`;
    } else {
      noResults.style.display = "none";
    }
  }

  if (input) {
    input.addEventListener("input", () => {
      filterCards(input.value);
    });
  }

  /* ===========================
     QUERY vinda da HOME (?q=)
  ============================ */
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");

  if (q && input) {
    input.value = q;
    filterCards(q);
  }

/* ===========================
   MOBILE SIDEBAR (RAGE)
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

/* TODOS os cards + hero */
document.querySelectorAll("[data-video]").forEach(card => {
  card.addEventListener("click", e => {
    e.preventDefault(); // 🚫 impede ir ao YouTube
    e.stopPropagation();

    const url = card.dataset.video;
    const videoId = url.split("v=")[1];

    frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    youtubeBtn.href = url;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });
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
