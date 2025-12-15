/**
 * Scene Manager
 * Coordinates scene lifecycle, cleanup, and transitions
 */

import { gsap } from "gsap";

class SceneManager {
  constructor() {
    this.scenes = new Map();
    this.currentScene = null;
    this.elements = new Set(); // Track all created DOM elements
    this.animations = new Map(); // Track all GSAP animations by scene
  }

  /**
   * Register a scene with lifecycle hooks
   * @param {string} id - Unique scene identifier
   * @param {object} config - Scene configuration
   */
  registerScene(id, config) {
    this.scenes.set(id, {
      id,
      active: false,
      cleanup: config.cleanup || (() => {}),
      onEnter: config.onEnter || (() => {}),
      onExit: config.onExit || (() => {}),
      onUpdate: config.onUpdate || (() => {})
    });

    console.log(`✅ Scene registered: ${id}`);
  }

  /**
   * Transition from one scene to another
   * @param {string} sceneId - Target scene ID
   * @param {string} direction - 'forward' or 'backward'
   */
  transitionTo(sceneId, direction = 'forward') {
    const fromScene = this.currentScene;
    const toScene = this.scenes.get(sceneId);

    if (!toScene) {
      console.warn(`⚠️ Scene not found: ${sceneId}`);
      return;
    }

    console.log(`🔄 Transition: ${fromScene?.id || 'null'} → ${sceneId} (${direction})`);

    // Exit current scene
    if (fromScene) {
      try {
        fromScene.onExit(direction);
        fromScene.cleanup(direction); // Pass direction to cleanup
        this.cleanupScene(fromScene.id);
        fromScene.active = false;
      } catch (error) {
        console.error(`❌ Error exiting scene ${fromScene.id}:`, error);
      }
    }

    // Enter new scene
    try {
      toScene.onEnter(direction);
      toScene.active = true;
      this.currentScene = toScene;
    } catch (error) {
      console.error(`❌ Error entering scene ${sceneId}:`, error);
    }
  }

  /**
   * Update current scene with progress
   * @param {number} progress - Scene progress (0-1)
   */
  updateScene(progress) {
    if (this.currentScene && this.currentScene.onUpdate) {
      this.currentScene.onUpdate(progress);
    }
  }

  /**
   * Cleanup specific scene
   * @param {string} sceneId - Scene to clean up
   */
  cleanupScene(sceneId) {
    // Kill all animations for this scene
    if (this.animations.has(sceneId)) {
      const sceneAnimations = this.animations.get(sceneId);
      sceneAnimations.forEach(animation => {
        if (animation && animation.kill) {
          animation.kill();
        }
      });
      this.animations.delete(sceneId);
    }

    console.log(`🧹 Cleaned up scene: ${sceneId}`);
  }

  /**
   * Register a DOM element created by a scene
   * @param {HTMLElement} element
   * @param {string} sceneId - Scene that owns this element
   */
  registerElement(element, sceneId) {
    element.dataset.sceneOwner = sceneId;
    this.elements.add(element);
  }

  /**
   * Register a GSAP animation for a scene
   * @param {object} animation - GSAP timeline or tween
   * @param {string} sceneId - Scene that owns this animation
   */
  registerAnimation(animation, sceneId) {
    if (!this.animations.has(sceneId)) {
      this.animations.set(sceneId, []);
    }
    this.animations.get(sceneId).push(animation);
  }

  /**
   * Remove all elements owned by a scene
   * @param {string} sceneId
   */
  removeSceneElements(sceneId) {
    this.elements.forEach(element => {
      if (element.dataset.sceneOwner === sceneId && element.parentNode) {
        element.parentNode.removeChild(element);
        this.elements.delete(element);
      }
    });
  }

  /**
   * Emergency cleanup - remove all tracked elements and kill all animations
   */
  cleanupAll() {
    console.log('🧹 SceneManager: Global cleanup');

    // Kill all animations
    this.animations.forEach((sceneAnimations, sceneId) => {
      sceneAnimations.forEach(animation => {
        if (animation && animation.kill) {
          animation.kill();
        }
      });
    });
    this.animations.clear();

    // Remove all tracked elements
    this.elements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    this.elements.clear();

    // Kill all GSAP tweens (global)
    if (typeof gsap !== 'undefined') {
      gsap.killTweensOf('*');
    }

    // Reset current scene
    if (this.currentScene) {
      this.currentScene.active = false;
      this.currentScene = null;
    }

    console.log('✅ Cleanup complete');
  }

  /**
   * Get list of all registered scenes
   */
  listScenes() {
    return Array.from(this.scenes.keys());
  }

  /**
   * Get current scene info
   */
  getCurrentScene() {
    return this.currentScene ? {
      id: this.currentScene.id,
      active: this.currentScene.active
    } : null;
  }

  /**
   * Debug: Print scene manager state
   */
  debug() {
    console.group('🎬 Scene Manager State');
    console.log('Current scene:', this.currentScene?.id || 'none');
    console.log('Registered scenes:', this.listScenes());
    console.log('Tracked elements:', this.elements.size);
    console.log('Active animations:', Array.from(this.animations.entries()).map(([id, anims]) =>
      `${id}: ${anims.length} animations`
    ));
    console.groupEnd();
  }
}

// Singleton instance
export const sceneManager = new SceneManager();

// Export for debugging
if (typeof window !== 'undefined') {
  window.sceneManager = sceneManager;
}
