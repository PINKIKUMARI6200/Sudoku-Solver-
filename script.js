const board = document.getElementById("board");

function createBoard() {
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.classList.add("cell");
    input.type = "number";
    input.min = 1;
    input.max = 9;
    board.appendChild(input);
  }
}

function getBoardValues() {
  const inputs = document.querySelectorAll(".cell");
  const grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      const value = inputs[i * 9 + j].value;
      grid[i][j] = value === "" ? 0 : parseInt(value);
    }
  }
  return grid;
}

function setBoardValues(grid) {
  const inputs = document.querySelectorAll(".cell");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      inputs[i * 9 + j].value = grid[i][j] === 0 ? "" : grid[i][j];
    }
  }
}

function isSafe(grid, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num)
      return false;
  }
  const startRow = row - row % 3;
  const startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num)
        return false;
    }
  }
  return true;
}

function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  const grid = getBoardValues();
  if (solve(grid)) {
    setBoardValues(grid);
    alert("🎉 Solved successfully!");
  } else {
    alert("❌ No solution exists.");
  }
}

function clearBoard() {
  const inputs = document.querySelectorAll(".cell");
  inputs.forEach(input => input.value = "");
}

createBoard();
