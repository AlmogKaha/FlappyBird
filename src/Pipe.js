const pipeFullHeight = 360;
const spaceBetweenPipes = 180;

const drawPipe = () => {
    let upPipe = document.createElement("img");
    let downPipe = document.createElement("img");
    let upPipeTop = -(Math.floor(Math.random() * 320));
    let downPipeTop = upPipeTop + pipeFullHeight + spaceBetweenPipes;
    upPipe.src = "img/upPipe.png";
    downPipe.src = "img/downPipe.png";
    upPipe.style.top = upPipeTop + "px";
    downPipe.style.top = downPipeTop + "px";
    upPipe.classList.add("pipe");
    downPipe.classList.add("pipe");

    movePipes(upPipe, downPipe, pipeFullHeight + upPipeTop);

    gameBoard.appendChild(downPipe);
    gameBoard.appendChild(upPipe);
};

const movePipes = (upPipe, downPipe, upPipeHeight) => {
    let position = 0;
    let id = setInterval(frame, 10);
    let downPipeHeight = gameBoard.offsetHeight - floorElement.offsetHeight - upPipeHeight - spaceBetweenPipes;
    pipesIntervals.push(id);

    function frame() {
        if(position === 420){
            clearInterval(id);
            upPipe.parentNode.removeChild(upPipe);
            downPipe.parentNode.removeChild(downPipe);
        } else if(checkPipeCollision(upPipe, upPipeHeight) || checkPipeCollision(downPipe, downPipeHeight)){
            gameOver();
        } else if(birdSucceededToPass(position)){
            score++;
            clearScore();
            setScore(score, document.getElementById("score"));
        }

        position++;
        upPipe.style.right = position + 'px';
        downPipe.style.right = position + 'px';
    }
}

const removeRemainingPipes = () => {
    let pipes = document.getElementsByClassName("pipe");

    while (pipes[0]){
        pipes[0].parentNode.removeChild(pipes[0]);
    }
};

const checkPipeCollision = (element, elementHeight) => {
    let pipe = element.getBoundingClientRect();
    let birdLocation = document.getElementById("bird").getBoundingClientRect();

    let distX = Math.abs(birdLocation.left - pipe.left - pipe.width/2);
    let distY = Math.abs((birdLocation.top- 28) - pipe.top - elementHeight/2);

    if (distX > (pipe.width/2 + radius)) { return false; }
    if (distY > (elementHeight/2 + radius)) { return false; }

    if (distX <= (pipe.width/2)) { return true; }
    if (distY <= (elementHeight/2)) { return true; }

    let dx=distX-pipe.width/2;
    let dy=distY-elementHeight/2;

    return (dx*dx+dy*dy<=(radius*radius));
};

const birdSucceededToPass = (position) => (position === 420 - document.getElementById("bird").offsetLeft + 1);