/**
 * Scene 14: The Alternative Timeline
 * REFACTORED - Uses unified architecture, no code duplication
 * Crossfade to alternative timeline, move convergence dots to timeline markers
 */

import { PROTOCOLS, PROTOCOL_COLORS } from '../../config/constants.js';
import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../../config/scroll-config.js';
import { timelineState } from '../../state/timeline-state.js';
import { sceneManager } from '../../utils/scene-manager.js';
import { ALT_TIMELINE_CONFIG } from '../../config/timeline-configs.js';
import { generateTimeline } from '../../renderers/unified-timeline-renderer.js';
import { generateAltEvents } from '../../renderers/alt-events-renderer.js';
import { initAltScrollAnimations } from '../alt-scroll-animations.js';

/**
 * Cleanup Scene 14
 */
function cleanupSceneAlternative() {
  // Hide alternative timeline
  const altTimelineFixed = document.getElementById('alt-timeline-fixed');
  if (altTimelineFixed) {
    altTimelineFixed.classList.remove('visible');
    altTimelineFixed.style.opacity = '0';
  }

  // Remove marker lines
  document.querySelector('.institutional-marker-line')?.remove();
  document.querySelector('.corporate-marker-line')?.remove();
  document.querySelector('.benefactor-marker-line')?.remove();

  // Remove system labels
  document.querySelectorAll('.system-timeline-label').forEach(el => el.remove());

  // Reset generation flag
  timelineState.set('actThree.altTimelineGenerated', false);

  console.log('🧹 Scene 14 cleaned up');
}

/**
 * Initialize Scene 14: The Alternative
 */
export function initScene14() {
  const scene = document.querySelector('.scene-alternative-wrapper');
  if (!scene) {
    console.warn('⚠️ Scene 14 section not found');
    return;
  }

  sceneManager.registerScene('scene-14', {
    onEnter: (direction) => {
      console.log('🎬 Scene 14: Enter from', direction);
    },
    onExit: (direction) => {
      console.log('🎬 Scene 14: Exit to', direction);
    },
    cleanup: cleanupSceneAlternative
  });

  // NO PINNING - Natural scroll crossfade
  const mainTimeline = document.querySelector('.timeline-fixed');
  const altTimeline = document.getElementById('alt-timeline-fixed');

  // Alternative timeline already generated in main.js
  // Just initialize scroll animations if not already done
  if (!timelineState.get('actThree.altScrollAnimationsInitialized')) {
    initAltScrollAnimations();
    timelineState.set('actThree.altScrollAnimationsInitialized', true);
  }

  // Hide the convergence dot from Scene 10
  const convergenceDot = document.querySelector('.convergence-dot');
  if (convergenceDot) {
    gsap.to(convergenceDot, {
      opacity: 0,
      scale: 0,
      scrollTrigger: {
        trigger: scene,
        start: TRIGGER_POSITIONS.ENTER_LOW,
        end: TRIGGER_POSITIONS.ENTER_MID,
        scrub: SCRUB_SPEEDS.INSTANT,
      }
    });
  }

  // Crossfade timelines as we scroll through scene
  gsap.to(mainTimeline, {
    opacity: 0,
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      end: TRIGGER_POSITIONS.CENTER,
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  // Fade IN alternative timeline to FULL opacity (faster)
  gsap.to(altTimeline, {
    opacity: 1,
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      end: TRIGGER_POSITIONS.ENTER_MID, // Faster: top 80% → top 60%
      scrub: SCRUB_SPEEDS.INSTANT, // Tighter scrub (0.1)
      onEnter: () => {
        altTimeline.classList.add('visible');
      }
    }
  });

  // Move convergence dots to alternative timeline positions
  moveConvergenceDotsToAltTimeline(scene);

  // Reverse crossfade when scrolling back
  ScrollTrigger.create({
    trigger: scene,
    start: TRIGGER_POSITIONS.ENTER_LOW,
    onLeaveBack: () => {
      gsap.to(mainTimeline, { opacity: 1, duration: 0.5 });
      gsap.to(altTimeline, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          altTimeline.classList.remove('visible');
        }
      });
    }
  });

  console.log('✅ Scene 14 (Alternative Timeline) initialized - unified architecture');
}

/**
 * Move the three convergence dots to alternative timeline year positions
 * Blue (Institutional) → 1950, Red (Corporate) → 1980, Green (Benefactor) → 2017
 */
function moveConvergenceDotsToAltTimeline(scene) {
  // Select the three system convergence dots by class
  const institutionalDot = document.querySelector('.institutional-dot');
  const corporateDot = document.querySelector('.corporate-dot');
  const benefactorDot = document.querySelector('.benefactor-dot');

  console.log('🔍 Found system dots:', { institutionalDot, corporateDot, benefactorDot });

  if (!institutionalDot || !corporateDot || !benefactorDot) {
    console.warn('⚠️ System convergence dots not found for alternative timeline animation');
    return;
  }

  // HARDCODE the exact years we want - these are canonical system emergence dates
  const targetYears = {
    institutional: 1950,  // NSF Created
    corporate: 1980,      // Genentech IPO
    benefactor: 2017      // Last major pluralist event
  };

  console.log('🎯 Target years for dots:', targetYears);

  // Wait for alternative timeline to be generated, then set up dot animations
  ScrollTrigger.create({
    trigger: scene,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      // Give the timeline a moment to generate
      setTimeout(() => {
        const altSvg = document.getElementById(ALT_TIMELINE_CONFIG.svgId);
        if (!altSvg) {
          console.warn('⚠️ Alternative SVG not found for dot animation');
          return;
        }

        const altXScale = ALT_TIMELINE_CONFIG.getXScale();
        if (!altXScale) {
          console.warn('⚠️ altXScale not available for dot animation');
          return;
        }

        const altRect = altSvg.getBoundingClientRect();

        // Calculate target X positions for each year on the alternative timeline
        const xInstitutional = altRect.left + altXScale(targetYears.institutional);
        const xCorporate = altRect.left + altXScale(targetYears.corporate);
        const xBenefactor = altRect.left + altXScale(targetYears.benefactor);

        // Get Y position (below the year labels, not in middle of timeline)
        const timelineY = altRect.bottom + 5; // 55px below the timeline (under the year labels)

        console.log('🎯 Animating dots to positions:', {
          institutional: { x: xInstitutional, y: timelineY, year: targetYears.institutional },
          corporate: { x: xCorporate, y: timelineY, year: targetYears.corporate },
          benefactor: { x: xBenefactor, y: timelineY, year: targetYears.benefactor },
          altRect,
          altXScale: { test1950: altXScale(1950), test1980: altXScale(1980), test2017: altXScale(2017) }
        });

        // Animate blue dot (institutional) to 1950
        // Need to account for xPercent: -50, yPercent: -50 transforms
        gsap.to(institutionalDot, {
          left: xInstitutional,
          top: timelineY,
          xPercent: -50,
          yPercent: -50,
          scrollTrigger: {
            trigger: scene,
            start: TRIGGER_POSITIONS.ENTER_LOW,
            end: TRIGGER_POSITIONS.ENTER_HIGH, // Slightly slower (top 40%)
            scrub: 0.15, // Tiny bit smoother than INSTANT (0.1)
            onEnter: () => console.log('🔵 Blue dot animation started'),
            onComplete: () => console.log('🔵 Blue dot at 1950')
          }
        });

        // Animate red dot (corporate) to 1980
        gsap.to(corporateDot, {
          left: xCorporate,
          top: timelineY,
          xPercent: -50,
          yPercent: -50,
          scrollTrigger: {
            trigger: scene,
            start: TRIGGER_POSITIONS.ENTER_LOW,
            end: TRIGGER_POSITIONS.ENTER_HIGH, // Slightly slower (top 40%)
            scrub: 0.15, // Tiny bit smoother than INSTANT (0.1)
            onEnter: () => console.log('🔴 Red dot animation started'),
            onComplete: () => console.log('🔴 Red dot at 1980')
          }
        });

        // Animate green dot (benefactor) to 2017
        gsap.to(benefactorDot, {
          left: xBenefactor,
          top: timelineY,
          xPercent: -50,
          yPercent: -50,
          scrollTrigger: {
            trigger: scene,
            start: TRIGGER_POSITIONS.ENTER_LOW,
            end: TRIGGER_POSITIONS.ENTER_HIGH, // Slightly slower (top 40%)
            scrub: 0.15, // Tiny bit smoother than INSTANT (0.1)
            onEnter: () => console.log('🟢 Green dot animation started'),
            onComplete: () => console.log('🟢 Green dot at 2017')
          }
        });
      }, 200); // Small delay to ensure timeline is generated
    }
  });
}
