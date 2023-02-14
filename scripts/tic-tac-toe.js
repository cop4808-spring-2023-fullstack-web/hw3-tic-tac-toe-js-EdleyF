const statusDisplay = document.querySelector('.status');

// Variables for DOM manipulation (Scoreboard)
let scorePlayer = document.querySelector('#scorePlayer')
let ties = document.querySelector('#ties')
let scoreComputer = document.querySelector('#scoreComputer')

// Variables for score keeping
let scoreP = 0;
let draws = 0;
let scoreC = 0;

let gameActive = true;

console.log("Fresh game")

// The randomizing of who goes first
var ello = Math.random()
console.log(ello)
let currentPlayer = ello < 0.5 ? "X" : "O"
if (currentPlayer === "X"){
    console.log("Players turn")
}else{
    console.log("Computers turn")
}

// Gameboard being blank
let gameState = ["", "", "", "", "", "", "", "", ""];

// Messages that go into the status
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Put this here to say it's player X or computers turn after randomizing happens
statusDisplay.innerHTML = currentPlayerTurn();

// A compilation of all the winning spot combinations
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

// Handles the switching of markers for turn switch and changes the status
function handlePlayerChange() {
    console.log("Switching current player")
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log("Current player is: " + currentPlayer)
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Here we check after each move to see if one of the players has won or if game has resulted in a draw
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
            //Highlights the winning blocks
            document.getElementById(winCondition[0]).style.backgroundColor = "#967E76";
            document.getElementById(winCondition[1]).style.backgroundColor = "#967E76";
            document.getElementById(winCondition[2]).style.backgroundColor = "#967E76";
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        // Here we have the status and score updating after a win
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "#967E76";
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
        // Status and scoring update after a draw
        console.log("Game has ended in a draw")
        statusDisplay.innerHTML = drawMessage();
        draws++
        ties.innerHTML = `Ties: ${draws}`
        gameActive = false;
        statusDisplay.style.color = "#967E76";
        return 2;
    }
}

// Handles player swap if game is still active
function handleResultValidation() {

    checkWin()

    if (gameActive) {
        handlePlayerChange()
        //Custom message for computers turn
        statusDisplay.innerHTML = `Computer is thinking`
        // Gives the cumputer a delay to make it seem like it's thinking
        setTimeout(() => {handleComputerMove()}, 1000)
    }
}

// What makes the computer tick
function handleComputerMove() {
    console.log("Computer is making move")
    pickMove()
    if (!checkWin())
        handlePlayerChange()
}

// How the computer finds empty spots to go
function pickMove() {

    while (true) {
        var m = Math.floor(Math.random()*9)

        if (gameState[m] == '')
            break
    }

    gameState[m] = currentPlayer

    document.getElementById(m).innerHTML = currentPlayer

}

// Handles the players spot choice when they click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// What makes the computer go if it is chosen to go first with the randomizing uptop
if (ello > .5){
    statusDisplay.innerHTML = `Computer is thinking`
    setTimeout(() => {handleComputerMove()}, 1000)
}

// Wipes the board to have a rematch
function handleRestartGame() {
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = "white")
    console.log("Game restarted")
    // Makes it randomize who goes first and makes computer go if it's chosen
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