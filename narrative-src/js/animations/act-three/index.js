/**
 * Act III Index
 * Convenient export for all Act III scenes
 */

export { initScene7 } from './scene-stress.js';
export { initScene8 } from './scene-breaking.js';
export { initScene9 } from './scene-achievements.js';
export { initScene10 } from './scene-convergence.js';
export { initScene14 } from './scene-alternative.js';

/**
 * Initialize all Act III scenes
 */
export async function initActThree() {
  const { initScene7 } = await import('./scene-stress.js');
  const { initScene8 } = await import('./scene-breaking.js');
  const { initScene9 } = await import('./scene-achievements.js');
  const { initScene10 } = await import('./scene-convergence.js');
  const { initScene14 } = await import('./scene-alternative.js');

  initScene7();
  initScene8();
  initScene9();
  initScene10();
  initScene14();

  console.log('✅ Act III initialized');
}
