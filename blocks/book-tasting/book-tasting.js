// Sample data for standalone EDS preview (no bridge).
// In production, data comes dynamically from bridge.toolResult.
const SAMPLE_DATA = {
  tastingExperiences: [
    {
      id: 'classic-tasting',
      name: 'Classic Tasting',
      description: 'Sample 5 premium wines with expert guidance',
      duration: '90 minutes',
      price: '$45 per person',
      image: 'https://picsum.photos/400/300?random=1',
    },
    {
      id: 'premium-tasting',
      name: 'Premium Tasting',
      description: 'Exclusive selection of reserve wines paired with artisan cheeses',
      duration: '120 minutes',
      price: '$75 per person',
      image: 'https://picsum.photos/400/300?random=2',
    },
    {
      id: 'vineyard-tour',
      name: 'Vineyard Tour & Tasting',
      description: 'Walk through our vineyards followed by a guided tasting',
      duration: '150 minutes',
      price: '$95 per person',
      image: 'https://picsum.photos/400/300?random=3',
    },
  ],
  availableTimeSlots: [
    '10:00 AM',
    '11:30 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM',
  ],
  maxGuests: 8,
  minGuests: 2,
};

export default async function decorate(block, bridge) {
  let data;

  if (bridge) {
    // BRIDGE MODE: widget is inside a host (ChatGPT/Claude/preview)
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext?.preview === true;
    if (isPreview) {
      // Preview mode (LLM Apps UI) — use sample data
      data = SAMPLE_DATA;
    } else {
      // Production — data comes from the MCP tool result
      const { structuredContent } = await bridge.toolResult;
      data = structuredContent || SAMPLE_DATA;
    }
  } else {
    // STANDALONE: widget is in EDS preview (localhost:3000 or aem.page)
    data = SAMPLE_DATA;
  }

  block.textContent = '';
  renderBookingForm(block, data, bridge);
  if (bridge) bridge.autoResize(block);
}

function renderBookingForm(block, data, bridge) {
  const container = document.createElement('div');
  container.className = 'booking-container';

  // Header
  const header = document.createElement('div');
  header.className = 'booking-header';
  header.innerHTML = `
    <h2>Book Your Tasting Experience</h2>
    <p>Select your preferred experience and schedule</p>
  `;
  container.appendChild(header);

  // Tasting experiences selection
  const experiencesSection = document.createElement('div');
  experiencesSection.className = 'experiences-section';

  const experiencesLabel = document.createElement('label');
  experiencesLabel.className = 'section-label';
  experiencesLabel.textContent = 'Choose Your Experience';
  experiencesSection.appendChild(experiencesLabel);

  const experiencesGrid = document.createElement('div');
  experiencesGrid.className = 'experiences-grid';

  data.tastingExperiences.forEach((experience) => {
    const card = document.createElement('div');
    card.className = 'experience-card';
    card.dataset.experienceId = experience.id;
    card.innerHTML = `
      <img src="${experience.image}" alt="${experience.name}">
      <div class="experience-details">
        <h3>${experience.name}</h3>
        <p class="description">${experience.description}</p>
        <div class="experience-meta">
          <span class="duration">${experience.duration}</span>
          <span class="price">${experience.price}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      experiencesGrid.querySelectorAll('.experience-card').forEach((c) => {
        c.classList.remove('selected');
      });
      card.classList.add('selected');
    });

    experiencesGrid.appendChild(card);
  });

  experiencesSection.appendChild(experiencesGrid);
  container.appendChild(experiencesSection);

  // Date and time selection
  const dateTimeSection = document.createElement('div');
  dateTimeSection.className = 'datetime-section';

  // Date input
  const dateGroup = document.createElement('div');
  dateGroup.className = 'form-group';
  dateGroup.innerHTML = `
    <label for="tasting-date">Select Date</label>
    <input type="date" id="tasting-date" required min="${getMinDate()}">
  `;
  dateTimeSection.appendChild(dateGroup);

  // Time selection
  const timeGroup = document.createElement('div');
  timeGroup.className = 'form-group';
  const timeLabel = document.createElement('label');
  timeLabel.textContent = 'Select Time';
  timeGroup.appendChild(timeLabel);

  const timeGrid = document.createElement('div');
  timeGrid.className = 'time-grid';

  data.availableTimeSlots.forEach((slot) => {
    const timeButton = document.createElement('button');
    timeButton.type = 'button';
    timeButton.className = 'time-slot';
    timeButton.textContent = slot;
    timeButton.dataset.time = slot;

    timeButton.addEventListener('click', () => {
      timeGrid.querySelectorAll('.time-slot').forEach((btn) => {
        btn.classList.remove('selected');
      });
      timeButton.classList.add('selected');
    });

    timeGrid.appendChild(timeButton);
  });

  timeGroup.appendChild(timeGrid);
  dateTimeSection.appendChild(timeGroup);
  container.appendChild(dateTimeSection);

  // Guests selection
  const guestsSection = document.createElement('div');
  guestsSection.className = 'guests-section';
  guestsSection.innerHTML = `
    <div class="form-group">
      <label for="num-guests">Number of Guests</label>
      <div class="guests-control">
        <button type="button" class="guests-btn decrease" aria-label="Decrease guests">−</button>
        <input type="number" id="num-guests" value="${data.minGuests}" min="${data.minGuests}" max="${data.maxGuests}" readonly>
        <button type="button" class="guests-btn increase" aria-label="Increase guests">+</button>
      </div>
      <p class="guests-hint">${data.minGuests}-${data.maxGuests} guests</p>
    </div>
  `;

  const guestsInput = guestsSection.querySelector('#num-guests');
  const decreaseBtn = guestsSection.querySelector('.decrease');
  const increaseBtn = guestsSection.querySelector('.increase');

  decreaseBtn.addEventListener('click', () => {
    const current = parseInt(guestsInput.value, 10);
    if (current > data.minGuests) {
      guestsInput.value = current - 1;
    }
  });

  increaseBtn.addEventListener('click', () => {
    const current = parseInt(guestsInput.value, 10);
    if (current < data.maxGuests) {
      guestsInput.value = current + 1;
    }
  });

  container.appendChild(guestsSection);

  // Contact information
  const contactSection = document.createElement('div');
  contactSection.className = 'contact-section';
  contactSection.innerHTML = `
    <div class="form-group">
      <label for="contact-name">Your Name</label>
      <input type="text" id="contact-name" placeholder="John Doe" required>
    </div>
    <div class="form-group">
      <label for="contact-email">Email Address</label>
      <input type="email" id="contact-email" placeholder="john@example.com" required>
    </div>
    <div class="form-group">
      <label for="contact-phone">Phone Number</label>
      <input type="tel" id="contact-phone" placeholder="(555) 123-4567">
    </div>
    <div class="form-group">
      <label for="special-requests">Special Requests (Optional)</label>
      <textarea id="special-requests" rows="3" placeholder="Any dietary restrictions or special requests..."></textarea>
    </div>
  `;
  container.appendChild(contactSection);

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.className = 'submit-booking-btn';
  submitButton.textContent = 'Book Now';

  submitButton.addEventListener('click', () => {
    const selectedExperience = experiencesGrid.querySelector('.experience-card.selected');
    const selectedTime = timeGrid.querySelector('.time-slot.selected');
    const date = dateTimeSection.querySelector('#tasting-date').value;
    const numGuests = guestsInput.value;
    const name = contactSection.querySelector('#contact-name').value;
    const email = contactSection.querySelector('#contact-email').value;
    const phone = contactSection.querySelector('#contact-phone').value;
    const specialRequests = contactSection.querySelector('#special-requests').value;

    // Validation
    if (!selectedExperience) {
      showError('Please select a tasting experience');
      return;
    }
    if (!date) {
      showError('Please select a date');
      return;
    }
    if (!selectedTime) {
      showError('Please select a time slot');
      return;
    }
    if (!name || !email) {
      showError('Please fill in your name and email');
      return;
    }

    const experienceData = data.tastingExperiences.find(
      (exp) => exp.id === selectedExperience.dataset.experienceId,
    );

    const bookingDetails = {
      experience: experienceData.name,
      date,
      time: selectedTime.dataset.time,
      numGuests,
      contact: {
        name,
        email,
        phone,
      },
      specialRequests,
    };

    if (bridge) {
      // Send booking request back to conversation
      const message = formatBookingMessage(bookingDetails);
      bridge.sendMessage(message);
      showSuccess(container);
    } else {
      // Standalone mode - just show confirmation
      showSuccess(container);
    }
  });

  container.appendChild(submitButton);
  block.appendChild(container);
}

function getMinDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

function formatBookingMessage(details) {
  return `I'd like to book the following tasting:

Experience: ${details.experience}
Date: ${details.date}
Time: ${details.time}
Guests: ${details.numGuests}

Contact Information:
Name: ${details.contact.name}
Email: ${details.contact.email}
${details.contact.phone ? `Phone: ${details.contact.phone}` : ''}

${details.specialRequests ? `Special Requests: ${details.specialRequests}` : ''}

Please confirm availability.`;
}

function showError(message) {
  // Simple error display - could be enhanced with better UI
  // eslint-disable-next-line no-alert
  alert(message);
}

function showSuccess(container) {
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.innerHTML = `
    <div class="success-icon">✓</div>
    <h3>Booking Request Sent!</h3>
    <p>We'll confirm your reservation shortly.</p>
  `;

  container.textContent = '';
  container.appendChild(successMessage);

  // Optionally reset form after a delay
  setTimeout(() => {
    location.reload();
  }, 3000);
}
