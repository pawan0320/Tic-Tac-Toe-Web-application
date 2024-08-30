const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
const twoPlayerModeButton = document.getElementById('twoPlayerMode');
const aiModeButton = document.getElementById('aiMode');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameOver = false;
let isAiMode = false;

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] || isGameOver) return;

    placeMark(cell, cellIndex);

    if (checkWin(currentPlayer)) {
        statusText.innerText = `${currentPlayer} Wins!`;
        isGameOver = true;
    } else if (board.every(cell => cell)) {
        statusText.innerText = `It's a Tie!`;
        isGameOver = true;
    } else {
        swapTurns();
        if (isAiMode && currentPlayer === 'O' && !isGameOver) {
            setTimeout(aiMove, 500); // AI makes a move after a short delay
        }
    }
}

function placeMark(cell, index) {
    board[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.innerText = currentPlayer;
}

function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `${currentPlayer}'s Turn`;
}

function aiMove() {
    let emptyCells = board.map((val, index) => val === null ? index : null).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    placeMark(cells[randomIndex], randomIndex);

    if (checkWin(currentPlayer)) {
        statusText.innerText = `${currentPlayer} Wins!`;
        isGameOver = true;
    } else if (board.every(cell => cell)) {
        statusText.innerText = `It's a Tie!`;
        isGameOver = true;
    } else {
        swapTurns();
    }
}

function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function restartGame() {
    board = Array(9).fill(null);
    isGameOver = false;
    currentPlayer = 'X';
    statusText.innerText = `${currentPlayer}'s Turn`;

    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.innerText = '';
    });
}

function setMode(aiMode) {
    isAiMode = aiMode;
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
twoPlayerModeButton.addEventListener('click', () => setMode(false));
aiModeButton.addEventListener('click', () => setMode(true));