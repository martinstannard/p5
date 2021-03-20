var count = 120;
var side = 800;
var rad = side / 2.0 * 0.75;
var tick = 0;
var maxTick = 50;
let dots = [count];
let points = [count];
let radius = 50;

function setup() {
  noStroke();
  colorMode(HSB, 100);
  frameRate(30);
  rectMode(CENTER);
  createCanvas(side, side);
  makePoints(350);
  for(let i = 0; i < count; i++) {
    dots[i] = new Dot(i);
  }
}

function draw() {
  tick = tick + 1;
  background(20, 50, 10);
  fill(190, 150, 180);
  let d = distance(tick);
  moveDots(d);
  if (tick == maxTick) {
    makePoints(random(200) + 100);
    if (random(2) < 1) {
      points = shuffle(points, true);
    }
    advanceDots();
    tick = 0;
  }
}

function advanceDots(distance) {
  for (let i = 0; i < count; i++) {
    let nextPoint = points[i];
    dots[i].advance(nextPoint[0], nextPoint[1]);
  }
}

function moveDots(amnt) {
  for (let i = 0; i < count; i++) {
    dots[i].move(amnt);
    dots[i].display();
  }
}

function distance(tick) {
  return ((cos((PI / maxTick) * tick) + 1.0) * 0.5);
}

function makeCirclePoints(radius) {
  let delta = TWO_PI / count;
  for (let i = 0; i < count; i++) {
    var x = sin(delta * i) * radius + 400;
    var y = cos(delta * i) * radius + 400;
    points[i] = [x, y];
  }
}

function makeLinePoints() {
  let delta = 1.0 / count;
  xf = random(100, 700);
  xt = random(100, 700);
  yf = random(100, 700);
  yt = random(100, 700);
  for (let i = 0; i < count; i++) {
    x = lerp(xf, xt, delta * i);
    y = lerp(yf, yt, delta * i);
    points[i] = [x, y];
  }
}

function makeSquarePoints(rad) {
  points = [];
  lerpLine([-1 * rad, -1 * rad], [-1 *  rad, rad], 4);
  lerpLine([-1 * rad, rad], [rad, rad], 4);
  lerpLine([rad, rad], [rad, -1 * rad], 4);
  lerpLine([rad, -1 * rad], [-1 *  rad, -1 * rad], 4);
}

function makeTriangePoints(rad) {
  points = [];
  lerpLine([0, -0.9 * rad], [0.85 * rad, 0.75 * rad], 3);
  lerpLine([0.85 * rad, 0.75 * rad], [-0.85 * rad, 0.75 * rad], 3);
  lerpLine([-0.85 * rad, 0.75 * rad], [0, -0.9 * rad], 3);
}

function lerpLine(p1, p2, lineCount) {
  var sections = (count / lineCount);
  var delta = 1.0 / (sections);
  for (let i = 0; i < sections; i++) {
    let a = delta * i;
    let x = lerp(p1[0], p2[0], a);
    let y = lerp(p1[1], p2[1], a);
    points.push([x + side / 2, y + side / 2]);
  }
}

function makePoints(radius) {
  let r = random(100);

  if (r < 40) {
    makeCirclePoints(radius);
    return;
  }
  if (r < 60) {
    makeTriangePoints(radius);
    return;
  }
  if (r < 100) {
    makeSquarePoints(radius);
    return;
  }
}

class Dot {
  constructor(i){
    this.toX = 400.0;
    this.toY = 400.0;

    this.fromX = points[i][0];
    this.fromY = points[i][1];

    this.x = this.fromX;
    this.y = this.fromY;

    this.color = color(100 / count * i, 90, 80);
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, radius, radius);
  }

  advance(x, y) {
    this.toX = this.fromX;
    this.toY = this.fromY;

    this.fromX = x;
    this.fromY = y;
  }

  move(amnt) {
    this.x = lerp(this.fromX, this.toX, amnt);
    this.y = lerp(this.fromY, this.toY, amnt);
  }
}
