const SAMPLE_DATA = {
  category: 'Motocross / Enduro',
  year: 2026,
  sourceUrl: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro.html',
  models: [
    {
      name: 'KX450',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_320467_26KX450M_201GN1DRF3CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KX450_2026.html',
      features: ['Factory-style engine components & tuning', 'Factory-style chassis tuning', 'Advanced tech at your fingertips'],
      isNew: false,
    },
    {
      name: 'KX450X',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_320471_26KX450N_201GN1DRF3CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KX450X_2026.html',
      features: ['Factory-style engine components & tuning', 'Factory-style chassis advantage', 'Advanced tech at your fingertips'],
      isNew: false,
    },
    {
      name: 'KX250',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_320462_26KX252E_201GN1DRF3CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KX250_2026.html',
      features: ['Even more powerful engine', 'Slim, ergonomic bodywork', 'Fine-tuned suspension & brake components'],
      isNew: false,
    },
    {
      name: 'KX250X',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_320464_26KX252F_201GN1DRF3CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KX250X_2026.html',
      features: ['Factory-style engine components & tuning', 'Factory-style chassis advantage', 'Advanced tech at your fingertips'],
      isNew: false,
    },
    {
      name: 'KX112',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_326633_26KX112B_201AGN1DRF3CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KX112_2026.html',
      features: ['Lightweight competition machine', 'Race-ready performance', 'New 2-stroke power'],
      isNew: true,
    },
    {
      name: 'KX85 L',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_326691_26KX85F_201AGN1DRF3CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KX85_II_2026.html',
      features: ['Advanced cooling system', 'More efficient transmission', '6-position handlebar'],
      isNew: true,
    },
    {
      name: 'KX85',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_326677_26KX85E_201AGN1DRF3CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KX85_I_2026.html',
      features: ['New design', 'Advanced cooling system', 'Factory-inspired styling'],
      isNew: true,
    },
    {
      name: 'KX65',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_320428_26KX65C_201GN1DRF1CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KX65_2026.html',
      features: ['Power & technology to train winners', 'Effective brake pads', 'New graphics'],
      isNew: false,
    },
    {
      name: 'KLX230R S',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_320455_26KLX232P_271GN1DRF3CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KLX230R_S_2026.html',
      features: ['Versatile trail performance', 'Electric start convenience', 'Fuel-injected reliability'],
      isNew: false,
    },
    {
      name: 'KLX140R',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_320436_26KLX140A_271GN1DRF1CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KLX140R_2026.html',
      features: ['Smooth power delivery', 'Reliable braking system', 'Easy to handle'],
      isNew: false,
    },
    {
      name: 'KLX110R',
      year: 2026,
      image: 'https://www.kawasaki.ro/content/dam/products/pim/studio/Resource_320434_26KLX110C_271GN1DRF1CG_A.jpg',
      url: 'https://www.kawasaki.ro/ro_ro/Motorcycles/Motocross-Enduro/KLX110R_2026.html',
      features: ['Compact, reliable engine', 'Factory styling', 'Easy to handle'],
      isNew: false,
    },
  ],
};

function createCard(model, bridge) {
  const card = document.createElement('div');
  card.className = 'carousel-card';

  const badge = model.isNew ? '<span class="card-badge">NEW</span>' : '';

  card.innerHTML = `
    <div class="card-image-wrap">
      ${badge}
      <img src="${model.image}" alt="${model.name}" loading="lazy" />
    </div>
    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title">${model.name}</h3>
        <span class="card-year">${model.year}</span>
      </div>
      <ul class="card-features">
        ${model.features.map((f) => `<li>${f}</li>`).join('')}
      </ul>
      <div class="card-actions">
        <button class="btn-details">Discover</button>
        <button class="btn-compare">Compare</button>
      </div>
    </div>
  `;

  const detailsBtn = card.querySelector('.btn-details');
  detailsBtn.addEventListener('click', () => {
    if (bridge && bridge.isConnected) {
      bridge.sendMessage(`Tell me more about the Kawasaki ${model.name} ${model.year}`);
    } else {
      window.open(model.url, '_blank');
    }
  });

  const compareBtn = card.querySelector('.btn-compare');
  compareBtn.addEventListener('click', () => {
    if (bridge && bridge.isConnected) {
      bridge.sendMessage(`Compare the Kawasaki ${model.name} with similar enduro models`);
    }
  });

  return card;
}

function renderUI(block, data, bridge) {
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  // Header
  const header = document.createElement('div');
  header.className = 'carousel-header';
  header.innerHTML = `
    <div class="header-text">
      <h2>${data.category || 'Kawasaki Enduro'}</h2>
      <p class="header-subtitle">${data.year || 2026} Lineup &mdash; ${data.models.length} models</p>
    </div>
    <div class="carousel-nav">
      <button class="nav-btn nav-prev" aria-label="Previous">&#8249;</button>
      <button class="nav-btn nav-next" aria-label="Next">&#8250;</button>
    </div>
  `;
  wrapper.appendChild(header);

  // Track
  const track = document.createElement('div');
  track.className = 'carousel-track';

  data.models.forEach((model) => {
    track.appendChild(createCard(model, bridge));
  });

  wrapper.appendChild(track);

  // Dots
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'carousel-dots';
  wrapper.appendChild(dotsWrap);

  block.appendChild(wrapper);

  // Carousel logic
  let currentIndex = 0;

  function getVisibleCount() {
    const w = block.offsetWidth;
    if (w >= 900) return 3;
    if (w >= 600) return 2;
    return 1;
  }

  function updateDots() {
    const visible = getVisibleCount();
    const pageCount = Math.ceil(data.models.length / visible);
    const currentPage = Math.floor(currentIndex / visible);
    dotsWrap.textContent = '';
    for (let i = 0; i < pageCount; i += 1) {
      const dot = document.createElement('button');
      dot.className = `dot${i === currentPage ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Go to page ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i * visible;
        scrollToIndex();
      });
      dotsWrap.appendChild(dot);
    }
  }

  function scrollToIndex() {
    const cards = track.querySelectorAll('.carousel-card');
    if (cards[currentIndex]) {
      track.scrollTo({ left: cards[currentIndex].offsetLeft, behavior: 'smooth' });
    }
    updateDots();
  }

  const prevBtn = wrapper.querySelector('.nav-prev');
  const nextBtn = wrapper.querySelector('.nav-next');

  prevBtn.addEventListener('click', () => {
    const visible = getVisibleCount();
    currentIndex = Math.max(0, currentIndex - visible);
    scrollToIndex();
  });

  nextBtn.addEventListener('click', () => {
    const visible = getVisibleCount();
    const max = data.models.length - visible;
    currentIndex = Math.min(max, currentIndex + visible);
    scrollToIndex();
  });

  // Sync dots on manual scroll
  let scrollTimer;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const cards = track.querySelectorAll('.carousel-card');
      const scrollLeft = track.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - scrollLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      currentIndex = closest;
      updateDots();
    }, 100);
  });

  updateDots();

  // Observe resize
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => updateDots());
    ro.observe(block);
  }
}

export default async function decorate(block, bridge) {
  block.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading Kawasaki models...</p>
    </div>
  `;

  if (bridge && bridge.isConnected) {
    bridge.applyHostStyles();
    bridge.onContextChange((ctx) => {
      block.closest('.section')?.classList.toggle('dark-theme', ctx.theme === 'dark');
    });
  }

  if (bridge && bridge.isConnected) {
    try {
      const { structuredContent } = await bridge.toolResult;
      renderUI(block, structuredContent, bridge);
    } catch {
      block.innerHTML = '<p class="error-state">Failed to load model data. Please try again.</p>';
    }
  } else {
    renderUI(block, SAMPLE_DATA, bridge);
  }
}
