/**
 * Timeline Overlays - Simplified Version
 * Fixed-position text overlays that appear during alternative timeline
 * Simplified for natural scrollytelling
 */

/**
 * Initialize timeline overlay animations
 * These are the fixed-position texts that appear over the timeline
 */
export function initTimelineOverlays() {
  console.log('🎬 Initializing timeline overlays (simplified)');

  // For now, these overlays are disabled in the refactored version
  // They can be re-enabled later with proper scroll triggers

  // Hide all overlay texts by default
  const overlays = document.querySelectorAll('.timeline-overlay-text');
  overlays.forEach(overlay => {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  });

  console.log('✅ Timeline overlays initialized (disabled in refactor)');
}

/**
 * Cleanup overlays
 */
export function cleanupTimelineOverlays() {
  const overlays = document.querySelectorAll('.timeline-overlay-text');
  overlays.forEach(overlay => {
    overlay.style.opacity = '0';
  });
}
