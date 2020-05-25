const drawPipe = () => {
    let upPipe = document.createElement("img");
    let downPipe = document.createElement("img");
    let pipeHeight = -(Math.floor(Math.random() * 320));
    upPipe.src = "img/upPipe.png";
    downPipe.src = "img/downPipe.png";
    upPipe.style.top = pipeHeight + "px";
    downPipe.style.top = pipeHeight + 540 + "px";
    upPipe.classList.add("pipe");
    downPipe.classList.add("pipe");
    movePipe(upPipe, 360 + pipeHeight);
    movePipe(downPipe, 860 + pipeHeight);
    let gameBoard = document.getElementById("game");
    gameBoard.appendChild(downPipe);
    gameBoard.appendChild(upPipe);
};

const movePipe = (element, elementHeight) => {
    let position = 0;
    let id = setInterval(frame, 10);
    pipesIntervals.push(id);

    function frame() {
        if(position === 420){

            clearInterval(id);

        } else if(checkPipeCollision(element, elementHeight)){

            gameOver();

        } else if(birdSucceededToPass(position)){
            score++;
            clearScore();
            setScore(score, document.getElementById("score"));

        }
        position++;
        element.style.right = position + 'px';
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

    let distX = Math.abs(birdLocation.x - pipe.x-pipe.width/2);
    let distY = Math.abs((birdLocation.y- 56) - pipe.y-elementHeight/2);

    if (distX > (pipe.width/2 + radius)) { return false; }
    if (distY > (elementHeight/2 + radius)) { return false; }

    if (distX <= (pipe.width/2)) { return true; }
    if (distY <= (elementHeight/2)) { return true; }

    let dx=distX-pipe.width/2;
    let dy=distY-elementHeight/2;
    return (dx*dx+dy*dy<=(radius*radius));
};