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
     SEARCH GAMING (TÍTULO + CANAL)
  ============================ */
  const input = document.querySelector(".global-search");
  const cards = document.querySelectorAll(".gaming-card");
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

  /* ===========================
   VIDEO MODAL PLAYER
=========================== */
const modal = document.getElementById("videoModal");
const frame = document.getElementById("videoFrame");
const ytLink = document.getElementById("youtubeLink");
const closeBtn = document.querySelector(".video-close");

document.querySelectorAll("[data-video]").forEach(card => {
  card.addEventListener("click", () => {
    const url = card.dataset.video;
    const videoId = url.includes("watch?v=")
      ? url.split("watch?v=")[1].split("&")[0]
      : "";

    frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    ytLink.href = url;
    modal.classList.add("open");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("open");
  frame.src = "";
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("open");
    frame.src = "";
  }
});


});



