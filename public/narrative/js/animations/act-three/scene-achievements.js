/**
 * Scene 9: The Achievements - Natural Scrollytelling Version
 * Pre-rendered achievement cards animate in/out based on scroll
 */

import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../../config/scroll-config.js';
import { createFloatingCards, animateFloatingCards } from '../helpers/floating-cards.js';
import { centerFixedContent } from '../helpers/scene-content.js';

/**
 * Initialize Scene 9 animations
 */
export function initScene9() {
  const scene = document.querySelector('.scene-achievements');
  if (!scene) {
    console.warn('Scene 9 (achievements) not found');
    return;
  }

  const content = scene.querySelector('.moment-content');
  const cardsContainer = scene.querySelector('#achievement-cards');
  const actThreeBg = document.getElementById('act-three-bg');

  // Fade fixed background from red to green
  gsap.to(actThreeBg, {
    backgroundColor: 'rgba(240, 253, 244, 0.5)',
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      end: TRIGGER_POSITIONS.CENTER,
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  // Create achievement cards from timeline data
  createFloatingCards(cardsContainer, {
    cardType: 'achievement',
    filterFn: e => e.type !== 'stressor' && e.title,
    maxCards: 32
  });

  // Position content centered on screen
  centerFixedContent(content);

  // Use timeline for fade in/out
  const textTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      end: TRIGGER_POSITIONS.EXIT_HIGH,
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  // Stay hidden until scene 8 fades out, then fade in, stay visible, fade out
  textTimeline
    .to(content, { opacity: 0, duration: 3 })
    .fromTo(content, { opacity: 0 }, { opacity: 1, duration: 1 })
    .to(content, { opacity: 1, duration: 5 })
    .to(content, { opacity: 0, duration: 1 });

  // Animate achievement cards
  animateFloatingCards(scene, cardsContainer);
}
