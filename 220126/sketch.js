let count = 8;
let canvasSize = 800;
let gap = canvasSize/100;
let width = (canvasSize / count) / 2;
let start = width / 2;

function r255() {
  return random(255);
}

function stp(s, w, g, i, j) {
  if (w < 40) {
    return;
  } else {
    stroke(r255(), r255(), r255());
    fill(r255(), r255(), r255());
    rect(s + w * i, s + w * j, w - g, w - g);
    stp(s, w - 5, g, i, j);
  }
}

function setup() {
  colorMode(RGB, 255);
  rectMode(RADIUS);
  createCanvas(canvasSize, canvasSize);
  strokeWeight(5);
}

function draw() {
  background(10, 30, 40);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      stp(start, width, gap, i, j);
      // stroke(r255(), r255(), r255());
      // fill(r255(), r255(), r255());
      // fill(random(200), 30, 100);
      //
      // rect(start + width * i,
      //      start + width * j,
      //      width - gap,
      //      width - gap);
    }
  }
  noLoop();
}

