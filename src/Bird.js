const startYPosition = 308;
const rotateAngle = 35;

let y = startYPosition;
let radius = 60;
let speed = 0;
let gravity = 10;
let jump = 54;
let rotate = 0;
let frame = 0;

let minBirdHeight = gameBoard.offsetHeight -
    floorElement.offsetHeight - document.getElementById("bird").offsetHeight;

const birdsImages = [document.createElement("img"), document.createElement("img"),
    document.createElement("img"), document.createElement("img")];
birdsImages[0].src = "img/hoogiUp.png";
birdsImages[1].src = "img/hoogiCenter.png";
birdsImages[2].src = "img/hoogiDown.png";
birdsImages[3].src = "img/hoogiUp.png";

const updateBird = () => {
    speed += gravity;
    if(y + speed < minBirdHeight){
        y += speed;
    } else {
        y = minBirdHeight;
        gameOver();
    }
    if(speed > jump){
        rotate = rotateAngle;
    } else {
        rotate = -rotateAngle;
    }
}

const flap = () => {
    speed = -jump;
}

const drawBird = () => {
    updateBird();
    removeElementById('bird');
    let birdImg = birdsImages[frame%4];
    birdImg.id = "bird";
    birdImg.style.top = y +"px";
    birdImg.style.transform = `rotate(${rotate}deg)`;
    gameBoard.appendChild(birdImg);
    frame++;
};

const resetBirdPosition = () => {
    y = startYPosition;
    speed = 0;
    rotate = 0;
};
