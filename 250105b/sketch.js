const MIN_TYPES = 6;
const MAX_TYPES = 12;
let TYPES = [];
let particles = [];

// These will be controlled by OPC
let PARTICLE_COUNT = 300;
let G = 10;           // Force multiplier
let FRICTION = 0.85;
let MIN_R = 10;       // Minimum interaction radius
let MAX_R = 50;       // Maximum interaction radius
let rules;

let opc;

function preload() {
  opc = new OPC();
}

function randomizeParameters() {
  opc.set('PARTICLE_COUNT', floor(random(100, 501)));
  opc.set('G', random(2, 25));
  opc.set('FRICTION', random(0.2, 1.00));
  opc.set('MIN_R', random(2, 40));
  opc.set('MAX_R', random(40, 100));
}

function generateRandomColor() {
  // Generate vibrant colors with good saturation and brightness
  const h = random(360);  // Hue: 0-360
  const s = random(60, 100);  // Saturation: 60-100%
  const b = random(70, 100);  // Brightness: 70-100%
  colorMode(HSB, 360, 100, 100);
  const c = color(h, s, b);
  colorMode(RGB, 255); // Switch back to RGB mode
  return c;
}

function generateTypes() {
  TYPES = [];
  const numTypes = floor(random(MIN_TYPES, MAX_TYPES + 1));
  for (let i = 0; i < numTypes; i++) {
    TYPES.push(generateRandomColor());
  }
}

function generateRules() {
  let newRules = [];
  for (let i = 0; i < TYPES.length; i++) {
    newRules[i] = [];
    for (let j = 0; j < TYPES.length; j++) {
      // Generate random values between -1 and 1
      newRules[i][j] = random(-1, 1);
    }
  }
  return newRules;
}

function encodeSimulation() {
  // Encode parameters
  const params = new URLSearchParams();
  params.set('pc', PARTICLE_COUNT);
  params.set('g', G.toFixed(2));
  params.set('f', FRICTION.toFixed(3));
  params.set('minr', MIN_R.toFixed(1));
  params.set('maxr', MAX_R.toFixed(1));
  
  // Encode colors
  const colors = TYPES.map(c => `${red(c)},${green(c)},${blue(c)}`).join(';');
  params.set('colors', colors);
  
  // Encode rules matrix
  const rulesStr = rules.map(row => row.map(v => v.toFixed(3)).join(',')).join(';');
  params.set('rules', rulesStr);
  
  // Update URL without reloading page
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
  
  // Return the full URL for sharing
  return window.location.href;
}

function decodeSimulation() {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('pc')) {
    // Load parameters
    PARTICLE_COUNT = parseInt(params.get('pc'));
    G = parseFloat(params.get('g'));
    FRICTION = parseFloat(params.get('f'));
    MIN_R = parseFloat(params.get('minr'));
    MAX_R = parseFloat(params.get('maxr'));
    
    // Load colors
    const colorStr = params.get('colors');
    if (colorStr) {
      TYPES = colorStr.split(';').map(c => {
        const [r, g, b] = c.split(',').map(Number);
        return color(r, g, b);
      });
    }
    
    // Load rules
    const rulesStr = params.get('rules');
    if (rulesStr) {
      rules = rulesStr.split(';').map(row => 
        row.split(',').map(v => parseFloat(v))
      );
    }
    
    // Update OPC controls
    opc.set('PARTICLE_COUNT', PARTICLE_COUNT);
    opc.set('G', G);
    opc.set('FRICTION', FRICTION);
    opc.set('MIN_R', MIN_R);
    opc.set('MAX_R', MAX_R);
    opc.set('NUM_TYPES', TYPES.length);
    
    // Create particles
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
    return true;
  }
  return false;
}

function initializeSimulation() {
  if (!decodeSimulation()) {
    // If no URL parameters, generate random simulation
    randomizeParameters();
    rules = generateRules();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }
  
  // Add a display-only control for number of types
  opc.set('NUM_TYPES', TYPES.length);
  
  console.log(`New simulation parameters:
    Particles: ${PARTICLE_COUNT}
    Force (G): ${G.toFixed(2)}
    Friction: ${FRICTION.toFixed(3)}
    Min radius: ${MIN_R.toFixed(1)}
    Max radius: ${MAX_R.toFixed(1)}
    Types: ${TYPES.length}`);
    
  // Generate shareable URL
  const shareableUrl = encodeSimulation();
  console.log('Shareable URL:', shareableUrl);
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = 0;
    this.vy = 0;
    this.typeIndex = floor(random(TYPES.length));
  }

  update() {
    // Apply forces from other particles
    for (let other of particles) {
      if (other === this) continue;
      
      let dx = other.x - this.x;
      let dy = other.y - this.y;
      let d = sqrt(dx * dx + dy * dy);
      
      if (d > 0 && d < MAX_R) {
        let force = 0;
        if (d < MIN_R) {
          // Strong repulsion at very close distances
          force = -1;
        } else {
          // Attraction/repulsion based on rules matrix
          force = rules[this.typeIndex][other.typeIndex];
          force *= (1 - d/MAX_R); // Force decreases with distance
        }
        
        // Apply force
        this.vx += (dx/d) * force * G / d;
        this.vy += (dy/d) * force * G / d;
      }
    }
    
    // Apply friction
    this.vx *= FRICTION;
    this.vy *= FRICTION;
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    
    // Wrap around edges
    this.x = (this.x + width) % width;
    this.y = (this.y + height) % height;
  }

  draw() {
    noStroke();
    fill(TYPES[this.typeIndex]);
    circle(this.x, this.y, 4);
  }
}

function setup() {
  // Make canvas 80% of the smallest screen dimension
  const size = min(windowWidth, windowHeight) * 0.8;
  createCanvas(size, size);
  
  // Setup OPC controls
  opc.addSlider('NUM_TYPES', MIN_TYPES, MAX_TYPES, MIN_TYPES).controls['NUM_TYPES'].disabled = true;
  opc.addSlider('PARTICLE_COUNT', 100, 1000);
  opc.addSlider('G', 2, 20);
  opc.addSlider('FRICTION', 0.2, 1.0);
  opc.addSlider('MIN_R', 2, 40);
  opc.addSlider('MAX_R', 40, 100);
  
  generateTypes();
  initializeSimulation();
}

function keyPressed() {
  if (key === ' ') {
    TYPES = []; // Clear existing types
    generateTypes(); // Generate new types with new colors
    rules = generateRules();
    initializeSimulation();
    encodeSimulation(); // Update URL with new parameters
  } else if (key === 'c' || key === 'C') {
    const url = encodeSimulation();
    navigator.clipboard.writeText(url).then(() => {
      console.log('Shareable URL copied to clipboard!');
    });
  }
}

function draw() {
  background(0, 20);
  
  // Update simulation parameters from OPC
  PARTICLE_COUNT = Math.floor(opc.get('PARTICLE_COUNT'));
  G = opc.get('G');
  FRICTION = opc.get('FRICTION');
  MIN_R = opc.get('MIN_R');
  MAX_R = opc.get('MAX_R');
  
  // Adjust particle count if needed
  while (particles.length < PARTICLE_COUNT) {
    particles.push(new Particle());
  }
  while (particles.length > PARTICLE_COUNT) {
    particles.pop();
  }
  
  // Update and draw all particles
  for (let p of particles) {
    p.update();
    p.draw();
  }
}
