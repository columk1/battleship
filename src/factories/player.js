import { randomCoordinates, randomCoordinatesParity } from './helpers/helpers.js'

const Player = () => {
  const attack = (x, y, enemyBoard) => enemyBoard.receiveAttack(x, y)
  let possibleAttacks = []

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
          possibleAttacks = [...possibleAttacks, ...enemyBoard.getAdjacentCells(x, y)]
        } else {
          possibleAttacks = []
        }
      }
      return attackResult.state // -> 'hit' || 'miss'
    }
  }

  return { attack, autoAttack }
}

export default Player
