class Tank {
  constructor(x, y, isPlayer = false) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.heading = 0;
    this.isPlayer = isPlayer;
    this.size = 20;
    this.health = 100;
    this.bullets = [];
    this.color = isPlayer ? color(0, 255, 0) : color(255, 0, 0);
    this.lastShot = 0;
    this.shotCooldown = 500; // milliseconds
    this.speed = 1.25;
    this.turnSpeed = 0.04;
  }

  update() {
    // Update position
    this.pos.add(this.vel);
    
    // Wrap around edges
    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
    
    // Update bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update();
      if (this.bullets[i].isOffscreen()) {
        this.bullets.splice(i, 1);
      }
    }
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    
    // Draw tank body
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    
    // Draw tank barrel
    fill(50);
    rect(this.size/2, 0, this.size/2, this.size/4);
    
    pop();
    
    // Draw bullets
    this.bullets.forEach(bullet => bullet.draw());
  }

  shoot() {
    if (millis() - this.lastShot > this.shotCooldown) {
      const bulletSpeed = 3.5;
      const bulletVel = p5.Vector.fromAngle(this.heading).mult(bulletSpeed);
      const bulletPos = p5.Vector.add(this.pos, p5.Vector.fromAngle(this.heading).mult(this.size));
      this.bullets.push(new Bullet(bulletPos.x, bulletPos.y, bulletVel.x, bulletVel.y));
      this.lastShot = millis();
    }
  }

  reset() {
    // Keep trying random positions until we find one not inside any building
    let validPosition = false;
    while (!validPosition) {
      this.pos = createVector(random(width), random(height));
      validPosition = true;
      // Check against all buildings
      for (let building of buildings) {
        if (building.collidesWith(this)) {
          validPosition = false;
          break;
        }
      }
    }
    this.vel = createVector(0, 0);
    this.health = 100;
    this.bullets = [];
  }
}

class Bullet {
  constructor(x, y, vx, vy) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.size = 5;
  }

  update() {
    this.pos.add(this.vel);
  }

  draw() {
    fill(255);
    noStroke();
    circle(this.pos.x, this.pos.y, this.size);
  }

  isOffscreen() {
    // Bullets don't wrap, they disappear offscreen
    return (
      this.pos.x < -10 ||
      this.pos.x > width + 10 ||
      this.pos.y < -10 ||
      this.pos.y > height + 10
    );
  }
}

class Building {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  draw() {
    fill(100);
    noStroke();
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

  collidesWith(obj) {
    // For tanks and bullets
    const objLeft = obj.pos.x - obj.size/2;
    const objRight = obj.pos.x + obj.size/2;
    const objTop = obj.pos.y - obj.size/2;
    const objBottom = obj.pos.y + obj.size/2;
    
    return (
      objRight > this.pos.x &&
      objLeft < this.pos.x + this.w &&
      objBottom > this.pos.y &&
      objTop < this.pos.y + this.h
    );
  }
}
