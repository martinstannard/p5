var count = 40;
var side = 800;
var tick = 0.0;

function setup() {
  createCanvas(side, side);
  stroke(100, 230, 160, 150);
  strokeWeight(15);
}

function draw() {
  tick += 0.03;
  background(0);
  for (let x = 0; x < count; x++) {
    let lx = log(x) * 120 * (sin(tick) + 1.0);
    line(lx, 0, side, lx);
    line(side, lx, side -lx, side);
    line(side - lx, side, 0, side - lx);
    line(0, side - lx , lx, 0);
  }
}
