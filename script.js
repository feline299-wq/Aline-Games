// Monster Mayhem
// Simple browser game using HTML, CSS and JavaScript.
// The player moves the monster around a hexagon board and collects crystals.

const rows = 10;
const cols = 10;

const hexWidth = 72;
const horizontalSpacing = 54;
const verticalSpacing = 62;

let monsterPosition = {
  row: 4,
  col: 4
};

let selectedTile = null;

let score = 0;
let movesLeft = 10;
let gameOver = false;

const board = document.getElementById("board");
const statusText = document.getElementById("status");
const scoreText = document.getElementById("score");
const movesText = document.getElementById("moves");

const tiles = [];

// Several crystals are placed on the board.
// The player scores points by moving the monster onto them.
let crystals = [
  { row: 1, col: 1 },
  { row: 2, col: 6 },
  { row: 5, col: 2 },
  { row: 6, col: 7 },
  { row: 8, col: 4 }
];

function createBoard() {
  board.innerHTML = "";

  for (let row = 0; row < rows; row++) {
    tiles[row] = [];

    for (let col = 0; col < cols; col++) {
      const hex = document.createElement("div");

      hex.classList.add("hex");
      hex.dataset.row = row;
      hex.dataset.col = col;
      hex.setAttribute("aria-label", `Hexagon row ${row + 1}, column ${col + 1}`);

      const offsetX = row % 2 === 0 ? 0 : hexWidth / 2;

      const x = col * horizontalSpacing + offsetX + 20;
      const y = row * verticalSpacing + 20;

      hex.style.left = `${x}px`;
      hex.style.top = `${y}px`;

      hex.addEventListener("click", function () {
        handleTileClick(row, col);
      });

      board.appendChild(hex);
      tiles[row][col] = hex;
    }
  }

  updateBoard();
}

function handleTileClick(row, col) {
  if (gameOver) {
    statusText.textContent = "Game over. Refresh the page to play again.";
    return;
  }

  const clickedTile = { row, col };

  if (
    selectedTile &&
    selectedTile.row === row &&
    selectedTile.col === col
  ) {
    selectedTile = null;
    statusText.textContent = "Tile deselected. Click the monster tile to see possible moves.";
    updateBoard();
    return;
  }

  if (selectedTile && isNeighbour(selectedTile, clickedTile)) {
    monsterPosition = clickedTile;
    selectedTile = clickedTile;

    movesLeft--;
    movesText.textContent = movesLeft;

    checkCrystalCollection();

    if (movesLeft === 0) {
      gameOver = true;
      statusText.textContent = `No more moves left! Final score: ${score}.`;
    } else if (crystals.length === 0) {
      gameOver = true;
      statusText.textContent = `You collected every crystal! Final score: ${score}.`;
    } else {
      statusText.textContent = `Monster moved. Score: ${score}.`;
    }

    updateBoard();
    return;
  }

  selectedTile = clickedTile;
  statusText.textContent = `Selected row ${row + 1}, column ${col + 1}.`;
  updateBoard();
}

function isNeighbour(tileA, tileB) {
  const rowDifference = tileB.row - tileA.row;
  const colDifference = tileB.col - tileA.col;

  if (rowDifference === 0 && Math.abs(colDifference) === 1) {
    return true;
  }

  if (tileA.row % 2 === 0) {
    return (
      (rowDifference === -1 && (colDifference === -1 || colDifference === 0)) ||
      (rowDifference === 1 && (colDifference === -1 || colDifference === 0))
    );
  }

  return (
    (rowDifference === -1 && (colDifference === 0 || colDifference === 1)) ||
    (rowDifference === 1 && (colDifference === 0 || colDifference === 1))
  );
}

function checkCrystalCollection() {
  const crystalIndex = crystals.findIndex(function (crystal) {
    return (
      crystal.row === monsterPosition.row &&
      crystal.col === monsterPosition.col
    );
  });

  if (crystalIndex !== -1) {
    crystals.splice(crystalIndex, 1);
    score++;
    scoreText.textContent = score;
    statusText.textContent = `Crystal collected. Score: ${score}.`;
  }
}

function updateBoard() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tile = tiles[row][col];

      tile.classList.remove("selected", "path");
      tile.innerHTML = "";

      const currentTile = { row, col };

      if (
        selectedTile &&
        selectedTile.row === row &&
        selectedTile.col === col
      ) {
        tile.classList.add("selected");
      }

      if (
        selectedTile &&
        selectedTile.row === monsterPosition.row &&
        selectedTile.col === monsterPosition.col &&
        isNeighbour(selectedTile, currentTile) &&
        !gameOver
      ) {
        tile.classList.add("path");
      }

      const hasCrystal = crystals.some(function (crystal) {
        return crystal.row === row && crystal.col === col;
      });

      if (hasCrystal) {
        const crystal = document.createElement("span");
        crystal.classList.add("crystal");
        crystal.textContent = "💎";
        tile.appendChild(crystal);
      }

      if (monsterPosition.row === row && monsterPosition.col === col) {
        const monster = document.createElement("span");
        monster.classList.add("monster");
        monster.textContent = "👻";
        tile.appendChild(monster);
      }
    }
  }
}

createBoard();
