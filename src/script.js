let state = 0;
let drawInterval;
let pipeInterval;
let pipesIntervals = [];
let score = 0;
let bestScore = 0;

const states = {0: "getReady", 2: "gameOver"};

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
       flap();
    }
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