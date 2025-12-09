/**
 * Intro Animation - Rotating Dots with Natural Scrollytelling
 * Beautiful rotating dots with natural scroll progression (no pinning)
 */

import { PROTOCOLS, PROTOCOL_COLORS, INTRO_CONFIG } from '../config/constants.js';
import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../config/scroll-config.js';
import { timelineState } from '../state/timeline-state.js';
import { sampleProportionally } from '../utils/math-utils.js';
import { centerFixedContent } from './helpers/scene-content.js';

// Animation state
let introDots = [];
let introRotationAngle = 0;
let introTickerId = null;
let currentPhase = 1;

/**
 * Calculate five circle positions for protocol separation animation
 * @returns {object} Position data including positions and smallRadius
 */
function getFiveCircleLayout() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const centerY = screenHeight / 2;
  const smallRadius = Math.min(screenWidth, screenHeight) * 0.12;
  const spacing = screenWidth / 6;

  return {
    smallRadius,
    positions: {
      'Inference': { x: spacing * 1, y: centerY },
      'Quality': { x: spacing * 2, y: centerY },
      'Engagement': { x: spacing * 3, y: centerY },
      'Coordination': { x: spacing * 4, y: centerY },
      'Preservation': { x: spacing * 5, y: centerY }
    }
  };
}

/**
 * Group dots by protocol
 * @param {Array} dots - Dot objects
 * @returns {object} Dots grouped by protocol name
 */
function groupDotsByProtocol(dots) {
  const grouped = {};
  PROTOCOLS.forEach(p => {
    grouped[p] = dots.filter(d => d.protocol === p);
  });
  return grouped;
}

/**
 * Generate intro dots from timeline events
 */
function generateIntroDots(maxDots = 150) {
  const timelineData = timelineState.get('timelineData');
  if (!timelineData) return [];

  const allDotData = [];

  // Collect all event-protocol combinations
  timelineData.events.forEach((event, eventIndex) => {
    if (event.affects) {
      event.affects.forEach(protocol => {
        allDotData.push({
          eventIndex,
          protocol,
          color: PROTOCOL_COLORS[protocol],
          year: event.year
        });
      });
    }
  });

  // Determine target dot count based on screen size
  const screenWidth = window.innerWidth;
  let targetDotCount = screenWidth < 768 ? 80 : Math.min(allDotData.length, 300);

  // Sample if needed
  let sampledData = allDotData.length > targetDotCount
    ? sampleProportionally(allDotData, 'protocol', targetDotCount)
    : allDotData;

  // Shuffle to intermingle colors
  return [...sampledData].sort(() => Math.random() - 0.5);
}

/**
 * Create DOM elements for intro dots
 */
function createIntroDotElements(dotData) {
  const container = document.getElementById('intro-dots-container');
  if (!container) {
    console.error('intro-dots-container not found!');
    return [];
  }

  container.innerHTML = '';
  const dots = [];

  dotData.forEach((data, index) => {
    const dotEl = document.createElement('div');
    dotEl.className = 'intro-dot';
    dotEl.style.backgroundColor = data.color;
    dotEl.style.opacity = '0.8';

    const dot = {
      element: dotEl,
      protocol: data.protocol,
      color: data.color,
      eventIndex: data.eventIndex,
      year: data.year,
      baseAngle: (index / dotData.length) * 360,
      currentAngle: 0,
      baseRadius: 0,
      currentRadius: 0,
      randomOffsetX: 0,
      randomOffsetY: 0,
      randomTargetX: 0,
      randomTargetY: 0
    };

    container.appendChild(dotEl);
    dots.push(dot);
  });

  return dots;
}

/**
 * Position dots in a circle
 */
function positionDotsInCircle(dots, centerX, centerY, radius) {
  dots.forEach((dot, index) => {
    const angle = (index / dots.length) * 360;
    dot.baseAngle = angle;
    dot.baseRadius = radius;
    dot.currentRadius = radius + (Math.random() - 0.5) * 20;
    dot.currentAngle = angle + (Math.random() - 0.5) * 10;
  });
}

/**
 * Update dot positions for single circle (Phase 1 & 3)
 */
function updateDotPositionsSimple(dots, centerX, centerY) {
  dots.forEach(dot => {
    const angleRad = ((dot.baseAngle + introRotationAngle) * Math.PI) / 180;
    const x = centerX + Math.cos(angleRad) * dot.currentRadius + dot.randomOffsetX;
    const y = centerY + Math.sin(angleRad) * dot.currentRadius + dot.randomOffsetY;
    dot.element.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/**
 * Morph dots to single circle
 */
function morphToSingleCircle(dots, centerX, centerY, radius) {
  dots.forEach(dot => {
    dot.currentRadius += (radius - dot.currentRadius) * 0.05;
  });
}

/**
 * Morph dots to 5 protocol circles
 */
function morphToFiveCircles(dots, progress, sourceCenterX, sourceCenterY, sourceRadius) {
  const { smallRadius, positions } = getFiveCircleLayout();
  const dotsByProtocol = groupDotsByProtocol(dots);

  PROTOCOLS.forEach(protocol => {
    const protocolDots = dotsByProtocol[protocol];
    const targetPos = positions[protocol];

    if (targetPos && protocolDots) {
      protocolDots.forEach((dot, index) => {
        // Target: small circle at fixed position
        const targetAngle = (index / protocolDots.length) * 360 + introRotationAngle;
        const targetAngleRad = (targetAngle * Math.PI) / 180;
        const targetX = targetPos.x + Math.cos(targetAngleRad) * smallRadius;
        const targetY = targetPos.y + Math.sin(targetAngleRad) * smallRadius;

        // Current: large circle around center
        const currentAngleRad = ((dot.baseAngle + introRotationAngle) * Math.PI) / 180;
        const currentX = sourceCenterX + Math.cos(currentAngleRad) * sourceRadius + dot.randomOffsetX;
        const currentY = sourceCenterY + Math.sin(currentAngleRad) * sourceRadius + dot.randomOffsetY;

        // Interpolate
        const x = currentX + (targetX - currentX) * progress;
        const y = currentY + (targetY - currentY) * progress;
        dot.element.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
  });
}

/**
 * Morph dots from 5 circles back to single circle
 */
function morphFromFiveCirclesToSingle(dots, progress, targetCenterX, targetCenterY, targetRadius) {
  const { smallRadius, positions } = getFiveCircleLayout();
  const dotsByProtocol = groupDotsByProtocol(dots);

  PROTOCOLS.forEach(protocol => {
    const protocolDots = dotsByProtocol[protocol];
    const currentPos = positions[protocol];

    if (currentPos && protocolDots) {
      protocolDots.forEach((dot, index) => {
        // Current: small circle at fixed position
        const angle = (index / protocolDots.length) * 360 + introRotationAngle;
        const angleRad = (angle * Math.PI) / 180;
        const currentX = currentPos.x + Math.cos(angleRad) * smallRadius;
        const currentY = currentPos.y + Math.sin(angleRad) * smallRadius;

        // Target: large circle around center
        const targetAngleRad = ((dot.baseAngle + introRotationAngle) * Math.PI) / 180;
        const targetX = targetCenterX + Math.cos(targetAngleRad) * targetRadius;
        const targetY = targetCenterY + Math.sin(targetAngleRad) * targetRadius;

        // Interpolate
        const x = currentX + (targetX - currentX) * progress;
        const y = currentY + (targetY - currentY) * progress;
        dot.element.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
  });
}

/**
 * Update rotation for 5 circles (Phase 2)
 */
function updateFiveCirclesRotation(dots) {
  const { smallRadius, positions } = getFiveCircleLayout();
  const dotsByProtocol = groupDotsByProtocol(dots);

  PROTOCOLS.forEach(protocol => {
    const protocolDots = dotsByProtocol[protocol];
    const centerPos = positions[protocol];

    if (centerPos && protocolDots) {
      protocolDots.forEach((dot, index) => {
        const baseAngle = (index / protocolDots.length) * 360;
        const angle = baseAngle + introRotationAngle;
        const angleRad = (angle * Math.PI) / 180;

        const x = centerPos.x + Math.cos(angleRad) * smallRadius + dot.randomOffsetX;
        const y = centerPos.y + Math.sin(angleRad) * smallRadius + dot.randomOffsetY;
        dot.element.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
  });
}

/**
 * Update random offsets for organic movement (called in ticker)
 */
function updateRandomOffsets(dots) {
  dots.forEach(dot => {
    dot.randomOffsetX += (dot.randomTargetX - dot.randomOffsetX) * 0.02;
    dot.randomOffsetY += (dot.randomTargetY - dot.randomOffsetY) * 0.02;

    if (Math.random() < 0.01) {
      dot.randomTargetX = (Math.random() - 0.5) * 20;
      dot.randomTargetY = (Math.random() - 0.5) * 20;
    }
  });
}

/**
 * Create ticker callback for continuous animation
 */
function createTickerCallback() {
  return () => {
    introRotationAngle += 0.15;
    updateRandomOffsets(introDots);

    if (currentPhase === 1 || currentPhase === 3) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      updateDotPositionsSimple(introDots, cx, cy);
    } else if (currentPhase === 2) {
      updateFiveCirclesRotation(introDots);
    }
  };
}

/**
 * Initialize intro animation
 */
export function initIntroAnimation() {
  // Generate dots
  const dotData = generateIntroDots();
  introDots = createIntroDotElements(dotData);

  if (introDots.length === 0) {
    console.error('No intro dots created!');
    return;
  }

  // Initial positioning
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.42;

  positionDotsInCircle(introDots, centerX, centerY, radius);

  // Start ticker for continuous rotation
  introTickerId = gsap.ticker.add(createTickerCallback());

  // Setup scroll-triggered phase transitions
  setupScrollTriggers();
}

/**
 * Setup ScrollTrigger for phase transitions (natural scroll)
 */
function setupScrollTriggers() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.42;

  const moment1 = document.querySelector('.intro-moment-1');
  const moment2 = document.querySelector('.intro-moment-2');
  const moment3 = document.querySelector('.intro-moment-3');
  const labelsContainer = document.querySelector('.protocol-labels-container');

  // Moment 1: Single circle - text stays fixed and fades out smoothly
  const content1 = moment1.querySelector('.moment-content');

  ScrollTrigger.create({
    trigger: moment1,
    start: 'top top',
    end: 'bottom top',
    pin: content1,
    pinSpacing: false,
  });

  gsap.fromTo(content1,
    { opacity: 1 },
    {
      opacity: 0,
      scrollTrigger: {
        trigger: moment1,
        start: 'top top',
        end: 'bottom top',
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    }
  );

  // Keep dots in single circle position during moment 1
  ScrollTrigger.create({
    trigger: moment1,
    start: 'top top',
    end: 'bottom top',
    onUpdate: () => {
      if (currentPhase === 1) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        updateDotPositionsSimple(introDots, cx, cy);
      }
    }
  });

  // Transition: Morph to five circles
  ScrollTrigger.create({
    trigger: moment2,
    start: 'top 80%',
    end: 'top 20%',
    scrub: 1,
    onUpdate: (self) => {
      currentPhase = 1.5;
      if (introDots && introDots.length > 0) {
        morphToFiveCircles(introDots, self.progress, centerX, centerY, radius);
      }
    },
    onEnter: () => { currentPhase = 1.5; },
    onLeaveBack: () => {
      currentPhase = 1;
      morphToSingleCircle(introDots, centerX, centerY, radius);
    }
  });

  // Labels timeline (spans moment2 to moment3)
  const labelsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: moment2,
      start: 'top 60%',
      endTrigger: moment3,
      end: 'top 20%',
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  labelsTimeline
    .fromTo(labelsContainer, { opacity: 0 }, { opacity: 1, duration: 1 })
    .to(labelsContainer, { opacity: 1, duration: 3 })
    .to(labelsContainer, { opacity: 0, duration: 6 });

  // Switch to phase 2 when morph is complete
  ScrollTrigger.create({
    trigger: moment2,
    start: 'top 20%',
    onEnter: () => { currentPhase = 2; },
    onLeaveBack: () => { currentPhase = 1.5; }
  });

  // Keep dots in five circles position during moment 2
  ScrollTrigger.create({
    trigger: moment2,
    start: 'top 20%',
    end: 'bottom 60%',
    onUpdate: () => {
      if (currentPhase === 2) {
        updateFiveCirclesRotation(introDots);
      }
    }
  });

  // Transition: Morph back to single circle
  ScrollTrigger.create({
    trigger: moment3,
    start: 'top 100%',
    end: 'top 20%',
    scrub: 1,
    onUpdate: (self) => {
      currentPhase = 2.5;
      morphFromFiveCirclesToSingle(introDots, self.progress, centerX, centerY, radius);
      if (self.progress >= 0.99) {
        currentPhase = 3;
      }
    },
    onLeaveBack: () => { currentPhase = 2; }
  });

  // Ensure phase 3 is active when moment3 is visible
  ScrollTrigger.create({
    trigger: moment3,
    start: 'top 20%',
    onEnter: () => { currentPhase = 3; },
    onLeaveBack: () => { currentPhase = 2.5; }
  });

  // Remaining moments: fade text in/out using shared helper
  // Now includes moments 3-7 (consolidated substrate flow)
  [3, 4, 5, 6, 7].forEach(num => {
    const moment = document.querySelector(`.intro-moment-${num}`);
    const content = moment?.querySelector('.moment-content');

    if (content) {
      centerFixedContent(content);

      const momentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: moment,
          start: TRIGGER_POSITIONS.ENTER_LOW,
          end: TRIGGER_POSITIONS.EXIT_HIGH,
          scrub: SCRUB_SPEEDS.SMOOTH,
        }
      });

      if (num === 3) {
        // Moment 3 (technical substrate) needs delayed fade-in after five circles merge back
        momentTimeline
          .to(content, { opacity: 0, duration: 2 })
          .fromTo(content, { opacity: 0 }, { opacity: 1, duration: 1 })
          .to(content, { opacity: 1, duration: 1 })
          .to(content, { opacity: 0, duration: 1 });
      } else {
        momentTimeline
          .fromTo(content, { opacity: 0 }, { opacity: 1, duration: 1 })
          .to(content, { opacity: 1, duration: 2 })
          .to(content, { opacity: 0, duration: 1 });
      }
    }
  });

  // Fade out dots at the end (moment 7 is now the last intro moment)
  gsap.to('#intro-dots-container', {
    opacity: 0,
    scrollTrigger: {
      trigger: '.intro-moment-7',
      start: TRIGGER_POSITIONS.CENTER,
      end: TRIGGER_POSITIONS.EXIT_MID,
      scrub: SCRUB_SPEEDS.SMOOTH,
      onLeave: () => {
        if (introTickerId) {
          gsap.ticker.remove(introTickerId);
          introTickerId = null;
        }
      },
      onEnterBack: () => {
        if (!introTickerId) {
          introTickerId = gsap.ticker.add(createTickerCallback());
        }
      }
    }
  });

  // Fade in timeline as dots fade out
  const timeline = document.querySelector('.timeline-fixed');
  if (timeline) {
    gsap.fromTo(timeline,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: '.timeline-reveal-spacer',
          start: 'top 80%',
          end: 'top 20%',
          scrub: SCRUB_SPEEDS.SMOOTH,
        }
      }
    );
  }
}

/**
 * Cleanup function
 */
export function cleanupIntroAnimation() {
  if (introTickerId) {
    gsap.ticker.remove(introTickerId);
    introTickerId = null;
  }

  const container = document.getElementById('intro-dots-container');
  if (container) {
    container.innerHTML = '';
  }

  introDots = [];
}
