/**
 * Global Constants and Configuration
 * All magic numbers and configuration values in one place
 */

// Protocol configuration
export const PROTOCOLS = ['Inference', 'Quality', 'Engagement', 'Coordination', 'Preservation'];

export const PROTOCOL_COLORS = {
  'Inference': '#083A52',    // iosp-blue
  'Quality': '#177973',      // iosp-teal
  'Engagement': '#5B3A8F',   // iosp-purple
  'Coordination': '#C23555', // iosp-coral
  'Preservation': '#0191BD'  // iosp-cyan
};

export const PROTOCOL_SUBHEADS = {
  'Inference': 'Generate, analyze, experiment',
  'Quality': 'Verify, replicate, trust',
  'Engagement': 'Connect, share, discover',
  'Coordination': 'Credit, fund, recognize',
  'Preservation': 'Archive, access, persist'
};

// Intro animation configuration
export const INTRO_CONFIG = {
  USE_ALL_DOTS: true,
  MAX_DOTS_DESKTOP: 300,
  MAX_DOTS_TABLET: 100,
  MAX_DOTS_MOBILE: 50,
  ROTATION_SPEED: 0.15, // degrees per frame
  CIRCLE_RADIUS_FACTOR: 0.42, // multiplied by min(width, height)
  SMALL_CIRCLE_RADIUS_FACTOR: 0.12,
  RANDOM_OFFSET_LERP: 0.02,
  RANDOM_OFFSET_MAX: 20,
  RANDOM_TARGET_CHANGE_PROBABILITY: 0.01
};

// Timeline configuration
export const TIMELINE_CONFIG = {
  HEIGHT: 220, // pixels
  ERA_BREAK_YEAR: 1600,
  PROTO_PERCENT: 0.12,
  MODERN_PERCENT: 0.88,
  PADDING: {
    left: 100,
    right: 40,
    top: 20,
    bottom: 40
  }
};

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  CARD_SHRINK: 0.4,
  DOT_FALL: 0.6,
  DOT_RISE: 0.6,
  DOT_STAGGER: 0.4,
  FLOATING_LINE_MOVE: 0.6,
  ERA_CARD_MORPH: 0.4,
  TEXT_FADE: 0.5,
  CONVERGENCE_MOVE: 0.8,
  CONVERGENCE_ORBIT: 2.0
};

// Dot sizes
export const DOT_SIZES = {
  DEFAULT: 5,
  HOVER: 10,
  SHRUNK: 3.5,
  STRESSOR_PULSE_MAX: 8,
  FLOATING: 8,
  INTRO: 8,
  CONVERGENCE: 16
};

// Scene 8 & 9 configuration
export const FLOATING_TEXT_CONFIG = {
  MAX_STRESSORS: 6,
  MAX_ACHIEVEMENTS: 7,
  SPAWN_MIN_INTERVAL: 800, // ms
  SPAWN_MAX_INTERVAL: 1500, // ms
  LIFETIME_MIN: 2000, // ms
  LIFETIME_MAX: 3000, // ms
  POSITION_MIN_PERCENT: 15,
  POSITION_MAX_PERCENT: 85,
  FADE_IN_DURATION: 0.6,
  FADE_OUT_DURATION: 0.6,
  OPACITY_MAX: 0.8
};

// Systems animation configuration (Scenes 11-13)
export const SYSTEMS_CONFIG = {
  DOT_COUNT_DESKTOP: 50,
  DOT_COUNT_TABLET: 30,
  DOT_COUNT_MOBILE: 20,
  ROTATION_SPEED: 0.15,
  CIRCLE_RADIUS_FACTOR: 0.42,
  SMALL_CIRCLE_RADIUS_FACTOR: 0.12
};

// Hardcoded achievements for Scene 9
export const ACHIEVEMENTS = [
  { year: 1953, title: 'DNA Double Helix' },
  { year: 1947, title: 'Transistor Invented' },
  { year: 2003, title: 'Human Genome Project' },
  { year: 2020, title: 'AlphaFold Solves Protein Folding' },
  { year: 2020, title: 'COVID-19 Vaccine Development' },
  { year: 1969, title: 'Moon Landing' },
  { year: 1983, title: 'PCR Invented' },
  { year: 2016, title: 'AlphaGo Defeats Lee Sedol' },
  { year: 1687, title: 'Newton\'s Principia' },
  { year: 1905, title: 'Einstein\'s Annus Mirabilis' },
  { year: 1928, title: 'Penicillin Discovered' },
  { year: 1969, title: 'ARPANET First Connection' }
];

// Z-index layers
export const Z_INDEX = {
  TIMELINE: 1000,
  FLOATING_DOTS: 1001,
  CONVERGENCE_DOT: 1500,
  OVERLAY_TEXT: 1500,
  SCENE_TEXT: 100,
  SCENE_BACKGROUND: 1
};

// Mobile breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024
};
