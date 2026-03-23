// Sample data for standalone EDS preview (no bridge).
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_COFFEE = [
  {
    name: 'Frescopa Colombian Blend',
    type: 'Bagged Coffee',
    image: 'https://placehold.co/400x400/8B4513/FFFFFF?text=Colombian+Blend',
    description: 'Rich, smooth Colombian beans',
    size: '12 oz',
    roast: 'Medium'
  },
  {
    name: 'Frescopa Espresso Roast',
    type: 'Bagged Coffee',
    image: 'https://placehold.co/400x400/654321/FFFFFF?text=Espresso+Roast',
    description: 'Bold, intense espresso blend',
    size: '16 oz',
    roast: 'Dark'
  },
  {
    name: 'Frescopa Breakfast Blend',
    type: 'Bagged Coffee',
    image: 'https://placehold.co/400x400/A0522D/FFFFFF?text=Breakfast+Blend',
    description: 'Light, bright morning coffee',
    size: '12 oz',
    roast: 'Light'
  },
  {
    name: 'Frescopa Single Origin Ethiopia',
    type: 'Bagged Coffee',
    image: 'https://placehold.co/400x400/704214/FFFFFF?text=Ethiopia',
    description: 'Floral, fruity Ethiopian beans',
    size: '10 oz',
    roast: 'Medium'
  },
  {
    name: 'Frescopa Espresso Pods',
    type: 'Coffee Pods',
    image: 'https://placehold.co/400x400/5C4033/FFFFFF?text=Espresso+Pods',
    description: 'Convenient espresso pods',
    size: '20 count',
    roast: 'Dark'
  },
  {
    name: 'Frescopa Colombian Pods',
    type: 'Coffee Pods',
    image: 'https://placehold.co/400x400/8B7355/FFFFFF?text=Colombian+Pods',
    description: 'Colombian blend pods',
    size: '24 count',
    roast: 'Medium'
  },
  {
    name: 'Frescopa Decaf Pods',
    type: 'Coffee Pods',
    image: 'https://placehold.co/400x400/A0826D/FFFFFF?text=Decaf+Pods',
    description: 'Decaf coffee pods',
    size: '20 count',
    roast: 'Medium'
  },
  {
    name: 'Frescopa Variety Pack',
    type: 'Coffee Pods',
    image: 'https://placehold.co/400x400/967969/FFFFFF?text=Variety+Pack',
    description: 'Assorted coffee pod flavors',
    size: '30 count',
    roast: 'Mixed'
  }
];

export default async function decorate(block, bridge) {
  let coffeeProducts;

  if (bridge) {
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext?.preview === true;

    if (isPreview) {
      // Preview mode (LLM Apps UI) — use sample data
      coffeeProducts = SAMPLE_COFFEE;
    } else {
      // Production — data comes from the MCP tool result
      const { structuredContent } = await bridge.toolResult;
      coffeeProducts = structuredContent?.products || structuredContent?.items || [];
    }
  } else {
    // STANDALONE: widget is in EDS preview (localhost:3000 or aem.page)
    coffeeProducts = SAMPLE_COFFEE;
  }

  block.textContent = '';
  renderCoffeeList(block, coffeeProducts, bridge);

  if (bridge) {
    bridge.autoResize(block);
  }
}

function renderCoffeeList(block, products, bridge) {
  // Group products by type
  const baggedCoffee = products.filter(p => p.type === 'Bagged Coffee');
  const coffeePods = products.filter(p => p.type === 'Coffee Pods');

  const container = document.createElement('div');
  container.className = 'coffee-container';

  // Render Bagged Coffee section
  if (baggedCoffee.length > 0) {
    const baggedSection = createSection('Bagged Coffee', baggedCoffee, bridge);
    container.appendChild(baggedSection);
  }

  // Render Coffee Pods section
  if (coffeePods.length > 0) {
    const podsSection = createSection('Coffee Pods', coffeePods, bridge);
    container.appendChild(podsSection);
  }

  block.appendChild(container);
}

function createSection(title, products, bridge) {
  const section = document.createElement('div');
  section.className = 'coffee-section';

  const heading = document.createElement('h2');
  heading.textContent = title;
  section.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'coffee-grid';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'coffee-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="coffee-info">
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <div class="details">
          <span class="roast">${product.roast} Roast</span>
          <span class="size">${product.size}</span>
        </div>
      </div>
    `;

    if (bridge) {
      const btn = document.createElement('button');
      btn.className = 'details-btn';
      btn.textContent = 'Learn more';
      btn.addEventListener('click', () => {
        bridge.sendMessage(`Tell me more about ${product.name}`);
      });
      card.querySelector('.coffee-info').appendChild(btn);
    }

    grid.appendChild(card);
  });

  section.appendChild(grid);
  return section;
}
