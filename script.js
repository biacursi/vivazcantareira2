// ==========================================
// 1. ANIMAÇÕES GSAP (Carregamento e Scroll)
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Animação inicial da Hero
gsap.from(".gsap-hero", {
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  delay: 0.2,
});

// Animação das seções ao rolar a página
gsap.utils.toArray(".gsap-section").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});

// ==========================================
// 2. DADOS E LÓGICA DA GALERIA
// ==========================================
const allPhotos = [
  // Categoria: O Apartamento
  {
    src: "./imagens/planta.png",
    category: "O Apartamento",
    caption: "Planta Smart Slim - Otimização de espaço",
  },
  {
    src: "./imagens/cozinha.jpg",
    category: "O Apartamento",
    caption: "Cozinha integrada com área de serviço",
  },
  {
    src: "./imagens/sala.jpg",
    category: "O Apartamento",
    caption: "Sala de estar ampla para dois ambientes",
  },
  {
    src: "./imagens/sala2.jpg",
    category: "O Apartamento",
    caption: "Iluminação natural privilegiada",
  },
  {
    src: "./imagens/quartocasal.jpg",
    category: "O Apartamento",
    caption: "Dormitório principal com piso laminado",
  },
  {
    src: "./imagens/quartocasal2.jpg",
    category: "O Apartamento",
    caption: "Espaço planejado para guarda-roupas",
  },
  {
    src: "./imagens/quarto2.jpg",
    category: "O Apartamento",
    caption: "Segundo dormitório versátil",
  },
  {
    src: "./imagens/quarto2-1.jpg",
    category: "O Apartamento",
    caption: "Ideal para home office ou quarto infantil",
  },
  {
    src: "./imagens/banheiro.jpg",
    category: "O Apartamento",
    caption: "Banheiro com revestimento moderno",
  },
  {
    src: "./imagens/banheiro2.jpg",
    category: "O Apartamento",
    caption: "Acabamentos de alta qualidade",
  },

  // Categoria: Lazer e Áreas Comuns
  {
    src: "./imagens/piscina.jpg",
    category: "Lazer e Condomínio",
    caption: "Piscina adulto e infantil climatizada",
  },
  {
    src: "./imagens/churrasqueira.jpg",
    category: "Lazer e Condomínio",
    caption: "Churrasqueira para momentos com amigos",
  },
  {
    src: "./imagens/academia.jpg",
    category: "Lazer e Condomínio",
    caption: "Fitness center completo e equipado",
  },
  {
    src: "./imagens/brinquedoteca.jpg",
    category: "Lazer e Condomínio",
    caption: "Brinquedoteca lúdica e segura",
  },
  {
    src: "./imagens/playground.jpg",
    category: "Lazer e Condomínio",
    caption: "Playground externo para as crianças",
  },
  {
    src: "./imagens/espaco-beleza.jpg",
    category: "Lazer e Condomínio",
    caption: "Espaço beleza dentro do condomínio",
  },
  {
    src: "./imagens/salao-festas.jpg",
    category: "Lazer e Condomínio",
    caption: "Salão de festas decorado",
  },
  {
    src: "./imagens/camarote.jpg",
    category: "Lazer e Condomínio",
    caption: "Camarote / Espaço Gourmet",
  },
  {
    src: "./imagens/teen.jpg",
    category: "Lazer e Condomínio",
    caption: "Espaço Teen e Salão de Jogos",
  },
  {
    src: "./imagens/market.jpg",
    category: "Lazer e Condomínio",
    caption: "Mini Market 24h para sua conveniência",
  },
  {
    src: "./imagens/market2.jpg",
    category: "Lazer e Condomínio",
    caption: "Praticidade sem sair de casa",
  },

  // Categoria: Infraestrutura e Serviços
  {
    src: "./imagens/hero-building.jpg",
    category: "Estrutura",
    caption: "Fachada moderna do Vivaz Cantareira 2",
  },
  {
    src: "./imagens/lavanderia.jpg",
    category: "Estrutura",
    caption: "Lavanderia coletiva OMO",
  },
];

function renderGallery() {
  const container = document.getElementById("gallery-content");
  if (!container) return;

  const categories = [...new Set(allPhotos.map((p) => p.category))];
  let html = "";

  categories.forEach((cat) => {
    html += `<h3 class="gallery-category-title">${cat}</h3>`;
    html += `<div class="gallery-grid">`;
    allPhotos.forEach((photo, globalIndex) => {
      if (photo.category === cat) {
        html += `<img src="${photo.src}" alt="${photo.caption || cat}" onclick="openCarousel(${globalIndex})" loading="lazy">`;
      }
    });
    html += `</div>`;
  });

  container.innerHTML = html;
}

// Modal Principal de Galeria
const galleryModal = document.getElementById("gallery-modal");

function openGallery(startIndex = null) {
  document.body.style.overflow = "hidden";
  galleryModal.classList.add("active");
  if (startIndex !== null) openCarousel(startIndex);
}

function closeGallery() {
  document.body.style.overflow = "auto";
  galleryModal.classList.remove("active");
}

// ==========================================
// 3. LÓGICA DO CARROSSEL (AJUSTADA)
// ==========================================
let currentIndex = 0;
const carouselModal = document.getElementById("carousel-modal");
const carouselImage = document.getElementById("carousel-image");
const counterText = document.getElementById("carousel-counter");
const carouselCaption = document.getElementById("carousel-caption"); // Capturando o elemento de legenda

function openCarousel(index) {
  currentIndex = index;
  updateCarouselImage();
  carouselModal.classList.add("active");
}

function closeCarousel() {
  carouselModal.classList.remove("active");
}

function updateCarouselImage() {
  const currentPhoto = allPhotos[currentIndex];

  // Atualiza Imagem
  carouselImage.src = currentPhoto.src;

  // Atualiza Contador
  counterText.innerText = `${currentIndex + 1} / ${allPhotos.length}`;

  // Atualiza Legenda (Se não houver legenda, limpa o texto)
  if (carouselCaption) {
    carouselCaption.innerText = currentPhoto.caption || "";
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % allPhotos.length;
  updateCarouselImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
  updateCarouselImage();
}

// Controles pelo teclado
document.addEventListener("keydown", (e) => {
  if (carouselModal && carouselModal.classList.contains("active")) {
    if (e.key === "Escape") closeCarousel();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  } else if (
    galleryModal &&
    galleryModal.classList.contains("active") &&
    e.key === "Escape"
  ) {
    closeGallery();
  }
});

// Menu Mobile e Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();

  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      const isVisible = navLinks.style.display === "flex";
      navLinks.style.display = isVisible ? "none" : "flex";

      if (!isVisible) {
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "60px";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.background = "white";
        navLinks.style.padding = "20px";
        navLinks.style.boxShadow = "0 10px 10px rgba(0,0,0,0.1)";
      }
    });
  }
});
