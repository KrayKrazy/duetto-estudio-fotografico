/**
 * DUETTO ESTÚDIO FOTOGRÁFICO — MOTOR INTERATIVO & CONVERSÃO WHATSAPP
 * Dois Olhares, Um Só Clique • Hub Business & Prosa • Goiânia - GO
 */

// Catálogo Completo com as 8 Fotos Reais do Acervo
const fotosCatalogo = [
  {
    id: 1,
    file: 'foto-01.jpg',
    thumb: 'foto-01.jpg',
    category: 'videomaker',
    categoryLabel: 'Por Trás do Duetto',
    ratioType: 'Retrato Vertical (9:16) • Sem Cortes',
    title: 'Dois Olhares, Um Só Clique: Fotógrafa & Videomaker',
    desc: 'As duas irmãs fundadoras unindo câmera profissional e captação mobile 4K para criar experiências completas e autênticas.',
    aspectRatio: '9:16'
  },
  {
    id: 2,
    file: 'foto-02.jpg',
    thumb: 'foto-02.jpg',
    category: 'videomaker',
    categoryLabel: 'Produção de Conteúdo & Reels',
    ratioType: 'Retrato Vertical (9:16) • Sem Cortes',
    title: 'Gravações Dinâmicas para Redes Sociais & Histórias Reais',
    desc: 'Criação de conteúdo estratégico com áudio sem fio de lapela, roteiro e dinâmica pronta para engajar no Instagram e TikTok.',
    aspectRatio: '9:16'
  },
  {
    id: 3,
    file: 'foto-03.jpg',
    thumb: 'foto-03.jpg',
    category: 'moda',
    categoryLabel: 'Editorial & Conceito',
    ratioType: 'Retrato Editorial (4:5) • Sem Cortes',
    title: 'Retrato Editorial com Rosa Vermelha & Elegância Sensível',
    desc: 'Iluminação precisa e direção leve para transmitir mistério, sofisticação e a personalidade única de cada cliente.',
    aspectRatio: '4:5'
  },
  {
    id: 4,
    file: 'foto-04.jpg',
    thumb: 'foto-04.jpg',
    category: 'corporativo',
    categoryLabel: 'Posicionamento Profissional',
    ratioType: 'Retrato Corporativo (4:5) • Sem Cortes',
    title: 'Retrato Corporativo para Especialistas da Beleza & Negócios',
    desc: 'Posicionamento visual de alta autoridade para especialistas, cabeleireiras e empresárias transmitirem credibilidade e prestígio.',
    aspectRatio: '4:5'
  },
  {
    id: 5,
    file: 'foto-05.jpg',
    thumb: 'foto-05.jpg',
    category: 'moda',
    categoryLabel: 'Editorial Country & Agro Chic',
    ratioType: 'Retrato Editorial (3:4) • Sem Cortes',
    title: 'Ensaio Temático Country Chic com Iluminação de Alto Contraste',
    desc: 'Produção com feno, iluminação rim light circular e estilo rústico contemporâneo valorizando o figurino e a postura.',
    aspectRatio: '3:4'
  },
  {
    id: 6,
    file: 'foto-06.jpg',
    thumb: 'foto-06.jpg',
    category: 'moda',
    categoryLabel: 'Alta Moda & Conceito',
    ratioType: 'Retrato Vertical (9:16) • Sem Cortes',
    title: 'Alta Moda Minimalista: Luz Esculpida em Fundo Infinito',
    desc: 'Direção de arte editorial inspirada em revistas de moda internacionais com contraste dramático de luz e sombra.',
    aspectRatio: '9:16'
  },
  {
    id: 7,
    file: 'foto-07.jpg',
    thumb: 'foto-07.jpg',
    category: 'beauty',
    categoryLabel: 'Beauty & Close-up de Luxo',
    ratioType: 'Close-Up Beauty (4:5) • Sem Cortes',
    title: 'Macro Beauty Retouch: Maquiagem, Pele & Joias em Foco',
    desc: 'Tratamento de pele high-end preservando texturas naturais com destaque sublime para maquiagem, unhas e acessórios.',
    aspectRatio: '4:5'
  },
  {
    id: 8,
    file: 'foto-08.jpg',
    thumb: 'foto-08.jpg',
    category: 'corporativo',
    categoryLabel: 'Retrato Executivo Feminino',
    ratioType: 'Retrato Executivo (3:4) • Sem Cortes',
    title: 'Autoridade & Sofisticação no Hub Business & Prosa',
    desc: 'Posicionamento corporativo de alto padrão para líderes, médicas, advogadas e gestoras no Setor Oeste, Goiânia.',
    aspectRatio: '3:4'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initCinematicSlider();
  initGalleryFilter();
  initLightbox();
  initSimulator();
  initFaq();
  initMobileDrawer();
});

/* ==========================================================================
   SLIDER CINEMATOGRÁFICO ZERO-CROP
   ========================================================================== */
function initCinematicSlider() {
  const stage = document.getElementById('sliderStage');
  const img = document.getElementById('sliderImg');
  const backdrop = document.getElementById('sliderBackdrop');
  const counter = document.getElementById('sliderCounter');
  const ratioBadge = document.getElementById('sliderRatioBadge');
  const cat = document.getElementById('sliderCat');
  const title = document.getElementById('sliderTitle');
  const desc = document.getElementById('sliderDesc');
  const cotarBtn = document.getElementById('sliderCotarBtn');
  const zoomBtn = document.getElementById('sliderZoomBtn');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const thumbsContainer = document.getElementById('sliderThumbs');
  const progressBar = document.getElementById('sliderProgress');

  if (!stage || !img || !fotosCatalogo.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  let progressInterval = null;
  const slideDuration = 6000;
  let progressElapsed = 0;
  let isPaused = false;

  // Gerar Miniaturas no Scrubber
  thumbsContainer.innerHTML = '';
  fotosCatalogo.forEach((foto, idx) => {
    const thumbItem = document.createElement('div');
    thumbItem.className = `slider__thumb-item ${idx === 0 ? 'active' : ''}`;
    thumbItem.setAttribute('data-index', idx);
    thumbItem.setAttribute('aria-label', `Ver foto ${foto.id}: ${foto.title}`);
    thumbItem.innerHTML = `<img src="assets/thumbs/${foto.thumb}" alt="${foto.title}" loading="lazy">`;
    thumbItem.addEventListener('click', () => {
      goToSlide(idx);
      resetAutoplay();
    });
    thumbsContainer.appendChild(thumbItem);
  });

  function updateSlide(index) {
    currentIndex = index;
    const foto = fotosCatalogo[currentIndex];

    // Transição suave
    img.style.opacity = '0';
    img.style.transform = 'scale(0.97)';

    setTimeout(() => {
      img.src = `assets/img/${foto.file}`;
      img.alt = foto.title;
      backdrop.style.backgroundImage = `url('assets/thumbs/${foto.thumb}')`;

      // Atualizar textos e badges
      counter.textContent = `Foto ${String(foto.id).padStart(2, '0')} / ${String(fotosCatalogo.length).padStart(2, '0')}`;
      ratioBadge.innerHTML = `<i class="fa-solid fa-expand text-xs"></i> ${foto.ratioType}`;
      cat.textContent = foto.categoryLabel;
      title.textContent = foto.title;
      desc.textContent = foto.desc;

      // Link WhatsApp contextual
      const msg = `Olá, meninas do Duetto! Estive no site e adorei a foto #${foto.id} ("${foto.title}"). Gostaria de um orçamento para um ensaio nesse estilo!`;
      cotarBtn.href = `https://wa.me/5562991230095?text=${encodeURIComponent(msg)}`;

      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }, 180);

    // Sincronizar miniaturas ativas
    const thumbItems = thumbsContainer.querySelectorAll('.slider__thumb-item');
    thumbItems.forEach((t, i) => {
      if (i === currentIndex) {
        t.classList.add('active');
        t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        t.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    if (index < 0) index = fotosCatalogo.length - 1;
    if (index >= fotosCatalogo.length) index = 0;
    updateSlide(index);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Controles de Clique
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  // Botão de Zoom abre o Lightbox na foto atual
  if (zoomBtn) {
    zoomBtn.addEventListener('click', () => {
      window.openDuettoLightbox(currentIndex);
    });
  }

  // Teclado (Setas Esquerda e Direita quando a seção estiver visível)
  window.addEventListener('keydown', (e) => {
    if (document.getElementById('lightboxModal')?.classList.contains('active')) return;
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
    if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
  });

  // Touch Swipe para Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isPaused = true;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    isPaused = false;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
      resetAutoplay();
    }
  }

  // Autoplay com Barra de Progresso
  function startAutoplay() {
    progressElapsed = 0;
    if (progressBar) progressBar.style.width = '0%';

    progressInterval = setInterval(() => {
      if (!isPaused) {
        progressElapsed += 50;
        const pct = (progressElapsed / slideDuration) * 100;
        if (progressBar) progressBar.style.width = `${Math.min(pct, 100)}%`;

        if (progressElapsed >= slideDuration) {
          nextSlide();
          progressElapsed = 0;
          if (progressBar) progressBar.style.width = '0%';
        }
      }
    }, 50);
  }

  function resetAutoplay() {
    clearInterval(progressInterval);
    progressElapsed = 0;
    if (progressBar) progressBar.style.width = '0%';
    startAutoplay();
  }

  // Pausar no Hover do Mouse
  stage.addEventListener('mouseenter', () => { isPaused = true; });
  stage.addEventListener('mouseleave', () => { isPaused = false; });

  // Inicializar primeiro slide
  updateSlide(0);
  startAutoplay();
}

/* ==========================================================================
   FILTROS DA GALERIA MASONRY
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'inline-block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   MODAL LIGHTBOX EM TELA CHEIA (ZERO-CROP)
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!modal || !img) return;

  let activeIndex = 0;

  function showImage(index) {
    if (index < 0) index = fotosCatalogo.length - 1;
    if (index >= fotosCatalogo.length) index = 0;
    activeIndex = index;

    const foto = fotosCatalogo[activeIndex];
    img.src = `assets/img/${foto.file}`;
    img.alt = foto.title;
    caption.innerHTML = `
      <span class="text-xs uppercase tracking-wider text-[#D4A359] font-bold block">${foto.categoryLabel} • ${foto.ratioType}</span>
      <h3 class="text-white font-serif text-lg font-bold">${foto.title}</h3>
      <p class="text-[#A89F96] text-xs max-w-xl mx-auto mt-1">${foto.desc}</p>
    `;
  }

  window.openDuettoLightbox = function(index) {
    showImage(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index') || '0', 10);
      window.openDuettoLightbox(idx);
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', () => showImage(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(activeIndex + 1));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showImage(activeIndex - 1);
    if (e.key === 'ArrowRight') showImage(activeIndex + 1);
  });
}

/* ==========================================================================
   SIMULADOR DE ORÇAMENTO EXPRESS (WHATSAPP)
   ========================================================================== */
function initSimulator() {
  const form = document.getElementById('simuladorForm');
  const resultBtn = document.getElementById('simuladorBtn');

  if (!form || !resultBtn) return;

  function updateWhatsAppLink() {
    const servico = form.querySelector('input[name="sim_servico"]:checked')?.value || 'Posicionamento Corporativo';
    const local = form.querySelector('select[name="sim_local"]')?.value || 'Estúdio Hub Business & Prosa (Setor Oeste)';
    const prazo = form.querySelector('select[name="sim_prazo"]')?.value || 'Próximos 15 a 30 dias';
    const extras = Array.from(form.querySelectorAll('input[name="sim_extras"]:checked')).map(c => c.value);

    let msg = `Olá, meninas do Duetto Estúdio Fotográfico! Vim pelo site e montei uma proposta personalizada:\n\n`;
    msg += `✨ *Serviço Desejado:* ${servico}\n`;
    msg += `📍 *Local / Cenário:* ${local}\n`;
    msg += `📅 *Previsão de Data:* ${prazo}\n`;
    if (extras.length > 0) {
      msg += `🎁 *Desejo Incluir:* ${extras.join(', ')}\n`;
    }
    msg += `\nPoderiam me enviar os detalhes dos pacotes e a disponibilidade de agenda para Goiânia? Muito obrigado(a)!`;

    resultBtn.href = `https://wa.me/5562991230095?text=${encodeURIComponent(msg)}`;
  }

  form.addEventListener('change', updateWhatsAppLink);
  updateWhatsAppLink();
}

/* ==========================================================================
   FAQ ACORDEÃO
   ========================================================================== */
function initFaq() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Fechar outros
      faqQuestions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.classList.add('hidden');
          const otherIcon = otherBtn.querySelector('.faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   MENU DRAWER MOBILE
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  links.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}
