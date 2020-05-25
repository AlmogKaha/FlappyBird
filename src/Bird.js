let y = 310;
let radius = 58;
let speed = 0;
let gravity = 10;
let jump = 54;
let rotate = 0;
let frame = 0;

let minBirdHeight = document.getElementById("game").offsetHeight -
    document.getElementById("floor").offsetHeight - document.getElementById("bird").offsetHeight;

const birds = [document.createElement("img"), document.createElement("img"),
    document.createElement("img"), document.createElement("img")];
birds[0].src = "img/hoogiUp.png";
birds[1].src = "img/hoogiCenter.png";
birds[2].src = "img/hoogiDown.png";
birds[3].src = "img/hoogiUp.png";

const updateBird = () => {
    speed += gravity;
    if(y + speed < minBirdHeight){
        y += speed;
    } else {
        y = minBirdHeight;
        gameOver();
    }
    if(speed > jump){
        rotate = 35;
    } else {
        rotate = -35;
    }
}

const flap = () => {
    speed = -jump;
}

const drawBird = () => {
    updateBird();
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

const resetBirdPosition = () => {
    y = 310;
    speed = 0;
    rotate = 0;
};
