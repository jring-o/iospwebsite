/**
 * Scene 7: The Stress - Natural Scrollytelling Version
 * Stressor dots pulse when scene is centered
 */

import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../../config/scroll-config.js';
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
 * Initialize Scene 7 animations
 */
export function initScene7() {
  const scene = document.querySelector('.scene-stress');
  if (!scene) {
    console.warn('Scene 7 (stress) not found');
    return;
  }

  const content = scene.querySelector('.moment-content');
  const actThreeBg = document.getElementById('act-three-bg');

  // Fade fixed background to light red
  gsap.to(actThreeBg, {
    backgroundColor: 'rgba(254, 242, 242, 0.3)',
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      end: TRIGGER_POSITIONS.CENTER,
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

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

  // Timeline pulse effect
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
