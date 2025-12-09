/**
 * Scene Navigation
 * Manages scene boundaries and provides next/prev navigation
 */

// No imports needed - uses DOM queries directly

class SceneNavigation {
  constructor() {
    this.scenes = [];
    this.currentSceneIndex = -1;
    this.scrollTriggers = [];
    this.callbacks = [];
    this.pauseScrollTracking = false;

    // Card navigation (era and system cards only)
    this.cards = [];
    this.currentCardIndex = -1;
    this.cardCallbacks = [];
  }

  /**
   * Initialize scene navigation
   * Must be called AFTER all ScrollTriggers are created
   */
  init() {
    // Build scene registry from DOM and config
    this.buildSceneRegistry();

    // Build card registry (era and system cards only)
    this.buildCardRegistry();

    // Setup scroll listener to track current scene
    this.setupScrollTracking();

    // Debug: Show scenes around Plural Systems Era
    const pluralIndex = this.scenes.findIndex(s => s.name && s.name.includes('Plural Systems Era'));
    if (pluralIndex !== -1) {
      console.log('\n📋 Scenes around Plural Systems Era:');
      for (let i = Math.max(0, pluralIndex - 2); i < Math.min(this.scenes.length, pluralIndex + 6); i++) {
        const marker = i === pluralIndex ? '👉' : '  ';
        const scene = this.scenes[i];
        console.log(`${marker} [${i}] ${scene.name} (${scene.type})`);
      }
    }
  }

  /**
   * Rebuild scene registry (called when new content is added)
   */
  rebuildRegistry() {
    console.log('🔄 Rebuilding scene registry...');
    this.buildSceneRegistry();
    this.buildCardRegistry();

    // Debug: Show end of scene registry
    console.log('\n📋 Last 10 scenes after rebuild:');
    for (let i = Math.max(0, this.scenes.length - 10); i < this.scenes.length; i++) {
      const scene = this.scenes[i];
      console.log(`  [${i}] ${scene.name} (${scene.type})`);
    }
  }

  /**
   * Build comprehensive scene registry
   */
  buildSceneRegistry() {
    this.scenes = [];
    let sceneId = 0;

    // Intro moments (1-7)
    const introMoments = document.querySelectorAll('[class*="intro-moment-"]');
    introMoments.forEach((moment, index) => {
      this.scenes.push({
        id: sceneId++,
        name: `Intro ${index + 1}`,
        element: moment,
        type: 'intro',
        scrollTo: moment.offsetTop - 100
      });
    });

    // Scenes 1+: Era cards and events in main timeline
    const eventSections = document.querySelectorAll('#events-container .event-section, #events-container .simple-event, #events-container .stressor-event');
    eventSections.forEach((section, index) => {
      const type = section.dataset.type || 'event';
      const year = section.dataset.year;
      const eraName = section.dataset.eraName || section.dataset.systemName;

      let name = 'Event';
      if (type === 'era') {
        name = eraName || `Era ${year}`;
      } else if (type === 'stressor') {
        name = `Stressor ${year}`;
      } else {
        const title = section.querySelector('.simple-title')?.textContent ||
                     section.querySelector('.event-title')?.textContent ||
                     `Event ${year}`;
        name = title.substring(0, 40) + (title.length > 40 ? '...' : '');
      }

      this.scenes.push({
        id: sceneId++,
        name,
        element: section,
        type,
        year: parseInt(year),
        scrollTo: section.offsetTop - 100 // Offset for better positioning
      });
    });

    // Act III Scenes (7-10)
    const actThreeScenes = [
      { selector: '[data-moment="scene-7"]', name: 'The Stress' },
      { selector: '[data-moment="scene-8"]', name: 'The Breaking' },
      { selector: '[data-moment="scene-9"]', name: 'The Achievements' },
      { selector: '[data-moment="scene-10"]', name: 'The Convergence' }
    ];

    actThreeScenes.forEach(scene => {
      const element = document.querySelector(scene.selector);
      if (element) {
        this.scenes.push({
          id: sceneId++,
          name: scene.name,
          element,
          type: 'act-three',
          scrollTo: element.offsetTop - 100
        });
      }
    });

    // Systems Animation Moments (individual scenes)
    const systemsMoments = document.querySelectorAll('[data-moment^="systems-"]');
    systemsMoments.forEach((moment, index) => {
      const momentNumber = moment.getAttribute('data-moment');
      const titleElement = moment.querySelector('h1');
      const name = titleElement ? titleElement.textContent.trim().replace(/\n/g, ' ') : `Systems ${index + 1}`;

      this.scenes.push({
        id: sceneId++,
        name,
        element: moment,
        type: 'systems',
        scrollTo: moment.offsetTop - 100
      });
    });

    // Alternative timeline events
    const altSections = document.querySelectorAll('#alt-events-container .alt-event-section, #alt-events-container .alt-simple-event, #alt-events-container .alt-stressor-event');
    console.log(`🔍 Found ${altSections.length} alternative events`);
    altSections.forEach((section, index) => {
      const type = section.dataset.type;
      const year = section.dataset.year;
      const eraName = section.dataset.eraName || section.dataset.systemName;

      let name = 'Alternative Event';
      if (type === 'era' || type === 'system') {
        name = eraName || `System ${year}`;
      } else {
        const title = section.querySelector('.simple-title')?.textContent ||
                     section.querySelector('.event-title')?.textContent ||
                     `Event ${year}`;
        name = title.substring(0, 40) + (title.length > 40 ? '...' : '');
      }

      this.scenes.push({
        id: sceneId++,
        name,
        element: section,
        type: 'alternative-event',
        year: parseInt(year),
        scrollTo: section.offsetTop - 100
      });
    });

    // Closing scenes (15-23) - injected after alt timeline wrapper
    const closingScenes = document.querySelectorAll('[data-moment="scene-15"], [data-moment="scene-16"], [data-moment="scene-17"], [data-moment="scene-17.5"], [data-moment="scene-18"], [data-moment="scene-19"], [data-moment="scene-20"], [data-moment="scene-21"], [data-moment="scene-22"], [data-moment="scene-23"]');
    console.log(`🔍 Found ${closingScenes.length} closing scenes`);
    closingScenes.forEach((scene) => {
      const titleElement = scene.querySelector('h2') || scene.querySelector('h1');
      const name = titleElement ? titleElement.textContent.trim() : 'Closing Scene';

      this.scenes.push({
        id: sceneId++,
        name,
        element: scene,
        type: 'closing',
        scrollTo: scene.offsetTop - 100
      });
    });
  }

  /**
   * Build card registry (era, system, and stressor-intro cards)
   */
  buildCardRegistry() {
    this.cards = [];
    let cardId = 0;

    // Main timeline era cards
    const mainEraCards = document.querySelectorAll('#events-container .era-section');
    mainEraCards.forEach((section) => {
      const year = section.dataset.year;
      const eraName = section.dataset.eraName || section.dataset.systemName;
      const isSystemCard = section.classList.contains('system-section');

      this.cards.push({
        id: cardId++,
        name: eraName || `Era ${year}`,
        element: section,
        type: isSystemCard ? 'system-card' : 'era-card',
        year: parseInt(year),
        scrollTo: section.offsetTop - 100
      });
    });

    // Stressor events with eraName (e.g., the first stressor that introduces "Stressors")
    const stressorEraCards = document.querySelectorAll('#events-container .stressor-event[data-era-name]');
    stressorEraCards.forEach((section) => {
      const year = section.dataset.year;
      const eraName = section.dataset.eraName;

      this.cards.push({
        id: cardId++,
        name: eraName || `Stressors ${year}`,
        element: section,
        type: 'stressor-intro-card',
        year: parseInt(year),
        scrollTo: section.offsetTop - 100
      });
    });

    // Sort main timeline cards by year to ensure proper order
    this.cards.sort((a, b) => a.year - b.year);

    // Re-assign IDs after sorting
    this.cards.forEach((card, index) => {
      card.id = index;
    });

    // Alternative timeline era and system cards
    const altCards = document.querySelectorAll('#alt-events-container .era-section');
    console.log(`🔍 Found ${altCards.length} alternative era/system cards`);
    altCards.forEach((section) => {
      const year = section.dataset.year;
      const eraName = section.dataset.eraName || section.dataset.systemName;
      const isSystemCard = section.classList.contains('system-section');

      this.cards.push({
        id: cardId++,
        name: eraName || `System ${year}`,
        element: section,
        type: isSystemCard ? 'alt-system-card' : 'alt-era-card',
        year: parseInt(year),
        scrollTo: section.offsetTop - 100
      });
    });

  }

  /**
   * Setup scroll tracking to update current scene
   */
  setupScrollTracking() {
    let ticking = false;
    let isManualNavigation = false;

    const updateCurrentScene = () => {
      // Skip scroll tracking during manual navigation
      if (this.pauseScrollTracking) {
        ticking = false;
        return;
      }

      // Use top third of viewport to detect what user is looking at
      const scrollY = window.scrollY + (window.innerHeight / 3);

      // Find which scene we're in
      let newSceneIndex = -1;

      for (let i = 0; i < this.scenes.length; i++) {
        const scene = this.scenes[i];
        const nextScene = this.scenes[i + 1];

        // Use getBoundingClientRect for actual current position
        const rect = scene.element.getBoundingClientRect();
        const sceneTop = window.scrollY + rect.top;
        const nextRect = nextScene ? nextScene.element.getBoundingClientRect() : null;
        const sceneBottom = nextRect ? window.scrollY + nextRect.top : document.body.scrollHeight;

        if (scrollY >= sceneTop && scrollY < sceneBottom) {
          newSceneIndex = i;
          break;
        }
      }

      // If we're past all scenes, set to last scene
      if (newSceneIndex === -1 && this.scenes.length > 0) {
        newSceneIndex = this.scenes.length - 1;
      }

      if (newSceneIndex !== this.currentSceneIndex) {
        this.currentSceneIndex = newSceneIndex;
        this.notifySceneChange(newSceneIndex);
      }

      // Also track current card
      let newCardIndex = -1;
      for (let i = 0; i < this.cards.length; i++) {
        const card = this.cards[i];
        const nextCard = this.cards[i + 1];

        // Use getBoundingClientRect for actual current position
        const rect = card.element.getBoundingClientRect();
        const cardTop = window.scrollY + rect.top;
        const nextRect = nextCard ? nextCard.element.getBoundingClientRect() : null;
        const cardBottom = nextRect ? window.scrollY + nextRect.top : document.body.scrollHeight;

        if (scrollY >= cardTop && scrollY < cardBottom) {
          newCardIndex = i;
          break;
        }
      }

      if (newCardIndex === -1 && this.cards.length > 0) {
        newCardIndex = this.cards.length - 1;
      }

      if (newCardIndex !== this.currentCardIndex) {
        this.currentCardIndex = newCardIndex;
        this.notifyCardChange(newCardIndex);
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking && !this.pauseScrollTracking) {
        window.requestAnimationFrame(updateCurrentScene);
        ticking = true;
      }
    });

    // Initial update
    updateCurrentScene();
  }

  /**
   * Navigate to next scene
   */
  goToNextScene() {
    if (this.canGoNext()) {
      this.goToSceneByIndex(this.currentSceneIndex + 1);
    }
  }

  /**
   * Navigate to previous scene
   */
  goToPreviousScene() {
    if (this.canGoPrevious()) {
      this.goToSceneByIndex(this.currentSceneIndex - 1);
    }
  }

  /**
   * Find the card index that corresponds to a scene's position
   * This keeps scene and card navigation in sync
   */
  findCardIndexForScene(scene) {
    if (!scene || !scene.element) return -1;

    // If the scene element is directly a card, find it
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].element === scene.element) {
        return i;
      }
    }

    // Find the card whose position is at or before this scene
    const sceneRect = scene.element.getBoundingClientRect();
    const sceneTop = window.scrollY + sceneRect.top;

    let lastCardIndex = -1;
    for (let i = 0; i < this.cards.length; i++) {
      const cardRect = this.cards[i].element.getBoundingClientRect();
      const cardTop = window.scrollY + cardRect.top;

      if (cardTop <= sceneTop + 50) {
        lastCardIndex = i;
      } else {
        break;
      }
    }

    return lastCardIndex;
  }

  /**
   * Navigate to scene by index
   */
  goToSceneByIndex(index) {
    if (index < 0 || index >= this.scenes.length) return;

    const scene = this.scenes[index];
    this.currentSceneIndex = index;

    // Disable scroll tracking temporarily
    this.pauseScrollTracking = true;

    // Sync card index to match the scene we're navigating to
    const correspondingCardIndex = this.findCardIndexForScene(scene);
    if (correspondingCardIndex !== -1 && correspondingCardIndex !== this.currentCardIndex) {
      this.currentCardIndex = correspondingCardIndex;
      this.notifyCardChange(correspondingCardIndex);
    }

    this.scrollToScene(scene);
    this.notifySceneChange(index);

    // Re-enable scroll tracking after animation completes
    setTimeout(() => {
      this.pauseScrollTracking = false;
    }, 1000);
  }

  /**
   * Navigate to last event in current timeline
   */
  goToLastEvent() {
    // Check if we're in alternative timeline by looking at current scene type
    const currentScene = this.getCurrentScene();
    const inAltTimeline = currentScene && currentScene.type === 'alternative-event';

    if (inAltTimeline) {
      // Find the last alternative timeline event (before closing scenes)
      // Go backwards through scenes to find the last 'alternative-event' type
      for (let i = this.scenes.length - 1; i >= 0; i--) {
        const scene = this.scenes[i];
        if (scene.type === 'alternative-event') {
          this.goToSceneByIndex(i);
          return;
        }
      }
    } else {
      // Find the last main timeline event (before act-three)
      // Go backwards through scenes to find the last main timeline event
      for (let i = this.scenes.length - 1; i >= 0; i--) {
        const scene = this.scenes[i];
        if (scene.type === 'era' || scene.type === 'simple' || scene.type === 'stressor') {
          this.goToSceneByIndex(i);
          return;
        }
      }
    }
  }

  /**
   * Check if we're in alternative timeline
   */
  isInAlternativeTimeline() {
    const altEventsContainer = document.getElementById('alt-events-container');
    if (!altEventsContainer) return false;

    const rect = altEventsContainer.getBoundingClientRect();
    const altStart = window.scrollY + rect.top;
    const altEnd = altStart + rect.height;
    const scrollTop = window.scrollY;

    return scrollTop >= altStart - 100 && scrollTop < altEnd + 100;
  }

  /**
   * Scroll to a specific scene
   */
  scrollToScene(scene) {
    if (!scene) return;

    // Calculate actual current position (not cached offsetTop)
    const rect = scene.element.getBoundingClientRect();
    let scrollPosition = window.scrollY + rect.top - 100;

    // Adjust for tall Act III scenes
    if (scene.name === 'The Breaking' || scene.name === 'The Achievements') {
      scrollPosition = scrollPosition + 800;
    }

    // For "The Alternative", skip to first alternative event
    if (scene.name === 'The Alternative') {
      const firstAltEvent = document.querySelector('#alt-events-container .alternative-simple-event, #alt-events-container .alternative-event-section');
      if (firstAltEvent) {
        const firstEventRect = firstAltEvent.getBoundingClientRect();
        scrollPosition = window.scrollY + firstEventRect.top - 100;
      }
    }

    // For "The Institute of Open Science Practices", scroll deeper into the scene
    if (scene.name === 'The Institute of Open Science Practices') {
      scrollPosition = scrollPosition + 2600; // Scroll 600px deeper to see the content better
    }

    console.log(`🎬 Scrolling to [${scene.name}]: position=${scrollPosition}`);

    // Smooth scroll to scene
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Check if we can go to next scene
   */
  canGoNext() {
    return this.currentSceneIndex < this.scenes.length - 1;
  }

  /**
   * Check if we can go to previous scene
   */
  canGoPrevious() {
    return this.currentSceneIndex > 0;
  }

  /**
   * Get current scene info
   */
  getCurrentScene() {
    if (this.currentSceneIndex >= 0 && this.currentSceneIndex < this.scenes.length) {
      return this.scenes[this.currentSceneIndex];
    }
    return null;
  }

  /**
   * Get next scene info
   */
  getNextScene() {
    if (this.currentSceneIndex >= 0 && this.currentSceneIndex < this.scenes.length - 1) {
      return this.scenes[this.currentSceneIndex + 1];
    }
    return null;
  }

  /**
   * Get previous scene info
   */
  getPreviousScene() {
    if (this.currentSceneIndex > 0 && this.currentSceneIndex < this.scenes.length) {
      return this.scenes[this.currentSceneIndex - 1];
    }
    return null;
  }

  /**
   * Check if current scene is in a timeline section
   */
  isInTimeline() {
    const eventsContainer = document.getElementById('events-container');
    const altEventsContainer = document.getElementById('alt-events-container');
    const actThreeElement = document.querySelector('.scene-stress');

    const scrollTop = window.scrollY;

    // Check if in main timeline (before Act III)
    if (eventsContainer && actThreeElement) {
      const timelineStart = eventsContainer.offsetTop;
      const timelineEnd = actThreeElement.offsetTop;

      if (scrollTop >= timelineStart - 100 && scrollTop < timelineEnd - 100) {
        console.log(`✅ In main timeline`);
        return true;
      }
    }

    // Check if in alternative timeline using getBoundingClientRect
    if (altEventsContainer) {
      const rect = altEventsContainer.getBoundingClientRect();
      const altStart = window.scrollY + rect.top;
      const altEnd = altStart + rect.height;

      console.log(`🔍 Alt timeline check: scroll=${scrollTop}, range=${altStart}-${altEnd}, rect.top=${rect.top}, rect.height=${rect.height}`);

      if (scrollTop >= altStart - 100 && scrollTop < altEnd + 100) {
        console.log(`✅ In alternative timeline`);
        return true;
      }
    }

    console.log(`❌ Not in timeline`);
    return false;
  }

  /**
   * Subscribe to scene changes
   */
  onSceneChange(callback) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Notify callbacks of scene change
   */
  notifySceneChange(sceneIndex) {
    const scene = this.scenes[sceneIndex];
    this.callbacks.forEach(callback => {
      callback(scene, sceneIndex);
    });
  }

  /**
   * Find the scene index that corresponds to a card's element
   * This keeps scene and card navigation in sync
   */
  findSceneIndexForCard(card) {
    if (!card || !card.element) return -1;

    // Find the scene whose element matches or is closest to the card element
    for (let i = 0; i < this.scenes.length; i++) {
      if (this.scenes[i].element === card.element) {
        return i;
      }
    }

    // Fallback: find scene by matching position
    const cardRect = card.element.getBoundingClientRect();
    const cardTop = window.scrollY + cardRect.top;

    for (let i = 0; i < this.scenes.length; i++) {
      const sceneRect = this.scenes[i].element.getBoundingClientRect();
      const sceneTop = window.scrollY + sceneRect.top;

      // If scene is at or after the card position, use the previous scene or this one
      if (sceneTop >= cardTop - 50) {
        return i;
      }
    }

    return this.scenes.length - 1;
  }

  /**
   * Navigate to next card
   */
  goToNextCard() {
    if (this.canGoNextCard()) {
      const newIndex = this.currentCardIndex + 1;
      const nextCard = this.cards[newIndex];

      this.currentCardIndex = newIndex;
      this.pauseScrollTracking = true;

      // Sync scene index to match the card we're navigating to
      const correspondingSceneIndex = this.findSceneIndexForCard(nextCard);
      if (correspondingSceneIndex !== -1) {
        this.currentSceneIndex = correspondingSceneIndex;
        this.notifySceneChange(correspondingSceneIndex);
      }

      this.scrollToCard(nextCard);
      this.notifyCardChange(newIndex);

      setTimeout(() => {
        this.pauseScrollTracking = false;
      }, 1000);
    }
  }

  /**
   * Navigate to previous card
   */
  goToPreviousCard() {
    if (this.canGoPreviousCard()) {
      const newIndex = this.currentCardIndex - 1;
      const prevCard = this.cards[newIndex];

      this.currentCardIndex = newIndex;
      this.pauseScrollTracking = true;

      // Sync scene index to match the card we're navigating to
      const correspondingSceneIndex = this.findSceneIndexForCard(prevCard);
      if (correspondingSceneIndex !== -1) {
        this.currentSceneIndex = correspondingSceneIndex;
        this.notifySceneChange(correspondingSceneIndex);
      }

      this.scrollToCard(prevCard);
      this.notifyCardChange(newIndex);

      setTimeout(() => {
        this.pauseScrollTracking = false;
      }, 1000);
    }
  }

  /**
   * Scroll to a specific card
   */
  scrollToCard(card) {
    if (!card) return;

    // Calculate actual current position (not cached offsetTop)
    const rect = card.element.getBoundingClientRect();
    const scrollPosition = window.scrollY + rect.top - 100;

    console.log(`📇 Navigating to card: ${card.name}, position=${scrollPosition}`);

    // Smooth scroll to card
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Check if we can go to next card
   * Prevents navigation from main timeline's last era to alternative timeline
   * BUT allows it once user has scrolled into the alternative timeline
   */
  canGoNextCard() {
    if (this.currentCardIndex >= this.cards.length - 1) {
      return false;
    }

    // Check if current card is the last main timeline era card ("Institutional Science")
    const currentCard = this.cards[this.currentCardIndex];
    const nextCard = this.cards[this.currentCardIndex + 1];

    // If we're on a main timeline era card and the next card is an alt timeline card,
    // disable navigation ONLY if we're still in the main timeline
    if (currentCard && nextCard) {
      const isCurrentMainEra = currentCard.type === 'era-card';
      const isNextAltCard = nextCard.type === 'alt-era-card' || nextCard.type === 'alt-system-card';

      if (isCurrentMainEra && isNextAltCard) {
        // Check if user has scrolled into alternative timeline (viewing alt events)
        const currentScene = this.getCurrentScene();
        const isInAltTimeline = currentScene && currentScene.type === 'alternative-event';

        // Only block if NOT in alternative timeline yet
        if (!isInAltTimeline) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Check if we can go to previous card
   */
  canGoPreviousCard() {
    return this.currentCardIndex > 0;
  }

  /**
   * Get current card info
   */
  getCurrentCard() {
    if (this.currentCardIndex >= 0 && this.currentCardIndex < this.cards.length) {
      return this.cards[this.currentCardIndex];
    }
    return null;
  }

  /**
   * Subscribe to card changes
   */
  onCardChange(callback) {
    this.cardCallbacks.push(callback);
    return () => {
      this.cardCallbacks = this.cardCallbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Notify callbacks of card change
   */
  notifyCardChange(cardIndex) {
    const card = this.cards[cardIndex];
    this.cardCallbacks.forEach(callback => {
      callback(card, cardIndex);
    });
  }

  /**
   * Debug: List all scenes
   */
  debug() {
    console.group('🎬 Scene Navigation Debug');
    console.log('Total scenes:', this.scenes.length);
    console.log('Current scene index:', this.currentSceneIndex);
    console.log('Current scene:', this.getCurrentScene());
    console.log('Can go previous:', this.canGoPrevious());
    console.log('Can go next:', this.canGoNext());
    console.table(this.scenes.map(s => ({
      id: s.id,
      name: s.name,
      type: s.type,
      year: s.year
    })));

    console.log('\n📇 Card Navigation:');
    console.log('Total cards:', this.cards.length);
    console.log('Current card index:', this.currentCardIndex);
    console.log('Current card:', this.getCurrentCard());
    console.log('Can go previous card:', this.canGoPreviousCard());
    console.log('Can go next card:', this.canGoNextCard());
    console.table(this.cards.map(c => ({
      id: c.id,
      name: c.name,
      type: c.type,
      year: c.year
    })));
    console.groupEnd();
  }
}

// Singleton instance
export const sceneNavigation = new SceneNavigation();

// Export for debugging
if (typeof window !== 'undefined') {
  window.sceneNavigation = sceneNavigation;
}
