var count = 5;
var side = 800;
var centre = side / 2;
var radius = 600;
var gap = 18;
let mag = 60;


function setup() {
  colorMode(RGB, 100);
  createCanvas(side, side);
  noFill();
  strokeWeight(4);
  stroke(0);
  tick = 0.0;
}

function draw() {
  background(100);
  x = centre + (cos(-tick * -1.03) * mag);
  y = centre + (sin(tick * 1.01) * mag);
  concentric(x, y);
  x = centre + (-cos(tick * -1.2) * mag);
  y = centre + (sin(tick * 1.22) * mag);
  concentric(x, y);
  x = centre + (-cos(tick * 1.4) * mag);
  y = centre + (-sin(-tick * -1.32) * mag);
  concentric(x, y);
  tick += 0.01;
}

function concentric(x, y) {
  for (let r = radius; r > 0; r -= gap) {
    ellipse(x, y, r, r);
  }
}
