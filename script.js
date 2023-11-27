document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.board');
  const status = document.querySelector('.status');
  const restartBtn = document.querySelector('.restart-btn');
  const popup = document.querySelector('.popup');
  const popupMessage = document.querySelector('.popup-message');
  const closeBtn = document.querySelector('.popup-close-btn');

  let currentPlayer = 'X';
  let gameActive = true;
  let gameState = ['', '', '', '', '', '', '', '', ''];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWin = () => {
    return winningConditions.some(condition => {
      return condition.every(index => {
        return gameState[index] === currentPlayer;
      });
    });
  };

  const checkDraw = () => {
    return gameState.every(cell => cell !== '');
  };

  const showPopup = message => {
    popupMessage.textContent = message;
    popup.style.display = 'flex';
  };

  const closePopup = () => {
    popup.style.display = 'none';
  };

  const handleCellClick = (clickedCell, cellIndex) => {
    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    const won = checkWin();
    const draw = checkDraw();

    if (won || draw) {
      gameActive = false;
      if (won) {
        showPopup(`Player ${currentPlayer} won!`);
      } else {
        showPopup("It's a draw!");
      }
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Current player: ${currentPlayer}`;
  };

  const handleRestart = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Current player: ${currentPlayer}`;
    document.querySelectorAll('.cell').forEach(cell => {
      cell.textContent = '';
    });
    popup.style.display = 'none';
  };

  board.addEventListener('click', e => {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell'));

    if (gameState[cellIndex] !== '' || !gameActive) return;

    handleCellClick(clickedCell, cellIndex);
  });

  restartBtn.addEventListener('click', handleRestart);
  closeBtn.addEventListener('click', closePopup);
});
