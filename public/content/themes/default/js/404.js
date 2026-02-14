// Define the size of the puzzle grid (e.g., 3x3)
const gridSize = 3;
const tileSize = 100; // Size of each tile in pixels
const imageSrc = 'puzzle_image.jpg'; // Path to the puzzle image

// Function to create a shuffled array of tile positions
function createShuffledPositions() {
  const positions = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    positions.push(i);
  }
  return positions.sort(() => Math.random() - 0.5);
}

// Function to create the puzzle grid
function createPuzzleGrid() {
  const puzzleContainer = document.querySelector('.puzzle-container');
  puzzleContainer.style.width = `${gridSize * tileSize}px`;
  puzzleContainer.style.height = `${gridSize * tileSize}px`;

  const positions = createShuffledPositions();
  positions.forEach((position, index) => {
    const tile = document.createElement('div');
    const x = (position % gridSize) * tileSize;
    const y = Math.floor(position / gridSize) * tileSize;
    tile.classList.add('tile');
    tile.style.width = `${tileSize}px`;
    tile.style.height = `${tileSize}px`;
    tile.style.backgroundImage = `url(${imageSrc})`;
    tile.style.backgroundPosition = `-${x}px -${y}px`;
    tile.style.left = `${(index % gridSize) * tileSize}px`;
    tile.style.top = `${Math.floor(index / gridSize) * tileSize}px`;
    puzzleContainer.appendChild(tile);
  });
}

// Function to check if the puzzle is solved
function isPuzzleSolved() {
  const tiles = document.querySelectorAll('.tile');
  const positions = Array.from(tiles).map(tile => {
    const x = parseInt(tile.style.left) / tileSize;
    const y = parseInt(tile.style.top) / tileSize;
    return y * gridSize + x;
  });
  return positions.every((position, index) => position === index);
}

// Function to initialize the puzzle game
function initPuzzleGame() {
  createPuzzleGrid();
  const puzzleContainer = document.querySelector('.puzzle-container');
  puzzleContainer.addEventListener('click', handleTileClick);
}

// Function to handle tile click events
function handleTileClick(event) {
  const tile = event.target;
  const emptyTile = document.querySelector('.empty');
  const tilePosition = parseInt(tile.style.top) / tileSize * gridSize + parseInt(tile.style.left) / tileSize;
  const emptyTilePosition = parseInt(emptyTile.style.top) / tileSize * gridSize + parseInt(emptyTile.style.left) / tileSize;
  if (Math.abs(tilePosition - emptyTilePosition) === 1 || Math.abs(tilePosition - emptyTilePosition) === gridSize) {
    swapTiles(tile, emptyTile);
    if (isPuzzleSolved()) {
      alert('Congratulations! You solved the puzzle!');
    }
  }
}

// Function to swap positions of two tiles
function swapTiles(tile1, tile2) {
  const tempTop = tile1.style.top;
  const tempLeft = tile1.style.left;
  tile1.style.top = tile2.style.top;
  tile1.style.left = tile2.style.left;
  tile2.style.top = tempTop;
  tile2.style.left = tempLeft;
}

// Call the initPuzzleGame function when the page loads
document.addEventListener('DOMContentLoaded', initPuzzleGame);

// Optional: Add event listener to retry button
const retryButton = document.getElementById('retryButton');
retryButton.addEventListener('click', initPuzzleGame);
