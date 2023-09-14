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
  const renderGrid = (gameboard) => {
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

  const renderBoard2 = (gameboard) => {
    board2.innerHTML = ''
    board2.appendChild(renderGrid(gameboard))
  }

  const renderBoards = (gameboard1, gameboard2) => {
    board1.innerHTML = ''
    board2.innerHTML = ''
    board1.appendChild(renderGrid(gameboard1))
    board2.appendChild(renderGrid(gameboard2))
  }

  // callback is the game.nextTurn function passed in by the Controller
  const addGridListeners = (gameboard1, gameboard2, callback) => {
    // Add listeners to computer's board
    const cells = document.querySelectorAll('#board2 .cell')
    cells.forEach((cell) => {
      cell.addEventListener('click', async (e) => {
        if (e.target.classList.contains('miss') || e.target.classList.contains('hit')) return
        const x = e.target.dataset.x
        const y = e.target.dataset.y
        gameboard2.receiveAttack(x, y)
        renderBoards(gameboard1, gameboard2)
        // Process computer's turn and wait for timeout to complete before re-rendering
        await callback()
        renderBoards(gameboard1, gameboard2)
        addGridListeners(gameboard1, gameboard2, callback)
      })
    })
  }
  return { renderBoards, addGridListeners }
}

const Controller = (game, view) => {
  const renderGame = () => view.renderBoards(game.playerBoard, game.computerBoard)
  const startGame = () => game.startGame()

  renderGame()
  view.addGridListeners(game.playerBoard, game.computerBoard, game.nextTurn)

  return { renderGame, startGame }
}

init()
