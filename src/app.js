const drawPipesSpeed = 2000;
const getReadyState = 0;
const gameOverState = 2;

let gameState = getReadyState;
let drawBirdInterval;
let pipeInterval;
let pipesIntervals = [];

const startGame = () => {
    if (gameState === getReadyState) {
        removeElementById("startGame", "getReady");
    } else {
        removeElementById("gameOver");
        removeRemainingPipes();
    }

    resetBirdPosition();
    score = 0;
    setScore(score, scoreElement);

    drawBirdInterval = setInterval(drawBird, 100);
    pipeInterval = setInterval(drawPipes, drawPipesSpeed);
};

const gameOver = () => {
    clearScore();
    gameState = gameOverState;
    clearAllIntervals();

    let gameOverDiv = initGameOverDiv();
    gameBoard.appendChild(gameOverDiv);
};

const clearAllIntervals = () => {
    clearInterval(drawBirdInterval);
    clearInterval(pipeInterval);
    pipesIntervals.forEach(clearInterval);
}

const createResultsDiv = () => {
    let resultsImg = document.createElement('div');
    resultsImg.id = "scoreImg";

    resultsImg.appendChild(createScoreDiv('finalScore', score));
    resultsImg.appendChild(createScoreDiv('bestScore', bestScore));
    resultsImg.appendChild(getMedalByScore(score));

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

const removeElementById = (...ids) => {
    ids.forEach(arg => {
        let element = document.getElementById(arg);
        element.parentNode.removeChild(element);
    })
}

const initGameOverDiv = () => {
    let gameOverDiv = document.createElement('div');

    gameOverDiv.id = "gameOver";

    gameOverDiv.appendChild(createGameOverTitle());
    gameOverDiv.appendChild(createResultsDiv());
    gameOverDiv.appendChild(createStartButton());

    return gameOverDiv;
}