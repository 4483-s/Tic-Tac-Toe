const gameboard = (function () {
  const rows = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const clearBoard = () => {
    rows.splice(0);
    for (let i = 0; i < 3; i++) {
      rows.push(["", "", ""]);
    }
  };
  const getBoard = () => rows;
  const checkResult = () => {
    for (const r of rows) {
      if (r.every((v) => v === r[0] && v)) {
        return `${r[0]} wins`;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        rows[0][i] === rows[1][i] &&
        rows[0][i] === rows[2][i] &&
        rows[0][i]
      ) {
        return `${r[0][i]} wins`;
      }
    }
  };
  const takeInput = (input, row, column) => {
    rows[row - 1][column - 1] = input ? "O" : "X";
  };

  return { clearBoard, getBoard, checkResult, takeInput };
})();
