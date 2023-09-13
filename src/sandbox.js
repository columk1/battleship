import Game from './factories/game.js'

const game = Game()

console.log(game.playerBoard.getBoard())

game.startGame()
