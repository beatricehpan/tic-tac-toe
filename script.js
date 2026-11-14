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