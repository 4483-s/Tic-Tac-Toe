const makePlayer = function (name) {
  const placeMark = (input, row, column) =>
    gameboard.takeInput(input, row, column);
  return { name, placeMark };
};
const dom = (function () {
  const oRadio = document.querySelector("#o");
  const bar = document.querySelector(".bar");
  const playBtn = document.querySelector(".play");
  const resetBtn = document.createElement("button");
  const dialog = document.querySelector("dialog");
  const cancel = document.querySelector(".cancel");
  const rows = document.querySelectorAll(".rows");
  const confirm = document.querySelector(".confirm");
  const h1 = document.querySelector("h1");
  const oplayer = makePlayer("O");
  const xplayer = makePlayer("X");
  resetBtn.classList.add("reset");
  resetBtn.textContent = "Reset";
  confirm.addEventListener("click", () => {
    if (oRadio.checked) {
      gameboard.currentMark = true;
    } else {
      gameboard.currentMark = false;
    }
    bar.append(resetBtn);
    playBtn.remove();
    oplayer.name = document.querySelector("#oplayer").value;
    xplayer.name = document.querySelector("#xplayer").value;
    const showTurn = function () {
      if (!gameboard.isOngoing) {
        return;
      }
      if (gameboard.currentMark) {
        h1.textContent = `${oplayer.name}'s (O) turn`;
      } else {
        h1.textContent = `${xplayer.name}'s (X) turn`;
      }
    };
    showTurn();
    resetBtn.addEventListener("click", () => {
      h1.style.color = "#ffffff";
      gameboard.clearBoard();
      gameboard.isOngoing = true;
      showTurn();

      document.querySelectorAll(".rows > div").forEach((v) => {
        v.style.backgroundColor = "#1b1b1b";
        v.textContent = "";
      });
    });
    dialog.close();

    rows.forEach((row, index) => {
      row.querySelectorAll("div").forEach((cell, i) =>
        cell.addEventListener("click", () => {
          cellClicked(cell, index, i, oplayer, xplayer, h1);
          showTurn();
        })
      );
    });
  });
  playBtn.addEventListener("click", () => {
    dialog.show();
  });
  cancel.addEventListener("click", () => dialog.close());
  return { rows };
})();

//
function cellClicked(cell, index, i, oplayer, xplayer, h1) {
  if (gameboard.getBoard()[index][i] || !gameboard.isOngoing) {
    return;
  }
  if (gameboard.currentMark) {
    oplayer.placeMark(true, index, i);
    cell.textContent = "O";
    cell.style.color = "#75c4f8";
  } else {
    xplayer.placeMark(false, index, i);

    cell.textContent = "X";
    cell.style.color = "#fcde5a";
  }
  if (gameboard.checkGameStatus() === "O") {
    h1.textContent = `${oplayer.name} wins`;
    h1.style.color = "#01f801";
    gameboard.isOngoing = false;
  }
  if (gameboard.checkGameStatus() === "X") {
    h1.textContent = `${xplayer.name} wins`;
    h1.style.color = "#01f801";
    gameboard.isOngoing = false;
  }
  if (gameboard.checkGameStatus() === "tie") {
    h1.textContent = "Tie";
    h1.style.color = "#b04bb9";
    gameboard.isOngoing = false;
  } else {
    gameboard.currentMark = !gameboard.currentMark;
  }
}

const gameboard = (function () {
  const isOngoing = true;
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
    for (let i = 0; i < 3; i++) {
      if (rows[i].every((v) => v === rows[i][0] && v)) {
        dom.rows[i]
          .querySelectorAll("div")
          .forEach(
            (v) => (v.style.backgroundColor = "rgba(129, 245, 129, 0.4)")
          );
        return rows[i][0];
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        rows[0][i] === rows[1][i] &&
        rows[0][i] === rows[2][i] &&
        rows[0][i]
      ) {
        for (const row of dom.rows) {
          row.querySelectorAll("div")[i].style.backgroundColor =
            "rgba(129, 245, 129, 0.4)";
        }
        return rows[0][i];
      }
    }
    if (rows[0][0] === rows[1][1] && rows[0][0] === rows[2][2] && rows[0][0]) {
      for (let i = 0; i < 3; i++) {
        dom.rows[i].querySelectorAll("div")[i].style.backgroundColor =
          "rgba(129, 245, 129, 0.4)";
      }
      return rows[0][0];
    } else if (
      rows[0][2] === rows[1][1] &&
      rows[0][2] === rows[2][0] &&
      rows[0][2]
    ) {
      for (let i = 0, j = 2; i < 3; i++, j--) {
        dom.rows[i].querySelectorAll("div")[j].style.backgroundColor =
          "rgba(129, 245, 129, 0.4)";
      }
      return rows[0][0];
    } else if (rows.flat().every((v) => v)) return "tie";
    else return "ongoing";
  };
  const takeInput = (input, row, column) => {
    rows[row][column] = input ? "O" : "X";
  };
  const currentMark = true;
  return {
    clearBoard,
    getBoard,
    checkGameStatus,
    takeInput,
    currentMark,
    isOngoing,
  };
})();
