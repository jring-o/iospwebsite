/**
 * Scroll Configuration - Simplified for Continuous Scrollytelling
 * No more phase interpolation - just simple durations and scroll speeds
 */

/**
 * Duration constants (in viewport heights)
 */
export const SCROLL_DURATIONS = {
  // Intro moments - each moment gets its own section
  INTRO_MOMENT_SHORT: 80,   // Quick moments
  INTRO_MOMENT_MEDIUM: 100, // Standard moments
  INTRO_MOMENT_LONG: 120,   // Longer dwell moments

  // Era cards - natural scroll
  ERA_ENTRANCE: 50,  // Time to fade in
  ERA_VISIBLE: 30,   // Time visible before morph
  ERA_MORPH: 30,     // Morph animation duration

  // Narrative scenes
  SCENE_SHORT: 80,
  SCENE_MEDIUM: 120,
  SCENE_LONG: 180,

  // Special scenes
  CONVERGENCE: 200,  // Needs more time for orbit
  SYSTEMS_MOMENT: 80,
};

/**
 * Scroll scrub speeds (how tight animations follow scroll)
 */
export const SCRUB_SPEEDS = {
  INSTANT: 0.1,    // Very tight to scroll
  SMOOTH: 0.1,     // Smooth follow
  LAZY: 1,         // Loose, delayed follow
  VERY_LAZY: 2,    // Very loose
};

/**
 * Common scroll trigger positions
 */
export const TRIGGER_POSITIONS = {
  // Entrance triggers
  ENTER_BOTTOM: 'top 90%',    // Element enters at bottom
  ENTER_LOW: 'top 80%',       // Element enters lower
  ENTER_MID: 'top 60%',       // Element enters middle
  ENTER_HIGH: 'top 40%',      // Element enters upper

  // Center triggers
  CENTER: 'center center',    // Element centered
  CENTER_LOW: 'center 60%',   // Element center, lower viewport
  CENTER_HIGH: 'center 40%',  // Element center, upper viewport

  // Exit triggers
  EXIT_HIGH: 'bottom 60%',    // Element exits at top
  EXIT_MID: 'bottom 40%',     // Element exits middle
  EXIT_LOW: 'bottom 20%',     // Element exits lower
  EXIT_TOP: 'bottom 10%',     // Element almost gone
};

/**
 * Get viewport height (updates on resize)
 */
export function getViewportHeight() {
  return window.innerHeight;
}

/**
 * Convert vh to pixels
 * @param {number} vh - Viewport height units
 * @returns {number} - Pixels
 */
export function vhToPixels(vh) {
  return (vh / 100) * getViewportHeight();
}

/**
 * Helper to create scroll distance string
 * @param {number} vh - Viewport heights
 * @returns {string} - e.g., "+=100vh"
 */
export function scrollDistance(vh) {
  return `+=${vh}vh`;
}

/**
 * Common ScrollTrigger configurations
 */
export const COMMON_CONFIGS = {
  // Fade in as element enters
  fadeIn: {
    start: TRIGGER_POSITIONS.ENTER_LOW,
    end: TRIGGER_POSITIONS.ENTER_HIGH,
    scrub: SCRUB_SPEEDS.SMOOTH,
  },

  // Fade out as element exits
  fadeOut: {
    start: TRIGGER_POSITIONS.EXIT_HIGH,
    end: TRIGGER_POSITIONS.EXIT_MID,
    scrub: SCRUB_SPEEDS.SMOOTH,
  },

  // Quick entrance
  quickEnter: {
    start: TRIGGER_POSITIONS.ENTER_MID,
    end: TRIGGER_POSITIONS.CENTER,
    scrub: SCRUB_SPEEDS.INSTANT,
  },

  // Slow, smooth transition
  slowTransition: {
    start: TRIGGER_POSITIONS.ENTER_LOW,
    end: TRIGGER_POSITIONS.CENTER,
    scrub: SCRUB_SPEEDS.LAZY,
  },

  // Active when centered
  whileCentered: {
    start: TRIGGER_POSITIONS.CENTER_HIGH,
    end: TRIGGER_POSITIONS.CENTER_LOW,
    scrub: SCRUB_SPEEDS.SMOOTH,
  },
};

/**
 * Animation easing presets
 */
export const EASINGS = {
  SMOOTH: 'power2.inOut',
  SMOOTH_IN: 'power2.in',
  SMOOTH_OUT: 'power2.out',
  ELASTIC: 'elastic.out(1, 0.5)',
  BOUNCE: 'bounce.out',
  LINEAR: 'none',
};

/**
 * Stagger configurations for multiple elements
 */
export const STAGGER = {
  TIGHT: 0.05,
  NORMAL: 0.1,
  LOOSE: 0.2,
  VERY_LOOSE: 0.4,
};

// Export all as default object for backward compatibility
export default {
  SCROLL_DURATIONS,
  SCRUB_SPEEDS,
  TRIGGER_POSITIONS,
  COMMON_CONFIGS,
  EASINGS,
  STAGGER,
  getViewportHeight,
  vhToPixels,
  scrollDistance,
};
