const randomNum = (size) => Math.floor(Math.random() * size)

export const randomCoordinates = (size = 10) => [randomNum(size), randomNum(size)]

// Returns
export const randomCoordinatesParity = (parity = 2, size = 10) => {
  let [x, y] = [randomNum(size), randomNum(size)]
  if (x % parity === 0) {
    return y % parity === 0 ? randomCoordinatesParity(parity) : [x, y]
  } else {
    return y % parity !== 0 ? randomCoordinatesParity(parity) : [x, y]
  }
}
