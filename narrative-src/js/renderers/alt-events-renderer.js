/**
 * Alternative Events Renderer
 * Generates alternative timeline events with CONSISTENT naming (alt- prefix)
 * REFACTORED to match main timeline quality and eliminate duplication
 */

import { PROTOCOL_COLORS } from '../config/constants.js';
import { alternativeEventsData } from '../data/alternative-events.js';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Inject closing narrative scenes AFTER the alternative timeline wrapper
 * These are standalone scenes, NOT part of the alt-events-container
 *
 * Full closing narrative structure:
 * Scene 15: "The Future is a System of Systems" - vision statement
 * Scene 16: "There Are Already Three" - current state
 * Scene 17: "We need thousands" - call to action
 * Scene 18: "Each with their own configuration" - structural diversity
 * Scene 19: "Their own strengths" - functional diversity
 * Scene 20: "Their own values" - contextual diversity
 * Scene 21: "All connected via a shared technical substrate" - connection
 * Scene 22: Digitalization Era Card
 * Scene 23: The Institute (FINAL SCENE)
 */
function injectClosingScenesAfterAltTimeline() {
  // Find the scene-alternative-wrapper (parent of alt-events-container)
  const altWrapper = document.querySelector('.scene-alternative-wrapper');
  if (!altWrapper) {
    console.error('❌ scene-alternative-wrapper not found - cannot inject closing scenes');
    return;
  }

  // Scene 15: The Future is a System of Systems
  const scene15 = document.createElement('section');
  scene15.className = 'narrative-moment scene-moment scene-future';
  scene15.dataset.moment = 'scene-15';
  scene15.innerHTML = `
    <div class="moment-content">
      <h1>The Future is a<br>System of Systems</h1>
    </div>
  `;
  altWrapper.insertAdjacentElement('afterend', scene15);

  // Scene 16: There Are Already Three
  const scene16 = document.createElement('section');
  scene16.className = 'narrative-moment scene-moment scene-three-systems';
  scene16.dataset.moment = 'scene-16';
  scene16.innerHTML = `
    <div class="moment-content">
      <h1>There Are Already Three</h1>
    </div>
  `;
  scene15.insertAdjacentElement('afterend', scene16);

  // Scene 17: We need thousands
  const scene17 = document.createElement('section');
  scene17.className = 'narrative-moment scene-moment scene-thousands';
  scene17.dataset.moment = 'scene-17';
  scene17.innerHTML = `
    <div class="moment-content">
      <h1>We need thousands</h1>
    </div>
    <div id="thousands-dots-container"></div>
  `;
  scene16.insertAdjacentElement('afterend', scene17);

  // Scene 18: Each with their own configuration
  const scene18 = document.createElement('section');
  scene18.className = 'narrative-moment scene-moment scene-configuration';
  scene18.dataset.moment = 'scene-18';
  scene18.innerHTML = `
    <div class="moment-content">
      <h1>Each with their own<br>configuration</h1>
    </div>
  `;
  scene17.insertAdjacentElement('afterend', scene18);

  // Scene 19: Their own strengths
  const scene19 = document.createElement('section');
  scene19.className = 'narrative-moment scene-moment scene-strengths';
  scene19.dataset.moment = 'scene-19';
  scene19.innerHTML = `
    <div class="moment-content">
      <h1>Their own strengths</h1>
    </div>
  `;
  scene18.insertAdjacentElement('afterend', scene19);

  // Scene 20: Their own values
  const scene20 = document.createElement('section');
  scene20.className = 'narrative-moment scene-moment scene-values';
  scene20.dataset.moment = 'scene-20';
  scene20.innerHTML = `
    <div class="moment-content">
      <h1>Their own values</h1>
    </div>
  `;
  scene19.insertAdjacentElement('afterend', scene20);

  // Scene 21: All connected via a shared technical substrate
  const scene21 = document.createElement('section');
  scene21.className = 'narrative-moment scene-moment scene-substrate';
  scene21.dataset.moment = 'scene-21';
  scene21.innerHTML = `
    <div class="moment-content">
      <h1>All connected via a<br>shared technical substrate</h1>
    </div>
  `;
  scene20.insertAdjacentElement('afterend', scene21);

  // Scene 22: Digitalization Era Card
  const scene22 = document.createElement('section');
  scene22.className = 'narrative-moment scene-moment scene-digitalization-era';
  scene22.dataset.moment = 'scene-22';
  scene22.innerHTML = `
    <div class="moment-content">
      <!-- Digitalization Era card will be injected here -->
    </div>
  `;
  scene21.insertAdjacentElement('afterend', scene22);

  // Scene 23: The Institute (FINAL SCENE)
  const scene23 = document.createElement('section');
  scene23.className = 'narrative-moment scene-moment scene-institute';
  scene23.dataset.moment = 'scene-23';
  scene23.innerHTML = `
    <div class="moment-content">
      <h1>The Institute of Open Science Practices</h1>
      <p class="final-scene-subtitle">Part II coming with your help</p>
      <a href="https://github.com/jring-o/iospwebsite" target="_blank" rel="noopener noreferrer" class="final-scene-cta">
        Contribute to the story →
      </a>
    </div>
  `;
  scene22.insertAdjacentElement('afterend', scene23);

  console.log('✅ Closing scenes (15-23) injected AFTER scene-alternative-wrapper');

  // Initialize animations for these scenes after DOM is ready
  setTimeout(() => {
    initClosingNarrativeAnimations();
    initScene16DotRecentering();
    initScene17ThousandsDots();
    initScene22DigitalizationCard();
    initScene23Animation();
    fadeOutConvergenceDotsForDigitalization();
  }, 100);
}

/**
 * Initialize fade in/out animations for all closing narrative scenes
 * Scenes 15-21: future → three → thousands → configuration → strengths → values → substrate
 */
function initClosingNarrativeAnimations() {
  // Define all narrative scenes with their selectors
  const narrativeScenes = [
    { selector: '.scene-future', name: 'future' },
    { selector: '.scene-three-systems', name: 'three-systems' },
    { selector: '.scene-thousands', name: 'thousands' },
    { selector: '.scene-configuration', name: 'configuration' },
    { selector: '.scene-strengths', name: 'strengths' },
    { selector: '.scene-values', name: 'values' },
    { selector: '.scene-substrate', name: 'substrate' }
  ];

  narrativeScenes.forEach(({ selector, name }, index) => {
    const scene = document.querySelector(selector);
    if (!scene) {
      console.warn(`⚠️ Scene ${name} (${selector}) not found`);
      return;
    }

    const content = scene.querySelector('.moment-content');
    if (!content) return;

    gsap.set(content, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      width: '90%',
      maxWidth: '1000px',
      textAlign: 'center',
      opacity: 0
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 0.5,
      }
    });

    // First scene fades in directly, others have a gap at the start
    if (index === 0) {
      timeline
        .to(content, { opacity: 1, duration: 1 })
        .to(content, { opacity: 1, duration: 6 })
        .to(content, { opacity: 0, duration: 1 });
    } else {
      timeline
        .to(content, { opacity: 0, duration: 2 })
        .to(content, { opacity: 1, duration: 1 })
        .to(content, { opacity: 1, duration: 5 })
        .to(content, { opacity: 0, duration: 1 });
    }
  });

  console.log('✅ Closing narrative animations initialized (scenes 15-21)');
}

/**
 * Initialize dot recentering animation for Scene 16 (There Are Already Three)
 * Moves the three convergence dots to center and fades out alt timeline
 */
function initScene16DotRecentering() {
  const scene = document.querySelector('.scene-three-systems');
  if (!scene) {
    console.warn('⚠️ Scene 16 (.scene-three-systems) not found');
    return;
  }

  const institutionalDot = document.querySelector('.institutional-dot');
  const corporateDot = document.querySelector('.corporate-dot');
  const benefactorDot = document.querySelector('.benefactor-dot');

  if (!institutionalDot || !corporateDot || !benefactorDot) {
    console.warn('⚠️ System dots not found for recenter animation');
    return;
  }

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2 + 80; // Below the text

  // Store starting positions on first update
  let startPositions = null;

  ScrollTrigger.create({
    trigger: scene,
    start: 'top 80%',
    end: 'center center',
    scrub: 0.15,
    onUpdate: (self) => {
      // Capture starting positions on first update
      if (!startPositions) {
        startPositions = {
          instX: parseFloat(institutionalDot.style.left),
          instY: parseFloat(institutionalDot.style.top),
          corpX: parseFloat(corporateDot.style.left),
          corpY: parseFloat(corporateDot.style.top),
          benefX: parseFloat(benefactorDot.style.left),
          benefY: parseFloat(benefactorDot.style.top),
        };
      }

      const progress = self.progress;

      // Interpolate positions to center
      institutionalDot.style.left = `${startPositions.instX + (centerX - startPositions.instX) * progress}px`;
      institutionalDot.style.top = `${startPositions.instY + (centerY - startPositions.instY) * progress}px`;

      corporateDot.style.left = `${startPositions.corpX + ((centerX - 30) - startPositions.corpX) * progress}px`;
      corporateDot.style.top = `${startPositions.corpY + (centerY - startPositions.corpY) * progress}px`;

      benefactorDot.style.left = `${startPositions.benefX + ((centerX + 30) - startPositions.benefX) * progress}px`;
      benefactorDot.style.top = `${startPositions.benefY + (centerY - startPositions.benefY) * progress}px`;
    },
    onLeaveBack: () => {
      startPositions = null;
    }
  });

  // Fade out alternative timeline
  const altTimeline = document.getElementById('alt-timeline-fixed');
  if (altTimeline) {
    gsap.to(altTimeline, {
      opacity: 0,
      scrollTrigger: {
        trigger: scene,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 0.15,
      }
    });
  }

  console.log('✅ Scene 16 dot recentering animation initialized');
}


/**
 * Populate Scene 22 with Digitalization Era card
 */
function initScene22DigitalizationCard() {
  const scene22 = document.querySelector('[data-moment="scene-22"]');
  if (!scene22) {
    console.warn('⚠️ Scene 22 not found');
    return;
  }

  // Find Digitalization Decade data from alternative events
  const digitalizationEraData = alternativeEventsData.find(
    event => event.startsEra && (event.startsEra.name === 'The Decade of Digitalization' || event.startsEra.name === 'The Digitalization Era')
  );

  if (!digitalizationEraData) {
    console.warn('⚠️ Digitalization Decade/Era data not found');
    return;
  }

  // Generate and inject the era card
  const content = scene22.querySelector('.moment-content');
  if (content) {
    content.innerHTML = generateAltEraCardHTML(digitalizationEraData.startsEra, digitalizationEraData.startsEra.name);
    console.log('✅ Digitalization Decade card injected into Scene 22');
  }

  // Set up fade animation for the card
  gsap.set(content, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50,
    width: '90%',
    maxWidth: '1000px',
    opacity: 0
  });

  const timeline22 = gsap.timeline({
    scrollTrigger: {
      trigger: scene22,
      start: 'top 80%',
      end: 'bottom 60%',
      scrub: 0.5,
    }
  });

  timeline22
    .to(content, { opacity: 1, duration: 1 })
    .to(content, { opacity: 1, duration: 5 })
    .to(content, { opacity: 0, duration: 1 });

  console.log('✅ Scene 22 (Digitalization Era card) animation initialized');
}

/**
 * Fade out the three convergence dots when Scene 22 (Digitalization) appears
 */
function fadeOutConvergenceDotsForDigitalization() {
  const scene22 = document.querySelector('[data-moment="scene-22"]');
  if (!scene22) {
    console.warn('⚠️ Scene 22 not found for convergence dots fade out');
    return;
  }

  const institutionalDot = document.querySelector('.institutional-dot');
  const corporateDot = document.querySelector('.corporate-dot');
  const benefactorDot = document.querySelector('.benefactor-dot');

  if (!institutionalDot || !corporateDot || !benefactorDot) {
    console.warn('⚠️ Convergence dots not found for fade out');
    return;
  }

  // Fade out all three dots as Scene 22 fades in
  [institutionalDot, corporateDot, benefactorDot].forEach(dot => {
    gsap.to(dot, {
      opacity: 0,
      scale: 0,
      scrollTrigger: {
        trigger: scene22,
        start: 'top 80%',
        end: 'center center',
        scrub: 0.5,
      }
    });
  });

  console.log('✅ Convergence dots fade out animation set up for Scene 22');
}

/**
 * Initialize fade in/out animation for Scene 23 (Institute)
 */
function initScene23Animation() {
  const scene23 = document.querySelector('.scene-institute');
  if (!scene23) {
    console.warn('⚠️ Scene 23 (Institute) not found for animation');
    return;
  }

  const content23 = scene23.querySelector('.moment-content');

  gsap.set(content23, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50,
    width: '90%',
    maxWidth: '1000px',
    textAlign: 'center',
    opacity: 0
  });

  const timeline23 = gsap.timeline({
    scrollTrigger: {
      trigger: scene23,
      start: 'top 80%',
      end: 'bottom 60%',
      scrub: 0.5,
    }
  });

  timeline23
    .to(content23, { opacity: 0, duration: 2 })
    .to(content23, { opacity: 1, duration: 1 })
    .to(content23, { opacity: 1, duration: 5 })
    .to(content23, { opacity: 0, duration: 1 });

  console.log('✅ Fade animation initialized for Scene 23 (Institute)');
}

/**
 * Scene 17: Organic breathing network mesh
 * - Nodes drift slowly and breathe while visible
 * - Varied easing personalities per node
 * - Flowing animated edges
 * - Activity zones that drift across the field
 */
function initScene17ThousandsDots() {
  const scene = document.querySelector('.scene-thousands');
  const container = document.getElementById('thousands-dots-container');

  if (!scene || !container) {
    console.warn('⚠️ Scene 17 not found');
    return;
  }

  // SVG for edges
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
  container.appendChild(svg);

  // Configuration
  const NUM_NODES = 70;
  const EDGE_DISTANCE = 22;
  const MAX_VISIBLE_FRACTION = 0.35;

  // Wider timing ranges (ms)
  const FADE_IN_MIN = 1200, FADE_IN_MAX = 4500;
  const FADE_OUT_MIN = 1500, FADE_OUT_MAX = 5000;
  const VISIBLE_MIN = 2000, VISIBLE_MAX = 18000;
  const HIDDEN_MIN = 800, HIDDEN_MAX = 10000;

  // States
  const HIDDEN = 0, FADING_IN = 1, VISIBLE = 2, FADING_OUT = 3;

  // Color families with HSL for subtle variation
  const colorFamilies = [
    { h: 210, s: 70, l: 58 },  // Blue
    { h: 145, s: 55, l: 52 },  // Green
    { h: 270, s: 50, l: 60 },  // Purple
    { h: 25, s: 75, l: 55 },   // Orange
    { h: 195, s: 65, l: 55 },  // Cyan
    { h: 165, s: 50, l: 48 },  // Teal
  ];

  // Easing personalities - different nodes have different "characters"
  const easings = {
    shy: {      // Slow in, quick out
      in: t => t * t * t,
      out: t => 1 - Math.pow(1 - t, 1.5)
    },
    bold: {     // Quick in, slow out
      in: t => 1 - Math.pow(1 - t, 3),
      out: t => t * t
    },
    gentle: {   // Smooth both ways
      in: t => t * t * (3 - 2 * t),
      out: t => t * t * (3 - 2 * t)
    },
    dramatic: { // Very slow start, accelerates
      in: t => t * t * t * t,
      out: t => 1 - Math.pow(1 - t, 4)
    }
  };
  const easingTypes = ['shy', 'bold', 'gentle', 'gentle', 'gentle', 'dramatic'];

  const rand = (min, max) => min + Math.random() * (max - min);
  const randomPick = arr => arr[Math.floor(Math.random() * arr.length)];

  // Generate color with variation within family
  function generateColor() {
    const family = randomPick(colorFamilies);
    const h = family.h + (Math.random() - 0.5) * 25;
    const s = family.s + (Math.random() - 0.5) * 15;
    const l = family.l + (Math.random() - 0.5) * 12;
    return {
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      glow: `hsla(${h}, ${s}%, ${l}%, 0.8)`
    };
  }

  // Create nodes with organic properties
  const nodes = [];
  for (let i = 0; i < NUM_NODES; i++) {
    const x = 5 + Math.random() * 90;
    const y = 5 + Math.random() * 90;
    const color = generateColor();
    const size = 4 + Math.random() * 8;

    // Drift velocity (slow wandering)
    const driftSpeed = 0.001 + Math.random() * 0.003;
    const driftAngle = Math.random() * Math.PI * 2;
    const vx = Math.cos(driftAngle) * driftSpeed;
    const vy = Math.sin(driftAngle) * driftSpeed;

    const node = document.createElement('div');
    node.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color.hsl};
      box-shadow: 0 0 10px ${color.glow};
      opacity: 0;
      pointer-events: none;
      will-change: transform, opacity, box-shadow;
    `;
    container.appendChild(node);

    const easingType = randomPick(easingTypes);
    const isLingerer = Math.random() < 0.08; // 8% chance to linger much longer

    nodes.push({
      element: node,
      x, y, vx, vy,
      color: color.hsl,
      glowColor: color.glow,
      size,
      easingType,
      isLingerer,
      // Breathing parameters (varied per node)
      breathSpeed: 0.8 + Math.random() * 0.8,
      breathOffset: Math.random() * Math.PI * 2,
      glowBreathSpeed: 0.5 + Math.random() * 0.6,
      scaleBreathSpeed: 0.6 + Math.random() * 0.5,
      // State
      state: HIDDEN,
      opacity: 0,
      stateElapsed: 0,
      stateDuration: rand(0, HIDDEN_MAX),
      edges: [],
      edgesCreated: false,
    });
  }

  // Dynamic edges
  const edges = [];

  function getDistance(i, j) {
    const dx = nodes[i].x - nodes[j].x;
    const dy = nodes[i].y - nodes[j].y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function createEdge(i, j) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${nodes[i].x}%`);
    line.setAttribute('y1', `${nodes[i].y}%`);
    line.setAttribute('x2', `${nodes[j].x}%`);
    line.setAttribute('y2', `${nodes[j].y}%`);
    line.setAttribute('stroke', '#667');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-dasharray', '6 6');
    line.setAttribute('opacity', '0');
    svg.appendChild(line);
    return {
      element: line,
      nodeA: i,
      nodeB: j,
      phase: Math.random() * Math.PI * 2
    };
  }

  function removeEdge(edge) {
    edge.element.remove();
    const idx = edges.indexOf(edge);
    if (idx !== -1) edges.splice(idx, 1);
  }

  function updateEdgePositions() {
    edges.forEach(edge => {
      edge.element.setAttribute('x1', `${nodes[edge.nodeA].x}%`);
      edge.element.setAttribute('y1', `${nodes[edge.nodeA].y}%`);
      edge.element.setAttribute('x2', `${nodes[edge.nodeB].x}%`);
      edge.element.setAttribute('y2', `${nodes[edge.nodeB].y}%`);
    });
  }

  function getVisibleNodes() {
    return nodes
      .map((n, i) => ({ node: n, index: i }))
      .filter(x => x.node.opacity > 0.5)
      .map(x => x.index);
  }

  function onNodeBecameVisible(nodeIndex) {
    const visibleNodes = getVisibleNodes().filter(i => i !== nodeIndex);
    if (visibleNodes.length === 0) return;

    // Connect to nearest visible node
    let nearestIdx = -1;
    let nearestDist = Infinity;
    for (const vi of visibleNodes) {
      const dist = getDistance(nodeIndex, vi);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIdx = vi;
      }
    }
    if (nearestIdx !== -1) {
      const edge = createEdge(nodeIndex, nearestIdx);
      edges.push(edge);
      nodes[nodeIndex].edges.push(edge);
    }

    // Connect to nearby visible nodes
    for (const vi of visibleNodes) {
      if (vi === nearestIdx) continue;
      if (getDistance(nodeIndex, vi) < EDGE_DISTANCE) {
        const edge = createEdge(nodeIndex, vi);
        edges.push(edge);
        nodes[nodeIndex].edges.push(edge);
      }
    }
  }

  function onNodeBecameHidden(nodeIndex) {
    const nodeEdges = nodes[nodeIndex].edges.slice();
    for (const edge of nodeEdges) {
      removeEdge(edge);
    }
    nodes[nodeIndex].edges = [];
  }

  // Animation state
  let animationId = null;
  let lastTime = null;
  let isAnimating = false;
  let startTimestamp = 0;

  // Activity zone (slowly drifting spotlight of activity)
  let activityX = 50;
  let activityY = 50;

  const countActive = () => nodes.filter(n => n.state === VISIBLE || n.state === FADING_IN).length;

  function animate(timestamp) {
    if (!isAnimating) return;

    if (lastTime === null) {
      lastTime = timestamp;
      startTimestamp = timestamp;
    }
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    // Update activity zone (slow drift across the field)
    const elapsed = timestamp - startTimestamp;
    activityX = 50 + 25 * Math.sin(elapsed * 0.00008);
    activityY = 50 + 25 * Math.cos(elapsed * 0.00011);

    const maxVisible = Math.floor(nodes.length * MAX_VISIBLE_FRACTION);

    // Update nodes
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
      const node = nodes[nodeIndex];
      const easing = easings[node.easingType];

      // Drift (always, creates organic feel even when hidden)
      node.x += node.vx * dt;
      node.y += node.vy * dt;

      // Soft boundary bounce
      if (node.x < 3 || node.x > 97) node.vx *= -1;
      if (node.y < 3 || node.y > 97) node.vy *= -1;
      node.x = Math.max(2, Math.min(98, node.x));
      node.y = Math.max(2, Math.min(98, node.y));

      node.element.style.left = `${node.x}%`;
      node.element.style.top = `${node.y}%`;

      node.stateElapsed += dt;
      const progress = Math.min(node.stateElapsed / node.stateDuration, 1);

      switch (node.state) {
        case HIDDEN:
          if (progress >= 1 && countActive() < maxVisible) {
            // Activity zone influence
            const distToActivity = Math.hypot(node.x - activityX, node.y - activityY);
            const activityBonus = Math.max(0, 1 - distToActivity / 45);

            if (Math.random() < 0.3 + activityBonus * 0.5) {
              node.state = FADING_IN;
              node.stateElapsed = 0;
              node.stateDuration = rand(FADE_IN_MIN, FADE_IN_MAX);
            } else {
              node.stateElapsed = 0;
              node.stateDuration = rand(300, 1500);
            }
          }
          break;

        case FADING_IN:
          node.opacity = easing.in(progress);
          node.element.style.opacity = node.opacity;

          // Scale grows in
          const scaleIn = 0.5 + 0.5 * easing.in(progress);
          node.element.style.transform = `scale(${scaleIn})`;

          if (progress >= 0.5 && !node.edgesCreated) {
            node.edgesCreated = true;
            onNodeBecameVisible(nodeIndex);
          }
          if (progress >= 1) {
            node.state = VISIBLE;
            node.opacity = 1;
            node.stateElapsed = 0;
            let visibleDuration = rand(VISIBLE_MIN, VISIBLE_MAX);
            if (node.isLingerer) visibleDuration *= 2.5;
            node.stateDuration = visibleDuration;
          }
          break;

        case VISIBLE:
          // Breathing: gentle oscillation of opacity, scale, and glow
          const breathPhase = timestamp * 0.001 * node.breathSpeed + node.breathOffset;
          const breathOpacity = 0.82 + 0.18 * Math.sin(breathPhase);
          const breathScale = 1 + 0.1 * Math.sin(breathPhase * node.scaleBreathSpeed);
          const breathGlow = 8 + 5 * Math.sin(breathPhase * node.glowBreathSpeed);

          node.opacity = breathOpacity;
          node.element.style.opacity = breathOpacity;
          node.element.style.transform = `scale(${breathScale})`;
          node.element.style.boxShadow = `0 0 ${breathGlow}px ${node.glowColor}`;

          if (progress >= 1) {
            node.state = FADING_OUT;
            node.stateElapsed = 0;
            node.stateDuration = rand(FADE_OUT_MIN, FADE_OUT_MAX);
          }
          break;

        case FADING_OUT:
          node.opacity = 1 - easing.out(progress);
          node.element.style.opacity = node.opacity;

          // Scale shrinks out
          const scaleOut = 0.5 + 0.5 * (1 - easing.out(progress));
          node.element.style.transform = `scale(${scaleOut})`;

          if (progress >= 0.7 && node.edgesCreated) {
            node.edgesCreated = false;
            onNodeBecameHidden(nodeIndex);
          }
          if (progress >= 1) {
            node.state = HIDDEN;
            node.opacity = 0;
            node.element.style.opacity = 0;
            node.element.style.transform = 'scale(0.5)';
            node.stateElapsed = 0;
            node.stateDuration = rand(HIDDEN_MIN, HIDDEN_MAX);
          }
          break;
      }
    }

    // Update edge positions (nodes drift)
    updateEdgePositions();

    // Update edges - opacity, pulse, and flow animation
    edges.forEach(edge => {
      const opA = nodes[edge.nodeA].opacity;
      const opB = nodes[edge.nodeB].opacity;

      // Edge pulse (independent rhythm)
      const edgePulse = 0.6 + 0.25 * Math.sin(timestamp * 0.0015 + edge.phase);
      const edgeOpacity = Math.min(opA, opB) * edgePulse * 0.7;
      edge.element.setAttribute('opacity', edgeOpacity);

      // Flowing dash animation
      const flowOffset = (timestamp * 0.012 + edge.phase * 100) % 12;
      edge.element.setAttribute('stroke-dashoffset', flowOffset);
    });

    animationId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    lastTime = null;

    edges.forEach(edge => edge.element.remove());
    edges.length = 0;

    // Stagger initial delays organically
    const staggerPeriod = 12000;
    nodes.forEach((node, i) => {
      node.state = HIDDEN;
      node.opacity = 0;
      node.element.style.opacity = 0;
      node.element.style.transform = 'scale(0.5)';
      node.stateElapsed = 0;
      const baseDelay = (i / nodes.length) * staggerPeriod;
      const jitter = rand(-1000, 1000);
      node.stateDuration = Math.max(100, baseDelay + jitter);
      node.edgesCreated = false;
      node.edges = [];
    });

    animationId = requestAnimationFrame(animate);
  }

  function stopAnimation() {
    isAnimating = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    edges.forEach(edge => edge.element.remove());
    edges.length = 0;

    nodes.forEach(node => {
      node.element.style.opacity = '0';
      node.element.style.transform = 'scale(0.5)';
      node.opacity = 0;
      node.state = HIDDEN;
      node.edgesCreated = false;
      node.edges = [];
    });
  }

  const finalScene = document.querySelector('.scene-institute');

  ScrollTrigger.create({
    trigger: scene,
    start: 'top 80%',
    endTrigger: finalScene || scene,
    end: 'bottom 20%',
    onEnter: startAnimation,
    onLeave: stopAnimation,
    onEnterBack: startAnimation,
    onLeaveBack: stopAnimation
  });

  console.log(`✅ Organic breathing mesh: ${nodes.length} nodes`);
}

/**
 * Generate system card HTML
 */
function generateSystemCardHTML(systemData) {
  const configHTML = systemData.configuration ? `
    <div class="system-configuration">
      <h4 class="system-section-subtitle">Configuration:</h4>
      <div class="config-grid">
        <div class="config-item"><strong>Dominant Protocols:</strong> ${systemData.configuration.dominant}</div>
        <div class="config-item"><strong>Values:</strong> ${systemData.configuration.values}</div>
        <div class="config-item"><strong>Timeline:</strong> ${systemData.configuration.timeline}</div>
        <div class="config-item"><strong>Access:</strong> ${systemData.configuration.access}</div>
        <div class="config-item"><strong>Metrics:</strong> ${systemData.configuration.metrics}</div>
      </div>
    </div>
  ` : '';

  const techInfraHTML = systemData.technicalSubstrate ? `
    <div class="era-substrate-section">
      <div class="era-substrate-label">
        <span class="substrate-icon">⚙</span>
        <strong>Technical Substrate</strong>
      </div>
      <p class="era-substrate-text">${systemData.technicalSubstrate}</p>
    </div>
  ` : '';

  const problemHTML = systemData.problem ? `
    <p class="system-problem"><strong>Problem:</strong> ${systemData.problem}</p>
  ` : '';

  const differenceHTML = systemData.difference ? `
    <p class="system-difference"><strong>Key Difference:</strong> ${systemData.difference}</p>
  ` : '';

  const policiesHTML = systemData.policies ? `
    <div class="system-policies">
      <h4 class="system-section-subtitle">Policies:</h4>
      <ul class="policy-list">
        ${Object.entries(systemData.policies).map(([org, policy]) =>
          `<li><strong>${org.charAt(0).toUpperCase() + org.slice(1)}:</strong> "${policy}"</li>`
        ).join('')}
      </ul>
    </div>
  ` : '';

  const rebellionHTML = systemData.rebellion ? `
    <p class="system-rebellion"><strong>Rebellion:</strong> ${systemData.rebellion}</p>
  ` : '';

  return `
    <div class="alt-era-card alt-system-card">
      <div class="era-header-section">
        <h2 class="event-title">${systemData.name}</h2>
        ${systemData.tagline ? `<div class="system-tagline">${systemData.tagline}</div>` : ''}
      </div>
      ${systemData.overview ? `<p class="era-overview">${systemData.overview}</p>` : ''}
      ${configHTML}
      ${techInfraHTML}
      ${problemHTML}
      ${differenceHTML}
      ${policiesHTML}
      ${rebellionHTML}
    </div>
  `;
}

/**
 * Generate era card HTML for alternative timeline
 */
function generateAltEraCardHTML(eraData, eraName) {
  const yearsHTML = eraData.years ? `<div class="era-years">${eraData.years}</div>` : '';
  const taglineHTML = eraData.tagline ? `<div class="era-tagline">${eraData.tagline}</div>` : '';

  // Don't show substrate for Substrate Technologies card (it doesn't exist yet in timeline)
  const showSubstrate = eraName !== 'Pluralist Substrate Technologies';
  // Enhanced substrate display matching main timeline
  const substrateHTML = showSubstrate && eraData.substrate ? `
    <div class="era-substrate-section">
      <div class="era-substrate-label">
        <span class="substrate-icon">⚙</span>
        <strong>Technical Substrate</strong>
      </div>
      <p class="era-substrate-text">${eraData.substrate}</p>
    </div>
  ` : '';

  const emergenceHTML = eraData.emergence ? `<p class="era-emergence"><em>${eraData.emergence}</em></p>` : '';
  const antifragilityHTML = eraData.antifragility ? `<p class="era-antifragility"><strong>Antifragility:</strong> ${eraData.antifragility}</p>` : '';
  const emotionalToneHTML = eraData.emotionalTone ? `<p class="era-emotional-tone"><em>${eraData.emotionalTone}</em></p>` : '';
  const goalHTML = eraData.goal ? `<p class="era-goal"><strong>Goal:</strong> ${eraData.goal}</p>` : '';
  const meanwhileHTML = eraData.meanwhile ? `<p class="era-meanwhile"><strong>Meanwhile:</strong> ${eraData.meanwhile}</p>` : '';
  const keyDevHTML = eraData.keyDevelopment ? `<p class="era-key-dev"><strong>Key Development:</strong> ${eraData.keyDevelopment}</p>` : '';
  // Enhanced status display - more prominent for divergence warnings
  const statusHTML = eraData.status ? `
    <div class="era-status-section">
      <div class="era-status-label">
        <span class="status-icon">⚠</span>
        <strong>Status</strong>
      </div>
      <p class="era-status-text">${eraData.status}</p>
    </div>
  ` : '';
  const inflectionHTML = eraData.inflectionPoint ? `<p class="era-inflection"><strong>The Inflection Point:</strong> ${eraData.inflectionPoint}</p>` : '';

  // Crisis section - dynamically render only keys that exist
  const crisisHTML = eraData.crisisEmerges ? `
    <div class="era-crisis-section">
      <h4 class="era-section-subtitle">The Crisis Emerges (2020s):</h4>
      <ul class="era-crisis-list">
        ${Object.entries(eraData.crisisEmerges).map(([key, value]) =>
          `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`
        ).join('')}
      </ul>
    </div>
  ` : '';

  // Work ahead section (for Substrate card)
  const workAheadHTML = eraData.workAhead ? `
    <div class="era-work-ahead">
      <div class="work-ahead-grid">
        ${Object.entries(eraData.workAhead).map(([component, description]) =>
          `<div class="work-item"><span class="work-component">${component}:</span> ${description}</div>`
        ).join('')}
      </div>
    </div>
  ` : '';

  // Goal card special treatment
  const cardClass = eraData.isGoal ? 'alt-era-card goal-card' : 'alt-era-card';
  const goalLabelHTML = eraData.isGoal ? `<div class="goal-label-text">Our Goal</div>` : '';

  return `
    <div class="${cardClass}">
      <div class="era-header-section">
        ${goalLabelHTML}
        <h2 class="event-title">${eraData.name}</h2>
        ${yearsHTML}
        ${taglineHTML}
        ${substrateHTML}
      </div>
      ${eraData.overview ? `<p class="era-overview">${eraData.overview}</p>` : ''}
      ${statusHTML}
      ${crisisHTML}
      ${workAheadHTML}
      ${meanwhileHTML}
      ${keyDevHTML}
      ${inflectionHTML}
      ${emergenceHTML}
      ${antifragilityHTML}
      ${emotionalToneHTML}
      ${goalHTML}
    </div>
  `;
}

/**
 * Generate all alternative events
 * CONSISTENT NAMING: All classes use "alt-" prefix
 */
export function generateAltEvents() {
  const container = document.getElementById('alt-events-container');
  if (!container) {
    console.error('❌ alt-events-container not found');
    return;
  }

  console.log('🎬 generateAltEvents: Processing', alternativeEventsData.length, 'events');

  alternativeEventsData.forEach((event, index) => {
    // Skip pure era entries (type: 'era' with no title)
    if (event.type === 'era' && !event.title) {
      if (event.startsEra) {
        const eraSection = document.createElement('section');
        eraSection.className = 'alt-event-section era-section';
        eraSection.dataset.type = 'era';
        eraSection.dataset.eventIndex = index;
        eraSection.dataset.year = event.year;
        eraSection.dataset.eraName = event.startsEra.name;

        // Parse era start year from years string
        if (event.startsEra.years) {
          const eraYearMatch = event.startsEra.years.match(/\d{4}/);
          if (eraYearMatch) {
            eraSection.dataset.eraYear = eraYearMatch[0];
          }
        }

        // SPECIAL: Skip Digitalization Decade card entirely
        // (It will become Scene 18, injected after the alt timeline wrapper)
        if (event.startsEra.name === 'The Decade of Digitalization' || event.startsEra.name === 'The Digitalization Era') {
          return;
        }

        eraSection.innerHTML = generateAltEraCardHTML(event.startsEra, event.startsEra.name);
        container.appendChild(eraSection);
      }
      return;
    }

    // Render simple event
    if (event.title) {
      const eventSection = document.createElement('section');
      const isStressor = event.type === 'stressor';
      eventSection.className = isStressor ? 'alt-stressor-event' : 'alt-simple-event';
      eventSection.dataset.type = isStressor ? 'stressor' : 'simple';
      eventSection.dataset.eventIndex = index;
      eventSection.dataset.year = event.year;

      const protocolBadges = (event.affects || []).map(p =>
        `<span class="protocol-badge" style="background: ${PROTOCOL_COLORS[p]};">${p}</span>`
      ).join('');

      if (isStressor) {
        const referenceHTML = event.reference ?
          `<div class="stressor-reference"><a href="${event.reference}" target="_blank" rel="noopener noreferrer">Source</a></div>` : '';

        eventSection.innerHTML = `
          <div class="stressor-event-content">
            <div class="stressor-year">${event.year} ⚠</div>
            <div class="stressor-title">${event.title}</div>
            <div class="simple-protocols">${protocolBadges}</div>
            <div class="stressor-description">${event.description}</div>
            ${referenceHTML}
          </div>
        `;
      } else {
        const referenceHTML = event.reference ?
          `<div class="simple-reference"><a href="${event.reference}" target="_blank" rel="noopener noreferrer">Source</a></div>` : '';

        const protocolEffectsHTML = event.protocolEffects ?
          `<div class="protocol-effects">
            <div class="protocol-effects-title">Protocol Effects:</div>
            ${Object.entries(event.protocolEffects).map(([protocol, effect]) =>
              `<div class="protocol-effect">
                <span class="protocol-effect-name" style="color: ${PROTOCOL_COLORS[protocol]};">${protocol}:</span>
                <span class="protocol-effect-text">${effect}</span>
              </div>`
            ).join('')}
          </div>` : '';

        eventSection.innerHTML = `
          <div class="simple-event-content">
            <div class="simple-year">${event.year}</div>
            <div class="simple-title">${event.title}</div>
            <div class="simple-protocols">${protocolBadges}</div>
            <div class="simple-description">${event.description}</div>
            ${protocolEffectsHTML}
            ${referenceHTML}
          </div>
        `;
      }

      container.appendChild(eventSection);
    }

    // Render era card AFTER the event
    if (event.startsEra && event.title) {
      const eraSection = document.createElement('section');
      eraSection.className = 'alt-event-section era-section';
      eraSection.dataset.type = 'era';
      eraSection.dataset.eventIndex = index;
      eraSection.dataset.year = event.year;
      eraSection.dataset.eraName = event.startsEra.name;

      // Parse era start year
      if (event.startsEra.years) {
        const eraYearMatch = event.startsEra.years.match(/\d{4}/);
        if (eraYearMatch) {
          eraSection.dataset.eraYear = eraYearMatch[0];
        }
      }

      eraSection.innerHTML = generateAltEraCardHTML(event.startsEra, event.startsEra.name);
      container.appendChild(eraSection);
    }

    // Render system card AFTER the event
    if (event.startsSystem && event.title) {
      const systemSection = document.createElement('section');
      systemSection.className = 'alt-event-section era-section system-section';
      systemSection.dataset.type = 'system';
      systemSection.dataset.eventIndex = index;
      systemSection.dataset.year = event.year;
      systemSection.dataset.systemName = event.startsSystem.name;

      systemSection.innerHTML = generateSystemCardHTML(event.startsSystem);
      container.appendChild(systemSection);
    }
  });

  console.log('✅ Alternative events generated (unified architecture, consistent naming)');

  // Inject closing scenes (15-18) AFTER the scene-alternative-wrapper
  // This makes them standalone sections, not part of the alt timeline
  injectClosingScenesAfterAltTimeline();
}
