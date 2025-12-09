/**
 * Timeline Configurations
 * Defines configuration objects for main and alternative timelines
 * Eliminates hardcoded values and enables code reuse
 */

import { timelineState } from '../state/timeline-state.js';
import { alternativeEventsData } from '../data/alternative-events.js';

/**
 * Main Timeline Configuration
 */
export const MAIN_TIMELINE_CONFIG = {
  id: 'main',
  prefix: 'main',

  // SVG and container IDs
  svgId: 'timeline-svg',
  yearAxisId: 'year-axis',
  dotsContainerId: 'dots-container',
  eraDividersId: 'era-dividers',
  eventsContainerId: 'events-container',

  // CSS classes
  dotClass: 'event-dot',
  sectionClass: 'event-section',
  eraCardClass: 'era-card',

  // Year range (calculated dynamically from data)
  getYearRange: () => {
    const timelineData = timelineState.get('timelineData');
    if (timelineData && timelineData.events) {
      const minYear = Math.min(...timelineData.events.map(e => e.year));
      const maxYear = Math.max(...timelineData.events.map(e => e.year));
      return { minYear, maxYear };
    }
    return { minYear: 800, maxYear: 2025 }; // fallback
  },

  // Scale functions (from state)
  getXScale: () => timelineState.get('xScale'),
  getYScale: () => timelineState.get('yScaleForProtocol'),

  // Special year positioning for eras
  specialYears: {
    'Pre-Science': 1590,
    'Proto-Science': 800
  },

  // Scale type
  scaleType: 'piecewise', // Uses piecewise scale (proto vs modern)

  // Scroll trigger configuration
  scrollTriggers: {
    eraCardMorph: 'bottom 60%',
    eventDotFall: 'top top'
  },

  // Data source
  getData: () => {
    const data = timelineState.get('timelineData');
    return data?.events || [];
  },

  // Year tick configuration
  yearTicks: {
    type: 'custom', // Custom logic for proto vs modern
    protoYears: [800, 1600],
    modernYears: { start: 1650, end: 2000, step: 50 },
    specificYears: [2025]
  }
};

/**
 * Alternative Timeline Configuration
 */
export const ALT_TIMELINE_CONFIG = {
  id: 'alt',
  prefix: 'alt',

  // SVG and container IDs
  svgId: 'alt-timeline-svg',
  yearAxisId: 'alt-year-axis',
  dotsContainerId: 'alt-dots-container',
  eraDividersId: 'alt-era-dividers',
  eventsContainerId: 'alt-events-container',

  // CSS classes
  dotClass: 'alt-event-dot',
  sectionClass: 'alt-event-section',
  eraCardClass: 'alt-era-card',

  // Year range (calculated dynamically from alternative events data)
  getYearRange: () => {
    const years = alternativeEventsData.map(e => e.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    // Add padding to show future eras (Plural Systems Era is 2035+)
    return { minYear, maxYear: Math.max(maxYear, 2040) };
  },

  // Scale functions (from state)
  getXScale: () => timelineState.get('altXScale'),
  getYScale: () => timelineState.get('altYScaleForProtocol'),

  // Special year positioning (none for alternative timeline)
  specialYears: {},

  // Scale type
  scaleType: 'linear', // Uses linear scale

  // Scroll trigger configuration
  scrollTriggers: {
    eraCardMorph: 'bottom 60%',
    eventDotFall: 'top top'
  },

  // Data source
  getData: () => alternativeEventsData,

  // Year tick configuration
  yearTicks: {
    type: 'uniform', // Uniform ticks every 10 years
    step: 10,
    majorStep: 25 // Major ticks every 25 years
  }
};

/**
 * Get configuration for a specific timeline
 * @param {string} timelineId - 'main' or 'alt'
 * @returns {object} Timeline configuration object
 */
export function getTimelineConfig(timelineId) {
  if (timelineId === 'main') {
    return MAIN_TIMELINE_CONFIG;
  } else if (timelineId === 'alt') {
    return ALT_TIMELINE_CONFIG;
  } else {
    throw new Error(`Unknown timeline ID: ${timelineId}`);
  }
}
