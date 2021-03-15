var count = 5;
var side = 800;
var tick = 0;
let dots = [count];

function setup() {
  frameRate(30);
  rectMode(CENTER);
  createCanvas(side, side);
  for(let i = 0; i < count; i++) {
    dots[i] = new Dot();
  }
}

function draw() {
  tick = tick + 1;
  background(80, 50, 180);
  fill(190, 50, 180);
  let a = (sin(tick * 0.1) + 1.0) * 0.5;
  for (let i = 0; i < count; i++) {
    dots[i].move();
    dots[i].display();
  }
}

function swapper(i) {
  let p = i - 1;
  if (p < 0) {
    p = p + count;
  }
  let n = i + 1;
  if (n == count) {
    n = 0;
  }

}

class Dot {
  constructor(){
    this.fromX = random(800);
    this.fromY = random(800);

    this.toX = random(800);
    this.toY = random(800);

    this.x = this.fromX;
    this.y = this.fromY;

    this.amnt = 0.0;
    this.color = color(random(200), random(200), random(200));
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, 20, 20);
  }

  move() {
    this.amnt = (sin(tick * 0.1) + 1.0) * 0.5;
    this.x = lerp(this.fromX, this.toX, this.amnt);
    this.y = lerp(this.fromY, this.toY, this.amnt);
  }
}
