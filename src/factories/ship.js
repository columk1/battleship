const Ship = (shipType, shipLength) => {
  const type = shipType
  const length = shipLength
  let hits = 0

  const getType = () => type
  const getLength = () => length
  const getHits = () => hits

  const hit = () => {
    hits++
  }

  const isSunk = () => (hits === length ? true : false)

  return { type, length, getHits, hit, isSunk }
}

export default Ship
