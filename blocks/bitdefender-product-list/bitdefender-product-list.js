import { MOCK_PRODUCTS } from './mock-products.js';

function createProductCard(product, isRecommended = false) {
  const card = document.createElement('div');
  card.className = 'product-card';

  // Add "Recommended" badge if this is the recommended product
  if (isRecommended) {
    const badge = document.createElement('div');
    badge.className = 'product-badge recommended';
    badge.textContent = 'Recommended';
    card.appendChild(badge);
  } else if (product.badge) {
    const badge = document.createElement('div');
    badge.className = `product-badge ${product.badge.toLowerCase()}`;
    const badgeText = product.badge === 'POPULAR' ? 'Most Popular' : product.badge;
    badge.textContent = badgeText;
    card.appendChild(badge);
  }

  // Product header
  const header = document.createElement('div');
  header.className = 'product-header';

  const title = document.createElement('h3');
  title.className = 'product-title';
  title.textContent = product.name;

  const tagline = document.createElement('p');
  tagline.className = 'product-tagline';
  tagline.textContent = product.tagline;

  header.appendChild(title);
  header.appendChild(tagline);
  card.appendChild(header);

  // Pricing section
  const pricingSection = document.createElement('div');
  pricingSection.className = 'product-pricing';

  // Calculate savings percentage if basePrice exists
  if (product.basePrice && product.price) {
    const savingsPercent = Math.round(
      ((product.basePrice - product.price.amount) / product.basePrice) * 100,
    );

    const savings = document.createElement('div');
    savings.className = 'product-savings';
    savings.textContent = `Save ${savingsPercent}%`;
    pricingSection.appendChild(savings);
  }

  // Display price
  if (product.price) {
    const priceContainer = document.createElement('div');
    priceContainer.className = 'product-price-container';

    const price = document.createElement('div');
    price.className = 'product-price';

    // Format currency symbol
    const currencySymbol = product.price.currency === 'USD' ? '$' : product.price.currency;
    price.textContent = `${currencySymbol}${product.price.amount.toFixed(2)}`;

    priceContainer.appendChild(price);

    // Show base price with strikethrough if it exists
    if (product.basePrice && product.basePrice > product.price.amount) {
      const basePrice = document.createElement('div');
      basePrice.className = 'product-base-price';
      basePrice.textContent = `${currencySymbol}${product.basePrice.toFixed(2)}`;
      priceContainer.appendChild(basePrice);
    }

    pricingSection.appendChild(priceContainer);
  }

  const priceNote = document.createElement('div');
  priceNote.className = 'product-price-note';
  priceNote.textContent = '*For the first year. VAT included.';

  pricingSection.appendChild(priceNote);
  card.appendChild(pricingSection);

  // Start trial button
  const buyButton = document.createElement('a');
  buyButton.className = 'product-buy-button';
  buyButton.href = product.trialUrl || '#';
  buyButton.textContent = 'Start Trial';
  buyButton.target = '_top';
  buyButton.rel = 'noopener noreferrer';
  card.appendChild(buyButton);

  // Guarantee
  const guarantee = document.createElement('div');
  guarantee.className = 'product-guarantee';
  guarantee.textContent = '30-day money-back guarantee';
  card.appendChild(guarantee);

  // Features section
  const featuresSection = document.createElement('div');
  featuresSection.className = 'product-features';

  const featuresTitle = document.createElement('div');
  featuresTitle.className = 'features-title';
  featuresTitle.textContent = 'INCLUDES:';
  featuresSection.appendChild(featuresTitle);

  const featuresList = document.createElement('ul');
  featuresList.className = 'features-list';

  product.features.forEach((feature) => {
    const li = document.createElement('li');
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  featuresSection.appendChild(featuresList);
  card.appendChild(featuresSection);

  // Description
  const description = document.createElement('div');
  description.className = 'product-description';
  description.textContent = product.description;
  card.appendChild(description);

  return card;
}

function createCarouselArrows(container, block) {
  const leftArrow = document.createElement('button');
  leftArrow.className = 'carousel-arrow carousel-arrow-left';
  leftArrow.setAttribute('aria-label', 'Previous products');
  leftArrow.textContent = '<';

  const rightArrow = document.createElement('button');
  rightArrow.className = 'carousel-arrow carousel-arrow-right';
  rightArrow.setAttribute('aria-label', 'Next products');
  rightArrow.textContent = '>';

  // Update arrow states based on scroll position
  const updateArrows = () => {
    const { scrollLeft } = container;
    const maxScroll = container.scrollWidth - container.clientWidth;

    leftArrow.classList.toggle('disabled', scrollLeft <= 0);
    rightArrow.classList.toggle('disabled', scrollLeft >= maxScroll - 1);
  };

  // Scroll functionality
  const scrollAmount = 300; // pixels to scroll

  leftArrow.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Update arrows on scroll
  container.addEventListener('scroll', updateArrows);

  // Initial update
  setTimeout(updateArrows, 100);

  block.appendChild(leftArrow);
  block.appendChild(rightArrow);
}

export default async function decorate(block, onDataLoaded) {
  block.textContent = '';
  block.className = 'bitdefender-product-list';

  // Show multiple products initially for testing/preview
  const initialProductIds = [
    'total-security-individual',
    'premium-security-individual',
    'ultimate-security-individual',
    'total-security-family',
    'premium-security-family',
    'ultimate-security-family',
  ];

  const container = document.createElement('div');
  container.className = 'products-container';

  initialProductIds.forEach((productId) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      const card = createProductCard(product);
      container.appendChild(card);
    }
  });

  block.appendChild(container);

  // Add carousel arrows for initial content
  createCarouselArrows(container, block);

  onDataLoaded.then((data) => {
    // Clear the existing content
    block.textContent = '';

    // Create a new container for all products
    const productsContainer = document.createElement('div');
    productsContainer.className = 'products-container';

    // Get all products matching the productIds
    if (data && data.productIds && Array.isArray(data.productIds)) {
      data.productIds.forEach((productId) => {
        const prod = MOCK_PRODUCTS.find((p) => p.id === productId);

        if (prod) {
          // Check if this is the recommended product
          const isRecommended = productId === data.recommendedProductId;

          // Create and append the product card
          const card = createProductCard(prod, isRecommended);
          productsContainer.appendChild(card);
        }
      });
    }

    block.appendChild(productsContainer);

    // Add carousel arrows
    createCarouselArrows(productsContainer, block);
  });
}
