/**
 * Timeline State Management
 * Centralized state with immutable updates and change tracking
 */

class TimelineState {
  constructor() {
    this._state = {
      // Data
      timelineData: null,
      yearRange: { min: 0, max: 0 },

      // Scales
      xScale: null,
      yScaleForProtocol: null,
      timelineSvgRect: null,

      // Feature flags
      isReducedMotion: false,

      // Intro animation
      intro: {
        active: false,
        phase: 1,
        rotationAngle: 0,
        tickerId: null,
        dots: [],
        wasActiveBeforeHide: false
      },

      // Systems animation (Scenes 11-13)
      systems: {
        active: false,
        phase: '11a',
        rotationAngle: 0,
        tickerId: null,
        dots: [],
        corporateConvergenceDot: null,
        benefactorConvergenceDot: null,
        wasActiveBeforeHide: false
      },

      // Act III
      actThree: {
        convergenceAnimated: false,
        convergenceDot: null,
        convergenceTimeline: null,
        alternativeTimelineGenerated: false,
        additionalConvergenceDots: [],
        pluralSystemsEraMorphed: false
      },

      // Scene 8 & 9 floating texts
      floatingTexts: {
        stressorPool: [],
        stressorActive: [],
        lastStressorSpawn: 0,
        achievementPool: [],
        achievementActive: [],
        lastAchievementSpawn: 0
      }
    };

    this._listeners = [];
    this._history = []; // For debugging
  }

  /**
   * Get current state (immutable)
   */
  getState() {
    return JSON.parse(JSON.stringify(this._state));
  }

  /**
   * Get nested value by path
   * @param {string} path - Dot notation path, e.g., "intro.phase"
   */
  get(path) {
    const keys = path.split('.');
    let value = this._state;
    for (const key of keys) {
      value = value[key];
      if (value === undefined) return undefined;
    }
    return value;
  }

  /**
   * Set nested value by path
   * @param {string} path - Dot notation path
   * @param {*} value - New value
   */
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let target = this._state;

    // Navigate to parent object
    for (const key of keys) {
      if (target[key] === undefined) {
        target[key] = {};
      }
      target = target[key];
    }

    // Set value
    const oldValue = target[lastKey];
    target[lastKey] = value;

    // Track change
    this._trackChange(path, oldValue, value);

    // Notify listeners
    this._notifyListeners(path, oldValue, value);
  }

  /**
   * Update multiple values at once
   * @param {object} updates - Object with path: value pairs
   */
  update(updates) {
    Object.entries(updates).forEach(([path, value]) => {
      this.set(path, value);
    });
  }

  /**
   * Subscribe to state changes
   * @param {string|null} path - Optional path to watch (null = watch all)
   * @param {function} callback - Called with (path, oldValue, newValue)
   */
  subscribe(path, callback) {
    this._listeners.push({ path, callback });
    return () => {
      this._listeners = this._listeners.filter(l => l.callback !== callback);
    };
  }

  /**
   * Notify listeners of changes
   */
  _notifyListeners(path, oldValue, newValue) {
    this._listeners.forEach(listener => {
      if (!listener.path || path.startsWith(listener.path)) {
        listener.callback(path, oldValue, newValue);
      }
    });
  }

  /**
   * Track change for debugging
   */
  _trackChange(path, oldValue, newValue) {
    this._history.push({
      timestamp: Date.now(),
      path,
      oldValue,
      newValue
    });

    // Keep only last 100 changes
    if (this._history.length > 100) {
      this._history.shift();
    }
  }

  /**
   * Get change history
   */
  getHistory() {
    return this._history;
  }

  /**
   * Reset state (for testing or cleanup)
   */
  reset() {
    const reducedMotion = this._state.isReducedMotion;
    this._state = {
      timelineData: null,
      yearRange: { min: 0, max: 0 },
      xScale: null,
      yScaleForProtocol: null,
      timelineSvgRect: null,
      isReducedMotion: reducedMotion,
      intro: {
        active: false,
        phase: 1,
        rotationAngle: 0,
        tickerId: null,
        dots: []
      },
      systems: {
        active: false,
        phase: '11a',
        rotationAngle: 0,
        tickerId: null,
        dots: []
      },
      actThree: {
        convergenceAnimated: false,
        convergenceDot: null,
        convergenceTimeline: null,
        alternativeTimelineGenerated: false
      },
      floatingTexts: {
        stressorPool: [],
        stressorActive: [],
        lastStressorSpawn: 0,
        achievementPool: [],
        achievementActive: [],
        lastAchievementSpawn: 0
      }
    };
    this._history = [];
    console.log('📋 State reset');
  }

  /**
   * Debug: Print current state
   */
  debug() {
    console.group('🔍 Timeline State');
    console.log('Intro:', this.get('intro'));
    console.log('Systems:', this.get('systems'));
    console.log('Act Three:', this.get('actThree'));
    console.log('Floating Texts:', this.get('floatingTexts'));
    console.groupEnd();
  }
}

// Singleton instance
export const timelineState = new TimelineState();

// Export for debugging
if (typeof window !== 'undefined') {
  window.timelineState = timelineState;
}
