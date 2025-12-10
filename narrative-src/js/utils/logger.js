/**
 * Logger Utility
 * Conditional logging for development vs production
 * Set DEBUG to false for production builds
 */

const DEBUG = false;

export function log(...args) {
  if (DEBUG) console.log(...args);
}

export function warn(...args) {
  if (DEBUG) console.warn(...args);
}

export function error(...args) {
  // Always log errors
  console.error(...args);
}
