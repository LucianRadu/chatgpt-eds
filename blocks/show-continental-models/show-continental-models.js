const RATING_COLORS = {
  A: { bg: '#149A40', text: 'white' },
  B: { bg: '#0D6BBB', text: 'white' },
  C: { bg: '#C8B900', text: 'black' },
  D: { bg: '#FD9407', text: 'black' },
  E: { bg: '#E03C31', text: 'white' },
};

const SEASON_LABELS = {
  summer: 'Summer tires',
  winter: 'Winter tires',
  'all-season': 'All-season tires',
};

const SEASON_BADGES = {
  summer: 'Performance & Dynamics',
  winter: 'Winter Safety',
  'all-season': 'All-season Performance',
};

const IMG_BASE = 'https://www.continental-tires.com/content/dam/conti-tires-cms/continental/b2c/products/plt';
const IMG_SUFFIX = '/_jcr_content/renditions/cq5dam.thumbnail.319.319.png';
const URL_BASE = 'https://www.continental-tires.com/products/car/tires';

const MOCK_MODELS = [
  // --- SUMMER ---
  {
    id: 'sportcontact-7',
    name: 'SportContact\u2122 7',
    season: 'summer',
    tagline: 'Follow your dreams. Stay on the road.',
    imageUrl: `${IMG_BASE}/Continental__SportContact-7__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'A', max: 'D' },
    wetGrip: { min: 'A', max: 'B' },
    noiseLevel: { min: 71, max: 75 },
    vehicleTypes: ['Passenger cars'],
    features: [],
    detailsUrl: `${URL_BASE}/sportcontact-7/`,
  },
  {
    id: 'ultracontact',
    name: 'UltraContact',
    season: 'summer',
    tagline: 'Built to last.',
    imageUrl: `${IMG_BASE}/Continental__UltraContact__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'B', max: 'C' },
    wetGrip: { min: 'A', max: 'A' },
    noiseLevel: { min: 68, max: 72 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/ultracontact/`,
  },
  {
    id: 'premiumcontact-7',
    name: 'PremiumContact 7',
    season: 'summer',
    tagline: 'Driving safely has never felt better.',
    imageUrl: `${IMG_BASE}/PremiumContact7_30_degree-AEM.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'B', max: 'C' },
    wetGrip: { min: 'A', max: 'A' },
    noiseLevel: { min: 71, max: 73 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/premiumcontact-7/`,
  },
  {
    id: 'ecocontact-7-s',
    name: 'EcoContact 7 S',
    season: 'summer',
    tagline: 'Loved by manufacturers. Loved by drivers.',
    imageUrl: `${IMG_BASE}/Continental__EcoContact-7-S__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'A', max: 'C' },
    wetGrip: { min: 'A', max: 'B' },
    noiseLevel: { min: 69, max: 73 },
    vehicleTypes: ['Passenger cars'],
    features: [],
    detailsUrl: `${URL_BASE}/ecocontact-7-s/`,
  },
  {
    id: 'ecocontact-7',
    name: 'EcoContact 7',
    season: 'summer',
    tagline: 'Efficiency redefined.',
    imageUrl: `${IMG_BASE}/continental__ecocontact-7__productpicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'A', max: 'B' },
    wetGrip: { min: 'A', max: 'B' },
    noiseLevel: { min: 69, max: 75 },
    vehicleTypes: ['Passenger cars'],
    features: [],
    detailsUrl: `${URL_BASE}/ecocontact-7/`,
  },
  {
    id: 'premiumcontact-6',
    name: 'PremiumContact 6',
    season: 'summer',
    tagline: 'Choose the safe road ahead.',
    imageUrl: `${IMG_BASE}/Continental__PremiumContact-6__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'A', max: 'D' },
    wetGrip: { min: 'A', max: 'B' },
    noiseLevel: { min: 71, max: 75 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/premiumcontact-6/`,
  },
  {
    id: 'sportcontact-6',
    name: 'SportContact 6',
    season: 'summer',
    tagline: 'Count on a tire that can keep up with you.',
    imageUrl: `${IMG_BASE}/Continental__SportContact-6__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'A', max: 'D' },
    wetGrip: { min: 'A', max: 'C' },
    noiseLevel: { min: 71, max: 75 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/sportcontact-6/`,
  },
  // --- WINTER ---
  {
    id: 'wintercontact-ts870',
    name: 'WinterContact\u2122 TS 870',
    season: 'winter',
    tagline: 'All winter tires are the same. Until the streets turn white.',
    imageUrl: `${IMG_BASE}/Continental__WinterContact-TS-870__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'C', max: 'D' },
    wetGrip: { min: 'B', max: 'C' },
    noiseLevel: { min: 69, max: 72 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/wintercontact-ts-870/`,
  },
  {
    id: 'wintercontact-ts870p',
    name: 'WinterContact TS 870 P',
    season: 'winter',
    tagline: 'Winter brings rain, ice and snow. We bring you control.',
    imageUrl: `${IMG_BASE}/Continental__WinterContact-TS-870-P__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'B', max: 'D' },
    wetGrip: { min: 'B', max: 'C' },
    noiseLevel: { min: 70, max: 75 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/wintercontact-ts-870-p/`,
  },
  {
    id: 'wintercontact-8s',
    name: 'WinterContact 8 S',
    season: 'winter',
    tagline: 'The perfect partner for maximum winter performance.',
    imageUrl: `${IMG_BASE}/Continental__WinterContact-8-S__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'B', max: 'C' },
    wetGrip: { min: 'B', max: 'C' },
    noiseLevel: { min: 72, max: 75 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/wintercontact-8-s/`,
  },
  {
    id: 'wintercontact-ts860s',
    name: 'WinterContact TS 860 S',
    season: 'winter',
    tagline: 'Winter sports have never felt this agile.',
    imageUrl: `${IMG_BASE}/Continental__WinterContact-TS-860-S__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'B', max: 'D' },
    wetGrip: { min: 'B', max: 'C' },
    noiseLevel: { min: 70, max: 75 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/wintercontact-ts-860-s/`,
  },
  {
    id: 'wintercontact-ts860',
    name: 'WinterContact TS 860',
    season: 'winter',
    tagline: "When you can't trust winter, trust your tires.",
    imageUrl: `${IMG_BASE}/Continental__WinterContact-TS-860__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'C', max: 'D' },
    wetGrip: { min: 'B', max: 'C' },
    noiseLevel: { min: 71, max: 72 },
    vehicleTypes: ['Passenger cars'],
    features: [],
    detailsUrl: `${URL_BASE}/wintercontact-ts-860/`,
  },
  // --- ALL-SEASON ---
  {
    id: 'allseasoncontact-2',
    name: 'AllSeasonContact\u2122 2',
    season: 'all-season',
    tagline: "You can't control the weather. But you can be ready.",
    imageUrl: `${IMG_BASE}/continental__allseasoncontact-2__productpicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'A', max: 'D' },
    wetGrip: { min: 'B', max: 'C' },
    noiseLevel: { min: 70, max: 73 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/allseasoncontact-2/`,
  },
  {
    id: 'allseasoncontact',
    name: 'AllSeasonContact\u2122',
    season: 'all-season',
    tagline: 'One tire, four seasons.',
    imageUrl: `${IMG_BASE}/Continental__AllSeasonContact__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'A', max: 'E' },
    wetGrip: { min: 'B', max: 'C' },
    noiseLevel: { min: 71, max: 73 },
    vehicleTypes: ['Passenger cars'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/allseasoncontact/`,
  },
  {
    id: 'crosscontact-lx-sport',
    name: 'CrossContact LX Sport',
    season: 'all-season',
    tagline: 'Made for every road. Even off it.',
    imageUrl: `${IMG_BASE}/Continental__CrossContact-LX-Sport__ProductPicture__30.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'A', max: 'C' },
    wetGrip: { min: 'B', max: 'B' },
    noiseLevel: { min: 71, max: 75 },
    vehicleTypes: ['SUVs'],
    features: [],
    detailsUrl: `${URL_BASE}/crosscontact-lx-sport/`,
  },
  {
    id: 'crosscontact-rx',
    name: 'CrossContact RX',
    season: 'all-season',
    tagline: 'For every road and whatever lies beyond.',
    imageUrl: `${IMG_BASE}/ca/CrossContact-RX_30_Gradansicht_5k_V01.png${IMG_SUFFIX}`,
    fuelEfficiency: { min: 'A', max: 'C' },
    wetGrip: { min: 'B', max: 'C' },
    noiseLevel: { min: 71, max: 75 },
    vehicleTypes: ['SUVs'],
    features: ['EV compatible'],
    detailsUrl: `${URL_BASE}/crosscontact-rx/`,
  },
];

function ratingBadgeSVG(letter) {
  const { bg, text } = RATING_COLORS[letter] || RATING_COLORS.C;
  return `<svg class="rating-badge" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.07 3.5C0.07 1.6 1.6 0.07 3.5 0.07H16.6C18 0.07 19.2 0.9 19.8 2.2L23.4 10.7C23.7 11.5 23.7 12.5 23.4 13.3L19.8 21.8C19.2 23.1 18 23.9 16.6 23.9H3.5C1.6 23.9 0.07 22.4 0.07 20.5V3.5Z" fill="${bg}" stroke="#C8C8C8" stroke-width="0.13"/>
    <text x="45%" y="50%" text-anchor="middle" fill="${text}" font-size="16" font-weight="500" dy=".3em">${letter}</text>
  </svg>`;
}

function seasonIconSVG(season) {
  if (season === 'winter') {
    return `<svg class="season-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" stroke="#333" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }
  if (season === 'all-season') {
    return `<svg class="season-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke="#333" stroke-width="2"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" stroke="#333" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }
  return `<svg class="season-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" fill="#FFA500"/>
    <path d="M12 1v4M12 19v4M1 12h4M19 12h4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M4.2 19.8l2.8-2.8M17 7l2.8-2.8" stroke="#FFA500" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

function renderCard(model, bridge) {
  const card = document.createElement('div');
  card.className = 'model-card';

  const badge = SEASON_BADGES[model.season] || '';
  const seasonLabel = SEASON_LABELS[model.season] || model.season;
  const featureHTML = model.features.length
    ? model.features.map((f) => `<span class="feature-tag">${f}</span>`).join('')
    : '';

  card.innerHTML = `
    <span class="card-badge">${badge}</span>
    <div class="card-image">
      <img src="${model.imageUrl}" alt="${model.name}" loading="lazy">
    </div>
    <div class="card-body">
      <h3 class="card-title">${model.name}</h3>
      <div class="card-season">
        ${seasonIconSVG(model.season)}
        <span>${seasonLabel}</span>
      </div>
      <p class="card-tagline">${model.tagline}</p>
      <div class="card-specs">
        <div class="spec-row">
          <span class="spec-label">Fuel efficiency:</span>
          <span class="spec-value">${ratingBadgeSVG(model.fuelEfficiency.min)}<span class="spec-dash">\u2013</span>${ratingBadgeSVG(model.fuelEfficiency.max)}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">Wet grip:</span>
          <span class="spec-value">${ratingBadgeSVG(model.wetGrip.min)}<span class="spec-dash">\u2013</span>${ratingBadgeSVG(model.wetGrip.max)}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">Noise level:</span>
          <span class="spec-value spec-noise">${model.noiseLevel.min} dB \u2013 ${model.noiseLevel.max} dB</span>
        </div>
      </div>
      <div class="card-attributes">
        ${model.vehicleTypes.map((v) => `<span class="attr-tag">${v}</span>`).join('')}
        ${featureHTML}
      </div>
      <div class="card-actions">
        <button class="cta-btn" data-model="${model.name}">Find a dealer</button>
        <a class="details-link" href="${model.detailsUrl}" data-url="${model.detailsUrl}">More details</a>
      </div>
    </div>
  `;

  card.querySelector('.cta-btn').addEventListener('click', () => {
    if (bridge?.sendMessage) {
      bridge.sendMessage(`I'd like to find a dealer for the Continental ${model.name}`);
    }
  });

  const detailsLink = card.querySelector('.details-link');
  detailsLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (bridge?.openLink) {
      bridge.openLink(model.detailsUrl);
    } else {
      window.open(model.detailsUrl, '_blank');
    }
  });

  return card;
}

export default async function decorate(block, bridge) {
  block.textContent = '';

  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.textContent = 'Loading tire models\u2026';
  block.appendChild(loading);

  let models;

  try {
    if (bridge && bridge.toolResult) {
      const result = await bridge.toolResult;
      const sc = result?.structuredContent || result;
      models = sc?.models || [];
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[show-continental-models] Could not get tool data, using mock data', e);
  }

  if (!models || models.length === 0) {
    models = MOCK_MODELS;
  }

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const chevronLeft = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const chevronRight = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-arrow carousel-arrow-prev';
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = chevronLeft;

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-arrow carousel-arrow-next';
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = chevronRight;

  const track = document.createElement('div');
  track.className = 'carousel-track';

  models.forEach((model) => {
    track.appendChild(renderCard(model, bridge));
  });

  wrapper.appendChild(prevBtn);
  wrapper.appendChild(track);
  wrapper.appendChild(nextBtn);
  block.appendChild(wrapper);

  const scrollAmount = () => {
    const card = track.querySelector('.model-card');
    return card ? card.offsetWidth + 16 : 320;
  };

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  const updateArrows = () => {
    const { scrollLeft, scrollWidth, clientWidth } = track;
    prevBtn.classList.toggle('hidden', scrollLeft <= 0);
    nextBtn.classList.toggle('hidden', scrollLeft + clientWidth >= scrollWidth - 1);
  };

  track.addEventListener('scroll', updateArrows);
  updateArrows();
}
