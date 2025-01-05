/*
By Okazz
*/
let objs = [];
let colors = ['#e6302b', '#fd7800', '#fbd400', '#1b98e0', '#F0F0FC'];

function setup() {
	createCanvas(900, 900);
	rectMode(CENTER);
	const gridSize = 15; // Number of objects per row/column
	const spacing = width / gridSize;
	const offset = spacing / 2;
	
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			let x = offset + i * spacing;
			let y = offset + j * spacing;
			let l = 0.03 * width;
			objs.push(new Walker(x, y, l));
		}
	}
}

function draw() {
	background(255);
	for (let o of objs) {
		o.run();
	}
}

function easeInOutQuad(x) {
	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

class Walker {
	constructor(x, y, l) {
		this.x1 = x;
		this.y1 = y;
		this.len = l;
		this.ang = int(random(100)) * (PI / 2);
		this.prevAng = this.ang;
		this.x2 = this.x1 + this.len * cos(this.ang);
		this.y2 = this.y1 + this.len * sin(this.ang);
		this.d1 = width * 0.03;
		this.d2 = width * 0.03;
		this.toggle = 0;
		this.reset();
		this.clr1 = random(colors);
		this.clr2 = random(colors);
		this.rotationDirection = random([-1, 1])
	}

	show() {

		if (this.toggle == 0) {

		} else {

		}
		strokeWeight(width * 0.03);
		stroke(0);
		line(this.x1, this.y1, this.x2, this.y2);
		noStroke();
		fill(this.clr1);
		circle(this.x1, this.y1, this.d1 * 0.5);
		fill(this.clr2);
		circle(this.x2, this.y2, this.d2 * 0.5);
	}

	move() {
		if (this.toggle == 0) {
			this.x2 = this.x1 + this.len * cos(this.ang);
			this.y2 = this.y1 + this.len * sin(this.ang);
		} else {
			this.x1 = this.x2 + this.len * cos(this.ang + PI);
			this.y1 = this.y2 + this.len * sin(this.ang + PI);
		}
		if (this.t % this.keyFrame == 0) {
			this.toggle = 1 - this.toggle;
			this.reset();
		}
		if (0 < this.t && this.t < this.keyFrame) {
			let n = norm(this.t, 0, this.keyFrame - 1);
			this.ang = lerp(this.prevAng, this.targetAng, easeInOutQuad(n));
		}
		this.t++;
	}

	reset() {
		this.keyFrame = int(50);
		this.t = 0;
		this.prevAng = this.ang;
		this.targetAng = this.ang + int(random(4)) * (TAU / 4) * this.rotationDirection;
	}

	run() {
		this.show();
		this.move();
	}
}
