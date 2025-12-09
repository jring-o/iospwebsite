/**
 * Scroll Indicator
 * Animated prompt that appears on page load and fades after first scroll
 */

import { timelineState } from '../state/timeline-state.js';

class ScrollIndicator {
  constructor() {
    this.element = null;
    this.hasScrolled = false;
    this.scrollThreshold = 50; // pixels
  }

  /**
   * Initialize scroll indicator
   */
  init() {
    const isReducedMotion = timelineState.get('isReducedMotion');

    if (isReducedMotion) {
      console.log('⚠️ Scroll indicator disabled - reduced motion');
      return;
    }

    this.createIndicator();
    this.setupScrollListener();

    console.log('✅ Scroll indicator initialized');
  }

  /**
   * Create scroll indicator element
   */
  createIndicator() {
    this.element = document.createElement('div');
    this.element.className = 'scroll-indicator';
    this.element.innerHTML = `
      <div class="scroll-indicator-content">
        <div class="scroll-indicator-mouse">
          <div class="scroll-indicator-wheel"></div>
        </div>
        <div class="scroll-indicator-text">Scroll to explore</div>
        <div class="scroll-indicator-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14m0 0l-7-7m7 7l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    `;

    document.body.appendChild(this.element);

    // Fade in after a short delay
    setTimeout(() => {
      this.element.classList.add('visible');
    }, 500);
  }

  /**
   * Setup scroll listener to hide indicator
   */
  setupScrollListener() {
    let scrollTimeout;

    const handleScroll = () => {
      if (this.hasScrolled) return;

      const scrollY = window.scrollY;

      if (scrollY > this.scrollThreshold) {
        this.hasScrolled = true;
        this.hide();

        // Remove listener after hiding
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Also hide on user interaction with timeline
    const timeline = document.querySelector('.timeline-fixed');
    if (timeline) {
      timeline.addEventListener('click', () => {
        if (!this.hasScrolled) {
          this.hasScrolled = true;
          this.hide();
          window.removeEventListener('scroll', handleScroll);
        }
      });
    }
  }

  /**
   * Hide the indicator
   */
  hide() {
    if (!this.element) return;

    this.element.classList.remove('visible');
    this.element.classList.add('hidden');

    // Remove from DOM after animation completes
    setTimeout(() => {
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
        this.element = null;
      }
    }, 600);
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
  }
}

// Singleton instance
export const scrollIndicator = new ScrollIndicator();

// Export for debugging
if (typeof window !== 'undefined') {
  window.scrollIndicator = scrollIndicator;
}
