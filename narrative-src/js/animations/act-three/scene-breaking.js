/**
 * Scene 8: The Context - Natural Scrollytelling Version
 * Transitional scene: "emerged from a different world"
 */

import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../../config/scroll-config.js';
import { centerFixedContent } from '../helpers/scene-content.js';
import { gsap } from "gsap";

/**
 * Initialize Scene 8 animations
 */
export function initScene8() {
  const scene = document.querySelector('.scene-breaking');
  if (!scene) {
    console.warn('Scene 8 (context) not found');
    return;
  }

  const content = scene.querySelector('.moment-content');
  const scene9 = document.querySelector('.scene-achievements');

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
}
