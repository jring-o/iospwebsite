/**
 * Scroll Animations
 * Handles era card morphing and event dot falling animations for MAIN timeline
 * Uses core animation functions for shared logic
 */

import { SCRUB_SPEEDS } from '../config/scroll-config.js';
import { timelineState } from '../state/timeline-state.js';
import { MAIN_TIMELINE_CONFIG } from '../config/timeline-configs.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  morphEraCardToLine as coreMorephEraCardToLine,
  unmorphLineToEraCard as coreUnmorphLineToEraCard,
  animateEventDotsFalling as coreAnimateEventDotsFalling,
  animateEventDotsRising as coreAnimateEventDotsRising
} from './core-scroll-animations.js';

/**
 * Morph era card to timeline divider line
 * Wrapper around core function with main timeline config
 */
function morphEraCardToLine(card, year, eventIndex, eraName) {
  coreMorephEraCardToLine(card, year, eventIndex, eraName, MAIN_TIMELINE_CONFIG);
}

/**
 * Unmorph line back to era card (reverse animation)
 * Wrapper around core function with main timeline config
 */
function unmorphLineToEraCard(card, year, eventIndex, eraName) {
  coreUnmorphLineToEraCard(card, year, eventIndex, eraName, MAIN_TIMELINE_CONFIG);
}

/**
 * Animate event dots falling from content to timeline
 * Wrapper around core function with main timeline config
 */
function animateEventDotsFalling(section, eventIndex) {
  const timelineData = timelineState.get('timelineData');
  const event = timelineData.events[eventIndex];
  const isStressor = event.type === 'stressor';

  coreAnimateEventDotsFalling(section, eventIndex, event, isStressor, MAIN_TIMELINE_CONFIG);
}

/**
 * Animate event dots rising from timeline back to content (reverse)
 * Wrapper around core function with main timeline config
 */
function animateEventDotsRising(section, eventIndex) {
  const timelineData = timelineState.get('timelineData');
  const event = timelineData.events[eventIndex];
  const isStressor = event.type === 'stressor';

  coreAnimateEventDotsRising(section, eventIndex, event, isStressor, MAIN_TIMELINE_CONFIG);
}

/**
 * Initialize scroll animations for era cards and events
 */
export function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Handle era card sections
  const eraSections = document.querySelectorAll('#events-container .era-section');

  eraSections.forEach((section) => {
    const eventIndex = parseInt(section.dataset.eventIndex);
    const eventYear = parseInt(section.dataset.year);
    const eraCard = section.querySelector('.era-card');
    const cardName = section.dataset.eraName || section.dataset.systemName;

    // Special handling for Proto-Science (first era card)
    const isProtoScience = cardName === 'Proto-Science';

    if (isProtoScience) {
      // Proto-Science: Fade in centered, then scroll up normally
      // Step 1: Set to centered position initially
      gsap.set(eraCard, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: '90%',
        maxWidth: '900px',
        margin: 0
      });

      // Step 2: Fade in while centered
      gsap.fromTo(eraCard,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: SCRUB_SPEEDS.SMOOTH
          }
        }
      );

      // Step 3: Transition to normal scroll flow (release from fixed)
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        onEnter: () => {
          // Release from fixed position, return to document flow
          gsap.set(eraCard, {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            xPercent: 0,
            yPercent: 0,
            transform: 'none'
          });
        }
      });
    } else {
      // All other era cards: Original scroll-up behavior
      gsap.fromTo(eraCard,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1
          }
        }
      );
    }

    // Morph to line as we scroll past (no pin!)
    ScrollTrigger.create({
      trigger: section,
      start: 'bottom 60%',
      onEnter: () => {
        morphEraCardToLine(eraCard, eventYear, eventIndex, cardName);
      },
      onLeaveBack: () => {
        if (eraCard.dataset.morphed === 'true') {
          unmorphLineToEraCard(eraCard, eventYear, eventIndex, cardName);
        }
      }
    });
  });

  // Handle simple events and stressor events
  const simpleEvents = document.querySelectorAll('.simple-event, .stressor-event');

  simpleEvents.forEach((section) => {
    const eventIndex = parseInt(section.dataset.eventIndex);

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      onEnter: () => {
        animateEventDotsFalling(section, eventIndex);
      },
      onLeaveBack: () => {
        // CRITICAL FIX: Kill any in-progress animations first
        gsap.killTweensOf(`.floating-dot[data-event-index="${eventIndex}"]`);

        // Remove any orphaned floating dots
        document.querySelectorAll(`.floating-dot[data-event-index="${eventIndex}"]`).forEach(el => {
          el.remove();
        });

        // Now animate rising
        animateEventDotsRising(section, eventIndex);
      }
    });
  });

  console.log('✅ Scroll animations initialized');
}
