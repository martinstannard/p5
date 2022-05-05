let count = 8;
let canvasSize = 800;
let gap = canvasSize/100;
let width = canvasSize / count;
let sx = width / 2;
let sy = width / 2;
let r = 0.01;

function r255() {
  return random(255);
}


function stp(sx, sy, w, r) {
  if (w < 15) {
    return;
  } else {
    rect(sx, sy, w, w);
    translate(sx, sy);
    rotate(r);
    translate(-sx, -sy);
    stp(sx, sy, w - 1, r + 0.01);
  }
}

function setup() {
  frameRate(30);
  colorMode(RGB, 255);
  rectMode(RADIUS);
  createCanvas(canvasSize, canvasSize);
  strokeWeight(1);
}

function draw() {
  r += 0.1;
  console.log(r);
  background(10, 30, 40);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      let r =  255.0 / (i + j + 1);
      let g =  255.0 / (i + j + 1);
      let b = 255.0 / (i + j + 1);
      stroke(r255(), 0, 255);
      fill(r, g, b);
      push();
      stp(sx + width * i, sy + width * j, width / 2, r);
      pop();
    }
  }
}
