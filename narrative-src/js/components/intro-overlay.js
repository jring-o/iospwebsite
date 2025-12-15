/**
 * Intro Overlay
 * Shows a modal explaining "Part I" of the narrative when user first visits /theory
 */

class IntroOverlay {
  constructor() {
    this.overlay = null;
    this.STORAGE_KEY = 'theory-intro-seen';
  }

  /**
   * Initialize the intro overlay - show every time on page load
   */
  init() {
    // Always show on page load
    this.show();
    console.log('Intro overlay initialized');
  }

  /**
   * Check if user has seen the intro before
   */
  hasSeenIntro() {
    try {
      return localStorage.getItem(this.STORAGE_KEY) === 'true';
    } catch (e) {
      // localStorage might not be available
      return false;
    }
  }

  /**
   * Mark intro as seen
   */
  markAsSeen() {
    try {
      localStorage.setItem(this.STORAGE_KEY, 'true');
    } catch (e) {
      // localStorage might not be available
    }
  }

  /**
   * Manually show the intro (bypasses hasSeenIntro check)
   */
  showManually() {
    if (this.overlay) return;
    this.createOverlay();
  }

  /**
   * Create and show the intro overlay
   */
  show() {
    if (this.overlay) return;
    this.createOverlay();
  }

  /**
   * Create the overlay DOM and show it
   */
  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'intro-overlay';
    this.overlay.innerHTML = `
      <div class="intro-overlay-backdrop"></div>
      <div class="intro-overlay-content intro-overlay-compact">
        <div class="intro-overlay-header">
          <div class="intro-overlay-part">Part I</div>
          <h2>How We Think About Science</h2>
        </div>

        <div class="intro-overlay-body">
          <p class="intro-overlay-narrative">
            The scientific system we inherited wasn't designed&mdash;it emerged. Over centuries,
            through technological shifts and historical accidents, a configuration took shape
            that now strains under the weight of a world it wasn't built for.
          </p>

          <p class="intro-overlay-narrative intro-overlay-cta-text">
            This is the story of how we got here, and why the future demands something different.
          </p>

          <div class="intro-overlay-instructions">
            <p class="intro-overlay-instruction-text">
              Scroll to experience the narrative, or use the <strong>navigator</strong> in the top right to move between scenes.
            </p>

            <div class="tutorial-nav-preview">
              <span class="tutorial-nav-btn">‹</span>
              <span class="tutorial-nav-btn tutorial-nav-btn-highlight">›</span>
            </div>
          </div>
        </div>

        <div class="intro-overlay-footer">
          <button class="intro-overlay-begin-btn" id="intro-overlay-begin">
            Begin
          </button>
          <a href="https://github.com/jring-o/iospwebsite" target="_blank" rel="noopener noreferrer" class="intro-overlay-contribute">
            Contribute to the story →
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

    console.log('Intro overlay shown');
  }

  /**
   * Setup handlers to dismiss the intro
   */
  setupDismissHandlers() {
    const beginBtn = document.getElementById('intro-overlay-begin');

    // Dismiss on button click
    if (beginBtn) {
      beginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dismiss();
      });
    }

    // Dismiss on backdrop click
    const backdrop = this.overlay.querySelector('.intro-overlay-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.dismiss());
    }

    // Dismiss on Escape key
    this.keyHandler = (e) => {
      if (e.key === 'Escape') {
        this.dismiss();
      }
    };
    document.addEventListener('keydown', this.keyHandler);
  }

  /**
   * Dismiss the intro overlay
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

    console.log('Intro overlay dismissed');
  }

  /**
   * Reset intro (for testing - clears localStorage)
   */
  reset() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('Intro reset - will show again on next visit');
    } catch (e) {
      // localStorage might not be available
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    this.dismiss();
  }
}

// Singleton instance
export const introOverlay = new IntroOverlay();

// Export for debugging
if (typeof window !== 'undefined') {
  window.introOverlay = introOverlay;
}
