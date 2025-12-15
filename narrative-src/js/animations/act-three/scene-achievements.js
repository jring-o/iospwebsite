/**
 * Scene 9: The Stress - Natural Scrollytelling Version
 * Pre-rendered stressor cards animate in/out based on scroll
 */

import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../../config/scroll-config.js';
import { createFloatingCards, animateFloatingCards } from '../helpers/floating-cards.js';
import { centerFixedContent } from '../helpers/scene-content.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Toggle stress mode effects on timeline elements
 * @param {boolean} enable - Whether to enable or disable stress mode
 */
function toggleStressEffects(enable) {
  const timeline = document.querySelector('.timeline-fixed');
  const stressorDots = document.querySelectorAll('.event-dot.stressor-dot');
  const regularDots = document.querySelectorAll('.event-dot:not(.stressor-dot)');

  if (enable) {
    timeline?.classList.add('stress-mode');
    stressorDots.forEach(dot => dot.classList.add('pulsing', 'playing'));
    regularDots.forEach(dot => dot.classList.add('shrunk'));
  } else {
    timeline?.classList.remove('stress-mode');
    stressorDots.forEach(dot => dot.classList.remove('pulsing', 'playing'));
    regularDots.forEach(dot => dot.classList.remove('shrunk'));
  }
}

/**
 * Initialize Scene 9 animations
 */
export function initScene9() {
  const scene = document.querySelector('.scene-achievements');
  if (!scene) {
    console.warn('Scene 9 (stress) not found');
    return;
  }

  const content = scene.querySelector('.moment-content');
  const cardsContainer = scene.querySelector('#stressor-cards');
  const actThreeBg = document.getElementById('act-three-bg');

  // Fade fixed background to red (stress)
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
  if (cardsContainer) {
    createFloatingCards(cardsContainer, {
      cardType: 'stressor',
      filterFn: e => e.type === 'stressor',
      maxCards: 32
    });
  }

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

  // Animate stressor cards
  if (cardsContainer) {
    animateFloatingCards(cardsContainer, scene, {
      cardType: 'stressor'
    });
  }

  // Timeline pulse effect for stressor dots
  ScrollTrigger.create({
    trigger: scene,
    start: TRIGGER_POSITIONS.ENTER_HIGH,
    end: TRIGGER_POSITIONS.EXIT_MID,
    onEnter: () => toggleStressEffects(true),
    onLeave: () => toggleStressEffects(false),
    onEnterBack: () => toggleStressEffects(true),
    onLeaveBack: () => toggleStressEffects(false)
  });
}
