// p5.js만으로 구현한 벽돌깨기 게임
let ballX, ballY, ballDX, ballDY, ballR;
let paddleX, paddleW, paddleH;
let bricks;
let rows = 5;
let cols = 8;
let brickW = 60;
let brickH = 20;
let brickPadding = 8;
let brickOffsetTop = 40;
let brickOffsetLeft = 35;
let score = 0;
let gameOver = false;
let win = false;

function setup() {
  createCanvas(600, 400);
  ballR = 10;
  ballX = width / 2;
  ballY = height - 50;
  ballDX = 4;
  ballDY = -4;
  paddleW = 100;
  paddleH = 15;
  paddleX = width / 2 - paddleW / 2;
  score = 0;
  gameOver = false;
  win = false;
  bricks = [];
  for (let r = 0; r < rows; r++) {
    bricks[r] = [];
    for (let c = 0; c < cols; c++) {
      bricks[r][c] = true;
    }
  }
}

function draw() {
  background(255,255,0);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  if (!gameOver && !win) {
    moveBall();
    movePaddle();
    checkCollisions();
  } else if (gameOver) {
    textSize(32);
    fill(255,0,0);
    textAlign(CENTER);
    text('Game Over', width/2, height/2);
    textSize(20);
    fill(255);
    text('Score: ' + score, width/2, height/2+40);
    text('Press SPACE to restart', width/2, height/2+70);
  } else if (win) {
    textSize(32);
    fill(0,255,0);
    textAlign(CENTER);
    text('You Win!', width/2, height/2);
    textSize(20);
    fill(255);
    text('Score: ' + score, width/2, height/2+40);
    text('Press SPACE to restart', width/2, height/2+70);
  }
}

function drawBall() {
  fill(255, 200, 0);
  ellipse(ballX, ballY, ballR * 2);
}

function drawPaddle() {
  fill(0, 200, 255);
  rect(paddleX, height - paddleH - 10, paddleW, paddleH, 8);
}

function drawBricks() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (bricks[r][c]) {
        fill(100 + r*30, 50 + c*20, 200);
        let x = c * (brickW + brickPadding) + brickOffsetLeft;
        let y = r * (brickH + brickPadding) + brickOffsetTop;
        rect(x, y, brickW, brickH, 5);
      }
    }
  }
}

function drawScore() {
  textSize(18);
  fill(255);
  textAlign(LEFT);
  text('Score: ' + score, 10, 25);
}

function moveBall() {
  ballX += ballDX;
  ballY += ballDY;
  // 좌우 벽 충돌
  if (ballX < ballR || ballX > width - ballR) {
    ballDX *= -1;
  }
  // 위쪽 벽 충돌
  if (ballY < ballR) {
    ballDY *= -1;
  }
  // 패들 충돌
  let paddleY = height - paddleH - 10;
  if (
    ballY + ballR > paddleY &&
    ballY + ballR < paddleY + paddleH &&
    ballX > paddleX &&
    ballX < paddleX + paddleW
  ) {
    ballDY *= -1;
    ballY = paddleY - ballR;
  }
  // 바닥에 닿으면 게임 오버
  if (ballY > height - ballR) {
    gameOver = true;
  }
}

function movePaddle() {
  if (keyIsDown(LEFT_ARROW)) {
    paddleX -= 7;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    paddleX += 7;
  }
  paddleX = constrain(paddleX, 0, width - paddleW);
}

function checkCollisions() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (bricks[r][c]) {
        let x = c * (brickW + brickPadding) + brickOffsetLeft;
        let y = r * (brickH + brickPadding) + brickOffsetTop;
        if (
          ballX > x &&
          ballX < x + brickW &&
          ballY - ballR < y + brickH &&
          ballY + ballR > y
        ) {
          ballDY *= -1;
          bricks[r][c] = false;
          score += 10;
          if (isWin()) {
            win = true;
          }
        }
      }
    }
  }
}

function isWin() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (bricks[r][c]) return false;
    }
  }
  return true;
}

function keyPressed() {
  if ((gameOver || win) && key === ' ') {
    setup();
  }
}
