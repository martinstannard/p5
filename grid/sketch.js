var count = 8;
var side = 800;
var tick = 0;
var gap = side / count;
var start = gap / 2;
let grid = new Array(count * count);

function setup() {
  frameRate(30);
  rectMode(CENTER);
  createCanvas(side, side);
}

function draw() {
  tick++;
  background(30, 50, 80);
  fill(190, 250, 180);

  for (var i = 0; i < count; i++) {
    for (var j = 0; j < count; j++) {
      tx = start + i * gap;
      lx = lerp(tx, tx + gap / 2, sin((tick + i + j * 6) / 7.0) / 2);
      ty = start + j * gap;
      ly = lerp(ty, ty + gap / 2, cos((tick + i * 9 + j) / 5.0) / 2);
      ellipse(lx, ly, 50, 50);
    }
  }
}
