/**
 * Tutorial Overlay
 * Shows onboarding instructions when user first enters the main timeline
 */

import { sceneNavigation } from '../utils/scene-navigation.js';
import { timelineState } from '../state/timeline-state.js';

class TutorialOverlay {
  constructor() {
    this.overlay = null;
    this.hasBeenShown = false;
    this.unsubscribe = null;
    this.STORAGE_KEY = 'timeline-tutorial-seen';
  }

  /**
   * Initialize the tutorial overlay
   */
  init() {
    // Check if tutorial was already seen
    if (this.hasSeenTutorial()) {
      console.log('Tutorial already seen, skipping');
      return;
    }

    // Subscribe to scene changes to detect when user enters timeline
    this.unsubscribe = sceneNavigation.onSceneChange((scene, index) => {
      // Show tutorial when user reaches first timeline event (era or simple)
      if (!this.hasBeenShown && scene && (scene.type === 'era' || scene.type === 'simple')) {
        // Small delay to let the timeline fully render
        setTimeout(() => {
          this.show();
        }, 800);
      }
    });

    console.log('Tutorial overlay initialized');
  }

  /**
   * Check if user has seen the tutorial before
   */
  hasSeenTutorial() {
    try {
      return localStorage.getItem(this.STORAGE_KEY) === 'true';
    } catch (e) {
      // localStorage might not be available
      return false;
    }
  }

  /**
   * Mark tutorial as seen
   */
  markAsSeen() {
    try {
      localStorage.setItem(this.STORAGE_KEY, 'true');
    } catch (e) {
      // localStorage might not be available
    }
  }

  /**
   * Manually show the tutorial (from help button)
   * Bypasses the hasBeenShown check
   */
  showManually() {
    // If already showing, don't show again
    if (this.overlay) return;
    this.createOverlay();
  }

  /**
   * Create and show the tutorial overlay (auto-triggered)
   */
  show() {
    if (this.hasBeenShown || this.overlay) return;
    this.hasBeenShown = true;
    this.createOverlay();
  }

  /**
   * Create the overlay DOM and show it
   */
  createOverlay() {

    this.overlay = document.createElement('div');
    this.overlay.className = 'tutorial-overlay';
    this.overlay.innerHTML = `
      <div class="tutorial-backdrop"></div>
      <div class="tutorial-content">
        <div class="tutorial-header">
          <h2>Welcome to the Timeline</h2>
          <p class="tutorial-subtitle">A journey through the events that shaped modern science</p>
        </div>

        <div class="tutorial-body">
          <p class="tutorial-intro">
            This interactive timeline shows the key developments, technologies, and institutional changes
            that led to the emergence of the modern scientific system.
          </p>

          <div class="tutorial-section">
            <h3>Navigation</h3>
            <div class="tutorial-controls">
              <div class="tutorial-control">
                <div class="tutorial-control-icon">
                  <span class="key-badge">←</span>
                  <span class="key-badge">→</span>
                </div>
                <div class="tutorial-control-text">
                  <strong>Arrow Keys</strong> or <strong>Event Buttons</strong><br>
                  <span class="tutorial-hint">Move between individual events</span>
                </div>
              </div>

              <div class="tutorial-control">
                <div class="tutorial-control-icon">
                  <span class="key-badge">Shift</span>
                  <span class="key-badge-plus">+</span>
                  <span class="key-badge">←</span>
                  <span class="key-badge">→</span>
                </div>
                <div class="tutorial-control-text">
                  <strong>Era Buttons</strong><br>
                  <span class="tutorial-hint">Jump between major eras</span>
                </div>
              </div>

              <div class="tutorial-control">
                <div class="tutorial-control-icon scroll-icon">
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                    <rect x="4" y="1" width="16" height="26" rx="8" stroke="currentColor" stroke-width="2"/>
                    <rect x="10" y="6" width="4" height="8" rx="2" fill="currentColor" class="scroll-wheel"/>
                  </svg>
                </div>
                <div class="tutorial-control-text">
                  <strong>Scroll</strong><br>
                  <span class="tutorial-hint">Naturally browse through events</span>
                </div>
              </div>

              <div class="tutorial-control">
                <div class="tutorial-control-icon">
                  <span class="button-badge">Last Event</span>
                </div>
                <div class="tutorial-control-text">
                  <strong>Skip Ahead</strong><br>
                  <span class="tutorial-hint">Jump to the end of the timeline</span>
                </div>
              </div>
            </div>
          </div>

          <div class="tutorial-section tutorial-eras">
            <h3>5 Major Eras</h3>
            <div class="tutorial-era-list">
              <span class="tutorial-era">Proto-Science</span>
              <span class="tutorial-era-arrow">→</span>
              <span class="tutorial-era">Pre-Science</span>
              <span class="tutorial-era-arrow">→</span>
              <span class="tutorial-era">Organized Science</span>
              <span class="tutorial-era-arrow">→</span>
              <span class="tutorial-era">Professional Science</span>
              <span class="tutorial-era-arrow">→</span>
              <span class="tutorial-era">Institutional Science</span>
            </div>
          </div>
        </div>

        <div class="tutorial-footer">
          <button class="tutorial-dismiss-btn" id="tutorial-dismiss">
            Got it, let's explore
          </button>
          <p class="tutorial-skip-hint">Press any key or scroll to dismiss</p>
        </div>

        <div class="tutorial-nav-pointer tutorial-pointer-right" id="pointer-nav">
          <span class="pointer-arrow">↗</span>
          <span class="pointer-label">Navigation controls</span>
        </div>

        <div class="tutorial-timeline-pointer" id="pointer-timeline">
          <span class="pointer-arrow">↓</span>
          <span class="pointer-label">Timeline visualization</span>
        </div>
      </div>
    `;

    document.body.appendChild(this.overlay);

    // Animate in
    requestAnimationFrame(() => {
      this.overlay.classList.add('visible');
    });

    // Setup dismissal handlers
    this.setupDismissHandlers();

    console.log('Tutorial overlay shown');
  }

  /**
   * Setup handlers to dismiss the tutorial
   */
  setupDismissHandlers() {
    const dismissBtn = document.getElementById('tutorial-dismiss');

    // Dismiss on button click
    if (dismissBtn) {
      dismissBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dismiss();
      });
    }

    // Dismiss on backdrop click
    const backdrop = this.overlay.querySelector('.tutorial-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.dismiss());
    }

    // Dismiss on any key press
    this.keyHandler = (e) => {
      // Don't dismiss on Tab (accessibility)
      if (e.key !== 'Tab') {
        this.dismiss();
      }
    };
    document.addEventListener('keydown', this.keyHandler, { once: true });

    // Dismiss on scroll (after a brief delay to avoid immediate dismissal)
    setTimeout(() => {
      this.scrollHandler = () => {
        this.dismiss();
      };
      window.addEventListener('scroll', this.scrollHandler, { once: true, passive: true });
    }, 500);
  }

  /**
   * Dismiss the tutorial overlay
   */
  dismiss() {
    if (!this.overlay) return;

    // Mark as seen
    this.markAsSeen();

    // Animate out
    this.overlay.classList.remove('visible');
    this.overlay.classList.add('hiding');

    // Remove after animation
    setTimeout(() => {
      if (this.overlay && this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      this.overlay = null;
    }, 400);

    // Cleanup event handlers
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    console.log('Tutorial dismissed');
  }

  /**
   * Reset tutorial (for testing - clears localStorage)
   */
  reset() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      this.hasBeenShown = false;
      console.log('Tutorial reset - will show again on next timeline entry');
    } catch (e) {
      // localStorage might not be available
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.dismiss();
  }
}

// Singleton instance
export const tutorialOverlay = new TutorialOverlay();

// Export for debugging
if (typeof window !== 'undefined') {
  window.tutorialOverlay = tutorialOverlay;
}
