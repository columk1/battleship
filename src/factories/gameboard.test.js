import Gameboard from './gameboard'
import Ship from './ship'

describe('Ships placed manually', () => {
  const board = Gameboard()
  const ship = Ship(3)

  describe('Place a ship', () => {
    test('When board is initialized', () => {
      expect(board.getBoard()[8][8]).toBe(null)
    })

    test('When ship is placed outside of board', () => {
      expect(board.placeShip(ship, 10, 10)).toBeFalsy()
    })

    test('When ship does not fit on board', () => {
      expect(board.placeShip(ship, 8, 0)).toBeFalsy()
    })

    test('When vertical ship does not fit on board', () => {
      expect(board.placeShip(ship, 0, 8, true)).toBeFalsy()
    })

    test('When ship is placed on board horizontally', () => {
      board.placeShip(ship, 0, 0)
      expect(board.getBoard()[2][0]).toBe(ship)
    })

    test('When ship is placed on board vertically', () => {
      board.placeShip(ship, 0, 2, true)
      expect(board.getBoard()[0][0]).toBe(ship)
    })

    test('When a ship overlaps another ship', () => {
      board.placeShip(ship, 0, 0)
      expect(board.placeShip(ship, 0, 0)).toBeFalsy()
    })

    test('When a vertical ship overlaps another ship', () => {
      board.placeShip(ship, 0, 2)
      expect(board.placeShip(ship, 2, 0, true)).toBeFalsy()
    })
  })

  describe('Recieve Attacks', () => {
    board.placeShip(ship, 0, 0)

    test('When ship is hit', () => {
      board.receiveAttack(0, 0)
      expect(ship.getHits()).toBe(1)
    })

    test('When ship is missed', () => {
      board.receiveAttack(3, 0)
      expect(board.getBoard()[3][0]).toBe('miss')
    })

    // Test was to test array duplicates, not needed with 'hit' or 'miss' implementation
    // test('When a cell with no ship is hit twice', () => {
    //   board.receiveAttack(3, 0)
    //   expect(board.board[3][0]).toBe('miss')
    // })

    test('When a cell with a ship is hit twice', () => {})

    test('When a ship receives a second hit', () => {
      board.receiveAttack(1, 0)
      expect(ship.getHits()).toBe(2)
    })

    test('When a ship is sunk', () => {
      board.receiveAttack(2, 0)
      expect(ship.isSunk()).toBe(true)
    })

    test('When all ships on board are sunk', () => {
      expect(board.allShipsSunk()).toBe(true)
    })
  })
})

describe('Ships placed automatically', () => {
  const board = Gameboard()
  test('When the whole fleet is placed automatically', () => {
    board.autoPlaceFleet()
    expect(board.getShips().length).toBe(5)
  })
})
