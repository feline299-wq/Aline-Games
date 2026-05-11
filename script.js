// Monster Mayhem
// This project creates a 10x10 board of connected hexagons.
// The user can select/deselect hexagons and move a monster to nearby tiles.

// Board size from the CA brief
const rows = 10;
const cols = 10;

// Hexagon measurements.
// These are used to calculate where each hexagon should be placed.
const hexWidth = 72;
const hexHeight = 82;

// Horizontal and vertical spacing.
// The values are smaller than the full width/height so the hexagons touch.
const horizontalSpacing = 54;
const verticalSpacing = 62;

// Starting position of the monster
let monsterPosition = {
  row: 4,
  col: 4
};

// Stores the currently selected tile.
// null means nothing is selected.
let selectedTile = null;

const board = document.getElementById("board");
const statusText = document.getElementById("status");

// This array stores all tile elements so we can update them later.
const tiles = [];

// Create the full 10x10 grid
function createBoard() {
  for (let row = 0; row < rows; row++) {
    tiles[row] = [];

    for (let col = 0; col < cols; col++) {
      const hex = document.createElement("div");

      hex.classList.add("hex");
      hex.dataset.row = row;
      hex.dataset.col = col;
      hex.setAttribute("aria-label", `Hexagon row ${row + 1}, column ${col + 1}`);

      // Odd rows are moved slightly to the right.
      // This creates the connected hexagon grid pattern.
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

// Handles selecting, deselecting and moving the monster
function handleTileClick(row, col) {
  const clickedTile = { row, col };

  // If the clicked tile is already selected, deselect it.
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

  // If a movement tile is clicked, move the monster.
  if (selectedTile && isNeighbour(selectedTile, clickedTile)) {
    monsterPosition = clickedTile;
    selectedTile = clickedTile;
    statusText.textContent = `Monster moved to row ${row + 1}, column ${col + 1}.`;
    updateBoard();
    return;
  }

  // Otherwise select the clicked tile.
  selectedTile = clickedTile;
  statusText.textContent = `Selected row ${row + 1}, column ${col + 1}.`;
  updateBoard();
}

// Checks whether a tile is next to another tile.
// Hexagon grids have different neighbours depending on whether the row is even or odd.
function isNeighbour(tileA, tileB) {
  const rowDifference = tileB.row - tileA.row;
  const colDifference = tileB.col - tileA.col;

  // Same row: left or right
  if (rowDifference === 0 && Math.abs(colDifference) === 1) {
    return true;
  }

  // Even row diagonal neighbours
  if (tileA.row % 2 === 0) {
    return (
      (rowDifference === -1 && (colDifference === -1 || colDifference === 0)) ||
      (rowDifference === 1 && (colDifference === -1 || colDifference === 0))
    );
  }

  // Odd row diagonal neighbours
  return (
    (rowDifference === -1 && (colDifference === 0 || colDifference === 1)) ||
    (rowDifference === 1 && (colDifference === 0 || colDifference === 1))
  );
}

// Updates colours, selected tile, possible path and monster position
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

      // Show possible movement tiles only when the monster tile is selected.
      if (
        selectedTile &&
        selectedTile.row === monsterPosition.row &&
        selectedTile.col === monsterPosition.col &&
        isNeighbour(selectedTile, currentTile)
      ) {
        tile.classList.add("path");
      }

      // Add the monster icon
      if (monsterPosition.row === row && monsterPosition.col === col) {
        const monster = document.createElement("span");
        monster.classList.add("monster");
       monster.textContent = "👹";
        tile.appendChild(monster);
      }
    }
  }
}

createBoard();
