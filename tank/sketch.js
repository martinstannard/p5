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
  let moveX = 0;
  let moveY = 0;
  
  if (keyIsDown(65)) moveX -= 1; // A
  if (keyIsDown(68)) moveX += 1; // D
  if (keyIsDown(87)) moveY -= 1; // W
  if (keyIsDown(83)) moveY += 1; // S
  
  if (moveX !== 0 || moveY !== 0) {
    player.heading = atan2(moveY, moveX);
    player.vel = p5.Vector.fromAngle(player.heading).mult(player.speed);
  } else {
    player.vel.mult(0);
  }
  
  // Shooting
  if (keyIsDown(32)) { // Space
    player.shoot();
  }
}

function updateEnemy(enemy) {
  // Simple AI: move randomly and shoot occasionally
  if (frameCount % 60 === 0) {
    enemy.heading = random(TWO_PI);
    enemy.vel = p5.Vector.fromAngle(enemy.heading).mult(enemy.speed);
  }
  
  if (random() < 0.02) {
    enemy.shoot();
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
