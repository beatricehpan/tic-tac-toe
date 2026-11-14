const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMark = (index, mark) => {
        if (board[index] !== "") return false; // spot taken
        board[index] = mark;
        return true;
    };

    const reset = () => board.fill("");

    return { getBoard, placeMark, reset };
})();

function createPlayer(name, mark) {
    return { name, mark };
}

const GameController = (function () {
    const players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];
    let current = players[0];
    let gameOver = false;

    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    const checkWin = () => {
        const b = Gameboard.getBoard();
        return wins.some(([a, c, d]) => b[a] && b[a] === b[c] && b[a] === b[d]);
    };

    const checkTie = () => Gameboard.getBoard().every((cell) => cell !== "");

    const playRound = (index) => {
        if (gameOver) return "Game over! Restart to play again.";
        if (!Gameboard.placeMark(index, current.mark)) return "Spot taken!";

        if (checkWin()) { gameOver = true; return `${current.name} wins!`; }
        if (checkTie()) { gameOver = true; return "It's a tie!"; }

        current = current === players[0] ? players[1] : players[0];
        return `${current.name}'s turn`;
    };

    const getCurrent = () => current;

    const restart = () => {
        Gameboard.reset();
        current = players[0];
        gameOver = false;
    };

    return { playRound, getCurrent, restart };
})();

const DisplayController = (function () {
    const boardDiv = document.querySelector(".board");
    const turnDiv = document.querySelector(".turn");

    const updateScreen = (message) => {
        boardDiv.textContent = "";
        Gameboard.getBoard().forEach((cell, index) => {
            const btn = document.createElement("button");
            btn.classList.add("cell");
            btn.dataset.index = index;
            btn.textContent = cell;
            boardDiv.appendChild(btn);
        });
        turnDiv.textContent = message || `${GameController.getCurrent().name}'s turn`;
    };

    boardDiv.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (index === undefined) return;
        updateScreen(GameController.playRound(Number(index)));
    });

    updateScreen();
})();