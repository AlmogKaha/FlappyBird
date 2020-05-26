const medalUpgrade = 20;

let medals = [{color:"white", minScore: 0},
              {color:"bronze", minScore: medalUpgrade},
              {color:"silver", minScore: 2 * medalUpgrade},
              {color:"gold", minScore: 3 * medalUpgrade}];

const createMedalElement = (medal) => {
    let medalElement = document.createElement("div");

    medalElement.className = "medal";
    medalElement.style.backgroundImage = `url('./img/${medal.color}Medal.png')`;

    return medalElement;
}

const getMedalByScore = (score) => {
    let medalIndex = medals.findIndex(medal => medal.minScore > score);

    if (medalIndex === -1){
        medalIndex = medals.length;
    }

    return createMedalElement(medals[medalIndex - 1]);
}

