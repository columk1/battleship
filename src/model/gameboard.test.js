import Gameboard from './gameboard'
import Ship from './ship'

describe('Gameboard', () => {
  const board = Gameboard()
  const ship = Ship(3)

  test('When board is initialized', () => {
    expect(board.board[8][8]).toBe(null)
  })

  test('When ship is placed outside of board', () => {
    expect(board.placeShip(ship, 10, 10)).toBe('Invalid placement')
  })

  test('When ship does not fit on board', () => {
    expect(board.placeShip(ship, 8, 0)).toBe('Invalid placement')
  })

  test('When vertical ship does not fit on board', () => {
    expect(board.placeShip(ship, 0, 8, true)).toBe('Invalid placement')
  })

  test('When ship is placed on board horizontally', () => {
    board.placeShip(ship, 0, 0)
    expect(board.board[2][0]).toBe(ship)
  })

  test('When ship is placed on board vertically', () => {
    board.placeShip(ship, 0, 2, true)
    expect(board.board[0][0]).toBe(ship)
  })

  test('When a ship overlaps another ship', () => {
    board.placeShip(ship, 0, 0)
    expect(board.placeShip(ship, 0, 0)).toBe('Invalid placement')
  })

  test('When a vertical ship overlaps another ship', () => {
    board.placeShip(ship, 0, 2)
    expect(board.placeShip(ship, 2, 0, true)).toBe('Invalid placement')
  })
})
