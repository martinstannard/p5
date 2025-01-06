let player;
let enemies = [];
let buildings = [];
const NUM_ENEMIES = 3;
const NUM_BUILDINGS = 10;

function setup() {
  createCanvas(800, 600);
  
  // Create player
  player = new Tank(width/2, height/2, true);
  
  // Create enemies
  for (let i = 0; i < NUM_ENEMIES; i++) {
    enemies.push(new Tank(random(width), random(height)));
  }
  
  // Create buildings
  for (let i = 0; i < NUM_BUILDINGS; i++) {
    buildings.push(new Building(
      random(width),
      random(height),
      random(30, 100),
      random(30, 100)
    ));
  }
}

function draw() {
  background(20);
  
  // Draw buildings
  buildings.forEach(building => building.draw());
  
  // Update and draw player
  handlePlayerInput();
  player.update();
  player.draw();
  
  // Update and draw enemies
  enemies.forEach(enemy => {
    updateEnemy(enemy);
    enemy.update();
    enemy.draw();
  });
  
  // Check collisions
  checkCollisions();
}

function handlePlayerInput() {
  // Movement
  if (keyIsDown(87)) { // W - Forward
    player.vel = p5.Vector.fromAngle(player.heading).mult(player.speed);
  } else if (keyIsDown(83)) { // S - Backward
    player.vel = p5.Vector.fromAngle(player.heading).mult(-player.speed * 0.5);
  } else {
    player.vel.mult(0);
  }
  
  // Rotation
  if (keyIsDown(65)) { // A - Turn left
    player.heading -= player.turnSpeed;
  }
  if (keyIsDown(68)) { // D - Turn right
    player.heading += player.turnSpeed;
  }
  
  // Shooting
  if (keyIsDown(32)) { // Space
    player.shoot();
  }
}

function updateEnemy(enemy) {
  // Hunt the player
  let dx = player.pos.x - enemy.pos.x;
  let dy = player.pos.y - enemy.pos.y;
  
  // Account for wrap-around
  if (abs(dx) > width/2) dx = -dx;
  if (abs(dy) > height/2) dy = -dy;
  
  // Calculate target angle
  let targetAngle = atan2(dy, dx);
  
  // Smoothly rotate towards target
  let angleDiff = targetAngle - enemy.heading;
  // Normalize angle difference to [-PI, PI]
  angleDiff = (angleDiff + PI) % TWO_PI - PI;
  
  enemy.heading += constrain(angleDiff, -enemy.turnSpeed, enemy.turnSpeed);
  enemy.vel = p5.Vector.fromAngle(enemy.heading).mult(enemy.speed);
  
  // Shoot if facing player and in range
  let angleToPlayer = abs(angleDiff);
  let distToPlayer = dist(enemy.pos.x, enemy.pos.y, player.pos.x, player.pos.y);
  if (angleToPlayer < 0.3 && distToPlayer < 200) {
    if (random() < 0.1) {
      enemy.shoot();
    }
  }
}

function checkCollisions() {
  // Check building collisions
  buildings.forEach(building => {
    if (building.collidesWith(player)) {
      player.vel.mult(-1);
    }
    enemies.forEach(enemy => {
      if (building.collidesWith(enemy)) {
        enemy.vel.mult(-1);
      }
    });
  });
  
  // Check bullet collisions
  // Player bullets hitting enemies
  player.bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (dist(bullet.pos.x, bullet.pos.y, enemy.pos.x, enemy.pos.y) < enemy.size) {
        enemy.reset();
        player.bullets.splice(bulletIndex, 1);
      }
    });
  });
  
  // Enemy bullets hitting player
  enemies.forEach(enemy => {
    enemy.bullets.forEach((bullet, bulletIndex) => {
      if (dist(bullet.pos.x, bullet.pos.y, player.pos.x, player.pos.y) < player.size) {
        player.reset();
        enemy.bullets.splice(bulletIndex, 1);
      }
    });
  });
}
