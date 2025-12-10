/**
 * Systems Animation - EXACT COPY of Intro Animation Pattern
 * Rotating circle of dots with text fading in center
 */

import { PROTOCOL_COLORS } from '../config/constants.js';
import { TRIGGER_POSITIONS, SCRUB_SPEEDS } from '../config/scroll-config.js';
import { timelineState } from '../state/timeline-state.js';
import { sampleProportionally } from '../utils/math-utils.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Animation state
let systemsDots = [];
let systemsRotationAngle = 0;
let systemsTickerId = null;
let currentSystemsPhase = 1; // 1 = single circle, 2 = three circles, 3 = single circle again

/**
 * Generate systems dots (COPIED from generateIntroDots)
 */
function generateSystemsDots() {
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

  // Determine target dot count
  const screenWidth = window.innerWidth;
  let targetDotCount = screenWidth < 768 ? 80 : Math.min(allDotData.length, 300);

  // Sample if needed
  let sampledData;
  if (allDotData.length > targetDotCount) {
    sampledData = sampleProportionally(allDotData, 'protocol', targetDotCount);
  } else {
    sampledData = allDotData;
  }

  // Shuffle to intermingle colors
  sampledData = [...sampledData].sort(() => Math.random() - 0.5);

  console.log(`Using ${sampledData.length} dots for systems animation (shuffled)`);

  return sampledData;
}

/**
 * Create DOM elements for systems dots (COPIED from createIntroDotElements)
 */
function createSystemsDotElements(dotData) {
  const container = document.getElementById('systems-dots-container');
  if (!container) {
    console.error('systems-dots-container not found!');
    return [];
  }

  container.innerHTML = '';

  const dots = [];

  dotData.forEach((data, index) => {
    const dotEl = document.createElement('div');
    dotEl.className = 'intro-dot';
    dotEl.style.backgroundColor = data.color;
    dotEl.style.opacity = '0'; // Start hidden

    // Assign protocols to systems
    // Institutional: Inference, Quality, Engagement (3 colors - largest system)
    // Corporate: Coordination (1 color)
    // Benefactor: Preservation (1 color)
    let system;
    if (data.protocol === 'Coordination') {
      system = 'Corporate';
    } else if (data.protocol === 'Preservation') {
      system = 'Benefactor';
    } else {
      system = 'Institutional'; // Inference, Quality, Engagement
    }

    const dot = {
      element: dotEl,
      protocol: data.protocol,
      system: system,
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
 * Position dots in a circle (COPIED from intro)
 */
function positionDotsInCircle(dots, centerX, centerY, radius) {
  dots.forEach((dot, index) => {
    const angle = (index / dots.length) * 360;
    dot.baseAngle = angle;
    dot.baseRadius = radius;
    dot.currentRadius = radius;

    const randomRadius = radius + (Math.random() - 0.5) * 20;
    const randomAngle = angle + (Math.random() - 0.5) * 10;

    dot.currentAngle = randomAngle;
    dot.currentRadius = randomRadius;
  });
}

/**
 * Update dot positions for single circle (COPIED from intro)
 */
function updateDotPositionsSimple(dots, centerX, centerY) {
  dots.forEach(dot => {
    const angleRad = ((dot.baseAngle + systemsRotationAngle) * Math.PI) / 180;
    const x = centerX + Math.cos(angleRad) * dot.currentRadius + dot.randomOffsetX;
    const y = centerY + Math.sin(angleRad) * dot.currentRadius + dot.randomOffsetY;

    dot.element.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/**
 * Morph dots to 3 system circles (COPIED from morphToFiveCircles)
 */
function morphToThreeCircles(dots, progress, sourceCenterX, sourceCenterY, sourceRadius) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const centerY = screenHeight / 2;
  const smallRadius = Math.min(screenWidth, screenHeight) * 0.15; // Bigger circles for text

  // Calculate 3 evenly spaced positions for the three systems
  const spacing = screenWidth / 4; // Divide by 4 to get 3 circles with padding
  const threeCirclePositions = {
    'Corporate': { x: spacing * 1, y: centerY },
    'Institutional': { x: spacing * 2, y: centerY },
    'Benefactor': { x: spacing * 3, y: centerY }
  };

  // Group dots by system
  const dotsBySystem = {
    'Corporate': dots.filter(d => d.system === 'Corporate'),
    'Institutional': dots.filter(d => d.system === 'Institutional'),
    'Benefactor': dots.filter(d => d.system === 'Benefactor')
  };

  // Position each system's dots
  ['Corporate', 'Institutional', 'Benefactor'].forEach(system => {
    const systemDots = dotsBySystem[system];
    const targetPos = threeCirclePositions[system];

    if (targetPos && systemDots) {
      systemDots.forEach((dot, index) => {
        // Target: small circle at fixed position
        const targetAngle = (index / systemDots.length) * 360 + systemsRotationAngle;
        const targetAngleRad = (targetAngle * Math.PI) / 180;
        const targetX = targetPos.x + Math.cos(targetAngleRad) * smallRadius;
        const targetY = targetPos.y + Math.sin(targetAngleRad) * smallRadius;

        // Current: large circle around center
        const currentAngleRad = ((dot.baseAngle + systemsRotationAngle) * Math.PI) / 180;
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
 * Update three circles rotation (COPIED from updateFiveCirclesRotation)
 */
function updateThreeCirclesRotation(dots) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const centerY = screenHeight / 2;
  const smallRadius = Math.min(screenWidth, screenHeight) * 0.15; // Bigger circles for text

  const spacing = screenWidth / 4;
  const threeCirclePositions = {
    'Corporate': { x: spacing * 1, y: centerY },
    'Institutional': { x: spacing * 2, y: centerY },
    'Benefactor': { x: spacing * 3, y: centerY }
  };

  const dotsBySystem = {
    'Corporate': dots.filter(d => d.system === 'Corporate'),
    'Institutional': dots.filter(d => d.system === 'Institutional'),
    'Benefactor': dots.filter(d => d.system === 'Benefactor')
  };

  ['Corporate', 'Institutional', 'Benefactor'].forEach(system => {
    const systemDots = dotsBySystem[system];
    const centerPos = threeCirclePositions[system];

    if (centerPos && systemDots) {
      systemDots.forEach((dot, index) => {
        const baseAngle = (index / systemDots.length) * 360;
        const angle = baseAngle + systemsRotationAngle;
        const angleRad = (angle * Math.PI) / 180;

        const x = centerPos.x + Math.cos(angleRad) * smallRadius + dot.randomOffsetX;
        const y = centerPos.y + Math.sin(angleRad) * smallRadius + dot.randomOffsetY;

        dot.element.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
  });
}

/**
 * Morph dots from three circles back to single circle
 */
function morphFromThreeCirclesToSingle(dots, progress, targetCenterX, targetCenterY, targetRadius) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const centerY = screenHeight / 2;
  const smallRadius = Math.min(screenWidth, screenHeight) * 0.15; // Bigger circles for text

  const spacing = screenWidth / 4;
  const threeCirclePositions = {
    'Corporate': { x: spacing * 1, y: centerY },
    'Institutional': { x: spacing * 2, y: centerY },
    'Benefactor': { x: spacing * 3, y: centerY }
  };

  const dotsBySystem = {
    'Corporate': dots.filter(d => d.system === 'Corporate'),
    'Institutional': dots.filter(d => d.system === 'Institutional'),
    'Benefactor': dots.filter(d => d.system === 'Benefactor')
  };

  ['Corporate', 'Institutional', 'Benefactor'].forEach(system => {
    const systemDots = dotsBySystem[system];
    const currentPos = threeCirclePositions[system];

    if (currentPos && systemDots) {
      systemDots.forEach((dot, index) => {
        // Current: small circle at system position
        const angle = (index / systemDots.length) * 360 + systemsRotationAngle;
        const angleRad = (angle * Math.PI) / 180;
        const currentX = currentPos.x + Math.cos(angleRad) * smallRadius;
        const currentY = currentPos.y + Math.sin(angleRad) * smallRadius;

        // Target: large circle around center
        const targetAngleRad = ((dot.baseAngle + systemsRotationAngle) * Math.PI) / 180;
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
 * Initialize systems animation (COPIED from initIntroAnimation)
 */
export function initSystemsAnimation() {
  console.log('🎬 Initializing systems animation (with rotating dots)');

  // Generate dots
  const dotData = generateSystemsDots();
  systemsDots = createSystemsDotElements(dotData);

  if (systemsDots.length === 0) {
    console.error('❌ No systems dots created!');
    return;
  }

  // Initial positioning
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.42;

  positionDotsInCircle(systemsDots, centerX, centerY, radius);

  // Start ticker for continuous rotation
  systemsTickerId = gsap.ticker.add(() => {
    // Update rotation angle continuously
    systemsRotationAngle += 0.15;

    // Update random offsets for organic movement
    systemsDots.forEach(dot => {
      dot.randomOffsetX += (dot.randomTargetX - dot.randomOffsetX) * 0.02;
      dot.randomOffsetY += (dot.randomTargetY - dot.randomOffsetY) * 0.02;

      if (Math.random() < 0.01) {
        dot.randomTargetX = (Math.random() - 0.5) * 20;
        dot.randomTargetY = (Math.random() - 0.5) * 20;
      }
    });

    // Update positions based on current phase
    if (currentSystemsPhase === 1) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      updateDotPositionsSimple(systemsDots, cx, cy);
    } else if (currentSystemsPhase === 2) {
      // Phase 2: Three circles - stays in this phase through moments 3, 4, and 5
      updateThreeCirclesRotation(systemsDots);
    }
  });

  // Setup scroll triggers
  setupSystemsScrollTriggers();

  console.log('✅ Systems animation initialized with', systemsDots.length, 'rotating dots');
}

/**
 * Setup ScrollTrigger for systems moments (COPIED from intro setupScrollTriggers)
 */
function setupSystemsScrollTriggers() {
  const moment1 = document.querySelector('.systems-alone');
  const moment2 = document.querySelector('.systems-two-others');
  const moment3 = document.querySelector('.systems-three-circles');
  const moment4 = document.querySelector('.systems-configs-phase');
  const moment5 = document.querySelector('.systems-infra-phase');

  if (!moment1) return;

  // Moment 1: "Alone" - text fades in/out, dots fade in
  const content1 = moment1.querySelector('.moment-content');

  // Position text centered
  gsap.set(content1, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50,
    width: '90%',
    maxWidth: '1000px',
    textAlign: 'center',
    margin: 0,
    padding: 0
  });

  // Text fade in/out
  const text1Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: moment1,
      start: TRIGGER_POSITIONS.ENTER_LOW,
      end: TRIGGER_POSITIONS.EXIT_HIGH,
      scrub: SCRUB_SPEEDS.SMOOTH,
    }
  });

  text1Timeline
    .fromTo(content1,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
    .to(content1,
      { opacity: 1, duration: 2 }
    )
    .to(content1,
      { opacity: 0, duration: 1 }
    );

  // Fade in dots container first
  gsap.fromTo('#systems-dots-container',
    { opacity: 0 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: moment1,
        start: TRIGGER_POSITIONS.ENTER_LOW,
        end: TRIGGER_POSITIONS.CENTER,
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    }
  );

  // Progressively fade in individual dots with stagger (wave around circle)
  gsap.fromTo(systemsDots.map(d => d.element),
    { opacity: 0 },
    {
      opacity: 0.8,
      stagger: {
        each: 0.01,
        from: 'start'
      },
      scrollTrigger: {
        trigger: moment1,
        start: TRIGGER_POSITIONS.CENTER,
        end: TRIGGER_POSITIONS.EXIT_HIGH,
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    }
  );

  // Hide timeline during systems section
  const timeline = document.querySelector('.timeline-fixed');
  if (timeline) {
    gsap.to(timeline, {
      opacity: 0,
      scrollTrigger: {
        trigger: moment1,
        start: TRIGGER_POSITIONS.ENTER_LOW,
        end: TRIGGER_POSITIONS.CENTER,
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    });
  }

  // Moment 2: "Two Other Unique Systems"
  if (moment2) {
    const content2 = moment2.querySelector('.moment-content');

    gsap.set(content2, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      width: '90%',
      maxWidth: '1000px',
      textAlign: 'center',
      margin: 0,
      padding: 0
    });

    const text2Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: moment2,
        start: TRIGGER_POSITIONS.ENTER_LOW,
        end: TRIGGER_POSITIONS.EXIT_HIGH,
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    });

    text2Timeline
      .to(content2, { opacity: 0, duration: 3 })
      .fromTo(content2, { opacity: 0 }, { opacity: 1, duration: 1 })
      .to(content2, { opacity: 1, duration: 5 })
      .to(content2, { opacity: 0, duration: 1 });

    // Create three convergence dots in center (side by side)
    createThreeConvergenceDots(moment2, moment3, moment4);
  }

  // Moment 3: Three System Circles - MORPH TO THREE CIRCLES
  if (moment3) {
    const content3 = moment3.querySelector('.moment-content');
    const systemsVisual = moment3.querySelector('.three-systems-visual');
    const headerConfigs = moment3.querySelector('.systems-header-configs');
    const headerInfra = moment3.querySelector('.systems-header-infra');
    const configLabels = moment3.querySelectorAll('.system-config');
    const infraLabels = moment3.querySelectorAll('.system-infra');

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.42;

    // Set content3 to visible so labels inside can be seen (parent has opacity: 0 in CSS)
    gsap.set(content3, { opacity: 1 });

    // Morph to three circles (like intro morphs to five)
    ScrollTrigger.create({
      trigger: moment3,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
      onUpdate: (self) => {
        currentSystemsPhase = 1.5; // Morphing
        if (systemsDots && systemsDots.length > 0) {
          morphToThreeCircles(systemsDots, self.progress, centerX, centerY, radius);
        }
      },
      onEnter: () => {
        currentSystemsPhase = 1.5;
      },
      onLeaveBack: () => {
        currentSystemsPhase = 1; // Back to single circle
      }
    });

    // Switch to phase 2 when morph complete
    ScrollTrigger.create({
      trigger: moment3,
      start: 'top 20%',
      onEnter: () => {
        currentSystemsPhase = 2; // Three circles rotating
      },
      onLeaveBack: () => {
        currentSystemsPhase = 1.5;
      }
    });

    // Keep dots in three circles through moments 3, 4, and 5
    ScrollTrigger.create({
      trigger: moment3,
      start: 'top 20%',
      endTrigger: moment5,
      end: 'bottom top',
      onUpdate: () => {
        if (currentSystemsPhase === 2) {
          updateThreeCirclesRotation(systemsDots);
        }
      }
    });

    // Fade in system labels (name, subtext) as morph completes
    if (systemsVisual) {
      gsap.fromTo(systemsVisual,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: moment3,
            start: 'top 60%',
            end: 'top 20%',
            scrub: SCRUB_SPEEDS.SMOOTH,
          }
        }
      );
      // Labels stay visible - no fade out here anymore
    }

  }

  // Helper function to create three convergence dots that move during transitions
  function createThreeConvergenceDots(moment2, moment3, moment4) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2 + 80; // Below text
    const spacing = screenWidth / 4;

    // Create Institutional dot (blue - center, appears in moment 2)
    const institutionalDot = document.createElement('div');
    institutionalDot.className = 'system-convergence-dot institutional-dot';
    institutionalDot.style.position = 'fixed';
    institutionalDot.style.left = `${centerX}px`;
    institutionalDot.style.top = `${centerY}px`;
    institutionalDot.style.width = '16px';
    institutionalDot.style.height = '16px';
    institutionalDot.style.borderRadius = '50%';
    institutionalDot.style.backgroundColor = '#3b82f6'; // Blue
    institutionalDot.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.8)';
    institutionalDot.style.zIndex = '1500';
    institutionalDot.style.pointerEvents = 'none';
    document.body.appendChild(institutionalDot);

    // Fade in institutional dot in moment 2
    gsap.fromTo(institutionalDot,
      { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 },
      {
        opacity: 1,
        scale: 1.2,
        scrollTrigger: {
          trigger: moment2,
          start: TRIGGER_POSITIONS.CENTER,
          end: TRIGGER_POSITIONS.EXIT_MID,
          scrub: SCRUB_SPEEDS.SMOOTH,
        }
      }
    );

    // Create Corporate dot (red - starts at center, moves left)
    const corporateDot = document.createElement('div');
    corporateDot.className = 'system-convergence-dot corporate-dot';
    corporateDot.style.position = 'fixed';
    corporateDot.style.left = `${centerX - 30}px`; // Slightly left of center
    corporateDot.style.top = `${centerY}px`;
    corporateDot.style.width = '16px';
    corporateDot.style.height = '16px';
    corporateDot.style.borderRadius = '50%';
    corporateDot.style.backgroundColor = '#ef4444'; // Red
    corporateDot.style.boxShadow = '0 0 40px rgba(239, 68, 68, 0.8)';
    corporateDot.style.zIndex = '1500';
    corporateDot.style.pointerEvents = 'none';
    document.body.appendChild(corporateDot);

    // Fade in corporate dot in moment 2 (next to institutional)
    gsap.fromTo(corporateDot,
      { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 },
      {
        opacity: 1,
        scale: 1.2,
        scrollTrigger: {
          trigger: moment2,
          start: TRIGGER_POSITIONS.CENTER,
          end: TRIGGER_POSITIONS.EXIT_MID,
          scrub: SCRUB_SPEEDS.SMOOTH,
        }
      }
    );

    // Create Benefactor dot (green - starts at center, moves right)
    const benefactorDot = document.createElement('div');
    benefactorDot.className = 'system-convergence-dot benefactor-dot';
    benefactorDot.style.position = 'fixed';
    benefactorDot.style.left = `${centerX + 30}px`; // Slightly right of center
    benefactorDot.style.top = `${centerY}px`;
    benefactorDot.style.width = '16px';
    benefactorDot.style.height = '16px';
    benefactorDot.style.borderRadius = '50%';
    benefactorDot.style.backgroundColor = '#10b981'; // Green
    benefactorDot.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.8)';
    benefactorDot.style.zIndex = '1500';
    benefactorDot.style.pointerEvents = 'none';
    document.body.appendChild(benefactorDot);

    // Fade in benefactor dot in moment 2 (next to institutional)
    gsap.fromTo(benefactorDot,
      { opacity: 0, scale: 0.5, xPercent: -50, yPercent: -50 },
      {
        opacity: 1,
        scale: 1.2,
        scrollTrigger: {
          trigger: moment2,
          start: TRIGGER_POSITIONS.CENTER,
          end: TRIGGER_POSITIONS.EXIT_MID,
          scrub: SCRUB_SPEEDS.SMOOTH,
        }
      }
    );

    // Animate Corporate dot movement - move to position and stay
    gsap.to(corporateDot, {
      left: spacing * 1,
      scrollTrigger: {
        trigger: moment3,
        start: 'top 80%',
        end: 'top 20%',
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    });

    // Animate Institutional dot movement - move to position and stay
    gsap.to(institutionalDot, {
      left: spacing * 2,
      scrollTrigger: {
        trigger: moment3,
        start: 'top 80%',
        end: 'top 20%',
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    });

    // Animate Benefactor dot movement - move to position and stay
    gsap.to(benefactorDot, {
      left: spacing * 3,
      scrollTrigger: {
        trigger: moment3,
        start: 'top 80%',
        end: 'top 20%',
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    });

    // Convergence dots stay visible at their three positions
    // scene-alternative.js will animate them down to the alt timeline
  }

  // Moment 4: Configurations Phase - Show configs header and config labels
  if (moment4 && moment3) {
    const headerConfigs = moment3.querySelector('.systems-header-configs');
    const configLabels = moment3.querySelectorAll('.system-config');

    // Fade in configs header
    if (headerConfigs) {
      gsap.fromTo(headerConfigs,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: moment4,
            start: 'top 80%',
            end: 'top 40%',
            scrub: SCRUB_SPEEDS.SMOOTH,
          }
        }
      );
    }

    // Fade in config labels with stagger
    if (configLabels.length > 0) {
      gsap.fromTo(configLabels,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: moment4,
            start: 'top 60%',
            end: 'top 20%',
            scrub: SCRUB_SPEEDS.SMOOTH,
          }
        }
      );
    }
  }

  // Moment 5: Infrastructure Phase - Transition from configs to infra
  if (moment5 && moment3) {
    const headerConfigs = moment3.querySelector('.systems-header-configs');
    const headerInfra = moment3.querySelector('.systems-header-infra');
    const configLabels = moment3.querySelectorAll('.system-config');
    const infraLabels = moment3.querySelectorAll('.system-infra');
    const systemsVisual = moment3.querySelector('.three-systems-visual');

    // Fade out configs header, fade in infra header
    if (headerConfigs && headerInfra) {
      gsap.to(headerConfigs, {
        opacity: 0,
        scrollTrigger: {
          trigger: moment5,
          start: 'top 80%',
          end: 'top 50%',
          scrub: SCRUB_SPEEDS.SMOOTH,
        }
      });

      gsap.fromTo(headerInfra,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: moment5,
            start: 'top 60%',
            end: 'top 30%',
            scrub: SCRUB_SPEEDS.SMOOTH,
          }
        }
      );
    }

    // Fade out config labels
    if (configLabels.length > 0) {
      gsap.to(configLabels, {
        opacity: 0,
        scrollTrigger: {
          trigger: moment5,
          start: 'top 80%',
          end: 'top 50%',
          scrub: SCRUB_SPEEDS.SMOOTH,
        }
      });
    }

    // Fade in infra labels with stagger
    if (infraLabels.length > 0) {
      gsap.fromTo(infraLabels,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: moment5,
            start: 'top 50%',
            end: 'top 10%',
            scrub: SCRUB_SPEEDS.SMOOTH,
          }
        }
      );
    }

    // Fade out everything at end of moment 5
    gsap.to([headerInfra, systemsVisual], {
      opacity: 0,
      scrollTrigger: {
        trigger: moment5,
        start: 'bottom 80%',
        end: 'bottom 40%',
        scrub: SCRUB_SPEEDS.SMOOTH,
      }
    });

    // Fade out dots at end of moment 5
    gsap.to('#systems-dots-container', {
      opacity: 0,
      scrollTrigger: {
        trigger: moment5,
        start: 'bottom 80%',
        end: 'bottom 40%',
        scrub: SCRUB_SPEEDS.SMOOTH,
        onLeave: () => {
          // Stop ticker
          if (systemsTickerId) {
            gsap.ticker.remove(systemsTickerId);
            systemsTickerId = null;
          }
        }
      }
    });
  }
}
