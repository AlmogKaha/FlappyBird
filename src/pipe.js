const pipeFullHeight = 360;
const spaceBetweenPipes = 180;
const pipeBodyHeight = 320;

const drawPipes = () => {
    let upPipe = document.createElement("img");
    let downPipe = document.createElement("img");
    let upPipeTop = -(Math.floor(Math.random() * pipeBodyHeight));
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
    let rightPosition = 0;
    let id = setInterval(frame, 10);
    let downPipeHeight = gameBoard.offsetHeight - floorElement.offsetHeight - upPipeHeight - spaceBetweenPipes;
    pipesIntervals.push(id);

    function frame() {

        if(rightPosition === gameBoard.offsetWidth){
            clearInterval(id);
            upPipe.parentNode.removeChild(upPipe);
            downPipe.parentNode.removeChild(downPipe);
        } else if(checkPipeCollision(upPipe, upPipeHeight) || checkPipeCollision(downPipe, downPipeHeight)){
            gameOver();
        } else if(birdSucceededToPass(rightPosition)){
            increaseScore();
        }

        rightPosition++;
        upPipe.style.right = rightPosition + 'px';
        downPipe.style.right = rightPosition + 'px';
    }
}

const removeRemainingPipes = () => {
    let pipes = document.getElementsByClassName("pipe");

    Array.from(pipes).forEach(pipe => pipe.parentNode.removeChild(pipe));
};

const checkPipeCollision = (element, elementHeight) => {
    let pipe = element.getBoundingClientRect();
    let birdLocation = document.getElementById("bird").getBoundingClientRect();

    let distX = Math.abs(birdLocation.left - pipe.left - pipe.width/2);
    let distY = Math.abs((birdLocation.top) - pipe.top - elementHeight/2);

    let dx=distX-pipe.width/2;
    let dy=distY-elementHeight/2;

    return (dx*dx+dy*dy<=(birdRadius*birdRadius));
};

const birdSucceededToPass = position => (position === gameBoard.offsetWidth - document.getElementById("bird").offsetLeft + 1);
