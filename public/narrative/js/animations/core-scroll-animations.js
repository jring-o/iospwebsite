/**
 * Core Scroll Animations
 * Shared animation logic for both main and alternative timelines
 * Makes code DRY and eliminates duplication
 */

import { PROTOCOL_COLORS, ANIMATION_DURATIONS } from '../config/constants.js';
import { sceneManager } from '../utils/scene-manager.js';
import { createSVGElement } from '../utils/dom-utils.js';

/**
 * Morph era card to timeline divider line
 * @param {HTMLElement} card - The era card element
 * @param {number} year - The year for the divider line
 * @param {number} eventIndex - Event index for data attributes
 * @param {string} eraName - Name of the era
 * @param {object} config - Timeline configuration
 */
export function morphEraCardToLine(card, year, eventIndex, eraName, config) {
  if (card.dataset.morphed === 'true') return;
  card.dataset.morphed = 'true';

  const xScale = config.getXScale();
  const cardRect = card.getBoundingClientRect();
  const cardCenterX = cardRect.left + cardRect.width / 2;
  const cardCenterY = cardRect.top + cardRect.height / 2;

  // Apply special year positioning if defined in config
  let lineYear = year;
  if (config.specialYears && config.specialYears[eraName]) {
    lineYear = config.specialYears[eraName];
  }

  const timelineRect = document.getElementById(config.svgId).getBoundingClientRect();
  const lineX = timelineRect.left + xScale(lineYear);
  const lineTopY = timelineRect.top + 20;
  const lineBottomY = timelineRect.top + timelineRect.height - 40;

  // Create floating line
  const floatingLine = document.createElement('div');
  floatingLine.style.position = 'absolute';
  floatingLine.style.width = '2px';
  floatingLine.style.height = '0px';
  floatingLine.style.background = config.isSystemCard ? '#3b82f6' : '#737373';
  floatingLine.style.left = `${cardCenterX}px`;
  floatingLine.style.top = `${cardCenterY}px`;
  floatingLine.style.opacity = '0';
  floatingLine.style.transformOrigin = 'top center';
  document.getElementById('floating-dots').appendChild(floatingLine);

  sceneManager.registerElement(floatingLine, `${config.prefix}-era-morph`);

  const tl = gsap.timeline();
  sceneManager.registerAnimation(tl, `${config.prefix}-era-morph`);

  // Phase 1: Card shrinks
  tl.to(card, {
    scaleX: 0.05,
    scaleY: 0.1,
    opacity: 0,
    duration: ANIMATION_DURATIONS.ERA_CARD_MORPH,
    ease: 'power2.in',
    onUpdate: function() {
      const currentRect = card.getBoundingClientRect();
      const currentCenterX = currentRect.left + currentRect.width / 2;
      const currentCenterY = currentRect.top + currentRect.height / 2;
      floatingLine.style.left = `${currentCenterX}px`;
      floatingLine.style.top = `${currentCenterY}px`;
    }
  });

  // Phase 2: Line appears
  tl.to(floatingLine, {
    opacity: 0.4,
    height: '20px',
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.2');

  // Phase 3: Line moves to timeline
  tl.to(floatingLine, {
    left: `${lineX}px`,
    top: `${lineTopY}px`,
    height: `${lineBottomY - lineTopY}px`,
    duration: ANIMATION_DURATIONS.FLOATING_LINE_MOVE,
    ease: 'power2.inOut',
    onComplete: () => {
      // Create SVG era divider
      const eraLine = createSVGElement('line', {
        x1: xScale(lineYear),
        y1: 20,
        x2: xScale(lineYear),
        y2: 140,
        stroke: config.isSystemCard ? '#3b82f6' : '#737373',
        'stroke-width': config.isSystemCard ? 2 : 1.5,
        'stroke-dasharray': '4,4',
        opacity: 0.4,
        class: 'era-divider',
        'data-event-index': eventIndex
      });
      document.getElementById(config.eraDividersId).appendChild(eraLine);

      // Create era label ONLY for era cards, NOT for system cards
      if (!config.isSystemCard) {
        const eraLabel = createSVGElement('text', {
          x: xScale(lineYear) + 5,
          y: 12,
          'text-anchor': 'start',
          'font-size': '0.7rem',
          fill: '#52525b',
          'font-weight': '600',
          class: 'era-label',
          'data-event-index': eventIndex
        });
        eraLabel.textContent = `${eraName} →`;
        document.getElementById(config.eraDividersId).appendChild(eraLabel);
      }

      floatingLine.remove();
    }
  });
}

/**
 * Unmorph line back to era card
 * @param {HTMLElement} card - The era card element
 * @param {number} year - The year for the divider line
 * @param {number} eventIndex - Event index for data attributes
 * @param {string} eraName - Name of the era
 * @param {object} config - Timeline configuration
 */
export function unmorphLineToEraCard(card, year, eventIndex, eraName, config) {
  if (card.dataset.morphed !== 'true') return;
  card.dataset.morphed = 'false';

  const xScale = config.getXScale();
  const timelineRect = document.getElementById(config.svgId).getBoundingClientRect();
  const lineX = timelineRect.left + xScale(year);
  const lineTopY = timelineRect.top + 20;
  const lineBottomY = timelineRect.top + timelineRect.height - 40;

  const cardRect = card.getBoundingClientRect();
  const cardCenterX = cardRect.left + cardRect.width / 2;
  const cardCenterY = cardRect.top + cardRect.height / 2;

  // Remove SVG elements
  const eraLine = document.querySelector(`.era-divider[data-event-index="${eventIndex}"]`);
  const eraLabel = document.querySelector(`.era-label[data-event-index="${eventIndex}"]`);
  if (eraLine) eraLine.remove();
  if (eraLabel) eraLabel.remove();

  // Create floating line
  const floatingLine = document.createElement('div');
  floatingLine.style.position = 'absolute';
  floatingLine.style.width = '2px';
  floatingLine.style.height = `${lineBottomY - lineTopY}px`;
  floatingLine.style.background = '#737373';
  floatingLine.style.left = `${lineX}px`;
  floatingLine.style.top = `${lineTopY}px`;
  floatingLine.style.opacity = '0.4';
  document.getElementById('floating-dots').appendChild(floatingLine);

  sceneManager.registerElement(floatingLine, `${config.prefix}-era-unmorph`);

  const tl = gsap.timeline();
  sceneManager.registerAnimation(tl, `${config.prefix}-era-unmorph`);

  // Phase 1: Line shrinks
  tl.to(floatingLine, {
    left: `${cardCenterX}px`,
    top: `${cardCenterY}px`,
    height: '0px',
    opacity: 0,
    duration: ANIMATION_DURATIONS.FLOATING_LINE_MOVE,
    ease: 'power2.inOut'
  });

  // Phase 2: Card expands
  tl.to(card, {
    scale: 1,
    opacity: 1,
    duration: ANIMATION_DURATIONS.ERA_CARD_MORPH,
    ease: 'back.out(1.5)',
    onComplete: () => {
      floatingLine.remove();
    }
  }, '-=0.2');
}

/**
 * Animate event dots falling from content to timeline
 * @param {HTMLElement} section - The event section
 * @param {number} eventIndex - Event index
 * @param {object} event - Event data
 * @param {boolean} isStressor - Whether this is a stressor event
 * @param {object} config - Timeline configuration
 */
export function animateEventDotsFalling(section, eventIndex, event, isStressor, config) {
  const xScale = config.getXScale();
  const yScaleForProtocol = config.getYScale();

  const eventContent = section.querySelector('.simple-event-content, .stressor-event-content');
  if (!eventContent) return;

  const contentRect = eventContent.getBoundingClientRect();
  const contentCenterX = contentRect.left + contentRect.width / 2;
  const contentCenterY = contentRect.top + contentRect.height / 2;

  const timelineRect = document.getElementById(config.svgId).getBoundingClientRect();
  const dotX = timelineRect.left + xScale(event.year);

  const floatingDots = [];

  // Create floating dots at event position
  (event.affects || []).forEach(protocol => {
    const floatingDot = document.createElement('div');
    floatingDot.className = 'floating-dot';
    floatingDot.dataset.eventIndex = eventIndex;
    floatingDot.dataset.protocol = protocol;
    floatingDot.style.background = isStressor ? '#ef4444' : PROTOCOL_COLORS[protocol];
    floatingDot.style.left = `${contentCenterX - 5}px`;
    floatingDot.style.top = `${contentCenterY - 5}px`;
    floatingDot.style.opacity = '0';
    document.getElementById('floating-dots').appendChild(floatingDot);

    sceneManager.registerElement(floatingDot, `${config.prefix}-event-${eventIndex}-fall`);
    floatingDots.push({ element: floatingDot, protocol });
  });

  const tl = gsap.timeline();
  sceneManager.registerAnimation(tl, `${config.prefix}-event-${eventIndex}-fall`);

  // Dots fall to timeline (staggered)
  floatingDots.forEach(({element, protocol}, idx) => {
    const dotY = timelineRect.top + yScaleForProtocol(protocol);

    tl.to(element, {
      left: `${dotX - 5}px`,
      top: `${dotY - 5}px`,
      opacity: 1,
      duration: ANIMATION_DURATIONS.DOT_FALL,
      ease: 'power2.inOut',
      onComplete: () => {
        const svgDot = document.querySelector(`.${config.dotClass}[data-event-index="${eventIndex}"][data-protocol="${protocol}"]`);
        if (svgDot) {
          gsap.killTweensOf(svgDot);
          gsap.set(svgDot, { opacity: 1, scale: 1 });
          svgDot.classList.add('visible');
        }
        element.remove();
      }
    }, idx === 0 ? 0 : '-=0.4');
  });
}

/**
 * Animate event dots rising from timeline back to content
 * @param {HTMLElement} section - The event section
 * @param {number} eventIndex - Event index
 * @param {object} event - Event data
 * @param {boolean} isStressor - Whether this is a stressor event
 * @param {object} config - Timeline configuration
 */
export function animateEventDotsRising(section, eventIndex, event, isStressor, config) {
  const xScale = config.getXScale();
  const yScaleForProtocol = config.getYScale();

  const eventContent = section.querySelector('.simple-event-content, .stressor-event-content');
  if (!eventContent) return;

  const contentRect = eventContent.getBoundingClientRect();
  const contentCenterX = contentRect.left + contentRect.width / 2;
  const contentCenterY = contentRect.top + contentRect.height / 2;

  const timelineRect = document.getElementById(config.svgId).getBoundingClientRect();
  const dotX = timelineRect.left + xScale(event.year);

  const floatingDots = [];

  // Hide SVG dots and create floating dots at timeline
  (event.affects || []).forEach(protocol => {
    const svgDot = document.querySelector(`.${config.dotClass}[data-event-index="${eventIndex}"][data-protocol="${protocol}"]`);
    if (svgDot) {
      svgDot.classList.remove('visible');
      gsap.set(svgDot, { opacity: 0, scale: 0 });
    }

    const dotY = timelineRect.top + yScaleForProtocol(protocol);
    const floatingDot = document.createElement('div');
    floatingDot.className = 'floating-dot';
    floatingDot.dataset.eventIndex = eventIndex;
    floatingDot.dataset.protocol = protocol;
    floatingDot.style.background = isStressor ? '#ef4444' : PROTOCOL_COLORS[protocol];
    floatingDot.style.left = `${dotX - 5}px`;
    floatingDot.style.top = `${dotY - 5}px`;
    floatingDot.style.opacity = '1';
    document.getElementById('floating-dots').appendChild(floatingDot);

    sceneManager.registerElement(floatingDot, `${config.prefix}-event-${eventIndex}-rise`);
    floatingDots.push({ element: floatingDot, protocol });
  });

  const tl = gsap.timeline();
  sceneManager.registerAnimation(tl, `${config.prefix}-event-${eventIndex}-rise`);

  // Animate dots rising and fading
  floatingDots.forEach(({element}, idx) => {
    tl.to(element, {
      left: `${contentCenterX - 5}px`,
      top: `${contentCenterY - 5}px`,
      opacity: 0,
      duration: ANIMATION_DURATIONS.DOT_RISE,
      ease: 'power2.inOut',
      onComplete: () => {
        element.remove();
      }
    }, idx === 0 ? 0 : '-=0.5');
  });
}
