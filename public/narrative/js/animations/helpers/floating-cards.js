/**
 * Floating Cards Helper
 * Shared logic for creating and animating floating cards (stressors, achievements)
 */

import { SCRUB_SPEEDS } from '../../config/scroll-config.js';
import { timelineState } from '../../state/timeline-state.js';

/**
 * Create floating cards from data
 * @param {HTMLElement} container - Container element for cards
 * @param {object} options - Configuration options
 * @param {string} options.cardType - 'stressor' or 'achievement'
 * @param {function} options.filterFn - Filter function for events
 * @param {number} options.maxCards - Maximum number of cards to show
 */
export function createFloatingCards(container, options) {
  if (!container) return;

  const { cardType, filterFn, maxCards = 32 } = options;

  const timelineData = timelineState.get('timelineData');
  if (!timelineData) return;

  // Filter events based on provided function
  const filteredEvents = timelineData.events.filter(filterFn);

  // Randomly select cards
  const shuffled = [...filteredEvents].sort(() => Math.random() - 0.5);
  const cardsToShow = shuffled.slice(0, maxCards);

  cardsToShow.forEach((event, index) => {
    const card = document.createElement('div');
    card.className = `floating-card ${cardType}`;
    card.dataset.index = index;

    card.innerHTML = `
      <span class="floating-card-year">${event.year}</span>
      <div>${event.title}</div>
    `;

    // Random positioning (10-90% of container)
    const leftPercent = 10 + Math.random() * 80;
    const topPercent = 10 + Math.random() * 80;

    card.style.left = `${leftPercent}%`;
    card.style.top = `${topPercent}%`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    container.appendChild(card);
  });
}

/**
 * Animate floating cards based on scroll position
 * @param {HTMLElement} scene - Scene element (trigger)
 * @param {HTMLElement} container - Container with cards
 */
export function animateFloatingCards(scene, container) {
  if (!container) return;

  const cards = container.querySelectorAll('.floating-card');
  if (cards.length === 0) return;

  // Each card fades in/out at different scroll positions
  cards.forEach((card, index) => {
    const startOffset = index * 0.1;

    // Fade in
    gsap.to(card, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: scene,
        start: `${20 + startOffset * 50}% 50%`,
        end: `${30 + startOffset * 50}% 50%`,
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    });

    // Fade out
    gsap.to(card, {
      opacity: 0,
      y: -20,
      scrollTrigger: {
        trigger: scene,
        start: `${50 + startOffset * 50}% 50%`,
        end: `${60 + startOffset * 50}% 50%`,
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    });
  });
}
