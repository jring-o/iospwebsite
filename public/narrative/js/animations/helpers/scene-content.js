/**
 * Scene Content Helper
 * Shared logic for positioning and animating scene content
 */

/**
 * Center content fixed on screen (used by multiple Act III scenes)
 * @param {HTMLElement} content - The content element to center
 * @param {object} options - Optional overrides
 */
export function centerFixedContent(content, options = {}) {
  if (!content) return;

  const defaults = {
    width: '90%',
    maxWidth: '1000px',
    textAlign: 'center'
  };

  const settings = { ...defaults, ...options };

  gsap.set(content, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50,
    width: settings.width,
    maxWidth: settings.maxWidth,
    textAlign: settings.textAlign,
    margin: 0,
    padding: 0
  });
}
