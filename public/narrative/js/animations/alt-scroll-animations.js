/**
 * Alternative Timeline Scroll Animations
 * Handles era card morphing and dot falling for alternative timeline
 * Uses core animation functions - NO CODE DUPLICATION
 */

import { PROTOCOL_COLORS, ANIMATION_DURATIONS } from '../config/constants.js';
import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../config/scroll-config.js';
import { sceneManager } from '../utils/scene-manager.js';
import { ALT_TIMELINE_CONFIG } from '../config/timeline-configs.js';
import { alternativeEventsData } from '../data/alternative-events.js';
import {
  morphEraCardToLine as coreMorphEraCardToLine,
  unmorphLineToEraCard as coreUnmorphLineToEraCard,
  animateEventDotsFalling as coreAnimateEventDotsFalling,
  animateEventDotsRising as coreAnimateEventDotsRising
} from './core-scroll-animations.js';

/**
 * Morph alternative era card to line
 * Wrapper around core function with alt timeline config
 */
function morphAltEraCardToLine(card, year, eventIndex, eraName, isSystemCard) {
  const config = { ...ALT_TIMELINE_CONFIG, isSystemCard };
  coreMorphEraCardToLine(card, year, eventIndex, eraName, config);
}

/**
 * Unmorph alternative line to era card
 * Wrapper around core function with alt timeline config
 */
function unmorphAltLineToEraCard(card, year, eventIndex, eraName) {
  coreUnmorphLineToEraCard(card, year, eventIndex, eraName, ALT_TIMELINE_CONFIG);
}

/**
 * Animate alternative event dots falling
 * Wrapper around core function with alt timeline config
 */
function animateAltEventDotsFalling(section, eventIndex, event, isStressor) {
  coreAnimateEventDotsFalling(section, eventIndex, event, isStressor, ALT_TIMELINE_CONFIG);
}

/**
 * Animate alternative event dots rising
 * Wrapper around core function with alt timeline config
 */
function animateAltEventDotsRising(section, eventIndex, event, isStressor) {
  coreAnimateEventDotsRising(section, eventIndex, event, isStressor, ALT_TIMELINE_CONFIG);
}

/**
 * Initialize alternative timeline scroll animations
 * SIMPLIFIED - No special cases, no pinning, natural scroll flow
 */
export function initAltScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Handle era sections
  const eraSections = document.querySelectorAll('#alt-events-container .alt-event-section.era-section');

  eraSections.forEach((section) => {
    const eventIndex = parseInt(section.dataset.eventIndex);
    const eventYear = parseInt(section.dataset.year);
    const eraCard = section.querySelector('.alt-era-card');
    const cardName = section.dataset.eraName || section.dataset.systemName;
    const isSystemCard = section.classList.contains('system-section');

    // Use year from dataset if available (for eras that start at different year than event)
    const lineYear = section.dataset.eraYear ? parseInt(section.dataset.eraYear) : eventYear;

    // Special handling for Digitalization Era - centered fade in
    const isDigitalizationEra = cardName === 'The Digitalization Era';

    if (isDigitalizationEra) {
      // Position card centered on screen (fixed)
      gsap.set(eraCard, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: '90%',
        maxWidth: '900px',
        margin: 0,
        zIndex: 100 // Above thousands dots (z-index: 5)
      });

      // Fade in centered (bidirectional - works forwards and backwards)
      gsap.fromTo(eraCard,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'center center',
            scrub: SCRUB_SPEEDS.SMOOTH,
            toggleActions: 'play reverse play reverse' // Reverse on scroll back
          }
        }
      );

      // Handle scrolling back - fade out
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onLeaveBack: () => {
          gsap.to(eraCard, {
            opacity: 0,
            duration: 0.5
          });
        }
      });
    } else {
      // Normal entrance animation (slide up + fade)
      gsap.fromTo(eraCard,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 50%',
            scrub: SCRUB_SPEEDS.SMOOTH
          }
        }
      );
    }

    // Morph to line as we scroll past (consistent with main timeline)
    ScrollTrigger.create({
      trigger: section,
      start: ALT_TIMELINE_CONFIG.scrollTriggers.eraCardMorph,
      onEnter: () => {
        morphAltEraCardToLine(eraCard, lineYear, eventIndex, cardName, isSystemCard);
      },
      onLeaveBack: () => {
        if (eraCard.dataset.morphed === 'true') {
          unmorphAltLineToEraCard(eraCard, lineYear, eventIndex, cardName);
        }
      }
    });
  });

  // Handle simple events and stressor events
  const simpleEvents = document.querySelectorAll('#alt-events-container .alt-simple-event, #alt-events-container .alt-stressor-event');

  simpleEvents.forEach((section) => {
    const eventIndex = parseInt(section.dataset.eventIndex);
    const event = alternativeEventsData[eventIndex];
    if (!event) return;

    const isStressor = event.type === 'stressor';

    ScrollTrigger.create({
      trigger: section,
      start: ALT_TIMELINE_CONFIG.scrollTriggers.eventDotFall,
      onEnter: () => {
        animateAltEventDotsFalling(section, eventIndex, event, isStressor);
      },
      onLeaveBack: () => {
        // Kill any in-progress animations
        gsap.killTweensOf(`.floating-dot[data-event-index="${eventIndex}"]`);

        // Remove orphaned floating dots
        document.querySelectorAll(`.floating-dot[data-event-index="${eventIndex}"]`).forEach(el => {
          el.remove();
        });

        // Animate rising
        animateAltEventDotsRising(section, eventIndex, event, isStressor);
      }
    });
  });

  console.log('✅ Alternative scroll animations initialized (unified architecture)');
}
