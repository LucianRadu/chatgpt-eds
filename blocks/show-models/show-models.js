const SAMPLE_DATA = {
  brand: 'Kawasaki',
  tagline: 'Let the Good Times Roll',
  models: [
    {
      id: 'ninja-zx-10r',
      name: 'Ninja ZX-10R',
      category: 'Supersport',
      year: 2026,
      price: '$17,399',
      engine: '998cc Inline-4',
      power: '203 HP',
      weight: '457 lbs',
      image: 'https://content.kawasaki.com/ContentStorage/KMC/Products/10626/61ded9f9-b3cc-4dcf-aaa8-3c1ece9c3b2e.png',
      description: 'Born on the track, built for the street. Championship-proven performance.',
    },
    {
      id: 'z-h2',
      name: 'Z H2',
      category: 'Hypernaked',
      year: 2026,
      price: '$15,599',
      engine: '998cc Supercharged',
      power: '200 HP',
      weight: '527 lbs',
      image: 'https://content.kawasaki.com/ContentStorage/KMC/Products/10562/aaebde2e-de28-479f-8d62-f54f1e7422b3.png',
      description: 'Supercharged aggression meets naked streetfighter style.',
    },
    {
      id: 'ninja-400',
      name: 'Ninja 400',
      category: 'Sport',
      year: 2026,
      price: '$5,499',
      engine: '399cc Parallel Twin',
      power: '44 HP',
      weight: '366 lbs',
      image: 'https://content.kawasaki.com/ContentStorage/KMC/Products/10542/2e43b7e9-c8e4-4810-b96f-ed5b7da84b62.png',
      description: 'The perfect entry into sport riding. Nimble, responsive, and fun.',
    },
    {
      id: 'versys-650',
      name: 'Versys 650',
      category: 'Adventure',
      year: 2026,
      price: '$9,199',
      engine: '649cc Parallel Twin',
      power: '66 HP',
      weight: '467 lbs',
      image: 'https://content.kawasaki.com/ContentStorage/KMC/Products/10547/cc4a3b3d-5f2d-473e-a7ee-a86b2ad91dbb.png',
      description: 'Adventure-ready versatility with sport-touring comfort.',
    },
    {
      id: 'klr-650',
      name: 'KLR 650',
      category: 'Dual Sport',
      year: 2026,
      price: '$7,199',
      engine: '652cc Single',
      power: '40 HP',
      weight: '456 lbs',
      image: 'https://content.kawasaki.com/ContentStorage/KMC/Products/10580/25e7cb46-d8f5-458a-81b5-bd26e65eacd1.png',
      description: 'The legendary go-anywhere dual sport. Built tough for any road.',
    },
    {
      id: 'vulcan-s',
      name: 'Vulcan S',
      category: 'Cruiser',
      year: 2026,
      price: '$7,799',
      engine: '649cc Parallel Twin',
      power: '61 HP',
      weight: '498 lbs',
      image: 'https://content.kawasaki.com/ContentStorage/KMC/Products/10590/17f34a8e-b5ab-48b1-84fa-13a38c99b8a1.png',
      description: 'ERGO-FIT adjustability meets sporty parallel-twin performance.',
    },
  ],
};

function createSpecItem(label, value) {
  const spec = document.createElement('div');
  spec.className = 'spec-item';
  spec.innerHTML = `
    <span class="spec-label">${label}</span>
    <span class="spec-value">${value}</span>
  `;
  return spec;
}

function createModelCard(model, bridge) {
  const card = document.createElement('div');
  card.className = 'model-card';

  const imageWrap = document.createElement('div');
  imageWrap.className = 'model-card-image';
  imageWrap.innerHTML = `
    <img src="${model.image}" alt="${model.name}" loading="lazy" />
    <span class="model-badge">${model.category}</span>
  `;

  const body = document.createElement('div');
  body.className = 'model-card-body';

  const title = document.createElement('h3');
  title.className = 'model-name';
  title.textContent = model.name;

  const desc = document.createElement('p');
  desc.className = 'model-desc';
  desc.textContent = model.description;

  const specs = document.createElement('div');
  specs.className = 'model-specs';
  specs.appendChild(createSpecItem('Engine', model.engine));
  specs.appendChild(createSpecItem('Power', model.power));
  specs.appendChild(createSpecItem('Weight', model.weight));

  const footer = document.createElement('div');
  footer.className = 'model-card-footer';

  const price = document.createElement('span');
  price.className = 'model-price';
  price.textContent = model.price;

  const cta = document.createElement('button');
  cta.className = 'model-cta';
  cta.textContent = 'Learn More';
  cta.addEventListener('click', () => {
    if (bridge && bridge.isConnected) {
      bridge.sendMessage(`Tell me more about the Kawasaki ${model.name}`);
    }
  });

  footer.appendChild(price);
  footer.appendChild(cta);

  body.appendChild(title);
  body.appendChild(desc);
  body.appendChild(specs);
  body.appendChild(footer);

  card.appendChild(imageWrap);
  card.appendChild(body);

  return card;
}

function renderUI(block, data, bridge) {
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'show-models-wrapper';

  // Header area
  const header = document.createElement('div');
  header.className = 'show-models-header';

  const titleEl = document.createElement('h2');
  titleEl.className = 'show-models-title';
  titleEl.innerHTML = `${data.brand || 'Kawasaki'} <span class="accent">Models</span>`;

  const tagline = document.createElement('p');
  tagline.className = 'show-models-tagline';
  tagline.textContent = data.tagline || 'Explore the lineup';

  header.appendChild(titleEl);
  header.appendChild(tagline);
  wrapper.appendChild(header);

  // Category filter chips
  const models = data.models || [];
  const categories = [...new Set(models.map((m) => m.category))];

  if (categories.length > 1) {
    const filters = document.createElement('div');
    filters.className = 'model-filters';

    const allChip = document.createElement('button');
    allChip.className = 'filter-chip active';
    allChip.textContent = 'All';
    filters.appendChild(allChip);

    categories.forEach((cat) => {
      const chip = document.createElement('button');
      chip.className = 'filter-chip';
      chip.textContent = cat;
      filters.appendChild(chip);
    });

    filters.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;

      filters.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const selected = chip.textContent;
      grid.querySelectorAll('.model-card').forEach((card) => {
        const cardCat = card.querySelector('.model-badge')?.textContent;
        card.classList.toggle('hidden', selected !== 'All' && cardCat !== selected);
      });
    });

    wrapper.appendChild(filters);
  }

  // Cards grid
  const grid = document.createElement('div');
  grid.className = 'models-grid';

  models.forEach((model) => {
    grid.appendChild(createModelCard(model, bridge));
  });

  wrapper.appendChild(grid);
  block.appendChild(wrapper);
}

export default async function decorate(block, bridge) {
  block.innerHTML = `
    <div class="show-models-loading">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading Kawasaki models\u2026</p>
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
      block.innerHTML = '<div class="show-models-error"><p>Failed to load model data.</p></div>';
    }
  } else {
    renderUI(block, SAMPLE_DATA, bridge);
  }
}
