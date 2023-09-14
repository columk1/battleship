import './style.css'
import Game from './factories/game.js'

function init() {
  window.app = Controller(Game(), View())
}

const View = () => {
  const board1 = document.getElementById('board1')
  const board2 = document.getElementById('board2')

  const renderCell = (x, y, state) => {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.dataset.x = x
    cell.dataset.y = y
    if (typeof state === 'object' && state !== null) state = 'ship'
    cell.classList.add(state, 'cell')
    return cell
  }
  const renderBoard = (gameboard) => {
    const board = gameboard.getBoard()
    const grid = document.createElement('div')
    grid.classList.add('grid')
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = renderCell(i, j, board[i][j])
        grid.appendChild(cell)
      }
    }
    return grid
  }

  const renderBoards = (gameboard1, gameboard2) => {
    board1.appendChild(renderBoard(gameboard1))
    board2.appendChild(renderBoard(gameboard2))
  }

  return { renderBoards }
}

const Controller = (game, view) => {
  const renderGame = () => view.renderBoards(game.playerBoard, game.computerBoard)

  renderGame()

  return { renderGame }
}

init()
