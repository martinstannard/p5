var count = 8;
var side = 800;
var gap = side / count;
var start = gap / 2;
var tick = 0.0;

function setup() {
  colorMode(HSL, 100);
  createCanvas(side, side);
  stroke(100);
  strokeWeight(3);
}

function draw() {
  tick += 0.02;
  var lx;
  var ly;
  background(10, 30, 40);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if ((i + j) % 2 == 1) {
        push();
        lx = i * gap + (gap / 2);
        ly = j * gap + (gap / 2);
        translate(lx, ly);
        fill(50, 50, 80);
        rect(-gap/2, -gap/2, gap,  gap)
        pop();
      }
    }
  }
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      if ((x + y) % 2 == 0) {
        push();
        lx = x * gap + (gap / 2);
        ly = y * gap + (gap / 2);
        translate(lx, ly);
        if (animate(tick, y)) {
          rotate(animationAngle(tick, y));
        }
        fill(90, 80, 80);
        rect(-gap/2, -gap/2, gap,  gap);
        pop();
      }
    }
  }
}

function animate(tick, row) {
  let tickIndex = tick % (count * 1.0);
  return (tickIndex > row && tickIndex < row + 1);
}

function animationAngle(tick, row) {
  return lerp(0, PI / 2, tick - row);
}
