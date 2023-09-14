import Game from './game'

describe('Game', () => {
  const game = Game()

  test('When a turn is made', async () => {
    const result = await game.nextTurn()
    expect(['hit', 'miss']).toContain(result)
  })
})
