var count = 5;
var side = 800;
var gap = side / count;
var start = gap / 2;
var jump = gap / 16;

function setup() {
  colorMode(RGB, 100);
  createCanvas(side, side);
  fill(20, 30, 100);
  stroke(100, 100, 10);
  strokeWeight(2);
}

function draw() {
  background(10, 30, 40);
  for (let r = gap * 2; r > 0; r -= jump) {
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        ellipse(i * gap + gap / 2, j * gap + gap / 2, r, r);
      }
    }
  }
  noLoop();
}
