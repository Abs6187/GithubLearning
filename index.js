const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
let turn = false;

function handleClick(e) {
    const cell = e.target;
    const currentClass = turn ? 'O' : 'X';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        alert(`${currentClass} wins!`);
        restartGame();
    } else if (isDraw()) {
        alert("Draw!");
        restartGame();
    }
    swapTurns();
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

function swapTurns() {
    turn = !turn;
}

function checkWin(currentClass) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);