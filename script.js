const makePlayer = function (name) {
  const placeMark = (input, row, column) =>
    gameboard.takeInput(input, row, column);
  return { name, placeMark };
};
const dom = (function () {
  const playBtn = document.querySelector(".play");
  const resetBtn = document.querySelector(".reset");
  const dialog = document.querySelector("dialog");
  const cancel = document.querySelector(".cancel");
  const rows = document.querySelectorAll(".rows");
  const confirm = document.querySelector(".confirm");
  const h1 = document.querySelector("h1");
  const oplayer = makePlayer("O");
  const xplayer = makePlayer("X");
  confirm.addEventListener("click", () => {
    oplayer.name = document.querySelector("#oplayer").value;
    xplayer.name = document.querySelector("#xplayer").value;
    resetBtn.addEventListener("click", () => {
      gameboard.clearBoard();
      document.querySelectorAll(".rows > div").forEach((v) => {
        v.textContent = "";
      });
      return;
    });
    dialog.close();

    rows.forEach((row, index) => {
      row.querySelectorAll("div").forEach((cell, i) =>
        cell.addEventListener("click", () => {
          cellClicked(cell, index, i, oplayer, xplayer, h1);
        })
      );
    });
  });
  playBtn.addEventListener("click", () => {
    dialog.show();
  });
  cancel.addEventListener("click", () => dialog.close());
  return { confirm };
})();

//
function cellClicked(cell, index, i, oplayer, xplayer, h1) {
  if (gameboard.getBoard()[index][i]) {
    return;
  }
  if (gameboard.currentMark) {
    oplayer.placeMark(true, index, i);
    cell.textContent = "O";
  } else {
    xplayer.placeMark(false, index, i);

    cell.textContent = "X";
  }
  if (gameboard.checkGameStatus() === "O") {
    h1.textContent = `${oplayer.name} wins`;
    h1.style.color = "#b04bb9";
  }
  if (gameboard.checkGameStatus() === "X") {
    h1.textContent = `${xplayer.name} wins`;
    h1.style.color = "#b04bb9";
  }
  if (gameboard.checkGameStatus() === "tie") {
    h1.textContent = "Tie";
    h1.style.color = "#b04bb9";
  } else {
    gameboard.currentMark = !gameboard.currentMark;
  }
}

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
  const checkGameStatus = () => {
    for (const r of rows) {
      if (r.every((v) => v === r[0] && v)) {
        return r[0];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        rows[0][i] === rows[1][i] &&
        rows[0][i] === rows[2][i] &&
        rows[0][i]
      ) {
        return rows[0][i];
      }
    }
    if (rows[0][0] === rows[1][1] && rows[0][0] === rows[2][2] && rows[0][0]) {
      return rows[0][0];
    } else if (
      rows[0][2] === rows[1][1] &&
      rows[0][2] === rows[2][0] &&
      rows[0][2]
    ) {
      return rows[0][0];
    } else if (rows.flat().every((v) => v)) return "tie";
    else return "ongoing";
  };
  const takeInput = (input, row, column) => {
    rows[row][column] = input ? "O" : "X";
  };
  const currentMark = true;
  return { clearBoard, getBoard, checkGameStatus, takeInput, currentMark };
})();
