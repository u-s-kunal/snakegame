
import{update as updateSnake, draw as drawSnake, snakeSpeed,food} from "/snake.js"
let lastRenderTime = 0;

const gameBoard = document.getElementById('board')
function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / snakeSpeed) return;
    lastRenderTime = currentTime 
    update()
    draw()
    // console.log("render");
}

window.requestAnimationFrame(main);


// update funtion

function update() {
    updateSnake()
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    
}


