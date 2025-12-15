/**
 * Scene 7: The Achievements - Natural Scrollytelling Version
 * Shows achievement cards floating behind the text
 */

import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../../config/scroll-config.js';
import { createFloatingCards, animateFloatingCards } from '../helpers/floating-cards.js';
import { centerFixedContent } from '../helpers/scene-content.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Initialize Scene 7 animations
 */
export function initScene7() {
  const scene = document.querySelector('.scene-stress');
  if (!scene) {
    console.warn('Scene 7 (achievements) not found');
    return;
  }

  const content = scene.querySelector('.moment-content');
  const cardsContainer = scene.querySelector('#achievement-cards');
  const actThreeBg = document.getElementById('act-three-bg');

  // Fade fixed background to light green (positive/achievements)
  gsap.to(actThreeBg, {
    backgroundColor: 'rgba(240, 253, 244, 0.4)',
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      end: TRIGGER_POSITIONS.CENTER,
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  // Create achievement cards from timeline data
  if (cardsContainer) {
    createFloatingCards(cardsContainer, {
      cardType: 'achievement',
      filterFn: e => e.type !== 'stressor' && e.title,
      maxCards: 32
    });
  }

  // Position content centered on screen
  centerFixedContent(content);

  // Get scene 8 to sync fade-out timing
  const scene8 = document.querySelector('.scene-breaking');

  // Use timeline spanning from scene 7 to scene 8
  const textTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_MID,
      endTrigger: scene8,
      end: 'top 50%',
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  // Fade in, stay visible longer, then fade out as scene 8 fades in
  textTimeline
    .fromTo(content, { opacity: 0 }, { opacity: 1, duration: 1 })
    .to(content, { opacity: 1, duration: 8 })
    .to(content, { opacity: 0, duration: 1 });

  // Animate floating cards
  if (cardsContainer) {
    animateFloatingCards(cardsContainer, scene, {
      cardType: 'achievement'
    });
  }
}
