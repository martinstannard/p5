var count = 5;
var layers = 8;
var side = 800;
var gap = side / count;
var start = gap / 2;
var xoff = 1.0;
var yoff = 310.0;
var rad = 130;
var tick = 0;

function setup() {
  colorMode(HSL, 100);
  createCanvas(side, side);
}

function draw() {
  tick++;
  background(80, 10, 40);

  for (var i = 0; i < count; i++) {
    for (var j = 0; j < count; j++) {
      lx = i * gap + start;
      ly = j * gap + start;
      var startHue = random(100);
      var startLight = random(10, 40);
      var lightJump = random(4, 9);
      fill(startHue, 80, startLight);
      ellipse(lx, ly, rad, rad)
      for (var c = 1; c < layers; c ++) {
        push();
        var hue = (startHue + c * 2) % 100.0;
        var light = (startLight + c * lightJump);
        fill(hue, 80, light, 90);
        s = random(TWO_PI);
        e = s + 1.5 + random(PI);
        r = rad - (c * 10);
        arc(lx, ly, r, r, s, e, PIE);
        pop();
      }
    }
  }
  noLoop();
}

function mousePressed() {
  loop();
}

