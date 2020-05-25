let state = 0;
let drawInterval;
let pipeInterval;
let pipesIntervals = [];
let score = 0;
let bestScore = 0;

const states = {0: "getReady", 2: "gameOver"};

const birds = [document.createElement("img"), document.createElement("img"),
            document.createElement("img"), document.createElement("img")];
birds[0].src = "img/hoogiUp.png";
birds[1].src = "img/hoogiCenter.png";
birds[2].src = "img/hoogiDown.png";
birds[3].src = "img/hoogiUp.png";

const bird = {
    y : 310,
    height : 60,
    radius : 58,
    speed : 0,
    gravity : 10,
    jump : 54,
    rotate : 0,
    update : function () {
        this.speed += this.gravity;
        if(this.y + this.speed < minBirdHeight){
            this.y += this.speed;
        } else {
            this.y = minBirdHeight;
            gameOver();
        }
        if(this.speed > this.jump){
            this.rotate = 35;
        } else {
            this.rotate = -35;
        }
    },
    flap : function () {
        this.speed = -this.jump;
    }
};

let minBirdHeight = document.getElementById("game").offsetHeight - document.getElementById("floor").offsetHeight - bird.height;

const startGame = () => {
    if (state === 0 || state === 2){
        resetBirdPosition();
        score = 0;
        setScore(score, document.getElementById("score"));
        removePreviousStateElement();
        let gameBoard = document.getElementById("game");
        gameBoard.onclick = startGame;
        drawInterval = setInterval(drawBird, 100);
        pipeInterval = setInterval(drawPipe, 2000);

        if(state === 2){
            removePipes();
        }
        state = 1;
    } else{
       bird.flap();
    }
};


const drawBird = () => {
    bird.update();
    let birdImage = document.getElementById('bird');
    birdImage.parentNode.removeChild(birdImage);
    let birdImg = birds[frame%4];
    birdImg.id = "bird";
    birdImg.style.top = bird.y +"px";
    birdImg.style.transform = `rotate(${bird.rotate}deg)`;
    let gameBoard = document.getElementById("game");
    gameBoard.appendChild(birdImg);
    frame++;
};

const gameOver = () => {
    clearScore();
    state = 2;
    clearAllIntervals();
    let gameOverDiv = document.createElement('div');
    gameOverDiv.id = "gameOver";
    gameOverDiv.appendChild(createGameOverTitle());
    gameOverDiv.appendChild(createResultsDiv());
    gameOverDiv.appendChild(createStartButton());
    let gameBoard = document.getElementById("game");
    gameBoard.onclick = null;
    gameBoard.appendChild(gameOverDiv);
};

const resetBirdPosition = () => {
    bird.y = 310;
    bird.speed = 0;
    bird.rotate = 0;
};

const drawPipe = () => {
    let upPipe = document.createElement("img");
    let downPipe = document.createElement("img");
    let pipeHeight = -(Math.floor(Math.random() * 320) + 0);
    upPipe.src = "img/upPipe.png";
    downPipe.src = "img/downPipe.png";
    upPipe.style.top = pipeHeight + "px";
    downPipe.style.top = pipeHeight + 540 + "px";
    upPipe.classList.add("pipe");
    downPipe.classList.add("pipe");
    move(upPipe, 360 + pipeHeight);
    move(downPipe, 860 + pipeHeight);
    let gameBoard = document.getElementById("game");
    gameBoard.appendChild(downPipe);
    gameBoard.appendChild(upPipe);
};

 const move = (element, elementHeight) => {
    let pos = 0;
    let id = setInterval(frame, 10);
    pipesIntervals.push(id);

    function frame() {
        if(pos === 420){

            clearInterval(id);

        } else if(checkPipeCollision(element, elementHeight)){

            gameOver();

        } else if(birdSucceededToPass(pos)){
            score++;
            clearScore();
            setScore(score, document.getElementById("score"));

        }
            pos++;
            element.style.right = pos + 'px';
    }
}

const removePipes = () => {
   let pipes = document.getElementsByClassName("pipe");

   while (pipes[0]){
       pipes[0].parentNode.removeChild(pipes[0]);
   }
};

const checkPipeCollision = (element, elementHeight) => {
    let pipe = element.getBoundingClientRect();
    let birdLocation = document.getElementById("bird").getBoundingClientRect();
    //let birdRadius = birdLocation.width / 2;
    //console.log(birdRadius);
    let distX = Math.abs(birdLocation.x - pipe.x-pipe.width/2);
    let distY = Math.abs((birdLocation.y- 56) - pipe.y-elementHeight/2);

    if (distX > (pipe.width/2 + bird.radius)) { return false; }
    if (distY > (elementHeight/2 + bird.radius)) { return false; }

    if (distX <= (pipe.width/2)) { return true; }
    if (distY <= (elementHeight/2)) { return true; }

    let dx=distX-pipe.width/2;
    let dy=distY-elementHeight/2;
    return (dx*dx+dy*dy<=(bird.radius*bird.radius));
};

const setScore = (score, scoreElement) => {

    if (score > bestScore){
        bestScore = score;
    }

    for (let index = 0; index < score.toString().length; index++){
        let scoreNumber = document.createElement("img");
        scoreNumber.src = `img/${score.toString()[index]}.png`;
        scoreNumber.className = "scoreImgs";
        scoreElement.appendChild(scoreNumber);
    }
}

const clearScore = () => {
    let score = document.getElementById("score");
    while (score.lastElementChild) {
        score.removeChild(score.lastElementChild);
    }
}

const birdSucceededToPass = (pos) => {
    return (pos === 420 - document.getElementById("bird").offsetLeft + 1);
}

const clearAllIntervals = () => {
    clearInterval(drawInterval);
    clearInterval(pipeInterval);
    pipesIntervals.forEach(clearInterval);
}

const createResultsDiv = () => {
    let resultsImg = document.createElement('div');
    resultsImg.id = "scoreImg";

    let finalScoreDiv = createScoreDiv('finalScore', score);
    resultsImg.appendChild(finalScoreDiv);

    let bestScoreDiv = createScoreDiv('bestScore', bestScore);
    resultsImg.appendChild(bestScoreDiv);

    resultsImg.appendChild(Medal.getMedalByScore(score));
    return resultsImg;
}

const createStartButton = () => {
    let startButtonImg = document.createElement('img');
    startButtonImg.src = "img/startButton.png";
    startButtonImg.width = 80;
    startButtonImg.onclick = startGame;
    return startButtonImg;
}

const createGameOverTitle = () => {
    let gameOverTitle = document.createElement('img');
    gameOverTitle.src = "img/gameOver.png";
    gameOverTitle.className = "gameOverTitle";
    return gameOverTitle;
}

const createScoreDiv = (scoreType, score) => {
    let scoreDiv = document.createElement('div');
    scoreDiv.id = scoreType;
    scoreDiv.className ='scoreDetails';
    setScore(score, scoreDiv);

    return scoreDiv;
}

const removePreviousStateElement = () => {
    let stateImg = document.getElementById(states[state]);
    stateImg.parentNode.removeChild(stateImg);
}