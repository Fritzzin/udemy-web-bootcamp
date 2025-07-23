const btnPlayerOne = document.querySelector("#btnPlayerOne");
const btnPlayerTwo = document.querySelector("#btnPlayerTwo");
const btnReset = document.querySelector("#btnReset");

const playerOne = document.querySelector("#playerOne");
const playerTwo = document.querySelector("#playerTwo");

const listScores = document.querySelector("#maximumScore");

let scorePlayerOne = 0;
let scorePlayerTwo = 0;
let maximumScore = 5;

listScores.addEventListener("change", () => {
    maximumScore = listScores.options[listScores.selectedIndex].text;
    resetScores();
});

btnPlayerOne.addEventListener("click", () => {
    scorePlayerOne += 1;
    playerOne.innerText = scorePlayerOne;
    checkEndGame(scorePlayerOne);
});

btnPlayerTwo.addEventListener("click", () => {
    scorePlayerTwo += 1;
    playerTwo.innerText = scorePlayerTwo;
    checkEndGame(scorePlayerTwo);
});

btnReset.addEventListener("click", () => {
    resetScores();
});

function resetScores() {
    scorePlayerOne = 0;
    scorePlayerTwo = 0;
    btnPlayerOne.removeAttribute("disabled", "");
    btnPlayerTwo.removeAttribute("disabled", "");
    resetPlayers(playerOne);
    resetPlayers(playerTwo);
}

function resetPlayers(player) {
    player.innerText = "0";
    player.classList.remove("winner");
    player.classList.remove("loser");
}

function checkEndGame(score) {
    if (score == maximumScore) {
        console.log("game is over");
        btnPlayerOne.setAttribute("disabled", "");
        btnPlayerTwo.setAttribute("disabled", "");

        if (scorePlayerOne == maximumScore) {
            playerOne.classList.add("winner");
            playerTwo.classList.add("loser");
        } else {
            playerOne.classList.add("loser");
            playerTwo.classList.add("winner");
        }
    }
}
