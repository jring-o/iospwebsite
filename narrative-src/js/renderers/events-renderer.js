/**
 * Events Renderer
 * Generates event sections (era cards, simple events, stressor events)
 */

import { PROTOCOLS, PROTOCOL_COLORS } from '../config/constants.js';
import { timelineState } from '../state/timeline-state.js';

/**
 * Generate protocol details HTML for era cards
 * @param {object} eraData - Era data from events.json
 * @returns {string} - HTML string
 */
function generateProtocolDetailsHTML(eraData) {
  const howProtocolsFunctioned = eraData.howProtocolsFunctioned || eraData.protocols;
  if (!howProtocolsFunctioned) return '';

  const protocolRows = PROTOCOLS.map(protocolName => {
    const description = howProtocolsFunctioned[protocolName];
    if (!description) return '';

    return `
      <div class="protocol-row-simple">
        <div class="protocol-name-badge">
          ${protocolName}
        </div>
        <div class="protocol-function-text">${description}</div>
      </div>
    `;
  }).join('');

  const successFailureHTML = (eraData.success || eraData.failure) ? `
    <div class="era-success-failure">
      ${eraData.success ? `<div class="era-success"><strong>Success:</strong> ${eraData.success}</div>` : ''}
      ${eraData.failure ? `<div class="era-failure"><strong>Failure:</strong> ${eraData.failure}</div>` : ''}
    </div>
  ` : '';

  return `
    <div class="protocol-functions-container">
      <h3 class="protocol-section-title">How Protocols Functioned:</h3>
      ${protocolRows}
    </div>
    ${successFailureHTML}
  `;
}

/**
 * Generate all event sections
 */
export function generateEventSections() {
  const timelineData = timelineState.get('timelineData');
  if (!timelineData) {
    console.error('❌ Timeline data not loaded');
    return;
  }

  const container = document.getElementById('events-container');
  if (!container) {
    console.error('❌ events-container not found');
    return;
  }

  timelineData.events.forEach((event, index) => {
    // Special case: First event (Geber, 800) - render Proto-Science era card BEFORE it
    if (index === 0 && event.startsEra) {
      const eraSection = document.createElement('section');
      eraSection.className = 'event-section era-section';
      eraSection.dataset.type = 'era';
      eraSection.dataset.eventIndex = index;
      eraSection.dataset.year = event.year;
      eraSection.dataset.eraName = event.startsEra.name;

      const protocolDetailsHTML = generateProtocolDetailsHTML(event.startsEra);
      const yearsHTML = event.startsEra.years ? `<div class="era-years">${event.startsEra.years}</div>` : '';

      eraSection.innerHTML = `
        <div class="era-card">
          <div class="era-header-section">
            <div class="era-header-left">
              <h2 class="event-title">${event.startsEra.name}</h2>
              ${yearsHTML}
              ${event.startsEra.substrate ? `
                <div class="era-substrate-section">
                  <div class="era-substrate-label">
                    <span class="substrate-icon">⚙</span>
                    <strong>Technical Substrate</strong>
                  </div>
                  <p class="era-substrate-text">${event.startsEra.substrate}</p>
                </div>
              ` : ''}
            </div>
            ${event.startsEra.overview ? `
              <div class="era-header-right">
                <p class="era-overview">${event.startsEra.overview}</p>
              </div>
            ` : ''}
          </div>
          <div class="protocol-details-container">
            ${protocolDetailsHTML}
          </div>
        </div>
      `;

      container.appendChild(eraSection);
    }

    // Render the event as simple event (cardless, scroll past)
    // Only skip if it's the last event AND has startsEra (2025 Network Science)
    const isLastEvent = index === timelineData.events.length - 1;
    const shouldSkipSimpleEvent = event.startsEra && isLastEvent;

    if (!shouldSkipSimpleEvent) {
      const eventSection = document.createElement('section');

      // Check if this is a stressor event
      const isStressor = event.type === 'stressor';
      eventSection.className = isStressor ? 'stressor-event' : 'simple-event';
      eventSection.dataset.type = isStressor ? 'stressor' : 'simple';
      eventSection.dataset.eventIndex = index;
      eventSection.dataset.year = event.year;

      const protocolBadges = (event.affects || []).map(p =>
        `<span class="protocol-badge" style="background: ${PROTOCOL_COLORS[p]};">${p}</span>`
      ).join('');

      if (isStressor) {
        // Stressor event template
        const referenceHTML = event.reference ?
          `<div class="stressor-reference"><a href="${event.reference}" target="_blank" rel="noopener noreferrer">Source</a></div>` : '';

        // Check if this stressor has a startsEra (e.g., the first stressor introducing the concept)
        const stressorEraCardHTML = event.startsEra ? `
          <div class="stressor-era-card">
            <h3 class="stressor-era-title">${event.startsEra.name}</h3>
            <p class="stressor-era-overview">${event.startsEra.overview}</p>
          </div>
        ` : '';

        // Add era data attributes if this starts an "era"
        if (event.startsEra) {
          eventSection.dataset.eraName = event.startsEra.name;
        }

        eventSection.innerHTML = `
          <div class="stressor-event-content">
            ${stressorEraCardHTML}
            <div class="stressor-year">${event.year} ⚠</div>
            <div class="stressor-title">${event.title}</div>
            <div class="simple-protocols">${protocolBadges}</div>
            <div class="stressor-description">${event.description}</div>
            ${referenceHTML}
          </div>
        `;
      } else {
        // Regular simple event template
        const referenceHTML = event.reference ?
          `<div class="simple-reference"><a href="${event.reference}" target="_blank" rel="noopener noreferrer">Source</a></div>` : '';

        // Protocol effects section (if present)
        const protocolEffectsHTML = event.protocolEffects ?
          `<div class="protocol-effects">
            <div class="protocol-effects-title">Protocol Effects:</div>
            ${Object.entries(event.protocolEffects).map(([protocol, effect]) =>
              `<div class="protocol-effect">
                <span class="protocol-effect-name" style="color: ${PROTOCOL_COLORS[protocol]};">${protocol}:</span>
                <span class="protocol-effect-text">${effect}</span>
              </div>`
            ).join('')}
          </div>` : '';

        eventSection.innerHTML = `
          <div class="simple-event-content">
            <div class="simple-year">${event.year}</div>
            <div class="simple-title">${event.title}</div>
            <div class="simple-protocols">${protocolBadges}</div>
            <div class="simple-description">${event.description}</div>
            ${protocolEffectsHTML}
            ${referenceHTML}
          </div>
        `;
      }

      container.appendChild(eventSection);
    }

    // For all OTHER events with startsEra, add era card AFTER the event
    // Skip stressor events - their era card is rendered inline within the event
    if (event.startsEra && index !== 0 && event.type !== 'stressor') {
      const eraSection = document.createElement('section');
      eraSection.className = 'event-section era-section';
      eraSection.dataset.type = 'era';
      eraSection.dataset.eventIndex = index;
      eraSection.dataset.year = event.year;
      eraSection.dataset.eraName = event.startsEra.name;

      const protocolDetailsHTML = generateProtocolDetailsHTML(event.startsEra);
      const yearsHTML = event.startsEra.years ? `<div class="era-years">${event.startsEra.years}</div>` : '';

      eraSection.innerHTML = `
        <div class="era-card">
          <div class="era-header-section">
            <div class="era-header-left">
              <h2 class="event-title">${event.startsEra.name}</h2>
              ${yearsHTML}
              ${event.startsEra.substrate ? `
                <div class="era-substrate-section">
                  <div class="era-substrate-label">
                    <span class="substrate-icon">⚙</span>
                    <strong>Technical Substrate</strong>
                  </div>
                  <p class="era-substrate-text">${event.startsEra.substrate}</p>
                </div>
              ` : ''}
            </div>
            ${event.startsEra.overview ? `
              <div class="era-header-right">
                <p class="era-overview">${event.startsEra.overview}</p>
              </div>
            ` : ''}
          </div>
          <div class="protocol-details-container">
            ${protocolDetailsHTML}
          </div>
        </div>
      `;

      container.appendChild(eraSection);
    }
  });

  console.log('✅ Event sections generated');
}
