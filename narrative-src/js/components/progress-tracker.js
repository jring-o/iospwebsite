/**
 * Progress Tracker
 * Shows real-time progress through the narrative as users scroll
 * Visual indicator only - no persistence across sessions
 */

import { sceneNavigation } from '../utils/scene-navigation.js';

/**
 * Phase definitions for the narrative structure
 */
const PHASES = [
  { id: 1, name: 'Introduction', color: '#6366f1', types: ['intro'] },
  { id: 2, name: 'Historical Timeline', color: '#8b5cf6', types: ['era', 'simple', 'stressor', 'event'] },
  { id: 3, name: 'The Reckoning', color: '#ec4899', types: ['act-three'] },
  { id: 4, name: 'Emerging Systems', color: '#f59e0b', types: ['systems'] },
  { id: 5, name: 'Alternative Future', color: '#10b981', types: ['alternative-event'] },
  { id: 6, name: 'The Vision', color: '#06b6d4', types: ['closing'] }
];

class ProgressTracker {
  constructor() {
    this.element = null;
    this.progressBar = null;
    this.progressGlow = null;
    this.milestoneContainer = null;
    this.phaseLabel = null;
    this.percentLabel = null;
    this.unsubscribe = null;
    this.currentPhase = 1;
    this.currentProgress = 0;
  }

  /**
   * Initialize progress tracker
   */
  init() {
    this.createProgressUI();

    // Subscribe to scene changes
    this.unsubscribe = sceneNavigation.onSceneChange((scene, index) => {
      this.handleSceneChange(scene, index);
    });

    console.log('Progress tracker initialized');
  }

  /**
   * Create the progress UI elements
   */
  createProgressUI() {
    this.element = document.createElement('div');
    this.element.className = 'progress-tracker';
    this.element.innerHTML = `
      <div class="progress-tracker-inner">
        <div class="progress-bar-container">
          <div class="progress-bar-fill" id="progress-fill"></div>
          <div class="progress-bar-glow" id="progress-glow"></div>
        </div>
        <div class="progress-milestones" id="progress-milestones"></div>
        <div class="progress-info">
          <span class="progress-phase" id="progress-phase">Introduction</span>
          <span class="progress-percent" id="progress-percent">0%</span>
        </div>
      </div>
    `;

    document.body.appendChild(this.element);

    // Cache references
    this.progressBar = document.getElementById('progress-fill');
    this.progressGlow = document.getElementById('progress-glow');
    this.milestoneContainer = document.getElementById('progress-milestones');
    this.phaseLabel = document.getElementById('progress-phase');
    this.percentLabel = document.getElementById('progress-percent');

    // Create phase dots
    this.createPhaseDots();

    // Fade in after a short delay
    setTimeout(() => {
      this.element.classList.add('visible');
    }, 1000);
  }

  /**
   * Create phase indicator dots
   */
  createPhaseDots() {
    PHASES.forEach((phase, index) => {
      const dot = document.createElement('div');
      dot.className = 'progress-milestone-dot';
      dot.dataset.phase = phase.id;
      dot.style.setProperty('--phase-color', phase.color);

      // Position dot along the bar
      const position = ((index + 0.5) / PHASES.length) * 100;
      dot.style.left = `${position}%`;

      // Tooltip
      dot.title = phase.name;

      // Click to navigate to phase start
      dot.addEventListener('click', () => {
        this.navigateToPhase(phase.id);
      });

      this.milestoneContainer.appendChild(dot);
    });
  }

  /**
   * Handle scene changes - update progress display
   */
  handleSceneChange(scene, index) {
    if (!scene) return;

    const totalScenes = sceneNavigation.scenes.length;

    // Calculate progress percentage
    this.currentProgress = Math.round((index / Math.max(totalScenes - 1, 1)) * 100);

    // Determine current phase from scene type
    this.currentPhase = this.getPhaseForSceneType(scene.type);

    // Update UI
    this.updateUI();
  }

  /**
   * Get phase ID for a scene type
   */
  getPhaseForSceneType(sceneType) {
    for (const phase of PHASES) {
      if (phase.types.includes(sceneType)) {
        return phase.id;
      }
    }
    return 1; // Default to intro
  }

  /**
   * Navigate to a specific phase
   */
  navigateToPhase(phaseId) {
    const phase = PHASES.find(p => p.id === phaseId);
    if (!phase) return;

    const scenes = sceneNavigation.scenes;
    const sceneIndex = scenes.findIndex(s => phase.types.includes(s.type));

    if (sceneIndex !== -1) {
      sceneNavigation.goToSceneByIndex(sceneIndex);
    }
  }

  /**
   * Update UI elements
   */
  updateUI() {
    // Update progress bar
    if (this.progressBar) {
      this.progressBar.style.width = `${this.currentProgress}%`;
    }
    if (this.progressGlow) {
      this.progressGlow.style.width = `${this.currentProgress}%`;
    }

    // Update percent label
    if (this.percentLabel) {
      this.percentLabel.textContent = `${this.currentProgress}%`;
    }

    // Update phase label
    if (this.phaseLabel) {
      const phase = PHASES.find(p => p.id === this.currentPhase);
      if (phase) {
        this.phaseLabel.textContent = phase.name;
        this.phaseLabel.style.color = phase.color;
      }
    }

    // Update phase dots
    PHASES.forEach(phase => {
      const dot = this.milestoneContainer?.querySelector(`[data-phase="${phase.id}"]`);
      if (dot) {
        // Mark phases as completed or current
        dot.classList.toggle('completed', phase.id < this.currentPhase);
        dot.classList.toggle('current', phase.id === this.currentPhase);
      }
    });
  }

  /**
   * Get current progress info
   */
  getProgress() {
    return {
      phase: this.currentPhase,
      phaseName: PHASES.find(p => p.id === this.currentPhase)?.name,
      percent: this.currentProgress
    };
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.element?.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
  }
}

// Singleton instance
export const progressTracker = new ProgressTracker();

// Export for debugging
if (typeof window !== 'undefined') {
  window.progressTracker = progressTracker;
}
