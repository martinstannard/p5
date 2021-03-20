var count = 5;
var side = 400;
var gap = side / count;
var start = gap / 2;
var xoff = 1.0;
var yoff = 310.0;
var rad = 100.0;

function setup() {
  colormode(hsl, 100);
  framerate(30);
  rectmode(center);
  createcanvas(side, side);
}

function draw() {
  background(10, 10, 20);

  for (var i = 0; i < count; i++) {
    for (var j = 0; j < count; j++) {
      lx = i * gap + start;
      ly = j * gap + start;
      xoff += 0.0001;
      yoff += 0.0005;
      n1 = noise(lx + xoff, ly + yoff);
      n2 = noise(ly + xoff, lx + yoff);
      fill((n1 * 100) % 100.0, 60, 60);
      ellipse(lx, ly, n2 * rad);
    }
  }
}
