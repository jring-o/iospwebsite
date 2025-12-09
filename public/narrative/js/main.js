/**
 * Timeline v15 - Main Entry Point
 * Initializes the timeline application with scrollytelling animations
 */

import { timelineState } from './state/timeline-state.js';
import { sceneManager } from './utils/scene-manager.js';
import { sceneNavigation } from './utils/scene-navigation.js';
import { initIntroAnimation, cleanupIntroAnimation } from './animations/intro-animation.js';
import { generateTimeline } from './renderers/unified-timeline-renderer.js';
import { generateEventSections } from './renderers/events-renderer.js';
import { initScrollAnimations } from './animations/scroll-animations.js';
import { initScene7 } from './animations/act-three/scene-stress.js';
import { initScene8 } from './animations/act-three/scene-breaking.js';
import { initScene9 } from './animations/act-three/scene-achievements.js';
import { initScene10 } from './animations/act-three/scene-convergence.js';
import { initSystemsAnimation } from './animations/systems-animation.js';
import { initScene14 } from './animations/act-three/scene-alternative.js';
import { initClosingScenes } from './animations/act-three/scene-closing.js';
import { scrollIndicator } from './components/scroll-indicator.js';
import { navigationButtons } from './components/navigation-buttons.js';
import { tutorialOverlay } from './components/tutorial-overlay.js';
import { progressTracker } from './components/progress-tracker.js';
import { MAIN_TIMELINE_CONFIG, ALT_TIMELINE_CONFIG } from './config/timeline-configs.js';

// Debug mode flag - set to false for production
const DEBUG = false;

function log(...args) {
  if (DEBUG) console.log(...args);
}

/**
 * Load timeline data from JSON
 */
async function loadTimelineData() {
  try {
    const response = await fetch('/narrative/events.json');
    const data = await response.json();
    timelineState.set('timelineData', data);
    log('Timeline data loaded:', data.events.length, 'events');
    return data;
  } catch (error) {
    console.error('Failed to load timeline data:', error);
    throw error;
  }
}

/**
 * Initialize application
 */
async function init() {
  log('Initializing Timeline v15...');

  // Check for reduced motion preference
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  timelineState.set('isReducedMotion', isReducedMotion);

  if (isReducedMotion) {
    log('Reduced motion detected - simplified experience');
  }

  try {
    // Load data
    await loadTimelineData();

    // Generate ALL content upfront
    generateEventSections();
    generateTimeline(MAIN_TIMELINE_CONFIG);

    // Generate alternative timeline immediately
    const { generateAltEvents } = await import('./renderers/alt-events-renderer.js');

    generateTimeline(ALT_TIMELINE_CONFIG);
    generateAltEvents();
    timelineState.set('actThree.altTimelineGenerated', true);
    log('Alternative timeline pre-generated');

    // Initialize animations (if not reduced motion)
    if (!isReducedMotion) {
      // Intro moments
      initIntroAnimation();

      // Main timeline scroll animations
      initScrollAnimations();

      // Act III scenes
      initScene7();
      initScene8();
      initScene9();
      initScene10();

      // Systems animation (4 moments)
      initSystemsAnimation();

      // Alternative timeline
      initScene14();

      // Closing scenes
      initClosingScenes();

      log('All animations initialized');
    } else {
      // For reduced motion, show all content immediately
      document.querySelectorAll('.event-dot').forEach(dot => {
        dot.classList.add('visible');
      });
      document.querySelectorAll('.moment-content').forEach(content => {
        content.style.opacity = '1';
        content.style.transform = 'none';
      });
      log('Reduced motion mode enabled');
    }

    // Wait for browser to complete layout before initializing navigation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          sceneNavigation.init();
          navigationButtons.init();
          scrollIndicator.init();
          tutorialOverlay.init();
          progressTracker.init();
          log('UI components initialized');
        }, 100);
      });
    });

    log('Timeline v15 initialized successfully');

    // Setup page visibility handling
    setupVisibilityHandling();

  } catch (error) {
    console.error('Initialization failed:', error);
  }
}

/**
 * Handle page visibility changes (pause animations when tab is hidden)
 */
function setupVisibilityHandling() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      const introActive = timelineState.get('intro.active');
      const systemsActive = timelineState.get('systems.active');

      if (introActive) {
        timelineState.set('intro.wasActiveBeforeHide', true);
        timelineState.set('intro.active', false);
      }

      if (systemsActive) {
        timelineState.set('systems.wasActiveBeforeHide', true);
        timelineState.set('systems.active', false);
      }

      log('Page hidden - animations paused');
    } else {
      if (timelineState.get('intro.wasActiveBeforeHide')) {
        timelineState.set('intro.active', true);
        timelineState.set('intro.wasActiveBeforeHide', false);
      }

      if (timelineState.get('systems.wasActiveBeforeHide')) {
        timelineState.set('systems.active', true);
        timelineState.set('systems.wasActiveBeforeHide', false);
      }

      log('Page visible - animations resumed');
    }
  });
}

/**
 * Emergency cleanup function (exposed to window for debugging)
 */
window.resetTimeline = function() {
  log('Emergency reset triggered');

  // Kill all GSAP animations and ScrollTriggers
  if (typeof gsap !== 'undefined') {
    gsap.killTweensOf('*');
  }
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  // Cleanup scene manager
  sceneManager.cleanupAll();

  // Cleanup intro
  cleanupIntroAnimation();

  // Cleanup UI components
  if (scrollIndicator) {
    scrollIndicator.destroy();
  }
  if (navigationButtons) {
    navigationButtons.destroy();
  }
  if (tutorialOverlay) {
    tutorialOverlay.destroy();
  }
  if (progressTracker) {
    progressTracker.destroy();
  }

  // Clear floating containers
  ['floating-dots', 'stressor-cards', 'achievement-cards', 'convergence-visual-container']
    .forEach(id => {
      const container = document.getElementById(id);
      if (container) container.innerHTML = '';
    });

  // Reset state
  timelineState.reset();

  log('Timeline reset complete');
};

/**
 * Debug utilities (exposed to window only in debug mode)
 */
if (DEBUG) {
  window.timelineDebug = {
    getState: () => timelineState.getState(),
    getHistory: () => timelineState.getHistory(),
    debugState: () => timelineState.debug(),
    debugScenes: () => sceneManager.debug(),

    trackElements: function() {
      setInterval(() => {
        const stats = {
          floatingDots: document.querySelectorAll('.floating-dot').length,
          introDots: document.querySelectorAll('.intro-dot').length,
          systemsDots: document.querySelectorAll('#systems-dots-container .intro-dot').length,
          stressorTexts: document.querySelectorAll('.floating-text-item.stressor').length,
          achievementTexts: document.querySelectorAll('.floating-text-item.achievement').length,
          convergenceFloatingDots: document.querySelectorAll('.convergence-floating-dot').length,
          activeTweens: gsap.getTweensOf('*').length,
          scrollTriggers: ScrollTrigger.getAll().length
        };
        console.table(stats);
      }, 2000);
    }
  };
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for testing
export { init };
