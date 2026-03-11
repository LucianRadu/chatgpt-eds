const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

function injectLeafletCSS(container) {
  const root = container.getRootNode();
  if (root.querySelector && root.querySelector('link[href*="leaflet"]')) return Promise.resolve();
  if (root === document && document.querySelector('link[href*="leaflet"]')) return Promise.resolve();

  return fetch(LEAFLET_CSS)
    .then((r) => r.text())
    .then((css) => {
      const style = document.createElement('style');
      style.textContent = css;
      if (root instanceof ShadowRoot) {
        root.prepend(style);
      } else {
        container.ownerDocument.head.appendChild(style);
      }
    });
}

function loadLeaflet(container) {
  const loadJS = window.L
    ? Promise.resolve(window.L)
    : new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = LEAFLET_JS;
        script.onload = () => resolve(window.L);
        script.onerror = () => reject(new Error('Failed to load Leaflet'));
        document.head.appendChild(script);
      });

  return Promise.all([loadJS, injectLeafletCSS(container)]).then(([L]) => L);
}

function orangeMarkerIcon(L) {
  return L.divIcon({
    className: 'dealer-marker',
    html: '<svg width="28" height="40" viewBox="0 0 28 40"><path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.3 21.7 0 14 0z" fill="#ffa500" stroke="#c47800" stroke-width="1.5"/><circle cx="14" cy="13" r="6" fill="white"/></svg>',
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -36],
  });
}

function renderMap(container, dealers) {
  return loadLeaflet(container).then((L) => {
    const map = L.map(container, {
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    const icon = orangeMarkerIcon(L);
    const markers = {};

    dealers.forEach((dealer) => {
      const marker = L.marker([dealer.lat, dealer.lng], { icon }).addTo(map);
      marker.bindPopup(`<strong>${dealer.name}</strong><br>${dealer.address}`);
      markers[dealer.id] = marker;
    });

    const group = L.featureGroup(Object.values(markers));
    const bounds = group.getBounds().pad(0.15);
    map.fitBounds(bounds, { animate: false });

    setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { animate: false });
    }, 300);

    return { map, markers };
  });
}

const MOCK_DEALERS = [
  {
    id: 'autototal-depozit-1',
    name: 'AUTOTOTAL DEPOZIT București 1',
    address: 'Spl. Unirii, Nr. 96, Sector 4, 40038 București',
    distance: '1.1 km',
    phone: '0213164130',
    email: 'anvelope@autototal.ro',
    website: 'http://www.autototal.ro',
    lat: 44.4183,
    lng: 26.1108,
  },
  {
    id: 'autozone-barbu',
    name: 'AUTOZONE BARBU VACARESCU',
    address: 'Bd. Barbu Vacarescu, nr. 313-321, 20276 București',
    distance: '4 km',
    phone: '0212331900',
    email: null,
    website: 'http://www.autozone.ro',
    lat: 44.4625,
    lng: 26.1145,
  },
  {
    id: 'rotis-lux',
    name: 'ROTIS LUX',
    address: 'Sos. Pipera, nr. 41, 0142541 București',
    distance: '4.3 km',
    phone: '0212337474',
    email: 'office@rotislux.ro',
    website: null,
    lat: 44.4780,
    lng: 26.1100,
  },
  {
    id: 'diamar-trading',
    name: 'DIAMAR TRADING SRL',
    address: 'Str. Odorhei, Nr. 12, 21214 București',
    distance: '4.3 km',
    phone: '0214134910',
    email: 'diamar@diamar.ro',
    website: 'http://www.diamar.ro',
    lat: 44.4271,
    lng: 26.0532,
  },
  {
    id: 'nexxon-bucuresti',
    name: 'Nexxon — București',
    address: 'Calea Vitan, nr. 289, Sector 3, 31295 București',
    distance: '4.7 km',
    phone: '0213264100',
    email: 'contact@nexxon.ro',
    website: 'http://www.nexxon.ro',
    lat: 44.4100,
    lng: 26.1420,
  },
  {
    id: 'porsche-nord',
    name: 'Porsche București Nord',
    address: 'Bd. Pipera, nr. 2, 77190 Voluntari',
    distance: '5.2 km',
    phone: '0212068000',
    email: null,
    website: 'http://www.porsche.ro',
    lat: 44.4900,
    lng: 26.1190,
  },
  {
    id: 'roadhill-automotive',
    name: 'Roadhill Automotive',
    address: 'Sos. Oltenitei 219 bis, 077160 Popești Leordeni',
    distance: '5.5 km',
    phone: '0214500300',
    email: 'service@roadhill.ro',
    website: 'http://www.roadhill.ro',
    lat: 44.3750,
    lng: 26.1350,
  },
  {
    id: 'anvelope-ro',
    name: 'ANVELOPE.RO',
    address: 'Bulevardul Pipera, nr. 1E, 077191 Voluntari',
    distance: '6 km',
    phone: '0314255050',
    email: 'comenzi@anvelope.ro',
    website: 'http://www.anvelope.ro',
    lat: 44.4920,
    lng: 26.1200,
  },
  {
    id: 'autoerebus-nord',
    name: 'Autoerebus Nord',
    address: 'Str. Parcului, nr. 2, 12329 București',
    distance: '6.5 km',
    phone: '0216680410',
    email: null,
    website: null,
    lat: 44.4950,
    lng: 26.0800,
  },
  {
    id: 'memphis-98',
    name: "Memphis '98 SRL — Point S",
    address: 'Bd. Timișoara, Nr. 16 (sector 6), București',
    distance: '6.9 km',
    phone: '0214135500',
    email: 'office@memphis98.ro',
    website: 'http://www.memphis98.ro',
    lat: 44.4260,
    lng: 26.0290,
  },
];

function phoneIconSVG() {
  return '<svg class="dealer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function emailIconSVG() {
  return '<svg class="dealer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 6l-10 7L2 6" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function websiteIconSVG() {
  return '<svg class="dealer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#333" stroke-width="1.5"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function directionsIconSVG() {
  return '<svg class="dealer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="#333" stroke-width="1.5"/></svg>';
}

function directionsUrl(dealer) {
  const dest = encodeURIComponent(`${dealer.name}, ${dealer.address}`);
  return `https://www.google.com/maps/dir/Current+Location/${dest}/@${dealer.lat},${dealer.lng}/`;
}

function renderDealerCard(dealer, bridge) {
  const card = document.createElement('div');
  card.className = 'dealer-card';

  const contactRows = [];

  if (dealer.phone) {
    contactRows.push(`
      <div class="contact-row">
        ${phoneIconSVG()}
        <a class="contact-link" href="tel:${dealer.phone}">${dealer.phone}</a>
      </div>
    `);
  }

  if (dealer.email) {
    contactRows.push(`
      <div class="contact-row">
        ${emailIconSVG()}
        <a class="contact-link" href="mailto:${dealer.email}">${dealer.email}</a>
      </div>
    `);
  }

  if (dealer.website) {
    contactRows.push(`
      <div class="contact-row">
        ${websiteIconSVG()}
        <a class="contact-link contact-website" href="${dealer.website}" data-url="${dealer.website}">${dealer.website.replace(/^https?:\/\//, '')}</a>
      </div>
    `);
  }

  contactRows.push(`
    <div class="contact-row">
      ${directionsIconSVG()}
      <a class="contact-link contact-directions" href="${directionsUrl(dealer)}" data-url="${directionsUrl(dealer)}">Get directions</a>
    </div>
  `);

  card.innerHTML = `
    <div class="dealer-header">
      <h3 class="dealer-name">${dealer.name}</h3>
      <span class="dealer-distance">${dealer.distance}</span>
    </div>
    <div class="dealer-address">${dealer.address}</div>
    <div class="dealer-contacts">${contactRows.join('')}</div>
    <div class="dealer-actions">
      <button class="cta-btn" data-dealer="${dealer.name}">Find tires at this dealer</button>
    </div>
  `;

  card.querySelector('.cta-btn').addEventListener('click', () => {
    if (bridge?.sendMessage) {
      bridge.sendMessage(`I'd like to find tires at ${dealer.name}, ${dealer.address}`);
    }
  });

  card.querySelectorAll('.contact-website, .contact-directions').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('data-url');
      if (bridge?.openLink) {
        bridge.openLink(url);
      } else {
        window.open(url, '_blank');
      }
    });
  });

  return card;
}

export default async function decorate(block, bridge) {
  block.textContent = '';

  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.textContent = 'Finding nearby dealers\u2026';
  block.appendChild(loading);

  let dealers;

  try {
    if (bridge && bridge.toolResult) {
      const result = await bridge.toolResult;
      const sc = result?.structuredContent || result;
      dealers = sc?.dealers || [];
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[continental-find-dealers] Could not get tool data, using mock data', e);
  }

  if (!dealers || dealers.length === 0) {
    dealers = MOCK_DEALERS;
  }

  block.textContent = '';

  const layout = document.createElement('div');
  layout.className = 'dealers-layout';

  const leftPanel = document.createElement('div');
  leftPanel.className = 'dealers-panel-left';

  const header = document.createElement('div');
  header.className = 'dealers-header';
  header.innerHTML = `
    <h2 class="dealers-title">Continental Tire Dealers</h2>
    <span class="dealers-count">${dealers.length} results found</span>
  `;
  leftPanel.appendChild(header);

  const list = document.createElement('div');
  list.className = 'dealers-list';

  const cardElements = {};
  dealers.forEach((dealer) => {
    const card = renderDealerCard(dealer, bridge);
    card.setAttribute('data-dealer-id', dealer.id);
    cardElements[dealer.id] = card;
    list.appendChild(card);
  });

  leftPanel.appendChild(list);
  layout.appendChild(leftPanel);

  const mapContainer = document.createElement('div');
  mapContainer.className = 'dealers-map';
  mapContainer.id = `dealer-map-${Date.now()}`;
  layout.appendChild(mapContainer);

  block.appendChild(layout);

  renderMap(mapContainer, dealers)
    .then(({ markers }) => {
      dealers.forEach((dealer) => {
        const marker = markers[dealer.id];
        const card = cardElements[dealer.id];
        if (!marker || !card) return;

        marker.on('click', () => {
          block.querySelectorAll('.dealer-card.active').forEach((c) => c.classList.remove('active'));
          card.classList.add('active');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        card.addEventListener('click', (e) => {
          if (e.target.closest('a, button')) return;
          marker.openPopup();
        });
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.warn('[continental-find-dealers] Map could not be loaded', err);
      mapContainer.style.display = 'none';
    });
}
