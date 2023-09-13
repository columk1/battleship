const Ship = (shipLength) => {
  const length = shipLength
  let hits = 0

  const getHits = () => hits

  const hit = () => {
    hits++
  }

  const isSunk = () => (hits === length ? true : false)

  return { length, hits, getHits, hit, isSunk }
}

export default Ship
