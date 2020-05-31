const setScore = (score, scoreElement) => {

    if (score > bestScore) {
        bestScore = score;
    }

    for (let index = 0; index < score.toString().length; index++) {
        scoreElement.appendChild(createScoreNumber(score.toString()[index]));
    }
}

const createScoreNumber = (number) => {
    let scoreNumber = document.createElement("img");
    scoreNumber.src = `img/${number}.png`;
    scoreNumber.className = "scoreImgs";

    return scoreNumber;
}

const clearScore = () => {
    while (scoreElement.lastElementChild) {
        scoreElement.removeChild(scoreElement.lastElementChild);
    }
}

const createScoreDiv = (scoreType, score) => {
    let scoreDiv = document.createElement('div');

    scoreDiv.id = scoreType;
    scoreDiv.className = 'scoreDetails';
    setScore(score, scoreDiv);

    return scoreDiv;
}

const increaseScore = () => {
    score++;
    clearScore();
    setScore(score, document.getElementById("score"));
}