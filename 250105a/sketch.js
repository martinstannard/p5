let gridItems = [];
const colors = ['#e6302b', '#fd7800', '#fbd400', '#1b98e0'];
const gridSize = 10;
let rotationInterval = 1000; // Time between rotation checks in milliseconds
let rotationPercentage = 5; // Percentage of items to rotate

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  
  const cellSize = width / gridSize;
  
  // Create grid items
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = i * cellSize;
      let y = j * cellSize;
      gridItems.push(new GridItem(x, y, cellSize));
    }
  }
}

function draw() {
  background(50);
  
  // Update rotation interval based on keyboard input
  if (keyIsDown(UP_ARROW)) {
    rotationInterval = max(100, rotationInterval - 50); // Speed up, minimum 100ms
  }
  if (keyIsDown(DOWN_ARROW)) {
    rotationInterval = min(2000, rotationInterval + 50); // Slow down, maximum 2000ms
  }
  
  // Update rotation percentage based on keyboard input
  if (keyIsDown(LEFT_ARROW)) {
    rotationPercentage = max(1, rotationPercentage - 1); // Minimum 1%
  }
  if (keyIsDown(RIGHT_ARROW)) {
    rotationPercentage = min(20, rotationPercentage + 1); // Maximum 20%
  }
  
  // Update and display all grid items
  gridItems.forEach(item => {
    item.update();
    item.display();
  });
}

class GridItem {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.squareSize = this.size * 0.4; // 80% of quadrant size
    this.rotation = 0;
    this.targetRotation = 0;
    this.isRotating = false;
    this.rotationDirection = random() < 0.5 ? 1 : -1;
    this.rotationStartTime = 0;
    this.rotationDuration = 1000; // 1 second
    this.shouldRotate = false;
  }
  
  update() {
    // Check for rotation based on the interval
    if (frameCount % Math.floor(rotationInterval / (1000/60)) === 0) {
      this.shouldRotate = random() < (rotationPercentage / 100); // Configurable percentage chance
    }
    
    if (this.shouldRotate && !this.isRotating) {
      this.startRotation();
    }
    
    if (this.isRotating) {
      let elapsed = millis() - this.rotationStartTime;
      let progress = min(elapsed / this.rotationDuration, 1);
      
      // Ease the rotation
      let eased = this.easeInOutQuad(progress);
      this.rotation = lerp(this.rotation, this.targetRotation, eased);
      
      if (progress >= 1) {
        this.isRotating = false;
        this.rotation = this.targetRotation;
      }
    }
  }
  
  startRotation() {
    this.isRotating = true;
    this.rotationStartTime = millis();
    this.targetRotation += (PI/2) * this.rotationDirection;
  }
  
  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2;
  }
  
  display() {
    push();
    // Move to center of grid cell and create clipping region
    translate(this.x + this.size/2, this.y + this.size/2);
    beginShape();
    vertex(-this.size/2, -this.size/2);
    vertex(this.size/2, -this.size/2);
    vertex(this.size/2, this.size/2);
    vertex(-this.size/2, this.size/2);
    endShape(CLOSE);
    rotate(this.rotation);
    
    // Draw four squares
    noStroke();
    
    // Top-left
    fill(colors[0]);
    rect(-this.size/4, -this.size/4, this.squareSize, this.squareSize);
    
    // Top-right
    fill(colors[1]);
    rect(this.size/4, -this.size/4, this.squareSize, this.squareSize);
    
    // Bottom-left
    fill(colors[2]);
    rect(-this.size/4, this.size/4, this.squareSize, this.squareSize);
    
    // Bottom-right
    fill(colors[3]);
    rect(this.size/4, this.size/4, this.squareSize, this.squareSize);
    
    pop();
  }
}
