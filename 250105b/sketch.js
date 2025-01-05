const MIN_TYPES = 3;
const MAX_TYPES = 8;
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
  opc.set('G', random(5, 15));
  opc.set('FRICTION', random(0.8, 0.95));
  opc.set('MIN_R', random(5, 15));
  opc.set('MAX_R', random(40, 60));
}

function generateRandomColor() {
  return color(random(255), random(255), random(255));
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

function initializeSimulation() {
  randomizeParameters();
  rules = generateRules();
  particles = []; // Create new array instead of clearing
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
  console.log(`New simulation parameters:
    Particles: ${PARTICLE_COUNT}
    Force (G): ${G.toFixed(2)}
    Friction: ${FRICTION.toFixed(3)}
    Min radius: ${MIN_R.toFixed(1)}
    Max radius: ${MAX_R.toFixed(1)}
    Types: ${TYPES.length}`);
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
  createCanvas(800, 800);
  
  // Setup OPC controls
  opc.addSlider('PARTICLE_COUNT', 100, 500);
  opc.addSlider('G', 2, 20);
  opc.addSlider('FRICTION', 0.2, 1.0);
  opc.addSlider('MIN_R', 5, 40);
  opc.addSlider('MAX_R', 40, 100);
  
  generateTypes();
  initializeSimulation();
}

function keyPressed() {
  if (key === ' ') {
    generateTypes();
    initializeSimulation();
  }
}

function draw() {
  background(0, 20);
  
  // Update and draw all particles
  for (let p of particles) {
    p.update();
    p.draw();
  }
}
