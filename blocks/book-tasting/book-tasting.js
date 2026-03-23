// Sample data for standalone EDS preview (no bridge available).
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = [
  {
    id: 'espresso-fundamentals',
    name: 'Espresso Fundamentals',
    description: 'Learn the art of espresso brewing, from bean selection to perfect extraction. Includes hands-on practice with professional equipment.',
    duration: '90 minutes',
    image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&h=600&fit=crop',
    availableSlots: [
      '2026-03-25 10:00 AM',
      '2026-03-26 2:00 PM',
      '2026-03-28 10:00 AM',
    ],
    price: '$75',
    capacity: '6 people max',
  },
  {
    id: 'single-origin-tasting',
    name: 'Single Origin Tasting',
    description: 'Explore the unique flavors of coffee from different regions. Compare beans from Ethiopia, Colombia, and Costa Rica in a guided tasting.',
    duration: '60 minutes',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
    availableSlots: [
      '2026-03-24 3:00 PM',
      '2026-03-27 11:00 AM',
      '2026-03-29 4:00 PM',
    ],
    price: '$50',
    capacity: '8 people max',
  },
  {
    id: 'latte-art-workshop',
    name: 'Latte Art Workshop',
    description: 'Master the techniques of creating beautiful latte art. Learn milk steaming, pouring patterns, and develop your signature design.',
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop',
    availableSlots: [
      '2026-03-25 2:00 PM',
      '2026-03-27 10:00 AM',
      '2026-03-30 1:00 PM',
    ],
    price: '$85',
    capacity: '5 people max',
  },
  {
    id: 'coffee-cupping-101',
    name: 'Coffee Cupping 101',
    description: 'Professional coffee tasting methodology. Learn to identify flavor notes, assess quality, and develop your palate like a Q Grader.',
    duration: '75 minutes',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop',
    availableSlots: [
      '2026-03-26 10:00 AM',
      '2026-03-28 3:00 PM',
      '2026-03-31 11:00 AM',
    ],
    price: '$65',
    capacity: '10 people max',
  },
];

export default async function decorate(block, bridge) {
  let sessions;

  if (bridge) {
    // PRODUCTION: widget is inside ChatGPT/Claude
    // Data comes from the MCP tool result — dynamic, not hardcoded
    bridge.applyHostStyles();
    const { structuredContent } = await bridge.toolResult;
    sessions = structuredContent?.sessions || [];
  } else {
    // STANDALONE: widget is in EDS preview (localhost:3000 or aem.page)
    // Use sample data so the block renders something useful
    sessions = SAMPLE_DATA;
  }

  // Clear placeholder content
  block.textContent = '';

  // Render — same code path for both modes
  renderSessions(block, sessions, bridge);

  // Auto-resize in bridge mode
  if (bridge) {
    bridge.autoResize(block);
  }
}

function renderSessions(block, sessions, bridge) {
  const container = document.createElement('div');
  container.className = 'sessions-container';

  if (sessions.length === 0) {
    container.innerHTML = '<p class="no-sessions">No coffee tasting sessions available at this time.</p>';
    block.appendChild(container);
    return;
  }

  sessions.forEach((session) => {
    const card = document.createElement('div');
    card.className = 'session-card';

    // Image
    const imageEl = document.createElement('div');
    imageEl.className = 'session-image';
    imageEl.style.backgroundImage = `url(${session.image})`;
    imageEl.setAttribute('role', 'img');
    imageEl.setAttribute('aria-label', session.name);
    card.appendChild(imageEl);

    // Content
    const content = document.createElement('div');
    content.className = 'session-content';

    const title = document.createElement('h3');
    title.className = 'session-title';
    title.textContent = session.name;
    content.appendChild(title);

    const description = document.createElement('p');
    description.className = 'session-description';
    description.textContent = session.description;
    content.appendChild(description);

    // Meta info
    const meta = document.createElement('div');
    meta.className = 'session-meta';

    const duration = document.createElement('div');
    duration.className = 'session-duration';
    duration.innerHTML = `<span class="icon">⏱️</span> ${session.duration}`;
    meta.appendChild(duration);

    const capacity = document.createElement('div');
    capacity.className = 'session-capacity';
    capacity.innerHTML = `<span class="icon">👥</span> ${session.capacity}`;
    meta.appendChild(capacity);

    if (session.price) {
      const price = document.createElement('div');
      price.className = 'session-price';
      price.innerHTML = `<span class="icon">💰</span> ${session.price}`;
      meta.appendChild(price);
    }

    content.appendChild(meta);

    // Available slots
    if (session.availableSlots && session.availableSlots.length > 0) {
      const slotsTitle = document.createElement('h4');
      slotsTitle.className = 'slots-title';
      slotsTitle.textContent = 'Available Times:';
      content.appendChild(slotsTitle);

      const slotsList = document.createElement('div');
      slotsList.className = 'slots-list';

      session.availableSlots.forEach((slot) => {
        const slotButton = document.createElement('button');
        slotButton.className = 'slot-button';
        slotButton.textContent = slot;

        if (bridge) {
          slotButton.addEventListener('click', () => {
            bridge.sendMessage(`I'd like to book the ${session.name} session on ${slot}`);
          });
        } else {
          slotButton.addEventListener('click', () => {
            // eslint-disable-next-line no-alert
            alert(`In production, this would book: ${session.name} on ${slot}`);
          });
        }

        slotsList.appendChild(slotButton);
      });

      content.appendChild(slotsList);
    }

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'session-actions';

    const detailsButton = document.createElement('button');
    detailsButton.className = 'details-button';
    detailsButton.textContent = 'Learn More';

    if (bridge) {
      detailsButton.addEventListener('click', () => {
        bridge.sendMessage(`Tell me more about the ${session.name} tasting session`);
      });
    } else {
      detailsButton.addEventListener('click', () => {
        // eslint-disable-next-line no-alert
        alert(`In production, this would ask for more details about: ${session.name}`);
      });
    }

    actions.appendChild(detailsButton);
    content.appendChild(actions);

    card.appendChild(content);
    container.appendChild(card);
  });

  block.appendChild(container);
}
