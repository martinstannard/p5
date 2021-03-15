var gap = 160;
var tick = 0;
var rw = 110;

function setup() {
  frameRate(30);
  rectMode(CENTER);
  createCanvas(800, 800);
}

function draw() {
  tick++;
  background(80, 50, 180);
  var rect_w = gap - 20;
  for (var i = 0; i < 800; i += gap) {
    for (var j = 0; j < 800; j += gap) {
      push();
      tx = i+10 + rect_w / 2;
      ty = j+10 + rect_w / 2;
      translate(tx, ty);

      rotate(tick / 50.0);
      fill(220, 40, 111);
      rect(0, 0, rw, rw);

      rotate(-tick / 25.0);
      fill(45, 120, 181);
      rect(0, 0, rw - 20, rw - 20);

      rotate(tick / 25.5);
      fill(245, 230, 81);
      rect(0, 0, rw - 30, rw - 30);

      rotate(-tick / 25.5);
      fill(0, 200, 100);
      rect(0, 0, rw - 40, rw - 40);

      pop();
    }
  }
}
