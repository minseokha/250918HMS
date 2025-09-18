
function setup() {
  createCanvas(windowWidth, windowHeight * 0.7);
  paddle = new Paddle();
  ball = new Ball();
  brickW = width / cols;
  brickH = 30;
  bricks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      bricks.push(new Brick(c * brickW, r * brickH + 40, brickW, brickH));
    }
  }
}

function draw() {
  background(30, 30, 50);
  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(255, 0, 0);
    text('Game Over!', width/2, height/2);
    return;
  }
  if (win) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0, 255, 0);
    text('You Win!', width/2, height/2);
    return;
  }
  paddle.show();
  ball.update();
  ball.show();
  ball.checkPaddle(paddle);
  let remaining = 0;
  for (let b of bricks) {
    if (!b.broken) {
      b.show();
      if (ball.checkBrick(b)) {
        b.broken = true;
      } else {
        remaining++;
      }
    }
  }
  if (remaining === 0) win = true;
// ...existing code...

function touchMoved() {
  paddle.x = constrain(mouseX, 0, width - paddle.w);
  return false;
}

function mouseDragged() {
  paddle.x = constrain(mouseX, 0, width - paddle.w);
}

class Paddle {
  constructor() {
    this.w = width / 5;
    this.h = 18;
    this.x = width/2 - this.w/2;
    this.y = height - 40;
  }
  show() {
    fill(200);
    rect(this.x, this.y, this.w, this.h, 10);
  }
}

class Ball {
  constructor() {
    this.r = 15;
    this.x = width/2;
    this.y = height/2;
    this.speed = min(width, height) / 80;
    this.vx = random([-1, 1]) * this.speed;
    this.vy = -this.speed;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    // 벽 충돌
    if (this.x < this.r || this.x > width - this.r) this.vx *= -1;
    if (this.y < this.r) this.vy *= -1;
    if (this.y > height - this.r) gameOver = true;
  }
  show() {
    fill(255, 200, 0);
    ellipse(this.x, this.y, this.r * 2);
  }
  checkPaddle(p) {
    if (this.y + this.r > p.y && this.x > p.x && this.x < p.x + p.w && this.y < p.y + p.h) {
      this.vy *= -1;
      this.y = p.y - this.r;
    }
  }
  checkBrick(b) {
    if (b.broken) return false;
    // 충돌 판정
    let hit = this.x > b.x && this.x < b.x + b.w && this.y - this.r < b.y + b.h && this.y + this.r > b.y;
    if (hit) {
      this.vy *= -1;
      return true;
    }
    return false;
  }
}

class Brick {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w - 4;
    this.h = h - 4;
    this.broken = false;
  }
  show() {
    fill(100, 180, 255);
    rect(this.x, this.y, this.w, this.h, 6);
  }
}

}

function draw() {
  background(30, 30, 50);
  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(255, 0, 0);
    text('Game Over!', width/2, height/2);
    return;
  }
  if (win) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0, 255, 0);
    text('You Win!', width/2, height/2);
    return;
  }
  paddle.show();
  ball.update();
  ball.show();
  ball.checkPaddle(paddle);
  let remaining = 0;
  for (let b of bricks) {
    if (!b.broken) {
      b.show();
      if (ball.checkBrick(b)) {
        b.broken = true;
      } else {
        remaining++;
      }
    }
  }
  if (remaining === 0) win = true;
}
