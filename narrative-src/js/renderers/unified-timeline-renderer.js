/**
 * Unified Timeline Renderer
 * Generates timeline SVG for both main and alternative timelines
 * Uses configuration objects to eliminate code duplication
 */

import { PROTOCOLS, TIMELINE_CONFIG } from '../config/constants.js';
import { timelineState } from '../state/timeline-state.js';
import { createSVGElement } from '../utils/dom-utils.js';

/**
 * Create piecewise X scale (for main timeline)
 */
function createPiecewiseXScale(minYear, maxYear, width, padding) {
  const ERA_BREAK = TIMELINE_CONFIG.ERA_BREAK_YEAR;
  const PROTO_PERCENT = TIMELINE_CONFIG.PROTO_PERCENT;
  const MODERN_PERCENT = TIMELINE_CONFIG.MODERN_PERCENT;

  return (year) => {
    const availableWidth = width - padding.left - padding.right;

    if (year < ERA_BREAK) {
      const t = (year - minYear) / (ERA_BREAK - minYear);
      return padding.left + t * (availableWidth * PROTO_PERCENT);
    } else {
      const t = (year - ERA_BREAK) / (maxYear - ERA_BREAK);
      return padding.left + (availableWidth * PROTO_PERCENT) + t * (availableWidth * MODERN_PERCENT);
    }
  };
}

/**
 * Create linear X scale (for alternative timeline)
 */
function createLinearXScale(minYear, maxYear, width, padding) {
  return (year) => {
    const t = (year - minYear) / (maxYear - minYear);
    const availableWidth = width - padding.left - padding.right;
    return padding.left + t * availableWidth;
  };
}

/**
 * Create Y scale for protocol tracks
 */
function createYScale(padding, trackHeight) {
  return (protocol) => {
    const index = PROTOCOLS.indexOf(protocol);
    return padding.top + (index + 0.5) * trackHeight;
  };
}

/**
 * Generate year ticks (custom logic for main timeline)
 */
function generateCustomYearTicks(xScale, padding, height, yearAxis, config) {
  const ticksY = height - padding.bottom + 10;

  // Proto-science: show only start and end
  config.protoYears.forEach(year => {
    const tick = createYearTick(year, xScale(year), ticksY, true);
    yearAxis.appendChild(tick);
  });

  // Modern era: every N years
  const { start, end, step } = config.modernYears;
  for (let year = start; year <= end; year += step) {
    const tick = createYearTick(year, xScale(year), ticksY, true);
    yearAxis.appendChild(tick);
  }

  // Specific years
  config.specificYears.forEach(year => {
    const tick = createYearTick(year, xScale(year), ticksY, true);
    yearAxis.appendChild(tick);
  });
}

/**
 * Generate year ticks (uniform logic for alternative timeline)
 */
function generateUniformYearTicks(xScale, padding, height, yearAxis, config, minYear, maxYear) {
  const ticksY = height - padding.bottom + 10;

  for (let year = minYear; year <= maxYear; year += config.step) {
    const isMajor = year % config.majorStep === 0;
    const tick = createYearTick(year, xScale(year), ticksY, isMajor);
    yearAxis.appendChild(tick);
  }
}

/**
 * Create a year tick element
 */
function createYearTick(year, x, ticksY, isMajor = false) {
  const tick = createSVGElement('g', {
    class: isMajor ? 'year-tick major' : 'year-tick'
  });

  const line = createSVGElement('line', {
    x1: x,
    y1: ticksY - (isMajor ? 8 : 5),
    x2: x,
    y2: ticksY + (isMajor ? 8 : 5)
  });

  const text = createSVGElement('text', {
    x: x,
    y: ticksY + 15,
    'text-anchor': 'middle'
  });
  text.textContent = year;

  tick.appendChild(line);
  tick.appendChild(text);

  return tick;
}

/**
 * Generate event dots on timeline
 */
function generateEventDots(eventsData, xScale, yScaleForProtocol, dotsContainer, dotClass) {
  eventsData.forEach((event, eventIndex) => {
    if (event.type === 'era' && !event.title) return; // Skip pure era markers

    const x = xScale(event.year);
    const isStressor = event.type === 'stressor';

    (event.affects || []).forEach(protocol => {
      const y = yScaleForProtocol(protocol);

      const dotGroup = createSVGElement('g', {
        class: `${dotClass} ${protocol}${isStressor ? ' stressor-dot' : ''}`,
        'data-event-index': eventIndex,
        'data-protocol': protocol
      });

      if (event.system) {
        dotGroup.dataset.system = event.system;
      }

      // Mark founding events (events that start a system) for special glow
      if (event.startsSystem) {
        dotGroup.dataset.foundingEvent = 'true';
      }

      const circle = createSVGElement('circle', {
        cx: x,
        cy: y,
        r: 5
      });

      dotGroup.appendChild(circle);
      dotsContainer.appendChild(dotGroup);
    });
  });
}

/**
 * Unified timeline generation function
 * @param {object} config - Timeline configuration object
 */
export function generateTimeline(config) {
  const svg = document.getElementById(config.svgId);
  if (!svg) {
    console.error(`${config.svgId} not found`);
    return;
  }

  const svgRect = svg.getBoundingClientRect();
  const width = svgRect.width;
  const height = svgRect.height;
  const padding = TIMELINE_CONFIG.PADDING;
  const trackHeight = (height - padding.top - padding.bottom) / PROTOCOLS.length;

  // Get year range from config
  const { minYear, maxYear } = config.getYearRange();

  // Create scale based on type
  let xScale;
  if (config.scaleType === 'piecewise') {
    xScale = createPiecewiseXScale(minYear, maxYear, width, padding);
  } else {
    xScale = createLinearXScale(minYear, maxYear, width, padding);
  }

  const yScaleForProtocol = createYScale(padding, trackHeight);

  // Store scales in state
  if (config.id === 'main') {
    timelineState.update({
      'yearRange.min': minYear,
      'yearRange.max': maxYear,
      'xScale': xScale,
      'yScaleForProtocol': yScaleForProtocol,
      'timelineSvgRect': svgRect
    });
  } else if (config.id === 'alt') {
    timelineState.update({
      'altYearRange.min': minYear,
      'altYearRange.max': maxYear,
      'altXScale': xScale,
      'altYScaleForProtocol': yScaleForProtocol
    });
  }

  // Draw protocol tracks
  const yearAxis = document.getElementById(config.yearAxisId);
  if (!yearAxis) {
    console.error(`${config.yearAxisId} not found`);
    return;
  }

  PROTOCOLS.forEach((protocol) => {
    const y = yScaleForProtocol(protocol);

    // Protocol line
    const trackLine = createSVGElement('line', {
      x1: padding.left,
      y1: y,
      x2: width - padding.right,
      y2: y,
      class: `protocol-track ${protocol}`
    });
    yearAxis.appendChild(trackLine);

    // Protocol label
    const label = createSVGElement('text', {
      x: padding.left - 10,
      y: y + 4,
      'text-anchor': 'end',
      class: 'protocol-label'
    });
    label.textContent = protocol;
    yearAxis.appendChild(label);
  });

  // Generate year ticks based on config
  if (config.yearTicks.type === 'custom') {
    generateCustomYearTicks(xScale, padding, height, yearAxis, config.yearTicks);
  } else if (config.yearTicks.type === 'uniform') {
    generateUniformYearTicks(xScale, padding, height, yearAxis, config.yearTicks, minYear, maxYear);
  }

  // Generate event dots
  const dotsContainer = document.getElementById(config.dotsContainerId);
  if (dotsContainer) {
    const eventsData = config.getData();
    generateEventDots(eventsData, xScale, yScaleForProtocol, dotsContainer, config.dotClass);
  }

  // Timeline generation complete
}
