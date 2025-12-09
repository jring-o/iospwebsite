/**
 * DOM Utility Functions
 * Helper functions for DOM manipulation
 */

/**
 * Create element with classes and attributes
 * @param {string} tag - Element tag name
 * @param {object} options - Options for element creation
 * @returns {HTMLElement}
 */
export function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.className) {
    element.className = options.className;
  }

  if (options.id) {
    element.id = options.id;
  }

  if (options.styles) {
    Object.assign(element.style, options.styles);
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (options.dataset) {
    Object.entries(options.dataset).forEach(([key, value]) => {
      element.dataset[key] = value;
    });
  }

  if (options.html) {
    element.innerHTML = options.html;
  }

  if (options.text) {
    element.textContent = options.text;
  }

  if (options.parent) {
    options.parent.appendChild(element);
  }

  return element;
}

/**
 * Create SVG element with attributes
 * @param {string} tag - SVG element tag name
 * @param {object} attributes - SVG attributes
 * @returns {SVGElement}
 */
export function createSVGElement(tag, attributes = {}) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}

/**
 * Remove all children from an element
 * @param {HTMLElement} element
 */
export function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Get element's center position
 * @param {HTMLElement} element
 * @returns {object} - {x, y}
 */
export function getElementCenter(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

/**
 * Check if device is mobile
 * @param {number} breakpoint - Mobile breakpoint in pixels
 * @returns {boolean}
 */
export function isMobile(breakpoint = 768) {
  return window.innerWidth < breakpoint;
}

/**
 * Check if device is tablet
 * @param {number} mobileBreakpoint - Mobile breakpoint
 * @param {number} desktopBreakpoint - Desktop breakpoint
 * @returns {boolean}
 */
export function isTablet(mobileBreakpoint = 768, desktopBreakpoint = 1024) {
  const width = window.innerWidth;
  return width >= mobileBreakpoint && width < desktopBreakpoint;
}

/**
 * Safely remove element from DOM
 * @param {HTMLElement} element
 */
export function safeRemove(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Query selector with error handling
 * @param {string} selector
 * @param {HTMLElement} parent - Optional parent element
 * @returns {HTMLElement|null}
 */
export function qs(selector, parent = document) {
  try {
    return parent.querySelector(selector);
  } catch (error) {
    console.error(`Invalid selector: ${selector}`, error);
    return null;
  }
}

/**
 * Query selector all with error handling
 * @param {string} selector
 * @param {HTMLElement} parent - Optional parent element
 * @returns {NodeList}
 */
export function qsa(selector, parent = document) {
  try {
    return parent.querySelectorAll(selector);
  } catch (error) {
    console.error(`Invalid selector: ${selector}`, error);
    return [];
  }
}
