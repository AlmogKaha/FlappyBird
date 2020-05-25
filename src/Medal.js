class Medal {
    constructor(minScore, maxScore, color) {
        this.minScore = minScore;
        this.color = color;
        this.maxScore = maxScore;
    }
    createMedalElement() {
        let medalElement = document.createElement("div");
        medalElement.className = "medal";
        medalElement.style.backgroundImage = `url('./img/${this.color}Medal.png')`;
        return medalElement;
    }
    static getAllMedals(){
        return [new Medal(0,19, 'white'), new Medal(20,49, 'bronze'),
            new Medal(50, 99, 'silver'), new Medal(100, 1000, 'gold')];
    }
    static getMedalByScore(score){
        let allMedals = this.getAllMedals();
        let medalIndex = allMedals.findIndex(medal => medal.minScore <= score && score <= medal.maxScore);
        return allMedals[medalIndex].createMedalElement();
    }
}