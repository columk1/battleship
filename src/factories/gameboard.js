import { randomCoordinates } from './helpers/helpers.js'
import Ship from './ship.js'

const Gameboard = () => {
  const SIZE = 10
  const SHIP_TYPES = [
    { type: 'Carrier', length: 5 },
    { type: 'Battleship', length: 4 },
    { type: 'Cruiser', length: 3 },
    { type: 'Submarine', length: 3 },
    { type: 'Destroyer', length: 2 },
  ]

  const fleet = SHIP_TYPES.map((ship) => Ship(ship.type, ship.length))
  const placedShips = []
  let statusMessage = ''

  // Create a grid
  let board = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(null))

  const getBoard = () => board
  const getFleet = () => fleet
  const getplacedShips = () => placedShips
  const getStatusMessage = () => statusMessage
  const getShipTypes = () => SHIP_TYPES

  const resetBoard = () => {
    board = board.map((row) => row.map((cell) => (cell = null)))
    placedShips.length = 0
  }
  const placeShip = (ship, x, y, isVertical) => {
    if (!isValidPlacement(ship, x, y, isVertical)) return 0

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = ship
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        board[x + i][y] = ship
      }
    }
    return placedShips.push(ship)
  }

  const autoPlaceShip = (ship) => {
    const [x, y] = randomCoordinates()
    const isVertical = Math.random() > 0.5
    const isPlaced = placeShip(ship, x, y, isVertical)
    if (!isPlaced) autoPlaceShip(ship)
  }

  const autoPlaceFleet = () => {
    resetBoard()
    fleet.forEach((ship) => autoPlaceShip(ship))
  }

  const isValidPlacement = (ship, x, y, isVertical) => {
    // Check if coordinates are valid
    if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return false

    // Check if ship fits
    if (isVertical) {
      if (y + ship.length > SIZE) return false
    } else {
      if (x + ship.length > SIZE) return false
    }

    // Check if ship overlaps another ship
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        if (board[x][y + i] !== null) return false
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (board[x + i][y] !== null) return false
      }
    }
    return true
  }

  const validTarget = ([x, y]) => x >= 0 && x < SIZE && y >= 0 && y < SIZE

  const getAdjacentCells = (x, y) => {
    const adjacentCells = [
      [x, y + 1],
      [x + 1, y],
      [x, y - 1],
      [x - 1, y],
    ]
    adjacentCells.map((cell) => {})
    return adjacentCells.filter((cell) => validTarget(cell))
  }

  // ? Potentially useful for a better auto-attack algorithm
  const getAdjacentHorizontalCells = (x, y) => {
    const adjacentCells = [
      [x + 1, y],
      [x - 1, y],
    ]
    return adjacentCells.filter((cell) => validTarget(cell))
  }

  const receiveAttack = (x, y) => {
    let target = board[x][y]
    if (target === null) {
      board[x][y] = 'miss'
      statusMessage = `[ Player's Turn ]`
      return { state: board[x][y] }
    } else {
      target.hit()
      board[x][y] = 'hit'
      statusMessage = `[ Player's Turn ]`
      if (target.isSunk()) statusMessage = `You sunk the enemy's ${target.type}!`
      return { state: board[x][y], isSunk: target.isSunk() }
    }
  }

  const allShipsSunk = () => placedShips.length > 0 && placedShips.every((ship) => ship.isSunk())

  return {
    getBoard,
    getFleet,
    getplacedShips,
    getStatusMessage,
    getShipTypes,
    placeShip,
    autoPlaceFleet,
    getAdjacentCells,
    receiveAttack,
    allShipsSunk,
  }
}
export default Gameboard
