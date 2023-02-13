const statusDisplay = document.querySelector('.status');

let scorePlayer = document.querySelector('#scorePlayer')
let ties = document.querySelector('#ties')
let scoreComputer = document.querySelector('#scoreComputer')

let scoreP = 0;
let draws = 0;
let scoreC = 0;
let gameActive = true;

console.log("Fresh game")

var ello = Math.random()
console.log(ello)
let currentPlayer = ello < 0.5 ? "X" : "O"
if (currentPlayer === "X"){
    console.log("Players turn")
}else{
    console.log("Computers turn")
}

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    console.log("Switching current player")
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log("Current player is: " + currentPlayer)
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkWin() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            document.getElementById(winCondition[0]).style.backgroundColor = "rgb(251,100,204)";
            document.getElementById(winCondition[1]).style.backgroundColor = "rgb(251,100,204)";
            document.getElementById(winCondition[2]).style.backgroundColor = "rgb(251,100,204)";
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        console.log(currentPlayer + " Has won the game")
        if(currentPlayer === "X"){
            scoreP++;
            scorePlayer.innerHTML = `Player: ${scoreP}`
        }else{
            scoreC++
            scoreComputer.innerHTML = `Computer: ${scoreC}`
            console.log(scoreC)
        }
        return 1;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        console.log("Game has ended in a draw")
        statusDisplay.innerHTML = drawMessage();
        draws++
        ties.innerHTML = `Ties: ${draws}`
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return 2;
    }
}

function handleResultValidation() {

    checkWin()

    if (gameActive) {
        handlePlayerChange()
        statusDisplay.innerHTML = `Computer is thinking`
        setTimeout(() => {handleComputerMove()}, 1000)
    }
    if(checkWin == 1){
        if(currentPlayer == "X"){
            scoreP++;
            scorePlayer.innerHTML = `Player: ${scoreP}`
        }else{
            scoreC++
            scoreComputer.innerHTML = `Computer: ${scoreC}`
            console.log(scoreC)
        }
    }else if (checkWin == 2){
        draws++
        ties.innerHTML = `Ties: ${draws}`
    }

}

function handleComputerMove() {
    console.log("Computer is making move")
    pickMove()
    if (!checkWin())
        handlePlayerChange()
}

function pickMove() {

    while (true) {
        var m = Math.floor(Math.random()*9)

        if (gameState[m] == '')
            break
    }

    gameState[m] = currentPlayer

    document.getElementById(m).innerHTML = currentPlayer

}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

if (ello > .5){
    statusDisplay.innerHTML = `Computer is thinking`
    setTimeout(() => {handleComputerMove()}, 1000)
}

function handleRestartGame() {
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = "white")
    console.log("Game restarted")
    ello = Math.random()
    console.log(ello)
    currentPlayer = ello < 0.5 ? "X" : "O"
    if (currentPlayer === "X"){
        console.log("Players turn")
    }else{
        console.log("Computers turn")
    }
    if (ello > .5){
        statusDisplay.innerHTML = `Computer is thinking`
        setTimeout(() => {handleComputerMove()}, 1000)
    }
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);