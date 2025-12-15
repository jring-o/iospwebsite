/**
 * Tutorial Overlay
 * Shows onboarding instructions when user first enters the main timeline
 */

import { sceneNavigation } from '../utils/scene-navigation.js';

class TutorialOverlay {
  constructor() {
    this.overlay = null;
    this.hasBeenShown = false;
    this.unsubscribe = null;
    this.STORAGE_KEY = 'timeline-tutorial-seen';
  }

  /**
   * Initialize the tutorial overlay - shows every time user enters timeline
   */
  init() {
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
    this.overlay.className = 'tutorial-overlay tutorial-overlay-professional';
    this.overlay.innerHTML = `
      <div class="tutorial-backdrop"></div>
      <div class="tutorial-content tutorial-content-professional">
        <div class="tutorial-header">
          <div class="tutorial-part-label">The Timeline</div>
          <h2>The Evolution of Modern Science</h2>
        </div>

        <div class="tutorial-body">
          <p class="tutorial-narrative">
            Every dot represents a moment that shaped how science is practiced today&mdash;from
            ancient observatories to modern digital infrastructure.
          </p>

          <p class="tutorial-narrative">
            There are over 300 events here. Use the <strong>era navigator</strong> to jump
            through the five major eras to understand how the technical substrate and protocols
            evolved over the years.
          </p>

          <div class="tutorial-era-list">
            <span class="era-name">Proto-Science</span>
            <span class="era-separator">→</span>
            <span class="era-name">Pre-Science</span>
            <span class="era-separator">→</span>
            <span class="era-name">Organized</span>
            <span class="era-separator">→</span>
            <span class="era-name">Professional</span>
            <span class="era-separator">→</span>
            <span class="era-name">Institutional</span>
          </div>

          <div class="tutorial-nav-preview">
            <span class="tutorial-nav-label">Era:</span>
            <span class="tutorial-nav-position">1/6</span>
            <span class="tutorial-nav-btn">‹</span>
            <span class="tutorial-nav-btn tutorial-nav-btn-highlight">›</span>
          </div>
        </div>

        <div class="tutorial-footer">
          <button class="tutorial-dismiss-btn tutorial-begin-btn" id="tutorial-dismiss">
            Explore
          </button>
          <a href="https://github.com/jring-o/iospwebsite" target="_blank" rel="noopener noreferrer" class="tutorial-contribute">
            Add events to the timeline →
          </a>
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
