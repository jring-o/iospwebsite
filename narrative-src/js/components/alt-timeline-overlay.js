/**
 * Alt Timeline Overlay
 * Shows a modal explaining the three systems when user enters the alternative timeline
 */

class AltTimelineOverlay {
  constructor() {
    this.overlay = null;
  }

  /**
   * Initialize the alt timeline overlay
   */
  init() {
    console.log('🎭 Alt timeline overlay initialized');
  }

  /**
   * Manually show the overlay (from help button)
   */
  showManually() {
    if (this.overlay) return;
    this.createOverlay();
  }

  /**
   * Create and show the overlay
   */
  show() {
    console.log('🎭 show() called, overlay exists:', !!this.overlay);
    // Don't show if overlay is already visible
    if (this.overlay) return;
    this.createOverlay();
  }

  /**
   * Create the overlay DOM and show it
   */
  createOverlay() {
    console.log('🎭 createOverlay() called');
    this.overlay = document.createElement('div');
    this.overlay.className = 'alt-timeline-overlay';
    this.overlay.innerHTML = `
      <div class="alt-timeline-backdrop"></div>
      <div class="alt-timeline-content">
        <div class="alt-timeline-header">
          <div class="alt-timeline-part">Three Systems of Science</div>
          <h2>1950 - Present</h2>
        </div>

        <div class="alt-timeline-body">
          <p class="alt-timeline-intro">
            Since 1950, three complete scientific systems have emerged, each
            configuring the five protocols differently:
          </p>

          <div class="systems-list">
            <div class="system-item">
              <strong>Corporate Science</strong> — VC funding, patents, FDA approval, trade secrets
            </div>
            <div class="system-item">
              <strong>Institutional Science</strong> — Federal grants, peer review, journals, tenure
            </div>
            <div class="system-item">
              <strong>Benefactor Science</strong> — Foundation funding, preprints, open data, mission impact
            </div>
          </div>

          <p class="alt-timeline-conclusion">
            This timeline shows the emergence of the modern technical substrate—and
            the three systems built on it as it begins to diverge.
          </p>
        </div>

        <div class="alt-timeline-footer">
          <button class="alt-timeline-begin-btn" id="alt-timeline-begin">
            Explore
          </button>
          <a href="https://github.com/jring-o/iospwebsite" target="_blank" rel="noopener noreferrer" class="alt-timeline-contribute">
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

    console.log('Alt timeline overlay shown');
  }

  /**
   * Setup handlers to dismiss the overlay
   */
  setupDismissHandlers() {
    const beginBtn = document.getElementById('alt-timeline-begin');

    // Dismiss on button click
    if (beginBtn) {
      beginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dismiss();
      });
    }

    // Dismiss on backdrop click
    const backdrop = this.overlay.querySelector('.alt-timeline-backdrop');
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
   * Dismiss the overlay
   */
  dismiss() {
    if (!this.overlay) return;

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

    console.log('Alt timeline overlay dismissed');
  }

  /**
   * Reset overlay (for testing)
   */
  reset() {
    // Dismiss if currently showing
    if (this.overlay) {
      this.dismiss();
    }
    console.log('Alt timeline overlay reset');
  }

  /**
   * Cleanup
   */
  destroy() {
    this.dismiss();
  }
}

// Singleton instance
export const altTimelineOverlay = new AltTimelineOverlay();

// Export for debugging
if (typeof window !== 'undefined') {
  window.altTimelineOverlay = altTimelineOverlay;
}
