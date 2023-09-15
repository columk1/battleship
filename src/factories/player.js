import { randomCoordinates, randomCoordinatesParity } from './helpers/helpers.js'

const Player = () => {
  const attack = (x, y, enemyBoard) => enemyBoard.receiveAttack(x, y)
  let possibleAttacks = []
  let shipsSunk = []

  // const attack = (x, y, enemyBoard) => {
  //   const targetCell = enemyBoard.getBoard()[x][y]
  //   if (targetCell === 'miss' || targetCell === 'hit') {
  //     return false
  //   } else {
  //     enemyBoard.receiveAttack(x, y)
  //   }
  // }

  const autoAttack = (enemyBoard) => {
    let [x, y] = randomCoordinatesParity()

    if (possibleAttacks.length > 0) [x, y] = possibleAttacks.pop()

    const targetCell = enemyBoard.getBoard()[x][y]
    if (targetCell === 'miss' || targetCell === 'hit') {
      autoAttack(enemyBoard)
    } else {
      let attackResult = enemyBoard.receiveAttack(x, y) // -> { state: 'hit', isSunk: false }
      if (attackResult.state === 'hit') {
        if (!attackResult.isSunk) {
          shipsSunk.push(attackResult)
          possibleAttacks = [...possibleAttacks, ...enemyBoard.getAdjacentCells(x, y)]
        } else {
          possibleAttacks = []
        }
      }
      return attackResult.state // -> 'hit' || 'miss'
    }
  }

  const getParity = () => (shipsSunk.some((ship) => ship.length === 2) ? 2 : 3)

  return { attack, autoAttack }
}

export default Player
