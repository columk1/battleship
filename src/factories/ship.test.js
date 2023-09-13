import Ship from './ship'

describe('Ship', () => {
  const ship = Ship(3)
  test('When ship is hit', () => {
    ship.hit()
    expect(ship.getHits()).toBe(1)
    expect(ship.isSunk()).toBe(false)
  })

  test('When ship is sunk', () => {
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true)
  })
})
