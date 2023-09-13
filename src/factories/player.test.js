import Player from './player'
import Gameboard from './gameboard'

describe('Player actions in game', () => {
  const board = Gameboard()
  const player = Player()

  test('When a player attacks the enemies board', () => {
    expect(player.attack(0, 0, board)).toBe('miss')
  })

  test('When a player autoAttacks the enemies board', () => {
    expect(player.autoAttack(board)).toBe('miss')
  })
})
