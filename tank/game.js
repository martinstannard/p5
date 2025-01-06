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
    this.speed = 2.5;
    this.turnSpeed = 0.08;
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
      const bulletSpeed = 7;
      const bulletVel = p5.Vector.fromAngle(this.heading).mult(bulletSpeed);
      const bulletPos = p5.Vector.add(this.pos, p5.Vector.fromAngle(this.heading).mult(this.size));
      this.bullets.push(new Bullet(bulletPos.x, bulletPos.y, bulletVel.x, bulletVel.y));
      this.lastShot = millis();
    }
  }

  reset() {
    this.pos = createVector(random(width), random(height));
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

  collidesWith(tank) {
    return (
      tank.pos.x + tank.size/2 > this.pos.x &&
      tank.pos.x - tank.size/2 < this.pos.x + this.w &&
      tank.pos.y + tank.size/2 > this.pos.y &&
      tank.pos.y - tank.size/2 < this.pos.y + this.h
    );
  }
}
