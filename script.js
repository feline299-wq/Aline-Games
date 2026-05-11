// Monster Mayhem
// This project creates a 10x10 board of connected hexagons.
// The player moves the monster and collects crystals.

const rows = 10;
const cols = 10;

const hexWidth = 72;
const hexHeight = 82;

const horizontalSpacing = 54;
const verticalSpacing = 62;

let monsterPosition = {
  row: 4,
  col: 4
};

let selectedTile = null;

let score = 0;
let movesLeft = 15;
let gameOver = false;

const crystals = [
  { row: 1, col: 2, collected: false },
  { row: 6, col: 7, collected: false },
  { row: 8, col: 3, collected: false }
];

const board = document.getElementById("board");
const statusText = document.getElementById("status");
const scoreText = document.getElementById("score");
const movesText = document.getElementById("moves");

const tiles = [];

function createBoard() {
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

    checkCrystalCollection();
    checkGameResult();

    updateBoard();
    return;
  }

  selectedTile = clickedTile;
  statusText.textContent = `Selected row ${row + 1}, column ${col + 1}.`;
  updateBoard();
}

function checkCrystalCollection() {
  for (let i = 0; i < crystals.length; i++) {
    const crystal = crystals[i];

    if (
      !crystal.collected &&
      crystal.row === monsterPosition.row &&
      crystal.col === monsterPosition.col
    ) {
      crystal.collected = true;
      score++;
      statusText.textContent = "Crystal collected!";
      return;
    }
  }

  statusText.textContent = "Monster moved. Keep collecting crystals.";
}

function checkGameResult() {
  if (score === crystals.length) {
    gameOver = true;
    statusText.textContent = "You win! All crystals were collected.";
  } else if (movesLeft === 0) {
    gameOver = true;
    statusText.textContent = "Game over! You ran out of moves.";
  }
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

function updateBoard() {
  scoreText.textContent = `Score: ${score} / ${crystals.length}`;
  movesText.textContent = `Moves left: ${movesLeft}`;

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
        isNeighbour(selectedTile, currentTile)
      ) {
        tile.classList.add("path");
      }

      const crystal = findCrystal(row, col);
      if (crystal && !crystal.collected) {
        const crystalIcon = document.createElement("span");
        crystalIcon.classList.add("crystal");
        crystalIcon.textContent = "💎";
        tile.appendChild(crystalIcon);
      }

      if (monsterPosition.row === row && monsterPosition.col === col) {
        const monster = document.createElement("span");
        monster.classList.add("monster");
        monster.textContent = "👾";
        tile.appendChild(monster);
      }
    }
  }
}

function findCrystal(row, col) {
  for (let i = 0; i < crystals.length; i++) {
    if (crystals[i].row === row && crystals[i].col === col) {
      return crystals[i];
    }
  }

  return null;
}

createBoard();
