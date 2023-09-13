const Gameboard = () => {
  const SIZE = 10
  const ships = []
  const misses = []

  // Create a grid
  let board = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(null))

  const placeShip = (ship, x, y, isVertical) => {
    if (!isValidPlacement(ship, x, y, isVertical)) return 'Invalid placement'

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = ship
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        board[x + i][y] = ship
      }
    }
    return ships.push(ship)
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

  const getCell = (x, y) => (x < SIZE || y < SIZE ? undefined : board[x][y])

  const receiveAttack = (x, y) => {
    const target = board[x][y]
    if (target === null) {
      if (!misses.some((e) => e.x == x && e.y == y)) misses.push({ x, y })
    } else {
      target.hit()
    }
    return target
  }

  const allShipsSunk = () => ships.every((ship) => ship.isSunk())

  return {
    board,
    misses,
    placeShip,
    receiveAttack,
    allShipsSunk,
  }
}
export default Gameboard
