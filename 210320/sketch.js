var count = 5;
var layers = 8;
var side = 800;
var gap = side / count;
var start = gap / 2;
var rad = 130;
var tick = 0.0;
let stacks = [];

function setup() {
  colorMode(HSL, 100);
  createCanvas(side, side);
  stacks = setupStacks();
}

function draw() {
  tick += 0.01;
  background(80, 10, 20);

  for (var i = 0; i < count; i++) {
    for (var j = 0; j < count; j++) {
      stacks[i][j].display();
    }
  }
}

function mousePressed() {
  stacks = setupStacks();
}

function setupStacks() {
  let arr = [];
  for (var i = 0; i < count; i++) {
    let columns = [];
    for (var j = 0; j < count; j++) {
      lx = i * gap + start;
      ly = j * gap + start;
      columns[j] = new Stack(lx, ly);
    }
    arr[i] = columns;
  }
  return arr;
}

class Arc {
  constructor(_h, _l, c) {
    this.start = random(TWO_PI);
    this.end = this.start + 1.5 + random(PI);
    this.radius = rad - (c * 10);
    this.hue = _h;
    this.light = _l;
    this.dir = random(1) - 0.5;
    this.layer = c;
  }

  display() {
    fill(this.hue, 80, this.light, 30);
    rotate(tick * this.dir * (this.layer + 1) *  0.5);
    arc(0, 0, this.radius, this.radius, this.start, this.end, PIE);
  }
}

class Stack {
  constructor(_x, _y) {
    this.startHue = random(100);
    this.startLight = random(10, 40);
    this.lightJump = random(4, 9);
    this.arcs = [];
    this.x = _x;
    this.y = _y;
    this.createArcs();
  }

  createArcs() {
    this.arcs.push(new Arc(this.startHue, this.startLight, 0));
    for (var c = 1; c < layers; c ++) {
      var hue = (this.startHue + c * 2) % 100.0;
      var light = (this.startLight + c * this.lightJump);
      fill(hue, 80, light, 90);
      let s = random(TWO_PI);
      let e = s + 1.5 + random(PI);
      let r = rad - (c * 10);
      this.arcs.push(new Arc(hue, light, c));
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    for (var c = 0; c < layers; c ++) {
      this.arcs[c].display();
    }
    pop();
  }
}
