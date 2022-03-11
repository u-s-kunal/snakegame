
// Game Constants & Variables
let inputDir = { x: 0, y: 0 };


const foodSound = new Audio('eat .mp3');
const gameOverSound = new Audio('gameOver.mp3');
const moveSound = new Audio('movement.mp3');
const musicSound = new Audio('gameStart.mp3');
let speed = 1;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }


}


function gameEngine() {
    // Part 1: Updating the snake array & Food
    // if snake collide
    if (isCollide(snakeArr)) {
        score = 0;
        // speed = 14;
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("GAME OVER...!! Press Enter key to play again!");
        snakeArr = [{ x: 15, y: 15 }];
    }



    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiScoreVal) {
            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            hiScoreBox.innerHTML = "HiScore: " + hiScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 19;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

        //snake speed change with score

        // if (score > 4) {
        //     speed = (score-1)*0.5 ;
        // }
        // else if (score > 28) {
        //     speed = 14 ;
        // }

    }

    // // play pause buttons
    let pause = document.getElementById('pause').addEventListener('click', function () {
        speed = 0;
    });
    let play = document.getElementById('play').addEventListener('click', function () {

    speed =  Number.value;
    // speed = 14;

    });







    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }


    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
// musicSound.play();
let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
    let hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal))
}
else {
    hiScoreVal = JSON.parse(hiScore);
    hiScoreBox.innerHTML = "HiScore: " + hiScore;
}




window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Start the game
    moveSound.play();

    switch (e.key) {

        case "ArrowUp":



            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":



            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":



            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":



            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }


});


// music play and pause button

var musicBtn = document.getElementById('musicBtn');
btn = musicBtn.getElementsByClassName('.on');


musicBtn.onclick = function () {
    if (musicBtn.classList.toggle('off')) {
        musicSound.play();
    } else {
        musicSound.pause()
    }


}



// speed settings 

let Number = document.getElementById('Number');
let submitBtn = document.getElementById('submit');
let screenVal = '';


submitBtn.addEventListener ('click', (e) => {
    speed =  Number.value;

    console.log('value submitted');
    })
    









