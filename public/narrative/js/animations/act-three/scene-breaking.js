/**
 * Scene 8: The Breaking - Natural Scrollytelling Version
 * Pre-rendered stressor cards animate in/out based on scroll
 */

import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../../config/scroll-config.js';
import { createFloatingCards, animateFloatingCards } from '../helpers/floating-cards.js';
import { centerFixedContent } from '../helpers/scene-content.js';

/**
 * Initialize Scene 8 animations
 */
export function initScene8() {
  const scene = document.querySelector('.scene-breaking');
  if (!scene) {
    console.warn('Scene 8 (breaking) not found');
    return;
  }

  const content = scene.querySelector('.moment-content');
  const cardsContainer = scene.querySelector('#stressor-cards');
  const scene9 = document.querySelector('.scene-achievements');
  const actThreeBg = document.getElementById('act-three-bg');

  // Fade fixed background to darker red
  gsap.to(actThreeBg, {
    backgroundColor: 'rgba(254, 242, 242, 0.5)',
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      end: TRIGGER_POSITIONS.CENTER,
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  // Create stressor cards from timeline data
  createFloatingCards(cardsContainer, {
    cardType: 'stressor',
    filterFn: e => e.type === 'stressor',
    maxCards: 32
  });

  // Position content centered on screen
  centerFixedContent(content);

  // Use timeline for fade in/out
  const textTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      endTrigger: scene9,
      end: 'top 50%',
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  // Stay hidden until scene 7 fades out, then fade in, stay visible, fade out
  textTimeline
    .to(content, { opacity: 0, duration: 3 })
    .fromTo(content, { opacity: 0 }, { opacity: 1, duration: 1 })
    .to(content, { opacity: 1, duration: 5 })
    .to(content, { opacity: 0, duration: 1 });

  // Animate stressor cards in/out based on scroll
  animateFloatingCards(scene, cardsContainer);
}
