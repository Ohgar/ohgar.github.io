const leftPaddle = document.querySelector(`.LeftPaddle`);
const rightPaddle = document.querySelector(`.RightPaddle`);
const ball = document.querySelector(`.GameBall`);

document.addEventListener("mousemove", (e) => {
    let mouseY = e.clientY;

    const minLeftHeight = leftPaddle.offsetHeight / 2;
    const maxLeftHeight = window.innerHeight - minLeftHeight
    

    if (mouseY < minLeftHeight) {
        mouseY = minLeftHeight;
    }
    else if (mouseY > maxLeftHeight) {
        mouseY = maxLeftHeight;
    }
    
    leftPaddle.style.top = `${mouseY}px`;
});

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

window.addEventListener('resize', () => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
});

minRightHeight = rightPaddle.offsetHeight / 2;
maxRightHeight = canvasHeight - minRightHeight;

let rightYPos = canvasHeight / 2;
let rightDir = 1;
const rightSpeed = 3;

let lastTimestamp = performance.now();

function UpdateRightPaddle(timestamp) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    rightYPos += rightDir * rightSpeed;

    if (rightYPos <= minRightHeight || rightYPos >= maxRightHeight - 2) {
        rightDir *= -1;
    }

    rightPaddle.style.top = `${rightYPos}px`;

    requestAnimationFrame(UpdateRightPaddle);
}

let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballVelX = 5;
let ballVelY = 3;

const ballWidth = ball.offsetWidth;
const ballHeight = ball.offsetHeight;

const initLeftPaddleColor = leftPaddle.backgroundColor;
const initRightPaddleColor = rightPaddle.backgroundColor;
const onCollColor = 'beige';

let leftPaddleCollided = false;
let rightPaddleCollided = false;

function resetPaddleColors() {
    leftPaddle.style.backgroundColor = initLeftPaddleColor;
    rightPaddle.style.backgroundColor = initRightPaddleColor;
}

async function UpdateBall(timestamp) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    ballX += ballVelX;
    ballY += ballVelY;

    if (ballX < 0 || ballX > canvasWidth - 30) {
        ballVelX *= -1;
    }
    if (ballY < 0 || ballY > canvasHeight - 30) {
        ballVelY *= -1;
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(UpdateBall);
}

function checkOverlap(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

requestAnimationFrame(UpdateBall);
requestAnimationFrame(UpdateRightPaddle);