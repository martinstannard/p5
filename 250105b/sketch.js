const PARTICLE_COUNT = 400;
const TYPES = ['red', 'green', 'blue', 'yellow'];
const particles = [];
const G = 10; // Force multiplier
const FRICTION = 0.85;
const MIN_R = 10; // Minimum interaction radius
const MAX_R = 50; // Maximum interaction radius

// Attraction/repulsion matrix
const rules = [
  [1, -0.5, -0.5, 0.3],    // Red's attraction to: [red, green, blue, yellow]
  [-0.5, 1, -0.5, 0.3],    // Green's attraction to: [red, green, blue, yellow]
  [-0.5, -0.5, 1, 0.3],    // Blue's attraction to: [red, green, blue, yellow]
  [0.3, 0.3, 0.3, -0.5]    // Yellow's attraction to: [red, green, blue, yellow]
];

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = 0;
    this.vy = 0;
    this.type = random(TYPES);
    this.typeIndex = TYPES.indexOf(this.type);
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
          force = rules[this.typeIndex][TYPES.indexOf(other.type)];
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
    fill(this.type);
    circle(this.x, this.y, 4);
  }
}

function setup() {
  createCanvas(800, 800);
  
  // Create particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
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
