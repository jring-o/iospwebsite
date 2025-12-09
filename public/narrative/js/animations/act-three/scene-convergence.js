/**
 * Scene 10: The Convergence - Natural Scrollytelling Version
 * Black hole convergence animation inspired by v11
 */

import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../../config/scroll-config.js';

/**
 * Initialize Scene 10 animations
 */
export function initScene10() {
  const scene = document.querySelector('.scene-convergence');
  if (!scene) {
    console.warn('Scene 10 (convergence) not found');
    return;
  }

  const content = scene.querySelector('.moment-content');
  const actThreeBg = document.getElementById('act-three-bg');

  // Fade fixed background back to white
  gsap.to(actThreeBg,
    {
      backgroundColor: 'var(--color-bg)',
      scrollTrigger: {
        trigger: scene,
        start: TRIGGER_POSITIONS.ENTER_LOW,
        end: TRIGGER_POSITIONS.CENTER,
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    }
  );

  // Position content centered on screen (like other scenes)
  gsap.set(content, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50,
    width: '90%',
    maxWidth: '1000px',
    textAlign: 'center',
    margin: 0,
    padding: 0
  });

  // Use timeline for fade in/out
  const textTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      end: TRIGGER_POSITIONS.EXIT_HIGH,
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  // Stay hidden until scene 9 fades out, then fade in, stay visible, fade out
  textTimeline
    .to(content,
      { opacity: 0, duration: 2 } // Stay hidden while scene 9 is still visible
    )
    .fromTo(content,
      { opacity: 0 },
      { opacity: 1, duration: 1 } // Fade in after scene 9 fades out
    )
    .to(content,
      { opacity: 1, duration: 2 } // Stay visible briefly
    )
    .to(content,
      { opacity: 0, duration: 1 } // Fade out before convergence
    );

  // Create convergence dot and animate
  createConvergenceDot(scene);
  animateDotsConverging(scene);

  console.log('✅ Scene 10 (Convergence) initialized');
}

/**
 * Create convergence dot (black hole center point)
 */
function createConvergenceDot(scene) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2 + 80; // Position below center (below text)

  const dot = document.createElement('div');
  dot.className = 'convergence-dot';
  dot.style.position = 'fixed';
  dot.style.left = `${centerX}px`;
  dot.style.top = `${centerY}px`;
  dot.style.width = '16px'; // Smaller
  dot.style.height = '16px'; // Smaller
  dot.style.borderRadius = '50%';
  dot.style.backgroundColor = '#2563eb';
  dot.style.boxShadow = '0 0 40px rgba(37, 99, 235, 0.8)';
  dot.style.zIndex = '1500';
  dot.style.pointerEvents = 'none';

  document.body.appendChild(dot);

  // Animate with GSAP (no CSS animation interference)
  gsap.fromTo(dot,
    {
      opacity: 0,
      scale: 0.5,
      xPercent: -50,
      yPercent: -50
    },
    {
      opacity: 1,
      scale: 1.2, // Smaller scale
      scrollTrigger: {
        trigger: scene,
        start: TRIGGER_POSITIONS.CENTER,
        end: TRIGGER_POSITIONS.EXIT_MID,
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    }
  );

  return dot;
}

/**
 * Animate timeline dots converging to center (black hole swoosh effect)
 */
function animateDotsConverging(scene) {
  const dots = document.querySelectorAll('.event-dot');

  if (dots.length === 0) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2 + 80; // Same position as convergence dot (below text)
  const timelineSvg = document.getElementById('timeline-svg');
  const timelineRect = timelineSvg.getBoundingClientRect();

  // Create timeline for all convergence animations
  const convergenceTl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: TRIGGER_POSITIONS.CENTER,
      end: TRIGGER_POSITIONS.EXIT_MID,
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  const floatingDots = []; // Store references for cleanup

  dots.forEach((dot, index) => {
    const circle = dot.querySelector('circle');
    if (!circle) return;

    // Store original opacity for restoration
    if (!circle.hasAttribute('data-original-opacity')) {
      circle.setAttribute('data-original-opacity', circle.style.opacity || '1');
    }

    // Get current position of the dot in the timeline
    const cx = parseFloat(circle.getAttribute('cx'));
    const cy = parseFloat(circle.getAttribute('cy'));
    const screenX = timelineRect.left + cx;
    const screenY = timelineRect.top + cy;
    const color = window.getComputedStyle(circle).fill;
    const radius = parseFloat(circle.getAttribute('r')) || 5;

    // Create floating clone that matches timeline dot EXACTLY
    const floatingDot = document.createElement('div');
    floatingDot.className = 'convergence-floating-dot';
    floatingDot.style.position = 'fixed';
    floatingDot.style.left = `${screenX}px`;
    floatingDot.style.top = `${screenY}px`;
    floatingDot.style.width = `${radius * 2}px`;
    floatingDot.style.height = `${radius * 2}px`;
    floatingDot.style.borderRadius = '50%';
    floatingDot.style.backgroundColor = color;
    floatingDot.style.zIndex = '1200';
    floatingDot.style.opacity = '0'; // Start hidden
    floatingDot.style.pointerEvents = 'none';

    document.body.appendChild(floatingDot);
    floatingDots.push({ element: floatingDot, circle: circle });
  });

  // Step 1: Show all clones at once at timeline positions
  floatingDots.forEach(({ element: floatingDot, circle }) => {
    convergenceTl.set(floatingDot, { opacity: 0.8 }, 0);
    convergenceTl.set(circle, { opacity: 0 }, 0);
  });

  // Step 2: Swoop all dots to center with stagger for whoosh effect
  floatingDots.forEach(({ element: floatingDot }, index) => {
    const startX = parseFloat(floatingDot.style.left);
    const startY = parseFloat(floatingDot.style.top);
    const deltaX = centerX - startX;
    const deltaY = centerY - startY;

    convergenceTl.to(floatingDot, {
      x: deltaX, // Use x/y transforms (more performant than left/top)
      y: deltaY,
      opacity: 0,
      scale: 0.2,
      duration: 1,
      ease: 'power2.in',
    }, 0.2 + (index * 0.008)); // Start at 0.2s, stagger 0.008s per dot
  });

  // Add restore functionality on scroll back
  ScrollTrigger.create({
    trigger: scene,
    start: TRIGGER_POSITIONS.CENTER,
    onLeaveBack: () => {
      // Restore original SVG dots
      floatingDots.forEach(({ circle }) => {
        gsap.set(circle, { opacity: 1 });
      });
      // Remove floating clones
      floatingDots.forEach(({ element }) => {
        if (element.parentNode) element.remove();
      });
    }
  });

  // Fade out timeline background elements during convergence
  const timeline = document.querySelector('.timeline-fixed');
  if (timeline) {
    convergenceTl.to(timeline, {
      opacity: 0.1,
      duration: 0.8,
    }, 0);
  }
}
