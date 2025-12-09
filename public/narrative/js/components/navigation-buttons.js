/**
 * Navigation Buttons
 * Previous/Next scene navigation controls (top-right)
 */

import { sceneNavigation } from '../utils/scene-navigation.js';
import { timelineState } from '../state/timeline-state.js';
import { tutorialOverlay } from './tutorial-overlay.js';

class NavigationButtons {
  constructor() {
    this.container = null;
    this.prevButton = null;
    this.nextButton = null;
    this.scenePosition = null;
    this.unsubscribe = null;

    // Card navigation
    this.prevCardButton = null;
    this.nextCardButton = null;
    this.cardPosition = null;
    this.unsubscribeCard = null;
  }

  /**
   * Initialize navigation buttons
   */
  init() {
    this.createButtons();
    this.setupEventListeners();
    this.updateButtonStates();
    this.updateCardButtonStates();

    // Subscribe to scene changes
    this.unsubscribe = sceneNavigation.onSceneChange((scene) => {
      this.updateButtonStates();
      this.updateSceneLabel(scene);
      this.updateNavigationVisibility();
      // Also update card button states since canGoNextCard() depends on current scene type
      this.updateCardButtonStates();
    });

    // Subscribe to card changes
    this.unsubscribeCard = sceneNavigation.onCardChange((card) => {
      this.updateCardButtonStates();
      this.updateCardLabel(card);
    });

    console.log('✅ Navigation buttons initialized');
  }

  /**
   * Create button elements
   */
  createButtons() {
    this.container = document.createElement('div');
    this.container.className = 'scene-navigation-controls';
    this.container.innerHTML = `
      <div class="scene-navigation-wrapper">
        <!-- Event Navigation Row (only visible in timeline) -->
        <div class="nav-row event-nav-row">
          <div class="nav-row-label">Event:</div>
          <div class="nav-position" id="scene-position">
            <span class="nav-position-text">-/-</span>
          </div>
          <div class="scene-buttons">
            <button class="scene-nav-button scene-nav-prev" id="scene-nav-prev" title="Previous event (←)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="scene-nav-button scene-nav-next" id="scene-nav-next" title="Next event (→)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Card Navigation Row -->
        <div class="nav-row card-nav-row">
          <div class="nav-row-label">Era:</div>
          <div class="nav-position" id="card-position">
            <span class="nav-position-text">-/-</span>
          </div>
          <div class="card-buttons">
            <button class="scene-nav-button card-nav-prev" id="card-nav-prev" title="Previous era/card (Shift+←)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="scene-nav-button card-nav-next" id="card-nav-next" title="Next era/card (Shift+→)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Last Event Button (below navigation rows) -->
        <button class="jump-to-last-event" id="jump-to-last-event" title="Jump to last event in timeline">
          Last Event
        </button>

        <!-- Help Button -->
        <button class="show-tutorial-btn" id="show-tutorial" title="Show navigation help">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="17" r="1" fill="currentColor"/>
          </svg>
          <span>Help</span>
        </button>
      </div>
    `;

    document.body.appendChild(this.container);

    this.prevButton = document.getElementById('scene-nav-prev');
    this.nextButton = document.getElementById('scene-nav-next');
    this.scenePosition = document.getElementById('scene-position');
    this.jumpToLastEventButton = document.getElementById('jump-to-last-event');

    this.prevCardButton = document.getElementById('card-nav-prev');
    this.nextCardButton = document.getElementById('card-nav-next');
    this.cardPosition = document.getElementById('card-position');
    this.showTutorialButton = document.getElementById('show-tutorial');

    // Fade in after a short delay
    setTimeout(() => {
      this.container.classList.add('visible');
      // Set initial visibility state
      this.updateNavigationVisibility();
    }, 800);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Jump to last event button
    this.jumpToLastEventButton.addEventListener('click', (e) => {
      e.preventDefault();
      sceneNavigation.goToLastEvent();
    });

    // Previous button
    this.prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (sceneNavigation.canGoPrevious()) {
        sceneNavigation.goToPreviousScene();
      }
    });

    // Next button
    this.nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (sceneNavigation.canGoNext()) {
        sceneNavigation.goToNextScene();
      }
    });

    // Card navigation buttons
    this.prevCardButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (sceneNavigation.canGoPreviousCard()) {
        sceneNavigation.goToPreviousCard();
      }
    });

    this.nextCardButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (sceneNavigation.canGoNextCard()) {
        sceneNavigation.goToNextCard();
      }
    });

    // Show tutorial button
    this.showTutorialButton.addEventListener('click', (e) => {
      e.preventDefault();
      tutorialOverlay.showManually();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ignore if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Card navigation (Shift + Arrow)
      if (e.shiftKey) {
        if (e.key === 'ArrowLeft' && sceneNavigation.canGoPreviousCard()) {
          e.preventDefault();
          sceneNavigation.goToPreviousCard();
        } else if (e.key === 'ArrowRight' && sceneNavigation.canGoNextCard()) {
          e.preventDefault();
          sceneNavigation.goToNextCard();
        }
      }
      // Event navigation (Arrow only)
      else {
        if (e.key === 'ArrowLeft' && sceneNavigation.canGoPrevious()) {
          e.preventDefault();
          sceneNavigation.goToPreviousScene();
        } else if (e.key === 'ArrowRight' && sceneNavigation.canGoNext()) {
          e.preventDefault();
          sceneNavigation.goToNextScene();
        }
      }
    });
  }

  /**
   * Update button states (enabled/disabled)
   */
  updateButtonStates() {
    const canPrev = sceneNavigation.canGoPrevious();
    const canNext = sceneNavigation.canGoNext();

    console.log(`🔘 updateButtonStates: currentIndex=${sceneNavigation.currentSceneIndex}, total=${sceneNavigation.scenes.length}, canNext=${canNext}`);

    this.prevButton.disabled = !canPrev;
    this.nextButton.disabled = !canNext;

    if (canPrev) {
      this.prevButton.classList.remove('disabled');
    } else {
      this.prevButton.classList.add('disabled');
    }

    if (canNext) {
      this.nextButton.classList.remove('disabled');
    } else {
      this.nextButton.classList.add('disabled');
    }
  }

  /**
   * Update scene label (now just updates position indicator)
   */
  updateSceneLabel(scene) {
    // Update position indicator
    this.updateScenePosition();
  }

  /**
   * Update scene position indicator (X/total)
   * Only counts actual timeline events, not intro/act-three/closing scenes
   */
  updateScenePosition() {
    if (!this.scenePosition) return;

    const positionText = this.scenePosition.querySelector('.nav-position-text');
    if (!positionText) return;

    const currentScene = sceneNavigation.getCurrentScene();

    // Check if current scene is an actual timeline event
    // Types: 'era' (era cards), 'simple' (regular events), 'stressor' (stressor events)
    const isMainTimelineEvent = currentScene && (
      currentScene.type === 'era' ||
      currentScene.type === 'simple' ||
      currentScene.type === 'stressor'
    );
    const isAltTimelineEvent = currentScene && currentScene.type === 'alternative-event';

    if (!isMainTimelineEvent && !isAltTimelineEvent) {
      // Not in timeline - hide the position indicator
      this.scenePosition.style.display = 'none';
      return;
    }

    // In timeline - show the position indicator
    this.scenePosition.style.display = '';

    // Filter to only timeline events from the current timeline
    const timelineEvents = sceneNavigation.scenes.filter(s => {
      if (isAltTimelineEvent) {
        return s.type === 'alternative-event';
      } else {
        return s.type === 'era' || s.type === 'simple' || s.type === 'stressor';
      }
    });

    // Find current position within filtered events
    const currentIndex = timelineEvents.findIndex(s => s.id === currentScene.id);

    if (currentIndex === -1) {
      positionText.textContent = '-/-';
      return;
    }

    positionText.textContent = `${currentIndex + 1}/${timelineEvents.length}`;
  }

  /**
   * Update card button states (enabled/disabled)
   */
  updateCardButtonStates() {
    const canPrev = sceneNavigation.canGoPreviousCard();
    const canNext = sceneNavigation.canGoNextCard();

    console.log(`🔘 updateCardButtonStates: currentCardIndex=${sceneNavigation.currentCardIndex}, total cards=${sceneNavigation.cards.length}, canNext=${canNext}`);

    this.prevCardButton.disabled = !canPrev;
    this.nextCardButton.disabled = !canNext;

    if (canPrev) {
      this.prevCardButton.classList.remove('disabled');
    } else {
      this.prevCardButton.classList.add('disabled');
    }

    if (canNext) {
      this.nextCardButton.classList.remove('disabled');
    } else {
      this.nextCardButton.classList.add('disabled');
    }
  }

  /**
   * Update card label (just updates position now)
   */
  updateCardLabel(card) {
    // Update position indicator
    this.updateCardPosition();
  }

  /**
   * Update card position indicator (X/total)
   * Only counts eras from the current timeline (main OR alternative)
   */
  updateCardPosition() {
    if (!this.cardPosition) return;

    const positionText = this.cardPosition.querySelector('.nav-position-text');
    if (!positionText) return;

    const currentCard = sceneNavigation.getCurrentCard();

    if (!currentCard) {
      positionText.textContent = '-/-';
      return;
    }

    // Determine which timeline we're in based on card type
    const isAltTimelineCard = currentCard.type === 'alt-era-card' || currentCard.type === 'alt-system-card';

    // Filter to only cards from the current timeline
    const timelineCards = sceneNavigation.cards.filter(c => {
      if (isAltTimelineCard) {
        return c.type === 'alt-era-card' || c.type === 'alt-system-card';
      } else {
        return c.type === 'era-card' || c.type === 'system-card' || c.type === 'stressor-intro-card';
      }
    });

    // Find current position within filtered cards
    const currentIndex = timelineCards.findIndex(c => c.id === currentCard.id);

    if (currentIndex === -1) {
      positionText.textContent = '-/-';
      return;
    }

    positionText.textContent = `${currentIndex + 1}/${timelineCards.length}`;
  }

  /**
   * Update navigation visibility based on current context
   */
  updateNavigationVisibility() {
    const isInTimeline = sceneNavigation.isInTimeline();
    const nextScene = sceneNavigation.getNextScene();
    const eventNavRow = document.querySelector('.event-nav-row');
    const cardNavRow = document.querySelector('.card-nav-row');
    const eventNavLabel = document.querySelector('.event-nav-row .nav-row-label');
    const lastEventButton = this.jumpToLastEventButton;

    // If next scene is Act III, we're at the end of main timeline
    const nextIsActThree = nextScene && nextScene.type === 'act-three';

    // If current scene is Plural Systems Era, we're at the end of alt timeline
    const currentScene = sceneNavigation.getCurrentScene();
    const isPluralSystemsEra = currentScene && currentScene.name && currentScene.name.includes('Plural Systems Era');

    // If current scene is one of the closing scenes (15-18), we're outside timeline
    const isClosingScene = currentScene && currentScene.type === 'closing';

    // Check if current scene is in alternative timeline by scene type
    // This handles edge cases where scroll position check might miss the first alt event
    const isAltTimelineScene = currentScene && currentScene.type === 'alternative-event';

    // Always show event nav row (for prev/next buttons)
    if (eventNavRow) eventNavRow.style.display = 'flex';

    if ((isInTimeline || isAltTimelineScene) && !nextIsActThree && !isPluralSystemsEra && !isClosingScene) {
      // In timeline: show era navigation, "Last Event" button, and help button, show "Event:" label
      if (cardNavRow) cardNavRow.style.display = 'flex';
      if (eventNavLabel) eventNavLabel.style.display = '';
      if (lastEventButton) lastEventButton.style.display = 'block';
      if (this.showTutorialButton) this.showTutorialButton.style.display = 'flex';
    } else {
      // Outside timeline: hide era row, "Last Event" button, help button, and "Event:" label
      if (cardNavRow) cardNavRow.style.display = 'none';
      if (eventNavLabel) eventNavLabel.style.display = 'none';
      if (lastEventButton) lastEventButton.style.display = 'none';
      if (this.showTutorialButton) this.showTutorialButton.style.display = 'none';
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this.unsubscribeCard) {
      this.unsubscribeCard();
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }
}

// Singleton instance
export const navigationButtons = new NavigationButtons();

// Export for debugging
if (typeof window !== 'undefined') {
  window.navigationButtons = navigationButtons;
}
