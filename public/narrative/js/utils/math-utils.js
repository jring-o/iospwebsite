/**
 * Math Utility Functions
 * Helper functions for calculations and interpolations
 */

/**
 * Linear interpolation between two values
 * @param {number} start
 * @param {number} end
 * @param {number} t - Progress (0-1)
 * @returns {number}
 */
export function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Clamp value between min and max
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map value from one range to another
 * @param {number} value
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 * @returns {number}
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
}

/**
 * Smooth step interpolation (ease in/out)
 * @param {number} t - Progress (0-1)
 * @returns {number}
 */
export function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

/**
 * Convert degrees to radians
 * @param {number} degrees
 * @returns {number}
 */
export function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 * @param {number} radians
 * @returns {number}
 */
export function radToDeg(radians) {
  return (radians * 180) / Math.PI;
}

/**
 * Calculate distance between two points
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Generate random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function random(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Generate random integer between min and max (inclusive)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(random(min, max + 1));
}

/**
 * Sample array proportionally by key
 * @param {Array} array - Array to sample from
 * @param {string} key - Key to group by
 * @param {number} targetCount - Target sample size
 * @returns {Array}
 */
export function sampleProportionally(array, key, targetCount) {
  // Group by key
  const groups = {};
  array.forEach(item => {
    const groupKey = item[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
  });

  const sampled = [];

  // Sample from each group proportionally
  Object.keys(groups).forEach(groupKey => {
    const group = groups[groupKey];
    const proportion = group.length / array.length;
    const sampleSize = Math.max(1, Math.floor(targetCount * proportion));

    // Shuffle and take sample
    const shuffled = [...group].sort(() => Math.random() - 0.5);
    sampled.push(...shuffled.slice(0, sampleSize));
  });

  return sampled;
}

/**
 * Shuffle array (Fisher-Yates)
 * @param {Array} array
 * @returns {Array}
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
