// Game state...
// Each value gets replaced with the "id" of each player when they
// play their moves.
let newGameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let gameState = [...newGameState];
let isPlayable = true;

// A list of zero-based indexes "3 in a row" winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

enum Player {
  P1 = 1,
  P2 = 2,
}

let currentPlayer = Player.P1;
const statusText = document.querySelector(".status");
statusText.innerHTML = currentStatusText();

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", onCellClick));
document.querySelector(".restart").addEventListener("click", restartGame);

// Plays the turn when a cell is clicked
// Checks to see if the game has been won or a drawn and ends the game
// or continues by assigning the next player
function playTurn(playedCell: HTMLElement, playedCellIndex: number) {
  // Update the game state with the turn
  gameState[playedCellIndex] = currentPlayer;
  // Display the turn on the grid with an X or O
  playedCell.innerHTML = currentPlayer === Player.P1 ? "X" : "O";

  // Check winning conditions
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];
    if (a === 0 || b === 0 || c === 0) {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  // If the game is won, end the game and return early
  // In NFT land... make it look nice for the winner
  if (roundWon) {
    statusText.innerHTML = `Pamp it to ${playerName(currentPlayer)}!`;
    isPlayable = false;
    return;
  }

  // If it's a draw, end the game and return early
  // In NFT land... burn the token and update the image to show a draw
  const isDraw = !gameState.includes(0);
  if (isDraw) {
    statusText.innerHTML = `It's a draw… burn it down!`;
    isPlayable = false;
    return;
  }

  // Change to the next player
  // In NFT land... send it back to the other player with new game state
  currentPlayer = currentPlayer === Player.P1 ? Player.P2 : Player.P1;
  statusText.innerHTML = currentStatusText();
}

function onCellClick(this: HTMLElement) {
  const playedCell = this;
  const playedCellIndex = parseInt(playedCell.getAttribute("data-cell-index"));
  // Don't do anything if the cell has been played or the game is over
  if (gameState[playedCellIndex] !== 0 || !isPlayable) {
    return;
  }
  // Play the turn
  playTurn(playedCell, playedCellIndex);
}

function restartGame() {
  isPlayable = true;
  gameState = [...newGameState];
  currentPlayer = Player.P1;
  statusText.innerHTML = currentStatusText();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

function playerName(player: Player) {
  return `Player ${player}`;
}

function currentStatusText() {
  return `It's ${playerName(currentPlayer)}'s turn`;
}
