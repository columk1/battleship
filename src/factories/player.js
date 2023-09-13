import { randomCoordinates } from './helpers/helpers.js'

const Player = () => {
  const attack = (x, y, enemyBoard) => enemyBoard.receiveAttack(x, y)

  const autoAttack = (enemyBoard) => {
    const [x, y] = randomCoordinates()
    const targetCell = enemyBoard.getBoard()[x][y]
    if (targetCell === 'miss' || targetCell === 'hit') {
      autoAttack(enemyBoard)
    } else {
      return enemyBoard.receiveAttack(x, y)
    }
  }

  return { attack, autoAttack }
}

export default Player
